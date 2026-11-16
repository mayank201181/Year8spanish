import type { TopicGuide } from "../../types.ts";

export const guide: TopicGuide = {
  id: "la-ciudad",
  title: "En mi ciudad — Places in Town",
  strand: "My Town",
  icon: "🏙️",
  summary: "Name the places in town, say what there is, ask the way — and understand the answer.",
  intro:
    "This topic gets you round a Spanish town. You'll name the places (*el ayuntamiento, la biblioteca, el polideportivo…*), say what your town has with *hay*, ask *¿Por dónde se va al museo?* and follow the reply, say exactly where things are and how far away, and finish with *se puede* to say what you can do there.\n\nEvery section starts with a puzzle. Have a go before you read the answer — spotting the pattern yourself is what makes it stick.",
  guide: [
    // ------------------------------------------------------------------
    {
      id: "places-in-town",
      heading: "Places in town",
      discovery: {
        problem:
          "Before you look anything up, guess what these places are:\n\n    el museo · el hospital · el teatro · el estadio · el restaurante · la catedral\n\nNow try these — they're harder:\n\n    el ayuntamiento · la biblioteca · el polideportivo · la librería\n\nWhy were the first six so easy? One of the last four is a trap — which one, and what do you think it really means?",
        idea:
          "The first six are **cognates**: Spanish and English took them from the same Latin or Greek roots, so they look alike — museum, hospital, theatre, stadium, restaurant, cathedral.\n\nThe second group has to be learnt: *el ayuntamiento* = the town hall, *la biblioteca* = the library, *el polideportivo* = the sports centre (*poli-* 'many' + *deporte* 'sport').\n\nThe trap is *la librería*. It looks like 'library' but it is a **bookshop** (you buy a *libro* there). A word that looks familiar but means something else is called a **false friend**.",
      },
      body:
        "Learn every place **with its article** (*el* or *la*). The article tells you the gender, and the gender decides every word that agrees with it later (*un/una*, *al/a la*, *primero/primera*…).\n\n| Spanish | English | memory hook |\n|---|---|---|\n| el ayuntamiento | town hall | where the town 'gets together' |\n| la biblioteca | library | *biblio-* = book (Bible, bibliography) |\n| el polideportivo | sports centre | many sports |\n| la piscina | swimming pool | |\n| el centro comercial | shopping centre | commercial centre |\n| el mercado | market | |\n| la iglesia | church | |\n| el museo | museum | cognate |\n| el parque | park | cognate |\n| la estación de tren | train station | |\n| la estación de autobuses | bus station | |\n| el cine | cinema | |\n| el castillo | castle | |\n| la playa | beach | |\n| la plaza mayor | main square | |\n| el hospital | hospital | cognate |\n| el banco | bank | also means 'bench' |\n| las tiendas | shops | singular: *la tienda* |\n| el restaurante | restaurant | cognate |\n| el estadio | stadium | cognate |\n| el teatro | theatre | cognate |\n\n**Gender detective.** Most of the time the ending gives the gender away:\n\n- **-o → el**: *el museo, el mercado, el castillo, el estadio, el teatro, el banco*.\n- **-a → la**: *la piscina, la playa, la plaza, la iglesia, la biblioteca, la tienda*.\n- **-ción → la**: *la estación* (every *-ción* word is feminine).\n- **-e or a consonant → learn it**: *el cine, el parque, el restaurante, el hospital* but *la catedral*.\n- Watch the rebel: *el mapa* is masculine even though it ends in *-a*.\n\n**Two-word places.** The first noun is the real place and it sets the gender; the rest is just a label:\n\n- *la estación de autobuses* is feminine (it's a *station*), even though *autobuses* is masculine.\n- *el centro comercial*, *la plaza mayor*: the describing word comes **after** the noun, never *comercial centro*.\n\n**Words that trick you.**\n\n- *la librería* = bookshop; *la biblioteca* = library.\n- *el banco* = bank **and** bench: *Hay un banco en el parque* is probably a bench!\n- *el campo* = countryside, but also a sports pitch (*el campo de fútbol*).\n\n> In Singapore you'd say *la estación de metro* for an MRT station, and you'll certainly need *el centro comercial* — there's one on almost every stop.",
      workedExamples: [
        {
          title: "Gender detective",
          problem: "Give *el* or *la* for each place: *estación, castillo, playa, hospital, biblioteca, cine*.",
          steps: [
            "*estación* ends in *-ción* → always feminine → **la estación**.",
            "*castillo* ends in *-o* → **el castillo**.",
            "*playa* ends in *-a* → **la playa**.",
            "*hospital* ends in a consonant → no rule, learn it → **el hospital**.",
            "*biblioteca* ends in *-a* → **la biblioteca**.",
            "*cine* ends in *-e* → learn it → **el cine**.",
          ],
          answer: "*la estación, el castillo, la playa, el hospital, la biblioteca, el cine*",
          yourTurn: {
            question: "Write 'the sports centre' in Spanish, with the article.",
            answer: { type: "text", accept: ["el polideportivo"] },
            solution: "*Poli-* (many) + *deporte* (sport); it ends in *-o*, so it's masculine: **el polideportivo**.",
          },
        },
        {
          title: "Two-word places",
          problem: "Write 'the main square and the shopping centre' in Spanish.",
          steps: [
            "'Main square' → noun first, describer second: *plaza mayor*. *Plaza* ends in *-a* → *la plaza mayor*.",
            "'Shopping centre' → *centro comercial*. *Centro* ends in *-o* → *el centro comercial*.",
            "Join with *y*.",
          ],
          answer: "*la plaza mayor y el centro comercial*",
          yourTurn: {
            question: "Write 'the bus station' in Spanish, with the article.",
            answer: { type: "text", accept: ["la estación de autobuses", "la estación de autobús"] },
            solution: "The real place is the *estación* (feminine, *-ción*), so it's *la*: **la estación de autobuses**.",
          },
        },
      ],
      keyPoints: [
        "Learn every place with *el* or *la*.",
        "*-o* → *el*; *-a* → *la*; *-ción* → *la*; *-e* and consonants: learn them (*el cine, el hospital, la catedral*).",
        "In two-word places the first noun sets the gender: *la estación de autobuses*.",
        "Describing words go after the noun: *el centro comercial, la plaza mayor*.",
        "False friend: *la librería* = bookshop; library = *la biblioteca*.",
      ],
      whyItWorks:
        "Spanish grew out of Latin, and English borrowed thousands of Latin and Greek words through French and through scholars. So *museo*/museum, *teatro*/theatre and *hospital*/hospital are really the same word wearing different spelling.\n\nFalse friends happen when the two languages took the same root in different directions: Latin *liber* (book) gave Spanish *librería* (a place selling books) and English 'library' (a place lending them).\n\nIn *la estación de autobuses* the phrase *de autobuses* just says which kind of station it is — like 'bus' in 'bus station'. The station is still the thing you're talking about, so it keeps its own gender.",
      strategies: ["Spot the cognate", "Gender detective (el/la)", "Say it aloud"],
      thinkDeeper:
        "*Polideportivo* is built from *poli-* + *deporte*. Use word parts to guess these before checking: *el multicine*, *el aparcamiento* (from *aparcar*), *la zona peatonal* (think 'pedestrian'). What clues helped you most?",
    },
    // ------------------------------------------------------------------
    {
      id: "hay-un-una",
      heading: "Hay un, una, unos, unas…",
      discovery: {
        problem:
          "Compare these sentences:\n\n    En mi ciudad hay un parque.\n    En mi ciudad hay dos parques.\n    En mi ciudad hay una piscina y unas tiendas.\n    En mi ciudad no hay cine.\n\nDoes *hay* ever change? What changes instead? And what has disappeared in the last sentence?",
        idea:
          "*Hay* **never changes**: it means both 'there is' and 'there are'. What changes is the word after it — *un/una* for one, *unos/unas* for 'some', a number, *muchos/muchas*…\n\nAfter *no hay* the article usually disappears: *no hay cine* = 'there isn't a cinema' / 'there's no cinema'.",
      },
      body:
        "**Hay = there is / there are.** One word, never conjugated: *hay un parque*, *hay tres parques*. (Never *han* or *hayan*.)\n\nThe word after *hay* agrees with the place:\n\n| | masculine | feminine |\n|---|---|---|\n| a / one | hay un museo | hay una piscina |\n| some | hay unos museos | hay unas tiendas |\n| lots of | hay muchos museos | hay muchas tiendas |\n| several | hay varios parques | hay varias iglesias |\n| a number | hay dos cines | hay tres playas |\n\n- *Mucho* agrees too: *mucho tráfico* (singular — you can't count traffic), *muchos parques*, *muchas tiendas*.\n- *Muy* means 'very' and goes with adjectives, **never** before a noun: not *hay muy tiendas* but *hay muchas tiendas*.\n\n**Saying what there isn't.** Put *no* before *hay* and usually drop the article:\n\n    No hay cine.\n    No hay playa, pero hay una piscina.\n    No hay tiendas.\n\nStretch: to say 'not a single…' use *ningún* (masculine) / *ninguna* (feminine), always singular: *No hay ningún museo. No hay ninguna piscina.* Notice *ningún* drops its *-o* and gains an accent before a masculine noun.\n\n**Asking.** *¿Hay un banco por aquí?* (Is there a bank round here?) *¿Hay una farmacia cerca?* Replies:\n\n    Sí, hay uno en la plaza.\n    Sí, hay una al lado del cine.\n    No, no hay.\n\nWhen the noun isn't repeated, *un* becomes **uno**: *hay uno*, never *hay un*.\n\n**Plurals of places** — you need them after *hay muchos / varios / dos*:\n\n| rule | singular | plural |\n|---|---|---|\n| ends in a vowel → add **-s** | el parque, la tienda | los parques, las tiendas |\n| ends in a consonant → add **-es** | el hospital, el tren | los hospitales, los trenes |\n| *-ión* → *-iones*, accent goes | la estación | las estaciones |\n| *-ús* → *-uses*, accent goes | el autobús | los autobuses |\n| *-z* → *-ces* | la luz | las luces |\n| two-word place: both noun and adjective | el centro comercial | los centros comerciales |\n| place + *de* + label: only the first noun | la estación de tren | las estaciones de tren |\n\n**Hay or está?** *Hay* introduces something new (*a*, *some*, a number). *Está* tells you where one particular, already-known thing (*the*) is:\n\n    Hay un banco en la plaza.  (There's a bank in the square.)\n    El banco está en la plaza.  (The bank is in the square.)\n\nSo never say *hay el banco*.",
      workedExamples: [
        {
          title: "What there is and isn't",
          problem: "Say: 'In my town there are lots of shops but there isn't a cinema.'",
          steps: [
            "'There are' → *hay* (it never changes).",
            "'Lots of shops' → *tiendas* is feminine plural → *muchas tiendas*.",
            "'There isn't a cinema' → *no hay* + noun, no article → *no hay cine*.",
            "Join with *pero*.",
          ],
          answer: "*En mi ciudad hay muchas tiendas, pero no hay cine.*",
          yourTurn: {
            question: "Write 'there are some parks' in Spanish.",
            answer: { type: "text", accept: ["hay unos parques", "hay algunos parques"] },
            solution: "*Parque* is masculine, plural *parques*, so 'some' is *unos*: **Hay unos parques.** (*Hay algunos parques* is also correct.)",
          },
        },
        {
          title: "Making places plural",
          problem: "Write the plural of *la estación de tren* and of *el centro comercial*.",
          steps: [
            "*La estación de tren*: only the real place goes plural; *de tren* is a label. *Estación* → *estaciones* (add *-es*, and the accent drops).",
            "→ *las estaciones de tren*.",
            "*El centro comercial*: *comercial* is an adjective, so it agrees too: *centros* + *comerciales*.",
            "→ *los centros comerciales*.",
          ],
          answer: "*las estaciones de tren*; *los centros comerciales*",
          yourTurn: {
            question: "Write 'there are two hospitals' in Spanish.",
            answer: { type: "text", accept: ["hay dos hospitales", "hay 2 hospitales"] },
            solution: "*Hospital* ends in a consonant → add *-es*: **Hay dos hospitales.**",
          },
        },
      ],
      keyPoints: [
        "*Hay* = there is / there are — it never changes.",
        "*un/una* (a), *unos/unas* (some), *muchos/muchas* (lots of), *varios/varias* (several) agree with the noun.",
        "*No hay* + noun with no article: *no hay cine*.",
        "Stretch: *no hay ningún museo / ninguna piscina* — always singular.",
        "Plurals: vowel + *-s*, consonant + *-es*; *estación* → *estaciones* (accent goes).",
        "*Hay un banco* (new information) vs *el banco está…* (location of a known thing).",
      ],
      whyItWorks:
        "*Hay* comes from the verb *haber*, used here in a special 'impersonal' way: nobody is doing anything, Spanish is just announcing that something exists. Because there's no subject doing the action, there's nothing for the verb to agree with — so it stays as *hay* whether there's one park or ten.\n\nWhy does the accent vanish in *estaciones*? Words ending in a vowel, *-n* or *-s* are normally stressed on the second-to-last syllable. *es-ta-CIÓN* breaks that rule, so it needs a written accent to show the stress. *es-ta-CIO-nes* follows the rule naturally, so the accent isn't needed. The sound hasn't moved — only the spelling.\n\nAnd *no hay cine* drops the article because you're denying the whole category exists — just like English 'there's no cinema'.",
      strategies: ["Agreement check", "Look for the pattern", "Mind the accent", "Gender detective (el/la)"],
      thinkDeeper:
        "Why is the answer to *¿Hay un banco por aquí?* '*Sí, hay uno*' and not '*Sí, hay un*'? (Hint: what normally comes straight after *un*?) And when would a Spaniard say *No hay ningún cine* instead of just *No hay cine* — what extra feeling does it add?",
    },
    // ------------------------------------------------------------------
    {
      id: "directions",
      heading: "Directions: ¿Por dónde se va…?",
      discovery: {
        problem:
          "Look at the map. You're at the red dot, facing up the map. A friend tells you:\n\n    Sigue todo recto y toma la primera calle a la derecha. El cine está a la izquierda.\n\nFind the cinema. From that, work out what *derecha* and *izquierda* mean. Then explain the puzzle: the cinema is on the right-hand side of the map, so why does your friend say it's *a la izquierda*?",
        idea:
          "*Todo recto* = straight on, *la primera calle* = the first street, *a la derecha* = to the right, *a la izquierda* = to the left.\n\nAfter you turn right you're walking towards the right-hand edge of the map. Now your left hand points to the **top** of the map — and that's where the cinema is, next to the theatre. Directions are always given from the **walker's** point of view, not the map's.",
      },
      body:
        "**Asking the way.**\n\n- *¿Dónde está el museo?* — Where is the museum?\n- *¿Por dónde se va al museo?* / *¿Por dónde se va a la playa?* — How do I get to the museum / the beach? (literally 'Which way does one go to…?')\n- *¿Hay un banco por aquí?* — Is there a bank round here?\n- Start politely: *Perdona* (to a young person or friend) / *Perdone* (to an adult you don't know).\n\n**Giving directions.** Learn the *tú* form to use; recognise the *usted* form (the polite form for adults you don't know — you'll hear adults use it with each other and see it on signs).\n\n| English | tú (a friend) | usted (polite) |\n|---|---|---|\n| go straight on | sigue todo recto | siga todo recto |\n| turn right | gira a la derecha | gire a la derecha |\n| turn left | tuerce a la izquierda | tuerza a la izquierda |\n| take the first street | toma la primera calle | tome la primera calle |\n| cross the square | cruza la plaza | cruce la plaza |\n| cross the bridge | cruza el puente | cruce el puente |\n| go up / down the street | sube / baja la calle | suba / baje la calle |\n\n*Gira* and *tuerce* both mean 'turn' — use either. *Hasta* = as far as: *Sigue todo recto hasta la plaza.* *Al final de la calle* = at the end of the street.\n\n**Ordinal numbers** (first, second, third…) are adjectives, so they agree. *Calle* is feminine, so: *la primera calle, la segunda calle, la tercera calle*.\n\n| | masculine | feminine |\n|---|---|---|\n| 1st | primero (primer) | primera |\n| 2nd | segundo | segunda |\n| 3rd | tercero (tercer) | tercera |\n| 4th | cuarto | cuarta |\n| 5th | quinto | quinta |\n\n*Primero* and *tercero* lose their *-o* right before a masculine singular noun: *el primer semáforo* (the first traffic lights), *el tercer piso*. Written short: *1.ª calle*, *2.ª calle*.\n\n**tú or usted?** The *tú* command looks exactly like the *él/ella* present tense: *(él) sigue* → *¡sigue!*; *(ella) toma* → *¡toma!* The *usted* command swaps to the 'opposite' vowel: *-ar* verbs take *-e* (*tome, gire, cruce*), *-er/-ir* verbs take *-a* (*siga, tuerza, suba*). Spelling tweaks keep the sound: *cruza* → *cruce*, *sigue* → *siga*.\n\n**On the map** (start at the red dot, facing up):\n\n    —Perdona, ¿por dónde se va a la biblioteca?\n    —Sigue todo recto y toma la segunda calle a la izquierda. La biblioteca está a la derecha.\n\n    —Perdone, ¿por dónde se va al ayuntamiento?\n    —Siga todo recto hasta el final de la calle y cruce la plaza. El ayuntamiento está enfrente.\n\n> *Coge la segunda calle* (Spain) also means 'take the second street'. In much of Latin America *coger* has a rude slang meaning, so *toma* is the safe choice everywhere. In Latin America you'll also hear *dobla a la derecha* for 'turn right'.",
      diagram: `<svg viewBox="0 0 480 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Town map. A main street, calle Mayor, runs up the map from a red dot marked Estás aquí to the plaza mayor, with the ayuntamiento on the far side of the square. Three side streets cross it. First street: el banco on the corner on the left, el polideportivo up to the left, el teatro and el cine up to the right. Second street: la biblioteca up to the left. Third street: el parque below it on the right, el mercado above it on the right, opposite la iglesia. El centro comercial is on the right at the start."><rect x="0" y="0" width="480" height="320" fill="#ffffff"/><rect x="220" y="70" width="40" height="250" fill="#e5e7eb"/><rect x="0" y="100" width="480" height="18" fill="#e5e7eb"/><rect x="0" y="172" width="480" height="18" fill="#e5e7eb"/><rect x="0" y="244" width="480" height="18" fill="#e5e7eb"/><rect x="170" y="4" width="140" height="28" rx="3" fill="#fecaca" stroke="#334155"/><text x="240" y="23" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">el ayuntamiento</text><rect x="170" y="32" width="140" height="38" fill="#fde68a" stroke="#334155"/><text x="240" y="56" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">la plaza mayor</text><rect x="90" y="74" width="124" height="22" rx="3" fill="#c7d2fe" stroke="#334155"/><text x="152" y="89" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">la iglesia</text><rect x="266" y="74" width="124" height="22" rx="3" fill="#c7d2fe" stroke="#334155"/><text x="328" y="89" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">el mercado</text><rect x="30" y="124" width="130" height="42" rx="3" fill="#bae6fd" stroke="#334155"/><text x="95" y="149" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">la biblioteca</text><rect x="300" y="124" width="165" height="42" rx="3" fill="#bbf7d0" stroke="#334155"/><text x="382" y="149" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">el parque</text><rect x="30" y="196" width="150" height="42" rx="3" fill="#c7d2fe" stroke="#334155"/><text x="105" y="221" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">el polideportivo</text><rect x="270" y="196" width="80" height="42" rx="3" fill="#fde68a" stroke="#334155"/><text x="310" y="221" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">el teatro</text><rect x="362" y="196" width="100" height="42" rx="3" fill="#fecaca" stroke="#334155"/><text x="412" y="221" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">el cine</text><rect x="120" y="268" width="94" height="26" rx="3" fill="#c7d2fe" stroke="#334155"/><text x="167" y="285" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">el banco</text><rect x="266" y="268" width="150" height="40" rx="3" fill="#bae6fd" stroke="#334155"/><text x="341" y="292" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">el centro comercial</text><text x="6" y="113" font-family="sans-serif" font-size="11" fill="#334155">3.ª calle</text><text x="6" y="185" font-family="sans-serif" font-size="11" fill="#334155">2.ª calle</text><text x="6" y="257" font-family="sans-serif" font-size="11" fill="#334155">1.ª calle</text><text x="474" y="113" font-family="sans-serif" font-size="11" text-anchor="end" fill="#334155">3.ª calle</text><text x="474" y="185" font-family="sans-serif" font-size="11" text-anchor="end" fill="#334155">2.ª calle</text><text x="474" y="257" font-family="sans-serif" font-size="11" text-anchor="end" fill="#334155">1.ª calle</text><text x="240" y="145" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#334155" transform="rotate(-90 240 145)">calle Mayor</text><line x1="240" y1="298" x2="240" y2="278" stroke="#1f2937" stroke-width="2"/><polygon points="240,268 234,280 246,280" fill="#1f2937"/><circle cx="240" cy="305" r="7" fill="#ef4444" stroke="#1f2937"/><text x="214" y="314" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="end" fill="#1f2937">Estás aquí</text></svg>`,
      diagramCaption:
        "Start at the red dot (*Estás aquí*), facing up the map along *calle Mayor*. Remember: after you turn, 'left' and 'right' are your left and right, not the map's.",
      workedExamples: [
        {
          title: "Follow the map",
          problem: "From the red dot: *¿Por dónde se va a la biblioteca?*",
          steps: [
            "Walk up *calle Mayor*: *Sigue todo recto*.",
            "The library is on the second street, on the left of the map → *toma la segunda calle a la izquierda* (*calle* is feminine → *segunda*).",
            "Once you've turned left you're walking towards the left edge of the map, so the top of the map is on your **right** — and the library is above the street.",
            "→ *La biblioteca está a la derecha.*",
          ],
          answer: "*Sigue todo recto y toma la segunda calle a la izquierda. La biblioteca está a la derecha.*",
          yourTurn: {
            question:
              "Use the map. Start at the red dot and follow: *Sigue todo recto y toma la tercera calle a la derecha.* Which place is now **on your right**? Answer in Spanish.",
            answer: { type: "text", accept: ["el parque", "parque"] },
            solution:
              "Turning right at the third street, you walk towards the right edge of the map. Your right hand now points to the bottom of the map: **el parque**. (*El mercado* is on your left.)",
          },
        },
        {
          title: "Build an instruction",
          problem: "Tell a friend (tú): 'Go straight on as far as the square and take the first street on the right.'",
          steps: [
            "'Go straight on' → *sigue todo recto*.",
            "'As far as the square' → *hasta la plaza*.",
            "'Take' (tú) → *toma*; 'the first street' → *la primera calle* (feminine).",
            "'On the right' → *a la derecha*.",
          ],
          answer: "*Sigue todo recto hasta la plaza y toma la primera calle a la derecha.*",
          yourTurn: {
            question: "Write 'turn left' in Spanish, using the *tú* form.",
            answer: { type: "text", accept: ["gira a la izquierda", "tuerce a la izquierda", "dobla a la izquierda"] },
            solution: "*Girar* → *tú* command = *él* form: **gira a la izquierda** (or **tuerce a la izquierda**).",
          },
        },
        {
          title: "Make it polite",
          problem: "Change to the *usted* form: *Toma la primera calle a la derecha y sigue todo recto.*",
          steps: [
            "*Tomar* is an *-ar* verb → swap to *-e*: *toma* → *tome*.",
            "*Seguir* is an *-ir* verb → swap to *-a*: *sigue* → *siga* (the *u* is no longer needed before *a*).",
          ],
          answer: "*Tome la primera calle a la derecha y siga todo recto.*",
          yourTurn: {
            question: "Change *Cruza la plaza* to the *usted* (polite) form.",
            answer: { type: "text", accept: ["cruce la plaza"] },
            solution: "*Cruzar* is *-ar* → *-e*; *z* becomes *c* before *e*: **Cruce la plaza.**",
          },
        },
      ],
      keyPoints: [
        "Ask: *¿Por dónde se va al…/a la…?* or *¿Dónde está…?*",
        "*Sigue todo recto* (straight on), *gira/tuerce a la derecha/izquierda* (turn right/left).",
        "*Toma la primera/segunda/tercera calle* — ordinals agree with *calle*.",
        "*Cruza la plaza / el puente*; *al final de la calle*; *hasta* = as far as.",
        "*Primer/tercer* before a masculine noun: *el primer semáforo*.",
        "*tú* command = *él* form (*toma*); *usted* swaps the vowel (*tome, siga*).",
        "Left and right are always from the walker's point of view.",
      ],
      whyItWorks:
        "Why is the *tú* command the same as the *él* form? Think of it as describing what the person does: '(she) takes the first street' → 'take the first street!'. Spanish simply reuses the form it already has.\n\nThe *usted* form swaps to the 'opposite' vowel (*-ar* → *e*, *-er/-ir* → *a*). That swap is Spanish's way of marking a request rather than a statement — you'll meet the same forms again in Year 9 and beyond.\n\n*¿Por dónde se va?* uses impersonal *se* — 'which way does one go?' — the same *se* you'll use in *se puede*. It's not about you personally; it's about how anyone gets there.",
      strategies: ["Use context", "Check the subject", "Look for the pattern", "Translate back to check"],
      thinkDeeper:
        "You're outside the cinema and want to get back to the red dot. Give the directions in Spanish. Why does every 'right' in the original route become a 'left' on the way back — and is that always true for every turn?",
    },
    // ------------------------------------------------------------------
    {
      id: "location-and-distance",
      heading: "Where is it? Location & distance",
      discovery: {
        problem:
          "Compare:\n\n    El banco está al lado del museo.\n    El cine está al lado de la biblioteca.\n    Voy al parque.\n    Voy a la playa.\n\nWhy *del* and *al* in some sentences but *de la* and *a la* in others? Write your rule.",
        idea:
          "*a + el* squash together into **al**, and *de + el* squash into **del**. It only happens with *el* — never with *la*, *los* or *las*: *a la playa, de los museos*.\n\nThese are the only two contractions in Spanish, and they're compulsory: *a el parque* is always wrong.",
      },
      body:
        "**Use estar for location.** To say where a place is, use *está* (singular) or *están* (plural) — never *es*:\n\n    El museo está en el centro.\n    Las tiendas están en la plaza mayor.\n\n| | estar |\n|---|---|\n| yo | estoy |\n| tú | estás |\n| él / ella / usted | está |\n| nosotros/as | estamos |\n| vosotros/as | estáis |\n| ellos / ellas / ustedes | están |\n\n**Location phrases.**\n\n| Spanish | English | example |\n|---|---|---|\n| cerca de | near | cerca de la playa |\n| lejos de | far from | lejos del centro |\n| al lado de | next to | al lado del museo |\n| enfrente de | opposite | enfrente de la iglesia |\n| entre … y … | between … and … | entre el banco y la biblioteca |\n| en la esquina | on the corner | en la esquina de la calle |\n| delante de | in front of | delante del cine |\n| detrás de | behind | detrás del ayuntamiento |\n| a la derecha de / a la izquierda de | to the right / left of | a la izquierda del teatro |\n\nWith nothing after them, *cerca* and *lejos* lose the *de*: *Está cerca.* *Está muy lejos.* *Entre* never takes *de*.\n\n**The two contractions:**\n\n| | + el | + la | + los | + las |\n|---|---|---|---|---|\n| a | **al** | a la | a los | a las |\n| de | **del** | de la | de los | de las |\n\n**How far?** Put *a* before the distance:\n\n    Está a cinco minutos a pie.  (It's five minutes away on foot.)\n    Está a diez minutos en coche / en autobús / en metro.\n    Está a dos kilómetros.\n\n*A pie* (or *andando*) for walking, but *en* for vehicles: *en coche, en autobús, en tren, en bici*. To ask: *¿Está lejos?* *¿A qué distancia está?*\n\n**Going to places: ir a.** *Ir* is irregular — and the *a* contracts with *el* as usual:\n\n| | ir | example |\n|---|---|---|\n| yo | voy | Voy al cine. |\n| tú | vas | ¿Vas a la piscina? |\n| él / ella | va | Mi hermano va al polideportivo. |\n| nosotros/as | vamos | Vamos al centro comercial. |\n| vosotros/as | vais | ¿Vais a la playa? |\n| ellos / ellas | van | Mis padres van al mercado. |\n\nAsk where someone is going with *¿Adónde vas?* You can also look back: *Ayer fui al museo* (Yesterday I went to the museum).",
      diagram: `<svg viewBox="0 0 480 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A street with a side street on the right. Top row, left to right: el banco, el museo, la biblioteca on the corner. Bottom row, left to right: el cine, el parque, la iglesia. The museum is between the bank and the library; the park is opposite the museum."><rect x="0" y="0" width="480" height="260" fill="#ffffff"/><rect x="0" y="120" width="400" height="32" fill="#e5e7eb"/><rect x="400" y="0" width="32" height="260" fill="#e5e7eb"/><text x="208" y="20" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">el museo está entre el banco y la biblioteca</text><line x1="80" y1="30" x2="335" y2="30" stroke="#334155" stroke-width="1.5"/><line x1="80" y1="26" x2="80" y2="34" stroke="#334155" stroke-width="1.5"/><line x1="335" y1="26" x2="335" y2="34" stroke="#334155" stroke-width="1.5"/><rect x="20" y="54" width="120" height="60" rx="3" fill="#c7d2fe" stroke="#334155"/><text x="80" y="82" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">el banco</text><text x="80" y="100" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#334155">al lado del museo</text><rect x="148" y="54" width="120" height="60" rx="3" fill="#fde68a" stroke="#334155"/><text x="208" y="88" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">el museo</text><rect x="276" y="54" width="118" height="60" rx="3" fill="#bae6fd" stroke="#334155"/><text x="335" y="82" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">la biblioteca</text><text x="335" y="100" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#334155">en la esquina</text><line x1="208" y1="122" x2="208" y2="150" stroke="#1f2937" stroke-width="1.5"/><polygon points="208,116 203,125 213,125" fill="#1f2937"/><polygon points="208,156 203,147 213,147" fill="#1f2937"/><text x="216" y="140" font-family="sans-serif" font-size="11" fill="#1f2937">enfrente</text><rect x="20" y="158" width="120" height="60" rx="3" fill="#fecaca" stroke="#334155"/><text x="80" y="192" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">el cine</text><rect x="148" y="158" width="120" height="60" rx="3" fill="#bbf7d0" stroke="#334155"/><text x="208" y="186" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">el parque</text><text x="208" y="204" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#334155">enfrente del museo</text><rect x="276" y="158" width="118" height="60" rx="3" fill="#c7d2fe" stroke="#334155"/><text x="335" y="192" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">la iglesia</text></svg>`,
      diagramCaption:
        "*El museo está entre el banco y la biblioteca. El parque está enfrente del museo. La biblioteca está en la esquina. El cine está enfrente del banco.*",
      workedExamples: [
        {
          title: "Describe the street",
          problem: "Using the street diagram, say where the museum is, using *entre*.",
          steps: [
            "Location → *estar*: *El museo está…*",
            "*entre* + first place + *y* + second place (no *de* after *entre*).",
            "Keep each article: *el banco*, *la biblioteca*.",
          ],
          answer: "*El museo está entre el banco y la biblioteca.*",
          yourTurn: {
            question: "Write 'The park is opposite the museum' in Spanish.",
            answer: { type: "text", accept: ["el parque está enfrente del museo", "el parque está en frente del museo", "el parque está frente al museo"] },
            solution: "Location → *está*; 'opposite' → *enfrente de*; *de + el museo* → *del museo*: **El parque está enfrente del museo.**",
          },
        },
        {
          title: "How far away?",
          problem: "Say: 'The beach is ten minutes away by bus.'",
          steps: [
            "Location → *La playa está…*",
            "Distance needs *a* before it: *a diez minutos*.",
            "Vehicles take *en*: *en autobús*.",
          ],
          answer: "*La playa está a diez minutos en autobús.*",
          yourTurn: {
            question: "Write 'It's five minutes away on foot' in Spanish.",
            answer: {
              type: "text",
              accept: [
                "está a cinco minutos a pie",
                "está a 5 minutos a pie",
                "está a cinco minutos andando",
                "está a 5 minutos andando",
                "está a cinco minutos caminando",
                "está a 5 minutos caminando",
              ],
            },
            solution: "*Está* + *a* + distance + *a pie*: **Está a cinco minutos a pie** (or *andando*).",
          },
        },
        {
          title: "al or a la? del or de la?",
          problem: "Complete: *Voy ___ polideportivo y después ___ piscina, que está cerca ___ estadio.*",
          steps: [
            "*polideportivo* is masculine → *a + el* → *al*.",
            "*piscina* is feminine → *a la* (no contraction).",
            "*estadio* is masculine → *de + el* → *del*.",
          ],
          answer: "*Voy **al** polideportivo y después **a la** piscina, que está cerca **del** estadio.*",
          yourTurn: {
            question: "Fill the gap with one word: *Mi casa está cerca ___ centro comercial.*",
            answer: { type: "text", accept: ["del"] },
            solution: "*Centro* is masculine: *de + el* → **del**.",
          },
        },
      ],
      keyPoints: [
        "Location always uses *estar*: *está / están* — never *es*.",
        "*a + el = al*; *de + el = del*; no change with *la, los, las*.",
        "*cerca de / lejos de / al lado de / enfrente de / delante de / detrás de*; *entre … y …* (no *de*).",
        "*Está cerca* / *Está lejos* on their own drop the *de*.",
        "Distance: *está a cinco minutos a pie / en coche / en autobús*.",
        "*ir a* + place: *voy al cine, vamos a la playa*.",
      ],
      whyItWorks:
        "*al* and *del* exist because Spanish dislikes two vowels bumping into each other inside a quick phrase: *a el* and *de el* put two vowels side by side, so speakers ran them together — just as English turns 'do not' into 'don't'. In *a la* or *de los* a consonant sits between the vowels, so nothing needs to merge.\n\n*Estar* comes from Latin *stare*, 'to stand'. Where something stands is a question of position, so Spanish uses *estar* for location — even for a castle that has stood in the same spot for 800 years. It's about *where*, not about how permanent something is.",
      strategies: ["Gender detective (el/la)", "Look for the pattern", "Agreement check", "Translate back to check"],
      thinkDeeper:
        "Spanish uses *estar* for where a **building** is (*El estadio está en el centro*), but *ser* for where an **event** takes place: *El partido es en el estadio. La fiesta es en mi casa.* Why might Spanish treat an event differently from a building? Write one sentence of each kind about your own town.",
    },
    // ------------------------------------------------------------------
    {
      id: "what-you-can-do",
      heading: "Se puede… What you can do in town",
      discovery: {
        problem:
          "Read these:\n\n    En la playa se puede nadar.\n    En el centro comercial se puede ir de compras.\n    En el museo no se puede comer.\n\nWhat does *se puede* mean? What form is the verb that comes after it? How would you say 'you can't swim'?",
        idea:
          "*Se puede* = 'you can' / 'one can' — about people in general, not one particular 'you'. The verb after it stays in the **infinitive** (*nadar, ir, comer*).\n\nTo make it negative, *no* goes at the front: *no se puede nadar*.",
      },
      body:
        "**The frame:** place + *se puede* + infinitive.\n\n| Place | se puede… | meaning |\n|---|---|---|\n| en la piscina | nadar | swim |\n| en el centro comercial | ir de compras | go shopping |\n| en el polideportivo | jugar al baloncesto / hacer deporte | play basketball / do sport |\n| en el cine | ver una película | watch a film |\n| en el parque | pasear / montar en bici | go for a walk / ride a bike |\n| en la playa | tomar el sol | sunbathe |\n| en la biblioteca | leer / estudiar / sacar un libro | read / study / borrow a book |\n| en el museo | ver arte / aprender historia | see art / learn history |\n| en el estadio | ver un partido de fútbol | watch a football match |\n| en el teatro | ver una obra de teatro | see a play |\n| en el mercado | comprar fruta | buy fruit |\n| en el castillo | aprender sobre la historia | learn about the history |\n| en el restaurante | comer una paella de verduras | eat a vegetable paella |\n| en el banco | sacar dinero | take out money |\n\n**Can't:** *No se puede comer en la biblioteca.* Signs in Spain often say *Prohibido* + infinitive: *Prohibido fumar* (no smoking), *Prohibido bañarse* (no swimming).\n\n**Join it to hay with donde.** This is the sentence examiners love:\n\n    En mi ciudad hay un parque donde se puede montar en bici.\n    Hay una piscina enorme donde se puede nadar.\n    No hay cine, así que no se puede ver una película sin coger el autobús.\n\n> When a **plural** noun follows, careful writers make *poder* plural too: *se pueden ver muchos edificios antiguos*. To keep it simple, use *se puede* + infinitive + a singular thing, or an activity with no noun (*nadar, pasear, ir de compras*).\n\n**General vs personal.** *Se puede* is about anyone. To say what you or others can do, conjugate *poder* (o→ue, a boot verb) + infinitive:\n\n| | poder |\n|---|---|\n| yo | puedo |\n| tú | puedes |\n| él / ella | puede |\n| nosotros/as | podemos |\n| vosotros/as | podéis |\n| ellos / ellas | pueden |\n\n*En Singapur puedo ir al colegio en metro.* *¿Podemos ir a la playa?*\n\n**Recommending a place.**\n\n- *Te recomiendo el museo.* (I recommend the museum to you.)\n- *Te recomiendo visitar el castillo porque es muy interesante.*\n- *Si te gusta el arte, puedes visitar el museo.*\n- *Hay que ver la catedral.* (You have to see the cathedral — a strong recommendation.)",
      workedExamples: [
        {
          title: "Build the exam sentence",
          problem: "Say: 'In my town there is a sports centre where you can play basketball.'",
          steps: [
            "'In my town there is' → *En mi ciudad hay*.",
            "'a sports centre' → *un polideportivo* (masculine → *un*).",
            "'where you can' → *donde se puede*.",
            "'play basketball' → infinitive *jugar* + *al baloncesto* (*a + el*).",
          ],
          answer: "*En mi ciudad hay un polideportivo donde se puede jugar al baloncesto.*",
          yourTurn: {
            question: "Write 'In the park you can ride a bike' in Spanish.",
            answer: {
              type: "text",
              accept: [
                "en el parque se puede montar en bici",
                "en el parque se puede montar en bicicleta",
                "se puede montar en bici en el parque",
                "se puede montar en bicicleta en el parque",
                "en el parque se puede ir en bici",
                "en el parque se puede ir en bicicleta",
                "en el parque se puede andar en bici",
                "en el parque se puede andar en bicicleta",
              ],
            },
            solution: "*En el parque* + *se puede* + infinitive *montar en bici*: **En el parque se puede montar en bici.**",
          },
        },
        {
          title: "Can't",
          problem: "Say: 'You can't eat in the library.'",
          steps: [
            "Negative → *no* goes first: *no se puede*.",
            "Then the infinitive *comer*.",
            "Place: *en la biblioteca* — at the start or the end.",
          ],
          answer: "*En la biblioteca no se puede comer.* / *No se puede comer en la biblioteca.*",
          yourTurn: {
            question: "Write 'you can't swim' in Spanish (in general — use *se*).",
            answer: { type: "text", accept: ["no se puede nadar"] },
            solution: "*no* + *se puede* + infinitive: **No se puede nadar.**",
          },
        },
        {
          title: "Recommend a place",
          problem: "Recommend the castle to a friend and give a reason.",
          steps: [
            "Frame: *Te recomiendo* + infinitive + place: *Te recomiendo visitar el castillo*.",
            "Reason: *porque* + *es* + adjective: *porque es muy histórico*.",
            "Upgrade with *se puede*: *y desde allí se puede ver toda la ciudad*.",
          ],
          answer: "*Te recomiendo visitar el castillo porque es muy histórico y desde allí se puede ver toda la ciudad.*",
        },
      ],
      keyPoints: [
        "*se puede* + infinitive = you can (people in general).",
        "*no se puede* + infinitive = you can't.",
        "*hay un/una … donde se puede…* links two ideas into one strong sentence.",
        "*poder* (o→ue): *puedo, puedes, puede, podemos, podéis, pueden* + infinitive.",
        "Recommend: *te recomiendo* + noun or infinitive; *hay que* + infinitive.",
      ],
      whyItWorks:
        "*Se* makes the verb impersonal: nobody in particular is doing it, so *se puede* means 'it is possible (for anyone)'. English does the same with a general 'you' — 'you can swim at the beach' isn't about you personally.\n\nWhy the infinitive? It's the **two-verb rule**: when two verbs sit together, only the first one is conjugated and the second stays as the infinitive. You already use it: *me gusta nadar*, *voy a nadar*, *quiero nadar*, *puedo nadar* — and now *se puede nadar*.",
      strategies: ["Find the infinitive", "Build it up (extended sentence)", "Recycle a chunk", "Use context"],
      thinkDeeper:
        "*¿Por dónde se va?* and *se puede* both use *se*. What does *se* add in each one? Now invent three rules for a sign at your school using *no se puede* — and one using *se puede* that students would actually like.",
    },
  ],
  learn: {
    flashcards: [
      { front: "el ayuntamiento", back: "the town hall" },
      { front: "la biblioteca", back: "the library" },
      { front: "la librería", back: "the bookshop (false friend — not 'library')" },
      { front: "el polideportivo", back: "the sports centre" },
      { front: "el centro comercial", back: "the shopping centre" },
      { front: "la estación de autobuses", back: "the bus station" },
      { front: "la plaza mayor", back: "the main square" },
      { front: "No hay cine.", back: "There isn't a cinema." },
      { front: "¿Por dónde se va al museo?", back: "How do I get to the museum?" },
      { front: "Sigue todo recto.", back: "Go straight on. (tú)" },
      { front: "Gira a la izquierda.", back: "Turn left. (tú)" },
      { front: "Toma la segunda calle a la derecha.", back: "Take the second street on the right." },
      { front: "Cruza el puente.", back: "Cross the bridge." },
      { front: "al final de la calle", back: "at the end of the street" },
      { front: "enfrente de", back: "opposite" },
      { front: "Está a diez minutos a pie.", back: "It's ten minutes away on foot." },
      { front: "Se puede ir de compras.", back: "You can go shopping." },
      { front: "a + el = ?", back: "al — Voy al parque." },
      { front: "de + el = ?", back: "del — al lado del cine" },
      { front: "usted form of *sigue*", back: "siga — Siga todo recto." },
    ],
    mustKnow: [
      "I can name at least 20 places in town with the correct *el* or *la*.",
      "I can say what there is and isn't in a town with *hay* and *no hay*.",
      "I can use *un/una/unos/unas/muchos/muchas* correctly after *hay*.",
      "I can make places plural, including *estaciones* and *centros comerciales*.",
      "I can ask the way with *¿Dónde está…?* and *¿Por dónde se va al/a la…?*",
      "I can give and follow directions using *sigue todo recto, gira a la derecha/izquierda, toma la primera calle, cruza la plaza*.",
      "I can recognise the polite *usted* forms *siga, gire, tome, cruce*.",
      "I can say where a place is with *está* + *cerca de, lejos de, al lado de, enfrente de, entre, en la esquina*.",
      "I can use *al* and *del* correctly every time.",
      "I can say how far away something is: *está a cinco minutos a pie*.",
      "I can say what you can and can't do in town with *se puede / no se puede* + infinitive.",
      "I can recommend a place with a reason.",
    ],
    misconceptions: [
      { wrong: "*la librería* = the library.", right: "*la librería* = the bookshop; the library is *la biblioteca*." },
      { wrong: "*El museo es en el centro.*", right: "*El museo **está** en el centro.* — location always uses *estar*." },
      { wrong: "*Voy a el parque.* / *al lado de el cine*", right: "*Voy **al** parque.* / *al lado **del** cine* — *a + el* and *de + el* must contract." },
      { wrong: "*Hay el banco en la plaza.*", right: "*Hay **un** banco en la plaza* (new information) or *El banco **está** en la plaza* (a known bank)." },
      { wrong: "*Han muchas tiendas.*", right: "*Hay muchas tiendas.* — *hay* never changes for plurals." },
      { wrong: "*No hay un cine.*", right: "*No hay cine.* — after *no hay* the article is normally dropped." },
      { wrong: "*Toma la primero calle.*", right: "*Toma la **primera** calle.* — ordinals agree: *calle* is feminine." },
      { wrong: "*Se puede nado en la piscina.*", right: "*Se puede **nadar** en la piscina.* — the second verb stays in the infinitive." },
      { wrong: "*todo derecho* means 'turn right'.", right: "*todo derecho* means 'straight on' (like *todo recto*); 'right' is *a la derecha*." },
    ],
    examMistakes: [
      "Writing *comercial centro* (English word order) instead of *centro comercial*.",
      "Leaving out the accent: *estacion*, *autobus* — but remember the plurals *estaciones* and *autobuses* have no accent.",
      "Writing *a el* / *de el* instead of *al* / *del*.",
      "Using *es* for location (*la playa es cerca*) instead of *está*.",
      "Writing *muy tiendas* instead of *muchas tiendas*.",
      "Mixing up *derecha* (right) and *derecho/recto* (straight on).",
      "Forgetting *de* after *cerca, lejos, al lado, enfrente* when a place follows (*cerca la playa*).",
      "Conjugating the verb after *se puede*: *se puede nada* instead of *se puede nadar*.",
      "Forgetting the *a* before a distance: *está cinco minutos* instead of *está a cinco minutos*.",
    ],
    mnemonics: [
      {
        topic: "derecha vs izquierda",
        device: "Derecha = direct = right",
        explanation: "*Derecha* comes from Latin *directus* ('straight, direct') — think of the 'right' hand as the 'correct' one, just as English 'right' means both. *Izquierda* is the other one. Careful: from the same root, *todo derecho* means 'straight on', not 'right'.",
      },
      {
        topic: "al / del",
        device: "Only EL gets squashed",
        explanation: "*a* and *de* only join with *el*: *al, del*. *La, los, las* never get squashed.",
      },
      {
        topic: "librería vs biblioteca",
        device: "Buy a libro at the librería; borrow a book at the Bibl-ioteca",
        explanation: "*Librería* = shop selling *libros*. *Biblioteca* = library (*biblio-* = book, as in Bible).",
      },
      {
        topic: "usted commands",
        device: "Polite = opposite vowel",
        explanation: "*-ar* verbs switch to *e* (*tome, gire, cruce*); *-er/-ir* verbs switch to *a* (*siga, suba, tuerza*).",
      },
    ],
    realWorld: [
      {
        title: "Lost in Madrid",
        detail: "Around the Puerta del Sol the streets twist in every direction. *Perdone, ¿por dónde se va a la Plaza Mayor?* is a question you'll actually need — and the answer will almost always start with *Siga todo recto…*",
        emoji: "🗺️",
      },
      {
        title: "Map apps in Spanish",
        detail: "Switch your phone's maps to Spanish and the spoken directions use the verbs you've learnt — *girar, seguir, tomar* — with *a la derecha* and *a la izquierda*. Try it on the walk to school in Singapore.",
        emoji: "📱",
      },
      {
        title: "Signs everywhere",
        detail: "On Spanish beaches and in museums you'll see *Prohibido bañarse*, *Prohibido fumar* or *No se puede comer aquí* — the same infinitive pattern as *se puede*.",
        emoji: "🚫",
      },
      {
        title: "A Spanish exchange partner in Singapore",
        detail: "Describe your area: *Vivo cerca de la estación de metro. Hay un centro comercial enorme donde se puede comer y ver una película. Está a cinco minutos a pie.*",
        emoji: "🚇",
      },
      {
        title: "Latin American 'cuadras'",
        detail: "In much of Latin America a city block is *una cuadra*, so directions sound like *Siga dos cuadras y doble a la derecha.* In Spain a block is *una manzana*.",
        emoji: "🌎",
      },
    ],
    videos: [
      { title: "Places in town in Spanish", channel: "Señor Jordan", url: "https://www.youtube.com/results?search_query=se%C3%B1or+jordan+places+in+town+spanish" },
      { title: "Asking for and giving directions in Spanish", channel: "Spanish with Profe", url: "https://www.youtube.com/results?search_query=spanish+directions+sigue+todo+recto+gira+a+la+derecha" },
      { title: "Hay and places in my town", channel: "Language Gym", url: "https://www.youtube.com/results?search_query=spanish+en+mi+ciudad+hay+places+in+town" },
      { title: "Prepositions of place: al lado de, enfrente de, entre", channel: "Butterfly Spanish", url: "https://www.youtube.com/results?search_query=butterfly+spanish+prepositions+of+place" },
      { title: "Comprehensible input: a walk around a Spanish town", channel: "Dreaming Spanish", url: "https://www.youtube.com/results?search_query=dreaming+spanish+ciudad+beginner" },
    ],
    formulas: [
      { name: "There is / there are", formula: "hay + un / una / unos / unas / muchos / muchas + place", note: "En mi ciudad hay un castillo y muchas tiendas." },
      { name: "There isn't", formula: "no hay + place (no article)", note: "No hay cine." },
      { name: "Asking the way", formula: "¿Por dónde se va + al / a la + place?", note: "¿Por dónde se va a la estación?" },
      { name: "Directions (tú)", formula: "sigue todo recto · gira / tuerce a la derecha / izquierda · toma la 1.ª / 2.ª / 3.ª calle · cruza…", note: "Toma la primera calle a la izquierda y cruza la plaza." },
      { name: "Location", formula: "está + cerca de / lejos de / al lado de / enfrente de / entre … y … / en la esquina", note: "El banco está al lado del cine." },
      { name: "Distance", formula: "está a + time / distance + a pie / en coche / en autobús", note: "Está a diez minutos a pie." },
      { name: "Contractions", formula: "a + el = al · de + el = del", note: "Voy al parque, que está cerca del río." },
      { name: "What you can do", formula: "(place) + (no) se puede + infinitive", note: "En la piscina se puede nadar." },
    ],
  },
};
