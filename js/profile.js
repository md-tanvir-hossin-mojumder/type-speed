/* profile.js - Phase 13: Profile সিস্টেম */

(function () {
  "use strict";

  function $(id) {
    return document.getElementById(id);
  }

  var openBtn = $("profile-open");
  var nameEl = $("profile-name");
  var subEl = $("profile-sub");
  var avatarEl = $("profile-avatar");

  if (!openBtn || !nameEl || !subEl || !avatarEl) {
    return;
  }

  var PROFILE_KEY = "profile";
  var PB_KEY = "pb";
  var STATS_KEY = "ach_stats";
  var PB_MIN_CHARS = 50;

  var COLOR_IDS = ["gold", "emerald", "blue", "purple", "light"];
  var COLORS = {
    gold: { bg: "#D6B35A", fg: "#1A1405" },
    emerald: { bg: "#20B486", fg: "#06251C" },
    blue: { bg: "#5577E8", fg: "#FFFFFF" },
    purple: { bg: "#8957D5", fg: "#FFFFFF" },
    light: { bg: "#F8FAFC", fg: "#172033" }
  };

  var ACH_IDS = ["first", "speedBeginner", "speedMaster", "accuracyExpert", "hundred", "daily"];

  /* ---------- লেখা (ইংরেজি ও বাংলা) ---------- */
  var STR = {
    en: {
      guest: "Guest",
      guestBadge: "Guest profile",
      viewProfile: "View profile",
      title: "Profile",
      since: "Created {d}",
      close: "Close",
      tabs: { overview: "Overview", settings: "Settings", account: "Account (demo)" },
      pbTitle: "Personal Best",
      bestWpm: "Best WPM",
      bestAcc: "Best accuracy",
      bestCpm: "Best CPM",
      totalTests: "Total tests",
      pbNone: "No record yet",
      pbNote: "Accuracy records need at least 50 typed characters.",
      achTitle: "Achievements",
      achCount: "{a} of {b} unlocked",
      achNone: "None unlocked yet",
      achNames: {
        first: "First Test",
        speedBeginner: "Speed Beginner",
        speedMaster: "Speed Master",
        accuracyExpert: "Accuracy Expert",
        hundred: "100 Tests Completed",
        daily: "Daily Practice Champion"
      },
      histTitle: "Recent tests",
      histEmpty: "No tests yet. Take your first test!",
      seeStats: "See all in Statistics",
      usernameTitle: "Username",
      usernameLabel: "Choose a username",
      usernameHint: "2 to 20 characters. Leave it empty to stay a guest. Avoid < > & and quotes.",
      save: "Save",
      saved: "Username saved.",
      cleared: "You are a guest again.",
      invalid: "Invalid username. Use 2 to 20 characters without < > & or quotes.",
      colorTitle: "Avatar color",
      colors: { gold: "Gold", emerald: "Emerald", blue: "Blue", purple: "Purple", light: "Light" },
      dataTitle: "Your data",
      dataNote:
        "Everything is saved only on this device, in your browser. No password or personal information is stored.",
      exportBtn: "Export my data",
      exported: "Your data file was created.",
      exportFail: "Your browser is not saving data, so there is nothing to export.",
      deleteBtn: "Delete all my data",
      confirmDelete:
        "Delete ALL saved data (history, achievements, profile and settings) from this device? This cannot be undone.",
      demoTitle: "Login and Register (demo)",
      demoText:
        "This is only a frontend demonstration. Real accounts, secure login and cloud sync need a backend server, which this website does not have yet. Nothing you type here is checked, sent or saved.",
      login: "Log in",
      register: "Register",
      email: "Email",
      password: "Password",
      confirm: "Confirm password",
      submitLogin: "Log in (demo)",
      submitRegister: "Register (demo)",
      demoDone: "Demo only: no account was created or checked, and nothing was sent or saved."
    },
    bn: {
      guest: "অতিথি",
      guestBadge: "অতিথি প্রোফাইল",
      viewProfile: "প্রোফাইল দেখো",
      title: "প্রোফাইল",
      since: "তৈরি: {d}",
      close: "বন্ধ করো",
      tabs: { overview: "সারসংক্ষেপ", settings: "সেটিংস", account: "অ্যাকাউন্ট (ডেমো)" },
      pbTitle: "ব্যক্তিগত সেরা",
      bestWpm: "সেরা WPM",
      bestAcc: "সেরা নির্ভুলতা",
      bestCpm: "সেরা CPM",
      totalTests: "মোট টেস্ট",
      pbNone: "এখনো কোনো রেকর্ড নেই",
      pbNote: "নির্ভুলতার রেকর্ডের জন্য কমপক্ষে 50টি অক্ষর টাইপ করতে হবে।",
      achTitle: "অর্জন",
      achCount: "{b}টির মধ্যে {a}টি আনলক",
      achNone: "এখনো কোনোটি আনলক হয়নি",
      achNames: {
        first: "প্রথম টেস্ট",
        speedBeginner: "গতির শিক্ষানবিস",
        speedMaster: "গতির মাস্টার",
        accuracyExpert: "নির্ভুলতার বিশেষজ্ঞ",
        hundred: "100টি টেস্ট সম্পূর্ণ",
        daily: "দৈনিক প্র্যাকটিসের চ্যাম্পিয়ন"
      },
      histTitle: "সাম্প্রতিক টেস্ট",
      histEmpty: "এখনো কোনো টেস্ট নেই। প্রথম টেস্টটি দাও!",
      seeStats: "পরিসংখ্যানে সব দেখো",
      usernameTitle: "ইউজারনেম",
      usernameLabel: "একটি ইউজারনেম বেছে নাও",
      usernameHint: "2 থেকে 20টি অক্ষর। খালি রাখলে অতিথি থাকবে। < > & ও উদ্ধৃতি চিহ্ন এড়িয়ে চলো।",
      save: "সেভ করো",
      saved: "ইউজারনেম সেভ হয়েছে।",
      cleared: "তুমি আবার অতিথি।",
      invalid: "ইউজারনেম ঠিক নেই। < > & বা উদ্ধৃতি চিহ্ন ছাড়া 2 থেকে 20টি অক্ষর দাও।",
      colorTitle: "অ্যাভাটারের রঙ",
      colors: { gold: "সোনালি", emerald: "সবুজ", blue: "নীল", purple: "বেগুনি", light: "হালকা" },
      dataTitle: "তোমার ডেটা",
      dataNote:
        "সবকিছু শুধু এই ডিভাইসের ব্রাউজারে সেভ থাকে। কোনো পাসওয়ার্ড বা ব্যক্তিগত তথ্য সেভ করা হয় না।",
      exportBtn: "আমার ডেটা এক্সপোর্ট করো",
      exported: "তোমার ডেটার ফাইল তৈরি হয়েছে।",
      exportFail: "তোমার ব্রাউজার ডেটা সেভ করছে না, তাই এক্সপোর্ট করার কিছু নেই।",
      deleteBtn: "আমার সব ডেটা মুছে ফেলো",
      confirmDelete:
        "এই ডিভাইস থেকে সব সেভ করা ডেটা (ইতিহাস, অর্জন, প্রোফাইল ও সেটিংস) মুছে ফেলবে? এটা আর ফেরানো যাবে না।",
      demoTitle: "লগইন ও রেজিস্টার (ডেমো)",
      demoText:
        "এটা শুধু ফ্রন্টএন্ডের ডেমো। আসল অ্যাকাউন্ট, নিরাপদ লগইন ও ক্লাউড সিংক-এর জন্য ব্যাকএন্ড সার্ভার লাগে, যা এই ওয়েবসাইটে এখনো নেই। এখানে যা লিখবে তা যাচাই, পাঠানো বা সেভ করা হয় না।",
      login: "লগইন",
      register: "রেজিস্টার",
      email: "ইমেইল",
      password: "পাসওয়ার্ড",
      confirm: "পাসওয়ার্ড আবার দাও",
      submitLogin: "লগইন (ডেমো)",
      submitRegister: "রেজিস্টার (ডেমো)",
      demoDone: "শুধু ডেমো: কোনো অ্যাকাউন্ট তৈরি বা যাচাই হয়নি, কিছু পাঠানো বা সেভও হয়নি।"
    }
  };

  function getStr() {
    var lang = window.TS_I18N ? window.TS_I18N.getLang() : "en";
    return STR[lang] || STR.en;
  }

  function fill(text, vars) {
    var out = text;
    for (var name in vars) {
      if (Object.prototype.hasOwnProperty.call(vars, name)) {
        out = out.split("{" + name + "}").join(vars[name]);
      }
    }
    return out;
  }

  function esc(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function round1(n) {
    return Math.round(n * 10) / 10;
  }

  function formatDate(ts) {
    try {
      return new Date(ts).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
    } catch (e) {
      return "";
    }
  }

  /* ---------- সেভ করা ডেটা ---------- */
  var memProfile = null;
  var memPb = {};

  function storeOk() {
    return !!(window.TS_STORE && window.TS_STORE.isAvailable());
  }

  // ইউজারনেম যাচাই: খালি হলে অতিথি, নাহলে 2 থেকে 20 অক্ষর
  function cleanName(raw) {
    var s = String(raw || "").replace(/\s+/g, " ").trim();
    if (s === "") {
      return "";
    }
    if (s.length < 2 || s.length > 20 || /[<>&"'`\\\/\u0000-\u001f]/.test(s)) {
      return null;
    }
    return s;
  }

  function loadProfile() {
    var p = storeOk() ? window.TS_STORE.get(PROFILE_KEY, null) : memProfile;
    if (!p || typeof p !== "object" || Array.isArray(p)) {
      p = {};
    }
    var name = typeof p.name === "string" ? cleanName(p.name) : "";
    return {
      name: name === null ? "" : name,
      color: COLOR_IDS.indexOf(p.color) !== -1 ? p.color : "gold",
      created: typeof p.created === "number" && isFinite(p.created) ? p.created : Date.now()
    };
  }

  function saveProfile(p) {
    if (storeOk()) {
      window.TS_STORE.set(PROFILE_KEY, p);
    } else {
      memProfile = p;
    }
  }

  var profile = loadProfile();
  saveProfile(profile); // Guest প্রোফাইল তৈরি (প্রথমবার)

  function getPb() {
    var pb = storeOk() ? window.TS_STORE.get(PB_KEY, {}) : memPb;
    if (!pb || typeof pb !== "object" || Array.isArray(pb)) {
      pb = {};
    }
    return pb;
  }

  function savePb(pb) {
    if (storeOk()) {
      window.TS_STORE.set(PB_KEY, pb);
    } else {
      memPb = pb;
    }
  }

  function isNum(v) {
    return typeof v === "number" && isFinite(v);
  }

  // নতুন রেকর্ড হলে true
  function tryRecord(pb, field, value, t) {
    if (!isNum(value)) {
      return false;
    }
    var cur = pb[field];
    if (!cur || !isNum(cur.v) || value > cur.v) {
      pb[field] = { v: value, t: t };
      return true;
    }
    return false;
  }

  function syncPbFromHistory() {
    var h = window.TS_ANALYTICS ? window.TS_ANALYTICS.getHistory() : [];
    var pb = getPb();
    var changed = false;

    for (var i = 0; i < h.length; i++) {
      var e = h[i];
      var typed = (isNum(e.ok) ? e.ok : 0) + (isNum(e.bad) ? e.bad : 0);
      if (tryRecord(pb, "wpm", e.wpm, e.t)) {
        changed = true;
      }
      if (isNum(e.cpm) && tryRecord(pb, "cpm", e.cpm, e.t)) {
        changed = true;
      }
      if (typed >= PB_MIN_CHARS && tryRecord(pb, "acc", e.acc, e.t)) {
        changed = true;
      }
    }

    if (changed) {
      savePb(pb);
    }
  }

  function totalTests() {
    var stats = storeOk() ? window.TS_STORE.get(STATS_KEY, {}) : {};
    var n = stats && isNum(stats.tests) ? stats.tests : 0;
    var h = window.TS_ANALYTICS ? window.TS_ANALYTICS.getHistory().length : 0;
    return Math.max(n, h);
  }

  /* ---------- সাইডবারের কার্ড ---------- */
  function displayName() {
    return profile.name || getStr().guest;
  }

  function firstLetter(text) {
    var chars = Array.from ? Array.from(text) : text.split("");
    return (chars[0] || "?").toUpperCase();
  }

  function applyAvatar(node) {
    var c = COLORS[profile.color] || COLORS.gold;
    node.style.background = c.bg;
    node.style.color = c.fg;
    node.textContent = firstLetter(displayName());
  }

  function updateCard() {
    var S = getStr();
    nameEl.textContent = displayName();
    subEl.textContent = S.viewProfile;
    applyAvatar(avatarEl);
  }

  // Leaderboard নতুন নাম দেখাতে আবার আঁকে (সক্রিয় ট্যাবে একবার চেপে)
  function refreshLeaderboard() {
    var active = document.querySelector("#leaderboard .tab-btn.active");
    if (active) {
      active.click();
    }
  }

  /* ---------- প্যানেল তৈরি ---------- */
  var modal = null;
  var bodyEl = null;
  var heroEl = null;
  var titleEl = null;
  var closeBtn = null;
  var tabsEl = null;
  var tab = "overview";
  var accountMode = "login";
  var lastFocus = null;
  var messages = { username: "", usernameError: false, data: "", demo: "" };

  function buildModal() {
    modal = document.createElement("div");
    modal.className = "modal";
    modal.id = "profile-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "profile-title");
    modal.hidden = true;

    modal.innerHTML =
      '<div class="modal-backdrop" data-close="1"></div>' +
      '<div class="modal-panel">' +
      '<div class="modal-head"><h3 id="profile-title"></h3>' +
      '<button type="button" class="modal-close" id="profile-close">&times;</button></div>' +
      '<div class="profile-hero" id="profile-hero"></div>' +
      '<div class="tab-row" id="profile-tabs" role="tablist"></div>' +
      '<div class="modal-body" id="profile-body"></div>' +
      "</div>";

    document.body.appendChild(modal);

    bodyEl = $("profile-body");
    heroEl = $("profile-hero");
    titleEl = $("profile-title");
    closeBtn = $("profile-close");
    tabsEl = $("profile-tabs");

    modal.addEventListener("click", onModalClick);
    modal.addEventListener("submit", onModalSubmit);
    modal.addEventListener("keydown", onModalKey);
  }

  function renderHero() {
    var S = getStr();
    heroEl.innerHTML =
      '<span class="profile-avatar big" id="profile-avatar-big"></span>' +
      "<div>" +
      '<span class="profile-badge">' + S.guestBadge + "</span>" +
      "<strong>" + esc(displayName()) + "</strong>" +
      "<small>" + fill(S.since, { d: formatDate(profile.created) }) + "</small>" +
      "</div>";
    applyAvatar($("profile-avatar-big"));
  }

  function renderTabs() {
    var S = getStr();
    var ids = ["overview", "settings", "account"];
    var html = "";
    for (var i = 0; i < ids.length; i++) {
      var on = ids[i] === tab;
      html +=
        '<button type="button" role="tab" class="tab-btn' + (on ? " active" : "") +
        '" aria-selected="' + (on ? "true" : "false") + '" data-tab="' + ids[i] + '">' +
        S.tabs[ids[i]] + "</button>";
    }
    tabsEl.innerHTML = html;
  }

  function pbTile(value, label, rec, suffix) {
    var S = getStr();
    var big = rec ? round1(value) + (suffix || "") : "-";
    var date = rec ? formatDate(rec.t) : S.pbNone;
    return '<div class="result-item"><span>' + big + "</span><small>" + label + '</small><span class="pb-date">' + date + "</span></div>";
  }

  function renderOverview() {
    var S = getStr();
    var pb = getPb();
    var html = "";

    html += "<h4>" + S.pbTitle + "</h4>";
    html += '<div class="result-grid">';
    html += pbTile(pb.wpm ? pb.wpm.v : 0, S.bestWpm, pb.wpm, "");
    html += pbTile(pb.acc ? pb.acc.v : 0, S.bestAcc, pb.acc, "%");
    html += pbTile(pb.cpm ? pb.cpm.v : 0, S.bestCpm, pb.cpm, "");
    html += '<div class="result-item"><span>' + totalTests() + "</span><small>" + S.totalTests + "</small></div>";
    html += "</div>";
    html += '<p class="modal-note">' + S.pbNote + "</p>";

    // অর্জন
    var unlocked = window.TS_ACHIEVEMENTS ? window.TS_ACHIEVEMENTS.getUnlocked() : {};
    var chips = "";
    var count = 0;
    for (var i = 0; i < ACH_IDS.length; i++) {
      if (unlocked[ACH_IDS[i]]) {
        count++;
        chips += '<span class="chip">' + S.achNames[ACH_IDS[i]] + "</span>";
      }
    }
    html += "<h4>" + S.achTitle + "</h4>";
    html += "<p>" + fill(S.achCount, { a: count, b: ACH_IDS.length }) + "</p>";
    html += '<div class="chip-wrap">' + (chips || '<span class="modal-note">' + S.achNone + "</span>") + "</div>";

    // শেষ ৫টি টেস্ট
    var h = window.TS_ANALYTICS ? window.TS_ANALYTICS.getHistory() : [];
    html += "<h4>" + S.histTitle + "</h4>";
    if (!h.length) {
      html += '<p class="modal-note">' + S.histEmpty + "</p>";
    } else {
      html += '<ul class="history-list">';
      var shown = h.slice(-5).reverse();
      for (var j = 0; j < shown.length; j++) {
        html +=
          '<li class="history-item"><div class="history-main"><strong>' + round1(shown[j].wpm) +
          " WPM</strong><span>" + round1(shown[j].acc) + '%</span></div><div class="history-meta">' +
          formatDate(shown[j].t) + "</div></li>";
      }
      html += "</ul>";
      html += '<a href="#statistics" class="btn btn-outline" data-close="1">' + S.seeStats + "</a>";
    }

    bodyEl.innerHTML = html;
  }

  function renderSettings() {
    var S = getStr();
    var html = "";

    html += "<h4>" + S.usernameTitle + "</h4>";
    html += '<form id="username-form" novalidate>';
    html += '<label for="username-input">' + S.usernameLabel + "</label>";
    html += '<div class="form-row">';
    html += '<input type="text" id="username-input" maxlength="20" autocomplete="off" value="' + esc(profile.name) + '">';
    html += '<button type="submit" class="btn btn-gold">' + S.save + "</button>";
    html += "</div>";
    html += '<p class="modal-note">' + S.usernameHint + "</p>";
    html += '<p class="form-msg' + (messages.usernameError ? " error" : "") + '" role="status">' + messages.username + "</p>";
    html += "</form>";

    html += "<h4>" + S.colorTitle + "</h4>";
    html += '<div class="swatch-row">';
    for (var i = 0; i < COLOR_IDS.length; i++) {
      var id = COLOR_IDS[i];
      html +=
        '<button type="button" class="swatch' + (profile.color === id ? " active" : "") +
        '" data-color="' + id + '" style="background:' + COLORS[id].bg + '" aria-label="' + S.colors[id] +
        '" aria-pressed="' + (profile.color === id ? "true" : "false") + '"></button>';
    }
    html += "</div>";

    html += "<h4>" + S.dataTitle + "</h4>";
    html += '<p class="modal-note">' + S.dataNote + "</p>";
    html += '<div class="data-actions">';
    html += '<button type="button" class="btn btn-outline" data-action="export">' + S.exportBtn + "</button>";
    html += '<button type="button" class="btn btn-danger" data-action="delete">' + S.deleteBtn + "</button>";
    html += "</div>";
    html += '<p class="form-msg" role="status">' + messages.data + "</p>";

    bodyEl.innerHTML = html;
  }

  function renderAccount() {
    var S = getStr();
    var isLogin = accountMode === "login";
    var html = "";

    html += '<div class="demo-banner"><strong>' + S.demoTitle + "</strong><br>" + S.demoText + "</div>";
    html += '<div class="seg-row">';
    html += '<button type="button" class="seg-btn' + (isLogin ? " active" : "") + '" data-mode="login">' + S.login + "</button>";
    html += '<button type="button" class="seg-btn' + (isLogin ? "" : " active") + '" data-mode="register">' + S.register + "</button>";
    html += "</div>";

    html += '<form class="demo-form" id="demo-form" novalidate autocomplete="off">';
    html += '<label for="demo-email">' + S.email + "</label>";
    html += '<input type="email" id="demo-email" autocomplete="off">';
    html += '<label for="demo-pass">' + S.password + "</label>";
    html += '<input type="password" id="demo-pass" autocomplete="off">';
    if (!isLogin) {
      html += '<label for="demo-pass2">' + S.confirm + "</label>";
      html += '<input type="password" id="demo-pass2" autocomplete="off">';
    }
    html += '<button type="submit" class="btn btn-outline">' + (isLogin ? S.submitLogin : S.submitRegister) + "</button>";
    html += '<p class="form-msg" role="status">' + messages.demo + "</p>";
    html += "</form>";

    bodyEl.innerHTML = html;
  }

  function renderAll() {
    if (!modal) {
      return;
    }
    var S = getStr();
    titleEl.textContent = S.title;
    closeBtn.setAttribute("aria-label", S.close);
    renderHero();
    renderTabs();
    if (tab === "overview") {
      syncPbFromHistory();
      renderOverview();
    } else if (tab === "settings") {
      renderSettings();
    } else {
      renderAccount();
    }
  }

  /* ---------- খোলা ও বন্ধ ---------- */
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
    messages = { username: "", usernameError: false, data: "", demo: "" };
    tab = "overview";
    renderAll();

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

  /* ---------- ক্রিয়া ---------- */
  function exportData() {
    var S = getStr();
    if (!storeOk()) {
      messages.data = S.exportFail;
      renderSettings();
      return;
    }

    var payload = {
      app: "Type Speed.com",
      exportedAt: new Date().toISOString(),
      data: window.TS_STORE.exportAll()
    };

    try {
      var blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
      var url = URL.createObjectURL(blob);
      var link = document.createElement("a");
      link.href = url;
      link.download = "type-speed-data.json";
      document.body.appendChild(link);
      link.click();
      setTimeout(function () {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 500);
      messages.data = S.exported;
    } catch (e) {
      messages.data = S.exportFail;
    }
    renderSettings();
  }

  function deleteAllData() {
    if (!window.confirm(getStr().confirmDelete)) {
      return;
    }
    memProfile = null;
    memPb = {};
    if (window.TS_STORE) {
      window.TS_STORE.clearAll();
    }
    window.location.reload();
  }

  function saveUsername() {
    var S = getStr();
    var input = $("username-input");
    var cleaned = cleanName(input ? input.value : "");

    if (cleaned === null) {
      messages.username = S.invalid;
      messages.usernameError = true;
      renderSettings();
      return;
    }

    profile.name = cleaned;
    saveProfile(profile);
    messages.username = cleaned === "" ? S.cleared : S.saved;
    messages.usernameError = false;
    updateCard();
    renderHero();
    renderSettings();
    refreshLeaderboard();
  }

  function setColor(id) {
    if (COLOR_IDS.indexOf(id) === -1) {
      return;
    }
    profile.color = id;
    saveProfile(profile);
    updateCard();
    renderHero();
    renderSettings();
  }

  /* ---------- ইভেন্ট ---------- */
  function onModalClick(event) {
    var node = event.target;
    while (node && node !== modal) {
      if (node.getAttribute) {
        if (node.getAttribute("data-close")) {
          closeModal();
          return;
        }
        if (node.id === "profile-close") {
          closeModal();
          return;
        }
        if (node.getAttribute("data-tab")) {
          tab = node.getAttribute("data-tab");
          renderAll();
          return;
        }
        if (node.getAttribute("data-color")) {
          setColor(node.getAttribute("data-color"));
          return;
        }
        if (node.getAttribute("data-mode")) {
          accountMode = node.getAttribute("data-mode");
          messages.demo = "";
          renderAccount();
          return;
        }
        var action = node.getAttribute("data-action");
        if (action === "export") {
          exportData();
          return;
        }
        if (action === "delete") {
          deleteAllData();
          return;
        }
      }
      node = node.parentNode;
    }
  }

  function onModalSubmit(event) {
    event.preventDefault();
    var form = event.target;

    if (form.id === "username-form") {
      saveUsername();
      return;
    }

    if (form.id === "demo-form") {
      // ডেমো: কিছুই পড়া, পাঠানো বা সেভ করা হয় না। শুধু ঘর খালি করা হয়।
      var fields = form.querySelectorAll("input");
      for (var i = 0; i < fields.length; i++) {
        fields[i].value = "";
      }
      messages.demo = getStr().demoDone;
      var msg = form.querySelector(".form-msg");
      if (msg) {
        msg.textContent = messages.demo;
      }
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

  openBtn.addEventListener("click", openModal);

  // নতুন টেস্ট শেষ হলে Personal Best হালনাগাদ
  document.addEventListener("typingtest:finished", function (event) {
    var r = event.detail;
    if (!r || !isNum(r.netWpm) || r.typedChars < 5) {
      return;
    }

    var pb = getPb();
    var changed = false;
    if (tryRecord(pb, "wpm", r.netWpm, r.timestamp || Date.now())) {
      changed = true;
    }
    if (tryRecord(pb, "cpm", r.cpm, r.timestamp || Date.now())) {
      changed = true;
    }
    if (r.typedChars >= PB_MIN_CHARS && tryRecord(pb, "acc", r.accuracy, r.timestamp || Date.now())) {
      changed = true;
    }
    if (changed) {
      savePb(pb);
    }

    if (modal && !modal.hidden && tab === "overview") {
      setTimeout(renderAll, 100);
    }
  });

  document.addEventListener("tsi18n:changed", function () {
    updateCard();
    renderAll();
  });

  // অন্য ফাইল (Leaderboard) এই নাম ব্যবহার করে
  window.TS_PROFILE = {
    getName: function () {
      return profile.name; // অতিথি হলে খালি লেখা
    },
    getDisplayName: displayName,
    getColor: function () {
      return profile.color;
    }
  };

  /* ---------- শুরু ---------- */
  syncPbFromHistory();
  updateCard();
})();