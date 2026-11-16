/* کش آفلاین: ابتدا شبکه (تا به‌روزرسانی‌ها فوراً دیده شوند)، در نبود اینترنت از کش */
const V = 'portal-v1';
const PRE = ['./', 'config.js', 'manifest.webmanifest', 'favicon.svg'];
self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(V);
    let apps = [];
    try { const t = await (await fetch('config.js', { cache: 'no-cache' })).text(); apps = [...t.matchAll(/id:\s*'([\w-]+)'/g)].map(m => m[1]).filter(x => !['analysis','design','math'].includes(x)); } catch (e) {}
    await Promise.all(PRE.concat(apps.map(a => a + '/')).map(u => c.add(u).catch(() => {})));
    self.skipWaiting();
  })());
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET' || !r.url.startsWith('http')) return;
  e.respondWith((async () => {
    const c = await caches.open(V);
    try {
      const res = await fetch(r);
      if (res && (res.ok || res.type === 'opaque')) c.put(r, res.clone());
      return res;
    } catch (err) {
      const hit = await c.match(r, { ignoreSearch: true });
      if (hit) return hit;
      if (r.mode === 'navigate') { const home = await c.match('./'); if (home) return home; }
      throw err;
    }
  })());
});
