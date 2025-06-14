const CACHE_NAME = "budget-expense-cache-v2";

const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  "/dashboard",
  "/add",
  "/profile",
  "/settings",
  "/login",
  "/register"
];

// Install Event: cache essential routes and files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate Event: clean up old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      )
    )
  );
});

// Fetch Event: respond with cached version or fetch & cache
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Serve from cache if present
      if (response) {
        return response;
      }

      // Otherwise fetch from network and optionally cache
      return fetch(event.request)
        .then(res => {
          // Cache new GET responses only
          if (
            event.request.method === "GET" &&
            res.status === 200 &&
            !event.request.url.startsWith("chrome-extension") &&
            res.type === "basic"
          ) {
            const clonedRes = res.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, clonedRes);
            });
          }
          return res;
        })
        .catch(() => {
          // If offline and navigation request, return cached index
          if (event.request.mode === "navigate") {
            return caches.match("/index.html");
          }
        });
    })
  );
});
