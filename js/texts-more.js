/* texts-more.js - আরও ইংরেজি লেখা (আগের লেখার সঙ্গে যোগ হয়) */

(function () {
  "use strict";

  var root = window.TYPE_TEXTS;
  if (!root || !root.english) {
    return;
  }
  var E = root.english;

  function add(level, mode, items) {
    var list = E[level] && E[level][mode];
    if (!list) {
      return;
    }
    for (var i = 0; i < items.length; i++) {
      if (list.indexOf(items[i]) === -1) {
        list.push(items[i]);
      }
    }
  }

  /* ---------- EASY: শব্দ ---------- */
  add("easy", "word", [
    "water", "green", "happy", "house", "apple", "bread", "chair", "clock", "cloud", "dance",
    "dream", "earth", "field", "flower", "friend", "glass", "grass", "horse", "jump", "king",
    "lamp", "leaf", "light", "music", "night", "paper", "pencil", "queen", "river", "road",
    "room", "sand", "school", "shoe", "sing", "sleep", "smile", "snow", "song", "table",
    "tiger", "train", "wind", "world", "yellow", "zebra", "ball", "bell", "boat", "cake",
    "card", "coat", "door", "duck", "farm", "gift", "hill", "iron", "jar", "kite",
    "lake", "milk", "nest", "oven", "pear", "ring", "sock", "tent", "wall", "wolf"
  ]);

  /* ---------- EASY: বাক্য ---------- */
  add("easy", "sentence", [
    "The baby laughed when she saw the puppy.",
    "We plant seeds in the garden every spring.",
    "Tom put his shoes by the front door.",
    "The bus stops at the corner of the street.",
    "My sister drinks a glass of milk each morning.",
    "A small boat floated on the quiet lake.",
    "Please close the window because it is cold.",
    "The teacher wrote the date on the board.",
    "I found a shiny coin under the old chair.",
    "Grandma bakes sweet bread on Sunday.",
    "The children sang a happy song together.",
    "He kicked the ball into the net.",
    "There are five red apples in the basket.",
    "The moon was big and bright last night.",
    "Our cat likes to sleep in the sun.",
    "She tied her shoes and ran to the park.",
    "We watched the rain fall from the porch.",
    "Dad fixed the broken fence with a hammer.",
    "The farmer fed the hens at sunrise.",
    "I draw a picture of a house and a tree.",
    "Wash your hands before you eat lunch.",
    "The little bird built a nest in the tree.",
    "My friend and I ride bikes after school.",
    "It snowed all night and the roads turned white.",
    "The library is quiet and full of books."
  ]);

  /* ---------- EASY: অনুচ্ছেদ ---------- */
  add("easy", "paragraph", [
    "On Saturday we visit my grandmother. She lives in a small house near the river. She makes tea and bakes cookies for us. After lunch we play cards and listen to her stories.",
    "I have a red bike. I ride it to the shop every weekend. The road is long but quiet. When I come home, I put the bike by the gate and drink cold water.",
    "The market is busy in the morning. People buy fish, rice, and fresh fruit. A boy sells green mangoes near the gate. The air smells sweet and the sun is warm.",
    "Our school has a big playground. At break time we run, jump, and play football. The teacher blows a whistle when it is time to go back. We line up and walk to class.",
    "Night comes slowly in the village. The birds fly home and the lamps are lit. We sit outside and look at the stars. Soon everyone is quiet and the whole village sleeps.",
    "Mina likes to cook with her mother. They wash the rice, cut the onions, and stir the pot. The kitchen smells good. When the food is ready, the whole family sits down to eat.",
    "A small dog came to our door in the rain. We gave him a towel and some warm milk. He wagged his tail and slept by the fire. Now he lives with us and we call him Max.",
    "In spring the trees grow new leaves. Bees fly from flower to flower, and the fields turn green. People spend more time outside. It is a happy time of the year."
  ]);

  /* ---------- MEDIUM: শব্দ ---------- */
  add("medium", "word", [
    "adventure", "backpack", "calendar", "champion", "chocolate", "community", "conversation",
    "curious", "delivery", "direction", "discovery", "education", "electric", "engineer",
    "exercise", "festival", "fountain", "furniture", "generous", "grateful", "hospital",
    "imagine", "industry", "invention", "knowledge", "landscape", "language", "medicine",
    "memory", "midnight", "neighbor", "notebook", "opinion", "orchestra", "passenger",
    "peaceful", "photograph", "practice", "probably", "question", "recipe", "remember",
    "restaurant", "scholar", "shoulder", "skeleton", "software", "surprise", "telescope",
    "thunder", "umbrella", "vacation", "volcano", "wardrobe", "whisper", "wonderful",
    "yesterday", "adjust", "balloon", "captain", "diamond", "elephant", "fantasy",
    "gallery", "harvest", "island", "jungle", "kingdom", "lantern"
  ]);

  /* ---------- MEDIUM: বাক্য ---------- */
  add("medium", "sentence", [
    "She reads the news every morning before she leaves for work.",
    "The museum opens at nine and closes at five in the evening.",
    "Fresh vegetables taste best when they come straight from the garden.",
    "A strong password should include letters, numbers, and symbols.",
    "The coach encouraged the team to keep trying until the final whistle.",
    "He saved a little money each month to buy a new laptop.",
    "Heavy traffic made everyone late for the first meeting of the day.",
    "Take a deep breath, relax your shoulders, and begin again.",
    "The bakery on the corner sells warm bread and cinnamon rolls.",
    "Our neighbors invited us to a small dinner on Saturday night.",
    "The scientist carefully recorded every result in her notebook.",
    "A good listener pays attention and rarely interrupts the speaker.",
    "The old bridge was repaired after the storm last winter.",
    "She practiced the piano for an hour before dinner.",
    "Clear instructions help everyone finish the task without confusion.",
    "The airplane landed smoothly despite the strong wind.",
    "He wrote a polite email to thank the interviewer for her time.",
    "Reading before bed helps many people relax and sleep better.",
    "The mountain village is quiet, green, and full of friendly people.",
    "Every student should learn how to manage time wisely.",
    "The festival begins with music, lanterns, and a long parade.",
    "She compared prices online before choosing the best phone.",
    "Patience and practice are the secrets of every skilled typist.",
    "The rescue team reached the island just before sunset.",
    "Small improvements every day can lead to big results over time."
  ]);

  /* ---------- MEDIUM: অনুচ্ছেদ ---------- */
  add("medium", "paragraph", [
    "Good sleep is one of the simplest ways to protect your health. Most adults need around seven or eight hours each night. A regular bedtime, a quiet room, and less screen time before bed can help. When you sleep well, you think more clearly and feel calmer the next day.",
    "Public libraries are more than places to borrow books. They offer quiet study rooms, free internet, and classes for people of every age. Many libraries also organize story hours for children. A strong library can change a whole neighborhood by giving everyone access to knowledge.",
    "Learning a new language takes time, but small daily habits make it easier. Listen to songs, read short stories, and try to speak even when you make mistakes. Every mistake teaches you something. After a few months, you will be surprised by how much you can understand.",
    "Cities are changing as more people choose bicycles and public transport. Fewer cars on the road mean cleaner air and quieter streets. Some cities have built special lanes for cyclists, and others have planted trees along busy roads. These changes make daily life healthier and more pleasant.",
    "A balanced diet includes vegetables, fruit, grains, and protein. You do not need to avoid your favorite foods completely. The key is to eat a variety of foods and to pay attention to portion size. Drinking enough water throughout the day also helps your body work well.",
    "Many people dream of starting a small business. The first step is to find a real problem and think of a simple solution. Then talk to customers, learn from their feedback, and improve your idea. Success rarely comes overnight, but steady effort can turn a small idea into a strong company.",
    "Rivers have always been important for human life. They provide water for drinking and farming, and they carry boats and goods from place to place. Many great cities were built beside rivers. Protecting rivers from pollution is therefore one of the most important tasks of our time.",
    "Music can change our mood in a few seconds. A fast song may give us energy before exercise, while a slow melody can help us relax after a long day. People in every culture have created music. It brings families, friends, and even strangers closer together."
  ]);

  /* ---------- HARD: শব্দ ---------- */
  add("hard", "word", [
    "ambiguous", "anonymous", "apparatus", "authenticity", "benevolent", "catastrophe",
    "circumstance", "conscientious", "contemporary", "controversial", "correspondence",
    "criterion", "deliberately", "denominator", "disproportionate", "distinguished",
    "encyclopedia", "enthusiastic", "equilibrium", "exaggeration", "fluorescent",
    "gregarious", "hypothesis", "idiosyncrasy", "imperative", "indispensable", "inevitable",
    "intelligence", "jurisdiction", "legitimate", "magnificent", "mischievous", "negotiation",
    "obstinate", "occasionally", "parliamentary", "perpendicular", "phenomenal", "plausible",
    "prerequisite", "procrastinate", "quintessential", "reconnaissance", "rehabilitation",
    "resilience", "significance", "spontaneous", "subsequently", "sustainability",
    "temperament", "transparency", "ubiquitous", "unconditional", "unforeseen", "versatile",
    "vocabulary", "whimsical", "withstand", "zealous"
  ]);

  /* ---------- HARD: বাক্য ---------- */
  add("hard", "sentence", [
    "Despite unpredictable weather, the expedition reached the summit ahead of schedule.",
    "The committee's recommendation was unanimously approved after a lengthy discussion.",
    "Sustainable agriculture requires careful planning, adequate funding, and community support.",
    "Her extraordinary vocabulary impressed the entire panel of judges.",
    "Encryption protects confidential information from unauthorized access (at least in theory).",
    "Although he was exhausted, he proofread all 48 pages before midnight.",
    "The archaeologist discovered fragments of pottery dating back nearly 3,000 years.",
    "Meticulous documentation prevents misunderstandings and accelerates future development.",
    "Interdisciplinary collaboration often produces surprisingly innovative solutions.",
    "The mayor announced a $2.5 million investment in public transportation.",
    "Procrastination, unfortunately, is the thief of productivity and peace of mind.",
    "Their negotiation ended successfully; both parties signed the agreement on Friday.",
    "A resilient mindset transforms obstacles into valuable opportunities for growth.",
    "The laboratory's equipment must be calibrated every 6 months to ensure accuracy.",
    "Whether you agree or not, constructive criticism improves the quality of our work.",
    "Photosynthesis converts sunlight, water, and carbon dioxide into oxygen and glucose.",
    "The conference, scheduled for 14 March, attracted delegates from 27 countries.",
    "Transparency in government builds public trust and discourages corruption.",
    "He couldn't believe how quickly the entrepreneur's small startup had expanded.",
    "Please review the attached spreadsheet and confirm the totals by 5:00 p.m.",
    "Curiosity, discipline, and humility are essential qualities of every genuine scholar.",
    "The novel's complex narrative structure challenges even the most experienced readers.",
    "Biodiversity loss threatens ecosystems, economies, and the well-being of future generations.",
    "Remember: accuracy first, speed second, and consistency always.",
    "The software update (version 4.2.1) fixes several critical security vulnerabilities."
  ]);

  /* ---------- HARD: অনুচ্ছেদ ---------- */
  add("hard", "paragraph", [
    "Artificial intelligence is reshaping industries at an unprecedented pace. Algorithms can now analyze medical images, translate languages, and predict consumer behavior with remarkable accuracy. However, these capabilities raise serious questions about privacy, accountability, and employment. Responsible development therefore requires transparent regulation and continuous public debate.",
    "Climate scientists have documented a steady increase in global temperatures over the past century. Rising sea levels, prolonged droughts, and more frequent storms are already affecting millions of people. Although the challenges are enormous, innovative technologies and international cooperation offer realistic pathways toward a sustainable and resilient future.",
    "The Industrial Revolution transformed not only manufacturing but also the structure of society. Rural populations migrated to rapidly expanding cities, seeking employment in factories that operated day and night. Consequently, new social classes emerged, and debates about working conditions, education, and public health became central to political life.",
    "Effective leadership depends on far more than authority. Great leaders listen attentively, communicate expectations clearly, and take responsibility when circumstances change unexpectedly. They encourage creativity, acknowledge individual contributions, and remain composed under pressure; as a result, their teams trust them and perform at an exceptional level.",
    "Cybersecurity has become an essential concern for individuals and organizations alike. Weak passwords, outdated software, and deceptive emails create opportunities for attackers to steal sensitive data. By enabling two-factor authentication, installing updates promptly, and remaining skeptical of unexpected links, users can significantly reduce their vulnerability.",
    "Ancient civilizations developed sophisticated methods for recording knowledge long before the printing press existed. Scribes copied manuscripts by hand, preserving philosophy, mathematics, and literature for future generations. Without their painstaking efforts, much of what we understand about early science and culture would have vanished entirely.",
    "Scientific progress rarely follows a straight line. Researchers formulate hypotheses, design experiments, and frequently discover that their initial assumptions were mistaken. Nevertheless, each failure refines the question and narrows the possibilities; ultimately, persistence and rigorous methodology lead to genuine breakthroughs.",
    "Global trade connects farmers, manufacturers, and consumers across continents. A single smartphone may contain materials from more than a dozen countries and be assembled in yet another. While this interdependence generates enormous economic benefits, it also exposes supply chains to political tensions, natural disasters, and sudden shortages."
  ]);
})();