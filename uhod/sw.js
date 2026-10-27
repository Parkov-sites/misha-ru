const P = "misha-uhod-", C = P + "1793112140";
self.addEventListener("install", e => { e.waitUntil(caches.open(C).then(c => c.addAll(["./", "manifest.webmanifest", "apple-touch-icon.png", "icon-192.png", "../fonts/InterTight-cyrillic.woff2", "../fonts/Literata-cyrillic.woff2"]))); self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith(P) && k !== C).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(r => { const copy = r.clone(); caches.open(C).then(c => c.put(e.request, copy)); return r; })
    .catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => r || caches.match("./"))));
});
