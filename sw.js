// Bump this on every deploy that changes any cached file — it's what
// forces the browser to detect an updated sw.js and refresh the cache.
var CACHE_NAME = "one-v2";

var PRECACHE_URLS = [
  "./",
  "./index.html",
  "./styles.css",
  "./scripts.js",
  "./manifest.json",
  "./favicon.ico",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon.png",
  "./libs/oneschema.js",
  "./libs/scripts.js",
  "./libs/drag.js",
  "./libs/styles.css",
  "./export/index.html",
  "./export/scripts.js",
  "./export/styles.css",
  "./import/index.html",
  "./import/scripts.js",
  "./import/styles.css",
  "./manylists/index.html",
  "./manylists/scripts.js",
  "./manylists/styles.css",
  "./noted/index.html",
  "./noted/game.js",
  "./noted/style.css",
  "./onelist/index.html",
  "./onelist/scripts.js",
  "./onelist/styles.css",
  "./oneschema/index.html",
  "./oneschema/scripts.js",
  "./oneschema/styles.css",
  "./onestatus/index.html",
  "./onestatus/scripts.js",
  "./onestatus/styles.css",
  "./textboard/index.html",
  "./textboard/scripts.js",
  "./textboard/styles.css",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (e) => {
  // HTML pages: always try the network first so edits show up on next load
  // without waiting on the SW/cache-name update cycle. Cache is only the
  // offline fallback.
  if (e.request.mode === "navigate") {
    e.respondWith(
      fetch(e.request, { cache: "no-store" })
        .then((response) => {
          var copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, copy));
          return response;
        })
        .catch(() => caches.match(e.request, { ignoreSearch: true })),
    );
    return;
  }

  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then((cached) => {
      if (cached) return cached;
      return fetch(e.request).then((response) => {
        if (response.ok) {
          var copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, copy));
        }
        return response;
      });
    }),
  );
});
