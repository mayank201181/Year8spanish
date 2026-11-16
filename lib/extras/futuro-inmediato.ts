import type { TopicExtras } from "../types.ts";

export const extras: TopicExtras = {
  hook:
    "You don't need a brand-new tense to talk about tomorrow. Take the verb *ir* (to go), add *a*, add any verb from the dictionary — and you're in the future: *voy a…* is how Spanish speakers make plans every single day.",
  didYouKnow: [
    "*Ir* is a patchwork verb. The infinitive comes from the Latin verb *ire*, but *voy, vas, va* come from a different Latin verb, *vadere* ('to go, to walk'). English did something similar: *go* and *went* come from two different old verbs.",
    "In everyday conversation Spanish speakers use *voy a* + infinitive much more often than the 'proper' future tense (*iré, comeré*) — especially in Latin America.",
    "*¡Vámonos!* ('Let's go!') is *vamos* + *nos* — but the final *-s* of *vamos* drops when *nos* is glued on, so it is never *vamosnos*.",
    "In the past tense (the preterite) *ir* and *ser* share exactly the same forms: *fui* can mean 'I went' or 'I was' — only the context tells you which.",
    "*Pasado mañana* (the day after tomorrow) has a partner in the past: *anteayer*, 'the day before yesterday'. English has no single word for either.",
    "*¡Vamos!* is one of the most famous shouts in sport: Spanish tennis champion Rafael Nadal was known for roaring it after winning big points.",
  ],
  activities: [
    {
      title: "My week ahead",
      emoji: "📅",
      materials: ["A diary or a sheet of paper", "A pen", "Two highlighters"],
      steps: [
        "Write the next seven days down the page, starting with tomorrow.",
        "Next to each day write one real plan in Spanish, starting with a time phrase: *Mañana voy a…*, *Pasado mañana voy a…*, *El sábado vamos a…*",
        "Include at least one negative (*No voy a…*), one plan with a friend or family member (*Mi hermana va a…*), and one reflexive verb written both ways (*Me voy a levantar tarde. = Voy a levantarme tarde.*).",
        "Highlight every part of *ir* in one colour and every infinitive in another — check that every *ir* has its *a*.",
        "At the end of the week, tick the plans that really happened and read the list aloud to someone at home.",
      ],
      maths: "*ir + a + infinitive* for different people, future time phrases, negatives, and the two positions of the reflexive pronoun.",
    },
    {
      title: "Be the weather forecaster",
      emoji: "🌦️",
      materials: ["A weather app or website", "A map of Spain (printed or on screen)", "A phone to record yourself"],
      steps: [
        "Look up tomorrow's forecast for Singapore and for three Spanish cities, for example Madrid, Sevilla and Barcelona.",
        "Write a short script: *Mañana en Madrid va a hacer sol. En Barcelona va a hacer viento. En Singapur va a llover por la tarde.*",
        "Add one *va a haber* sentence (*Va a haber una tormenta…*) and one opinion: *El sábado va a ser perfecto para ir a la playa porque va a hacer buen tiempo.*",
        "Record a one-minute forecast, pointing at the map as you speak.",
        "The next day, check: were your predictions right? Correct any that weren't — in Spanish.",
      ],
      maths: "Predictions with *va a* + weather verbs (*va a llover, va a nevar*), *va a hacer* + weather (*calor, sol, viento*), *va a haber*, and *va a ser* + adjective + *porque*.",
    },
  ],
  bonusDiagrams: [
    {
      title: "¿Quieres ir al cine? — how an invitation flows",
      svg: `<svg viewBox="0 0 480 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Flowchart. The invitation ¿Quieres ir al cine? splits into yes and no. Yes: ¡Sí, claro! ¡Qué buena idea!, then ¿A qué hora quedamos? Quedamos a las seis. No: Lo siento, no puedo porque tengo que estudiar, then ¿Qué tal el domingo? or ¡Qué pena! Otro día."><rect x="0" y="0" width="480" height="260" fill="#ffffff"/><rect x="140" y="12" width="200" height="40" rx="8" fill="#c7d2fe" stroke="#334155"/><line x1="240" y1="52" x2="240" y2="70" stroke="#1f2937" stroke-width="2"/><line x1="120" y1="70" x2="360" y2="70" stroke="#1f2937" stroke-width="2"/><line x1="120" y1="70" x2="120" y2="82" stroke="#1f2937" stroke-width="2"/><line x1="360" y1="70" x2="360" y2="82" stroke="#1f2937" stroke-width="2"/><polygon points="120,90 114,80 126,80" fill="#1f2937"/><polygon points="360,90 354,80 366,80" fill="#1f2937"/><rect x="20" y="90" width="200" height="60" rx="8" fill="#bbf7d0" stroke="#334155"/><rect x="260" y="90" width="200" height="60" rx="8" fill="#fecaca" stroke="#334155"/><line x1="120" y1="150" x2="120" y2="172" stroke="#1f2937" stroke-width="2"/><line x1="360" y1="150" x2="360" y2="172" stroke="#1f2937" stroke-width="2"/><polygon points="120,180 114,170 126,170" fill="#1f2937"/><polygon points="360,180 354,170 366,170" fill="#1f2937"/><rect x="20" y="180" width="200" height="60" rx="8" fill="#fde68a" stroke="#334155"/><rect x="260" y="180" width="200" height="60" rx="8" fill="#bae6fd" stroke="#334155"/><g font-family="sans-serif" text-anchor="middle" fill="#1f2937"><text x="240" y="37" font-size="13" font-weight="bold">¿Quieres ir al cine?</text><text x="160" y="64" font-size="12" font-weight="bold">sí</text><text x="320" y="64" font-size="12" font-weight="bold">no</text><text x="120" y="115" font-size="13">¡Sí, claro!</text><text x="120" y="135" font-size="13">¡Qué buena idea!</text><text x="360" y="115" font-size="13">Lo siento, no puedo</text><text x="360" y="135" font-size="13">porque tengo que estudiar.</text><text x="120" y="205" font-size="13">¿A qué hora quedamos?</text><text x="120" y="225" font-size="13">Quedamos a las seis.</text><text x="360" y="205" font-size="13">¿Qué tal el domingo?</text><text x="360" y="225" font-size="13">¡Qué pena! Otro día.</text></g></svg>`,
      caption:
        "Invite with *¿Quieres…?*, then either accept and arrange a time with *quedar*, or refuse politely with a reason and suggest another day.",
    },
  ],
  history: {
    title: "Plus Ultra: the motto that looks to the future",
    story:
      "In ancient times, people around the Mediterranean believed the world ended at the Strait of Gibraltar, at the southern tip of Spain. The two great rocks on either side were called the Pillars of Hercules, and legend said they carried a warning: *Non plus ultra* — 'nothing further beyond'.\n\nThen, in 1492, Columbus sailed west across the Atlantic and reached the Americas. There *was* something beyond. Around 1516 the young King Charles I of Spain took a motto that turned the old warning around: *Plus Ultra* — 'further beyond'.\n\nYou can still see it today on Spain's coat of arms, on a ribbon wrapped around two pillars on the Spanish flag. It's a national motto about the future — about where you are going to go next. *¿Y tú? ¿Adónde vas a ir?*",
  },
};
