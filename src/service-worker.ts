
/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

// This service worker can be customized
// For details, visit https://developers.google.com/web/tools/workbox/modules/workbox-precaching

const CACHE_NAME = 'mr-garagewala-v1';

// List of essential files to cache for offline functionality
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico'
];

// Install a service worker
self.addEventListener('install', (event) => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );

  // Force the waiting service worker to become the active service worker
  // @ts-ignore
  self.skipWaiting();
});

// Cache and return requests
self.addEventListener('fetch', (event) => {
  // @ts-ignore
  event.respondWith(
    fetch(event.request)
      .then((res) => {
        // Make copy/clone of response
        const resClone = res.clone();
        
        // Open cache
        caches.open(CACHE_NAME).then((cache) => {
          // Add response to cache
          cache.put(event.request, resClone);
        });
        
        return res;
      })
      .catch(() => caches.match(event.request).then((res) => res))
  );
});

// Update a service worker
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
          return null;
        })
      );
    })
  );
});

// Offline fallback
self.addEventListener('fetch', (event) => {
  // @ts-ignore
  if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
    // @ts-ignore
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match('/offline.html');
      })
    );
  }
});

// Expose as module for TypeScript
export {};
