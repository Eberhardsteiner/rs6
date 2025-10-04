// src/services/offlinePersistence.ts
import type { QueuedDecision } from './decisionQueueService';
import type { ChatMessage } from './chatService';
import type { GameState } from '@/core/engine/gameEngine';

interface OfflineQueueItem {
  id: string;
  type: 'decision' | 'message' | 'state_update';
  data: any;
  timestamp: number;
  retryCount: number;
  gameId: string;
}

export class OfflinePersistence {
  private static instance: OfflinePersistence;
  private db: IDBDatabase | null = null;
  private readonly DB_NAME = 'crisis_sim_offline';
  private readonly DB_VERSION = 1;
  private readonly STORES = {
    queue: 'offline_queue',
    decisions: 'cached_decisions',
    messages: 'cached_messages',
    gameState: 'cached_game_state',
    assets: 'cached_assets'
  };

  private constructor() {
    this.initializeDB();
  }

  static getInstance(): OfflinePersistence {
    if (!OfflinePersistence.instance) {
      OfflinePersistence.instance = new OfflinePersistence();
    }
    return OfflinePersistence.instance;
  }

  // === Database Initialization ===
  private async initializeDB(): Promise<void> {
    if (!('indexedDB' in window)) {
      console.warn('IndexedDB not supported');
      return;
    }

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);

      request.onerror = () => {
        console.error('Failed to open IndexedDB:', request.error);
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        console.log('IndexedDB initialized');
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Create stores if they don't exist
        if (!db.objectStoreNames.contains(this.STORES.queue)) {
          const queueStore = db.createObjectStore(this.STORES.queue, { 
            keyPath: 'id' 
          });
          queueStore.createIndex('gameId', 'gameId', { unique: false });
          queueStore.createIndex('timestamp', 'timestamp', { unique: false });
        }

        if (!db.objectStoreNames.contains(this.STORES.decisions)) {
          const decisionsStore = db.createObjectStore(this.STORES.decisions, { 
            keyPath: 'id' 
          });
          decisionsStore.createIndex('gameId', 'game_id', { unique: false });
          decisionsStore.createIndex('day', 'day', { unique: false });
        }

        if (!db.objectStoreNames.contains(this.STORES.messages)) {
          const messagesStore = db.createObjectStore(this.STORES.messages, { 
            keyPath: 'id' 
          });
          messagesStore.createIndex('gameId', 'game_id', { unique: false });
          messagesStore.createIndex('timestamp', 'created_at', { unique: false });
        }

        if (!db.objectStoreNames.contains(this.STORES.gameState)) {
          const stateStore = db.createObjectStore(this.STORES.gameState, { 
            keyPath: 'gameId' 
          });
          stateStore.createIndex('lastUpdated', 'lastUpdated', { unique: false });
        }

        if (!db.objectStoreNames.contains(this.STORES.assets)) {
          db.createObjectStore(this.STORES.assets, { keyPath: 'url' });
        }
      };
    });
  }

  // === Offline Queue Management ===
  async addToOfflineQueue(item: Omit<OfflineQueueItem, 'id' | 'timestamp' | 'retryCount'>): Promise<void> {
    if (!this.db) await this.initializeDB();
    if (!this.db) return;

    const queueItem: OfflineQueueItem = {
      ...item,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      retryCount: 0
    };

    const transaction = this.db.transaction([this.STORES.queue], 'readwrite');
    const store = transaction.objectStore(this.STORES.queue);
    
    return new Promise((resolve, reject) => {
      const request = store.add(queueItem);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getOfflineQueue(gameId: string): Promise<OfflineQueueItem[]> {
    if (!this.db) await this.initializeDB();
    if (!this.db) return [];

    const transaction = this.db.transaction([this.STORES.queue], 'readonly');
    const store = transaction.objectStore(this.STORES.queue);
    const index = store.index('gameId');
    
    return new Promise((resolve, reject) => {
      const request = index.getAll(gameId);
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  async removeFromOfflineQueue(id: string): Promise<void> {
    if (!this.db) return;

    const transaction = this.db.transaction([this.STORES.queue], 'readwrite');
    const store = transaction.objectStore(this.STORES.queue);
    
    return new Promise((resolve, reject) => {
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async updateQueueItemRetry(id: string): Promise<void> {
    if (!this.db) return;

    const transaction = this.db.transaction([this.STORES.queue], 'readwrite');
    const store = transaction.objectStore(this.STORES.queue);
    
    const getRequest = store.get(id);
    
    return new Promise((resolve, reject) => {
      getRequest.onsuccess = () => {
        const item = getRequest.result;
        if (item) {
          item.retryCount++;
          const updateRequest = store.put(item);
          updateRequest.onsuccess = () => resolve();
          updateRequest.onerror = () => reject(updateRequest.error);
        } else {
          resolve();
        }
      };
      getRequest.onerror = () => reject(getRequest.error);
    });
  }

  // === Decision Caching ===
  async cacheDecision(decision: QueuedDecision): Promise<void> {
    if (!this.db) await this.initializeDB();
    if (!this.db) return;

    const transaction = this.db.transaction([this.STORES.decisions], 'readwrite');
    const store = transaction.objectStore(this.STORES.decisions);
    
    return new Promise((resolve, reject) => {
      const request = store.put(decision);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getCachedDecisions(gameId: string, day?: number): Promise<QueuedDecision[]> {
    if (!this.db) await this.initializeDB();
    if (!this.db) return [];

    const transaction = this.db.transaction([this.STORES.decisions], 'readonly');
    const store = transaction.objectStore(this.STORES.decisions);
    
    return new Promise((resolve, reject) => {
      let request: IDBRequest;
      
      if (day !== undefined) {
        const index = store.index('day');
        request = index.getAll(day);
      } else {
        const index = store.index('gameId');
        request = index.getAll(gameId);
      }
      
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  // === Message Caching ===
  async cacheMessages(messages: ChatMessage[]): Promise<void> {
    if (!this.db) await this.initializeDB();
    if (!this.db) return;

    const transaction = this.db.transaction([this.STORES.messages], 'readwrite');
    const store = transaction.objectStore(this.STORES.messages);
    
    const promises = messages.map(message => {
      return new Promise<void>((resolve, reject) => {
        const request = store.put(message);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    });
    
    await Promise.all(promises);
  }

  async getCachedMessages(gameId: string, limit: number = 50): Promise<ChatMessage[]> {
    if (!this.db) await this.initializeDB();
    if (!this.db) return [];

    const transaction = this.db.transaction([this.STORES.messages], 'readonly');
    const store = transaction.objectStore(this.STORES.messages);
    const index = store.index('gameId');
    
    return new Promise((resolve, reject) => {
      const request = index.getAll(gameId);
      request.onsuccess = () => {
        const messages = request.result || [];
        // Sort by timestamp and limit
        messages.sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        resolve(messages.slice(0, limit));
      };
      request.onerror = () => reject(request.error);
    });
  }

  // === Game State Caching ===
  async cacheGameState(gameId: string, state: GameState): Promise<void> {
    if (!this.db) await this.initializeDB();
    if (!this.db) return;

    const cacheEntry = {
      gameId,
      state,
      lastUpdated: Date.now(),
      version: 1
    };

    const transaction = this.db.transaction([this.STORES.gameState], 'readwrite');
    const store = transaction.objectStore(this.STORES.gameState);
    
    return new Promise((resolve, reject) => {
      const request = store.put(cacheEntry);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getCachedGameState(gameId: string): Promise<GameState | null> {
    if (!this.db) await this.initializeDB();
    if (!this.db) return null;

    const transaction = this.db.transaction([this.STORES.gameState], 'readonly');
    const store = transaction.objectStore(this.STORES.gameState);
    
    return new Promise((resolve, reject) => {
      const request = store.get(gameId);
      request.onsuccess = () => {
        const result = request.result;
        if (result && result.state) {
          // Check if cache is not too old (e.g., 1 hour)
          const oneHour = 60 * 60 * 1000;
          if (Date.now() - result.lastUpdated < oneHour) {
            resolve(result.state);
          } else {
            resolve(null);
          }
        } else {
          resolve(null);
        }
      };
      request.onerror = () => reject(request.error);
    });
  }

  // === Asset Caching ===
  async cacheAsset(url: string, data: Blob): Promise<void> {
    if (!this.db) await this.initializeDB();
    if (!this.db) return;

    const transaction = this.db.transaction([this.STORES.assets], 'readwrite');
    const store = transaction.objectStore(this.STORES.assets);
    
    const asset = {
      url,
      data,
      cachedAt: Date.now()
    };
    
    return new Promise((resolve, reject) => {
      const request = store.put(asset);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getCachedAsset(url: string): Promise<Blob | null> {
    if (!this.db) await this.initializeDB();
    if (!this.db) return null;

    const transaction = this.db.transaction([this.STORES.assets], 'readonly');
    const store = transaction.objectStore(this.STORES.assets);
    
    return new Promise((resolve, reject) => {
      const request = store.get(url);
      request.onsuccess = () => {
        const result = request.result;
        resolve(result ? result.data : null);
      };
      request.onerror = () => reject(request.error);
    });
  }

  // === Cleanup & Maintenance ===
  async clearOldData(daysToKeep: number = 7): Promise<void> {
    if (!this.db) return;

    const cutoff = Date.now() - (daysToKeep * 24 * 60 * 60 * 1000);

    // Clear old queue items
    const transaction = this.db.transaction([
      this.STORES.queue,
      this.STORES.messages,
      this.STORES.gameState
    ], 'readwrite');

    // Clear old queue items
    const queueStore = transaction.objectStore(this.STORES.queue);
    const queueIndex = queueStore.index('timestamp');
    const queueRequest = queueIndex.openCursor(IDBKeyRange.upperBound(cutoff));
    
    queueRequest.onsuccess = () => {
      const cursor = queueRequest.result;
      if (cursor) {
        cursor.delete();
        cursor.continue();
      }
    };

    // Clear old game states
    const stateStore = transaction.objectStore(this.STORES.gameState);
    const stateIndex = stateStore.index('lastUpdated');
    const stateRequest = stateIndex.openCursor(IDBKeyRange.upperBound(cutoff));
    
    stateRequest.onsuccess = () => {
      const cursor = stateRequest.result;
      if (cursor) {
        cursor.delete();
        cursor.continue();
      }
    };
  }

  async getStorageUsage(): Promise<{ usage: number; quota: number }> {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      const estimate = await navigator.storage.estimate();
      return {
        usage: estimate.usage || 0,
        quota: estimate.quota || 0
      };
    }
    return { usage: 0, quota: 0 };
  }

  async clearAllData(): Promise<void> {
    if (!this.db) return;

    const transaction = this.db.transaction(
      Object.values(this.STORES),
      'readwrite'
    );

    for (const storeName of Object.values(this.STORES)) {
      const store = transaction.objectStore(storeName);
      store.clear();
    }
  }
}