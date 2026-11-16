import type { TopicGuide } from "../../types.ts";

export const guide: TopicGuide = {
  id: "rutina-diaria",
  title: "Mi rutina diaria — Daily Routine",
  strand: "Home & Routine",
  icon: "⏰",
  summary: "Me despierto, me levanto, salgo de casa — your whole day, hour by hour.",
  intro:
    "From the moment your alarm goes off to the moment you switch off the light, your day is full of Spanish. In this topic you'll meet **reflexive verbs** (*me levanto, me ducho*), learn to tell the time precisely, link your morning and evening with sequencers, master the 'boot' verbs and irregular *yo* forms, and finally describe — and compare — other people's routines.\n\nBy the end you should be able to write a paragraph like this, and understand every word:\n\n    Durante la semana me levanto a las seis y cuarto. Primero me ducho y luego desayuno.\n    Salgo de casa a las siete y voy al colegio en metro. Mi hermano, en cambio, se levanta más tarde que yo.",
  guide: [
    // ---------------------------------------------------------------------
    {
      id: "reflexive-verbs",
      heading: "Reflexive verbs: me levanto, me ducho",
      discovery: {
        problem:
          "Compare each pair of sentences:\n\n    Lavo el coche. — Me lavo.\n    Despierto a mi hermano. — Me despierto.\n    Levanto la mano. — Me levanto.\n\nIn the first sentence of each pair, who or what receives the action? And in the second? What job is the little word *me* doing?",
        idea:
          "In the first sentences the action goes **out** to something else: the car, my brother, my hand. In the second, the action **bounces back** onto the person doing it: *me lavo* = I wash (myself), *me despierto* = I wake (myself) up, *me levanto* = I raise myself, i.e. I get up.\n\n*Me* is a **reflexive pronoun** meaning 'myself'. English usually drops 'myself' ('I get dressed', not 'I dress myself'), but Spanish can't — without *me*, *levanto* means 'I lift (something)'.",
      },
      body:
        "A **reflexive verb** describes an action you do to yourself. In the dictionary it ends in **-se**: *levantarse* (to get up — literally 'to raise oneself'), *ducharse* (to have a shower).\n\nTo use one: take off *-se*, conjugate the verb as normal, and put the matching **reflexive pronoun** in front.\n\n| | levantarse (to get up) | ducharse (to have a shower) |\n|---|---|---|\n| yo | **me** levanto | **me** ducho |\n| tú | **te** levantas | **te** duchas |\n| él / ella | **se** levanta | **se** ducha |\n| nosotros / nosotras | **nos** levantamos | **nos** duchamos |\n| vosotros / vosotras | **os** levantáis | **os** ducháis |\n| ellos / ellas | **se** levantan | **se** duchan |\n\n**Your routine verbs** (in the *yo* form):\n\n| Spanish | English |\n|---|---|\n| me despierto | I wake up |\n| me levanto | I get up |\n| me ducho | I have a shower |\n| me baño | I have a bath |\n| me lavo la cara | I wash my face |\n| me lavo los dientes | I brush my teeth |\n| me visto | I get dressed |\n| me peino | I comb / do my hair |\n| me maquillo | I put on make-up |\n| me acuesto | I go to bed |\n\n> **No 'my' with body parts.** Spanish says *me lavo los dientes* (literally 'I wash myself the teeth'), not *me lavo mis dientes*. The *me* already tells you whose teeth they are, so you only need the article: *los dientes, la cara, el pelo*.\n\n**Where does the pronoun go?**\n- Before a conjugated verb: *Me ducho por la mañana.*\n- *No* goes in front of the pronoun: *No me ducho por la noche.*\n- With an infinitive (for example in the near future) it can also be glued to the end. Both are correct: *Me voy a levantar.* = *Voy a levantarme.*\n\nThree of these verbs change their stem: *me despierto* (e→ie), *me visto* (e→i) and *me acuesto* (o→ue). Learn the *yo* forms now — section 5 shows the full 'boot' pattern.",
      diagram: `<svg viewBox="0 0 440 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Left: a person washes a car, the arrow goes out to the car. Right: a person with an arrow that loops back to themselves, labelled me lavo"><rect x="0" y="0" width="440" height="210" fill="#ffffff"/><rect x="10" y="10" width="200" height="190" rx="10" fill="#bae6fd" stroke="#334155"/><rect x="230" y="10" width="200" height="190" rx="10" fill="#fde68a" stroke="#334155"/><text x="110" y="34" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#1f2937">Lavo el coche.</text><text x="330" y="34" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#1f2937">Me lavo.</text><circle cx="50" cy="72" r="12" fill="#ffffff" stroke="#1f2937" stroke-width="2"/><line x1="50" y1="84" x2="50" y2="128" stroke="#1f2937" stroke-width="2"/><line x1="50" y1="98" x2="32" y2="114" stroke="#1f2937" stroke-width="2"/><line x1="50" y1="98" x2="72" y2="94" stroke="#1f2937" stroke-width="2"/><line x1="50" y1="128" x2="38" y2="158" stroke="#1f2937" stroke-width="2"/><line x1="50" y1="128" x2="62" y2="158" stroke="#1f2937" stroke-width="2"/><rect x="125" y="96" width="50" height="20" rx="5" fill="#c7d2fe" stroke="#1f2937"/><rect x="110" y="114" width="85" height="28" rx="6" fill="#c7d2fe" stroke="#1f2937"/><circle cx="130" cy="144" r="9" fill="#334155"/><circle cx="175" cy="144" r="9" fill="#334155"/><line x1="78" y1="100" x2="106" y2="110" stroke="#1f2937" stroke-width="2"/><polygon points="114,113 103.8,113.3 106.8,104.8" fill="#1f2937"/><text x="110" y="180" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">the action goes out to the car</text><circle cx="300" cy="72" r="12" fill="#ffffff" stroke="#1f2937" stroke-width="2"/><line x1="300" y1="84" x2="300" y2="128" stroke="#1f2937" stroke-width="2"/><line x1="300" y1="98" x2="282" y2="114" stroke="#1f2937" stroke-width="2"/><line x1="300" y1="98" x2="318" y2="114" stroke="#1f2937" stroke-width="2"/><line x1="300" y1="128" x2="288" y2="158" stroke="#1f2937" stroke-width="2"/><line x1="300" y1="128" x2="312" y2="158" stroke="#1f2937" stroke-width="2"/><path d="M 314 70 C 372 40, 382 128, 322 112" fill="none" stroke="#1f2937" stroke-width="2"/><polygon points="314,110 323.9,107.6 321.5,116.3" fill="#1f2937"/><text x="392" y="88" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#1f2937">me</text><text x="330" y="180" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">the action bounces back to me</text></svg>`,
      diagramCaption:
        "A normal verb sends the action out to something else (*lavo el coche*). A reflexive verb sends it back to the doer (*me lavo* — I wash myself).",
      workedExamples: [
        {
          title: "Build a reflexive verb",
          problem: "Say 'We get up at seven' in Spanish.",
          steps: [
            "Find the infinitive: 'to get up' = *levantarse*.",
            "Who? 'We' = *nosotros* → pronoun *nos*.",
            "Take off *-se* and conjugate *levantar* for *nosotros*: *levantamos*.",
            "Pronoun in front, then the time: *a las siete*.",
          ],
          answer: "*Nos levantamos a las siete.*",
          yourTurn: {
            question: "Your turn: write 'I brush my teeth' in Spanish.",
            answer: {
              type: "text",
              accept: [
                "me lavo los dientes",
                "yo me lavo los dientes",
                "me cepillo los dientes",
                "yo me cepillo los dientes",
              ],
            },
            solution:
              "*Lavarse* → *yo* → *me lavo*. Body part with the article, not *mis*: **Me lavo los dientes.** (*Me cepillo los dientes* is also correct.)",
          },
        },
        {
          title: "The tricky vosotros form",
          problem: "Complete with *ducharse*: *¿Vosotros ___ por la mañana o por la noche?*",
          steps: [
            "*Vosotros* → reflexive pronoun *os*.",
            "*Duchar* is a regular *-ar* verb: the *vosotros* ending is *-áis*, with an accent.",
            "Pronoun + verb: *os ducháis*.",
          ],
          answer: "*¿Vosotros os ducháis por la mañana o por la noche?*",
          yourTurn: {
            question: "Your turn: write the *ellos* form of *ducharse* in the present tense.",
            answer: { type: "text", accept: ["se duchan", "ellos se duchan", "ellas se duchan"] },
            solution: "*Ellos* → pronoun *se*; *duchar* → *-an*: **se duchan**.",
          },
        },
      ],
      keyPoints: [
        "Reflexive infinitives end in *-se*: *levantarse, ducharse, acostarse*.",
        "Pronouns: *me, te, se, nos, os, se* — they must match the person.",
        "The pronoun goes before the verb: *me levanto*; *no* goes before the pronoun: *no me levanto*.",
        "Body parts take the article, not 'my': *me lavo los dientes, me lavo la cara*.",
        "With an infinitive, the pronoun can attach to the end: *voy a ducharme*.",
      ],
      whyItWorks:
        "The *-se* on the infinitive is a short form of 'oneself' glued onto the verb. When you conjugate, 'oneself' becomes the right person: myself (*me*), yourself (*te*), himself/herself/themselves (*se*), ourselves (*nos*), yourselves (*os*). That's why the pronoun can never be left out — it's half of the meaning. Compare *despierto a mi hermano* (I wake my brother up) with *me despierto* (I wake **myself** up).",
      strategies: ["Find the infinitive", "Check the subject", "Look for the pattern", "Translate back to check"],
      thinkDeeper:
        "Some verbs change meaning when they become reflexive: *dormir* = to sleep, but *dormirse* = to fall asleep; *ir* = to go, but *irse* = to leave. Why might adding 'oneself' change *dormir* into 'fall asleep'? Can you think of an English verb that works in a similar way?",
    },
    // ---------------------------------------------------------------------
    {
      id: "telling-the-time",
      heading: "Telling the time: ¿A qué hora…?",
      discovery: {
        problem:
          "Here are some times in Spanish:\n\n    Es la una.\n    Son las dos.\n    Son las tres y cuarto.\n    Son las cuatro menos cuarto.\n\n1. Why does one o'clock use *es*, while the others use *son*?\n2. *Las cuatro menos cuarto* means 'four minus a quarter'. What time is that on a digital clock?",
        idea:
          "1. *Una* is one hour — singular — so the verb is singular: *es*. Two, three, four… are plural, so the verb is plural: *son*.\n\n2. Four o'clock minus a quarter of an hour = **3:45**. After half past, Spanish counts **back** from the next hour, just like English 'a quarter **to** four'.",
      },
      body:
        "**¿Qué hora es?** = What time is it?\n\n- One o'clock is singular: **Es la una.**\n- Every other hour is plural: **Son las dos**, **son las tres**… **son las doce**.\n\nThe hidden word is *la hora* (the hour), which is why it's always *la* or *las*.\n\n**Minutes past the hour** — add **y** (and):\n\n| Time | Spanish |\n|---|---|\n| 3:05 | Son las tres y cinco. |\n| 3:10 | Son las tres y diez. |\n| 3:15 | Son las tres **y cuarto**. |\n| 3:20 | Son las tres y veinte. |\n| 3:30 | Son las tres **y media**. |\n\n**After half past, count back from the next hour** with **menos** (minus):\n\n| Time | Spanish |\n|---|---|\n| 3:35 | Son las cuatro menos veinticinco. |\n| 3:40 | Son las cuatro menos veinte. |\n| 3:45 | Son las cuatro **menos cuarto**. |\n| 3:50 | Son las cuatro menos diez. |\n| 12:55 | Es la una menos cinco. |\n\nAdd *en punto* for 'exactly': *Son las ocho en punto.* Noon and midnight: *Es mediodía* / *Es medianoche*.\n\n**Morning, afternoon or night?** After a clock time, use **de**:\n- *de la mañana* — from early morning until lunch: *a las siete de la mañana*\n- *de la tarde* — afternoon and early evening (in Spain, until about 8 or 9 p.m.): *a las cinco de la tarde*\n- *de la noche* — late evening and night: *a las once de la noche*\n\nWith no clock time, use **por**: *Me ducho por la mañana* (I shower in the morning).\n\n**Two different questions**\n\n| Question | Answer |\n|---|---|\n| ¿Qué hora es? (What time is it now?) | **Son las** siete. / **Es la** una. |\n| ¿A qué hora…? (At what time…?) | **A las** siete. / **A la** una. |\n\n    ¿A qué hora te levantas? — Me levanto a las siete.\n    ¿Qué hora es? — Son las siete y diez. ¡Llego tarde!\n\n**The 24-hour clock.** Timetables, trains, cinemas and TV listings in Spain use the 24-hour clock. You read the numbers as they are — no *y cuarto* or *menos*:\n\n| Timetable | Read aloud | Everyday Spanish |\n|---|---|---|\n| 13:15 | las trece quince | la una y cuarto de la tarde |\n| 16:30 | las dieciséis treinta | las cuatro y media de la tarde |\n| 19:45 | las diecinueve cuarenta y cinco | las ocho menos cuarto de la tarde |\n| 22:10 | las veintidós diez | las diez y diez de la noche |\n\nWatch the accents on *dieciséis* and *veintidós*.",
      diagram: `<svg viewBox="0 0 480 196" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Four clock faces: half past seven, quarter past eight, quarter to nine and ten past one, each labelled in Spanish"><rect x="0" y="0" width="480" height="196" fill="#ffffff"/><circle cx="60" cy="78" r="48" fill="#bae6fd" stroke="#1f2937" stroke-width="2"/><line x1="60" y1="32" x2="60" y2="39" stroke="#334155" stroke-width="2"/><line x1="83" y1="38.2" x2="81" y2="41.6" stroke="#334155" stroke-width="1"/><line x1="99.8" y1="55" x2="96.4" y2="57" stroke="#334155" stroke-width="1"/><line x1="106" y1="78" x2="99" y2="78" stroke="#334155" stroke-width="2"/><line x1="99.8" y1="101" x2="96.4" y2="99" stroke="#334155" stroke-width="1"/><line x1="83" y1="117.8" x2="81" y2="114.4" stroke="#334155" stroke-width="1"/><line x1="60" y1="124" x2="60" y2="117" stroke="#334155" stroke-width="2"/><line x1="37" y1="117.8" x2="39" y2="114.4" stroke="#334155" stroke-width="1"/><line x1="20.2" y1="101" x2="23.6" y2="99" stroke="#334155" stroke-width="1"/><line x1="14" y1="78" x2="21" y2="78" stroke="#334155" stroke-width="2"/><line x1="20.2" y1="55" x2="23.6" y2="57" stroke="#334155" stroke-width="1"/><line x1="37" y1="38.2" x2="39" y2="41.6" stroke="#334155" stroke-width="1"/><text x="60" y="52" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#334155">12</text><text x="90" y="82" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#334155">3</text><text x="60" y="112" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#334155">6</text><text x="30" y="82" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#334155">9</text><line x1="60" y1="78" x2="60" y2="116" stroke="#334155" stroke-width="2.5" stroke-linecap="round"/><line x1="60" y1="78" x2="43" y2="95" stroke="#1f2937" stroke-width="5" stroke-linecap="round"/><circle cx="60" cy="78" r="3" fill="#1f2937"/><text x="60" y="146" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#1f2937">Son las siete</text><text x="60" y="162" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#1f2937">y media</text><text x="60" y="182" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#334155">(7:30)</text><circle cx="180" cy="78" r="48" fill="#bae6fd" stroke="#1f2937" stroke-width="2"/><line x1="180" y1="32" x2="180" y2="39" stroke="#334155" stroke-width="2"/><line x1="203" y1="38.2" x2="201" y2="41.6" stroke="#334155" stroke-width="1"/><line x1="219.8" y1="55" x2="216.4" y2="57" stroke="#334155" stroke-width="1"/><line x1="226" y1="78" x2="219" y2="78" stroke="#334155" stroke-width="2"/><line x1="219.8" y1="101" x2="216.4" y2="99" stroke="#334155" stroke-width="1"/><line x1="203" y1="117.8" x2="201" y2="114.4" stroke="#334155" stroke-width="1"/><line x1="180" y1="124" x2="180" y2="117" stroke="#334155" stroke-width="2"/><line x1="157" y1="117.8" x2="159" y2="114.4" stroke="#334155" stroke-width="1"/><line x1="140.2" y1="101" x2="143.6" y2="99" stroke="#334155" stroke-width="1"/><line x1="134" y1="78" x2="141" y2="78" stroke="#334155" stroke-width="2"/><line x1="140.2" y1="55" x2="143.6" y2="57" stroke="#334155" stroke-width="1"/><line x1="157" y1="38.2" x2="159" y2="41.6" stroke="#334155" stroke-width="1"/><text x="180" y="52" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#334155">12</text><text x="210" y="82" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#334155">3</text><text x="180" y="112" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#334155">6</text><text x="150" y="82" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#334155">9</text><line x1="180" y1="78" x2="218" y2="78" stroke="#334155" stroke-width="2.5" stroke-linecap="round"/><line x1="180" y1="78" x2="157.8" y2="87.2" stroke="#1f2937" stroke-width="5" stroke-linecap="round"/><circle cx="180" cy="78" r="3" fill="#1f2937"/><text x="180" y="146" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#1f2937">Son las ocho</text><text x="180" y="162" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#1f2937">y cuarto</text><text x="180" y="182" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#334155">(8:15)</text><circle cx="300" cy="78" r="48" fill="#bae6fd" stroke="#1f2937" stroke-width="2"/><line x1="300" y1="32" x2="300" y2="39" stroke="#334155" stroke-width="2"/><line x1="323" y1="38.2" x2="321" y2="41.6" stroke="#334155" stroke-width="1"/><line x1="339.8" y1="55" x2="336.4" y2="57" stroke="#334155" stroke-width="1"/><line x1="346" y1="78" x2="339" y2="78" stroke="#334155" stroke-width="2"/><line x1="339.8" y1="101" x2="336.4" y2="99" stroke="#334155" stroke-width="1"/><line x1="323" y1="117.8" x2="321" y2="114.4" stroke="#334155" stroke-width="1"/><line x1="300" y1="124" x2="300" y2="117" stroke="#334155" stroke-width="2"/><line x1="277" y1="117.8" x2="279" y2="114.4" stroke="#334155" stroke-width="1"/><line x1="260.2" y1="101" x2="263.6" y2="99" stroke="#334155" stroke-width="1"/><line x1="254" y1="78" x2="261" y2="78" stroke="#334155" stroke-width="2"/><line x1="260.2" y1="55" x2="263.6" y2="57" stroke="#334155" stroke-width="1"/><line x1="277" y1="38.2" x2="279" y2="41.6" stroke="#334155" stroke-width="1"/><text x="300" y="52" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#334155">12</text><text x="330" y="82" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#334155">3</text><text x="300" y="112" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#334155">6</text><text x="270" y="82" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#334155">9</text><line x1="300" y1="78" x2="262" y2="78" stroke="#334155" stroke-width="2.5" stroke-linecap="round"/><line x1="300" y1="78" x2="276.2" y2="81.1" stroke="#1f2937" stroke-width="5" stroke-linecap="round"/><circle cx="300" cy="78" r="3" fill="#1f2937"/><text x="300" y="146" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#1f2937">Son las nueve</text><text x="300" y="162" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#1f2937">menos cuarto</text><text x="300" y="182" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#334155">(8:45)</text><circle cx="420" cy="78" r="48" fill="#bae6fd" stroke="#1f2937" stroke-width="2"/><line x1="420" y1="32" x2="420" y2="39" stroke="#334155" stroke-width="2"/><line x1="443" y1="38.2" x2="441" y2="41.6" stroke="#334155" stroke-width="1"/><line x1="459.8" y1="55" x2="456.4" y2="57" stroke="#334155" stroke-width="1"/><line x1="466" y1="78" x2="459" y2="78" stroke="#334155" stroke-width="2"/><line x1="459.8" y1="101" x2="456.4" y2="99" stroke="#334155" stroke-width="1"/><line x1="443" y1="117.8" x2="441" y2="114.4" stroke="#334155" stroke-width="1"/><line x1="420" y1="124" x2="420" y2="117" stroke="#334155" stroke-width="2"/><line x1="397" y1="117.8" x2="399" y2="114.4" stroke="#334155" stroke-width="1"/><line x1="380.2" y1="101" x2="383.6" y2="99" stroke="#334155" stroke-width="1"/><line x1="374" y1="78" x2="381" y2="78" stroke="#334155" stroke-width="2"/><line x1="380.2" y1="55" x2="383.6" y2="57" stroke="#334155" stroke-width="1"/><line x1="397" y1="38.2" x2="399" y2="41.6" stroke="#334155" stroke-width="1"/><text x="420" y="52" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#334155">12</text><text x="450" y="82" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#334155">3</text><text x="420" y="112" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#334155">6</text><text x="390" y="82" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#334155">9</text><line x1="420" y1="78" x2="452.9" y2="59" stroke="#334155" stroke-width="2.5" stroke-linecap="round"/><line x1="420" y1="78" x2="433.8" y2="58.3" stroke="#1f2937" stroke-width="5" stroke-linecap="round"/><circle cx="420" cy="78" r="3" fill="#1f2937"/><text x="420" y="146" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#1f2937">Es la una</text><text x="420" y="162" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#1f2937">y diez</text><text x="420" y="182" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#334155">(1:10)</text></svg>`,
      diagramCaption:
        "Short, thick hand = hours; long hand = minutes. At *y media* the hour hand sits halfway between 7 and 8. At *menos cuarto* it has nearly reached 9 — which is why Spanish names the **next** hour.",
      workedExamples: [
        {
          title: "Past half? Count back",
          problem: "Write 9:40 in Spanish as an answer to *¿Qué hora es?*",
          steps: [
            "40 minutes is past the half hour, so name the **next** hour: 10 → *las diez*.",
            "From 9:40 to 10:00 is 20 minutes → *menos veinte*.",
            "Ten is plural → *son las*.",
          ],
          answer: "*Son las diez menos veinte.*",
          yourTurn: {
            question: "Your turn: write 6:45 in Spanish as an answer to *¿Qué hora es?*",
            answer: {
              type: "text",
              accept: [
                "son las siete menos cuarto",
                "son las siete menos quince",
                "son las seis cuarenta y cinco",
                "son las seis y cuarenta y cinco",
              ],
            },
            solution:
              "Past half → next hour is 7; 15 minutes to go → **Son las siete menos cuarto.** (In Latin America you may also hear *son las seis cuarenta y cinco*.)",
          },
        },
        {
          title: "Answering ¿A qué hora…?",
          problem: "Answer in a full sentence: *¿A qué hora te acuestas?* (10:30 p.m.)",
          steps: [
            "The question asks 'at what time', so the answer needs *a las*, not *son las*.",
            "*Te acuestas* → answer with *me acuesto*.",
            "10:30 → *las diez y media*; it's night → *de la noche*.",
          ],
          answer: "*Me acuesto a las diez y media de la noche.*",
          yourTurn: {
            question: "Your turn: answer in a full Spanish sentence — *¿A qué hora te levantas?* (6:15 a.m.)",
            answer: {
              type: "text",
              accept: [
                "me levanto a las seis y cuarto",
                "me levanto a las seis y cuarto de la mañana",
                "yo me levanto a las seis y cuarto",
                "yo me levanto a las seis y cuarto de la mañana",
                "me levanto a las seis y quince",
                "me levanto a las seis y quince de la mañana",
                "yo me levanto a las seis y quince",
                "yo me levanto a las seis y quince de la mañana",
                "a las seis y cuarto me levanto",
                "a las seis y cuarto de la mañana me levanto",
              ],
            },
            solution: "*Te levantas* → *me levanto*; 'at' → *a las*; 6:15 → *seis y cuarto*: **Me levanto a las seis y cuarto (de la mañana).**",
          },
        },
        {
          title: "Reading a timetable",
          problem: "A station board says: *Madrid → Sevilla 16:50*. Read the time aloud, then say it in everyday Spanish.",
          steps: [
            "24-hour clock: read the numbers as they are → *las dieciséis cincuenta*.",
            "16:50 is 4:50 p.m. → past half, so name the next hour, 5, and count back 10 minutes.",
            "Afternoon → *de la tarde*.",
          ],
          answer: "*Las dieciséis cincuenta* = *las cinco menos diez de la tarde*.",
          yourTurn: {
            question: "Your turn: write 19:30 in words the way a station announcement reads it (24-hour clock).",
            answer: {
              type: "text",
              accept: [
                "las diecinueve treinta",
                "diecinueve treinta",
                "a las diecinueve treinta",
                "las diecinueve horas treinta minutos",
                "las diecinueve horas y treinta minutos",
              ],
            },
            solution: "19 = *diecinueve*, 30 = *treinta*: **las diecinueve treinta** (in everyday speech, *las siete y media de la tarde*).",
          },
        },
      ],
      keyPoints: [
        "*Es la una* (singular) · *Son las dos, tres…* (plural).",
        "Up to half past: hour + *y* + minutes (*y cuarto, y media*). After half past: next hour + *menos* + minutes.",
        "*¿Qué hora es?* → *Son las…* · *¿A qué hora…?* → *A las…*",
        "Clock time + *de la mañana / de la tarde / de la noche*; no clock time → *por la mañana*.",
        "24-hour times are read as plain numbers: 18:40 = *las dieciocho cuarenta*.",
      ],
      whyItWorks:
        "The article comes from the hidden noun *hora*: *la (hora) una*, *las (horas) dos*. 'One hour' is singular, so the verb is too — *es*. *Menos* literally means 'minus': *las nueve menos cuarto* is 9:00 minus fifteen minutes. And *a* means 'at': *a las siete* places an action **at** a point in time, while *son las siete* simply describes the time now.",
      strategies: ["Look for the pattern", "Use the time phrase", "Translate back to check", "Mind the accent"],
      thinkDeeper:
        "Spanish has another time of day: *la madrugada*, the small hours after midnight. For 3 a.m., would you say *a las tres de la noche* or *a las tres de la madrugada*? And why do you think *la tarde* in Spain stretches until 8 or 9 p.m., much later than the English 'afternoon'? (Think about when people in Spain have dinner.)",
    },
    // ---------------------------------------------------------------------
    {
      id: "morning-routine",
      heading: "Morning routine & sequencers",
      discovery: {
        problem:
          "Lucía's morning has been jumbled up:\n\n    Finalmente llego al colegio.\n    Primero me levanto.\n    Más tarde salgo de casa.\n    Luego me ducho.\n    Después desayuno.\n\nPut the sentences in order. Which words did you use to decide?\n\nOne more puzzle: Lucía says *voy en autobús* (I go by bus) but *voy a pie* (I go on foot). Why might 'on foot' not use *en*?",
        idea:
          "The order is *primero → luego → después → más tarde → finalmente*. These words are **sequencers**: signposts that tell the listener the order, so the story makes sense even if you miss a verb.\n\n*En* means 'in' or 'on' a vehicle you get into — a bus, a car, a train. Your feet aren't a vehicle you sit in, so Spanish uses the fixed phrase *a pie*.",
      },
      body:
        "After *me levanto* and *me ducho*, the morning carries on with some very common verbs. Several are irregular in the *yo* form, so learn them as chunks:\n\n| Spanish | English |\n|---|---|\n| desayuno | I have breakfast |\n| me pongo el uniforme | I put on my uniform |\n| salgo de casa | I leave home |\n| cojo el autobús | I catch the bus |\n| voy al colegio | I go to school |\n| llego al colegio | I arrive at school |\n| las clases empiezan | lessons start |\n\n*Desayuno* is a verb ('I have breakfast') and also a noun (*el desayuno*, 'breakfast'). To say what you eat: *Desayuno cereales con leche* or *Para desayunar, tomo tostadas con kaya y un zumo de naranja.*\n\n> In Spain *coger* means 'to catch' (a bus or train). In much of Latin America people say *tomar el autobús* instead.\n\n**How do you get there?** Use **en** + transport (you're *in* it), but **a pie** for 'on foot':\n\n| Spanish | English |\n|---|---|\n| en autobús | by bus |\n| en coche | by car |\n| en metro | by underground / MRT |\n| en tren | by train |\n| en bici | by bike |\n| a pie / andando | on foot |\n\n    Voy al colegio en metro.\n    Mi amiga Priya va al colegio a pie.\n\nRemember *a + el = al*: *voy al colegio, llego al colegio*.\n\n**Sequencers** turn a list into a story:\n\n| Spanish | English |\n|---|---|\n| primero | first |\n| luego | then, next |\n| después | afterwards |\n| más tarde | later |\n| entonces | then, so |\n| finalmente / por último | finally, lastly |\n\n**Adding the time:** *a las* + time can go at the start or the end of the sentence: *A las siete desayuno* = *Desayuno a las siete.*\n\nPut it all together:\n\n    Primero me levanto a las seis y media. Luego me ducho y me visto.\n    Después desayuno tostadas. Más tarde, a las siete y veinte, salgo de casa.\n    Voy al colegio en autobús y finalmente llego al colegio a las ocho menos cuarto.",
      diagram: `<svg viewBox="0 0 480 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Timeline of a morning: primero 6:30 me levanto, luego 6:40 me ducho, después 7:00 desayuno, más tarde 7:20 salgo de casa, finalmente 7:45 llego al colegio"><rect x="0" y="0" width="480" height="180" fill="#ffffff"/><line x1="20" y1="80" x2="456" y2="80" stroke="#1f2937" stroke-width="3"/><polygon points="468,80 454,73 454,87" fill="#1f2937"/><g font-family="sans-serif" text-anchor="middle"><rect x="10" y="34" width="80" height="24" rx="6" fill="#c7d2fe" stroke="#334155"/><text x="50" y="51" font-size="12" font-weight="bold" fill="#1f2937">Primero</text><rect x="100" y="34" width="80" height="24" rx="6" fill="#bbf7d0" stroke="#334155"/><text x="140" y="51" font-size="12" font-weight="bold" fill="#1f2937">Luego</text><rect x="190" y="34" width="80" height="24" rx="6" fill="#fde68a" stroke="#334155"/><text x="230" y="51" font-size="12" font-weight="bold" fill="#1f2937">Después</text><rect x="280" y="34" width="80" height="24" rx="6" fill="#fecaca" stroke="#334155"/><text x="320" y="51" font-size="12" font-weight="bold" fill="#1f2937">Más tarde</text><rect x="370" y="34" width="80" height="24" rx="6" fill="#bae6fd" stroke="#334155"/><text x="410" y="51" font-size="12" font-weight="bold" fill="#1f2937">Finalmente</text><circle cx="50" cy="80" r="6" fill="#1f2937"/><circle cx="140" cy="80" r="6" fill="#1f2937"/><circle cx="230" cy="80" r="6" fill="#1f2937"/><circle cx="320" cy="80" r="6" fill="#1f2937"/><circle cx="410" cy="80" r="6" fill="#1f2937"/><text x="50" y="106" font-size="13" fill="#334155">6:30</text><text x="140" y="106" font-size="13" fill="#334155">6:40</text><text x="230" y="106" font-size="13" fill="#334155">7:00</text><text x="320" y="106" font-size="13" fill="#334155">7:20</text><text x="410" y="106" font-size="13" fill="#334155">7:45</text><text x="50" y="128" font-size="12" fill="#1f2937">me levanto</text><text x="140" y="128" font-size="12" fill="#1f2937">me ducho</text><text x="230" y="128" font-size="12" fill="#1f2937">desayuno</text><text x="320" y="128" font-size="12" fill="#1f2937">salgo</text><text x="320" y="144" font-size="12" fill="#1f2937">de casa</text><text x="410" y="128" font-size="12" fill="#1f2937">llego</text><text x="410" y="144" font-size="12" fill="#1f2937">al colegio</text></g></svg>`,
      diagramCaption:
        "The sequencers sit above the line, the clock times and actions below — the same morning as the paragraph above.",
      workedExamples: [
        {
          title: "Build it up with sequencers",
          problem: "Translate: 'First I get up at half past six, then I have a shower and afterwards I have breakfast.'",
          steps: [
            "Sequencers: first = *primero*, then = *luego*, afterwards = *después*.",
            "Reflexive verbs need *me*: *me levanto, me ducho*. 'I have breakfast' is one verb: *desayuno*.",
            "Time: half past six → *a las seis y media*.",
          ],
          answer: "*Primero me levanto a las seis y media, luego me ducho y después desayuno.*",
          yourTurn: {
            question: "Your turn: translate into Spanish — 'I go to school by bus.'",
            answer: {
              type: "text",
              accept: [
                "voy al colegio en autobús",
                "yo voy al colegio en autobús",
                "voy en autobús al colegio",
                "yo voy en autobús al colegio",
                "voy al instituto en autobús",
                "yo voy al instituto en autobús",
                "voy en autobús al instituto",
                "yo voy en autobús al instituto",
              ],
            },
            solution: "*Ir* → *voy*; *a + el colegio* → *al colegio*; by bus → *en autobús*: **Voy al colegio en autobús.**",
          },
        },
        {
          title: "Leaving and arriving",
          problem: "Translate: 'I leave home at quarter past seven and I arrive at school at quarter to eight.'",
          steps: [
            "'I leave' = *salgo* (irregular *yo* form of *salir*); 'home' = *de casa*.",
            "'I arrive at school' = *llego al colegio*.",
            "7:15 → *las siete y cuarto*; 7:45 → past half, so *las ocho menos cuarto*.",
          ],
          answer: "*Salgo de casa a las siete y cuarto y llego al colegio a las ocho menos cuarto.*",
          yourTurn: {
            question: "Your turn: translate into Spanish — 'I walk to school.' (literally: I go to school on foot)",
            answer: {
              type: "text",
              accept: [
                "voy al colegio a pie",
                "yo voy al colegio a pie",
                "voy a pie al colegio",
                "yo voy a pie al colegio",
                "voy al colegio andando",
                "yo voy al colegio andando",
                "voy andando al colegio",
                "yo voy andando al colegio",
                "voy al instituto a pie",
                "voy a pie al instituto",
                "voy al instituto andando",
                "voy andando al instituto",
              ],
            },
            solution: "Not *en pie* — the fixed phrase is *a pie* (or *andando*): **Voy al colegio a pie.**",
          },
        },
      ],
      keyPoints: [
        "*salgo, voy, me pongo* are irregular in the *yo* form — learn them as chunks.",
        "*en* + transport (*en autobús, en metro*), but *a pie* / *andando*.",
        "*a + el = al*: *voy al colegio, llego al colegio*.",
        "Sequencers: *primero, luego, después, más tarde, entonces, finalmente / por último*.",
        "*a las* + time can go at the start or the end of a sentence.",
      ],
      whyItWorks:
        "Sequencers work like the numbered steps in a recipe: they let you join short, safe sentences into a longer, organised piece of writing without any new grammar. Examiners reward this because it shows you can structure ideas. *En* + transport works because you are literally *in* the bus or car; *a pie* is a fixed phrase, just like English 'on foot'.",
      strategies: ["Build it up (extended sentence)", "Recycle a chunk", "Use the time phrase", "Mind the accent"],
      thinkDeeper:
        "*Luego* and *después* both mean 'then / afterwards'. Write a five-step morning using five **different** sequencers — no *y luego… y luego…*! Then ask yourself: why might *entonces* sound odd as the very first word of a routine?",
    },
    // ---------------------------------------------------------------------
    {
      id: "evening-routine",
      heading: "Afternoon and evening routine",
      discovery: {
        problem:
          "Read these sentences:\n\n    Después de cenar, veo la tele.\n    Antes de acostarme, leo.\n    Después de hacer los deberes, juego con el móvil.\n\nLook at the verb straight after *después de* and *antes de*. Is it *ceno* or *cenar*? *Hago* or *hacer*? Make a rule.\n\nBonus: why is it *acostarme* here, not *acostarse*?",
        idea:
          "After *antes de* and *después de* the verb is always the **infinitive**: *cenar, hacer, acostar-*. English does something similar with '-ing': 'after **having** dinner', 'before **going** to bed'.\n\nWith a reflexive verb, the pronoun is glued to the end of the infinitive and still matches the person. *I* am going to bed, so it's *acostarme*.",
      },
      body:
        "**After school** (*después del colegio*):\n\n| Spanish | English |\n|---|---|\n| vuelvo a casa | I go back home |\n| meriendo | I have an afternoon snack |\n| hago los deberes | I do my homework |\n| ceno | I have dinner |\n| veo la tele | I watch TV |\n| leo | I read |\n| juego con el móvil | I play on my phone |\n| chateo con mis amigos | I chat with my friends |\n| me acuesto | I go to bed |\n\n*La merienda* is the snack Spanish children have between lunch and a late dinner — perhaps *un bocadillo de queso*, some fruit or *un yogur*, around 5 or 6 p.m. *Meriendo* = I have that snack.\n\n*Los deberes* is always plural: *hago los deberes*. Notice *vuelvo* (o→ue) and *meriendo* (e→ie) — both are boot verbs (section 5). *Veo* (I watch) has an extra *e* in the *yo* form: *veo, ves, ve…*\n\n**Antes de / después de + infinitive**\n\nTo say 'before doing' or 'after doing', use **antes de** or **después de** + the **infinitive** (the *-ar / -er / -ir* form) — never a conjugated verb:\n\n| Spanish | English |\n|---|---|\n| después de cenar | after having dinner |\n| antes de hacer los deberes | before doing my homework |\n| después de volver a casa | after getting home |\n| antes de acostarme | before going to bed |\n\n    Después de cenar, veo la tele.\n    Leo un poco antes de dormir.\n\nWith a reflexive verb, the pronoun sticks to the end of the infinitive and matches the person: *antes de acostarme* (me), *antes de acostarte* (you), *antes de acostarse* (he / she).\n\nCompare:\n- *después del colegio* — followed by a **noun**, so *de + el = del*\n- *después de comer* — followed by a **verb**, so the infinitive",
      workedExamples: [
        {
          title: "Join two sentences",
          problem: "Join these into one sentence with *después de*: *Hago los deberes. Luego ceno.*",
          steps: [
            "The first action becomes the *después de* part: 'after doing my homework'.",
            "After *de* use the infinitive: *hacer*, not *hago*.",
            "The second action keeps its normal form: *ceno*.",
          ],
          answer: "*Después de hacer los deberes, ceno.* (Or the other way round: *Antes de cenar, hago los deberes.*)",
          yourTurn: {
            question: "Your turn: translate into Spanish — 'After dinner, I watch TV.' (Use *cenar* or *la cena*.)",
            answer: {
              type: "text",
              accept: [
                "después de cenar veo la tele",
                "después de cenar veo la televisión",
                "veo la tele después de cenar",
                "veo la televisión después de cenar",
                "después de cenar yo veo la tele",
                "después de cenar yo veo la televisión",
                "después de la cena veo la tele",
                "después de la cena veo la televisión",
                "veo la tele después de la cena",
                "veo la televisión después de la cena",
              ],
            },
            solution: "'After' + verb → *después de* + infinitive *cenar*; 'I watch TV' → *veo la tele*: **Después de cenar, veo la tele.**",
          },
        },
        {
          title: "A reflexive infinitive",
          problem: "Translate: 'Before going to bed, I read.'",
          steps: [
            "'Before going' → *antes de* + infinitive.",
            "'To go to bed' = *acostarse*, but it's *me* going to bed → *acostarme*.",
            "'I read' = *leo*.",
          ],
          answer: "*Antes de acostarme, leo.*",
          yourTurn: {
            question: "Your turn: translate into Spanish — 'Before going to bed, I brush my teeth.'",
            answer: {
              type: "text",
              accept: [
                "antes de acostarme me lavo los dientes",
                "antes de acostarme yo me lavo los dientes",
                "me lavo los dientes antes de acostarme",
                "yo me lavo los dientes antes de acostarme",
                "antes de acostarme me cepillo los dientes",
                "me cepillo los dientes antes de acostarme",
              ],
            },
            solution: "*Antes de* + *acostarme* (pronoun on the end, matching 'I'); then *me lavo los dientes*: **Antes de acostarme, me lavo los dientes.**",
          },
        },
      ],
      keyPoints: [
        "*vuelvo a casa, meriendo, hago los deberes, ceno, veo la tele, leo, me acuesto*.",
        "*antes de / después de* + **infinitive**: *después de cenar*.",
        "Reflexive infinitive: the pronoun goes on the end and matches the person — *antes de acostarme*.",
        "*después del colegio* (+ noun) vs *después de comer* (+ verb).",
      ],
      whyItWorks:
        "*De* is a preposition, and in Spanish a verb that follows a preposition is always in its 'name' form — the infinitive. Only one verb in the clause carries the person and tense (*veo*); the other just names an activity (*cenar*). The reflexive pronoun still has to show *who*, so it hitches a ride on the end of the infinitive: *antes de acostarme*.",
      strategies: ["Find the infinitive", "Build it up (extended sentence)", "Check the subject", "Look for the pattern"],
      thinkDeeper:
        "*Antes de cenar, hago los deberes* and *Después de hacer los deberes, ceno* describe exactly the same evening. Which one puts the focus on dinner, and which on homework? Now write your whole evening as two sentences, using *antes de* once and *después de* once.",
    },
    // ---------------------------------------------------------------------
    {
      id: "stem-changes-and-irregular-yo",
      heading: "Stem-changing verbs and irregular 'yo' forms",
      discovery: {
        problem:
          "Here is *dormir* (to sleep) in full:\n\n    duermo, duermes, duerme, dormimos, dormís, duermen\n\n1. Which forms have *ue* and which keep *o*?\n2. Say each form aloud and tap the stressed syllable: *DUER-mo*, *dor-MI-mos*… Where does the stress fall in the forms that change?",
        idea:
          "The four forms with *ue* — *duermo, duermes, duerme, duermen* — are exactly the ones where the stress lands on the **stem**. In *dormimos* and *dormís* the stress moves to the **ending**, so the stem keeps its plain *o*.\n\nPut the six forms in a table (singular on the left, plural on the right) and draw a line around the changed forms: you get the shape of a **boot**.",
      },
      body:
        "**Boot verbs** change a vowel in the stem — but only in four forms: *yo, tú, él / ella, ellos / ellas*. *Nosotros* and *vosotros* stay regular.\n\n**e → ie**\n\n| | despertarse | empezar | merendar |\n|---|---|---|---|\n| yo | me desp**ie**rto | emp**ie**zo | mer**ie**ndo |\n| tú | te desp**ie**rtas | emp**ie**zas | mer**ie**ndas |\n| él / ella | se desp**ie**rta | emp**ie**za | mer**ie**nda |\n| nosotros | nos despertamos | empezamos | merendamos |\n| vosotros | os despertáis | empezáis | merendáis |\n| ellos / ellas | se desp**ie**rtan | emp**ie**zan | mer**ie**ndan |\n\n**o → ue**\n\n| | acostarse | volver | dormir |\n|---|---|---|---|\n| yo | me ac**ue**sto | v**ue**lvo | d**ue**rmo |\n| tú | te ac**ue**stas | v**ue**lves | d**ue**rmes |\n| él / ella | se ac**ue**sta | v**ue**lve | d**ue**rme |\n| nosotros | nos acostamos | volvemos | dormimos |\n| vosotros | os acostáis | volvéis | dormís |\n| ellos / ellas | se ac**ue**stan | v**ue**lven | d**ue**rmen |\n\n*Jugar* is the only **u → ue** verb: *juego, juegas, juega, jugamos, jugáis, juegan*.\n\n**e → i**\n\n| | vestirse (to get dressed) |\n|---|---|\n| yo | me v**i**sto |\n| tú | te v**i**stes |\n| él / ella | se v**i**ste |\n| nosotros | nos vestimos |\n| vosotros | os vestís |\n| ellos / ellas | se v**i**sten |\n\n**Irregular yo forms.** Some verbs are regular except in the *yo* form — and several of them end in **-go**:\n\n| | hacer | salir | ponerse | ir |\n|---|---|---|---|---|\n| yo | **hago** | **salgo** | **me pongo** | **voy** |\n| tú | haces | sales | te pones | vas |\n| él / ella | hace | sale | se pone | va |\n| nosotros | hacemos | salimos | nos ponemos | vamos |\n| vosotros | hacéis | salís | os ponéis | vais |\n| ellos / ellas | hacen | salen | se ponen | van |\n\n*Ir* is irregular all the way through — learn it as a chant: *voy, vas, va, vamos, vais, van*. *Ver* only adds an *e* in the *yo* form: *veo, ves, ve, vemos, veis, ven*.\n\n    Me pongo el uniforme, salgo de casa y voy al colegio.\n    Las clases empiezan a las ocho y vuelvo a casa a las cuatro.",
      diagram: `<svg viewBox="0 0 460 268" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Boot diagram for acostarse: the forms me acuesto, te acuestas, se acuesta and se acuestan are inside a boot shape; nos acostamos and os acostáis are outside it"><rect x="0" y="0" width="460" height="268" fill="#ffffff"/><text x="230" y="24" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#1f2937">acostarse (o → ue)</text><polygon points="30,40 225,40 225,145 430,145 430,210 30,210" fill="#fde68a" stroke="#1f2937" stroke-width="3" stroke-linejoin="round"/><line x1="230" y1="40" x2="230" y2="210" stroke="#334155" stroke-dasharray="4 3"/><line x1="30" y1="95" x2="430" y2="95" stroke="#334155" stroke-dasharray="4 3"/><line x1="30" y1="150" x2="430" y2="150" stroke="#334155" stroke-dasharray="4 3"/><g font-family="sans-serif" text-anchor="middle"><text x="130" y="62" font-size="11" fill="#334155">yo</text><text x="130" y="82" font-size="14" font-weight="bold" fill="#1f2937">me acuesto</text><text x="130" y="117" font-size="11" fill="#334155">tú</text><text x="130" y="137" font-size="14" font-weight="bold" fill="#1f2937">te acuestas</text><text x="130" y="172" font-size="11" fill="#334155">él / ella</text><text x="130" y="192" font-size="14" font-weight="bold" fill="#1f2937">se acuesta</text><text x="330" y="62" font-size="11" fill="#334155">nosotros</text><text x="330" y="82" font-size="14" fill="#1f2937">nos acostamos</text><text x="330" y="117" font-size="11" fill="#334155">vosotros</text><text x="330" y="137" font-size="14" fill="#1f2937">os acostáis</text><text x="330" y="172" font-size="11" fill="#334155">ellos / ellas</text><text x="330" y="192" font-size="14" font-weight="bold" fill="#1f2937">se acuestan</text><text x="230" y="236" font-size="12" fill="#1f2937">Inside the boot: stress on the stem → ue (ac-UES-to)</text><text x="230" y="256" font-size="12" fill="#1f2937">Outside: stress on the ending → o stays (a-cos-TA-mos)</text></g></svg>`,
      diagramCaption:
        "The four forms inside the boot change *o* to *ue*. *Nosotros* and *vosotros* sit outside the boot and keep the plain stem.",
      workedExamples: [
        {
          title: "Inside or outside the boot?",
          problem: "Write the *nosotros* and the *ella* forms of *volver* (o→ue).",
          steps: [
            "*Nosotros* is outside the boot → no change: *volv-* + *-emos* = *volvemos*.",
            "*Ella* is inside the boot → o becomes ue: *vuelv-* + *-e* = *vuelve*.",
          ],
          answer: "*volvemos* (outside the boot) · *vuelve* (inside the boot)",
          yourTurn: {
            question: "Your turn: write the *ellos* form of *dormir* in the present tense.",
            answer: { type: "text", accept: ["duermen", "ellos duermen", "ellas duermen"] },
            solution: "*Ellos* is inside the boot → *o* becomes *ue*: *duerm-* + *-en* = **duermen**.",
          },
        },
        {
          title: "Irregular yo forms in a sentence",
          problem: "Translate: 'I put on my uniform and I leave home at seven.'",
          steps: [
            "'To put on (clothes)' = *ponerse* → *yo* form *me pongo* (irregular *-go*).",
            "'My uniform' → *el uniforme* (clothes, like body parts, normally take the article).",
            "'I leave' = *salgo* (irregular *-go*) + *de casa*.",
          ],
          answer: "*Me pongo el uniforme y salgo de casa a las siete.*",
          yourTurn: {
            question: "Your turn: write the *yo* form of *salir* in the present tense.",
            answer: { type: "text", accept: ["salgo", "yo salgo"] },
            solution: "*Salir* is a *-go* verb in the *yo* form: **salgo** (not *salo*).",
          },
        },
        {
          title: "e → ie and e → i",
          problem: "Complete with *vestirse*: *Mis hermanas ___ muy rápido.*",
          steps: [
            "Subject *mis hermanas* = *ellas* → pronoun *se*.",
            "*Vestir* is e→i, and *ellas* is inside the boot → *vist-*.",
            "*-ir* verb, *ellas* ending *-en*: *se visten*.",
          ],
          answer: "*Mis hermanas se visten muy rápido.*",
          yourTurn: {
            question: "Your turn: complete with the correct form of *empezar* — *Las clases ___ a las ocho.*",
            answer: { type: "text", accept: ["empiezan"] },
            solution: "*Las clases* = *ellas*, inside the boot → e becomes ie: **empiezan**.",
          },
        },
      ],
      keyPoints: [
        "Boot = *yo, tú, él / ella, ellos / ellas*. *Nosotros* and *vosotros* never change.",
        "e→ie: *me despierto, empiezo, meriendo*. o→ue: *me acuesto, vuelvo, duermo*. e→i: *me visto*. u→ue: *juego*.",
        "Irregular *yo*: *hago, salgo, me pongo, voy, veo*.",
        "*Ir*: *voy, vas, va, vamos, vais, van*.",
        "Reflexive boot verbs need both changes: pronoun **and** stem — *se acuestan*.",
      ],
      whyItWorks:
        "Over many centuries, as Latin turned into Spanish, certain stressed vowels 'broke' into two sounds: a stressed short *o* became *ue* and a stressed short *e* became *ie*. Unstressed vowels were left alone. In the *nosotros* and *vosotros* forms the stress falls on the ending (*dor-MI-mos*), so the stem vowel isn't stressed and doesn't break — that's why the boot exists: it's a map of where the stress falls. The *-go* forms (*hago, salgo, pongo*) are old irregularities that survived only in the *yo* form, so learn them as a family.",
      strategies: ["Look for the pattern", "Say it aloud", "Find the infinitive", "Check the subject"],
      thinkDeeper:
        "Without looking anything up, predict the *yo* and *nosotros* forms of *pensar* (e→ie) and *poder* (o→ue). Then explain to someone else, using the idea of stress, why it is *podemos* and not *puedemos*.",
    },
    // ---------------------------------------------------------------------
    {
      id: "someone-elses-routine",
      heading: "Describing someone else's routine",
      discovery: {
        problem:
          "Read Pablo's description:\n\n    Me levanto a las seis, pero mi hermana se levanta a las ocho.\n    Mis padres se levantan a las siete.\n    Los fines de semana, mi hermana y yo nos levantamos tarde.\n\nFind four different forms of *levantarse*. Who does each one describe? What happens to the little word in front of the verb when the person changes?",
        idea:
          "*me levanto* (I), *se levanta* (my sister), *se levantan* (my parents), *nos levantamos* (my sister and I). The pronoun and the ending change **together**: *me … -o*, *se … -a*, *se … -an*, *nos … -amos*.\n\nNotice that *se* covers 'he', 'she' **and** 'they' — so the verb ending has to tell you which.",
      },
      body:
        "To describe someone else's day, change **both** the pronoun and the verb ending. For one person (*él, ella, mi hermano, Lucía*) use **se** + the *él* form; for more than one person (*ellos, mis padres*) use **se** + the *ellos* form. Verbs that aren't reflexive simply change their ending.\n\n| | one person (él / ella) | more people (ellos / ellas) |\n|---|---|---|\n| levantarse | se levanta | se levantan |\n| ducharse | se ducha | se duchan |\n| vestirse | se viste | se visten |\n| acostarse | se acuesta | se acuestan |\n| desayunar | desayuna | desayunan |\n| salir | sale | salen |\n| ir | va | van |\n| volver | vuelve | vuelven |\n| hacer | hace | hacen |\n| dormir | duerme | duermen |\n\n    Mi hermano se levanta a las siete.\n    Mis padres se acuestan a las once.\n\nCareful with 'X and I' — that's *nosotros*: *Mi hermana y yo nos levantamos temprano.*\n\n**Comparing routines**\n\n| Spanish | English |\n|---|---|\n| pero | but |\n| mientras que | whereas |\n| también | also, too |\n| en cambio | on the other hand |\n| más temprano que | earlier than |\n| más tarde que | later than |\n\n    Yo me levanto a las seis, pero mi hermana se levanta a las ocho.\n    Mi padre sale de casa a las siete, mientras que mi madre trabaja en casa.\n    Mi hermano se acuesta más tarde que yo.\n\n**Weekdays vs the weekend**\n\n- *durante la semana* / *de lunes a viernes* — during the week\n- *los fines de semana* — at weekends\n- *los sábados* / *los domingos* — on Saturdays / on Sundays (no word for 'on')\n- *temprano* — early · *tarde* — late\n\n    Durante la semana me levanto temprano, pero los fines de semana me levanto tarde.\n    Los domingos mi familia desayuna churros a las diez.",
      workedExamples: [
        {
          title: "From yo to ella",
          problem: "Rewrite about your sister: *Me despierto a las seis. Me ducho, me visto y desayuno. Salgo de casa a las siete.*",
          steps: [
            "Every *me* becomes *se*: *se despierta, se ducha, se viste*.",
            "Every *yo* ending becomes the *ella* ending, keeping the boot changes: *despierta, viste*.",
            "Non-reflexive verbs just change ending: *desayuna*; *salgo* → *sale* (the *-go* is only for *yo*).",
          ],
          answer: "*Mi hermana se despierta a las seis. Se ducha, se viste y desayuna. Sale de casa a las siete.*",
          yourTurn: {
            question: "Your turn: write in Spanish — 'My parents go to bed at eleven.'",
            answer: {
              type: "text",
              accept: [
                "mis padres se acuestan a las once",
                "mis padres se acuestan a las once de la noche",
                "a las once mis padres se acuestan",
                "a las once de la noche mis padres se acuestan",
              ],
            },
            solution: "*Mis padres* = *ellos* → *se* + boot form *acuestan*: **Mis padres se acuestan a las once.**",
          },
        },
        {
          title: "Weekdays vs weekend",
          problem: "Translate: 'During the week I get up at six, but at weekends I get up at ten.'",
          steps: [
            "'During the week' = *durante la semana*; 'at weekends' = *los fines de semana*.",
            "Same verb twice: *me levanto*.",
            "Join with *pero*.",
          ],
          answer: "*Durante la semana me levanto a las seis, pero los fines de semana me levanto a las diez.*",
          yourTurn: {
            question: "Your turn: translate into Spanish — 'My brother and I have breakfast at seven.'",
            answer: {
              type: "text",
              accept: [
                "mi hermano y yo desayunamos a las siete",
                "mi hermano y yo desayunamos a las siete de la mañana",
                "a las siete mi hermano y yo desayunamos",
              ],
            },
            solution: "'My brother and I' = *nosotros* → *desayunamos*: **Mi hermano y yo desayunamos a las siete.**",
          },
        },
      ],
      keyPoints: [
        "One other person: *se* + *él / ella* form (*se levanta*). Several people: *se* + *ellos* form (*se levantan*).",
        "Non-reflexive verbs just change their ending: *desayuna, sale, va, vuelve*.",
        "'My brother and I' = *nosotros*: *nos levantamos, desayunamos*.",
        "Compare with *pero, mientras que, en cambio, más temprano que, más tarde que*.",
        "*los fines de semana, los sábados* — no word for 'on'.",
      ],
      whyItWorks:
        "A reflexive verb shows 'who' in two places: the pronoun (*me / se / nos*) and the ending (*-o / -a / -amos*). They must match, like two halves of a ticket. Because *se* is shared by *él, ella* and *ellos*, the ending does the extra work: *se levanta* (one person) vs *se levantan* (more than one). And the plural article with days (*los sábados*) turns one day into a habit — 'every Saturday'.",
      strategies: ["Check the subject", "Agreement check", "Translate back to check", "Build it up (extended sentence)"],
      thinkDeeper:
        "Write two sentences comparing your routine with a family member's — one about a school day and one about the weekend — using *mientras que* once and *más tarde que* once. Then: why does *Mi hermano se acuesta más tarde que yo* end with *yo* and not *me*?",
    },
  ],
  learn: {
    flashcards: [
      { front: "me despierto", back: "I wake up" },
      { front: "me levanto", back: "I get up" },
      { front: "me ducho", back: "I have a shower" },
      { front: "me lavo los dientes", back: "I brush my teeth" },
      { front: "me visto", back: "I get dressed" },
      { front: "me acuesto", back: "I go to bed" },
      { front: "Son las ocho y cuarto.", back: "It's quarter past eight." },
      { front: "Son las nueve menos cuarto.", back: "It's quarter to nine." },
      { front: "Es la una y media.", back: "It's half past one." },
      { front: "¿A qué hora…?", back: "At what time…?" },
      { front: "a las siete de la tarde", back: "at seven in the evening (7 p.m.)" },
      { front: "salgo de casa", back: "I leave home" },
      { front: "voy al colegio a pie", back: "I walk to school (I go to school on foot)" },
      { front: "primero… luego… finalmente", back: "first… then… finally" },
      { front: "meriendo", back: "I have an afternoon snack" },
      { front: "hago los deberes", back: "I do my homework" },
      { front: "después de cenar", back: "after having dinner" },
      { front: "antes de acostarme", back: "before going to bed" },
      { front: "Which forms of a boot verb change?", back: "yo, tú, él / ella, ellos / ellas — never nosotros or vosotros" },
      { front: "mis padres se acuestan", back: "my parents go to bed" },
      { front: "los fines de semana", back: "at weekends" },
    ],
    mustKnow: [
      "I can conjugate *levantarse* in all six persons with the right reflexive pronoun.",
      "I can describe my morning routine using at least six verbs, reflexive and non-reflexive.",
      "I can tell the time with *y cuarto, y media, menos cuarto* and any number of minutes.",
      "I can tell *¿Qué hora es?* and *¿A qué hora…?* apart and answer each one correctly.",
      "I can add *de la mañana / de la tarde / de la noche* to a clock time.",
      "I can read a 24-hour timetable time aloud.",
      "I can link my routine with sequencers: *primero, luego, después, más tarde, finalmente*.",
      "I can say how I get to school: *en autobús, en metro, en coche, a pie*.",
      "I can use *antes de / después de* + infinitive, including *antes de acostarme*.",
      "I can conjugate boot verbs (*despertarse, acostarse, volver, dormir, vestirse*) and the irregular *yo* forms *hago, salgo, me pongo, voy*.",
      "I can describe and compare someone else's routine on weekdays and at weekends.",
    ],
    misconceptions: [
      { wrong: "*Levanto a las siete.* (meaning 'I get up at seven')", right: "*Me levanto a las siete.* — without *me* it means 'I lift (something) at seven'." },
      { wrong: "*Me lavo mis dientes.*", right: "*Me lavo los dientes.* — body parts take the article; *me* already shows whose teeth." },
      { wrong: "*Es las dos.*", right: "*Son las dos.* — only *la una* takes *es*." },
      { wrong: "*Mi hermano me levanta a las ocho.* (meaning 'my brother gets up at eight')", right: "*Mi hermano se levanta a las ocho.* — the pronoun matches the person; *me levanta* would mean 'gets **me** up'." },
      { wrong: "*Después de ceno, veo la tele.*", right: "*Después de cenar, veo la tele.* — after *de* the verb is an infinitive." },
      { wrong: "*Nosotros nos acuestamos.*", right: "*Nosotros nos acostamos.* — *nosotros* is outside the boot, so no stem change." },
      { wrong: "*Voy al colegio en pie.*", right: "*Voy al colegio a pie.* — 'on foot' is the fixed phrase *a pie*." },
    ],
    examMistakes: [
      "Dropping the reflexive pronoun: writing *ducho* instead of *me ducho*.",
      "Using the wrong pronoun for the person: *mi madre me acuesta* instead of *mi madre se acuesta*.",
      "Writing *es las…* for any time other than one o'clock.",
      "Answering *¿A qué hora…?* with *son las siete* instead of *a las siete*.",
      "Writing *por la mañana* after a clock time instead of *de la mañana*: *a las siete de la mañana*.",
      "Forgetting the irregular *yo* forms: *salo* instead of *salgo*, *haco* instead of *hago*.",
      "Putting a stem change in *nosotros*: *vuelvemos* instead of *volvemos*, *nos despiertamos* instead of *nos despertamos*.",
      "Missing accents: *despues, mas tarde, os levantais, dieciseis* should be *después, más tarde, os levantáis, dieciséis*.",
      "Repeating *y luego… y luego…* — vary your sequencers to show range.",
    ],
    mnemonics: [
      {
        topic: "Boot verbs",
        device: "Draw the boot",
        explanation: "Write the six forms in two columns (singular left, plural right) and draw round the four that change — *yo, tú, él, ellos*. It makes a boot; *nosotros* and *vosotros* are left outside.",
      },
      {
        topic: "Es la una",
        device: "One is lonely",
        explanation: "Only *una* is singular, so only one o'clock gets *es*. Every other hour has company: *son las…*",
      },
      {
        topic: "Irregular yo forms",
        device: "The GO gang",
        explanation: "*hago, pongo, salgo* (and later *tengo, vengo*) all end in *-go* in the *yo* form — they 'go' together.",
      },
      {
        topic: "y vs menos",
        device: "Add on, then take off",
        explanation: "Up to half past you **add** minutes (*y*); after half past you **take them off** the next hour (*menos*).",
      },
    ],
    realWorld: [
      {
        title: "Late dinners in Spain",
        detail: "Many Spanish families have *la comida*, the main meal, at around 2 p.m. and *la cena* at 9 p.m. or later. On an exchange you might hear: *¿A qué hora cenamos? — A las nueve y media.*",
        emoji: "🍽️",
      },
      {
        title: "La merienda",
        detail: "After school, Spanish children often have *la merienda* — perhaps *un bocadillo de queso*, some fruit, or *churros* as a weekend treat. Ask your exchange partner: *¿Qué meriendas normalmente?*",
        emoji: "🥪",
      },
      {
        title: "Reading a train timetable",
        detail: "Spanish stations and tickets use the 24-hour clock: *El tren para Valencia sale a las 17:40* (*las diecisiete cuarenta*). Mix up 7:40 and 17:40 and you'll miss your train!",
        emoji: "🚆",
      },
      {
        title: "Una hora menos en Canarias",
        detail: "The Canary Islands are one hour behind mainland Spain, so Spanish radio often gives the time like this: *Son las ocho, las siete en Canarias.*",
        emoji: "📻",
      },
      {
        title: "Your day in Singapore",
        detail: "Tell a Spanish penfriend about your day: *Me levanto a las seis y cuarto y voy al colegio en metro. Hace calor todo el año, así que me ducho dos veces al día.*",
        emoji: "🌴",
      },
    ],
    videos: [
      { title: "Reflexive verbs and daily routine", channel: "Señor Jordan", url: "https://www.youtube.com/results?search_query=senor+jordan+spanish+reflexive+verbs+daily+routine" },
      { title: "Telling the time in Spanish", channel: "Spanish with Profe", url: "https://www.youtube.com/results?search_query=telling+the+time+in+spanish+que+hora+es" },
      { title: "Stem-changing (boot) verbs", channel: "Language Gym", url: "https://www.youtube.com/results?search_query=spanish+stem+changing+boot+verbs+present+tense" },
      { title: "Mi rutina diaria — listening practice", channel: "Dreaming Spanish", url: "https://www.youtube.com/results?search_query=dreaming+spanish+mi+rutina+diaria" },
    ],
    formulas: [
      { name: "Reflexive verb (present)", formula: "me / te / se / nos / os / se + conjugated verb", note: "Me levanto a las siete. Mis padres se acuestan tarde." },
      { name: "Telling the time", formula: "Es la una / Son las + hour (+ y / menos + minutes)", note: "Son las ocho menos cuarto." },
      { name: "At what time?", formula: "a la una / a las + hour (+ de la mañana / tarde / noche)", note: "Me acuesto a las diez de la noche." },
      { name: "Before / after doing", formula: "antes de / después de + infinitive", note: "Después de cenar, leo. Antes de acostarme, me ducho." },
      { name: "Boot verbs", formula: "stem change in yo, tú, él, ellos — not nosotros, vosotros", note: "duermo, duermes, duerme, dormimos, dormís, duermen" },
      { name: "Sequenced routine", formula: "primero + verb, luego + verb, después + verb, finalmente + verb", note: "Primero me ducho, luego desayuno y finalmente salgo de casa." },
    ],
  },
};
