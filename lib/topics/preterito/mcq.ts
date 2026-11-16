import type { Paper } from "../../types.ts";

export const mcqPapers: Paper[] = [
  // ============================== MCQ PAPER 1 ================================
  {
    id: "preterito-m1",
    title: "MCQ Paper 1",
    questions: [
      {
        kind: "mcq",
        id: "preterito-m1-q01",
        question: "Which is the *yo* form of *hablar* (to speak) in the preterite?",
        options: ["hablé", "hablo", "habló", "hablí"],
        answerIndex: 0,
        explanation:
          "Regular *-ar* verbs take *-é* for *yo* in the preterite: *habl- + -é* → **hablé** (I spoke). *Hablo* is the present ('I speak'), and *habló* means 'he/she spoke' — the accent moves the meaning. *Hablí* uses the *-er/-ir* ending, which doesn't belong on an *-ar* verb.",
        difficulty: "warmup",
        guideRef: "regular-ar-preterite",
        hints: ["Which ending does an *-ar* verb take for *yo* in the past? It carries an accent."],
        strategy: "Mind the accent",
      },
      {
        kind: "mcq",
        id: "preterito-m1-q02",
        question: "What does *comí* mean?",
        options: ["I eat", "he ate", "I ate", "we ate"],
        answerIndex: 2,
        explanation:
          "*-í* is the *yo* ending for *-er/-ir* verbs in the preterite, so *comí* = **I ate**. 'I eat' would be *como*; 'he ate' is *comió*; 'we ate' is *comimos*.",
        difficulty: "warmup",
        guideRef: "regular-er-ir-preterite",
        hints: ["The ending *-í* with an accent is a past-tense ending. Which person does it belong to?"],
        strategy: "Find the infinitive",
      },
      {
        kind: "mcq",
        id: "preterito-m1-q03",
        question: "Which time phrase means 'last night'?",
        options: ["anteayer", "anoche", "esta noche", "mañana por la noche"],
        answerIndex: 1,
        explanation:
          "**Anoche** = last night. *Anteayer* is 'the day before yesterday', *esta noche* is 'tonight' (still to come) and *mañana por la noche* is 'tomorrow night'.",
        difficulty: "warmup",
        guideRef: "past-time-phrases",
        hints: ["One of these is a single word built from *noche* (night) — and it points backwards in time."],
        strategy: "Use the time phrase",
      },
      {
        kind: "mcq",
        id: "preterito-m1-q04",
        question: "*Ayer fui al cine con mi hermano.* What does *fui* mean here?",
        options: ["I was", "I go", "he went", "I went"],
        answerIndex: 3,
        explanation:
          "*Fui* is the *yo* preterite of both *ir* and *ser*, so it can mean 'I went' or 'I was'. Here it is followed by *al cine* (to the cinema) — movement to a place — so it means **I went**. 'I was' would need a description after it, like *fui muy feliz*. 'He went' is *fue*; 'I go' is *voy*.",
        difficulty: "warmup",
        guideRef: "irregular-preterites",
        hints: ["Look at what comes straight after *fui*: *al cine*. Is that a place you move to, or a description?"],
        strategy: "Use context",
      },
      {
        kind: "mcq",
        id: "preterito-m1-q05",
        question: "Which is the *yo* form of *jugar* (to play) in the preterite?",
        options: ["jugé", "jugué", "jugó", "juegué"],
        answerIndex: 1,
        explanation:
          "In *-gar* verbs the *g* would turn soft before *e* (like the 'h' sound in *gente*), so Spanish adds a *u* to keep the hard 'g': **jugué**. *Jugé* has lost the hard sound; *jugó* means 'he/she played'; *juegué* wrongly keeps the present-tense stem change — *-ar* verbs have no 'boot' in the preterite.",
        difficulty: "core",
        guideRef: "spelling-changes",
        hints: [
          "Say *jugé* aloud using Spanish rules — does *ge* sound like the *g* in *jugar*?",
          "*-gar* verbs add a letter in the *yo* form to keep the hard 'g' sound before *é*.",
        ],
        strategy: "Say it aloud",
      },
      {
        kind: "mcq",
        id: "preterito-m1-q06",
        question:
          "Read the text.\n\n> Mis primos Lucía y Pablo viven en Barcelona. El verano pasado viajaron a Singapur para visitarnos. Pasaron dos semanas con nosotros. Visitaron los Jardines de la Bahía y tomaron el MRT muchas veces. Lucía compró muchos recuerdos en Chinatown, pero Pablo no compró nada porque gastó todo su dinero el primer día.\n\nWhy didn't Pablo buy anything?",
        options: [
          "He spent all his money on the first day.",
          "He didn't like the souvenirs in Chinatown.",
          "Lucía bought everything for him.",
          "He only stayed in Singapore for two days.",
        ],
        answerIndex: 0,
        explanation:
          "The last sentence says *Pablo no compró nada porque gastó todo su dinero el primer día* — he bought nothing **because he spent all his money on the first day**. They stayed *dos semanas* (two weeks), not two days, and nothing is said about him disliking the souvenirs.",
        difficulty: "core",
        guideRef: "regular-ar-preterite",
        hints: [
          "Find the sentence with *Pablo no compró nada* — what word introduces the reason?",
          "*gastar* = to spend (money). What does *gastó todo su dinero* mean?",
        ],
        strategy: "Use context",
      },
      {
        kind: "mcq",
        id: "preterito-m1-q07",
        question:
          "Read the text.\n\n> El fin de semana pasado, Carmen fue a Sevilla con su familia. El sábado por la mañana visitaron la catedral y a mediodía comieron una paella de verduras en un restaurante. Por la noche, Carmen bailó flamenco en una fiesta. El domingo volvieron a Madrid en tren. Carmen dice que fue un fin de semana genial, pero ahora está muy cansada.\n\nWhat did Carmen do on Saturday night?",
        options: [
          "She visited the cathedral.",
          "She ate a vegetable paella in a restaurant.",
          "She went back to Madrid by train.",
          "She danced flamenco at a party.",
        ],
        answerIndex: 3,
        explanation:
          "The sequence is *por la mañana* (cathedral) → *a mediodía* (paella) → *por la noche* (**she danced flamenco at a party**). Going back to Madrid by train happened on *el domingo*, not Saturday.",
        difficulty: "core",
        guideRef: "past-time-phrases",
        hints: [
          "Find the time phrase that means 'at night' or 'in the evening'.",
          "*Por la noche, Carmen bailó…* — *bailar* = to dance.",
        ],
        strategy: "Use the time phrase",
      },
      {
        kind: "mcq",
        id: "preterito-m1-q08",
        question: "Which sentence means 'We drank lemonade'?",
        options: ["Bebemos limonada.", "Bebí limonada.", "Bebimos limonada.", "Bebieron limonada."],
        answerIndex: 2,
        explanation:
          "The *nosotros* preterite ending for *-er* verbs is *-imos*: **Bebimos limonada.** *Bebemos* is the present ('we drink') — unlike *-ar* and *-ir* verbs, *-er* verbs have a different *nosotros* form in the present and the past. *Bebí* = I drank; *bebieron* = they drank.",
        difficulty: "core",
        guideRef: "regular-er-ir-preterite",
        hints: [
          "'We' = *nosotros*. Which *nosotros* ending is past, not present, for an *-er* verb?",
          "Present: *-emos*. Preterite: *-imos*.",
        ],
        strategy: "Check the subject",
      },
      {
        kind: "mcq",
        id: "preterito-m1-q09",
        question: "You ask a friend 'What did you do on Sunday?' Complete the question: *¿Qué ___ el domingo?* (hacer)",
        options: ["haciste", "hizo", "hiciste", "hicistes"],
        answerIndex: 2,
        explanation:
          "*Hacer* has the irregular preterite stem *hic-*, and the *tú* ending is *-iste*: **hiciste**. *Haciste* keeps the infinitive stem; *hizo* is the *él/ella* form; *hicistes* adds an extra *-s* — the *tú* form of the preterite never ends in *-s*.",
        difficulty: "core",
        guideRef: "irregular-preterites",
        hints: [
          "You are talking to a friend — which person is that?",
          "*Hacer* has an irregular stem in the preterite: *hic-*.",
          "The *tú* preterite ending is *-iste*, with no *s* on the end.",
        ],
        strategy: "Check the subject",
      },
      {
        kind: "mcq",
        id: "preterito-m1-q10",
        question: "Which is the *yo* form of *empezar* (to start) in the preterite?",
        options: ["empecé", "empezé", "empezó", "empiecé"],
        answerIndex: 0,
        explanation:
          "Spanish almost never writes *z* before *e*, so *-zar* verbs change *z* → *c* in the *yo* form: **empecé**. *Empezé* breaks that spelling rule; *empezó* means 'he/she started'; *empiecé* wrongly keeps the present-tense *e → ie* change, which *-ar* verbs don't have in the preterite.",
        difficulty: "core",
        guideRef: "spelling-changes",
        hints: [
          "Spanish doesn't like the letters *ze* together. What replaces the *z*?",
          "Does the *e → ie* stem change from the present (*empiezo*) carry into the preterite of an *-ar* verb?",
        ],
        strategy: "Look for the pattern",
      },
      {
        kind: "mcq",
        id: "preterito-m1-q11",
        question:
          "Read the text.\n\n> Me llamo Javier. Normalmente voy al colegio en autobús, pero ayer fui en bici con mi amigo Diego. Después de las clases, jugamos al fútbol en el parque. Mañana vamos a ir a la piscina porque va a hacer mucho calor.\n\nWhat was different about Javier's day yesterday?",
        options: [
          "He went to the swimming pool.",
          "He played football at school.",
          "He took the bus as usual.",
          "He cycled to school with a friend.",
        ],
        answerIndex: 3,
        explanation:
          "*Normalmente voy… en autobús* is his usual routine (present), *pero ayer fui en bici con mi amigo Diego* is what changed: **he cycled to school with a friend**. The pool is *mañana* (future, *vamos a ir*), and football was *en el parque*, not at school.",
        difficulty: "core",
        guideRef: "three-tenses",
        hints: [
          "Three time frames here: *normalmente*, *ayer*, *mañana*. Which verb goes with *ayer*?",
          "*Pero* signals a contrast with what normally happens.",
        ],
        strategy: "Use the time phrase",
      },
      {
        kind: "mcq",
        id: "preterito-m1-q12",
        question:
          "Read the text.\n\n> Me llamo Arjun y vivo en Singapur. Ayer, después del colegio, volví a casa en MRT. Primero comí arroz con verduras en un hawker centre cerca de mi piso. Luego escribí un correo electrónico a mi amigo Pablo, que vive en Valencia. Por la noche vi una película de miedo con mi hermana, pero no me gustó nada: fue muy aburrida.\n\nWhich statement is true?",
        options: [
          "He went home by bus.",
          "He wrote an email to a friend who lives in Valencia.",
          "He watched a scary film on his own.",
          "He enjoyed the film a lot.",
        ],
        answerIndex: 1,
        explanation:
          "*Escribí un correo electrónico a mi amigo Pablo, que vive en Valencia* → **he wrote an email to a friend who lives in Valencia**. He went home *en MRT* (not by bus), watched the film *con mi hermana* (not alone), and *no me gustó nada* means he didn't like it at all.",
        difficulty: "core",
        guideRef: "regular-er-ir-preterite",
        hints: [
          "Check each option against one sentence of the text.",
          "*no me gustó nada* = I didn't like it at all.",
        ],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "preterito-m1-q13",
        question: "In which sentence does *fue* come from *ser* (to be) rather than *ir* (to go)?",
        options: [
          "El concierto fue fantástico.",
          "Mi hermano fue al polideportivo.",
          "Lucía fue a Barcelona en tren.",
          "Mi padre fue al supermercado.",
        ],
        answerIndex: 0,
        explanation:
          "*Ser* and *ir* share all their preterite forms, so context decides. In **El concierto fue fantástico** *fue* is followed by an adjective — it describes the concert, so it means 'was'. In the others *fue* is followed by *a/al* + a place (*al polideportivo, a Barcelona*), which shows movement: 'went'.",
        difficulty: "challenge",
        guideRef: "irregular-preterites",
        hints: [
          "*Ir* usually comes with *a* + a destination. *Ser* usually comes with a description.",
          "Look at the word straight after *fue* in each sentence.",
          "Which sentence has an adjective after *fue* and no destination?",
        ],
        strategy: "Use context",
      },
      {
        kind: "mcq",
        id: "preterito-m1-q14",
        question: "One of these sentences has a spelling mistake. Which one?",
        options: [
          "Ayer pagué los helados.",
          "Anoche llegué tarde a casa.",
          "En el examen de inglés sacé un diez.",
          "El lunes crucé el puente a pie.",
        ],
        answerIndex: 2,
        explanation:
          "*Sacar* is a *-car* verb: to keep the hard 'k' sound before *é*, the *c* becomes *qu* — so it should be *saqué un diez*. *Sacé* would sound like 'sa-THE' in Spain. The others are correct: *pagué* (-gar → -gué), *llegué* (-gar → -gué) and *crucé* (-zar → -cé).",
        difficulty: "challenge",
        guideRef: "spelling-changes",
        hints: [
          "All four are *yo* forms of verbs that change spelling. Check each one against its rule.",
          "-car → -qué, -gar → -gué, -zar → -cé.",
          "Which infinitive ends in *-car*? Is its *yo* form spelt with *qu*?",
        ],
        strategy: "Say it aloud",
      },
      {
        kind: "mcq",
        id: "preterito-m1-q15",
        question: "Which sentence correctly says 'Yesterday I played tennis, today I'm swimming and tomorrow I'm going to play football'?",
        options: [
          "Ayer juego al tenis, hoy nadé y mañana voy a jugar al fútbol.",
          "Ayer jugué al tenis, hoy nado y mañana jugué al fútbol.",
          "Ayer jugó al tenis, hoy nado y mañana voy a jugar al fútbol.",
          "Ayer jugué al tenis, hoy nado y mañana voy a jugar al fútbol.",
        ],
        answerIndex: 3,
        explanation:
          "Each time phrase needs its own tense: *ayer* + preterite (*jugué*), *hoy* + present (*nado*), *mañana* + near future (*voy a jugar*). One distractor swaps the past and present; one uses the past *jugué* with *mañana*; and *jugó* means 'he/she played', not 'I played'.",
        difficulty: "challenge",
        guideRef: "three-tenses",
        hints: [
          "Match each time phrase to a tense: past, present, near future.",
          "Check the person too — every verb should be 'I'.",
          "Near future = *voy a* + infinitive.",
        ],
        strategy: "Use the time phrase",
      },
    ],
  },

  // ============================== MCQ PAPER 2 ================================
  {
    id: "preterito-m2",
    title: "MCQ Paper 2",
    questions: [
      {
        kind: "mcq",
        id: "preterito-m2-q01",
        question: "Which is the *yo* form of *salir* (to go out) in the preterite?",
        options: ["salgo", "salí", "salió", "salé"],
        answerIndex: 1,
        explanation:
          "*Salir* is regular in the preterite: *sal- + -í* → **salí** (I went out). *Salgo* is the irregular *present* form ('I go out'); *salió* = he/she went out; *salé* uses the *-ar* ending.",
        difficulty: "warmup",
        guideRef: "regular-er-ir-preterite",
        hints: ["*Salir* is an *-ir* verb. What is the *yo* ending for *-er/-ir* verbs in the preterite?"],
        strategy: "Find the infinitive",
      },
      {
        kind: "mcq",
        id: "preterito-m2-q02",
        question: "Which is the *yo* form of *tener* (to have) in the preterite?",
        options: ["tení", "tuvo", "tuvé", "tuve"],
        answerIndex: 3,
        explanation:
          "*Tener* has the irregular stem *tuv-* and the irregular *yo* ending *-e* with **no accent**: **tuve**. *Tuvé* adds an accent that irregular preterites never have; *tuvo* is the *él/ella* form; *tení* treats it as regular.",
        difficulty: "warmup",
        guideRef: "irregular-preterites",
        hints: ["*Tener* is irregular in the preterite, with the stem *tuv-*. Do irregular preterites carry accents?"],
        strategy: "Mind the accent",
      },
      {
        kind: "mcq",
        id: "preterito-m2-q03",
        question: "What does *el año pasado* mean?",
        options: ["last year", "next year", "every year", "this year"],
        answerIndex: 0,
        explanation:
          "*Pasado* = past, gone by, so *el año pasado* = **last year**. 'Next year' is *el año que viene* / *el año próximo*; 'every year' is *todos los años*; 'this year' is *este año*.",
        difficulty: "warmup",
        guideRef: "past-time-phrases",
        hints: ["*Pasado* looks like an English word — which one?"],
        strategy: "Spot the cognate",
      },
      {
        kind: "mcq",
        id: "preterito-m2-q04",
        question: "What does *bailé* mean?",
        options: ["I dance", "he/she danced", "I danced", "we danced"],
        answerIndex: 2,
        explanation:
          "*-é* (with an accent) is the *yo* preterite ending for *-ar* verbs, so *bailé* = **I danced**. 'I dance' is *bailo*; 'he/she danced' is *bailó*; 'we danced' is *bailamos*.",
        difficulty: "warmup",
        guideRef: "regular-ar-preterite",
        hints: ["Which person has the ending *-é* in the preterite?"],
        strategy: "Mind the accent",
      },
      {
        kind: "mcq",
        id: "preterito-m2-q05",
        question: "*La semana pasada visitamos el Museo del Prado.* What does *visitamos* mean here?",
        options: ["we visit", "they visited", "I visited", "we visited"],
        answerIndex: 3,
        explanation:
          "For *-ar* verbs the *nosotros* form is identical in the present and the preterite, so *visitamos* alone could be 'we visit' or 'we visited'. The time phrase *la semana pasada* (last week) settles it: **we visited**.",
        difficulty: "core",
        guideRef: "regular-ar-preterite",
        hints: [
          "*-amos* = we. But is it present or past? The ending alone can't tell you.",
          "Look at the time phrase at the start of the sentence.",
        ],
        strategy: "Use the time phrase",
      },
      {
        kind: "mcq",
        id: "preterito-m2-q06",
        question:
          "Read the text.\n\n> El verano pasado, Hana y su hermano Ravi fueron a un pueblo en las montañas cerca de Granada. Estuvieron allí una semana con sus abuelos. El primer día hizo mucho calor, así que fueron a nadar al río. Hana tuvo un pequeño accidente con la bicicleta, pero no fue grave. El último día hicieron una barbacoa de verduras en el jardín. ¡Lo pasaron bomba!\n\nWhy did Hana and Ravi go to the river on the first day?",
        options: [
          "Because Hana had a bike accident.",
          "Because it was very hot.",
          "Because their grandparents lived next to it.",
          "Because they wanted to have a barbecue there.",
        ],
        answerIndex: 1,
        explanation:
          "*El primer día hizo mucho calor, así que fueron a nadar al río* — **it was very hot**, so they went swimming. *Así que* = so. Hana's accident was a separate event (*no fue grave* — it wasn't serious), and the barbecue was *el último día* in the garden.",
        difficulty: "core",
        guideRef: "irregular-preterites",
        hints: [
          "Find *el primer día* in the text.",
          "*Hizo mucho calor* uses the preterite of *hacer* — weather!",
          "*Así que* = so / therefore.",
        ],
        strategy: "Use context",
      },
      {
        kind: "mcq",
        id: "preterito-m2-q07",
        question: "Complete: *Mi abuela me ___ una carta muy bonita.* (escribir, preterite)",
        options: ["escribe", "escribí", "escribió", "escribó"],
        answerIndex: 2,
        explanation:
          "*Mi abuela* = *ella*, and the *él/ella* preterite ending for *-er/-ir* verbs is *-ió*: **escribió**. *Escribe* is present; *escribí* = I wrote; *escribó* borrows the *-ar* ending *-ó*.",
        difficulty: "core",
        guideRef: "regular-er-ir-preterite",
        hints: [
          "Who wrote the letter? Which person is that?",
          "*-er/-ir* verbs: *él/ella* ending is *-ió* (two vowels, accent on the *ó*).",
        ],
        strategy: "Check the subject",
      },
      {
        kind: "mcq",
        id: "preterito-m2-q08",
        question: "Which is the *yo* form of *tocar* (to play an instrument) in the preterite?",
        options: ["toqué", "tocé", "tocó", "toké"],
        answerIndex: 0,
        explanation:
          "In *-car* verbs, *c* before *e* would sound like 'th' (Spain) or 's', so the *c* becomes *qu* to keep the hard 'k': **toqué**. *Tocé* loses the hard sound; *tocó* is 'he/she played'; Spanish uses *k* only in a few foreign words, so *toké* is wrong.",
        difficulty: "core",
        guideRef: "spelling-changes",
        hints: [
          "Say *tocé* aloud with Spanish sounds. Does the *c* still sound like 'k'?",
          "Which two letters make a hard 'k' sound before *e* in Spanish (think *queso*)?",
        ],
        strategy: "Say it aloud",
      },
      {
        kind: "mcq",
        id: "preterito-m2-q09",
        question: "Complete: *Ayer mi hermano ___ un libro de Harry Potter.* (leer)",
        options: ["leió", "leyó", "leó", "lió"],
        answerIndex: 1,
        explanation:
          "*Leer* has a stem ending in a vowel (*le-*). Spanish won't put an unstressed *i* between two vowels, so it becomes *y*: **leyó**. *Leió* is the version without that change; *leó* drops the *i* altogether; *lió* is a different verb (*liar*).",
        difficulty: "core",
        guideRef: "spelling-changes",
        hints: [
          "The normal *él* ending would be *-ió*. What happens when you stick it onto *le-*?",
          "Three vowels in a row (*e-i-ó*) — one of them turns into a consonant.",
        ],
        strategy: "Look for the pattern",
      },
      {
        kind: "mcq",
        id: "preterito-m2-q10",
        question: "Complete: *El domingo mis padres ___ en casa todo el día.* (estar)",
        options: ["estaron", "estuvo", "están", "estuvieron"],
        answerIndex: 3,
        explanation:
          "*Estar* is irregular in the preterite with the stem *estuv-*; the *ellos* ending is *-ieron*: **estuvieron**. *Estaron* treats it as a regular *-ar* verb; *estuvo* is singular (he/she); *están* is present.",
        difficulty: "core",
        guideRef: "irregular-preterites",
        hints: [
          "*Mis padres* = *ellos*. Is *estar* regular in the preterite?",
          "The irregular stem is *estuv-* (like *tuv-* from *tener*).",
          "Irregular stems take *-ieron* for *ellos*.",
        ],
        strategy: "Check the subject",
      },
      {
        kind: "mcq",
        id: "preterito-m2-q11",
        question:
          "Read the text.\n\n> Hace dos semanas, Priya hizo un viaje a Barcelona con su clase. Primero visitaron la Sagrada Familia. Luego pasearon por la Rambla y comieron churros con chocolate. Al final del día sacaron muchas fotos en la playa. Priya dice: «¡Lo pasé bomba!»\n\nWhen did Priya go to Barcelona, and what did she think of it?",
        options: [
          "In two weeks' time — she is looking forward to it.",
          "Last weekend — she had a great time.",
          "Two weeks ago — she had a great time.",
          "Two weeks ago — she found it boring.",
        ],
        answerIndex: 2,
        explanation:
          "*Hace dos semanas* = **two weeks ago** (*hace* + time = 'ago'), and *¡Lo pasé bomba!* = 'I had a brilliant time'. 'In two weeks' time' would be *dentro de dos semanas*, and the verbs (*hizo, visitaron*) are all past.",
        difficulty: "core",
        guideRef: "past-time-phrases",
        hints: [
          "*Hace* + a length of time is a past time phrase. What does it mean in English?",
          "*Pasarlo bomba* is a set phrase — is *bomba* good or bad here?",
        ],
        strategy: "Use the time phrase",
      },
      {
        kind: "mcq",
        id: "preterito-m2-q12",
        question:
          "Read the text.\n\n> Hola, soy Zara. Normalmente los sábados juego al baloncesto con mi equipo, pero el sábado pasado no jugué porque llovió muchísimo. Fui al centro comercial con mi madre y compré unas zapatillas nuevas. Hoy es domingo y hago los deberes en casa. El sábado que viene voy a jugar un partido muy importante.\n\nWhich statement about Zara is correct?",
        options: [
          "Next Saturday she is going to play an important match.",
          "Last Saturday she played basketball in the rain.",
          "Today she is going to the shopping centre with her mum.",
          "She usually goes shopping on Saturdays.",
        ],
        answerIndex: 0,
        explanation:
          "*El sábado que viene voy a jugar un partido muy importante* → **next Saturday she is going to play an important match**. Last Saturday she did *not* play (*no jugué porque llovió*); the shopping trip was last Saturday, not today; and usually on Saturdays she plays basketball.",
        difficulty: "core",
        guideRef: "three-tenses",
        hints: [
          "Sort the verbs into past (*jugué, llovió, fui, compré*), present (*juego, es, hago*) and future (*voy a jugar*).",
          "Then check which time phrase each option belongs to.",
        ],
        strategy: "Use the time phrase",
      },
      {
        kind: "mcq",
        id: "preterito-m2-q13",
        question: "Which sentence is spelt correctly?",
        options: ["Anoche ví una película.", "Ayer Pablo vió el partido.", "Anoche vi una película.", "Anoche veí una película."],
        answerIndex: 2,
        explanation:
          "*Ver* is the odd one out among *-er* verbs: its preterite forms *vi* and *vio* are only one syllable, so they take **no accent** — **Anoche vi una película.** *Ví* and *vió* add an accent that isn't needed; *veí* keeps the *e* of the stem, which the preterite drops.",
        difficulty: "challenge",
        guideRef: "regular-er-ir-preterite",
        hints: [
          "Count the syllables in *vi* and *vio*. Do one-syllable words need a written accent to show stress?",
          "The stem of *ver* in the preterite is just *v-*.",
          "So *yo* = *v + i*, *él* = *v + io* — no accents.",
        ],
        strategy: "Mind the accent",
      },
      {
        kind: "mcq",
        id: "preterito-m2-q14",
        question: "Which sentence contains a mistake?",
        options: [
          "El año pasado hice un viaje a Málaga.",
          "Mi hermana hizó los deberes.",
          "¿Dónde estuviste ayer?",
          "Tuvimos un examen el lunes.",
        ],
        answerIndex: 1,
        explanation:
          "The *él/ella* preterite of *hacer* is *hizo* — the *c* becomes *z* to keep the 'th/s' sound before *o*, and like all irregular preterite stems it has **no accent**. So *hizó* is wrong. *Hice*, *estuviste* and *tuvimos* are all correct.",
        difficulty: "challenge",
        guideRef: "irregular-preterites",
        hints: [
          "All four use irregular preterites. Irregular stems have one thing in common about accents…",
          "*hice, hiciste, hizo* — do any of these have a written accent?",
        ],
        strategy: "Mind the accent",
      },
      {
        kind: "mcq",
        id: "preterito-m2-q15",
        question: "Your friend says: *Este fin de semana voy a visitar a mis abuelos.* How would they say the same thing about **last** weekend?",
        options: [
          "El fin de semana pasado voy a visitar a mis abuelos.",
          "El fin de semana pasado visito a mis abuelos.",
          "El fin de semana pasado visitó a mis abuelos.",
          "El fin de semana pasado visité a mis abuelos.",
        ],
        answerIndex: 3,
        explanation:
          "Changing the time frame means changing both the time phrase **and** the verb: *voy a visitar* (near future) → **visité** (preterite, *yo*). Keeping *voy a visitar* or *visito* clashes with *pasado*, and *visitó* switches the person to 'he/she'.",
        difficulty: "challenge",
        guideRef: "three-tenses",
        hints: [
          "The speaker is still 'I'. Which tense goes with *el fin de semana pasado*?",
          "*Visitar* is a regular *-ar* verb. What is its *yo* preterite?",
          "*-é* = I; *-ó* = he/she.",
        ],
        strategy: "Use the time phrase",
      },
    ],
  },

  // ============================== MCQ PAPER 3 ================================
  {
    id: "preterito-m3",
    title: "MCQ Paper 3",
    questions: [
      {
        kind: "mcq",
        id: "preterito-m3-q01",
        question: "Which is the *nosotros* form of *nadar* (to swim) in the preterite?",
        options: ["nadimos", "nadaron", "nadamos", "nademos"],
        answerIndex: 2,
        explanation:
          "The *nosotros* preterite ending for *-ar* verbs is *-amos* — the same as the present: **nadamos**. *Nadimos* uses the *-er/-ir* ending; *nadaron* = they swam; *nademos* isn't a past form.",
        difficulty: "warmup",
        guideRef: "regular-ar-preterite",
        hints: ["For *-ar* verbs, the *nosotros* preterite looks exactly like the present."],
        strategy: "Look for the pattern",
      },
      {
        kind: "mcq",
        id: "preterito-m3-q02",
        question: "What does *volvieron* mean?",
        options: ["they returned", "we returned", "they return", "she returned"],
        answerIndex: 0,
        explanation:
          "*-ieron* is the *ellos/ellas* preterite ending for *-er/-ir* verbs, so *volvieron* = **they returned** (came/went back). 'We returned' is *volvimos*; 'they return' is *vuelven*; 'she returned' is *volvió*.",
        difficulty: "warmup",
        guideRef: "regular-er-ir-preterite",
        hints: ["*-ieron* — which person, and which tense?"],
        strategy: "Find the infinitive",
      },
      {
        kind: "mcq",
        id: "preterito-m3-q03",
        question: "A story says: *Primero fuimos al mercado, luego comimos en un restaurante y al final volvimos a casa.* What does *al final* mean?",
        options: ["first of all", "then", "afterwards", "in the end"],
        answerIndex: 3,
        explanation:
          "*Al final* = **in the end / finally** — it closes the sequence *primero → luego → al final*. 'First of all' is *primero*; 'then' is *luego*; 'afterwards' is *después*.",
        difficulty: "warmup",
        guideRef: "past-time-phrases",
        hints: ["It's the last of three sequencers. *Final* is a cognate."],
        strategy: "Spot the cognate",
      },
      {
        kind: "mcq",
        id: "preterito-m3-q04",
        question: "Which is the *nosotros* form of *ir* (to go) in the preterite?",
        options: ["vamos", "fuimos", "fueron", "fuemos"],
        answerIndex: 1,
        explanation:
          "*Ir* is completely irregular in the preterite: *fui, fuiste, fue, fuimos, fuisteis, fueron* — 'we went' is **fuimos**. *Vamos* is present; *fueron* = they went; *fuemos* mixes *fue* with *-emos*.",
        difficulty: "warmup",
        guideRef: "irregular-preterites",
        hints: ["The preterite of *ir* starts *fu-*. Which ending means 'we'?"],
        strategy: "Check the subject",
      },
      {
        kind: "mcq",
        id: "preterito-m3-q05",
        question:
          "Read the text.\n\n> El sábado pasado, Wei Ling y su amiga Mei pasaron el día en Sentosa. Por la mañana tomaron el teleférico y nadaron en la playa. A mediodía compraron helados porque hizo muchísimo calor. Por la tarde, Mei montó en bici, pero Wei Ling descansó en la arena y escuchó música. Volvieron a casa a las siete, cansadas pero contentas.\n\nWhat did Wei Ling do in the afternoon?",
        options: [
          "She rested on the sand and listened to music.",
          "She rode a bike.",
          "She bought ice creams for everyone.",
          "She swam in the sea all afternoon.",
        ],
        answerIndex: 0,
        explanation:
          "*Por la tarde, Mei montó en bici, pero Wei Ling descansó en la arena y escuchó música* → **she rested on the sand and listened to music**. It was Mei who rode a bike (*montó* = she rode); the swimming was *por la mañana* and the ice creams *a mediodía*.",
        difficulty: "core",
        guideRef: "regular-ar-preterite",
        hints: [
          "Find *por la tarde*. Two girls do two different things — who does which?",
          "*descansar* = to rest; *escuchar* = to listen to.",
        ],
        strategy: "Use the time phrase",
      },
      {
        kind: "mcq",
        id: "preterito-m3-q06",
        question: "Complete: *Anoche mi familia y yo ___ en un restaurante mexicano.* (comer)",
        options: ["comemos", "comieron", "comimos", "comímos"],
        answerIndex: 2,
        explanation:
          "*Mi familia y yo* = *nosotros*, and *anoche* needs the preterite: **comimos**. *Comemos* is the present (for *-er* verbs the *nosotros* present and past differ); *comieron* = they ate; *comímos* has an accent this form doesn't need.",
        difficulty: "core",
        guideRef: "regular-er-ir-preterite",
        hints: [
          "*Mi familia y yo* — which pronoun replaces that?",
          "*Anoche* = last night, so you need the past. *-er* verbs: *-imos*.",
        ],
        strategy: "Check the subject",
      },
      {
        kind: "mcq",
        id: "preterito-m3-q07",
        question: "Which is the *yo* form of *llegar* (to arrive) in the preterite?",
        options: ["llegé", "llegué", "llegó", "lleguí"],
        answerIndex: 1,
        explanation:
          "*-gar* verbs add *u* in the *yo* form to keep the hard 'g' before *é*: **llegué**. Without the *u*, *llegé* would be pronounced 'lleh-HE'. *Llegó* = he/she arrived; *lleguí* uses the *-er/-ir* ending.",
        difficulty: "core",
        guideRef: "spelling-changes",
        hints: [
          "*-ar* verb, so the *yo* ending is *-é*. What happens to *g* before *e*?",
          "Same pattern as *jugar* → *jugué*.",
        ],
        strategy: "Look for the pattern",
      },
      {
        kind: "mcq",
        id: "preterito-m3-q08",
        question:
          "Read the diary entry.\n\n> Querido diario: Ayer fue un día terrible. Primero llegué tarde al colegio porque perdí el autobús. En la clase de matemáticas saqué una mala nota en un examen. A la hora de comer busqué mi bocadillo de queso en la mochila, pero lo dejé en casa. Por la tarde toqué el piano en el concierto del colegio y, por fin, todo salió bien.\n\nWhy was the writer late for school?",
        options: [
          "They left their sandwich at home.",
          "They had a maths exam.",
          "They had to play the piano in a concert.",
          "They missed the bus.",
        ],
        answerIndex: 3,
        explanation:
          "*Llegué tarde al colegio porque perdí el autobús* — **they missed the bus** (*perder el autobús* = to miss the bus). The sandwich, the maths exam and the concert all happened later in the day, in that order.",
        difficulty: "core",
        guideRef: "spelling-changes",
        hints: [
          "Find *llegué tarde* (I arrived late). What follows *porque*?",
          "*Perder* usually means 'to lose' — but with a bus or train it means 'to miss'.",
        ],
        strategy: "Use context",
      },
      {
        kind: "mcq",
        id: "preterito-m3-q09",
        question: "Complete: *Por mi cumpleaños, mis abuelos me ___ veinte euros.* (dar)",
        options: ["daron", "dio", "dimos", "dieron"],
        answerIndex: 3,
        explanation:
          "*Dar* is an *-ar* verb but takes *-er/-ir* endings in the preterite, with no accents: *di, diste, dio, dimos, disteis, dieron* — so 'they gave' is **dieron**. *Daron* treats it as a regular *-ar* verb; *dio* is singular; *dimos* = we gave.",
        difficulty: "core",
        guideRef: "irregular-preterites",
        hints: [
          "*Mis abuelos* = *ellos*.",
          "*Dar* is irregular: it borrows the *-er/-ir* endings (*di, dio…*).",
          "What is the *ellos* ending for *-er/-ir* verbs?",
        ],
        strategy: "Check the subject",
      },
      {
        kind: "mcq",
        id: "preterito-m3-q10",
        question: "Your friend asks: *¿Qué tal la excursión?* Which reply means 'It was great — I had a fantastic time'?",
        options: [
          "Es genial, lo paso bomba.",
          "Fue genial, lo pasé bomba.",
          "Va a ser genial, lo voy a pasar bomba.",
          "Fue genial, lo pasó bomba.",
        ],
        answerIndex: 1,
        explanation:
          "*Fue genial* (it was great) + *lo pasé bomba* (I had a fantastic time) — both preterite, *lo pasé* is 'I'. *Es… lo paso* is present; *va a ser… lo voy a pasar* is the future; *lo pasó* means 'he/she had a great time'.",
        difficulty: "core",
        guideRef: "past-time-phrases",
        hints: [
          "The trip is over, so both verbs must be in the past.",
          "*pasarlo bomba* — which ending on *pasar* means 'I' in the preterite?",
        ],
        strategy: "Check the subject",
      },
      {
        kind: "mcq",
        id: "preterito-m3-q11",
        question:
          "Read the text.\n\n> Hola, me llamo Marcus. El año pasado hice un intercambio con un chico español, Pablo. Fui a Valencia en abril y estuve tres semanas en su casa. Tuve que ir al instituto con él todos los días: ¡las clases empezaron a las ocho y terminaron a las tres! Lo mejor fue la comida: probé la paella de verduras y me encantó.\n\nWhich statement is true?",
        options: [
          "Marcus stayed at Pablo's house for three weeks.",
          "Pablo visited Singapore in April.",
          "Marcus didn't like the Spanish food.",
          "Lessons at Pablo's school started at three.",
        ],
        answerIndex: 0,
        explanation:
          "*Estuve tres semanas en su casa* → **Marcus stayed at Pablo's house for three weeks**. It was Marcus who travelled (*fui a Valencia*), the food was *lo mejor* (the best part — *me encantó*), and lessons started at eight and finished at three.",
        difficulty: "core",
        guideRef: "irregular-preterites",
        hints: [
          "*Estuve* is the *yo* preterite of *estar*. What does *estuve tres semanas* tell you?",
          "Check who went where: *fui a Valencia*.",
        ],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "preterito-m3-q12",
        question: "Which time phrase fits this sentence? *___ voy a ir a la piscina.*",
        options: ["El sábado pasado", "Hace una semana", "El sábado que viene", "Ayer"],
        answerIndex: 2,
        explanation:
          "*Voy a ir* is the near future, so it needs a future time phrase: **El sábado que viene** (next Saturday). *El sábado pasado*, *hace una semana* and *ayer* all point to the past and would need *fui*.",
        difficulty: "core",
        guideRef: "three-tenses",
        hints: [
          "What tense is *voy a ir*?",
          "Three of the options point backwards in time. Which one points forwards?",
        ],
        strategy: "Use the time phrase",
      },
      {
        kind: "mcq",
        id: "preterito-m3-q13",
        question:
          "Read Diego's message.\n\n> ¡Hola, Sofía! Te escribo desde el aeropuerto de Madrid. Ayer terminé los exámenes y anoche hice la maleta. Ahora espero el avión. Mañana voy a estar en la playa de Málaga con mis primos y voy a nadar todos los días. ¡Qué ganas!\n\nWhich of these has Diego NOT done yet?",
        options: ["finish his exams", "swim at the beach in Málaga", "pack his suitcase", "get to the airport"],
        answerIndex: 1,
        explanation:
          "Swimming is in the near future (*voy a nadar*, *mañana*), so **he hasn't swum at the beach yet**. *Terminé los exámenes* (ayer) and *hice la maleta* (anoche) are preterite — done. *Te escribo desde el aeropuerto* (present) shows he is already at the airport.",
        difficulty: "challenge",
        guideRef: "three-tenses",
        hints: [
          "Sort the verbs by tense: which are finished (preterite), which are happening now, which are still to come?",
          "*Voy a* + infinitive = something that hasn't happened yet.",
          "Where is he writing from?",
        ],
        strategy: "Use context",
      },
      {
        kind: "mcq",
        id: "preterito-m3-q14",
        question: "Which sentence has NO spelling mistake?",
        options: ["Ayer almorzé con mis abuelos.", "Ayer pagé la cuenta.", "Ayer busqé mi móvil.", "Ayer almorcé con mis abuelos."],
        answerIndex: 3,
        explanation:
          "*Almorzar* is a *-zar* verb, so *z* → *c* before *é*: **almorcé**. *Almorzé* keeps the *z*; *pagé* needs a *u* (*pagué*) to keep the hard 'g'; *busqé* needs *qu* + *e* (*busqué*) — in Spanish *q* is always followed by *u*.",
        difficulty: "challenge",
        guideRef: "spelling-changes",
        hints: [
          "Each sentence has a *yo* form of a spelling-change verb. Check each against its rule.",
          "-car → -qué, -gar → -gué, -zar → -cé.",
          "In Spanish, *q* never appears without a *u* after it.",
        ],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "preterito-m3-q15",
        question: "Why does the accent matter in *hablo* and *habló*?",
        options: [
          "*Hablo* means 'I speak' (present); *habló* means 'he/she spoke' (past).",
          "*Hablo* means 'I spoke'; *habló* means 'he/she speaks'.",
          "They mean the same — the accent only shows where the stress goes.",
          "*Hablo* means 'I speak'; *habló* means 'I spoke'.",
        ],
        answerIndex: 0,
        explanation:
          "The accent changes the stress (*HA-blo* vs *ha-BLÓ*) **and** the meaning: *hablo* = I speak (present), *habló* = he/she spoke (preterite). 'I spoke' is *hablé*, so the option pairing *habló* with 'I spoke' mixes up the person.",
        difficulty: "challenge",
        guideRef: "regular-ar-preterite",
        hints: [
          "Say both aloud — where does the stress fall?",
          "In the preterite, which ending means 'I' and which means 'he/she' for *-ar* verbs?",
          "*-é* = I spoke; *-ó* = he/she spoke.",
        ],
        strategy: "Mind the accent",
      },
    ],
  },
];
