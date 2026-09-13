// Minimal service worker - just enough to make the site an installable PWA
// (Chrome/Android require a registered service worker with a fetch handler
// for "Add to Home Screen" to install a standalone app icon instead of a
// plain browser shortcut).

const CACHE_NAME = 'hmc-cache-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Simple network-first strategy; falls back to cache if offline.
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
