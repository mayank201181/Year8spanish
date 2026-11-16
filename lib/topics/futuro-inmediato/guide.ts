import type { TopicGuide } from "../../types.ts";

export const guide: TopicGuide = {
  id: "futuro-inmediato",
  title: "El futuro inmediato — Going To…",
  strand: "Grammar",
  icon: "🚀",
  summary: "Voy a…, vas a…, va a… — talk about plans, invitations and predictions with one verb.",
  intro:
    "You already know how to say what you do. Now you'll say what you're **going to** do — and the good news is that Spanish builds its near future almost exactly like English: *voy a jugar* = 'I'm going to play'.\n\nIn this topic you'll master the irregular verb **ir** (*voy, vas, va, vamos, vais, van*), use it with **a + infinitive** for every person (including negatives, questions and reflexive verbs), add **future time phrases** like *pasado mañana* and *la semana que viene*, make **plans, invitations and predictions**, and learn to tell a **present** sentence from a **future** one at a glance.\n\nBy the end you should be able to write — and understand every word of — a message like this:\n\n    ¿Qué vas a hacer este fin de semana? El sábado voy a ir a la playa con mis primos.\n    Va a hacer mucho calor, pero va a ser genial. ¿Quieres venir?",
  guide: [
    // ---------------------------------------------------------------------
    {
      id: "ir-present",
      heading: "The verb ir: voy, vas, va…",
      discovery: {
        problem:
          "Read these sentences:\n\n    Voy al parque.\n    ¿Vas a la playa?\n    Mi hermana va al centro comercial.\n    Vamos a la piscina.\n\n1. All four verbs come from the same infinitive. Which one? (It's very short — and it looks nothing like *voy*.)\n2. Why is it *al parque* and *al centro comercial*, but *a la playa* and *a la piscina*? Make a rule.",
        idea:
          "All four are forms of **ir** (to go). Its present tense is irregular — *voy, vas, va, vamos…* — so the infinitive gives you no clue. You simply learn it.\n\nAfter *ir* you need **a** ('to') before the place. When *a* meets the masculine article *el*, the two squash together: **a + el = al**. Feminine *la* doesn't contract, so you get *a la*. *Parque* and *centro comercial* are masculine (*el*); *playa* and *piscina* are feminine (*la*).",
      },
      body:
        "**Ir** (to go) is the most irregular verb you'll meet this year — and one of the most useful, because it is also the engine of the near future (section 2). Learn it until you can say it without thinking:\n\n| | ir (to go) | example |\n|---|---|---|\n| yo | **voy** | Voy al colegio en autobús. |\n| tú | **vas** | ¿Vas a la biblioteca? |\n| él / ella / usted | **va** | Mi madre va al mercado. |\n| nosotros / nosotras | **vamos** | Vamos a la playa en agosto. |\n| vosotros / vosotras | **vais** | ¿Vais al polideportivo después de clase? |\n| ellos / ellas / ustedes | **van** | Mis amigos van al cine. |\n\n> **Look for the pattern.** Apart from *voy*, the forms look just like the endings of an *-ar* verb with a *v-* in front: *v-as, v-a, v-amos, v-ais, v-an*. And *voy* rhymes with *soy, doy, estoy* — the little '-oy' family.\n\n**Watch the accent:** *vais* has **no accent**. It is only one syllable, and one-syllable words don't normally take a written accent. (Compare *habláis*, which has two syllables.)\n\n**Ir a + place.** You go *to* somewhere, so after *ir* comes **a**:\n\n| the place | gender | ir a + place |\n|---|---|---|\n| el parque | masculine | Voy **al** parque. |\n| el cine | masculine | Voy **al** cine. |\n| el centro comercial | masculine | Voy **al** centro comercial. |\n| el colegio | masculine | Voy **al** colegio. |\n| la playa | feminine | Voy **a la** playa. |\n| la piscina | feminine | Voy **a la** piscina. |\n| la biblioteca | feminine | Voy **a la** biblioteca. |\n| los grandes almacenes | masculine plural | Voy **a los** grandes almacenes. |\n| las tiendas | feminine plural | Voy **a las** tiendas. |\n\n- **a + el = al** — always. *Voy a el parque* is wrong.\n- *a la, a los, a las* never contract.\n- Towns and countries have no article: *Voy a Madrid. Vamos a España. Van a Malasia.*\n- 'Home' is just *casa*, with no article: *Voy a casa* (I'm going home). Someone else's home: *Voy a casa de mi abuela* (I'm going to my grandmother's).\n\n**Asking where someone is going.** Use **¿Adónde?** ('to where?'), also written *¿A dónde?*:\n\n    ¿Adónde vas? — Voy a la piscina.\n    ¿Adónde vais los domingos? — Vamos al parque.\n\nDon't confuse it with **¿Dónde?** ('where?'), which asks about *location*, not movement: *¿Dónde estás?* — *Estoy en casa.*\n\n**How you get there:** *en* + transport — *en autobús, en metro, en coche, en tren, en bici* — but on foot is **a pie** (or *andando*). In Singapore the MRT is simply *el metro*: *Voy al colegio en metro.*",
      workedExamples: [
        {
          title: "Who, where and how",
          problem: "Say 'My parents go to the market on Saturdays' in Spanish.",
          steps: [
            "Who? *Mis padres* = they → *ir* in the *ellos* form: *van*.",
            "Where? 'the market' = *el mercado* (masculine) → *a + el* = *al mercado*.",
            "When? 'on Saturdays' = *los sábados* (no word for 'on').",
          ],
          answer: "*Mis padres van al mercado los sábados.*",
          yourTurn: {
            question: "Your turn: write 'We go to the beach' in Spanish.",
            answer: {
              type: "text",
              accept: ["vamos a la playa", "nosotros vamos a la playa", "nosotras vamos a la playa"],
            },
            solution: "'We' → *vamos*. *La playa* is feminine, so *a la* doesn't contract: **Vamos a la playa.**",
          },
        },
        {
          title: "Dónde or adónde?",
          problem: "Complete: *¿___ va tu hermano los viernes?* — *Va al club de ajedrez.*",
          steps: [
            "The verb is *va* (he goes) — a verb of **movement**.",
            "Movement towards a place needs 'to where?' → *¿Adónde?*",
            "*¿Dónde?* would only work with a 'being somewhere' verb like *está*.",
          ],
          answer: "*¿Adónde va tu hermano los viernes?*",
          yourTurn: {
            question: "Your turn: ask a friend 'Where are you going?' in Spanish (use *tú*).",
            answer: {
              type: "text",
              accept: ["adónde vas", "a dónde vas", "adónde vas tú", "a dónde vas tú", "tú adónde vas", "tú a dónde vas"],
            },
            solution: "Movement → *¿Adónde?* + *tú* form of *ir*: **¿Adónde vas?** (also written *¿A dónde vas?*).",
          },
        },
      ],
      keyPoints: [
        "*ir* = to go: *voy, vas, va, vamos, vais, van*.",
        "*vais* has no accent — it is one syllable.",
        "*a + el = al* (*voy al cine*); *a la, a los, a las* stay as they are.",
        "No article with towns, countries or 'home': *voy a Sevilla, voy a casa*.",
        "*¿Adónde vas?* asks where you're going; *¿Dónde estás?* asks where you are.",
        "Transport: *en metro, en autobús, en coche* — but *a pie*.",
      ],
      whyItWorks:
        "*Ir* looks strange because it is really **two Latin verbs stitched together**. The infinitive *ir* comes from Latin *ire* ('to go'), but the present-tense forms come from a different Latin verb, *vadere* ('to go, to walk') — that's where the *v-* of *voy, vas, va* comes from. English did the same thing: *go* and *went* come from two different old verbs.\n\nAnd *a + el* becomes *al* because Spanish dislikes two vowels bumping into each other in such a short, quick pair of words. Say *a el parque* fast three times and you'll hear yourself saying *al parque*.",
      strategies: ["Look for the pattern", "Gender detective (el/la)", "Check the subject", "Mind the accent"],
      thinkDeeper:
        "*Voy a casa* and *Voy a la casa* are both correct Spanish, but they don't mean the same thing. What is the difference? (Think about 'I'm going home' and 'I'm going to the house'.) Then explain why *¿Dónde vas?* is heard in everyday speech but *¿Adónde vas?* is the safer choice in an exam.",
    },
    // ---------------------------------------------------------------------
    {
      id: "forming-the-near-future",
      heading: "Forming ir + a + infinitive",
      discovery: {
        problem:
          "Compare these two sentences:\n\n    Voy al cine.\n    Voy a ver una película.\n\nBoth start with *voy* + *a*. What comes after the *a* in each? Which sentence is about something you are **going to do**?\n\nNow work out how to say 'You're going to eat churros' (*comer* = to eat) — without looking anything up.",
        idea:
          "In the first sentence *a* is followed by a **place** (*el cine*) — you are going *to* somewhere. In the second it is followed by an **infinitive** (*ver*, 'to see') — you are going *to do* something. That second pattern is the **near future**: *voy a ver* = 'I'm going to see'.\n\nSo 'You're going to eat churros' is: *tú* form of *ir* (**vas**) + **a** + infinitive (**comer**) → *Vas a comer churros.*",
      },
      body:
        "To say what someone is **going to** do, Spanish uses the same three building blocks as English:\n\n    I'm going   to   play   →   voy   a   jugar\n\n**The formula:** present tense of **ir** + **a** + **infinitive**.\n\n| who? | ir | a | infinitive | English |\n|---|---|---|---|---|\n| yo | **voy** | a | jugar al tenis | I'm going to play tennis |\n| tú | **vas** | a | comer churros | you're going to eat churros |\n| él / ella | **va** | a | salir con sus amigos | he / she is going to go out with friends |\n| nosotros / nosotras | **vamos** | a | ver una película | we're going to watch a film |\n| vosotros / vosotras | **vais** | a | hacer los deberes | you (all) are going to do your homework |\n| ellos / ellas | **van** | a | ir a la playa | they're going to go to the beach |\n\n- **Only *ir* changes** to show who is doing the action.\n- **The *a* never changes** and never disappears.\n- **The infinitive never changes** — *-ar, -er* and *-ir* verbs all stay exactly as they are in the dictionary.\n- *Voy a ir* is perfectly normal: 'I'm going to go'. *Mañana voy a ir al cine.*\n\n**Negatives.** Put **no** in front of the part of *ir*:\n\n    No voy a salir esta noche.\n    Mis primos no van a venir a la fiesta.\n\n**Questions.** Add ¿…? and raise your voice at the end, or start with a question word:\n\n| question | answer |\n|---|---|\n| ¿Vas a venir? | Sí, voy a venir. / No, no voy a venir. |\n| ¿Qué vas a hacer el sábado? | Voy a nadar. |\n| ¿Adónde vais a ir? | Vamos a ir a Málaga. |\n| ¿Con quién vas a ir? | Voy a ir con Priya. |\n| ¿A qué hora vamos a salir? | Vamos a salir a las seis. |\n\n> **Answer with the right verb.** *¿Qué vas a hacer?* uses *hacer* only because it means 'do'. Your answer replaces it with the real activity: *Voy a nadar* — not *Voy a hacer nadar*.\n\n**Reflexive verbs** (from your daily routine). The reflexive pronoun can go in **two places** — both are correct and mean exactly the same:\n\n| | pronoun before *ir* | pronoun glued to the infinitive |\n|---|---|---|\n| yo | **me** voy a levantar | voy a levantar**me** |\n| tú | **te** vas a duchar | vas a duchar**te** |\n| él / ella | **se** va a vestir | va a vestir**se** |\n| nosotros | **nos** vamos a acostar | vamos a acostar**nos** |\n| vosotros | **os** vais a despertar | vais a despertar**os** |\n| ellos / ellas | **se** van a bañar | van a bañar**se** |\n\n- The pronoun must **match the subject**: *voy a levantarme*, never *voy a levantarse*.\n- Never put it in the middle (*voy a me levantar* ✗) and never use it twice (*me voy a levantarme* ✗).\n- Negative: *No me voy a acostar tarde.* = *No voy a acostarme tarde.*",
      diagram: `<svg viewBox="0 0 480 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A three-part train. The engine is ir, which changes with the subject: voy, vas, va, vamos, vais, van. The small middle carriage is a, which never changes. The last wagon is the infinitive, such as jugar, comer, salir or ir, which never changes."><rect x="0" y="0" width="480" height="200" fill="#ffffff"/><text x="240" y="22" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#1f2937">Voy a jugar. = I'm going to play.</text><rect x="40" y="28" width="18" height="12" fill="#334155"/><rect x="20" y="40" width="170" height="90" rx="10" fill="#c7d2fe" stroke="#334155" stroke-width="2"/><text x="105" y="64" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#1f2937">1. ir</text><text x="105" y="88" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">voy · vas · va</text><text x="105" y="110" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">vamos · vais · van</text><circle cx="60" cy="140" r="12" fill="#334155"/><circle cx="150" cy="140" r="12" fill="#334155"/><line x1="190" y1="110" x2="220" y2="110" stroke="#334155" stroke-width="4"/><rect x="220" y="60" width="60" height="70" rx="8" fill="#fde68a" stroke="#334155" stroke-width="2"/><text x="250" y="101" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#1f2937">2. a</text><circle cx="250" cy="140" r="12" fill="#334155"/><line x1="280" y1="110" x2="310" y2="110" stroke="#334155" stroke-width="4"/><rect x="310" y="40" width="150" height="90" rx="10" fill="#bbf7d0" stroke="#334155" stroke-width="2"/><text x="385" y="64" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#1f2937">3. infinitive</text><text x="385" y="88" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">jugar · comer</text><text x="385" y="110" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">salir · ir</text><circle cx="345" cy="140" r="12" fill="#334155"/><circle cx="425" cy="140" r="12" fill="#334155"/><line x1="10" y1="153" x2="470" y2="153" stroke="#334155" stroke-width="2"/><text x="105" y="178" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">changes with the subject</text><text x="250" y="178" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">never changes</text><text x="385" y="178" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">never changes</text></svg>`,
      diagramCaption:
        "The near-future train: only the engine (*ir*) changes to show who. The coupling (*a*) and the wagon (the infinitive) never change.",
      workedExamples: [
        {
          title: "Build the train",
          problem: "Say 'My friends are going to play basketball' in Spanish.",
          steps: [
            "Engine: 'my friends' = they → *van*.",
            "Coupling: *a*.",
            "Wagon: 'to play' = *jugar*, unchanged. Ball game → *jugar a + el baloncesto* = *al baloncesto*.",
          ],
          answer: "*Mis amigos van a jugar al baloncesto.*",
          yourTurn: {
            question: "Your turn: write 'We're going to watch a film' in Spanish.",
            answer: {
              type: "text",
              accept: [
                "vamos a ver una película",
                "nosotros vamos a ver una película",
                "nosotras vamos a ver una película",
                "vamos a ver una peli",
                "nosotros vamos a ver una peli",
                "nosotras vamos a ver una peli",
              ],
            },
            solution: "'We' → *vamos* + *a* + *ver* (to see / watch): **Vamos a ver una película.**",
          },
        },
        {
          title: "A reflexive verb — two correct positions",
          problem: "Say 'Tomorrow I'm going to get up early' in Spanish.",
          steps: [
            "'to get up' = *levantarse*; the person is *yo*, so the pronoun is *me*.",
            "Engine: *voy*. Coupling: *a*. Wagon: *levantar*.",
            "Put *me* before *voy* **or** glue it to the end of the infinitive.",
            "Time phrase first: *Mañana…*; 'early' = *temprano*.",
          ],
          answer: "*Mañana me voy a levantar temprano.* = *Mañana voy a levantarme temprano.*",
          yourTurn: {
            question: "Your turn: write 'She is going to have a shower' in Spanish (*ducharse*).",
            answer: {
              type: "text",
              accept: ["se va a duchar", "va a ducharse", "ella se va a duchar", "ella va a ducharse"],
            },
            solution: "'She' → *va*; pronoun *se* either before *va* or on the end: **Se va a duchar.** = **Va a ducharse.**",
          },
        },
        {
          title: "Negatives and questions",
          problem: "Your friend asks *¿Qué vas a hacer esta noche?* Answer: 'I'm not going to go out. I'm going to read.'",
          steps: [
            "Negative: *no* goes in front of *voy*: *No voy a salir.*",
            "Replace *hacer* with the real activity: *leer* (to read) → *Voy a leer.*",
          ],
          answer: "*No voy a salir. Voy a leer.*",
          yourTurn: {
            question: "Your turn: write 'I'm not going to do my homework' in Spanish.",
            answer: {
              type: "text",
              accept: [
                "no voy a hacer los deberes",
                "yo no voy a hacer los deberes",
                "no voy a hacer mis deberes",
                "yo no voy a hacer mis deberes",
              ],
            },
            solution: "*No* + *voy* + *a* + *hacer* + *los deberes*: **No voy a hacer los deberes.** (Spanish usually says *los deberes* rather than *mis deberes*.)",
          },
        },
      ],
      keyPoints: [
        "Near future = **ir + a + infinitive**: *voy a jugar*.",
        "Only *ir* changes; *a* and the infinitive never change.",
        "Negative: *no* before *ir*: *No vamos a salir.*",
        "Question: *¿Qué vas a hacer?* — answer with the real verb: *Voy a nadar.*",
        "Reflexives: *me voy a duchar* = *voy a ducharme*; the pronoun matches the subject.",
        "*Voy a ir…* (I'm going to go…) is completely normal.",
      ],
      whyItWorks:
        "If you are *on your way to* doing something, it's going to happen soon — so both Spanish and English turned the verb 'to go' into a future-maker. The *a* is exactly the same *a* as in *voy a la playa*: in *voy a la playa* you are heading towards a **place**; in *voy a nadar* you are heading towards an **action**.\n\nThe infinitive never changes because it doesn't need to: *voy, vas, va…* has already told you who is doing it. Spanish doesn't give the same information twice.",
      strategies: ["Find the infinitive", "Check the subject", "Look for the pattern", "Translate back to check"],
      thinkDeeper:
        "*Mañana voy a ir a la playa* contains *a* twice. Explain the job each *a* is doing. Then: a friend says you could just write *Mañana voy a la playa*. Is that correct Spanish? What is the difference in meaning, if any?",
    },
    // ---------------------------------------------------------------------
    {
      id: "future-time-phrases",
      heading: "Future time phrases",
      discovery: {
        problem:
          "It is Monday morning. Put these in order, from the soonest to the furthest away:\n\n    el año que viene · esta tarde · pasado mañana · mañana · la semana que viene · este fin de semana\n\nThen look closely at *la semana que viene*. *Viene* comes from *venir* (to come). What does the phrase literally say?",
        idea:
          "Order: *esta tarde* (this afternoon) → *mañana* (tomorrow) → *pasado mañana* (the day after tomorrow) → *este fin de semana* (this weekend) → *la semana que viene* (next week) → *el año que viene* (next year).\n\n*La semana que viene* literally means 'the week **that is coming**' — a lovely picture of the future travelling towards you. *Pasado mañana* is literally 'past tomorrow': the day that comes once tomorrow has passed.",
      },
      body:
        "A time phrase is the quickest way to show the reader you are talking about the future. Learn these:\n\n| Spanish | English |\n|---|---|\n| mañana | tomorrow |\n| mañana por la mañana | tomorrow morning |\n| mañana por la tarde | tomorrow afternoon / evening |\n| pasado mañana | the day after tomorrow |\n| esta tarde | this afternoon / this evening |\n| esta noche | tonight |\n| este fin de semana | this weekend |\n| el sábado | on Saturday (this coming one) |\n| el sábado que viene / el próximo sábado | next Saturday |\n| la semana que viene / la próxima semana | next week |\n| el mes que viene / el próximo mes | next month |\n| el año que viene / el próximo año | next year |\n| el verano que viene | next summer |\n| dentro de dos días | in two days' time |\n| luego / más tarde | later |\n| en el futuro | in the future |\n| en las vacaciones | in the holidays |\n\n**Three patterns to notice:**\n\n1. **este / esta = this.** It agrees with the noun: *el fin de semana* → *este fin de semana*; *la tarde* → *esta tarde*; *la noche* → *esta noche*.\n2. **… que viene** goes **after** the noun and doesn't change for masculine or feminine: *el lunes que viene, la semana que viene, el año que viene*.\n3. **próximo / próxima** usually goes **before** the noun and **agrees** with it: *el próximo sábado, la próxima semana, las próximas vacaciones*.\n\n> **mañana or la mañana?** *Mañana* on its own = tomorrow. *La mañana* = the morning. So 'tomorrow morning' is *mañana por la mañana* — the word twice, with two meanings.\n\n**Days of the week:** no word for 'on'. *El sábado* = on Saturday (one Saturday). *Los sábados* = on Saturdays (every week) — that's a habit, so it goes with the present tense (see section 5).\n\n**Where does the time phrase go?** At the start or the end. Starting with it is a great habit — the reader knows the time frame straight away:\n\n    Pasado mañana vamos a visitar el museo.\n    Vamos a visitar el museo pasado mañana.\n\nSome Singapore examples:\n\n    Esta noche va a llover mucho.\n    En las vacaciones de junio voy a ir a Malasia con mi familia.\n    El año que viene mi hermano va a empezar la secundaria.",
      diagram: `<svg viewBox="0 0 480 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A timeline that starts today, Monday. Esta tarde and esta noche are today. Mañana is Tuesday. Pasado mañana is Wednesday. Este fin de semana is Saturday and Sunday. Then comes la semana que viene and, after a break in the line, el año que viene."><rect x="0" y="0" width="480" height="220" fill="#ffffff"/><text x="240" y="24" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#1f2937">Hoy es lunes. ¿Cuándo vas a…?</text><line x1="20" y1="110" x2="384" y2="110" stroke="#1f2937" stroke-width="3"/><line x1="404" y1="110" x2="458" y2="110" stroke="#1f2937" stroke-width="3"/><polygon points="470,110 456,103 456,117" fill="#1f2937"/><line x1="382" y1="120" x2="390" y2="100" stroke="#1f2937" stroke-width="2"/><line x1="398" y1="120" x2="406" y2="100" stroke="#1f2937" stroke-width="2"/><circle cx="40" cy="110" r="7" fill="#fde68a" stroke="#1f2937"/><circle cx="110" cy="110" r="7" fill="#bae6fd" stroke="#1f2937"/><circle cx="180" cy="110" r="7" fill="#bae6fd" stroke="#1f2937"/><circle cx="270" cy="110" r="7" fill="#bbf7d0" stroke="#1f2937"/><circle cx="355" cy="110" r="7" fill="#c7d2fe" stroke="#1f2937"/><circle cx="435" cy="110" r="7" fill="#fecaca" stroke="#1f2937"/><g font-family="sans-serif" text-anchor="middle" fill="#1f2937"><text x="40" y="88" font-size="12" font-weight="bold">hoy</text><text x="40" y="134" font-size="11" fill="#334155">lunes</text><text x="40" y="152" font-size="12" font-weight="bold">esta tarde</text><text x="40" y="168" font-size="12" font-weight="bold">esta noche</text><text x="110" y="88" font-size="12" font-weight="bold">mañana</text><text x="110" y="134" font-size="11" fill="#334155">martes</text><text x="180" y="72" font-size="12" font-weight="bold">pasado</text><text x="180" y="88" font-size="12" font-weight="bold">mañana</text><text x="180" y="134" font-size="11" fill="#334155">miércoles</text><text x="270" y="72" font-size="12" font-weight="bold">este fin</text><text x="270" y="88" font-size="12" font-weight="bold">de semana</text><text x="270" y="134" font-size="11" fill="#334155">sábado y domingo</text><text x="355" y="72" font-size="12" font-weight="bold">la semana</text><text x="355" y="88" font-size="12" font-weight="bold">que viene</text><text x="435" y="72" font-size="12" font-weight="bold">el año</text><text x="435" y="88" font-size="12" font-weight="bold">que viene</text><text x="240" y="204" font-size="11" fill="#334155">Not to scale: the line jumps (//) between next week and next year.</text></g></svg>`,
      diagramCaption:
        "If today is Monday: *mañana* is Tuesday, *pasado mañana* is Wednesday, and *este fin de semana* comes after that. The line is not to scale — it jumps between next week and next year.",
      workedExamples: [
        {
          title: "Two ways to say 'next'",
          problem: "Say 'Next Saturday we're going to go to the pool' in Spanish.",
          steps: [
            "'Next Saturday' = *el sábado que viene* or *el próximo sábado*.",
            "'We're going to go' = *vamos a ir*.",
            "'to the pool' = *a la piscina* (feminine, no contraction).",
            "Time phrase first.",
          ],
          answer: "*El sábado que viene vamos a ir a la piscina.* = *El próximo sábado vamos a ir a la piscina.*",
          yourTurn: {
            question: "Your turn: write 'Tomorrow I'm going to play football' in Spanish.",
            answer: {
              type: "text",
              accept: [
                "mañana voy a jugar al fútbol",
                "mañana yo voy a jugar al fútbol",
                "voy a jugar al fútbol mañana",
                "yo voy a jugar al fútbol mañana",
              ],
            },
            solution: "*Mañana* + *voy a jugar* + *al fútbol* (ball game → *a + el = al*): **Mañana voy a jugar al fútbol.**",
          },
        },
        {
          title: "Agreement detective",
          problem: "Write 'next week' in Spanish in two different ways.",
          steps: [
            "*Semana* is feminine: *la semana*.",
            "With *que viene* (same for masculine and feminine): *la semana que viene*.",
            "With *próximo*, which must agree → *próxima*: *la próxima semana*.",
          ],
          answer: "*la semana que viene* / *la próxima semana*",
          yourTurn: {
            question: "Your turn: write 'next summer' in Spanish (*el verano* = summer).",
            answer: { type: "text", accept: ["el verano que viene", "el próximo verano", "el verano próximo"] },
            solution: "*Verano* is masculine: **el verano que viene** or **el próximo verano**.",
          },
        },
      ],
      keyPoints: [
        "*mañana* = tomorrow; *pasado mañana* = the day after tomorrow.",
        "*esta tarde, esta noche, este fin de semana* — *este/esta* agrees.",
        "*… que viene* is the same for masculine and feminine: *el año / la semana que viene*.",
        "*próximo* agrees: *el próximo sábado, la próxima semana*.",
        "*el sábado* = this Saturday (once); *los sábados* = every Saturday.",
        "Start your sentence with the time phrase to signal the future clearly.",
      ],
      whyItWorks:
        "Spanish time phrases are little pictures. *Que viene* = 'that is coming' — the week is travelling towards you. *Próximo* comes from Latin *proximus*, 'nearest' — the nearest Saturday ahead. *Pasado mañana* = the day once tomorrow has 'passed'.\n\n*Este* and *próximo* change because they are adjectives, and Spanish adjectives agree with their noun. *Que viene* is a mini-clause ('that comes') with a verb in it, not an adjective, so it doesn't change for masculine or feminine.\n\nOne honest warning: just like English 'next Saturday', *el sábado que viene* can be ambiguous — this coming Saturday, or the one after? If you mean the Saturday of this week, *este sábado* is clearest.",
      strategies: ["Use the time phrase", "Gender detective (el/la)", "Agreement check", "Spot the cognate"],
      thinkDeeper:
        "Today is Thursday. Your friend texts: *Nos vemos pasado mañana.* Which day will you meet? If she had written *Nos vemos el lunes que viene*, which would be more useful to check: the day, or the date? Why?",
    },
    // ---------------------------------------------------------------------
    {
      id: "plans-and-predictions",
      heading: "Plans, invitations and predictions",
      discovery: {
        problem:
          "Read this chat between Lucía and Diego:\n\n    Lucía: ¿Quieres ir al cine el sábado?\n    Diego: Lo siento, no puedo. Voy a visitar a mis abuelos.\n    Lucía: ¡Qué pena! ¿Te apetece ir el domingo?\n    Diego: ¡Vale! ¿A qué hora quedamos?\n    Lucía: A las cinco, delante del cine. Va a ser genial.\n    Diego: Mira el cielo... ¡va a llover! Voy a llevar un paraguas.\n\n1. Find two different ways of **inviting** someone.\n2. Find one way to **refuse** and one way to **accept**.\n3. Two sentences use *va a* but are not about anyone's plans. What are they doing instead?",
        idea:
          "1. *¿Quieres ir…?* (Do you want to go…?) and *¿Te apetece ir…?* (Do you fancy going…?).\n2. Refuse: *Lo siento, no puedo* — with a reason. Accept: *¡Vale!*\n3. *Va a ser genial* and *va a llover* are **predictions** — what you think or can see is going to happen. The near future isn't only for plans: it's also for things you can see coming.",
      },
      body:
        "**1. Describing your plans.** Chain several near-future sentences with sequencers and time phrases:\n\n    Este sábado va a ser un día genial. Por la mañana voy a jugar al bádminton con mi hermano.\n    Luego vamos a comer con mis abuelos. Por la tarde voy a ir al cine con Wei Ling y Arjun\n    porque queremos ver una película de aventuras. Por la noche no voy a hacer los deberes:\n    ¡voy a descansar!\n\nUseful linkers: *primero, luego, después, más tarde, por la mañana / tarde / noche, finalmente*.\n\n**2. Inviting someone.**\n\n| invitation | meaning |\n|---|---|\n| ¿Quieres ir al cine? | Do you want to go to the cinema? |\n| ¿Te apetece ir a la playa? | Do you fancy going to the beach? |\n| ¿Vamos a la piscina? | Shall we go to the pool? |\n| ¿Por qué no vamos al parque? | Why don't we go to the park? |\n| ¿Vas a venir a mi fiesta? | Are you going to come to my party? |\n\nAfter *¿Quieres…?* and *¿Te apetece…?* use an **infinitive**, just like after *voy a*.\n\n**3. Replying.**\n\n| accepting | refusing politely |\n|---|---|\n| ¡Sí, claro! (Yes, of course!) | Lo siento, no puedo. (Sorry, I can't.) |\n| Vale. / De acuerdo. (OK.) | No puedo porque tengo que estudiar. (… I have to study.) |\n| ¡Qué buena idea! (What a good idea!) | No puedo porque voy a visitar a mis abuelos. |\n| ¡Genial! (Great!) | ¡Qué pena! Otro día. (What a shame! Another day.) |\n| Me encantaría. (I'd love to.) | ¿Qué tal el domingo? (How about Sunday?) |\n\n*Me encantaría* is a fixed chunk — learn it as a whole phrase. Notice *visitar **a** mis abuelos*: Spanish puts an extra *a* before a **person** you visit or see.\n\n**4. Arranging to meet** with *quedar* (to arrange to meet):\n\n    ¿A qué hora quedamos? — Quedamos a las seis.\n    ¿Dónde quedamos? — Quedamos delante del cine / en la estación de metro.\n\n**5. Predictions.** Use *ir a* for things you think — or can see — are going to happen:\n\n| weather | events |\n|---|---|\n| Va a llover. (It's going to rain.) | El partido va a ser emocionante. |\n| Va a hacer calor / frío / sol / viento. | La excursión va a ser divertida. |\n| Va a hacer buen tiempo / mal tiempo. | Los exámenes van a ser difíciles. |\n| Va a nevar en la sierra. | El concierto va a estar lleno. |\n| Va a haber una tormenta. (There's going to be a storm.) | No va a ser fácil. |\n\n- Weather with *hacer* keeps *hacer*: *va a hacer calor* — never *va a ser calor*.\n- *Hay* (there is) becomes *va a haber* (there is going to be).\n- In *va a ser + adjective*, the adjective agrees with the thing: *la excursión* → *divertida*; *el partido* → *emocionante*; *los exámenes* → *difíciles*.\n\n**6. Opinions about a future event.** *Va a ser* + adjective + **porque** + reason — ideally another near-future verb:\n\n    Va a ser genial porque voy a ver a mis primos de Valencia.\n    Creo que va a ser aburrido porque vamos a estar en el coche seis horas.\n    ¡Va a ser guay!\n\nAdjectives: *genial, increíble, divertido/a, emocionante, estupendo/a, guay* (informal, Spain) / *aburrido/a, horrible, difícil*.",
      workedExamples: [
        {
          title: "Invite and refuse",
          problem: "Invite Pablo to the beach on Sunday. He refuses because he has to study.",
          steps: [
            "Invitation: *¿Quieres* + infinitive *ir* + *a la playa* + *el domingo?*",
            "Refusal: *Lo siento, no puedo* — then give a reason with *porque*.",
            "'I have to study' = *tengo que* + infinitive: *tengo que estudiar*.",
          ],
          answer: "*¿Quieres ir a la playa el domingo?* — *Lo siento, no puedo porque tengo que estudiar.*",
          yourTurn: {
            question: "Your turn: write 'It's going to rain tomorrow' in Spanish.",
            answer: { type: "text", accept: ["mañana va a llover", "va a llover mañana"] },
            solution: "'It' is the weather → *va* (no word for 'it') + *a* + *llover*: **Mañana va a llover.**",
          },
        },
        {
          title: "A prediction with agreement",
          problem: "Say 'The school trip is going to be fun' in Spanish.",
          steps: [
            "'The school trip' = *la excursión* (feminine).",
            "Prediction about what it will be like → *va a ser* + adjective.",
            "Agreement check: *divertido* → *divertida* to match *la excursión*.",
          ],
          answer: "*La excursión va a ser divertida.*",
          yourTurn: {
            question: "Your turn: write 'The party is going to be great' in Spanish (*la fiesta*).",
            answer: {
              type: "text",
              accept: [
                "la fiesta va a ser genial",
                "la fiesta va a ser estupenda",
                "la fiesta va a ser fantástica",
                "la fiesta va a ser increíble",
                "la fiesta va a ser guay",
              ],
            },
            solution: "*La fiesta* + *va a ser* + adjective: **La fiesta va a ser genial.** (*Genial* has the same form for masculine and feminine; *estupenda* and *fantástica* agree with *la fiesta*.)",
          },
        },
      ],
      keyPoints: [
        "Plans: chain *voy a…* sentences with *primero, luego, después*.",
        "Invite: *¿Quieres…? / ¿Te apetece…? / ¿Vamos a…?* + infinitive or place.",
        "Accept: *¡Sí, claro! Vale. ¡Qué buena idea!* Refuse: *Lo siento, no puedo porque…*",
        "Arrange: *¿A qué hora quedamos? ¿Dónde quedamos?*",
        "Predict: *va a llover, va a hacer calor, va a haber una tormenta*.",
        "Opinion: *va a ser* + agreeing adjective + *porque…*",
      ],
      whyItWorks:
        "A prediction with *ir a* is based on evidence you have **now**: dark clouds are already 'on their way' to rain, so *va a llover*. That's the same 'heading towards' idea as *voy a jugar*.\n\n*Va a ser genial* uses *ser* because you are describing what the event will be like — exactly as you'd say *es genial* in the present. Weather uses *hacer* because Spanish says the weather 'makes' heat: *hace calor* → *va a hacer calor*. The near future never changes which verb you need; it just puts that verb into the infinitive after *va a*.",
      strategies: ["Recycle a chunk", "Build it up (extended sentence)", "Agreement check", "Use context"],
      thinkDeeper:
        "Why does a weather forecaster say *va a hacer calor* but never *va a ser calor*? And why is it *la fiesta va a ser divertida* but *el concierto va a ser divertido*? Write one rule that explains both.",
    },
    // ---------------------------------------------------------------------
    {
      id: "present-vs-future",
      heading: "Present vs future: spotting the time frame",
      discovery: {
        problem:
          "Read these four sentences:\n\n    Los sábados juego al tenis.\n    Este sábado voy a jugar al tenis.\n    Voy al club de tenis.\n    Mañana juego un partido.\n\nWhich describe a **habit** and which a **single future plan**? Be careful: one sentence uses *ir* but is not in the near future — and one is about the future but has no *ir* at all!",
        idea:
          "1. **Habit** — *los sábados* (every Saturday) + present *juego*.\n2. **Future plan** — *este sábado* (one Saturday) + *voy a jugar*.\n3. **Present** — *voy al club* is *ir a + place*: 'I go / I'm going to the tennis club'. Only *ir a + infinitive* is the near future.\n4. **Future meaning, present verb** — *mañana* does the work. Spanish often uses the present for fixed near-future arrangements, just like English 'My match is tomorrow'.",
      },
      body:
        "Spanish shows the time frame in **two places**: the **verb** and the **time phrase**. Check both.\n\n| present: what usually happens | near future: what is going to happen |\n|---|---|\n| normalmente (normally) | mañana |\n| generalmente (usually) | esta tarde / esta noche |\n| todos los días (every day) | este fin de semana |\n| **los** sábados (every Saturday) | **el** sábado / este sábado (one Saturday) |\n| a veces, siempre, nunca | la semana que viene |\n| cada verano (every summer) | el verano que viene |\n| ahora (now) | en el futuro |\n\n**Converting present → near future** in four steps:\n\n1. Find the verb and its **infinitive** (*juego* → *jugar*; *me levanto* → *levantarse*).\n2. Keep the **same person** and conjugate *ir* (*yo* → *voy*).\n3. Add **a + infinitive** (reflexive pronoun before *ir* or glued on).\n4. Swap the time phrase for a **future** one.\n\n| present | near future |\n|---|---|\n| Normalmente juego al fútbol. | Mañana voy a jugar al fútbol. |\n| Los domingos comemos paella de verduras. | El domingo que viene vamos a comer paella de verduras. |\n| Mi hermana hace natación. | Mi hermana va a hacer natación. |\n| Me levanto a las siete. | Me voy a levantar a las siete. / Voy a levantarme a las siete. |\n| Voy al colegio en metro. | Voy a ir al colegio en metro. |\n| Mis amigos tienen un examen. | Mis amigos van a tener un examen. |\n\n**Converting near future → present:** remove *ir a* and conjugate the infinitive for the same person: *vamos a ver* → *vemos*; *va a salir* → *sale*; *se van a acostar* → *se acuestan*.\n\n**Three traps:**\n\n- **ir a + place is not the future.** *Voy al cine* = I go / I'm going to the cinema (now, or as a habit). The future plan is *Voy a ir al cine*.\n- **The present for the near future.** *Mañana juego al tenis* and *¿Qué haces este fin de semana?* are correct, natural Spanish — the time phrase gives the future meaning. But when a task asks you to use the near future, show *ir a + infinitive*.\n- **The English '-ing' trap.** 'I'm playing tennis tomorrow' is **not** *estoy jugando*. Say *Mañana juego al tenis* or *Mañana voy a jugar al tenis*.",
      diagram: `<svg viewBox="0 0 480 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two rows of four Saturdays. Top row, Los sábados juego al tenis: every Saturday is ticked, a habit, so present tense. Bottom row, Este sábado voy a jugar al tenis: only the first, coming Saturday is highlighted and ticked, one future occasion, so ir a plus infinitive."><rect x="0" y="0" width="480" height="230" fill="#ffffff"/><g font-family="sans-serif" fill="#1f2937"><text x="20" y="24" font-size="13" font-weight="bold">Los sábados juego al tenis.</text><text x="20" y="124" font-size="13" font-weight="bold">Este sábado voy a jugar al tenis.</text><text x="380" y="58" font-size="12">every Saturday</text><text x="380" y="76" font-size="12">→ present</text><text x="380" y="158" font-size="12">one Saturday</text><text x="380" y="176" font-size="12">→ ir a + inf.</text><text x="240" y="216" font-size="12" text-anchor="middle">Habit = present. One future occasion = ir a + infinitive.</text></g><rect x="20" y="36" width="70" height="50" rx="6" fill="#bbf7d0" stroke="#334155"/><rect x="110" y="36" width="70" height="50" rx="6" fill="#bbf7d0" stroke="#334155"/><rect x="200" y="36" width="70" height="50" rx="6" fill="#bbf7d0" stroke="#334155"/><rect x="290" y="36" width="70" height="50" rx="6" fill="#bbf7d0" stroke="#334155"/><rect x="20" y="136" width="70" height="50" rx="6" fill="#fde68a" stroke="#1f2937" stroke-width="3"/><rect x="110" y="136" width="70" height="50" rx="6" fill="#ffffff" stroke="#334155"/><rect x="200" y="136" width="70" height="50" rx="6" fill="#ffffff" stroke="#334155"/><rect x="290" y="136" width="70" height="50" rx="6" fill="#ffffff" stroke="#334155"/><g font-family="sans-serif" font-size="12" text-anchor="middle" fill="#334155"><text x="55" y="52">sáb</text><text x="145" y="52">sáb</text><text x="235" y="52">sáb</text><text x="325" y="52">sáb</text><text x="55" y="152">sáb</text><text x="145" y="152">sáb</text><text x="235" y="152">sáb</text><text x="325" y="152">sáb</text></g><g fill="none" stroke="#1f2937" stroke-width="3"><polyline points="43,70 51,78 67,62"/><polyline points="133,70 141,78 157,62"/><polyline points="223,70 231,78 247,62"/><polyline points="313,70 321,78 337,62"/><polyline points="43,170 51,178 67,162"/></g></svg>`,
      diagramCaption:
        "*Los sábados* (plural) = every Saturday → a habit → present tense. *Este sábado* (singular) = one Saturday still to come → *ir a* + infinitive.",
      workedExamples: [
        {
          title: "Present → near future",
          problem: "Change to the near future, using *este sábado*: *Los sábados mi hermano hace natación.*",
          steps: [
            "Verb: *hace* → infinitive *hacer*.",
            "Same person (*mi hermano* = he) → *va*.",
            "Add *a* + *hacer*: *va a hacer natación*.",
            "Swap the habit phrase *los sábados* for the one-off *este sábado*.",
          ],
          answer: "*Este sábado mi hermano va a hacer natación.*",
          yourTurn: {
            question: "Your turn: change to the near future, using *esta noche*: *Normalmente me acuesto a las diez.*",
            answer: {
              type: "text",
              accept: [
                "esta noche me voy a acostar a las diez",
                "esta noche voy a acostarme a las diez",
                "esta noche yo me voy a acostar a las diez",
                "esta noche yo voy a acostarme a las diez",
                "me voy a acostar a las diez esta noche",
                "voy a acostarme a las diez esta noche",
              ],
            },
            solution: "*Me acuesto* → *acostarse*; *yo* → *voy*; pronoun before *voy* or on the end: **Esta noche me voy a acostar a las diez.** = **Esta noche voy a acostarme a las diez.** (No stem change: the infinitive is *acostar*.)",
          },
        },
        {
          title: "Near future → present",
          problem: "Is *Voy a la piscina con Hana* present or near future? Then rewrite *Hana va a nadar* in the present.",
          steps: [
            "*Voy a la piscina*: after *a* comes a **place**, not an infinitive → it's the **present** ('I'm going / I go to the pool').",
            "*Hana va a nadar*: *va a* + infinitive → near future.",
            "To make it present, drop *va a* and conjugate *nadar* for *ella*: *nada*.",
          ],
          answer: "Present. *Hana nada.*",
          yourTurn: {
            question: "Your turn: change *Mañana vamos a ir al parque* into the present tense, starting with *Normalmente*.",
            answer: {
              type: "text",
              accept: ["normalmente vamos al parque", "normalmente nosotros vamos al parque", "normalmente nosotras vamos al parque"],
            },
            solution: "Drop *vamos a* and conjugate *ir* for *nosotros*: *vamos*. **Normalmente vamos al parque.**",
          },
        },
      ],
      keyPoints: [
        "Check two clues: the verb **and** the time phrase.",
        "*los sábados* = every Saturday (present); *el / este sábado* = one Saturday (future).",
        "Present → future: infinitive + same person of *ir* + *a* + new time phrase.",
        "*Voy al cine* is present; *Voy a ir al cine* is the near future.",
        "*Mañana juego…* is fine Spanish, but show *ir a* when a task asks for the future.",
        "Never *estoy jugando* for a future plan.",
      ],
      whyItWorks:
        "Spanish can carry the time frame in the verb, in the time phrase, or in both. When the time phrase already says 'tomorrow', the verb can relax into the present — English does the same: 'My flight leaves tomorrow'. The near future with *ir a* adds the idea of a plan or intention, and it makes the future unmistakable even without a time phrase.\n\n*Los sábados* is plural because the action repeats on lots of Saturdays; *el sábado* is singular because it happens once. The tiny difference between *el* and *los* is the difference between a plan and a habit.",
      strategies: ["Use the time phrase", "Find the infinitive", "Check the subject", "Translate back to check"],
      thinkDeeper:
        "Marcus writes: *Los sábados voy a jugar al fútbol.* It isn't actually wrong — but it doesn't mean 'On Saturdays I'm going to play football'. Read it as *ir* + a purpose: what does it mean? How would you rewrite it (a) as a simple habit and (b) as a plan for one particular Saturday?",
    },
  ],
  learn: {
    flashcards: [
      { front: "voy", back: "I go / I'm going" },
      { front: "vas", back: "you go (tú)" },
      { front: "va", back: "he / she goes, you go (usted)" },
      { front: "vamos", back: "we go — also 'let's go!'" },
      { front: "vais", back: "you (plural) go — vosotros, no accent" },
      { front: "van", back: "they go" },
      { front: "voy a + infinitive", back: "I'm going to (do something)" },
      { front: "¿Adónde vas?", back: "Where are you going?" },
      { front: "¿Qué vas a hacer?", back: "What are you going to do?" },
      { front: "pasado mañana", back: "the day after tomorrow" },
      { front: "la semana que viene", back: "next week (also: la próxima semana)" },
      { front: "el próximo sábado", back: "next Saturday (also: el sábado que viene)" },
      { front: "esta noche", back: "tonight" },
      { front: "va a llover", back: "it's going to rain" },
      { front: "va a ser genial", back: "it's going to be great" },
      { front: "¿Te apetece…?", back: "Do you fancy…?" },
      { front: "¿A qué hora quedamos?", back: "What time shall we meet?" },
      { front: "Lo siento, no puedo.", back: "Sorry, I can't." },
      { front: "Two ways to say 'I'm going to get up'", back: "Me voy a levantar. / Voy a levantarme." },
      { front: "los sábados vs el sábado", back: "every Saturday (present habit) vs on Saturday — one occasion (can be future)" },
    ],
    mustKnow: [
      "I can conjugate *ir* in the present: *voy, vas, va, vamos, vais, van*.",
      "I can say where someone is going with *a, al, a la, a los, a las*.",
      "I can ask *¿Adónde vas?* and answer it.",
      "I can form the near future (*ir + a + infinitive*) for every person.",
      "I can make the near future negative and ask questions such as *¿Qué vas a hacer?*",
      "I can use a reflexive verb in the near future in both positions: *me voy a duchar / voy a ducharme*.",
      "I can use at least eight future time phrases, including *pasado mañana* and *que viene / próximo*.",
      "I can invite someone, accept, refuse politely with a reason, and arrange a time and place.",
      "I can make predictions about the weather and events: *va a llover, va a ser divertido*.",
      "I can give an opinion about a future event: *va a ser* + adjective + *porque…*",
      "I can tell a present sentence from a near-future one and convert between them.",
    ],
    misconceptions: [
      { wrong: "*Voy a juego al tenis.*", right: "*Voy a jugar al tenis.* — after *a* the verb stays in the infinitive." },
      { wrong: "*Voy jugar al tenis.*", right: "*Voy a jugar al tenis.* — the *a* is never left out." },
      { wrong: "*Voy a el parque.*", right: "*Voy al parque.* — *a + el* always becomes *al*." },
      { wrong: "*Voy al cine* is the near future.", right: "*Voy al cine* is the present (ir + place). The near future is *Voy a ir al cine*." },
      { wrong: "*Voy a levantarse a las siete.*", right: "*Voy a levantarme a las siete.* — the pronoun matches the subject (*yo* → *me*)." },
      { wrong: "*Estoy jugando al tenis mañana.*", right: "*Mañana juego al tenis.* / *Mañana voy a jugar al tenis.* — Spanish doesn't use *estoy …-ando* for future plans." },
      { wrong: "*Mañana va a ser calor.*", right: "*Mañana va a hacer calor.* — weather with *hacer* keeps *hacer*." },
      { wrong: "*¿Vaís al cine?*", right: "*¿Vais al cine?* — one syllable, no accent." },
    ],
    examMistakes: [
      "Writing *vaís* or *váis* instead of *vais*.",
      "Leaving out the *a*: *vamos ver* instead of *vamos a ver*.",
      "Conjugating the second verb: *va a come* instead of *va a comer*.",
      "Using the wrong person of *ir*: *mis amigos va a…* instead of *mis amigos van a…*",
      "Answering *¿Qué vas a hacer?* with *Voy a hacer nadar* instead of *Voy a nadar*.",
      "Forgetting that *próximo* agrees: *la próximo semana* instead of *la próxima semana*.",
      "Mixing the two patterns: *la próxima semana que viene* — use one or the other: *la próxima semana* or *la semana que viene*.",
      "Forgetting adjective agreement in a prediction: *la fiesta va a ser divertido* instead of *divertida*.",
      "Writing only present-tense sentences when a task asks about future plans — include *ir a + infinitive* and a future time phrase.",
    ],
    mnemonics: [
      {
        topic: "ir + a + infinitive",
        device: "The future train",
        explanation: "Engine (*ir*) changes to show who is driving; the coupling (*a*) and the wagon (the infinitive) never change. No coupling, no train: *voy jugar* falls apart.",
      },
      {
        topic: "voy",
        device: "VOY-age",
        explanation: "*Voy* sounds like the start of 'voyage' — when you go on a voyage, *voy*. And *voy* rhymes with *soy, doy, estoy*: the '-oy' family of *yo* forms.",
      },
      {
        topic: "a + el = al",
        device: "No 'a el' allowed",
        explanation: "When *a* bumps into *el*, they squash into one word: *al*. *La* is never squashed: *a la playa*.",
      },
      {
        topic: "pasado mañana",
        device: "Past tomorrow",
        explanation: "Once tomorrow has passed (*pasado*), you reach the day after tomorrow.",
      },
    ],
    realWorld: [
      {
        title: "Planning with a Spanish exchange partner",
        detail: "Messages with friends in Spain are full of the near future: *¿Qué vas a hacer el finde?* (*el finde* = weekend, informal), *¿Quedamos a las seis?*, *Vamos a ir a la playa, ¿te apetece venir?*",
        emoji: "💬",
      },
      {
        title: "¡Vamos!",
        detail: "*Vamos* doesn't only mean 'we go' — it is also 'let's go!' or 'come on!'. You'll hear Spanish tennis players and football fans shout *¡Vamos!* to cheer themselves on.",
        emoji: "🎾",
      },
      {
        title: "The weather forecast",
        detail: "On Spanish TV the forecasters often use the 'proper' future (*lloverá*), but in conversation people say *va a llover*. In Singapore's monsoon season, *esta tarde va a llover* is a safe prediction almost every day.",
        emoji: "🌧️",
      },
      {
        title: "Holiday plans",
        detail: "Planning a family trip? *En diciembre vamos a ir a Sevilla. Vamos a ver la catedral y vamos a comer churros con chocolate.*",
        emoji: "✈️",
      },
      {
        title: "Everyday future across the Spanish-speaking world",
        detail: "From Madrid to Mexico City, *voy a + infinitive* is the most common way to talk about the future in everyday speech — learn it well and you'll use it in every conversation.",
        emoji: "🌎",
      },
    ],
    videos: [
      { title: "The immediate future: ir a + infinitive", channel: "Señor Jordan", url: "https://www.youtube.com/results?search_query=se%C3%B1or+jordan+ir+a+infinitive+immediate+future" },
      { title: "The verb ir in the present tense", channel: "Spanish with Profe", url: "https://www.youtube.com/results?search_query=spanish+verb+ir+present+tense+voy+vas+va" },
      { title: "Future time phrases in Spanish", channel: "Language Gym", url: "https://www.youtube.com/results?search_query=spanish+future+time+phrases+la+semana+que+viene" },
      { title: "Weekend plans (comprehensible input)", channel: "Dreaming Spanish", url: "https://www.youtube.com/results?search_query=dreaming+spanish+plans+fin+de+semana" },
      { title: "Invitations: accepting and refusing", channel: "Butterfly Spanish", url: "https://www.youtube.com/results?search_query=spanish+invitations+accepting+refusing+quieres+ir" },
    ],
    formulas: [
      { name: "Going to a place", formula: "ir (voy, vas, va, vamos, vais, van) + a / al / a la + place", note: "Voy al parque. Vamos a la playa." },
      { name: "Near future", formula: "ir + a + infinitive", note: "Voy a jugar al tenis." },
      { name: "Negative near future", formula: "no + ir + a + infinitive", note: "No voy a salir esta noche." },
      { name: "Reflexive near future", formula: "me voy a + infinitive  =  voy a + infinitive-me", note: "Me voy a duchar. = Voy a ducharme." },
      { name: "Invitation", formula: "¿Quieres / ¿Te apetece + infinitive…?", note: "¿Te apetece ir al cine el sábado?" },
      { name: "Prediction + opinion", formula: "va a ser + adjective + porque…", note: "Va a ser genial porque voy a ver a mis primos." },
    ],
  },
};
