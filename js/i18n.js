/* i18n.js - Interface Language (English / বাংলা) */

(function () {
  "use strict";

  var STORAGE_KEY = "ts_ui_lang";
  var current = "en";

  var dict = {
    en: {
      "nav.home": "Home",
      "nav.test": "Typing Test",
      "nav.practice": "Practice",
      "nav.games": "Games",
      "nav.learn": "Learn",
      "ui.aria": "Interface language",

      "side.menu": "Menu",
      "side.more": "More",
      "side.language": "Language",
      "side.practice": "Practice Center",
      "side.games": "Typing Games",
      "side.stats": "Statistics",
      "side.leaderboard": "Leaderboard",
      "side.achievements": "Achievements",
      "side.keyboard": "Keyboard Trainer",
      "side.learning": "Learning Center",
      "side.about": "About",
      "side.contact": "Contact",
      "side.privacy": "Privacy Policy",
      "side.terms": "Terms and Conditions",

      "hero.tagline": "Type Faster. Think Better.",
      "hero.title1": "Master Your",
      "hero.title2": "Typing Skills.",
      "hero.text": "Test your speed. Improve your accuracy. Become a typing master.",
      "hero.start": "Start Typing Test",
      "hero.explore": "Explore Practice",
      "label.accuracy": "Accuracy",
      "preview.label": "Sample preview",

      "feat.1.t": "Live Stats",
      "feat.1.d": "WPM, CPM and accuracy as you type",
      "feat.2.t": "English, বাংলা & Custom",
      "feat.2.d": "Type in your language or paste your own text",
      "feat.3.t": "Practice & Games",
      "feat.3.d": "Build speed with lessons and challenges",
      "feat.4.t": "Track Progress",
      "feat.4.d": "History and best scores saved on your device",

      "test.title": "Quick Typing Test",
      "opt.duration": "Duration",
      "opt.difficulty": "Difficulty",
      "opt.mode": "Test Type",
      "dur.15": "15 Seconds",
      "dur.30": "30 Seconds",
      "dur.60": "60 Seconds",
      "dur.120": "120 Seconds",
      "dur.custom": "Custom",
      "dur.custom_label": "Seconds (5 to 600)",
      "diff.easy": "Easy",
      "diff.medium": "Medium",
      "diff.hard": "Hard",
      "mode.word": "Word-Based",
      "mode.sentence": "Sentence-Based",
      "mode.paragraph": "Paragraph-Based",
      "live.time": "Time",
      "test.placeholder": "Start typing here...",
      "test.type_here": "Type here",
      "btn.start": "Start",
      "btn.restart": "Restart",
      "btn.pause": "Pause",
      "btn.resume": "Resume",
      "btn.sound_on": "Sound: On",
      "btn.sound_off": "Sound: Off",

      "passage.idle": "Click \"Start\" to load your typing passage.",
      "status.press_start": "Press Start to begin.",
      "status.ready": "Start typing to begin the timer.",
      "status.paused": "Paused. Press Resume to continue.",
      "status.time_up": "Time's up! Here are your results.",
      "status.completed": "Passage completed! Here are your results.",
      "status.custom_empty": "Please paste at least 20 characters in the Custom Text box first.",

      "res.title": "Your Results",
      "res.net": "Net WPM",
      "res.gross": "Gross WPM",
      "res.cpm": "CPM",
      "res.correct": "Correct Chars",
      "res.incorrect": "Incorrect Chars",
      "res.error": "Error Rate",
      "res.time": "Time",
      "res.graph": "Performance Graph",
      "res.graph_note": "Net WPM for each second",
      "res.graph_aria": "Graph of your net words per minute during the test",
      "res.formula": "How it is calculated: 5 characters = 1 word (same rule for every language). Net WPM = Gross WPM minus uncorrected errors per minute.",
      "res.retry": "Try Again",
      "res.share": "Share Result",
      "graph.nodata": "Not enough data for a graph. Try a longer test.",
      "share.text": "I typed {wpm} WPM with {acc}% accuracy on Type Speed.com!",
      "share.copied": "Result copied to clipboard.",

      "lang.title": "Language Selection",
      "lang.custom": "Custom Text",
      "lang.custom_label": "Paste your own paragraph",
      "lang.custom_ph": "Paste your text here...",
      "lang.count": "{n} / {max} characters",
      "lang.bangla_note": "Bangla typing uses your phone's Bangla (Unicode) keyboard, such as Gboard Bangla. Bijoy layout mapping is not built into this website.",

      "leader.note": "This is a local demo leaderboard. It is not a real global leaderboard.",
      "tab.daily": "Daily",
      "tab.weekly": "Weekly",
      "tab.monthly": "Monthly",
      "tab.alltime": "All-Time",

      "foot.copy": "© 2026 Type Speed.com. All rights reserved."
    },

    bn: {
      "nav.home": "হোম",
      "nav.test": "টাইপিং টেস্ট",
      "nav.practice": "প্র্যাকটিস",
      "nav.games": "গেমস",
      "nav.learn": "শেখো",
      "ui.aria": "ইন্টারফেসের ভাষা",

      "side.menu": "মেনু",
      "side.more": "আরও",
      "side.language": "ভাষা",
      "side.practice": "প্র্যাকটিস সেন্টার",
      "side.games": "টাইপিং গেমস",
      "side.stats": "পরিসংখ্যান",
      "side.leaderboard": "লিডারবোর্ড",
      "side.achievements": "অর্জন",
      "side.keyboard": "কিবোর্ড ট্রেনার",
      "side.learning": "লার্নিং সেন্টার",
      "side.about": "আমাদের সম্পর্কে",
      "side.contact": "যোগাযোগ",
      "side.privacy": "গোপনীয়তা নীতি",
      "side.terms": "শর্তাবলি",

      "hero.tagline": "দ্রুত টাইপ করো। ভালো ভাবো।",
      "hero.title1": "টাইপিং দক্ষতায় হয়ে ওঠো",
      "hero.title2": "সেরা।",
      "hero.text": "তোমার গতি যাচাই করো। নির্ভুলতা বাড়াও। হয়ে ওঠো টাইপিং মাস্টার।",
      "hero.start": "টাইপিং টেস্ট শুরু করো",
      "hero.explore": "প্র্যাকটিস দেখো",
      "label.accuracy": "নির্ভুলতা",
      "preview.label": "নমুনা প্রিভিউ",

      "feat.1.t": "লাইভ পরিসংখ্যান",
      "feat.1.d": "টাইপ করার সময়ই WPM, CPM ও নির্ভুলতা দেখো",
      "feat.2.t": "ইংরেজি, বাংলা ও কাস্টম",
      "feat.2.d": "নিজের ভাষায় টাইপ করো বা নিজের লেখা পেস্ট করো",
      "feat.3.t": "প্র্যাকটিস ও গেমস",
      "feat.3.d": "পাঠ ও চ্যালেঞ্জে গতি বাড়াও",
      "feat.4.t": "অগ্রগতি দেখো",
      "feat.4.d": "হিস্টোরি ও সেরা স্কোর তোমার ডিভাইসে সেভ থাকে",

      "test.title": "কুইক টাইপিং টেস্ট",
      "opt.duration": "সময়",
      "opt.difficulty": "কঠিনতা",
      "opt.mode": "টেস্টের ধরন",
      "dur.15": "15 সেকেন্ড",
      "dur.30": "30 সেকেন্ড",
      "dur.60": "60 সেকেন্ড",
      "dur.120": "120 সেকেন্ড",
      "dur.custom": "কাস্টম",
      "dur.custom_label": "সেকেন্ড (5 থেকে 600)",
      "diff.easy": "সহজ",
      "diff.medium": "মাঝারি",
      "diff.hard": "কঠিন",
      "mode.word": "শব্দভিত্তিক",
      "mode.sentence": "বাক্যভিত্তিক",
      "mode.paragraph": "অনুচ্ছেদভিত্তিক",
      "live.time": "সময়",
      "test.placeholder": "এখানে টাইপ শুরু করো...",
      "test.type_here": "এখানে টাইপ করো",
      "btn.start": "শুরু",
      "btn.restart": "রিস্টার্ট",
      "btn.pause": "বিরতি",
      "btn.resume": "চালু করো",
      "btn.sound_on": "সাউন্ড: চালু",
      "btn.sound_off": "সাউন্ড: বন্ধ",

      "passage.idle": "টাইপিংয়ের লেখা দেখতে \"শুরু\" বোতাম চাপো।",
      "status.press_start": "শুরু করতে \"শুরু\" বোতাম চাপো।",
      "status.ready": "টাইপ শুরু করলেই টাইমার চালু হবে।",
      "status.paused": "বিরতিতে আছে। চালিয়ে যেতে \"চালু করো\" চাপো।",
      "status.time_up": "সময় শেষ! তোমার ফলাফল নিচে দেখো।",
      "status.completed": "লেখা সম্পূর্ণ! তোমার ফলাফল নিচে দেখো।",
      "status.custom_empty": "আগে কাস্টম টেক্সট বক্সে অন্তত 20টি অক্ষরের লেখা পেস্ট করো।",

      "res.title": "তোমার ফলাফল",
      "res.net": "নেট WPM",
      "res.gross": "গ্রস WPM",
      "res.cpm": "CPM",
      "res.correct": "সঠিক অক্ষর",
      "res.incorrect": "ভুল অক্ষর",
      "res.error": "ভুলের হার",
      "res.time": "সময়",
      "res.graph": "পারফরম্যান্স গ্রাফ",
      "res.graph_note": "প্রতি সেকেন্ডের নেট WPM",
      "res.graph_aria": "টেস্টের সময় তোমার নেট WPM-এর গ্রাফ",
      "res.formula": "হিসাবের নিয়ম: 5টি অক্ষর = 1টি শব্দ (সব ভাষায় একই নিয়ম)। নেট WPM = গ্রস WPM বিয়োগ প্রতি মিনিটে থেকে যাওয়া ভুল।",
      "res.retry": "আবার চেষ্টা করো",
      "res.share": "ফলাফল শেয়ার করো",
      "graph.nodata": "গ্রাফের জন্য যথেষ্ট তথ্য নেই। একটু লম্বা টেস্ট দাও।",
      "share.text": "আমি Type Speed.com-এ {acc}% নির্ভুলতায় মিনিটে {wpm} WPM গতিতে টাইপ করেছি!",
      "share.copied": "ফলাফল কপি হয়েছে।",

      "lang.title": "ভাষা নির্বাচন",
      "lang.custom": "কাস্টম টেক্সট",
      "lang.custom_label": "নিজের লেখা এখানে পেস্ট করো",
      "lang.custom_ph": "এখানে তোমার লেখা পেস্ট করো...",
      "lang.count": "{n} / {max} অক্ষর",
      "lang.bangla_note": "বাংলা টাইপিংয়ে তোমার ফোনের বাংলা (ইউনিকোড) কিবোর্ড ব্যবহার করতে হবে, যেমন Gboard Bangla। এই ওয়েবসাইটে বিজয় কিবোর্ড ম্যাপিং নেই।",

      "leader.note": "এটি শুধু লোকাল ডেমো লিডারবোর্ড। এটি আসল গ্লোবাল লিডারবোর্ড নয়।",
      "tab.daily": "দৈনিক",
      "tab.weekly": "সাপ্তাহিক",
      "tab.monthly": "মাসিক",
      "tab.alltime": "সর্বকালীন",

      "foot.copy": "© 2026 Type Speed.com। সর্বস্বত্ব সংরক্ষিত।"
    }
  };

  function has(key) {
    return dict.en[key] !== undefined;
  }

  function t(key, vars) {
    var table = dict[current] || dict.en;
    var text = table[key];
    if (text === undefined) {
      text = dict.en[key];
    }
    if (text === undefined) {
      return key;
    }
    if (vars) {
      for (var name in vars) {
        if (Object.prototype.hasOwnProperty.call(vars, name)) {
          text = text.split("{" + name + "}").join(vars[name]);
        }
      }
    }
    return text;
  }

  function apply() {
    var i;
    var key;
    var nodes = document.querySelectorAll("[data-i18n]");
    for (i = 0; i < nodes.length; i++) {
      key = nodes[i].getAttribute("data-i18n");
      if (has(key)) {
        nodes[i].textContent = t(key);
      }
    }

    nodes = document.querySelectorAll("[data-i18n-placeholder]");
    for (i = 0; i < nodes.length; i++) {
      key = nodes[i].getAttribute("data-i18n-placeholder");
      if (has(key)) {
        nodes[i].setAttribute("placeholder", t(key));
      }
    }

    nodes = document.querySelectorAll("[data-i18n-aria]");
    for (i = 0; i < nodes.length; i++) {
      key = nodes[i].getAttribute("data-i18n-aria");
      if (has(key)) {
        nodes[i].setAttribute("aria-label", t(key));
      }
    }

    document.documentElement.setAttribute("lang", current === "bn" ? "bn" : "en");

    var buttons = document.querySelectorAll("[data-ui-lang]");
    for (i = 0; i < buttons.length; i++) {
      var active = buttons[i].getAttribute("data-ui-lang") === current;
      if (active) {
        buttons[i].classList.add("active");
      } else {
        buttons[i].classList.remove("active");
      }
      buttons[i].setAttribute("aria-pressed", active ? "true" : "false");
    }
  }

  function setLang(lang) {
    if (lang !== "en" && lang !== "bn") {
      return;
    }
    current = lang;

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* সেভ না হলে সমস্যা নেই */
    }

    apply();

    try {
      document.dispatchEvent(new CustomEvent("tsi18n:changed", { detail: { lang: lang } }));
    } catch (e2) {
      /* পুরোনো ব্রাউজারে কাজ না করলে সমস্যা নেই */
    }
  }

  window.TS_I18N = {
    t: t,
    getLang: function () {
      return current;
    },
    setLang: setLang
  };

  // শুরুর ভাষা: আগে সেভ করা থাকলে সেটা
  try {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "bn") {
      current = saved;
    }
  } catch (e3) {
    current = "en";
  }

  var langButtons = document.querySelectorAll("[data-ui-lang]");
  for (var b = 0; b < langButtons.length; b++) {
    langButtons[b].addEventListener("click", function (event) {
      setLang(event.currentTarget.getAttribute("data-ui-lang"));
    });
  }

  apply();
})();