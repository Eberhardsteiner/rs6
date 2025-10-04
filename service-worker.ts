 // public/service-worker.ts
/// <reference lib="webworker" />

declare const self: ServiceWorkerGlobalScope;

const CACHE_VERSION = 'crisis-sim-v1';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;
const API_CACHE = `${CACHE_VERSION}-api`;

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  // Add your static assets here
];

// API endpoints to cache
const API_ENDPOINTS = [
  '/api/games',
  '/api/players',
  '/api/decisions',
  '/api/messages'
];

// === Install Event ===
self.addEventListener('install', (event: ExtendableEvent) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => {
      console.log('Service Worker: Caching static assets');
      return cache.addAll(STATIC_ASSETS);
    }).then(() => {
      // Skip waiting to activate immediately
      return self.skipWaiting();
    })
  );
});

// === Activate Event ===
self.addEventListener('activate', (event: ExtendableEvent) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    // Clean up old caches
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => {
            return cacheName.startsWith('crisis-sim-') &&
                   !cacheName.startsWith(CACHE_VERSION);
          })
          .map(cacheName => {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          })
      );
    }).then(() => {
      // Take control of all clients immediately
      return self.clients.claim();
    })
  );
});

// === Fetch Event ===
self.addEventListener('fetch', (event: FetchEvent) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Handle different types of requests
  if (url.origin === location.origin) {
    // Same-origin requests
    if (request.destination === 'document' || 
        request.mode === 'navigate') {
      // HTML pages - network first, cache fallback
      event.respondWith(networkFirst(request, STATIC_CACHE));
    } else if (request.destination === 'image' ||
               request.destination === 'font' ||
               request.destination === 'style' ||
               request.destination === 'script') {
      // Static assets - cache first, network fallback
      event.respondWith(cacheFirst(request, STATIC_CACHE));
    } else {
      // Other same-origin requests
      event.respondWith(networkFirst(request, DYNAMIC_CACHE));
    }
  } else if (url.hostname === 'supabase.co' || 
             url.hostname.endsWith('.supabase.co')) {
    // Supabase API calls - network first with cache fallback
    event.respondWith(networkFirstWithCache(request, API_CACHE, 5 * 60 * 1000)); // 5 min cache
  } else {
    // External resources - network only
    event.respondWith(fetch(request));
  }
});

// === Cache Strategies ===

// Cache first, falling back to network
async function cacheFirst(
  request: Request,
  cacheName: string
): Promise<Response> {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Return offline page if available
    const offlinePage = await cache.match('/offline.html');
    if (offlinePage) {
      return offlinePage;
    }
    
    throw error;
  }
}

// Network first, falling back to cache
async function networkFirst(
  request: Request,
  cacheName: string
): Promise<Response> {
  const cache = await caches.open(cacheName);
  
  try {
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page if available
    const offlinePage = await cache.match('/offline.html');
    if (offlinePage) {
      return offlinePage;
    }
    
    throw error;
  }
}

// Network first with time-based cache
async function networkFirstWithCache(
  request: Request,
  cacheName: string,
  maxAge: number
): Promise<Response> {
  const cache = await caches.open(cacheName);
  
  try {
    const networkResponse = await fetch(request);
    
    // Cache successful responses with timestamp
    if (networkResponse.ok) {
      const responseWithTimestamp = await addTimestamp(networkResponse.clone());
      cache.put(request, responseWithTimestamp);
    }
    
    return networkResponse;
  } catch (error) {
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      const timestamp = await getTimestamp(cachedResponse);
      const age = Date.now() - timestamp;
      
      // Return cached response if within maxAge
      if (age < maxAge) {
        return cachedResponse;
      }
    }
    
    throw error;
  }
}

// Add timestamp to response headers
async function addTimestamp(response: Response): Promise<Response> {
  const headers = new Headers(response.headers);
  headers.set('sw-cache-timestamp', Date.now().toString());
  
  const blob = await response.blob();
  return new Response(blob, {
    status: response.status,
    statusText: response.statusText,
    headers: headers
  });
}

// Get timestamp from response headers
async function getTimestamp(response: Response): Promise<number> {
  const timestamp = response.headers.get('sw-cache-timestamp');
  return timestamp ? parseInt(timestamp, 10) : 0;
}

// === Background Sync ===
self.addEventListener('sync', (event: any) => {
  if (event.tag === 'sync-decisions') {
    event.waitUntil(syncDecisions());
  } else if (event.tag === 'sync-messages') {
    event.waitUntil(syncMessages());
  }
});

async function syncDecisions(): Promise<void> {
  // Get queued decisions from IndexedDB and sync
  const clients = await self.clients.matchAll();
  
  for (const client of clients) {
    client.postMessage({
      type: 'SYNC_STATUS',
      message: 'Syncing decisions...'
    });
  }
  
  // Actual sync logic would go here
  console.log('Background sync: Decisions');
}

async function syncMessages(): Promise<void> {
  // Get queued messages from IndexedDB and sync
  const clients = await self.clients.matchAll();
  
  for (const client of clients) {
    client.postMessage({
      type: 'SYNC_STATUS',
      message: 'Syncing messages...'
    });
  }
  
  // Actual sync logic would go here
  console.log('Background sync: Messages');
}

// === Push Notifications ===
self.addEventListener('push', (event: any) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Crisis Simulation';
  const options = {
    body: data.body || 'Sie haben eine neue Benachrichtigung',
    icon: '/icon-192x192.png',
    badge: '/badge-72x72.png',
    vibrate: [200, 100, 200],
    data: data,
    actions: data.actions || []
  };
  
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', (event: any) => {
  event.notification.close();
  
  const data = event.notification.data;
  const url = data.url || '/';
  
  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then(windowClients => {
      // Check if there's already a window/tab open
      for (const client of windowClients) {
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      
      // Open new window if not found
      if (self.clients.openWindow) {
        return self.clients.openWindow(url);
      }
    })
  );
});

// === Message Handler ===
self.addEventListener('message', (event: MessageEvent) => {
  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  } else if (event.data.type === 'CACHE_URLS') {
    cacheUrls(event.data.urls);
  }
});

async function cacheUrls(urls: string[]): Promise<void> {
  const cache = await caches.open(DYNAMIC_CACHE);
  await cache.addAll(urls);
} 