// src/services/chatService.ts
import { supabase } from './supabaseClient';
import { MultiplayerService } from './multiplayerService';
import type { RoleId } from '@/core/models/domain';

export interface ChatMessage {
  id: string;
  game_id: string;
  player_id: string | null;
  content: string;
  message_type: 'chat' | 'system' | 'announcement';
  metadata?: {
    sender_name?: string;

  /**
   * Direktnachrichten-Ziel (optional).
   * Wird von der DB-Policy geschützt; fehlt bei normalen/rollenbasierten Nachrichten.
   */
  target_player_id?: string | null;



    
    sender_role?: RoleId;
    timestamp?: string;
    is_private?: boolean;
    target_role?: RoleId;
    color?: string;
  };
  created_at: string;
  player?: {
    name: string;
    role: RoleId | null;
  };
}

export interface ChatChannel {
  id: string;
  name: string;
  type: 'all' | 'role' | 'private';
  participants?: RoleId[];
}

export class ChatService {
  private static instance: ChatService;
  private subscription: any = null;
  private gameId: string | null = null;
  private playerId: string | null = null;
  private messageCache: Map<string, ChatMessage> = new Map();
  private typingIndicators: Map<string, number> = new Map();

  private constructor() {
    const mpService = MultiplayerService.getInstance();
    this.gameId = mpService.getCurrentGameId();
    this.playerId = mpService.getCurrentPlayerId();
  }

  static getInstance(): ChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService();
    }
    return ChatService.instance;
  }

  // === Message Management ===
  async sendMessage(
    content: string,
    messageType: 'chat' | 'system' | 'announcement' = 'chat',
    metadata?: ChatMessage['metadata']
  ): Promise<ChatMessage> {
    if (!this.gameId || !this.playerId) {
      throw new Error('Not in a game');
    }

    // Get player info for metadata
    const { data: player } = await supabase
      .from('players')
      .select('name, role')
      .eq('id', this.playerId)
      .single();

    const message = {
      game_id: this.gameId,
      player_id: messageType === 'system' ? null : this.playerId,
      content,
      message_type: messageType,
      metadata: {
        ...metadata,
        sender_name: player?.name || 'Unknown',
        sender_role: player?.role || undefined,
        timestamp: new Date().toISOString()
      }
    };

    const { data, error } = await supabase
      .from('messages')
      .insert(message)
      .select(`
        *,
        player:players(
          name,
          role
        )
      `)
      .single();

    if (error) throw error;
    
    this.messageCache.set(data.id, data);
    return data;
  }

  async getMessages(
    limit: number = 50,
    offset: number = 0
  ): Promise<ChatMessage[]> {
    if (!this.gameId) return [];

    const { data, error } = await supabase
      .from('messages')
      .select(`
        *,
        player:players(
          name,
          role
        )
      `)
      .eq('game_id', this.gameId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    
    const messages = (data || []).reverse();
    
    // Update cache
    messages.forEach(msg => {
      this.messageCache.set(msg.id, msg);
    });
    
    return messages;
  }

  async getMessageHistory(since?: Date): Promise<ChatMessage[]> {
    if (!this.gameId) return [];

    let query = supabase
      .from('messages')
      .select(`
        *,
        player:players(
          name,
          role
        )
      `)
      .eq('game_id', this.gameId)
      .order('created_at', { ascending: true });

    if (since) {
      query = query.gte('created_at', since.toISOString());
    }

    const { data, error } = await query;
    if (error) throw error;
    
    return data || [];
  }

  // === Real-time Subscription ===
  subscribeToMessages(
    onNewMessage: (message: ChatMessage) => void,
    onTypingUpdate?: (typing: Map<string, boolean>) => void
  ) {
    if (!this.gameId) return;

    this.unsubscribe();

    this.subscription = supabase
      .channel(`chat:${this.gameId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `game_id=eq.${this.gameId}`
        },
        async (payload) => {
          // Fetch complete message with player info
          const { data } = await supabase
            .from('messages')
            .select(`
              *,
              player:players(
                name,
                role
              )
            `)
            .eq('id', payload.new.id)
            .single();
          
          if (data) {
            this.messageCache.set(data.id, data);
            onNewMessage(data);
          }
        }
      );

    // Presence for typing indicators
    if (onTypingUpdate) {
      this.subscription.on('presence', { event: 'sync' }, () => {
        const state = this.subscription.presenceState();
        const typingMap = new Map<string, boolean>();
        
        Object.keys(state).forEach(key => {
          const presences = state[key];
          presences.forEach((presence: any) => {
            if (presence.typing) {
              typingMap.set(presence.player_id, true);
            }
          });
        });
        
        onTypingUpdate(typingMap);
      });
    }

    this.subscription.subscribe();
  }

  unsubscribe() {
    if (this.subscription) {
      supabase.removeChannel(this.subscription);
      this.subscription = null;
    }
  }

  // === Typing Indicators ===
  async setTyping(isTyping: boolean) {
    if (!this.subscription || !this.playerId) return;

    await this.subscription.track({
      player_id: this.playerId,
      typing: isTyping,
      timestamp: new Date().toISOString()
    });
  }

  // === System Messages ===
  async sendSystemMessage(content: string): Promise<void> {
    await this.sendMessage(content, 'system', {
      color: '#6b7280'
    });
  }

  async sendAnnouncement(content: string): Promise<void> {
    await this.sendMessage(content, 'announcement', {
      color: '#f59e0b'
    });
  }

  async sendRoleMessage(content: string, targetRole: RoleId): Promise<void> {
    await this.sendMessage(content, 'chat', {
      is_private: true,
      target_role: targetRole,
      color: '#8b5cf6'
    });
  }

  // === Message Formatting ===
  static formatMessage(message: ChatMessage): {
    displayName: string;
    displayContent: string;
    color: string;
    icon?: string;
  } {
    const roleColors: Record<RoleId, string> = {
      CEO: '#0ea5e9',
      CFO: '#10b981',
      OPS: '#f59e0b',
      HRLEGAL: '#8b5cf6'
    };

    let displayName = 'System';
    let color = '#6b7280';
    let icon = '💬';

    if (message.message_type === 'system') {
      displayName = 'System';
      color = '#6b7280';
      icon = '⚙️';
    } else if (message.message_type === 'announcement') {
      displayName = 'Ankündigung';
      color = '#f59e0b';
      icon = '📢';
    } else if (message.player) {
      displayName = message.player.name;
      if (message.player.role) {
        displayName += ` (${message.player.role})`;
        color = roleColors[message.player.role];
      }
      
      if (message.metadata?.is_private) {
        icon = '🔒';
      }
    }

    return {
      displayName,
      displayContent: message.content,
      color: message.metadata?.color || color,
      icon
    };
  }

  // === Utility Methods ===
  clearCache() {
    this.messageCache.clear();
  }

  getMessageFromCache(id: string): ChatMessage | undefined {
    return this.messageCache.get(id);
  }

  async deleteMessage(messageId: string): Promise<void> {
    // Only for GM or message owner
    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', messageId)
      .eq('player_id', this.playerId!);

    if (error) throw error;
    this.messageCache.delete(messageId);
  }

  // === Export Chat Log ===
  async exportChatLog(): Promise<string> {
    const messages = await this.getMessageHistory();
    
    const log = messages.map(msg => {
      const formatted = ChatService.formatMessage(msg);
      const timestamp = new Date(msg.created_at).toLocaleString('de-DE');
      return `[${timestamp}] ${formatted.displayName}: ${formatted.displayContent}`;
    });
    
    return log.join('\n');
  }

  // === Notification Helpers ===
  shouldNotifyForMessage(message: ChatMessage, currentRole: RoleId): boolean {
    // Don't notify for own messages
    if (message.player_id === this.playerId) return false;
    
    // Always notify for announcements
    if (message.message_type === 'announcement') return true;
    
    // Check if message is targeted to current role
    if (message.metadata?.is_private && message.metadata?.target_role) {
      return message.metadata.target_role === currentRole;
    }
    
    // Notify for all public messages
    return true;
  }

  // === Statistics ===
  async getChatStats(): Promise<{
    totalMessages: number;
    messagesByRole: Record<RoleId, number>;
    messagesByType: Record<string, number>;
    mostActivePlayer: string | null;
  }> {
    if (!this.gameId) {
      return {
        totalMessages: 0,
        messagesByRole: { CEO: 0, CFO: 0, OPS: 0, HRLEGAL: 0 },
        messagesByType: { chat: 0, system: 0, announcement: 0 },
        mostActivePlayer: null
      };
    }

    const messages = await this.getMessageHistory();
    
    const stats = {
      totalMessages: messages.length,
      messagesByRole: { CEO: 0, CFO: 0, OPS: 0, HRLEGAL: 0 } as Record<RoleId, number>,
      messagesByType: { chat: 0, system: 0, announcement: 0 } as Record<string, number>,
      playerCounts: new Map<string, number>(),
      mostActivePlayer: null as string | null
    };

    messages.forEach(msg => {
      // Count by type
      stats.messagesByType[msg.message_type]++;
      
      // Count by role and player
      if (msg.player) {
        if (msg.player.role) {
          stats.messagesByRole[msg.player.role]++;
        }
        
        const count = stats.playerCounts.get(msg.player.name) || 0;
        stats.playerCounts.set(msg.player.name, count + 1);
      }
    });

    // Find most active player
    let maxCount = 0;
    stats.playerCounts.forEach((count, name) => {
      if (count > maxCount) {
        maxCount = count;
        stats.mostActivePlayer = name;
      }
    });

    return {
      totalMessages: stats.totalMessages,
      messagesByRole: stats.messagesByRole,
      messagesByType: stats.messagesByType,
      mostActivePlayer: stats.mostActivePlayer
    };
  }
}