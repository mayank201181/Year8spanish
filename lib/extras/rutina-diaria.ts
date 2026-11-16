import type { TopicExtras } from "../types.ts";

export const extras: TopicExtras = {
  hook:
    "In Spain the afternoon can last until nine at night, and dinner often starts after nine. Learn to tell your day hour by hour in Spanish — and you'll be ready to live on Spanish time.",
  didYouKnow: [
    "*Mañana* means both 'tomorrow' and 'morning' — so 'tomorrow morning' is *mañana por la mañana*.",
    "Spanish has a single verb for getting up early: *madrugar*. A well-known proverb says *A quien madruga, Dios le ayuda* — roughly 'the early bird catches the worm'.",
    "The word *siesta* comes from the Latin *sexta hora*, 'the sixth hour'. Counted from dawn, the sixth hour falls around midday — the hottest part of the day.",
    "Times use *la* and *las* because the feminine word *hora* (hour) is hidden in the phrase: *son las (horas) tres*.",
    "Spanish has a special word for the hours after midnight, *la madrugada*: 3 a.m. is *las tres de la madrugada*, not *de la noche*.",
    "Many Spanish families eat the main meal, *la comida*, at around 2 p.m. and *la cena* at 9 p.m. or later — so children fill the gap with *la merienda*.",
  ],
  activities: [
    {
      title: "Label your morning",
      emoji: "🏷️",
      materials: ["Sticky notes", "A pen", "A clock or phone"],
      steps: [
        "Write one routine phrase on each sticky note: *me despierto, me levanto, me ducho, me lavo los dientes, me visto, desayuno, salgo de casa*.",
        "Stick each note where the action happens: *me despierto* by your alarm, *me ducho* on the bathroom door, *me lavo los dientes* by your toothbrush, *me visto* on the wardrobe, *desayuno* on the fridge.",
        "For one week, say the phrase aloud with the time every time you do the action: *Son las seis y media: me levanto.*",
        "At the weekend, take the notes down, put them in order and tell your whole morning using sequencers: *Primero…, luego…, después…, finalmente…*",
      ],
      maths: "Reflexive verbs in the *yo* form (*me levanto, me ducho*), telling the time, and sequencers.",
    },
    {
      title: "Family routine detective",
      emoji: "🕵️",
      materials: ["Paper", "A pen", "Two family members to interview"],
      steps: [
        "Ask two people at home when they wake up, leave home, have dinner and go to bed. Note the times.",
        "Write five sentences about them in Spanish, in the third person: *Mi madre se levanta a las seis y cuarto. Mis abuelos se acuestan a las diez.*",
        "Add two comparisons with yourself: *Mi padre se acuesta más tarde que yo. Yo desayuno a las siete, mientras que mi hermana desayuna en el colegio.*",
        "Read your report aloud at dinner. Can they recognise their own routine — and correct your times?",
      ],
      maths: "Third-person reflexive verbs (*se levanta, se acuestan*), boot verbs, and comparing with *más tarde que, pero, mientras que*.",
    },
  ],
  bonusDiagrams: [
    {
      title: "Horario típico en España",
      svg: `<svg viewBox="0 0 480 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Timeline from 6:00 to 23:00 showing typical Spanish meal times: el desayuno 7:30, la comida 14:00, la merienda 17:30, la cena 21:00"><rect x="0" y="0" width="480" height="160" fill="#ffffff"/><line x1="30" y1="90" x2="450" y2="90" stroke="#1f2937" stroke-width="3"/><g font-family="sans-serif" text-anchor="middle"><line x1="30" y1="84" x2="30" y2="96" stroke="#1f2937" stroke-width="2"/><text x="30" y="114" font-size="11" fill="#334155">6:00</text><line x1="129" y1="86" x2="129" y2="94" stroke="#1f2937"/><text x="129" y="114" font-size="11" fill="#334155">10:00</text><line x1="228" y1="86" x2="228" y2="94" stroke="#1f2937"/><text x="228" y="114" font-size="11" fill="#334155">14:00</text><line x1="327" y1="86" x2="327" y2="94" stroke="#1f2937"/><text x="327" y="114" font-size="11" fill="#334155">18:00</text><line x1="450" y1="84" x2="450" y2="96" stroke="#1f2937" stroke-width="2"/><text x="450" y="114" font-size="11" fill="#334155">23:00</text><circle cx="67" cy="90" r="7" fill="#fde68a" stroke="#1f2937"/><text x="67" y="44" font-size="12" font-weight="bold" fill="#1f2937">el desayuno</text><text x="67" y="62" font-size="11" fill="#334155">7:30</text><circle cx="228" cy="90" r="7" fill="#bbf7d0" stroke="#1f2937"/><text x="228" y="44" font-size="12" font-weight="bold" fill="#1f2937">la comida</text><text x="228" y="62" font-size="11" fill="#334155">14:00</text><circle cx="314" cy="90" r="7" fill="#fecaca" stroke="#1f2937"/><text x="314" y="44" font-size="12" font-weight="bold" fill="#1f2937">la merienda</text><text x="314" y="62" font-size="11" fill="#334155">17:30</text><circle cx="401" cy="90" r="7" fill="#c7d2fe" stroke="#1f2937"/><text x="401" y="44" font-size="12" font-weight="bold" fill="#1f2937">la cena</text><text x="401" y="62" font-size="11" fill="#334155">21:00</text><text x="240" y="144" font-size="12" fill="#1f2937">Typical times only — every family is different.</text></g></svg>`,
      caption:
        "Typical meal times in Spain. Lunch (*la comida*) is the main meal, and dinner (*la cena*) is usually much later than in the UK or Singapore.",
    },
  ],
  history: {
    title: "The day Spain changed its clocks",
    story:
      "Look at a map: Madrid lies west of London, and Galicia, in the north-west, is further west still. Yet Spain's clocks are one hour ahead of the UK's. In 1940 the Spanish government moved the clocks forward to match Germany and much of Europe — and they were never moved back.\n\nSo by the clock, the Spanish sun rises and sets late: on summer evenings it can stay light until after half past nine. Some experts think this helps explain why people in Spain eat dinner and go to bed so late. The Canary Islands, out in the Atlantic, run one hour behind the mainland — which is why Spanish radio says *Son las ocho, las siete en Canarias*.\n\nSingapore has a similar story: in 1982 it moved its clocks forward half an hour to match Malaysia. That's why your sunrise comes at around seven.",
  },
};
