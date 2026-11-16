import type { TopicExtras } from "../types.ts";

export const extras: TopicExtras = {
  hook:
    "In Spanish you don't really 'like' your neighbourhood — your neighbourhood 'pleases' you. Crack that one idea and *me gusta*, *le gusta* and *les gustan* stop looking random.",
  didYouKnow: [
    "*Pueblo* means both 'village' and 'a people': *el pueblo de mis abuelos* is my grandparents' village, but *el pueblo español* is the Spanish people.",
    "Spanish has a special word (a *gentilicio*) for people from almost every place: *madrileño* (Madrid), *sevillano* (Sevilla), *malagueño* (Málaga), *barcelonés* (Barcelona) — and someone from Singapore is *singapurense*.",
    "Madrid stands on a high central plateau, *la Meseta*, roughly 650 metres above sea level. That's one reason its winters can be cold, while Málaga, on the Mediterranean coast, stays mild.",
    "*Me chifla* ('I'm crazy about it') is colloquial Spanish from Spain. *Me encanta* is understood everywhere in the Spanish-speaking world, so it's the safe choice.",
    "Spaniards talk about *la España vaciada* ('emptied Spain'): large inland areas whose villages have lost much of their population as people moved to the cities and the coast.",
    "As in Singapore, most people in Spanish cities live in flats (*pisos*) in apartment blocks rather than in houses with gardens.",
  ],
  activities: [
    {
      title: "Opinion walk",
      emoji: "🚶",
      materials: ["A notebook or your phone", "Your neighbourhood (or the view from a window)"],
      steps: [
        "Walk round your block or look out of the window and pick five places: the hawker centre, the MRT station, the park, the shops, the playground.",
        "For each one, say an opinion aloud in Spanish with a reason: *Me encanta el parque porque es tranquilo.*",
        "Use a different reason verb each time: *es*, *hay*, *tiene*, *está*.",
        "Write your best three sentences down and check every adjective ending against its noun.",
      ],
      maths: "Opinions with me gusta / me gustan / me encanta + porque es / hay / tiene / está, and adjective agreement.",
    },
    {
      title: "Family survey: ¿ciudad, campo o costa?",
      emoji: "📋",
      materials: ["Paper and a pen", "Two or three family members or friends"],
      steps: [
        "Ask each person (in English if they don't speak Spanish): would you rather live in the city, the countryside or on the coast — and why?",
        "Write each answer in Spanish in the third person: *A mi madre le encanta la costa porque es bonita. Mi padre prefiere el campo.*",
        "Add one comparison from their reasons: *Para mi hermano, la ciudad es más animada que el campo.*",
        "Finish with your own plan: *En el futuro voy a vivir en… porque va a ser…*",
      ],
      maths: "Reporting other people's opinions (le / les gusta, piensa que, prefiere), comparatives and the immediate future.",
    },
  ],
  bonusDiagrams: [
    {
      title: "¿Dónde vives?",
      svg: `<svg viewBox="0 0 480 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A landscape labelled la montaña, el pueblo, el campo, la ciudad, la costa and el mar"><rect x="0" y="0" width="480" height="240" fill="#ffffff"/><rect x="0" y="180" width="410" height="16" fill="#bbf7d0" stroke="#334155"/><rect x="410" y="170" width="70" height="26" fill="#bae6fd" stroke="#334155"/><polygon points="10,180 80,62 150,180" fill="#c7d2fe" stroke="#334155"/><text x="80" y="50" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">la montaña</text><rect x="160" y="164" width="18" height="16" fill="#fde68a" stroke="#334155"/><polygon points="157,164 169,152 181,164" fill="#fecaca" stroke="#334155"/><rect x="186" y="164" width="18" height="16" fill="#fde68a" stroke="#334155"/><polygon points="183,164 195,152 207,164" fill="#fecaca" stroke="#334155"/><rect x="212" y="164" width="18" height="16" fill="#fde68a" stroke="#334155"/><polygon points="209,164 221,152 233,164" fill="#fecaca" stroke="#334155"/><text x="195" y="140" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">el pueblo</text><rect x="261" y="158" width="8" height="22" fill="#fde68a" stroke="#334155"/><circle cx="265" cy="148" r="14" fill="#bbf7d0" stroke="#334155"/><text x="265" y="124" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">el campo</text><rect x="305" y="110" width="22" height="70" fill="#c7d2fe" stroke="#334155"/><rect x="330" y="90" width="24" height="90" fill="#c7d2fe" stroke="#334155"/><rect x="357" y="125" width="24" height="55" fill="#c7d2fe" stroke="#334155"/><text x="343" y="78" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">la ciudad</text><line x1="410" y1="158" x2="410" y2="170" stroke="#334155"/><text x="410" y="150" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">la costa</text><text x="445" y="188" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">el mar</text><text x="240" y="222" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#334155">¿Dónde vives? Vivo en la ciudad / en el campo / en la costa…</text></svg>`,
      caption: "Where do you live? Notice the preposition is always *en*: *en la costa* (on the coast), *en la montaña* (in the mountains), *en el campo* (in the countryside).",
    },
  ],
  history: {
    title: "¡Teruel existe! — the province that refused to be forgotten",
    story:
      "Teruel, in Aragón, is one of the least populated provinces in Spain. For decades many young people left its villages to find work in cities such as Madrid, Zaragoza and Valencia — part of what Spaniards now call *la España vaciada*, 'emptied Spain'. In 1999 local people set up a citizens' movement with a deliberately cheeky name: *Teruel Existe*, 'Teruel exists', because they felt the rest of the country had forgotten them. They campaigned for better roads, trains and public services. Twenty years later, in the general election of November 2019, *Teruel Existe* stood for election for the first time and won a seat in the Spanish parliament. A protest about where people live — and whether they can stay there — had become a voice in Madrid.",
  },
};
