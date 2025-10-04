// src/services/decisionQueueService.ts
import { supabase } from './supabaseClient';
import { MultiplayerService } from './multiplayerService';
import type { KPI, RoleId, DecisionBlock } from '@/core/models/domain';

export interface QueuedDecision {
  id?: string;
  game_id: string;
  player_id: string;
  day: number;
  block_id: string;
  option_id: 'a' | 'b' | 'c' | 'd' | null;
  custom_text?: string;
  kpi_delta?: Partial<KPI>;
  decision_metadata?: {
    role: RoleId;
    timestamp: string;
    block_title: string;
    option_label?: string;
  };
  created_at?: string;
}

export interface DecisionVisibility {
  role: RoleId;
  canSee: (delta: Partial<KPI>) => boolean;
  visibleKpis: (keyof KPI)[];
}

export class DecisionQueueService {
  private static instance: DecisionQueueService;
  private mpService: MultiplayerService;
  private decisionSubscription: any = null;

  constructor() {
    this.mpService = MultiplayerService.getInstance();
  }

  static getInstance(): DecisionQueueService {
    if (!DecisionQueueService.instance) {
      DecisionQueueService.instance = new DecisionQueueService();
    }
    return DecisionQueueService.instance;
  }

  // === Decision Submission ===
  async submitDecision(
    block: DecisionBlock,
    optionId: 'a' | 'b' | 'c' | 'd' | null,
    customText?: string
  ): Promise<void> {
    const gameId = this.mpService.getCurrentGameId();
    const playerId = this.mpService.getCurrentPlayerId();
    
    if (!gameId || !playerId) {
      throw new Error('Not in a game');
    }

    const option = optionId ? block.options.find(o => o.id === optionId) : null;
    const kpiDelta = option?.kpiDelta || {};

    const decision: Omit<QueuedDecision, 'id' | 'created_at'> = {
      game_id: gameId,
      player_id: playerId,
      day: block.day,
      block_id: block.id,
      option_id: optionId,
      custom_text: customText,
      kpi_delta: kpiDelta,
      decision_metadata: {
        role: block.role,
        timestamp: new Date().toISOString(),
        block_title: block.title,
        option_label: option?.label
      }
    };

    // Check if decision already exists
    const { data: existing } = await supabase
      .from('decisions')
      .select('id')
      .eq('game_id', gameId)
      .eq('player_id', playerId)
      .eq('day', block.day)
      .eq('block_id', block.id)
      .maybeSingle();

    if (existing) {
      // Update existing decision
      await supabase
        .from('decisions')
        .update({
          option_id: optionId,
          custom_text: customText,
          kpi_delta: kpiDelta,
          decision_metadata: decision.decision_metadata
        })
        .eq('id', existing.id);
    } else {
      // Insert new decision
      await supabase
        .from('decisions')
        .insert(decision);
    }
  }

  // === Decision Retrieval ===
  async getDecisionsForDay(gameId: string, day: number): Promise<QueuedDecision[]> {
    const { data, error } = await supabase
      .from('decisions')
      .select(`
        *,
        player:players!inner(
          id,
          name,
          role
        )
      `)
      .eq('game_id', gameId)
      .eq('day', day)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  async getMyDecisionsForDay(day: number): Promise<QueuedDecision[]> {
    const playerId = this.mpService.getCurrentPlayerId();
    const gameId = this.mpService.getCurrentGameId();
    
    if (!playerId || !gameId) return [];

    const { data, error } = await supabase
      .from('decisions')
      .select('*')
      .eq('game_id', gameId)
      .eq('player_id', playerId)
      .eq('day', day);

    if (error) throw error;
    return data || [];
  }

  // === Decision Visibility ===
  static getVisibilityRules(): Record<RoleId, DecisionVisibility> {
    return {
      CEO: {
        role: 'CEO',
        canSee: () => true, // CEO sees all decisions (next day)
        visibleKpis: ['cashEUR', 'profitLossEUR', 'publicPerception']
      },
      CFO: {
        role: 'CFO',
        canSee: (delta) => {
          return !!(delta.cashEUR || delta.bankTrust || delta.profitLossEUR);
        },
        visibleKpis: ['cashEUR', 'profitLossEUR', 'bankTrust']
      },
      OPS: {
        role: 'OPS',
        canSee: (delta) => {
          return !!(delta.customerLoyalty || delta.profitLossEUR);
        },
        visibleKpis: ['profitLossEUR', 'customerLoyalty']
      },
      HRLEGAL: {
        role: 'HRLEGAL',
        canSee: (delta) => {
          return !!(delta.workforceEngagement || delta.publicPerception);
        },
        visibleKpis: ['publicPerception', 'workforceEngagement']
      }
    };
  }

  async getVisibleDecisions(
    gameId: string,
    day: number,
    viewerRole: RoleId,
    currentDay: number
  ): Promise<QueuedDecision[]> {
    // Get all decisions for the day
    const allDecisions = await this.getDecisionsForDay(gameId, day);
    
    // Apply visibility rules
    const visibilityRule = DecisionQueueService.getVisibilityRules()[viewerRole];
    
    return allDecisions.filter(decision => {
      // Own decisions are always visible
      const isOwnDecision = decision.player_id === this.mpService.getCurrentPlayerId();
      if (isOwnDecision) return true;

      // CEO sees all decisions from previous day
      if (viewerRole === 'CEO' && day < currentDay) return true;

      // Other roles see decisions that affect their KPIs (from previous day)
      if (day < currentDay && decision.kpi_delta) {
        return visibilityRule.canSee(decision.kpi_delta);
      }

      return false;
    });
  }

  // === KPI Aggregation ===
  static aggregateKpiDeltas(decisions: QueuedDecision[]): Partial<KPI> {
    const aggregated: Partial<KPI> = {
      cashEUR: 0,
      profitLossEUR: 0,
      customerLoyalty: 0,
      bankTrust: 0,
      workforceEngagement: 0,
      publicPerception: 0
    };

    for (const decision of decisions) {
      if (decision.kpi_delta) {
        for (const [key, value] of Object.entries(decision.kpi_delta)) {
          if (key in aggregated && typeof value === 'number') {
            aggregated[key as keyof KPI]! += value;
          }
        }
      }
    }

    return aggregated;
  }

  // === Real-time Subscription ===
  subscribeToDecisions(
    gameId: string,
    onNewDecision: (decision: QueuedDecision) => void,
    onDecisionUpdate?: (decision: QueuedDecision) => void
  ) {
    this.unsubscribeFromDecisions();

    this.decisionSubscription = supabase
      .channel(`decisions:${gameId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'decisions',
          filter: `game_id=eq.${gameId}`
        },
        (payload) => {
          onNewDecision(payload.new as QueuedDecision);
        }
      );

    if (onDecisionUpdate) {
      this.decisionSubscription.on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'decisions',
          filter: `game_id=eq.${gameId}`
        },
        (payload) => {
          onDecisionUpdate(payload.new as QueuedDecision);
        }
      );
    }

    this.decisionSubscription.subscribe();
  }

  unsubscribeFromDecisions() {
    if (this.decisionSubscription) {
      supabase.removeChannel(this.decisionSubscription);
      this.decisionSubscription = null;
    }
  }

  // === Day Transition ===
  async processEndOfDay(gameId: string, day: number): Promise<{
    totalDelta: Partial<KPI>;
    decisionCount: number;
    playerDecisions: Map<RoleId, number>;
  }> {
    const decisions = await this.getDecisionsForDay(gameId, day);
    const totalDelta = DecisionQueueService.aggregateKpiDeltas(decisions);
    
    // Count decisions per role
    const playerDecisions = new Map<RoleId, number>();
    const players = await supabase
      .from('players')
      .select('role')
      .eq('game_id', gameId);

    if (players.data) {
      for (const player of players.data) {
        if (player.role) {
          const count = decisions.filter(d => 
            d.decision_metadata?.role === player.role
          ).length;
          playerDecisions.set(player.role as RoleId, count);
        }
      }
    }

    return {
      totalDelta,
      decisionCount: decisions.length,
      playerDecisions
    };
  }

  // === Decision History ===
  async getDecisionHistory(gameId: string, role?: RoleId): Promise<QueuedDecision[]> {
    let query = supabase
      .from('decisions')
      .select(`
        *,
        player:players!inner(
          name,
          role
        )
      `)
      .eq('game_id', gameId)
      .order('day', { ascending: false })
      .order('created_at', { ascending: false });

    if (role) {
      // Filter by role in metadata
      const { data, error } = await query;
      if (error) throw error;
      
      return (data || []).filter(d => 
        d.decision_metadata?.role === role
      );
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  // === Validation ===
  async validateDecisionCompleteness(
    gameId: string,
    day: number,
    requiredRoles: RoleId[]
  ): Promise<{
    isComplete: boolean;
    missingRoles: RoleId[];
    completedRoles: RoleId[];
  }> {
    const decisions = await this.getDecisionsForDay(gameId, day);
    const decidedRoles = new Set(
      decisions
        .map(d => d.decision_metadata?.role)
        .filter(r => r !== undefined)
    );

    const missingRoles = requiredRoles.filter(r => !decidedRoles.has(r));
    const completedRoles = requiredRoles.filter(r => decidedRoles.has(r));

    return {
      isComplete: missingRoles.length === 0,
      missingRoles,
      completedRoles
    };
  }

  // === Export for Analysis ===
  async exportDecisionsAsCSV(gameId: string): Promise<string> {
    const decisions = await this.getDecisionHistory(gameId);
    
    const headers = [
      'Tag',
      'Rolle',
      'Spieler',
      'Block',
      'Option',
      'Cash Δ',
      'P&L Δ',
      'Kunden Δ',
      'Bank Δ',
      'Mitarbeiter Δ',
      'Öffentlichkeit Δ',
      'Zeitstempel'
    ];

    const rows = decisions.map(d => [
      d.day,
      d.decision_metadata?.role || '',
      (d as any).player?.name || '',
      d.decision_metadata?.block_title || d.block_id,
      d.decision_metadata?.option_label || d.option_id || 'Custom',
      d.kpi_delta?.cashEUR || 0,
      d.kpi_delta?.profitLossEUR || 0,
      d.kpi_delta?.customerLoyalty || 0,
      d.kpi_delta?.bankTrust || 0,
      d.kpi_delta?.workforceEngagement || 0,
      d.kpi_delta?.publicPerception || 0,
      d.created_at || ''
    ]);

    return [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
  }
}