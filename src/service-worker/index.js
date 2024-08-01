const CACHE_NAME = `CACHE-${VERSION}`;

self.addEventListener("install", (event) => {
  const addFilesToCache = async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(ASSETS);
  };

  event.waitUntil(addFilesToCache());
});

self.addEventListener("activate", (event) => {
  const deleteOldCaches = async () => {
    for (const key of await caches.keys()) {
      if (key !== CACHE_NAME) {
        await caches.delete(key);
      }
    }
  };

  event.waitUntil(deleteOldCaches());
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const respond = async () => {
    const cachedResponse = await caches.match(event.request);
    return cachedResponse || fetch(event.request);
  };

  event.respondWith(respond());
});
