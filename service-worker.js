const CACHE_NAME = 'pwa-ui5-todo-v1.0.07';
const RESOURCES_TO_PRELOAD = [
	// Add URL you want to cache in this list.
  "/red_voznje_pwa/", // If you have separate JS/CSS files,
  "/red_voznje_pwa/index.html", // add path to those files here
  "/red_voznje_pwa/css/style.css",
  "/red_voznje_pwa/js/app.js",
  "/red_voznje_pwa/screens/lista.html",
  "/red_voznje_pwa/screens/selector/bus1.html",
  "/red_voznje_pwa/screens/radni/bus1.html",
  "/red_voznje_pwa/screens/subota/bus1.html",
  "/red_voznje_pwa/screens/nedelja/bus1.html",
  "/red_voznje_pwa/screens/radni/bus2.html",
	"/red_voznje_pwa/screens/subota/bus2.html",
	"/red_voznje_pwa/screens/nedelja/bus2.html",
	"/red_voznje_pwa/screens/selector/bus2.html",
	"/red_voznje_pwa/screens/radni/bus3.html",
	"/red_voznje_pwa/screens/subota/bus3.html",
	"/red_voznje_pwa/screens/nedelja/bus3.html",
	"/red_voznje_pwa/screens/selector/bus3.html",
	"/red_voznje_pwa/screens/radni/bus4.html",
	"/red_voznje_pwa/screens/subota/bus4.html",
	"/red_voznje_pwa/screens/nedelja/bus4.html",
	"/red_voznje_pwa/screens/selector/bus4.html",
	"/red_voznje_pwa/screens/radni/bus5.html",
	"/red_voznje_pwa/screens/subota/bus5.html",
	"/red_voznje_pwa/screens/nedelja/bus5.html",
	"/red_voznje_pwa/screens/selector/bus5.html",
	"/red_voznje_pwa/screens/radni/bus6.html",
	"/red_voznje_pwa/screens/subota/bus6.html",
	"/red_voznje_pwa/screens/nedelja/bus6.html",
	"/red_voznje_pwa/screens/selector/bus6.html",
	"/red_voznje_pwa/screens/radni/bus8.html",
	"/red_voznje_pwa/screens/subota/bus8.html",
	"/red_voznje_pwa/screens/nedelja/bus8.html",
	"/red_voznje_pwa/screens/selector/bus8.html",
	"/red_voznje_pwa/screens/radni/bus9.html",
	"/red_voznje_pwa/screens/subota/bus9.html",
	"/red_voznje_pwa/screens/nedelja/bus9.html",
	"/red_voznje_pwa/screens/selector/bus9.html",
	"/red_voznje_pwa/screens/radni/bus10.html",
	"/red_voznje_pwa/screens/subota/bus10.html",
	"/red_voznje_pwa/screens/nedelja/bus10.html",
	"/red_voznje_pwa/screens/selector/bus10.html",
	"/red_voznje_pwa/screens/radni/bus11.html",
	"/red_voznje_pwa/screens/subota/bus11.html",
	"/red_voznje_pwa/screens/nedelja/bus11.html",
	"/red_voznje_pwa/screens/selector/bus11.html",
	"/red_voznje_pwa/screens/radni/bus13.html",
	"/red_voznje_pwa/screens/subota/bus13.html",
	"/red_voznje_pwa/screens/nedelja/bus13.html",
	"/red_voznje_pwa/screens/selector/bus13.html",
	"/red_voznje_pwa/screens/radni/bus14.html",
	"/red_voznje_pwa/screens/subota/bus14.html",
	"/red_voznje_pwa/screens/nedelja/bus14.html",
	"/red_voznje_pwa/screens/selector/bus14.html",
	"/red_voznje_pwa/screens/radni/bus15.html",
	"/red_voznje_pwa/screens/subota/bus15.html",
	"/red_voznje_pwa/screens/nedelja/bus15.html",
	"/red_voznje_pwa/screens/selector/bus15.html",
];

// Preload some resources during install
self.addEventListener('install', function (event) {
	event.waitUntil(
		caches.open(CACHE_NAME).then(function (cache) {
			return cache.addAll(RESOURCES_TO_PRELOAD);
		// if any item isn't successfully added to
		// cache, the whole operation fails.
		}).catch(function(error) {
			console.error(error);
		})
	);
});

// Delete obsolete caches during activate
self.addEventListener('activate', function (event) {
	event.waitUntil(
		caches.keys().then(function (keyList) {
			return Promise.all(keyList.map(function (key) {
				if (key !== CACHE_NAME) {
					return caches.delete(key);
				}
			}));
		})
	);
});

// During runtime, get files from cache or -> fetch, then save to cache
self.addEventListener('fetch', function (event) {
	// only process GET requests
	if (event.request.method === 'GET') {
		event.respondWith(
			caches.match(event.request).then(function (response) {
				if (response) {
					return response; // There is a cached version of the resource already
				}
	
				let requestCopy = event.request.clone();
				return fetch(requestCopy).then(function (response) {
					// opaque responses cannot be examined, they will just error
					if (response.type === 'opaque') {
						// don't cache opaque response, you cannot validate it's status/success
						return response;
					// response.ok => response.status == 2xx ? true : false;
					} else if (!response.ok) {
						console.error(response.statusText);
					} else {
						return caches.open(CACHE_NAME).then(function(cache) {
							cache.put(event.request, response.clone());
							return response;
						// if the response fails to cache, catch the error
						}).catch(function(error) {
							console.error(error);
							return error;
						});
					}
				}).catch(function(error) {
					// fetch will fail if server cannot be reached,
					// this means that either the client or server is offline
					console.error(error);
					return caches.match('offline-404.html');
				});
			})
		);
	}
});
