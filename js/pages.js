/* pages.js - About, Contact, Privacy Policy ও Terms পেজের লেখা */

(function () {
  "use strict";

  // এখানে তোমার ইমেইল ঠিকানা বসাও, যেমন: "tumi@example.com"
  var CONTACT_EMAIL = "md.tanvir.hossain.mojumder@gmail.com";
  var root = document.getElementById("page-root");
  var page = document.body.getAttribute("data-page");

  if (!root || !page) {
    return;
  }

  var UPDATED = {
    en: "Last updated: November 2026",
    bn: "সর্বশেষ হালনাগাদ: নভেম্বর 2026"
  };

  /* ---------- পেজের লেখা ---------- */
  var PAGES = {
    about: {
      en: {
        title: "About Type Speed.com",
        intro: "Type Faster. Think Better. A free typing practice website for English, Bangla and your own text.",
        sections: [
          {
            h: "What you can do",
            list: [
              "Take typing tests in English, Bangla or your own text, from 5 seconds up to 10 minutes.",
              "See live WPM, CPM and accuracy, then a graph of your result.",
              "Practise with lessons, daily practice and typing games.",
              "Learn the keyboard with the Keyboard Trainer.",
              "Track your history, personal bests and achievements."
            ]
          },
          {
            h: "How speed is measured",
            p: [
              "Five characters count as one word. Gross WPM uses everything you typed. Net WPM subtracts the mistakes you left uncorrected. CPM counts correct characters per minute, and accuracy is the share of typed characters that were correct."
            ]
          },
          {
            h: "What this website is not (yet)",
            list: [
              "It has no real user accounts. The login and register screens are a demonstration only.",
              "The leaderboard is a local demo. It shows only your own scores from this device plus demo benchmarks.",
              "Multiplayer is a future feature that needs a backend server.",
              "Bijoy keyboard layout mapping is not built in. Bangla typing uses the Unicode Bangla keyboard of your device."
            ]
          },
          {
            h: "Your data",
            p: ["Everything is saved only in your browser, on your device. You can export or delete it from your Profile."]
          },
          {
            h: "Built with",
            p: ["Plain HTML, CSS and JavaScript, designed to be light and to work well on phones."]
          }
        ]
      },
      bn: {
        title: "Type Speed.com সম্পর্কে",
        intro: "দ্রুত টাইপ করো। ভালো ভাবো। ইংরেজি, বাংলা ও নিজের লেখা দিয়ে টাইপিং অনুশীলনের একটি বিনামূল্যের ওয়েবসাইট।",
        sections: [
          {
            h: "তুমি যা করতে পারবে",
            list: [
              "ইংরেজি, বাংলা বা নিজের লেখা দিয়ে 5 সেকেন্ড থেকে 10 মিনিট পর্যন্ত টাইপিং টেস্ট দাও।",
              "টাইপ করার সময় লাইভ WPM, CPM ও নির্ভুলতা দেখো, শেষে ফলাফলের গ্রাফ দেখো।",
              "পাঠ, দৈনিক প্র্যাকটিস ও টাইপিং গেমসে অনুশীলন করো।",
              "কিবোর্ড ট্রেনারে কিবোর্ড চেনো।",
              "নিজের ইতিহাস, ব্যক্তিগত সেরা ও অর্জন দেখো।"
            ]
          },
          {
            h: "গতি কীভাবে মাপা হয়",
            p: [
              "5টি অক্ষরে 1টি শব্দ ধরা হয়। গ্রস WPM-এ তুমি যা টাইপ করেছ সবকিছু ধরা হয়। নেট WPM-এ না-ঠিক-করা ভুলগুলো বাদ যায়। CPM হলো প্রতি মিনিটে সঠিক অক্ষর, আর নির্ভুলতা হলো টাইপ করা অক্ষরের মধ্যে সঠিক অক্ষরের হার।"
            ]
          },
          {
            h: "এই ওয়েবসাইট যা নয় (এখনো)",
            list: [
              "এতে আসল ইউজার অ্যাকাউন্ট নেই। লগইন ও রেজিস্টার স্ক্রিন শুধু ডেমো।",
              "লিডারবোর্ড লোকাল ডেমো। এখানে শুধু এই ডিভাইসে তোমার নিজের স্কোর আর ডেমো মাপকাঠি দেখানো হয়।",
              "মাল্টিপ্লেয়ার ভবিষ্যতের ফিচার, যার জন্য ব্যাকএন্ড সার্ভার লাগে।",
              "বিজয় কিবোর্ড লেআউট ম্যাপিং নেই। বাংলা টাইপিংয়ে তোমার ডিভাইসের ইউনিকোড বাংলা কিবোর্ড ব্যবহার হয়।"
            ]
          },
          {
            h: "তোমার ডেটা",
            p: ["সবকিছু শুধু তোমার ডিভাইসের ব্রাউজারে সেভ থাকে। প্রোফাইল থেকে এক্সপোর্ট বা মুছে ফেলতে পারো।"]
          },
          {
            h: "যা দিয়ে তৈরি",
            p: ["সাধারণ HTML, CSS ও JavaScript, যাতে ওয়েবসাইট হালকা থাকে এবং ফোনে ভালো চলে।"]
          }
        ]
      }
    },

    contact: {
      en: {
        title: "Contact",
        intro: "Questions, feedback or a bug to report? Write to us.",
        sections: []
      },
      bn: {
        title: "যোগাযোগ",
        intro: "প্রশ্ন, মতামত বা কোনো সমস্যার খবর আছে? আমাদের লেখো।",
        sections: []
      }
    },

    privacy: {
      en: {
        title: "Privacy Policy",
        intro: "Your privacy matters. This page explains in simple words what this website does with your information.",
        updated: true,
        sections: [
          {
            h: "Summary",
            p: ["Type Speed.com does not ask you to create an account and does not send your typing data to any server."]
          },
          {
            h: "What is saved on your device",
            list: [
              "Your username and avatar color, if you choose them.",
              "Your settings and language choice.",
              "Your test history, personal bests and achievements.",
              "Your practice and challenge progress."
            ],
            p: ["This data stays in your browser's local storage. You can export or delete it at any time from your Profile."]
          },
          {
            h: "What we do not collect",
            p: [
              "We do not collect passwords, email addresses, payment details or any personal information. The login and register screens are only a demonstration, and what you type there is not read, sent or saved."
            ]
          },
          {
            h: "Third-party fonts",
            p: [
              "The website loads the Inter and Hind Siliguri fonts from Google Fonts. When fonts load, your browser contacts Google servers, which can see technical information such as your IP address. If you are offline, your device's default fonts are used instead."
            ]
          },
          {
            h: "Cookies and tracking",
            p: ["This website does not use advertising or analytics trackers, and it does not set cookies of its own."]
          },
          {
            h: "Changes to this policy",
            p: ["If this policy changes, the date at the top of this page will be updated."]
          },
          {
            h: "Questions",
            p: ["If you have a question about privacy, please use the Contact page."]
          }
        ]
      },
      bn: {
        title: "গোপনীয়তা নীতি",
        intro: "তোমার গোপনীয়তা গুরুত্বপূর্ণ। এই পেজে সহজ ভাষায় বলা আছে, এই ওয়েবসাইট তোমার তথ্য নিয়ে কী করে।",
        updated: true,
        sections: [
          {
            h: "সংক্ষেপে",
            p: ["Type Speed.com তোমাকে অ্যাকাউন্ট খুলতে বলে না এবং তোমার টাইপিংয়ের ডেটা কোনো সার্ভারে পাঠায় না।"]
          },
          {
            h: "তোমার ডিভাইসে যা সেভ থাকে",
            list: [
              "তোমার ইউজারনেম ও অ্যাভাটারের রঙ, যদি তুমি বেছে নাও।",
              "তোমার সেটিংস ও ভাষার পছন্দ।",
              "তোমার টেস্টের ইতিহাস, ব্যক্তিগত সেরা ও অর্জন।",
              "তোমার প্র্যাকটিস ও চ্যালেঞ্জের অগ্রগতি।"
            ],
            p: ["এই ডেটা তোমার ব্রাউজারের লোকাল স্টোরেজে থাকে। প্রোফাইল থেকে যেকোনো সময় এক্সপোর্ট বা মুছে ফেলতে পারো।"]
          },
          {
            h: "আমরা যা সংগ্রহ করি না",
            p: [
              "আমরা পাসওয়ার্ড, ইমেইল ঠিকানা, পেমেন্টের তথ্য বা কোনো ব্যক্তিগত তথ্য সংগ্রহ করি না। লগইন ও রেজিস্টার স্ক্রিন শুধু ডেমো, সেখানে যা লেখো তা পড়া, পাঠানো বা সেভ করা হয় না।"
            ]
          },
          {
            h: "তৃতীয় পক্ষের ফন্ট",
            p: [
              "ওয়েবসাইট Google Fonts থেকে Inter ও Hind Siliguri ফন্ট লোড করে। ফন্ট লোডের সময় তোমার ব্রাউজার Google-এর সার্ভারের সঙ্গে যোগাযোগ করে, যেখানে তোমার IP ঠিকানার মতো প্রযুক্তিগত তথ্য দেখা যেতে পারে। অফলাইনে থাকলে তোমার ডিভাইসের সাধারণ ফন্ট ব্যবহার হয়।"
            ]
          },
          {
            h: "কুকি ও ট্র্যাকিং",
            p: ["এই ওয়েবসাইট বিজ্ঞাপন বা অ্যানালিটিক্স ট্র্যাকার ব্যবহার করে না এবং নিজে থেকে কোনো কুকি সেট করে না।"]
          },
          {
            h: "নীতির পরিবর্তন",
            p: ["এই নীতি বদলালে পেজের ওপরের তারিখ হালনাগাদ করা হবে।"]
          },
          {
            h: "প্রশ্ন",
            p: ["গোপনীয়তা নিয়ে প্রশ্ন থাকলে যোগাযোগ পেজ ব্যবহার করো।"]
          }
        ]
      }
    },

    terms: {
      en: {
        title: "Terms and Conditions",
        intro: "Please read these simple terms before using Type Speed.com.",
        updated: true,
        sections: [
          {
            h: "Using the website",
            p: ["Type Speed.com is a free tool for typing practice. By using it, you agree to these terms."]
          },
          {
            h: "Fair use",
            list: [
              "Use the website lawfully and respectfully.",
              "Do not try to damage, overload or break the website.",
              "Do not pretend that the website's design, code or texts are yours."
            ]
          },
          {
            h: "Your content",
            p: ["Text you paste into Custom Text stays on your device. You are responsible for having the right to use it."]
          },
          {
            h: "Results and achievements",
            p: [
              "Scores, rankings and achievements are for practice and fun. They are saved only on your device, can be lost if you clear your browser data, and are not official certificates of typing skill."
            ]
          },
          {
            h: "No warranty",
            p: [
              "The website is provided as it is, without promises that it will always be available or free of errors. You use it at your own risk."
            ]
          },
          {
            h: "Limitation of liability",
            p: ["To the extent allowed by law, the owner is not responsible for losses that come from using the website."]
          },
          {
            h: "Changes to these terms",
            p: ["These terms may change. If you keep using the website after a change, it means you accept the new terms."]
          },
          {
            h: "Questions",
            p: ["If you have a question about these terms, please use the Contact page."]
          }
        ]
      },
      bn: {
        title: "শর্তাবলি",
        intro: "Type Speed.com ব্যবহারের আগে এই সহজ শর্তগুলো পড়ে নাও।",
        updated: true,
        sections: [
          {
            h: "ওয়েবসাইট ব্যবহার",
            p: ["Type Speed.com টাইপিং অনুশীলনের একটি বিনামূল্যের টুল। এটি ব্যবহার করলে তুমি এই শর্তগুলো মেনে নিচ্ছ।"]
          },
          {
            h: "সঠিক ব্যবহার",
            list: [
              "ওয়েবসাইট আইন মেনে ও সম্মানের সঙ্গে ব্যবহার করো।",
              "ওয়েবসাইটের ক্ষতি করার, বেশি চাপ দেওয়ার বা ভেঙে ফেলার চেষ্টা করো না।",
              "ওয়েবসাইটের ডিজাইন, কোড বা লেখা নিজের বলে দাবি করো না।"
            ]
          },
          {
            h: "তোমার লেখা",
            p: ["কাস্টম টেক্সটে যে লেখা পেস্ট করো তা তোমার ডিভাইসেই থাকে। ওই লেখা ব্যবহারের অধিকার তোমার আছে কিনা, সেটা তোমার দায়িত্ব।"]
          },
          {
            h: "ফলাফল ও অর্জন",
            p: [
              "স্কোর, র‍্যাংক ও অর্জন অনুশীলন ও আনন্দের জন্য। এগুলো শুধু তোমার ডিভাইসে সেভ থাকে, ব্রাউজারের ডেটা মুছলে হারিয়ে যেতে পারে, এবং এগুলো টাইপিং দক্ষতার সরকারি সনদ নয়।"
            ]
          },
          {
            h: "কোনো নিশ্চয়তা নেই",
            p: [
              "ওয়েবসাইট যেমন আছে তেমনই দেওয়া হয়। এটি সবসময় চালু থাকবে বা ভুলমুক্ত হবে, এমন কোনো প্রতিশ্রুতি নেই। ব্যবহারের ঝুঁকি তোমার নিজের।"
            ]
          },
          {
            h: "দায়ের সীমা",
            p: ["আইনে যতটুকু অনুমতি আছে, ওয়েবসাইট ব্যবহার থেকে হওয়া কোনো ক্ষতির দায় মালিকের নয়।"]
          },
          {
            h: "শর্তের পরিবর্তন",
            p: ["এই শর্ত বদলাতে পারে। বদলের পরও ওয়েবসাইট ব্যবহার করলে ধরে নেওয়া হবে তুমি নতুন শর্ত মেনে নিয়েছ।"]
          },
          {
            h: "প্রশ্ন",
            p: ["এই শর্ত নিয়ে প্রশ্ন থাকলে যোগাযোগ পেজ ব্যবহার করো।"]
          }
        ]
      }
    }
  };

  /* ---------- Contact ফর্মের লেখা ---------- */
  var CONTACT = {
    en: {
      name: "Your name (optional)",
      email: "Your email (so we can reply)",
      message: "Message",
      send: "Open email app",
      note: "This website has no server. The button opens your email app with your message ready to send.",
      missing: "The contact email address has not been set up yet, so this form cannot send messages.",
      needMessage: "Please write a message first.",
      opened: "Your email app should open now. If nothing happens, please copy your message and email it manually.",
      subject: "Type Speed.com message"
    },
    bn: {
      name: "তোমার নাম (ঐচ্ছিক)",
      email: "তোমার ইমেইল (যাতে উত্তর দিতে পারি)",
      message: "বার্তা",
      send: "ইমেইল অ্যাপ খোলো",
      note: "এই ওয়েবসাইটে সার্ভার নেই। বাটন চাপলে তোমার ইমেইল অ্যাপ খুলবে, বার্তা পাঠানোর জন্য তৈরি অবস্থায়।",
      missing: "যোগাযোগের ইমেইল ঠিকানা এখনো ঠিক করা হয়নি, তাই এই ফর্ম থেকে বার্তা পাঠানো যাচ্ছে না।",
      needMessage: "আগে একটি বার্তা লেখো।",
      opened: "তোমার ইমেইল অ্যাপ এখন খোলার কথা। কিছু না হলে বার্তাটি কপি করে নিজে ইমেইল করো।",
      subject: "Type Speed.com বার্তা"
    }
  };

  var contactMessageKey = "";
  var saved = { name: "", email: "", message: "" };

  function langId() {
    return window.TS_I18N ? window.TS_I18N.getLang() : "en";
  }

  function esc(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function sectionsHtml(sections) {
    var html = "";
    for (var i = 0; i < sections.length; i++) {
      var s = sections[i];
      html += "<h2>" + s.h + "</h2>";
      var j;
      if (s.p && !s.list) {
        for (j = 0; j < s.p.length; j++) {
          html += "<p>" + s.p[j] + "</p>";
        }
      }
      if (s.list) {
        html += "<ul>";
        for (j = 0; j < s.list.length; j++) {
          html += "<li>" + s.list[j] + "</li>";
        }
        html += "</ul>";
        if (s.p) {
          for (j = 0; j < s.p.length; j++) {
            html += "<p>" + s.p[j] + "</p>";
          }
        }
      }
    }
    return html;
  }

  function contactHtml(C) {
    var html = "";
    if (!CONTACT_EMAIL) {
      html += '<p class="contact-warning">' + C.missing + "</p>";
    }
    html += '<form class="contact-form" id="contact-form" novalidate>';
    html += '<label for="c-name">' + C.name + "</label>";
    html += '<input type="text" id="c-name" autocomplete="off" value="' + esc(saved.name) + '">';
    html += '<label for="c-email">' + C.email + "</label>";
    html += '<input type="email" id="c-email" autocomplete="off" value="' + esc(saved.email) + '">';
    html += '<label for="c-message">' + C.message + "</label>";
    html += '<textarea id="c-message" rows="6">' + esc(saved.message) + "</textarea>";
    html += '<button type="submit" class="btn btn-gold"' + (CONTACT_EMAIL ? "" : " disabled") + ">" + C.send + "</button>";
    html += '<p class="contact-note">' + C.note + "</p>";
    html += '<p class="contact-msg" id="contact-msg" role="status"></p>';
    html += "</form>";
    return html;
  }

  function captureForm() {
    var n = document.getElementById("c-name");
    var e = document.getElementById("c-email");
    var m = document.getElementById("c-message");
    if (n) {
      saved.name = n.value;
    }
    if (e) {
      saved.email = e.value;
    }
    if (m) {
      saved.message = m.value;
    }
  }

  function render() {
    captureForm();

    var L = langId();
    var set = PAGES[page];
    if (!set) {
      return;
    }
    var data = set[L] || set.en;
    var html = "<h1>" + data.title + "</h1>";

    if (page === "about") {
      html += '<img class="page-logo" src="assets/logo.svg" alt="Type Speed.com">';
    }

    html += '<p class="page-intro">' + data.intro + "</p>";

    if (data.updated) {
      html += '<p class="page-updated">' + (UPDATED[L] || UPDATED.en) + "</p>";
    }

    html += sectionsHtml(data.sections);

    if (page === "contact") {
      html += contactHtml(CONTACT[L] || CONTACT.en);
    }

    root.innerHTML = html;
    document.title = data.title + " | Type Speed.com";

    var msg = document.getElementById("contact-msg");
    if (msg && contactMessageKey) {
      msg.textContent = (CONTACT[L] || CONTACT.en)[contactMessageKey];
    }
  }

  /* ---------- Contact ফর্ম জমা ---------- */
  root.addEventListener("submit", function (event) {
    if (!event.target || event.target.id !== "contact-form") {
      return;
    }
    event.preventDefault();

    var L = langId();
    var C = CONTACT[L] || CONTACT.en;
    captureForm();

    if (!CONTACT_EMAIL) {
      return;
    }

    if (!saved.message.replace(/\s+/g, "")) {
      contactMessageKey = "needMessage";
    } else {
      var body = saved.message;
      if (saved.name) {
        body += "\n\n" + saved.name;
      }
      if (saved.email) {
        body += "\n" + saved.email;
      }
      contactMessageKey = "opened";
      window.location.href =
        "mailto:" + CONTACT_EMAIL + "?subject=" + encodeURIComponent(C.subject) + "&body=" + encodeURIComponent(body);
    }

    var msg = document.getElementById("contact-msg");
    if (msg) {
      msg.textContent = C[contactMessageKey];
    }
  });

  document.addEventListener("tsi18n:changed", render);

  render();
})();