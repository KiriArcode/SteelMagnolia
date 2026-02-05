const CACHE_NAME = 'steelmagnoliaPWA-v10';
const urlsToCache = [
  './',
  './index.html',
  './css/custom.css',
  './js/app.js',
  './js/data.js',
  './js/storage.js',
  './icons/exercises.js',
  './manifest.json'
];

// Install
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .catch((err) => console.warn('Cache addAll failed:', err))
  );
  self.skipWaiting();
});

// Fetch - Network first strategy для HTML, cache first для остального
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Для HTML файлов - сначала сеть, потом кеш
  if (event.request.destination === 'document' || url.pathname === '/' || url.pathname.endsWith('.html')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Клонируем ответ для кеширования
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch(() => caches.match(event.request))
    );
  } else {
    // Для остальных файлов - сначала кеш, потом сеть
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          if (response) {
            return response;
          }
          return fetch(event.request).then((response) => {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
            return response;
          });
        })
    );
  }
});

// Activate
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});
