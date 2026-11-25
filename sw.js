/* کش آفلاین: ابتدا شبکه (تا به‌روزرسانی‌ها فوراً دیده شوند)، در نبود اینترنت از کش */
const V = 'portal-v4';
const PRE = ['./', 'config.js', 'manifest.webmanifest', 'favicon.svg', 'konkoor/data.js', 'konkoor/lib/pdf.min.mjs', 'konkoor/lib/pdf.worker.min.mjs'];
self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(V);
    let apps = [];
    try { const t = await (await fetch('config.js', { cache: 'no-cache' })).text(); const W = {}; new Function('window', t)(W); apps = W.PORTAL.apps.map(a => a.id); } catch (e) {}
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
  if (r.headers.has('range') || /\.pdf(\?|$)/i.test(r.url)) return;   /* پی‌دی‌اف‌ها را مرورگر خودش بگیرد */
  e.respondWith((async () => {
    const c = await caches.open(V);
    try {
      /* no-cache: هر بار با سرور بررسی شود تا نسخه‌ی قدیمیِ کش مرورگر نیاید */
      const res = await fetch(r.headers.has('range') ? r : new Request(r, { cache: 'no-cache' }));
      if (res && res.status === 200 && !r.headers.has('range')) c.put(r, res.clone()).catch(() => {});
      return res;
    } catch (err) {
      const hit = await c.match(r, { ignoreSearch: true });
      if (hit) return hit;
      if (r.mode === 'navigate') { const home = await c.match('./'); if (home) return home; }
      throw err;
    }
  })());
});
