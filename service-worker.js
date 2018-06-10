
var debugMode = true;
var CACHE_VERSION = "0.0.1";

var jsFolder = "/js/";
var cssFolder = "/css/";
var threeFolder = "/three/";
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

var iconUrls = [
    "https://i.imgur.com/VdHDWKu.png",
    "https://i.imgur.com/o0BUWGy.png",
    "https://i.imgur.com/f0EOMiH.png",
    "https://i.imgur.com/fRhLFmC.png",
];

var skyboxUrls = [
//  space4 skybox.
    "https://i.imgur.com/v6bjQLb.jpg", // "posx.jpg",
    "https://i.imgur.com/lwrlr6P.jpg", // "negx.jpg", 
    "https://i.imgur.com/kKUKBJg.jpg", // "posy.jpg", 
    "https://i.imgur.com/N0oZlJR.jpg", // "negy.jpg", 
    "https://i.imgur.com/x9q8z0K.jpg", // "posz.jpg", 
    "https://i.imgur.com/HYcK7Ii.jpg", // "negz.jpg"
];

var jsUrls = [
    "/js/alerts.js",
    "/js/rawinflate.js",
    "/js/rawdeflate.js",
    "/js/bootbox.min.js",
    "/js/bootstrap.min.js",
    "/js/validator.min.js",
    "/js/DeviceDetector.js",
    "/js/MathDecimalAdjustment.js",
    "/js/html2canvas.js",
    "/js/spectrum.js",
    "/js/watermark.js",
    "/js/sharer.js",
    "/js/localforage.js",
    "/three/three.js",
    "/three/EditorControls.js",
    "/three/FirstPersonControls.js",
    "/three/Detector.js",
    "/three/Projector.js",
    "/three/Animation.js",
    "/three/AnimationHandler.js",
    "/three/KeyFrameAnimation.js",
    "/three/BVHImport.js",
    "/three/SceneLoader.js",
];

self.addEventListener("install", function(event) {
    event.waitUntil(

        caches.open( CURRENT_CACHES.imgCache ).then(function(cache) {
            return cache.addAll( iconUrls );
        }),
        caches.open( CURRENT_CACHES.jsCache ).then(function(cache) {
            return cache.addAll( jsUrls );
        }),
 
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




