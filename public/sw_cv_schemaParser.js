const catchName = "v2"
// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', () => {
    console.log("serviceWorker install")
})

// eslint-disable-next-line no-restricted-globals
self.addEventListener('activate', e => {
    console.log("serviceWorker activate")
    e.waitUntil(
        caches.keys().then(catchNames => {
            return Promise.all(
                // eslint-disable-next-line array-callback-return
                catchNames.map(cache => {
                    if (cache !== catchName) {
                        console.log("serviceWorker clear old cache")
                        return caches.delete(cache)
                    }
                })
            )
        })
    )
})

// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', (e) => {
    if (!/^https?:$/i.test(new URL(e.request.url).protocol)) return;
    console.log("serviceWorker fetch")

    e.respondWith(
        caches.open(catchName).then(function(cache) {
            return cache.match(e.request).then(function (response) {
                return response || fetch(e.request).then(function(response) {
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
})