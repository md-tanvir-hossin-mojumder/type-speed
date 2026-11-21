/* practice.js - Phase 8: Practice Center (Daily শেষে ভাষা আগের অবস্থায় ফেরে) */

(function () {
  "use strict";

  var grid = document.getElementById("practice-grid");
  var statusBox = document.getElementById("practice-status");
  var startBtn = document.getElementById("start-btn");
  var durationSelect = document.getElementById("duration-select");
  var difficultySelect = document.getElementById("difficulty-select");
  var modeSelect = document.getElementById("mode-select");
  var customText = document.getElementById("custom-text");

  if (!grid || !startBtn || !durationSelect || !difficultySelect || !modeSelect || !customText) {
    return;
  }

  var TEXTS = window.TYPE_TEXTS || {};
  var DAILY_KEY = "daily_done";

  var dailyActive = false;
  var dailyLength = 0;
  var dailyRestore = null;
  var messageKey = "";

  /* ---------- Practice তালিকা ---------- */
  var PRESETS = [
    { id: "beginner", diff: "easy", mode: "word", dur: 60 },
    { id: "intermediate", diff: "medium", mode: "paragraph", dur: 60 },
    { id: "advanced", diff: "hard", mode: "paragraph", dur: 120 },
    { id: "word", diff: "medium", mode: "word", dur: 30 },
    { id: "sentence", diff: "medium", mode: "sentence", dur: 60 },
    { id: "paragraph", diff: "easy", mode: "paragraph", dur: 120 },
    { id: "daily", daily: true, dur: 60 }
  ];

  /* ---------- লেখা (ইংরেজি ও বাংলা) ---------- */
  var STR = {
    en: {
      start: "Start Practice",
      dailyChip: "Daily text",
      seconds: "{n} Seconds",
      done: "Today: completed",
      todo: "Today: not done yet",
      streak: "Streak: {n} day(s)",
      diff: { easy: "Easy", medium: "Medium", hard: "Hard" },
      mode: { word: "Word-Based", sentence: "Sentence-Based", paragraph: "Paragraph-Based" },
      msgBusy: "A test is in progress. Finish it or press Restart first.",
      msgCustom: "Custom Text was selected, so English practice text is used.",
      msgDaily: "Today's daily text was loaded as Custom Text in the typing test.",
      cards: {
        beginner: { t: "Beginner Practice", d: "Start with simple, short words." },
        intermediate: { t: "Intermediate Practice", d: "Longer words and mixed sentences." },
        advanced: { t: "Advanced Practice", d: "Complex text for experienced typists." },
        word: { t: "Word Practice", d: "Build speed with single words." },
        sentence: { t: "Sentence Practice", d: "Practise full sentences." },
        paragraph: { t: "Paragraph Practice", d: "Train stamina with paragraphs." },
        daily: { t: "Daily Practice", d: "A fresh practice text every day." }
      }
    },
    bn: {
      start: "প্র্যাকটিস শুরু করো",
      dailyChip: "দৈনিক লেখা",
      seconds: "{n} সেকেন্ড",
      done: "আজ: সম্পূর্ণ হয়েছে",
      todo: "আজ: এখনো হয়নি",
      streak: "ধারাবাহিক: {n} দিন",
      diff: { easy: "সহজ", medium: "মাঝারি", hard: "কঠিন" },
      mode: { word: "শব্দভিত্তিক", sentence: "বাক্যভিত্তিক", paragraph: "অনুচ্ছেদভিত্তিক" },
      msgBusy: "একটি টেস্ট চলছে। আগে সেটা শেষ করো বা রিস্টার্ট চাপো।",
      msgCustom: "কাস্টম টেক্সট বাছাই করা ছিল, তাই ইংরেজি প্র্যাকটিসের লেখা ব্যবহার করা হয়েছে।",
      msgDaily: "আজকের দৈনিক লেখা টাইপিং টেস্টে কাস্টম টেক্সট হিসেবে দেওয়া হয়েছে।",
      cards: {
        beginner: { t: "নতুনদের প্র্যাকটিস", d: "সহজ ও ছোট শব্দ দিয়ে শুরু করো।" },
        intermediate: { t: "মাঝারি প্র্যাকটিস", d: "বড় শব্দ আর মিশ্র বাক্য।" },
        advanced: { t: "অ্যাডভান্সড প্র্যাকটিস", d: "অভিজ্ঞ টাইপিস্টদের জন্য কঠিন লেখা।" },
        word: { t: "শব্দ প্র্যাকটিস", d: "এক একটি শব্দে গতি বাড়াও।" },
        sentence: { t: "বাক্য প্র্যাকটিস", d: "পূর্ণ বাক্য অনুশীলন করো।" },
        paragraph: { t: "অনুচ্ছেদ প্র্যাকটিস", d: "অনুচ্ছেদে ধৈর্য ও দম বাড়াও।" },
        daily: { t: "দৈনিক প্র্যাকটিস", d: "প্রতিদিন নতুন প্র্যাকটিসের লেখা।" }
      }
    }
  };

  function getStr() {
    var lang = window.TS_I18N ? window.TS_I18N.getLang() : "en";
    return STR[lang] || STR.en;
  }

  function fill(text, n) {
    return text.split("{n}").join(n);
  }

  /* ---------- তারিখ ও Daily ডেটা ---------- */
  function todayNumber() {
    var d = new Date();
    return Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000);
  }

  function getDone() {
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

  function markDone() {
    if (!window.TS_STORE) {
      return;
    }
    var today = todayNumber();
    var arr = getDone();
    if (arr.indexOf(today) === -1) {
      arr.push(today);
      arr.sort(function (a, b) {
        return a - b;
      });
      if (arr.length > 400) {
        arr = arr.slice(arr.length - 400);
      }
      window.TS_STORE.set(DAILY_KEY, arr);
    }
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

  function normText(s) {
    var t = s.replace(/\s+/g, " ").trim();
    return t.normalize ? t.normalize("NFC") : t;
  }

  // আজকের তারিখ থেকে ৪টি বাক্য বেছে নেয় (সেদিন সবসময় একই, পরদিন নতুন)
  function buildDailyText(lang) {
    var bank = TEXTS[lang] || TEXTS.english;
    var pool = [].concat(bank.easy.sentence, bank.medium.sentence, bank.hard.sentence);
    var seed = (todayNumber() * 2654435761) % 4294967296;
    var chosen = [];
    var used = {};
    var guard = 0;

    while (chosen.length < 4 && guard < 200) {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      var idx = Math.floor((seed / 4294967296) * pool.length);
      if (!used[idx]) {
        used[idx] = true;
        chosen.push(pool[idx]);
      }
      guard++;
    }
    return chosen.join(" ");
  }

  /* ---------- কার্ড আঁকা ---------- */
  function render() {
    var S = getStr();
    var html = "";

    for (var i = 0; i < PRESETS.length; i++) {
      var p = PRESETS[i];
      var c = S.cards[p.id];
      var chips = "";

      if (p.daily) {
        chips += '<span class="chip">' + S.dailyChip + "</span>";
      } else {
        chips += '<span class="chip">' + S.diff[p.diff] + "</span>";
        chips += '<span class="chip">' + S.mode[p.mode] + "</span>";
      }
      chips += '<span class="chip">' + fill(S.seconds, p.dur) + "</span>";

      html += '<article class="card practice-card' + (p.daily ? " daily" : "") + '">';
      html += "<h3>" + c.t + "</h3>";
      html += "<p>" + c.d + "</p>";
      html += '<div class="chip-row">' + chips + "</div>";

      if (p.daily) {
        var done = getDone();
        var line = done.indexOf(todayNumber()) !== -1 ? S.done : S.todo;
        var streak = getStreak(done);
        if (streak > 0) {
          line += " · " + fill(S.streak, streak);
        }
        html += '<p class="daily-status">' + line + "</p>";
      }

      html +=
        '<button type="button" class="btn ' +
        (p.daily ? "btn-gold" : "btn-outline") +
        '" data-practice="' +
        p.id +
        '">' +
        S.start +
        "</button>";
      html += "</article>";
    }

    grid.innerHTML = html;
    showMessage(messageKey);
  }

  function showMessage(key) {
    messageKey = key || "";
    if (statusBox) {
      statusBox.textContent = messageKey ? getStr()[messageKey] : "";
    }
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
    var card = document.getElementById("quick-test");
    if (card && card.scrollIntoView) {
      card.scrollIntoView(true);
    }
  }

  // Daily শেষে ভাষা ও ব্যবহারকারীর আগের লেখা ফিরিয়ে আনা
  function restoreAfter(saved) {
    if (!saved) {
      return;
    }
    clickLang(saved.lang);
    customText.value = saved.text;
    fire(customText, "input");
  }

  /* ---------- Practice চালু করা ---------- */
  function runPreset(p) {
    if (startBtn.disabled) {
      showMessage("msgBusy");
      return;
    }

    var rawLang = getActiveLang();
    var prevText = customText.value;
    var lang = rawLang;
    var note = "";
    if (lang === "custom") {
      lang = "english";
      note = "msgCustom";
    }

    if (p.daily) {
      runDaily(lang, rawLang, prevText);
      return;
    }

    dailyActive = false;
    clickLang(lang);
    setSelect(durationSelect, String(p.dur));
    setSelect(difficultySelect, p.diff);
    setSelect(modeSelect, p.mode);
    showMessage(note);
    startBtn.click();
    scrollToTest();
  }

  function runDaily(lang, rawLang, prevText) {
    var text = buildDailyText(lang === "bangla" ? "bangla" : "english");

    customText.value = text;
    fire(customText, "input");
    clickLang("custom");
    setSelect(durationSelect, "60");

    dailyLength = normText(text).length;
    dailyRestore = { lang: rawLang, text: prevText };
    dailyActive = true;

    showMessage("msgDaily");
    startBtn.click();
    scrollToTest();
  }

  function runById(id) {
    for (var i = 0; i < PRESETS.length; i++) {
      if (PRESETS[i].id === id) {
        runPreset(PRESETS[i]);
        return;
      }
    }
  }

  /* ---------- ইভেন্ট ---------- */
  grid.addEventListener("click", function (event) {
    var node = event.target;
    while (node && node !== grid) {
      if (node.getAttribute && node.getAttribute("data-practice")) {
        runById(node.getAttribute("data-practice"));
        return;
      }
      node = node.parentNode;
    }
  });

  // ব্যবহারকারী নিজে লেখা বদলালে বা অন্য ভাষা বাছলে Daily চিহ্ন বাতিল
  customText.addEventListener("input", function () {
    dailyActive = false;
  });

  document.addEventListener("click", function (event) {
    var node = event.target;
    while (node && node !== document) {
      if (node.getAttribute && node.getAttribute("data-lang")) {
        if (node.getAttribute("data-lang") !== "custom") {
          dailyActive = false;
        }
        return;
      }
      node = node.parentNode;
    }
  });

  // টেস্ট শেষ হলে: Daily সম্পূর্ণ হয়েছে কিনা দেখা, তারপর ভাষা ফিরিয়ে আনা
  document.addEventListener("typingtest:finished", function (event) {
    if (!dailyActive) {
      return;
    }
    var r = event.detail;
    var saved = dailyRestore;
    dailyActive = false;
    dailyRestore = null;

    if (r && r.language === "custom" && r.finishedBy === "completed" && r.typedChars === dailyLength) {
      markDone();
      render();
    }

    restoreAfter(saved);
  });

  document.addEventListener("tsi18n:changed", render);

  /* ---------- শুরু ---------- */
  render();
})();