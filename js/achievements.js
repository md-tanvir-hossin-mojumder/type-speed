/* achievements.js - Phase 12: Achievements */

(function () {
  "use strict";

  function $(id) {
    return document.getElementById(id);
  }

  var grid = $("achievements-grid");
  var summary = $("achievements-summary");

  if (!grid) {
    return;
  }

  var KEY_UNLOCK = "achievements";
  var KEY_STATS = "ach_stats";
  var KEY_DAILY = "daily_done"; // Practice Center-এর Daily Practice-এর ডেটা

  // এখানকার সংখ্যা বদলালে শর্ত ও লেখা দুটোই বদলে যাবে
  var TARGETS = {
    first: 1,
    speedBeginner: 25,
    speedMaster: 60,
    accuracyExpert: 1,
    hundred: 100,
    daily: 7
  };
  var ACC_GOAL = 98;
  var ACC_CHARS = 100;
  var MIN_TYPED = 5;

  var IDS = ["first", "speedBeginner", "speedMaster", "accuracyExpert", "hundred", "daily"];

  var ICONS = {
    first: '<circle cx="12" cy="12" r="9"/><path d="M10 8l6 4-6 4z"/>',
    speedBeginner: '<path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/>',
    speedMaster: '<path d="M8 21h8M12 17v4"/><path d="M7 4h10v5a5 5 0 0 1-10 0V4z"/><path d="M7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4"/>',
    accuracyExpert: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    hundred: '<circle cx="12" cy="9" r="6"/><path d="M8.5 14L7 22l5-3 5 3-1.5-8"/>',
    daily: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>'
  };

  /* ---------- লেখা (ইংরেজি ও বাংলা) ---------- */
  var STR = {
    en: {
      names: {
        first: "First Test",
        speedBeginner: "Speed Beginner",
        speedMaster: "Speed Master",
        accuracyExpert: "Accuracy Expert",
        hundred: "100 Tests Completed",
        daily: "Daily Practice Champion"
      },
      descs: {
        first: "Complete your first test.",
        speedBeginner: "Reach {n} net WPM in a test.",
        speedMaster: "Reach {n} net WPM in a test.",
        accuracyExpert: "Finish a test with {a}% accuracy or more, typing at least {c} characters.",
        hundred: "Finish {n} tests.",
        daily: "Complete Daily Practice {n} days in a row."
      },
      pTests: "{a} / {b} tests",
      pBest: "Best: {a} WPM (goal: {b})",
      pStreak: "Streak: {a} / {b} days",
      locked: "Locked",
      unlockedOn: "Unlocked on {d}",
      unlockedToast: "Achievement unlocked: {name}",
      summary: "{a} of {b} achievements unlocked",
      noStorage: "Your browser is not saving data, so achievements will reset when you refresh the page."
    },
    bn: {
      names: {
        first: "প্রথম টেস্ট",
        speedBeginner: "গতির শিক্ষানবিস",
        speedMaster: "গতির মাস্টার",
        accuracyExpert: "নির্ভুলতার বিশেষজ্ঞ",
        hundred: "100টি টেস্ট সম্পূর্ণ",
        daily: "দৈনিক প্র্যাকটিসের চ্যাম্পিয়ন"
      },
      descs: {
        first: "তোমার প্রথম টেস্ট সম্পূর্ণ করো।",
        speedBeginner: "একটি টেস্টে নেট {n} WPM ছোঁও।",
        speedMaster: "একটি টেস্টে নেট {n} WPM ছোঁও।",
        accuracyExpert: "কমপক্ষে {c}টি অক্ষর টাইপ করে {a}% বা তার বেশি নির্ভুলতায় টেস্ট শেষ করো।",
        hundred: "{n}টি টেস্ট শেষ করো।",
        daily: "টানা {n} দিন দৈনিক প্র্যাকটিস সম্পূর্ণ করো।"
      },
      pTests: "{a} / {b}টি টেস্ট",
      pBest: "সেরা: {a} WPM (লক্ষ্য: {b})",
      pStreak: "ধারাবাহিক: {a} / {b} দিন",
      locked: "লক করা",
      unlockedOn: "আনলক হয়েছে {d}",
      unlockedToast: "অর্জন আনলক হয়েছে: {name}",
      summary: "{b}টির মধ্যে {a}টি অর্জন আনলক হয়েছে",
      noStorage: "তোমার ব্রাউজার ডেটা সেভ করছে না, তাই পেজ রিফ্রেশ করলে অর্জন মুছে যাবে।"
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

  function round1(n) {
    return Math.round(n * 10) / 10;
  }

  function num(v) {
    return typeof v === "number" && isFinite(v) && v > 0 ? v : 0;
  }

  /* ---------- সেভ করা ডেটা ---------- */
  var memUnlocked = {};
  var memStats = {};

  function storeOk() {
    return !!(window.TS_STORE && window.TS_STORE.isAvailable());
  }

  function getUnlocked() {
    var u = storeOk() ? window.TS_STORE.get(KEY_UNLOCK, {}) : memUnlocked;
    if (!u || typeof u !== "object" || Array.isArray(u)) {
      return {};
    }
    return u;
  }

  function setUnlocked(u) {
    if (storeOk()) {
      window.TS_STORE.set(KEY_UNLOCK, u);
    } else {
      memUnlocked = u;
    }
  }

  function getStats() {
    var s = storeOk() ? window.TS_STORE.get(KEY_STATS, {}) : memStats;
    if (!s || typeof s !== "object" || Array.isArray(s)) {
      s = {};
    }
    return { tests: num(s.tests), bestWpm: num(s.bestWpm), accExpert: s.accExpert === true };
  }

  function setStats(s) {
    if (storeOk()) {
      window.TS_STORE.set(KEY_STATS, s);
    } else {
      memStats = s;
    }
  }

  // আগের ইতিহাস থেকে হিসাব মিলিয়ে নেওয়া (পুরোনো টেস্টও ধরা হবে)
  function syncFromHistory(stats) {
    var h = window.TS_ANALYTICS ? window.TS_ANALYTICS.getHistory() : [];
    stats.tests = Math.max(stats.tests, h.length);
    for (var i = 0; i < h.length; i++) {
      if (h[i].wpm > stats.bestWpm) {
        stats.bestWpm = h[i].wpm;
      }
      if (h[i].acc >= ACC_GOAL && (num(h[i].ok) + num(h[i].bad)) >= ACC_CHARS) {
        stats.accExpert = true;
      }
    }
  }

  /* ---------- Daily Practice-এর ধারাবাহিকতা ---------- */
  function todayNumber() {
    var d = new Date();
    return Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000);
  }

  function dailyStreak() {
    var arr = storeOk() ? window.TS_STORE.get(KEY_DAILY, []) : [];
    if (!Array.isArray(arr)) {
      return 0;
    }
    var seen = {};
    for (var i = 0; i < arr.length; i++) {
      if (typeof arr[i] === "number" && isFinite(arr[i])) {
        seen[arr[i]] = true;
      }
    }
    var today = todayNumber();
    var day = seen[today] ? today : today - 1;
    var count = 0;
    while (seen[day]) {
      count++;
      day--;
    }
    return count;
  }

  /* ---------- যাচাই ও আনলক ---------- */
  var lastValues = {};
  var toastTimer = null;

  function toast(message) {
    var box = $("toast");
    if (!box) {
      box = document.createElement("div");
      box.id = "toast";
      box.className = "toast";
      box.setAttribute("role", "status");
      document.body.appendChild(box);
    }
    box.textContent = message;
    box.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      box.classList.remove("show");
    }, 4500);
  }

  function evaluate(showToast) {
    var stats = getStats();
    syncFromHistory(stats);
    setStats(stats);

    lastValues = {
      first: stats.tests,
      speedBeginner: stats.bestWpm,
      speedMaster: stats.bestWpm,
      accuracyExpert: stats.accExpert ? 1 : 0,
      hundred: stats.tests,
      daily: dailyStreak()
    };

    var unlocked = getUnlocked();
    var newly = [];

    for (var i = 0; i < IDS.length; i++) {
      var id = IDS[i];
      if (lastValues[id] >= TARGETS[id] && !unlocked[id]) {
        unlocked[id] = Date.now();
        newly.push(id);
      }
    }

    if (newly.length) {
      setUnlocked(unlocked);
    }

    render();

    if (showToast && newly.length) {
      var S = getStr();
      var names = [];
      for (var j = 0; j < newly.length; j++) {
        names.push(S.names[newly[j]]);
      }
      toast(fill(S.unlockedToast, { name: names.join(", ") }));
    }
  }

  /* ---------- দেখানো ---------- */
  function formatDate(ts) {
    try {
      return new Date(ts).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
    } catch (e) {
      return "";
    }
  }

  function progressText(id, value) {
    var S = getStr();
    var t = TARGETS[id];
    if (id === "first" || id === "hundred") {
      return fill(S.pTests, { a: Math.min(value, t), b: t });
    }
    if (id === "speedBeginner" || id === "speedMaster") {
      return fill(S.pBest, { a: round1(value), b: t });
    }
    if (id === "daily") {
      return fill(S.pStreak, { a: Math.min(value, t), b: t });
    }
    return "";
  }

  function render() {
    var S = getStr();
    var unlocked = getUnlocked();
    var html = "";
    var count = 0;

    for (var i = 0; i < IDS.length; i++) {
      var id = IDS[i];
      var isOn = !!unlocked[id];
      var target = TARGETS[id];
      var value = lastValues[id] || 0;
      var percent = isOn ? 100 : Math.min(100, Math.round((value / target) * 100));
      var desc = fill(S.descs[id], { n: target, a: ACC_GOAL, c: ACC_CHARS });
      var prog = progressText(id, value);

      if (isOn) {
        count++;
      }

      html += '<article class="card badge-card badge ' + (isOn ? "unlocked" : "locked") + '" data-badge="' + id + '">';
      html +=
        '<svg class="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        ICONS[id] +
        "</svg>";
      html += "<h3>" + S.names[id] + "</h3>";
      html += "<p>" + desc + "</p>";
      html += '<div class="progress-bar" aria-hidden="true"><div class="progress-fill" style="width:' + percent + '%"></div></div>';
      if (prog) {
        html += '<p class="badge-progress">' + prog + "</p>";
      }
      html +=
        '<p class="badge-state">' +
        (isOn ? fill(S.unlockedOn, { d: formatDate(unlocked[id]) }) : S.locked) +
        "</p>";
      html += "</article>";
    }

    grid.innerHTML = html;

    if (summary) {
      var text = fill(S.summary, { a: count, b: IDS.length });
      if (!storeOk()) {
        text += " · " + S.noStorage;
      }
      summary.textContent = text;
    }
  }

  /* ---------- টেস্ট শেষ হলে ---------- */
  function onFinished(event) {
    var r = event.detail;
    if (!r || typeof r.netWpm !== "number" || r.typedChars < MIN_TYPED) {
      return;
    }

    var stats = getStats();
    stats.tests += 1;
    if (r.netWpm > stats.bestWpm) {
      stats.bestWpm = r.netWpm;
    }
    if (r.accuracy >= ACC_GOAL && r.typedChars >= ACC_CHARS) {
      stats.accExpert = true;
    }
    setStats(stats);

    // অন্য ফাইলগুলো (ইতিহাস, Daily Practice) সেভ করার সময় দিয়ে তারপর যাচাই
    setTimeout(function () {
      evaluate(true);
    }, 80);
  }

  document.addEventListener("typingtest:finished", onFinished);
  document.addEventListener("tsi18n:changed", render);

  // পরের Phase (Profile) এই ডেটা ব্যবহার করবে
  window.TS_ACHIEVEMENTS = {
    getUnlocked: getUnlocked
  };

  /* ---------- শুরু ---------- */
  evaluate(false);
})();