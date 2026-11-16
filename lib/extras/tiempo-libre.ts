import type { TopicExtras } from "../types.ts";

export const extras: TopicExtras = {
  hook:
    "In English you *play* the guitar and *play* video games — in Spanish those are two completely different verbs. And when you say *me gusta*, you aren't really 'liking' anything at all: something is pleasing *you*.",
  didYouKnow: [
    "*Gustar* comes from the Latin *gustare*, 'to taste' — the same root as the English words 'gusto' and 'disgust'.",
    "The Spanish word for leisure, *el ocio*, comes from Latin *otium*. Its opposite, *el negocio* ('business'), comes from *nec otium* — literally 'not leisure'.",
    "The informal *me chifla* ('I'm crazy about it') is related to *chiflado*, Spanish slang for 'crazy' or 'nuts'.",
    "*Despacito*, a Spanish-language song by the Puerto Rican artists Luis Fonsi and Daddy Yankee, was the most-viewed video on YouTube for about three years after its release in 2017.",
    "The Spanish series *La casa de papel* (known in English as *Money Heist*) became one of Netflix's most-watched non-English-language series ever.",
    "*La tarde* covers both the afternoon and the evening, so in Spain people say *buenas tardes* until it gets dark — which in summer can be after 9 pm.",
  ],
  activities: [
    {
      title: "Mi agenda del fin de semana",
      emoji: "🗓️",
      materials: ["A sheet of paper or a diary page", "A pen"],
      steps: [
        "Draw a grid: Friday, Saturday and Sunday across the top; *por la mañana*, *por la tarde* and *por la noche* down the side.",
        "Fill each box with a free-time chunk in Spanish (*ir al cine*, *montar en bici*, *ver una serie*…).",
        "Write three sentences about your plans: *El sábado por la tarde voy a ir al centro comercial con mi hermana.*",
        "Ask someone at home to quiz you: *¿Qué vas a hacer el domingo por la mañana?* — answer without looking.",
      ],
      maths: "Immediate future (*voy a* + infinitive) with time phrases (*el sábado por la tarde*) and the sentence builder: when + what + where + who with.",
    },
    {
      title: "Encuesta familiar: ¿Qué te gusta hacer?",
      emoji: "📋",
      materials: ["Paper and a pen", "Three or four family members or friends"],
      steps: [
        "Ask each person *¿Qué te gusta hacer en tu tiempo libre?* and note their answer in English.",
        "Write a Spanish sentence for each person: *A mi padre le gusta cocinar. A mi abuela le encantan las telenovelas.*",
        "Find something two people share and write it with *les*: *A mis padres les gusta leer.*",
        "Finish with yourself and one other person: *A mi hermano y a mí nos gustan los videojuegos.*",
      ],
      maths: "*Gustar*-type verbs with *le / les / nos*, naming people with *a*, and choosing *gusta* or *gustan* to agree with the thing liked.",
    },
  ],
  bonusDiagrams: [
    {
      title: "Habit or plan?",
      svg: `<svg viewBox="0 0 460 190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Timeline: dots repeat across the whole line for a habit in the present tense, normalmente juego al fútbol; one star after today marks a single plan, este sábado voy a ir al cine"><rect x="0" y="0" width="460" height="190" fill="#ffffff"/><text x="230" y="22" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#1f2937">Habit (present) or plan (voy a + infinitive)?</text><text x="110" y="60" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">Normalmente juego al fútbol.</text><text x="110" y="78" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#334155">every week: the dots repeat</text><text x="340" y="60" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">Este sábado voy a ir al cine.</text><text x="340" y="78" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#334155">one plan, after today</text><line x1="20" y1="120" x2="430" y2="120" stroke="#334155" stroke-width="2"/><polygon points="430,114 442,120 430,126" fill="#334155"/><circle cx="40" cy="120" r="6" fill="#c7d2fe" stroke="#334155" stroke-width="2"/><circle cx="80" cy="120" r="6" fill="#c7d2fe" stroke="#334155" stroke-width="2"/><circle cx="120" cy="120" r="6" fill="#c7d2fe" stroke="#334155" stroke-width="2"/><circle cx="160" cy="120" r="6" fill="#c7d2fe" stroke="#334155" stroke-width="2"/><circle cx="240" cy="120" r="6" fill="#c7d2fe" stroke="#334155" stroke-width="2"/><circle cx="280" cy="120" r="6" fill="#c7d2fe" stroke="#334155" stroke-width="2"/><circle cx="380" cy="120" r="6" fill="#c7d2fe" stroke="#334155" stroke-width="2"/><circle cx="415" cy="120" r="6" fill="#c7d2fe" stroke="#334155" stroke-width="2"/><polygon points="330,104 335,115 347,115 337,122 341,134 330,127 319,134 323,122 313,115 325,115" fill="#fde68a" stroke="#334155" stroke-width="2"/><line x1="200" y1="104" x2="200" y2="136" stroke="#1f2937" stroke-width="3"/><text x="200" y="154" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#1f2937">hoy</text><text x="330" y="154" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#334155">el sábado</text><text x="230" y="180" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#334155">Dots = a repeated habit (present tense). Star = one future plan.</text></svg>`,
      caption: "Use the present tense for what you normally do (it happens again and again) and *voy a* + infinitive for one plan ahead of today.",
    },
  ],
  history: {
    title: "The carpenter who shaped the guitar",
    story:
      "Antonio de Torres Jurado was born in 1817 near Almería, in southern Spain, and trained as a carpenter. In the 1850s, in Seville, he began building guitars — encouraged, the story goes, by the guitarist Julián Arcas. Torres made the body larger and perfected a fan of thin wooden strips glued under the top, so a very thin soundboard could vibrate freely without cracking. The result was a fuller, louder sound that could fill a concert hall. The great guitarist Francisco Tárrega played a Torres guitar, and almost every classical guitar made today still follows Torres's design. So when you say *toco la guitarra*, the instrument in your hands probably owes its shape to a carpenter from Almería.",
  },
};
