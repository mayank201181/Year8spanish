import type { TopicGuide } from "../../types.ts";

export const guide: TopicGuide = {
  id: "presente",
  title: "El presente — The Present Tense",
  strand: "Grammar",
  icon: "🔤",
  summary: "Hablo, tengo, quiero, me levanto — the engine behind everything you say about now.",
  intro:
    "Almost everything you say in Year 8 — where you live, what your town is like, which chores you do, what time you get up, what you play at the weekend — uses the **present tense**. This topic pulls all the patterns together: regular endings, the key irregular verbs, *ser* vs *estar*, the 'boot' verbs, reflexive verbs, and how to make negatives and questions.\n\nThe good news: Spanish verbs are very logical. Once you can see the **stem** and the **ending**, a single table unlocks hundreds of verbs.\n\nBy the end you should be able to understand — and write — a paragraph like this:\n\n    Me llamo Wei Ling y vivo en un piso en Singapur. Mi piso no es muy grande, pero está cerca del MRT.\n    Normalmente me levanto a las seis y media. Los sábados juego al bádminton y salgo con mis amigos.\n    Nunca hago nada los domingos. ¿Y tú? ¿Dónde vives? ¿Qué haces los fines de semana?",
  guide: [
    // ---------------------------------------------------------------------
    {
      id: "regular-verbs",
      heading: "Regular -ar, -er, -ir verbs",
      discovery: {
        problem:
          "Here are some lines from an email written by Lucía, your exchange partner in Madrid:\n\n    Vivo en un piso en Madrid. Mi abuela vive en Sevilla.\n    Hablo español e inglés. Mis padres también hablan catalán.\n    Como en casa con mi familia. Los domingos comemos paella de verduras.\n\n1. Look at *vivo / vive*, *hablo / hablan*, *como / comemos*. Which part of each verb stays the same, and which part changes?\n2. What does the ending *-o* seem to mean every time?\n3. Lucía's family says 'we eat' = *comemos*. Can you guess how they would say 'we live'?",
        idea:
          "The front of the verb (*viv-*, *habl-*, *com-*) never changes — that's the **stem**, and it carries the meaning. The **ending** changes, and it tells you **who** is doing the action: *-o* = I, *-e* or *-a* = he/she, *-an* = they, *-emos* = we.\n\nFor 'we live' you keep *viv-* and add the 'we' ending for *-ir* verbs: **vivimos**. If you guessed *vivemos*, you spotted the pattern from *comemos* — a great guess. *-ir* verbs just use *-imos* instead: the *i* from *vivir* comes back.",
      },
      body:
        "The **present tense** describes what you do regularly, what is true now and what is happening at the moment. One Spanish form covers three English ones: *hablo* = I speak / I'm speaking / I do speak.\n\n**Step 1 — find the infinitive.** Every Spanish verb in the dictionary ends in **-ar**, **-er** or **-ir**: *hablar* (to speak), *comer* (to eat), *vivir* (to live).\n\n**Step 2 — chop off the ending** to find the **stem**: *habl-*, *com-*, *viv-*.\n\n**Step 3 — add the ending for the person** doing the action.\n\n| | hablar (to speak) | comer (to eat) | vivir (to live) |\n|---|---|---|---|\n| yo | habl**o** | com**o** | viv**o** |\n| tú | habl**as** | com**es** | viv**es** |\n| él / ella / usted | habl**a** | com**e** | viv**e** |\n| nosotros / nosotras | habl**amos** | com**emos** | viv**imos** |\n| vosotros / vosotras | habl**áis** | com**éis** | viv**ís** |\n| ellos / ellas / ustedes | habl**an** | com**en** | viv**en** |\n\nNotice: **-er and -ir verbs share four of their six endings.** Only *nosotros* (*-emos / -imos*) and *vosotros* (*-éis / -ís*) are different. And every regular *vosotros* form has an **accent**: *-áis, -éis, -ís*.\n\n**Subject pronouns** (*yo, tú, él…*) are usually **dropped**, because the ending already tells you who: *Vivo en Singapur* is more natural than *Yo vivo en Singapur*. Keep the pronoun for emphasis or contrast: *Yo limpio la cocina y tú limpias el baño.*\n\n- *usted* (polite 'you', one person) uses the *él / ella* form: *¿Usted vive aquí?*\n- *ustedes* ('you' plural — polite in Spain, used for everyone in Latin America) uses the *ellos* form: *¿Ustedes hablan inglés?*\n- *nosotras, vosotras, ellas* are the forms for all-female groups; a mixed group uses *nosotros, vosotros, ellos*.\n\n**Regular verbs from your Year 8 topics:**\n\n| -ar | -er | -ir |\n|---|---|---|\n| hablar — to speak | comer — to eat | vivir — to live |\n| escuchar — to listen (to) | beber — to drink | escribir — to write |\n| ayudar — to help | leer — to read | compartir — to share |\n| limpiar — to clean | aprender — to learn | abrir — to open |\n| cocinar — to cook | correr — to run | subir — to go up |\n| estudiar — to study | comprender — to understand | recibir — to receive |\n| trabajar — to work | vender — to sell | asistir a — to attend |\n\n**In action:**\n\n    Vivimos en un piso cerca de la estación de MRT.\n    Mi madre trabaja en el centro y cocina por la noche.\n    Mis hermanos limpian la cocina y yo ayudo a mi padre.\n    ¿Lees en la cama?\n    ¿Compartís un dormitorio? — Do you (plural) share a bedroom?\n    Escucho música y escribo mensajes en el móvil.\n\n> **Don't add an accent to the *yo* form.** *Hablo* (I speak) has no accent. *Habló*, with an accent, is a different tense (he spoke) — you'll meet it in the preterite topic.",
      diagram: `<svg viewBox="0 0 480 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The three regular verb groups. hablar, stem habl-: hablo, hablas, habla, hablamos, habláis, hablan. comer, stem com-: como, comes, come, comemos, coméis, comen. vivir, stem viv-: vivo, vives, vive, vivimos, vivís, viven. The -er and -ir endings are the same except in the nosotros and vosotros forms, which are shaded."><rect x="0" y="0" width="480" height="300" fill="#ffffff"/><rect x="100" y="10" width="120" height="38" rx="6" fill="#c7d2fe" stroke="#334155"/><text x="160" y="34" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#1f2937">hablar → habl-</text><rect x="230" y="10" width="120" height="38" rx="6" fill="#fde68a" stroke="#334155"/><text x="290" y="34" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#1f2937">comer → com-</text><rect x="360" y="10" width="110" height="38" rx="6" fill="#bbf7d0" stroke="#334155"/><text x="415" y="34" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#1f2937">vivir → viv-</text><text x="12" y="80" font-family="sans-serif" font-size="12" fill="#1f2937">yo</text><rect x="100" y="58" width="120" height="30" rx="4" fill="#ffffff" stroke="#334155"/><text x="160" y="78" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">habl<tspan font-weight="bold">o</tspan></text><rect x="230" y="58" width="120" height="30" rx="4" fill="#ffffff" stroke="#334155"/><text x="290" y="78" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">com<tspan font-weight="bold">o</tspan></text><rect x="360" y="58" width="110" height="30" rx="4" fill="#ffffff" stroke="#334155"/><text x="415" y="78" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">viv<tspan font-weight="bold">o</tspan></text><text x="12" y="114" font-family="sans-serif" font-size="12" fill="#1f2937">tú</text><rect x="100" y="92" width="120" height="30" rx="4" fill="#ffffff" stroke="#334155"/><text x="160" y="112" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">habl<tspan font-weight="bold">as</tspan></text><rect x="230" y="92" width="120" height="30" rx="4" fill="#ffffff" stroke="#334155"/><text x="290" y="112" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">com<tspan font-weight="bold">es</tspan></text><rect x="360" y="92" width="110" height="30" rx="4" fill="#ffffff" stroke="#334155"/><text x="415" y="112" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">viv<tspan font-weight="bold">es</tspan></text><text x="12" y="148" font-family="sans-serif" font-size="12" fill="#1f2937">él / ella</text><rect x="100" y="126" width="120" height="30" rx="4" fill="#ffffff" stroke="#334155"/><text x="160" y="146" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">habl<tspan font-weight="bold">a</tspan></text><rect x="230" y="126" width="120" height="30" rx="4" fill="#ffffff" stroke="#334155"/><text x="290" y="146" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">com<tspan font-weight="bold">e</tspan></text><rect x="360" y="126" width="110" height="30" rx="4" fill="#ffffff" stroke="#334155"/><text x="415" y="146" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">viv<tspan font-weight="bold">e</tspan></text><text x="12" y="182" font-family="sans-serif" font-size="12" fill="#1f2937">nosotros</text><rect x="100" y="160" width="120" height="30" rx="4" fill="#ffffff" stroke="#334155"/><text x="160" y="180" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">habl<tspan font-weight="bold">amos</tspan></text><rect x="230" y="160" width="120" height="30" rx="4" fill="#fecaca" stroke="#334155"/><text x="290" y="180" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">com<tspan font-weight="bold">emos</tspan></text><rect x="360" y="160" width="110" height="30" rx="4" fill="#fecaca" stroke="#334155"/><text x="415" y="180" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">viv<tspan font-weight="bold">imos</tspan></text><text x="12" y="216" font-family="sans-serif" font-size="12" fill="#1f2937">vosotros</text><rect x="100" y="194" width="120" height="30" rx="4" fill="#ffffff" stroke="#334155"/><text x="160" y="214" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">habl<tspan font-weight="bold">áis</tspan></text><rect x="230" y="194" width="120" height="30" rx="4" fill="#fecaca" stroke="#334155"/><text x="290" y="214" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">com<tspan font-weight="bold">éis</tspan></text><rect x="360" y="194" width="110" height="30" rx="4" fill="#fecaca" stroke="#334155"/><text x="415" y="214" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">viv<tspan font-weight="bold">ís</tspan></text><text x="12" y="250" font-family="sans-serif" font-size="12" fill="#1f2937">ellos / ellas</text><rect x="100" y="228" width="120" height="30" rx="4" fill="#ffffff" stroke="#334155"/><text x="160" y="248" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">habl<tspan font-weight="bold">an</tspan></text><rect x="230" y="228" width="120" height="30" rx="4" fill="#ffffff" stroke="#334155"/><text x="290" y="248" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">com<tspan font-weight="bold">en</tspan></text><rect x="360" y="228" width="110" height="30" rx="4" fill="#ffffff" stroke="#334155"/><text x="415" y="248" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">viv<tspan font-weight="bold">en</tspan></text><text x="240" y="288" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#334155">Shaded: the only forms where -er and -ir endings differ</text></svg>`,
      diagramCaption:
        "Stem + ending. The three groups use the same 'person markers' (-s for tú, -mos for nosotros, -is for vosotros, -n for ellos); -er and -ir only part company in the shaded boxes.",
      workedExamples: [
        {
          title: "Build a regular verb",
          problem: "Say 'My sister and I share a bedroom' in Spanish.",
          steps: [
            "Who? 'My sister and I' = we → the *nosotros* form.",
            "Infinitive: 'to share' = *compartir* (an *-ir* verb) → stem *compart-*.",
            "*nosotros* ending for *-ir* verbs: *-imos* → *compartimos*.",
            "Add the object: *un dormitorio* (or *una habitación*).",
          ],
          answer: "*Mi hermana y yo compartimos un dormitorio.*",
          yourTurn: {
            question: "Your turn: write 'They live in a flat' in Spanish.",
            answer: {
              type: "text",
              accept: [
                "viven en un piso",
                "ellos viven en un piso",
                "ellas viven en un piso",
                "viven en un apartamento",
                "ellos viven en un apartamento",
                "ellas viven en un apartamento",
              ],
            },
            solution: "'They' → the *ellos* form. *vivir* → stem *viv-* + *-en* → **Viven en un piso.**",
          },
        },
        {
          title: "Read the ending to find the person",
          problem: "Translate into English: *¿Leéis mucho en casa?*",
          steps: [
            "The ending *-éis* only belongs to one person: *vosotros* (you, plural).",
            "Take the ending off: *le-* + *-er* → *leer* = to read.",
            "*mucho* = a lot; *en casa* = at home.",
          ],
          answer: "'Do you (plural) read a lot at home?'",
          yourTurn: {
            question: "Your turn: write the *vosotros* form of *escribir* in the present tense.",
            answer: { type: "text", accept: ["escribís", "vosotros escribís", "vosotras escribís"] },
            solution: "*-ir* verbs take *-ís* for *vosotros*: *escrib-* + *-ís* → **escribís** (accent on the *í*).",
          },
        },
      ],
      keyPoints: [
        "Infinitive − *-ar/-er/-ir* = stem; stem + ending = the present tense.",
        "*-ar*: -o, -as, -a, -amos, -áis, -an.",
        "*-er*: -o, -es, -e, -emos, -éis, -en.",
        "*-ir*: -o, -es, -e, -imos, -ís, -en.",
        "Every regular *vosotros* form has an accent (*-áis, -éis, -ís*); the regular *yo* form never does.",
        "Drop *yo, tú…* unless you want emphasis or contrast. *usted* = *él* form; *ustedes* = *ellos* form.",
      ],
      whyItWorks:
        "Spanish packs the 'who' into the end of the verb — a habit inherited from Latin. Latin *amo, amas, amat, amamus, amatis, amant* became Spanish *amo, amas, ama, amamos, amáis, aman*: almost the same 2,000 years later.\n\nLook at the endings as two parts: a **vowel** that shows the verb group (*a* for *-ar*, *e* for *-er* and most *-ir* forms) and a **person marker** that is the same for all three groups: nothing for *él*, **-s** for *tú*, **-mos** for *nosotros*, **-is** for *vosotros*, **-n** for *ellos*. Learn those five markers once and you know all three tables. Because the ending already says who, Spanish doesn't need *yo* or *tú* — English has to say 'I' because *speak* looks the same for I, you, we and they.",
      strategies: ["Find the infinitive", "Check the subject", "Look for the pattern", "Mind the accent"],
      thinkDeeper:
        "*Como* means 'I eat', but it also means 'like' or 'as'. What does *Como como mi hermano* mean? And why can't English drop 'I' the way Spanish drops *yo*? (Hint: how many different forms does 'speak' have in 'I speak, you speak, we speak, they speak'?)",
    },
    // ---------------------------------------------------------------------
    {
      id: "key-irregulars",
      heading: "Key irregular verbs",
      discovery: {
        problem:
          "Compare these *yo* forms with their infinitives:\n\n    hacer → hago        tener → tengo\n    salir → salgo       venir → vengo\n    poner → pongo\n\n    ser → soy           estar → estoy\n    ir → voy            dar → doy\n\n1. What do the first five have in common? What about the last four?\n2. Now look at the *tú* forms: *haces, sales, pones*. Are they regular or irregular?\n3. Predict: what is the *ella* form of *poner*?",
        idea:
          "The first five all end in **-go** in the *yo* form — Spanish teachers call them the **'-go' verbs**. The last four all end in **-oy**.\n\nThe great news is in question 2: for *hacer, salir* and *poner*, **only the *yo* form is odd**. *Haces, sales, pones* are perfectly regular, so *poner* → *ella* **pone**. (*Tener* and *venir* add one more twist — an *e → ie* change — which you'll see below.)",
      },
      body:
        "The verbs you use most are the ones most likely to be irregular — just like 'I am, he is' or 'I go, he went' in English. Learn them in **families** and they're far less scary.\n\n**Family 1: the '-oy' verbs** — the *yo* form ends in *-oy*.\n\n| | ser (to be) | estar (to be) | ir (to go) | dar (to give) |\n|---|---|---|---|---|\n| yo | **soy** | **estoy** | **voy** | **doy** |\n| tú | eres | estás | vas | das |\n| él / ella | es | está | va | da |\n| nosotros | somos | estamos | vamos | damos |\n| vosotros | sois | estáis | vais | dais |\n| ellos / ellas | son | están | van | dan |\n\n- *Ser* is irregular all the way through — learn it by heart.\n- *Estar* has an accent on every form except *estoy* and *estamos*.\n- *vais, dais, sois* have **no accent**: they are only one syllable.\n\n**Family 2: the '-go' verbs** — only the *yo* form is odd; everything else is regular.\n\n| | hacer (to do / make) | salir (to go out) | poner (to put) |\n|---|---|---|---|\n| yo | **hago** | **salgo** | **pongo** |\n| tú | haces | sales | pones |\n| él / ella | hace | sale | pone |\n| nosotros | hacemos | salimos | ponemos |\n| vosotros | hacéis | salís | ponéis |\n| ellos / ellas | hacen | salen | ponen |\n\n**Family 3: '-go' plus a boot** — *tener* and *venir* have *-go* in the *yo* form **and** change *e → ie* in the *tú, él/ella* and *ellos/ellas* forms.\n\n| | tener (to have) | venir (to come) |\n|---|---|---|\n| yo | **tengo** | **vengo** |\n| tú | t**ie**nes | v**ie**nes |\n| él / ella | t**ie**ne | v**ie**ne |\n| nosotros | tenemos | venimos |\n| vosotros | tenéis | venís |\n| ellos / ellas | t**ie**nen | v**ie**nen |\n\n**And *ver* (to see / to watch):** only the *yo* form keeps the *e* of the infinitive — *veo, ves, ve, vemos, veis, ven*. No accents anywhere.\n\n**Where you'll use them in Year 8:**\n\n    Tengo trece años y tengo que hacer los deberes.\n    Hago natación y voy al polideportivo los martes.\n    Salgo con mis amigos los sábados.\n    Pongo la mesa y mi hermano hace la cama.\n    Veo la tele en el salón con mi familia.\n    Doy un paseo con el perro por el parque.\n    Mi primo viene a mi casa los domingos.\n\n> **Chunks worth recycling:** *tener … años* (to be … years old), *tener que* + infinitive (to have to), *hace calor / hace sol* (weather), *ir a* + place (*voy al cine, voy a la playa*), *dar un paseo* (to go for a walk), *poner la mesa* (to set the table), *hacer la cama* (to make the bed), *salir con amigos* (to go out with friends).",
      workedExamples: [
        {
          title: "Two irregulars in one sentence",
          problem: "Say 'I go out with my friends and we go to the cinema' in Spanish.",
          steps: [
            "'I go out' → *salir*, a '-go' verb → *yo* **salgo**.",
            "'we go' → *ir*, an '-oy' verb → *nosotros* **vamos**.",
            "'to the cinema' → *a + el cine* → *al cine*.",
          ],
          answer: "*Salgo con mis amigos y vamos al cine.*",
          yourTurn: {
            question: "Your turn: write 'I do my homework' in Spanish.",
            answer: {
              type: "text",
              accept: ["hago los deberes", "yo hago los deberes", "hago mis deberes", "yo hago mis deberes"],
            },
            solution: "*hacer* is a '-go' verb, so 'I do' = *hago*: **Hago los deberes.**",
          },
        },
        {
          title: "Spot the boot inside tener",
          problem: "Complete: *¿Cuántos años ___ tu hermano?* (tener)",
          steps: [
            "Who? *tu hermano* = he → the *él* form.",
            "*tener* is '-go' in the *yo* form only; the *él* form has the *e → ie* change.",
            "*ten-* → *tien-* + *-e* → *tiene*.",
          ],
          answer: "*¿Cuántos años **tiene** tu hermano?* (How old is your brother?)",
          yourTurn: {
            question: "Your turn: write the *yo* form of *poner* in the present tense.",
            answer: { type: "text", accept: ["pongo", "yo pongo"] },
            solution: "*poner* is a '-go' verb: **pongo** (e.g. *Pongo la mesa*).",
          },
        },
      ],
      keyPoints: [
        "'-oy' verbs: *soy, estoy, voy, doy*.",
        "'-go' verbs: *hago, salgo, pongo* — only the *yo* form is irregular.",
        "*tengo, vengo* are '-go' **and** e → ie: *tienes, viene, tienen*.",
        "*ver*: *veo* — the rest is regular (*ves, ve, vemos, veis, ven*).",
        "No accent on one-syllable forms: *vais, dais, sois, veis*.",
        "Ages use *tener*: *Tengo trece años* (never *soy trece*).",
      ],
      whyItWorks:
        "The most-used verbs in every language tend to be irregular — think of English *be, have, go, do*. Words we say thousands of times get worn down and are learnt by ear, so they never get 'tidied up' to match the rules.\n\nThe '-go' forms have a history too. In Latin *dico* ('I say') the *c* was a hard 'k' sound, and in Spanish it became a *g*: *digo*. Before *e* or *i* (*dicis, dicit*) the same letter softened instead, giving *dices, dice*. So the hard *g* was only ever in the *yo* form. Over the centuries speakers copied this *-go* ending into other very common verbs — *hago, tengo, vengo, pongo, salgo* — and, just like in *digo*, only into the *yo* form. That's why the *g* never turns up in *haces* or *salimos*.",
      strategies: ["Look for the pattern", "Recycle a chunk", "Check the subject", "Say it aloud"],
      thinkDeeper:
        "*Voy* means 'I go'. *Vamos* means 'we go' — but you'll also hear *¡Vamos!* shouted at football matches. What do you think it means there, and why does the *nosotros* form make sense for it?",
    },
    // ---------------------------------------------------------------------
    {
      id: "ser-vs-estar",
      heading: "Ser vs estar",
      discovery: {
        problem:
          "Sort these sentences into two groups: the *es* group and the *está* group.\n\n    Mi piso es moderno.\n    Mi piso está en Bukit Timah.\n    Mi hermano es simpático.\n    Hoy mi hermano está cansado.\n    Es la una.\n    Sevilla está en el sur de España.\n\nWhat kind of information comes after *está*? What kind comes after *es*? Write your rule in one sentence.",
        idea:
          "*Está* tells you **where** something is (*en Bukit Timah, en el sur de España*) or **how** someone is at the moment (*cansado* — today). *Es* tells you **what** something or someone **is**: its identity and its characteristics (*moderno, simpático*) — and it also gives the time (*es la una*).\n\nA quick test: if you could answer the question *¿Dónde?* (where?) or *¿Cómo estás hoy?* (how are you today?), use *estar*.",
      },
      body:
        "Spanish has two verbs for 'to be'. They are not interchangeable: each has its own jobs.\n\n**SER — what something IS**\n\n| Use | Example |\n|---|---|\n| description / characteristics | *Mi casa es grande y luminosa.* |\n| identity, relationship, job | *Carmen es mi prima. Mi padre es médico.* |\n| nationality and origin | *Soy de Singapur. Diego es español.* |\n| time, days and dates | *Son las ocho. Es la una. Hoy es lunes.* |\n| opinion of a thing | *El pueblo es bonito pero es aburrido.* |\n\n**ESTAR — WHERE it is, and HOW it is now**\n\n| Use | Example |\n|---|---|\n| location (where something is) | *Mi colegio está cerca del parque.* |\n| | *¿Dónde está la estación?* |\n| temporary state or mood | *Estoy cansada. Mi abuelo está enfermo.* |\n| the state of something right now | *La cocina está sucia. Mi dormitorio está ordenado.* |\n\nFor homes and towns you often need **both** in one sentence:\n\n    Mi piso es pequeño pero está en el centro.\n    Málaga es una ciudad bonita y está en la costa.\n    Mi dormitorio es grande, pero hoy está desordenado.\n\n**Hay vs está.** *Hay* (there is / there are) introduces something new; *está* says where a particular thing is.\n\n    En mi barrio hay un parque.   — There's a park in my area.\n    El parque está al lado del colegio.   — The park is next to the school.\n\n**Same adjective, different meaning.** A few adjectives change meaning with the verb:\n\n- *Mi hermano **es** aburrido.* — My brother is boring (that's what he's like).\n- *Mi hermano **está** aburrido.* — My brother is bored (right now).\n- *La tortilla de patatas **es** rica.* — Spanish omelette is delicious (as a dish). *Esta tortilla **está** muy rica.* — This omelette tastes delicious (right now).\n\n> **Location = estar, even when it's permanent.** Madrid isn't going anywhere, but it's still *Madrid **está** en el centro de España*. The rule is about *where*, not about how long.",
      diagram: `<svg viewBox="0 0 460 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two boxes. Ser, what something is: Mi casa es grande (description), Mi madre es profesora (identity or job), Soy de Singapur (origin), Son las ocho (time). Estar, where it is or how it is now: Mi casa está en el centro (location), ¿Dónde está el parque? (location), Estoy cansado (how I feel now), La cocina está sucia (state right now)."><rect x="0" y="0" width="460" height="240" fill="#ffffff"/><rect x="10" y="10" width="215" height="220" rx="10" fill="#c7d2fe" stroke="#334155" stroke-width="2"/><text x="117.5" y="34" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#1f2937">SER</text><text x="117.5" y="52" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#334155">what something IS</text><text x="117.5" y="82" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">Mi casa es grande.</text><text x="117.5" y="97" font-family="sans-serif" font-size="11" font-style="italic" text-anchor="middle" fill="#334155">description</text><text x="117.5" y="120" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">Mi madre es profesora.</text><text x="117.5" y="135" font-family="sans-serif" font-size="11" font-style="italic" text-anchor="middle" fill="#334155">identity / job</text><text x="117.5" y="158" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">Soy de Singapur.</text><text x="117.5" y="173" font-family="sans-serif" font-size="11" font-style="italic" text-anchor="middle" fill="#334155">origin</text><text x="117.5" y="196" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">Son las ocho.</text><text x="117.5" y="211" font-family="sans-serif" font-size="11" font-style="italic" text-anchor="middle" fill="#334155">time</text><rect x="235" y="10" width="215" height="220" rx="10" fill="#fde68a" stroke="#334155" stroke-width="2"/><text x="342.5" y="34" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#1f2937">ESTAR</text><text x="342.5" y="52" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#334155">WHERE it is / HOW it is now</text><text x="342.5" y="82" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">Mi casa está en el centro.</text><text x="342.5" y="97" font-family="sans-serif" font-size="11" font-style="italic" text-anchor="middle" fill="#334155">location</text><text x="342.5" y="120" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">¿Dónde está el parque?</text><text x="342.5" y="135" font-family="sans-serif" font-size="11" font-style="italic" text-anchor="middle" fill="#334155">location</text><text x="342.5" y="158" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">Estoy cansado.</text><text x="342.5" y="173" font-family="sans-serif" font-size="11" font-style="italic" text-anchor="middle" fill="#334155">how I feel now</text><text x="342.5" y="196" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">La cocina está sucia.</text><text x="342.5" y="211" font-family="sans-serif" font-size="11" font-style="italic" text-anchor="middle" fill="#334155">state right now</text></svg>`,
      diagramCaption:
        "*Ser* answers 'what is it (like)?'; *estar* answers 'where is it?' and 'how is it right now?'",
      workedExamples: [
        {
          title: "Both verbs in one sentence",
          problem: "Say 'My town is small and quiet, and it is near the coast' in Spanish.",
          steps: [
            "'small and quiet' describes what the town is like → *ser*: *es pequeño y tranquilo*.",
            "'near the coast' is a location → *estar*: *está cerca de la costa*.",
            "*el pueblo* is masculine, so *pequeño, tranquilo* end in *-o*.",
          ],
          answer: "*Mi pueblo es pequeño y tranquilo, y está cerca de la costa.*",
          yourTurn: {
            question: "Your turn: write 'My bedroom is untidy today' in Spanish.",
            answer: {
              type: "text",
              accept: [
                "mi dormitorio está desordenado hoy",
                "hoy mi dormitorio está desordenado",
                "mi habitación está desordenada hoy",
                "hoy mi habitación está desordenada",
                "mi dormitorio hoy está desordenado",
                "mi habitación hoy está desordenada",
                "mi cuarto está desordenado hoy",
                "hoy mi cuarto está desordenado",
              ],
            },
            solution:
              "'today' signals a state right now → *estar*. *Mi dormitorio* → *está* + *desordenado*: **Mi dormitorio está desordenado hoy.** (With *habitación*, the adjective becomes *desordenada*.)",
          },
        },
        {
          title: "Location with a plural subject",
          problem: "Complete: *Mis abuelos ___ en un pueblo en las montañas.* (ser or estar?)",
          steps: [
            "The sentence says **where** they are → *estar*.",
            "*Mis abuelos* = they → *ellos* form → *están*.",
          ],
          answer: "*Mis abuelos **están** en un pueblo en las montañas.*",
          yourTurn: {
            question: "Your turn: fill the gap with the correct present form of *ser* or *estar*: *Las tiendas ___ en el centro comercial.*",
            answer: { type: "text", accept: ["están"] },
            solution: "Location → *estar*; *las tiendas* is plural → **están**.",
          },
        },
      ],
      keyPoints: [
        "*ser*: description, identity, job, nationality/origin, time and dates.",
        "*estar*: location and temporary states or moods.",
        "Location always takes *estar* — even for cities and countries. (Events are the exception: *La fiesta es en mi casa*.)",
        "*hay* = there is/are (something new); *está* = where a known thing is.",
        "*es aburrido* (boring) ≠ *está aburrido* (bored).",
        "Age is neither: use *tener* — *tengo doce años*.",
      ],
      whyItWorks:
        "The two verbs come from two different Latin verbs. *Ser* comes mainly from *esse*, 'to be' — the verb of identity, what something *is*. *Estar* comes from *stare*, 'to stand'. Think of *estar* as 'where it stands' and 'how it stands right now': *El museo está en la plaza* (that's where it stands), *Estoy cansado* (that's how I'm standing at the moment). English kept only one verb 'to be', so you have to decide each time which kind of 'be' you mean.",
      strategies: ["Use context", "Check the subject", "Agreement check", "Eliminate options"],
      thinkDeeper:
        "Events are the odd one out: *La fiesta **es** en mi casa* ('The party is (taking place) at my house') uses *ser*, even though it gives a place. Why might Spanish treat an *event* differently from a *thing* like a house or a park? (Think: does a party 'stand' somewhere, or does it 'happen'?)",
    },
    // ---------------------------------------------------------------------
    {
      id: "stem-changing-verbs",
      heading: "Stem-changing 'boot' verbs",
      discovery: {
        problem:
          "Here are two verbs in full:\n\n    querer: quiero, quieres, quiere, queremos, queréis, quieren\n    poder:  puedo, puedes, puede, podemos, podéis, pueden\n\n1. In which forms does *querer* have *ie* in the middle? In which forms does it keep the *e* of the infinitive?\n2. Is it the same set of forms for *poder*?\n3. Write the six forms in a grid — *yo, tú, él* down the left; *nosotros, vosotros, ellos* down the right — and draw a line around the changed forms. What shape do you get?",
        idea:
          "The change (*e → ie* in *querer*, *o → ue* in *poder*) happens in **yo, tú, él/ella and ellos/ellas**. The **nosotros** and **vosotros** forms keep the original stem: *queremos, queréis, podemos, podéis*.\n\nDraw a line around the changed forms and you get the shape of a **boot** — which is why these are called **boot verbs** (or stem-changing verbs). The endings are completely regular; only the stem vowel changes.",
      },
      body:
        "In a **stem-changing verb**, the last vowel of the stem changes inside the boot (*yo, tú, él/ella, ellos/ellas*). *Nosotros* and *vosotros* stay outside the boot and keep the infinitive's stem. The endings are the normal regular ones.\n\n**e → ie**\n\n| | querer (to want) | preferir (to prefer) | empezar (to start) | pensar (to think) |\n|---|---|---|---|---|\n| yo | qu**ie**ro | pref**ie**ro | emp**ie**zo | p**ie**nso |\n| tú | qu**ie**res | pref**ie**res | emp**ie**zas | p**ie**nsas |\n| él / ella | qu**ie**re | pref**ie**re | emp**ie**za | p**ie**nsa |\n| nosotros | queremos | preferimos | empezamos | pensamos |\n| vosotros | queréis | preferís | empezáis | pensáis |\n| ellos / ellas | qu**ie**ren | pref**ie**ren | emp**ie**zan | p**ie**nsan |\n\n**o → ue**\n\n| | poder (to be able to) | volver (to return) | dormir (to sleep) |\n|---|---|---|---|\n| yo | p**ue**do | v**ue**lvo | d**ue**rmo |\n| tú | p**ue**des | v**ue**lves | d**ue**rmes |\n| él / ella | p**ue**de | v**ue**lve | d**ue**rme |\n| nosotros | podemos | volvemos | dormimos |\n| vosotros | podéis | volvéis | dormís |\n| ellos / ellas | p**ue**den | v**ue**lven | d**ue**rmen |\n\n*Costar* (to cost) is also *o → ue*, but you'll nearly always use it for things: ***cuesta*** (it costs) and ***cuestan*** (they cost). *¿Cuánto cuesta la camiseta? — Cuesta quince euros. ¿Cuánto cuestan las entradas?*\n\n**u → ue** — only one verb, but a very important one:\n\n| | jugar (to play) |\n|---|---|\n| yo | j**ue**go |\n| tú | j**ue**gas |\n| él / ella | j**ue**ga |\n| nosotros | jugamos |\n| vosotros | jugáis |\n| ellos / ellas | j**ue**gan |\n\n**e → i**\n\n| | pedir (to ask for / to order) | vestirse (to get dressed) |\n|---|---|---|\n| yo | p**i**do | me v**i**sto |\n| tú | p**i**des | te v**i**stes |\n| él / ella | p**i**de | se v**i**ste |\n| nosotros | pedimos | nos vestimos |\n| vosotros | pedís | os vestís |\n| ellos / ellas | p**i**den | se v**i**sten |\n\n**In action:**\n\n    Quiero salir, pero no puedo porque tengo que estudiar.\n    Prefiero la natación al fútbol.\n    Las clases empiezan a las ocho menos cuarto.\n    Pienso que mi barrio es muy tranquilo.\n    Vuelvo a casa en autobús y duermo ocho horas.\n    Los sábados juego al bádminton con mi hermana.\n    En la cafetería pido un zumo de naranja y unos churros.\n\n**Useful frames:** *querer / poder / preferir* + infinitive (*¿Puedes ayudar? Prefiero quedarme en casa.*) · *empezar a* + infinitive (*Empiezo a estudiar a las cinco.*) · *pensar que…* (I think that…).\n\n> **The infinitive gives no warning.** Nothing in *jugar* or *dormir* tells you they change, so learn them with their *yo* form: *jugar (juego), dormir (duermo), pedir (pido)*. Other boot verbs you'll meet: *entender (entiendo), cerrar (cierro), despertarse (me despierto), acostarse (me acuesto), divertirse (me divierto), llover (llueve)*.",
      diagram: `<svg viewBox="0 0 460 270" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The present tense of querer in a two-column grid. A boot shape is drawn around yo quiero, tú quieres, él quiere and ellos quieren, where the stem changes from que to quie. Nosotros queremos and vosotros queréis sit outside the boot and keep the stem que."><rect x="0" y="0" width="460" height="270" fill="#ffffff"/><text x="230" y="22" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#1f2937">querer (e → ie): the boot</text><path d="M 30 37 L 230 37 L 230 157 L 430 157 L 430 223 L 30 223 Z" fill="#fde68a" stroke="#1f2937" stroke-width="3" stroke-linejoin="round"/><rect x="40" y="45" width="180" height="50" rx="6" fill="#ffffff" stroke="#334155"/><text x="130" y="65" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#334155">yo</text><text x="130" y="85" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#1f2937"><tspan font-weight="bold">quie</tspan>ro</text><rect x="240" y="45" width="180" height="50" rx="6" fill="#bbf7d0" stroke="#334155"/><text x="330" y="65" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#334155">nosotros</text><text x="330" y="85" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#1f2937">queremos</text><rect x="40" y="105" width="180" height="50" rx="6" fill="#ffffff" stroke="#334155"/><text x="130" y="125" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#334155">tú</text><text x="130" y="145" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#1f2937"><tspan font-weight="bold">quie</tspan>res</text><rect x="240" y="105" width="180" height="50" rx="6" fill="#bbf7d0" stroke="#334155"/><text x="330" y="125" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#334155">vosotros</text><text x="330" y="145" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#1f2937">queréis</text><rect x="40" y="165" width="180" height="50" rx="6" fill="#ffffff" stroke="#334155"/><text x="130" y="185" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#334155">él / ella</text><text x="130" y="205" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#1f2937"><tspan font-weight="bold">quie</tspan>re</text><rect x="240" y="165" width="180" height="50" rx="6" fill="#ffffff" stroke="#334155"/><text x="330" y="185" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#334155">ellos / ellas</text><text x="330" y="205" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#1f2937"><tspan font-weight="bold">quie</tspan>ren</text><text x="230" y="250" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#334155">Inside the boot the stem changes: que- becomes quie-</text></svg>`,
      diagramCaption:
        "Write the six forms in a grid and the changed forms make a boot. *Nosotros* and *vosotros* are outside it, so they keep the stem of the infinitive.",
      workedExamples: [
        {
          title: "Two boot verbs, two persons",
          problem: "Say 'We want to play tennis, but my brother prefers to swim' in Spanish.",
          steps: [
            "'We want' → *querer*, *nosotros* → outside the boot → *queremos* (no change).",
            "'to play tennis' → *querer* + infinitive: *jugar al tenis* (*a + el = al*).",
            "'my brother prefers' → *preferir*, *él* → inside the boot → *prefiere*.",
            "'to swim' → infinitive *nadar*.",
          ],
          answer: "*Queremos jugar al tenis, pero mi hermano prefiere nadar.*",
          yourTurn: {
            question: "Your turn: write 'I sleep eight hours' in Spanish.",
            answer: {
              type: "text",
              accept: ["duermo ocho horas", "yo duermo ocho horas", "duermo 8 horas", "yo duermo 8 horas"],
            },
            solution: "*dormir* is *o → ue* and *yo* is inside the boot: *duerm-* + *-o* → **Duermo ocho horas.**",
          },
        },
        {
          title: "Inside or outside the boot?",
          problem: "Is 'we play' *jugamos* or *juegamos*?",
          steps: [
            "Find the person: 'we' = *nosotros*.",
            "*nosotros* is **outside** the boot, so the stem stays as in the infinitive: *jug-*.",
            "*jug-* + *-amos*.",
          ],
          answer: "*jugamos* — *juegamos* doesn't exist.",
          yourTurn: {
            question: "Your turn: write the *nosotros* form of *volver* in the present tense.",
            answer: { type: "text", accept: ["volvemos", "nosotros volvemos", "nosotras volvemos"] },
            solution: "*nosotros* is outside the boot → no change: *volv-* + *-emos* → **volvemos**.",
          },
        },
        {
          title: "Costar: singular or plural?",
          problem: "Complete: *¿Cuánto ___ las zapatillas?* (costar)",
          steps: [
            "What costs? *las zapatillas* — plural → *ellos* form.",
            "*costar* is *o → ue*, and *ellos* is inside the boot → *cuest-* + *-an*.",
          ],
          answer: "*¿Cuánto **cuestan** las zapatillas?*",
          yourTurn: {
            question: "Your turn: write the *ella* form of *pedir* in the present tense.",
            answer: { type: "text", accept: ["pide", "ella pide"] },
            solution: "*pedir* is *e → i*, and *ella* is inside the boot: **pide**.",
          },
        },
      ],
      keyPoints: [
        "Stem change only inside the boot: *yo, tú, él/ella, ellos/ellas*.",
        "*nosotros, vosotros* keep the infinitive stem: *podemos, jugáis*.",
        "e → ie: *quiero, prefiero, empiezo, pienso*.",
        "o → ue: *puedo, vuelvo, duermo, cuesta*. u → ue: *juego*.",
        "e → i: *pido, me visto*.",
        "The endings are the normal regular ones.",
      ],
      whyItWorks:
        "The boot is all about **stress**. Say the forms aloud: *QUIE-ro, QUIE-res, QUIE-re, QUIE-ren* — the stress falls on the stem. But *que-RE-mos, que-RÉIS* — the stress moves onto the ending. Centuries ago, a stressed *e* in Spanish stretched into *ie* and a stressed *o* into *ue* (Latin *festa* → *fiesta*, *porta* → *puerta*). Where the stem isn't stressed, nothing happened.\n\nYou can see the same thing in families of words: *el juego* (the game) but *jugar*; *el sueño* (sleep, dream) but *soñar*; *la vuelta* (the return) but *volver*. Stress on the stem → the change appears.",
      strategies: ["Look for the pattern", "Check the subject", "Say it aloud", "Find the infinitive"],
      thinkDeeper:
        "*Preferir* has **two** *e*'s in its stem, but only one changes: *prefiero*, not *priefiero*. Using the stress rule, can you explain why it's the second *e* that changes? Try saying *pre-FIE-ro* aloud.",
    },
    // ---------------------------------------------------------------------
    {
      id: "reflexive-verbs",
      heading: "Reflexive verbs in the present",
      discovery: {
        problem:
          "Compare each pair:\n\n    Lavo el coche.  —  Me lavo.\n    Llamo a mi abuela.  —  Me llamo Diego.\n    Acuesto a mi hermana pequeña.  —  Me acuesto a las diez.\n\n1. In the first sentence of each pair, who or what receives the action?\n2. In the second sentence, who receives it?\n3. So what job is *me* doing?",
        idea:
          "In the first sentences the action goes **out** to someone or something else: the car, my grandmother, my little sister. In the second, the action **bounces back** to the person doing it: *me lavo* = I wash myself; *me llamo Diego* = I call myself Diego; *me acuesto* = I put myself to bed, i.e. I go to bed.\n\n*Me* is a **reflexive pronoun** ('myself'). English often leaves 'myself' out, but Spanish can't — without *me*, *lavo* means 'I wash (something)'.",
      },
      body:
        "A **reflexive verb** ends in **-se** in the dictionary: *levantarse* (to get up), *ducharse* (to have a shower). To use it, take off *-se*, conjugate the verb as normal and put the matching **reflexive pronoun** in front.\n\n| | levantarse (to get up) | acostarse (to go to bed, o → ue) | vestirse (to get dressed, e → i) |\n|---|---|---|---|\n| yo | **me** levanto | **me** acuesto | **me** visto |\n| tú | **te** levantas | **te** acuestas | **te** vistes |\n| él / ella | **se** levanta | **se** acuesta | **se** viste |\n| nosotros | **nos** levantamos | **nos** acostamos | **nos** vestimos |\n| vosotros | **os** levantáis | **os** acostáis | **os** vestís |\n| ellos / ellas | **se** levantan | **se** acuestan | **se** visten |\n\nNotice that reflexive verbs can also be boot verbs: the pronoun changes with the person, **and** the stem changes inside the boot.\n\n**Where does the pronoun go?**\n\n1. **Before a conjugated verb:** *Me ducho por la mañana.* With a negative, *no* goes before the pronoun: *No me ducho por la noche.*\n2. **With an infinitive** (after *voy a, quiero, tengo que, puedo…*), it can go **before the conjugated verb** or **glued to the end of the infinitive** — both are correct:\n\n    Me voy a levantar.  =  Voy a levantarme.\n    Me quiero duchar.  =  Quiero ducharme.\n    Te tienes que acostar.  =  Tienes que acostarte.\n\n3. **After a preposition** (*para, antes de, después de*) it must go on the end: *antes de acostarme, después de ducharme, para relajarme.*\n\nThe pronoun always matches the person: *Vamos a levantar**nos**. ¿Vas a duchar**te**?* — never *Vamos a levantarse*.\n\n**Reflexive or not? The meaning changes.**\n\n| Not reflexive (action goes out) | Reflexive (action comes back) |\n|---|---|\n| *Lavo el coche.* — I wash the car. | *Me lavo.* — I wash (myself). |\n| *Despierto a mi hermano.* — I wake my brother up. | *Me despierto.* — I wake up. |\n| *Baño al perro.* — I bath the dog. | *Me baño.* — I have a bath. |\n| *Llamo a mi abuela.* — I call my grandmother. | *Me llamo Javier.* — My name is Javier. |\n| *Acuesto a mi hermana.* — I put my sister to bed. | *Me acuesto.* — I go to bed. |\n\n**Body parts take *el / la / los*, not 'my':** *Me lavo **los** dientes* (I brush my teeth), *Me lavo **la** cara*, *Se seca **el** pelo*. The *me* already says whose teeth they are.\n\n**Common reflexive verbs:** *despertarse (me despierto), levantarse, ducharse, bañarse, lavarse, vestirse (me visto), peinarse, acostarse (me acuesto), relajarse, divertirse (me divierto), aburrirse, llamarse.*",
      workedExamples: [
        {
          title: "Two reflexives, one sentence",
          problem: "Say 'At the weekend I wake up at nine but I get up at ten' in Spanish.",
          steps: [
            "'I wake up' → *despertarse* (e → ie), *yo* → *me despierto*.",
            "'I get up' → *levantarse*, *yo* → *me levanto*.",
            "Times: *a las nueve, a las diez*. 'At the weekend' → *el fin de semana* (or *los fines de semana*).",
          ],
          answer: "*El fin de semana me despierto a las nueve, pero me levanto a las diez.*",
          yourTurn: {
            question: "Your turn: write 'I'm going to have a shower' in Spanish (use *ducharse*).",
            answer: {
              type: "text",
              accept: ["voy a ducharme", "me voy a duchar", "yo voy a ducharme", "yo me voy a duchar"],
            },
            solution:
              "*ir a* + infinitive, with *me* either on the end or in front: **Voy a ducharme** or **Me voy a duchar** — both correct.",
          },
        },
        {
          title: "Plural subject, stem change",
          problem: "Say 'My parents go to bed at eleven' in Spanish.",
          steps: [
            "'go to bed' → *acostarse* (o → ue).",
            "*mis padres* = they → pronoun *se*, and *ellos* is inside the boot → *acuestan*.",
          ],
          answer: "*Mis padres se acuestan a las once.*",
          yourTurn: {
            question: "Your turn: write 'We get dressed' in Spanish (use *vestirse*).",
            answer: { type: "text", accept: ["nos vestimos", "nosotros nos vestimos", "nosotras nos vestimos"] },
            solution:
              "Pronoun for *nosotros* = *nos*. *Vestirse* is *e → i*, but *nosotros* is outside the boot → *vestimos*: **Nos vestimos.**",
          },
        },
      ],
      keyPoints: [
        "Pronouns: *me, te, se, nos, os, se*.",
        "Pronoun before a conjugated verb: *me levanto*; *no* goes before it: *no me levanto*.",
        "With an infinitive: *voy a levantarme* = *me voy a levantar*.",
        "After *para / antes de / después de*: on the end only (*antes de acostarme*).",
        "The pronoun must match the subject: *vamos a levantarnos*.",
        "Body parts: *me lavo los dientes*, not *mis dientes*.",
      ],
      whyItWorks:
        "The *-se* on the end of an infinitive is a 'blank' pronoun meaning 'oneself'. When you know who is doing the action, you swap *-se* for the right person: *me, te, se, nos, os, se*. An infinitive has no person of its own, so the pronoun can attach to it (*levantarme*); a conjugated verb already has a person, so the pronoun sits in front of it (*me levanto*). When there are two verbs together, the pronoun can lean on either one — that's why both *me voy a levantar* and *voy a levantarme* work.",
      strategies: ["Check the subject", "Find the infinitive", "Translate back to check", "Look for the pattern"],
      thinkDeeper:
        "*Me llamo Javier* is literally 'I call myself Javier'. What would *Llamo a Javier* mean? And *Se llaman Javier y Pablo*? Now explain the difference between *Mi hermano se ducha* and *Mi hermano ducha al perro*.",
    },
    // ---------------------------------------------------------------------
    {
      id: "negatives-and-questions",
      heading: "Negatives and questions",
      discovery: {
        problem:
          "Look at these sentences and their English meanings:\n\n    No juego al fútbol.  — I don't play football.\n    No hago nada.  — I don't do anything.\n    No veo a nadie.  — I don't see anybody.\n    Nunca hago los deberes.  — I never do my homework.\n    No hago nunca los deberes.  — I never do my homework.\n\n1. Where does *no* go in the sentence?\n2. Translate *No hago nada* word for word. Would that be correct in English?\n3. The last two sentences mean the same. When does Spanish need *no*, and when can it drop it?",
        idea:
          "*No* goes **directly in front of the verb**. Word for word, *No hago nada* is 'I don't do nothing' — wrong in English, but **correct and compulsory** in Spanish: the negative words 'agree' with each other.\n\nIf the negative word (*nunca, nadie, nada, tampoco*) comes **after** the verb, you need *no* in front. If it comes **before** the verb, it does the job by itself and *no* disappears: *Nunca hago los deberes.*",
      },
      body:
        "**Making a sentence negative.** Put *no* directly in front of the verb — and in front of any reflexive pronoun:\n\n    Juego al críquet.  →  No juego al críquet.\n    Me levanto temprano.  →  No me levanto temprano.\n\n**Other negative words** usually make a 'sandwich': *no* before the verb, the negative word after it.\n\n| Spanish | English | Example |\n|---|---|---|\n| no… nunca | never | *No ordeno nunca mi dormitorio.* |\n| no… nada | nothing / not anything | *No hago nada los domingos.* |\n| no… nadie | nobody / not anybody | *No hay nadie en casa.* |\n| no… tampoco | not… either | *No veo la tele tampoco.* |\n| no… ni… ni | neither… nor | *No juego ni al fútbol ni al tenis.* |\n\nIf the negative word comes **first**, drop *no*:\n\n    Nunca ordeno mi dormitorio.\n    Nadie lava los platos en mi casa.\n    Tampoco veo la tele.\n\n> **'Me neither'** = *Yo tampoco.* With *gustar*, it's *A mí tampoco*: — *No me gusta el críquet.* — *A mí tampoco.*\n\n**Asking questions.** A Spanish question is wrapped in **¿ … ?** — the upside-down mark at the start warns you to use a questioning voice. A yes/no question can be exactly the same words as a statement, with rising intonation:\n\n    Tienes un perro.  →  ¿Tienes un perro?\n    Vives en un piso.  →  ¿Vives en un piso?\n\nYou can also put the subject after the verb: *¿Juega tu hermana al tenis?*\n\n**Question words** — every one has an **accent**:\n\n| Question word | English | Example |\n|---|---|---|\n| ¿Qué? | What? | *¿Qué haces los sábados?* |\n| ¿Dónde? | Where? | *¿Dónde vives?* |\n| ¿Adónde? | Where (to)? | *¿Adónde vas?* |\n| ¿De dónde? | Where from? | *¿De dónde eres?* |\n| ¿Cuándo? | When? | *¿Cuándo juegas al fútbol?* |\n| ¿Cómo? | How? / What… like? | *¿Cómo es tu casa?* |\n| ¿Por qué? | Why? | *¿Por qué no vienes?* |\n| ¿Quién? / ¿Quiénes? | Who? | *¿Quién pone la mesa?* |\n| ¿Cuánto? / ¿Cuánta? | How much? | *¿Cuánto cuesta?* |\n| ¿Cuántos? / ¿Cuántas? | How many? | *¿Cuántas habitaciones hay?* |\n| ¿Con quién? | Who with? | *¿Con quién sales?* |\n| ¿A qué hora? | At what time? | *¿A qué hora te levantas?* |\n| ¿Cuál? / ¿Cuáles? | Which (one)? | *¿Cuál es tu deporte favorito?* |\n\n- *¿Por qué?* (why?) is **two words with an accent**; the answer *porque* (because) is **one word with no accent**.\n- *¿Cuánto?* agrees with the noun: *¿Cuántos hermanos tienes? ¿Cuántas horas duermes?*\n- A preposition goes **in front of** the question word: *¿Con quién juegas? ¿De dónde eres?* — never *¿Quién juegas con?*\n- The verb usually comes straight after the question word: *¿Dónde vive tu abuela?*",
      workedExamples: [
        {
          title: "Work backwards from an answer",
          problem: "Write the question that this answers, asking 'who with?': *Juego al tenis con mi hermano.*",
          steps: [
            "'Who with?' = *¿Con quién?* — the preposition *con* goes in front.",
            "Change the verb to the *tú* form, because you're asking someone: *juego* → *juegas*.",
            "Keep *al tenis* and drop the answer (*con mi hermano*).",
          ],
          answer: "*¿Con quién juegas al tenis?*",
          yourTurn: {
            question: "Your turn: write 'How many brothers do you have?' in Spanish (*tú* form).",
            answer: { type: "text", accept: ["cuántos hermanos tienes", "cuántos hermanos tienes tú"] },
            solution:
              "'How many' + a masculine plural noun → *¿Cuántos…?* (with an accent). *tener*, *tú* form → *tienes*: **¿Cuántos hermanos tienes?**",
          },
        },
        {
          title: "Two ways to say 'never'",
          problem: "Say 'I never tidy my bedroom' in Spanish — in two ways.",
          steps: [
            "'to tidy' = *ordenar* → *yo ordeno*.",
            "Negative word first → no *no*: *Nunca ordeno mi dormitorio.*",
            "Negative word after the verb → sandwich with *no*: *No ordeno nunca mi dormitorio.*",
          ],
          answer: "*Nunca ordeno mi dormitorio.* = *No ordeno nunca mi dormitorio.*",
          yourTurn: {
            question: "Your turn: write 'I don't do anything' in Spanish.",
            answer: { type: "text", accept: ["no hago nada", "yo no hago nada"] },
            solution:
              "'I do' = *hago* ('-go' verb); 'not… anything' = the sandwich *no… nada*: **No hago nada.**",
          },
        },
      ],
      keyPoints: [
        "*no* goes right before the verb (and before *me/te/se*).",
        "Double negatives are correct: *no hago nada, no hay nadie*.",
        "Negative word first → no *no*: *Nunca juego*.",
        "Questions open with *¿* and close with *?*.",
        "Question words carry accents: *qué, dónde, cuándo, cómo, quién, cuánto*.",
        "*¿Por qué?* = why; *porque* = because.",
        "Prepositions go first: *¿Con quién…? ¿De dónde…? ¿A qué hora…?*",
      ],
      whyItWorks:
        "In maths, two negatives cancel out. Spanish doesn't treat negatives like maths: it treats them like **agreement**. Just as an adjective agrees with its noun, *nada, nadie, nunca* agree with the *no* — the whole sentence is 'switched to negative'. Once a negative word stands in front of the verb, the sentence is already switched, so *no* isn't needed.\n\nThe accents on question words aren't decoration. The same words exist without accents as linking words: *¿Dónde vives?* (where?) vs *la casa donde vivo* (the house where I live); *¿Qué haces?* vs *Pienso que…* (I think that…); *¿Cómo estás?* vs *como* (I eat / like). The accent shows the word is a question word — and in speech it's said with extra stress. The opening *¿* exists because a Spanish question often looks exactly like a statement (*Tienes un perro*), so the reader needs warning from the very first word.",
      strategies: ["Mind the accent", "Check the subject", "Translate back to check", "Use context"],
      thinkDeeper:
        "Work out this famous tongue-twister: *¿Cómo como? ¡Como como como!* Then explain why *¿Qué comes?* has an accent but *Pienso que comes mucho* doesn't.",
    },
  ],
  learn: {
    flashcards: [
      { front: "Regular *-ar* endings (present)", back: "-o, -as, -a, -amos, -áis, -an (*hablo, hablas, habla, hablamos, habláis, hablan*)" },
      { front: "Regular *-er* endings (present)", back: "-o, -es, -e, -emos, -éis, -en (*como, comes, come, comemos, coméis, comen*)" },
      { front: "Regular *-ir* endings (present)", back: "-o, -es, -e, -imos, -ís, -en (*vivo, vives, vive, vivimos, vivís, viven*)" },
      { front: "*ser* — all six forms", back: "*soy, eres, es, somos, sois, son*" },
      { front: "*estar* — all six forms", back: "*estoy, estás, está, estamos, estáis, están*" },
      { front: "*tener* — all six forms", back: "*tengo, tienes, tiene, tenemos, tenéis, tienen*" },
      { front: "*ir* — all six forms", back: "*voy, vas, va, vamos, vais, van*" },
      { front: "*hacer* — all six forms", back: "*hago, haces, hace, hacemos, hacéis, hacen*" },
      { front: "*yo* forms of *salir, poner, venir, ver, dar*", back: "*salgo, pongo, vengo, veo, doy*" },
      { front: "*querer* (e → ie) — all six forms", back: "*quiero, quieres, quiere, queremos, queréis, quieren*" },
      { front: "*poder* (o → ue) — all six forms", back: "*puedo, puedes, puede, podemos, podéis, pueden*" },
      { front: "*jugar* (u → ue) — all six forms", back: "*juego, juegas, juega, jugamos, jugáis, juegan*" },
      { front: "*pedir* (e → i) — all six forms", back: "*pido, pides, pide, pedimos, pedís, piden*" },
      { front: "Which persons are inside the boot?", back: "*yo, tú, él/ella, ellos/ellas* — *nosotros* and *vosotros* keep the infinitive stem." },
      { front: "Location: *ser* or *estar*?", back: "*estar* — *Mi casa está en el centro.*" },
      { front: "Time: *ser* or *estar*?", back: "*ser* — *Son las tres. Es la una.*" },
      { front: "*me levanto, te levantas, se levanta…*", back: "I get up, you get up, he/she gets up… (*levantarse*)" },
      { front: "Another way to say *Voy a levantarme*", back: "*Me voy a levantar.*" },
      { front: "*No hago nada.*", back: "I don't do anything." },
      { front: "*nunca / nadie / tampoco / ni… ni*", back: "never / nobody / not… either / neither… nor" },
      { front: "*¿Por qué?* vs *porque*", back: "why? (two words, accent) / because (one word, no accent)" },
      { front: "*¿Con quién?* · *¿A qué hora?* · *¿De dónde?*", back: "Who with? · At what time? · Where from?" },
      { front: "*¿Cuántos? / ¿Cuántas?*", back: "How many? — agrees with the noun: *¿Cuántas habitaciones hay?*" },
    ],
    mustKnow: [
      "I can find the stem of any regular verb and add the right present-tense ending for all six persons.",
      "I can use *vosotros* forms with the correct accent (*habláis, coméis, vivís*).",
      "I can conjugate *ser, estar, tener, ir* and *hacer* from memory.",
      "I can use the '-go' *yo* forms: *hago, salgo, pongo, tengo, vengo* — plus *veo* and *doy*.",
      "I can choose between *ser* and *estar*, especially for describing a home or town and saying where it is.",
      "I can conjugate boot verbs (*quiero, puedo, juego, pido*) and know that *nosotros/vosotros* don't change.",
      "I can use reflexive verbs with the right pronoun, and put the pronoun in both positions with an infinitive.",
      "I can make sentences negative with *no, nunca, nada, nadie, tampoco* and *ni… ni*.",
      "I can ask questions with accented question words and *¿…?* punctuation.",
      "I can tell *¿por qué?* (why) from *porque* (because).",
    ],
    misconceptions: [
      { wrong: "*Yo soy trece años.*", right: "*Tengo trece años.* — age uses *tener* ('I have thirteen years')." },
      { wrong: "*Mi casa es en el centro.*", right: "*Mi casa **está** en el centro.* — location always takes *estar*." },
      { wrong: "*Juegamos al fútbol.*", right: "*Jugamos al fútbol.* — *nosotros* is outside the boot, so no stem change." },
      { wrong: "*Hacemos* is irregular because *hago* is.", right: "Only the *yo* form of the '-go' verbs is odd: *hacemos, salimos, ponemos* are regular." },
      { wrong: "*No hago nada* is a mistake — it's a double negative.", right: "Spanish double negatives are correct and compulsory: *No hago nada* = I don't do anything." },
      { wrong: "*Levanto a las siete.*", right: "*Me levanto a las siete.* — without *me*, *levanto* means 'I lift (something)'." },
      { wrong: "*Vamos a levantarse.*", right: "*Vamos a levantarnos.* — the pronoun matches the person, even on the end of the infinitive." },
      { wrong: "*¿Quién juegas con?*", right: "*¿Con quién juegas?* — the preposition goes in front of the question word." },
    ],
    examMistakes: [
      "Leaving off the accent on *vosotros* forms: *hablais* instead of *habláis*.",
      "Adding accents where there are none: *vaís, daís, veís* (they're one syllable: *vais, dais, veis*).",
      "Writing *porque* when you mean 'why?' — the question is *¿Por qué?*",
      "Forgetting the accent on question words: *¿Donde vives?* instead of *¿Dónde vives?*",
      "Using the infinitive instead of conjugating: *Mi hermano jugar al tenis* instead of *Mi hermano juega al tenis*.",
      "Changing the stem in *nosotros/vosotros*: *podemos, queréis* ✔ but *puedemos, quieréis* ✘.",
      "Using *ser* for temporary states: *Soy cansado* instead of *Estoy cansado/cansada*.",
      "Writing *mis dientes* with a reflexive: *Me lavo mis dientes* instead of *Me lavo los dientes*.",
      "Forgetting the opening *¿* in a written question.",
    ],
    mnemonics: [
      {
        topic: "Boot verbs",
        device: "Kick with the boot",
        explanation:
          "Write the six forms in two columns (*yo, tú, él* | *nosotros, vosotros, ellos*). The changed forms make a boot; *nosotros* and *vosotros* are outside — the boot can't kick them.",
      },
      {
        topic: "Ser vs estar",
        device: "How you feel and where you are — that is when you use *estar*.",
        explanation:
          "A rhyme covering *estar*'s two big jobs: temporary states (*Estoy cansado*) and location (*Está en el centro*). Everything else at Year 8 — description, identity, origin, time — is *ser*.",
      },
      {
        topic: "Ser vs estar",
        device: "DOCTOR and PLACE",
        explanation:
          "*Ser*: **D**escription, **O**ccupation, **C**haracteristic, **T**ime, **O**rigin, **R**elationship. *Estar*: **P**osition, **L**ocation, **A**ction in progress, **C**ondition, **E**motion. (A doctor has a permanent job; a place is where you are.)",
      },
      {
        topic: "The '-go' gang",
        device: "Ha-go, sal-go, pon-go, ten-go, ven-go — 'Go, go, go!'",
        explanation:
          "Five everyday verbs whose *yo* form ends in *-go*: *hago, salgo, pongo, tengo, vengo*. Chant them like a cheer. Only the *yo* form is odd.",
      },
      {
        topic: "The '-oy' family",
        device: "Soy, estoy, voy, doy — 'oy, oy, oy!'",
        explanation: "*ser, estar, ir, dar* all end in *-oy* in the *yo* form.",
      },
    ],
    realWorld: [
      {
        title: "Meeting your exchange partner",
        detail:
          "The first conversation with a Spanish exchange partner is almost all present tense: *Me llamo Arjun, tengo trece años, soy de Singapur y vivo en un piso. ¿Y tú? ¿Dónde vives? ¿Tienes hermanos?*",
        emoji: "👋",
      },
      {
        title: "At a café in Madrid",
        detail:
          "Ordering uses boot verbs such as *querer* and *pedir*, a negative and a price question: *Quiero un chocolate con churros, por favor. — ¿Algo más? — No, nada más. ¿Cuánto es?* (or *¿Cuánto cuesta?*)",
        emoji: "☕",
      },
      {
        title: "Finding your way in Sevilla",
        detail:
          "Asking where something is always takes *estar*: *Perdone, ¿dónde está la catedral?* You'll hear *Está muy cerca, a cinco minutos.*",
        emoji: "🗺️",
      },
      {
        title: "Vosotros or ustedes?",
        detail:
          "In Spain friends are *vosotros* (*¿Qué hacéis esta tarde?*). In Latin America — Mexico, Colombia, Peru and beyond — everyone uses *ustedes* for 'you' plural (*¿Qué hacen ustedes esta tarde?*). Learn *vosotros*, but recognise *ustedes*.",
        emoji: "🌎",
      },
      {
        title: "Vos in Argentina",
        detail:
          "In Argentina and Uruguay, people say *vos* instead of *tú*, with their own present forms: *vos tenés, vos hablás, vos sos*. If you watch an Argentinian series, listen out for it!",
        emoji: "🇦🇷",
      },
      {
        title: "Spanish speakers in Singapore",
        detail:
          "If you meet a Spanish-speaking family at your condo or at a CCA, the first questions you'll hear are present-tense questions: *¿Cómo te llamas? ¿De dónde eres? ¿Hablas español?* Now you can answer — and ask them back.",
        emoji: "🇸🇬",
      },
    ],
    videos: [
      {
        title: "Present tense regular verbs (-ar, -er, -ir)",
        channel: "Señor Jordan",
        url: "https://www.youtube.com/results?search_query=se%C3%B1or+jordan+present+tense+regular+verbs",
      },
      {
        title: "Stem-changing 'boot' verbs",
        channel: "Spanish with Profe",
        url: "https://www.youtube.com/results?search_query=spanish+stem+changing+boot+verbs+present+tense",
      },
      {
        title: "Ser vs estar explained",
        channel: "Butterfly Spanish",
        url: "https://www.youtube.com/results?search_query=butterfly+spanish+ser+vs+estar",
      },
      {
        title: "Reflexive verbs in the present tense",
        channel: "The Language Gym",
        url: "https://www.youtube.com/results?search_query=spanish+reflexive+verbs+present+tense+daily+routine",
      },
      {
        title: "Spanish question words",
        channel: "Señor Jordan",
        url: "https://www.youtube.com/results?search_query=se%C3%B1or+jordan+spanish+question+words",
      },
    ],
    formulas: [
      { name: "Regular -ar verbs", formula: "stem + -o, -as, -a, -amos, -áis, -an", note: "Hablo inglés y español." },
      { name: "Regular -er verbs", formula: "stem + -o, -es, -e, -emos, -éis, -en", note: "Comemos en casa los domingos." },
      { name: "Regular -ir verbs", formula: "stem + -o, -es, -e, -imos, -ís, -en", note: "¿Vivís en Madrid?" },
      { name: "'-go' verbs", formula: "yo = stem + -go (hago, salgo, pongo, tengo, vengo); other forms regular — except tener / venir, which also change e → ie (tienes, viene)", note: "Salgo con mis amigos los sábados." },
      { name: "Boot verbs", formula: "stem change in yo, tú, él/ella, ellos/ellas; nosotros/vosotros keep the infinitive stem", note: "Puedo, puedes, puede, podemos, podéis, pueden." },
      { name: "Ser vs estar", formula: "ser + description / identity / time · estar + location / temporary state", note: "Mi casa es grande y está en el centro." },
      { name: "Reflexive verbs", formula: "me / te / se / nos / os / se + conjugated verb", note: "Me levanto a las siete." },
      { name: "Reflexive + infinitive", formula: "voy a + infinitive-pronoun = pronoun + voy a + infinitive", note: "Voy a ducharme. = Me voy a duchar." },
      { name: "Negative sandwich", formula: "no + verb + nunca / nada / nadie / tampoco", note: "No hago nada los domingos." },
      { name: "Questions with a preposition", formula: "¿ + preposition + question word + verb … ?", note: "¿Con quién vives? ¿A qué hora te levantas?" },
    ],
  },
};
