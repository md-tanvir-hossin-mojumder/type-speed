/* typing-engine.js - Phase 7: English, বাংলা ও Custom Text */

(function () {
  "use strict";

  var TEXTS = window.TYPE_TEXTS;
  if (!TEXTS) {
    console.error("texts.js লোড হয়নি");
    return;
  }

  var MIN_CUSTOM = 20;
  var MAX_CUSTOM = 1500;

  function t(key, vars) {
    return window.TS_I18N ? window.TS_I18N.t(key, vars) : key;
  }

  function $(id) {
    return document.getElementById(id);
  }

  /* ---------- HTML এলিমেন্ট ---------- */
  var el = {
    passage: $("passage"),
    input: $("typing-input"),
    startBtn: $("start-btn"),
    pauseBtn: $("pause-btn"),
    restartBtn: $("restart-btn"),
    soundBtn: $("sound-btn"),
    durationSelect: $("duration-select"),
    customWrap: $("custom-duration-wrap"),
    customDuration: $("custom-duration"),
    difficultySelect: $("difficulty-select"),
    modeSelect: $("mode-select"),
    liveTime: $("live-time"),
    liveWpm: $("live-wpm"),
    liveCpm: $("live-cpm"),
    liveAccuracy: $("live-accuracy"),
    progressFill: $("progress-fill"),
    status: $("test-status"),
    results: $("results"),
    graph: $("result-graph"),
    retryBtn: $("retry-btn"),
    shareBtn: $("share-btn"),
    shareStatus: $("share-status"),
    heroWpm: $("hero-wpm"),
    heroCpm: $("hero-cpm"),
    heroAccuracy: $("hero-accuracy"),
    langButtons: document.querySelectorAll(".lang-btn"),
    customBox: $("custom-text-box"),
    customText: $("custom-text"),
    customCount: $("custom-text-count"),
    banglaNote: $("bangla-note")
  };

  if (!el.passage || !el.input || !el.startBtn) {
    return;
  }

  /* ---------- অবস্থা (state) ---------- */
  // idle = শুরু হয়নি, ready = প্রস্তুত, running = চলছে,
  // paused = থেমে আছে, finished = শেষ
  var state = "idle";
  var settings = { language: "english" }; // english, bangla, custom

  var passageText = "";
  var spans = [];
  var unitStarts = [];
  var unitOf = [];
  var currentUnit = 0;
  var lastTyped = "";

  var durationSec = 60;
  var accumulatedMs = 0;
  var startStamp = 0;
  var timerId = null;
  var samples = [];
  var lastSampleSecond = 0;

  var soundOn = true;
  var audioCtx = null;
  var lastResult = null;

  var statusKey = "";
  var shareKey = "";
  var shareVars = null;
  var shareRaw = "";

  /* ---------- ছোট সাহায্যকারী ফাংশন ---------- */
  function round1(n) {
    return Math.round(n * 10) / 10;
  }

  function setText(id, value) {
    var node = $(id);
    if (node) {
      node.textContent = value;
    }
  }

  function setStatusKey(key) {
    statusKey = key;
    if (el.status) {
      el.status.textContent = key ? t(key) : "";
    }
  }

  function shuffle(list) {
    var arr = list.slice();
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  }

  // Unicode স্বাভাবিক রূপ: বাংলা অক্ষরের দুই রকম লেখা এক করে দেয়
  function norm(s) {
    return s.normalize ? s.normalize("NFC") : s;
  }

  function normalizeText(s) {
    return norm(s.replace(/\s+/g, " ").trim());
  }

  function getTyped() {
    var v = norm(el.input.value);
    return v.length > passageText.length ? v.slice(0, passageText.length) : v;
  }

  /* ---------- বাংলা যুক্তাক্ষর ও কার-চিহ্ন একসাথে দেখানোর জন্য ---------- */
  function isMark(code) {
    return (
      (code >= 0x0981 && code <= 0x0983) ||
      code === 0x09bc ||
      (code >= 0x09be && code <= 0x09cc) ||
      code === 0x09cd ||
      code === 0x09d7 ||
      code === 0x200c ||
      code === 0x200d ||
      (code >= 0x0300 && code <= 0x036f)
    );
  }

  function splitUnits(text) {
    var starts = [0];
    for (var i = 1; i < text.length; i++) {
      var c = text.charCodeAt(i);
      var prev = text.charCodeAt(i - 1);
      if (!(isMark(c) || prev === 0x09cd || prev === 0x200d)) {
        starts.push(i);
      }
    }
    return starts;
  }

  /* ---------- হিসাব (একটাই নির্দিষ্ট পদ্ধতি) ---------- */
  function computeStats(typed, passage, elapsedMs) {
    var minutes = Math.max(elapsedMs, 1000) / 60000;
    var typedLen = typed.length;
    var correct = 0;

    for (var i = 0; i < typedLen; i++) {
      if (typed.charAt(i) === passage.charAt(i)) {
        correct++;
      }
    }

    var incorrect = typedLen - correct;
    var gross = typedLen / 5 / minutes;
    var net = Math.max(0, (typedLen / 5 - incorrect) / minutes);
    var cpm = correct / minutes;
    var accuracy = typedLen === 0 ? 100 : (correct / typedLen) * 100;
    var errorRate = typedLen === 0 ? 0 : (incorrect / typedLen) * 100;

    return {
      typed: typedLen,
      correct: correct,
      incorrect: incorrect,
      grossWpm: gross,
      netWpm: net,
      cpm: cpm,
      accuracy: accuracy,
      errorRate: errorRate
    };
  }

  /* ---------- সাউন্ড ---------- */
  function initAudio() {
    if (!audioCtx) {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (AC) {
        try {
          audioCtx = new AC();
        } catch (e) {
          audioCtx = null;
        }
      }
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
  }

  function beep(good) {
    if (!soundOn || !audioCtx) {
      return;
    }
    try {
      var osc = audioCtx.createOscillator();
      var gain = audioCtx.createGain();
      osc.type = "square";
      osc.frequency.value = good ? 880 : 220;
      gain.gain.value = good ? 0.02 : 0.04;
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + (good ? 0.025 : 0.06));
    } catch (e) {
      /* সাউন্ড না হলে সমস্যা নেই */
    }
  }

  /* ---------- সেটিংস ---------- */
  function getDuration() {
    if (el.durationSelect.value === "custom") {
      var v = parseInt(el.customDuration.value, 10);
      if (isNaN(v)) {
        v = 45;
      }
      return Math.min(600, Math.max(5, v));
    }
    return parseInt(el.durationSelect.value, 10) || 60;
  }

  function getBank() {
    var lang = TEXTS[settings.language] || TEXTS.english;
    var level = lang[el.difficultySelect.value] || lang.medium;
    return level[el.modeSelect.value] || level.paragraph;
  }

  function getCustomText() {
    return normalizeText(el.customText.value).slice(0, MAX_CUSTOM);
  }

  function buildPassage() {
    if (settings.language === "custom") {
      return getCustomText();
    }

    var bank = getBank();
    var target = Math.min(1200, Math.max(120, durationSec * 10));
    var parts = [];
    var total = 0;
    var pool = [];

    while (total < target) {
      if (pool.length === 0) {
        pool = shuffle(bank);
      }
      var item = pool.pop();
      parts.push(item);
      total += item.length + 1;
    }
    return normalizeText(parts.join(" "));
  }

  /* ---------- Passage দেখানো (একবারই Render) ---------- */
  function showIdlePassage() {
    el.passage.classList.remove("bn");
    el.passage.textContent = t("passage.idle");
  }

  function renderPassage(text) {
    unitStarts = splitUnits(text);
    unitOf = new Array(text.length);
    spans = [];

    var fragment = document.createDocumentFragment();
    for (var u = 0; u < unitStarts.length; u++) {
      var s = unitStarts[u];
      var e = u + 1 < unitStarts.length ? unitStarts[u + 1] : text.length;
      for (var k = s; k < e; k++) {
        unitOf[k] = u;
      }
      var span = document.createElement("span");
      span.textContent = text.slice(s, e);
      fragment.appendChild(span);
      spans.push(span);
    }

    el.passage.innerHTML = "";
    el.passage.appendChild(fragment);
    el.passage.scrollTop = 0;

    if (/[\u0980-\u09FF]/.test(text)) {
      el.passage.classList.add("bn");
    } else {
      el.passage.classList.remove("bn");
    }

    currentUnit = 0;
    if (spans[0]) {
      spans[0].className = "char-current";
    }
  }

  function paintUnit(u, typed) {
    var span = spans[u];
    if (!span) {
      return;
    }
    var s = unitStarts[u];
    var e = u + 1 < unitStarts.length ? unitStarts[u + 1] : passageText.length;

    if (typed.length <= s) {
      span.className = "";
      return;
    }

    var bad = false;
    var limit = Math.min(e, typed.length);
    for (var k = s; k < limit; k++) {
      if (typed.charAt(k) !== passageText.charAt(k)) {
        bad = true;
        break;
      }
    }
    span.className = bad ? "char-wrong" : "char-correct";
  }

  function repaint(from, to, typed) {
    if (!passageText.length) {
      return;
    }
    var last = passageText.length - 1;
    var u1 = unitOf[Math.min(from, last)];
    var u2 = unitOf[Math.min(Math.max(to - 1, 0), last)];
    for (var u = u1; u <= u2; u++) {
      paintUnit(u, typed);
    }
  }

  function markCurrent(typedLen) {
    var idx = typedLen >= passageText.length ? spans.length - 1 : unitOf[typedLen];
    if (spans[currentUnit]) {
      spans[currentUnit].classList.remove("char-current");
    }
    currentUnit = idx;
    if (spans[idx]) {
      spans[idx].classList.add("char-current");
      keepCurrentVisible();
    }
  }

  function keepCurrentVisible() {
    var s = spans[currentUnit];
    var top = s.offsetTop;
    var box = el.passage;
    if (top > box.scrollTop + box.clientHeight - 40 || top < box.scrollTop) {
      box.scrollTop = Math.max(0, top - 40);
    }
  }

  /* ---------- Live হিসাব দেখানো ---------- */
  function resetLive() {
    el.liveTime.textContent = durationSec;
    el.liveWpm.textContent = "0";
    el.liveCpm.textContent = "0";
    el.liveAccuracy.textContent = "100%";
    el.progressFill.style.width = "0%";
  }

  function updateLive(elapsed) {
    var st = computeStats(getTyped(), passageText, elapsed);
    var limit = durationSec * 1000;
    var remaining = Math.max(0, Math.ceil((limit - elapsed) / 1000));

    el.liveWpm.textContent = Math.round(st.netWpm);
    el.liveCpm.textContent = Math.round(st.cpm);
    el.liveAccuracy.textContent = Math.round(st.accuracy) + "%";
    el.liveTime.textContent = remaining;
    el.progressFill.style.width = Math.min(100, (elapsed / limit) * 100) + "%";
  }

  /* ---------- বাটনের অবস্থা ---------- */
  function updateButtons() {
    var running = state === "running";
    var paused = state === "paused";
    var locked = running || paused;
    var isCustom = settings.language === "custom";

    el.startBtn.disabled = locked;
    el.pauseBtn.disabled = !locked;
    el.pauseBtn.textContent = t(paused ? "btn.resume" : "btn.pause");
    el.restartBtn.disabled = state === "idle";

    el.durationSelect.disabled = locked;
    el.customDuration.disabled = locked;
    el.difficultySelect.disabled = locked || isCustom;
    el.modeSelect.disabled = locked || isCustom;

    for (var i = 0; i < el.langButtons.length; i++) {
      el.langButtons[i].disabled = locked;
    }
    if (el.customText) {
      el.customText.disabled = locked;
    }
  }

  /* ---------- টাইমার ---------- */
  function getElapsed() {
    return accumulatedMs + (state === "running" ? Date.now() - startStamp : 0);
  }

  function stopTimer() {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  }

  function tick() {
    var elapsed = getElapsed();

    if (elapsed >= durationSec * 1000) {
      finishTest("time");
      return;
    }

    updateLive(elapsed);

    var sec = Math.floor(elapsed / 1000);
    if (sec > lastSampleSecond) {
      lastSampleSecond = sec;
      var st = computeStats(getTyped(), passageText, elapsed);
      samples.push({ t: sec, wpm: Math.round(st.netWpm) });
    }
  }

  function startTimer() {
    state = "running";
    accumulatedMs = 0;
    startStamp = Date.now();
    samples = [];
    lastSampleSecond = 0;
    stopTimer();
    timerId = setInterval(tick, 200);
    setStatusKey("");
    updateButtons();
  }

  /* ---------- টেস্ট তৈরি ও রিসেট ---------- */
  function prepare(text, shouldFocus) {
    stopTimer();
    passageText = text;
    renderPassage(text);

    el.input.value = "";
    lastTyped = "";
    el.input.maxLength = text.length * 2 + 20;
    el.input.disabled = false;

    state = "ready";
    accumulatedMs = 0;
    samples = [];
    lastSampleSecond = 0;

    resetLive();
    el.results.hidden = true;
    setStatusKey("status.ready");
    updateButtons();

    if (shouldFocus) {
      el.input.focus();
    }
  }

  function toIdle(messageKey) {
    stopTimer();
    state = "idle";
    passageText = "";
    spans = [];
    unitStarts = [];
    unitOf = [];
    lastTyped = "";
    el.input.value = "";
    el.input.disabled = true;
    showIdlePassage();
    resetLive();
    setStatusKey(messageKey || "status.press_start");
    updateButtons();
  }

  function startNew() {
    initAudio();
    durationSec = getDuration();

    if (settings.language === "custom" && getCustomText().length < MIN_CUSTOM) {
      setStatusKey("status.custom_empty");
      return;
    }

    prepare(buildPassage(), true);
  }

  function restartSame() {
    if (!passageText) {
      return;
    }
    prepare(passageText, true);
  }

  /* ---------- টাইপ করার সময় ---------- */
  function onInput() {
    if (state !== "ready" && state !== "running") {
      return;
    }

    var typed = getTyped();

    if (state === "ready" && typed.length > 0) {
      startTimer();
    }

    // শুধু যে অংশ বদলেছে সেটুকুই আপডেট হবে
    var p = 0;
    var shortest = Math.min(typed.length, lastTyped.length);
    while (p < shortest && typed.charAt(p) === lastTyped.charAt(p)) {
      p++;
    }
    var end = Math.max(typed.length, lastTyped.length);
    if (end > p) {
      repaint(p, end, typed);
    }

    if (typed.length > lastTyped.length) {
      var idx = typed.length - 1;
      beep(typed.charAt(idx) === passageText.charAt(idx));
    }

    lastTyped = typed;
    markCurrent(typed.length);

    if (typed.length >= passageText.length) {
      finishTest("completed");
    }
  }

  /* ---------- Pause / Resume ---------- */
  function togglePause() {
    if (state === "running") {
      accumulatedMs += Date.now() - startStamp;
      stopTimer();
      state = "paused";
      el.input.disabled = true;
      setStatusKey("status.paused");
      updateButtons();
    } else if (state === "paused") {
      startStamp = Date.now();
      stopTimer();
      timerId = setInterval(tick, 200);
      state = "running";
      el.input.disabled = false;
      setStatusKey("");
      updateButtons();
      el.input.focus();
    }
  }

  /* ---------- টেস্ট শেষ ---------- */
  function finishTest(reason) {
    if (state === "finished") {
      return;
    }

    var elapsed = Math.min(getElapsed(), durationSec * 1000);
    stopTimer();
    state = "finished";
    el.input.disabled = true;

    var st = computeStats(getTyped(), passageText, elapsed);
    var secs = Math.max(1, Math.round(elapsed / 1000));
    var point = { t: secs, wpm: Math.round(st.netWpm) };
    var lastPoint = samples[samples.length - 1];

    if (lastPoint && lastPoint.t === secs) {
      samples[samples.length - 1] = point;
    } else {
      samples.push(point);
    }

    updateLive(elapsed);

    lastResult = {
      language: settings.language,
      mode: settings.language === "custom" ? "custom" : el.modeSelect.value,
      difficulty: settings.language === "custom" ? "custom" : el.difficultySelect.value,
      duration: durationSec,
      elapsedSeconds: round1(elapsed / 1000),
      grossWpm: round1(st.grossWpm),
      netWpm: round1(st.netWpm),
      cpm: round1(st.cpm),
      accuracy: round1(st.accuracy),
      correctChars: st.correct,
      incorrectChars: st.incorrect,
      errorRate: round1(st.errorRate),
      typedChars: st.typed,
      finishedBy: reason,
      timestamp: Date.now()
    };

    if (el.heroWpm) {
      el.heroWpm.textContent = Math.round(lastResult.netWpm);
    }
    if (el.heroCpm) {
      el.heroCpm.textContent = Math.round(lastResult.cpm);
    }
    if (el.heroAccuracy) {
      el.heroAccuracy.textContent = Math.round(lastResult.accuracy) + "%";
    }

    setStatusKey(reason === "time" ? "status.time_up" : "status.completed");
    updateButtons();
    showResults(lastResult);

    // পরের Phase-এর (History, Achievements ইত্যাদি) জন্য ঘোষণা
    try {
      document.dispatchEvent(new CustomEvent("typingtest:finished", { detail: lastResult }));
    } catch (e) {
      /* পুরোনো ব্রাউজারে কাজ না করলে সমস্যা নেই */
    }
  }

  /* ---------- রেজাল্ট দেখানো ---------- */
  function showResults(r) {
    setText("result-net-wpm", r.netWpm);
    setText("result-gross-wpm", r.grossWpm);
    setText("result-cpm", r.cpm);
    setText("result-accuracy", r.accuracy + "%");
    setText("result-correct", r.correctChars);
    setText("result-incorrect", r.incorrectChars);
    setText("result-error-rate", r.errorRate + "%");
    setText("result-time", r.elapsedSeconds + "s");

    shareKey = "";
    shareVars = null;
    shareRaw = "";
    renderShare();

    el.results.hidden = false;
    drawGraph();

    try {
      el.results.scrollIntoView({ behavior: "smooth", block: "nearest" });
    } catch (e) {
      /* ঠিক আছে */
    }
  }

  /* ---------- Performance Graph ---------- */
  function drawGraph() {
    var canvas = el.graph;
    if (!canvas || el.results.hidden) {
      return;
    }

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
    ctx.fillStyle = "#A8AFBD";

    if (samples.length < 2) {
      ctx.textAlign = "center";
      ctx.fillText(t("graph.nodata"), w / 2, h / 2);
      return;
    }

    var padL = 36;
    var padR = 12;
    var padT = 12;
    var padB = 24;
    var pw = w - padL - padR;
    var ph = h - padT - padB;

    var maxWpm = 10;
    for (var i = 0; i < samples.length; i++) {
      if (samples[i].wpm > maxWpm) {
        maxWpm = samples[i].wpm;
      }
    }
    var top = Math.ceil(maxWpm / 10) * 10;
    var maxT = samples[samples.length - 1].t;

    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(214, 179, 90, 0.18)";
    ctx.textAlign = "right";
    for (var g = 0; g <= 4; g++) {
      var y = padT + ph - (ph * g) / 4;
      ctx.beginPath();
      ctx.moveTo(padL, y);
      ctx.lineTo(w - padR, y);
      ctx.stroke();
      ctx.fillText(Math.round((top * g) / 4), padL - 6, y + 4);
    }

    ctx.textAlign = "left";
    ctx.fillText("0s", padL, h - 6);
    ctx.textAlign = "right";
    ctx.fillText(maxT + "s", w - padR, h - 6);

    ctx.beginPath();
    ctx.strokeStyle = "#5577E8";
    ctx.lineWidth = 2.5;
    ctx.lineJoin = "round";
    for (var k = 0; k < samples.length; k++) {
      var x = padL + pw * (samples[k].t / maxT);
      var yy = padT + ph - ph * (samples[k].wpm / top);
      if (k === 0) {
        ctx.moveTo(x, yy);
      } else {
        ctx.lineTo(x, yy);
      }
    }
    ctx.stroke();

    ctx.fillStyle = "#F5B921";
    for (var m = 0; m < samples.length; m++) {
      var px = padL + pw * (samples[m].t / maxT);
      var py = padT + ph - ph * (samples[m].wpm / top);
      ctx.beginPath();
      ctx.arc(px, py, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  /* ---------- Share ---------- */
  function renderShare() {
    if (!el.shareStatus) {
      return;
    }
    if (shareRaw) {
      el.shareStatus.textContent = shareRaw;
    } else if (shareKey) {
      el.shareStatus.textContent = t(shareKey, shareVars);
    } else {
      el.shareStatus.textContent = "";
    }
  }

  function shareResult() {
    if (!lastResult) {
      return;
    }
    var text = t("share.text", { wpm: lastResult.netWpm, acc: lastResult.accuracy });

    if (navigator.share) {
      navigator.share({ title: "Type Speed.com", text: text }).catch(function () {});
    } else if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        function () {
          shareKey = "share.copied";
          shareVars = null;
          shareRaw = "";
          renderShare();
        },
        function () {
          shareRaw = text;
          renderShare();
        }
      );
    } else {
      shareRaw = text;
      renderShare();
    }
  }

  /* ---------- Typing Language (English / বাংলা / Custom) ---------- */
  function updateCustomCount() {
    if (el.customCount && el.customText) {
      el.customCount.textContent = t("lang.count", { n: el.customText.value.length, max: MAX_CUSTOM });
    }
  }

  function setTypingLanguage(lang) {
    settings.language = lang;

    for (var i = 0; i < el.langButtons.length; i++) {
      var btn = el.langButtons[i];
      var active = btn.getAttribute("data-lang") === lang;
      if (active) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    }

    if (el.customBox) {
      el.customBox.hidden = lang !== "custom";
    }
    if (el.banglaNote) {
      el.banglaNote.hidden = lang !== "bangla";
    }

    if (state === "ready") {
      if (lang === "custom" && getCustomText().length < MIN_CUSTOM) {
        toIdle("status.custom_empty");
      } else {
        durationSec = getDuration();
        prepare(buildPassage(), false);
      }
    } else if (state === "finished") {
      toIdle("status.press_start");
    }

    updateButtons();
  }

  /* ---------- সেটিংস বদলালে ---------- */
  function onSettingsChange() {
    el.customWrap.hidden = el.durationSelect.value !== "custom";
    durationSec = getDuration();

    if (el.durationSelect.value === "custom") {
      el.customDuration.value = durationSec;
    }

    if (state === "ready") {
      prepare(buildPassage(), false);
    } else {
      resetLive();
    }
  }

  /* ---------- Interface ভাষা বদলালে ---------- */
  function refreshTexts() {
    updateButtons();
    el.soundBtn.textContent = t(soundOn ? "btn.sound_on" : "btn.sound_off");
    setStatusKey(statusKey);
    if (state === "idle") {
      showIdlePassage();
    }
    updateCustomCount();
    renderShare();
    drawGraph();
  }

  /* ---------- ইভেন্ট যুক্ত করা ---------- */
  el.startBtn.addEventListener("click", startNew);
  el.restartBtn.addEventListener("click", restartSame);
  el.pauseBtn.addEventListener("click", togglePause);

  el.soundBtn.addEventListener("click", function () {
    soundOn = !soundOn;
    el.soundBtn.textContent = t(soundOn ? "btn.sound_on" : "btn.sound_off");
  });

  el.input.addEventListener("input", onInput);

  el.input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  });

  el.input.addEventListener("paste", function (event) {
    event.preventDefault();
  });

  el.input.addEventListener("drop", function (event) {
    event.preventDefault();
  });

  el.input.addEventListener("click", function () {
    var n = el.input.value.length;
    try {
      el.input.setSelectionRange(n, n);
    } catch (e) {
      /* ঠিক আছে */
    }
  });

  el.durationSelect.addEventListener("change", onSettingsChange);
  el.customDuration.addEventListener("change", onSettingsChange);
  el.difficultySelect.addEventListener("change", onSettingsChange);
  el.modeSelect.addEventListener("change", onSettingsChange);

  for (var b = 0; b < el.langButtons.length; b++) {
    el.langButtons[b].addEventListener("click", function (event) {
      setTypingLanguage(event.currentTarget.getAttribute("data-lang"));
    });
  }

  if (el.customText) {
    el.customText.addEventListener("input", function () {
      updateCustomCount();
      // লেখা বদলালে নতুন করে "শুরু" চাপতে হবে
      if (state === "ready" && settings.language === "custom") {
        toIdle("status.press_start");
      }
    });
  }

  el.retryBtn.addEventListener("click", function () {
    startNew();
    var card = $("quick-test");
    if (card && card.scrollIntoView) {
      card.scrollIntoView(true);
    }
  });

  el.shareBtn.addEventListener("click", shareResult);

  document.addEventListener("tsi18n:changed", refreshTexts);

  var resizeTimer = null;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(drawGraph, 150);
  });

  /* ---------- শুরুর অবস্থা ---------- */
  durationSec = getDuration();
  resetLive();
  showIdlePassage();
  setStatusKey("status.press_start");
  setTypingLanguage("english");
  updateCustomCount();
  refreshTexts();

  window.TypeSpeedEngine = {
    getLastResult: function () {
      return lastResult;
    }
  };
})();