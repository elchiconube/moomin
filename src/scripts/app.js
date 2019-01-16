const lang = navigator.language || navigator.userLanguage;

// Check browser language
switch (lang) {
  case 'es-ES':
    history.pushState(null, '', '/');
    break;
  default:
    history.pushState(null, '', '/en/');
    break;
}

// Register Service Worker
if (navigator.serviceWorker) {
  navigator.serviceWorker.register('/sw.js');
};