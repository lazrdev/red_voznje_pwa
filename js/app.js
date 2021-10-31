const back = () => window.history.back(); //back button
window.onload = () => {
    "use strict";
  
    //service worker
    if (navigator.serviceWorker) {
      navigator.serviceWorker.register('/red_voznje_pwa/sw.js', {scope: '/red_voznje_pwa/'})
    }
}
  
