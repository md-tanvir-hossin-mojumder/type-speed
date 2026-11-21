/* settings.js - Phase 15: Settings */

(function () {
  "use strict";

  function $(id) {
    return document.getElementById(id);
  }

  var KEY = "settings";
  var htmlEl = document.documentElement;

  var DEFAULTS = {
    fontSize: "medium",
    sound: true,
    caret: "underline",
    highlight: "standard",
    duration: "60",
    customDuration: 45,
    difficulty: "medium",
    mode: "paragraph",
    typingLang: "english"
  };

  var OPTIONS = {
    fontSize: ["small", "medium", "large", "xlarge"],
    caret: ["underline", "block", "line", "none"],
    highlight: ["standard", "background", "mistakes"],
    duration: ["15", "30", "60", "120", "custom"],
    difficulty: ["easy", "medium", "hard"],
    mode: ["word", "sentence", "paragraph"],
    typingLang: ["english", "bangla"]
  };

  /* ---------- লেখা (ইংরেজি ও বাংলা) ---------- */
  var STR = {
    en: {
      title: "Settings",
      close: "Close",
      openLabel: "Settings",
      iface: "Interface language",
      typingLang: "Default typing language",
      fontSize: "Typing text size",
      sound: "Typing sound",
      caret: "Caret style",
      highlight: "Highlight style",
      duration: "Default test duration",
      durationCustom: "Seconds (5 to 600)",
      difficulty: "Default difficulty",
      mode: "Default test type",
      preview: "Preview",
      reset: "Reset to defaults",
      note: "Settings are saved only on this device.",
      fs: { small: "Small", medium: "Medium", large: "Large", xlarge: "Extra large" },
      snd: { on: "On", off: "Off" },
      caretOpt: { underline: "Underline", block: "Block", line: "Line", none: "None" },
      hl: { standard: "Colored text", background: "Background", mistakes: "Mistakes only" },
      dur: { "15": "15 Seconds", "30": "30 Seconds", "60": "60 Seconds", "120": "120 Seconds", custom: "Custom" },
      diff: { easy: "Easy", medium: "Medium", hard: "Hard" },
      modes: { word: "Word-Based", sentence: "Sentence-Based", paragraph: "Paragraph-Based" },
      langs: { english: "English", bangla: "বাংলা" },
      ifaceOpts: { en: "English", bn: "বাংলা" }
    },
    bn: {
      title: "সেটিংস",
      close: "বন্ধ করো",
      openLabel: "সেটিংস",
      iface: "ইন্টারফেসের ভাষা",
      typingLang: "ডিফল্ট টাইপিং ভাষা",
      fontSize: "টাইপিংয়ের লেখার আকার",
      sound: "টাইপিং সাউন্ড",
      caret: "কার্সরের ধরন",
      highlight: "হাইলাইটের ধরন",
      duration: "ডিফল্ট টেস্টের সময়",
      durationCustom: "সেকেন্ড (5 থেকে 600)",
      difficulty: "ডিফল্ট কঠিনতা",
      mode: "ডিফল্ট টেস্টের ধরন",
      preview: "প্রিভিউ",
      reset: "ডিফল্টে ফিরে যাও",
      note: "সেটিংস শুধু এই ডিভাইসে সেভ থাকে।",
      fs: { small: "ছোট", medium: "মাঝারি", large: "বড়", xlarge: "অনেক বড়" },
      snd: { on: "চালু", off: "বন্ধ" },
      caretOpt: { underline: "আন্ডারলাইন", block: "ব্লক", line: "লাইন", none: "কিছু না" },
      hl: { standard: "রঙিন লেখা", background: "ব্যাকগ্রাউন্ড", mistakes: "শুধু ভুল" },
      dur: { "15": "15 সেকেন্ড", "30": "30 সেকেন্ড", "60": "60 সেকেন্ড", "120": "120 সেকেন্ড", custom: "কাস্টম" },
      diff: { easy: "সহজ", medium: "মাঝারি", hard: "কঠিন" },
      modes: { word: "শব্দভিত্তিক", sentence: "বাক্যভিত্তিক", paragraph: "অনুচ্ছেদভিত্তিক" },
      langs: { english: "English", bangla: "বাংলা" },
      ifaceOpts: { en: "English", bn: "বাংলা" }
    }
  };

  function getLangId() {
    return window.TS_I18N ? window.TS_I18N.getLang() : "en";
  }

  function getStr() {
    return STR[getLangId()] || STR.en;
  }

  /* ---------- সেভ করা ডেটা ---------- */
  var memSettings = null;

  function storeOk() {
    return !!(window.TS_STORE && window.TS_STORE.isAvailable());
  }

  function copyDefaults() {
    var out = {};
    for (var k in DEFAULTS) {
      if (Object.prototype.hasOwnProperty.call(DEFAULTS, k)) {
        out[k] = DEFAULTS[k];
      }
    }
    return out;
  }

  function load() {
    var s = copyDefaults();
    var raw = storeOk() ? window.TS_STORE.get(KEY, null) : memSettings;

    if (raw && typeof raw === "object" && !Array.isArray(raw)) {
      for (var key in OPTIONS) {
        if (Object.prototype.hasOwnProperty.call(OPTIONS, key) && OPTIONS[key].indexOf(raw[key]) !== -1) {
          s[key] = raw[key];
        }
      }
      if (typeof raw.sound === "boolean") {
        s.sound = raw.sound;
      }
      var cd = parseInt(raw.customDuration, 10);
      if (isFinite(cd) && cd >= 5 && cd <= 600) {
        s.customDuration = cd;
      }
    }
    return s;
  }

  var settings = load();

  function save() {
    if (storeOk()) {
      window.TS_STORE.set(KEY, settings);
    } else {
      memSettings = settings;
    }
  }

  /* ---------- দেখতে যা বদলায় (সঙ্গে সঙ্গে) ---------- */
  function applyVisual() {
    htmlEl.setAttribute("data-fs", settings.fontSize);
    htmlEl.setAttribute("data-caret", settings.caret);
    htmlEl.setAttribute("data-hl", settings.highlight);
  }

  // পেজ খোলার সময়: টেস্টের শুরুর মান বসানো (Typing Engine চালুর আগেই)
  function applyTestDefaults() {
    var d = $("duration-select");
    var cd = $("custom-duration");
    var wrap = $("custom-duration-wrap");
    var df = $("difficulty-select");
    var m = $("mode-select");

    if (d) {
      d.value = settings.duration;
    }
    if (cd) {
      cd.value = String(settings.customDuration);
    }
    if (wrap) {
      wrap.hidden = settings.duration !== "custom";
    }
    if (df) {
      df.value = settings.difficulty;
    }
    if (m) {
      m.value = settings.mode;
    }
  }

  applyVisual();
  applyTestDefaults();

  /* ---------- চলমান পেজে প্রয়োগ ---------- */
  function fire(node, type) {
    var ev;
    if (typeof Event === "function") {
      ev = new Event(type, { bubbles: true });
    } else {
      ev = document.createEvent("Event");
      ev.initEvent(type, true, true);
    }
    node.dispatchEvent(ev);
  }

  function testLocked() {
    var s = $("start-btn");
    return !!(s && s.disabled);
  }

  // টেস্ট চলার সময় নয়, শুধু তখনই কার্ডে প্রয়োগ হয়
  function applyTestDefaultsLive() {
    if (testLocked()) {
      return;
    }
    var d = $("duration-select");
    var cd = $("custom-duration");
    var df = $("difficulty-select");
    var m = $("mode-select");
    if (!d || !cd || !df || !m) {
      return;
    }

    cd.value = String(settings.customDuration);
    d.value = settings.duration;
    fire(d, "change");
    df.value = settings.difficulty;
    fire(df, "change");
    m.value = settings.mode;
    fire(m, "change");
  }

  function applyTypingLangLive() {
    if (testLocked()) {
      return;
    }
    var active = document.querySelector(".lang-btn.active");
    if (!active) {
      return;
    }
    var current = active.getAttribute("data-lang");
    if (current === "custom" || current === settings.typingLang) {
      return;
    }
    var btn = document.querySelector('.lang-btn[data-lang="' + settings.typingLang + '"]');
    if (btn) {
      btn.click();
    }
  }

  /* ---------- সাউন্ড (Typing Engine-এর বাটনের সঙ্গে মিল রেখে) ---------- */
  var soundBtn = $("sound-btn");
  var soundMirror = true; // Typing Engine সবসময় "চালু" দিয়ে শুরু করে

  if (soundBtn) {
    soundBtn.addEventListener("click", function () {
      soundMirror = !soundMirror;
      settings.sound = soundMirror;
      save();
      renderIfOpen();
    });
  }

  function setSound(on) {
    if (soundBtn) {
      if (on !== soundMirror) {
        soundBtn.click();
      }
    } else {
      settings.sound = on;
      save();
    }
  }

  // সব স্ক্রিপ্ট লোড হওয়ার পর ভাষা ও সাউন্ড প্রয়োগ
  document.addEventListener("DOMContentLoaded", function () {
    if (settings.sound === false) {
      setSound(false);
    }
    if (settings.typingLang !== "english") {
      applyTypingLangLive();
    }
    updateButtonLabel();
  });

  /* ---------- সাইডবারের বাটন ---------- */
  var openBtn = $("settings-open");
  var openLabel = $("settings-open-label");

  function updateButtonLabel() {
    if (openLabel) {
      openLabel.textContent = getStr().openLabel;
    }
  }

  /* ---------- প্যানেল (Modal) ---------- */
  var modal = null;
  var bodyEl = null;
  var titleEl = null;
  var closeBtn = null;
  var lastFocus = null;

  function esc(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function seg(group, values, current, labels) {
    var html = '<div class="seg-row" role="group">';
    for (var i = 0; i < values.length; i++) {
      var on = String(values[i]) === String(current);
      html +=
        '<button type="button" class="seg-btn' + (on ? " active" : "") + '" aria-pressed="' + (on ? "true" : "false") +
        '" data-set="' + group + '" data-value="' + values[i] + '">' + esc(labels[values[i]]) + "</button>";
    }
    return html + "</div>";
  }

  function selectHtml(id, values, current, labels) {
    var html = '<select id="' + id + '">';
    for (var i = 0; i < values.length; i++) {
      html +=
        '<option value="' + values[i] + '"' + (values[i] === current ? " selected" : "") + ">" +
        esc(labels[values[i]]) + "</option>";
    }
    return html + "</select>";
  }

  function renderBody() {
    if (!modal) {
      return;
    }
    var S = getStr();
    var html = "";

    titleEl.textContent = S.title;
    closeBtn.setAttribute("aria-label", S.close);

    html += "<h4>" + S.iface + "</h4>";
    html += seg("iface", ["en", "bn"], getLangId(), S.ifaceOpts);

    html += "<h4>" + S.typingLang + "</h4>";
    html += seg("typingLang", OPTIONS.typingLang, settings.typingLang, S.langs);

    html += "<h4>" + S.fontSize + "</h4>";
    html += seg("fontSize", OPTIONS.fontSize, settings.fontSize, S.fs);

    html += "<h4>" + S.sound + "</h4>";
    html += seg("sound", ["on", "off"], settings.sound ? "on" : "off", S.snd);

    html += "<h4>" + S.caret + "</h4>";
    html += seg("caret", OPTIONS.caret, settings.caret, S.caretOpt);

    html += "<h4>" + S.highlight + "</h4>";
    html += seg("highlight", OPTIONS.highlight, settings.highlight, S.hl);

    html += "<h4>" + S.preview + "</h4>";
    html +=
      '<div class="passage settings-preview" aria-hidden="true">' +
      '<span class="char-correct">The quick </span><span class="char-wrong">bro</span>' +
      '<span class="char-current">w</span><span>n fox jumps over the lazy dog.</span></div>';

    html += "<h4>" + S.duration + "</h4>";
    html += '<label for="set-duration" class="visually-hidden">' + S.duration + "</label>";
    html += selectHtml("set-duration", OPTIONS.duration, settings.duration, S.dur);
    html += '<div id="set-custom-wrap"' + (settings.duration === "custom" ? "" : " hidden") + ">";
    html += '<label for="set-custom">' + S.durationCustom + "</label>";
    html +=
      '<input type="number" id="set-custom" min="5" max="600" inputmode="numeric" value="' + settings.customDuration + '">';
    html += "</div>";

    html += "<h4>" + S.difficulty + "</h4>";
    html += '<label for="set-difficulty" class="visually-hidden">' + S.difficulty + "</label>";
    html += selectHtml("set-difficulty", OPTIONS.difficulty, settings.difficulty, S.diff);

    html += "<h4>" + S.mode + "</h4>";
    html += '<label for="set-mode" class="visually-hidden">' + S.mode + "</label>";
    html += selectHtml("set-mode", OPTIONS.mode, settings.mode, S.modes);

    html += '<div class="data-actions modal-actions">';
    html += '<button type="button" class="btn btn-outline" data-action="reset">' + S.reset + "</button>";
    html += "</div>";
    html += '<p class="modal-note">' + S.note + "</p>";

    bodyEl.innerHTML = html;
  }

  function renderIfOpen() {
    if (modal && !modal.hidden) {
      renderBody();
    }
  }

  function buildModal() {
    modal = document.createElement("div");
    modal.className = "modal settings-modal";
    modal.id = "settings-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "settings-title");
    modal.hidden = true;

    modal.innerHTML =
      '<div class="modal-backdrop" data-close="1"></div>' +
      '<div class="modal-panel">' +
      '<div class="modal-head"><h3 id="settings-title"></h3>' +
      '<button type="button" class="modal-close" id="settings-close">&times;</button></div>' +
      '<div class="modal-body" id="settings-body"></div>' +
      "</div>";

    document.body.appendChild(modal);

    bodyEl = $("settings-body");
    titleEl = $("settings-title");
    closeBtn = $("settings-close");

    modal.addEventListener("click", onModalClick);
    modal.addEventListener("change", onModalChange);
    modal.addEventListener("keydown", onModalKey);
  }

  function openModal() {
    if (!modal) {
      buildModal();
    }

    // মোবাইলে সাইডবার খোলা থাকলে আগে বন্ধ করি
    var sidebar = $("sidebar");
    var sideClose = $("sidebar-close");
    if (sidebar && sidebar.classList.contains("open") && sideClose) {
      sideClose.click();
    }

    lastFocus = document.activeElement;
    renderBody();
    modal.hidden = false;
    document.body.classList.add("no-scroll");
    closeBtn.focus();
  }

  function closeModal() {
    if (!modal || modal.hidden) {
      return;
    }
    modal.hidden = true;
    document.body.classList.remove("no-scroll");
    if (lastFocus && lastFocus.focus) {
      lastFocus.focus();
    }
  }

  /* ---------- সেটিং বদলানো ---------- */
  function setValue(group, value) {
    if (group === "iface") {
      if (window.TS_I18N) {
        window.TS_I18N.setLang(value);
      }
      return;
    }

    if (group === "sound") {
      setSound(value === "on");
      renderBody();
      return;
    }

    if (OPTIONS[group] && OPTIONS[group].indexOf(value) !== -1) {
      settings[group] = value;
      save();

      if (group === "fontSize" || group === "caret" || group === "highlight") {
        applyVisual();
      } else if (group === "typingLang") {
        applyTypingLangLive();
      }
      renderBody();
    }
  }

  function resetAll() {
    settings = copyDefaults();
    save();
    applyVisual();
    applyTestDefaultsLive();
    applyTypingLangLive();
    setSound(true);
    renderBody();
  }

  /* ---------- ইভেন্ট ---------- */
  function onModalClick(event) {
    var node = event.target;
    while (node && node !== modal) {
      if (node.getAttribute) {
        if (node.getAttribute("data-close") || node.id === "settings-close") {
          closeModal();
          return;
        }
        if (node.getAttribute("data-set")) {
          setValue(node.getAttribute("data-set"), node.getAttribute("data-value"));
          return;
        }
        if (node.getAttribute("data-action") === "reset") {
          resetAll();
          return;
        }
      }
      node = node.parentNode;
    }
  }

  function onModalChange(event) {
    var target = event.target;
    if (!target || !target.id) {
      return;
    }

    if (target.id === "set-duration" && OPTIONS.duration.indexOf(target.value) !== -1) {
      settings.duration = target.value;
      var wrap = $("set-custom-wrap");
      if (wrap) {
        wrap.hidden = target.value !== "custom";
      }
      save();
      applyTestDefaultsLive();
    } else if (target.id === "set-custom") {
      var n = parseInt(target.value, 10);
      if (!isFinite(n)) {
        n = DEFAULTS.customDuration;
      }
      n = Math.min(600, Math.max(5, n));
      target.value = String(n);
      settings.customDuration = n;
      save();
      applyTestDefaultsLive();
    } else if (target.id === "set-difficulty" && OPTIONS.difficulty.indexOf(target.value) !== -1) {
      settings.difficulty = target.value;
      save();
      applyTestDefaultsLive();
    } else if (target.id === "set-mode" && OPTIONS.mode.indexOf(target.value) !== -1) {
      settings.mode = target.value;
      save();
      applyTestDefaultsLive();
    }
  }

  // Esc চাপলে বন্ধ, Tab প্যানেলের ভেতরেই ঘুরবে
  function onModalKey(event) {
    if (event.key === "Escape") {
      closeModal();
      return;
    }
    if (event.key !== "Tab") {
      return;
    }

    var list = modal.querySelectorAll("button, a[href], input, select, textarea");
    var focusable = [];
    for (var i = 0; i < list.length; i++) {
      if (!list[i].disabled && list[i].offsetParent !== null) {
        focusable.push(list[i]);
      }
    }
    if (!focusable.length) {
      return;
    }

    var first = focusable[0];
    var last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  if (openBtn) {
    openBtn.addEventListener("click", openModal);
  }

  document.addEventListener("tsi18n:changed", function () {
    updateButtonLabel();
    renderIfOpen();
  });

  // অন্য ফাইল চাইলে সেটিংস পড়তে পারবে
  window.TS_SETTINGS = {
    get: function (key) {
      return settings[key];
    },
    getAll: function () {
      return load();
    }
  };
})();