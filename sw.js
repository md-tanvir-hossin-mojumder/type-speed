/* sw.js - Service Worker: অফলাইনে চালানোর জন্য ফাইল জমিয়ে রাখে */

// ওয়েবসাইট বদলালে এই সংখ্যা বাড়াও: v1 -> v2 -> v3
var VERSION = "v4";
var CACHE = "typespeed-" + VERSION;

// আগেই জমিয়ে রাখার ফাইল (কোনো ফাইল না থাকলে সেটা বাদ যাবে, বাকিগুলো ঠিকই জমবে)
var FILES = [
  "./",
  "index.html",
  "about.html",
  "contact.html",
  "privacy.html",
  "terms.html",
  "manifest.json",
  
  "css/style.css",
  "css/components.css",
  "css/home.css",
  "css/typing.css",
  "css/language.css",
  "css/practice.css",
  "css/games.css",
  "css/wordrain.css",
  "css/analytics.css",
  "css/leaderboard.css",
  "css/achievements.css",
  "css/profile.css",
  "css/trainer.css",
  "css/settings.css",
  "css/pwa.css",
  "css/responsive.css",
  "css/fixes.css",
  "css/polish.css",
  "css/pages.css",
  
  "js/storage.js",
  "js/settings.js",
  "js/i18n.js",
  "js/texts.js",
  "js/texts-more.js",
  "js/texts-more2.js",
  "js/texts-bn.js",
  "js/texts-bn-more.js",
  "js/texts-bn-more2.js",
  "js/typing-engine.js",
  "js/practice.js",
  "js/games.js",
  "js/wordrain.js",
  "js/analytics.js",
  "js/leaderboard.js",
  "js/achievements.js",
  "js/profile.js",
  "js/keyboard.js",
  "js/learning.js",
  "js/pages.js",
  "js/pwa.js",
  "js/polish.js",
  "js/app.js",
  
  "assets/favicon.svg",
  "assets/logo.svg",
  "assets/images/icon-192.png",
  "assets/images/icon-512.png",
  "assets/images/icon-maskable-512.png",
  "assets/images/apple-touch-icon.png"
];

/* ---------- ইনস্টল: ফাইলগুলো জমানো ---------- */
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches
    .open(CACHE)
    .then(function(cache) {
      return Promise.all(
        FILES.map(function(url) {
          return cache.add(url).catch(function() {
            /* এই ফাইল পাওয়া না গেলে বাদ, বাকিগুলো চলবে */
          });
        })
      );
    })
    .then(function() {
      return self.skipWaiting();
    })
  );
});

/* ---------- চালু: পুরোনো সংস্করণ মুছে ফেলা ---------- */
self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches
    .keys()
    .then(function(keys) {
      return Promise.all(
        keys.map(function(key) {
          if (key.indexOf("typespeed-") === 0 && key !== CACHE) {
            return caches.delete(key);
          }
          return null;
        })
      );
    })
    .then(function() {
      return self.clients.claim();
    })
  );
});

/* ---------- ফাইল আনার নিয়ম ---------- */
function canStore(response) {
  return response && (response.ok || response.type === "opaque");
}

// পেজ খোলা: আগে নেট, না পেলে জমানো কপি
function networkFirst(request) {
  return fetch(request)
    .then(function(response) {
      if (canStore(response)) {
        var copy = response.clone();
        caches.open(CACHE).then(function(cache) {
          cache.put(request, copy);
        });
      }
      return response;
    })
    .catch(function() {
      return caches
        .match(request, { ignoreSearch: true })
        .then(function(found) {
          return found || caches.match("index.html");
        })
        .then(function(found) {
          return found || caches.match("./");
        });
    });
}

// বাকি ফাইল: জমানোটা সঙ্গে সঙ্গে দেখাও, পেছনে নতুনটা এনে রাখো
function staleWhileRevalidate(event) {
  var request = event.request;
  
  return caches.open(CACHE).then(function(cache) {
    return cache.match(request, { ignoreSearch: true }).then(function(cached) {
      var fetched = fetch(request)
        .then(function(response) {
          if (canStore(response)) {
            cache.put(request, response.clone());
          }
          return response;
        })
        .catch(function() {
          return cached;
        });
      
      if (cached) {
        event.waitUntil(fetched);
        return cached;
      }
      return fetched;
    });
  });
}

self.addEventListener("fetch", function(event) {
  var request = event.request;
  
  if (request.method !== "GET") {
    return;
  }
  
  var url = new URL(request.url);
  var sameOrigin = url.origin === self.location.origin;
  var isFont = url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com";
  
  // শুধু নিজের ফাইল আর Google Fonts জমানো হবে, বাকি সব যেমন আছে তেমন
  if (!sameOrigin && !isFont) {
    return;
  }
  
  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request));
    return;
  }
  
  event.respondWith(staleWhileRevalidate(event));
});