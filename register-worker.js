/**
 * Register the service worker
 */
if ('serviceWorker' in navigator) {
	navigator.serviceWorker
		.register('/red_voznje_pwa/service-worker.js')
		.then(function () { console.log('Service Worker Registered'); });
}
