// src/services/realtimeSync.ts
// Zentraler Service für Supabase Realtime-Subscriptions

import { supabase } from './supabaseClient';
import type { RealtimeChannel, RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import { errorHandler } from '@/utils/errorHandler';

export type ChangeType = 'INSERT' | 'UPDATE' | 'DELETE';

export interface SubscriptionConfig<T = any> {
  table: string;
  filter?: string;
  event?: ChangeType | '*';
  onInsert?: (payload: T) => void;
  onUpdate?: (payload: T) => void;
  onDelete?: (payload: { old: T }) => void;
  onChange?: (payload: RealtimePostgresChangesPayload<T>) => void;
  onError?: (error: Error) => void;
  schema?: string;
}

export interface Subscription {
  id: string;
  channel: RealtimeChannel;
  config: SubscriptionConfig;
  unsubscribe: () => Promise<void>;
}

class RealtimeSyncManager {
  private subscriptions: Map<string, Subscription> = new Map();
  private subscriptionCounter = 0;

  subscribe<T = any>(config: SubscriptionConfig<T>): Subscription {
    const subscriptionId = `sub_${++this.subscriptionCounter}_${config.table}`;

    const channelName = `${config.table}_${subscriptionId}`;
    const channel = supabase.channel(channelName);

    const schema = config.schema || 'public';
    const table = config.table;
    const event = config.event || '*';

    let postgresChanges = channel.on(
      'postgres_changes',
      {
        event,
        schema,
        table,
        filter: config.filter
      },
      (payload: RealtimePostgresChangesPayload<T>) => {
        try {
          if (config.onChange) {
            config.onChange(payload);
          }

          switch (payload.eventType) {
            case 'INSERT':
              if (config.onInsert && payload.new) {
                config.onInsert(payload.new as T);
              }
              break;
            case 'UPDATE':
              if (config.onUpdate && payload.new) {
                config.onUpdate(payload.new as T);
              }
              break;
            case 'DELETE':
              if (config.onDelete && payload.old) {
                config.onDelete({ old: payload.old as T });
              }
              break;
          }
        } catch (error) {
          errorHandler.logError('realtimeSync', `Error in subscription handler for ${table}`, error);
          if (config.onError) {
            config.onError(error instanceof Error ? error : new Error(String(error)));
          }
        }
      }
    );

    channel.subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        console.log(`[RealtimeSync] Subscribed to ${table}`);
      } else if (status === 'CHANNEL_ERROR') {
        errorHandler.logError('realtimeSync', `Channel error for ${table}`, new Error('Channel error'));
      } else if (status === 'TIMED_OUT') {
        errorHandler.logError('realtimeSync', `Subscription timed out for ${table}`, new Error('Timeout'));
      } else if (status === 'CLOSED') {
        console.log(`[RealtimeSync] Channel closed for ${table}`);
      }
    });

    const unsubscribe = async () => {
      await this.unsubscribe(subscriptionId);
    };

    const subscription: Subscription = {
      id: subscriptionId,
      channel,
      config,
      unsubscribe
    };

    this.subscriptions.set(subscriptionId, subscription);

    return subscription;
  }

  async unsubscribe(subscriptionId: string): Promise<void> {
    const subscription = this.subscriptions.get(subscriptionId);

    if (!subscription) {
      console.warn(`[RealtimeSync] Subscription ${subscriptionId} not found`);
      return;
    }

    try {
      await supabase.removeChannel(subscription.channel);
      this.subscriptions.delete(subscriptionId);
      console.log(`[RealtimeSync] Unsubscribed from ${subscription.config.table}`);
    } catch (error) {
      errorHandler.logError('realtimeSync', `Error unsubscribing from ${subscription.config.table}`, error);
    }
  }

  async unsubscribeAll(): Promise<void> {
    const unsubscribePromises = Array.from(this.subscriptions.keys()).map(id =>
      this.unsubscribe(id)
    );

    await Promise.all(unsubscribePromises);
    console.log('[RealtimeSync] All subscriptions removed');
  }

  getActiveSubscriptions(): Subscription[] {
    return Array.from(this.subscriptions.values());
  }

  getSubscriptionCount(): number {
    return this.subscriptions.size;
  }

  isSubscribed(subscriptionId: string): boolean {
    return this.subscriptions.has(subscriptionId);
  }
}

export const realtimeSyncManager = new RealtimeSyncManager();

export function subscribeToTable<T = any>(config: SubscriptionConfig<T>): Subscription {
  return realtimeSyncManager.subscribe(config);
}

export async function unsubscribeFromTable(subscriptionId: string): Promise<void> {
  await realtimeSyncManager.unsubscribe(subscriptionId);
}

export async function unsubscribeAll(): Promise<void> {
  await realtimeSyncManager.unsubscribeAll();
}

export interface BatchLoadOptions {
  pageSize?: number;
  maxConcurrent?: number;
  onProgress?: (loaded: number, total: number) => void;
}

export async function batchLoad<T>(
  table: string,
  options: BatchLoadOptions = {}
): Promise<T[]> {
  const {
    pageSize = 100,
    maxConcurrent = 3,
    onProgress
  } = options;

  try {
    const { count } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true });

    if (!count || count === 0) {
      return [];
    }

    const totalPages = Math.ceil(count / pageSize);
    const results: T[] = [];

    for (let i = 0; i < totalPages; i += maxConcurrent) {
      const pagePromises = [];

      for (let j = 0; j < maxConcurrent && (i + j) < totalPages; j++) {
        const pageIndex = i + j;
        const from = pageIndex * pageSize;
        const to = from + pageSize - 1;

        const promise = supabase
          .from(table)
          .select('*')
          .range(from, to)
          .then(({ data, error }) => {
            if (error) throw error;
            return data as T[];
          });

        pagePromises.push(promise);
      }

      const pageResults = await Promise.all(pagePromises);
      const flattened = pageResults.flat();
      results.push(...flattened);

      if (onProgress) {
        onProgress(results.length, count);
      }
    }

    return results;
  } catch (error) {
    errorHandler.logError('realtimeSync', `Error batch loading from ${table}`, error);
    throw error;
  }
}

export interface ThrottledSubscriptionConfig<T> extends SubscriptionConfig<T> {
  throttleMs?: number;
}

export function subscribeThrottled<T = any>(
  config: ThrottledSubscriptionConfig<T>
): Subscription {
  const throttleMs = config.throttleMs || 1000;
  let lastCall = 0;
  let timeoutId: number | null = null;

  const originalOnChange = config.onChange;
  const originalOnInsert = config.onInsert;
  const originalOnUpdate = config.onUpdate;
  const originalOnDelete = config.onDelete;

  const throttledConfig: SubscriptionConfig<T> = {
    ...config,
    onChange: originalOnChange ? (payload) => {
      const now = Date.now();

      if (now - lastCall >= throttleMs) {
        lastCall = now;
        originalOnChange(payload);
      } else {
        if (timeoutId !== null) {
          clearTimeout(timeoutId);
        }

        timeoutId = window.setTimeout(() => {
          lastCall = Date.now();
          originalOnChange(payload);
          timeoutId = null;
        }, throttleMs - (now - lastCall));
      }
    } : undefined,
    onInsert: originalOnInsert ? (payload) => {
      const now = Date.now();
      if (now - lastCall >= throttleMs) {
        lastCall = now;
        originalOnInsert(payload);
      }
    } : undefined,
    onUpdate: originalOnUpdate ? (payload) => {
      const now = Date.now();
      if (now - lastCall >= throttleMs) {
        lastCall = now;
        originalOnUpdate(payload);
      }
    } : undefined,
    onDelete: originalOnDelete ? (payload) => {
      const now = Date.now();
      if (now - lastCall >= throttleMs) {
        lastCall = now;
        originalOnDelete(payload);
      }
    } : undefined
  };

  return realtimeSyncManager.subscribe(throttledConfig);
}

export function useRealtimeSync<T = any>(
  config: SubscriptionConfig<T>,
  dependencies: any[] = []
): Subscription | null {
  const [subscription, setSubscription] = React.useState<Subscription | null>(null);

  React.useEffect(() => {
    const sub = subscribeToTable(config);
    setSubscription(sub);

    return () => {
      sub.unsubscribe();
    };
  }, dependencies);

  return subscription;
}

import React from 'react';

export default realtimeSyncManager;
