import type { TopicExtras } from "../types.ts";

export const extras: TopicExtras = {
  hook:
    "In Spanish the weather *makes* things: *hace calor* literally means 'it makes heat'. Learn a handful of short chunks and you can talk about anything from a Singapore thunderstorm to snow in the Pyrenees.",
  didYouKnow: [
    "*Hace calor* uses the same verb as *hacer los deberes* (to do homework) — Spanish pictures the weather as something that 'makes' heat, cold or wind.",
    "*El tiempo* means both 'the weather' and 'time': *¿Qué tiempo hace?* asks about the weather, but *No tengo tiempo* means 'I don't have time'.",
    "Spain's national weather service is AEMET, the *Agencia Estatal de Meteorología* (State Meteorological Agency).",
    "A traditional Spanish saying warns *Hasta el cuarenta de mayo, no te quites el sayo* — 'Until the fortieth of May, don't take off your coat' — because late spring in Spain can still turn chilly.",
    "In Argentina, Chile and Uruguay, Christmas comes in summer, so many families celebrate *la Navidad* in hot weather.",
    "Chile's Atacama Desert is one of the driest places on Earth — some parts of it can go years without rain.",
  ],
  activities: [
    {
      title: "Be the TV weather presenter",
      emoji: "🎤",
      materials: ["A sheet of paper and coloured pens", "A phone to record yourself (optional)"],
      steps: [
        "Draw a rough outline of Spain and mark Bilbao, Barcelona, Madrid, Valencia and Sevilla.",
        "Draw a weather symbol and a temperature next to each city.",
        "Write one sentence per region, e.g. *En el norte llueve y hace dieciséis grados.*",
        "Add one sentence about tomorrow with *va a*, e.g. *Mañana va a hacer sol en el sur.*",
        "Record a 30-second forecast, play it back and check every *hace*, *hay* and *está*.",
      ],
      maths:
        "Weather expressions (*hace / hay / está* and weather verbs), compass points (*en el norte de España*), temperatures in *grados*, and the immediate future *va a* + infinitive.",
    },
    {
      title: "Five-day weather diary",
      emoji: "📓",
      materials: ["A notebook", "A weather app showing Singapore and one Spanish city"],
      steps: [
        "Each evening, write three sentences: one about yesterday, one about today and one about tomorrow.",
        "For example: *Ayer llovió por la tarde. Hoy hace mucho calor. Mañana va a haber tormenta.*",
        "Add one comparison with Spain from the app: *En Madrid hace frío, pero en Singapur hace calor.*",
        "On day 5, underline every verb and colour-code it: past, present or future.",
        "Read the whole diary aloud and check the accents on *llovió* and *nevó*.",
      ],
      maths:
        "Three time frames for weather: preterite *hizo / llovió / hubo*, present *hace / llueve / hay* and immediate future *va a hacer / va a llover / va a haber*.",
    },
  ],
  bonusDiagrams: [
    {
      title: "Las estaciones en España",
      svg: `<svg viewBox="0 0 480 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The four seasons in Spain with their months and typical weather: la primavera (marzo, abril, mayo), el verano (junio, julio, agosto), el otoño (septiembre, octubre, noviembre) and el invierno (diciembre, enero, febrero)"><rect width="480" height="300" fill="#ffffff"/><rect x="15" y="20" width="220" height="110" rx="12" fill="#bbf7d0" stroke="#334155"/><rect x="245" y="20" width="220" height="110" rx="12" fill="#fde68a" stroke="#334155"/><rect x="245" y="170" width="220" height="110" rx="12" fill="#fecaca" stroke="#334155"/><rect x="15" y="170" width="220" height="110" rx="12" fill="#bae6fd" stroke="#334155"/><g font-family="sans-serif" font-size="15" font-weight="bold" fill="#1f2937" text-anchor="middle"><text x="125" y="52">la primavera</text><text x="355" y="52">el verano</text><text x="355" y="202">el otoño</text><text x="125" y="202">el invierno</text></g><g font-family="sans-serif" font-size="11" fill="#334155" text-anchor="middle"><text x="125" y="80">marzo · abril · mayo</text><text x="355" y="80">junio · julio · agosto</text><text x="355" y="230">septiembre · octubre · noviembre</text><text x="125" y="230">diciembre · enero · febrero</text></g><g font-family="sans-serif" font-size="12" font-style="italic" fill="#1f2937" text-anchor="middle"><text x="125" y="108">hace buen tiempo</text><text x="355" y="108">hace mucho calor</text><text x="355" y="258">hace fresco y llueve</text><text x="125" y="258">hace frío; nieva en la sierra</text></g><circle cx="240" cy="150" r="30" fill="#ffffff" stroke="#334155" stroke-width="1.5"/><text x="240" y="155" font-family="sans-serif" font-size="13" font-weight="bold" fill="#1f2937" text-anchor="middle">el año</text></svg>`,
      caption:
        "Read it clockwise from the top left. This is the typical weather for much of Spain (northern hemisphere) — it varies a lot by region, and in Argentina or Chile the seasons are the other way round.",
    },
  ],
  history: {
    title: "The Armada and the storms of 1588",
    story:
      "In 1588 King Philip II of Spain sent a huge fleet of about 130 ships — officially *la Grande y Felicísima Armada* — to invade England. After a battle off Gravelines, near the coast of Flanders, strong winds pushed the fleet north into the North Sea, so it could not turn back through the English Channel. The ships had to sail home the long way, around Scotland and Ireland. There, violent Atlantic storms struck: *hizo mucho viento y hubo tormentas terribles*. Many ships were wrecked on the rocky coasts of Ireland and Scotland, and thousands of sailors never returned. The fleet later became known by an ironic nickname, *la Armada Invencible* ('the Invincible Armada'). In the end, the weather shaped the story as much as any battle did.",
  },
};
