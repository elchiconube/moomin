const CACHE_LIMIT = 100;

function clearCache(cacheName, cacheLimit) {
  caches.open(cacheName)
    .then(cache => {
      return cache.keys()
        .then(keys => {
          if (keys.length > cacheLimit) {
            cache.delete(keys[0])
              .then(clearCache(cacheName, cacheLimit))
          };
        });
    });
};

function updateDynamicCache(dynamicCache, req, res) {
  if (res.ok) {
    return caches.open(dynamicCache).then(cache => {
      cache.put(req, res.clone());
      clearCache(dynamicCache, CACHE_LIMIT);
      return res.clone();
    });
  } else {
    console.log(res)
    return res;
  }
};