// Retire the old portal's offline cache without touching unrelated sites' caches.
self.addEventListener('install',e=>e.waitUntil(self.skipWaiting()));
self.addEventListener('activate',e=>e.waitUntil((async()=>{await caches.delete('portal-v4');await self.clients.claim();await self.registration.unregister();})()));
