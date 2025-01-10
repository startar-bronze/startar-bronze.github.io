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
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Activation du service worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Deleting old cache:", cache);
            return caches.delete(cache);
          }
        })
      )
    )
  );
});

// Interception des requêtes réseau
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
