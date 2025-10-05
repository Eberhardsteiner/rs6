// src/services/reconnectionHandler.ts
import { supabase } from './supabaseClient';
import { MultiplayerService } from './multiplayerService';
import { NotificationService } from './notificationService';
import { ChatService } from './chatService';
import { DecisionQueueService } from './decisionQueueService';

export interface ConnectionStatus {
  connected: boolean;
  reconnecting: boolean;
  lastConnected: Date | null;
  attemptCount: number;
  error?: string;
}

export type ConnectionStatusHandler = (status: ConnectionStatus) => void;

export class ReconnectionHandler {
  private static instance: ReconnectionHandler;
  private status: ConnectionStatus = {
    connected: false,
    reconnecting: false,
    lastConnected: null,
    attemptCount: 0
  };
  
  private statusHandlers: Set<ConnectionStatusHandler> = new Set();
  private reconnectTimer?: NodeJS.Timeout;
  private heartbeatTimer?: NodeJS.Timeout;
  private maxReconnectAttempts = 10;
  private reconnectDelay = 1000; // Start with 1 second
  private maxReconnectDelay = 30000; // Max 30 seconds
  private heartbeatInterval = 30000; // 30 seconds
  
  private mpService: MultiplayerService;
  private notificationService: NotificationService;
  private chatService: ChatService;
  private dqService: DecisionQueueService;

  private constructor() {
    this.mpService = MultiplayerService.getInstance();
    this.notificationService = NotificationService.getInstance();
    this.chatService = ChatService.getInstance();
    this.dqService = DecisionQueueService.getInstance();
    
    this.initialize();
  }

  static getInstance(): ReconnectionHandler {
    if (!ReconnectionHandler.instance) {
      ReconnectionHandler.instance = new ReconnectionHandler();
    }
    return ReconnectionHandler.instance;
  }

  // === Initialization ===
  private initialize() {
    // Monitor online/offline status
    window.addEventListener('online', () => this.handleOnline());
    window.addEventListener('offline', () => this.handleOffline());
    
    // Monitor visibility changes
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        this.checkConnection();
      }
    });
    
    // Monitor Supabase connection
    this.monitorSupabaseConnection();
    
    // Start heartbeat
    this.startHeartbeat();
    
    // Initial connection check
    this.checkConnection();
  }

  // === Connection Monitoring ===
  private async monitorSupabaseConnection() {
    // Subscribe to connection state changes
    const channel = supabase.channel('connection_monitor');
    
    channel.on('system', { event: '*' }, (payload: any) => {
      if (payload.event === 'disconnect') {
        this.handleDisconnect();
      } else if (payload.event === 'connect') {
        this.handleConnect();
      }
    });
    
    channel.subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        this.updateStatus({ connected: true, reconnecting: false });
      } else if (status === 'CLOSED' || status === 'CHANNEL_ERROR') {
        this.handleDisconnect();
      }
    });
  }

  private startHeartbeat() {
    this.stopHeartbeat();
    
    this.heartbeatTimer = setInterval(async () => {
      if (this.status.connected) {
        await this.checkConnection();
      }
    }, this.heartbeatInterval);
  }

  private stopHeartbeat() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = undefined;
    }
  }

  // === Connection State Handlers ===
  private async handleOnline() {
    console.log('Network connection restored');
    this.notificationService.info('Verbindung', 'Netzwerkverbindung wiederhergestellt');
    await this.reconnect();
  }

  private handleOffline() {
    console.log('Network connection lost');
    this.updateStatus({ 
      connected: false, 
      error: 'Keine Netzwerkverbindung' 
    });
    this.notificationService.warning(
      'Verbindung unterbrochen',
      'Netzwerkverbindung verloren. Versuche automatisch neu zu verbinden...'
    );
  }

  private handleConnect() {
    this.updateStatus({
      connected: true,
      reconnecting: false,
      lastConnected: new Date(),
      attemptCount: 0
    });
    
    this.notificationService.success(
      'Verbunden',
      'Verbindung zum Server hergestellt'
    );
    
    // Sync any missed data
    this.syncMissedData();
  }

  private handleDisconnect() {
    const wasConnected = this.status.connected;
    
    this.updateStatus({
      connected: false,
      reconnecting: true
    });
    
    if (wasConnected) {
      this.notificationService.warning(
        'Verbindung unterbrochen',
        'Verbindung zum Server verloren. Versuche neu zu verbinden...'
      );
    }
    
    this.scheduleReconnect();
  }

  // === Reconnection Logic ===
  private scheduleReconnect() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
    }
    
    if (this.status.attemptCount >= this.maxReconnectAttempts) {
      this.updateStatus({
        reconnecting: false,
        error: 'Maximale Anzahl von Verbindungsversuchen erreicht'
      });
      
      this.notificationService.error(
        'Verbindung fehlgeschlagen',
        'Konnte keine Verbindung zum Server herstellen. Bitte Seite neu laden.'
      );
      return;
    }
    
    // Exponential backoff
    const delay = Math.min(
      this.reconnectDelay * Math.pow(2, this.status.attemptCount),
      this.maxReconnectDelay
    );
    
    this.reconnectTimer = setTimeout(() => {
      this.reconnect();
    }, delay);
  }

  private async reconnect() {
    if (!this.status.reconnecting) {
      this.updateStatus({ reconnecting: true });
    }
    
    this.updateStatus({ 
      attemptCount: this.status.attemptCount + 1 
    });
    
    try {
      // Check if we can reach Supabase
      const { error } = await supabase.from('games').select('id').limit(1);
      
      if (error) {
        throw error;
      }
      
      // Re-establish subscriptions
      await this.reestablishSubscriptions();
      
      // Connection successful
      this.handleConnect();
      
    } catch (error) {
      console.error('Reconnection failed:', error);
      this.scheduleReconnect();
    }
  }

  private async reestablishSubscriptions() {
    const gameId = this.mpService.getCurrentGameId();
    if (!gameId) return;
    
    // Re-subscribe to game updates
    const gameInfo = await this.mpService.getGameInfo();
    
    // Re-subscribe to realtime channels
    this.mpService.subscribeToGameUpdates(
      () => {}, // Will be handled by the main app
      () => {}
    );
    
    // Re-subscribe to chat
    this.chatService.subscribeToMessages(() => {});
    
    // Re-subscribe to decisions
    this.dqService.subscribeToDecisions(gameId, () => {});
  }

  // === Data Synchronization ===
  private async syncMissedData() {
    if (!this.status.lastConnected) return;
    
    const gameId = this.mpService.getCurrentGameId();
    if (!gameId) return;
    
    try {
      // Get time since last connection
      const missedSince = this.status.lastConnected;
      
      // Sync missed messages
      const missedMessages = await this.chatService.getMessageHistory(missedSince);
      if (missedMessages.length > 0) {
        this.notificationService.info(
          'Nachrichten synchronisiert',
          `${missedMessages.length} verpasste Nachrichten geladen`
        );
      }
      
      // Sync game state
      const gameInfo = await this.mpService.getGameInfo();
      
      // Notify about any changes
      if (gameInfo.game.state === 'finished') {
        this.notificationService.warning(
          'Spiel beendet',
          'Das Spiel wurde während deiner Abwesenheit beendet'
        );
      }
      
    } catch (error) {
      console.error('Error syncing missed data:', error);
    }
  }

  // === Connection Check ===
  async checkConnection(): Promise<boolean> {
    try {
      // Simple ping to Supabase
      const { error } = await supabase
        .from('games')
        .select('id')
        .limit(1)
        .single();
      
      const isConnected = !error;
      
      if (isConnected !== this.status.connected) {
        if (isConnected) {
          this.handleConnect();
        } else {
          this.handleDisconnect();
        }
      }
      
      return isConnected;
    } catch {
      if (this.status.connected) {
        this.handleDisconnect();
      }
      return false;
    }
  }

  // === Status Management ===
  private updateStatus(updates: Partial<ConnectionStatus>) {
    this.status = { ...this.status, ...updates };
    this.notifyHandlers();
  }

  private notifyHandlers() {
    this.statusHandlers.forEach(handler => handler(this.status));
  }

  subscribeToStatus(handler: ConnectionStatusHandler): () => void {
    this.statusHandlers.add(handler);
    // Immediately notify of current status
    handler(this.status);
    
    return () => {
      this.statusHandlers.delete(handler);
    };
  }

  // === Public Methods ===
  getStatus(): ConnectionStatus {
    return { ...this.status };
  }

  isConnected(): boolean {
    return this.status.connected;
  }

  async forceReconnect() {
    this.updateStatus({ 
      attemptCount: 0,
      error: undefined 
    });
    await this.reconnect();
  }

  // === Cleanup ===
  destroy() {
    this.stopHeartbeat();
    
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
    }
    
    this.statusHandlers.clear();
  }
}