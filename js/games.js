/* games.js - Phase 9: Typing Games (ভাষা আগের অবস্থায় ফেরে) */

(function () {
  "use strict";

  function $(id) {
    return document.getElementById(id);
  }

  var grid = $("games-grid");
  var statusBox = $("games-status");
  var banner = $("game-banner");
  var startBtn = $("start-btn");
  var durationSelect = $("duration-select");
  var customDuration = $("custom-duration");
  var difficultySelect = $("difficulty-select");
  var modeSelect = $("mode-select");
  var customText = $("custom-text");

  if (!grid || !startBtn || !durationSelect || !customDuration || !difficultySelect || !modeSelect || !customText) {
    return;
  }

  var TEXTS = window.TYPE_TEXTS || {};
  var WINS_KEY = "games_wins";
  var DAILY_KEY = "game_daily_done";

  var GAME_IDS = ["speed", "accuracy", "time"];
  var LEVEL_IDS = ["easy", "medium", "hard"];

  var levels = { speed: "medium", accuracy: "medium", time: "medium" };
  var activeGame = null;
  var messageKey = "";
  var lastBanner = null;

  /* ---------- গেমের নিয়ম ---------- */
  var RULES = {
    speed: {
      easy: { target: 25, dur: 30 },
      medium: { target: 40, dur: 30 },
      hard: { target: 60, dur: 30 }
    },
    accuracy: {
      easy: { target: 95, count: 2 },
      medium: { target: 98, count: 3 },
      hard: { target: 99, count: 4 }
    },
    time: {
      easy: { req: 20, count: 3 },
      medium: { req: 35, count: 3 },
      hard: { req: 50, count: 4 }
    }
  };

  /* ---------- লেখা (ইংরেজি ও বাংলা) ---------- */
  var STR = {
    en: {
      start: "Start Challenge",
      level: "Level",
      wins: "Wins: {n}",
      soon: "Coming soon",
      names: { speed: "Speed Challenge", accuracy: "Accuracy Challenge", time: "Time Attack" },
      levels: { easy: "Easy", medium: "Medium", hard: "Hard" },
      goalSpeed: "Goal: {n} WPM in {s}s",
      goalAcc: "Goal: {n}% accuracy, finish the text",
      goalTime: "Needed speed: {n} WPM",
      cards: {
        speed: { t: "Speed Challenge", d: "Reach the target speed before time runs out." },
        accuracy: { t: "Accuracy Challenge", d: "Finish the text with high accuracy." },
        time: { t: "Time Attack", d: "Finish the whole text before the clock runs out." },
        daily: { t: "Daily Challenge", d: "One new challenge every day." },
        multi: { t: "Multiplayer", d: "Future Feature: it needs a backend, so it is not available yet." }
      },
      dailyToday: "Today: {g} ({l})",
      dailyDone: "Today: completed",
      dailyTodo: "Today: not done yet",
      streak: "Streak: {n} day(s)",
      win: "Challenge complete!",
      lose: "Not this time. Try again!",
      dSpeed: "Your speed: {a} WPM. Goal: {b} WPM.",
      dAcc: "Your accuracy: {a}%. Goal: {b}%.",
      dUnfinished: "You did not finish the whole text.",
      dTimeWin: "Finished in {a}s. Limit: {b}s.",
      dTimeLose: "Time ran out before you finished the text.",
      msgBusy: "A test is in progress. Finish it or press Restart first.",
      msgCustom: "Custom Text was selected, so English text is used."
    },
    bn: {
      start: "চ্যালেঞ্জ শুরু করো",
      level: "লেভেল",
      wins: "জয়: {n}",
      soon: "শীঘ্রই আসছে",
      names: { speed: "স্পিড চ্যালেঞ্জ", accuracy: "নির্ভুলতা চ্যালেঞ্জ", time: "টাইম অ্যাটাক" },
      levels: { easy: "সহজ", medium: "মাঝারি", hard: "কঠিন" },
      goalSpeed: "লক্ষ্য: {s} সেকেন্ডে {n} WPM",
      goalAcc: "লক্ষ্য: {n}% নির্ভুলতা, লেখা শেষ করা চাই",
      goalTime: "প্রয়োজনীয় গতি: {n} WPM",
      cards: {
        speed: { t: "স্পিড চ্যালেঞ্জ", d: "সময় শেষ হওয়ার আগে লক্ষ্যের গতি ছুঁয়ে দেখাও।" },
        accuracy: { t: "নির্ভুলতা চ্যালেঞ্জ", d: "উঁচু নির্ভুলতায় লেখাটি শেষ করো।" },
        time: { t: "টাইম অ্যাটাক", d: "ঘড়ির সময় ফুরোনোর আগে পুরো লেখাটি শেষ করো।" },
        daily: { t: "দৈনিক চ্যালেঞ্জ", d: "প্রতিদিন একটি নতুন চ্যালেঞ্জ।" },
        multi: { t: "মাল্টিপ্লেয়ার", d: "ভবিষ্যতের ফিচার: এর জন্য ব্যাকএন্ড লাগবে, তাই এখনো পাওয়া যায় না।" }
      },
      dailyToday: "আজ: {g} ({l})",
      dailyDone: "আজ: সম্পূর্ণ হয়েছে",
      dailyTodo: "আজ: এখনো হয়নি",
      streak: "ধারাবাহিক: {n} দিন",
      win: "চ্যালেঞ্জ সম্পূর্ণ!",
      lose: "এবার হলো না। আবার চেষ্টা করো!",
      dSpeed: "তোমার গতি: {a} WPM। লক্ষ্য: {b} WPM।",
      dAcc: "তোমার নির্ভুলতা: {a}%। লক্ষ্য: {b}%।",
      dUnfinished: "তুমি পুরো লেখাটি শেষ করোনি।",
      dTimeWin: "{a} সেকেন্ডে শেষ হয়েছে। সীমা: {b} সেকেন্ড।",
      dTimeLose: "লেখাটি শেষ করার আগেই সময় ফুরিয়ে গেছে।",
      msgBusy: "একটি টেস্ট চলছে। আগে সেটা শেষ করো বা রিস্টার্ট চাপো।",
      msgCustom: "কাস্টম টেক্সট বাছাই করা ছিল, তাই ইংরেজি লেখা ব্যবহার করা হয়েছে।"
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

  /* ---------- তারিখ ও এলোমেলো সংখ্যা ---------- */
  function todayNumber() {
    var d = new Date();
    return Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000);
  }

  // একই seed দিলে সবসময় একই ক্রম দেয় (Daily Challenge-এর জন্য)
  function makeRand(seed) {
    var s = seed % 4294967296;
    if (s < 0) {
      s += 4294967296;
    }
    return function () {
      s = (s * 1664525 + 1013904223) % 4294967296;
      return s / 4294967296;
    };
  }

  function pickSentences(bank, count, rand) {
    var pool = bank.slice();
    var out = [];
    while (out.length < count && pool.length) {
      var i = Math.floor(rand() * pool.length);
      out.push(pool.splice(i, 1)[0]);
    }
    return out;
  }

  function normText(s) {
    var t = s.replace(/\s+/g, " ").trim();
    return t.normalize ? t.normalize("NFC") : t;
  }

  /* ---------- সেভ করা ডেটা ---------- */
  function getWins() {
    var w = window.TS_STORE ? window.TS_STORE.get(WINS_KEY, {}) : {};
    if (!w || typeof w !== "object" || Array.isArray(w)) {
      return {};
    }
    return w;
  }

  function getDoneDays() {
    var arr = window.TS_STORE ? window.TS_STORE.get(DAILY_KEY, []) : [];
    if (!Array.isArray(arr)) {
      return [];
    }
    var clean = [];
    for (var i = 0; i < arr.length; i++) {
      if (typeof arr[i] === "number" && isFinite(arr[i])) {
        clean.push(arr[i]);
      }
    }
    return clean;
  }

  function getStreak(arr) {
    var today = todayNumber();
    var seen = {};
    for (var i = 0; i < arr.length; i++) {
      seen[arr[i]] = true;
    }
    var day = seen[today] ? today : today - 1;
    var count = 0;
    while (seen[day]) {
      count++;
      day--;
    }
    return count;
  }

  function addWin(game) {
    if (!window.TS_STORE) {
      return;
    }

    var wins = getWins();
    wins[game.kind] = (typeof wins[game.kind] === "number" ? wins[game.kind] : 0) + 1;
    window.TS_STORE.set(WINS_KEY, wins);

    if (game.daily) {
      var days = getDoneDays();
      var today = todayNumber();
      if (days.indexOf(today) === -1) {
        days.push(today);
        days.sort(function (a, b) {
          return a - b;
        });
        if (days.length > 400) {
          days = days.slice(days.length - 400);
        }
        window.TS_STORE.set(DAILY_KEY, days);
      }
    }
  }

  /* ---------- আজকের Daily Challenge ---------- */
  function dailyInfo() {
    var day = todayNumber();
    return {
      kind: GAME_IDS[day % 3],
      level: LEVEL_IDS[Math.floor(day / 3) % 3]
    };
  }

  /* ---------- গেমের নিয়ম তৈরি ---------- */
  function buildRule(kind, level, daily, lang) {
    var rand = daily ? makeRand(todayNumber() * 2654435761 + 7) : Math.random;
    var bank = (TEXTS[lang] || TEXTS.english)[level].sentence;
    var rule = { kind: kind, level: level, daily: daily, lang: lang };

    if (kind === "speed") {
      rule.target = RULES.speed[level].target;
      rule.duration = RULES.speed[level].dur;
    } else if (kind === "accuracy") {
      var a = RULES.accuracy[level];
      rule.target = a.target;
      rule.text = pickSentences(bank, a.count, rand).join(" ");
      rule.duration = 120;
    } else {
      var t = RULES.time[level];
      rule.req = t.req;
      rule.text = pickSentences(bank, t.count, rand).join(" ");
      var chars = normText(rule.text).length;
      var secs = Math.ceil((chars / 5 / t.req) * 60);
      secs = Math.ceil(secs / 5) * 5;
      rule.duration = Math.min(600, Math.max(10, secs));
    }

    if (rule.text) {
      rule.textLen = normText(rule.text).length;
    }
    return rule;
  }

  /* ---------- কার্ড আঁকা ---------- */
  function goalText(kind, level) {
    var S = getStr();
    if (kind === "speed") {
      return fill(S.goalSpeed, { n: RULES.speed[level].target, s: RULES.speed[level].dur });
    }
    if (kind === "accuracy") {
      return fill(S.goalAcc, { n: RULES.accuracy[level].target });
    }
    return fill(S.goalTime, { n: RULES.time[level].req });
  }

  function render() {
    var S = getStr();
    var wins = getWins();
    var html = "";
    var i;
    var j;

    for (i = 0; i < GAME_IDS.length; i++) {
      var kind = GAME_IDS[i];
      var c = S.cards[kind];
      var count = typeof wins[kind] === "number" ? wins[kind] : 0;

      html += '<article class="card game-card">';
      html += "<h3>" + c.t + "</h3>";
      html += "<p>" + c.d + "</p>";
      html += '<label for="level-' + kind + '">' + S.level + "</label>";
      html += '<select id="level-' + kind + '" class="game-level" data-game="' + kind + '">';
      for (j = 0; j < LEVEL_IDS.length; j++) {
        html +=
          '<option value="' +
          LEVEL_IDS[j] +
          '"' +
          (levels[kind] === LEVEL_IDS[j] ? " selected" : "") +
          ">" +
          S.levels[LEVEL_IDS[j]] +
          "</option>";
      }
      html += "</select>";
      html += '<div class="chip-row"><span class="chip" id="goal-' + kind + '">' + goalText(kind, levels[kind]) + "</span></div>";
      html += '<p class="daily-status">' + fill(S.wins, { n: count }) + "</p>";
      html += '<button type="button" class="btn btn-outline" data-game-start="' + kind + '">' + S.start + "</button>";
      html += "</article>";
    }

    // Daily Challenge
    var info = dailyInfo();
    var days = getDoneDays();
    var line = days.indexOf(todayNumber()) !== -1 ? S.dailyDone : S.dailyTodo;
    var streak = getStreak(days);
    if (streak > 0) {
      line += " · " + fill(S.streak, { n: streak });
    }

    html += '<article class="card game-card daily">';
    html += "<h3>" + S.cards.daily.t + "</h3>";
    html += "<p>" + S.cards.daily.d + "</p>";
    html += "<p>" + fill(S.dailyToday, { g: S.names[info.kind], l: S.levels[info.level] }) + "</p>";
    html += '<div class="chip-row"><span class="chip">' + goalText(info.kind, info.level) + "</span></div>";
    html += '<p class="daily-status">' + line + "</p>";
    html += '<button type="button" class="btn btn-gold" data-game-start="daily">' + S.start + "</button>";
    html += "</article>";

    // Multiplayer (ভবিষ্যতের ফিচার)
    html += '<article class="card game-card future">';
    html += "<h3>" + S.cards.multi.t + "</h3>";
    html += "<p>" + S.cards.multi.d + "</p>";
    html += '<button type="button" class="btn btn-outline" disabled>' + S.soon + "</button>";
    html += "</article>";

    grid.innerHTML = html;
    showMessage(messageKey);
  }

  function showMessage(key) {
    messageKey = key || "";
    if (statusBox) {
      statusBox.textContent = messageKey ? getStr()[messageKey] : "";
    }
  }

  /* ---------- ফলাফলের বার্তা ---------- */
  function renderBanner() {
    if (!banner) {
      return;
    }
    if (!lastBanner) {
      banner.hidden = true;
      return;
    }

    var S = getStr();
    var b = lastBanner;
    var detail;

    if (b.kind === "speed") {
      detail = fill(S.dSpeed, { a: b.a, b: b.b });
    } else if (b.kind === "accuracy") {
      detail = b.reason === "unfinished" ? S.dUnfinished : fill(S.dAcc, { a: b.a, b: b.b });
    } else {
      detail = b.win ? fill(S.dTimeWin, { a: b.a, b: b.b }) : S.dTimeLose;
    }

    banner.className = "game-banner " + (b.win ? "win" : "lose");
    banner.innerHTML = "<strong>" + (b.win ? S.win : S.lose) + "</strong><span>" + detail + "</span>";
    banner.hidden = false;
  }

  /* ---------- সাহায্যকারী ---------- */
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

  function setSelect(select, value) {
    select.value = value;
    fire(select, "change");
  }

  function getActiveLang() {
    var btn = document.querySelector(".lang-btn.active");
    return btn ? btn.getAttribute("data-lang") : "english";
  }

  function clickLang(lang) {
    var btn = document.querySelector('.lang-btn[data-lang="' + lang + '"]');
    if (btn && !btn.classList.contains("active")) {
      btn.click();
    }
  }

  function scrollToTest() {
    var card = $("quick-test");
    if (card && card.scrollIntoView) {
      card.scrollIntoView(true);
    }
  }

  // গেম শেষে ভাষা ও ব্যবহারকারীর আগের লেখা ফিরিয়ে আনা
  function restoreAfter(saved) {
    if (!saved) {
      return;
    }
    clickLang(saved.lang);
    if (saved.usedText) {
      customText.value = saved.text;
      fire(customText, "input");
    }
  }

  /* ---------- গেম চালু করা ---------- */
  function launch(kind, level, daily) {
    if (startBtn.disabled) {
      showMessage("msgBusy");
      return;
    }

    // বদলানোর আগে আগের অবস্থা মনে রাখি
    var prevLang = getActiveLang();
    var prevText = customText.value;

    var lang = prevLang;
    var note = "";
    if (lang === "custom") {
      lang = "english";
      note = "msgCustom";
    }
    if (lang !== "bangla") {
      lang = "english";
    }

    var rule = buildRule(kind, level, daily, lang);
    rule.restore = { lang: prevLang, text: prevText, usedText: !!rule.text };

    if (rule.kind === "speed") {
      clickLang(lang);
      setSelect(durationSelect, String(rule.duration));
      setSelect(difficultySelect, level);
      setSelect(modeSelect, "sentence");
    } else {
      customText.value = rule.text;
      fire(customText, "input");
      clickLang("custom");
      if (rule.duration === 120) {
        setSelect(durationSelect, "120");
      } else {
        customDuration.value = String(rule.duration);
        setSelect(durationSelect, "custom");
      }
    }

    // সেটিংস বদলানো শেষ, এখন গেম চালু চিহ্নিত করি
    activeGame = rule;
    showMessage(note);
    startBtn.click();
    scrollToTest();
  }

  function launchById(id) {
    if (id === "daily") {
      var info = dailyInfo();
      launch(info.kind, info.level, true);
    } else {
      launch(id, levels[id] || "medium", false);
    }
  }

  /* ---------- টেস্ট শেষ হলে ফলাফল যাচাই ---------- */
  function onFinished(event) {
    var r = event.detail;

    if (!activeGame || !r) {
      lastBanner = null;
      renderBanner();
      return;
    }

    var g = activeGame;
    activeGame = null;

    var passed = false;
    var reason = "";
    var a;
    var b;

    if (g.kind === "speed") {
      passed = r.language !== "custom" && r.netWpm >= g.target;
      a = r.netWpm;
      b = g.target;
    } else if (g.kind === "accuracy") {
      var finished = r.language === "custom" && r.finishedBy === "completed" && r.typedChars === g.textLen;
      passed = finished && r.accuracy >= g.target;
      reason = finished ? "" : "unfinished";
      a = r.accuracy;
      b = g.target;
    } else {
      passed = r.language === "custom" && r.finishedBy === "completed" && r.typedChars === g.textLen;
      a = r.elapsedSeconds;
      b = g.duration;
    }

    lastBanner = { win: passed, kind: g.kind, a: a, b: b, reason: reason };

    if (passed) {
      addWin(g);
    }

    renderBanner();
    render();
    restoreAfter(g.restore);
  }

  /* ---------- ইভেন্ট ---------- */
  grid.addEventListener("click", function (event) {
    var node = event.target;
    while (node && node !== grid) {
      if (node.getAttribute && node.getAttribute("data-game-start")) {
        launchById(node.getAttribute("data-game-start"));
        return;
      }
      node = node.parentNode;
    }
  });

  // লেভেল বদলালে লক্ষ্যের লেখা বদলে যাবে
  grid.addEventListener("change", function (event) {
    var sel = event.target;
    if (!sel || !sel.getAttribute || !sel.getAttribute("data-game")) {
      return;
    }
    var kind = sel.getAttribute("data-game");
    levels[kind] = sel.value;
    var chip = $("goal-" + kind);
    if (chip) {
      chip.textContent = goalText(kind, sel.value);
    }
  });

  // ব্যবহারকারী নিজে সেটিংস বদলালে চলমান গেমের নিয়ম বাতিল
  function cancelGame() {
    activeGame = null;
  }

  durationSelect.addEventListener("change", cancelGame);
  customDuration.addEventListener("change", cancelGame);
  difficultySelect.addEventListener("change", cancelGame);
  modeSelect.addEventListener("change", cancelGame);
  customText.addEventListener("input", cancelGame);

  document.addEventListener("click", function (event) {
    var node = event.target;
    while (node && node !== document) {
      if (node.getAttribute && node.getAttribute("data-lang")) {
        cancelGame();
        return;
      }
      node = node.parentNode;
    }
  });

  document.addEventListener("typingtest:finished", onFinished);

  document.addEventListener("tsi18n:changed", function () {
    render();
    renderBanner();
  });

  /* ---------- শুরু ---------- */
  render();
})();