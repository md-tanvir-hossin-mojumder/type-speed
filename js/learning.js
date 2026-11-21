/* learning.js - Phase 15: Learning Center */

(function () {
  "use strict";

  var root = document.getElementById("learning-root");
  if (!root) {
    return;
  }

  /* ---------- লেখা (ইংরেজি ও বাংলা) ---------- */
  var STR = {
    en: {
      groups: [
        {
          id: "tutorials",
          title: "Typing Tutorials",
          intro: "Five short lessons. Do one lesson a day, and repeat any lesson until it feels easy.",
          type: "lessons",
          items: [
            {
              t: "Lesson 1: Sit well and find the home row",
              steps: [
                "Sit upright with your feet flat on the floor and the screen at eye level.",
                "Place your left fingers on A S D F and your right fingers on J K L ;.",
                "Rest your thumbs on the space bar.",
                "Open Keyboard Trainer, choose Home Row, and finish the three hand lessons."
              ],
              link: "#keyboard",
              linkText: "Open Keyboard Trainer"
            },
            {
              t: "Lesson 2: The top row",
              steps: [
                "Reach up from the home row using the same finger that rests below the key.",
                "Return your finger to the home row after every key.",
                "In Keyboard Trainer choose Key by Key, then Top row: Q to P.",
                "Repeat until you make fewer than 2 mistakes."
              ],
              link: "#keyboard",
              linkText: "Open Keyboard Trainer"
            },
            {
              t: "Lesson 3: The bottom row and numbers",
              steps: [
                "Reach down from the home row for Z X C V B N M , . /.",
                "Then practise the number row 1 to 0 with the same finger rule.",
                "Use the Finger Guide tab if you forget which finger to use."
              ],
              link: "#keyboard",
              linkText: "Open Keyboard Trainer"
            },
            {
              t: "Lesson 4: Real words, accuracy first",
              steps: [
                "Open the Typing Test and choose Easy, Word-Based, 60 seconds.",
                "Type slowly and aim for 95% accuracy or better.",
                "Do not look at the keys. Fix mistakes with Backspace.",
                "Repeat three times, then move on."
              ],
              link: "#quick-test",
              linkText: "Open Typing Test"
            },
            {
              t: "Lesson 5: Build speed with sentences",
              steps: [
                "Choose Medium and Sentence-Based.",
                "Type a little faster than feels comfortable, but keep accuracy above 95%.",
                "Check your progress in Statistics.",
                "Try a Speed Challenge in Typing Games when you are ready."
              ],
              link: "#games",
              linkText: "Open Typing Games"
            }
          ]
        },
        {
          id: "tips",
          title: "Typing Tips",
          intro: "Small habits that make a big difference.",
          type: "list",
          items: [
            "Accuracy first. Speed comes naturally when you make fewer mistakes.",
            "Practise a little every day. Ten to fifteen minutes beats one long session a week.",
            "Do not look at the keyboard. Trust the bumps on F and J.",
            "Keep your wrists relaxed and slightly raised. Do not press them hard on the desk.",
            "Type in a steady rhythm. Evenly spaced keystrokes are faster than bursts and stops.",
            "Read a few words ahead so your fingers never wait for your eyes.",
            "Take a short break every 20 to 30 minutes and stretch your hands.",
            "When you make a mistake, correct it and move on. Do not stop and worry."
          ]
        },
        {
          id: "beginner",
          title: "Beginner Guide",
          intro: "Where to start if you have never touch typed before.",
          type: "steps",
          items: [
            "Learn the home row in Keyboard Trainer (Lessons 1 to 3 above).",
            "Take an Easy, Word-Based test and aim for accuracy first.",
            "Practise daily with Daily Practice in the Practice Center.",
            "Check Statistics once a week to see your improvement.",
            "Try Typing Games when you feel comfortable."
          ],
          notes: [
            "What do the numbers mean? WPM is words per minute (5 characters count as one word). CPM is correct characters per minute. Accuracy is the share of typed characters that were correct.",
            "Many adults type roughly 35 to 45 WPM. Do not compare yourself with others; compare with your own last week."
          ]
        },
        {
          id: "practice",
          title: "Practice Instructions",
          intro: "How to use the Practice Center and Typing Games.",
          type: "steps",
          items: [
            "Open the Practice Center, pick a card (for example Beginner Practice) and press Start Practice.",
            "The Quick Typing Test above loads the passage. Start typing and the timer begins with your first key.",
            "Green letters are correct and red letters are mistakes. Fix mistakes with Backspace.",
            "Use Pause or Restart if you need a break. Restart gives you the same passage again.",
            "Read your results: Net WPM, accuracy and the graph. Press Try Again for a new passage.",
            "Daily Practice gives everyone a fresh text each day. Finish it to build a streak.",
            "In Typing Games, pick a level (Easy, Medium or Hard) and try to reach the goal on the card."
          ]
        },
        {
          id: "faq",
          title: "FAQ",
          intro: "Answers to common questions.",
          type: "faq",
          items: [
            {
              q: "How is WPM calculated?",
              a: "Five characters count as one word. Gross WPM uses everything you typed. Net WPM subtracts the mistakes you left uncorrected, so fixing a mistake with Backspace protects your score."
            },
            {
              q: "What is the difference between WPM, CPM and accuracy?",
              a: "WPM measures speed in words per minute. CPM counts correct characters per minute. Accuracy is the percentage of typed characters that were correct."
            },
            {
              q: "Can I compare my Bangla and English speed?",
              a: "Not exactly. The same 5-character rule is used for both languages, but Bangla letters and vowel signs are counted as separate characters, so the numbers are not directly comparable."
            },
            {
              q: "Does the Bijoy keyboard work here?",
              a: "Bijoy layout mapping is not built into this website. Use a Unicode Bangla keyboard on your phone or computer, such as Gboard Bangla."
            },
            {
              q: "Where is my data saved?",
              a: "Only on your device, in your browser. Nothing is sent to a server. You can export or delete everything from your Profile."
            },
            {
              q: "Why did my history disappear after refreshing?",
              a: "Your browser may block saving, for example in some preview tools or private windows. A warning appears in Statistics when this happens."
            },
            {
              q: "Is the leaderboard global?",
              a: "No. It is a local demo leaderboard that shows only your own scores from this device plus demo benchmarks. A real global leaderboard needs a server."
            },
            {
              q: "Can I type my own text?",
              a: "Yes. Choose Custom Text in Language Selection and paste 20 to 1,500 characters."
            },
            {
              q: "Is Multiplayer available?",
              a: "Not yet. Multiplayer needs a backend server, so it is planned as a future feature."
            }
          ]
        }
      ]
    },
    bn: {
      groups: [
        {
          id: "tutorials",
          title: "টাইপিং টিউটোরিয়াল",
          intro: "পাঁচটি ছোট পাঠ। দিনে একটি পাঠ করো, সহজ না লাগা পর্যন্ত একই পাঠ আবার করো।",
          type: "lessons",
          items: [
            {
              t: "পাঠ ১: ঠিকভাবে বসো ও হোম রো চেনো",
              steps: [
                "সোজা হয়ে বসো, পা মেঝেতে সমতলে রাখো আর পর্দা চোখের সমান উচ্চতায় রাখো।",
                "বাঁ হাতের আঙুল A S D F-এ আর ডান হাতের আঙুল J K L ;-এ রাখো।",
                "দুই বুড়ো আঙুল স্পেস বারে রাখো।",
                "কিবোর্ড ট্রেনার খুলে হোম রো বেছে তিনটি হাতের লেসন শেষ করো।"
              ],
              link: "#keyboard",
              linkText: "কিবোর্ড ট্রেনার খোলো"
            },
            {
              t: "পাঠ ২: ওপরের সারি",
              steps: [
                "হোম রো থেকে ওপরে হাত বাড়াও, যে আঙুল ওই কি-র নিচে বিশ্রাম নেয় সেই আঙুলেই চাপো।",
                "প্রতিটি কি চাপার পর আঙুল হোম রো-তে ফিরিয়ে আনো।",
                "কিবোর্ড ট্রেনারে \"কি বাই কি\" বেছে \"ওপরের সারি: Q থেকে P\" লেসন করো।",
                "2টির কম ভুল হওয়া পর্যন্ত আবার করো।"
              ],
              link: "#keyboard",
              linkText: "কিবোর্ড ট্রেনার খোলো"
            },
            {
              t: "পাঠ ৩: নিচের সারি ও সংখ্যা",
              steps: [
                "Z X C V B N M , . / কি-র জন্য হোম রো থেকে নিচে হাত বাড়াও।",
                "তারপর একই নিয়মে 1 থেকে 0 পর্যন্ত সংখ্যা সারি অনুশীলন করো।",
                "কোন আঙুল ব্যবহার করবে ভুলে গেলে \"আঙুলের গাইড\" ট্যাব দেখো।"
              ],
              link: "#keyboard",
              linkText: "কিবোর্ড ট্রেনার খোলো"
            },
            {
              t: "পাঠ ৪: আসল শব্দ, আগে নির্ভুলতা",
              steps: [
                "টাইপিং টেস্ট খুলে সহজ, শব্দভিত্তিক, 60 সেকেন্ড বাছো।",
                "ধীরে টাইপ করো এবং 95% বা তার বেশি নির্ভুলতার লক্ষ্য রাখো।",
                "কিবোর্ডের দিকে তাকিও না। ভুল হলে Backspace দিয়ে ঠিক করো।",
                "তিনবার করো, তারপর এগিয়ে যাও।"
              ],
              link: "#quick-test",
              linkText: "টাইপিং টেস্ট খোলো"
            },
            {
              t: "পাঠ ৫: বাক্য দিয়ে গতি বাড়াও",
              steps: [
                "মাঝারি ও বাক্যভিত্তিক বাছো।",
                "স্বাচ্ছন্দ্যের চেয়ে একটু দ্রুত টাইপ করো, তবে নির্ভুলতা 95%-এর ওপরে রাখো।",
                "পরিসংখ্যানে নিজের অগ্রগতি দেখো।",
                "প্রস্তুত হলে টাইপিং গেমসে স্পিড চ্যালেঞ্জ চেষ্টা করো।"
              ],
              link: "#games",
              linkText: "টাইপিং গেমস খোলো"
            }
          ]
        },
        {
          id: "tips",
          title: "টাইপিং টিপস",
          intro: "ছোট ছোট অভ্যাসই বড় পার্থক্য গড়ে।",
          type: "list",
          items: [
            "আগে নির্ভুলতা। ভুল কমলে গতি নিজে থেকেই বাড়ে।",
            "প্রতিদিন অল্প অনুশীলন করো। সপ্তাহে একদিন লম্বা অনুশীলনের চেয়ে প্রতিদিন দশ-পনেরো মিনিট ভালো।",
            "কিবোর্ডের দিকে তাকিও না। F ও J-এর উঁচু দাগের ওপর ভরসা রাখো।",
            "কবজি শিথিল ও সামান্য উঁচুতে রাখো। টেবিলে জোরে চেপে রেখো না।",
            "একই ছন্দে টাইপ করো। সমান ব্যবধানে কি চাপা, থেমে থেমে দ্রুত চাপার চেয়ে বেশি কার্যকর।",
            "কয়েকটি শব্দ এগিয়ে পড়ো, যাতে আঙুলকে কখনো চোখের জন্য অপেক্ষা করতে না হয়।",
            "প্রতি 20 থেকে 30 মিনিট পর ছোট বিরতি নাও আর হাত আলগা করো।",
            "ভুল হলে ঠিক করে এগিয়ে যাও। থেমে দুশ্চিন্তা করো না।"
          ]
        },
        {
          id: "beginner",
          title: "নতুনদের গাইড",
          intro: "কখনো না দেখে টাইপ না করে থাকলে কোথা থেকে শুরু করবে।",
          type: "steps",
          items: [
            "কিবোর্ড ট্রেনারে হোম রো শেখো (ওপরের পাঠ ১ থেকে ৩)।",
            "সহজ, শব্দভিত্তিক একটি টেস্ট দাও আর আগে নির্ভুলতার দিকে মনোযোগ দাও।",
            "প্র্যাকটিস সেন্টারের দৈনিক প্র্যাকটিস দিয়ে রোজ অনুশীলন করো।",
            "সপ্তাহে একবার পরিসংখ্যান দেখে নিজের উন্নতি যাচাই করো।",
            "স্বচ্ছন্দ হলে টাইপিং গেমস চেষ্টা করো।"
          ],
          notes: [
            "সংখ্যাগুলোর মানে কী? WPM হলো প্রতি মিনিটে শব্দ (5টি অক্ষরে 1 শব্দ ধরা হয়)। CPM হলো প্রতি মিনিটে সঠিক অক্ষর। নির্ভুলতা হলো টাইপ করা অক্ষরের মধ্যে সঠিক অক্ষরের শতকরা হার।",
            "অনেক প্রাপ্তবয়স্ক মোটামুটি 35 থেকে 45 WPM-এ টাইপ করেন। অন্যের সঙ্গে নয়, নিজের গত সপ্তাহের সঙ্গে তুলনা করো।"
          ]
        },
        {
          id: "practice",
          title: "প্র্যাকটিসের নির্দেশনা",
          intro: "প্র্যাকটিস সেন্টার ও টাইপিং গেমস কীভাবে ব্যবহার করবে।",
          type: "steps",
          items: [
            "প্র্যাকটিস সেন্টার খুলে একটি কার্ড (যেমন নতুনদের প্র্যাকটিস) বাছো আর \"প্র্যাকটিস শুরু করো\" চাপো।",
            "ওপরের কুইক টাইপিং টেস্টে লেখা এসে যাবে। টাইপ শুরু করলেই প্রথম কি থেকে টাইমার চালু হবে।",
            "সবুজ অক্ষর সঠিক, লাল অক্ষর ভুল। ভুল হলে Backspace দিয়ে ঠিক করো।",
            "বিরতি দরকার হলে \"বিরতি\" বা \"রিস্টার্ট\" চাপো। রিস্টার্ট করলে একই লেখা আবার আসে।",
            "ফলাফল দেখো: নেট WPM, নির্ভুলতা ও গ্রাফ। নতুন লেখার জন্য \"আবার চেষ্টা করো\" চাপো।",
            "দৈনিক প্র্যাকটিসে সবাই প্রতিদিন নতুন লেখা পায়। শেষ করলে ধারাবাহিকতা বাড়ে।",
            "টাইপিং গেমসে লেভেল (সহজ, মাঝারি বা কঠিন) বেছে কার্ডের লক্ষ্য ছুঁতে চেষ্টা করো।"
          ]
        },
        {
          id: "faq",
          title: "প্রশ্নোত্তর (FAQ)",
          intro: "সাধারণ কিছু প্রশ্নের উত্তর।",
          type: "faq",
          items: [
            {
              q: "WPM কীভাবে হিসাব হয়?",
              a: "5টি অক্ষরে 1টি শব্দ ধরা হয়। গ্রস WPM-এ তুমি যা টাইপ করেছ সবকিছু ধরা হয়। নেট WPM-এ না-ঠিক-করা ভুলগুলো বাদ যায়, তাই Backspace দিয়ে ভুল ঠিক করলে তোমার স্কোর রক্ষা পায়।"
            },
            {
              q: "WPM, CPM ও নির্ভুলতার মধ্যে পার্থক্য কী?",
              a: "WPM গতি মাপে প্রতি মিনিটের শব্দে। CPM প্রতি মিনিটের সঠিক অক্ষর গোনে। নির্ভুলতা হলো টাইপ করা অক্ষরের কত শতাংশ সঠিক ছিল।"
            },
            {
              q: "বাংলা ও ইংরেজির গতি কি তুলনা করা যায়?",
              a: "ঠিক তুলনা করা যায় না। দুই ভাষাতেই 5 অক্ষরের একই নিয়ম ব্যবহার হয়, কিন্তু বাংলায় অক্ষর ও কার-চিহ্ন আলাদা আলাদা অক্ষর হিসেবে গোনা হয়, তাই সংখ্যাগুলো সরাসরি তুলনীয় নয়।"
            },
            {
              q: "এখানে কি বিজয় কিবোর্ড চলে?",
              a: "বিজয় লেআউট ম্যাপিং এই ওয়েবসাইটে নেই। ফোন বা কম্পিউটারে ইউনিকোড বাংলা কিবোর্ড ব্যবহার করো, যেমন Gboard Bangla।"
            },
            {
              q: "আমার ডেটা কোথায় সেভ হয়?",
              a: "শুধু তোমার ডিভাইসের ব্রাউজারে। কোনো সার্ভারে কিছু পাঠানো হয় না। প্রোফাইল থেকে সবকিছু এক্সপোর্ট বা মুছে ফেলতে পারো।"
            },
            {
              q: "রিফ্রেশ করলে ইতিহাস মুছে গেল কেন?",
              a: "তোমার ব্রাউজার হয়তো ডেটা সেভ করতে দিচ্ছে না, যেমন কিছু প্রিভিউ টুলে বা প্রাইভেট উইন্ডোতে। এমন হলে পরিসংখ্যানে সতর্কবার্তা আসে।"
            },
            {
              q: "লিডারবোর্ড কি গ্লোবাল?",
              a: "না। এটা লোকাল ডেমো লিডারবোর্ড, যেখানে শুধু এই ডিভাইসে তোমার নিজের স্কোর আর ডেমো মাপকাঠি দেখানো হয়। আসল গ্লোবাল লিডারবোর্ডের জন্য সার্ভার লাগে।"
            },
            {
              q: "নিজের লেখা কি টাইপ করা যায়?",
              a: "হ্যাঁ। ভাষা নির্বাচনে কাস্টম টেক্সট বেছে 20 থেকে 1,500টি অক্ষরের লেখা পেস্ট করো।"
            },
            {
              q: "মাল্টিপ্লেয়ার কি আছে?",
              a: "এখনো নেই। মাল্টিপ্লেয়ারের জন্য ব্যাকএন্ড সার্ভার লাগে, তাই এটা ভবিষ্যতের ফিচার।"
            }
          ]
        }
      ]
    }
  };

  function getStr() {
    var lang = window.TS_I18N ? window.TS_I18N.getLang() : "en";
    return STR[lang] || STR.en;
  }

  /* ---------- কোন ভাঁজ খোলা আছে তা মনে রাখা ---------- */
  function openIds() {
    var ids = {};
    var nodes = root.querySelectorAll("details.learn-group");
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].open) {
        ids[nodes[i].getAttribute("data-id")] = true;
      }
    }
    return ids;
  }

  function listHtml(tag, items) {
    var html = "<" + tag + ">";
    for (var i = 0; i < items.length; i++) {
      html += "<li>" + items[i] + "</li>";
    }
    return html + "</" + tag + ">";
  }

  function groupBody(g) {
    var html = "<p>" + g.intro + "</p>";
    var i;

    if (g.type === "lessons") {
      for (i = 0; i < g.items.length; i++) {
        var lesson = g.items[i];
        html += "<h4>" + lesson.t + "</h4>";
        html += listHtml("ol", lesson.steps);
        html += '<a class="btn btn-outline" href="' + lesson.link + '">' + lesson.linkText + "</a>";
      }
    } else if (g.type === "list") {
      html += listHtml("ul", g.items);
    } else if (g.type === "steps") {
      html += listHtml("ol", g.items);
      if (g.notes) {
        for (i = 0; i < g.notes.length; i++) {
          html += '<p class="learn-note">' + g.notes[i] + "</p>";
        }
      }
    } else if (g.type === "faq") {
      for (i = 0; i < g.items.length; i++) {
        html +=
          '<details class="faq-item"><summary>' + g.items[i].q + "</summary><p>" + g.items[i].a + "</p></details>";
      }
    }
    return html;
  }

  function render() {
    var S = getStr();
    var open = openIds();
    var html = "";

    for (var i = 0; i < S.groups.length; i++) {
      var g = S.groups[i];
      html +=
        '<details class="learn-group" data-id="' + g.id + '"' + (open[g.id] ? " open" : "") + "><summary>" +
        g.title + '</summary><div class="learn-body">' + groupBody(g) + "</div></details>";
    }

    root.innerHTML = html;
  }

  document.addEventListener("tsi18n:changed", render);

  render();
})();