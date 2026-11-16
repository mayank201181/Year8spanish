import type { TopicGuide } from "../../types.ts";

export const guide: TopicGuide = {
  id: "mi-casa",
  title: "Mi casa — My Home",
  strand: "Home & Routine",
  icon: "🏠",
  summary: "Vivo en un piso: the type of home, where it is, its rooms and what it's like.",
  intro:
    "Where you live is one of the first things a Spanish exchange partner will ask about. In this topic you'll say what kind of home you live in, where it is, which rooms it has and what it's like — and then imagine your dream home.\n\nA handful of small words do most of the work: *vivo* (I live), *está* (it is — for location), *hay* (there is / there are), *tiene* (it has) and *es* (it is — for description). Get those right, make your adjectives agree, and you can describe any home from an HDB flat in Tampines to a farmhouse in Galicia.",
  guide: [
    // ------------------------------------------------------------------
    {
      id: "types-of-home",
      heading: "Types of home: ¿Dónde vives?",
      discovery: {
        problem:
          "Read what four teenagers say:\n\n    Lucía: Vivo en un piso en Madrid.\n    Arjun: Vivo en una casa adosada.\n    Carmen: Vivo en una granja.\n    Diego: Vivo en un chalet.\n\n1. Every sentence starts with *Vivo en…* What do you think it means?\n2. Some homes take *un*, some take *una*. Look at the last letter of each noun and make a rule.\n3. Use your rule to predict: *un apartamento* or *una apartamento*?",
        idea:
          "*Vivo en…* = 'I live in…'. Every Spanish noun is **masculine** or **feminine**, and the word for 'a' changes to match: **un** for masculine, **una** for feminine. Nouns ending in **-o** are almost always masculine (*un piso, un apartamento*) and nouns ending in **-a** are almost always feminine (*una casa, una granja*). Other endings — like *chalet*, borrowed from French — just have to be learnt. So always learn a noun **with** its *un/una* or *el/la*.",
      },
      body:
        "**Types of home**\n\n| Spanish | English |\n|---|---|\n| un piso | a flat |\n| un apartamento | an apartment (often a small or holiday flat) |\n| una casa | a house |\n| una casa adosada | a terraced or semi-detached house (joined to the next one) |\n| un chalet | a detached house, usually with a garden |\n| una granja | a farm |\n\n> In Singapore, an HDB flat is simply *un piso*. A condo flat is *un piso en una urbanización* — in Spain an *urbanización* is a group of homes sharing a pool and gardens, very like a condo.\n\n**un or una?**\n\n- Masculine nouns → *un*: *un piso, un apartamento, un chalet*\n- Feminine nouns → *una*: *una casa, una granja*\n- Words describing the home come **after** it: *una casa **adosada***.\n- Spanish *en* covers 'in', 'on' and 'at': *Vivo **en** una granja* = I live **on** a farm.\n\n**The verb *vivir* (to live)** — a regular *-ir* verb: take off *-ir* and add the endings.\n\n| person | vivir | English |\n|---|---|---|\n| yo | vivo | I live |\n| tú | vives | you live |\n| él / ella / usted | vive | he / she lives, you (polite) live |\n| nosotros / nosotras | vivimos | we live |\n| vosotros / vosotras | vivís | you (all) live |\n| ellos / ellas / ustedes | viven | they live |\n\nThe three singular forms are the ones you'll use most: *vivo* (about yourself), *vives* (asking a friend), *vive* (about someone else). Because the ending already shows the person, *yo* is optional — use it for contrast: *Yo vivo en un piso, pero mi primo vive en una granja.*\n\n**Asking the questions**\n\n- *¿Dónde vives?* — Where do you live?\n- *¿Vives en una casa o en un piso?* — Do you live in a house or a flat?\n- *¿Dónde vive tu abuela?* — Where does your grandmother live?\n\nA yes/no question is just a statement with question marks — Spanish has no extra 'do': *Vives en un piso.* → *¿Vives en un piso?* Don't forget the upside-down *¿* at the start, and the accent on *¿Dónde?*\n\n    Vivo en un piso en Singapur.\n    Mi mejor amiga vive en una casa adosada.\n    ¿Vives en un chalet o en un apartamento?",
      workedExamples: [
        {
          title: "Answer the question",
          problem:
            "Your Spanish exchange partner asks: *¿Vives en una casa o en un piso?* You live in an HDB flat in Singapore. Answer in a full sentence.",
          steps: [
            "The question uses *vives* ('you live'). Your answer is about yourself, so switch to the *yo* form: *vivo*.",
            "An HDB flat is a flat → *piso*. It ends in *-o*, so it's masculine → *un piso*.",
            "Keep the *en* — you live **in** it: *en un piso*.",
            "Add where: *en Singapur*.",
          ],
          answer: "*Vivo en un piso en Singapur.*",
          yourTurn: {
            question: "Your turn: write 'My grandmother lives on a farm' in Spanish.",
            answer: { type: "text", accept: ["mi abuela vive en una granja"] },
            solution:
              "About someone else → *vive*. 'On a farm' → *en* + *granja*, which ends in *-a* → *una*: **Mi abuela vive en una granja.**",
          },
        },
        {
          title: "Ask the questions",
          problem: "Ask Pablo where he lives, and then whether he lives in a house or a flat.",
          steps: [
            "Talking **to** Pablo → *tú* form: *vives*.",
            "'Where?' → *¿Dónde?* (question word, with an accent): *¿Dónde vives?*",
            "For the choice, use *o* (or) and repeat *en*: *¿Vives en una casa o en un piso?*",
          ],
          answer: "*¿Dónde vives? ¿Vives en una casa o en un piso?*",
          yourTurn: {
            question: "Your turn: write 'I live in a detached house' in Spanish.",
            answer: { type: "text", accept: ["vivo en un chalet", "yo vivo en un chalet", "vivo en un chalé", "yo vivo en un chalé"] },
            solution: "'I live' → *vivo*; a detached house → *chalet*, which is masculine → **Vivo en un chalet.**",
          },
        },
      ],
      keyPoints: [
        "*Vivo en…* = I live in… · *¿Dónde vives?* = Where do you live?",
        "Singular of *vivir*: *vivo, vives, vive* (a regular *-ir* verb).",
        "Masculine nouns take *un*, feminine nouns take *una*: *un piso, una casa*.",
        "*-o* → usually masculine; *-a* → usually feminine; learn the rest (*un chalet*) by heart.",
        "The describing word comes after the noun: *una casa adosada*.",
      ],
      whyItWorks:
        "Spanish verb endings carry the person, which is why *yo* can disappear: the *-o* of *vivo* can only mean 'I'.\n\nGender is a grammar label inherited from Latin, not a statement that a house is 'female'. Latin nouns in *-a* were mostly feminine; masculine nouns in *-us* and neuter nouns in *-um* both wore down to *-o* in Spanish, and the neuters joined the masculines. That's why *-o = masculine, -a = feminine* works so often. Words borrowed later, like *chalet* from French, keep whatever gender they were given when they arrived.",
      strategies: ["Gender detective (el/la)", "Check the subject", "Recycle a chunk"],
      thinkDeeper:
        "*El día* and *el mapa* end in *-a* but are masculine; *la mano* ends in *-o* but is feminine. Why is it safer to learn every new noun as a pair (*la casa*, *un piso*) than to trust the ending? If you met a brand-new noun in a dictionary, where would you look to find its gender?",
    },
    // ------------------------------------------------------------------
    {
      id: "location",
      heading: "Where it is: en el campo, en la costa…",
      discovery: {
        problem:
          "Compare these sentences:\n\n    Mi casa es grande.\n    Mi casa está en el campo.\n    Mi piso es moderno.\n    Mi piso está en el centro.\n\nBoth *es* and *está* translate as 'is'. Look at what comes after each one. When does Spanish use *está*? Make a rule.",
        idea:
          "*Es* (from *ser*) says **what something is like**: *grande, moderno*. *Está* (from *estar*) says **where something is**. So the location of your home always uses *está*: *Mi casa está en el campo* — never *Mi casa es en el campo*.",
      },
      body:
        "**Where is your home?**\n\nUse **Mi casa está en…** (or **Vivo en…**) + a place:\n\n| Spanish | English |\n|---|---|\n| en el centro | in the centre (of town) |\n| en las afueras | on the outskirts |\n| en el campo | in the countryside |\n| en la costa | on the coast |\n| en la montaña | in the mountains |\n| en un pueblo | in a village / small town |\n| en una ciudad | in a city / town |\n\nAdd detail with *de*: *en el centro de Madrid*, *en las afueras de Sevilla*, *en un pueblo de Andalucía*, *en el este de Singapur*.\n\n**Near and far: cerca de / lejos de**\n\n- *cerca de* = near · *lejos de* = far from\n- *de + el* → **del**: *cerca **del** colegio*, *lejos **del** centro*\n- *de la*, *de los*, *de las* never change: *cerca de la playa*, *lejos de las tiendas*\n- With nothing after them, drop *de*: *Mi colegio está cerca.* / *La playa está lejos.*\n\n    Mi piso está en el este de Singapur, cerca de una estación de metro.\n    La casa de mi tía está en un pueblo de Andalucía, lejos de la costa.\n    Vivo en las afueras de Valencia, bastante cerca de la playa.\n\n**es or está?**\n\n| *es* (ser) — what it is like | *está* (estar) — where it is |\n|---|---|\n| Mi casa es pequeña. | Mi casa está en la costa. |\n| El pueblo es bonito. | El pueblo está en la montaña. |\n| Mi piso es moderno. | Mi piso está cerca del centro. |\n\n> Quick test: if the sentence answers the question '**where?**', use *está*.\n\nTalking about more than one home? *Están*: *Las casas de mis abuelos están en el campo.*",
      diagram: `<svg viewBox="0 0 480 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Map of places a home can be: mountains with a village on the left, the countryside at the bottom, a city with its centre and outskirts in the middle, and the coast beside the sea on the right"><rect x="0" y="0" width="480" height="260" fill="#ffffff"/><rect x="380" y="0" width="20" height="260" fill="#fde68a"/><rect x="400" y="0" width="80" height="260" fill="#bae6fd"/><text x="440" y="135" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">el mar</text><text x="390" y="252" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937" font-weight="bold">la costa</text><polygon points="382,112 390,104 398,112" fill="#fecaca" stroke="#334155"/><rect x="384" y="112" width="12" height="10" fill="#ffffff" stroke="#334155"/><polygon points="10,140 60,50 110,140" fill="#c7d2fe" stroke="#334155"/><polygon points="70,140 120,70 170,140" fill="#c7d2fe" stroke="#334155"/><text x="90" y="38" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937" font-weight="bold">la montaña</text><polygon points="40,172 49,163 58,172" fill="#fecaca" stroke="#334155"/><rect x="42" y="172" width="14" height="12" fill="#ffffff" stroke="#334155"/><polygon points="70,172 79,163 88,172" fill="#fecaca" stroke="#334155"/><rect x="72" y="172" width="14" height="12" fill="#ffffff" stroke="#334155"/><polygon points="100,172 109,163 118,172" fill="#fecaca" stroke="#334155"/><rect x="102" y="172" width="14" height="12" fill="#ffffff" stroke="#334155"/><text x="80" y="204" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937" font-weight="bold">un pueblo</text><rect x="150" y="190" width="200" height="60" fill="#bbf7d0" stroke="#334155"/><line x1="150" y1="210" x2="350" y2="210" stroke="#334155" stroke-dasharray="3 5"/><line x1="150" y1="230" x2="350" y2="230" stroke="#334155" stroke-dasharray="3 5"/><text x="250" y="224" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937" font-weight="bold">el campo</text><circle cx="270" cy="95" r="70" fill="#fde68a" stroke="#334155"/><circle cx="270" cy="95" r="30" fill="#fecaca" stroke="#334155"/><text x="270" y="18" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937" font-weight="bold">una ciudad</text><text x="270" y="99" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">el centro</text><text x="270" y="148" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">las afueras</text></svg>`,
      diagramCaption:
        "Where a home can be: *en la montaña*, *en un pueblo*, *en el campo*, *en una ciudad* (*en el centro* or *en las afueras*) and *en la costa*, next to *el mar*.",
      workedExamples: [
        {
          title: "Location with lejos de",
          problem: "Translate: 'My flat is far from the centre.'",
          steps: [
            "It says **where** the flat is → *estar*: *Mi piso está…*",
            "'far from' → *lejos de*.",
            "*el centro* is masculine, so *de + el* → *del*: *lejos del centro*.",
          ],
          answer: "*Mi piso está lejos del centro.*",
          yourTurn: {
            question: "Your turn: write 'My house is near the school' in Spanish. (school = *el colegio*)",
            answer: { type: "text", accept: ["mi casa está cerca del colegio"] },
            solution: "Location → *está*; 'near' → *cerca de*; *de + el colegio* → *del colegio*: **Mi casa está cerca del colegio.**",
          },
        },
        {
          title: "Change the person",
          problem:
            "Javier lives in a village in the mountains, near Granada. Write it first as Javier talking about himself, then as you talking about him.",
          steps: [
            "Javier about himself → *yo*: *Vivo en un pueblo…*",
            "'in the mountains' → *en la montaña* (Spanish uses the singular).",
            "'near Granada' → *cerca de Granada* (a name has no article, so no *del*).",
            "You about Javier → *él*: *vive*.",
          ],
          answer:
            "*Vivo en un pueblo en la montaña, cerca de Granada.* → *Javier vive en un pueblo en la montaña, cerca de Granada.*",
          yourTurn: {
            question: "Your turn: write 'We live on the outskirts of Madrid' in Spanish.",
            answer: {
              type: "text",
              accept: ["vivimos en las afueras de madrid", "nosotros vivimos en las afueras de madrid", "nosotras vivimos en las afueras de madrid"],
            },
            solution: "'We live' → *vivimos*; 'the outskirts' is always plural and feminine → *las afueras*: **Vivimos en las afueras de Madrid.**",
          },
        },
      ],
      keyPoints: [
        "Location of a home → *está*: *Mi casa está en la costa.*",
        "Description → *es*: *Mi casa es bonita.*",
        "*cerca de* = near; *lejos de* = far from.",
        "*de + el = del*: *cerca del centro*. *De la / de los / de las* never contract.",
        "*las afueras* (the outskirts) is always plural: *en las afueras*.",
      ],
      whyItWorks:
        "Spanish has two verbs for 'to be' because it splits two ideas that English lumps together. *Ser* comes from Latin *esse* ('to be' — what something is) and *estar* from Latin *stare* ('to stand'). Something that *stands* somewhere has a position — so *estar* took over location. Your house *está* in the countryside because that's where it stands.\n\n*De + el* becomes *del* for the same reason *a + el* becomes *al*: two tiny words that are always said together get run into one. Only the masculine singular *el* does this; *de la* stays as two words.",
      strategies: ["Look for the pattern", "Mind the accent", "Translate back to check"],
      thinkDeeper:
        "We say *Mi casa está en el campo*, but *La fiesta es en mi casa* ('The party is at my house'). Both sentences talk about a place — so why might Spanish switch to *ser* for the party? Think about the difference between a building, which stands somewhere, and an event, which *happens* somewhere.",
    },
    // ------------------------------------------------------------------
    {
      id: "rooms",
      heading: "Rooms: ¿Qué hay en tu casa?",
      discovery: {
        problem:
          "Wei Ling describes her flat:\n\n    En mi piso hay tres dormitorios, dos cuartos de baño, una cocina y un salón. No hay jardín, pero hay un balcón.\n\n1. Without a dictionary, what does *hay* mean? Look at what follows it each time.\n2. Does *hay* change when there is one thing and when there are three?\n3. *salón* has an accent. How do you think you write 'two living rooms'?",
        idea:
          "*Hay* means **there is** *and* **there are** — one word for both, and it never changes. Use it with *un/una* or a number: *hay un balcón, hay tres dormitorios*. After *no hay*, drop the *un/una*: *no hay jardín*. And 'two living rooms' is *dos salones* — no accent! Adding *-es* puts the stressed syllable in the normal place, so the accent has nothing left to do.",
      },
      body:
        "**The rooms**\n\n| Spanish | English |\n|---|---|\n| la cocina | kitchen |\n| el salón | living room |\n| el comedor | dining room |\n| el dormitorio | bedroom (also *la habitación*) |\n| el cuarto de baño | bathroom (also *el baño*) |\n| el aseo | toilet (a small room with a toilet and basin) |\n| el despacho | study / home office |\n| el jardín | garden |\n| el garaje | garage |\n| el balcón | balcony |\n| la terraza | terrace / large balcony |\n\n**Plurals**\n\n- After a vowel add *-s*: *cocinas, dormitorios, garajes, terrazas*.\n- After a consonant add *-es*: *comedores*.\n- *-ón* and *-ín* words lose their accent: *salón → salones*, *balcón → balcones*, *jardín → jardines*.\n- In *cuarto de baño* only the first noun changes: *dos cuartos de baño*.\n\n**hay or tiene?**\n\n- *En mi casa **hay** tres dormitorios.* — In my house there are three bedrooms.\n- *Mi casa **tiene** tres dormitorios.* — My house has three bedrooms.\n- Negative: *No hay garaje.* / *No tiene garaje.* — no *un/una* after *no*.\n- To say **where** a particular room is, use *está*: *La cocina está abajo.*\n\n**Counting rooms (1–20)**\n\n| 1–5 | 6–10 | 11–15 | 16–20 |\n|---|---|---|---|\n| 1 uno | 6 seis | 11 once | 16 dieciséis |\n| 2 dos | 7 siete | 12 doce | 17 diecisiete |\n| 3 tres | 8 ocho | 13 trece | 18 dieciocho |\n| 4 cuatro | 9 nueve | 14 catorce | 19 diecinueve |\n| 5 cinco | 10 diez | 15 quince | 20 veinte |\n\n*Uno* becomes *un* before a masculine noun and *una* before a feminine one: *hay un aseo*, *hay una terraza*.\n\n**Upstairs and downstairs**\n\n- *en la planta baja* — on the ground floor\n- *en la primera planta* — on the first floor · *en la segunda planta* — on the second floor\n- *arriba* — upstairs · *abajo* — downstairs\n\n    En la planta baja hay una cocina, un salón y un aseo.\n    Arriba hay tres dormitorios y un cuarto de baño.\n    Vivo en un piso en la planta doce.\n\n> From the 11th floor up, Spanish normally uses ordinary numbers: *la planta doce*, *el piso quince*.",
      diagram: `<svg viewBox="0 0 480 310" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cross-section of a two-storey house. Upstairs, on the first floor: a bedroom, a bathroom and a study, with a balcony outside. Downstairs, on the ground floor: the kitchen, the living room and a toilet, with a garage beside the house and a garden along the bottom"><rect x="0" y="0" width="480" height="310" fill="#ffffff"/><rect x="100" y="270" width="370" height="32" fill="#bbf7d0"/><line x1="90" y1="270" x2="470" y2="270" stroke="#334155" stroke-width="2"/><text x="290" y="291" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">el jardín</text><polygon points="100,90 240,22 380,90" fill="#fecaca" stroke="#334155" stroke-width="2"/><rect x="110" y="90" width="260" height="90" fill="#c7d2fe" stroke="#334155" stroke-width="2"/><line x1="200" y1="90" x2="200" y2="180" stroke="#334155" stroke-width="2"/><line x1="290" y1="90" x2="290" y2="180" stroke="#334155" stroke-width="2"/><text x="155" y="139" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">el dormitorio</text><text x="245" y="132" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">el cuarto</text><text x="245" y="147" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">de baño</text><text x="330" y="139" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">el despacho</text><rect x="110" y="180" width="260" height="90" fill="#fde68a" stroke="#334155" stroke-width="2"/><line x1="190" y1="180" x2="190" y2="270" stroke="#334155" stroke-width="2"/><line x1="310" y1="180" x2="310" y2="270" stroke="#334155" stroke-width="2"/><text x="150" y="229" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">la cocina</text><text x="250" y="229" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">el salón</text><text x="340" y="229" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">el aseo</text><rect x="370" y="160" width="45" height="14" fill="none" stroke="#334155"/><line x1="385" y1="160" x2="385" y2="174" stroke="#334155"/><line x1="400" y1="160" x2="400" y2="174" stroke="#334155"/><rect x="370" y="174" width="45" height="6" fill="#334155"/><text x="405" y="150" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">el balcón</text><rect x="370" y="205" width="90" height="65" fill="#bae6fd" stroke="#334155" stroke-width="2"/><text x="415" y="242" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">el garaje</text><text x="52" y="130" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937" font-weight="bold">primera planta</text><text x="52" y="147" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">(arriba)</text><text x="52" y="222" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937" font-weight="bold">planta baja</text><text x="52" y="239" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">(abajo)</text></svg>`,
      diagramCaption:
        "*Arriba*, en la primera planta: *el dormitorio, el cuarto de baño, el despacho* y *el balcón*. *Abajo*, en la planta baja: *la cocina, el salón* y *el aseo*.",
      workedExamples: [
        {
          title: "hay and no hay",
          problem: "Translate: 'In my house there are two bathrooms, but there isn't a garage.'",
          steps: [
            "'there are' / 'there isn't' → *hay* / *no hay*.",
            "*cuarto de baño* → plural *cuartos de baño* (only *cuarto* changes).",
            "After *no hay*, drop the article: *no hay garaje*.",
            "'but' → *pero*.",
          ],
          answer: "*En mi casa hay dos cuartos de baño, pero no hay garaje.*",
          yourTurn: {
            question: "Your turn: write 'In my flat there are three bedrooms' in Spanish.",
            answer: {
              type: "text",
              accept: [
                "en mi piso hay tres dormitorios",
                "hay tres dormitorios en mi piso",
                "mi piso tiene tres dormitorios",
                "en mi piso hay tres habitaciones",
                "hay tres habitaciones en mi piso",
                "mi piso tiene tres habitaciones",
                "en mi apartamento hay tres dormitorios",
                "hay tres dormitorios en mi apartamento",
                "mi apartamento tiene tres dormitorios",
                "en mi apartamento hay tres habitaciones",
              ],
            },
            solution: "'there are' → *hay* (it never changes); *dormitorio* → *dormitorios*: **En mi piso hay tres dormitorios.** (Also fine: *Mi piso tiene tres dormitorios.*)",
          },
        },
        {
          title: "Read the floor plan",
          problem: "Look at the floor plan. Say where the kitchen is, then list what there is upstairs.",
          steps: [
            "A particular room (*la cocina*) + where it is → *está*: *La cocina está en la planta baja.*",
            "Listing what exists → *hay* + *un/una*.",
            "Upstairs → *Arriba*. Join the last two items with *y*.",
          ],
          answer: "*La cocina está en la planta baja. Arriba hay un dormitorio, un cuarto de baño y un despacho.*",
          yourTurn: {
            question: "Your turn: using the plan, write 'The living room is downstairs' in Spanish.",
            answer: {
              type: "text",
              accept: ["el salón está abajo", "abajo está el salón", "el salón está en la planta baja", "en la planta baja está el salón"],
            },
            solution: "A particular room + where it is → *está*: **El salón está abajo** (or *en la planta baja*).",
          },
        },
      ],
      keyPoints: [
        "*hay* = there is / there are — it never changes.",
        "*tiene* = it has: *Mi piso tiene un balcón.*",
        "After *no hay* / *no tiene*, drop *un/una*: *No hay jardín.*",
        "Plurals: *-s* after a vowel, *-es* after a consonant; *salón → salones* (the accent goes).",
        "*la planta baja* = ground floor; *la primera planta* = first floor; *arriba* / *abajo* = upstairs / downstairs.",
        "*un/una* also means 'one': *hay un aseo, hay una cocina*.",
      ],
      whyItWorks:
        "*Hay* comes from the verb *haber* plus an old Spanish word *y* that meant 'there' (French still has it: *il y a*). So *hay* already contains the 'there' of 'there is'. It never agrees with the noun because the noun isn't doing anything — it's just what is found.\n\nThe disappearing accent follows the stress rules. Words ending in a vowel, *-n* or *-s* are normally stressed on the second-to-last syllable. *Sa-LÓN* breaks that rule, so it needs a written accent. In *sa-LO-nes* the stress hasn't moved, but it now sits on the second-to-last syllable — the normal place — so the accent has no job left.",
      strategies: ["Mind the accent", "Gender detective (el/la)", "Build it up (extended sentence)"],
      thinkDeeper:
        "In Spain the *primera planta* is one floor **above** the ground, but in a Singapore lift 'Level 1' **is** the ground floor. If your exchange partner lives *en la tercera planta*, how many flights of stairs do you climb? Your HDB flat is on Level 8 — which *planta* is that in Spanish terms?",
    },
    // ------------------------------------------------------------------
    {
      id: "describing-home",
      heading: "Describing my home",
      discovery: {
        problem:
          "Look closely at the endings:\n\n    Mi piso es pequeño.\n    Mi casa es pequeña.\n    Los dormitorios son pequeños.\n    Las habitaciones son pequeñas.\n    El salón es grande. La cocina es grande.\n\n1. Why does *pequeño* keep changing its ending?\n2. Why doesn't *grande* change for *salón* and *cocina*?\n3. In English we say 'a modern flat'. Where do you think *moderno* goes in Spanish?",
        idea:
          "Spanish adjectives **agree** with their noun in gender (masculine/feminine) and number (singular/plural). Adjectives ending in *-o* have four forms: *pequeño, pequeña, pequeños, pequeñas*. Adjectives ending in *-e* or a consonant have only two: *grande / grandes*, *azul / azules*. And most adjectives go **after** the noun: *un piso moderno*.",
      },
      body:
        "**Adjectives for homes**\n\n| Spanish | English |\n|---|---|\n| grande | big |\n| pequeño | small |\n| moderno | modern |\n| antiguo | old (historic, old-fashioned) |\n| cómodo | comfortable |\n| bonito | pretty, nice |\n| feo | ugly |\n| luminoso | bright, full of light |\n| oscuro | dark |\n\n**Agreement**\n\n| | masculine | feminine |\n|---|---|---|\n| singular | un piso pequeño | una casa pequeña |\n| plural | dos pisos pequeños | dos casas pequeñas |\n| singular | un salón grande | una cocina grande |\n| plural | dos salones grandes | dos cocinas grandes |\n\n- *-o* adjectives: four forms (*-o, -a, -os, -as*).\n- *-e* adjectives: two forms (*grande, grandes*).\n- Consonant adjectives: two forms (*azul, azules*; *gris, grises*).\n- Use *es* for one thing and *son* for more than one: *Los dormitorios son luminosos.*\n\n**Word order**: the adjective goes **after** the noun — *una casa antigua*, *un jardín bonito*, *un dormitorio luminoso*.\n\n**Intensifiers** — they turn the volume up or down and **never change their ending**:\n\n| Spanish | English |\n|---|---|\n| un poco | a bit, slightly |\n| bastante | quite, fairly |\n| muy | very |\n| demasiado | too (more than you want) |\n\n    Mi piso es bastante moderno.\n    La cocina es un poco pequeña.\n    Mi dormitorio es muy cómodo.\n    Las habitaciones son demasiado oscuras.\n\n*Un poco* usually goes with something slightly negative (*un poco pequeño, un poco feo*), and *demasiado* means there is a problem: *demasiado pequeño* = too small.\n\n**Colours of rooms** — colours are adjectives too, so they agree and go after the noun.\n\n| English | masc. sing. | fem. sing. | plural |\n|---|---|---|---|\n| white | blanco | blanca | blancos / blancas |\n| yellow | amarillo | amarilla | amarillos / amarillas |\n| red | rojo | roja | rojos / rojas |\n| green | verde | verde | verdes |\n| blue | azul | azul | azules |\n| grey | gris | gris | grises |\n| pink | rosa | rosa | rosa |\n| orange | naranja | naranja | naranja |\n\n    Mi dormitorio es azul.\n    La cocina es blanca y el salón es amarillo.\n    Las paredes de mi dormitorio son verdes.\n\n> *Rosa* (a rose) and *naranja* (an orange) are also nouns, so they usually stay the same: *unas cortinas naranja*. You will also hear *rosas* and *naranjas*.",
      diagram: `<svg viewBox="0 0 480 170" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A scale of intensifiers from weakest to strongest: un poco (a bit), bastante (quite), muy (very), demasiado (too), with bars growing taller; the last bar is red because too much is a problem"><rect x="0" y="0" width="480" height="170" fill="#ffffff"/><text x="240" y="22" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">La cocina es … pequeña.</text><line x1="30" y1="70" x2="440" y2="70" stroke="#334155" stroke-width="2"/><polygon points="440,64 452,70 440,76" fill="#334155"/><line x1="70" y1="64" x2="70" y2="76" stroke="#334155" stroke-width="2"/><line x1="180" y1="64" x2="180" y2="76" stroke="#334155" stroke-width="2"/><line x1="290" y1="64" x2="290" y2="76" stroke="#334155" stroke-width="2"/><line x1="400" y1="64" x2="400" y2="76" stroke="#334155" stroke-width="2"/><text x="70" y="56" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937" font-weight="bold">un poco</text><text x="180" y="56" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937" font-weight="bold">bastante</text><text x="290" y="56" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937" font-weight="bold">muy</text><text x="400" y="56" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937" font-weight="bold">demasiado</text><text x="70" y="92" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#334155">a bit</text><text x="180" y="92" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#334155">quite</text><text x="290" y="92" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#334155">very</text><text x="400" y="92" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#334155">too</text><rect x="50" y="140" width="40" height="15" fill="#bbf7d0" stroke="#334155"/><rect x="160" y="130" width="40" height="25" fill="#bbf7d0" stroke="#334155"/><rect x="270" y="120" width="40" height="35" fill="#bbf7d0" stroke="#334155"/><rect x="380" y="110" width="40" height="45" fill="#fecaca" stroke="#334155"/></svg>`,
      diagramCaption:
        "From *un poco* to *demasiado*: intensifiers turn the volume up — and they never change their ending (*muy pequeña*, never *muya*).",
      workedExamples: [
        {
          title: "Make it agree",
          problem: "Translate: 'The kitchen is quite small but very bright.'",
          steps: [
            "Describing → *es*.",
            "*la cocina* is feminine singular → *pequeña*, *luminosa*.",
            "*bastante* and *muy* are intensifiers, so they don't change.",
            "'but' → *pero*.",
          ],
          answer: "*La cocina es bastante pequeña pero muy luminosa.*",
          yourTurn: {
            question: "Your turn: write 'My bedroom is too small' in Spanish.",
            answer: {
              type: "text",
              accept: ["mi dormitorio es demasiado pequeño", "mi habitación es demasiado pequeña", "mi cuarto es demasiado pequeño"],
            },
            solution:
              "*dormitorio* is masculine → *pequeño*; *demasiado* is an intensifier, so it never changes: **Mi dormitorio es demasiado pequeño.** (With *la habitación*: *demasiado pequeña*.)",
          },
        },
        {
          title: "Noun first, then adjective",
          problem: "Translate: 'We live in an old house with a pretty garden.'",
          steps: [
            "'We live' → *vivimos*.",
            "'an old house' → noun first: *una casa antigua* (feminine → *-a*).",
            "'with' → *con*; 'a pretty garden' → *un jardín bonito* (masculine → *-o*).",
          ],
          answer: "*Vivimos en una casa antigua con un jardín bonito.*",
          yourTurn: {
            question: "Your turn: write 'The walls are blue' in Spanish. (wall = *la pared*)",
            answer: { type: "text", accept: ["las paredes son azules"] },
            solution: "Plural → *las paredes* and *son*; *azul* ends in a consonant, so add *-es*: **Las paredes son azules.**",
          },
        },
      ],
      keyPoints: [
        "Describe with *es* (one) / *son* (more than one): *Mi casa es moderna. Los dormitorios son grandes.*",
        "Adjectives agree in gender and number: *-o* adjectives have 4 forms; *-e* and consonant adjectives have 2.",
        "Adjective after the noun: *un piso moderno*, not *un moderno piso*.",
        "Intensifiers never change: *muy pequeña*, *demasiado pequeñas*.",
        "Colours agree too: *una cocina blanca*, *paredes azules*; *rosa* and *naranja* usually stay the same.",
      ],
      whyItWorks:
        "Agreement is Spanish's way of showing which words belong together: the *-a* on *pequeña* points back to *casa*, like a matching colour tag. Intensifiers such as *muy* and *bastante* describe the **adjective**, not the noun, so they have no noun to match and stay the same.\n\nAdjectives come after the noun because Spanish normally names the thing first and then narrows it down: *una casa* — which one? — *antigua*. English does the opposite, which is why 'a modern flat' must be flipped to *un piso moderno*.",
      strategies: ["Agreement check", "Gender detective (el/la)", "Build it up (extended sentence)"],
      thinkDeeper:
        "*Una casa grande* is 'a big house', but *una gran casa* means 'a great house'. *Grande* shortens to *gran* and jumps in front of the noun — and its meaning shifts from a measurable fact to an opinion. Can you find an English adjective that changes meaning depending on where it goes? (Compare 'an old friend' with 'a friend who is old'.)",
    },
    // ------------------------------------------------------------------
    {
      id: "my-dream-home",
      heading: "My dream home (look-ahead)",
      discovery: {
        problem:
          "Hana writes:\n\n    Me gustaría vivir en una casa enorme en la costa, porque me encanta el mar.\n    Mi casa ideal tendría una piscina, un cine y un jardín muy grande.\n\n1. You know *me gusta* = I like. Guess what *me gustaría* means.\n2. *tiene* = it has. What might *tendría* mean?\n3. Find the reason Hana gives. Which word introduces it?",
        idea:
          "*Me gustaría* = **I would like** and *tendría* = **would have**. They belong to a tense you'll study in Year 9 (the conditional), but you can use them now as **fixed chunks**: *Me gustaría vivir en…* + a place, and *Mi casa ideal tendría…* + rooms and features. Hana's reason starts with *porque* (because) — adding a reason lifts any answer.",
      },
      body:
        "**Two chunks to learn by heart**\n\n| chunk | meaning | what follows |\n|---|---|---|\n| Me gustaría vivir en… | I would like to live in… | a type of home and/or a place |\n| Mi casa ideal tendría… | My ideal house would have… | rooms and features |\n| Mi casa ideal tiene… | My ideal house has… | present-tense version, also fine |\n\n*Me gustaría* is followed by an **infinitive**: *me gustaría vivir*, *me gustaría tener*. Never conjugate the second verb (not *me gustaría vivo*).\n\n**Dream features**\n\n- *una piscina* — a swimming pool\n- *un gimnasio* — a gym\n- *un cine* — a cinema\n- *una sala de juegos* — a games room\n- *una biblioteca* — a library (not *una librería*, which is a bookshop!)\n- *un ascensor* — a lift\n- *una pista de tenis* — a tennis court\n- *vistas al mar* — sea views\n\n**Justify it**\n\n- *porque me encanta el mar* — because I love the sea\n- *porque me gusta nadar* — because I like swimming\n- *porque el campo es tranquilo* — because the countryside is peaceful\n- *ya que hay mucho espacio* — since there's lots of space\n\n    Me gustaría vivir en un chalet en la montaña porque me encanta la naturaleza.\n    Mi casa ideal tendría una biblioteca enorme, ya que me encanta leer.\n    Mi casa ideal tiene una piscina en la azotea y vistas al mar.\n\n> Singapore-style dream: *Me gustaría vivir en un piso muy alto con una piscina en la azotea* — a pool on the flat roof.\n\n**Real home vs dream home** — the strongest answers contrast the two:\n\n    Ahora vivo en un piso pequeño en Singapur, pero me gustaría vivir en una casa grande en la costa.",
      workedExamples: [
        {
          title: "Use the chunk",
          problem: "Translate: 'I would like to live in a modern flat in the centre of Barcelona.'",
          steps: [
            "'I would like to live' → fixed chunk *Me gustaría vivir*.",
            "'in a modern flat' → *en un piso moderno* (adjective after the noun, masculine).",
            "'in the centre of Barcelona' → *en el centro de Barcelona*.",
          ],
          answer: "*Me gustaría vivir en un piso moderno en el centro de Barcelona.*",
          yourTurn: {
            question: "Your turn: write 'I would like to live in the countryside' in Spanish.",
            answer: { type: "text", accept: ["me gustaría vivir en el campo", "a mí me gustaría vivir en el campo"] },
            solution: "Chunk *Me gustaría vivir* + *en el campo*: **Me gustaría vivir en el campo.**",
          },
        },
        {
          title: "Feature + reason",
          problem: "Answer *¿Cómo es tu casa ideal?* with one feature and a reason.",
          steps: [
            "Start with the chunk: *Mi casa ideal tendría…*",
            "Choose a feature with *un/una*: *una sala de juegos*.",
            "Give a reason with *porque*: *porque me encantan los videojuegos* (*encantan* because *los videojuegos* is plural).",
          ],
          answer: "*Mi casa ideal tendría una sala de juegos porque me encantan los videojuegos.*",
          yourTurn: {
            question: "Your turn: write 'My ideal house would have a swimming pool' in Spanish.",
            answer: { type: "text", accept: ["mi casa ideal tendría una piscina", "mi casa ideal tendría piscina"] },
            solution: "Chunk *Mi casa ideal tendría* + *una piscina*: **Mi casa ideal tendría una piscina.**",
          },
        },
      ],
      keyPoints: [
        "*Me gustaría* + infinitive = I would like to…: *Me gustaría vivir en la costa.*",
        "*Mi casa ideal tendría…* = My ideal house would have… (*tiene* is fine too).",
        "Treat *gustaría* and *tendría* as fixed chunks — the full tense comes in Year 9.",
        "Always justify: *porque…* / *ya que…*.",
        "Contrast real and dream: *Vivo en… pero me gustaría vivir en…*",
      ],
      whyItWorks:
        "Both chunks end in *-ría*, and that ending is the clue: it usually adds 'would' to a verb. *Gustar* → *gustaría* (would please), *vivir* → *viviría* (would live), and *tener* → *tendría* (would have — *tener* squeezes to *tendr-* first). Spot *-ría* on the end of a verb and 'would' is a very good guess.\n\n*Me gustaría vivir* works exactly like *me gusta vivir*: the thing doing the pleasing is the activity *vivir*, so it stays in the infinitive.",
      strategies: ["Recycle a chunk", "Build it up (extended sentence)", "Look for the pattern"],
      thinkDeeper:
        "Write one sentence with three time ideas: where you live now (*vivo*), where you are going to live when you're older (*voy a vivir*), and where you would like to live (*me gustaría vivir*). Which of the three is a fact, which is a plan and which is only a wish? How does the verb show the difference?",
    },
  ],
  learn: {
    flashcards: [
      { front: "Vivo en un piso.", back: "I live in a flat." },
      { front: "¿Dónde vives?", back: "Where do you live?" },
      { front: "una casa adosada", back: "a terraced / semi-detached house" },
      { front: "un chalet", back: "a detached house" },
      { front: "una granja", back: "a farm" },
      { front: "Mi casa está en el campo.", back: "My house is in the countryside." },
      { front: "en las afueras", back: "on the outskirts" },
      { front: "cerca del centro", back: "near the centre" },
      { front: "lejos de la costa", back: "far from the coast" },
      { front: "el cuarto de baño", back: "the bathroom" },
      { front: "el salón", back: "the living room" },
      { front: "el despacho", back: "the study / home office" },
      { front: "la planta baja", back: "the ground floor" },
      { front: "arriba / abajo", back: "upstairs / downstairs" },
      { front: "hay", back: "there is / there are" },
      { front: "luminoso", back: "bright, full of light" },
      { front: "demasiado pequeño", back: "too small" },
      { front: "Plural of *el salón*?", back: "*los salones* — the accent disappears." },
      { front: "*es* or *está* for where your house is?", back: "*está*: *Mi piso está en el centro.*" },
      { front: "*de + el* = ?", back: "*del*: *cerca del colegio*." },
      { front: "Me gustaría vivir en…", back: "I would like to live in…" },
      { front: "Mi casa ideal tendría…", back: "My ideal house would have…" },
    ],
    mustKnow: [
      "I can say what kind of home I live in: *Vivo en un piso / una casa / un chalet…*",
      "I can use *vivo, vives, vive* and ask *¿Dónde vives?* and *¿Vives en una casa o en un piso?*",
      "I can choose *un* or *una* correctly for types of home and rooms.",
      "I can say where my home is with *está en…* (*el centro, las afueras, el campo, la costa, la montaña, un pueblo, una ciudad*).",
      "I can use *cerca de* and *lejos de*, contracting *de + el* to *del*.",
      "I can explain why location uses *está* but description uses *es*.",
      "I can name at least ten rooms with *el* or *la*, and make them plural.",
      "I can say what there is in my home with *hay* and *tiene*, counting rooms up to 20.",
      "I can say what is upstairs and downstairs, and which floor a room is on.",
      "I can describe my home with adjectives that agree, placed after the noun, with an intensifier.",
      "I can say what colour rooms are, making the colour agree.",
      "I can describe my dream home with *Me gustaría vivir en…* and *Mi casa ideal tendría…* plus a reason.",
    ],
    misconceptions: [
      { wrong: "*Mi casa es en el campo.*", right: "*Mi casa **está** en el campo.* — location uses *estar*." },
      { wrong: "*Vivo en un casa.*", right: "*Vivo en **una** casa.* — *casa* is feminine." },
      { wrong: "*Está cerca de el colegio.*", right: "*Está cerca **del** colegio.* — *de + el* always contracts." },
      { wrong: "*No hay un jardín.*", right: "*No hay jardín.* — after *no hay*, normally drop *un/una*." },
      { wrong: "*Vivo en un moderno piso.*", right: "*Vivo en un piso moderno.* — adjectives usually go after the noun." },
      { wrong: "*La cocina es demasiada pequeña.*", right: "*La cocina es demasiado pequeña.* — intensifiers never agree." },
      { wrong: "*dos salónes*", right: "*dos salones* — the accent disappears in the plural." },
      { wrong: "*Me gustaría vivo en la costa.*", right: "*Me gustaría vivir en la costa.* — use the infinitive after *gustaría*." },
    ],
    examMistakes: [
      "Writing *Mi casa es en…* for location — it must be *está*.",
      "Answering *¿Dónde vives?* with *Vives en…* — change to the *yo* form: *Vivo en…*",
      "Missing accents on *salón, jardín, balcón, cómodo, dieciséis* and *¿Dónde?*",
      "Adding an accent in the plural: *salónes, jardínes* instead of *salones, jardines*.",
      "Forgetting agreement: *una casa moderno*, *las paredes azul*.",
      "Writing *cerca de el* instead of *cerca del*.",
      "Putting the adjective first, English-style: *una grande casa* instead of *una casa grande*.",
      "Using *librería* for 'library' — it means bookshop; a library is *una biblioteca*.",
    ],
    mnemonics: [
      {
        topic: "es vs está",
        device: "How you feel and where you are — that's when you use *estar*.",
        explanation: "Location (and how you feel) → *estar*. Your house *está* somewhere; what it is like → *es*.",
      },
      {
        topic: "hay",
        device: "*Hay* sounds like 'eye': look around — what can your eye see?",
        explanation: "*Hay* (pronounced like English 'eye') = there is / there are: what you see in a room. *Hay una cama, hay dos sillas.*",
      },
      {
        topic: "de + el",
        device: "DEL = De + EL, Locked together.",
        explanation: "Whenever *de* meets *el*, they lock into *del*: *cerca del parque, lejos del centro*. *De la* never locks.",
      },
      {
        topic: "-ría = would",
        device: "Add *-ría*, dream away: *gustaría, tendría, viviría*.",
        explanation: "A verb ending in *-ría* usually means 'would': perfect for dream-home sentences.",
      },
    ],
    realWorld: [
      {
        title: "Mi casa es tu casa",
        detail:
          "Spanish speakers say *Mi casa es tu casa* ('my house is your house') to make a guest feel at home. You'll hear it on an exchange — and you can say it when your Spanish partner visits you in Singapore.",
        emoji: "🏡",
      },
      {
        title: "Flat-hunting in Spain",
        detail:
          "Spanish property adverts list a *piso* by its number of *dormitorios* and *baños*, and say whether it has a *terraza*, *ascensor* or *garaje* and whether it is *luminoso*. Read one and you'll recognise most of the words in this topic.",
        emoji: "🔑",
      },
      {
        title: "Urbanizaciones are condos",
        detail:
          "Many Spanish families live in an *urbanización*: a group of flats or houses sharing a pool and gardens — very like a Singapore condo. *Vivo en un piso en una urbanización con piscina.*",
        emoji: "🏊",
      },
      {
        title: "Planta baja vs Level 1",
        detail:
          "In a Spanish lift the ground floor is usually marked *0* or *B* (*bajo*), and the *primera planta* is one floor up. In an HDB block the ground floor (the void deck) is Level 1 — so Level 5 in Singapore is the *cuarta planta* in Spain.",
        emoji: "🛗",
      },
      {
        title: "Casas cueva",
        detail:
          "In Guadix, near Granada, people still live in *casas cueva* — homes dug into the soft hillside, with whitewashed fronts and chimneys poking out of the ground. They stay cool in summer and warm in winter.",
        emoji: "⛰️",
      },
    ],
    videos: [
      { title: "Rooms of the house in Spanish", channel: "Señor Jordan", url: "https://www.youtube.com/results?search_query=senor+jordan+rooms+of+the+house+spanish" },
      { title: "Where I live in Spanish", channel: "Language Gym", url: "https://www.youtube.com/results?search_query=language+gym+spanish+where+i+live+house" },
      { title: "Ser vs estar for location", channel: "Spanish with Profe", url: "https://www.youtube.com/results?search_query=ser+vs+estar+location+spanish+lesson" },
      { title: "Adjective agreement in Spanish", channel: "Butterfly Spanish", url: "https://www.youtube.com/results?search_query=butterfly+spanish+adjective+agreement" },
      { title: "Mi casa (comprehensible input)", channel: "Dreaming Spanish", url: "https://www.youtube.com/results?search_query=dreaming+spanish+mi+casa+beginner" },
    ],
    formulas: [
      { name: "Type of home", formula: "vivo en + un/una + type of home", note: "Vivo en un piso en Singapur." },
      { name: "Location", formula: "(mi casa) está en + el/la/las/un/una + place", note: "Mi casa está en las afueras de Sevilla." },
      { name: "Near / far", formula: "cerca de / lejos de + noun (de + el = del)", note: "Mi piso está cerca del colegio." },
      { name: "What there is", formula: "hay / tiene + un/una/number + room", note: "En mi casa hay tres dormitorios." },
      { name: "Description", formula: "noun + es/son + (intensifier) + agreeing adjective", note: "La cocina es bastante pequeña." },
      { name: "Dream home", formula: "Me gustaría vivir en… / Mi casa ideal tendría… + porque…", note: "Me gustaría vivir en la costa porque me encanta el mar." },
    ],
  },
};
