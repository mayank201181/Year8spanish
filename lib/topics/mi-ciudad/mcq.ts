import type { Paper } from "../../types.ts";

// MCQ papers for "Describing My Town & Extended Writing" (mi-ciudad).
// Sections: town-adjectives · pros-and-cons · connectives-and-intensifiers ·
//           extended-sentences · three-time-frames

export const mcqPapers: Paper[] = [
  // =========================================================================
  // MCQ PAPER 1
  // =========================================================================
  {
    id: "mi-ciudad-m1",
    title: "MCQ Paper 1",
    questions: [
      {
        kind: "mcq",
        id: "mi-ciudad-m1-q01",
        question: "What does this sentence mean?\n\n    Mi ciudad es muy ruidosa.",
        options: ["My town is very noisy.", "My town is very quiet.", "My town is very dirty.", "My town is very lively."],
        answerIndex: 0,
        explanation:
          "*Ruidosa* comes from *el ruido* (noise), so it means **noisy**. 'Quiet' is the opposite, *tranquila*; 'dirty' is *sucia*; 'lively' is *animada*.",
        difficulty: "warmup",
        guideRef: "town-adjectives",
        hints: ["Do you know a noun that looks like *ruid-*? *El ruido* is what you hear on a busy road."],
        strategy: "Look for the pattern",
      },
      {
        kind: "mcq",
        id: "mi-ciudad-m1-q02",
        question: "Choose the correct word to complete the sentence.\n\n    Mi pueblo es muy ___.",
        options: ["pequeña", "pequeños", "pequeño", "pequeñas"],
        answerIndex: 2,
        explanation:
          "*El pueblo* is masculine singular, so the adjective must be masculine singular: **pequeño**. *Pequeña* would describe *la ciudad*, not *el pueblo*.",
        difficulty: "warmup",
        guideRef: "town-adjectives",
        hints: ["Is it *el pueblo* or *la pueblo*? Singular or plural?"],
        strategy: "Agreement check",
      },
      {
        kind: "mcq",
        id: "mi-ciudad-m1-q03",
        question: "Which connective means 'however'?",
        options: ["por eso", "sin embargo", "además", "ya que"],
        answerIndex: 1,
        explanation:
          "**Sin embargo** = however (it introduces a contrast). *Por eso* = that's why, *además* = what's more, *ya que* = since / because.",
        difficulty: "warmup",
        guideRef: "connectives-and-intensifiers",
        hints: ["'However' introduces a contrast — the opposite idea. Which of these is a two-word contrast connective?"],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "mi-ciudad-m1-q04",
        question: "Which is the correct Spanish for: 'The worst thing about my town is that there is a lot of pollution'?",
        options: [
          "Lo peor de mi ciudad es que hay mucho contaminación.",
          "El peor de mi ciudad es que hay mucha contaminación.",
          "Lo mejor de mi ciudad es que hay mucha contaminación.",
          "Lo peor de mi ciudad es que hay mucha contaminación.",
        ],
        answerIndex: 3,
        explanation:
          "'The worst thing' = **lo peor** (neuter *lo* + adjective, no noun needed). *La contaminación* is feminine, so 'a lot of' = **mucha**. *Mucho contaminación* ignores the gender; *El peor* needs a noun after it (*el peor parque*); *lo mejor* means 'the best thing'.",
        difficulty: "core",
        guideRef: "pros-and-cons",
        hints: ["'The worst thing' with no noun: is it *el* or *lo*?", "*Contaminación* ends in *-ción* — what gender are those nouns, and so which form of *mucho*?"],
        strategy: "Gender detective (el/la)",
      },
      {
        kind: "mcq",
        id: "mi-ciudad-m1-q05",
        question:
          "Read the text.\n\n> Me llamo Javier y vivo en Bilbao, una ciudad industrial situada en el norte de España. Tiene unos trescientos cincuenta mil habitantes. Lo bueno de Bilbao es que hay muchos museos, como el famoso Guggenheim, y la comida es deliciosa. Sin embargo, lo malo es que llueve mucho, sobre todo en invierno. Además, hay bastante tráfico en el centro.\n\nAccording to Javier, what is a disadvantage of Bilbao?",
        options: ["There are no museums.", "The food is not very good.", "It rains a lot, especially in winter.", "It is in the south of Spain."],
        answerIndex: 2,
        explanation:
          "After *lo malo es que* Javier says *llueve mucho, sobre todo en invierno* — it rains a lot, especially in winter. The museums and the food are under *lo bueno*, and Bilbao is in the **north** (*el norte*), not the south.",
        difficulty: "core",
        guideRef: "pros-and-cons",
        hints: ["Find the signpost *lo malo es que…* in the text.", "*Llueve* is from *llover* — what does it describe?"],
        strategy: "Use context",
      },
      {
        kind: "mcq",
        id: "mi-ciudad-m1-q06",
        question: "Which connective completes the sentence logically?\n\n    Hay mucho tráfico, ___ voy al colegio en metro.",
        options: ["por eso", "aunque", "porque", "además"],
        answerIndex: 0,
        explanation:
          "The traffic is the cause and going by metro is the result, so you need 'that's why / so': **por eso**. *Porque* would turn the logic upside down ('there is traffic **because** I go by metro'), and *aunque* (although) doesn't make sense here.",
        difficulty: "core",
        guideRef: "connectives-and-intensifiers",
        hints: ["Which part is the cause and which part is the result?", "You need a connective meaning 'that's why' — it points FORWARD to the result."],
        strategy: "Translate back to check",
      },
      {
        kind: "mcq",
        id: "mi-ciudad-m1-q07",
        question: "Which sentence uses *muy* and *mucho* correctly?",
        options: [
          "Hace muy calor y la ciudad es mucho bonita.",
          "Hace mucho calor y la ciudad es mucha bonita.",
          "Hace muy calor y la ciudad es muy bonita.",
          "Hace mucho calor y la ciudad es muy bonita.",
        ],
        answerIndex: 3,
        explanation:
          "*Calor* is a **noun** (heat), so it takes **mucho**: *hace mucho calor*. *Bonita* is an **adjective**, so it takes **muy**: *muy bonita*. *Hace muy calor* is the classic slip — *muy* never goes in front of a noun.",
        difficulty: "core",
        guideRef: "connectives-and-intensifiers",
        hints: ["Is *calor* a noun or an adjective? Is *bonita*?", "*muy* + adjective; *mucho/a* + noun."],
        strategy: "Look for the pattern",
      },
      {
        kind: "mcq",
        id: "mi-ciudad-m1-q08",
        question:
          "Read the text.\n\n> Me llamo Wei Ling y vivo en Singapur. Normalmente voy al colegio en metro. El sábado pasado fui al centro comercial con mi prima y compramos ropa. El domingo que viene vamos a comer en un *hawker centre* de Chinatown.\n\nWhat did Wei Ling do **last Saturday**?",
        options: [
          "She went to school by metro.",
          "She went to the shopping centre with her cousin and they bought clothes.",
          "She ate at a hawker centre in Chinatown.",
          "She went to Chinatown with her cousin.",
        ],
        answerIndex: 1,
        explanation:
          "*El sábado pasado* (last Saturday) is followed by the preterite *fui… compramos*: she went to the shopping centre and they bought clothes. The metro is what she does *normalmente*, and the hawker centre is *el domingo que viene* (next Sunday) — future.",
        difficulty: "core",
        guideRef: "three-time-frames",
        hints: ["Find the time phrase that means 'last Saturday'.", "Read only the sentence that follows it — the verbs *fui* and *compramos* are in the past."],
        strategy: "Use the time phrase",
      },
      {
        kind: "mcq",
        id: "mi-ciudad-m1-q09",
        question: "Which sentence follows the full extended-sentence formula: time phrase + verb + detail + opinion + reason?",
        options: [
          "Los domingos voy al parque con mi hermano.",
          "Los domingos voy al parque con mi hermano porque es muy tranquilo.",
          "Voy al parque porque es tranquilo.",
          "El parque es muy tranquilo y bonito.",
        ],
        answerIndex: 1,
        explanation:
          "Only one sentence ticks every box: *Los domingos* (time phrase) + *voy* (verb) + *al parque con mi hermano* (detail) + *es muy tranquilo* (opinion) + *porque* (reason). *Los domingos voy al parque con mi hermano* stops before the opinion and reason.",
        difficulty: "core",
        guideRef: "extended-sentences",
        hints: ["Tick off each part of the formula for each sentence.", "Which sentences have a time phrase? Of those, which also gives a reason?"],
        strategy: "Build it up (extended sentence)",
      },
      {
        kind: "mcq",
        id: "mi-ciudad-m1-q10",
        question:
          "Read the text.\n\n> Soy Lucía. El verano pasado fui a Sevilla con mi familia. Visité la catedral y comí gazpacho en un restaurante pequeño. ¡Fue genial! Normalmente paso las vacaciones en la playa, pero este año fue diferente. El año que viene voy a ir a Granada porque quiero ver la Alhambra.\n\nWhat is Lucía going to do next year?",
        options: ["Spend the holidays at the beach.", "Visit Seville cathedral again.", "Eat gazpacho in Seville.", "Go to Granada to see the Alhambra."],
        answerIndex: 3,
        explanation:
          "*El año que viene* (next year) + *voy a ir* (I'm going to go) → she is going to Granada *porque quiero ver la Alhambra*. The cathedral and the gazpacho were last summer (*fui, visité, comí*); the beach is what she *normally* does.",
        difficulty: "core",
        guideRef: "three-time-frames",
        hints: ["Which time phrase means 'next year'?", "Look for *voy a* + infinitive — that's the future."],
        strategy: "Use the time phrase",
      },
      {
        kind: "mcq",
        id: "mi-ciudad-m1-q11",
        question: "*Mi ciudad está situada en la costa.* Where is the town?",
        options: ["On the coast.", "In the mountains.", "In the north.", "In the centre of the country."],
        answerIndex: 0,
        explanation:
          "*La costa* is a cognate: **the coast**. 'In the mountains' would be *en las montañas*; 'in the north' *en el norte*.",
        difficulty: "warmup",
        guideRef: "town-adjectives",
        hints: ["*Costa* looks like an English word — say it aloud."],
        strategy: "Spot the cognate",
      },
      {
        kind: "mcq",
        id: "mi-ciudad-m1-q12",
        question: "Which sentence correctly says 'There is nothing for young people'?",
        options: ["Hay nada para los jóvenes.", "No hay algo para los jóvenes.", "No hay nada para los jóvenes.", "No hay nada por los jóvenes."],
        answerIndex: 2,
        explanation:
          "Spanish uses a **double negative**: *no* before the verb + *nada* after it → *No hay nada*. *Hay nada* is missing the *no*; *algo* means 'something'; and 'for (the benefit of)' people is *para*, not *por*.",
        difficulty: "core",
        guideRef: "pros-and-cons",
        hints: ["In Spanish, does *nada* work on its own after the verb, or does it need a partner before the verb?", "Double negative: *no* + verb + *nada*. Then: 'for' people → *para* or *por*?"],
        strategy: "Look for the pattern",
      },
      {
        kind: "mcq",
        id: "mi-ciudad-m1-q13",
        question:
          "Read the text.\n\n> Me llamo Diego y vivo en un pueblo pequeño en las montañas, cerca de Granada. Es muy tranquilo y el aire es limpio. Hay una plaza bonita, una iglesia antigua y dos cafeterías, pero no hay cine ni centro comercial. Para ir al cine, tengo que coger el autobús a Granada, y solo hay dos autobuses al día. ¡Qué rollo! Aunque me encanta la naturaleza, a veces me aburro un poco los fines de semana.\n\nWhat can you infer about how Diego feels about his village?",
        options: [
          "He hates his village and can't wait to move to Granada.",
          "He thinks his village is noisy and polluted.",
          "He goes to the cinema in his village most weekends.",
          "He loves the peace and nature, but finds there isn't much for him to do.",
        ],
        answerIndex: 3,
        explanation:
          "Diego is **mixed**: *me encanta la naturaleza* and *es muy tranquilo* are positives, but *¡Qué rollo!* (what a pain) and *me aburro un poco* show he gets bored. 'He hates his village' goes too far — he never says that — and there is **no** cinema in the village (*no hay cine*).",
        difficulty: "challenge",
        guideRef: "pros-and-cons",
        hints: [
          "List what he says that is positive and what is negative.",
          "*Aunque* (although) often sits right on the line between a positive and a negative. What is on each side of it here?",
          "An inference must be supported by the text — reject any option that says more than he does (hate, move) or contradicts it (cinema).",
        ],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "mi-ciudad-m1-q14",
        question: "Which sentence uses *aunque* correctly?",
        options: [
          "Aunque mi ciudad es pequeña, hay muchas cosas que hacer.",
          "Aunque mi ciudad es pequeña, pero hay muchas cosas que hacer.",
          "Aunque mi ciudad es pequeña, por eso hay muchas cosas que hacer.",
          "Mi ciudad es pequeña aunque, hay muchas cosas que hacer.",
        ],
        answerIndex: 0,
        explanation:
          "*Aunque* (although) already does the contrasting, so the second half needs **no extra connective**. *Aunque…, pero…* copies English 'although…, but…' — in Spanish that doubles the contrast and is wrong. *Por eso* makes no sense (being small isn't the reason there's lots to do), and *aunque* must start its clause, not end it.",
        difficulty: "challenge",
        guideRef: "connectives-and-intensifiers",
        hints: [
          "How many contrast words does a sentence need?",
          "In English we sometimes say 'although… but…'. Does Spanish copy that?",
          "*Aunque* sits at the start of the clause it introduces, and the main clause follows with no connective.",
        ],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "mi-ciudad-m1-q15",
        question: "Which is the correct Spanish for: 'Yesterday I went to the museum, today I'm at home and tomorrow I'm going to go to the park'?",
        options: [
          "Ayer voy al museo, hoy estoy en casa y mañana fui al parque.",
          "Ayer fue al museo, hoy estoy en casa y mañana voy a ir al parque.",
          "Ayer fui al museo, hoy estoy en casa y mañana voy a ir al parque.",
          "Ayer fui al museo, hoy estoy en casa y mañana voy ir al parque.",
        ],
        answerIndex: 2,
        explanation:
          "Past *fui* (I went) + present *estoy* + future *voy a ir* — each verb matches its time phrase. *Fue* means 'he/she went' (wrong person); *voy ir* is missing the *a* of *ir a* + infinitive; and *Ayer voy… mañana fui* puts the present and the past with the wrong time phrases.",
        difficulty: "challenge",
        guideRef: "three-time-frames",
        hints: [
          "Match each time phrase (*ayer, hoy, mañana*) to a tense.",
          "Check the person: 'I went' is *fui* — what is *fue*?",
          "The near future is always *ir* + **a** + infinitive.",
        ],
        strategy: "Use the time phrase",
      },
    ],
  },

  // =========================================================================
  // MCQ PAPER 2
  // =========================================================================
  {
    id: "mi-ciudad-m2",
    title: "MCQ Paper 2",
    questions: [
      {
        kind: "mcq",
        id: "mi-ciudad-m2-q01",
        question: "What does *histórica* mean in this sentence?\n\n    Sevilla es una ciudad histórica.",
        options: ["hysterical", "historic", "touristy", "enormous"],
        answerIndex: 1,
        explanation:
          "*Histórica* = **historic** (full of history). It is a cognate — but beware the false friend 'hysterical', which is *histérica*. 'Touristy' is *turística*.",
        difficulty: "warmup",
        guideRef: "town-adjectives",
        hints: ["Say it aloud: *his-TÓ-ri-ca*. Which English word is hiding in it?"],
        strategy: "Spot the cognate",
      },
      {
        kind: "mcq",
        id: "mi-ciudad-m2-q02",
        question: "What does *además* mean?",
        options: ["although", "so / therefore", "because", "what's more / furthermore"],
        answerIndex: 3,
        explanation:
          "**Además** adds another point in the same direction: 'what's more', 'furthermore', 'besides'. 'Although' is *aunque*, 'so' is *así que / por eso*, 'because' is *porque*.",
        difficulty: "warmup",
        guideRef: "connectives-and-intensifiers",
        hints: ["*Además* contains *más* (more). What does a 'more' connective do?"],
        strategy: "Look for the pattern",
      },
      {
        kind: "mcq",
        id: "mi-ciudad-m2-q03",
        question: "Choose the correct word to complete the sentence.\n\n    Barcelona es una ciudad muy ___.",
        options: ["turística", "turístico", "turísticas", "turísticos"],
        answerIndex: 0,
        explanation:
          "The adjective describes *una ciudad* — feminine singular — so it takes *-a*: **turística**. *Turístico* would describe *un pueblo*.",
        difficulty: "warmup",
        guideRef: "town-adjectives",
        hints: ["Look at *una ciudad*: masculine or feminine? One or more than one?"],
        strategy: "Agreement check",
      },
      {
        kind: "mcq",
        id: "mi-ciudad-m2-q04",
        question: "Which is the correct Spanish for: 'The good thing is that there are lots of parks'?",
        options: [
          "Lo bueno es que hay muchas parques.",
          "El bueno es que hay muchos parques.",
          "Lo bueno es que hay muchos parques.",
          "Lo bueno es que son muchos parques.",
        ],
        answerIndex: 2,
        explanation:
          "'The good thing' = **lo bueno**; 'there are' = **hay**; *el parque* is masculine, so **muchos parques**. *Muchas parques* has the wrong gender; *el bueno* would mean 'the good one'; *son* means 'they are', not 'there are'.",
        difficulty: "core",
        guideRef: "pros-and-cons",
        hints: ["'The good thing' (no noun) uses which little word: *el* or *lo*?", "'There are' = *hay*. Then: is it *el parque* or *la parque*?"],
        strategy: "Gender detective (el/la)",
      },
      {
        kind: "mcq",
        id: "mi-ciudad-m2-q05",
        question:
          "Read the text.\n\n> Hola, soy Carmen. Vivo en Málaga, una ciudad grande y turística situada en el sur de España, en la costa. Tiene más de medio millón de habitantes. En verano hay muchos turistas en las playas y el centro está muy animado. Mi barrio es bastante moderno y limpio, pero el casco antiguo es mi parte favorita porque es precioso.\n\nWhich statement is TRUE according to Carmen?",
        options: [
          "Málaga is a small, quiet town in the north.",
          "Her neighbourhood is fairly modern and clean.",
          "Her neighbourhood is her favourite part of the city.",
          "There are not many tourists in summer.",
        ],
        answerIndex: 1,
        explanation:
          "*Mi barrio es bastante moderno y limpio* = my neighbourhood is **fairly** modern and clean (*bastante* = quite/fairly). Her favourite part is *el casco antiguo* (the old town), not her neighbourhood — a tempting misreading. Málaga is big, in the **south**, and full of tourists in summer.",
        difficulty: "core",
        guideRef: "town-adjectives",
        hints: ["Find *mi barrio* in the text. What two adjectives describe it?", "Careful: what is *mi parte favorita*? Is it the same as *mi barrio*?"],
        strategy: "Use context",
      },
      {
        kind: "mcq",
        id: "mi-ciudad-m2-q06",
        question: "Complete the sentence to mean 'too many cars'.\n\n    No me gusta mi ciudad porque hay ___ coches.",
        options: ["demasiado", "muy", "bastante", "demasiados"],
        answerIndex: 3,
        explanation:
          "Before a **noun**, *demasiado* agrees like *mucho*: *los coches* is masculine plural → **demasiados coches**. *Demasiado coches* forgets the agreement, and *muy* can't go in front of a noun at all.",
        difficulty: "core",
        guideRef: "connectives-and-intensifiers",
        hints: ["Is *coches* a noun or an adjective? Singular or plural?", "Before a noun, *demasiado* behaves like *mucho* — it agrees: *-o, -a, -os, -as*."],
        strategy: "Agreement check",
      },
      {
        kind: "mcq",
        id: "mi-ciudad-m2-q07",
        question: "A learner wrote *Mi ciudad es bonita.* Which is the best upgrade?",
        options: [
          "Mi ciudad es bonita y bonita.",
          "Mi ciudad es muy bonita.",
          "En mi opinión, mi ciudad es bastante bonita porque hay muchos edificios históricos; sin embargo, hay demasiado tráfico.",
          "Mi ciudad es bonita. Mi ciudad es grande. Mi ciudad es limpia.",
        ],
        answerIndex: 2,
        explanation:
          "The best upgrade adds an opinion phrase (*en mi opinión*), an intensifier (*bastante*), a reason (*porque hay muchos edificios históricos*) and a contrast (*sin embargo, hay demasiado tráfico*). *Muy bonita* is a small step; repeating *mi ciudad es* three times is exactly what upgrading tries to avoid.",
        difficulty: "core",
        guideRef: "extended-sentences",
        hints: ["Which version adds the most of: intensifier, reason, contrast?", "Repetition is not development — look for connectives."],
        strategy: "Build it up (extended sentence)",
      },
      {
        kind: "mcq",
        id: "mi-ciudad-m2-q08",
        question: "Which time phrase tells you a sentence is about the **future**?",
        options: ["el sábado que viene", "el sábado pasado", "los sábados", "ayer por la tarde"],
        answerIndex: 0,
        explanation:
          "*El sábado que viene* = next Saturday (literally 'the Saturday that is coming') → future. *El sábado pasado* is past, *los sábados* (on Saturdays) is a habit → present, and *ayer por la tarde* is yesterday afternoon → past.",
        difficulty: "warmup",
        guideRef: "three-time-frames",
        hints: ["*Que viene* comes from *venir* (to come). Is something that is coming in the past or the future?"],
        strategy: "Use the time phrase",
      },
      {
        kind: "mcq",
        id: "mi-ciudad-m2-q09",
        question:
          "Read the text.\n\n> Me llamo Arjun y vivo en un piso en Tampines, en Singapur. Lo mejor de mi barrio es que hay un centro comercial enorme y un *hawker centre* donde la comida es barata y deliciosa. También hay un parque muy verde. Lo peor es que hace demasiado calor y, en la época de los monzones, llueve muchísimo. Además, el metro siempre está lleno por la mañana.\n\nWhich of these does Arjun **NOT** mention as a negative?",
        options: ["The heat.", "The heavy rain in the monsoon season.", "The crowded metro in the morning.", "Expensive food."],
        answerIndex: 3,
        explanation:
          "The food is a **positive**: *la comida es barata y deliciosa* (cheap and delicious). The negatives come after *lo peor es que…* and *además*: the heat, the monsoon rain and the full metro.",
        difficulty: "core",
        guideRef: "pros-and-cons",
        hints: ["Find *lo peor es que…* — list everything after it, including what follows *además*.", "What does *barata* mean? Is it the opposite of 'expensive' or the same?"],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "mi-ciudad-m2-q10",
        question: "Which connective completes the sentence?\n\n    Me encanta mi pueblo ___ es muy tranquilo.",
        options: ["así que", "ya que", "sin embargo", "aunque"],
        answerIndex: 1,
        explanation:
          "The second half gives the **reason** for loving the village, so you need 'because / since': **ya que**. *Así que* (so) introduces a result, *sin embargo* (however) and *aunque* (although) introduce a contrast — but 'quiet' isn't a contrast to 'I love it'.",
        difficulty: "core",
        guideRef: "connectives-and-intensifiers",
        hints: ["Is the second half a reason, a result or a contrast?", "Which option is a fancier way of saying *porque*?"],
        strategy: "Translate back to check",
      },
      {
        kind: "mcq",
        id: "mi-ciudad-m2-q11",
        question: "Which sentence has correct agreement?",
        options: ["Las playas son muy limpio.", "Mi pueblo es muy tranquila.", "Mi ciudad es pequeña pero muy animada.", "Los parques son bonitas."],
        answerIndex: 2,
        explanation:
          "*La ciudad* is feminine singular, and both adjectives match: **pequeña**, **animada**. The others clash: *las playas* needs *limpias*, *el pueblo* needs *tranquilo*, *los parques* needs *bonitos*.",
        difficulty: "core",
        guideRef: "town-adjectives",
        hints: ["For each sentence, find the noun and decide its gender and number.", "Does every adjective in the sentence match its noun's ending?"],
        strategy: "Agreement check",
      },
      {
        kind: "mcq",
        id: "mi-ciudad-m2-q12",
        question: "A learner writes:\n\n    Voy al centro. Voy al cine. Voy al parque. Me gusta.\n\nWhich change would improve it the MOST?",
        options: [
          "Join the ideas with connectives, add time phrases and give a reason for the opinion.",
          "Put *muy* in front of every noun.",
          "Change every verb to the future tense.",
          "Change *voy* to *va* so it isn't repeated.",
        ],
        answerIndex: 0,
        explanation:
          "The writing is short, repetitive and gives no reason. Connectives, time phrases and a justified opinion fix all three: *Los sábados voy al centro y luego al cine; además, a veces voy al parque porque es tranquilo.* *Muy* can't go before a noun, and *va* means 'he/she goes' — that changes the meaning, not the quality.",
        difficulty: "challenge",
        guideRef: "extended-sentences",
        hints: [
          "What are the three biggest weaknesses: length, repetition, no reason… ?",
          "Would *muy* in front of *centro* even be correct Spanish?",
          "Which option attacks the most weaknesses at once without breaking the grammar?",
        ],
        strategy: "Build it up (extended sentence)",
      },
      {
        kind: "mcq",
        id: "mi-ciudad-m2-q13",
        question:
          "Read the text.\n\n> El fin de semana pasado mi amiga Zara visitó Toledo con su clase. Primero vieron la catedral y luego comieron en una plaza. Zara dice que fue un día increíble, aunque hizo muchísimo calor. Normalmente pasa los fines de semana en casa, pero el mes que viene va a volver a Toledo con sus padres.\n\nWhat can you work out from the text?",
        options: [
          "Zara usually travels somewhere every weekend.",
          "Zara enjoyed Toledo so much that she is going back.",
          "Zara went to Toledo with her parents last weekend.",
          "Zara didn't like the trip because of the heat.",
        ],
        answerIndex: 1,
        explanation:
          "She says *fue un día increíble* (past) and *el mes que viene va a volver* (future: she's going to go back) — so she enjoyed it enough to return. She went with her **class** last time; she *normally* stays at home at weekends; and *aunque hizo muchísimo calor* means the heat did **not** spoil it.",
        difficulty: "challenge",
        guideRef: "three-time-frames",
        hints: [
          "Sort the verbs into past, present and future.",
          "Who did she go with last weekend — and who will she go with next month?",
          "What does *aunque* tell you about how much the heat mattered?",
        ],
        strategy: "Use the time phrase",
      },
      {
        kind: "mcq",
        id: "mi-ciudad-m2-q14",
        question: "*Mañana voy a visitar el museo.* Which sentence says the same thing in the **past**, starting with *Ayer*?",
        options: ["Ayer voy a visitar el museo.", "Ayer visito el museo.", "Ayer visitó el museo.", "Ayer visité el museo."],
        answerIndex: 3,
        explanation:
          "*Ayer* needs the preterite. 'I visited' = *visit-* + **-é** → **visité**. *Visitó* (no written accent on the *e*, accent on the *o*) means 'he/she visited'; the other two keep a present or future verb with a past time phrase.",
        difficulty: "core",
        guideRef: "three-time-frames",
        hints: ["Which tense goes with *ayer*?", "The *yo* preterite ending for *-ar* verbs is *-é*. Where is the accent?"],
        strategy: "Mind the accent",
      },
      {
        kind: "mcq",
        id: "mi-ciudad-m2-q15",
        question: "Which is the correct Spanish for: 'The best thing about my town is that it is very lively, but the worst thing is that it is too noisy'?",
        options: [
          "Lo mejor de mi ciudad es que es muy animada, pero lo peor es que es demasiado ruidosa.",
          "Lo mejor de mi ciudad es que es muy animado, pero lo peor es que es demasiada ruidosa.",
          "El mejor de mi ciudad es que es muy animada, pero el peor es que es demasiado ruidosa.",
          "Lo mejor de mi ciudad es que es muy animada, pero lo peor es que es demasiado ruido.",
        ],
        answerIndex: 0,
        explanation:
          "*Animada* and *ruidosa* agree with *la ciudad*. Before an **adjective**, *demasiado* means 'too' and **never changes** — *demasiado ruidosa*, not *demasiada ruidosa*. 'The best/worst thing' is *lo mejor / lo peor*, and *es demasiado ruido* swaps the adjective 'noisy' for the noun 'noise'.",
        difficulty: "challenge",
        guideRef: "pros-and-cons",
        hints: [
          "Check each adjective agrees with *ciudad*.",
          "Is *demasiado* in front of a noun or an adjective here? Does it change in that position?",
          "'The best thing' with no noun → *lo* + adjective.",
        ],
        strategy: "Agreement check",
      },
    ],
  },

  // =========================================================================
  // MCQ PAPER 3
  // =========================================================================
  {
    id: "mi-ciudad-m3",
    title: "MCQ Paper 3",
    questions: [
      {
        kind: "mcq",
        id: "mi-ciudad-m3-q01",
        question: "Which adjective means 'dirty'?",
        options: ["limpia", "tranquila", "sucia", "ruidosa"],
        answerIndex: 2,
        explanation: "**Sucia** = dirty. Its opposite is *limpia* (clean). *Tranquila* = quiet, *ruidosa* = noisy.",
        difficulty: "warmup",
        guideRef: "town-adjectives",
        hints: ["Learn the adjectives in opposite pairs: *limpia / ___*."],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "mi-ciudad-m3-q02",
        question: "What does *por eso* mean?",
        options: ["that's why / so", "because", "however", "although"],
        answerIndex: 0,
        explanation:
          "**Por eso** = 'for that (reason)' → that's why / so. It points forward to a **result**. It is easy to confuse with *porque* (because), which points back to a **cause**.",
        difficulty: "warmup",
        guideRef: "connectives-and-intensifiers",
        hints: ["Translate it word by word: *por* = for, *eso* = that."],
        strategy: "Translate back to check",
      },
      {
        kind: "mcq",
        id: "mi-ciudad-m3-q03",
        question: "What does *Fuimos a la playa* mean?",
        options: ["We go to the beach.", "We are going to go to the beach.", "They went to the beach.", "We went to the beach."],
        answerIndex: 3,
        explanation:
          "*Fuimos* is the *nosotros* preterite of *ir*: **we went**. 'They went' would be *fueron*; 'we go' is *vamos*; 'we are going to go' is *vamos a ir*.",
        difficulty: "warmup",
        guideRef: "three-time-frames",
        hints: ["*-imos / -amos* endings usually mean 'we'. Is *fu-* from the present or the past of *ir*?"],
        strategy: "Check the subject",
      },
      {
        kind: "mcq",
        id: "mi-ciudad-m3-q04",
        question: "Choose the correct word to complete the sentence.\n\n    Mi pueblo está ___ en las montañas.",
        options: ["situada", "situado", "situadas", "situando"],
        answerIndex: 1,
        explanation:
          "*Situado* works like an adjective, so it agrees with *el pueblo* (masculine singular): **situado**. *Situada* is for *la ciudad*; *situando* is a different verb form ('situating').",
        difficulty: "core",
        guideRef: "town-adjectives",
        hints: ["Who or what is 'situated'? What gender is it?", "*Está situado / situada* agrees with the place, just like any adjective."],
        strategy: "Agreement check",
      },
      {
        kind: "mcq",
        id: "mi-ciudad-m3-q05",
        question:
          "Read the text.\n\n> Soy Pablo y vivo en Valencia, la tercera ciudad más grande de España. Está situada en el este, en la costa del Mediterráneo. Valencia es una ciudad histórica, pero también muy moderna: tiene un casco antiguo precioso y la Ciudad de las Artes y las Ciencias, que es muy futurista. En marzo hay una fiesta famosa, las Fallas, y la ciudad está muy animada y es bastante ruidosa.\n\nWhy does Pablo say Valencia is both historic AND modern?",
        options: [
          "It has a beautiful old town and a futuristic arts and science complex.",
          "It is the third biggest city in Spain and it is on the coast.",
          "It has a famous festival in March.",
          "It is lively and quite noisy in March.",
        ],
        answerIndex: 0,
        explanation:
          "Straight after *histórica, pero también muy moderna* the colon (:) gives the evidence: *un casco antiguo precioso* (historic) and *la Ciudad de las Artes y las Ciencias, que es muy futurista* (modern). The other options are true but don't explain *why* it is both.",
        difficulty: "core",
        guideRef: "town-adjectives",
        hints: ["Find the words *histórica* and *moderna* in the text.", "What comes immediately after them, after the colon?"],
        strategy: "Use context",
      },
      {
        kind: "mcq",
        id: "mi-ciudad-m3-q06",
        question:
          "Read the text.\n\n> Soy Aisha y vivo en Sevilla. Me encanta mi ciudad porque es muy bonita y animada. Lo malo es que en verano hace demasiado calor y no hay muchos parques con sombra (*sombra* = shade). Me gustaría que hubiera más zonas verdes y más fuentes en las plazas.\n\nWhat does Aisha wish for?",
        options: [
          "There are more green spaces and fountains in the squares.",
          "She liked the parks more in the past.",
          "She would like there to be more green spaces and fountains.",
          "She wants to move somewhere cooler.",
        ],
        answerIndex: 2,
        explanation:
          "*Me gustaría que hubiera…* is a fixed chunk meaning **'I would like there to be…'** — it states a wish, not a fact. So she would like more green spaces and fountains. 'There are more green spaces' treats the wish as a fact, and she never mentions moving.",
        difficulty: "core",
        guideRef: "pros-and-cons",
        hints: ["*Me gustaría* = I would like. Is she describing what exists or what she wants?", "*Que hubiera* = that there were / for there to be."],
        strategy: "Recycle a chunk",
      },
      {
        kind: "mcq",
        id: "mi-ciudad-m3-q07",
        question: "Which sentence uses *tan* correctly?",
        options: ["Mi ciudad es tan mucho bonita.", "¡Mi ciudad es tan bonita!", "Hay tan tráfico en mi ciudad.", "Mi ciudad es tanto bonita."],
        answerIndex: 1,
        explanation:
          "**Tan** (so) goes directly before an **adjective**: *tan bonita*. Before a noun you need *tanto/a*: *hay tanto tráfico*, so *tan tráfico* is wrong; *tan mucho* and *tanto bonita* mix the two up.",
        difficulty: "core",
        guideRef: "connectives-and-intensifiers",
        hints: ["*Tan* works like *muy*. What kind of word does *muy* go in front of?", "Before a noun, Spanish uses *tanto/tanta* instead."],
        strategy: "Look for the pattern",
      },
      {
        kind: "mcq",
        id: "mi-ciudad-m3-q08",
        question: "Put the chunks in the best order to make one extended sentence.\n\n    [porque es divertido]  [los sábados]  [voy al polideportivo]  [con mis amigos]",
        options: [
          "Voy porque es divertido al polideportivo con mis amigos los sábados.",
          "Los sábados con mis amigos porque es divertido voy al polideportivo.",
          "Al polideportivo los sábados voy porque con mis amigos es divertido.",
          "Los sábados voy al polideportivo con mis amigos porque es divertido.",
        ],
        answerIndex: 3,
        explanation:
          "The formula order is time phrase → verb → detail → reason: **Los sábados** + **voy al polideportivo** + **con mis amigos** + **porque es divertido**. The other orders split the verb from its place or put the reason in the middle, so the sentence doesn't flow.",
        difficulty: "core",
        guideRef: "extended-sentences",
        hints: ["What usually comes first: the time phrase or the reason?", "Keep *voy* next to *al polideportivo*, and put the *porque* clause at the end."],
        strategy: "Build it up (extended sentence)",
      },
      {
        kind: "mcq",
        id: "mi-ciudad-m3-q09",
        question:
          "Read Priya's message.\n\n> ¡Hola! Ayer fue mi cumpleaños. Por la mañana fui al centro con mi madre y compré unas zapatillas nuevas. Por la tarde comí una pizza de verduras con mis amigos en un restaurante italiano. Hoy estoy un poco cansada. Mañana voy a ir a la piscina y el sábado vamos a ver una película en el cine.\n\nWhat did Priya do on the **afternoon** of her birthday?",
        options: [
          "She bought new trainers.",
          "She went to the swimming pool.",
          "She ate a vegetable pizza with friends at an Italian restaurant.",
          "She watched a film at the cinema.",
        ],
        answerIndex: 2,
        explanation:
          "Her birthday was *ayer*. *Por la tarde* (in the afternoon) she says *comí una pizza de verduras con mis amigos* — she ate a vegetable pizza with her friends. The trainers were *por la mañana*; the pool is *mañana* (tomorrow) and the film is *el sábado* — both future (*voy a ir, vamos a ver*).",
        difficulty: "core",
        guideRef: "three-time-frames",
        hints: ["Careful: *mañana* = tomorrow, but *por la mañana* = in the morning. Which phrase means 'in the afternoon'?", "Read the sentence that starts with *Por la tarde*."],
        strategy: "Use the time phrase",
      },
      {
        kind: "mcq",
        id: "mi-ciudad-m3-q10",
        question: "Which connective completes the sentence?\n\n    En Madrid hay mucho que hacer; ___, es muy caro.",
        options: ["además", "sin embargo", "también", "así que"],
        answerIndex: 1,
        explanation:
          "'Lots to do' is positive and 'very expensive' is negative, so you need a **contrast**: **sin embargo** (however). *Además* and *también* add a point in the **same** direction, and *así que* (so) would wrongly say that having lots to do makes it expensive.",
        difficulty: "core",
        guideRef: "connectives-and-intensifiers",
        hints: ["Is the second idea positive or negative compared with the first?", "Which option is a contrast connective?"],
        strategy: "Translate back to check",
      },
      {
        kind: "mcq",
        id: "mi-ciudad-m3-q11",
        question: "Which sentence has a verb in the **wrong** tense for its time phrase?",
        options: [
          "El año pasado fui a Madrid.",
          "Normalmente voy al colegio en autobús.",
          "La semana que viene voy a visitar a mis abuelos.",
          "Ayer voy al cine con mis amigos.",
        ],
        answerIndex: 3,
        explanation:
          "*Ayer* (yesterday) needs the preterite: *Ayer **fui** al cine*. *Voy* is present. The other three match: past + *fui*, habit + *voy*, future + *voy a visitar*.",
        difficulty: "core",
        guideRef: "three-time-frames",
        hints: ["Label each time phrase: past, present or future.", "Now check each verb matches its label."],
        strategy: "Use the time phrase",
      },
      {
        kind: "mcq",
        id: "mi-ciudad-m3-q12",
        question: "Which is the correct Spanish for: 'The bad thing is that there is too much rubbish in the streets'?",
        options: [
          "Lo malo es que hay demasiada basura en las calles.",
          "Lo malo es que hay demasiado basura en las calles.",
          "Lo malo es que es demasiada basura en las calles.",
          "La mala es que hay demasiada basura en las calles.",
        ],
        answerIndex: 0,
        explanation:
          "*La basura* is feminine, and before a noun *demasiado* agrees → **demasiada basura**. 'There is' = *hay* (not *es*), and 'the bad thing' = *lo malo* (neuter *lo*, masculine-looking adjective) — never *la mala*.",
        difficulty: "challenge",
        guideRef: "pros-and-cons",
        hints: [
          "Is *demasiado* in front of a noun or an adjective here?",
          "What gender is *basura*? So which ending does *demasiado* need?",
          "'The bad thing' is always *lo* + the masculine singular adjective.",
        ],
        strategy: "Gender detective (el/la)",
      },
      {
        kind: "mcq",
        id: "mi-ciudad-m3-q13",
        question:
          "Read the two opinions.\n\n> **Hana:** Me encanta vivir en Madrid. Hay muchísimas cosas que hacer: museos, parques, conciertos… Aunque hay bastante contaminación, el transporte público es excelente.\n\n> **Marcus:** Yo prefiero mi pueblo. En Madrid hay demasiada gente y demasiado ruido. En mi pueblo conozco a todos los vecinos y voy en bici a todas partes.\n\nWhich statement best sums up the difference between them?",
        options: [
          "Both of them prefer living in the countryside.",
          "Hana thinks Madrid has no problems at all.",
          "Hana values the city's activities and transport; Marcus values the calm and community of his village.",
          "Marcus dislikes his village because he has to cycle everywhere.",
        ],
        answerIndex: 2,
        explanation:
          "Hana loves Madrid for *muchísimas cosas que hacer* and *el transporte público es excelente*; Marcus dislikes the crowds and noise and likes knowing *todos los vecinos* (all the neighbours). Hana **does** admit a problem — *aunque hay bastante contaminación* — and Marcus presents cycling as a positive.",
        difficulty: "challenge",
        guideRef: "pros-and-cons",
        hints: [
          "For each person, note one thing they like and one thing they dislike.",
          "Does Hana mention any problem at all? Look after *aunque*.",
          "Is cycling everywhere a complaint or an advantage for Marcus?",
        ],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "mi-ciudad-m3-q14",
        question: "Choose the correct word to complete the sentence.\n\n    Mi barrio es moderno ___ interesante.",
        options: ["y", "e", "u", "ni"],
        answerIndex: 1,
        explanation:
          "*Y* changes to **e** before a word starting with an *i-* sound (*i-* or *hi-*): *moderno **e** interesante*. Otherwise you would say *y i…* — two identical sounds in a row. *U* is the same trick for *o* before an *o-* word (*siete u ocho*).",
        difficulty: "core",
        guideRef: "connectives-and-intensifiers",
        hints: ["Say *moderno y interesante* aloud. What happens to the two *i* sounds?", "Spanish swaps *y* for another vowel before *i-* / *hi-*."],
        strategy: "Say it aloud",
      },
      {
        kind: "mcq",
        id: "mi-ciudad-m3-q15",
        question:
          "Which is the most accurate English translation?\n\n    Normalmente voy al parque, pero el sábado pasado fui al museo y el sábado que viene voy a ir a la playa.",
        options: [
          "Normally I go to the park, but last Saturday I go to the museum and next Saturday I went to the beach.",
          "I usually went to the park, but last Saturday I went to the museum and next Saturday I'm going to the beach.",
          "Normally I'm going to the park, but this Saturday I went to the museum and next Saturday I'm going to go to the beach.",
          "I usually go to the park, but last Saturday I went to the museum and next Saturday I'm going to go to the beach.",
        ],
        answerIndex: 3,
        explanation:
          "Three time frames, three tenses: *normalmente voy* (present habit: I usually go), *el sábado pasado fui* (past: last Saturday I went), *el sábado que viene voy a ir* (future: next Saturday I'm going to go). The other versions each put at least one verb or time phrase in the wrong frame — e.g. 'this Saturday' for *el sábado pasado*.",
        difficulty: "challenge",
        guideRef: "three-time-frames",
        hints: [
          "Split the Spanish into its three parts using the time phrases.",
          "Translate each verb in its own time frame: *voy*, *fui*, *voy a ir*.",
          "Now check every part of each English option — one slip rules it out.",
        ],
        strategy: "Translate back to check",
      },
    ],
  },
];
