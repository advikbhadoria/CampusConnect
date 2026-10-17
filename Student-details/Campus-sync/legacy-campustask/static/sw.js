const CACHE_NAME = 'campustask-v1.0.0';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/static/css/main.css',
  '/static/js/app.js',
  '/static/js/api.js',
  '/static/js/pwa.js',
  '/static/js/views/landingView.js',
  '/static/js/views/marketplaceView.js',
  '/static/js/views/taskDetailView.js',
  '/static/js/views/postTaskView.js',
  '/static/js/views/seniorDashboardView.js',
  '/static/js/views/juniorDashboardView.js',
  '/static/js/views/chatView.js',
  '/static/js/views/walletView.js',
  '/static/js/views/adminDashboardView.js',
  '/static/js/views/profileView.js',
  '/static/js/views/notificationsView.js',
  '/static/js/views/offlineView.js',
  '/static/icons/icon-192.svg',
  '/static/icons/icon-512.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[CampusTask SW] Pre-caching static app shell');
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('[CampusTask SW] Pre-cache partial warning:', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log('[CampusTask SW] Deleting outdated cache:', name);
            return caches.delete(name);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // For API calls: try network first, then cache if available, or return custom offline response
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Clone and cache successful GET responses
          if (request.method === 'GET' && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(async () => {
          const cachedResponse = await caches.match(request);
          if (cachedResponse) {
            return cachedResponse;
          }
          return new Response(
            JSON.stringify({ offline: true, detail: 'Network offline. Showing cached campus records.' }),
            { headers: { 'Content-Type': 'application/json' }, status: 503 }
          );
        })
    );
    return;
  }

  // For static assets and HTML: Cache first, fallback to network
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        // Fetch fresh in background
        fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => cache.put(request, networkResponse));
          }
        }).catch(() => {});
        return cachedResponse;
      }

      return fetch(request).catch(async () => {
        // Fallback for navigation requests
        if (request.mode === 'navigate') {
          const indexCached = await caches.match('/index.html');
          if (indexCached) return indexCached;
        }
      });
    })
  );
});

// In-app / Push notification event handler
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : { title: 'CampusTask Notification', body: 'You have a new campus update.' };
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/static/icons/icon-192.svg',
      badge: '/static/icons/icon-192.svg',
      data: data.url || '/'
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      for (const client of clientList) {
        if (client.url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(event.notification.data || '/');
      }
    })
  );
});
