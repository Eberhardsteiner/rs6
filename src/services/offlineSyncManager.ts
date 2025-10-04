// src/services/offlineSyncManager.ts
import { OfflinePersistence } from './offlinePersistence';
import { MultiplayerService } from './multiplayerService';
import { DecisionQueueService } from './decisionQueueService';
import { ChatService } from './chatService';
import { NotificationService } from './notificationService';
import { supabase } from './supabaseClient';
import type { QueuedDecision } from './decisionQueueService';
import type { ChatMessage } from './chatService';

export interface SyncStatus {
  isSyncing: boolean;
  pendingItems: number;
  lastSyncTime: Date | null;
  syncErrors: string[];
  conflictResolutions: ConflictResolution[];
}

export interface ConflictResolution {
  type: 'decision' | 'message' | 'state';
  localData: any;
  serverData: any;
  resolution: 'local' | 'server' | 'merge';
  timestamp: Date;
}

export class OfflineSyncManager {
  private static instance: OfflineSyncManager;
  private persistence: OfflinePersistence;
  private mpService: MultiplayerService;
  private dqService: DecisionQueueService;
  private chatService: ChatService;
  private notificationService: NotificationService;
  
  private syncStatus: SyncStatus = {
    isSyncing: false,
    pendingItems: 0,
    lastSyncTime: null,
    syncErrors: [],
    conflictResolutions: []
  };
  
  private syncInterval: NodeJS.Timeout | null = null;
  private readonly SYNC_INTERVAL = 30000; // 30 seconds
  private readonly MAX_RETRY_ATTEMPTS = 3;
  private readonly CONFLICT_STRATEGY: 'local_first' | 'server_first' | 'newest_wins' = 'newest_wins';

  private constructor() {
    this.persistence = OfflinePersistence.getInstance();
    this.mpService = MultiplayerService.getInstance();
    this.dqService = DecisionQueueService.getInstance();
    this.chatService = ChatService.getInstance();
    this.notificationService = NotificationService.getInstance();
    
    this.initialize();
  }

  static getInstance(): OfflineSyncManager {
    if (!OfflineSyncManager.instance) {
      OfflineSyncManager.instance = new OfflineSyncManager();
    }
    return OfflineSyncManager.instance;
  }

  // === Initialization ===
  private initialize() {
    // Start periodic sync
    this.startPeriodicSync();
    
    // Listen for online/offline events
    window.addEventListener('online', () => this.handleOnline());
    window.addEventListener('offline', () => this.handleOffline());
    
    // Sync on visibility change
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && navigator.onLine) {
        this.syncAll();
      }
    });
    
    // Initial sync if online
    if (navigator.onLine) {
      this.syncAll();
    }
  }

  // === Event Handlers ===
  private async handleOnline() {
    console.log('Going online, starting sync...');
    this.startPeriodicSync();
    await this.syncAll();
  }

  private handleOffline() {
    console.log('Going offline, stopping sync...');
    this.stopPeriodicSync();
  }

  // === Periodic Sync ===
  private startPeriodicSync() {
    this.stopPeriodicSync();
    
    this.syncInterval = setInterval(async () => {
      if (navigator.onLine && !this.syncStatus.isSyncing) {
        await this.syncAll();
      }
    }, this.SYNC_INTERVAL);
  }

  private stopPeriodicSync() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
  }

  // === Main Sync Method ===
  async syncAll(): Promise<void> {
    if (!navigator.onLine || this.syncStatus.isSyncing) {
      return;
    }

    this.syncStatus.isSyncing = true;
    this.syncStatus.syncErrors = [];
    
    try {
      console.log('Starting sync...');
      
      // Get game ID
      const gameId = this.mpService.getCurrentGameId();
      if (!gameId) {
        console.log('No game ID, skipping sync');
        return;
      }
      
      // Process offline queue
      await this.processOfflineQueue(gameId);
      
      // Sync decisions
      await this.syncDecisions(gameId);
      
      // Sync messages
      await this.syncMessages(gameId);
      
      // Sync game state
      await this.syncGameState(gameId);
      
      // Clean up old data
      await this.persistence.clearOldData(7);
      
      this.syncStatus.lastSyncTime = new Date();
      
      console.log('Sync completed successfully');
      
      if (this.syncStatus.conflictResolutions.length > 0) {
        this.notificationService.warning(
          'Sync-Konflikte gelöst',
          `${this.syncStatus.conflictResolutions.length} Konflikte wurden automatisch gelöst`
        );
      }
      
    } catch (error) {
      console.error('Sync failed:', error);
      this.syncStatus.syncErrors.push(error instanceof Error ? error.message : 'Unknown error');
      
      this.notificationService.error(
        'Sync fehlgeschlagen',
        'Daten konnten nicht synchronisiert werden. Wird später erneut versucht.'
      );
      
    } finally {
      this.syncStatus.isSyncing = false;
    }
  }

  // === Process Offline Queue ===
  private async processOfflineQueue(gameId: string): Promise<void> {
    const queueItems = await this.persistence.getOfflineQueue(gameId);
    this.syncStatus.pendingItems = queueItems.length;
    
    console.log(`Processing ${queueItems.length} offline queue items...`);
    
    for (const item of queueItems) {
      if (item.retryCount >= this.MAX_RETRY_ATTEMPTS) {
        console.error(`Max retries reached for item ${item.id}, removing from queue`);
        await this.persistence.removeFromOfflineQueue(item.id);
        continue;
      }
      
      try {
        switch (item.type) {
          case 'decision':
            await this.syncQueuedDecision(item.data);
            break;
          
          case 'message':
            await this.syncQueuedMessage(item.data);
            break;
          
          case 'state_update':
            await this.syncQueuedStateUpdate(item.data);
            break;
        }
        
        // Success - remove from queue
        await this.persistence.removeFromOfflineQueue(item.id);
        this.syncStatus.pendingItems--;
        
      } catch (error) {
        console.error(`Failed to sync item ${item.id}:`, error);
        await this.persistence.updateQueueItemRetry(item.id);
      }
    }
  }

  // === Sync Individual Items ===
  private async syncQueuedDecision(decision: QueuedDecision): Promise<void> {
    // Check if decision already exists on server
    const { data: existing } = await supabase
      .from('decisions')
      .select('id')
      .eq('block_id', decision.block_id)
      .eq('day', decision.day)
      .eq('player_id', decision.player_id)
      .eq('game_id', decision.game_id)
      .maybeSingle();
    
    if (existing) {
      // Conflict - resolve based on strategy
      await this.resolveDecisionConflict(decision, existing);
    } else {
      // No conflict - insert
      await supabase
        .from('decisions')
        .insert(decision);
    }
  }

  private async syncQueuedMessage(message: ChatMessage): Promise<void> {
    // Check for duplicate
    const { data: existing } = await supabase
      .from('messages')
      .select('id')
      .eq('id', message.id)
      .single();
    
    if (!existing) {
      await supabase
        .from('messages')
        .insert(message);
    }
  }

  private async syncQueuedStateUpdate(update: any): Promise<void> {
    // Apply state update
    await supabase
      .from('games')
      .update(update)
      .eq('id', update.gameId);
  }

  // === Sync Decisions ===
  private async syncDecisions(gameId: string): Promise<void> {
    // Get cached decisions
    const cachedDecisions = await this.persistence.getCachedDecisions(gameId);
    
    // Get server decisions
    const { data: serverDecisions } = await supabase
      .from('decisions')
      .select('*')
      .eq('game_id', gameId);
    
    if (!serverDecisions) return;
    
    // Find decisions that exist locally but not on server
    const localOnly = cachedDecisions.filter(local => 
      !serverDecisions.some(server => 
        server.block_id === local.block_id && 
        server.day === local.day &&
        server.player_id === local.player_id
      )
    );
    
    // Upload local-only decisions
    for (const decision of localOnly) {
      try {
        await this.syncQueuedDecision(decision);
      } catch (error) {
        console.error('Failed to sync decision:', error);
      }
    }
    
    // Cache server decisions locally
    for (const decision of serverDecisions) {
      await this.persistence.cacheDecision(decision);
    }
  }

  // === Sync Messages ===
  private async syncMessages(gameId: string): Promise<void> {
    // Get last cached message timestamp
    const cachedMessages = await this.persistence.getCachedMessages(gameId, 1);
    const lastCachedTime = cachedMessages.length > 0 
      ? cachedMessages[0].created_at 
      : new Date(0).toISOString();
    
    // Get newer messages from server
    const { data: newMessages } = await supabase
      .from('messages')
      .select('*')
      .eq('game_id', gameId)
      .gt('created_at', lastCachedTime)
      .order('created_at', { ascending: true });
    
    if (newMessages && newMessages.length > 0) {
      await this.persistence.cacheMessages(newMessages);
      
      this.notificationService.info(
        'Neue Nachrichten',
        `${newMessages.length} neue Nachrichten synchronisiert`
      );
    }
  }

  // === Sync Game State ===
  private async syncGameState(gameId: string): Promise<void> {
    // Get server state
    const { data: serverGame } = await supabase
      .from('games')
      .select('*')
      .eq('id', gameId)
      .single();
    
    if (!serverGame) return;
    
    // Get cached state
    const cachedState = await this.persistence.getCachedGameState(gameId);
    
    // Compare and resolve conflicts
    if (cachedState && cachedState.day !== serverGame.current_day) {
      // Server is ahead - update local
      const newState = {
        ...cachedState,
        day: serverGame.current_day,
        kpi: serverGame.kpi_values
      };
      
      await this.persistence.cacheGameState(gameId, newState);
      
      this.syncStatus.conflictResolutions.push({
        type: 'state',
        localData: cachedState,
        serverData: serverGame,
        resolution: 'server',
        timestamp: new Date()
      });
    }
  }

  // === Conflict Resolution ===
  private async resolveDecisionConflict(
    localDecision: QueuedDecision,
    serverDecision: any
  ): Promise<void> {
    console.log('Resolving decision conflict...');
    
    switch (this.CONFLICT_STRATEGY) {
      case 'local_first':
        // Keep local version
        await supabase
          .from('decisions')
          .update(localDecision)
          .eq('id', serverDecision.id);
        break;
      
      case 'server_first':
        // Keep server version - update local cache
        await this.persistence.cacheDecision(serverDecision);
        break;
      
      case 'newest_wins':
        // Compare timestamps
        const localTime = new Date(localDecision.created_at || 0).getTime();
        const serverTime = new Date(serverDecision.created_at || 0).getTime();
        
        if (localTime > serverTime) {
          // Local is newer
          await supabase
            .from('decisions')
            .update(localDecision)
            .eq('id', serverDecision.id);
        } else {
          // Server is newer
          await this.persistence.cacheDecision(serverDecision);
        }
        break;
    }
    
    this.syncStatus.conflictResolutions.push({
      type: 'decision',
      localData: localDecision,
      serverData: serverDecision,
      resolution: this.CONFLICT_STRATEGY,
      timestamp: new Date()
    });
  }

  // === Optimistic Updates ===
  async makeOptimisticDecision(
    decision: QueuedDecision,
    onSuccess?: () => void,
    onError?: (error: Error) => void
  ): Promise<void> {
    // 1. Update local cache immediately
    await this.persistence.cacheDecision(decision);
    
    // 2. Update UI optimistically
    if (onSuccess) onSuccess();
    
    // 3. Try to sync immediately if online
    if (navigator.onLine) {
      try {
        await this.syncQueuedDecision(decision);
      } catch (error) {
        console.error('Failed to sync decision:', error);
        
        // 4. Add to offline queue for later sync
        await this.persistence.addToOfflineQueue({
          type: 'decision',
          data: decision,
          gameId: decision.game_id
        });
        
        if (onError) onError(error as Error);
      }
    } else {
      // Offline - add to queue
      await this.persistence.addToOfflineQueue({
        type: 'decision',
        data: decision,
        gameId: decision.game_id
      });
    }
  }

  // === Public Methods ===
  getSyncStatus(): SyncStatus {
    return { ...this.syncStatus };
  }

  async forceSyncNow(): Promise<void> {
    return this.syncAll();
  }

  async clearSyncQueue(): Promise<void> {
    await this.persistence.clearAllData();
    this.syncStatus.pendingItems = 0;
    this.syncStatus.conflictResolutions = [];
  }

  destroy() {
    this.stopPeriodicSync();
  }
}