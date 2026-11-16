import type { TopicExtras } from "../types.ts";

export const extras: TopicExtras = {
  hook:
    "Ask someone in Spain the way and the answer nearly always starts with *todo recto* — 'all straight'. By the end of this topic you'll understand the reply, not just the question.",
  didYouKnow: [
    "*Ayuntamiento* comes from the old Spanish verb *ayuntar*, 'to join together'. It first meant the meeting of a town's councillors, and the name later passed to the council and the building where they met.",
    "In Spain a city block is *una manzana* — the same word as 'apple'. In much of Latin America it's *una cuadra*, so directions there often count blocks: *a tres cuadras*.",
    "In Madrid's Puerta del Sol there is a plaque in the pavement marked *Kilómetro Cero*. Distances along Spain's main radial national roads are measured from this point.",
    "*Biblioteca* comes from Greek *biblion* ('book') and *thēkē* ('case' or 'store'), while *librería* (bookshop) comes from Latin *liber*, 'book'. Both are book words, which is why 'library' and *librería* are such easy false friends.",
    "Salamanca's Plaza Mayor, built in the 18th century, is one of the most famous squares in Spain — and, as in many Spanish towns, the *ayuntamiento* stands on one side of it.",
    "Barcelona's Eixample district, planned by the engineer Ildefons Cerdà in the mid-19th century, has blocks with their corners cut off (*chaflanes*), giving more space and a clearer view at every crossroads.",
  ],
  activities: [
    {
      title: "Treasure-map directions",
      emoji: "🗺️",
      materials: ["A large sheet of paper", "Coloured pens", "A small object to be the 'treasure'"],
      steps: [
        "Draw a town map with one main street, three side streets and at least eight places, each labelled in Spanish with *el* or *la*.",
        "Mark a start point and write *Estás aquí*.",
        "Secretly choose one place and write the directions to it in Spanish: *Sigue todo recto, toma la segunda calle a la izquierda… Está al lado del…*",
        "Read your directions aloud to someone at home. They trace the route with a finger and put the treasure where they think it is.",
        "Swap roles. Then rewrite your directions in the polite *usted* form (*siga, tome, gire, cruce*).",
      ],
      maths:
        "Giving and following directions with *tú* commands (*sigue, gira, toma, cruza*), ordinals agreeing with *calle* (*la primera, la segunda*), *a + el = al* and *de + el = del*.",
    },
    {
      title: "Mi barrio en Singapur",
      emoji: "🚇",
      materials: ["A map app or a short walk around your block", "A notebook", "A phone to record a voice note"],
      steps: [
        "List eight places within ten minutes of your home in Spanish, with articles (*la estación de metro, el centro comercial, el parque…*).",
        "Write five sentences with *hay* and *no hay*: *Cerca de mi casa hay un parque, pero no hay piscina.*",
        "Add how far each place is: *La estación de metro está a cinco minutos a pie.*",
        "Add one *se puede* sentence for three of the places: *En el centro comercial se puede ir de compras.*",
        "Record it as a one-minute voice note for an imaginary Spanish exchange partner. Listen back and check every *al* and *del*.",
      ],
      maths:
        "*hay / no hay* with *un, una, unos, unas*; location and distance with *está a … minutos a pie*; *se puede* + infinitive.",
    },
  ],
  bonusDiagrams: [
    {
      title: "Only 'el' gets squashed",
      svg: `<svg viewBox="0 0 360 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="a plus el becomes al; de plus el becomes del; a plus la stays a la with no change."><rect x="0" y="0" width="360" height="150" fill="#ffffff"/><rect x="20" y="12" width="50" height="30" rx="5" fill="#c7d2fe" stroke="#334155"/><text x="45" y="32" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#1f2937">a</text><text x="85" y="32" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#1f2937">+</text><rect x="100" y="12" width="50" height="30" rx="5" fill="#fde68a" stroke="#334155"/><text x="125" y="32" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#1f2937">el</text><text x="175" y="32" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#1f2937">→</text><rect x="200" y="12" width="70" height="30" rx="5" fill="#bbf7d0" stroke="#334155"/><text x="235" y="32" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#1f2937">al</text><text x="282" y="32" font-family="sans-serif" font-size="12" fill="#334155">al parque</text><rect x="20" y="60" width="50" height="30" rx="5" fill="#c7d2fe" stroke="#334155"/><text x="45" y="80" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#1f2937">de</text><text x="85" y="80" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#1f2937">+</text><rect x="100" y="60" width="50" height="30" rx="5" fill="#fde68a" stroke="#334155"/><text x="125" y="80" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#1f2937">el</text><text x="175" y="80" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#1f2937">→</text><rect x="200" y="60" width="70" height="30" rx="5" fill="#bbf7d0" stroke="#334155"/><text x="235" y="80" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#1f2937">del</text><text x="282" y="80" font-family="sans-serif" font-size="12" fill="#334155">del cine</text><rect x="20" y="108" width="50" height="30" rx="5" fill="#c7d2fe" stroke="#334155"/><text x="45" y="128" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#1f2937">a</text><text x="85" y="128" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#1f2937">+</text><rect x="100" y="108" width="50" height="30" rx="5" fill="#fecaca" stroke="#334155"/><text x="125" y="128" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#1f2937">la</text><text x="175" y="128" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#1f2937">→</text><rect x="200" y="108" width="70" height="30" rx="5" fill="#e5e7eb" stroke="#334155"/><text x="235" y="128" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#1f2937">a la</text><text x="282" y="128" font-family="sans-serif" font-size="12" fill="#334155">no change</text></svg>`,
      caption: "*a* and *de* join only with *el*: *voy al parque*, *al lado del cine* — but *voy a la playa*.",
    },
  ],
  history: {
    title: "Why so many Spanish-speaking cities have a plaza mayor",
    story:
      "In 1573 King Philip II of Spain signed a set of rules for founding new towns in the Americas, later gathered into the Laws of the Indies. They described a town built around a rectangular main square, the *plaza mayor*, with straight streets running out from it in a grid and the main church and government buildings on or near the square. Many settlers had already been laying out towns this way; the rules made the pattern official. That's why so many cities from Mexico to Chile still have a grand central square — the *Plaza de Armas* in Lima and Cuzco, the *Zócalo* in Mexico City — and why directions there so often mean counting blocks: *siga tres cuadras y doble a la derecha*.",
  },
};
