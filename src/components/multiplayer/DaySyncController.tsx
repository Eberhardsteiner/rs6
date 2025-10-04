// src/components/multiplayer/DaySyncController.tsx
import React, { useState, useEffect } from 'react';
import { MultiplayerService } from '@/services/multiplayerService';
import { DecisionQueueService } from '@/services/decisionQueueService';
import { supabase } from '@/services/supabaseClient';
import type { GameState, KPI } from '@/core/models/domain';
import type { RoleId } from '@/core/models/domain';

/** ── Helper: Ereignis‑Intensität ─────────────────────────────────────────── */
function getEventIntensityMultiplier(day: number): number {
  const g: any = globalThis as any;
  if (!g.__featureEventIntensity) return 1;
  const arr = Array.isArray(g.__eventIntensityByDay) ? g.__eventIntensityByDay : [];
  const m = Number(arr[day - 1]) || 1;
  return m > 0 ? m : 1;
}

// ── NEU: Schwierigkeit aus dem Adminpanel lesen & auf Zufallsdeltas anwenden ─────────────────
function __getDifficulty(): 'easy'|'normal'|'hard' {
  const g: any = globalThis as any;
  // Bevorzugt MP-Quelle; Fallback 'normal'
  const v = (g.__mpDifficulty || g.__multiplayerSettings?.mpDifficulty || 'normal') as any;
  return (v === 'easy' || v === 'hard' || v === 'normal') ? v : 'normal';
}

// Neu: Intensität anwenden; MP-Schweregrad wirkt NUR auf negative Cash/P&L-Zufallswerte
function scaleDailyRandoms(daily: any, m: number) {
  const x = { ...(daily || {}) };

  // 1) Event-Intensität (Admin)
  const applyIntensity = (v: number) => (m && m !== 1) ? Math.round(v * m) : Math.round(v);

  // 2) MP-Schwierigkeit nur für negative Cash/P&L
  const d = __getDifficulty();
  const scaleNegFin = (v: number) => {
    if (v < 0) {
      if (d === 'hard')  return Math.round(v * 1.3);
      if (d === 'easy')  return Math.round(v * 0.7);
    }
    return Math.round(v);
  };

  // Cash & P&L
  if (typeof x.cashDelta === 'number') x.cashDelta = scaleNegFin(applyIntensity(x.cashDelta));
  if (typeof x.plDelta   === 'number') x.plDelta   = scaleNegFin(applyIntensity(x.plDelta));

  // Weiche KPIs unverändert (nur Intensität)
  const soft = ['loyaltyDelta','trustDelta','engagementDelta','perceptionDelta'] as const;
  soft.forEach(k => {
    if (typeof x[k] === 'number') x[k] = applyIntensity(x[k]!);
  });

  return x;
}




/** ── Helper: Invarianten anwenden ────────────────────────────────────────── */
async function fetchRecentProfitLoss(gameId: string, limit = 5): Promise<number[]> {
  try {
    const { data } = await supabase
      .from('game_state_snapshots')
      .select('day, state')
      .eq('game_id', gameId)
      .order('day', { ascending: false })
      .limit(limit);
    const vals = (data || [])
      .map(r => (r as any).state?.kpi?.profitLossEUR)
      .filter((n: any) => typeof n === 'number') as number[];
    return vals;
  } catch {
    return [];
  }
}

function applyOptionalInvariants(prev: KPI, next: KPI, recentPL: number[]): Partial<KPI> {
  const g: any = globalThis as any;
  const inv = (g.__invariants && g.__invariants.optional) || {};
  const delta: Partial<KPI> = {};

  // Negativer Cash
  if ((next.cashEUR || 0) < 0) {
    if (inv.pp_penalty_on_neg_cash) delta.publicPerception = (delta.publicPerception || 0) - 5;
    if (inv.loyalty_penalty_on_neg_cash) delta.customerLoyalty = (delta.customerLoyalty || 0) - 2;
  }

  // Bank Trust < 10
  if ((next.bankTrust || 0) < 10) {
    if (inv.banktrust_lt10_workengagement_minus10) delta.workforceEngagement = (delta.workforceEngagement || 0) - 10;
    if (inv.banktrust_lt10_publicperception_minus10) delta.publicPerception = (delta.publicPerception || 0) - 10;
  }

  // Bank Trust > 80
  if ((next.bankTrust || 0) > 80) {
    if (inv.banktrust_gt80_workengagement_plus10) delta.workforceEngagement = (delta.workforceEngagement || 0) + 10;
    if (inv.banktrust_gt80_publicperception_plus80) delta.publicPerception = (delta.publicPerception || 0) + 80;
  }

  // 5x Loss / Profit in Folge
  if (recentPL.length >= 5) {
    const allLoss = recentPL.every(v => v < 0);
    const allProfit = recentPL.every(v => v > 0);
    if (allLoss) {
      if (inv.loss5_banktrust_minus8) delta.bankTrust = (delta.bankTrust || 0) - 8;
      if (inv.loss5_publicperception_minus5) delta.publicPerception = (delta.publicPerception || 0) - 5;
      if (inv.loss5_customerloyalty_minus5) delta.customerLoyalty = (delta.customerLoyalty || 0) - 5;
    }
    if (allProfit) {
      if (inv.profit5_banktrust_plus8) delta.bankTrust = (delta.bankTrust || 0) + 8;
      if (inv.profit5_publicperception_plus8) delta.publicPerception = (delta.publicPerception || 0) + 8;
      if (inv.profit5_customerloyalty_plus8) delta.customerLoyalty = (delta.customerLoyalty || 0) + 8;
    }
  }

  return delta;
}

function clampKpi(k: KPI): KPI {
  return {
    cashEUR: Math.round(k.cashEUR || 0),
    profitLossEUR: Math.round(k.profitLossEUR || 0),
    customerLoyalty: Math.max(0, Math.min(100, Math.round(k.customerLoyalty || 0))),
    bankTrust: Math.max(0, Math.min(100, Math.round(k.bankTrust || 0))),
    workforceEngagement: Math.max(0, Math.min(100, Math.round(k.workforceEngagement || 0))),
    publicPerception: Math.max(0, Math.min(100, Math.round(k.publicPerception || 0))),
  };
}

/** ── Helper: Insolvenz nach Admin‑Regeln ─────────────────────────────────── */
function evaluateInsolvencyByRules(kpi: KPI): { triggered: boolean; criteria: string[] } {
  const g: any = globalThis as any;
  const rules = (g.__insolvencyRules || {}) as Record<string, { enabled: boolean; threshold: number }>;
  const effCash = (kpi.cashEUR || 0) + (Number(g.__bankPendingDrawEUR) || 0);
  const value = (key: string): number => {
    switch (key) {
      case 'cashEUR': return effCash;
      case 'profitLossEUR': return kpi.profitLossEUR || 0;
      case 'customerLoyalty': return kpi.customerLoyalty || 0;
      case 'bankTrust': return kpi.bankTrust || 0;
      case 'workforceEngagement': return kpi.workforceEngagement || 0;
      case 'publicPerception': return kpi.publicPerception || 0;
      case 'debt': return Number((g.__usedCreditEUR)||0);
      case 'receivables': return Number((g.__receivablesEUR)||0);
      default: return Number((kpi as any)[key]) || 0;
    }
  };
  const hit: string[] = [];
  Object.entries(rules).forEach(([k, r]) => {
    if (!r?.enabled) return;
    const v = value(k);
    if (v < Number(r.threshold || 0)) hit.push(k);
  });
  return { triggered: hit.length > 0, criteria: hit };
}


interface DaySyncControllerProps {
  gameId: string;
  currentDay: number;
  state: GameState;
  onDayAdvance: (newDay: number, kpiDelta: Partial<KPI>) => void;
  onGameStateUpdate: (update: Partial<GameState>) => void;
  isGM: boolean;
  role: RoleId;
  daySeconds: number;
  graceSeconds: number;
}

interface DayStatus {
  playersReady: Map<RoleId, boolean>;
  decisionsComplete: boolean;
  timeRemaining: number;
  canAdvance: boolean;
  waitingFor: RoleId[];
}

export default function DaySyncController({
  gameId,
  currentDay,
  state,
  onDayAdvance,
  onGameStateUpdate,
  isGM,
  role,
  daySeconds,
  graceSeconds
}: DaySyncControllerProps) {
  const [dayStatus, setDayStatus] = useState<DayStatus>({
    playersReady: new Map(),
    decisionsComplete: false,
    timeRemaining: daySeconds,
    canAdvance: false,
    waitingFor: []
  });
  const [processingDayChange, setProcessingDayChange] = useState(false);
  const [countdown, setCountdown] = useState(daySeconds);
  const [inGracePeriod, setInGracePeriod] = useState(false);

  const mpService = MultiplayerService.getInstance();
  const dqService = DecisionQueueService.getInstance();
  // Nur CEO darf den Tageswechsel auslösen
  const REQUIRED_ROLES: RoleId[] = ['CFO', 'HRLEGAL', 'OPS'] as RoleId[];
  const isCEO = role === 'CEO';

  // Ready-Status (Persistenz in Supabase)
  const fetchReadyMap = async (): Promise<Map<RoleId, boolean>> => {
    try {
      const { data } = await supabase
        .from('player_ready')
        .select('role, ready')
        .eq('game_id', gameId)
        .eq('day', currentDay);
      const m = new Map<RoleId, boolean>();
      REQUIRED_ROLES.forEach(r => m.set(r, false));
      (data || []).forEach((row: any) => m.set(row.role as RoleId, !!row.ready));
      return m;
    } catch {
      const m = new Map<RoleId, boolean>();
      REQUIRED_ROLES.forEach(r => m.set(r, false));
      return m;
    }
  };

  const setPlayerReady = async (r: RoleId, ready = true) => {
    try {
      await supabase
        .from('player_ready')
        .upsert(
          { game_id: gameId, day: currentDay, role: r, ready: ready, updated_at: new Date().toISOString() },
          { onConflict: 'game_id,day,role' }
        );
      // Hinweis-Event für CEO (optional, für Verlauf)
      await supabase.from('events').insert({
        game_id: gameId,
        day: currentDay,
        type: 'player_ready',
        content: { role: r, ready }
      });
      // lokalen Status aktualisieren
      const m = await fetchReadyMap();
      setDayStatus(prev => ({
        ...prev,
        playersReady: m,
        canAdvance: REQUIRED_ROLES.every(rr => m.get(rr)) || inGracePeriod
      }));
    } catch (e) {
      console.error('Fehler beim Setzen des Ready-Status:', e);
    }
  };

  // Timer for day duration
  useEffect(() => {
    const startTime = Date.now();
    const totalTime = daySeconds + graceSeconds;

    const timer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = Math.max(0, totalTime - elapsed);
      
      setCountdown(remaining);
      setInGracePeriod(elapsed >= daySeconds);
      
      // Auto-advance when time is up (GM only)
      if (remaining === 0 && isGM && !processingDayChange) {
        handleDayAdvance();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentDay, daySeconds, graceSeconds]);

  // Check decision completion status
  useEffect(() => {
    const checkStatus = async () => {
      try {
        // Get all players and their roles
        const { data: players } = await supabase
          .from('players')
          .select('role, user_id, name')
          .eq('game_id', gameId);

        if (!players) return;

        // Check decision completeness (only for required roles: CFO, HRLEGAL, OPS - not CEO)
        const validation = await dqService.validateDecisionCompleteness(
          gameId,
          currentDay,
          REQUIRED_ROLES
        );

                // Entscheidungen weiterhin prüfen (für Malus/Autofill), aber Advance-Gate an Ready-Lampen koppeln
        const readyMap = await fetchReadyMap();
        const allReady = REQUIRED_ROLES.every(r => readyMap.get(r) === true);

        setDayStatus(prev => ({
          ...prev,
          decisionsComplete: validation.isComplete,
          waitingFor: validation.missingRoles,
          playersReady: readyMap,
          canAdvance: allReady || inGracePeriod
        }));


         
        
      } catch (error) {
        console.error('Error checking day status:', error);
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 5000); // Check every 5 seconds
    
    return () => clearInterval(interval);
  }, [gameId, currentDay, inGracePeriod]);

  // Subscribe to decision updates
  useEffect(() => {
    dqService.subscribeToDecisions(
      gameId,
      () => {
        // Refresh status when new decision arrives
        checkDecisionStatus();
      }
    );

    return () => {
      dqService.unsubscribeFromDecisions();
    };
  }, [gameId, currentDay]);

  const checkDecisionStatus = async () => {
    // Check decision completeness (only for required roles: CFO, HRLEGAL, OPS - not CEO)
    const validation = await dqService.validateDecisionCompleteness(
      gameId,
      currentDay,
      REQUIRED_ROLES
    );

    setDayStatus(prev => ({
      ...prev,
      decisionsComplete: validation.isComplete,
      waitingFor: validation.missingRoles
    }));
  };

  // Realtime: Player-Ready-Änderungen abonnieren
  useEffect(() => {
    const channel = supabase
      .channel('mp-player-ready')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'player_ready' }, (payload) => {
        const rec: any = payload.new || payload.old;
        if (rec?.game_id === gameId && rec?.day === currentDay) {
          fetchReadyMap().then(m => {
            const allReady = REQUIRED_ROLES.every(r => m.get(r) === true);
            setDayStatus(prev => ({ ...prev, playersReady: m, canAdvance: allReady || inGracePeriod }));
          }).catch(() => {});
        }
      })
      .subscribe();
    return () => { try { channel.unsubscribe(); } catch {} };
  }, [gameId, currentDay, inGracePeriod]);

    const handleDayAdvance = async () => {
    if (!isCEO || processingDayChange) return;


    setProcessingDayChange(true);

    try {
      // Process all decisions and calculate KPI changes
      const { totalDelta, decisionCount, playerDecisions } = 
        await dqService.processEndOfDay(gameId, currentDay);


            // 1) Gate: Nur wenn alle drei Rollen grün ODER Kulanzzeit aktiv
      const readyMapNow = await fetchReadyMap();
      const allReadyNow = REQUIRED_ROLES.every(r => readyMapNow.get(r) === true);
      if (!allReadyNow && !inGracePeriod) {
        alert('Tageswechsel erst möglich, wenn CFO, HRLEGAL und OPS „Entscheidungen getroffen“ gemeldet haben.');
        setProcessingDayChange(false);
        return;
      }

      // 2) Vollständigkeit von INHALTLICHEN Entscheidungen prüfen (für Malus/Autofill)
      const validationForPenalty = await dqService.validateDecisionCompleteness(
        gameId,
        currentDay,
        REQUIRED_ROLES
      );

      // 3) Malus & Auto-Entscheidungen, falls Kulanzzeit und nicht alle Entscheidungen da
      let autoDelta: Partial<KPI> = {};
      let autoDecisions: Record<string, Partial<KPI>> = {};
      let penaltyPoints = 0;

      if (inGracePeriod && validationForPenalty.missingRoles.length > 0) {
        // Malus: -5 „Punkte“ pro fehlender Rolle (wirken auf Public Perception)
        penaltyPoints = validationForPenalty.missingRoles.length * 5;

        // einfache Simulation zufälliger Del­tas je fehlender Rolle
        const simulateRandomDecisionDelta = (): Partial<KPI> => {
          const r = Math.random();
          return {
            cashEUR: Math.round((r - 0.5) * 20000),
            profitLossEUR: Math.round((r - 0.5) * 15000),
            customerLoyalty: Math.round((r - 0.5) * 6),
            bankTrust: Math.round((r - 0.5) * 6),
            workforceEngagement: Math.round((r - 0.5) * 6),
            publicPerception: Math.round((r - 0.5) * 6)
          };
        };

        validationForPenalty.missingRoles.forEach((mr: RoleId) => {
          const d = simulateRandomDecisionDelta();
          autoDecisions[mr] = d;
          autoDelta = {
            cashEUR: (autoDelta.cashEUR || 0) + (d.cashEUR || 0),
            profitLossEUR: (autoDelta.profitLossEUR || 0) + (d.profitLossEUR || 0),
            customerLoyalty: (autoDelta.customerLoyalty || 0) + (d.customerLoyalty || 0),
            bankTrust: (autoDelta.bankTrust || 0) + (d.bankTrust || 0),
            workforceEngagement: (autoDelta.workforceEngagement || 0) + (d.workforceEngagement || 0),
            publicPerception: (autoDelta.publicPerception || 0) + (d.publicPerception || 0)
          };
        });

        // Ereignisse für Verlauf/Transparenz
        await supabase.from('events').insert({
          game_id: gameId,
          day: currentDay,
          type: 'penalty',
          content: { label: 'Zeitüberschreitung', missing_roles: validationForPenalty.missingRoles, penalty_points: penaltyPoints }
        });
        await supabase.from('events').insert({
          game_id: gameId,
          day: currentDay,
          type: 'auto_decisions',
          content: { roles: validationForPenalty.missingRoles, deltas: autoDecisions }
        });
      }


      // Apply random events and daily burn
      const intensity = getEventIntensityMultiplier(currentDay);
const dailyRandomsRaw = (state.engineMeta as any)?.currentDayRandoms || {};
const dailyRandoms = scaleDailyRandoms(dailyRandomsRaw, intensity);

const finalDelta: Partial<KPI> = {
  cashEUR: (totalDelta.cashEUR || 0) + (autoDelta.cashEUR || 0) + (dailyRandoms.cashDelta || 0) + (state.burnPerDayEUR || 0),
  profitLossEUR: (totalDelta.profitLossEUR || 0) + (autoDelta.profitLossEUR || 0) + (dailyRandoms.plDelta || 0),
  customerLoyalty: (totalDelta.customerLoyalty || 0) + (autoDelta.customerLoyalty || 0) + (dailyRandoms.loyaltyDelta || 0),
  bankTrust: (totalDelta.bankTrust || 0) + (autoDelta.bankTrust || 0) + (dailyRandoms.trustDelta || 0),
  workforceEngagement: (totalDelta.workforceEngagement || 0) + (autoDelta.workforceEngagement || 0) + (dailyRandoms.engagementDelta || 0),
  publicPerception: (totalDelta.publicPerception || 0) + (autoDelta.publicPerception || 0) + (dailyRandoms.perceptionDelta || 0)
};
// Malus (Zeitüberschreitung) – wirkt als Abzug auf Public Perception
if (typeof penaltyPoints === 'number' && penaltyPoints > 0) {
  finalDelta.publicPerception = (finalDelta.publicPerception || 0) - penaltyPoints;
}



      // Calculate new KPI values
      let newKpi: KPI = {
        cashEUR: Math.round((state.kpi.cashEUR || 0) + (finalDelta.cashEUR || 0)),
        profitLossEUR: Math.round((state.kpi.profitLossEUR || 0) + (finalDelta.profitLossEUR || 0)),
        customerLoyalty: Math.max(0, Math.min(100, 
          (state.kpi.customerLoyalty || 50) + (finalDelta.customerLoyalty || 0))),
        bankTrust: Math.max(0, Math.min(100, 
          (state.kpi.bankTrust || 50) + (finalDelta.bankTrust || 0))),
        workforceEngagement: Math.max(0, Math.min(100, 
          (state.kpi.workforceEngagement || 50) + (finalDelta.workforceEngagement || 0))),
        publicPerception: Math.max(0, Math.min(100, 
          (state.kpi.publicPerception || 50) + (finalDelta.publicPerception || 0)))
      };

// Apply optional invariants (admin-configured)
try {
  const recentPL = await fetchRecentProfitLoss(gameId, 5);
  const invDelta = applyOptionalInvariants(state.kpi as KPI, newKpi, recentPL);
  if (Object.keys(invDelta).length) {
    newKpi = clampKpi({
      ...newKpi,
      cashEUR: newKpi.cashEUR + (invDelta.cashEUR || 0),
      profitLossEUR: newKpi.profitLossEUR + (invDelta.profitLossEUR || 0),
      customerLoyalty: newKpi.customerLoyalty + (invDelta.customerLoyalty || 0),
      bankTrust: newKpi.bankTrust + (invDelta.bankTrust || 0),
      workforceEngagement: newKpi.workforceEngagement + (invDelta.workforceEngagement || 0),
      publicPerception: newKpi.publicPerception + (invDelta.publicPerception || 0),
    });
  }
} catch (e) {
  console.warn('Invarianten konnten nicht angewendet werden:', e);
}

// Evaluate insolvency according to admin rules
const mode = (globalThis as any).__insolvencyMode as ('hard'|'soft'|'off') || 'hard';
const insolv = evaluateInsolvencyByRules(newKpi);

      
      // Update game state in Supabase
      await supabase
  .from('games')
  .update({
    current_day: currentDay + 1,
    kpi_values: newKpi,
    ...(insolv.triggered && mode === 'hard' ? { state: 'finished' } : {})
  })
  .eq('id', gameId);


      // Create day change event
           await supabase
        .from('events')
        .insert({
          game_id: gameId,
          day: currentDay + 1,
          type: 'day_change',
          content: {
            from_day: currentDay,
            to_day: currentDay + 1,
            kpi_delta: finalDelta,
            decision_count: decisionCount,
            player_decisions: Object.fromEntries(playerDecisions),
            penalty_points,               // ggf. 0 oder undefined
            auto_decisions: autoDecisions // pro fehlender Rolle zufällig simuliert
          }
        });


      // Create snapshot for history
      await supabase
        .from('game_state_snapshots')
        .insert({
          game_id: gameId,
          day: currentDay,
          state: {
            kpi: state.kpi,
            decisions: decisionCount,
            timestamp: new Date().toISOString()
          }
        });

// (a) Insolvenz/Warnung als Event
if (insolv.triggered) {
  await supabase
    .from('events')
    .insert({
      game_id: gameId,
      day: currentDay + 1,
      type: mode === 'hard' ? 'insolvency' : 'insolvency_warning',
      content: {
        mode,
        criteria: insolv.criteria,
        kpi: newKpi
      }
    });
}

// (b) Auto‑Save (lokaler Speicherslot pro Spiel), falls im Adminpanel aktiviert
try {
  if ((globalThis as any).__featureAutoSave) {
    const slot = {
      gameId,
      day: currentDay + 1,
      kpi: newKpi,
      ts: new Date().toISOString()
    };
    localStorage.setItem(`mp_saveSlot__${gameId}`, JSON.stringify(slot));
    try { window.dispatchEvent(new CustomEvent('mp:autosave', { detail: slot })); } catch {}
  }
} catch {}

      
      // Trigger local state update
      onDayAdvance(currentDay + 1, finalDelta);
      if (insolv.triggered) {
  onGameStateUpdate({ insolvency: mode === 'hard', isOver: mode === 'hard' });
}


    } catch (error) {
      console.error('Error advancing day:', error);
      alert('Fehler beim Tageswechsel. Bitte versuchen Sie es erneut.');
    } finally {
      setProcessingDayChange(false);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

   const getStatusColor = (ready: boolean): string => {
    return ready ? '#10b981' : '#6b7280'; // grün = an, grau = aus
  };


  return (
    <div className="day-sync-controller" style={{
      position: 'sticky',
      top: 60,
      zIndex: 999,
      background: 'white',
      borderBottom: '2px solid #e5e7eb',
      padding: '12px 16px'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 16
      }}>
        {/* Timer Display */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12
        }}>
          <div style={{
            padding: '6px 12px',
            background: inGracePeriod ? '#fef3c7' : '#f3f4f6',
            borderRadius: 6,
            fontWeight: 600,
            color: inGracePeriod ? '#92400e' : '#374151'
          }}>
            ⏱️ {formatTime(countdown)}
            {inGracePeriod && ' (Kulanzzeit)'}
          </div>
          
          <div style={{ fontSize: 14, color: '#6b7280' }}>
            Tag {currentDay} von 14
          </div>
        </div>

          {/* Player Status (fix: CFO, HRLEGAL, OPS; Lampen aus/anz) */}
        <div style={{ display: 'flex', gap: 8 }}>
          {REQUIRED_ROLES.map(playerRole => {
            const ready = dayStatus.playersReady.get(playerRole) || false;
            return (
              <div
                key={playerRole}
                style={{
                  padding: '4px 8px',
                  background: getStatusColor(ready),
                  color: 'white',
                  borderRadius: 4,
                  fontSize: 12,
                  fontWeight: 600,
                  opacity: ready ? 1 : 0.7
                }}
                title={ready ? 'Entscheidungen gemeldet' : 'Wartet auf „Entscheidungen getroffen“'}
              >
                {playerRole} {ready ? '●' : '○'}
              </div>
            );
          })}
        </div>

        

        {/* Controls */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {dayStatus.waitingFor.length > 0 && (
            <div style={{ fontSize: 12, color: '#6b7280' }}>
              Warte auf Entscheidungen (Inhalt): {dayStatus.waitingFor.join(', ')}
            </div>
          )}

          {/* Spieler (nicht CEO): Button "Entscheidungen getroffen" */}
          {role !== 'CEO' && (
            dayStatus.playersReady.get(role)
              ? (
                  <div style={{
                    padding: '6px 12px',
                    background: '#f0fdf4',
                    color: '#10b981',
                    borderRadius: 6,
                    fontSize: 14,
                    fontWeight: 600
                  }}>
                    ✓ Entscheidungen gemeldet
                  </div>
                )
              : (
                  <button
                    onClick={() => setPlayerReady(role, true)}
                    style={{
                      padding: '6px 12px',
                      background: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: 6,
                      cursor: 'pointer',
                      fontSize: 14,
                      fontWeight: 600
                    }}
                    title="Melde: Entscheidungen getroffen (signalisiert dem CEO grüne Lampe)"
                  >
                    ✅ Entscheidungen getroffen
                  </button>
                )
          )}

          {/* CEO: Tageswechsel nur, wenn alle 3 Lampen grün ODER Kulanzzeit */}
          {isCEO && (
            <button
              onClick={handleDayAdvance}
              disabled={
                processingDayChange ||
                (!REQUIRED_ROLES.every(r => dayStatus.playersReady.get(r)) && !inGracePeriod)
              }
              style={{
                padding: '6px 12px',
                background: dayStatus.canAdvance ? '#3b82f6' : '#9ca3af',
                color: 'white',
                border: 'none',
                borderRadius: 6,
                cursor: dayStatus.canAdvance ? 'pointer' : 'not-allowed',
                fontSize: 14,
                fontWeight: 600
              }}
              title={
                dayStatus.canAdvance
                  ? 'Tag beenden und fortfahren'
                  : 'Erst wenn CFO/HRLEGAL/OPS „Entscheidungen getroffen“ melden (oder Kulanzzeit läuft ab)'
              }
            >
              {processingDayChange ? 'Verarbeite...' : '➡️ Nächster Tag (CEO)'}
            </button>
          )}
        </div>
</div>

      {/* Progress Bar */}
      <div style={{
        marginTop: 8,
        height: 4,
        background: '#e5e7eb',
        borderRadius: 2,
        overflow: 'hidden'
      }}>
        <div
          style={{
            height: '100%',
            background: inGracePeriod ? '#f59e0b' : '#3b82f6',
            transition: 'width 1s linear',
            width: `${(countdown / (daySeconds + graceSeconds)) * 100}%`
          }}
        />
      </div>
    </div>
  );
}