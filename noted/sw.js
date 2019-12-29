self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('noted').then(cache => {
      return cache.addAll([
        '/',
		'/index.html',
		'/style.css',
		'/game.js'
		
      ])
      .then(() => self.skipWaiting());
    })
  )
});

self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
  );
});