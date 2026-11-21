/* analytics.js - Phase 10: Analytics Dashboard */

(function () {
  "use strict";

  var root = document.getElementById("analytics-root");
  if (!root) {
    return;
  }

  var KEY = "history";
  var MAX_SAVED = 300;
  var CHART_COUNT = 20;
  var HISTORY_SHOWN = 10;

  var memory = []; // ব্রাউজার সেভ না করলে শুধু এই সেশনের জন্য

  /* ---------- লেখা (ইংরেজি ও বাংলা) ---------- */
  var STR = {
    en: {
      total: "Total Tests",
      avgWpm: "Average WPM",
      bestWpm: "Best WPM",
      avgAcc: "Average Accuracy",
      chartWpm: "WPM Graph (last {n} tests)",
      chartAcc: "Accuracy Graph (last {n} tests)",
      chartEmpty: "Take a test to see your graphs.",
      impTitle: "Performance Improvement",
      impSpeed: "Speed (net WPM)",
      impAcc: "Accuracy",
      impNote: "Compared: your last {k} test(s) vs the {m} before them.",
      impNeed: "Take at least 2 tests to see your improvement.",
      pts: "pts",
      histTitle: "Typing History",
      histEmpty: "No tests yet. Take your first test!",
      clear: "Clear History",
      confirmClear: "Delete all saved test history from this device?",
      noStorage: "Your browser is not saving data, so your history will be lost when you refresh the page.",
      langs: { english: "English", bangla: "বাংলা", custom: "Custom" },
      modes: { word: "Word", sentence: "Sentence", paragraph: "Paragraph", custom: "Custom text" },
      chartLabel: "Graph of your recent tests"
    },
    bn: {
      total: "মোট টেস্ট",
      avgWpm: "গড় WPM",
      bestWpm: "সেরা WPM",
      avgAcc: "গড় নির্ভুলতা",
      chartWpm: "WPM গ্রাফ (শেষ {n}টি টেস্ট)",
      chartAcc: "নির্ভুলতার গ্রাফ (শেষ {n}টি টেস্ট)",
      chartEmpty: "গ্রাফ দেখতে একটি টেস্ট দাও।",
      impTitle: "পারফরম্যান্সের উন্নতি",
      impSpeed: "গতি (নেট WPM)",
      impAcc: "নির্ভুলতা",
      impNote: "তুলনা: তোমার শেষ {k}টি টেস্ট বনাম তার আগের {m}টি টেস্ট।",
      impNeed: "উন্নতি দেখতে অন্তত 2টি টেস্ট দাও।",
      pts: "পয়েন্ট",
      histTitle: "টাইপিংয়ের ইতিহাস",
      histEmpty: "এখনো কোনো টেস্ট নেই। প্রথম টেস্টটি দাও!",
      clear: "ইতিহাস মুছে ফেলো",
      confirmClear: "এই ডিভাইস থেকে সব সেভ করা টেস্টের ইতিহাস মুছে ফেলবে?",
      noStorage: "তোমার ব্রাউজার ডেটা সেভ করছে না, তাই পেজ রিফ্রেশ করলে ইতিহাস মুছে যাবে।",
      langs: { english: "English", bangla: "বাংলা", custom: "কাস্টম" },
      modes: { word: "শব্দ", sentence: "বাক্য", paragraph: "অনুচ্ছেদ", custom: "কাস্টম লেখা" },
      chartLabel: "সাম্প্রতিক টেস্টের গ্রাফ"
    }
  };

  function getLangId() {
    return window.TS_I18N ? window.TS_I18N.getLang() : "en";
  }

  function getStr() {
    return STR[getLangId()] || STR.en;
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

  /* ---------- সেভ করা ডেটা ---------- */
  function storageOk() {
    return !!(window.TS_STORE && window.TS_STORE.isAvailable());
  }

  function sanitize(list) {
    if (!Array.isArray(list)) {
      return [];
    }
    var clean = [];
    for (var i = 0; i < list.length; i++) {
      var e = list[i];
      if (
        e &&
        typeof e === "object" &&
        typeof e.t === "number" &&
        isFinite(e.t) &&
        typeof e.wpm === "number" &&
        isFinite(e.wpm) &&
        typeof e.acc === "number" &&
        isFinite(e.acc)
      ) {
        clean.push(e);
      }
    }
    return clean;
  }

  function getAll() {
    if (storageOk()) {
      return sanitize(window.TS_STORE.get(KEY, []));
    }
    return sanitize(memory);
  }

  function saveAll(list) {
    if (list.length > MAX_SAVED) {
      list = list.slice(list.length - MAX_SAVED);
    }
    if (storageOk()) {
      window.TS_STORE.set(KEY, list);
    } else {
      memory = list;
    }
  }

  function clearAll() {
    memory = [];
    if (storageOk()) {
      window.TS_STORE.remove(KEY);
    }
  }

  /* ---------- হিসাব ---------- */
  function average(list, field) {
    if (!list.length) {
      return 0;
    }
    var sum = 0;
    for (var i = 0; i < list.length; i++) {
      sum += list[i][field];
    }
    return sum / list.length;
  }

  function getStats(list) {
    var best = 0;
    for (var i = 0; i < list.length; i++) {
      if (list[i].wpm > best) {
        best = list[i].wpm;
      }
    }
    return {
      n: list.length,
      avgWpm: average(list, "wpm"),
      bestWpm: best,
      avgAcc: average(list, "acc")
    };
  }

  // শেষ কয়েকটি টেস্ট বনাম তার আগের টেস্টগুলো
  function getImprovement(list) {
    if (list.length < 2) {
      return null;
    }
    var k = Math.min(5, Math.floor(list.length / 2));
    var recent = list.slice(list.length - k);
    var before = list.slice(Math.max(0, list.length - k - 10), list.length - k);

    var prevWpm = average(before, "wpm");
    var dWpm = average(recent, "wpm") - prevWpm;
    var dAcc = average(recent, "acc") - average(before, "acc");

    return {
      k: k,
      m: before.length,
      dWpm: dWpm,
      pctWpm: prevWpm > 0 ? (dWpm / prevWpm) * 100 : null,
      dAcc: dAcc
    };
  }

  function signed(n) {
    var v = round1(n);
    return (v > 0 ? "+" : "") + v;
  }

  function trendClass(n) {
    var v = round1(n);
    if (v > 0) {
      return "pos";
    }
    if (v < 0) {
      return "neg";
    }
    return "zero";
  }

  /* ---------- দেখানো ---------- */
  function statCard(value, label) {
    return '<article class="card"><span class="stat-number">' + value + "</span><p>" + label + "</p></article>";
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

  function render() {
    var S = getStr();
    var list = getAll();
    var st = getStats(list);
    var chartList = list.slice(-CHART_COUNT);
    var html = "";

    if (!storageOk()) {
      html += '<p class="note">' + S.noStorage + "</p>";
    }

    // ৪টি কার্ড
    html += '<div class="card-grid">';
    html += statCard(st.n, S.total);
    html += statCard(round1(st.avgWpm), S.avgWpm);
    html += statCard(round1(st.bestWpm), S.bestWpm);
    html += statCard(round1(st.avgAcc) + "%", S.avgAcc);
    html += "</div>";

    // গ্রাফ
    html += '<div class="card">';
    if (!list.length) {
      html += '<p class="empty-note">' + S.chartEmpty + "</p>";
    } else {
      html += '<h3 class="chart-title">' + fill(S.chartWpm, { n: chartList.length }) + "</h3>";
      html += '<canvas class="chart" id="chart-wpm" role="img" aria-label="' + S.chartLabel + '"></canvas>';
      html += '<h3 class="chart-title">' + fill(S.chartAcc, { n: chartList.length }) + "</h3>";
      html += '<canvas class="chart" id="chart-acc" role="img" aria-label="' + S.chartLabel + '"></canvas>';
    }
    html += "</div>";

    // উন্নতি
    var imp = getImprovement(list);
    html += '<div class="card"><h3>' + S.impTitle + "</h3>";
    if (!imp) {
      html += '<p class="empty-note">' + S.impNeed + "</p>";
    } else {
      var pct = imp.pctWpm === null ? "" : " (" + signed(imp.pctWpm) + "%)";
      html += '<div class="improve-grid">';
      html +=
        '<div class="improve-item ' + trendClass(imp.dWpm) + '"><small>' + S.impSpeed + "</small><strong>" +
        signed(imp.dWpm) + " WPM" + pct + "</strong></div>";
      html +=
        '<div class="improve-item ' + trendClass(imp.dAcc) + '"><small>' + S.impAcc + "</small><strong>" +
        signed(imp.dAcc) + " " + S.pts + "</strong></div>";
      html += "</div>";
      html += '<p class="improve-note">' + fill(S.impNote, { k: imp.k, m: imp.m }) + "</p>";
    }
    html += "</div>";

    // ইতিহাস
    html += '<div class="card"><h3>' + S.histTitle + "</h3>";
    if (!list.length) {
      html += '<p class="empty-note">' + S.histEmpty + "</p>";
    } else {
      html += '<ul class="history-list">';
      var shown = list.slice(-HISTORY_SHOWN).reverse();
      for (var i = 0; i < shown.length; i++) {
        var e = shown[i];
        var langName = S.langs[e.lang] || esc(e.lang || "");
        var modeName = S.modes[e.mode] || esc(e.mode || "");
        var meta = [formatDate(e.t), langName, modeName];
        if (typeof e.dur === "number") {
          meta.push(e.dur + "s");
        }
        if (typeof e.cpm === "number") {
          meta.push(round1(e.cpm) + " CPM");
        }
        html +=
          '<li class="history-item"><div class="history-main"><strong>' + round1(e.wpm) + " WPM</strong><span>" +
          round1(e.acc) + '%</span></div><div class="history-meta">' + meta.join(" · ") + "</div></li>";
      }
      html += "</ul>";
      html += '<button type="button" class="btn btn-outline" data-action="clear-history">' + S.clear + "</button>";
    }
    html += "</div>";

    root.innerHTML = html;
    drawCharts(chartList);
  }

  /* ---------- গ্রাফ আঁকা ---------- */
  function drawChart(canvas, values, color, isPercent, firstNo, lastNo) {
    var dpr = window.devicePixelRatio || 1;
    var w = canvas.clientWidth;
    var h = canvas.clientHeight;
    if (!w || !h) {
      return;
    }

    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);

    var ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.font = "11px Inter, 'Hind Siliguri', sans-serif";

    var padL = 38;
    var padR = 14;
    var padT = 12;
    var padB = 24;
    var pw = w - padL - padR;
    var ph = h - padT - padB;
    var lo;
    var hi;
    var i;

    if (isPercent) {
      var mn = Math.min.apply(null, values);
      lo = Math.max(0, Math.floor((mn - 5) / 10) * 10);
      if (lo >= 100) {
        lo = 90;
      }
      hi = 100;
    } else {
      var mx = Math.max.apply(null, values);
      lo = 0;
      hi = Math.max(10, Math.ceil(mx / 10) * 10);
    }

    // গ্রিড লাইন ও মান
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(214, 179, 90, 0.18)";
    ctx.fillStyle = "#A8AFBD";
    ctx.textAlign = "right";
    for (var g = 0; g <= 4; g++) {
      var y = padT + ph - (ph * g) / 4;
      ctx.beginPath();
      ctx.moveTo(padL, y);
      ctx.lineTo(w - padR, y);
      ctx.stroke();
      ctx.fillText(Math.round(lo + ((hi - lo) * g) / 4), padL - 6, y + 4);
    }

    // টেস্ট নম্বর
    ctx.textAlign = "left";
    ctx.fillText("#" + firstNo, padL, h - 6);
    if (values.length > 1) {
      ctx.textAlign = "right";
      ctx.fillText("#" + lastNo, w - padR, h - 6);
    }

    function px(index) {
      return values.length === 1 ? padL + pw / 2 : padL + (pw * index) / (values.length - 1);
    }

    function py(value) {
      return padT + ph - (ph * (value - lo)) / (hi - lo);
    }

    // লাইন
    if (values.length > 1) {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.lineJoin = "round";
      for (i = 0; i < values.length; i++) {
        if (i === 0) {
          ctx.moveTo(px(i), py(values[i]));
        } else {
          ctx.lineTo(px(i), py(values[i]));
        }
      }
      ctx.stroke();
    }

    // বিন্দু
    ctx.fillStyle = "#F5B921";
    for (i = 0; i < values.length; i++) {
      ctx.beginPath();
      ctx.arc(px(i), py(values[i]), 3.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawCharts(chartList) {
    var wpmCanvas = document.getElementById("chart-wpm");
    var accCanvas = document.getElementById("chart-acc");
    if (!wpmCanvas || !accCanvas || !chartList.length) {
      return;
    }

    var total = getAll().length;
    var firstNo = total - chartList.length + 1;
    var wpmValues = [];
    var accValues = [];
    for (var i = 0; i < chartList.length; i++) {
      wpmValues.push(chartList[i].wpm);
      accValues.push(chartList[i].acc);
    }

    drawChart(wpmCanvas, wpmValues, "#5577E8", false, firstNo, total);
    drawChart(accCanvas, accValues, "#D6B35A", true, firstNo, total);
  }

  /* ---------- টেস্ট শেষ হলে সেভ ---------- */
  function onFinished(event) {
    var r = event.detail;
    if (!r || typeof r.netWpm !== "number" || r.typedChars < 5) {
      return;
    }

    var list = getAll();
    list.push({
      t: r.timestamp || Date.now(),
      wpm: r.netWpm,
      gross: r.grossWpm,
      cpm: r.cpm,
      acc: r.accuracy,
      lang: r.language,
      mode: r.mode,
      diff: r.difficulty,
      dur: r.duration,
      sec: r.elapsedSeconds,
      ok: r.correctChars,
      bad: r.incorrectChars
    });
    saveAll(list);
    render();
  }

  /* ---------- ইভেন্ট ---------- */
  root.addEventListener("click", function (event) {
    var node = event.target;
    while (node && node !== root) {
      if (node.getAttribute && node.getAttribute("data-action") === "clear-history") {
        if (window.confirm(getStr().confirmClear)) {
          clearAll();
          render();
        }
        return;
      }
      node = node.parentNode;
    }
  });

  document.addEventListener("typingtest:finished", onFinished);
  document.addEventListener("tsi18n:changed", render);

  var resizeTimer = null;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      drawCharts(getAll().slice(-CHART_COUNT));
    }, 150);
  });

  // পরের Phase (Leaderboard, Achievements, Profile) এই ডেটা ব্যবহার করবে
  window.TS_ANALYTICS = {
    getHistory: getAll,
    clear: function () {
      clearAll();
      render();
    }
  };

  /* ---------- শুরু ---------- */
  render();
})();