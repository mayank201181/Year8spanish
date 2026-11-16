import type { TopicExtras } from "../types.ts";

export const extras: TopicExtras = {
  hook:
    "Most people in Spain live in a *piso* — a flat — just like most people in Singapore. But some Spaniards live in caves, and in Córdoba neighbours compete every May for the most beautiful flower-filled courtyard in town.",
  didYouKnow: [
    "*Mi casa es tu casa* ('my house is your house') is an everyday Spanish way of welcoming a guest — so well known that English speakers borrowed it.",
    "The word for a flat changes across the Spanish-speaking world: *piso* in Spain, *departamento* in Mexico, Argentina and Chile, and *apartamento* in countries such as Colombia and Venezuela.",
    "In Spain most people live in flats rather than houses — very different from the UK, where houses are the norm.",
    "Many older buildings in Spanish cities such as Barcelona have extra floors called the *entresuelo* and the *principal* between the ground floor and the *primero* — so a 'first-floor' flat can be three storeys up!",
    "The Latin word *casa* originally meant a hut or cottage. The 'proper' Latin word for a house was *domus*, which lives on in Spanish words such as *doméstico* and *domicilio* (home address).",
    "In Guadix, near Granada, many families still live in *casas cueva* — cave houses dug into the hillside. The rock keeps them at a steady, comfortable temperature all year round.",
  ],
  activities: [
    {
      title: "Sticky-note house tour",
      emoji: "🏷️",
      materials: ["Sticky notes", "A pen", "A phone to record yourself (optional)"],
      steps: [
        "Write the Spanish name of each room in your home on a sticky note, with *el* or *la*: *la cocina, el salón, el cuarto de baño…*",
        "Stick each note on the right door. Check the gender and the accents on *salón, jardín, balcón*.",
        "Give someone at home a one-minute tour in Spanish: *Esta es la cocina. Es bastante pequeña pero muy luminosa. Este es el salón…*",
        "Finish with where your home is and what it has: *Vivo en un piso en… Está cerca de… Hay tres dormitorios…*",
        "Record the tour and listen back: did every adjective agree with its room?",
      ],
      maths:
        "Room vocabulary with *el/la*; *hay* and *tiene*; *está* for location; *es* + agreeing adjectives with intensifiers.",
    },
    {
      title: "Design your dream home",
      emoji: "✏️",
      materials: ["Paper", "Coloured pencils", "A ruler"],
      steps: [
        "Draw a floor plan of your dream home with a *planta baja* and a *primera planta* — or one very tall flat with a pool on the *azotea*.",
        "Label every room and feature in Spanish: *la piscina, la sala de juegos, el balcón…*",
        "Colour the rooms and write the colour next to each one, making it agree: *la cocina amarilla, el salón azul, los dormitorios blancos*.",
        "Write a four-sentence 'estate agent' description: *Me gustaría vivir en… Mi casa ideal tendría… En la planta baja hay… porque…*",
        "Read it aloud while someone at home points to each room as you name it.",
      ],
      maths:
        "*Me gustaría vivir en…* and *Mi casa ideal tendría…* as chunks; *hay*; *la planta baja / la primera planta*; colour agreement; justifying with *porque*.",
    },
  ],
  bonusDiagrams: [
    {
      title: "Which floor? Spain vs Singapore",
      svg: `<svg viewBox="0 0 480 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two four-storey buildings side by side. In Spain the floors from the bottom are planta baja, primera planta, segunda planta and tercera planta. In Singapore the same floors are Level 1, Level 2, Level 3 and Level 4"><rect x="0" y="0" width="480" height="260" fill="#ffffff"/><text x="120" y="20" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#1f2937" font-weight="bold">España</text><text x="360" y="20" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#1f2937" font-weight="bold">Singapur</text><rect x="60" y="30" width="120" height="45" fill="#c7d2fe" stroke="#334155" stroke-width="2"/><rect x="60" y="75" width="120" height="45" fill="#c7d2fe" stroke="#334155" stroke-width="2"/><rect x="60" y="120" width="120" height="45" fill="#c7d2fe" stroke="#334155" stroke-width="2"/><rect x="60" y="165" width="120" height="45" fill="#fde68a" stroke="#334155" stroke-width="2"/><text x="120" y="57" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">tercera planta</text><text x="120" y="102" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">segunda planta</text><text x="120" y="147" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">primera planta</text><text x="120" y="192" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">planta baja (0)</text><rect x="300" y="30" width="120" height="45" fill="#bbf7d0" stroke="#334155" stroke-width="2"/><rect x="300" y="75" width="120" height="45" fill="#bbf7d0" stroke="#334155" stroke-width="2"/><rect x="300" y="120" width="120" height="45" fill="#bbf7d0" stroke="#334155" stroke-width="2"/><rect x="300" y="165" width="120" height="45" fill="#fde68a" stroke="#334155" stroke-width="2"/><text x="360" y="57" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">Level 4</text><text x="360" y="102" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">Level 3</text><text x="360" y="147" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">Level 2</text><text x="360" y="192" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">Level 1</text><line x1="180" y1="52" x2="300" y2="52" stroke="#334155" stroke-dasharray="4 4"/><line x1="180" y1="97" x2="300" y2="97" stroke="#334155" stroke-dasharray="4 4"/><line x1="180" y1="142" x2="300" y2="142" stroke="#334155" stroke-dasharray="4 4"/><line x1="180" y1="187" x2="300" y2="187" stroke="#334155" stroke-dasharray="4 4"/><line x1="30" y1="210" x2="450" y2="210" stroke="#334155" stroke-width="2"/><text x="240" y="235" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#334155">the ground floor (yellow) is 0 in Spain but Level 1 in Singapore</text></svg>`,
      caption:
        "The same storey, two numbers: Level 3 of an HDB block is the *segunda planta* in Spain. Remember this before you tell your exchange partner which floor you live on!",
    },
  ],
  history: {
    title: "The flower-filled patios of Córdoba",
    story:
      "In Córdoba, in southern Spain, summer afternoons often climb above 40 °C. For centuries, families there built their homes around a *patio* — an open courtyard in the middle of the house, often with a well or a fountain. Shade and water kept the rooms around it cooler, an idea used by the Romans and later by the Moors, who ruled Córdoba for about five hundred years. Over time, people began to cover the whitewashed walls of their patios with hundreds of pots of geraniums and other flowers. In 1921 the city held its first competition for the most beautiful patio, and the *Fiesta de los Patios* still takes place every May, when owners open their doors to visitors. In 2012 UNESCO added the festival to its list of the Intangible Cultural Heritage of Humanity.",
  },
};
