import type { Paper } from "../../types.ts";

export const mcqPapers: Paper[] = [
  // ============================== MCQ PAPER 1 ==============================
  {
    id: "futuro-inmediato-m1",
    title: "MCQ Paper 1",
    questions: [
      {
        kind: "mcq",
        id: "futuro-inmediato-m1-q01",
        question: "Which is the correct *nosotros* form of *ir* (to go) in the present tense?",
        options: ["imos", "vamos", "van", "vais"],
        answerIndex: 1,
        explanation:
          "*Ir* is irregular: *voy, vas, va, **vamos**, vais, van*. *Imos* is what you get if you treat *ir* like a regular *-ir* verb (*viv-imos*) — logical, but Spanish doesn't use it. *Van* is the *ellos* form and *vais* is the *vosotros* form.",
        difficulty: "warmup",
        guideRef: "ir-present",
        hints: ["*Ir* doesn't follow the regular pattern — every present form starts with *v-*. Which one ends in the *nosotros* ending *-mos*?"],
        strategy: "Check the subject",
      },
      {
        kind: "mcq",
        id: "futuro-inmediato-m1-q02",
        question: "Complete the sentence: *Mis padres ___ a Madrid en agosto.*",
        options: ["va", "vais", "van", "vamos"],
        answerIndex: 2,
        explanation:
          "*Mis padres* = 'my parents' = *ellos*, so you need **van**. *Va* is singular (he/she), a very common slip when the subject is a noun rather than a pronoun. *Vais* is *vosotros* and *vamos* is *nosotros*.",
        difficulty: "warmup",
        guideRef: "ir-present",
        hints: ["Replace *mis padres* with a pronoun. Is it *él*, *nosotros* or *ellos*?"],
        strategy: "Check the subject",
      },
      {
        kind: "mcq",
        id: "futuro-inmediato-m1-q03",
        question: "Choose the correct Spanish for 'I'm going to the park'.",
        options: ["Voy al parque.", "Voy a el parque.", "Voy en el parque.", "Va al parque."],
        answerIndex: 0,
        explanation:
          "Movement towards a place uses *ir a*, and *a + el* always contracts to **al**: *Voy al parque.* *Voy a el parque* forgets the contraction. *En* means 'in/at' (where you are), not 'to'. *Va* is the *él/ella* form, not *yo*.",
        difficulty: "warmup",
        guideRef: "ir-present",
        hints: ["*Parque* is masculine (*el parque*). What happens when *a* meets *el*?"],
        strategy: "Look for the pattern",
      },
      {
        kind: "mcq",
        id: "futuro-inmediato-m1-q04",
        question: "Choose the correct Spanish for 'I'm going to play tennis'.",
        options: ["Voy jugar al tenis.", "Voy a juego al tenis.", "Va a jugar al tenis.", "Voy a jugar al tenis."],
        answerIndex: 3,
        explanation:
          "The near future is **ir (conjugated) + a + infinitive**: *voy + a + jugar*. *Voy jugar* drops the *a*. *Voy a juego* conjugates the second verb too — only *ir* changes; the second verb stays as the infinitive. *Va* means 'he/she is going'.",
        difficulty: "warmup",
        guideRef: "forming-the-near-future",
        hints: ["Three building blocks: the right form of *ir*, the little word *a*, and a verb ending in *-ar/-er/-ir*."],
        strategy: "Build it up (extended sentence)",
      },
      {
        kind: "mcq",
        id: "futuro-inmediato-m1-q05",
        question: "Which sentence means 'I'm not going to watch TV tonight'?",
        options: [
          "Voy a no ver la tele esta noche.",
          "No voy a ver la tele esta noche.",
          "Voy no a ver la tele esta noche.",
          "No voy ver la tele esta noche.",
        ],
        answerIndex: 1,
        explanation:
          "To make the near future negative, put **no** in front of the form of *ir*: *No voy a ver…* *Voy no a ver* splits *voy a* apart, which Spanish never does. *No voy ver* has lost the *a*. *Voy a no ver* is a word-for-word copy of 'I'm going to not watch' — it isn't how Spanish normally makes a negative.",
        difficulty: "core",
        guideRef: "forming-the-near-future",
        hints: [
          "In Spanish, *no* goes straight in front of the conjugated verb.",
          "Which word in the sentence is the conjugated verb — *voy*, *a* or *ver*?",
        ],
        strategy: "Look for the pattern",
      },
      {
        kind: "mcq",
        id: "futuro-inmediato-m1-q06",
        question: "What does *pasado mañana* mean?",
        options: ["yesterday", "the day before yesterday", "tomorrow morning", "the day after tomorrow"],
        answerIndex: 3,
        explanation:
          "*Pasado mañana* = 'tomorrow having passed' → **the day after tomorrow**. *Pasado* can mean 'past', which tempts people to say 'the day before yesterday' — but that is *anteayer*. 'Tomorrow morning' is *mañana por la mañana*.",
        difficulty: "warmup",
        guideRef: "future-time-phrases",
        hints: ["Look at the second word: *mañana*. Is the phrase about the past or the future?"],
        strategy: "Use the time phrase",
      },
      {
        kind: "mcq",
        id: "futuro-inmediato-m1-q07",
        question: "Which time phrase refers to the **past**, not the future?",
        options: ["el sábado pasado", "el sábado que viene", "la próxima semana", "el año que viene"],
        answerIndex: 0,
        explanation:
          "*El sábado **pasado*** = last Saturday (past). The others all point forward: *que viene* = 'that is coming' (next), *próxima* = next. Watch out: *pasado* after a noun means 'last', but *pasado mañana* means 'the day after tomorrow'.",
        difficulty: "core",
        guideRef: "future-time-phrases",
        hints: ["Look for words that mean 'next': *que viene*, *próximo/próxima*.", "Which phrase has none of those — and contains a word meaning 'last'?"],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "futuro-inmediato-m1-q08",
        question: "Which sentence correctly says 'I'm going to get up at seven'?",
        options: [
          "Voy a levanto a las siete.",
          "Voy a levantar a las siete.",
          "Voy a levantarme a las siete.",
          "Me voy a levantarme a las siete.",
        ],
        answerIndex: 2,
        explanation:
          "*Levantarse* is reflexive, so the infinitive keeps a pronoun that matches the person: **voy a levantar*me***. (You could also say *me voy a levantar* — the pronoun can go in front instead.) *Voy a levantar* has no pronoun, so it means 'I'm going to lift (something)'. *Me voy a levantarme* uses the pronoun twice. *Voy a levanto* conjugates the infinitive.",
        difficulty: "core",
        guideRef: "forming-the-near-future",
        hints: [
          "Getting up is reflexive: *levantarse*. Which pronoun matches *yo*?",
          "The pronoun goes in ONE place only: either on the end of the infinitive or in front of *voy*.",
        ],
        strategy: "Check the subject",
      },
      {
        kind: "mcq",
        id: "futuro-inmediato-m1-q09",
        question: "What does *Va a llover mañana* mean?",
        options: ["It rains every morning.", "It's going to rain tomorrow.", "It's going to snow tomorrow.", "He's going to leave tomorrow."],
        answerIndex: 1,
        explanation:
          "*Va a* + *llover* (to rain) = 'it's going to rain'; *mañana* on its own = tomorrow → **It's going to rain tomorrow.** 'Every morning' would be *todas las mañanas* — and the present tense *llueve*. 'Snow' is *nevar*.",
        difficulty: "warmup",
        guideRef: "plans-and-predictions",
        hints: ["*Llover* is a weather verb. *Mañana* on its own (no *la*) means…?"],
        strategy: "Use the time phrase",
      },
      {
        kind: "mcq",
        id: "futuro-inmediato-m1-q10",
        question: "Which sentence describes a **routine** (present tense), not a plan in the near future?",
        options: [
          "Voy a nadar el sábado.",
          "Vamos a cenar fuera esta noche.",
          "Mañana van a jugar al baloncesto.",
          "Normalmente voy a la piscina los sábados.",
        ],
        answerIndex: 3,
        explanation:
          "In *Normalmente voy a la piscina*, *a* is followed by a **place** (*la piscina*), not an infinitive — so this is just 'I go to the pool', present tense. *Normalmente* and *los sábados* (every Saturday) confirm it's a routine. The other three have *ir a* + infinitive (*nadar, cenar, jugar*) — near future.",
        difficulty: "core",
        guideRef: "present-vs-future",
        hints: [
          "Every option contains a form of *ir* + *a*. Look at what comes straight after *a*.",
          "Is it an infinitive (*-ar/-er/-ir*) or a place? Then check the time phrase.",
        ],
        strategy: "Use the time phrase",
      },
      {
        kind: "mcq",
        id: "futuro-inmediato-m1-q11",
        question:
          "Read Wei Ling's message.\n\n> Hola, soy Wei Ling. Este fin de semana voy a estar muy ocupada. El sábado por la mañana voy a jugar al bádminton con mi hermano en el polideportivo. Por la tarde mis amigos y yo vamos a ir al cine en Orchard. El domingo no voy a salir porque va a llover mucho. Voy a quedarme en casa y voy a hacer los deberes. ¡Qué aburrido!\n\nWhat is Wei Ling going to do on **Saturday afternoon**?",
        options: [
          "Go to the cinema with her friends.",
          "Play badminton with her brother.",
          "Stay at home and do her homework.",
          "Go shopping in Orchard.",
        ],
        answerIndex: 0,
        explanation:
          "*Por la tarde mis amigos y yo vamos a ir al cine* = in the afternoon my friends and I are going to go to the cinema. Badminton is *el sábado por la mañana* (morning), and staying at home is Sunday (*el domingo… voy a quedarme en casa*). Orchard is mentioned, but for the cinema, not shopping.",
        difficulty: "core",
        guideRef: "plans-and-predictions",
        hints: [
          "Find *sábado* in the text, then look for *por la tarde* (afternoon).",
          "*Ir al cine* — what is *el cine*?",
        ],
        strategy: "Use the time phrase",
      },
      {
        kind: "mcq",
        id: "futuro-inmediato-m1-q12",
        question:
          "Read Javier's plans.\n\n> En agosto mi familia y yo vamos a ir a Málaga. Vamos a viajar en tren porque a mi madre no le gusta volar. Mi hermana Carmen va a nadar en el mar todos los días, pero yo no voy a nadar mucho: voy a leer en la playa y voy a comer helados. Mis padres van a visitar museos. Creo que va a hacer mucho calor.\n\nWhy is the family travelling by train?",
        options: [
          "Because it is cheaper than flying.",
          "Because Javier doesn't like flying.",
          "Because his mother doesn't like flying.",
          "Because the train is faster.",
        ],
        answerIndex: 2,
        explanation:
          "*Porque a mi madre no le gusta volar* = because my mother doesn't like flying. *A mi madre* tells you **who** doesn't like it — not Javier. Price and speed aren't mentioned at all.",
        difficulty: "core",
        guideRef: "plans-and-predictions",
        hints: [
          "Find *tren*, then read the reason after *porque*.",
          "*A mi madre no le gusta…* — whose opinion is it?",
        ],
        strategy: "Use context",
      },
      {
        kind: "mcq",
        id: "futuro-inmediato-m1-q13",
        question:
          "Read Diego's message to Sofía.\n\n> ¡Hola, Sofía! ¿Qué vas a hacer el sábado que viene? Mi primo Ravi y yo vamos a ir al parque de atracciones. Vamos a salir de casa a las diez y vamos a volver a las siete. ¿Quieres venir con nosotros? Va a ser genial porque hay una montaña rusa nueva. Mi madre va a pagar las entradas. ¡Contéstame pronto! Diego\n\nWhy does Diego think the day is going to be great?",
        options: [
          "Because his mother is going to pay for the tickets.",
          "Because there is a new rollercoaster.",
          "Because his cousin Ravi is going too.",
          "Because they are coming home at seven.",
        ],
        answerIndex: 1,
        explanation:
          "*Va a ser genial porque hay una montaña rusa nueva* — the reason comes straight after *porque*: there's a new rollercoaster. His mother paying is true, but Diego doesn't give it as the reason it will be great.",
        difficulty: "core",
        guideRef: "plans-and-predictions",
        hints: [
          "Find the opinion *va a ser genial*.",
          "The reason always follows *porque*. What is *una montaña rusa*? (Think of its shape.)",
        ],
        strategy: "Use context",
      },
      {
        kind: "mcq",
        id: "futuro-inmediato-m1-q14",
        question: "Your exchange partner writes: *Mañana juego al fútbol con Pablo.* Which statement about this sentence is true?",
        options: [
          "It's wrong: the present tense can never talk about the future.",
          "It describes something Pablo does every day.",
          "It means 'Yesterday I played football with Pablo.'",
          "It's correct: with a time phrase like *mañana*, the present tense can describe a fixed plan.",
        ],
        answerIndex: 3,
        explanation:
          "Spanish (like English 'I'm playing football tomorrow') often uses the **present tense + a future time phrase** for a fixed, arranged plan. *Mañana* makes the time frame clear. It's not wrong, it's *yo* (*juego*), not Pablo, and 'yesterday' would be *ayer* with the preterite *jugué*.",
        difficulty: "challenge",
        guideRef: "present-vs-future",
        hints: [
          "Which word tells you WHEN this happens?",
          "Think of English: 'I'm playing football tomorrow' — present form, future meaning. Can Spanish do the same?",
          "Check who the subject of *juego* is: the *-o* ending means…?",
        ],
        strategy: "Use the time phrase",
      },
      {
        kind: "mcq",
        id: "futuro-inmediato-m1-q15",
        question: "Which sentence contains a mistake?",
        options: [
          "Mis amigos va a jugar al baloncesto.",
          "Mi hermano va a ducharse.",
          "¿Vais a venir a la fiesta?",
          "Nos vamos a acostar tarde.",
        ],
        answerIndex: 0,
        explanation:
          "*Mis amigos* is plural (= *ellos*), so it needs **van**: *Mis amigos van a jugar al baloncesto.* The others are all correct: *va a ducharse* (pronoun *se* for *él*), *vais a venir* (*vosotros*), and *nos vamos a acostar* (the reflexive pronoun *nos* placed in front of *vamos*).",
        difficulty: "challenge",
        guideRef: "forming-the-near-future",
        hints: [
          "Check each subject against its form of *ir*.",
          "Plural nouns like *mis amigos* need a plural verb.",
          "*Nos vamos a acostar* looks odd — but the reflexive pronoun is allowed in front of *ir*.",
        ],
        strategy: "Agreement check",
      },
    ],
  },

  // ============================== MCQ PAPER 2 ==============================
  {
    id: "futuro-inmediato-m2",
    title: "MCQ Paper 2",
    questions: [
      {
        kind: "mcq",
        id: "futuro-inmediato-m2-q01",
        question: "Your Spanish friend asks: *¿Adónde vas?* What is the question?",
        options: ["Where do you live?", "Where are you going?", "When are you going?", "Who are you going with?"],
        answerIndex: 1,
        explanation:
          "*Adónde* = *a + dónde* = 'to where', and *vas* = you go / you're going → **Where are you going?** 'Where do you live?' is *¿Dónde vives?*, 'when' is *cuándo* and 'with whom' is *con quién*.",
        difficulty: "warmup",
        guideRef: "ir-present",
        hints: ["Split *adónde* into two words: *a* + *dónde*. Then which verb is *vas*?"],
        strategy: "Find the infinitive",
      },
      {
        kind: "mcq",
        id: "futuro-inmediato-m2-q02",
        question: "Complete the sentence: *Vosotros ___ al instituto en autobús.*",
        options: ["vais", "vas", "van", "váis"],
        answerIndex: 0,
        explanation:
          "The *vosotros* form of *ir* is **vais** — no accent, because it's a one-syllable word. (Compare *habláis*, which needs one.) *Vas* is *tú* and *van* is *ellos*.",
        difficulty: "warmup",
        guideRef: "ir-present",
        hints: ["*Vosotros* forms end in *-is*. Does a one-syllable word need a written accent?"],
        strategy: "Mind the accent",
      },
      {
        kind: "mcq",
        id: "futuro-inmediato-m2-q03",
        question: "Which sentence is correct?",
        options: [
          "Voy al playa con mi familia.",
          "Voy a el playa con mi familia.",
          "Voy a la playa con mi familia.",
          "Voy a playa con mi familia.",
        ],
        answerIndex: 2,
        explanation:
          "*Playa* is feminine (*la playa*), and *a + la* does **not** contract: **a la playa**. *Al* only comes from *a + el* (masculine). *Voy a el playa* has the wrong article, and *voy a playa* leaves the article out — Spanish needs it here.",
        difficulty: "core",
        guideRef: "ir-present",
        hints: ["Is it *el playa* or *la playa*?", "Only *a + el* squashes into *al*. What about *a + la*?"],
        strategy: "Gender detective (el/la)",
      },
      {
        kind: "mcq",
        id: "futuro-inmediato-m2-q04",
        question: "In the sentence *Ella va a comer una ensalada*, which word is the infinitive?",
        options: ["ella", "va", "a", "comer"],
        answerIndex: 3,
        explanation:
          "The infinitive is the 'to…' form ending in *-ar, -er* or *-ir*: **comer** (to eat). *Va* is the conjugated form of *ir* that tells you who and when; *a* is the link word.",
        difficulty: "warmup",
        guideRef: "forming-the-near-future",
        hints: ["Infinitives end in *-ar*, *-er* or *-ir* and are never conjugated."],
        strategy: "Find the infinitive",
      },
      {
        kind: "mcq",
        id: "futuro-inmediato-m2-q05",
        question: "How do you ask a friend 'What are you going to do tomorrow?'",
        options: ["¿Qué vas a hacer mañana?", "¿Qué va a haces mañana?", "¿Qué vas hacer mañana?", "¿Qué vas a hago mañana?"],
        answerIndex: 0,
        explanation:
          "*Tú* form of *ir* + *a* + the infinitive *hacer*: **¿Qué vas a hacer mañana?** *Vas hacer* loses the *a* (they sound almost the same when spoken fast — so write it carefully!). *Haces* and *hago* are conjugated forms; after *a* you need the infinitive.",
        difficulty: "core",
        guideRef: "forming-the-near-future",
        hints: [
          "'You' (one friend) = *tú*. Which form of *ir* goes with *tú*?",
          "After *a*, the second verb is always the infinitive.",
        ],
        strategy: "Find the infinitive",
      },
      {
        kind: "mcq",
        id: "futuro-inmediato-m2-q06",
        question: "Which sentence correctly says 'We are going to go to bed late'?",
        options: [
          "Vamos a acostarse tarde.",
          "Vamos a acostarnos tarde.",
          "Vamos a nos acostar tarde.",
          "Nos vamos a acostarnos tarde.",
        ],
        answerIndex: 1,
        explanation:
          "The reflexive pronoun must match the subject: *nosotros* → **nos**, attached to the infinitive: *vamos a acostar**nos***. *Acostarse* is just the dictionary form — *se* is wrong for 'we'. The pronoun can't sit between *a* and the infinitive, and it can't appear twice.",
        difficulty: "core",
        guideRef: "forming-the-near-future",
        hints: [
          "Which reflexive pronoun goes with *nosotros*: *me, te, se, nos* or *os*?",
          "The pronoun goes either on the end of the infinitive or in front of *vamos* — never in the middle, never twice.",
        ],
        strategy: "Check the subject",
      },
      {
        kind: "mcq",
        id: "futuro-inmediato-m2-q07",
        question: "What does *la semana que viene* mean?",
        options: ["this week", "last week", "next week", "every week"],
        answerIndex: 2,
        explanation:
          "*Que viene* = 'that is coming' → **next week**. 'This week' is *esta semana*, 'last week' is *la semana pasada* and 'every week' is *todas las semanas*.",
        difficulty: "warmup",
        guideRef: "future-time-phrases",
        hints: ["*Viene* comes from *venir* (to come). The week 'that is coming' is…?"],
        strategy: "Find the infinitive",
      },
      {
        kind: "mcq",
        id: "futuro-inmediato-m2-q08",
        question: "Which is a correct translation of 'next year'?",
        options: ["el año pasado", "este año", "el nuevo año", "el año que viene"],
        answerIndex: 3,
        explanation:
          "**El año que viene** (or *el próximo año*) = next year. *El año pasado* = last year, *este año* = this year. *El nuevo año* copies English word order and doesn't mean 'next year' (New Year is *Año Nuevo*).",
        difficulty: "core",
        guideRef: "future-time-phrases",
        hints: ["Look for the phrase meaning 'that is coming'.", "Watch out for English word order — and for *pasado*."],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "futuro-inmediato-m2-q09",
        question: "What does *Va a ser divertido* mean?",
        options: ["It was fun.", "It's going to be fun.", "He's going to have fun.", "It's always fun."],
        answerIndex: 1,
        explanation:
          "*Va a* + *ser* (to be) + *divertido* (fun) → **It's going to be fun.** It's a prediction/opinion about something in the future. 'It was fun' is past (*fue divertido*) and 'he's going to have fun' is *se va a divertir*.",
        difficulty: "warmup",
        guideRef: "plans-and-predictions",
        hints: ["*Va a* + infinitive → going to… And *ser* means…?"],
        strategy: "Translate back to check",
      },
      {
        kind: "mcq",
        id: "futuro-inmediato-m2-q10",
        question: "Which time phrase tells you a sentence is about a **routine**, not a plan?",
        options: ["esta tarde", "mañana por la mañana", "todos los días", "el domingo que viene"],
        answerIndex: 2,
        explanation:
          "**Todos los días** (every day) describes something that happens regularly → present tense. *Esta tarde*, *mañana por la mañana* and *el domingo que viene* all point to one specific time ahead → near future.",
        difficulty: "core",
        guideRef: "present-vs-future",
        hints: [
          "A routine happens again and again. A plan happens once, at a specific time.",
          "Which phrase means 'every…'?",
        ],
        strategy: "Use the time phrase",
      },
      {
        kind: "mcq",
        id: "futuro-inmediato-m2-q11",
        question:
          "Read Aisha's post.\n\n> Me llamo Aisha y vivo en un piso en Tampines. En las vacaciones de diciembre voy a ir a Barcelona con mi familia. Mi padre va a visitar la Sagrada Familia, pero mi hermano y yo vamos a ir al estadio del Barça porque nos encanta el fútbol. No vamos a comer en restaurantes caros; vamos a comprar comida en el mercado. Va a hacer frío, así que voy a llevar un abrigo.\n\nWhat is Aisha going to take with her, and why?",
        options: [
          "A coat, because it's going to be cold.",
          "A football shirt, because she loves Barça.",
          "An umbrella, because it's going to rain.",
          "Money, because the restaurants are expensive.",
        ],
        answerIndex: 0,
        explanation:
          "*Va a hacer frío, así que voy a llevar un abrigo* = it's going to be cold, so I'm going to take a coat. *Así que* (so) links the prediction to the plan. Restaurants are mentioned, but she says they are **not** going to eat in expensive ones (*no vamos a comer en restaurantes caros*).",
        difficulty: "core",
        guideRef: "plans-and-predictions",
        hints: [
          "*Llevar* = to take / to wear. Find it in the last sentence.",
          "*Hacer frío* is a weather expression. What does it predict?",
        ],
        strategy: "Use context",
      },
      {
        kind: "mcq",
        id: "futuro-inmediato-m2-q12",
        question:
          "Read Pablo's message to his parents.\n\n> Esta noche no voy a cenar en casa. Normalmente ceno con vosotros a las nueve, pero hoy es el cumpleaños de mi amigo Arjun y vamos a ir a un restaurante vegetariano en el centro. Después vamos a ver una película. Voy a volver tarde, a eso de las once y media. ¡No voy a hacer ruido!\n\nWhich of these is Pablo's **normal routine**, not tonight's plan?",
        options: [
          "Having dinner with his parents at nine.",
          "Going to a vegetarian restaurant.",
          "Watching a film.",
          "Coming home at about half past eleven.",
        ],
        answerIndex: 0,
        explanation:
          "*Normalmente ceno con vosotros a las nueve* — *normalmente* + the present tense *ceno* = his routine. Everything else is tonight's plan, in the near future: *vamos a ir*, *vamos a ver*, *voy a volver*.",
        difficulty: "core",
        guideRef: "present-vs-future",
        hints: [
          "Look for a routine time phrase such as *normalmente*.",
          "Which verb in the message is in the present tense rather than *ir a* + infinitive?",
        ],
        strategy: "Use the time phrase",
      },
      {
        kind: "mcq",
        id: "futuro-inmediato-m2-q13",
        question:
          "Read Hana's diary.\n\n> Mañana es el examen de español y estoy muy nerviosa. Esta tarde voy a repasar el vocabulario y mi madre va a ayudarme con los verbos. No voy a ver la tele y no voy a jugar con el móvil. Esta noche voy a acostarme temprano, a las nueve y media, porque mañana voy a levantarme a las seis. Creo que el examen va a ser difícil, pero voy a estar preparada.\n\nWhich statement is **true**?",
        options: [
          "Hana is going to revise with her mother tomorrow morning.",
          "Hana thinks the exam is going to be easy.",
          "Hana is going to go to bed early because she's getting up at six.",
          "Hana is going to watch TV to relax.",
        ],
        answerIndex: 2,
        explanation:
          "*Voy a acostarme temprano… porque mañana voy a levantarme a las seis* — early to bed because she's getting up at six. She revises **this afternoon** (*esta tarde*), not tomorrow; she thinks it will be **difficult** (*difícil*); and *no voy a ver la tele* means she's NOT going to watch TV.",
        difficulty: "challenge",
        guideRef: "forming-the-near-future",
        hints: [
          "Check each statement against the text — one detail is usually wrong in each false one.",
          "Look carefully at the time phrases (*esta tarde*, *esta noche*, *mañana*) and at every *no*.",
          "*Acostarse* = to go to bed, *levantarse* = to get up.",
        ],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "futuro-inmediato-m2-q14",
        question:
          "Read the messages.\n\n> **Zara:** ¡Hola, Marcus! El sábado que viene voy a hacer una fiesta en mi casa para mi cumpleaños. Va a empezar a las siete. Vamos a bailar y vamos a comer pizza. ¿Quieres venir?\n> **Marcus:** ¡Qué guay! Me encantaría, pero el sábado voy a estar en Kuala Lumpur con mis padres. Vamos a volver el domingo por la noche. ¿Vamos al cine el lunes?\n\nWhat does Marcus do?",
        options: [
          "He accepts the invitation and offers to bring pizza.",
          "He turns down the invitation and suggests another plan.",
          "He accepts, but says he will arrive late.",
          "He turns it down because he doesn't like parties.",
        ],
        answerIndex: 1,
        explanation:
          "*Me encantaría, pero…* = I'd love to, but… — a polite **no**, because he's going to be in Kuala Lumpur. Then *¿Vamos al cine el lunes?* (Shall we go to the cinema on Monday?) suggests another plan. He's positive about the party (*¡Qué guay!*), so 'doesn't like parties' is wrong.",
        difficulty: "core",
        guideRef: "plans-and-predictions",
        hints: [
          "*Me encantaría* = I'd love to. What does *pero* (but) suggest comes next?",
          "Look at Marcus's last question. Is it a new idea?",
        ],
        strategy: "Use context",
      },
      {
        kind: "mcq",
        id: "futuro-inmediato-m2-q15",
        question: "Which sentence correctly turns *Los sábados juego al tenis con mi padre* into a plan for **this** Saturday?",
        options: [
          "Los sábados voy a jugar al tenis con mi padre.",
          "Este sábado voy jugar al tenis con mi padre.",
          "Este sábado jugué al tenis con mi padre.",
          "Este sábado voy a jugar al tenis con mi padre.",
        ],
        answerIndex: 3,
        explanation:
          "You must change **both** the verb and the time phrase: *los sábados* (every Saturday) → **este sábado**, and *juego* → **voy a jugar**. Keeping *los sábados* still sounds like a routine. *Voy jugar* is missing *a*. *Jugué* is the preterite (past): 'I played'.",
        difficulty: "challenge",
        guideRef: "present-vs-future",
        hints: [
          "Two things must change: the verb AND the time phrase.",
          "*Los sábados* = every Saturday. What's 'this Saturday'?",
          "Check the verb has all three parts: *voy + a + infinitive*.",
        ],
        strategy: "Use the time phrase",
      },
    ],
  },

  // ============================== MCQ PAPER 3 ==============================
  {
    id: "futuro-inmediato-m3",
    title: "MCQ Paper 3",
    questions: [
      {
        kind: "mcq",
        id: "futuro-inmediato-m3-q01",
        question: "Which subject goes with *van*?",
        options: ["yo", "tú", "nosotros", "mis amigos"],
        answerIndex: 3,
        explanation:
          "*Van* is the *ellos/ellas* form of *ir*, so it goes with a plural noun like **mis amigos** (= *ellos*). *Yo* → *voy*, *tú* → *vas*, *nosotros* → *vamos*.",
        difficulty: "warmup",
        guideRef: "ir-present",
        hints: ["Run through *ir*: *voy, vas, va, vamos, vais, van*. Which person comes last?"],
        strategy: "Check the subject",
      },
      {
        kind: "mcq",
        id: "futuro-inmediato-m3-q02",
        question: "Your exchange partner asks you and your sister: *¿Adónde vais esta tarde?* Which reply is correct?",
        options: ["Vais al centro comercial.", "Vamos al centro comercial.", "Van al centro comercial.", "Voy al centro comercial."],
        answerIndex: 1,
        explanation:
          "They ask *vosotros* (you two), so you answer for 'my sister and I' = *nosotros* → **vamos**. Replying with *vais* just repeats their verb. *Voy* would only be about you, not your sister too.",
        difficulty: "core",
        guideRef: "ir-present",
        hints: [
          "The question uses *vosotros*. When you answer, who is the subject?",
          "'My sister and I' = which pronoun?",
        ],
        strategy: "Check the subject",
      },
      {
        kind: "mcq",
        id: "futuro-inmediato-m3-q03",
        question: "Complete the sentence: *Tú ___ a escuchar música.*",
        options: ["vas", "va", "vais", "voy"],
        answerIndex: 0,
        explanation:
          "*Tú* forms almost always end in *-s*: **vas**. *Va* is *él/ella/usted*, *vais* is *vosotros* and *voy* is *yo*.",
        difficulty: "warmup",
        guideRef: "forming-the-near-future",
        hints: ["Most *tú* verb forms end in the same letter. Which one?"],
        strategy: "Look for the pattern",
      },
      {
        kind: "mcq",
        id: "futuro-inmediato-m3-q04",
        question: "Which sentence means 'Who is going to cook tonight?'",
        options: [
          "¿Quién vas a cocinar esta noche?",
          "¿Quién va cocinar esta noche?",
          "¿Quién va a cocinar esta noche?",
          "¿Quién voy a cocinar esta noche?",
        ],
        answerIndex: 2,
        explanation:
          "*¿Quién?* (who?) takes the **third person singular**, like *él/ella*: **¿Quién va a cocinar?** *¿Quién vas…?* uses the *tú* form — tempting because you're asking someone, but the subject is 'who', not 'you'. *Va cocinar* is missing *a*.",
        difficulty: "core",
        guideRef: "forming-the-near-future",
        hints: [
          "In English: 'Who **is** going…' — the same person as 'he is'.",
          "So which form of *ir* matches *él/ella*? And don't forget *a*.",
        ],
        strategy: "Check the subject",
      },
      {
        kind: "mcq",
        id: "futuro-inmediato-m3-q05",
        question: "*Me voy a duchar* can also be written as…",
        options: ["Voy a me duchar.", "Voy a ducharme.", "Voy a duchar.", "Me voy a ducharme."],
        answerIndex: 1,
        explanation:
          "The reflexive pronoun goes **either** in front of *ir* (*me voy a duchar*) **or** joined to the end of the infinitive (**voy a ducharme**). It can't sit between *a* and the infinitive, it can't be dropped (*voy a duchar* would mean showering someone else!), and it can't appear twice.",
        difficulty: "core",
        guideRef: "forming-the-near-future",
        hints: [
          "There are exactly two correct places for *me*.",
          "One of them is stuck onto the end of the infinitive.",
        ],
        strategy: "Look for the pattern",
      },
      {
        kind: "mcq",
        id: "futuro-inmediato-m3-q06",
        question: "Which phrase means 'this afternoon / this evening'?",
        options: ["esta noche", "mañana por la tarde", "por la mañana", "esta tarde"],
        answerIndex: 3,
        explanation:
          "**Esta tarde** = this afternoon / early evening (Spaniards use *tarde* until about 8–9 pm). *Esta noche* = tonight, *mañana por la tarde* = tomorrow afternoon, *por la mañana* = in the morning.",
        difficulty: "warmup",
        guideRef: "future-time-phrases",
        hints: ["*Esta* = this. Which part of the day is *la tarde*?"],
        strategy: "Use the time phrase",
      },
      {
        kind: "mcq",
        id: "futuro-inmediato-m3-q07",
        question: "Put these time phrases in order from **soonest** to **latest**: *el mes que viene, pasado mañana, esta noche, mañana*.",
        options: [
          "esta noche → mañana → pasado mañana → el mes que viene",
          "mañana → esta noche → pasado mañana → el mes que viene",
          "esta noche → pasado mañana → mañana → el mes que viene",
          "pasado mañana → mañana → esta noche → el mes que viene",
        ],
        answerIndex: 0,
        explanation:
          "Tonight (*esta noche*) → tomorrow (*mañana*) → the day after tomorrow (*pasado mañana*) → next month (*el mes que viene*). The trap is reading *pasado* as 'past' and putting *pasado mañana* first.",
        difficulty: "core",
        guideRef: "future-time-phrases",
        hints: [
          "Translate each phrase into English first.",
          "*Pasado mañana* = 'when tomorrow has passed'. Is that before or after *mañana*?",
        ],
        strategy: "Translate back to check",
      },
      {
        kind: "mcq",
        id: "futuro-inmediato-m3-q08",
        question: "Which sentence is a **prediction about the weather**?",
        options: ["Voy a hacer los deberes.", "Hace sol todos los días.", "Va a hacer sol.", "Vamos a hacer un pícnic."],
        answerIndex: 2,
        explanation:
          "**Va a hacer sol** = it's going to be sunny — a weather prediction in the near future. *Hace sol todos los días* is about weather, but it's present tense (a general fact). The other two use *hacer* for activities, not weather.",
        difficulty: "warmup",
        guideRef: "plans-and-predictions",
        hints: ["Two things: it must be about the weather AND about the future."],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "futuro-inmediato-m3-q09",
        question: "Complete: 'The concert is going to be amazing.' → *El concierto ___ increíble.*",
        options: ["vas a ser", "va a ser", "va ser", "van a ser"],
        answerIndex: 1,
        explanation:
          "*El concierto* is singular (= *él*), so **va a ser**. *Van a ser* would need a plural subject (*los conciertos*). *Vas* is *tú*, and *va ser* is missing *a*.",
        difficulty: "core",
        guideRef: "plans-and-predictions",
        hints: [
          "What is the subject — one concert or several?",
          "Then check all three parts: *ir* + *a* + *ser*.",
        ],
        strategy: "Agreement check",
      },
      {
        kind: "mcq",
        id: "futuro-inmediato-m3-q10",
        question: "Turn into the near future: *Mi hermana hace los deberes.*",
        options: [
          "Mi hermana va a hace los deberes.",
          "Mi hermana voy a hacer los deberes.",
          "Mi hermana va hacer los deberes.",
          "Mi hermana va a hacer los deberes.",
        ],
        answerIndex: 3,
        explanation:
          "Keep the person (*ella* → *va*), add *a*, and turn *hace* back into its infinitive *hacer*: **va a hacer**. *Va hacer* sounds almost the same when spoken, but in writing the *a* must be there. *Va a hace* keeps the conjugated form; *voy* is *yo*, not *mi hermana*.",
        difficulty: "core",
        guideRef: "present-vs-future",
        hints: [
          "Find the infinitive of *hace*.",
          "The form of *ir* must match *mi hermana* — and don't lose the *a*.",
        ],
        strategy: "Find the infinitive",
      },
      {
        kind: "mcq",
        id: "futuro-inmediato-m3-q11",
        question:
          "Read Arjun's email to his exchange partner.\n\n> ¡Hola, Diego! En julio vas a venir a Singapur y vamos a hacer muchas cosas. El primer día vamos a comer en un *hawker centre* cerca de mi casa: tienen un *roti prata* buenísimo. Después vamos a coger el MRT hasta Marina Bay. No vamos a ir a la playa porque en julio llueve mucho por la tarde. Mi hermana Priya va a enseñarte a jugar al críquet. ¡Va a ser una semana genial! Un abrazo, Arjun\n\nWhy are they **not** going to go to the beach?",
        options: [
          "Because it often rains in the afternoon in July.",
          "Because Diego doesn't like the sea.",
          "Because they are going to Marina Bay instead.",
          "Because Priya is going to teach Diego cricket.",
        ],
        answerIndex: 0,
        explanation:
          "*No vamos a ir a la playa porque en julio llueve mucho por la tarde* — because in July it rains a lot in the afternoon. Notice *llueve* is present tense: it's a general fact about July, not a plan. Marina Bay and cricket are other plans, not reasons.",
        difficulty: "core",
        guideRef: "plans-and-predictions",
        hints: [
          "Find *playa* and read on to *porque*.",
          "*Llueve* comes from *llover*. What does it mean?",
        ],
        strategy: "Use context",
      },
      {
        kind: "mcq",
        id: "futuro-inmediato-m3-q12",
        question:
          "Read Lucía's plans.\n\n> En el futuro voy a estudiar medicina en la universidad de Sevilla porque quiero ayudar a la gente. Mi hermano mayor, Javier, va a ser profesor de música. Mis padres dicen que voy a trabajar mucho, pero no me importa. Primero, el año que viene, voy a aprender inglés en Londres durante el verano. ¡Va a ser una experiencia increíble!\n\nWhat is Lucía going to do **first**, next year?",
        options: [
          "Study medicine in Seville.",
          "Become a music teacher.",
          "Learn English in London in the summer.",
          "Work a lot to help people.",
        ],
        answerIndex: 2,
        explanation:
          "*Primero, el año que viene, voy a aprender inglés en Londres durante el verano* — first, next year, she'll learn English in London. Medicine is *en el futuro* (later on). The music teacher is her brother Javier.",
        difficulty: "core",
        guideRef: "future-time-phrases",
        hints: [
          "Find *primero* (first) and *el año que viene*.",
          "*En el futuro* is vaguer and further away than *el año que viene*.",
        ],
        strategy: "Use the time phrase",
      },
      {
        kind: "mcq",
        id: "futuro-inmediato-m3-q13",
        question:
          "Read the text.\n\n> Normalmente, los domingos me levanto a las diez y desayuno churros con mi abuela. Después juego al fútbol en el parque. Pero este domingo va a ser diferente: me voy a levantar a las seis porque vamos a ir a la sierra con el instituto. Vamos a hacer senderismo y vamos a comer bocadillos de tortilla en la montaña.\n\nHow is this Sunday going to be different?",
        options: [
          "The writer is going to stay in bed until ten.",
          "The writer is going to get up much earlier.",
          "The writer is going to have churros with his grandmother.",
          "The writer is going to play football in the park.",
        ],
        answerIndex: 1,
        explanation:
          "*Me voy a levantar a las seis* (this Sunday) vs *me levanto a las diez* (normally) → much earlier. Churros, football and getting up at ten are all in the present tense after *normalmente* — that's the usual routine, not this Sunday's plan.",
        difficulty: "core",
        guideRef: "present-vs-future",
        hints: [
          "Split the text: what's after *normalmente* and what's after *este domingo*?",
          "Which verbs are in the near future (*voy a / vamos a*)?",
        ],
        strategy: "Use the time phrase",
      },
      {
        kind: "mcq",
        id: "futuro-inmediato-m3-q14",
        question:
          "Read Carmen's message.\n\n> Mañana mis primos de Valencia van a venir a casa. Mi madre va a preparar una paella de verduras enorme y mi padre va a limpiar toda la casa. Yo voy a ordenar mi dormitorio, pero mi hermano pequeño no va a hacer nada, como siempre. Por la tarde, si no llueve, vamos a ir todos a la playa.\n\nWhat can you work out about Carmen's little brother?",
        options: [
          "He usually doesn't help at home.",
          "He is going to clean the whole house.",
          "He doesn't like his cousins.",
          "He is going to cook the paella.",
        ],
        answerIndex: 0,
        explanation:
          "*No va a hacer nada, como siempre* = he's not going to do anything, **as always** — so he normally doesn't help either. Cleaning the house is the father and the paella is the mother. Nothing is said about whether he likes his cousins.",
        difficulty: "challenge",
        guideRef: "plans-and-predictions",
        hints: [
          "Find *mi hermano pequeño*. What is he going to do?",
          "Now look at the two words after the comma. What does *como siempre* add?",
          "Eliminate the jobs that belong to other family members.",
        ],
        strategy: "Use context",
      },
      {
        kind: "mcq",
        id: "futuro-inmediato-m3-q15",
        question:
          "A student wrote about next weekend:\n\n> El sábado que viene juego al tenis, voy a ir al cine y después voy a cenar con mi familia. El domingo voy a levanto tarde.\n\nWhich part contains a **real grammar mistake**?",
        options: ["juego al tenis", "voy a ir al cine", "voy a cenar con mi familia", "voy a levanto tarde"],
        answerIndex: 3,
        explanation:
          "*Voy a levanto* conjugates the second verb and drops the reflexive pronoun. It should be **voy a levantarme** (or *me voy a levantar*). *Juego al tenis* looks wrong but isn't: with *el sábado que viene*, the present tense can describe a fixed plan. *Voy a ir al cine* is correct — *ir* can be the infinitive after *voy a*.",
        difficulty: "challenge",
        guideRef: "present-vs-future",
        hints: [
          "Not every present tense is a mistake — a future time phrase can make the present mean the future.",
          "Check every *voy a*: is it followed by an infinitive?",
          "Getting up is reflexive. Is there a pronoun?",
        ],
        strategy: "Find the infinitive",
      },
    ],
  },
];
