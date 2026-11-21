/* wordrain.js - গেম: Word Rain (সময় বেছে নেওয়া ও অক্ষর ধরে হাইলাইট) */

(function () {
  "use strict";

  function $(id) {
    return document.getElementById(id);
  }

  var root = $("wordrain-root");
  if (!root) {
    return;
  }

  var BEST_PREFIX = "wordrain_best_";
  var OLD_BEST_KEY = "wordrain_best"; // প্রথম সংস্করণের সেরা স্কোর (সারভাইভালের জন্য)
  var PREFS_KEY = "wordrain_prefs";

  var MAX_LIVES = 3;
  var MAX_WORDS = 6;
  var WORDS_PER_LEVEL = 8;

  var MODES = ["30", "60", "180", "300", "survival"];
  var SPEEDS = { slow: 0.7, normal: 1, fast: 1.35 };

  /* ---------- লেখা (ইংরেজি ও বাংলা) ---------- */
  var STR = {
    en: {
      title: "Word Rain",
      desc: "Words fall from the top. Type each word before it reaches the red line. Pick a timed round, or Survival with 3 lives.",
      lScore: "Score",
      lLevel: "Level",
      lLives: "Lives",
      lTime: "Time",
      lBest: "Best",
      lDuration: "Game time",
      lSpeed: "Speed",
      modes: {
        "30": "30 seconds",
        "60": "1 minute",
        "180": "3 minutes",
        "300": "5 minutes",
        survival: "Survival (3 lives)"
      },
      speeds: { slow: "Slow", normal: "Normal", fast: "Fast" },
      start: "Start",
      stop: "Stop",
      inputLabel: "Type the falling word",
      placeholder: "Type the word here...",
      ready: "Choose the time and speed, then press Start. The words use your current typing language (English or বাংলা).",
      playing: "Type the falling words.",
      playingCustom: "Type the falling words. Custom Text is selected, so English words are used.",
      over: "Game over! Score {s}, {w} words, level {l}.",
      overBest: "Game over! New best score: {s} ({w} words, level {l}).",
      timeUp: "Time's up! Score {s}, {w} words, {m} missed, level {l}.",
      timeUpBest: "Time's up! New best score: {s} ({w} words, {m} missed, level {l})."
    },
    bn: {
      title: "ওয়ার্ড রেইন",
      desc: "ওপর থেকে শব্দ ঝরে পড়ছে। লাল রেখায় পৌঁছানোর আগেই প্রতিটি শব্দ টাইপ করো। সময় বেছে নিয়ে খেলো, অথবা 3টি জীবনের সারভাইভাল মোডে।",
      lScore: "স্কোর",
      lLevel: "লেভেল",
      lLives: "জীবন",
      lTime: "সময়",
      lBest: "সেরা",
      lDuration: "খেলার সময়",
      lSpeed: "গতি",
      modes: {
        "30": "30 সেকেন্ড",
        "60": "1 মিনিট",
        "180": "3 মিনিট",
        "300": "5 মিনিট",
        survival: "সারভাইভাল (3টি জীবন)"
      },
      speeds: { slow: "ধীর", normal: "স্বাভাবিক", fast: "দ্রুত" },
      start: "শুরু",
      stop: "থামো",
      inputLabel: "ঝরে পড়া শব্দটি টাইপ করো",
      placeholder: "এখানে শব্দটি টাইপ করো...",
      ready: "সময় ও গতি বেছে \"শুরু\" চাপো। শব্দগুলো তোমার বর্তমান টাইপিং ভাষার (ইংরেজি বা বাংলা) হবে।",
      playing: "ঝরে পড়া শব্দগুলো টাইপ করো।",
      playingCustom: "ঝরে পড়া শব্দগুলো টাইপ করো। কাস্টম টেক্সট বাছাই করা ছিল, তাই ইংরেজি শব্দ ব্যবহার হচ্ছে।",
      over: "খেলা শেষ! স্কোর {s}, {w}টি শব্দ, লেভেল {l}।",
      overBest: "খেলা শেষ! নতুন সেরা স্কোর: {s} ({w}টি শব্দ, লেভেল {l})।",
      timeUp: "সময় শেষ! স্কোর {s}, {w}টি শব্দ, {m}টি মিস, লেভেল {l}।",
      timeUpBest: "সময় শেষ! নতুন সেরা স্কোর: {s} ({w}টি শব্দ, {m}টি মিস, লেভেল {l})।"
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

  function norm(s) {
    return s.normalize ? s.normalize("NFC") : s;
  }

  function keyOf(text) {
    return norm(text).toLowerCase();
  }

  /* ---------- বাংলা যুক্তাক্ষর ও কার-চিহ্ন একসঙ্গে ধরার জন্য ---------- */
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

  /* ---------- সেভ করা ডেটা ---------- */
  var memStore = {};

  function storeOk() {
    return !!(window.TS_STORE && window.TS_STORE.isAvailable());
  }

  function readStore(key) {
    return storeOk() ? window.TS_STORE.get(key, null) : memStore[key] || null;
  }

  function writeStore(key, value) {
    if (storeOk()) {
      window.TS_STORE.set(key, value);
    } else {
      memStore[key] = value;
    }
  }

  function isRecord(b) {
    return b && typeof b === "object" && typeof b.score === "number" && isFinite(b.score);
  }

  function getBest(mode) {
    var b = readStore(BEST_PREFIX + mode);
    if (!isRecord(b) && mode === "survival") {
      b = readStore(OLD_BEST_KEY);
    }
    return isRecord(b) ? b : { score: 0 };
  }

  function loadPrefs() {
    var p = readStore(PREFS_KEY);
    var prefs = { mode: "60", speed: "normal" };
    if (p && typeof p === "object") {
      if (MODES.indexOf(p.mode) !== -1) {
        prefs.mode = p.mode;
      }
      if (Object.prototype.hasOwnProperty.call(SPEEDS, p.speed)) {
        prefs.speed = p.speed;
      }
    }
    return prefs;
  }

  var prefs = loadPrefs();

  function savePrefs() {
    writeStore(PREFS_KEY, prefs);
  }

  /* ---------- কার্ডের কাঠামো (একবারই তৈরি) ---------- */
  function optionsHtml(id, values) {
    var html = '<select id="' + id + '">';
    for (var i = 0; i < values.length; i++) {
      html += '<option value="' + values[i] + '"></option>';
    }
    return html + "</select>";
  }

  root.innerHTML =
    '<h3 id="wr-title"></h3><p id="wr-desc"></p>' +
    '<div class="test-options wr-options">' +
    '<div class="option"><label for="wr-duration" id="wr-l-duration"></label>' +
    optionsHtml("wr-duration", MODES) +
    "</div>" +
    '<div class="option"><label for="wr-speed" id="wr-l-speed"></label>' +
    optionsHtml("wr-speed", ["slow", "normal", "fast"]) +
    "</div>" +
    "</div>" +
    '<div class="live-stats">' +
    '<div class="live-stat"><span id="wr-score">0</span><small id="wr-l-score"></small></div>' +
    '<div class="live-stat"><span id="wr-level">1</span><small id="wr-l-level"></small></div>' +
    '<div class="live-stat"><span id="wr-third"></span><small id="wr-l-third"></small></div>' +
    '<div class="live-stat"><span id="wr-best">0</span><small id="wr-l-best"></small></div>' +
    "</div>" +
    '<div class="wr-field" id="wr-field" aria-hidden="true"></div>' +
    '<label for="wr-input" class="visually-hidden" id="wr-input-label"></label>' +
    '<input type="text" id="wr-input" disabled autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false">' +
    '<div class="test-controls">' +
    '<button type="button" class="btn btn-gold" id="wr-start"></button>' +
    '<button type="button" class="btn btn-outline" id="wr-stop" disabled></button>' +
    "</div>" +
    '<p class="tr-msg" id="wr-msg" role="status"></p>';

  var field = $("wr-field");
  var inputEl = $("wr-input");
  var startBtn = $("wr-start");
  var stopBtn = $("wr-stop");
  var durationSel = $("wr-duration");
  var speedSel = $("wr-speed");

  durationSel.value = prefs.mode;
  speedSel.value = prefs.speed;

  /* ---------- খেলার অবস্থা ---------- */
  var running = false;
  var paused = false;
  var words = [];
  var lastTs = 0;
  var spawnWait = 0;
  var rafId = 0;
  var timeLeft = 0;
  var shownSecond = -1;
  var state = { score: 0, level: 1, lives: MAX_LIVES, killed: 0, missed: 0, lang: "english" };
  var msgKey = "ready";
  var msgVars = null;

  function isSurvival() {
    return prefs.mode === "survival";
  }

  function setText(id, text) {
    var node = $(id);
    if (node) {
      node.textContent = text;
    }
  }

  function heartsText() {
    var s = "";
    for (var i = 0; i < MAX_LIVES; i++) {
      s += i < state.lives ? "♥" : "♡";
    }
    return s;
  }

  function formatTime(totalSeconds) {
    var s = Math.max(0, Math.ceil(totalSeconds));
    var m = Math.floor(s / 60);
    var r = s % 60;
    return m + ":" + (r < 10 ? "0" : "") + r;
  }

  function updateStats() {
    var S = getStr();
    setText("wr-score", String(state.score));
    setText("wr-level", String(state.level));
    setText("wr-l-third", isSurvival() ? S.lLives : S.lTime);

    if (isSurvival()) {
      setText("wr-third", heartsText());
    } else {
      var seconds = running ? timeLeft : parseInt(prefs.mode, 10);
      setText("wr-third", formatTime(seconds));
    }
    setText("wr-best", String(getBest(prefs.mode).score));
  }

  function showMessage() {
    var S = getStr();
    setText("wr-msg", msgVars ? fill(S[msgKey], msgVars) : S[msgKey]);
  }

  function setMessage(key, vars) {
    msgKey = key;
    msgVars = vars || null;
    showMessage();
  }

  function applyTexts() {
    var S = getStr();
    var i;

    setText("wr-title", S.title);
    setText("wr-desc", S.desc);
    setText("wr-l-score", S.lScore);
    setText("wr-l-level", S.lLevel);
    setText("wr-l-best", S.lBest);
    setText("wr-l-duration", S.lDuration);
    setText("wr-l-speed", S.lSpeed);
    setText("wr-input-label", S.inputLabel);

    for (i = 0; i < durationSel.options.length; i++) {
      durationSel.options[i].textContent = S.modes[durationSel.options[i].value];
    }
    for (i = 0; i < speedSel.options.length; i++) {
      speedSel.options[i].textContent = S.speeds[speedSel.options[i].value];
    }

    startBtn.textContent = S.start;
    stopBtn.textContent = S.stop;
    inputEl.setAttribute("placeholder", S.placeholder);
    showMessage();
    updateStats();
  }

  /* ---------- শব্দ বাছাই ---------- */
  function levelName() {
    if (state.level <= 3) {
      return "easy";
    }
    if (state.level <= 6) {
      return "medium";
    }
    return "hard";
  }

  function onScreen(key) {
    for (var i = 0; i < words.length; i++) {
      if (words[i].key === key) {
        return true;
      }
    }
    return false;
  }

  function pickWord() {
    var texts = window.TYPE_TEXTS || {};
    var lang = texts[state.lang] || texts.english;
    if (!lang) {
      return null;
    }
    var level = lang[levelName()] || lang.medium;
    var bank = level && level.word;
    if (!bank || !bank.length) {
      return null;
    }

    for (var tries = 0; tries < 20; tries++) {
      var text = norm(bank[Math.floor(Math.random() * bank.length)]);
      var key = text.toLowerCase();
      if (!onScreen(key)) {
        return { text: text, key: key };
      }
    }
    return null;
  }

  function spawn() {
    if (words.length >= MAX_WORDS) {
      return;
    }
    var pick = pickWord();
    if (!pick) {
      return;
    }

    var el = document.createElement("span");
    el.className = "wr-word";

    // প্রতিটি অক্ষর (বা যুক্তাক্ষর) আলাদা span, যাতে টাইপ করা অক্ষরই সোনালি হয়
    var starts = splitUnits(pick.text);
    var spans = [];
    for (var u = 0; u < starts.length; u++) {
      var end = u + 1 < starts.length ? starts[u + 1] : pick.text.length;
      var ch = document.createElement("span");
      ch.className = "wr-ch";
      ch.textContent = pick.text.slice(starts[u], end);
      el.appendChild(ch);
      spans.push(ch);
    }

    field.appendChild(el);

    var h = el.offsetHeight || 30;
    var w = el.offsetWidth || 80;
    var x = Math.max(0, Math.random() * (field.clientWidth - w));

    el.style.left = x + "px";
    el.style.top = -h + "px";
    words.push({ el: el, key: pick.key, y: -h, h: h, starts: starts, spans: spans, matched: 0 });
  }

  /* ---------- হাইলাইট ---------- */
  function setMatched(word, count) {
    if (word.matched === count) {
      return;
    }
    word.matched = count;
    for (var i = 0; i < word.spans.length; i++) {
      if (word.starts[i] < count) {
        word.spans[i].classList.add("on");
      } else {
        word.spans[i].classList.remove("on");
      }
    }
    if (count > 0) {
      word.el.classList.add("target");
    } else {
      word.el.classList.remove("target");
    }
  }

  function clearTargets() {
    for (var i = 0; i < words.length; i++) {
      setMatched(words[i], 0);
    }
  }

  /* ---------- শব্দ ফাটানো ও মিস ---------- */
  function destroy(word) {
    var idx = words.indexOf(word);
    if (idx !== -1) {
      words.splice(idx, 1);
    }

    state.score += 10 + word.key.length * 2;
    state.killed++;

    var newLevel = 1 + Math.floor(state.killed / WORDS_PER_LEVEL);
    if (newLevel > state.level) {
      state.level = newLevel;
    }

    word.el.classList.add("pop");
    setTimeout(function () {
      if (word.el.parentNode) {
        word.el.parentNode.removeChild(word.el);
      }
    }, 250);

    updateStats();
  }

  function miss(index) {
    var word = words.splice(index, 1)[0];
    if (word.el.parentNode) {
      word.el.parentNode.removeChild(word.el);
    }

    state.missed++;
    if (isSurvival()) {
      state.lives--;
    }

    field.classList.add("hit");
    setTimeout(function () {
      field.classList.remove("hit");
    }, 300);
    updateStats();

    if (isSurvival() && state.lives <= 0) {
      endGame();
    }
  }

  /* ---------- খেলার চক্র ---------- */
  function frame(ts) {
    if (!running || paused) {
      return;
    }
    if (!lastTs) {
      lastTs = ts;
    }
    var dt = Math.min(0.05, (ts - lastTs) / 1000);
    lastTs = ts;

    // সময় শেষ হয়েছে কিনা (শুধু সময়ভিত্তিক মোডে)
    if (!isSurvival()) {
      timeLeft -= dt;
      var sec = Math.ceil(timeLeft);
      if (sec !== shownSecond) {
        shownSecond = sec;
        setText("wr-third", formatTime(timeLeft));
      }
      if (timeLeft <= 0) {
        endGame();
        return;
      }
    }

    var mult = SPEEDS[prefs.speed] || 1;
    var speed = (24 + state.level * 6) * mult;
    var fieldHeight = field.clientHeight;

    for (var i = words.length - 1; i >= 0; i--) {
      var w = words[i];
      w.y += speed * dt;
      w.el.style.top = w.y + "px";
      if (w.y + w.h >= fieldHeight) {
        miss(i);
        if (!running) {
          return;
        }
      }
    }

    spawnWait -= dt;
    if (spawnWait <= 0) {
      spawn();
      spawnWait = Math.max(0.7, (2.8 - state.level * 0.2) / mult);
    }

    rafId = requestAnimationFrame(frame);
  }

  function clearField() {
    field.innerHTML = "";
    words = [];
  }

  function setControlsLocked(locked) {
    durationSel.disabled = locked;
    speedSel.disabled = locked;
    startBtn.disabled = locked;
    stopBtn.disabled = !locked;
  }

  function start() {
    if (running) {
      return;
    }
    clearField();

    var active = document.querySelector(".lang-btn.active");
    var current = active ? active.getAttribute("data-lang") : "english";
    state.lang = current === "bangla" ? "bangla" : "english";

    state.score = 0;
    state.level = 1;
    state.lives = MAX_LIVES;
    state.killed = 0;
    state.missed = 0;

    timeLeft = isSurvival() ? 0 : parseInt(prefs.mode, 10);
    shownSecond = -1;

    running = true;
    paused = false;
    lastTs = 0;
    spawnWait = 0.3;

    inputEl.disabled = false;
    inputEl.value = "";
    inputEl.classList.remove("wr-bad");
    setControlsLocked(true);

    setMessage(current === "custom" ? "playingCustom" : "playing");
    updateStats();

    if (root.scrollIntoView) {
      root.scrollIntoView(true);
    }
    inputEl.focus();
    rafId = requestAnimationFrame(frame);
  }

  function endGame() {
    running = false;
    paused = false;
    cancelAnimationFrame(rafId);

    inputEl.disabled = true;
    inputEl.value = "";
    inputEl.classList.remove("wr-bad");
    clearTargets();
    setControlsLocked(false);

    var best = getBest(prefs.mode);
    var isBest = state.score > best.score && state.score > 0;
    if (isBest) {
      writeStore(BEST_PREFIX + prefs.mode, {
        score: state.score,
        words: state.killed,
        level: state.level,
        t: Date.now()
      });
    }

    var vars = { s: state.score, w: state.killed, m: state.missed, l: state.level };
    if (isSurvival()) {
      setMessage(isBest ? "overBest" : "over", vars);
    } else {
      setMessage(isBest ? "timeUpBest" : "timeUp", vars);
    }
    updateStats();

    try {
      document.dispatchEvent(
        new CustomEvent("wordrain:finished", {
          detail: {
            mode: prefs.mode,
            speed: prefs.speed,
            score: state.score,
            words: state.killed,
            missed: state.missed,
            level: state.level
          }
        })
      );
    } catch (e) {
      /* ঠিক আছে */
    }
  }

  /* ---------- টাইপ করার সময় ---------- */
  function onInput() {
    if (!running || paused) {
      return;
    }

    var value = keyOf(inputEl.value).replace(/\s+/g, "");
    var hit = null;
    var anyPrefix = false;

    for (var i = 0; i < words.length; i++) {
      var w = words[i];
      if (value !== "" && w.key === value) {
        hit = w;
      }
      if (value !== "" && w.key.indexOf(value) === 0) {
        setMatched(w, value.length);
        anyPrefix = true;
      } else {
        setMatched(w, 0);
      }
    }

    if (hit) {
      destroy(hit);
      inputEl.value = "";
      inputEl.classList.remove("wr-bad");
      clearTargets();
      return;
    }

    if (value !== "" && !anyPrefix) {
      inputEl.classList.add("wr-bad");
    } else {
      inputEl.classList.remove("wr-bad");
    }
  }

  /* ---------- ইভেন্ট ---------- */
  startBtn.addEventListener("click", start);

  stopBtn.addEventListener("click", function () {
    if (running) {
      endGame();
    }
  });

  durationSel.addEventListener("change", function () {
    if (MODES.indexOf(durationSel.value) !== -1) {
      prefs.mode = durationSel.value;
      savePrefs();
      updateStats();
    }
  });

  speedSel.addEventListener("change", function () {
    if (Object.prototype.hasOwnProperty.call(SPEEDS, speedSel.value)) {
      prefs.speed = speedSel.value;
      savePrefs();
    }
  });

  inputEl.addEventListener("input", onInput);

  inputEl.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  });

  // ট্যাব বা অ্যাপ বদলালে খেলা থামে (সময়ও থামে), ফিরলে আবার চলে
  document.addEventListener("visibilitychange", function () {
    if (!running) {
      return;
    }
    if (document.hidden) {
      paused = true;
      cancelAnimationFrame(rafId);
    } else if (paused) {
      paused = false;
      lastTs = 0;
      rafId = requestAnimationFrame(frame);
    }
  });

  document.addEventListener("tsi18n:changed", applyTexts);

  /* ---------- শুরু ---------- */
  applyTexts();
})();