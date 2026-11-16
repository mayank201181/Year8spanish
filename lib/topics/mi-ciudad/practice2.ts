import type { Paper } from "../../types.ts";

// Practice Paper 3 for "Describing My Town & Extended Writing" (mi-ciudad).
// Sections: town-adjectives · pros-and-cons · connectives-and-intensifiers ·
//           extended-sentences · three-time-frames

/** Every combination of the given alternatives, joined by single spaces ("" = optional part). */
const combos = (...parts: string[][]): string[] =>
  parts.reduce<string[]>((acc, alts) => acc.flatMap((a) => alts.map((b) => (a && b ? a + " " + b : a || b))), [""]);

const PAELLA = [
  "vegetable paella",
  "a vegetable paella",
  "veggie paella",
  "a veggie paella",
  "vegetarian paella",
  "a vegetarian paella",
  "paella with vegetables",
  "a paella with vegetables",
];

export const morePapers: Paper[] = [
  {
    id: "mi-ciudad-p3",
    title: "Practice Paper 3",
    questions: [
      {
        kind: "short",
        id: "mi-ciudad-p3-q01",
        question: "Write the correct form of *limpio* (clean) to complete the sentence.\n\n    Las playas de Málaga son muy ___.",
        answer: { type: "text", accept: ["limpias"] },
        solution: ["*Las playas* → feminine **plural**.", "*limpio* → feminine *limpia* → plural **limpias**."],
        traps: [{ spec: { type: "text", accept: ["limpio", "limpia", "limpios"] }, feedback: "Check both gender AND number: *las playas* is feminine plural → *limpias*." }],
        commonError: "Making the adjective feminine but forgetting the plural *-s*.",
        difficulty: "warmup",
        guideRef: "town-adjectives",
        hints: ["*Las playas*: masculine or feminine? One or more than one?"],
        strategy: "Agreement check",
      },
      {
        kind: "short",
        id: "mi-ciudad-p3-q02",
        question: "Complete with the Spanish for 'too' (as in 'too noisy').\n\n    Mi ciudad es ___ ruidosa.",
        answer: { type: "text", accept: ["demasiado"] },
        solution: ["'Too' + adjective = *demasiado*.", "In front of an **adjective** it is an adverb, so it never changes → **demasiado** ruidosa."],
        traps: [
          { spec: { type: "text", accept: ["demasiada"] }, feedback: "Before an adjective, *demasiado* means 'too' and never changes: *demasiado ruidosa*. (It only agrees before a noun: *demasiada gente*.)" },
          { spec: { type: "text", accept: ["muy"] }, feedback: "*Muy* is 'very'. 'Too' (more than is good) is *demasiado*." },
        ],
        commonError: "Agreeing *demasiado* with the adjective (*demasiada ruidosa*).",
        difficulty: "warmup",
        guideRef: "connectives-and-intensifiers",
        hints: ["Is the gap before a noun or an adjective? *Demasiado* only changes before a noun."],
        strategy: "Look for the pattern",
      },
      {
        kind: "short",
        id: "mi-ciudad-p3-q03",
        question: "You're describing a day out you had. Write 'It was great' in Spanish.",
        answer: { type: "text", accept: ["fue genial", "fue estupendo", "fue fantástico", "fue increíble", "fue guay", "fue fenomenal"] },
        solution: ["'It was' about a finished event = preterite of *ser*: *fue*.", "'great' = *genial* → **Fue genial.**"],
        traps: [
          { spec: { type: "text", accept: ["es genial", "va a ser genial"] }, feedback: "That's present / future. The day out is over, so use the preterite: *fue genial*." },
          { spec: { type: "text", accept: ["fui genial"] }, feedback: "*Fui* is 'I was / I went'. 'It was' is *fue*." },
        ],
        commonError: "Writing *fui* (I went / I was) instead of *fue* (it was).",
        difficulty: "warmup",
        guideRef: "three-time-frames",
        hints: ["'It was' = the *él / ella* preterite of *ser* — the same form as 'he went'."],
        strategy: "Recycle a chunk",
      },
      {
        kind: "short",
        id: "mi-ciudad-p3-q04",
        question: "Translate into Spanish: 'because it is very lively' — you are talking about *el centro*.",
        answer: { type: "text", accept: ["porque es muy animado", "ya que es muy animado", "porque está muy animado", "ya que está muy animado"] },
        solution: ["'because' = *porque* (or *ya que*).", "*El centro* is masculine → *animado*.", "→ **porque es muy animado**."],
        traps: [
          { spec: { type: "text", accept: ["porque es muy animada", "ya que es muy animada"] }, feedback: "The adjective describes *el centro* (masculine), so → *animado*." },
          { spec: { type: "text", accept: ["por qué es muy animado"] }, feedback: "*¿Por qué?* (two words, accent) is the question 'why?'. 'Because' is one word: *porque*." },
        ],
        commonError: "Writing *por qué* (why?) for *porque* (because).",
        difficulty: "warmup",
        guideRef: "extended-sentences",
        hints: ["'Because' is one word with no accent. Then: *el centro* is masculine."],
        strategy: "Agreement check",
      },
      {
        kind: "short",
        id: "mi-ciudad-p3-q05",
        question: "Translate into Spanish: 'Singapore is a very clean and modern city.'",
        answer: {
          type: "text",
          accept: combos(["singapur es una ciudad"], ["muy limpia y moderna", "muy moderna y limpia", "muy limpia y muy moderna", "muy moderna y muy limpia"]),
        },
        solution: [
          "'Singapore' in Spanish = *Singapur*.",
          "Noun first, then adjectives: *una ciudad muy limpia y moderna*.",
          "Both adjectives agree with *ciudad* (feminine).",
          "→ **Singapur es una ciudad muy limpia y moderna.**",
        ],
        traps: [
          { spec: { type: "text", accept: ["singapur es una muy limpia y moderna ciudad"] }, feedback: "English word order! The adjectives go after the noun: *una ciudad muy limpia y moderna*." },
          { spec: { type: "text", accept: combos(["singapur es una ciudad"], ["muy limpio y moderno", "muy limpia y moderno"]) }, feedback: "Both adjectives describe *ciudad* (feminine): *limpia*, *moderna*." },
          { spec: { type: "text", accept: combos(["singapore es una ciudad"], ["muy limpia y moderna", "muy moderna y limpia"]) }, feedback: "All correct except the name — in Spanish it's *Singapur*." },
        ],
        commonError: "Putting the adjectives before the noun as in English.",
        difficulty: "core",
        guideRef: "town-adjectives",
        hints: ["Where do describing adjectives go in Spanish — before or after the noun?", "*Ciudad* is feminine. Do both adjectives match?"],
        strategy: "Agreement check",
      },
      {
        kind: "short",
        id: "mi-ciudad-p3-q06",
        question: "Translate into Spanish: 'It has about two hundred thousand inhabitants.' (You may write the number in words or figures.)",
        answer: {
          type: "text",
          accept: combos(["tiene"], ["unos", "aproximadamente", "alrededor de", "más o menos"], ["doscientos mil", "200.000", "200 000", "200000"], ["habitantes"]),
        },
        solution: [
          "A town 'has' inhabitants: *tener* → *tiene*.",
          "'about' = *unos* (or *aproximadamente*).",
          "200,000 = *doscientos mil* (one word *doscientos*; *mil* never takes an *-s*).",
          "→ **Tiene unos doscientos mil habitantes.**",
        ],
        traps: [
          { spec: { type: "text", accept: combos(["hay", "es"], ["unos"], ["doscientos mil"], ["habitantes"]) }, feedback: "A town *has* inhabitants: use *tiene*." },
          { spec: { type: "text", accept: combos(["tiene"], ["unos"], ["dos cientos mil", "doscientas mil", "doscientos miles"], ["habitantes"]) }, feedback: "Check the number: *doscientos* is one word, agrees with *habitantes* (masculine), and *mil* has no plural here." },
        ],
        commonError: "Writing *doscientos miles* — *mil* doesn't take an *-s* after a number.",
        difficulty: "core",
        guideRef: "town-adjectives",
        hints: ["Which verb: is it 'it has' or 'there are'?", "'about' = *unos*. 200 = *doscientos*, 1,000 = *mil*."],
        strategy: "Recycle a chunk",
      },
      {
        kind: "short",
        id: "mi-ciudad-p3-q07",
        question: "Translate into Spanish: 'The good thing about my town is that there are lots of shops.' (Use *ciudad* or *pueblo*.)",
        answer: {
          type: "text",
          accept: combos(["lo bueno de mi ciudad", "lo bueno de mi pueblo"], ["es que"], ["hay muchas tiendas", "tiene muchas tiendas"]),
        },
        solution: [
          "'The good thing about my town' = *Lo bueno de mi ciudad*.",
          "'is that there are' = *es que hay*.",
          "*La tienda* is feminine → *muchas tiendas*.",
          "→ **Lo bueno de mi ciudad es que hay muchas tiendas.**",
        ],
        traps: [
          { spec: { type: "text", accept: combos(["lo bueno de mi ciudad", "lo bueno de mi pueblo"], ["es que hay muchos tiendas"]) }, feedback: "*La tienda* is feminine, so 'lots of' = *muchas*." },
          { spec: { type: "text", accept: ["el bueno de mi ciudad es que hay muchas tiendas", "el bueno de mi pueblo es que hay muchas tiendas"] }, feedback: "'The good thing' is *lo bueno*, not *el bueno*." },
        ],
        commonError: "Forgetting *es que* — the structure is *Lo bueno… **es que** hay…*",
        difficulty: "core",
        guideRef: "pros-and-cons",
        hints: ["Start with the chunk *Lo bueno de mi…*", "Then *es que hay* + 'lots of' + noun. What gender is *tienda*?"],
        strategy: "Recycle a chunk",
      },
      {
        kind: "short",
        id: "mi-ciudad-p3-q08",
        question: "Translate into Spanish: 'My town is pretty, although it is small.' (Use *ciudad* or *pueblo*.)",
        answer: {
          type: "text",
          accept: [
            ...combos(["mi ciudad es"], ["bonita", "mona", "linda"], ["aunque es pequeña"]),
            ...combos(["aunque es pequeña"], ["mi ciudad es"], ["bonita", "mona", "linda"]),
            ...combos(["mi pueblo es"], ["bonito", "mono", "lindo"], ["aunque es pequeño"]),
            ...combos(["aunque es pequeño"], ["mi pueblo es"], ["bonito", "mono", "lindo"]),
          ],
        },
        solution: [
          "'although' = *aunque* — no *pero* needed after it.",
          "Both adjectives agree with the noun: *ciudad → bonita, pequeña* / *pueblo → bonito, pequeño*.",
          "→ **Mi ciudad es bonita, aunque es pequeña.**",
        ],
        traps: [
          { spec: { type: "text", accept: ["mi ciudad es bonita aunque es pequeño", "mi pueblo es bonito aunque es pequeña"] }, feedback: "The second adjective still describes the same town — make it agree: *ciudad → pequeña*, *pueblo → pequeño*." },
          { spec: { type: "text", accept: ["mi ciudad es bonita pero es pequeña", "mi pueblo es bonito pero es pequeño"] }, feedback: "*Pero* = but. The English says 'although' → *aunque*." },
        ],
        commonError: "Forgetting that the adjective after *aunque es…* still has to agree with the town.",
        difficulty: "core",
        guideRef: "connectives-and-intensifiers",
        hints: ["Which connective means 'although'?", "The hidden subject of *es pequeña* is still your town — check the agreement."],
        strategy: "Agreement check",
      },
      {
        kind: "short",
        id: "mi-ciudad-p3-q09",
        question: "Translate into English: *El fin de semana pasado comí paella de verduras.*",
        answer: {
          type: "text",
          accept: [...combos(["last weekend"], ["i"], ["ate", "had"], PAELLA), ...combos(["i"], ["ate", "had"], PAELLA, ["last weekend"])],
        },
        solution: ["*El fin de semana pasado* = last weekend.", "*Comí* = *com-* + *-í* → I ate (preterite).", "*paella de verduras* = vegetable paella.", "→ **Last weekend I ate vegetable paella.**"],
        traps: [
          { spec: { type: "text", accept: combos(["last weekend i"], ["eat", "am going to eat", "will eat"], ["vegetable paella", "a vegetable paella"]) }, feedback: "*Comí* has the past ending *-í*: 'I ate'." },
          { spec: { type: "text", accept: combos(["this weekend i", "next weekend i"], ["ate", "had"], ["vegetable paella", "a vegetable paella"]) }, feedback: "*Pasado* = last (past). *El fin de semana pasado* = last weekend." },
        ],
        commonError: "Translating *comí* as 'I eat' — the accented *-í* ending marks the past.",
        difficulty: "core",
        guideRef: "three-time-frames",
        hints: ["Find the time phrase first: what does *pasado* tell you?", "*Comí* comes from *comer*. Which tense is the *-í* ending?"],
        strategy: "Use the time phrase",
      },
      {
        kind: "written",
        id: "mi-ciudad-p3-q10",
        question: "Explain in English the difference between *porque* and *por eso*. Then write one correct Spanish sentence about your town using each.",
        marks: 3,
        modelAnswer:
          "*Porque* means 'because': it comes **before the reason (the cause)**. *Por eso* means 'that's why / so': it comes **before the result**.\n\n    Voy al colegio en metro porque hay mucho tráfico.\n    Hay mucho tráfico; por eso voy al colegio en metro.\n\nBoth sentences give the same information, but the cause and the result swap places.",
        markScheme: [
          { point: "porque = because: it introduces the reason / cause", keywords: ["because", "reason", "cause"] },
          { point: "por eso = that's why / so: it introduces the result / consequence", keywords: ["that's why", "that is why", "so", "therefore", "result", "consequence"] },
          { point: "A correct Spanish example sentence with each", keywords: ["porque", "por eso"] },
        ],
        commonError: "Writing *por eso* + the reason (*Voy en metro por eso hay tráfico*) — *por eso* must be followed by the result.",
        difficulty: "core",
        guideRef: "connectives-and-intensifiers",
        hints: [
          "Translate each one literally: *porque* = because; *por eso* = for that.",
          "In 'I go by metro because there's traffic', which half is the cause? Now say it the other way round with 'that's why'.",
        ],
        strategy: "Translate back to check",
      },
      {
        kind: "written",
        id: "mi-ciudad-p3-q11",
        question:
          "Compare Singapore with a small village in Spain in 4 sentences. Include: one sentence describing each place (watch the agreement — *la ciudad* vs *el pueblo*), a *lo bueno / lo malo* point, and a sentence with *aunque*.",
        marks: 4,
        modelAnswer:
          "*Singapur es una ciudad enorme, moderna y muy limpia. En cambio, el pueblo de mis abuelos, en Andalucía, es pequeño, histórico y muy tranquilo. Lo bueno de Singapur es que hay muchísimas cosas que hacer, pero lo malo es que hay demasiada gente. Aunque el pueblo es un poco aburrido para los jóvenes, me encanta porque el aire es limpio.*\n\n(Singapore is a huge, modern and very clean city. On the other hand, my grandparents' village, in Andalusia, is small, historic and very quiet. The good thing about Singapore is that there are loads of things to do, but the bad thing is that there are too many people. Although the village is a bit boring for young people, I love it because the air is clean.)",
        markScheme: [
          { point: "The city described with feminine agreement (una ciudad moderna / limpia…)", keywords: ["moderna", "limpia", "animada", "ruidosa", "histórica", "historica", "enorme", "grande"] },
          { point: "The village described with masculine agreement (el pueblo es pequeño / tranquilo…)", keywords: ["pequeño", "pequeno", "tranquilo", "histórico", "historico", "antiguo", "bonito"] },
          { point: "A pro or con with lo bueno / lo malo / lo mejor / lo peor", keywords: ["lo bueno", "lo malo", "lo mejor", "lo peor"] },
          { point: "A correct sentence with aunque (and no extra pero)", keywords: ["aunque"] },
        ],
        commonError: "Describing the village with feminine adjectives copied from the city sentence (*el pueblo es pequeña*).",
        difficulty: "core",
        guideRef: "town-adjectives",
        hints: [
          "Sentence 1: *Singapur es una ciudad…* + feminine adjectives.",
          "Sentence 2: *El pueblo es…* + masculine adjectives. *En cambio* (on the other hand) is a nice link.",
          "Sentences 3–4: *Lo bueno / lo malo de… es que…* and *Aunque…, …*",
        ],
        strategy: "Agreement check",
      },
      {
        kind: "written",
        id: "mi-ciudad-p3-q12",
        question:
          "Every sentence in this paragraph starts the same way:\n\n    Mi ciudad es grande. Mi ciudad es moderna. Mi ciudad tiene un parque. Mi ciudad es aburrida los domingos.\n\nRewrite it in 2–3 sentences so that no two sentences start the same way, *mi ciudad* appears at most once, and you use at least two connectives.",
        marks: 3,
        modelAnswer:
          "*Vivo en una ciudad grande y moderna. Además, tiene un parque enorme donde juego al fútbol con mis amigos. Sin embargo, los domingos es bastante aburrida porque no hay mucho que hacer.*\n\n(I live in a big, modern city. What's more, it has a huge park where I play football with my friends. However, on Sundays it's quite boring because there isn't much to do.)",
        markScheme: [
          { point: "Two adjectives combined in one phrase with agreement (una ciudad grande y moderna)", keywords: ["grande y moderna", "moderna y grande", "una ciudad grande", "una ciudad moderna"] },
          { point: "Varied sentence starts (e.g. Vivo en…, Además…, Los domingos…)", keywords: ["vivo en", "además", "ademas", "los domingos", "sin embargo", "también", "tambien"] },
          { point: "At least two connectives used logically", keywords: ["además", "ademas", "sin embargo", "pero", "aunque", "porque", "por eso"] },
        ],
        commonError: "Dropping *mi ciudad* but forgetting the adjectives still need to agree with it (*es aburrido*).",
        difficulty: "core",
        guideRef: "extended-sentences",
        hints: [
          "Merge the first two sentences: *Vivo en una ciudad…* + both adjectives.",
          "Start the next sentence with a connective (*Además, …*) and drop *mi ciudad* — the verb *tiene* already tells you the subject.",
          "Start the last one with the time phrase or *Sin embargo*, and add a reason with *porque*.",
        ],
        strategy: "Build it up (extended sentence)",
      },
      {
        kind: "short",
        id: "mi-ciudad-p3-q13",
        question: "Translate into Spanish: 'The worst thing is that there is so much pollution.'",
        answer: { type: "text", accept: ["lo peor es que hay tanta contaminación"] },
        solution: [
          "'The worst thing' = *lo peor*; 'is that there is' = *es que hay*.",
          "'so much' before a **noun** = *tanto/a*, agreeing with it.",
          "*La contaminación* is feminine → **tanta**.",
          "→ **Lo peor es que hay tanta contaminación.**",
        ],
        traps: [
          { spec: { type: "text", accept: ["lo peor es que hay tan contaminación"] }, feedback: "*Tan* only goes before adjectives (*tan bonita*). Before a noun, use *tanto/a*: *tanta contaminación*." },
          { spec: { type: "text", accept: ["lo peor es que hay tanto contaminación"] }, feedback: "Right word — now make it agree: *contaminación* is feminine → *tanta*." },
          { spec: { type: "text", accept: ["lo peor es que hay demasiada contaminación", "lo peor es que hay mucha contaminación"] }, feedback: "Good Spanish, but it says 'too much' / 'a lot of'. 'So much' is *tanta*." },
          { spec: { type: "text", accept: ["lo malo es que hay tanta contaminación"] }, feedback: "*Lo malo* is 'the bad thing'. 'The worst thing' = *lo peor*." },
        ],
        commonError: "Using *tan* before a noun — *tan* is for adjectives, *tanto/a/os/as* for nouns.",
        difficulty: "challenge",
        guideRef: "pros-and-cons",
        hints: [
          "Start with the chunk for 'the worst thing is that there is…'.",
          "'So' + adjective = *tan*. But 'so much' + noun is different — it behaves like *mucho*.",
          "*Tanto* agrees with the noun. What gender is *contaminación*?",
        ],
        strategy: "Gender detective (el/la)",
      },
      {
        kind: "short",
        id: "mi-ciudad-p3-q14",
        question: "Translate into English:\n\n    Aunque hace mucho calor, me encanta vivir en Singapur porque hay muchísimas cosas que hacer.",
        answer: {
          type: "text",
          accept: combos(
            ["although", "even though", "though"],
            ["it is", "it's"],
            ["very hot", "really hot"],
            ["i love", "i really love"],
            ["living", "to live"],
            ["in singapore"],
            ["because", "as", "since"],
            ["there are"],
            ["loads of", "lots of", "so many", "a lot of", "tons of", "lots and lots of"],
            ["things to do"],
          ),
        },
        solution: [
          "*Aunque* = although; *hace mucho calor* = it's very hot (weather: literally 'it makes a lot of heat').",
          "*me encanta vivir en Singapur* = I love living in Singapore.",
          "*porque hay muchísimas cosas que hacer* = because there are loads of things to do (*-ísimas* = 'really a lot').",
          "→ **Although it's very hot, I love living in Singapore because there are loads of things to do.**",
        ],
        traps: [
          {
            spec: { type: "text", accept: combos(["although", "even though"], ["it is", "it's"], ["very cold", "really cold"], ["i love living in singapore because there are"], ["lots of", "loads of"], ["things to do"]) },
            feedback: "*Calor* = heat, so *hace calor* = it's hot. 'Cold' is *frío*.",
          },
          {
            spec: { type: "text", accept: combos(["although it makes"], ["a lot of heat", "lots of heat", "much heat"], ["i love living in singapore because there are"], ["lots of", "loads of"], ["things to do"]) },
            feedback: "*Hace calor* is a weather expression — in English just say 'it's (very) hot'.",
          },
        ],
        commonError: "Translating *hace mucho calor* word for word ('it makes a lot of heat').",
        difficulty: "challenge",
        guideRef: "connectives-and-intensifiers",
        hints: [
          "Split the sentence at the connectives: *Aunque… / me encanta… / porque…*",
          "*Hace calor* is a weather phrase. How do we say it in English?",
          "*Muchísimas* is *muchas* turned up to the max — 'loads of / so many'.",
        ],
        strategy: "Translate back to check",
      },
      {
        kind: "written",
        id: "mi-ciudad-p3-q15",
        question:
          "Rewrite this paragraph in the past (preterite), starting with *El sábado pasado…*\n\n    Los sábados voy al mercado con mi madre. Compramos fruta y verduras. Luego como churros en una cafetería. Es muy divertido.",
        marks: 4,
        modelAnswer:
          "*El sábado pasado fui al mercado con mi madre. Compramos fruta y verduras. Luego comí churros en una cafetería. Fue muy divertido.*\n\n(Last Saturday I went to the market with my mother. We bought fruit and vegetables. Then I ate churros in a café. It was great fun.)",
        markScheme: [
          { point: "voy → fui (irregular preterite of ir)", keywords: ["fui al mercado", "fui"] },
          { point: "compramos stays the same — the nosotros form of -ar verbs is identical in present and preterite", keywords: ["compramos"] },
          { point: "como → comí (regular -er preterite, accent on -í)", keywords: ["comí", "comi"] },
          { point: "Es muy divertido → Fue muy divertido", keywords: ["fue muy divertido", "fue"] },
        ],
        commonError: "Changing *compramos* to something like *compraron* or *compramé* — for *nosotros*, *-ar* verbs look the same in the present and the preterite.",
        difficulty: "challenge",
        guideRef: "three-time-frames",
        hints: [
          "Underline the four verbs. Who is the subject of each one?",
          "*Voy → ?* (irregular); *como → ?* (regular *-er*: *-í*); *es → ?* (irregular, 'it was').",
          "Look closely at *compramos*: what is the *nosotros* preterite of *comprar*? Compare it with the present.",
        ],
        strategy: "Find the infinitive",
      },
    ],
  },
];
