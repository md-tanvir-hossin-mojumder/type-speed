/* leaderboard.js - Phase 11: Local / Demo Leaderboard */

(function () {
  "use strict";

  var section = document.getElementById("leaderboard");
  var list = document.getElementById("leaderboard-list");
  var foot = document.getElementById("leaderboard-foot");

  if (!section || !list || !foot) {
    return;
  }

  var tabs = section.querySelectorAll(".tab-btn");
  var period = "daily";
  var DAY = 86400000;
  var MY_MAX = 5;
  var ROWS_MAX = 10;

  // তুলনার জন্য ডেমো মাপকাঠি (আসল খেলোয়াড় নয়)
  var BENCH = [
    { k: "pro", wpm: 100, acc: 98 },
    { k: "fast", wpm: 75, acc: 97 },
    { k: "skilled", wpm: 55, acc: 96 },
    { k: "learner", wpm: 38, acc: 94 },
    { k: "beginner", wpm: 25, acc: 92 }
  ];

  /* ---------- লেখা (ইংরেজি ও বাংলা) ---------- */
  var STR = {
    en: {
      you: "You",
      demo: "Demo",
      benchNote: "Demo benchmark, not a real player",
      periods: { daily: "Today", weekly: "Last 7 days", monthly: "Last 30 days", alltime: "All time" },
      bench: { pro: "Pro", fast: "Fast", skilled: "Skilled", learner: "Learner", beginner: "Beginner" },
      empty: "You have no scores in this period yet. Take a test to appear here!",
      disclaimer:
        "Local demo leaderboard: it shows only your own scores from this device plus demo benchmarks. It is not a real global leaderboard.",
      langs: { english: "English", bangla: "বাংলা", custom: "Custom" },
      modes: { word: "Word", sentence: "Sentence", paragraph: "Paragraph", custom: "Custom text" }
    },
    bn: {
      you: "তুমি",
      demo: "ডেমো",
      benchNote: "ডেমো মাপকাঠি, আসল খেলোয়াড় নয়",
      periods: { daily: "আজ", weekly: "শেষ 7 দিন", monthly: "শেষ 30 দিন", alltime: "সর্বকালীন" },
      bench: { pro: "প্রো", fast: "দ্রুত", skilled: "দক্ষ", learner: "শিক্ষার্থী", beginner: "শিক্ষানবিস" },
      empty: "এই সময়ে এখনো তোমার কোনো স্কোর নেই। এখানে নাম আনতে একটি টেস্ট দাও!",
      disclaimer:
        "এটি লোকাল ডেমো লিডারবোর্ড: এখানে শুধু এই ডিভাইসে তোমার নিজের স্কোর আর ডেমো মাপকাঠি দেখানো হয়। এটি আসল গ্লোবাল লিডারবোর্ড নয়।",
      langs: { english: "English", bangla: "বাংলা", custom: "কাস্টম" },
      modes: { word: "শব্দ", sentence: "বাক্য", paragraph: "অনুচ্ছেদ", custom: "কাস্টম লেখা" }
    }
  };

  function getStr() {
    var lang = window.TS_I18N ? window.TS_I18N.getLang() : "en";
    return STR[lang] || STR.en;
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
    var d = new Date(ts);
    try {
      return (
        d.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" }) +
        ", " +
        d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })
      );
    } catch (e) {
      return d.toString();
    }
  }

  /* ---------- সময়সীমা ---------- */
  function periodStart(p) {
    var now = new Date();
    if (p === "daily") {
      now.setHours(0, 0, 0, 0);
      return now.getTime();
    }
    if (p === "weekly") {
      return Date.now() - 7 * DAY;
    }
    if (p === "monthly") {
      return Date.now() - 30 * DAY;
    }
    return 0;
  }

  function getPlayerName(S) {
    // Profile (পরের Phase) থেকে নাম পেলে সেটা, নাহলে "তুমি / You"
    if (window.TS_PROFILE && typeof window.TS_PROFILE.getName === "function") {
      var name = window.TS_PROFILE.getName();
      if (name) {
        return name;
      }
    }
    return S.you;
  }

  /* ---------- দেখানো ---------- */
  function render() {
    var S = getStr();
    var start = periodStart(period);
    var all = window.TS_ANALYTICS ? window.TS_ANALYTICS.getHistory() : [];
    var mine = [];
    var i;

    for (i = 0; i < all.length; i++) {
      if (all[i].t >= start) {
        mine.push(all[i]);
      }
    }

    mine.sort(function (a, b) {
      return b.wpm - a.wpm || b.acc - a.acc;
    });
    mine = mine.slice(0, MY_MAX);

    var rows = [];
    for (i = 0; i < mine.length; i++) {
      rows.push({ you: true, wpm: mine[i].wpm, acc: mine[i].acc, e: mine[i] });
    }
    for (i = 0; i < BENCH.length; i++) {
      rows.push({ you: false, wpm: BENCH[i].wpm, acc: BENCH[i].acc, k: BENCH[i].k });
    }

    rows.sort(function (a, b) {
      if (b.wpm !== a.wpm) {
        return b.wpm - a.wpm;
      }
      if (b.acc !== a.acc) {
        return b.acc - a.acc;
      }
      return (a.you ? 0 : 1) - (b.you ? 0 : 1);
    });
    rows = rows.slice(0, ROWS_MAX);

    var playerName = esc(getPlayerName(S));
    var html = "";

    for (i = 0; i < rows.length; i++) {
      var r = rows[i];
      var title;
      var sub;
      var badge;

      if (r.you) {
        var e = r.e;
        var meta = [formatDate(e.t), S.langs[e.lang] || esc(e.lang || ""), S.modes[e.mode] || esc(e.mode || "")];
        if (typeof e.dur === "number") {
          meta.push(e.dur + "s");
        }
        title = playerName;
        sub = meta.join(" · ");
        badge = S.you;
      } else {
        title = S.bench[r.k];
        sub = S.benchNote;
        badge = S.demo;
      }

      html +=
        '<li class="lb-row ' + (r.you ? "you" : "demo") + '">' +
        '<span class="lb-rank">' + (i + 1) + "</span>" +
        '<div class="lb-info"><strong>' + title + '<span class="lb-badge">' + badge + "</span></strong>" +
        "<small>" + sub + "</small></div>" +
        '<div class="lb-score"><b>' + round1(r.wpm) + " WPM</b><span>" + round1(r.acc) + "%</span></div>" +
        "</li>";
    }

    list.innerHTML = html;

    var footHtml = "<p>" + S.periods[period] + "</p>";
    if (!mine.length) {
      footHtml += "<p>" + S.empty + "</p>";
    }
    footHtml += "<p>" + S.disclaimer + "</p>";
    foot.innerHTML = footHtml;
  }

  function setPeriod(p) {
    period = p;
    for (var i = 0; i < tabs.length; i++) {
      var active = tabs[i].getAttribute("data-period") === p;
      if (active) {
        tabs[i].classList.add("active");
      } else {
        tabs[i].classList.remove("active");
      }
      tabs[i].setAttribute("aria-pressed", active ? "true" : "false");
    }
    render();
  }

  /* ---------- ইভেন্ট ---------- */
  for (var t = 0; t < tabs.length; t++) {
    tabs[t].addEventListener("click", function (event) {
      setPeriod(event.currentTarget.getAttribute("data-period"));
    });
  }

  // নতুন টেস্ট শেষ হলে তালিকা নতুন করে সাজানো (ইতিহাস আগে সেভ হয়ে যায়)
  document.addEventListener("typingtest:finished", function () {
    setTimeout(render, 0);
  });

  document.addEventListener("tsi18n:changed", render);

  // Statistics থেকে ইতিহাস মুছলে এখানেও হালনাগাদ
  document.addEventListener("click", function (event) {
    var node = event.target;
    while (node && node !== document) {
      if (node.getAttribute && node.getAttribute("data-action") === "clear-history") {
        setTimeout(render, 80);
        return;
      }
      node = node.parentNode;
    }
  });

  /* ---------- শুরু ---------- */
  setPeriod("daily");
})();