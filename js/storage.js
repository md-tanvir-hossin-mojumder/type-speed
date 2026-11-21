/* storage.js - localStorage সহায়ক (নিরাপদ) */
/* সব ফাইল ডেটা সেভ ও পড়ার জন্য এখান দিয়েই যায়, তাই ভবিষ্যতে ব্যাকএন্ড যোগ করা সহজ হবে */

(function() {
  "use strict";
  
  var PREFIX = "ts_";
  var VERSION = 1;
  
  function checkAvailable() {
    try {
      var k = "__ts_test__";
      localStorage.setItem(k, "1");
      localStorage.removeItem(k);
      return true;
    } catch (e) {
      return false;
    }
  }
  
  var ok = checkAvailable();
  
  // এই ওয়েবসাইটের সব সেভ করা কী-এর নাম (prefix ছাড়া)
  function listKeys() {
    var names = [];
    if (!ok) {
      return names;
    }
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key && key.indexOf(PREFIX) === 0) {
          names.push(key.slice(PREFIX.length));
        }
      }
    } catch (e) {
      /* ঠিক আছে */
    }
    return names;
  }
  
  window.TS_STORE = {
    isAvailable: function() {
      return ok;
    },
    
    // ডেটা পড়া: না থাকলে বা নষ্ট থাকলে fallback ফেরত দেয়
    get: function(key, fallback) {
      if (!ok) {
        return fallback;
      }
      try {
        var raw = localStorage.getItem(PREFIX + key);
        if (raw === null) {
          return fallback;
        }
        var value = JSON.parse(raw);
        return value === null || value === undefined ? fallback : value;
      } catch (e) {
        return fallback;
      }
    },
    
    // ডেটা সেভ করা
    set: function(key, value) {
      if (!ok) {
        return false;
      }
      try {
        localStorage.setItem(PREFIX + key, JSON.stringify(value));
        return true;
      } catch (e) {
        return false;
      }
    },
    
    remove: function(key) {
      if (!ok) {
        return;
      }
      try {
        localStorage.removeItem(PREFIX + key);
      } catch (e) {
        /* ঠিক আছে */
      }
    },
    
    keys: listKeys,
    
    // সব ডেটা একটি অবজেক্টে (এক্সপোর্টের জন্য)
    exportAll: function() {
      var out = {};
      var names = listKeys();
      for (var i = 0; i < names.length; i++) {
        var raw = null;
        try {
          raw = localStorage.getItem(PREFIX + names[i]);
        } catch (e) {
          raw = null;
        }
        if (raw === null) {
          continue;
        }
        try {
          out[names[i]] = JSON.parse(raw);
        } catch (e2) {
          out[names[i]] = raw;
        }
      }
      return out;
    },
    
    // এই ওয়েবসাইটের সব সেভ করা ডেটা মুছে ফেলা
    clearAll: function() {
      var names = listKeys();
      for (var i = 0; i < names.length; i++) {
        try {
          localStorage.removeItem(PREFIX + names[i]);
        } catch (e) {
          /* ঠিক আছে */
        }
      }
    }
  };
  
  // ডেটার সংস্করণ (ভবিষ্যতে কাঠামো বদলালে কাজে লাগবে)
  if (ok && window.TS_STORE.get("version", null) === null) {
    window.TS_STORE.set("version", VERSION);
  }
})();