/* keyboard.js - Phase 14: Keyboard Trainer */

(function () {
  "use strict";

  function $(id) {
    return document.getElementById(id);
  }

  var root = $("trainer-root");
  if (!root) {
    return;
  }

  var isTouch = !!(window.matchMedia && window.matchMedia("(pointer: coarse)").matches);

  /* ---------- কিবোর্ডের গঠন ---------- */
  var ROWS = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";"],
    ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"]
  ];

  // কোন কি কোন আঙুলে: lp/lr/lm/li = বাঁ হাত, ri/rm/rr/rp = ডান হাত, th = বুড়ো আঙুল
  var FINGER_OF = {};
  function assign(chars, finger) {
    for (var i = 0; i < chars.length; i++) {
      FINGER_OF[chars.charAt(i)] = finger;
    }
  }
  assign("1qaz", "lp");
  assign("2wsx", "lr");
  assign("3edc", "lm");
  assign("4rfv5tgb", "li");
  assign("6yhn7ujm", "ri");
  assign("8ik,", "rm");
  assign("9ol.", "rr");
  assign("0p;/", "rp");
  assign(" ", "th");

  var FCLASS = {
    lp: "f-pinky",
    lr: "f-ring",
    lm: "f-middle",
    li: "f-index",
    ri: "f-index",
    rm: "f-middle",
    rr: "f-ring",
    rp: "f-pinky",
    th: "f-thumb"
  };

  /* ---------- লেসন ---------- */
  var HOME_WORDS = [
    "ask", "asks", "sad", "lad", "lads", "dad", "dads", "fad", "fads", "all", "fall", "falls",
    "flask", "flasks", "salad", "salads", "alas", "lass", "add", "adds", "sass", "alfalfa"
  ];

  var LESSONS = {
    home: [
      { id: "hrLeft", chars: "asdf", count: 24 },
      { id: "hrRight", chars: "jkl;", count: 24 },
      { id: "hrBoth", chars: "asdfjkl;", count: 24 },
      { id: "hrWords", words: HOME_WORDS }
    ],
    keys: [
      { id: "kkTop", chars: "qwertyuiop", count: 24 },
      { id: "kkBottom", chars: "zxcvbnm,./", count: 24 },
      { id: "kkNumbers", chars: "1234567890", count: 24 },
      { id: "kkLetters", chars: "abcdefghijklmnopqrstuvwxyz", count: 26 }
    ]
  };

  /* ---------- লেখা (ইংরেজি ও বাংলা) ---------- */
  var STR = {
    en: {
      tabs: { practice: "Practice", fingers: "Finger Guide", layout: "Layout Guide" },
      modes: { home: "Home Row", keys: "Key by Key" },
      lessonLabel: "Lesson",
      lessons: {
        hrLeft: "Left hand: A S D F",
        hrRight: "Right hand: J K L ;",
        hrBoth: "Both hands: A S D F J K L ;",
        hrWords: "Home row words",
        kkTop: "Top row: Q to P",
        kkBottom: "Bottom row: Z to /",
        kkNumbers: "Number row: 1 to 0",
        kkLetters: "All letters: A to Z"
      },
      start: "Start",
      stop: "Stop",
      space: "Space",
      sDone: "Keys",
      sAcc: "Accuracy",
      sMiss: "Mistakes",
      sTime: "Time",
      ready: "Choose a lesson and press Start.",
      running: "Press the highlighted key.",
      finished: "Well done! {n} keys in {s}s with {a}% accuracy.",
      tipDesktop: "Use your real keyboard: click the box below and type. You can also click the on-screen keys.",
      tipTouch: "Tap the keys on the on-screen keyboard above. Finger training works best on a real keyboard.",
      inputLabel: "Type here with your keyboard",
      inputPlaceholder: "Click here, then type...",
      boardLabel: "Virtual keyboard",
      fingers: {
        lp: "Left pinky",
        lr: "Left ring finger",
        lm: "Left middle finger",
        li: "Left index finger",
        ri: "Right index finger",
        rm: "Right middle finger",
        rr: "Right ring finger",
        rp: "Right pinky",
        th: "Thumb"
      },
      infoKey: "{k} is typed with the {f}.",
      fgIntro: "Each color shows which finger presses the key. Tap a key to see its finger.",
      fingerNames: { pinky: "Pinky", ring: "Ring finger", middle: "Middle finger", index: "Index finger", thumb: "Thumb" },
      left: "Left",
      right: "Right",
      tipsTitle: "Good habits",
      tips: [
        "Rest your fingers on the home row: A S D F on the left and J K L ; on the right.",
        "Feel the small bumps on F and J. They help you find the home row without looking.",
        "Let your thumbs rest on the space bar.",
        "After each key, return your finger to the home row.",
        "Keep your wrists relaxed and look at the screen, not at the keys."
      ],
      lgIntro: "Tap a row below to light it up on the keyboard.",
      rows: {
        numbers: { name: "Number row", note: "Numbers 1 to 0. Reach up using the same finger that types the letters below." },
        top: { name: "Top row", note: "The first six letters spell QWERTY, the name of this layout." },
        home: { name: "Home row", note: "Your fingers rest here. Feel the bumps on F and J." },
        bottom: { name: "Bottom row", note: "Reach down from the home row, then come back." },
        space: { name: "Space bar", note: "Pressed with either thumb." }
      },
      lgNote:
        "This trainer shows the common English QWERTY layout. A real keyboard also has keys like Shift, Enter and Backspace.",
      lgBangla:
        "Bangla typing uses the Bangla layout of your phone or computer keyboard. Bijoy layout mapping is not part of this trainer."
    },
    bn: {
      tabs: { practice: "প্র্যাকটিস", fingers: "আঙুলের গাইড", layout: "লেআউট গাইড" },
      modes: { home: "হোম রো", keys: "কি বাই কি" },
      lessonLabel: "লেসন",
      lessons: {
        hrLeft: "বাঁ হাত: A S D F",
        hrRight: "ডান হাত: J K L ;",
        hrBoth: "দুই হাত: A S D F J K L ;",
        hrWords: "হোম রো-র শব্দ",
        kkTop: "ওপরের সারি: Q থেকে P",
        kkBottom: "নিচের সারি: Z থেকে /",
        kkNumbers: "সংখ্যা সারি: 1 থেকে 0",
        kkLetters: "সব অক্ষর: A থেকে Z"
      },
      start: "শুরু",
      stop: "থামো",
      space: "স্পেস",
      sDone: "কি",
      sAcc: "নির্ভুলতা",
      sMiss: "ভুল",
      sTime: "সময়",
      ready: "একটি লেসন বেছে \"শুরু\" চাপো।",
      running: "উজ্জ্বল কি-টি চাপো।",
      finished: "চমৎকার! {s} সেকেন্ডে {n}টি কি, নির্ভুলতা {a}%।",
      tipDesktop: "আসল কিবোর্ড ব্যবহার করো: নিচের বক্সে ক্লিক করে টাইপ করো। চাইলে পর্দার কি-ও ক্লিক করতে পারো।",
      tipTouch: "ওপরের অন-স্ক্রিন কিবোর্ডের কি ট্যাপ করো। আঙুলের প্রশিক্ষণ আসল কিবোর্ডেই ভালো কাজ করে।",
      inputLabel: "এখানে কিবোর্ড দিয়ে টাইপ করো",
      inputPlaceholder: "এখানে ক্লিক করে টাইপ করো...",
      boardLabel: "ভার্চুয়াল কিবোর্ড",
      fingers: {
        lp: "বাঁ হাতের কনিষ্ঠা",
        lr: "বাঁ হাতের অনামিকা",
        lm: "বাঁ হাতের মধ্যমা",
        li: "বাঁ হাতের তর্জনী",
        ri: "ডান হাতের তর্জনী",
        rm: "ডান হাতের মধ্যমা",
        rr: "ডান হাতের অনামিকা",
        rp: "ডান হাতের কনিষ্ঠা",
        th: "বুড়ো আঙুল"
      },
      infoKey: "{k} টাইপ করতে {f} ব্যবহার করো।",
      fgIntro: "প্রতিটি রঙ বলে দেয় কোন আঙুল ওই কি চাপবে। কোনো কি ট্যাপ করলে তার আঙুল দেখা যাবে।",
      fingerNames: { pinky: "কনিষ্ঠা", ring: "অনামিকা", middle: "মধ্যমা", index: "তর্জনী", thumb: "বুড়ো আঙুল" },
      left: "বাঁ",
      right: "ডান",
      tipsTitle: "ভালো অভ্যাস",
      tips: [
        "আঙুল হোম রো-তে রাখো: বাঁ হাতে A S D F, ডান হাতে J K L ;।",
        "F ও J কি-তে ছোট উঁচু দাগ আছে। এতে না দেখেই হোম রো খুঁজে পাবে।",
        "দুই বুড়ো আঙুল স্পেস বারে রাখো।",
        "প্রতিটি কি চাপার পর আঙুল হোম রো-তে ফিরিয়ে আনো।",
        "কবজি শিথিল রাখো, কিবোর্ড নয়, পর্দার দিকে তাকাও।"
      ],
      lgIntro: "নিচের কোনো সারিতে ট্যাপ করলে কিবোর্ডে ওই সারি জ্বলে উঠবে।",
      rows: {
        numbers: { name: "সংখ্যা সারি", note: "1 থেকে 0 পর্যন্ত সংখ্যা। নিচের অক্ষর যে আঙুলে টাইপ হয়, ওপরে হাত বাড়িয়ে সেই আঙুলই ব্যবহার করো।" },
        top: { name: "ওপরের সারি", note: "প্রথম ছয়টি অক্ষর মিলে QWERTY, এই লেআউটের নাম।" },
        home: { name: "হোম রো", note: "আঙুলগুলো এখানে বিশ্রামে থাকে। F ও J-এর ছোট উঁচু দাগ অনুভব করো।" },
        bottom: { name: "নিচের সারি", note: "হোম রো থেকে নিচে হাত বাড়াও, আবার ফিরে এসো।" },
        space: { name: "স্পেস বার", note: "যেকোনো বুড়ো আঙুল দিয়ে চাপো।" }
      },
      lgNote:
        "এই ট্রেনার প্রচলিত ইংরেজি QWERTY লেআউট দেখায়। আসল কিবোর্ডে Shift, Enter ও Backspace-এর মতো আরও কি থাকে।",
      lgBangla:
        "বাংলা টাইপিংয়ে তোমার ফোন বা কম্পিউটারের কিবোর্ডের বাংলা লেআউট ব্যবহার হয়। এই ট্রেনারে বিজয় লেআউট ম্যাপিং নেই।"
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

  function shuffle(list) {
    var arr = list.slice();
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i];
      arr[i] = arr[j];
      arr[j] = t;
    }
    return arr;
  }

  /* ---------- অবস্থা ---------- */
  var tab = "practice";
  var mode = "home";
  var lessonId = "hrLeft";
  var running = false;
  var seq = "";
  var idx = 0;
  var correct = 0;
  var mistakes = 0;
  var startAt = 0;
  var timerId = null;
  var msgKey = "ready";
  var msgVars = null;
  var targetEl = null;
  var infoKey = null;

  /* ---------- কিবোর্ড তৈরি (একবারই) ---------- */
  function keyLabel(ch) {
    return /[a-z]/.test(ch) ? ch.toUpperCase() : ch;
  }

  function keyboardHtml() {
    var html = "";
    for (var r = 0; r < ROWS.length; r++) {
      html += '<div class="vk-row vk-row-' + r + '">';
      for (var c = 0; c < ROWS[r].length; c++) {
        var ch = ROWS[r][c];
        var bump = ch === "f" || ch === "j" ? " bump" : "";
        html +=
          '<button type="button" tabindex="-1" class="vk ' + FCLASS[FINGER_OF[ch]] + bump +
          '" data-key="' + ch + '" data-row="' + r + '">' + keyLabel(ch) + "</button>";
      }
      html += "</div>";
    }
    html +=
      '<div class="vk-row vk-space"><button type="button" tabindex="-1" class="vk f-thumb" data-key=" " data-row="4">&nbsp;</button></div>';
    return html;
  }

  root.innerHTML =
    '<div class="tab-row" id="tr-tabs" role="tablist"></div>' +
    '<div id="tr-panel"></div>' +
    '<div class="vk-board" id="tr-keyboard" role="group">' + keyboardHtml() + "</div>" +
    '<p class="trainer-info" id="tr-info" role="status"></p>';

  var tabsEl = $("tr-tabs");
  var panelEl = $("tr-panel");
  var boardEl = $("tr-keyboard");
  var infoEl = $("tr-info");

  function keyEl(ch) {
    return boardEl.querySelector('[data-key="' + ch + '"]');
  }

  function setText(id, text) {
    var node = $(id);
    if (node) {
      node.textContent = text;
    }
  }

  /* ---------- লেসন থেকে অনুশীলনের ক্রম ---------- */
  function currentLesson() {
    var list = LESSONS[mode];
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === lessonId) {
        return list[i];
      }
    }
    lessonId = list[0].id;
    return list[0];
  }

  function bagSequence(chars, count) {
    var out = "";
    var pool = [];
    var last = "";
    while (out.length < count) {
      if (!pool.length) {
        pool = shuffle(chars.split(""));
      }
      var c = pool.pop();
      if (c === last && pool.length) {
        var other = pool.pop();
        pool.push(c);
        c = other;
      }
      out += c;
      last = c;
    }
    return out;
  }

  function wordSequence(words) {
    var out = [];
    var total = 0;
    var pool = [];
    while (total < 30) {
      if (!pool.length) {
        pool = shuffle(words);
      }
      var w = pool.pop();
      out.push(w);
      total += w.length + 1;
    }
    return out.join(" ");
  }

  function buildSequence() {
    var lesson = currentLesson();
    if (lesson.words) {
      return wordSequence(lesson.words);
    }
    return bagSequence(lesson.chars, lesson.count);
  }

  /* ---------- অনুশীলনের ছবি ---------- */
  function accuracy() {
    var total = correct + mistakes;
    return total ? Math.round((correct / total) * 100) : 100;
  }

  function elapsedSeconds() {
    return running ? Math.floor((Date.now() - startAt) / 1000) : 0;
  }

  function updateStats() {
    setText("tr-s-done", idx + " / " + seq.length);
    setText("tr-s-acc", accuracy() + "%");
    setText("tr-s-miss", String(mistakes));
    setText("tr-s-time", elapsedSeconds() + "s");
  }

  function renderSeq() {
    var html = "";
    var start = Math.max(0, idx - 6);
    var end = Math.min(seq.length, start + 30);
    for (var i = start; i < end; i++) {
      var c = seq.charAt(i);
      var label = c === " " ? "·" : c;
      var cls = i < idx ? "done" : i === idx ? "cur" : "";
      html += '<span class="' + cls + '">' + label + "</span>";
    }
    var seqEl = $("tr-seq");
    if (seqEl) {
      seqEl.innerHTML = html;
    }
  }

  function setTarget(ch) {
    if (targetEl) {
      targetEl.classList.remove("target");
      targetEl = null;
    }
    if (ch) {
      targetEl = keyEl(ch);
      if (targetEl) {
        targetEl.classList.add("target");
      }
    }
  }

  function updateStage() {
    var S = getStr();
    var ch = seq.charAt(idx);
    setText("tr-char", ch === " " ? S.space : ch.toUpperCase());
    setText("tr-finger", S.fingers[FINGER_OF[ch]] || "");
    setTarget(ch);
    renderSeq();
    updateStats();
  }

  function showMessage() {
    var S = getStr();
    var text = "";
    if (msgKey) {
      text = msgVars ? fill(S[msgKey], msgVars) : S[msgKey];
    }
    setText("tr-msg", text);
  }

  function setMessage(key, vars) {
    msgKey = key;
    msgVars = vars || null;
    showMessage();
  }

  function flash(ch, cls) {
    var el = keyEl(ch);
    if (!el) {
      return;
    }
    el.classList.add(cls);
    setTimeout(function () {
      el.classList.remove(cls);
    }, 200);
  }

  /* ---------- অনুশীলন চালানো ---------- */
  function stopTimer() {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  }

  function stopDrill(clearMessage) {
    running = false;
    stopTimer();
    setTarget(null);
    if (clearMessage) {
      setMessage("ready");
    }
  }

  function resetStage() {
    setText("tr-char", "?");
    setText("tr-finger", "");
    setText("tr-s-done", "0");
    setText("tr-s-acc", "100%");
    setText("tr-s-miss", "0");
    setText("tr-s-time", "0s");
    var seqEl = $("tr-seq");
    if (seqEl) {
      seqEl.innerHTML = "";
    }
  }

  function startDrill() {
    seq = buildSequence();
    idx = 0;
    correct = 0;
    mistakes = 0;
    startAt = Date.now();
    running = true;

    stopTimer();
    timerId = setInterval(function () {
      setText("tr-s-time", elapsedSeconds() + "s");
    }, 500);

    setMessage("running");
    updateStage();

    var input = $("tr-input");
    if (input && !isTouch) {
      input.focus();
    }
  }

  function finishDrill() {
    var secs = Math.max(1, Math.round((Date.now() - startAt) / 1000));
    var total = seq.length;
    var acc = accuracy();

    running = false;
    stopTimer();
    setTarget(null);
    setText("tr-char", "✓");
    setText("tr-finger", "");
    setText("tr-s-done", total + " / " + total);
    setText("tr-s-time", secs + "s");
    renderSeq();
    setMessage("finished", { n: total, s: secs, a: acc });
  }

  function handleChar(raw) {
    if (!running) {
      return;
    }
    var ch = raw.toLowerCase();
    var expected = seq.charAt(idx);

    if (ch === expected) {
      correct++;
      flash(ch, "ok");
      idx++;
      if (idx >= seq.length) {
        finishDrill();
      } else {
        updateStage();
      }
    } else {
      mistakes++;
      flash(ch, "wrong");
      updateStats();
    }
  }

  /* ---------- ট্যাব ও প্যানেল ---------- */
  function renderTabs() {
    var S = getStr();
    var ids = ["practice", "fingers", "layout"];
    var html = "";
    for (var i = 0; i < ids.length; i++) {
      var on = ids[i] === tab;
      html +=
        '<button type="button" role="tab" class="tab-btn' + (on ? " active" : "") + '" aria-selected="' +
        (on ? "true" : "false") + '" data-tab="' + ids[i] + '">' + S.tabs[ids[i]] + "</button>";
    }
    tabsEl.innerHTML = html;
  }

  function renderPractice() {
    var S = getStr();
    var list = LESSONS[mode];
    var html = "";
    var i;

    html += '<div class="seg-row">';
    html += '<button type="button" class="seg-btn' + (mode === "home" ? " active" : "") + '" data-mode="home">' + S.modes.home + "</button>";
    html += '<button type="button" class="seg-btn' + (mode === "keys" ? " active" : "") + '" data-mode="keys">' + S.modes.keys + "</button>";
    html += "</div>";

    html += '<label for="tr-lesson">' + S.lessonLabel + "</label>";
    html += '<select id="tr-lesson">';
    for (i = 0; i < list.length; i++) {
      html +=
        '<option value="' + list[i].id + '"' + (list[i].id === lessonId ? " selected" : "") + ">" +
        S.lessons[list[i].id] + "</option>";
    }
    html += "</select>";

    html += '<div class="test-controls">';
    html += '<button type="button" class="btn btn-gold" id="tr-start">' + S.start + "</button>";
    html += '<button type="button" class="btn btn-outline" id="tr-stop">' + S.stop + "</button>";
    html += "</div>";

    html += '<div class="tr-target"><span class="tr-char" id="tr-char">?</span><span class="tr-finger" id="tr-finger"></span></div>';
    html += '<div class="tr-seq" id="tr-seq" aria-hidden="true"></div>';

    html += '<div class="live-stats">';
    html += '<div class="live-stat"><span id="tr-s-done">0</span><small>' + S.sDone + "</small></div>";
    html += '<div class="live-stat"><span id="tr-s-acc">100%</span><small>' + S.sAcc + "</small></div>";
    html += '<div class="live-stat"><span id="tr-s-miss">0</span><small>' + S.sMiss + "</small></div>";
    html += '<div class="live-stat"><span id="tr-s-time">0s</span><small>' + S.sTime + "</small></div>";
    html += "</div>";

    html += '<p class="tr-msg" id="tr-msg" role="status"></p>';
    html +=
      '<label for="tr-input" class="visually-hidden">' + S.inputLabel + "</label>" +
      '<input type="text" id="tr-input" placeholder="' + S.inputPlaceholder +
      '" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false">';
    html += '<p class="trainer-tip">' + (isTouch ? S.tipTouch : S.tipDesktop) + "</p>";

    panelEl.innerHTML = html;
    targetEl = null;

    if (running) {
      updateStage();
    } else {
      resetStage();
    }
    showMessage();
  }

  function renderFingers() {
    var S = getStr();
    var types = [
      { id: "pinky", cls: "f-pinky", left: "1 Q A Z", right: "0 P ; /" },
      { id: "ring", cls: "f-ring", left: "2 W S X", right: "9 O L ." },
      { id: "middle", cls: "f-middle", left: "3 E D C", right: "8 I K ," },
      { id: "index", cls: "f-index", left: "4 5 R T F G V B", right: "6 7 Y U H J N M" },
      { id: "thumb", cls: "f-thumb", both: "Space" }
    ];
    var html = "<p>" + S.fgIntro + "</p>";
    html += '<div class="legend-grid">';

    for (var i = 0; i < types.length; i++) {
      var t = types[i];
      var keys = t.both
        ? "<small>" + t.both + "</small>"
        : "<small>" + S.left + ": " + t.left + "</small><small>" + S.right + ": " + t.right + "</small>";
      html +=
        '<div class="legend-item"><span class="legend-dot ' + t.cls + '"></span><div><strong>' +
        S.fingerNames[t.id] + "</strong>" + keys + "</div></div>";
    }
    html += "</div>";

    html += '<h4 class="guide-title">' + S.tipsTitle + "</h4>";
    html += '<ul class="tip-list">';
    for (var j = 0; j < S.tips.length; j++) {
      html += "<li>" + S.tips[j] + "</li>";
    }
    html += "</ul>";

    panelEl.innerHTML = html;
  }

  function renderLayout() {
    var S = getStr();
    var items = [
      { id: "numbers", row: 0, keys: "1 2 3 4 5 6 7 8 9 0" },
      { id: "top", row: 1, keys: "Q W E R T Y U I O P" },
      { id: "home", row: 2, keys: "A S D F G H J K L ;" },
      { id: "bottom", row: 3, keys: "Z X C V B N M , . /" },
      { id: "space", row: 4, keys: "Space" }
    ];
    var html = "<p>" + S.lgIntro + "</p>";

    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      html +=
        '<button type="button" class="layout-item" data-layout-row="' + it.row + '"><strong>' +
        S.rows[it.id].name + "</strong><code>" + it.keys + "</code><small>" + S.rows[it.id].note + "</small></button>";
    }

    html += '<p class="trainer-tip">' + S.lgNote + "</p>";
    html += '<p class="trainer-tip">' + S.lgBangla + "</p>";

    panelEl.innerHTML = html;
  }

  function clearHighlights() {
    var hl = boardEl.querySelectorAll(".row-hl");
    for (var i = 0; i < hl.length; i++) {
      hl[i].classList.remove("row-hl");
    }
  }

  function highlightRow(row) {
    var already = boardEl.querySelector('.vk.row-hl[data-row="' + row + '"]');
    clearHighlights();

    var items = panelEl.querySelectorAll(".layout-item");
    var k;
    for (k = 0; k < items.length; k++) {
      items[k].classList.remove("active");
    }
    if (already) {
      return;
    }

    var keys = boardEl.querySelectorAll('.vk[data-row="' + row + '"]');
    for (k = 0; k < keys.length; k++) {
      keys[k].classList.add("row-hl");
    }
    for (k = 0; k < items.length; k++) {
      if (items[k].getAttribute("data-layout-row") === String(row)) {
        items[k].classList.add("active");
      }
    }
  }

  function renderPanel() {
    if (tab === "practice") {
      renderPractice();
    } else if (tab === "fingers") {
      renderFingers();
    } else {
      renderLayout();
    }
  }

  function showInfo(ch) {
    var S = getStr();
    infoKey = ch;
    var name = ch === " " ? S.space : keyLabel(ch);
    infoEl.textContent = fill(S.infoKey, { k: name, f: S.fingers[FINGER_OF[ch]] });
  }

  function refreshTexts() {
    var S = getStr();
    boardEl.setAttribute("aria-label", S.boardLabel);
    renderTabs();
    renderPanel();
    if (infoKey !== null) {
      showInfo(infoKey);
    }
  }

  function switchTab(next) {
    if (next === tab) {
      return;
    }
    stopDrill(false);
    tab = next;
    clearHighlights();
    infoKey = null;
    infoEl.textContent = "";
    setMessage("ready");
    renderTabs();
    renderPanel();
  }

  /* ---------- ইভেন্ট ---------- */
  root.addEventListener("click", function (event) {
    var node = event.target;
    while (node && node !== root) {
      if (node.getAttribute) {
        if (node.getAttribute("data-tab")) {
          switchTab(node.getAttribute("data-tab"));
          return;
        }
        if (node.getAttribute("data-mode")) {
          var nextMode = node.getAttribute("data-mode");
          if (nextMode !== mode) {
            stopDrill(false);
            mode = nextMode;
            lessonId = LESSONS[mode][0].id;
            setMessage("ready");
            renderPractice();
          }
          return;
        }
        if (node.getAttribute("data-layout-row")) {
          highlightRow(node.getAttribute("data-layout-row"));
          return;
        }
        if (node.id === "tr-start") {
          startDrill();
          return;
        }
        if (node.id === "tr-stop") {
          stopDrill(true);
          resetStage();
          return;
        }
        if (node.hasAttribute("data-key")) {
          var ch = node.getAttribute("data-key");
          if (running) {
            handleChar(ch);
          } else {
            showInfo(ch);
          }
          return;
        }
      }
      node = node.parentNode;
    }
  });

  root.addEventListener("change", function (event) {
    var target = event.target;
    if (target && target.id === "tr-lesson") {
      stopDrill(false);
      lessonId = target.value;
      setMessage("ready");
      resetStage();
    }
  });

  // আসল কিবোর্ডে বা ফোনের কিবোর্ডে টাইপ করলে
  root.addEventListener("input", function (event) {
    var target = event.target;
    if (!target || target.id !== "tr-input") {
      return;
    }
    var value = target.value;
    target.value = "";
    for (var i = 0; i < value.length; i++) {
      handleChar(value.charAt(i));
    }
  });

  root.addEventListener("keydown", function (event) {
    if (event.target && event.target.id === "tr-input" && event.key === "Enter") {
      event.preventDefault();
    }
  });

  document.addEventListener("tsi18n:changed", refreshTexts);

  /* ---------- শুরু ---------- */
  refreshTexts();
})();