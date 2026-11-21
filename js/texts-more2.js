/* texts-more2.js - আরও ইংরেজি লেখা (তৃতীয় ব্যাচ, আগের লেখার সঙ্গে যোগ হয়) */

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
    "bag", "bed", "box", "bus", "cup", "egg", "fan", "hat", "ice", "key",
    "leg", "net", "pen", "pig", "pot", "rug", "tea", "toy", "van", "web",
    "zip", "arm", "ear", "eye", "lip", "toe", "jam", "nut", "oil", "sky",
    "sea", "cow", "hen", "goat", "frog", "bee", "ant", "fox", "owl", "bear",
    "lion", "deer", "seal", "crab", "corn", "rice", "soup", "salt", "bike", "coin",
    "gate", "path", "pool", "wave"
  ]);

  /* ---------- EASY: বাক্য ---------- */
  add("easy", "sentence", [
    "We saw a rainbow after the rain.",
    "The bird sings a sweet song every morning.",
    "I put my books in my school bag.",
    "Please pass me the salt and the rice.",
    "My brother rides a bike to the shop.",
    "The sun sets behind the green hills.",
    "She gave her friend a small gift.",
    "The frog jumped into the cool pond.",
    "We sat under a big tree and talked.",
    "He drinks hot tea in the evening.",
    "A little boy flew a red kite.",
    "The cow eats grass in the field.",
    "Our teacher reads us a story on Friday.",
    "I can see a ship on the blue sea.",
    "The baby sleeps in a soft bed.",
    "They walk to the market with their mother.",
    "Turn off the light before you go to bed.",
    "I feel happy when I play with my friends.",
    "The moon looks bright in the dark sky.",
    "She planted a rose near the gate."
  ]);

  /* ---------- EASY: অনুচ্ছেদ ---------- */
  add("easy", "paragraph", [
    "Every Friday our family goes to the park. Father brings a ball and mother brings a basket of fruit. We play until the sun starts to go down. Then we sit on the grass and eat together.",
    "The old man sells flowers at the corner of our street. He wakes up before dawn to pick the freshest roses. People smile when they walk past his stall. He always gives a small flower to the children.",
    "Our class has a small garden behind the school. We plant beans and carrots in spring and water them each day. In summer we pick the vegetables and share them. The garden teaches us to be patient.",
    "Rana loves to draw. He draws trees, birds, and boats with his colored pencils. His sister hangs his pictures on the wall of their room. One day he wants to be an artist.",
    "It was a cold winter morning. Smoke rose from the roofs of the village houses. Children wore warm hats and ran to school. The sun came out slowly and the fields began to shine.",
    "Grandfather tells us about his village. He says the river was clean and full of fish. Children swam in it every afternoon. He hopes we will keep our rivers clean too."
  ]);

  /* ---------- MEDIUM: শব্দ ---------- */
  add("medium", "word", [
    "bookshelf", "breakfast", "business", "carpenter", "celebrate", "classroom", "computer",
    "creative", "daughter", "downtown", "dramatic", "emergency", "excellent", "exciting",
    "favorite", "firework", "football", "gardener", "hardware", "highway", "homework",
    "important", "internet", "keyboard", "kindness", "lifetime", "magazine", "mattress",
    "measure", "mystery", "nutrition", "painting", "password", "pleasant", "pressure",
    "princess", "quickly", "reliable", "sandwich", "saturday", "schedule", "sunshine",
    "surround", "treasure", "triangle", "tomorrow", "valuable", "weekend", "workshop"
  ]);

  /* ---------- MEDIUM: বাক্য ---------- */
  add("medium", "sentence", [
    "Before an exam, a short walk can help you feel calm and focused.",
    "The restaurant near the station serves fresh bread every morning.",
    "He forgot his password, so he had to reset it again.",
    "A kind word at the right moment can brighten someone's whole day.",
    "The students gathered in the classroom to discuss their homework.",
    "We watched the fireworks from the roof of our building.",
    "Good posture and regular breaks protect your back and your eyes.",
    "She wrote down her goals for the week on a sticky note.",
    "The weekend market is crowded, so we usually go early.",
    "A strong team shares ideas openly and respects different opinions.",
    "The old library has a quiet corner with comfortable chairs.",
    "Driving carefully in the rain keeps everyone on the road safe.",
    "He practiced his speech in front of the mirror every evening.",
    "The garden looks beautiful when the sunflowers begin to bloom.",
    "Our flight was delayed because of a thick fog over the city.",
    "Reading a few pages each night builds a lasting habit.",
    "The mechanic explained exactly what was wrong with the engine.",
    "Learning to cook simple meals helps you save time and money.",
    "They painted the classroom walls in soft, cheerful colors.",
    "Tomorrow's schedule includes a meeting, a short lunch, and a workshop."
  ]);

  /* ---------- MEDIUM: অনুচ্ছেদ ---------- */
  add("medium", "paragraph", [
    "Learning to manage your time is one of the most useful skills a student can develop. Start by writing down everything you need to finish this week. Then decide which tasks are urgent and which can wait. Even a simple list can make a heavy workload feel manageable.",
    "Sunlight, water, and healthy soil are all that a plant needs to grow. Farmers have understood this for thousands of years. Today, scientists help them choose the best seeds and the best time to plant. The result is more food from the same land.",
    "A good conversation is more about listening than speaking. When you listen carefully, you show respect and learn something new. Ask questions that invite longer answers, and avoid interrupting. People remember how you made them feel, not only what you said.",
    "Public transport helps cities move millions of people every day. A single train can carry as many passengers as hundreds of cars. It reduces traffic jams and saves fuel. When stations are clean and safe, more people choose to use it.",
    "Volunteering is a wonderful way to make a difference. You might help clean a beach, teach children to read, or deliver meals to older neighbors. Small acts of kindness build trust in a community. They also remind us that we are not alone.",
    "Photography is the art of noticing. A good photographer waits patiently for the right light and the right moment. The camera matters less than the eye behind it. With practice, even a simple phone can capture a moment that lasts for years."
  ]);

  /* ---------- HARD: শব্দ ---------- */
  add("hard", "word", [
    "accelerate", "accessible", "accountability", "adolescence", "aesthetic", "affiliation",
    "analogous", "anticipation", "archipelago", "bibliography", "biodegradable", "calligraphy",
    "cartographer", "chronological", "claustrophobia", "coincidence", "commemorate",
    "compatibility", "conglomerate", "connoisseur", "cryptography", "curriculum",
    "deterioration", "dichotomy", "discrimination", "dissertation", "eccentric",
    "electromagnetic", "exhilarating", "extrapolate", "hemisphere", "hierarchy",
    "hypothetical", "illustration", "immunization", "inauguration", "incorporate",
    "independence", "intellectual", "kaleidoscope", "manufacturing", "mathematician",
    "neighborhood", "onomatopoeia", "paleontology", "philanthropist", "pronunciation",
    "psychological", "rhinoceros", "silhouette", "sovereignty", "spectacular",
    "stethoscope", "temperature", "thermometer", "unemployment", "vaccination"
  ]);

  /* ---------- HARD: বাক্য ---------- */
  add("hard", "sentence", [
    "Despite significant setbacks, the research team published its findings on schedule.",
    "Effective communication requires clarity, empathy, and a willingness to listen.",
    "The curator carefully catalogued 1,250 artifacts before the exhibition opened.",
    "Although the proposal seemed ambitious, the committee found it entirely feasible.",
    "Modern cryptography protects millions of online transactions every single day.",
    "Her thorough analysis revealed inconsistencies that nobody had noticed before.",
    "Rapid urbanization presents both remarkable opportunities and serious challenges.",
    "The orchestra's performance was met with thunderous applause (and a standing ovation).",
    "Contemporary architecture often combines sustainability with striking aesthetics.",
    "A single typographical error can change the meaning of an entire contract.",
    "Philosophers have debated the nature of consciousness for over 2,000 years.",
    "He insisted that the data be double-checked before the report was finalized.",
    "The expedition's cartographer produced an extraordinarily detailed map of the region.",
    "Continuous improvement, not perfection, is the foundation of sustainable success.",
    "The hospital's new vaccination program reached nearly 90% of local residents.",
    "Whenever uncertainty arises, ask questions, verify facts, and document decisions.",
    "Her unwavering curiosity led her from rural classrooms to international laboratories.",
    "The defendant's attorney objected to the question, and the judge sustained the objection.",
    "Bilingual education can strengthen cognitive flexibility and cultural understanding.",
    "Please submit the revised budget (including all receipts) no later than Thursday, 4:30 p.m."
  ]);

  /* ---------- HARD: অনুচ্ছেদ ---------- */
  add("hard", "paragraph", [
    "Economists distinguish between inflation, which erodes purchasing power, and deflation, which can discourage spending and investment. Central banks attempt to maintain stability by adjusting interest rates, yet their influence is limited by global events beyond their control. Consequently, policymakers must balance caution with decisiveness.",
    "The human brain contains roughly 86 billion neurons, each forming thousands of connections with others. These networks are remarkably adaptable; learning a new skill physically changes their structure. Neuroscientists call this plasticity, and it explains why consistent practice, even in adulthood, produces genuine improvement.",
    "Democratic institutions depend on an informed citizenry. When people can access reliable information, question authority, and participate in public debate, governments become more accountable. Conversely, misinformation spreads quickly and can undermine trust, which makes media literacy an essential modern skill.",
    "Renewable energy has progressed from an experimental idea to a mainstream industry. Solar panels and wind turbines now generate electricity at costs that rival fossil fuels in many regions. Nevertheless, storing that energy efficiently remains a significant engineering challenge, and researchers continue to explore better batteries.",
    "Language evolves constantly, absorbing words from other cultures and inventing new expressions to describe unfamiliar experiences. Linguists study these changes not to judge them but to understand how communities think and communicate. A living language, after all, is never finished.",
    "Successful negotiation requires preparation, patience, and a genuine understanding of the other party's priorities. Rather than insisting on a single outcome, skilled negotiators explore alternatives that satisfy both sides. This approach often produces agreements that last far longer than those won through pressure."
  ]);
})();