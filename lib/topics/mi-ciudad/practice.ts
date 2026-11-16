import type { TopicPractice } from "../../types.ts";

// Practice for "Describing My Town & Extended Writing" (mi-ciudad).
// Sections: town-adjectives · pros-and-cons · connectives-and-intensifiers ·
//           extended-sentences · three-time-frames

/** Every combination of the given alternatives, joined by single spaces ("" = optional part). */
const combos = (...parts: string[][]): string[] =>
  parts.reduce<string[]>((acc, alts) => acc.flatMap((a) => alts.map((b) => (a && b ? a + " " + b : a || b))), [""]);

export const practice: TopicPractice = {
  // ===========================================================================
  // QUICK QUIZ
  // ===========================================================================
  quiz: [
    {
      kind: "short",
      id: "mi-ciudad-quiz-q01",
      question: "Write the correct form of *tranquilo* to complete the sentence.\n\n    Mi ciudad es muy ___.",
      answer: { type: "text", accept: ["tranquila"] },
      solution: ["*La ciudad* is feminine singular.", "Masculine *tranquilo* → feminine *-a* → **tranquila**."],
      traps: [{ spec: { type: "text", accept: ["tranquilo"] }, feedback: "*Tranquilo* is the masculine form (for *el pueblo*). *Ciudad* is feminine — *la ciudad* — so the adjective ends in *-a*." }],
      commonError: "Copying the dictionary (masculine) form without checking the noun's gender.",
      difficulty: "warmup",
      guideRef: "town-adjectives",
      hints: ["Is it *el ciudad* or *la ciudad*?"],
      strategy: "Agreement check",
    },
    {
      kind: "mcq",
      id: "mi-ciudad-quiz-q02",
      question: "What does *aunque* mean?",
      options: ["because", "also", "although / even though", "so"],
      answerIndex: 2,
      explanation:
        "**Aunque** = although / even though: *Aunque es pequeño, mi pueblo es bonito.* 'Because' is *porque*, 'also' is *también*, 'so' is *así que* or *por eso*.",
      difficulty: "warmup",
      guideRef: "connectives-and-intensifiers",
      hints: ["*Aunque* introduces a contrast: one idea pulls against another."],
      strategy: "Eliminate options",
    },
    {
      kind: "short",
      id: "mi-ciudad-quiz-q03",
      question: "Translate into English: *lo malo*",
      answer: {
        type: "text",
        accept: ["the bad thing", "the bad part", "the bad bit", "the bad point", "the bad side", "the downside", "what's bad", "what is bad", "the negative thing", "the negative"],
      },
      solution: ["*Lo* + adjective = 'the … thing / the … part'.", "*malo* = bad → **the bad thing**."],
      traps: [{ spec: { type: "text", accept: ["the worst thing", "the worst", "the worst part"] }, feedback: "Close in spirit, but 'the worst thing' is *lo peor*. *Lo malo* is just 'the bad thing'." }],
      commonError: "Translating *lo malo* as 'the bad one' — *lo* has no noun, so it means 'the bad thing'.",
      difficulty: "warmup",
      guideRef: "pros-and-cons",
      hints: ["*Lo* + adjective doesn't point to an object — it means 'the … thing'."],
      strategy: "Translate back to check",
    },
    {
      kind: "short",
      id: "mi-ciudad-quiz-q04",
      question: "Write the Spanish connective for 'however' (two words).",
      answer: { type: "text", accept: ["sin embargo", "no obstante"] },
      solution: ["'However' introduces a contrast with what came before.", "The two-word contrast connective is **sin embargo**."],
      traps: [
        { spec: { type: "text", accept: ["pero"] }, feedback: "*Pero* is 'but' — a simpler contrast word. 'However' is the two-word *sin embargo*." },
        { spec: { type: "text", accept: ["aunque"] }, feedback: "*Aunque* means 'although'. For 'however' you need *sin embargo*." },
      ],
      commonError: "Writing *sin embargo* as one word (*sinembargo*) — it is two words.",
      difficulty: "core",
      guideRef: "connectives-and-intensifiers",
      hints: ["It's a contrast connective, stronger than *pero*.", "It starts with *sin…* (without)."],
      strategy: "Recycle a chunk",
    },
    {
      kind: "mcq",
      id: "mi-ciudad-quiz-q05",
      question: "Choose the correct verb.\n\n    El sábado que viene ___ a Málaga con mis primos.",
      options: ["voy a ir", "fui", "fuimos", "voy ir"],
      answerIndex: 0,
      explanation:
        "*El sábado que viene* (next Saturday) is the future, so you need *ir a* + infinitive: **voy a ir**. *Fui* and *fuimos* are past; *voy ir* forgets the *a*.",
      difficulty: "core",
      guideRef: "three-time-frames",
      hints: ["Is *el sábado que viene* past, present or future?", "The near future is *voy* + *a* + infinitive."],
      strategy: "Use the time phrase",
    },
    {
      kind: "short",
      id: "mi-ciudad-quiz-q06",
      question: "Write the correct form of *demasiado* (too much) to complete the sentence.\n\n    En el centro hay ___ contaminación.",
      answer: { type: "text", accept: ["demasiada"] },
      solution: [
        "*Demasiado* is in front of a **noun**, so it agrees like *mucho*.",
        "*La contaminación* is feminine singular → **demasiada**.",
      ],
      traps: [{ spec: { type: "text", accept: ["demasiado"] }, feedback: "Before a noun, *demasiado* agrees: *contaminación* is feminine (*-ción* nouns always are), so → *demasiada*." }],
      commonError: "Leaving *demasiado* in the masculine before a feminine noun.",
      difficulty: "core",
      guideRef: "pros-and-cons",
      hints: ["Is *demasiado* in front of a noun or an adjective here?", "What gender are nouns ending in *-ción*?"],
      strategy: "Gender detective (el/la)",
    },
    {
      kind: "short",
      id: "mi-ciudad-quiz-q07",
      question: "Write the *yo* form of *visitar* in the preterite (I visited).",
      answer: { type: "text", accept: ["visité", "yo visité"] },
      solution: ["*Visitar* is a regular *-ar* verb → stem *visit-*.", "*Yo* preterite ending *-é* → **visité** (accent on the final *e*)."],
      traps: [
        { spec: { type: "text", accept: ["visitó", "yo visitó"] }, feedback: "*Visitó* means 'he/she visited'. For 'I visited' the ending is *-é*: *visité*." },
        { spec: { type: "text", accept: ["visito", "yo visito"] }, feedback: "*Visito* (no accent) is the present: 'I visit'. The past needs *-é*: *visité*." },
      ],
      commonError: "Mixing up *visité* (I visited), *visitó* (he/she visited) and *visito* (I visit) — the accent does all the work.",
      difficulty: "core",
      guideRef: "three-time-frames",
      hints: ["Find the stem: take *-ar* off *visitar*.", "*Yo* preterite of *-ar* verbs: stem + *-é*."],
      strategy: "Mind the accent",
    },
    {
      kind: "mcq",
      id: "mi-ciudad-quiz-q08",
      question: "*Los sábados voy al centro con mis amigos.* What would upgrade this sentence the most?",
      options: [
        "Put *muy* in front of *centro*.",
        "Change *voy* to *vamos*.",
        "Remove the time phrase *los sábados*.",
        "Add an opinion and a reason, e.g. *porque es muy divertido*.",
      ],
      answerIndex: 3,
      explanation:
        "The sentence already has a time phrase, a verb and a detail. What's missing from the formula is an **opinion + reason**: *…porque es muy divertido*. *Muy* can't go in front of a noun, and removing the time phrase makes it weaker, not stronger.",
      difficulty: "core",
      guideRef: "extended-sentences",
      hints: ["Run through the formula: time phrase, verb, detail, opinion, reason… which parts are there?", "Which option adds a part that's missing?"],
      strategy: "Build it up (extended sentence)",
    },
    {
      kind: "short",
      id: "mi-ciudad-quiz-q09",
      question: "Translate into Spanish: 'My town is very lively.' (Use *ciudad* or *pueblo*.)",
      answer: { type: "text", accept: ["mi ciudad es muy animada", "mi pueblo es muy animado"] },
      solution: ["'My town' = *mi ciudad* (feminine) or *mi pueblo* (masculine).", "'very' = *muy*; 'lively' = *animado* — agree it.", "**Mi ciudad es muy animada.** / **Mi pueblo es muy animado.**"],
      traps: [
        { spec: { type: "text", accept: ["mi ciudad es muy animado", "mi pueblo es muy animada"] }, feedback: "Check the agreement: *la ciudad* → *animada*; *el pueblo* → *animado*." },
        { spec: { type: "text", accept: ["mi ciudad es mucho animada", "mi pueblo es mucho animado"] }, feedback: "Before an adjective, 'very' is *muy*, never *mucho*." },
      ],
      commonError: "Forgetting that *ciudad* is feminine, so the adjective must end in *-a*.",
      difficulty: "core",
      guideRef: "town-adjectives",
      hints: ["Which word for 'town' did you choose — and what gender is it?", "Make *animado* match that gender."],
      strategy: "Agreement check",
    },
    {
      kind: "short",
      id: "mi-ciudad-quiz-q10",
      question: "Translate into English: *No hay nada para los jóvenes.*",
      answer: {
        type: "text",
        accept: combos(
          ["there is nothing", "there's nothing", "there isn't anything", "there is not anything"],
          ["for"],
          ["young people", "the young people", "the young", "teenagers", "teens", "youngsters", "young people to do", "teenagers to do"],
        ),
      },
      solution: [
        "*No hay* = there isn't; *nada* = anything / nothing.",
        "Spanish needs the double negative *no… nada*; English uses just one negative.",
        "*para los jóvenes* = for young people → **There is nothing for young people.**",
      ],
      traps: [
        {
          spec: { type: "text", accept: combos(["there isn't nothing", "there is not nothing"], ["for"], ["young people", "teenagers"]) },
          feedback: "Spanish needs two negatives (*no… nada*), but English only takes one: 'There is nothing…' or 'There isn't anything…'.",
        },
      ],
      commonError: "Copying the Spanish double negative into English.",
      difficulty: "core",
      guideRef: "pros-and-cons",
      hints: ["*No hay* = there isn't / there aren't.", "*No… nada* is ONE idea. How do you say it in natural English?"],
      strategy: "Translate back to check",
    },
  ],

  // ===========================================================================
  // PRACTICE PAPERS
  // ===========================================================================
  papers: [
    // -------------------------------------------------------------------------
    // PRACTICE PAPER 1
    // -------------------------------------------------------------------------
    {
      id: "mi-ciudad-p1",
      title: "Practice Paper 1",
      questions: [
        {
          kind: "mcq",
          id: "mi-ciudad-p1-q01",
          question: "Which adjective best describes a town with lots of factories (*fábricas*)?",
          options: ["industrial", "turística", "histórica", "tranquila"],
          answerIndex: 0,
          explanation:
            "A town full of factories is **industrial** — a perfect cognate. *Turística* = touristy, *histórica* = historic, *tranquila* = quiet. (Notice *industrial* has the same form for masculine and feminine.)",
          difficulty: "warmup",
          guideRef: "town-adjectives",
          hints: ["Which option looks most like an English word linked to factories?"],
          strategy: "Spot the cognate",
        },
        {
          kind: "short",
          id: "mi-ciudad-p1-q02",
          question: "Write the correct form of *antiguo* (old) to complete the sentence.\n\n    Toledo es una ciudad muy ___.",
          answer: { type: "text", accept: ["antigua"] },
          solution: ["*Una ciudad* → feminine singular.", "*antiguo* → **antigua**."],
          traps: [{ spec: { type: "text", accept: ["antiguo", "antiguos", "antiguas"] }, feedback: "Match the noun: *una ciudad* is feminine singular, so → *antigua*." }],
          commonError: "Writing *antiguo* because it's the form in the word list.",
          difficulty: "warmup",
          guideRef: "town-adjectives",
          hints: ["*Una ciudad*: masculine or feminine, singular or plural?"],
          strategy: "Agreement check",
        },
        {
          kind: "short",
          id: "mi-ciudad-p1-q03",
          question: "Write 'the best thing' in Spanish (two words).",
          answer: { type: "text", accept: ["lo mejor"] },
          solution: ["'The … thing' with no noun = *lo* + adjective.", "'best' = *mejor* → **lo mejor**."],
          traps: [
            { spec: { type: "text", accept: ["el mejor", "la mejor"] }, feedback: "*El mejor* needs a noun after it (*el mejor parque*). For 'the best thing', Spanish uses the neuter *lo*: *lo mejor*." },
            { spec: { type: "text", accept: ["lo bueno"] }, feedback: "*Lo bueno* is 'the good thing'. 'The best thing' is *lo mejor*." },
          ],
          commonError: "Using *el* instead of *lo*.",
          difficulty: "warmup",
          guideRef: "pros-and-cons",
          hints: ["The little word for 'the … thing' is not *el* or *la*."],
          strategy: "Recycle a chunk",
        },
        {
          kind: "short",
          id: "mi-ciudad-p1-q04",
          question: "*Voy a comer churros.* Is this sentence about the past, the present or the future? Type one word.",
          answer: {
            type: "text",
            accept: ["future", "the future", "near future", "the near future", "immediate future", "the immediate future", "future tense", "the future tense"],
          },
          solution: ["*Voy a* + infinitive (*comer*) = 'I'm going to…'.", "That is the immediate future → **future**."],
          traps: [{ spec: { type: "text", accept: ["present", "the present", "present tense"] }, feedback: "*Voy* on its own is present, but *voy a* + infinitive means 'I'm going to…' — the future." }],
          commonError: "Seeing *voy* and stopping there — always check whether *a* + infinitive follows.",
          difficulty: "warmup",
          guideRef: "three-time-frames",
          hints: ["What comes after *voy*? *A* + an infinitive means 'going to…'."],
          strategy: "Look for the pattern",
        },
        {
          kind: "short",
          id: "mi-ciudad-p1-q05",
          question: "Translate into English: *Mi pueblo es bastante pequeño.*",
          answer: {
            type: "text",
            accept: combos(["my village is", "my town is", "my village's", "my town's"], ["quite", "fairly", "rather", "pretty", "reasonably"], ["small"]),
          },
          solution: ["*Mi pueblo* = my village / my town.", "*bastante* (before an adjective) = quite / fairly.", "→ **My village is quite small.**"],
          traps: [
            { spec: { type: "text", accept: combos(["my village is", "my town is"], ["very"], ["small"]) }, feedback: "*Muy* would be 'very'. *Bastante* is softer: 'quite' or 'fairly'." },
            { spec: { type: "text", accept: combos(["my village is", "my town is"], ["too"], ["small"]) }, feedback: "'Too small' would be *demasiado pequeño*. *Bastante* = quite / fairly." },
          ],
          commonError: "Reading *bastante* as 'enough' — before an adjective it means 'quite'.",
          difficulty: "core",
          guideRef: "connectives-and-intensifiers",
          hints: ["*Bastante* is an intensifier — is it stronger or weaker than *muy*?", "It's the Spanish for 'quite / fairly'."],
          strategy: "Translate back to check",
        },
        {
          kind: "short",
          id: "mi-ciudad-p1-q06",
          question: "Write a Spanish connective that means 'that's why / for that reason'.",
          answer: { type: "text", accept: ["por eso", "por lo tanto", "por esa razón", "por esta razón", "así que"] },
          solution: ["You need a connective that points forward to a **result**.", "*por* (for) + *eso* (that) → **por eso**."],
          traps: [{ spec: { type: "text", accept: ["porque", "por qué"] }, feedback: "*Porque* means 'because' — it points back to a cause. 'That's why' points forward to a result: *por eso*." }],
          commonError: "Confusing *por eso* (that's why) with *porque* (because).",
          difficulty: "core",
          guideRef: "connectives-and-intensifiers",
          hints: ["Translate 'for that' word by word.", "*por* + 'that' (*eso*)."],
          strategy: "Translate back to check",
        },
        {
          kind: "short",
          id: "mi-ciudad-p1-q07",
          question: "Translate into Spanish: 'There is too much traffic.'",
          answer: { type: "text", accept: ["hay demasiado tráfico"] },
          solution: ["'There is' = *hay*.", "'too much' before a noun = *demasiado*, agreeing with *el tráfico* (masculine singular).", "→ **Hay demasiado tráfico.**"],
          traps: [
            { spec: { type: "text", accept: ["hay demasiada tráfico"] }, feedback: "*Tráfico* is masculine (*el tráfico*), so *demasiado* stays in *-o*." },
            { spec: { type: "text", accept: ["hay mucho tráfico", "hay muy tráfico"] }, feedback: "*Mucho* = a lot of (and *muy* can't go before a noun). 'Too much' is *demasiado*." },
          ],
          commonError: "Writing *muy tráfico* — *muy* never goes in front of a noun.",
          difficulty: "core",
          guideRef: "pros-and-cons",
          hints: ["'There is' is one short word.", "'Too much' = *demasiado/a* — what gender is *tráfico*?"],
          strategy: "Gender detective (el/la)",
        },
        {
          kind: "short",
          id: "mi-ciudad-p1-q08",
          question: "Translate into Spanish: 'My village is in the mountains.'",
          answer: {
            type: "text",
            accept: combos(["mi pueblo"], ["está", "está situado", "se encuentra"], ["en las montañas", "en la montaña"]),
          },
          solution: ["Location uses *estar*, not *ser*.", "'in the mountains' = *en las montañas*.", "→ **Mi pueblo está (situado) en las montañas.**"],
          traps: [
            { spec: { type: "text", accept: ["mi pueblo es en las montañas", "mi pueblo es en la montaña"] }, feedback: "For location, use *estar*: *Mi pueblo **está** en las montañas.*" },
            { spec: { type: "text", accept: ["mi pueblo está situada en las montañas"] }, feedback: "*Situado* agrees with *el pueblo* (masculine): *está situado*." },
          ],
          commonError: "Using *es* for location (*soy en el centro*-type error).",
          difficulty: "core",
          guideRef: "town-adjectives",
          hints: ["Saying *where* something is: *ser* or *estar*?", "*Estar* for location: *mi pueblo está…*"],
          strategy: "Look for the pattern",
        },
        {
          kind: "short",
          id: "mi-ciudad-p1-q09",
          question: "Write the *yo* form of *jugar* in the preterite (I played).",
          answer: { type: "text", accept: ["jugué", "yo jugué"] },
          solution: ["Regular *yo* ending for *-ar*: *-é* → *jugé*?", "But *g* before *e* sounds like the Spanish *j*, so add a *u* to keep the hard *g* sound: **jugué**."],
          traps: [
            { spec: { type: "text", accept: ["jugé", "yo jugé"] }, feedback: "Nearly! *Gé* would sound like 'hé'. Add a *u* to keep the hard *g*: *jugué*." },
            { spec: { type: "text", accept: ["jugó", "yo jugó", "juego", "yo juego"] }, feedback: "*Jugó* is 'he/she played' and *juego* is 'I play'. 'I played' = *jugué*." },
          ],
          commonError: "Forgetting the spelling change: *jugé*.",
          difficulty: "core",
          guideRef: "three-time-frames",
          hints: ["Start with the regular rule: stem *jug-* + *-é*.", "Say *jugé* aloud — does the *g* still sound hard? What letter keeps it hard before *e*?"],
          strategy: "Say it aloud",
        },
        {
          kind: "short",
          id: "mi-ciudad-p1-q10",
          question: "Give the Spanish for 'at weekends' — a time phrase to open an extended sentence about what you usually do.",
          answer: {
            type: "text",
            accept: ["los fines de semana", "el fin de semana", "durante los fines de semana", "cada fin de semana", "todos los fines de semana"],
          },
          solution: ["'weekend' = *el fin de semana* (literally 'the end of week').", "For a habit, make it plural: **los fines de semana**."],
          traps: [
            {
              spec: { type: "text", accept: ["el fin de semana pasado", "el fin de semana que viene", "el próximo fin de semana"] },
              feedback: "That's one particular weekend (last / next). For a habit — 'at weekends' — use *los fines de semana*.",
            },
          ],
          commonError: "Making only *semana* plural (*los fin de semanas*): it's *fin* that becomes plural → *fines de semana*.",
          difficulty: "core",
          guideRef: "extended-sentences",
          hints: ["'Weekend' = 'end of week' in Spanish.", "For a habit, use the plural with *los*: which word takes the plural?"],
          strategy: "Use the time phrase",
        },
        {
          kind: "written",
          id: "mi-ciudad-p1-q11",
          question:
            "Upgrade this weak sentence into ONE excellent extended sentence:\n\n    Mi ciudad es bonita.\n\nYour sentence must include: an intensifier, a second adjective that agrees with *ciudad*, a reason, and a contrast.",
          marks: 4,
          modelAnswer:
            "*En mi opinión, mi ciudad es muy bonita y bastante histórica porque hay muchos edificios antiguos; sin embargo, es un poco ruidosa los fines de semana.*\n\n(In my opinion, my town is very pretty and quite historic because there are lots of old buildings; however, it's a bit noisy at weekends.)",
          markScheme: [
            { point: "An intensifier before an adjective (muy / bastante / realmente / tan / un poco)", keywords: ["muy", "bastante", "realmente", " tan ", "un poco"] },
            {
              point: "A second adjective with feminine agreement (-a)",
              keywords: ["histórica", "historica", "moderna", "tranquila", "animada", "limpia", "pequeña", "pequena", "turística", "turistica", "ruidosa"],
            },
            { point: "A reason with porque / ya que", keywords: ["porque", "ya que"] },
            { point: "A contrast with pero / sin embargo / aunque", keywords: ["pero", "sin embargo", "aunque"] },
          ],
          commonError: "Adding a masculine adjective (*mi ciudad es bonita y histórico*) — every adjective must agree with *ciudad*.",
          difficulty: "core",
          guideRef: "extended-sentences",
          hints: [
            "Start by adding an intensifier: *muy / bastante bonita*.",
            "Add *y* + another feminine adjective, then *porque* + a reason.",
            "Finish with a contrast: *sin embargo / pero* + something negative.",
          ],
          strategy: "Build it up (extended sentence)",
        },
        {
          kind: "written",
          id: "mi-ciudad-p1-q12",
          question:
            "Write 4 sentences in Spanish describing your town or neighbourhood for a Spanish website. Include: where it is, how big it is (or how many inhabitants), two adjectives with correct agreement, and what there is (*hay…*).",
          marks: 4,
          modelAnswer:
            "*Vivo en Singapur, una ciudad grande y moderna. Está situada en el sudeste de Asia, en una isla. Tiene unos seis millones de habitantes. Mi barrio es bastante tranquilo y muy limpio, y hay un parque, un centro comercial y un hawker centre.*\n\n(I live in Singapore, a big, modern city. It is situated in South-East Asia, on an island. It has about six million inhabitants. My neighbourhood is quite quiet and very clean, and there is a park, a shopping centre and a hawker centre.)",
          markScheme: [
            { point: "Says where it is with estar (está situado/a en… / está en…)", keywords: ["está situada", "está situado", "esta situada", "esta situado", "está en", "esta en", "se encuentra"] },
            { point: "Says how big it is or how many inhabitants (tiene … habitantes / es grande / pequeño)", keywords: ["tiene", "habitantes", "grande", "pequeña", "pequeño", "pequena", "pequeno"] },
            {
              point: "Two adjectives that agree with ciudad / pueblo / barrio",
              keywords: ["moderna", "moderno", "tranquila", "tranquilo", "histórica", "histórico", "historica", "historico", "animada", "animado", "limpia", "limpio"],
            },
            { point: "Says what there is with hay", keywords: ["hay"] },
          ],
          commonError: "Using *es* for location (*mi ciudad es en el norte*) — location needs *está*.",
          difficulty: "core",
          guideRef: "town-adjectives",
          hints: [
            "Location: *Está situada en el norte / en la costa / en el sudeste de Asia.*",
            "Size: *Tiene unos … habitantes* or *Es una ciudad grande / un pueblo pequeño.*",
            "Check every adjective against its noun: *la ciudad → -a*, *el pueblo / el barrio → -o*.",
          ],
          strategy: "Agreement check",
        },
        {
          kind: "short",
          id: "mi-ciudad-p1-q13",
          question: "Translate into Spanish: 'My town is modern and interesting, but it is too noisy.' (Use *ciudad* or *pueblo*.)",
          answer: {
            type: "text",
            accept: [
              ...combos(["mi ciudad es"], ["moderna e interesante", "interesante y moderna"], ["pero"], ["es demasiado ruidosa", "demasiado ruidosa"]),
              ...combos(["mi pueblo es"], ["moderno e interesante", "interesante y moderno"], ["pero"], ["es demasiado ruidoso", "demasiado ruidoso"]),
            ],
          },
          solution: [
            "Agree every adjective: *ciudad* → *moderna, interesante, ruidosa* (or *pueblo* → *moderno, interesante, ruidoso*).",
            "'and' before *interesante* (an *i-* sound) becomes **e**.",
            "'too' before an adjective = *demasiado* — it never changes.",
            "→ **Mi ciudad es moderna e interesante, pero es demasiado ruidosa.**",
          ],
          traps: [
            {
              spec: { type: "text", accept: ["mi ciudad es moderna y interesante pero es demasiado ruidosa", "mi pueblo es moderno y interesante pero es demasiado ruidoso"] },
              feedback: "So close! Before a word starting with *i-*, *y* changes to *e*: *moderna **e** interesante*.",
            },
            {
              spec: { type: "text", accept: ["mi ciudad es moderna e interesante pero es demasiada ruidosa", "mi ciudad es moderna y interesante pero es demasiada ruidosa"] },
              feedback: "Before an adjective, *demasiado* means 'too' and never changes: *demasiado ruidosa*.",
            },
          ],
          commonError: "Writing *y interesante* — 'and' becomes *e* before an *i-* sound.",
          difficulty: "challenge",
          guideRef: "connectives-and-intensifiers",
          hints: [
            "Pick *ciudad* or *pueblo* and decide the gender first.",
            "What happens to *y* before a word that starts with *i-*?",
            "Is *demasiado* in front of a noun or an adjective? Does it agree in that position?",
          ],
          strategy: "Say it aloud",
        },
        {
          kind: "written",
          id: "mi-ciudad-p1-q14",
          question:
            "Translate into Spanish:\n\n    Last Saturday I went to the market with my sister and I bought fruit. Normally I go to the park on Sundays. Next weekend I'm going to visit the castle because it is very historic.",
          marks: 5,
          modelAnswer:
            "*El sábado pasado fui al mercado con mi hermana y compré fruta. Normalmente voy al parque los domingos. El fin de semana que viene voy a visitar el castillo porque es muy histórico.*",
          markScheme: [
            { point: "Past: El sábado pasado fui al mercado (con mi hermana)", keywords: ["el sábado pasado", "el sabado pasado", "fui al mercado"] },
            { point: "Past: compré fruta (yo preterite -é)", keywords: ["compré", "compre"] },
            { point: "Present habit: Normalmente voy al parque los domingos", keywords: ["normalmente voy", "voy al parque", "los domingos"] },
            { point: "Future: El fin de semana que viene / El próximo fin de semana voy a visitar el castillo", keywords: ["voy a visitar", "el fin de semana que viene", "el próximo fin de semana", "el fin de semana próximo"] },
            { point: "Reason with agreement: porque es muy histórico (el castillo = masculine)", keywords: ["histórico", "historico"] },
          ],
          commonError: "Writing *fue* (he/she went) for 'I went' — 'I went' is *fui*.",
          difficulty: "challenge",
          guideRef: "three-time-frames",
          hints: [
            "Split it into three time frames and underline the time phrase in each.",
            "Past: *fui* (I went), *compré* (I bought). Present: *voy*. Future: *voy a* + infinitive.",
            "'on Sundays' = *los domingos*; 'next weekend' = *el fin de semana que viene*. Then check *histórico* agrees with *el castillo*.",
          ],
          strategy: "Use the time phrase",
        },
        {
          kind: "short",
          id: "mi-ciudad-p1-q15",
          question: "Rewrite this sentence in the past (preterite), starting with *Ayer*:\n\n    Normalmente voy al centro y compro ropa.",
          answer: {
            type: "text",
            accept: [...combos(["ayer"], ["", "yo"], ["fui al centro y compré ropa"]), "fui al centro ayer y compré ropa"],
          },
          solution: [
            "Replace *normalmente* with *ayer* — now both verbs must be preterite.",
            "*voy* (ir) → **fui** (irregular).",
            "*compro* (comprar) → *compr-* + *-é* → **compré**.",
            "→ **Ayer fui al centro y compré ropa.**",
          ],
          traps: [
            { spec: { type: "text", accept: ["ayer fue al centro y compró ropa"] }, feedback: "*Fue* and *compró* are 'he/she' forms. For 'I': *fui*, *compré*." },
            { spec: { type: "text", accept: ["ayer fui al centro y compro ropa", "ayer voy al centro y compré ropa"] }, feedback: "Both verbs need to change to the past — check each one." },
            { spec: { type: "text", accept: ["ayer voy al centro y compro ropa"] }, feedback: "You changed the time phrase but not the verbs. *Ayer* needs the preterite: *fui*, *compré*." },
          ],
          commonError: "Changing only the first verb and leaving *compro* in the present.",
          difficulty: "challenge",
          guideRef: "three-time-frames",
          hints: [
            "How many verbs are there? Each one has to change.",
            "*Ir* is irregular in the preterite: what is 'I went'?",
            "*Comprar* is regular: stem + *-é*, with the accent.",
          ],
          strategy: "Find the infinitive",
        },
      ],
    },

    // -------------------------------------------------------------------------
    // PRACTICE PAPER 2
    // -------------------------------------------------------------------------
    {
      id: "mi-ciudad-p2",
      title: "Practice Paper 2",
      questions: [
        {
          kind: "short",
          id: "mi-ciudad-p2-q01",
          question: "Write the opposite of *ruidoso* in Spanish (masculine form).",
          answer: { type: "text", accept: ["tranquilo", "silencioso"] },
          solution: ["*Ruidoso* = noisy.", "Its opposite = quiet / peaceful → **tranquilo**."],
          traps: [{ spec: { type: "text", accept: ["tranquila", "silenciosa"] }, feedback: "Right word, wrong form — the question asks for the masculine (*-o*) form: *tranquilo*." }],
          commonError: "Giving the feminine form when the question asks for masculine.",
          difficulty: "warmup",
          guideRef: "town-adjectives",
          hints: ["Noisy ↔ quiet. You've met 'quiet' in *un pueblo ___*."],
          strategy: "Look for the pattern",
        },
        {
          kind: "mcq",
          id: "mi-ciudad-p2-q02",
          question: "Which intensifier means 'quite / fairly'?",
          options: ["demasiado", "un poco", "bastante", "tan"],
          answerIndex: 2,
          explanation:
            "**Bastante** = quite / fairly: *bastante grande*. *Demasiado* = too, *un poco* = a bit, *tan* = so.",
          difficulty: "warmup",
          guideRef: "connectives-and-intensifiers",
          hints: ["Line them up from weakest to strongest: *un poco* → ? → *muy* → *demasiado*."],
          strategy: "Eliminate options",
        },
        {
          kind: "short",
          id: "mi-ciudad-p2-q03",
          question: "Write the *yo* form of *ir* in the preterite (I went).",
          answer: { type: "text", accept: ["fui", "yo fui"] },
          solution: ["*Ir* is irregular in the preterite: *fui, fuiste, fue, fuimos, fuisteis, fueron*.", "'I went' → **fui** (no accent)."],
          traps: [
            { spec: { type: "text", accept: ["fue", "yo fue"] }, feedback: "*Fue* is 'he/she/it went' (or 'it was'). 'I went' is *fui*." },
            { spec: { type: "text", accept: ["voy", "yo voy"] }, feedback: "*Voy* is the present: 'I go'. The past is *fui*." },
          ],
          commonError: "Mixing up *fui* (I) and *fue* (he/she).",
          difficulty: "warmup",
          guideRef: "three-time-frames",
          hints: ["It's irregular and very short — three letters, starting *fu-*."],
          strategy: "Check the subject",
        },
        {
          kind: "short",
          id: "mi-ciudad-p2-q04",
          question: "Fill the gap with *muy* or *mucho*.\n\n    En mi ciudad hay ___ ruido.",
          answer: { type: "text", accept: ["mucho"] },
          solution: ["*Ruido* (noise) is a **noun**.", "Before a noun use *mucho/a/os/as*; *el ruido* is masculine → **mucho**."],
          traps: [
            { spec: { type: "text", accept: ["muy"] }, feedback: "*Muy* goes before adjectives (*muy ruidosa*). *Ruido* is a noun, so → *mucho ruido*." },
            { spec: { type: "text", accept: ["mucha"] }, feedback: "*Ruido* is masculine (*el ruido*), so → *mucho*." },
          ],
          commonError: "Using *muy* in front of a noun.",
          difficulty: "warmup",
          guideRef: "connectives-and-intensifiers",
          hints: ["Is *ruido* a thing (noun) or a describing word (adjective)?"],
          strategy: "Look for the pattern",
        },
        {
          kind: "short",
          id: "mi-ciudad-p2-q05",
          question: "Translate into English: *Mi ciudad está situada en el norte de España.*",
          answer: {
            type: "text",
            accept: [
              ...combos(["my town", "my city"], ["is"], ["situated", "located", ""], ["in the north of spain", "in northern spain"]),
              ...combos(["my town", "my city"], ["lies"], ["in the north of spain", "in northern spain"]),
            ],
          },
          solution: ["*Está situada* = is situated / is located (*estar* for location).", "*en el norte de España* = in the north of Spain.", "→ **My town is situated in the north of Spain.**"],
          traps: [
            { spec: { type: "text", accept: combos(["my town", "my city"], ["is"], ["situated", "located", ""], ["in the south of spain", "in southern spain"]) }, feedback: "*Norte* = north. 'South' is *sur*." },
          ],
          commonError: "Translating *está situada* as 'is a situation' — it's 'is situated / located'.",
          difficulty: "core",
          guideRef: "town-adjectives",
          hints: ["*Situada* is a cognate.", "*Norte* — say it aloud. Which compass point?"],
          strategy: "Spot the cognate",
        },
        {
          kind: "short",
          id: "mi-ciudad-p2-q06",
          question: "Complete with the Spanish for 'worst'.\n\n    Lo ___ de vivir en el centro es que hay mucho ruido.",
          answer: { type: "text", accept: ["peor"] },
          solution: ["*Lo* + adjective = 'the … thing'.", "'worst' = **peor** → *lo peor* = the worst thing."],
          traps: [
            { spec: { type: "text", accept: ["malo"] }, feedback: "*Lo malo* = the bad thing. 'Worst' is a different word: *peor*." },
            { spec: { type: "text", accept: ["mejor"] }, feedback: "*Mejor* is 'best'. 'Worst' is *peor*." },
          ],
          commonError: "Mixing up *mejor* (best) and *peor* (worst).",
          difficulty: "core",
          guideRef: "pros-and-cons",
          hints: ["Lots of noise is a negative point.", "*bueno → mejor*, *malo → ?*"],
          strategy: "Recycle a chunk",
        },
        {
          kind: "short",
          id: "mi-ciudad-p2-q07",
          question: "Fill the gap with *y* or *e*.\n\n    Mi barrio es moderno ___ interesante.",
          answer: { type: "text", accept: ["e"] },
          solution: ["The next word, *interesante*, starts with an *i-* sound.", "To avoid two *i* sounds clashing, *y* → **e**."],
          traps: [{ spec: { type: "text", accept: ["y"] }, feedback: "Say *moderno y interesante* aloud — the two *i* sounds blur. Before *i-* / *hi-*, *y* becomes *e*." }],
          commonError: "Writing *y* before *i-* words (*y interesante*, *y histórico*).",
          difficulty: "core",
          guideRef: "connectives-and-intensifiers",
          hints: ["What sound does *interesante* start with?", "Spanish swaps *y* for another vowel to avoid 'i i'."],
          strategy: "Say it aloud",
        },
        {
          kind: "short",
          id: "mi-ciudad-p2-q08",
          question: "Translate into Spanish: 'On Saturdays I go to the town centre with my friends.'",
          answer: {
            type: "text",
            accept: [
              ...combos(["los sábados"], ["", "yo"], ["voy al centro", "voy al centro de la ciudad", "voy al centro del pueblo"], ["con mis amigos", "con mis amigas"]),
              ...combos(["", "yo"], ["voy al centro", "voy al centro de la ciudad", "voy al centro del pueblo"], ["con mis amigos", "con mis amigas"], ["los sábados"]),
              ...combos(["", "yo"], ["voy al centro", "voy al centro de la ciudad", "voy al centro del pueblo"], ["los sábados"], ["con mis amigos", "con mis amigas"]),
            ],
          },
          solution: [
            "Time phrase first: 'on Saturdays' (every Saturday) = *los sábados*.",
            "Verb: *voy* (I go); *a + el centro* → *al centro*.",
            "Detail: *con mis amigos*.",
            "→ **Los sábados voy al centro con mis amigos.**",
          ],
          traps: [
            {
              spec: { type: "text", accept: combos(["el sábado"], ["", "yo"], ["voy al centro"], ["con mis amigos", "con mis amigas"]) },
              feedback: "*El sábado* = on (this) Saturday — one day. For a habit, 'on Saturdays' = *los sábados*.",
            },
            {
              spec: { type: "text", accept: combos(["los sábados"], ["", "yo"], ["voy a el centro"], ["con mis amigos", "con mis amigas"]) },
              feedback: "*A + el* always contracts: *al centro*.",
            },
          ],
          commonError: "Writing *a el centro* instead of *al centro*.",
          difficulty: "core",
          guideRef: "extended-sentences",
          hints: ["'On Saturdays' (every week) = *los* + day.", "'I go to the' + masculine noun = *voy al…*"],
          strategy: "Build it up (extended sentence)",
        },
        {
          kind: "short",
          id: "mi-ciudad-p2-q09",
          question: "Rewrite in the immediate future ('I'm going to visit the museum'):\n\n    Visito el museo.",
          answer: { type: "text", accept: ["voy a visitar el museo", "yo voy a visitar el museo"] },
          solution: ["Immediate future = *ir* (present) + *a* + infinitive.", "'I' → *voy*; infinitive of *visito* → *visitar*.", "→ **Voy a visitar el museo.**"],
          traps: [
            { spec: { type: "text", accept: ["voy visitar el museo", "yo voy visitar el museo"] }, feedback: "Don't forget the little *a*: *voy **a** visitar*." },
            { spec: { type: "text", accept: ["voy a visito el museo", "yo voy a visito el museo"] }, feedback: "After *voy a*, use the infinitive: *visitar*, not *visito*." },
          ],
          commonError: "Leaving out the *a* (*voy visitar*).",
          difficulty: "core",
          guideRef: "three-time-frames",
          hints: ["What's the infinitive of *visito*?", "Formula: *voy* + *a* + infinitive."],
          strategy: "Find the infinitive",
        },
        {
          kind: "short",
          id: "mi-ciudad-p2-q10",
          question: "Translate into English: *Lo peor de mi ciudad es que hay mucha basura.*",
          answer: {
            type: "text",
            accept: combos(
              ["the worst thing", "the worst part", "the worst"],
              ["about", "in", "of"],
              ["my town", "my city"],
              ["is that", "is"],
              ["there is", "there's"],
              ["a lot of", "lots of", "loads of"],
              ["rubbish", "litter", "trash", "garbage"],
            ),
          },
          solution: [
            "*Lo peor* = the worst thing; *de mi ciudad* = about my town.",
            "*es que hay* = is that there is; *mucha basura* = a lot of rubbish.",
            "→ **The worst thing about my town is that there is a lot of rubbish.**",
          ],
          traps: [
            {
              spec: { type: "text", accept: combos(["the bad thing"], ["about", "in", "of"], ["my town", "my city"], ["is that", "is"], ["there is", "there's"], ["a lot of", "lots of"], ["rubbish", "litter"]) },
              feedback: "*Lo malo* would be 'the bad thing'. *Lo peor* is stronger: 'the worst thing'.",
            },
          ],
          commonError: "Translating *de* as 'of' word for word — 'the worst thing **about** my town' sounds more natural.",
          difficulty: "core",
          guideRef: "pros-and-cons",
          hints: ["*Lo peor* — 'the ___ thing'.", "*Basura* — what do you put in a bin?"],
          strategy: "Translate back to check",
        },
        {
          kind: "written",
          id: "mi-ciudad-p2-q11",
          question:
            "Write 4–5 sentences about the good and bad points of your town or neighbourhood. Include: *lo bueno / lo mejor*, *lo malo / lo peor*, *demasiado/a/os/as* + a noun with correct agreement, and finish with a wish using *me gustaría que hubiera…*",
          marks: 4,
          modelAnswer:
            "*Vivo en Bishan, un barrio de Singapur. Lo bueno de mi barrio es que hay un parque enorme y un hawker centre muy barato. Lo mejor es que el metro está muy cerca. Sin embargo, lo malo es que hay demasiados coches en la calle principal y lo peor es que no hay nada para los jóvenes por la noche. Me gustaría que hubiera un polideportivo y más tiendas.*\n\n(I live in Bishan, a neighbourhood in Singapore. The good thing about my neighbourhood is that there's a huge park and a very cheap hawker centre. The best thing is that the metro is very close. However, the bad thing is that there are too many cars on the main street and the worst thing is that there's nothing for young people at night. I'd like there to be a sports centre and more shops.)",
          markScheme: [
            { point: "A positive point with lo bueno / lo mejor (es que…)", keywords: ["lo bueno", "lo mejor"] },
            { point: "A negative point with lo malo / lo peor (es que…)", keywords: ["lo malo", "lo peor"] },
            { point: "demasiado + noun, agreeing (demasiado tráfico / demasiada gente / demasiados coches)", keywords: ["demasiado", "demasiada", "demasiados", "demasiadas"] },
            { point: "A wish with the chunk me gustaría que hubiera…", keywords: ["me gustaría que hubiera", "me gustaria que hubiera"] },
          ],
          commonError: "Writing *el bueno es que…* — the 'thing' structure always uses *lo*.",
          difficulty: "core",
          guideRef: "pros-and-cons",
          hints: [
            "Frame: *Lo bueno de mi barrio es que hay…*",
            "Frame: *Lo malo es que hay demasiado/a/os/as + noun* — check the noun's gender and number.",
            "Learn the wish as a block: *Me gustaría que hubiera más…*",
          ],
          strategy: "Recycle a chunk",
        },
        {
          kind: "written",
          id: "mi-ciudad-p2-q12",
          question:
            "Join these three short sentences into ONE sentence using at least two different connectives. Add a reason too.\n\n    Vivo en Singapur. Hace mucho calor. Me encanta.",
          marks: 3,
          modelAnswer:
            "*Vivo en Singapur y, aunque hace mucho calor, me encanta porque hay muchísimas cosas que hacer.*\n\n(I live in Singapore and, although it's very hot, I love it because there are loads of things to do.)",
          markScheme: [
            { point: "At least two different connectives used to join the ideas", keywords: [" y ", "pero", "aunque", "sin embargo", "además", "ademas"] },
            { point: "The heat is presented as a contrast to loving it (aunque / pero / sin embargo)", keywords: ["aunque", "pero", "sin embargo"] },
            { point: "A reason added with porque / ya que", keywords: ["porque", "ya que"] },
          ],
          commonError: "Writing *aunque hace mucho calor, pero me encanta* — *aunque* and *pero* together is one contrast too many.",
          difficulty: "core",
          guideRef: "connectives-and-intensifiers",
          hints: [
            "Which idea is the 'problem'? That's where your contrast goes.",
            "Try *aunque* + the problem, then the main idea: *aunque hace mucho calor, me encanta…*",
            "Finish with *porque* + why you love it.",
          ],
          strategy: "Build it up (extended sentence)",
        },
        {
          kind: "written",
          id: "mi-ciudad-p2-q13",
          question:
            "Write ONE extended sentence (at least 20 words) about something you do in your town. Tick off every part of the formula: time phrase + verb + detail (where / who with) + opinion + reason + contrast.",
          marks: 5,
          modelAnswer:
            "*Los sábados por la mañana voy al centro comercial con mis amigos porque es muy divertido y hay muchas tiendas, aunque a veces hay demasiada gente y es bastante ruidoso.*\n\n(On Saturday mornings I go to the shopping centre with my friends because it's great fun and there are lots of shops, although sometimes there are too many people and it's quite noisy.)",
          markScheme: [
            { point: "Opens with a time phrase", keywords: ["los sábados", "los sabados", "los fines de semana", "normalmente", "a menudo", "los domingos", "todos los días", "todos los dias", "después del colegio", "despues del colegio"] },
            { point: "A verb in the present with a detail (where / who with)", keywords: ["voy al", "voy a la", "con mis", "con mi"] },
            { point: "An opinion", keywords: ["es muy", "es bastante", "me encanta", "me gusta", "en mi opinión", "en mi opinion", "creo que", "pienso que"] },
            { point: "A reason with porque / ya que", keywords: ["porque", "ya que"] },
            { point: "A contrast with pero / sin embargo / aunque", keywords: ["pero", "sin embargo", "aunque"] },
          ],
          commonError: "Stringing ideas together with *y… y… y…* — vary the connectives instead.",
          difficulty: "challenge",
          guideRef: "extended-sentences",
          hints: [
            "Build it in layers. Layer 1: *Los sábados voy al…*",
            "Layer 2: add *con…* and an opinion with *porque…*",
            "Layer 3: add a contrast with *aunque* or *pero*, and count your words.",
          ],
          strategy: "Build it up (extended sentence)",
        },
        {
          kind: "written",
          id: "mi-ciudad-p2-q14",
          question:
            "Imagine you visited a Spanish city last summer. Write 5–6 sentences: say where you went and two things you did (preterite), give your opinion of the trip (*fue…*), describe the city in the present, and say what you are going to do there next time (*la próxima vez voy a…*).",
          marks: 5,
          modelAnswer:
            "*El verano pasado fui a Barcelona con mi familia. Visité la Sagrada Familia y comí una paella de verduras en el puerto. ¡Fue increíble! Barcelona es una ciudad muy animada y bastante moderna, aunque hay demasiados turistas. La próxima vez voy a ir al Parque Güell porque quiero ver los mosaicos de Gaudí.*\n\n(Last summer I went to Barcelona with my family. I visited the Sagrada Familia and ate a vegetable paella at the harbour. It was amazing! Barcelona is a very lively and quite modern city, although there are too many tourists. Next time I'm going to go to Park Güell because I want to see Gaudí's mosaics.)",
          markScheme: [
            { point: "Says where you went: fui a… (preterite of ir)", keywords: ["fui a", "fuimos a"] },
            { point: "Two more preterite verbs for things you did", keywords: ["visité", "visite", "comí", "comi", " vi ", "compré", "compre", "visitamos", "comimos"] },
            { point: "An opinion of the trip in the past (fue genial / increíble…)", keywords: ["fue genial", "fue increíble", "fue increible", "fue estupendo", "fue divertido", "lo pasé bomba", "lo pase bomba"] },
            { point: "Describes the city in the present with agreement (es una ciudad… / hay…)", keywords: ["es una ciudad", "es muy", "está situada", "esta situada", "hay"] },
            { point: "What you are going to do next time (voy a + infinitive)", keywords: ["voy a", "vamos a", "la próxima vez", "la proxima vez"] },
          ],
          commonError: "Describing the city in the past by mistake — what it's *like* is still true now, so use the present (*es, hay*).",
          difficulty: "challenge",
          guideRef: "three-time-frames",
          hints: [
            "Plan three blocks: what you did (past), what it's like (present), next time (future).",
            "Past verbs: *fui, visité, comí, vi, compré*; opinion: *fue genial*.",
            "Future: *La próxima vez voy a…* + infinitive + *porque…*",
          ],
          strategy: "Use the time phrase",
        },
        {
          kind: "short",
          id: "mi-ciudad-p2-q15",
          question: "Translate into Spanish: 'Seville is a historic and very touristy city in the south of Spain.'",
          answer: {
            type: "text",
            accept: combos(
              ["sevilla es una ciudad histórica y muy turística"],
              ["en el sur de españa", "situada en el sur de españa", "que está en el sur de españa", "que está situada en el sur de españa", "del sur de españa"],
            ),
          },
          solution: [
            "'Seville' in Spanish = *Sevilla*.",
            "Adjectives go **after** the noun and agree with *ciudad*: *una ciudad histórica y muy turística*.",
            "'in the south of Spain' = *en el sur de España*.",
            "→ **Sevilla es una ciudad histórica y muy turística en el sur de España.**",
          ],
          traps: [
            {
              spec: { type: "text", accept: combos(["sevilla es una ciudad histórico y muy turístico"], ["en el sur de españa", "situada en el sur de españa"]) },
              feedback: "The adjectives describe *ciudad*, which is feminine: *histórica*, *turística*.",
            },
            {
              spec: { type: "text", accept: ["sevilla es una histórica y muy turística ciudad en el sur de españa"] },
              feedback: "English word order! In Spanish, these adjectives go after the noun: *una ciudad histórica y muy turística*.",
            },
          ],
          commonError: "Putting the adjectives before the noun, as in English.",
          difficulty: "challenge",
          guideRef: "town-adjectives",
          hints: [
            "Where do adjectives like *histórica* go in Spanish — before or after the noun?",
            "What gender is *ciudad*? Make both adjectives agree.",
            "'In the south of Spain' = *en el sur de España*. Do you need *y* or *e* before *muy*?",
          ],
          strategy: "Agreement check",
        },
      ],
    },
  ],

  // ===========================================================================
  // CHALLENGE
  // ===========================================================================
  challenge: [
    {
      kind: "short",
      id: "mi-ciudad-ch-q01",
      question:
        "Rewrite this in the immediate future (*ir a* + infinitive) throughout, starting with *El verano que viene…*\n\n    El verano pasado fui a Valencia, visité la playa y comí una paella de verduras. ¡Fue genial!",
      answer: {
        type: "text",
        accept: combos(
          ["el verano que viene"],
          ["", "yo"],
          ["voy a ir a valencia"],
          ["voy a visitar la playa", "visitar la playa"],
          ["y"],
          ["voy a comer", "comer"],
          ["una paella de verduras", "paella de verduras"],
          ["va a ser genial"],
        ),
      },
      solution: [
        "There are FOUR verbs to change — three of yours and one opinion.",
        "*fui a* → *voy a ir a*; *visité* → *voy a visitar*; *comí* → *voy a comer*.",
        "The opinion *fue genial* (it was great) → *va a ser genial* (it's going to be great) — the subject is 'it', so *va*, not *voy*.",
        "→ **El verano que viene voy a ir a Valencia, voy a visitar la playa y voy a comer una paella de verduras. ¡Va a ser genial!**",
      ],
      traps: [
        {
          spec: { type: "text", accept: combos(["el verano que viene voy a ir a valencia voy a visitar la playa y voy a comer una paella de verduras"], ["fue genial", "es genial", "voy a ser genial"]) },
          feedback: "Nearly — check the opinion at the end. 'It's going to be great' = *va a ser genial* (*it* → *va*).",
        },
        {
          spec: { type: "text", accept: ["el verano que viene voy a ir a valencia voy a visitar la playa y voy a comer una paella de verduras será genial"] },
          feedback: "*Será genial* is correct Spanish, but the task asks for *ir a* + infinitive throughout: *va a ser genial*.",
        },
        {
          spec: { type: "text", accept: ["el verano que viene voy a valencia visito la playa y como una paella de verduras es genial"] },
          feedback: "Those verbs are in the present. Use *voy a* + infinitive for each: *voy a ir, voy a visitar, voy a comer, va a ser*.",
        },
      ],
      commonError: "Forgetting to change the final opinion *¡Fue genial!* — or changing it to *voy a ser* (I'm going to be).",
      difficulty: "challenge",
      guideRef: "three-time-frames",
      hints: [
        "Underline every verb — including the one in *¡Fue genial!* How many are there?",
        "Find each infinitive: *fui → ir*, *visité → visitar*, *comí → comer*, *fue → ser*.",
        "For 'I' use *voy a* + infinitive. Who is the subject of *fue genial*? That one needs *va a*.",
      ],
      strategy: "Find the infinitive",
    },
    {
      kind: "short",
      id: "mi-ciudad-ch-q02",
      question:
        "This sentence contains exactly ONE mistake. Find it and type the corrected word.\n\n    El fin de semana pasado fui a Sevilla con mi familia y vimos la catedral, que es muy antiguo.",
      answer: { type: "text", accept: ["antigua", "muy antigua", "es muy antigua", "que es muy antigua", "el fin de semana pasado fui a sevilla con mi familia y vimos la catedral que es muy antigua"] },
      solution: [
        "Check the verbs: *fui* (I went) and *vimos* (we saw) are both correct — 'I went with my family and **we** saw'.",
        "*Es* (present) is right too: the cathedral is still old today.",
        "Now the adjective: *que es muy antiguo* describes *la catedral* — feminine.",
        "→ **antigua**.",
      ],
      traps: [
        { spec: { type: "text", accept: ["vi", "fuimos"] }, feedback: "That part is fine: 'I went with my family and **we** saw' — *fui… vimos* is logical. Look at what describes the cathedral." },
        { spec: { type: "text", accept: ["fue", "era"] }, feedback: "*Es* is right: the cathedral is still old now, so the present makes sense. The mistake is elsewhere." },
        { spec: { type: "text", accept: ["antiguos", "antiguas"] }, feedback: "There is only one cathedral, so the adjective is singular." },
      ],
      commonError: "Agreeing the adjective with the nearest word (*que*) or with the speaker instead of with the noun it describes (*la catedral*).",
      difficulty: "challenge",
      guideRef: "town-adjectives",
      hints: [
        "Check the verbs first: does *fui… vimos* make sense ('I went with my family and we saw')?",
        "Now find every adjective. What noun does each one describe?",
        "*Que es muy antiguo* — 'which is very old'. What is 'which'? What gender is it?",
      ],
      strategy: "Agreement check",
    },
    {
      kind: "written",
      id: "mi-ciudad-ch-q03",
      question:
        "Here is a weak paragraph:\n\n    Vivo en Singapur. Es grande. Hay muchos centros comerciales. Me gusta. Hace calor.\n\nRewrite it as an excellent paragraph (60–80 words). Keep the same information, but upgrade it with every tool from this topic.",
      marks: 5,
      modelAnswer:
        "*Vivo en Singapur, una ciudad bastante grande y muy moderna situada en el sudeste de Asia. Lo mejor es que hay muchísimos centros comerciales y, además, el metro es rapidísimo, así que es muy fácil ir de compras. Personalmente, me encanta vivir aquí porque siempre hay algo que hacer. Sin embargo, lo peor es que hace demasiado calor, sobre todo en abril, aunque los centros comerciales tienen aire acondicionado.*\n\n(I live in Singapore, a fairly big and very modern city situated in South-East Asia. The best thing is that there are loads of shopping centres and, what's more, the metro is super-fast, so it's very easy to go shopping. Personally, I love living here because there's always something to do. However, the worst thing is that it's too hot, especially in April, although the shopping centres have air conditioning.)",
      markScheme: [
        { point: "Sentences are joined and varied — no more than one starts the same way", keywords: ["una ciudad", "personalmente", "en mi opinión", "en mi opinion", "lo mejor", "sin embargo"] },
        { point: "At least three different connectives, including a contrast", keywords: ["sin embargo", "aunque", "pero", "además", "ademas", "así que", "asi que", "por eso"] },
        { point: "Intensifiers with correctly agreeing adjectives", keywords: ["muy", "bastante", "demasiado", "realmente", " tan ", "muchísimos", "muchisimos"] },
        { point: "An opinion justified with a reason", keywords: ["porque", "ya que"] },
        { point: "Pros and cons with lo bueno / lo mejor / lo malo / lo peor", keywords: ["lo bueno", "lo malo", "lo mejor", "lo peor"] },
      ],
      commonError: "Adding length with *y… y… y…* instead of real upgrades — or writing *hace muy calor* (it's *mucho* or *demasiado calor*).",
      difficulty: "challenge",
      guideRef: "connectives-and-intensifiers",
      hints: [
        "Merge the first two sentences: *Vivo en Singapur, una ciudad…*",
        "Turn *Hay muchos centros comerciales* into a *lo mejor es que…* point, and *Hace calor* into a *lo peor es que…* point.",
        "Upgrade *Me gusta* to *me encanta… porque…*, then add *además*, *así que*, *sin embargo*, *aunque* where they fit.",
        "Final check: *calor* is a noun → *mucho / demasiado calor*, never *muy calor*.",
      ],
      strategy: "Build it up (extended sentence)",
    },
    {
      kind: "mcq",
      id: "mi-ciudad-ch-q04",
      question:
        "Read the text.\n\n> Me llamo Ravi. Vivo en un barrio nuevo a las afueras de Madrid (*a las afueras de* = on the outskirts of). Mis padres dicen que es perfecto: es limpio, moderno y muy tranquilo, y hay un supermercado enorme. Para ellos, lo mejor es que no hay ruido por la noche. Pero yo tengo catorce años y aquí no hay nada para los jóvenes: no hay cine, no hay polideportivo y el autobús al centro tarda una hora (*tarda* = takes). El año pasado mi mejor amigo se mudó al centro (*se mudó* = moved house) y ahora solo lo veo los sábados. El año que viene voy a empezar en un instituto nuevo en el centro, así que voy a pasar más tiempo allí.\n\nWhich is the best inference from Ravi's text?",
      options: [
        "Ravi and his parents agree that the neighbourhood is perfect.",
        "What matters most to Ravi is being near his friends and things to do, not peace and quiet.",
        "Ravi's best friend lives in the same neighbourhood.",
        "Ravi is going to move to the centre with his parents next year.",
      ],
      answerIndex: 1,
      explanation:
        "*Mis padres dicen que es perfecto… Para ellos, lo mejor es…* — it's the **parents'** view. Ravi's *Pero yo…* introduces his own complaints: nothing for young people, a long bus ride, his friend moved away. The tempting trap is the move: next year he is going to start at a **school** in the centre (*voy a empezar en un instituto*), not move house.",
      difficulty: "challenge",
      guideRef: "pros-and-cons",
      hints: [
        "Whose opinion is *es perfecto*? Look at who 'says' it.",
        "*Pero yo…* signals a change of viewpoint. What does Ravi complain about?",
        "Read the last sentence carefully: what exactly is he going to do next year — move house, or something else?",
      ],
      strategy: "Use context",
    },
    {
      kind: "short",
      id: "mi-ciudad-ch-q05",
      question: "Translate into Spanish: 'Last year I visited Madrid, but next year I'm going to visit Seville.'",
      answer: {
        type: "text",
        accept: [
          ...combos(["el año pasado"], ["", "yo"], ["visité madrid"], ["pero"], ["el año que viene", "el próximo año", "el año próximo"], ["", "yo"], ["voy a visitar sevilla"]),
          ...combos(["", "yo"], ["visité madrid"], ["el año pasado"], ["pero"], ["el año que viene", "el próximo año", "el año próximo"], ["", "yo"], ["voy a visitar sevilla"]),
          ...combos(["el año pasado"], ["", "yo"], ["visité madrid"], ["pero"], ["", "yo"], ["voy a visitar sevilla"], ["el año que viene", "el próximo año", "el año próximo"]),
          ...combos(["", "yo"], ["visité madrid"], ["el año pasado"], ["pero"], ["", "yo"], ["voy a visitar sevilla"], ["el año que viene", "el próximo año", "el año próximo"]),
        ],
      },
      solution: [
        "Past half: 'last year' = *el año pasado*; 'I visited' = *visit-* + *-é* → *visité*.",
        "Future half: 'next year' = *el año que viene*; 'I'm going to visit' = *voy a visitar*.",
        "'Seville' = *Sevilla* in Spanish.",
        "→ **El año pasado visité Madrid, pero el año que viene voy a visitar Sevilla.**",
      ],
      traps: [
        {
          spec: { type: "text", accept: ["el año pasado visito madrid pero el año que viene voy a visitar sevilla", "el año pasado visitó madrid pero el año que viene voy a visitar sevilla"] },
          feedback: "Check the first verb: 'I visited' is *visité* — *visito* is 'I visit' and *visitó* is 'he/she visited'.",
        },
        {
          spec: { type: "text", accept: ["el año pasado visité madrid pero el año que viene voy visitar sevilla"] },
          feedback: "The near future needs *a*: *voy **a** visitar*.",
        },
        {
          spec: { type: "text", accept: ["el año pasado visité madrid pero el año que viene voy a visitar seville"] },
          feedback: "All correct except the name: in Spanish, Seville is *Sevilla*.",
        },
      ],
      commonError: "Putting the accent in the wrong place — *visitó* (he/she) instead of *visité* (I).",
      difficulty: "challenge",
      guideRef: "three-time-frames",
      hints: [
        "Split the sentence at 'but': which half is past and which is future?",
        "Past: *-ar* verb, *yo* form → stem + *-é*. Future: *voy a* + infinitive.",
        "'Last year' = *el año pasado*; 'next year' = *el año que viene*. Remember the Spanish name for Seville.",
      ],
      strategy: "Use the time phrase",
    },
    {
      kind: "written",
      id: "mi-ciudad-ch-q06",
      question:
        "Rewrite this paragraph about your friend **Sofía** instead of yourself (*yo* → *ella*). Watch every verb AND the little words that mean 'my' / 'me'.\n\n    Normalmente voy al colegio en autobús, pero el sábado pasado fui al centro con mis amigos y compré un libro. Mañana voy a visitar el museo porque me encanta la historia.",
      marks: 4,
      modelAnswer:
        "*Normalmente Sofía va al colegio en autobús, pero el sábado pasado fue al centro con sus amigos y compró un libro. Mañana va a visitar el museo porque le encanta la historia.*\n\n(Sofía usually goes to school by bus, but last Saturday she went to the town centre with her friends and bought a book. Tomorrow she's going to visit the museum because she loves history.)",
      markScheme: [
        { point: "Present: voy → va (al colegio)", keywords: ["va al colegio", "sofía va", "sofia va"] },
        { point: "Preterite: fui → fue and compré → compró", keywords: ["fue al centro", "compró", "compro"] },
        { point: "Future: voy a visitar → va a visitar", keywords: ["va a visitar"] },
        { point: "Possessive and pronoun: mis → sus amigos; me encanta → le encanta", keywords: ["sus amigos", "le encanta"] },
      ],
      commonError: "Changing the verbs but leaving *mis amigos* and *me encanta* — they still say 'my' and 'me'.",
      difficulty: "challenge",
      guideRef: "three-time-frames",
      hints: [
        "There are four verbs in three time frames. Find them all first.",
        "*Ella* forms: present *va*, preterite *fue / compró*, future *va a* + infinitive.",
        "Now hunt for 'my' and 'me': *mis → sus*, *me encanta → le encanta*.",
      ],
      strategy: "Check the subject",
    },
    {
      kind: "short",
      id: "mi-ciudad-ch-q07",
      question:
        "This sentence has a grammar mistake AND it doesn't make sense. Keep *Lo mejor* and type the corrected sentence.\n\n    Lo mejor de mi barrio es que hay demasiado parques.",
      answer: {
        type: "text",
        accept: combos(["lo mejor de mi barrio es que hay"], ["muchos", "muchísimos", "bastantes", "tantos", "varios", "un montón de"], ["parques"]),
      },
      solution: [
        "Grammar: before a noun, *demasiado* must agree — *parques* is masculine plural → *demasiados*.",
        "Logic: *demasiados* means 'too many', which is a complaint — it can't be 'the best thing'.",
        "So replace it with a positive quantity word that agrees: *muchos*.",
        "→ **Lo mejor de mi barrio es que hay muchos parques.**",
      ],
      traps: [
        {
          spec: { type: "text", accept: ["lo mejor de mi barrio es que hay demasiados parques"] },
          feedback: "You fixed the grammar — but 'the best thing is that there are **too many** parks' doesn't make sense. *Demasiado* is always negative. Use *muchos*.",
        },
        {
          spec: { type: "text", accept: ["lo mejor de mi barrio es que hay mucho parques", "lo mejor de mi barrio es que hay muchas parques"] },
          feedback: "Good idea to use *mucho* — now make it agree with *parques* (masculine plural): *muchos*.",
        },
      ],
      commonError: "Fixing only the agreement (*demasiados*) and missing that 'too many' is a negative idea.",
      difficulty: "challenge",
      guideRef: "pros-and-cons",
      hints: [
        "Grammar first: does *demasiado* agree with *parques*?",
        "Now meaning: is 'too many parks' a good thing or a complaint?",
        "Which quantity word is positive, and what ending does it need before *parques*?",
      ],
      strategy: "Translate back to check",
    },
    {
      kind: "written",
      id: "mi-ciudad-ch-q08",
      question:
        "Your Spanish exchange partner, Javier, writes:\n\n> ¿Cómo es tu ciudad? ¿Qué hiciste el fin de semana pasado? ¿Qué vas a hacer el fin de semana que viene?\n\nWrite a reply of about 90 words. Aim for top marks: answer all three questions, give opinions with reasons, and show off your connectives and intensifiers.",
      marks: 5,
      modelAnswer:
        "*¡Hola, Javier! Vivo en Singapur, una ciudad enorme y muy moderna. Lo mejor es que hay muchísimas cosas que hacer; sin embargo, lo peor es que hace demasiado calor. El fin de semana pasado fui al Jardín Botánico con mi familia y luego comí un plato de fideos con verduras en un hawker centre. ¡Fue genial! El fin de semana que viene voy a ir a la playa de Sentosa con mis amigos porque va a hacer sol, aunque también voy a hacer los deberes, claro. ¿Y tú?*\n\n(Hi Javier! I live in Singapore, a huge and very modern city. The best thing is that there are loads of things to do; however, the worst thing is that it's too hot. Last weekend I went to the Botanic Gardens with my family and then I ate a plate of vegetable noodles at a hawker centre. It was great! Next weekend I'm going to go to the beach at Sentosa with my friends because it's going to be sunny, although I'm also going to do my homework, of course. And you?)",
      markScheme: [
        { point: "Describes the town with agreeing adjectives and a pro/con (lo bueno / lo peor…)", keywords: ["es una ciudad", "una ciudad", "lo bueno", "lo malo", "lo mejor", "lo peor"] },
        { point: "Past: at least two preterite verbs about last weekend", keywords: ["fui", "visité", "visite", "comí", "comi", "jugué", "jugue", "compré", "compre", " vi ", "fue genial"] },
        { point: "Future: plans with ir a + infinitive", keywords: ["voy a", "vamos a"] },
        { point: "Opinions with reasons", keywords: ["porque", "ya que", "me encanta", "me gusta", "fue genial"] },
        { point: "A range of connectives and intensifiers", keywords: ["además", "ademas", "sin embargo", "aunque", "por eso", "así que", "asi que", "bastante", "demasiado", "muy"] },
      ],
      commonError: "Answering the past question in the present (*el fin de semana pasado voy…*) — the question uses *hiciste*, so answer with the preterite.",
      difficulty: "challenge",
      guideRef: "extended-sentences",
      hints: [
        "Use the three questions as your plan: one block for each.",
        "Look at the verbs in the questions: *es* (present), *hiciste* (past), *vas a hacer* (future). Answer in the same tense, in the *yo* form.",
        "Before you finish, count your connectives and intensifiers — aim for at least four different ones.",
      ],
      strategy: "Use the time phrase",
    },
  ],
};
