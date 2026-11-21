/* pwa.js - সার্ভিস ওয়ার্কার চালু, ইনস্টল বাটন ও অফলাইন বার্তা */

(function () {
  "use strict";

  /* ---------- লেখা (ইংরেজি ও বাংলা) ---------- */
  var STR = {
    en: {
      offline: "You are offline. The app and your saved data still work.",
      online: "You are back online.",
      update: "A new version is ready.",
      reload: "Reload",
      install: "Install app"
    },
    bn: {
      offline: "তুমি অফলাইনে আছ। অ্যাপ ও তোমার সেভ করা ডেটা এখনো কাজ করবে।",
      online: "ইন্টারনেট ফিরে এসেছে।",
      update: "নতুন সংস্করণ তৈরি।",
      reload: "রিলোড",
      install: "অ্যাপ ইনস্টল করো"
    }
  };

  function getStr() {
    var lang = window.TS_I18N ? window.TS_I18N.getLang() : "en";
    return STR[lang] || STR.en;
  }

  /* ---------- নিচের ছোট বার্তা ---------- */
  var banner = null;
  var bannerKind = "";
  var hideTimer = null;

  function ensureBanner() {
    if (banner) {
      return banner;
    }
    banner = document.createElement("div");
    banner.className = "pwa-banner";
    banner.setAttribute("role", "status");
    banner.hidden = true;
    document.body.appendChild(banner);

    banner.addEventListener("click", function (event) {
      var target = event.target;
      if (target && target.getAttribute && target.getAttribute("data-reload")) {
        window.location.reload();
      }
    });
    return banner;
  }

  function renderBanner() {
    if (!bannerKind) {
      if (banner) {
        banner.hidden = true;
      }
      return;
    }

    var S = getStr();
    var box = ensureBanner();
    var html = "<span>" + S[bannerKind] + "</span>";
    if (bannerKind === "update") {
      html += '<button type="button" class="btn btn-gold pwa-btn" data-reload="1">' + S.reload + "</button>";
    }
    box.innerHTML = html;
    box.hidden = false;

    clearTimeout(hideTimer);
    if (bannerKind === "online") {
      hideTimer = setTimeout(function () {
        bannerKind = "";
        renderBanner();
      }, 3000);
    }
  }

  function showBanner(kind) {
    bannerKind = kind;
    renderBanner();
  }

  window.addEventListener("offline", function () {
    showBanner("offline");
  });

  window.addEventListener("online", function () {
    if (bannerKind === "offline") {
      showBanner("online");
    }
  });

  if (navigator.onLine === false) {
    showBanner("offline");
  }

  /* ---------- সার্ভিস ওয়ার্কার চালু (শুধু HTTPS-এ) ---------- */
  if ("serviceWorker" in navigator && window.location.protocol === "https:") {
    var hadController = !!navigator.serviceWorker.controller;

    navigator.serviceWorker.addEventListener("controllerchange", function () {
      if (hadController) {
        showBanner("update");
      }
    });

    window.addEventListener("load", function () {
      navigator.serviceWorker.register("sw.js").catch(function () {
        /* নিবন্ধন না হলে ওয়েবসাইট আগের মতোই চলবে */
      });
    });
  }

  /* ---------- "অ্যাপ ইনস্টল করো" বাটন ---------- */
  var deferredPrompt = null;
  var installBtn = null;

  function removeInstallButton() {
    if (installBtn && installBtn.parentNode) {
      installBtn.parentNode.removeChild(installBtn);
    }
    installBtn = null;
  }

  function addInstallButton() {
    if (installBtn) {
      return;
    }
    var anchor = document.getElementById("settings-open");
    if (!anchor || !anchor.parentNode) {
      return;
    }

    installBtn = document.createElement("button");
    installBtn.type = "button";
    installBtn.className = "sidebar-action";
    installBtn.id = "install-btn";
    installBtn.innerHTML =
      '<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12"/><path d="M8 11l4 4 4-4"/><path d="M4 21h16"/></svg>' +
      '<span id="install-label">' + getStr().install + "</span>";

    anchor.parentNode.insertBefore(installBtn, anchor.nextSibling);

    installBtn.addEventListener("click", function () {
      if (!deferredPrompt) {
        return;
      }
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(function () {
        deferredPrompt = null;
        removeInstallButton();
      });
    });
  }

  window.addEventListener("beforeinstallprompt", function (event) {
    event.preventDefault();
    deferredPrompt = event;
    addInstallButton();
  });

  window.addEventListener("appinstalled", function () {
    deferredPrompt = null;
    removeInstallButton();
  });

  document.addEventListener("tsi18n:changed", function () {
    renderBanner();
    var label = document.getElementById("install-label");
    if (label) {
      label.textContent = getStr().install;
    }
  });
})();