import type { Paper } from "../../types.ts";

export const mcqPapers: Paper[] = [
  // ============================== MCQ PAPER 1 ==============================
  {
    id: "rutina-diaria-m1",
    title: "MCQ Paper 1",
    questions: [
      {
        kind: "mcq",
        id: "rutina-diaria-m1-q01",
        question: "Choose the correct Spanish for 'I get up'.",
        options: ["Me levanto.", "Yo levanto.", "Me levanta.", "Se levanto."],
        answerIndex: 0,
        explanation:
          "*Levantarse* is reflexive, so the *yo* form needs **me** + the *-o* ending: **me levanto**. *Yo levanto* drops the pronoun, so it means 'I lift (something)'. *Me levanta* has the *él/ella* ending, and *se levanto* mixes the *él* pronoun with the *yo* ending.",
        difficulty: "warmup",
        guideRef: "reflexive-verbs",
        hints: ["A reflexive verb needs a pronoun that matches the person. Which pronoun goes with *yo*?"],
        strategy: "Check the subject",
      },
      {
        kind: "mcq",
        id: "rutina-diaria-m1-q02",
        question: "What time is it? *Son las tres y media.*",
        options: ["3:15", "3:30", "2:30", "3:45"],
        answerIndex: 1,
        explanation:
          "*Las tres* = three o'clock, *y media* = and a half → **3:30**. *Y media* always counts forward from the hour you say, so it can't be 2:30. *Y cuarto* would be 3:15 and *las cuatro menos cuarto* would be 3:45.",
        difficulty: "warmup",
        guideRef: "telling-the-time",
        hints: ["*Y* means you add minutes on to the hour. How much is *media* (a half) of an hour?"],
        strategy: "Use the time phrase",
      },
      {
        kind: "mcq",
        id: "rutina-diaria-m1-q03",
        question: "Which sequencer means 'finally' and is used for the last step of a routine?",
        options: ["primero", "luego", "después", "finalmente"],
        answerIndex: 3,
        explanation:
          "**Finalmente** is a cognate of 'finally' — it closes the sequence. *Primero* means 'first', and *luego* and *después* both mean 'then / afterwards', so they belong in the middle of a routine.",
        difficulty: "warmup",
        guideRef: "morning-routine",
        hints: ["Look for a word that looks like an English word you know."],
        strategy: "Spot the cognate",
      },
      {
        kind: "mcq",
        id: "rutina-diaria-m1-q04",
        question: "Complete the sentence: *Normalmente ___ de casa a las ocho.* (I leave)",
        options: ["sale", "salo", "salgo", "salimos"],
        answerIndex: 2,
        explanation:
          "*Salir* has an irregular *yo* form with a **g**: **salgo** (like *hago* and *pongo*). *Salo* is the tempting regular-pattern mistake. *Sale* is 'he/she leaves' and *salimos* is 'we leave'.",
        difficulty: "core",
        guideRef: "stem-changes-and-irregular-yo",
        hints: [
          "The subject is 'I' — you need the *yo* form of *salir*.",
          "*Salir* belongs to the small group of verbs whose *yo* form adds a *g* (like *hacer* → *hago*).",
        ],
        strategy: "Find the infinitive",
      },
      {
        kind: "mcq",
        id: "rutina-diaria-m1-q05",
        question:
          "Read the text.\n\n> Me llamo Lucía y vivo en Madrid. Los días de colegio me despierto a las siete menos cuarto, pero no me levanto hasta las siete. Primero me ducho y me visto. Luego desayuno tostadas con tomate y un zumo de naranja. Salgo de casa a las ocho menos diez. Normalmente voy al colegio en metro con mi amiga Sofía, pero cuando llueve mi padre me lleva en coche. Llego al colegio a las ocho y cuarto.\n\nHow does Lucía **usually** get to school?",
        options: ["By car with her father", "By metro with her friend Sofía", "On foot with Sofía", "By bus with her father"],
        answerIndex: 1,
        explanation:
          "*Normalmente voy al colegio en metro con mi amiga Sofía* → **by metro with Sofía**. Her father only takes her by car *cuando llueve* (when it rains), so 'by car with her father' is the exception, not the usual journey.",
        difficulty: "core",
        guideRef: "morning-routine",
        hints: [
          "Find the word *normalmente* in the text.",
          "Read the whole sentence: what does *pero cuando llueve* change?",
        ],
        strategy: "Use context",
      },
      {
        kind: "mcq",
        id: "rutina-diaria-m1-q06",
        question: "Choose the missing pronoun: *Mis hermanos ___ duchan por la mañana.*",
        options: ["se", "os", "me", "nos"],
        answerIndex: 0,
        explanation:
          "*Mis hermanos* = they (*ellos*), and the verb *duchan* has the *ellos* ending, so the pronoun is **se**: *se duchan*. *Os* goes with *vosotros* (*os ducháis*) and *nos* with *nosotros* (*nos duchamos*).",
        difficulty: "core",
        guideRef: "reflexive-verbs",
        hints: [
          "Who is doing the action — 'I', 'we' or 'they'?",
          "The pronouns run *me, te, se, nos, os, se*. Which one matches *ellos*?",
        ],
        strategy: "Check the subject",
      },
      {
        kind: "mcq",
        id: "rutina-diaria-m1-q07",
        question: "How do you say 'at quarter to nine' in Spanish?",
        options: ["a las nueve y cuarto", "son las nueve menos cuarto", "a las nueve menos cuarto", "a las ocho menos cuarto"],
        answerIndex: 2,
        explanation:
          "'Quarter to nine' = nine **minus** a quarter → *las nueve menos cuarto*, and 'at' = *a las*: **a las nueve menos cuarto**. *Son las…* means 'it is…', not 'at'. *Las ocho menos cuarto* is 7:45 — Spanish names the hour you are heading towards.",
        difficulty: "core",
        guideRef: "telling-the-time",
        hints: [
          "'At' a time is *a las*; 'it is' a time is *son las*.",
          "For 'quarter to', start from the hour you are going towards and subtract: *menos cuarto*.",
        ],
        strategy: "Use the time phrase",
      },
      {
        kind: "mcq",
        id: "rutina-diaria-m1-q08",
        question: "Choose the correct Spanish for 'Before having dinner, I do my homework.'",
        options: [
          "Antes de ceno, hago los deberes.",
          "Antes cenar, hago los deberes.",
          "Después de cenar, hago los deberes.",
          "Antes de cenar, hago los deberes.",
        ],
        answerIndex: 3,
        explanation:
          "After *antes de* (before) Spanish uses the **infinitive**: *antes de cenar* — literally 'before to have dinner'. *Antes de ceno* uses a conjugated verb, *antes cenar* drops the *de*, and *después de* means 'after', not 'before'.",
        difficulty: "core",
        guideRef: "evening-routine",
        hints: [
          "Which phrase means 'before' — *antes de* or *después de*?",
          "After *antes de* / *después de*, is the verb conjugated or left as the infinitive?",
        ],
        strategy: "Look for the pattern",
      },
      {
        kind: "mcq",
        id: "rutina-diaria-m1-q09",
        question: "Choose the correct Spanish for 'My parents go to bed at eleven.'",
        options: [
          "Mis padres se acostan a las once.",
          "Mis padres se acuestan a las once.",
          "Mis padres me acuesto a las once.",
          "Mis padres se acuesta a las once.",
        ],
        answerIndex: 1,
        explanation:
          "*Acostarse* is an o→ue boot verb, and *ellos* is inside the boot: **se acuestan**. *Se acostan* forgets the stem change, *se acuesta* is the singular *él/ella* form, and *me acuesto* is the *yo* form.",
        difficulty: "core",
        guideRef: "someone-elses-routine",
        hints: [
          "*Mis padres* = they. Which pronoun and which ending go with *ellos*?",
          "*Acostarse* is a boot verb (o→ue). Is the *ellos* form inside or outside the boot?",
        ],
        strategy: "Agreement check",
      },
      {
        kind: "mcq",
        id: "rutina-diaria-m1-q10",
        question:
          "Read the text.\n\n> Soy Javier. Vuelvo a casa a las cinco de la tarde. Primero meriendo un bocadillo de queso y luego hago los deberes en mi dormitorio. Después de hacer los deberes, juego con el móvil o leo un libro. Ceno con mi familia a las nueve y media de la noche, porque en España cenamos tarde. Antes de acostarme, me lavo los dientes. Me acuesto a las once.\n\nWhat does Javier do **straight after** his afternoon snack?",
        options: ["He plays on his phone.", "He reads a book.", "He does his homework in his bedroom.", "He has dinner with his family."],
        answerIndex: 2,
        explanation:
          "*Primero meriendo… y luego hago los deberes en mi dormitorio* → straight after the snack he **does his homework**. Playing on his phone or reading comes *después de hacer los deberes* — after the homework, not after the snack.",
        difficulty: "core",
        guideRef: "evening-routine",
        hints: [
          "*Merendar* = to have an afternoon snack. Find *meriendo* in the text.",
          "Which sequencer comes right after *meriendo*?",
        ],
        strategy: "Use context",
      },
      {
        kind: "mcq",
        id: "rutina-diaria-m1-q11",
        question:
          "Read the text.\n\n> Los fines de semana, Marcus no se levanta temprano. Se levanta a las diez y media. No se ducha por la mañana: desayuna churros en pijama y ve la tele en el salón. Por la tarde, va a la piscina con su hermano y vuelve a casa a las seis.\n\nAt what time does Marcus get up at the weekend?",
        options: ["At 10:00", "At 6:00", "At 9:30", "At 10:30"],
        answerIndex: 3,
        explanation:
          "*Se levanta a las diez y media* → **10:30**. *Y media* adds half an hour to *las diez*, so it is not 9:30. Six o'clock is when he comes home (*vuelve a casa a las seis*).",
        difficulty: "warmup",
        guideRef: "someone-elses-routine",
        hints: ["Find *se levanta* — the time comes straight after it."],
        strategy: "Use the time phrase",
      },
      {
        kind: "mcq",
        id: "rutina-diaria-m1-q12",
        question: "Choose the correct Spanish for 'we wake up'.",
        options: ["nos despertamos", "nos despiertamos", "nos despiertan", "os despertamos"],
        answerIndex: 0,
        explanation:
          "*Despertarse* is an e→ie boot verb, but *nosotros* is **outside the boot**, so the stem stays *despert-*: **nos despertamos**. *Nos despiertamos* wrongly changes the stem; *despiertan* is the *ellos* ending; *os* is the *vosotros* pronoun.",
        difficulty: "core",
        guideRef: "stem-changes-and-irregular-yo",
        hints: [
          "Which pronoun goes with *nosotros*?",
          "Picture the boot: *nosotros* and *vosotros* sit outside it. Does the stem change there?",
        ],
        strategy: "Look for the pattern",
      },
      {
        kind: "mcq",
        id: "rutina-diaria-m1-q13",
        question:
          "Read the text.\n\n> Me llamo Wei Ling y vivo en un piso HDB en Tampines. Mi hermano Jun y yo vamos al mismo colegio, pero nuestras rutinas son muy diferentes. Yo me levanto a las seis y cuarto porque tengo entrenamiento de natación antes de las clases. Jun se levanta a las siete menos diez, se viste en cinco minutos y no desayuna. Por la noche, yo me acuesto a las diez porque estoy cansada, pero Jun se acuesta a medianoche.\n\nWhich statement is supported by the text?",
        options: [
          "Jun gets up at ten to seven and has a quick breakfast.",
          "Wei Ling goes to bed later than her brother.",
          "Wei Ling gets up earlier because she has a sports session before lessons.",
          "Wei Ling and Jun go to different schools.",
        ],
        answerIndex: 2,
        explanation:
          "She gets up at 6:15 *porque tengo entrenamiento de natación antes de las clases* — swimming training before lessons. The Jun option is half right: *siete menos diez* is ten to seven, but *no desayuna* means he has **no** breakfast. She goes to bed at ten and he at midnight, and *vamos al mismo colegio* means the same school.",
        difficulty: "challenge",
        guideRef: "someone-elses-routine",
        hints: [
          "Check every part of each statement — one wrong detail makes the whole statement false.",
          "Look closely at *no desayuna* and *mismo*.",
          "Which statement is backed up by a *porque* clause in the text?",
        ],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "rutina-diaria-m1-q14",
        question: "Which sentence is correct for 'It's twenty past one'?",
        options: ["Son la una y veinte.", "Es la una y veinte.", "Son las una y veinte.", "Es las una y veinte."],
        answerIndex: 1,
        explanation:
          "One o'clock is singular — *la una* (one hour) — so it takes the singular verb and article: **Es la una y veinte**. Every other hour is plural (*son las dos, son las tres…*). *Son la una* and *son las una* use the plural verb, and *es las una* mixes a singular verb with a plural article.",
        difficulty: "challenge",
        guideRef: "telling-the-time",
        hints: [
          "Is 'one' singular or plural?",
          "The verb (*es/son*) and the article (*la/las*) must both agree with *una*.",
        ],
        strategy: "Agreement check",
      },
      {
        kind: "mcq",
        id: "rutina-diaria-m1-q15",
        question: "Three of these sentences are correct. Which one contains a mistake?",
        options: [
          "Me visto en mi dormitorio.",
          "Mi hermana se viste rápidamente.",
          "Nos vestimos para la fiesta.",
          "Me vesto después de ducharme.",
        ],
        answerIndex: 3,
        explanation:
          "*Vestirse* is an e→i boot verb: the *yo* form is **me visto**, so *me vesto* is wrong (it uses the infinitive stem). *Se viste* (inside the boot) and *nos vestimos* (outside the boot, so no change) are both correct.",
        difficulty: "challenge",
        guideRef: "stem-changes-and-irregular-yo",
        hints: [
          "All four sentences use *vestirse*. Which forms are inside the boot?",
          "*Vestirse* changes e→i inside the boot. Check the *yo* form carefully.",
        ],
        strategy: "Look for the pattern",
      },
    ],
  },
  // ============================== MCQ PAPER 2 ==============================
  {
    id: "rutina-diaria-m2",
    title: "MCQ Paper 2",
    questions: [
      {
        kind: "mcq",
        id: "rutina-diaria-m2-q01",
        question: "What does *me lavo los dientes* mean?",
        options: ["I wash my face", "I brush my hair", "I brush my teeth", "I have a shower"],
        answerIndex: 2,
        explanation:
          "*Los dientes* = teeth (think 'dentist'), so **I brush my teeth** (literally 'I wash the teeth'). 'I wash my face' is *me lavo la cara*, 'I brush my hair' is *me peino* and 'I have a shower' is *me ducho*.",
        difficulty: "warmup",
        guideRef: "reflexive-verbs",
        hints: ["*Dientes* looks like an English word to do with teeth — which one?"],
        strategy: "Spot the cognate",
      },
      {
        kind: "mcq",
        id: "rutina-diaria-m2-q02",
        question: "What time does the clock show? ¿Qué hora es?",
        diagram: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Clock face showing quarter past eight: hour hand just past 8, minute hand on 3"><rect x="0" y="0" width="200" height="200" fill="#ffffff"/><circle cx="100" cy="100" r="85" fill="#bae6fd" stroke="#1f2937" stroke-width="4"/><text x="100" y="35" font-family="sans-serif" font-size="14" text-anchor="middle">12</text><text x="170" y="105" font-family="sans-serif" font-size="14" text-anchor="middle">3</text><text x="100" y="176" font-family="sans-serif" font-size="14" text-anchor="middle">6</text><text x="30" y="105" font-family="sans-serif" font-size="14" text-anchor="middle">9</text><text x="135" y="45" font-family="sans-serif" font-size="12" text-anchor="middle">1</text><text x="161" y="70" font-family="sans-serif" font-size="12" text-anchor="middle">2</text><text x="161" y="141" font-family="sans-serif" font-size="12" text-anchor="middle">4</text><text x="135" y="166" font-family="sans-serif" font-size="12" text-anchor="middle">5</text><text x="65" y="166" font-family="sans-serif" font-size="12" text-anchor="middle">7</text><text x="39" y="141" font-family="sans-serif" font-size="12" text-anchor="middle">8</text><text x="39" y="70" font-family="sans-serif" font-size="12" text-anchor="middle">10</text><text x="65" y="45" font-family="sans-serif" font-size="12" text-anchor="middle">11</text><line x1="100" y1="100" x2="150" y2="100" stroke="#334155" stroke-width="3" stroke-linecap="round"/><line x1="100" y1="100" x2="63" y2="115" stroke="#1f2937" stroke-width="6" stroke-linecap="round"/><circle cx="100" cy="100" r="4" fill="#1f2937"/></svg>`,
        options: ["Son las ocho y cuarto.", "Son las ocho menos cuarto.", "Son las tres y cuarenta.", "Es las ocho y cuarto."],
        answerIndex: 0,
        explanation:
          "The short hour hand is just past 8 and the long minute hand points at 3 (fifteen minutes): **Son las ocho y cuarto** (8:15). *Las ocho menos cuarto* would be 7:45, *las tres y cuarenta* reads the hands the wrong way round, and *es* is only used with *la una*.",
        difficulty: "warmup",
        guideRef: "telling-the-time",
        hints: ["The short hand gives the hour, the long hand the minutes. Then decide: *es* or *son*?"],
        strategy: "Use the time phrase",
      },
      {
        kind: "mcq",
        id: "rutina-diaria-m2-q03",
        question:
          "Read the text.\n\n> Hola, soy Diego. Vivo en Málaga, cerca de la playa. Me levanto a las siete y media. Desayuno cereales con leche y un plátano. Luego me lavo los dientes y salgo de casa. Voy al colegio a pie porque está muy cerca: solo diez minutos.\n\nHow does Diego get to school, and why?",
        options: [
          "By bus, because it is far",
          "By bike, because it is quick",
          "By car, because it takes ten minutes",
          "On foot, because it is very close",
        ],
        answerIndex: 3,
        explanation:
          "*Voy al colegio a pie porque está muy cerca* → **on foot, because it is very close**. *A pie* means 'on foot' (*pie* = foot), not by car or bus; the ten minutes is how long the walk takes.",
        difficulty: "warmup",
        guideRef: "morning-routine",
        hints: ["Find *voy al colegio* — the means of transport follows straight after it, then the reason after *porque*."],
        strategy: "Use context",
      },
      {
        kind: "mcq",
        id: "rutina-diaria-m2-q04",
        question: "Which is the *yo* form of *hacer* (to do / to make)?",
        options: ["haco", "hago", "hace", "hacemos"],
        answerIndex: 1,
        explanation:
          "*Hacer* has an irregular *yo* form with a **g**: **hago** (*hago los deberes*). *Haco* follows the regular pattern by mistake; *hace* is 'he/she does' and *hacemos* is 'we do'.",
        difficulty: "warmup",
        guideRef: "stem-changes-and-irregular-yo",
        hints: ["Think of the 'g-group': *salgo, pongo…* — *hacer* is one of them."],
        strategy: "Look for the pattern",
      },
      {
        kind: "mcq",
        id: "rutina-diaria-m2-q05",
        question:
          "Read the text.\n\n> Me llamo Priya y vivo en un condominio en Bishan. Me despierto a las seis y media porque el colegio empieza muy temprano. Me ducho rápidamente —¡en Singapur siempre hace calor!— y me pongo el uniforme. Desayuno con mi abuela en la cocina. A las siete y cuarto salgo de casa y voy a la estación. Voy al colegio en MRT y luego camino cinco minutos. Llego a las ocho menos cuarto.\n\nAt what time does Priya arrive at school?",
        options: ["7:45", "7:15", "8:15", "6:30"],
        answerIndex: 0,
        explanation:
          "*Llego a las ocho menos cuarto* = eight minus a quarter → **7:45**. It is not 8:15 — that would be *las ocho y cuarto*. 7:15 is when she leaves home and 6:30 is when she wakes up.",
        difficulty: "core",
        guideRef: "morning-routine",
        hints: [
          "Which verb means 'I arrive'? Find it in the text.",
          "*Menos cuarto* takes fifteen minutes away from the hour.",
        ],
        strategy: "Use the time phrase",
      },
      {
        kind: "mcq",
        id: "rutina-diaria-m2-q06",
        question: "Choose the correct Spanish for 'You (*tú*) get dressed quickly.'",
        options: ["Se vistes rápidamente.", "Te vestes rápidamente.", "Te visto rápidamente.", "Te vistes rápidamente."],
        answerIndex: 3,
        explanation:
          "*Tú* needs the pronoun **te** and the ending *-es*, and *vestirse* changes e→i inside the boot: **te vistes**. *Se vistes* has the wrong pronoun, *te vestes* misses the stem change, and *te visto* has the *yo* ending.",
        difficulty: "core",
        guideRef: "reflexive-verbs",
        hints: [
          "Which reflexive pronoun goes with *tú*?",
          "*Vestirse* is an e→i boot verb. Is *tú* inside the boot?",
        ],
        strategy: "Check the subject",
      },
      {
        kind: "mcq",
        id: "rutina-diaria-m2-q07",
        question: "A train timetable in Spain says **21:45**. How would you say that time in conversation?",
        options: [
          "las nueve menos cuarto de la noche",
          "las nueve y cuarto de la noche",
          "las diez menos cuarto de la noche",
          "las diez y cuarto de la noche",
        ],
        answerIndex: 2,
        explanation:
          "21:45 → subtract 12 → 9:45 p.m. In Spanish you count back from the next hour: **las diez menos cuarto de la noche**. *Las nueve menos cuarto* is 8:45 — the classic mistake of naming the hour you have just passed.",
        difficulty: "core",
        guideRef: "telling-the-time",
        hints: [
          "First turn the 24-hour time into a 12-hour time.",
          "Forty-five minutes past the hour = a quarter to the **next** hour. Which hour comes next after nine?",
        ],
        strategy: "Use the time phrase",
      },
      {
        kind: "mcq",
        id: "rutina-diaria-m2-q08",
        question: "What does *Después de hacer los deberes, veo la tele* mean?",
        options: [
          "Before doing my homework, I watch TV.",
          "After doing my homework, I watch TV.",
          "After watching TV, I do my homework.",
          "I do my homework while I watch TV.",
        ],
        answerIndex: 1,
        explanation:
          "*Después de* = after, *hacer los deberes* = doing homework, *veo la tele* = I watch TV → **After doing my homework, I watch TV.** 'Before…' would need *antes de*, and swapping the two actions changes the order of events.",
        difficulty: "core",
        guideRef: "evening-routine",
        hints: [
          "Does *después de* mean 'before' or 'after'?",
          "Which action comes straight after *después de*? That one happens first.",
        ],
        strategy: "Translate back to check",
      },
      {
        kind: "mcq",
        id: "rutina-diaria-m2-q09",
        question: "Choose the correct Spanish for 'I get up at six but my sister gets up at eight.'",
        options: [
          "Yo me levanto a las seis pero mi hermana me levanto a las ocho.",
          "Yo se levanta a las seis pero mi hermana me levanto a las ocho.",
          "Yo me levanto a las seis pero mi hermana se levanto a las ocho.",
          "Yo me levanto a las seis pero mi hermana se levanta a las ocho.",
        ],
        answerIndex: 3,
        explanation:
          "Each half needs its own subject–verb match: *yo* → **me levanto**, *mi hermana* (she) → **se levanta**. Copying *me levanto* into the second half, or writing *se levanto* (an *él* pronoun with a *yo* ending), are the typical slips when comparing routines.",
        difficulty: "core",
        guideRef: "someone-elses-routine",
        hints: [
          "There are two subjects: *yo* and *mi hermana*. Each needs its own form.",
          "Check both the pronoun and the ending in the second half: *mi hermana* = *ella*.",
        ],
        strategy: "Agreement check",
      },
      {
        kind: "mcq",
        id: "rutina-diaria-m2-q10",
        question:
          "Read the text.\n\n> Carmen vive en Valencia con sus padres. Por la tarde, vuelve del instituto a las tres y come con su familia. Después, hace los deberes y a las seis va a clase de baile. A las ocho y media de la noche cena una ensalada y una tortilla de patatas. Luego ve la tele un rato. Antes de acostarse, lee un libro en la cama. Se acuesta a las once menos cuarto.\n\nWhat does Carmen do just before going to bed?",
        options: ["She watches TV.", "She does her homework.", "She reads a book in bed.", "She goes to her dance class."],
        answerIndex: 2,
        explanation:
          "*Antes de acostarse, lee un libro en la cama* → **she reads a book in bed**. She watches TV (*ve la tele un rato*) earlier, after dinner — the key phrase is *antes de acostarse* (before going to bed).",
        difficulty: "core",
        guideRef: "evening-routine",
        hints: [
          "*Acostarse* = to go to bed. Find it in the text.",
          "What does *antes de* mean?",
        ],
        strategy: "Use context",
      },
      {
        kind: "mcq",
        id: "rutina-diaria-m2-q11",
        question: "Complete the sentence: *Las clases ___ a las ocho y media.*",
        options: ["empiezan", "empezan", "empieza", "empiezamos"],
        answerIndex: 0,
        explanation:
          "*Las clases* = they, and *empezar* is an e→ie boot verb, so **empiezan**. *Empezan* forgets the stem change, *empieza* is singular (it would fit *la clase*), and *empiezamos* has the *nosotros* ending — which in any case keeps *e* (*empezamos*).",
        difficulty: "core",
        guideRef: "stem-changes-and-irregular-yo",
        hints: [
          "Is *las clases* singular or plural?",
          "*Empezar* changes e→ie in the boot. Is the *ellos* form inside the boot?",
        ],
        strategy: "Agreement check",
      },
      {
        kind: "mcq",
        id: "rutina-diaria-m2-q12",
        question:
          "Put these in the most logical order for a school morning:\n\n- (a) *me visto*\n- (b) *me despierto*\n- (c) *salgo de casa*\n- (d) *me ducho*",
        options: ["b, a, c, d", "b, d, a, c", "d, b, a, c", "a, b, d, c"],
        answerIndex: 1,
        explanation:
          "First you wake up (*me despierto*), then shower (*me ducho*), get dressed (*me visto*) and finally leave the house (*salgo de casa*): **b, d, a, c**. Getting dressed before you shower, or showering before you wake up, doesn't make sense.",
        difficulty: "core",
        guideRef: "morning-routine",
        hints: [
          "Translate each one first.",
          "What must happen before anything else? What must happen last?",
        ],
        strategy: "Use context",
      },
      {
        kind: "mcq",
        id: "rutina-diaria-m2-q13",
        question:
          "Read Pablo's text.\n\n> En mi familia, los días de semana todos nos levantamos temprano. Mi padre se levanta a las seis porque empieza a trabajar a las siete. Mi madre y yo nos levantamos a las siete. Pero los fines de semana es diferente: mi padre duerme hasta las nueve, mi madre se levanta a las ocho para ir al mercado y yo… ¡me levanto a mediodía! Mi madre dice que soy un dormilón.\n\nWhich statement is true according to the text?",
        options: [
          "Pablo's father gets up at six every day of the week.",
          "At the weekend, Pablo's mother gets up later than his father.",
          "Pablo gets up earlier at the weekend than on school days.",
          "At the weekend, Pablo is the last person in the family to get up.",
        ],
        answerIndex: 3,
        explanation:
          "At the weekend his mother gets up at 8, his father at 9 and Pablo *a mediodía* (at midday), so **he is the last to get up** — which is why his mother calls him *un dormilón* (a sleepyhead). His father only gets up at six on weekdays, and at the weekend his mother (8:00) is up **before** his father (9:00).",
        difficulty: "challenge",
        guideRef: "someone-elses-routine",
        hints: [
          "Make a little table: weekday and weekend times for each person.",
          "*Duerme hasta las nueve* = he sleeps until nine. *Mediodía* = midday.",
          "Now compare the three weekend times.",
        ],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "rutina-diaria-m2-q14",
        question: "Which question correctly asks a group of friends (*vosotros*) 'What time do you go to bed?'",
        options: ["¿A qué hora os acostáis?", "¿A qué hora os acuestáis?", "¿A qué hora se acostáis?", "¿A qué hora os acuestan?"],
        answerIndex: 0,
        explanation:
          "*Vosotros* is **outside the boot**, so *acostarse* keeps its *o*: **os acostáis**. *Os acuestáis* wrongly adds the stem change, *se acostáis* has the wrong pronoun, and *acuestan* is the *ellos* ending.",
        difficulty: "challenge",
        guideRef: "stem-changes-and-irregular-yo",
        hints: [
          "Which pronoun goes with *vosotros*?",
          "Is the *vosotros* form inside or outside the boot?",
          "Outside the boot the stem is the same as the infinitive: *acost-* + *-áis*.",
        ],
        strategy: "Look for the pattern",
      },
      {
        kind: "mcq",
        id: "rutina-diaria-m2-q15",
        question: "Why does Spanish say *me lavo las manos* rather than *me lavo mis manos* for 'I wash my hands'?",
        options: [
          "Because *manos* is feminine, so it can't take *mis*.",
          "Because the reflexive pronoun *me* already shows whose hands they are, so Spanish uses *las*.",
          "Because *mis* is only used with people, never with parts of the body.",
          "Because *las* is the plural of *mis*.",
        ],
        answerIndex: 1,
        explanation:
          "The **reflexive pronoun** *me* already tells you the action is done to yourself, so saying 'my' again would repeat the information — Spanish uses the article: *me lavo las manos, me lavo el pelo*. *Mis* can go with feminine nouns (*mis hermanas*), so gender is not the reason.",
        difficulty: "challenge",
        guideRef: "reflexive-verbs",
        hints: [
          "What job does *me* do in *me lavo*?",
          "If *me* already says 'myself', what would *mis* add?",
        ],
        strategy: "Eliminate options",
      },
    ],
  },
  // ============================== MCQ PAPER 3 ==============================
  {
    id: "rutina-diaria-m3",
    title: "MCQ Paper 3",
    questions: [
      {
        kind: "mcq",
        id: "rutina-diaria-m3-q01",
        question: "Which reflexive pronoun goes with *nosotros*?",
        options: ["os", "nos", "se", "me"],
        answerIndex: 1,
        explanation:
          "*Nosotros* → **nos** (*nos levantamos*). *Os* goes with *vosotros*, *se* with *él/ella/ellos* and *me* with *yo*. Handy link: *nos* is hidden inside *nosotros*.",
        difficulty: "warmup",
        guideRef: "reflexive-verbs",
        hints: ["Look at the first letters of *nosotros*."],
        strategy: "Look for the pattern",
      },
      {
        kind: "mcq",
        id: "rutina-diaria-m3-q02",
        question: "What does *¿Qué hora es?* mean?",
        options: ["At what time?", "What's the weather like?", "When is it?", "What time is it?"],
        answerIndex: 3,
        explanation:
          "*¿Qué hora es?* = **What time is it?** — you answer *Son las…* / *Es la una*. 'At what time?' is *¿A qué hora…?* — that little *a* means 'at'. The weather question is *¿Qué tiempo hace?*",
        difficulty: "warmup",
        guideRef: "telling-the-time",
        hints: ["*Hora* = hour / time. There is no *a* ('at') in this question."],
        strategy: "Translate back to check",
      },
      {
        kind: "mcq",
        id: "rutina-diaria-m3-q03",
        question: "What does *meriendo* mean?",
        options: ["I have an afternoon snack", "I have lunch", "I have breakfast", "I have dinner"],
        answerIndex: 0,
        explanation:
          "*Merendar* (e→ie) is to have *la merienda*, the **afternoon snack** Spanish children eat after school. Breakfast is *desayuno*, lunch *como* and dinner *ceno*.",
        difficulty: "warmup",
        guideRef: "evening-routine",
        hints: ["*La merienda* is eaten between lunch and a late Spanish dinner."],
        strategy: "Use context",
      },
      {
        kind: "mcq",
        id: "rutina-diaria-m3-q04",
        question: "Which means 'I leave the house'?",
        options: ["Llego a casa.", "Vuelvo a casa.", "Salgo de casa.", "Salo de casa."],
        answerIndex: 2,
        explanation:
          "*Salir de* = to leave (from), and the *yo* form is irregular: **salgo de casa**. *Llego a casa* = I arrive home, *vuelvo a casa* = I go back home, and *salo* is not a real form.",
        difficulty: "warmup",
        guideRef: "morning-routine",
        hints: ["'Leave' = *salir*. Remember its *yo* form has a *g*."],
        strategy: "Find the infinitive",
      },
      {
        kind: "mcq",
        id: "rutina-diaria-m3-q05",
        question:
          "Read the text.\n\n> Soy Aisha. Por la mañana me despierto a las seis y diez, pero me quedo en la cama cinco minutos más. Después me levanto y voy al cuarto de baño. Me ducho, me lavo la cara y me lavo los dientes. No me maquillo porque no me gusta. Me peino delante del espejo y me visto en mi dormitorio. ¡Estoy lista a las siete menos cuarto!\n\nWhich statement is true?",
        options: [
          "Aisha gets up at 6:10.",
          "Aisha puts on make-up every morning.",
          "Aisha gets dressed in the bathroom.",
          "Aisha brushes her hair in front of the mirror.",
        ],
        answerIndex: 3,
        explanation:
          "*Me peino delante del espejo* → **she brushes her hair in front of the mirror**. She *wakes up* (*me despierto*) at 6:10 but stays in bed five more minutes, so she *gets up* (*me levanto*) later. *No me maquillo* = she doesn't wear make-up, and she dresses *en mi dormitorio*.",
        difficulty: "core",
        guideRef: "reflexive-verbs",
        hints: [
          "*Despertarse* and *levantarse* are not the same thing — which is which?",
          "Look for *no* in front of a verb: it makes the sentence negative.",
        ],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "rutina-diaria-m3-q06",
        question: "Which of these verbs follows the same o→ue boot pattern as *acostarse* (*me acuesto*)?",
        options: ["comer", "volver", "llegar", "desayunar"],
        answerIndex: 1,
        explanation:
          "**Volver** → *vuelvo, vuelves, vuelve, volvemos, volvéis, vuelven* — o→ue inside the boot, just like *me acuesto*. *Comer* has an *o* but is regular (*como*), and *llegar* and *desayunar* are regular too.",
        difficulty: "core",
        guideRef: "stem-changes-and-irregular-yo",
        hints: [
          "Try saying the *yo* form of each verb.",
          "Which one becomes *-ue-* in the *yo* form?",
        ],
        strategy: "Say it aloud",
      },
      {
        kind: "mcq",
        id: "rutina-diaria-m3-q07",
        question: "Choose the correct Spanish for 'I have breakfast at ten past seven.'",
        options: [
          "Desayuno a las siete y diez.",
          "Desayuno a las diez y siete.",
          "Desayuno son las siete y diez.",
          "Desayuno a las siete menos diez.",
        ],
        answerIndex: 0,
        explanation:
          "Spanish gives the **hour first**, then the minutes: *las siete y diez*, and 'at' = *a las* → **Desayuno a las siete y diez.** *Las diez y siete* follows English word order ('ten past seven') and means 10:07. *Son las* means 'it is', and *menos diez* would be 6:50.",
        difficulty: "core",
        guideRef: "telling-the-time",
        hints: [
          "In Spanish, which comes first — the hour or the minutes?",
          "'Past' = *y*; 'at' = *a las*.",
        ],
        strategy: "Use the time phrase",
      },
      {
        kind: "mcq",
        id: "rutina-diaria-m3-q08",
        question: "Which 24-hour time is *las cinco menos veinte de la tarde*?",
        options: ["17:20", "17:40", "16:40", "16:20"],
        answerIndex: 2,
        explanation:
          "*Las cinco menos veinte* = twenty minutes before five → 4:40, and *de la tarde* makes it p.m. → **16:40**. 17:40 is the common mistake of keeping the hour you hear (*cinco*) and just changing the minutes.",
        difficulty: "core",
        guideRef: "telling-the-time",
        hints: [
          "*Menos veinte* takes twenty minutes **away** from five o'clock.",
          "Then add 12 hours for the afternoon.",
        ],
        strategy: "Use the time phrase",
      },
      {
        kind: "mcq",
        id: "rutina-diaria-m3-q09",
        question: "Choose the correct Spanish for 'I go to bed after reading.'",
        options: [
          "Me acuesto después de leer.",
          "Me acuesto después de leo.",
          "Me acuesto antes de leer.",
          "Me acuesto después leer.",
        ],
        answerIndex: 0,
        explanation:
          "'After …ing' = *después de* + **infinitive**: *después de leer*. *Después de leo* conjugates the verb, *después leer* misses *de*, and *antes de* means 'before'.",
        difficulty: "core",
        guideRef: "evening-routine",
        hints: [
          "English uses '-ing' after 'after'. What does Spanish use?",
          "*Después* needs a little word before the verb.",
        ],
        strategy: "Look for the pattern",
      },
      {
        kind: "mcq",
        id: "rutina-diaria-m3-q10",
        question:
          "Read the text.\n\n> La madre de Arjun es enfermera en un hospital de Singapur y trabaja por la noche. Sale de casa a las ocho de la noche y vuelve a casa a las siete de la mañana. Cuando vuelve, desayuna con Arjun y su hermana. Luego se ducha y se acuesta a las ocho de la mañana. Duerme hasta las tres de la tarde. Por la tarde, prepara la cena y ayuda a los niños con los deberes.\n\nWhen does Arjun's mother sleep?",
        options: ["From 8 p.m. to 7 a.m.", "From 7 a.m. to 3 p.m.", "From 8 p.m. to 3 a.m.", "From 8 a.m. to 3 p.m."],
        answerIndex: 3,
        explanation:
          "*Se acuesta a las ocho de la mañana* and *duerme hasta las tres de la tarde* → **8 a.m. to 3 p.m.** From 8 p.m. to 7 a.m. she is at work (*sale de casa… vuelve a casa*); at 7 a.m. she has breakfast first, then showers.",
        difficulty: "core",
        guideRef: "someone-elses-routine",
        hints: [
          "Find *se acuesta* and *duerme hasta* in the text.",
          "Watch *de la mañana* vs *de la noche*.",
        ],
        strategy: "Use the time phrase",
      },
      {
        kind: "mcq",
        id: "rutina-diaria-m3-q11",
        question: "Rewrite *Me ducho por la mañana* about *mi hermano*.",
        options: [
          "Mi hermano me ducho por la mañana.",
          "Mi hermano se ducha por la mañana.",
          "Mi hermano se ducho por la mañana.",
          "Mi hermano te duchas por la mañana.",
        ],
        answerIndex: 1,
        explanation:
          "*Mi hermano* = he, so **both** the pronoun and the ending change: *me* → **se**, *-o* → **-a**: *se ducha*. *Se ducho* changes only the pronoun; *me ducho* changes nothing.",
        difficulty: "core",
        guideRef: "someone-elses-routine",
        hints: [
          "Two things change when you switch from *yo* to *él*. What are they?",
          "*él* → pronoun *se*, *-ar* ending *-a*.",
        ],
        strategy: "Check the subject",
      },
      {
        kind: "mcq",
        id: "rutina-diaria-m3-q12",
        question:
          "Read the text.\n\n> Zara vive en Barcelona. Los lunes, se levanta a las siete y desayuna fruta y un yogur. Primero va a pie a la parada de autobús. Luego coge el autobús hasta la estación y, finalmente, va al instituto en metro. ¡Tarda cuarenta minutos en total! Los viernes, su madre la lleva en coche porque empieza a trabajar más tarde.\n\nWhat is the order of Zara's journey to school on Mondays?",
        options: ["metro → bus → on foot", "bus → on foot → metro", "on foot → bus → metro", "car → bus → metro"],
        answerIndex: 2,
        explanation:
          "The sequencers give the order: *primero… a pie*, *luego… el autobús*, *finalmente… en metro* → **on foot → bus → metro**. The car is only on Fridays (*los viernes*).",
        difficulty: "core",
        guideRef: "morning-routine",
        hints: [
          "Find *primero*, *luego* and *finalmente* in the text.",
          "Which day is the question about?",
        ],
        strategy: "Use context",
      },
      {
        kind: "mcq",
        id: "rutina-diaria-m3-q13",
        question:
          "Hana from Singapore is on an exchange in Sevilla. Read her exchange partner Carmen's timetable for Monday.\n\n    07:30  me despierto\n    08:10  salgo de casa\n    14:30  vuelvo a casa y como\n    17:00  meriendo\n    21:30  ceno\n    23:00  me acuesto\n\nHana says: *En Singapur, ceno a las siete.* Which statement is correct?",
        options: [
          "Carmen leaves home at ten past seven.",
          "Carmen has dinner two and a half hours later than Hana does at home.",
          "Carmen has her afternoon snack at seven in the evening.",
          "Carmen goes to bed at three o'clock.",
        ],
        answerIndex: 1,
        explanation:
          "Carmen *cena* at 21:30 (half past nine) and Hana at seven → **two and a half hours later**. 08:10 is ten past **eight**, 17:00 is **five** p.m. (not seven — take away 12, not 10), and 23:00 is eleven p.m.",
        difficulty: "challenge",
        guideRef: "telling-the-time",
        hints: [
          "Convert each 24-hour time by subtracting 12 from anything after 12:00.",
          "Which verb in the timetable means 'I have dinner'?",
          "Compare 21:30 with seven o'clock in the evening (19:00).",
        ],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "rutina-diaria-m3-q14",
        question: "Which sentence has **every** verb correct?",
        options: [
          "Volvo a casa, meriendo y hago los deberes.",
          "Vuelvo a casa, merendo y hago los deberes.",
          "Vuelvo a casa, meriendo y haco los deberes.",
          "Vuelvo a casa, meriendo y hago los deberes.",
        ],
        answerIndex: 3,
        explanation:
          "**Vuelvo** (o→ue), **meriendo** (e→ie) and **hago** (irregular *g* in the *yo* form) are all correct. *Volvo* and *merendo* forget the stem change; *haco* forgets the irregular *yo* form.",
        difficulty: "challenge",
        guideRef: "stem-changes-and-irregular-yo",
        hints: [
          "Check the three verbs one at a time.",
          "Two of the verbs are boot verbs; one has an irregular *yo* form.",
        ],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "rutina-diaria-m3-q15",
        question: "Which sentence means 'I wake up at seven but I get up at half past seven'?",
        options: [
          "Me despierto a las siete pero me levanto a las siete y media.",
          "Me levanto a las siete pero me despierto a las siete y media.",
          "Me despierto a las siete pero levanto a las siete y media.",
          "Despierto a las siete pero me levanto a las siete y media.",
        ],
        answerIndex: 0,
        explanation:
          "*Despertarse* = to wake up (open your eyes), *levantarse* = to get up (out of bed): **Me despierto a las siete pero me levanto a las siete y media.** Swapping the verbs reverses the meaning, and dropping *me* turns each verb into 'I wake (someone)' / 'I lift (something)'.",
        difficulty: "challenge",
        guideRef: "reflexive-verbs",
        hints: [
          "Which verb is 'wake up' and which is 'get up'?",
          "Both verbs are reflexive — check that each one has its *me*.",
        ],
        strategy: "Translate back to check",
      },
    ],
  },
];
