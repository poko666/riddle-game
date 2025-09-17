const CACHE_NAME = "riddle-game-v1";
const urlsToCache = [
  "index.html",
  "manifest.json",
  "riddles.json",
  "icon-192.png",
  "icon-512.png"
];

// 安裝：把核心檔案快取
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

// 啟動：清理舊快取
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      )
    )
  );
});

// 攔截：先用快取，沒有才去網路拿
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
