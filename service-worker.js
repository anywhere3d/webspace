
var debugMode = true;
var CACHE_VERSION = "0.0.1";

var jsFolder = "/js/";
var cssFolder = "/css/";
var scriptsFolder = "/scripts/";
var componentsFolder = "/components/";
var imgurFolder = "https://i.imgur.com/";

var CURRENT_CACHES = {
    jsCache : "cache-js-v"    + CACHE_VERSION,
    cssCache: "cache-css-v"   + CACHE_VERSION,
    imgCache: "cache-img-v"   + CACHE_VERSION,
    scriptsCache: "scripts-v" + CACHE_VERSION,
    componentsCache: "components-v" + CACHE_VERSION,
};

var iconsUrls = [
    "https://i.imgur.com/VdHDWKu.png",
    "https://i.imgur.com/o0BUWGy.png",
    "https://i.imgur.com/f0EOMiH.png",
    "https://i.imgur.com/fRhLFmC.png",
];


self.addEventListener("install", function(event) {
    event.waitUntil(

        caches.open( CURRENT_CACHES.imgCache ).then(function(cache) {
            return cache.addAll( iconsUrls );
        })

    );
});

//  Delete all caches that aren't named in CURRENT_CACHES.
//  While there is only one cache in this example, the same logic 
//  will handle the case where there are multiple versioned caches.

self.addEventListener("activate", function(event) {

    var expectedCacheNames = Object.keys(CURRENT_CACHES).map(function(key) {
        return CURRENT_CACHES[key];
    });

    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (expectedCacheNames.indexOf(cacheName) === -1) {
                    // If this cache name isn't present in the array of "expected" cache names, then delete it.
                        debugMode && console.log('[Service worker]  Deleting out of date cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});




