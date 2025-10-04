// src/services/notificationService.ts
import type { RoleId } from '@/core/models/domain';

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'decision' | 'chat' | 'day_change';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  persistent: boolean;
  metadata?: {
    gameId?: string;
    day?: number;
    role?: RoleId;
    playerId?: string;
    actionRequired?: boolean;
  };
}

export type NotificationHandler = (notification: Notification) => void;

export class NotificationService {
  private static instance: NotificationService;
  private notifications: Map<string, Notification> = new Map();
  private handlers: Set<NotificationHandler> = new Set();
  private soundEnabled: boolean = true;
  private desktopEnabled: boolean = false;
  private maxNotifications: number = 50;

  private constructor() {
    this.loadSettings();
    this.requestDesktopPermission();
  }

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  // === Settings Management ===
  private loadSettings() {
    try {
      const settings = localStorage.getItem('notification_settings');
      if (settings) {
        const parsed = JSON.parse(settings);
        this.soundEnabled = parsed.soundEnabled ?? true;
        this.desktopEnabled = parsed.desktopEnabled ?? false;
      }
    } catch {
      // Use defaults
    }
  }

  private saveSettings() {
    try {
      localStorage.setItem('notification_settings', JSON.stringify({
        soundEnabled: this.soundEnabled,
        desktopEnabled: this.desktopEnabled
      }));
    } catch {
      // Ignore storage errors
    }
  }

  setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
    this.saveSettings();
  }

  setDesktopEnabled(enabled: boolean) {
    this.desktopEnabled = enabled;
    this.saveSettings();
    if (enabled) {
      this.requestDesktopPermission();
    }
  }

  // === Desktop Notifications ===
  private async requestDesktopPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission();
    }
  }

  private showDesktopNotification(notification: Notification) {
    if (!this.desktopEnabled) return;
    if (!('Notification' in window)) return;
    if (Notification.permission !== 'granted') return;

    try {
      const desktopNotif = new Notification(notification.title, {
        body: notification.message,
        icon: '/icon-192x192.png', // Add your app icon
        badge: '/badge-72x72.png',
        tag: notification.id,
        requireInteraction: notification.metadata?.actionRequired,
        timestamp: notification.timestamp.getTime()
      });

      desktopNotif.onclick = () => {
        window.focus();
        this.markAsRead(notification.id);
        desktopNotif.close();
      };

      // Auto-close after 5 seconds for non-persistent
      if (!notification.persistent) {
        setTimeout(() => desktopNotif.close(), 5000);
      }
    } catch (error) {
      console.error('Error showing desktop notification:', error);
    }
  }

  // === Sound Notifications ===
  private playSound(type: Notification['type']) {
    if (!this.soundEnabled) return;

    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Different frequencies for different types
      const frequencies: Record<Notification['type'], number> = {
        info: 600,
        success: 800,
        warning: 500,
        error: 300,
        decision: 700,
        chat: 900,
        day_change: 400
      };

      oscillator.frequency.value = frequencies[type];
      oscillator.type = 'sine';

      // Volume and duration
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch {
      // Ignore audio errors
    }
  }

  // === Core Notification Management ===
  add(notification: Omit<Notification, 'id' | 'timestamp' | 'read'>): Notification {
    const id = crypto.randomUUID();
    const newNotification: Notification = {
      ...notification,
      id,
      timestamp: new Date(),
      read: false
    };

    this.notifications.set(id, newNotification);
    
    // Cleanup old notifications if over limit
    if (this.notifications.size > this.maxNotifications) {
      const sortedIds = Array.from(this.notifications.entries())
        .sort((a, b) => a[1].timestamp.getTime() - b[1].timestamp.getTime())
        .map(([id]) => id);
      
      // Remove oldest non-persistent notifications
      for (const oldId of sortedIds) {
        if (!this.notifications.get(oldId)?.persistent) {
          this.notifications.delete(oldId);
          if (this.notifications.size <= this.maxNotifications) break;
        }
      }
    }

    // Trigger handlers
    this.handlers.forEach(handler => handler(newNotification));

    // Show desktop notification
    this.showDesktopNotification(newNotification);

    // Play sound
    this.playSound(newNotification.type);

    return newNotification;
  }

  // === Convenience Methods for Different Types ===
  info(title: string, message: string, metadata?: Notification['metadata']) {
    return this.add({ type: 'info', title, message, persistent: false, metadata });
  }

  success(title: string, message: string, metadata?: Notification['metadata']) {
    return this.add({ type: 'success', title, message, persistent: false, metadata });
  }

  warning(title: string, message: string, metadata?: Notification['metadata']) {
    return this.add({ type: 'warning', title, message, persistent: true, metadata });
  }

  error(title: string, message: string, metadata?: Notification['metadata']) {
    return this.add({ type: 'error', title, message, persistent: true, metadata });
  }

  decisionRequired(day: number, role: RoleId, blockCount: number) {
    return this.add({
      type: 'decision',
      title: 'Entscheidungen erforderlich',
      message: `${blockCount} Entscheidungen für ${role} an Tag ${day} ausstehend`,
      persistent: true,
      metadata: {
        day,
        role,
        actionRequired: true
      }
    });
  }

  newChatMessage(senderName: string, senderRole?: RoleId, isPrivate: boolean = false) {
    return this.add({
      type: 'chat',
      title: 'Neue Nachricht',
      message: `${senderName}${senderRole ? ` (${senderRole})` : ''}: ${isPrivate ? '🔒 Private Nachricht' : 'Neue Nachricht im Chat'}`,
      persistent: false,
      metadata: {
        role: senderRole
      }
    });
  }

  dayChange(fromDay: number, toDay: number) {
    return this.add({
      type: 'day_change',
      title: 'Tageswechsel',
      message: `Tag ${fromDay} beendet. Tag ${toDay} beginnt.`,
      persistent: false,
      metadata: {
        day: toDay
      }
    });
  }

  // === Query & Management ===
  getAll(): Notification[] {
    return Array.from(this.notifications.values())
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  getUnread(): Notification[] {
    return this.getAll().filter(n => !n.read);
  }

  getByType(type: Notification['type']): Notification[] {
    return this.getAll().filter(n => n.type === type);
  }

  markAsRead(id: string) {
    const notification = this.notifications.get(id);
    if (notification) {
      notification.read = true;
      this.notifications.set(id, notification);
    }
  }

  markAllAsRead() {
    this.notifications.forEach(notification => {
      notification.read = true;
    });
  }

  remove(id: string) {
    this.notifications.delete(id);
  }

  removeAll() {
    this.notifications.clear();
  }

  // === Event Subscription ===
  subscribe(handler: NotificationHandler): () => void {
    this.handlers.add(handler);
    return () => this.handlers.delete(handler);
  }

  // === Bulk Operations ===
  removeOldNotifications(daysOld: number = 1) {
    const cutoff = Date.now() - (daysOld * 24 * 60 * 60 * 1000);
    
    Array.from(this.notifications.entries()).forEach(([id, notification]) => {
      if (notification.timestamp.getTime() < cutoff && !notification.persistent) {
        this.notifications.delete(id);
      }
    });
  }

  // === Export ===
  export(): string {
    const notifications = this.getAll();
    return JSON.stringify(notifications, null, 2);
  }

  // === Statistics ===
  getStats(): {
    total: number;
    unread: number;
    byType: Record<Notification['type'], number>;
  } {
    const all = this.getAll();
    const stats: any = {
      total: all.length,
      unread: all.filter(n => !n.read).length,
      byType: {
        info: 0,
        success: 0,
        warning: 0,
        error: 0,
        decision: 0,
        chat: 0,
        day_change: 0
      }
    };

    all.forEach(n => {
      stats.byType[n.type]++;
    });

    return stats;
  }
}