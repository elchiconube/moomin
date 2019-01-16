importScripts('sw-utils.js');

const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1';

const APP_SHELL = [
  'css/style.css',
  'img/help.svg',
  'img/favicon.ico',
  'js/app.js',
  'sw-utils.js'
];

const APP_SHELL_INMUTABLE = [
  'fonts/Barlow-Regular.woff2',
  'fonts/Barlow-Medium.woff2'
];


self.addEventListener('install', e => {
  const cacheStatic = caches.open(STATIC_CACHE).then(cache =>
    cache.addAll(APP_SHELL));
  const cacheInmutable = caches.open(INMUTABLE_CACHE).then(cache =>
    cache.addAll(APP_SHELL_INMUTABLE));

  e.waitUntil(Promise.all([cacheStatic, cacheInmutable]));
});

self.addEventListener('activate', e => {
  const response = caches.keys().then(keys => {
    keys.forEach(key => {
      if (key !== STATIC_CACHE && key.includes('static'))
        return caches.delete(key);
      if (key !== DYNAMIC_CACHE && key.includes('dynamic'))
        return caches.delete(key);
    });
  });

  e.waitUntil(response);
});

self.addEventListener('fetch', e => {
  const response = caches.match(e.request).then(res => {
    if (res)
      return res;
    else
      return fetch(e.request).then(newRes =>
        updateDynamicCache(DYNAMIC_CACHE, e.request, newRes));
  });

  e.respondWith(response);
});