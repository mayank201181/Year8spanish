import type { TopicGuide } from "../../types.ts";

export const guide: TopicGuide = {
  id: "el-tiempo",
  title: "¿Qué tiempo hace? — The Weather",
  strand: "My Town",
  icon: "☀️",
  summary: "Hace calor, llueve, va a nevar — describe the weather in the past, present and future, and read a weather map of Spain.",
  intro:
    "In Spanish the weather isn't hot — it *makes* heat: *hace calor*. Learn four little families of expressions (*hace…*, weather verbs like *llueve*, *está…* and *hay…*) and you can describe any sky, from a Singapore thunderstorm to snow in the Pyrenees.\n\nIn this topic you'll learn the weather expressions, the seasons and months, how the climate in Spain compares with Singapore, how to read a Spanish weather map, how to say what you do in different weather and what the weather is going to be like, and finally how to say what the weather was like yesterday. By the end you should be able to answer *¿Qué tiempo hace?* in the past, present and future: *Ayer llovió, hoy hace sol y mañana va a hacer mucho calor.*",
  guide: [
    // ------------------------------------------------------------------ 1
    {
      id: "weather-expressions",
      heading: "Weather expressions",
      discovery: {
        problem:
          "Sort these eight weather sentences into **four families**. Look closely at the first word of each:\n\n    Hace calor. · Hay niebla. · Llueve. · Está nublado.\n    Hace viento. · Nieva. · Hay tormenta. · Hace sol.\n\nThen a second puzzle: a Spanish speaker always says *hace mucho calor* for 'it's very hot', never *hace muy calor*. *Calor* means 'heat'. Can you explain why *mucho* is needed?",
        idea:
          "The four families are:\n\n- **hace + noun**: *hace calor, hace viento, hace sol* — literally 'it makes heat / wind / sun'.\n- **a weather verb on its own**: *llueve* (it rains), *nieva* (it snows).\n- **está + adjective**: *está nublado* — it is cloudy (describing how the sky is).\n- **hay + noun**: *hay niebla, hay tormenta* — 'there is fog / a storm'.\n\nBecause *calor* is a **noun** ('heat'), you need *mucho* ('a lot of'): *hace mucho calor* = 'it makes a lot of heat'. *Muy* ('very') only goes with adjectives and adverbs.",
      },
      body:
        "The key question is **¿Qué tiempo hace?** — What's the weather like?\n\n**1. Hace + noun** (from *hacer*, 'to make / to do')\n\n| Spanish | English |\n|---|---|\n| hace calor | it's hot |\n| hace frío | it's cold |\n| hace sol | it's sunny |\n| hace viento | it's windy |\n| hace fresco | it's cool / chilly |\n| hace buen tiempo | the weather is nice |\n| hace mal tiempo | the weather is bad |\n\n**2. Weather verbs** — used on their own, always in the *él / ella* form:\n\n| infinitive | present | English |\n|---|---|---|\n| llover (o→ue) | llueve | it rains / it's raining |\n| nevar (e→ie) | nieva | it snows / it's snowing |\n| tronar (o→ue) | truena | it's thundering |\n\nYou may also hear *está lloviendo* / *está nevando* — 'it is raining / snowing right now'.\n\n**3. Está + adjective** — how the sky looks:\n\n- *está nublado* — it's cloudy\n- *está despejado* — it's clear (no clouds)\n\n**4. Hay + noun** — 'there is / there are':\n\n- *hay tormenta* — there's a storm / it's stormy\n- *hay niebla* — it's foggy\n- *hay nubes* — there are clouds\n\n**Making it stronger: mucho or muy?**\n\n- Nouns after *hace* take **mucho**: *hace mucho calor, hace mucho frío, hace mucho viento*.\n- After *hay*, *mucho* agrees with the noun: *hay **mucha** niebla* (*la niebla*), *hay **muchas** nubes* (*las nubes*).\n- After a weather verb, *mucho* means 'a lot' and never changes: *llueve mucho, nieva mucho*.\n- **Muy** goes with adjectives: *está muy nublado*, *hace muy buen tiempo* (*buen* is an adjective).\n\n> Weather or feeling? *Hace calor* = the weather is hot. *Tengo calor* = I feel hot. Never *estoy calor* or *soy calor*.\n\nJoin expressions with *y* and *pero* to sound more natural:\n\n    Hoy en Singapur hace mucho calor y llueve por la tarde.\n    Hace sol, pero hace viento.\n    Está nublado y hace fresco.",
      diagram: `<svg viewBox="0 0 480 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Weather symbol key: hace sol, está nublado, llueve, nieva, hace viento, hay tormenta, hay niebla and hace calor, each labelled with the verb it comes from"><rect width="480" height="300" fill="#ffffff"/><rect x="8" y="8" width="110" height="138" rx="10" fill="#f8fafc" stroke="#334155"/><rect x="126" y="8" width="110" height="138" rx="10" fill="#f8fafc" stroke="#334155"/><rect x="244" y="8" width="110" height="138" rx="10" fill="#f8fafc" stroke="#334155"/><rect x="362" y="8" width="110" height="138" rx="10" fill="#f8fafc" stroke="#334155"/><rect x="8" y="154" width="110" height="138" rx="10" fill="#f8fafc" stroke="#334155"/><rect x="126" y="154" width="110" height="138" rx="10" fill="#f8fafc" stroke="#334155"/><rect x="244" y="154" width="110" height="138" rx="10" fill="#f8fafc" stroke="#334155"/><rect x="362" y="154" width="110" height="138" rx="10" fill="#f8fafc" stroke="#334155"/><g transform="translate(63,60) scale(1.4)"><circle r="12" fill="#fde68a" stroke="#334155" stroke-width="1.5"/><path d="M16 0h6M-16 0h-6M0 -16v-6M0 16v6M11 -11l4 -4M-11 -11l-4 -4M11 11l4 4M-11 11l-4 4" stroke="#d97706" stroke-width="2" stroke-linecap="round"/></g><g transform="translate(181,64) scale(1.4)"><path d="M-16 6a8 8 0 0 1 2 -14a10 10 0 0 1 18 -2a8 8 0 0 1 12 8a6 6 0 0 1 -2 8z" fill="#e2e8f0" stroke="#334155" stroke-width="1.5"/></g><g transform="translate(299,56) scale(1.4)"><path d="M-16 6a8 8 0 0 1 2 -14a10 10 0 0 1 18 -2a8 8 0 0 1 12 8a6 6 0 0 1 -2 8z" fill="#e2e8f0" stroke="#334155" stroke-width="1.5"/><path d="M-8 10l-3 7M0 10l-3 7M8 10l-3 7" stroke="#0369a1" stroke-width="2" stroke-linecap="round"/></g><g transform="translate(417,56) scale(1.4)"><path d="M-16 6a8 8 0 0 1 2 -14a10 10 0 0 1 18 -2a8 8 0 0 1 12 8a6 6 0 0 1 -2 8z" fill="#e2e8f0" stroke="#334155" stroke-width="1.5"/><path d="M-7 11v8M-10.5 13l7 4M-10.5 17l7 -4M7 11v8M3.5 13l7 4M3.5 17l7 -4" stroke="#0369a1" stroke-width="1.5" stroke-linecap="round"/></g><g transform="translate(63,208) scale(1.4)"><path d="M-18 -6h22a5 5 0 1 0 -5 -5M-18 2h30a5 5 0 1 1 -5 5M-18 10h16" fill="none" stroke="#334155" stroke-width="2" stroke-linecap="round"/></g><g transform="translate(181,200) scale(1.4)"><path d="M-16 6a8 8 0 0 1 2 -14a10 10 0 0 1 18 -2a8 8 0 0 1 12 8a6 6 0 0 1 -2 8z" fill="#e2e8f0" stroke="#334155" stroke-width="1.5"/><path d="M2 6l-6 9h5l-3 9 9 -12h-5l3 -6z" fill="#fde68a" stroke="#334155" stroke-width="1"/></g><g transform="translate(299,206) scale(1.4)"><path d="M-18 -8h36M-14 0h32M-18 8h36" stroke="#64748b" stroke-width="3" stroke-linecap="round"/></g><g transform="translate(417,204) scale(1.4)"><rect x="-4" y="-22" width="8" height="30" rx="4" fill="#ffffff" stroke="#334155" stroke-width="1.5"/><rect x="-2" y="-17" width="4" height="25" fill="#f87171"/><circle cy="12" r="7" fill="#f87171" stroke="#334155" stroke-width="1.5"/></g><g font-family="sans-serif" text-anchor="middle"><text x="63" y="113" font-size="13" fill="#1f2937">hace sol</text><text x="181" y="113" font-size="13" fill="#1f2937">está nublado</text><text x="299" y="113" font-size="13" fill="#1f2937">llueve</text><text x="417" y="113" font-size="13" fill="#1f2937">nieva</text><text x="63" y="259" font-size="13" fill="#1f2937">hace viento</text><text x="181" y="259" font-size="13" fill="#1f2937">hay tormenta</text><text x="299" y="259" font-size="13" fill="#1f2937">hay niebla</text><text x="417" y="259" font-size="13" fill="#1f2937">hace calor</text><text x="63" y="133" font-size="11" fill="#475569">(hacer)</text><text x="181" y="133" font-size="11" fill="#475569">(estar)</text><text x="299" y="133" font-size="11" fill="#475569">(llover)</text><text x="417" y="133" font-size="11" fill="#475569">(nevar)</text><text x="63" y="279" font-size="11" fill="#475569">(hacer)</text><text x="181" y="279" font-size="11" fill="#475569">(haber)</text><text x="299" y="279" font-size="11" fill="#475569">(haber)</text><text x="417" y="279" font-size="11" fill="#475569">(hacer)</text></g></svg>`,
      diagramCaption:
        "Eight weather symbols with their Spanish expression. The verb in brackets tells you the family: *hacer* (feel it), *estar* (how the sky looks), *haber* (something is there) or a weather verb of its own.",
      workedExamples: [
        {
          title: "Pick the right family",
          problem: "Say 'It's very cold and foggy' in Spanish.",
          steps: [
            "'Cold' is weather you feel → *hace frío*.",
            "'Very' cold: *frío* is a noun ('cold'), so use *mucho*, not *muy* → *hace mucho frío*.",
            "'Foggy': fog is something that is there → *hay niebla*.",
            "Join the two with *y*.",
          ],
          answer: "*Hace mucho frío y hay niebla.*",
          yourTurn: {
            question: "Your turn: write 'It's very hot' in Spanish.",
            answer: { type: "text", accept: ["hace mucho calor"] },
            solution: "*Calor* is a noun ('heat'), so 'very' becomes *mucho*: **Hace mucho calor.** (Not *hace muy calor*.)",
          },
        },
        {
          title: "Describe the sky",
          problem: "Say 'It's cloudy but it isn't raining' in Spanish.",
          steps: [
            "'Cloudy' describes how the sky looks → *está nublado*.",
            "'It isn't raining' → *no* goes before the verb: *no llueve*.",
            "Join with *pero* (but).",
          ],
          answer: "*Está nublado, pero no llueve.*",
          yourTurn: {
            question: "Your turn: write 'It's snowing and it's windy' in Spanish.",
            answer: {
              type: "text",
              accept: ["nieva y hace viento", "hace viento y nieva", "está nevando y hace viento", "hace viento y está nevando"],
            },
            solution: "*Nevar* is e→ie, so 'it snows' = *nieva*; 'windy' = *hace viento*: **Nieva y hace viento.**",
          },
        },
      ],
      keyPoints: [
        "Four families: *hace* + noun, a weather verb (*llueve, nieva*), *está* + adjective, *hay* + noun.",
        "'Very hot' = *hace **mucho** calor* — *calor* is a noun, so never *muy calor*.",
        "After *hay*, *mucho* agrees: *mucha niebla, muchas nubes*.",
        "Weather verbs only use the *él / ella* form: *llueve, nieva, truena*.",
        "*Hace calor* (the weather) is not the same as *tengo calor* (I feel hot).",
      ],
      whyItWorks:
        "English uses a dummy 'it' — *it* is raining — but nothing is actually doing the raining. Spanish simply leaves the dummy out and uses the third-person verb: *llueve*. With *hace*, Spanish pictures the weather as 'making' a condition: *hace calor* = '(it) makes heat'. Because *calor, frío, sol* and *viento* are **nouns**, you measure them with *mucho* ('a lot of'), exactly like *mucho dinero*. *Nublado* is different: it's an **adjective** describing the sky right now, so it pairs with *estar* (the verb for states) and with *muy*.",
      strategies: ["Look for the pattern", "Agreement check", "Gender detective (el/la)", "Say it aloud"],
      thinkDeeper:
        "*Hace buen tiempo* becomes *hace **muy** buen tiempo*, but *hace calor* becomes *hace **mucho** calor*. What is different about *buen tiempo*? Use the words 'noun' and 'adjective' in your answer, then decide: is it *hace muy mal tiempo* or *hace mucho mal tiempo*?",
    },
    // ------------------------------------------------------------------ 2
    {
      id: "seasons-and-months",
      heading: "Seasons, months and climate",
      discovery: {
        problem:
          "Read these three sentences:\n\n    En Madrid, en enero hace frío.\n    En Buenos Aires, en enero hace calor.\n    En Singapur, en enero hace calor y llueve mucho.\n\n1. Look at *enero*. What do you notice about the way Spanish writes the months?\n2. Madrid and Buenos Aires are both big Spanish-speaking capitals. Why is January cold in one and hot in the other?",
        idea:
          "1. Months (and seasons, and days of the week) are written with a **small letter** in Spanish: *enero*, not *Enero*.\n2. Buenos Aires is in the **southern hemisphere**, so its seasons are the opposite of Spain's: January is summer there. Singapore is almost on the equator, so it doesn't have four seasons at all — it is hot all year, with wetter monsoon months.",
      },
      body:
        "**Las estaciones** (the seasons)\n\n| Spanish | English |\n|---|---|\n| la primavera | spring |\n| el verano | summer |\n| el otoño | autumn |\n| el invierno | winter |\n\n'In summer' = *en verano* (you can also say *en el verano*):\n\n    En verano hace calor.\n    En invierno hace frío.\n\n**Los meses** (the months) — always lowercase:\n\n| | | |\n|---|---|---|\n| enero | febrero | marzo |\n| abril | mayo | junio |\n| julio | agosto | septiembre |\n| octubre | noviembre | diciembre |\n\n- 'In March' = *en marzo*; 'in July and August' = *en julio y agosto*.\n- You may see *setiembre* in some countries, but *septiembre* is the usual spelling.\n- Many are cognates: *marzo* (March), *abril* (April), *octubre* (October), *diciembre* (December).\n\n**Talking about climate**\n\n- *el clima* = the climate (the usual weather of a place); *el tiempo* = the weather at the moment.\n- Frame: **En + season / month + weather** — or put the weather first: *Nieva en los Pirineos en invierno.*\n- Frequency words make it sound like climate, not today: *siempre* (always), *normalmente* (normally), *a veces* (sometimes), *casi nunca* (hardly ever), *nunca* (never).\n\n| Spain | Singapore |\n|---|---|\n| En el norte llueve mucho. | En Singapur siempre hace calor. |\n| En Madrid hace frío en invierno y mucho calor en verano. | Llueve mucho, sobre todo en diciembre. |\n| En Sevilla casi nunca nieva. | No hay cuatro estaciones como en España, pero hay dos monzones. |\n\n> *El tiempo* has two meanings: 'the weather' (*¿Qué tiempo hace?*) and 'time' (*No tengo tiempo* — I don't have time). Context tells you which.",
      workedExamples: [
        {
          title: "Season + weather",
          problem: "Say 'In winter it is cold and it snows' in Spanish.",
          steps: [
            "'In winter' → *en invierno* (small letter, *en* + season).",
            "'It is cold' → *hace frío*.",
            "'It snows' → *nevar* (e→ie) → *nieva*.",
            "Join with *y*.",
          ],
          answer: "*En invierno hace frío y nieva.*",
          yourTurn: {
            question: "Your turn: write 'In summer it is hot' in Spanish.",
            answer: {
              type: "text",
              accept: ["en verano hace calor", "hace calor en verano", "en el verano hace calor", "hace calor en el verano"],
            },
            solution: "*En verano* + *hace calor*: **En verano hace calor.** (*En el verano hace calor* is also correct.)",
          },
        },
        {
          title: "Compare two climates",
          problem: "Say 'In Singapore it is always hot, but in Madrid it is cold in January' in Spanish.",
          steps: [
            "'Always hot' → *siempre hace calor* (*siempre* goes before the verb).",
            "'But' → *pero*.",
            "'In January' → *en enero* — no capital letter.",
          ],
          answer: "*En Singapur siempre hace calor, pero en Madrid hace frío en enero.*",
          yourTurn: {
            question: "Your turn: write 'In Singapore it rains a lot' in Spanish.",
            answer: {
              type: "text",
              accept: ["en Singapur llueve mucho", "llueve mucho en Singapur"],
            },
            solution: "*Llover* → *llueve*; 'a lot' after a verb = *mucho*: **En Singapur llueve mucho.**",
          },
        },
      ],
      keyPoints: [
        "*la primavera, el verano, el otoño, el invierno* — learn them with their articles.",
        "Months, seasons and days are lowercase: *enero, el verano, el lunes*.",
        "'In summer / in May' = *en verano / en mayo*.",
        "*el clima* = usual weather; *el tiempo* = weather now (and also 'time').",
        "South of the equator the seasons are reversed: *en diciembre hace calor en Argentina*.",
      ],
      whyItWorks:
        "Spanish treats months and seasons as ordinary nouns, like *la lluvia* or *el colegio*. Only proper names — people, places, organisations — get a capital letter, which is why *Madrid* has one but *enero* doesn't. The seasons flip south of the equator because the Earth is tilted: in June the northern half leans towards the sun (summer in Spain) while the southern half leans away (winter in Argentina). Singapore sits almost on the equator, so the sun is high all year — the temperature barely changes, and the monsoon winds decide whether it's a wetter or drier month.",
      strategies: ["Spot the cognate", "Gender detective (el/la)", "Use context", "Recycle a chunk"],
      thinkDeeper:
        "If a Spanish exchange partner asked you *¿Cuál es tu estación favorita?*, what would be a fair answer for someone who lives in Singapore? Write two Spanish sentences comparing Singapore's climate with a city in Spain or Latin America, using *siempre*, *nunca* or *a veces*, and *pero*.",
    },
    // ------------------------------------------------------------------ 3
    {
      id: "weather-map",
      heading: "The weather map: en el norte…",
      discovery: {
        problem:
          "Look at the weather map. Before reading any rules, try to work out:\n\n1. What do *norte*, *sur*, *este* and *centro* mean? (Spot the cognates.)\n2. The fourth direction is *oeste*. Which direction is it — and which letter does a Spanish compass show instead of W?\n3. In which city is it sunny with the highest temperature, and which part of Spain is it in?",
        idea:
          "*Norte* = north, *sur* = south, *este* = east, *centro* = centre and *oeste* = **west** — so a Spanish compass shows **O**, not W. You combine them just like in English: *noreste* (north-east), *noroeste* (north-west), *sureste* (south-east), *suroeste* (south-west).\n\nThe hottest city is Sevilla, in the south: *En el sur hace sol y la temperatura máxima es de treinta y tres grados.*",
      },
      body:
        "**Where? En el + direction (+ de España)**\n\n| Spanish | English |\n|---|---|\n| en el norte | in the north |\n| en el sur | in the south |\n| en el este | in the east |\n| en el oeste | in the west |\n| en el centro | in the centre |\n| en el noreste / en el noroeste | in the north-east / north-west |\n| en el sureste / en el suroeste | in the south-east / south-west |\n\nAll the directions are masculine (*el norte*), so 'in the north of Spain' = *en el norte de España*.\n\n**Cities and where they are** — location uses *estar*:\n\n- *Bilbao está en el norte de España.*\n- *Barcelona está en el noreste.*\n- *Madrid está en el centro.*\n- *Valencia está en el este.*\n- *Sevilla está en el sur.*\n\n**Temperatures**\n\n- *la temperatura* = temperature; *el grado / los grados* = degree(s).\n- *la temperatura máxima* = the highest temperature; *la temperatura mínima* = the lowest.\n- Two ways to give it: *La temperatura máxima es de treinta grados.* / *Hace treinta grados.*\n- *un grado, dos grados, cero grados*; below zero: *dos grados bajo cero* or *menos dos grados*.\n- 21 shortens before a masculine noun: *veintiún grados*.\n\n| number | Spanish |\n|---|---|\n| 16 | dieciséis |\n| 20 | veinte |\n| 21 | veintiuno → veintiún grados |\n| 22 | veintidós |\n| 24 | veinticuatro |\n| 26 | veintiséis |\n| 30 | treinta |\n| 33 | treinta y tres |\n| 40 | cuarenta |\n\n**Reading a forecast** (*el pronóstico del tiempo*)\n\n> En el norte llueve y la temperatura máxima es de dieciséis grados. En el centro hace sol. En el sur hace mucho calor: treinta y tres grados en Sevilla.\n\nA forecast follows a simple frame: **En el + region + weather + temperature**. Swap any one part and you have a new sentence.",
      diagram: `<svg viewBox="0 0 480 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Simplified weather map of Spain: rain and 16 °C in Bilbao in the north, cloud and 20 °C in Barcelona in the north-east, sun and 24 °C in Madrid in the centre, wind and 22 °C in Valencia in the east, sun and 33 °C in Sevilla in the south"><rect width="480" height="320" fill="#ffffff"/><polygon points="78,18 110,22 143,27 175,26 202,29 230,37 261,34 268,38 290,46 324,57 350,62 372,64 400,64 426,66 430,70 420,82 405,95 393,104 364,114 351,129 340,140 322,155 312,173 322,190 331,200 318,206 309,213 304,226 302,239 285,255 265,268 254,272 230,270 210,272 183,272 165,282 145,298 130,288 123,279 110,268 95,262 87,255 84,226 100,197 90,168 103,147 106,118 126,96 110,85 62,82 40,87 39,71 30,60 26,50 40,40 55,33 65,24" fill="#bbf7d0" stroke="#334155" stroke-width="1.5" stroke-linejoin="round"/><ellipse cx="425" cy="168" rx="15" ry="9" fill="#bbf7d0" stroke="#334155" stroke-width="1.2"/><ellipse cx="456" cy="156" rx="8" ry="4" fill="#bbf7d0" stroke="#334155" stroke-width="1.2"/><ellipse cx="373" cy="192" rx="7" ry="5" fill="#bbf7d0" stroke="#334155" stroke-width="1.2"/><g font-family="sans-serif" font-size="11" font-style="italic" fill="#0369a1" text-anchor="middle"><text x="165" y="14">Mar Cantábrico</text><text x="400" y="262">Mar Mediterráneo</text><text x="58" y="306">Océano Atlántico</text></g><g font-family="sans-serif" font-size="11" fill="#64748b" text-anchor="middle"><text x="350" y="36">FRANCIA</text><text x="55" y="190">PORTUGAL</text></g><path d="M450 24v34M432 41h36" stroke="#334155" stroke-width="1.5"/><path d="M450 20l-4 8h8z" fill="#334155"/><g font-family="sans-serif" font-size="11" font-weight="bold" fill="#1f2937" text-anchor="middle"><text x="450" y="16">N</text><text x="450" y="70">S</text><text x="474" y="45">E</text><text x="425" y="45">O</text></g><g transform="translate(212,76)"><path d="M-16 6a8 8 0 0 1 2 -14a10 10 0 0 1 18 -2a8 8 0 0 1 12 8a6 6 0 0 1 -2 8z" fill="#e2e8f0" stroke="#334155" stroke-width="1.5"/><path d="M-8 10l-3 7M0 10l-3 7M8 10l-3 7" stroke="#0369a1" stroke-width="2" stroke-linecap="round"/></g><g transform="translate(352,90)"><path d="M-16 6a8 8 0 0 1 2 -14a10 10 0 0 1 18 -2a8 8 0 0 1 12 8a6 6 0 0 1 -2 8z" fill="#e2e8f0" stroke="#334155" stroke-width="1.5"/></g><g transform="translate(182,170)"><circle r="12" fill="#fde68a" stroke="#334155" stroke-width="1.5"/><path d="M16 0h6M-16 0h-6M0 -16v-6M0 16v6M11 -11l4 -4M-11 -11l-4 -4M11 11l4 4M-11 11l-4 4" stroke="#d97706" stroke-width="2" stroke-linecap="round"/></g><g transform="translate(342,180)"><path d="M-18 -6h22a5 5 0 1 0 -5 -5M-18 2h30a5 5 0 1 1 -5 5M-18 10h16" fill="none" stroke="#334155" stroke-width="2" stroke-linecap="round"/></g><g transform="translate(152,216)"><circle r="12" fill="#fde68a" stroke="#334155" stroke-width="1.5"/><path d="M16 0h6M-16 0h-6M0 -16v-6M0 16v6M11 -11l4 -4M-11 -11l-4 -4M11 11l4 4M-11 11l-4 4" stroke="#d97706" stroke-width="2" stroke-linecap="round"/></g><g fill="#1f2937"><circle cx="230" cy="44" r="4"/><circle cx="390" cy="104" r="4"/><circle cx="206" cy="139" r="4"/><circle cx="307" cy="173" r="4"/><circle cx="133" cy="248" r="4"/></g><g font-family="sans-serif" font-size="12" fill="#1f2937"><text x="240" y="62" font-weight="bold">Bilbao</text><text x="240" y="76">16 °C</text><text x="398" y="104" font-weight="bold">Barcelona</text><text x="398" y="118">20 °C</text><text x="214" y="143" font-weight="bold">Madrid</text><text x="214" y="157">24 °C</text><text x="299" y="177" font-weight="bold" text-anchor="end">Valencia</text><text x="299" y="191" text-anchor="end">22 °C</text><text x="141" y="254" font-weight="bold">Sevilla</text><text x="141" y="268">33 °C</text></g></svg>`,
      diagramCaption:
        "*El pronóstico del tiempo*: rain in the north (Bilbao), cloud in the north-east (Barcelona), sun in the centre (Madrid), wind on the east coast (Valencia) and sun and heat in the south (Sevilla). On a Spanish compass, W is **O** for *oeste*.",
      workedExamples: [
        {
          title: "Read the map",
          problem: "Using the map, describe the weather in Bilbao in one Spanish sentence. Include where it is and the temperature.",
          steps: [
            "Find Bilbao: it's on the top coast → *en el norte*.",
            "Symbol: a cloud with rain → *llueve*.",
            "Temperature: 16 → *dieciséis grados* (accent on the é).",
            "Build it: region + weather + temperature.",
          ],
          answer: "*En el norte, en Bilbao, llueve y hace dieciséis grados.*",
          yourTurn: {
            question: "Your turn: using the map, write in Spanish 'In the south it is sunny.'",
            answer: {
              type: "text",
              accept: ["en el sur hace sol", "hace sol en el sur", "en el sur de España hace sol", "hace sol en el sur de España"],
            },
            solution: "South → *en el sur*; the sun symbol → *hace sol*: **En el sur hace sol.**",
          },
        },
        {
          title: "Write the forecast for the east",
          problem: "Write a forecast sentence for Valencia using the map, with the maximum temperature.",
          steps: [
            "Valencia is on the east coast → *en el este*.",
            "The curly lines mean wind → *hace viento*.",
            "22 → *veintidós* (with an accent).",
            "Frame: *la temperatura máxima es de* + number + *grados*.",
          ],
          answer: "*En el este hace viento y la temperatura máxima es de veintidós grados.*",
          yourTurn: {
            question: "Your turn: how do you write 'twenty-one degrees' in Spanish? (Careful with the number.)",
            answer: { type: "text", accept: ["veintiún grados"] },
            solution: "*Veintiuno* drops its final *-o* before a masculine noun and takes an accent: **veintiún grados**.",
          },
        },
      ],
      keyPoints: [
        "*norte, sur, este, oeste, centro* — and W is **O** (*oeste*) on a Spanish compass.",
        "*en el norte de España* — the directions are masculine.",
        "Location uses *estar*: *Sevilla está en el sur* (not *es en el sur*).",
        "*La temperatura máxima es de 30 grados* or *Hace 30 grados*.",
        "Watch the accents: *dieciséis, veintidós, veintitrés, veintiséis, veintiún grados*.",
      ],
      whyItWorks:
        "Spanish borrowed *norte, sur, este* and *oeste* from French, which had taken them from Old English — that's why they look so like the English words. The in-between directions are simply glued together, with *norte* shortened to *nor-* so they're easy to say: *nor + este = noreste*. And cities take *estar* because *estar* is the verb for *where* something is (position) and how it is (state), while *ser* is for *what* something is.",
      strategies: ["Spot the cognate", "Use context", "Build it up (extended sentence)", "Mind the accent"],
      thinkDeeper:
        "A forecaster says: *En el noroeste llueve mucho, pero en el sureste hace sol y mucho calor.* Which two corners of Spain are being contrasted, and which city on the map is closest to the *sureste*? Then write a two-sentence forecast for Singapore that a Spanish tourist would understand — include a temperature.",
    },
    // ------------------------------------------------------------------ 4
    {
      id: "weather-and-activities",
      heading: "Cuando hace sol… Weather & activities",
      discovery: {
        problem:
          "Compare these four sentences:\n\n    Cuando llueve, veo la tele.\n    Cuando hace sol, voy a la playa.\n    Si hace buen tiempo mañana, voy a jugar al tenis.\n    Mañana va a llover.\n\n1. Which tense follows *cuando* in the first two sentences? Do they describe a habit or a one-off plan?\n2. In the last sentence, which form of *llover* comes after *va a*?",
        idea:
          "1. *Cuando* ('when / whenever') + **present tense**, followed by another present verb, describes a **habit** — what you usually do in that weather.\n2. After *va a* you always use the **infinitive**: *va a llover, va a nevar, va a hacer sol*. And *si* ('if') + present weather, then *voy a* + infinitive, makes a **plan** that depends on the weather.",
      },
      body:
        "**Habits: cuando + weather, + activity** (both verbs in the present)\n\n- *Cuando hace sol, voy a la playa.*\n- *Cuando llueve, veo la tele en casa.*\n- *Cuando hace calor, nado en la piscina del condominio.*\n- *Cuando llueve mucho en Singapur, voy al centro comercial.*\n\nThe *cuando* part can come second — then you don't need the comma: *Voy a la playa cuando hace sol.*\n\n**Plans: si + weather (present), + voy a + infinitive**\n\n- *Si hace buen tiempo, voy a montar en bici.*\n- *Si llueve, voy a quedarme en casa.* (or *me voy a quedar en casa*)\n- *Si hace sol el sábado, vamos a ir al parque.*\n\n**Forecasts: va a + infinitive** (the immediate future)\n\n| present | immediate future | English |\n|---|---|---|\n| hace sol | va a hacer sol | it's going to be sunny |\n| hace calor | va a hacer calor | it's going to be hot |\n| llueve | va a llover | it's going to rain |\n| nieva | va a nevar | it's going to snow |\n| está nublado | va a estar nublado | it's going to be cloudy |\n| hay tormenta | va a haber tormenta | there's going to be a storm |\n\n- The weather verb goes back to its **infinitive**: *hacer, llover, nevar, estar, haber*.\n- It is always **va** (third person singular) — never *van a llover*.\n\nActivities to recycle: *ir a la playa, ir al centro comercial, montar en bici, jugar al fútbol, nadar, dar un paseo, ver una película, leer un libro, hacer los deberes, quedarse en casa*.\n\n> Build it up: *Mañana va a llover. Si llueve, voy a ver una película en casa, pero si hace sol, voy a ir a la playa con mis amigos.*",
      workedExamples: [
        {
          title: "A weather habit",
          problem: "Say 'When it's hot, I swim in the pool' in Spanish.",
          steps: [
            "'When it's hot' → *cuando hace calor* (present tense).",
            "'I swim' → *nadar* → *yo* form *nado* (present: it's a habit).",
            "'In the pool' → *en la piscina*.",
            "Comma after the *cuando* part when it comes first.",
          ],
          answer: "*Cuando hace calor, nado en la piscina.*",
          yourTurn: {
            question: "Your turn: write 'When it's cold, I play video games' in Spanish.",
            answer: {
              type: "text",
              accept: [
                "cuando hace frío juego a los videojuegos",
                "cuando hace frío yo juego a los videojuegos",
                "juego a los videojuegos cuando hace frío",
                "yo juego a los videojuegos cuando hace frío",
              ],
            },
            solution: "*Cuando hace frío* + *juego* (jugar, u→ue) + *a los videojuegos*: **Cuando hace frío, juego a los videojuegos.**",
          },
        },
        {
          title: "Forecast + plan",
          problem: "Say 'Tomorrow it's going to rain. If it rains, I'm going to read a book.' in Spanish.",
          steps: [
            "'It's going to rain' → *va a* + infinitive → *va a llover*.",
            "'If it rains' → *si* + present → *si llueve*.",
            "'I'm going to read' → *voy a leer*; 'a book' → *un libro*.",
          ],
          answer: "*Mañana va a llover. Si llueve, voy a leer un libro.*",
          yourTurn: {
            question: "Your turn: using *va a* + infinitive, write 'Tomorrow it's going to be sunny' in Spanish.",
            answer: { type: "text", accept: ["mañana va a hacer sol", "va a hacer sol mañana"] },
            solution: "'Sunny' is *hace sol*, so the infinitive is *hacer*: **Mañana va a hacer sol.**",
          },
        },
      ],
      keyPoints: [
        "Habit: *cuando* + present weather, + present activity: *Cuando llueve, veo la tele.*",
        "Plan: *si* + present weather, + *voy a* + infinitive: *Si hace sol, voy a ir a la playa.*",
        "Forecast: *va a* + infinitive: *va a llover, va a hacer calor, va a haber tormenta*.",
        "Always *va* for weather — never *van a llover*.",
        "*Si* (if) has no accent; *sí* (yes) does.",
      ],
      whyItWorks:
        "*Cuando* + present describes a repeating pattern — 'whenever X happens, I do Y' — so both verbs stay in the present, exactly as in English: 'When it rains, I watch TV.' In *va a llover*, the verb doing the grammar work is *ir*: it carries the person and the tense, so the weather verb can relax into its infinitive. And since weather has no real subject, *ir* is always in the 'it' form: *va*.",
      strategies: ["Use the time phrase", "Find the infinitive", "Recycle a chunk", "Build it up (extended sentence)"],
      thinkDeeper:
        "What's the difference in meaning between *Cuando llueve, voy al centro comercial* and *Si llueve, voy a ir al centro comercial*? Write one sentence of each type about your own week in Singapore.",
    },
    // ------------------------------------------------------------------ 5
    {
      id: "past-weather",
      heading: "Yesterday's weather: hizo, llovió",
      discovery: {
        problem:
          "Each pair shows today and yesterday:\n\n    Hoy hace sol. → Ayer hizo sol.\n    Hoy llueve. → Ayer llovió.\n    Hoy está nublado. → Ayer estuvo nublado.\n    Hoy hay tormenta. → Ayer hubo tormenta.\n\n1. Which verb (infinitive) does each past form come from?\n2. Two of the past forms have an accent and three don't. Can you guess how *nieva* changes for 'it snowed'?",
        idea:
          "Each present weather family has **one** past (preterite) form: *hace → hizo* (hacer), *llueve → llovió* (llover), *está → estuvo* (estar), *hay → hubo* (haber). For snow, *nieva → nevó*.\n\nThe regular verbs *llover* and *nevar* end in a stressed **-ó / -ió**, so they need an accent. *Hizo, estuvo* and *hubo* are irregular, with the stress on the stem — no accent.",
      },
      body:
        "**One past form per family** (preterite, third person singular)\n\n| present | preterite | English |\n|---|---|---|\n| hace calor / frío / sol / viento | hizo calor / frío / sol / viento | it was hot / cold / sunny / windy |\n| hace buen / mal tiempo | hizo buen / mal tiempo | the weather was good / bad |\n| llueve | llovió | it rained |\n| nieva | nevó | it snowed |\n| truena | tronó | it thundered |\n| está nublado | estuvo nublado | it was cloudy |\n| hay tormenta / niebla | hubo tormenta / niebla | there was a storm / fog |\n\n- **Accents:** *llovió, nevó, tronó* need an accent. *Hizo, estuvo, hubo* have **none**.\n- The stem changes disappear in the past: *llueve → llovió*, *nieva → nevó*.\n- *Mucho* still works the same way: *Ayer hizo mucho calor. El domingo llovió mucho.*\n\n**Time phrases that signal the past**\n\n- *ayer* (yesterday), *anoche* (last night), *anteayer* (the day before yesterday)\n- *el fin de semana pasado* (last weekend), *la semana pasada* (last week), *el verano pasado* (last summer)\n\n**Three time frames together**\n\n| past | present | future |\n|---|---|---|\n| Ayer hizo frío. | Hoy hace sol. | Mañana va a hacer calor. |\n| Ayer llovió. | Hoy está nublado. | Mañana va a nevar. |\n| El sábado pasado hubo tormenta. | Normalmente hace buen tiempo. | El fin de semana que viene va a llover. |\n\nThe time phrase is your signpost: *ayer* → preterite, *hoy / normalmente* → present, *mañana* → *va a* + infinitive.\n\n> Model: *El fin de semana pasado fui a Barcelona con mi familia. El sábado hizo sol y fuimos a la playa, pero el domingo llovió mucho. Hoy, en Singapur, hace calor y mañana va a haber tormenta.*",
      diagram: `<svg viewBox="0 0 480 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Timeline: ayer llovió (past, preterite), hoy hace sol (present), mañana va a nevar (immediate future)"><rect width="480" height="220" fill="#ffffff"/><rect x="20" y="12" width="130" height="120" rx="10" fill="#bae6fd" stroke="#334155"/><rect x="175" y="12" width="130" height="120" rx="10" fill="#fef3c7" stroke="#334155"/><rect x="330" y="12" width="130" height="120" rx="10" fill="#c7d2fe" stroke="#334155"/><g font-family="sans-serif" font-size="14" font-weight="bold" fill="#1f2937" text-anchor="middle"><text x="85" y="34">ayer</text><text x="240" y="34">hoy</text><text x="395" y="34">mañana</text></g><g transform="translate(85,74) scale(1.3)"><path d="M-16 6a8 8 0 0 1 2 -14a10 10 0 0 1 18 -2a8 8 0 0 1 12 8a6 6 0 0 1 -2 8z" fill="#e2e8f0" stroke="#334155" stroke-width="1.5"/><path d="M-8 10l-3 7M0 10l-3 7M8 10l-3 7" stroke="#0369a1" stroke-width="2" stroke-linecap="round"/></g><g transform="translate(240,74) scale(1.1)"><circle r="12" fill="#fde68a" stroke="#334155" stroke-width="1.5"/><path d="M16 0h6M-16 0h-6M0 -16v-6M0 16v6M11 -11l4 -4M-11 -11l-4 -4M11 11l4 4M-11 11l-4 4" stroke="#d97706" stroke-width="2" stroke-linecap="round"/></g><g transform="translate(395,74) scale(1.3)"><path d="M-16 6a8 8 0 0 1 2 -14a10 10 0 0 1 18 -2a8 8 0 0 1 12 8a6 6 0 0 1 -2 8z" fill="#e2e8f0" stroke="#334155" stroke-width="1.5"/><path d="M-7 11v8M-10.5 13l7 4M-10.5 17l7 -4M7 11v8M3.5 13l7 4M3.5 17l7 -4" stroke="#0369a1" stroke-width="1.5" stroke-linecap="round"/></g><g font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle"><text x="85" y="122">llovió</text><text x="240" y="122">hace sol</text><text x="395" y="122">va a nevar</text></g><path d="M20 152H450" stroke="#334155" stroke-width="2"/><path d="M462 152l-12 -6v12z" fill="#334155"/><path d="M85 146v12M240 146v12M395 146v12" stroke="#334155" stroke-width="2"/><g font-family="sans-serif" font-size="12" font-weight="bold" fill="#1f2937" text-anchor="middle"><text x="85" y="176">pretérito</text><text x="240" y="176">presente</text><text x="395" y="176">futuro inmediato</text></g><g font-family="sans-serif" font-size="11" fill="#475569" text-anchor="middle"><text x="85" y="196">hizo · llovió · nevó</text><text x="240" y="196">hace · llueve · nieva</text><text x="395" y="196">va a hacer · va a llover</text></g></svg>`,
      diagramCaption:
        "One day in the mountains: *Ayer llovió, hoy hace sol y mañana va a nevar.* The time phrase tells you which column — and which verb form — you need.",
      workedExamples: [
        {
          title: "Present to past",
          problem: "Change this into the past (yesterday): *Hoy hace viento y está nublado.*",
          steps: [
            "Swap the time phrase: *hoy* → *ayer*.",
            "*hace* → *hizo* (irregular, no accent).",
            "*está* → *estuvo* (irregular, no accent).",
          ],
          answer: "*Ayer hizo viento y estuvo nublado.*",
          yourTurn: {
            question: "Your turn: write 'Yesterday it was cold' in Spanish.",
            answer: { type: "text", accept: ["ayer hizo frío", "hizo frío ayer"] },
            solution: "*Hace frío* in the past is *hizo frío*: **Ayer hizo frío.**",
          },
        },
        {
          title: "Past and present together",
          problem: "Say 'Last weekend it rained a lot, but today it's sunny' in Spanish.",
          steps: [
            "'Last weekend' → *el fin de semana pasado* → preterite.",
            "'It rained a lot' → *llovió mucho* (accent on the ó).",
            "'Today it's sunny' → *hoy* → present → *hace sol*.",
            "Join with *pero*.",
          ],
          answer: "*El fin de semana pasado llovió mucho, pero hoy hace sol.*",
          yourTurn: {
            question: "Your turn: write 'It snowed' in Spanish (one word).",
            answer: { type: "text", accept: ["nevó"] },
            solution: "*Nevar* is regular in the preterite: *nev-* + *-ó* → **nevó** — and it needs the accent.",
          },
        },
      ],
      keyPoints: [
        "Past weather: *hizo* (+ calor, frío, sol, viento, buen / mal tiempo), *llovió, nevó, tronó, estuvo nublado, hubo tormenta / niebla*.",
        "*Llovió, nevó, tronó* have an accent; *hizo, estuvo, hubo* don't.",
        "No stem change in the past: *llovió*, not *lluevió*; *nevó*, not *nievó*.",
        "Past signposts: *ayer, anoche, el fin de semana pasado, la semana pasada, el verano pasado*.",
        "Combine three time frames: *Ayer llovió, hoy hace sol y mañana va a hacer calor.*",
      ],
      whyItWorks:
        "Weather has no real 'doer', so Spanish only ever needs the *él / ella* form — one form per verb per tense. *Llover* and *nevar* are regular in the preterite: the ending *-ó / -ió* is stressed, so it carries an accent. *Hacer, estar* and *haber* belong to the irregular group with special stems (*hiz-, estuv-, hub-*) where the stress falls on the stem, so no accent is needed. And the boot-style stem changes (*ue, ie*) only happen when the stem is stressed — in *llovió* the stress has moved to the ending, so the stem stays *llov-*.",
      strategies: ["Use the time phrase", "Mind the accent", "Look for the pattern", "Translate back to check"],
      thinkDeeper:
        "Error hunt: *Ayer hace mucho calor y llovio por la tarde. Mañana van a nevar.* Find the three mistakes, fix them and give the rule behind each. Then add a sentence about today so the paragraph uses all three time frames.",
    },
  ],
  learn: {
    flashcards: [
      { front: "¿Qué tiempo hace?", back: "What's the weather like?" },
      { front: "hace calor", back: "it's hot" },
      { front: "hace frío", back: "it's cold" },
      { front: "hace fresco", back: "it's cool / chilly" },
      { front: "llueve", back: "it rains / it's raining (llover, o→ue)" },
      { front: "nieva", back: "it snows / it's snowing (nevar, e→ie)" },
      { front: "está nublado", back: "it's cloudy" },
      { front: "está despejado", back: "it's clear (no clouds)" },
      { front: "hay niebla", back: "it's foggy" },
      { front: "hay tormenta", back: "there's a storm / it's stormy" },
      { front: "How do you say 'it's very hot'?", back: "Hace mucho calor (not muy calor — calor is a noun)" },
      { front: "el otoño", back: "autumn" },
      { front: "Do Spanish months take a capital letter?", back: "No: enero, febrero, marzo…" },
      { front: "en el noreste", back: "in the north-east" },
      { front: "la temperatura máxima", back: "the highest (maximum) temperature" },
      { front: "Cuando llueve, veo la tele.", back: "When it rains, I watch TV." },
      { front: "Mañana va a llover.", back: "Tomorrow it's going to rain." },
      { front: "Ayer hizo sol.", back: "Yesterday it was sunny." },
      { front: "llovió", back: "it rained" },
      { front: "hubo tormenta", back: "there was a storm" },
      { front: "estuvo nublado", back: "it was cloudy" },
    ],
    mustKnow: [
      "I can ask *¿Qué tiempo hace?* and answer with at least ten weather expressions.",
      "I can choose between *hace*, *está*, *hay* and a weather verb such as *llueve*.",
      "I can say 'very hot' correctly: *hace mucho calor*, not *muy calor*.",
      "I can name the four seasons and the twelve months — without capital letters.",
      "I can compare the climate of Singapore with a place in Spain or Latin America.",
      "I can read a weather map using *en el norte / sur / este / oeste / centro* and temperatures in *grados*.",
      "I can say what I do in different weather with *cuando* + present.",
      "I can make a forecast with *va a* + infinitive (*va a llover*) and a plan with *si*.",
      "I can describe past weather with *hizo, llovió, nevó, estuvo nublado, hubo tormenta*.",
      "I can link past, present and future weather in one short paragraph.",
    ],
    misconceptions: [
      { wrong: "*Hace muy calor.*", right: "*Hace **mucho** calor.* — *calor* is a noun, so it needs *mucho* ('a lot of')." },
      { wrong: "*Es frío hoy.*", right: "*Hoy **hace** frío.* — weather uses *hacer*; *ser* describes what something is like." },
      { wrong: "*Estoy calor.*", right: "*Tengo calor.* — for how *you* feel, use *tener*; *hace calor* is the weather." },
      { wrong: "*Hace nublado.*", right: "*Está nublado.* — *nublado* is an adjective, so it goes with *estar*." },
      { wrong: "*En Enero hace frío.*", right: "*En enero hace frío.* — months are lowercase in Spanish." },
      { wrong: "*Mañana van a llover.*", right: "*Mañana **va** a llover.* — weather is always third person singular." },
      { wrong: "*Ayer hace sol.*", right: "*Ayer **hizo** sol.* — *ayer* needs the preterite." },
      { wrong: "*Madrid es en el centro.*", right: "*Madrid **está** en el centro.* — location uses *estar*." },
    ],
    examMistakes: [
      "Writing *llovio* or *nevo* without the accent — the preterite forms are *llovió* and *nevó*.",
      "Putting an accent on *hizo* (*hizó*) — the irregular preterites *hizo, estuvo, hubo* have none.",
      "Forgetting the stem change in the present: *llove* or *neva* instead of *llueve* and *nieva*.",
      "Using *muy* with *calor, frío* or *viento* instead of *mucho*.",
      "Conjugating the weather verb after *va a* (*va a llueve*) instead of using the infinitive (*va a llover*).",
      "Writing *veintiuno grados* instead of *veintiún grados*, or dropping the accents on *dieciséis, veintidós, veintitrés, veintiséis*.",
      "Ignoring the time phrase: *ayer* → preterite, *hoy* → present, *mañana* → *va a* + infinitive.",
      "Translating 'west' with a W — in Spanish it's *el oeste* (O on the compass).",
    ],
    mnemonics: [
      {
        topic: "mucho or muy?",
        device: "Mucho for things, muy for describing words",
        explanation: "*Calor, frío, viento* are things (nouns) → *mucho*. *Nublado* and *buen* are describing words (adjectives) → *muy*.",
      },
      {
        topic: "Which weather verb?",
        device: "Feel it, see it, it's there, it falls",
        explanation: "Weather you **feel** → *hace* (calor, frío, viento). How the sky **looks** → *está* (nublado, despejado). Something that **is there** → *hay* (niebla, tormenta). Things that **fall** have their own verb → *llueve, nieva*.",
      },
      {
        topic: "Compass points",
        device: "W is for… O!",
        explanation: "West is *oeste*, so Spanish compasses show **O**. Link it to *occidental* (western). Round the compass: N, E, S, O = *norte, este, sur, oeste*.",
      },
      {
        topic: "Past accents",
        device: "The trio with no hats",
        explanation: "*Hizo, estuvo, hubo* — the irregular trio never wear an accent 'hat'. The regular pair *llovió* and *nevó* always wear one on the ó.",
      },
    ],
    realWorld: [
      {
        title: "El tiempo on Spanish TV",
        detail: "After the news, Spanish TV channels show *el tiempo* with a map like the one in this guide: *En el norte, lluvia; en el sur, sol y calor.* Watch a clip and try to pick out the regions and temperatures.",
        emoji: "📺",
      },
      {
        title: "Summer in Sevilla",
        detail: "Summer afternoons in Sevilla can go above 40 °C, so the streets go quiet in the heat of the day and life moves to the evening. You'd say: *En verano hace muchísimo calor.*",
        emoji: "🌞",
      },
      {
        title: "Christmas in summer",
        detail: "In Argentina, Chile and Uruguay, *la Navidad* falls in summer: *En diciembre hace calor y mucha gente va a la playa.* A great example of the seasons flipping south of the equator.",
        emoji: "🎄",
      },
      {
        title: "Explaining Singapore's weather",
        detail: "A Spanish exchange partner visiting Singapore will want to know what to pack: *En Singapur siempre hace calor. Llueve mucho, y a veces hay tormenta por la tarde.*",
        emoji: "⛈️",
      },
      {
        title: "Skiing in the Sierra Nevada",
        detail: "Near Granada, in the south of Spain, there is a ski resort in the Sierra Nevada mountains: *En invierno nieva en la sierra, pero en la costa hace sol.*",
        emoji: "⛷️",
      },
    ],
    videos: [
      { title: "¿Qué tiempo hace? Weather in Spanish", channel: "Señor Jordan", url: "https://www.youtube.com/results?search_query=senor+jordan+weather+spanish+que+tiempo+hace" },
      { title: "Weather expressions with hace, está and hay", channel: "Spanish with Profe", url: "https://www.youtube.com/results?search_query=spanish+weather+expressions+hace+esta+hay" },
      { title: "Seasons and months in Spanish", channel: "Butterfly Spanish", url: "https://www.youtube.com/results?search_query=butterfly+spanish+seasons+months" },
      { title: "Past weather in Spanish: hizo, llovió", channel: "Language Gym", url: "https://www.youtube.com/results?search_query=spanish+weather+preterite+hizo+llovio" },
      { title: "Weather forecast comprehensible input", channel: "Dreaming Spanish", url: "https://www.youtube.com/results?search_query=dreaming+spanish+el+tiempo+weather" },
    ],
    formulas: [
      { name: "Weather with hacer", formula: "hace + (mucho) + calor / frío / sol / viento / fresco", note: "Hace mucho calor." },
      { name: "The sky and 'there is'", formula: "está + nublado / despejado · hay + tormenta / niebla / nubes", note: "Está nublado y hay niebla." },
      { name: "Weather map", formula: "en el + norte / sur / este / oeste / centro (+ de España) + weather + temperature", note: "En el sur hace sol y hace treinta y tres grados." },
      { name: "Weather habit", formula: "cuando + weather (present), + activity (present)", note: "Cuando llueve, veo la tele." },
      { name: "Weather forecast", formula: "va a + llover / nevar / hacer sol / estar nublado / haber tormenta", note: "Mañana va a llover." },
      { name: "Past weather", formula: "hizo + calor / frío… · llovió · nevó · estuvo nublado · hubo tormenta", note: "Ayer hizo sol, pero anoche llovió." },
    ],
  },
};
