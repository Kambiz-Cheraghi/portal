
/* Engineering Software Portal - Offline Cache */

const V = 'portal-github-v2';
const BASE = new URL(self.registration.scope);

const PRE = [
  './',
  'config.js',
  'manifest.webmanifest',
  'favicon.svg',
  'konkoor/data.js',
  'konkoor/lib/pdf.min.mjs',
  'konkoor/lib/pdf.worker.min.mjs'
];

function inScope(url) {
  const u = new URL(url);
  return u.origin === BASE.origin &&
         u.pathname.startsWith(BASE.pathname);
}

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(V);
    let apps = [];

    try {
      const res = await fetch(
        new URL('config.js', BASE),
        { cache: 'no-cache' }
      );

      const t = await res.text();
      const W = {};
      new Function('window', t)(W);
      apps = W.PORTAL.apps.map(a => a.id);
    } catch (err) {}

    await Promise.all(
      PRE.concat(apps.map(a => a + '/'))
        .map(u => c.add(new Request(
          new URL(u, BASE),
          { cache: 'reload' }
        )).catch(() => {}))
    );

    await self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();

    await Promise.all(
      keys.filter(k =>
        k !== V &&
        (k === 'portal-v4' ||
         k.startsWith('portal-github-'))
      ).map(k => caches.delete(k))
    );

    await self.clients.claim();
  })());
});

self.addEventListener('fetch', e => {
  const r = e.request;

  if (r.method !== 'GET') return;
  if (!inScope(r.url)) return;
  if (r.headers.has('range')) return;

  const u = new URL(r.url);

  if (/\.pdf$/i.test(u.pathname)) return;
  if (/\/migrate\.html$/i.test(u.pathname)) return;

  e.respondWith((async () => {
    const c = await caches.open(V);

    try {
      const res = await fetch(
        new Request(r, { cache: 'no-cache' })
      );

      if (res.status === 200 &&
          inScope(res.url)) {
        await c.put(r, res.clone())
          .catch(() => {});
      }

      return res;

    } catch (err) {
      const hit = await c.match(r, {
        ignoreSearch: true
      });

      if (hit) return hit;

      throw err;
    }
  })());
});
