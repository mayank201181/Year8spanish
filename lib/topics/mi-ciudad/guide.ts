import type { TopicGuide } from "../../types.ts";

export const guide: TopicGuide = {
  id: "mi-ciudad",
  title: "Describing My Town & Extended Writing",
  strand: "My Town",
  icon: "✍️",
  summary: "Describe your town, weigh up the good and the bad, and write in three time frames.",
  intro:
    "This is where your Spanish grows up. You'll describe a town with adjectives that agree, weigh up the good and the bad, glue ideas together with connectives and intensifiers, and then build long, accurate sentences one block at a time.\n\nThe finale is a paragraph that moves confidently between **past, present and future** — the kind of writing that lifts any answer, whatever the topic.",
  guide: [
    // ---------------------------------------------------------------------
    {
      id: "town-adjectives",
      heading: "Describing a town",
      discovery: {
        problem:
          "Read these four descriptions:\n\n    Mi pueblo es tranquilo.\n    Mi ciudad es tranquila.\n    Mi pueblo es grande.\n    Mi ciudad es grande.\n\n1. Why does *tranquilo* change to *tranquila*, but *grande* stays the same?\n2. Predict: if 'historic' for *el pueblo* is *histórico*, how do you say 'My city is historic'?",
        idea:
          "The adjective copies the gender of the noun. *El pueblo* is masculine → *tranquilo*; *la ciudad* is feminine → *tranquila*. Adjectives ending in **-e** (like *grande*) have one form for both genders.\n\nSo: **Mi ciudad es histórica.**",
      },
      body:
        "Start with **Mi ciudad es…** or **Mi pueblo es…** and add an adjective. In a longer phrase the adjective goes **after** the noun: *una ciudad histórica*, *un pueblo tranquilo*.\n\n| English | masculine (el pueblo, el barrio) | feminine (la ciudad) |\n|---|---|---|\n| historic | histórico | histórica |\n| modern | moderno | moderna |\n| touristy | turístico | turística |\n| quiet | tranquilo | tranquila |\n| noisy | ruidoso | ruidosa |\n| dirty | sucio | sucia |\n| clean | limpio | limpia |\n| lively | animado | animada |\n| small | pequeño | pequeña |\n| pretty | bonito | bonita |\n| big | grande | grande |\n| industrial | industrial | industrial |\n\n- Adjectives ending in **-o** change to **-a** for a feminine noun: *un pueblo tranquilo* → *una ciudad tranquila*.\n- Adjectives ending in **-e** or a **consonant** don't change for gender: *una ciudad grande*, *un barrio industrial*.\n- Plurals add **-s** after a vowel and **-es** after a consonant: *las playas limpias*, *los barrios industriales*.\n- With a place name, play safe by adding the noun: *Sevilla es **una ciudad** preciosa.*\n\n**Where is it?** Location always uses **estar**, never *ser*:\n\n    Mi ciudad está situada en el norte de Inglaterra.\n    Mi pueblo está situado en la costa.\n    Málaga está en el sur de España.\n\n*Situado* is an adjective too, so it agrees: *el pueblo* → *situado*, *la ciudad* → *situada*. Useful places: *en el norte / sur / este / oeste / centro*, *en la costa*, *en las montañas*, *en el campo*, *cerca de* + place.\n\n**How big is it?** Use **tener** + number + **habitantes**:\n\n    Mi pueblo tiene unos dos mil habitantes.\n    Singapur tiene unos seis millones de habitantes.\n\n- *Mil* (1,000) never has *un* in front and never adds -s: *mil, dos mil, diez mil*.\n- *Un millón / dos millones* need **de** before a noun: *tres millones **de** habitantes*.\n- *Unos* + number = 'about': *unos cien mil habitantes*.",
      diagram: `<svg viewBox="0 0 440 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schematic map of Spain with the compass points in Spanish. A Coruña is in the north-west, Santander in the north, Barcelona in the north-east, Madrid in the centre, Valencia in the east, Sevilla and Málaga in the south. Coastal cities are blue; Madrid and Sevilla are inland and yellow."><rect width="440" height="320" fill="#ffffff"/><rect x="25" y="40" width="390" height="230" rx="16" fill="#ffffff" stroke="#334155" stroke-dasharray="6 4"/><text x="220" y="28" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#1f2937">norte ↑</text><text x="220" y="289" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#1f2937">sur ↓</text><text x="14" y="155" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#1f2937" transform="rotate(-90 14 155)">oeste</text><text x="428" y="155" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#1f2937" transform="rotate(90 428 155)">este</text><circle cx="60" cy="67" r="6" fill="#bae6fd" stroke="#334155"/><text x="69" y="71" font-family="sans-serif" font-size="12" fill="#1f2937">A Coruña</text><circle cx="188" cy="65" r="6" fill="#bae6fd" stroke="#334155"/><text x="197" y="69" font-family="sans-serif" font-size="12" fill="#1f2937">Santander</text><circle cx="353" cy="122" r="6" fill="#bae6fd" stroke="#334155"/><text x="344" y="126" font-family="sans-serif" font-size="12" text-anchor="end" fill="#1f2937">Barcelona</text><circle cx="191" cy="149" r="6" fill="#fde68a" stroke="#334155"/><text x="200" y="153" font-family="sans-serif" font-size="12" fill="#1f2937">Madrid (centro)</text><circle cx="283" cy="175" r="6" fill="#bae6fd" stroke="#334155"/><text x="292" y="179" font-family="sans-serif" font-size="12" fill="#1f2937">Valencia</text><circle cx="128" cy="232" r="6" fill="#fde68a" stroke="#334155"/><text x="119" y="236" font-family="sans-serif" font-size="12" text-anchor="end" fill="#1f2937">Sevilla</text><circle cx="171" cy="250" r="6" fill="#bae6fd" stroke="#334155"/><text x="180" y="254" font-family="sans-serif" font-size="12" fill="#1f2937">Málaga</text><text x="405" y="262" font-family="sans-serif" font-size="11" text-anchor="end" fill="#334155">España (esquema)</text><circle cx="40" cy="304" r="6" fill="#bae6fd" stroke="#334155"/><text x="52" y="308" font-family="sans-serif" font-size="12" fill="#1f2937">en la costa</text><circle cx="160" cy="304" r="6" fill="#fde68a" stroke="#334155"/><text x="172" y="308" font-family="sans-serif" font-size="12" fill="#1f2937">en el interior</text></svg>`,
      diagramCaption:
        "Schematic map (dots placed by real latitude and longitude). *Santander está en el norte, en la costa. Madrid está en el centro. Sevilla está en el sur.*",
      workedExamples: [
        {
          title: "Describe a real city",
          problem: "Say in Spanish: 'Seville is a historic and very lively city. It is in the south of Spain.'",
          steps: [
            "Start with the noun: *una ciudad* is feminine, so every adjective describing it ends in **-a**.",
            "historic → *histórico* → **histórica**; lively → *animado* → **animada**. Both go **after** *ciudad*.",
            "'very' = *muy*, which never changes: *muy animada*.",
            "Location needs **estar**, not *ser*: *Está en el sur de España* (or *Está situada…* — *situada* agrees with *ciudad* too).",
          ],
          answer: "*Sevilla es una ciudad histórica y muy animada. Está (situada) en el sur de España.*",
          yourTurn: {
            question:
              "Your turn: write in Spanish 'My town is small and quiet.' Use either *mi pueblo* or *mi ciudad* — and make both adjectives agree.",
            answer: {
              type: "text",
              accept: [
                "mi pueblo es pequeño y tranquilo",
                "mi ciudad es pequeña y tranquila",
                "mi pueblo es tranquilo y pequeño",
                "mi ciudad es tranquila y pequeña",
              ],
            },
            solution:
              "*Pueblo* is masculine → **Mi pueblo es pequeño y tranquilo.** *Ciudad* is feminine → **Mi ciudad es pequeña y tranquila.** Mixing them (*mi ciudad es pequeño*) breaks the agreement.",
          },
        },
        {
          title: "Location and size",
          problem: "Say in Spanish: 'My village is in the mountains and it has about two thousand inhabitants.'",
          steps: [
            "village = *el pueblo* → *Mi pueblo…*",
            "Location → **estar**: *está en las montañas*.",
            "Size → **tener**: *tiene…*; 'about' = *unos* (masculine plural, to match *habitantes*).",
            "2,000 = *dos mil* — never *dos miles*.",
          ],
          answer: "*Mi pueblo está en las montañas y tiene unos dos mil habitantes.*",
          yourTurn: {
            question: "Your turn: write in Spanish 'My city is on the coast.'",
            answer: { type: "text", accept: ["mi ciudad está en la costa", "mi ciudad está situada en la costa"] },
            solution:
              "Location → *estar*: **Mi ciudad está en la costa.** If you add *situada*, it must be feminine to match *ciudad*: *Mi ciudad está situada en la costa.* (*Mi ciudad es en la costa* uses the wrong verb.)",
          },
        },
      ],
      keyPoints: [
        "*El pueblo / el barrio* (masculine) → *-o* adjectives; *la ciudad* (feminine) → *-a* adjectives.",
        "Adjectives ending in *-e* or a consonant (*grande, industrial*) don't change for gender.",
        "Adjectives go after the noun: *una ciudad moderna*.",
        "Location = **estar**: *Está situada en la costa.* *Situado/a* agrees too.",
        "Size = **tener** + number + *habitantes*; *millones de habitantes*, *dos mil habitantes*.",
      ],
      whyItWorks:
        "Spanish adjectives agree because Latin ones did (*bonus / bona*): the ending is a label telling you which noun the adjective belongs to — handy in long sentences. Location uses *estar* because it comes from Latin *stare*, 'to stand': you're saying where the town *stands*, not what it *is* like.",
      strategies: ["Gender detective (el/la)", "Agreement check", "Spot the cognate"],
      thinkDeeper:
        "*Mi ciudad es grande* — *grande* doesn't change. *Mi ciudad está situada en el norte* — *situado* does. Why? And how would you rewrite *Mi pueblo es pequeño y turístico* about *mis pueblos favoritos*?",
    },
    // ---------------------------------------------------------------------
    {
      id: "pros-and-cons",
      heading: "Lo bueno y lo malo",
      discovery: {
        problem:
          "Pablo is writing about Madrid:\n\n    Lo bueno de Madrid es que hay muchos museos.\n    Lo malo es que hay demasiado tráfico.\n    Lo mejor es que hay un parque enorme, el Retiro.\n\nYou know *bueno* (good), *malo* (bad) and *mejor* (better / best). What do you think *lo bueno*, *lo malo* and *lo mejor* mean? Why might Spanish use *lo* here and not *el*?",
        idea:
          "*Lo* + adjective = 'the ___ thing': *lo bueno* = the good thing, *lo malo* = the bad thing, *lo mejor* = the best thing.\n\n*Lo* is a special article for **ideas**, not for objects or people — *el bueno* would mean 'the good one' (a person or a masculine thing). *Es que* then introduces a full sentence with its own verb.",
      },
      body:
        "To give a balanced view, use **lo** + adjective + **es que** + a full sentence.\n\n| Spanish | English |\n|---|---|\n| Lo bueno es que… | The good thing is that… |\n| Lo mejor es que… | The best thing is that… |\n| Lo malo es que… | The bad thing is that… |\n| Lo peor es que… | The worst thing is that… |\n| Lo más interesante es que… | The most interesting thing is that… |\n\nAdd **de** + place to say what you're talking about: *Lo bueno **de** mi barrio es que…*. With an infinitive it means 'about doing': *Lo peor **de** vivir en una ciudad es que…*\n\n**Es que** + sentence, or **es** + noun — both are correct:\n\n    Lo mejor es que hay una playa. (es que + a sentence with a verb)\n    Lo mejor es la playa. (es + a noun)\n\n**Typical problems** — notice that *mucho* and *demasiado* agree with the noun that follows:\n\n| Masculine | Feminine |\n|---|---|\n| hay mucho tráfico (traffic) | hay mucha contaminación (pollution) |\n| hay demasiado ruido (noise) | hay mucha basura (rubbish) |\n| hay demasiados coches (cars) | hay demasiada gente (people) |\n| hay demasiados turistas (tourists) | hay pocas zonas verdes (few green spaces) |\n\n- *La gente* is **singular** in Spanish: *hay mucha gente*, *la gente es simpática*.\n- 'There's nothing for young people': *No hay nada para los jóvenes.* Spanish needs **both** *no* and *nada* — this double negative is correct.\n\n**Saying what you'd change.** Learn this as a fixed chunk — it uses a tense you'll meet in later years, so copy it exactly:\n\n    Me gustaría que hubiera más zonas verdes.\n    Me gustaría que hubiera un cine en mi pueblo.\n\n*Me gustaría que hubiera…* = 'I'd like there to be…'. A simpler way you can build yourself: *Me gustaría tener un cine en mi pueblo* or *Necesitamos más parques.*",
      workedExamples: [
        {
          title: "A balanced sentence",
          problem:
            "Say in Spanish: 'The best thing about my town is that there are lots of parks, but the worst thing is that there is nothing for young people.'",
          steps: [
            "'The best thing about my town' → *Lo mejor de mi ciudad* (or *de mi pueblo*).",
            "'is that there are lots of parks' → *es que hay muchos parques* — *parques* is masculine plural, so *muchos*.",
            "'but the worst thing is that' → *pero lo peor es que*.",
            "'there is nothing for young people' → *no hay nada para los jóvenes* (double negative; accent on *jóvenes*).",
          ],
          answer: "*Lo mejor de mi ciudad es que hay muchos parques, pero lo peor es que no hay nada para los jóvenes.*",
          yourTurn: {
            question: "Your turn: write in Spanish 'The bad thing is that there is too much traffic.'",
            answer: { type: "text", accept: ["lo malo es que hay demasiado tráfico"] },
            solution:
              "'The bad thing' = *lo malo*; 'there is' = *hay*; 'too much' before a masculine noun = *demasiado*: **Lo malo es que hay demasiado tráfico.**",
          },
        },
      ],
      keyPoints: [
        "*Lo* + adjective = 'the ___ thing': *lo bueno, lo mejor, lo malo, lo peor*.",
        "*Lo… es que* + a full sentence; *lo… es* + a noun.",
        "*Lo bueno **de** mi ciudad…* — *de* says what you're talking about.",
        "*Mucho / demasiado* agree with the noun: *mucha contaminación, demasiados coches*.",
        "*No hay nada para los jóvenes* — double negative is correct.",
        "*Me gustaría que hubiera…* is a fixed chunk: learn it, don't change it.",
      ],
      whyItWorks:
        "Spanish has no separate word for 'thing' in this structure. Instead, the neuter article *lo* turns an adjective into an abstract idea: *lo bueno* = 'the good (side of it)'. *El* would need a real masculine noun or person to point at. And because what follows is a whole idea with its own verb, you need *que* — just like 'that' in 'the good thing is **that**…'.",
      strategies: ["Recycle a chunk", "Agreement check", "Build it up (extended sentence)"],
      thinkDeeper:
        "*Lo mejor es el parque* and *Lo mejor es que hay un parque* are both correct. What's the grammatical difference — and which one gives you more room to add detail?",
    },
    // ---------------------------------------------------------------------
    {
      id: "connectives-and-intensifiers",
      heading: "Connectives & intensifiers",
      discovery: {
        problem:
          "Compare two versions of the same idea:\n\n    A: Mi barrio es bonito. Mi barrio es ruidoso.\n    B: Mi barrio es bastante bonito; sin embargo, es demasiado ruidoso.\n\n1. Which words did the writer add to make version B?\n2. One of them shows a **contrast**; two change **how much**. Which is which?\n3. Guess: does *demasiado* mean 'very' or 'too'?",
        idea:
          "*Sin embargo* (however) is a **connective**: it joins two ideas and shows how they relate — here, a contrast. *Bastante* (quite) and *demasiado* (too) are **intensifiers**: they turn the volume of an adjective up or down.\n\n*Demasiado* = 'too' — more than you'd like, so it's usually negative.",
      },
      body:
        "**Connectives** join ideas and show how they're linked.\n\n| Spanish | English | Job |\n|---|---|---|\n| y | and | adds |\n| también | also, too | adds |\n| además | what's more, in addition | adds (often starts a sentence) |\n| pero | but | contrast |\n| sin embargo | however | contrast (between two sentences) |\n| aunque | although | contrast (inside one sentence) |\n| porque | because | reason |\n| ya que | since, as | reason |\n| por eso | so, that's why | result |\n| así que | so | result |\n\n    Mi ciudad es moderna y limpia. Además, hay una playa preciosa.\n    Me gusta mi barrio aunque es un poco aburrido.\n    Hay mucho tráfico; por eso voy al colegio en metro.\n\n- **y → e** before a word starting with an 'ee' sound (*i-* or *hi-*): *moderna **e** histórica*, *bonita **e** interesante*.\n- *Porque* (because) is one word with no accent; *¿Por qué?* (why?) is two words with an accent.\n- *Sin embargo* is usually wrapped in punctuation — a semicolon or full stop before it and a comma after it: *Es grande; sin embargo, es tranquila.*\n\n**Intensifiers** turn the volume of an adjective up or down:\n\n| Spanish | English | Example |\n|---|---|---|\n| un poco | a bit | un poco aburrido |\n| bastante | quite | bastante grande |\n| muy | very | muy bonita |\n| realmente | really | realmente impresionante |\n| tan | so | ¡Es tan bonita! |\n| demasiado | too | demasiado ruidosa |\n\n- Before an **adjective**, intensifiers **never change**: *una ciudad muy bonita*, *unas calles demasiado ruidosas*.\n- Before a **noun**, *mucho* and *demasiado* agree like adjectives: *demasiado tráfico, demasiada basura, demasiados coches*.\n- *Muy* never goes before a noun: say *mucho tráfico*, not *muy tráfico*.\n- *Un poco* usually goes with negative adjectives: *un poco sucio*, *un poco aburrido*.\n- *Tan… como* compares: *Mi pueblo no es tan grande como Madrid.*",
      workedExamples: [
        {
          title: "Join two sentences",
          problem: "Join these two sentences with *aunque*, then translate: *Me gusta mi barrio. Es un poco aburrido.*",
          steps: [
            "*Aunque* = although; it goes in front of the contrasting idea.",
            "Remove the full stop and put *aunque* before the second sentence.",
            "No need to repeat *mi barrio* — the verb *es* already means 'it is'.",
          ],
          answer: "*Me gusta mi barrio aunque es un poco aburrido.* — I like my neighbourhood although it's a bit boring.",
          yourTurn: {
            question:
              "Your turn: join *Hay mucho tráfico.* and *Prefiero ir en metro.* with *por eso* (so / that's why). Write the full sentence in Spanish.",
            answer: {
              type: "text",
              accept: ["hay mucho tráfico por eso prefiero ir en metro", "hay mucho tráfico y por eso prefiero ir en metro"],
            },
            solution:
              "*Por eso* introduces the result, so the cause comes first: **Hay mucho tráfico; por eso prefiero ir en metro.** (There's a lot of traffic, so I prefer to go by metro.)",
          },
        },
        {
          title: "Intensifier or agreement?",
          problem:
            "Say in Spanish: 'There are too many tourists and the old town is too noisy.' (old town = *el casco antiguo*)",
          steps: [
            "'too many tourists': *demasiado* is before a **noun** (*turistas*, masculine plural) → it agrees: **demasiados turistas**.",
            "'too noisy': *demasiado* is before an **adjective** → it never changes. *Ruidoso* agrees with *el casco antiguo* (masculine singular).",
            "Join the two halves with *y*.",
          ],
          answer: "*Hay demasiados turistas y el casco antiguo es demasiado ruidoso.*",
          yourTurn: {
            question: "Your turn: write in Spanish 'There is too much rubbish.' (rubbish = *la basura*)",
            answer: { type: "text", accept: ["hay demasiada basura"] },
            solution: "*Basura* is a feminine noun, so *demasiado* agrees with it: **Hay demasiada basura.**",
          },
        },
      ],
      keyPoints: [
        "Add: *y, también, además*. Contrast: *pero, sin embargo, aunque*.",
        "Reason: *porque, ya que*. Result: *por eso, así que*.",
        "*y* → *e* before *i- / hi-*: *moderna e histórica*.",
        "Intensifiers before adjectives never change: *muy bonita, demasiado ruidosas*.",
        "*Mucho / demasiado* before nouns agree: *demasiada gente*. Never *muy* + noun.",
      ],
      whyItWorks:
        "Connectives are signposts for your reader: *porque* points back to a cause, *por eso* (literally 'for that') points forward to a result — the same two facts, in opposite orders. Intensifiers before an adjective are adverbs, and Spanish adverbs never agree, so *muy* and *demasiado* stay fixed. Before a noun, *demasiado* is acting as an adjective, so it agrees like one.",
      strategies: ["Look for the pattern", "Agreement check", "Translate back to check"],
      thinkDeeper:
        "*Hay mucho tráfico, por eso voy en metro.* Rewrite it with *porque* — what has to move? Then decide: which connective lets you put the contrast **first** in the sentence, *pero* or *aunque*?",
    },
    // ---------------------------------------------------------------------
    {
      id: "extended-sentences",
      heading: "Building extended sentences",
      discovery: {
        problem:
          "Here is a basic sentence and an extended one:\n\n    A: Voy al parque.\n    B: Los sábados voy al parque con mis amigos y me encanta porque es muy tranquilo; sin embargo, no voy cuando llueve.\n\nSentence B still has *voy al parque* in the middle. List every chunk that was added and, for each one, say which question it answers (When? With whom? …).",
        idea:
          "Each added chunk answers a hidden question: *Los sábados* (when?), *con mis amigos* (with whom?), *y me encanta* (what do you think?), *porque es muy tranquilo* (why?), *sin embargo, no voy cuando llueve* (is there a 'but'?).\n\nThat's the **extended-sentence formula** — and you can build it one block at a time.",
      },
      body:
        "Good writers build sentences in **blocks** around a correct core.\n\n| Block | Answers… | Example |\n|---|---|---|\n| 1. Time phrase | When? | Los sábados… |\n| 2. Verb | What do you do? | …voy al parque… |\n| 3. Detail | With whom? Where? How? | …con mis amigos… |\n| 4. Opinion | What do you think? | …y me encanta… |\n| 5. Reason (+ intensifier) | Why? | …porque es muy tranquilo… |\n| 6. Connective + contrast | Is there a 'but'? | …; sin embargo, no voy cuando llueve. |\n\n**Watch one sentence being upgraded:**\n\n1. *Voy al parque.* (3 words — correct, but basic)\n2. *Los sábados voy al parque.* (+ time phrase)\n3. *Los sábados voy al parque con mis amigos.* (+ detail)\n4. *Los sábados voy al parque con mis amigos y me encanta.* (+ opinion)\n5. *Los sábados voy al parque con mis amigos y me encanta porque es muy tranquilo.* (+ reason with an intensifier)\n6. *Los sábados voy al parque con mis amigos y me encanta porque es muy tranquilo; sin embargo, no voy cuando llueve.* (+ connective and contrast — 21 words)\n\nThe core (*voy al parque*) never changed. You only added blocks around it — so check each block as you add it.\n\n**Vary your sentence starts.** Don't begin every sentence with *Mi ciudad…* or *Me gusta…*. Try:\n\n- *Normalmente…* / *Los fines de semana…* / *Cuando hace buen tiempo…*\n- *En mi opinión…* / *Para mí…*\n- *Lo bueno es que…* / *Lo peor es que…*\n- *Además…* / *Sin embargo…* / *Por eso…*\n\n**Avoid repetition.** Compare:\n\n    Mi ciudad es bonita. Mi ciudad es grande. Mi ciudad es ruidosa. Me gusta mi ciudad.\n    Vivo en una ciudad grande y bastante bonita. Lo malo es que es demasiado ruidosa; sin embargo, me encanta.\n\nTools for variety: drop the subject (the verb ending already says who), swap adjectives (*bonito → precioso*, *interesante → impresionante*), use different verbs (*hay, tiene, está, me encanta*), and never chain three *y*s in a row.",
      diagram: `<svg viewBox="0 0 480 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A sentence ladder with six rungs from bottom to top: verb (3 words), plus time phrase (5 words), plus detail (8 words), plus opinion (11 words), plus reason (15 words), plus contrast (21 words). Bar length shows the number of words."><rect width="480" height="300" fill="#ffffff"/><text x="240" y="22" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#1f2937">La escalera de la frase</text><rect x="156" y="40" width="294" height="32" rx="4" fill="#bbf7d0" stroke="#334155"/><text x="6" y="53" font-family="sans-serif" font-size="11" font-weight="bold" fill="#1f2937">6 · + contraste</text><text x="6" y="67" font-family="sans-serif" font-size="11" fill="#334155">sin embargo, no voy…</text><text x="444" y="61" font-family="sans-serif" font-size="12" text-anchor="end" fill="#1f2937">21 palabras</text><rect x="156" y="82" width="210" height="32" rx="4" fill="#c7d2fe" stroke="#334155"/><text x="6" y="95" font-family="sans-serif" font-size="11" font-weight="bold" fill="#1f2937">5 · + razón</text><text x="6" y="109" font-family="sans-serif" font-size="11" fill="#334155">porque es muy tranquilo</text><text x="372" y="103" font-family="sans-serif" font-size="12" fill="#1f2937">15 palabras</text><rect x="156" y="124" width="154" height="32" rx="4" fill="#c7d2fe" stroke="#334155"/><text x="6" y="137" font-family="sans-serif" font-size="11" font-weight="bold" fill="#1f2937">4 · + opinión</text><text x="6" y="151" font-family="sans-serif" font-size="11" fill="#334155">y me encanta</text><text x="316" y="145" font-family="sans-serif" font-size="12" fill="#1f2937">11 palabras</text><rect x="156" y="166" width="112" height="32" rx="4" fill="#c7d2fe" stroke="#334155"/><text x="6" y="179" font-family="sans-serif" font-size="11" font-weight="bold" fill="#1f2937">3 · + detalle</text><text x="6" y="193" font-family="sans-serif" font-size="11" fill="#334155">con mis amigos</text><text x="274" y="187" font-family="sans-serif" font-size="12" fill="#1f2937">8 palabras</text><rect x="156" y="208" width="70" height="32" rx="4" fill="#c7d2fe" stroke="#334155"/><text x="6" y="221" font-family="sans-serif" font-size="11" font-weight="bold" fill="#1f2937">2 · + tiempo</text><text x="6" y="235" font-family="sans-serif" font-size="11" fill="#334155">Los sábados</text><text x="232" y="229" font-family="sans-serif" font-size="12" fill="#1f2937">5 palabras</text><rect x="156" y="250" width="42" height="32" rx="4" fill="#fde68a" stroke="#334155"/><text x="6" y="263" font-family="sans-serif" font-size="11" font-weight="bold" fill="#1f2937">1 · verbo</text><text x="6" y="277" font-family="sans-serif" font-size="11" fill="#334155">Voy al parque.</text><text x="204" y="271" font-family="sans-serif" font-size="12" fill="#1f2937">3 palabras</text></svg>`,
      diagramCaption:
        "Climb from the bottom: each rung adds one block to *Voy al parque.* Bar length = number of words (3 → 21).",
      workedExamples: [
        {
          title: "Upgrade a sentence step by step",
          problem: "Upgrade *Hay un mercado.* into an extended description using at least five blocks.",
          steps: [
            "Start with a correct core: *Hay un mercado.*",
            "+ where: *Cerca de mi casa hay un mercado.*",
            "+ adjective with an intensifier (agreeing with *mercado*): *…un mercado bastante grande…*",
            "+ detail: *…donde compro fruta los sábados.*",
            "+ opinion and reason: *Me encanta porque es muy animado…*",
            "+ contrast: *…aunque a veces hay demasiada gente.* (*gente* is feminine singular → *demasiada*)",
          ],
          answer:
            "*Cerca de mi casa hay un mercado bastante grande donde compro fruta los sábados. Me encanta porque es muy animado, aunque a veces hay demasiada gente.* — Near my house there's quite a big market where I buy fruit on Saturdays. I love it because it's very lively, although sometimes there are too many people.",
          yourTurn: {
            question:
              "Your turn: write in Spanish 'On Saturdays I go to the market because it is very lively.' (market = *el mercado*, lively = *animado*)",
            answer: {
              type: "text",
              accept: [
                "los sábados voy al mercado porque es muy animado",
                "voy al mercado los sábados porque es muy animado",
                "los sábados yo voy al mercado porque es muy animado",
                "yo voy al mercado los sábados porque es muy animado",
                "los sábados voy al mercado ya que es muy animado",
                "voy al mercado los sábados ya que es muy animado",
              ],
            },
            solution:
              "Time phrase *Los sábados* + verb *voy* + *a + el* = *al mercado* + reason *porque es muy animado* (*animado* agrees with *el mercado*): **Los sábados voy al mercado porque es muy animado.**",
          },
        },
        {
          title: "Cut the repetition",
          problem:
            "Improve this paragraph without changing its meaning: *Mi pueblo es pequeño. Mi pueblo es tranquilo. Mi pueblo es bonito. Me gusta mi pueblo. Me gusta la playa.*",
          steps: [
            "Merge the three adjectives into one sentence and add intensifiers: *Mi pueblo es pequeño, bastante tranquilo y muy bonito.*",
            "Replace *Me gusta mi pueblo* with a stronger opinion and a new start: *Me encanta vivir aquí…*",
            "Turn *Me gusta la playa* into a 'best thing': *…y lo mejor es que hay una playa preciosa.*",
          ],
          answer:
            "*Mi pueblo es pequeño, bastante tranquilo y muy bonito. Me encanta vivir aquí y lo mejor es que hay una playa preciosa.*",
        },
      ],
      keyPoints: [
        "Formula: time phrase + verb + detail + opinion + reason + connective + contrast.",
        "Get the core verb right first, then add one block at a time.",
        "Vary sentence starts: *Normalmente…, En mi opinión…, Lo bueno es que…, Además…*",
        "Avoid repetition: drop subjects, swap adjectives and verbs, don't chain *y… y… y…*.",
      ],
      whyItWorks:
        "Each block answers a question a curious reader would ask: when? with whom? what do you think? why? but? Answer them all and your sentence is naturally long, varied and informative. Building around a secure core also protects accuracy — if the verb is right before you decorate, a long sentence is just several short, correct pieces joined together.",
      strategies: ["Build it up (extended sentence)", "Recycle a chunk", "Say it aloud"],
      thinkDeeper:
        "Is longer always better? Write a 30-word sentence that is *worse* than a 15-word one. What made it worse — and what does that tell you about where to stop?",
    },
    // ---------------------------------------------------------------------
    {
      id: "three-time-frames",
      heading: "Past, present and future in one paragraph",
      discovery: {
        problem:
          "Read Carmen's message:\n\n    Normalmente voy al centro los sábados. El sábado pasado fui al museo con mi hermano. El sábado que viene voy a ir a la playa.\n\n1. Find the three verbs that come from *ir* (to go).\n2. Which one is past, which present and which future?\n3. Which words *before* each verb warned you which time frame was coming?",
        idea:
          "*voy* = present (I go), *fui* = past (I went), *voy a ir* = future (I'm going to go).\n\nThe **time phrases** are signposts: *normalmente* → present, *el sábado pasado* → past, *el sábado que viene* → future. Read the signpost first, then choose the verb.",
      },
      body:
        "A top-level paragraph moves between **three time frames**. The secret: put a **time phrase** at the start as a signpost, then choose the matching verb.\n\n| | Past (preterite) | Present | Future (ir a + infinitive) |\n|---|---|---|---|\n| Signposts | ayer, el fin de semana pasado, el verano pasado | normalmente, los sábados, a menudo, todos los días | mañana, el sábado que viene, la semana próxima, el año que viene |\n| ir (I) | fui | voy | voy a ir |\n| ir (we) | fuimos | vamos | vamos a ir |\n| visitar | visité | visito | voy a visitar |\n| comer | comí | como | voy a comer |\n| ver | vi | veo | voy a ver |\n| comprar | compré | compro | voy a comprar |\n| hacer | hice | hago | voy a hacer |\n| hay | hubo | hay | va a haber |\n| opinion | fue genial | es genial | va a ser genial |\n\n- Regular preterite *yo* forms carry an accent: **-é** for -ar verbs (*visité, compré*) and **-í** for -er/-ir verbs (*comí, salí*). *Fui, vi* and *hice* have no accent.\n- *Hubo* ('there was') is for a one-off event: *Hubo un concierto en la plaza.*\n- The future only needs the present of *ir* + *a* + infinitive — no new endings to learn.\n- Opinions travel through time too: *fue genial → es genial → va a ser genial*.\n\n**Model paragraph: a town visit in three time frames**\n\n    Vivo en Singapur, una ciudad moderna y muy verde que está situada en el sudeste asiático. Normalmente, los fines de semana voy al centro en metro con mis amigos porque hay muchas tiendas y es bastante animado. Lo malo es que siempre hace demasiado calor. El verano pasado fui a Sevilla con mi familia. Visité la catedral y comí churros con chocolate en una plaza preciosa. ¡Fue genial! Sin embargo, hizo muchísimo calor, así que no salimos por la tarde. El año que viene voy a ir a Madrid con mi clase de español, ya que quiero ver el Museo del Prado. ¡Va a ser increíble!\n\n*I live in Singapore, a modern and very green city located in South-East Asia. Normally at weekends I go into the centre by MRT with my friends because there are lots of shops and it's quite lively. The bad thing is that it's always too hot. Last summer I went to Seville with my family. I visited the cathedral and ate churros with chocolate in a beautiful square. It was great! However, it was really hot, so we didn't go out in the afternoon. Next year I'm going to go to Madrid with my Spanish class, as I want to see the Prado Museum. It's going to be amazing!*\n\n**Spot the toolkit:** three time frames signposted by *normalmente*, *el verano pasado* and *el año que viene*; *lo malo es que*; connectives (*porque, sin embargo, así que, ya que*); intensifiers (*muy, bastante, demasiado, muchísimo*); and opinions in two tenses (*fue genial, va a ser increíble*).",
      diagram: `<svg viewBox="0 0 480 245" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Timeline with three boxes from left to right. Past: ayer, la semana pasada; fui, visité, comí, vi; fue genial. Present: normalmente, los sábados; voy, visito, como, hay; es genial. Future: mañana, el sábado que viene; voy a ir, voy a visitar; va a ser genial. An arrow underneath runs from ayer through hoy to mañana."><rect width="480" height="245" fill="#ffffff"/><rect x="15" y="10" width="140" height="165" rx="10" fill="#fecaca" stroke="#334155"/><rect x="170" y="10" width="140" height="165" rx="10" fill="#bbf7d0" stroke="#334155"/><rect x="325" y="10" width="140" height="165" rx="10" fill="#bae6fd" stroke="#334155"/><text x="85" y="34" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#1f2937">PASADO</text><text x="240" y="34" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#1f2937">PRESENTE</text><text x="395" y="34" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#1f2937">FUTURO</text><text x="85" y="58" font-family="sans-serif" font-size="11" font-style="italic" text-anchor="middle" fill="#334155">ayer</text><text x="85" y="74" font-family="sans-serif" font-size="11" font-style="italic" text-anchor="middle" fill="#334155">la semana pasada</text><text x="240" y="58" font-family="sans-serif" font-size="11" font-style="italic" text-anchor="middle" fill="#334155">normalmente</text><text x="240" y="74" font-family="sans-serif" font-size="11" font-style="italic" text-anchor="middle" fill="#334155">los sábados</text><text x="395" y="58" font-family="sans-serif" font-size="11" font-style="italic" text-anchor="middle" fill="#334155">mañana</text><text x="395" y="74" font-family="sans-serif" font-size="11" font-style="italic" text-anchor="middle" fill="#334155">el sábado que viene</text><line x1="25" y1="86" x2="145" y2="86" stroke="#334155"/><line x1="180" y1="86" x2="300" y2="86" stroke="#334155"/><line x1="335" y1="86" x2="455" y2="86" stroke="#334155"/><text x="85" y="108" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">fui · visité</text><text x="85" y="126" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">comí · vi</text><text x="240" y="108" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">voy · visito</text><text x="240" y="126" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">como · hay</text><text x="395" y="108" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">voy a ir</text><text x="395" y="126" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">voy a visitar</text><text x="85" y="158" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle" fill="#1f2937">fue genial</text><text x="240" y="158" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle" fill="#1f2937">es genial</text><text x="395" y="158" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle" fill="#1f2937">va a ser genial</text><line x1="15" y1="200" x2="455" y2="200" stroke="#1f2937" stroke-width="2"/><polygon points="455,194 467,200 455,206" fill="#1f2937"/><line x1="85" y1="194" x2="85" y2="206" stroke="#1f2937" stroke-width="2"/><line x1="240" y1="194" x2="240" y2="206" stroke="#1f2937" stroke-width="2"/><line x1="395" y1="194" x2="395" y2="206" stroke="#1f2937" stroke-width="2"/><text x="85" y="225" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">ayer</text><text x="240" y="225" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">hoy</text><text x="395" y="225" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">mañana</text></svg>`,
      diagramCaption:
        "Read the signpost (time phrase), then pick the verb from the same box. Even the opinion moves: *fue → es → va a ser*.",
      workedExamples: [
        {
          title: "Move one sentence through time",
          problem: "Put *Normalmente voy al mercado.* into the past (start with *Ayer*) and the future (start with *Mañana*).",
          steps: [
            "Past signpost *ayer* → preterite of *ir*: *fui* → *Ayer fui al mercado.*",
            "Future signpost *mañana* → *voy a* + infinitive *ir* → *Mañana voy a ir al mercado.*",
            "Check: *al mercado* (a + el) stays the same in all three.",
          ],
          answer: "*Ayer fui al mercado. Normalmente voy al mercado. Mañana voy a ir al mercado.*",
          yourTurn: {
            question:
              "Your turn: rewrite *Normalmente visito el museo.* so it is about last Saturday, starting with *El sábado pasado*.",
            answer: { type: "text", accept: ["el sábado pasado visité el museo", "el sábado pasado yo visité el museo"] },
            solution:
              "*El sábado pasado* signals the past → preterite of *visitar*: stem *visit-* + *-é* = *visité* (accent!). **El sábado pasado visité el museo.**",
          },
        },
        {
          title: "Three signposts, three tenses",
          problem:
            "Write in Spanish: 'Last weekend I visited Málaga. Normally I go to the beach. Next Saturday I'm going to visit the castle.'",
          steps: [
            "Signpost 1, *el fin de semana pasado* → preterite: *visité Málaga* (accent on *-é*).",
            "Signpost 2, *normalmente* → present: *voy a la playa* (*a + la* doesn't contract).",
            "Signpost 3, *el sábado que viene* → *voy a* + infinitive: *voy a visitar el castillo*.",
          ],
          answer:
            "*El fin de semana pasado visité Málaga. Normalmente voy a la playa. El sábado que viene voy a visitar el castillo.*",
          yourTurn: {
            question: "Your turn: write in Spanish 'Next weekend we are going to visit the museum.'",
            answer: {
              type: "text",
              accept: [
                "el fin de semana que viene vamos a visitar el museo",
                "el próximo fin de semana vamos a visitar el museo",
                "el fin de semana próximo vamos a visitar el museo",
                "vamos a visitar el museo el fin de semana que viene",
                "vamos a visitar el museo el próximo fin de semana",
                "vamos a visitar el museo el fin de semana próximo",
                "el fin de semana que viene nosotros vamos a visitar el museo",
                "el próximo fin de semana nosotros vamos a visitar el museo",
              ],
            },
            solution:
              "Future signpost *el fin de semana que viene* (or *el próximo fin de semana*) + *nosotros* form of *ir* (*vamos*) + *a* + *visitar*: **El fin de semana que viene vamos a visitar el museo.**",
          },
        },
      ],
      keyPoints: [
        "Signpost first: *ayer / el … pasado* → past; *normalmente / los sábados* → present; *mañana / el … que viene* → future.",
        "Key preterites: *fui, visité, comí, vi, compré, hice, hubo, fue*.",
        "Future = *voy / vas / va / vamos / vais / van* + *a* + infinitive.",
        "Regular *yo* preterites need an accent: *visité, comí*.",
        "Put an opinion in more than one tense: *fue genial, va a ser genial*.",
      ],
      whyItWorks:
        "The time phrase and the verb ending must tell the same story, so a reader gets the message twice — that's why a mismatch (*ayer voy*) jars so badly. The preterite is for completed events, so it suits a finished visit. And the near future is built from the present of *ir*, which you already know: one familiar verb unlocks every future plan.",
      strategies: ["Use the time phrase", "Mind the accent", "Find the infinitive"],
      thinkDeeper:
        "*Visitamos el museo* could be 'we visit' or 'we visited' — the *-amos* form of an -ar verb is the same in the present and the preterite. How would a reader know which you mean? Add one word that makes it clearly past.",
    },
  ],
  learn: {
    flashcards: [
      { front: "histórico / histórica", back: "historic" },
      { front: "ruidoso / ruidosa", back: "noisy" },
      { front: "animado / animada", back: "lively" },
      { front: "Está situada en la costa.", back: "It (fem.) is located on the coast." },
      { front: "Tiene unos diez mil habitantes.", back: "It has about 10,000 inhabitants." },
      { front: "Lo bueno es que…", back: "The good thing is that…" },
      { front: "Lo peor es que…", back: "The worst thing is that…" },
      { front: "Hay demasiado tráfico.", back: "There's too much traffic." },
      { front: "No hay nada para los jóvenes.", back: "There's nothing for young people." },
      { front: "Me gustaría que hubiera…", back: "I'd like there to be… (fixed chunk)" },
      { front: "sin embargo", back: "however" },
      { front: "por eso", back: "so, that's why" },
      { front: "aunque", back: "although" },
      { front: "ya que", back: "since, as (gives a reason)" },
      { front: "además", back: "what's more, in addition" },
      { front: "bastante", back: "quite" },
      { front: "El fin de semana pasado fui…", back: "Last weekend I went…" },
      { front: "El sábado que viene voy a…", back: "Next Saturday I'm going to…" },
      { front: "What does *y* become before *histórica*?", back: "*e*: *moderna e histórica*." },
      { front: "What's the past (preterite) of *hay*?", back: "*hubo* — there was (an event)." },
    ],
    mustKnow: [
      "I can describe a town with adjectives that agree with *el pueblo* or *la ciudad*.",
      "I can say where a town is with *está (situado/a) en…* and how big it is with *tiene… habitantes*.",
      "I can give pros and cons with *lo bueno / lo mejor / lo malo / lo peor es que…*.",
      "I can name town problems with *mucho / demasiado* agreeing: *demasiada basura*.",
      "I can use *Me gustaría que hubiera…* as a fixed chunk to say what I'd change.",
      "I can join ideas with *y, pero, además, sin embargo, aunque, porque, ya que, por eso, así que*.",
      "I can upgrade adjectives with *un poco, bastante, muy, realmente, tan, demasiado*.",
      "I can build an extended sentence: time phrase + verb + detail + opinion + reason + contrast.",
      "I can vary sentence starts and avoid repeating the same word.",
      "I can write a paragraph using the preterite, the present and *ir a* + infinitive, signposted by time phrases.",
    ],
    misconceptions: [
      { wrong: "*Mi ciudad es en el norte.*", right: "*Mi ciudad **está** (situada) en el norte.* — location always uses *estar*." },
      { wrong: "*Mi ciudad es histórico.*", right: "*Mi ciudad es histórica.* — *ciudad* is feminine, so the adjective ends in *-a*." },
      { wrong: "*Hay muy tráfico.*", right: "*Hay **mucho** tráfico.* — *muy* goes with adjectives, *mucho* with nouns." },
      { wrong: "*El bueno es que hay un parque.*", right: "*Lo bueno es que hay un parque.* — *lo* + adjective = 'the good thing'." },
      { wrong: "*Hay demasiado gente.*", right: "*Hay demasiad**a** gente.* — *gente* is feminine singular, and *demasiado* before a noun agrees." },
      { wrong: "*Una ciudad moderna y histórica.*", right: "*Una ciudad moderna **e** histórica.* — *y* becomes *e* before an 'ee' sound (*i- / hi-*)." },
      { wrong: "*Ayer voy al parque.*", right: "*Ayer **fui** al parque.* — a past signpost needs a past verb." },
    ],
    examMistakes: [
      "Leaving off the accent on regular preterites: *visite* instead of *visité*, *comi* instead of *comí*.",
      "Mismatching the time phrase and the tense: *El sábado que viene fui…*",
      "Writing *a el* instead of *al*: *fui a el parque* → *fui al parque*.",
      "Confusing *porque* (because) with *¿por qué?* (why?).",
      "Forgetting *de* after *millones*: *dos millones habitantes* → *dos millones de habitantes*.",
      "Chaining *y… y… y…* instead of using a range of connectives.",
      "Repeating *es bonito* — vary with *precioso, impresionante, animado*.",
      "Changing the fixed chunk *me gustaría que hubiera* (e.g. *me gustaría que hay*).",
    ],
    mnemonics: [
      {
        topic: "Extended-sentence formula",
        device: "**T**he **V**ery **D**aring **O**wl **R**aced **C**heetahs",
        explanation: "**T**ime phrase · **V**erb · **D**etail · **O**pinion · **R**eason · **C**onnective + contrast — in that order.",
      },
      {
        topic: "y → e",
        device: "When *y* meets an 'ee', it turns into *e*.",
        explanation: "*Moderna e interesante*, *bonita e histórica*: two 'ee' sounds side by side would blur, so *y* changes.",
      },
      {
        topic: "lo + adjective",
        device: "*Lo* = 'the ___ thing'.",
        explanation: "Fill the blank with the adjective: *lo bueno* = the good thing, *lo peor* = the worst thing.",
      },
    ],
    realWorld: [
      {
        title: "Writing to an exchange partner",
        detail:
          "A first email from a Spanish exchange partner (*intercambio*) almost always asks *¿Cómo es tu ciudad?* Your answer — *Vivo en Singapur, una ciudad moderna y muy limpia…* — uses everything in this topic.",
        emoji: "✉️",
      },
      {
        title: "Reviews in Spanish",
        detail:
          "Spanish-language reviews of hotels and restaurants are often laid out as *Lo mejor: la ubicación. Lo peor: el ruido.* Once you know *lo mejor / lo peor*, you can read them at a glance.",
        emoji: "⭐",
      },
      {
        title: "World Heritage cities",
        detail:
          "Spain has a group of 15 *Ciudades Patrimonio de la Humanidad*, including Toledo, Segovia and Salamanca. Their tourist leaflets are packed with *ciudad histórica*, *además* and *lo más impresionante es…*",
        emoji: "🏰",
      },
      {
        title: "Singapore, the Garden City",
        detail:
          "Singapore has promoted itself as a 'Garden City' since the 1960s — in Spanish you'd say *una ciudad muy verde y limpia*. A useful line when a Spanish visitor asks what your city is like.",
        emoji: "🌳",
      },
      {
        title: "Tourist offices in Spain",
        detail:
          "At an *oficina de turismo* in Málaga or Sevilla, staff will tell you *lo mejor de la ciudad es…* and recommend what to see — listen for the time phrases when they describe events: *el sábado que viene hay un concierto*.",
        emoji: "🗺️",
      },
    ],
    videos: [
      {
        title: "Describing your town in Spanish",
        channel: "Spanish with Profe (search)",
        url: "https://www.youtube.com/results?search_query=describing+your+town+in+spanish+mi+ciudad+es",
      },
      {
        title: "Spanish connectives for better writing",
        channel: "Language Gym (search)",
        url: "https://www.youtube.com/results?search_query=spanish+connectives+sin+embargo+aunque+por+eso",
      },
      {
        title: "The preterite tense explained",
        channel: "Señor Jordan (search)",
        url: "https://www.youtube.com/results?search_query=senor+jordan+preterite+tense",
      },
      {
        title: "Writing in past, present and future",
        channel: "Butterfly Spanish (search)",
        url: "https://www.youtube.com/results?search_query=spanish+writing+past+present+future+paragraph",
      },
      {
        title: "A city tour in easy Spanish",
        channel: "Dreaming Spanish (search)",
        url: "https://www.youtube.com/results?search_query=dreaming+spanish+ciudad+beginner",
      },
    ],
    formulas: [
      {
        name: "Describing a town",
        formula: "Mi pueblo / ciudad es + adjective (agrees) · está (situado/a) en + place · tiene + number + habitantes",
        note: "Mi ciudad es moderna. Está situada en la costa y tiene unos cien mil habitantes.",
      },
      {
        name: "Pros and cons",
        formula: "Lo bueno / mejor / malo / peor (de…) es que + sentence",
        note: "Lo peor de mi barrio es que no hay nada para los jóvenes.",
      },
      {
        name: "Intensifier vs quantity",
        formula: "muy / bastante / demasiado + adjective (no change) · mucho / demasiado + noun (agrees)",
        note: "Es demasiado ruidosa. Hay demasiada basura.",
      },
      {
        name: "Extended sentence",
        formula: "time phrase + verb + detail + opinion + reason + connective + contrast",
        note: "Los sábados voy al parque con mis amigos y me encanta porque es muy tranquilo; sin embargo, no voy cuando llueve.",
      },
      {
        name: "Three time frames",
        formula: "past signpost + preterite · present signpost + present · future signpost + ir a + infinitive",
        note: "Ayer fui al museo. Normalmente voy al parque. Mañana voy a ir a la playa.",
      },
    ],
  },
};
