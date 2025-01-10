const CACHE_NAME = "startarcoins-cache-v1";
const urlsToCache = [
  "/accueil.html",
  "/manifest.json",
  "https://github.com/startar-bronze/startar-bronze.github.io/blob/main/STARTARCOINS%20LOGO%202.png?raw=true",
  "https://github.com/startar-bronze/startar-bronze.github.io/blob/main/PNG%20KHAC%20LOGO.png?raw=true",
  "https://github.com/startar-bronze/startar-bronze.github.io/blob/main/NEW%20STRB%20STARTARBRONZE%20NSTRB.jpg?raw=true"
];

// Installation du service worker
self.addEventListener("install", (event) => {
  console.log("[Service Worker] Install event");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Caching all necessary files");
      return cache.addAll(urlsToCache);
    })
  );
});

// Activation du service worker
self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activate event");
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("[Service Worker] Deleting old cache:", cache);
            return caches.delete(cache);
          }
        })
      )
    )
  );
});

// Interception des requêtes réseau
self.addEventListener("fetch", (event) => {
  console.log("[Service Worker] Fetch event for:", event.request.url);
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        console.log("[Service Worker] Serving cached:", event.request.url);
      } else {
        console.log("[Service Worker] Fetching from network:", event.request.url);
      }
      return response || fetch(event.request);
    })
  );
});
