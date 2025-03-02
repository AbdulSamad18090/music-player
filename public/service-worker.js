const CACHE_NAME = "music-app-cache-v1";
const API_CACHE_NAME = "music-api-cache-v1";
const STATIC_FILES = [
  "/",
  "/offline",
  "/developer",
  "/favicon.ico",
  "/manifest.json",
  "/lib/utils.js",
];

// Install event - Cache static files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_FILES))
  );
});

// Fetch event - Serve cached content & cache API responses
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Check if request is an API request
  if (url.origin === "https://saavn.dev") {
    event.respondWith(
      caches.open(API_CACHE_NAME).then(async (cache) => {
        try {
          const response = await fetch(event.request);
          cache.put(event.request, response.clone()); // Cache the API response
          return response;
        } catch (error) {
          return (
            cache.match(event.request) ||
            new Response("Offline", { status: 503 })
          );
        }
      })
    );
    return;
  }

  // Serve cached static assets
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response || fetch(event.request).catch(() => caches.match("/offline"))
      );
    })
  );
});

// Activate event - Cleanup old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (![CACHE_NAME, API_CACHE_NAME].includes(cache)) {
            return caches.delete(cache);
          }
        })
      )
    )
  );
});
