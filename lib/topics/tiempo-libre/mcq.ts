import type { Paper } from "../../types.ts";

export const mcqPapers: Paper[] = [
  // ============================== MCQ PAPER 1 ==============================
  {
    id: "tiempo-libre-m1",
    title: "MCQ Paper 1",
    questions: [
      {
        kind: "mcq",
        id: "tiempo-libre-m1-q01",
        question: "What does *sacar fotos* mean?",
        options: ["to look at photos", "to send photos", "to take photos", "to draw pictures"],
        answerIndex: 2,
        explanation:
          "*Sacar fotos* (in Spain also *hacer fotos*) = to take photos. *Sacar* normally means 'to take out' — you 'take out' a picture with your camera or phone. 'To look at photos' would be *ver fotos*, and 'to draw' is *dibujar*.",
        difficulty: "warmup",
        guideRef: "activities",
        hints: ["*Sacar* means 'to take out'. What do you 'take' with a camera or a phone?"],
        strategy: "Use context",
      },
      {
        kind: "mcq",
        id: "tiempo-libre-m1-q02",
        question: "Choose the verb for 'On Saturdays I play the guitar.'\n\n    Los sábados ___ la guitarra.",
        options: ["toco", "juego", "hago", "juega"],
        answerIndex: 0,
        explanation:
          "Instruments take *tocar*: **toco la guitarra**. English uses 'play' for games and instruments, but Spanish splits them — *jugar* is only for games and sports (*juego al tenis*), so *juego la guitarra* is the classic English-speaker's slip. *Juega* is also the wrong person (he/she).",
        difficulty: "warmup",
        guideRef: "activities",
        hints: ["Is a guitar a game or an instrument? Spanish uses a different verb for each."],
        strategy: "Look for the pattern",
      },
      {
        kind: "mcq",
        id: "tiempo-libre-m1-q03",
        question: "Which sentence means 'I like video games'?",
        options: ["Me gusta los videojuegos.", "Me gustan los videojuegos.", "Yo gusto los videojuegos.", "Me gustan videojuegos."],
        answerIndex: 1,
        explanation:
          "With *gustar* the thing you like is the subject, so the verb agrees with it: *los videojuegos* is plural → **gustan**. *Me gusta los videojuegos* is the most common mistake — singular *gusta* doesn't match a plural noun. *Yo gusto* means 'I am pleasing', and Spanish needs the article *los* after *gustar*.",
        difficulty: "warmup",
        guideRef: "gustar-and-preferences",
        hints: ["Is *los videojuegos* singular or plural? *Gustar* agrees with the thing liked."],
        strategy: "Agreement check",
      },
      {
        kind: "mcq",
        id: "tiempo-libre-m1-q04",
        question: "Complete: 'My parents like the news.'\n\n    A mis padres ___ las noticias.",
        options: ["le gustan", "les gusta", "nos gustan", "les gustan"],
        answerIndex: 3,
        explanation:
          "Two things to get right. The pronoun for 'to them' is *les* (*mis padres* = they), and *las noticias* is plural → *gustan*. So: **les gustan**. *Les gusta* has the right pronoun but forgets that *noticias* is plural; *le gustan* would mean 'he/she likes'; *nos* = us.",
        difficulty: "core",
        guideRef: "gustar-and-preferences",
        hints: [
          "Who likes the news — one person or more? That decides *le* or *les*.",
          "Now look at *las noticias*: singular or plural? That decides *gusta* or *gustan*.",
        ],
        strategy: "Check the subject",
      },
      {
        kind: "mcq",
        id: "tiempo-libre-m1-q05",
        question: "What does *después del colegio* mean?",
        options: ["before school", "after school", "at school", "behind the school"],
        answerIndex: 1,
        explanation:
          "*Después de* = after, and *de + el* contracts to *del* → **after school**. 'Before school' would be *antes del colegio*, and 'behind the school' is *detrás del colegio* — don't mix up *después* and *detrás*.",
        difficulty: "warmup",
        guideRef: "describing-activities",
        hints: ["*Después* is the opposite of *antes* (before)."],
      },
      {
        kind: "mcq",
        id: "tiempo-libre-m1-q06",
        question: "Which is the correct Spanish for 'On Saturdays I go to the shopping centre with my sister'?",
        options: [
          "Los sábados voy a el centro comercial con mi hermana.",
          "Los sábados va al centro comercial con mi hermana.",
          "Los sábados voy al centro comercial con mi hermana.",
          "Los sábados voy al comercial centro con mi hermana.",
        ],
        answerIndex: 2,
        explanation:
          "*Voy* is the *yo* form of *ir*, *a + el* must contract to *al*, and the adjective *comercial* follows the noun: **Los sábados voy al centro comercial con mi hermana.** *Voy a el centro* forgets the contraction, *va* means 'he/she goes', and *comercial centro* copies English word order.",
        difficulty: "core",
        guideRef: "describing-activities",
        hints: [
          "Check three things: the verb form for 'I', what happens to *a + el*, and the word order of 'shopping centre'.",
          "*a + el* → *al*; in Spanish the describing word usually comes after the noun.",
        ],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "tiempo-libre-m1-q07",
        question: "*Los dibujos animados* are…",
        options: ["cartoons", "drawing classes", "soap operas", "game shows"],
        answerIndex: 0,
        explanation:
          "*Dibujos animados* = literally 'animated drawings' → **cartoons**. Game shows are *los concursos*, and soap operas are *las telenovelas*.",
        difficulty: "warmup",
        guideRef: "tv-and-music",
        hints: ["Translate it word by word: *dibujos* = drawings, *animados* = …?"],
        strategy: "Spot the cognate",
      },
      {
        kind: "mcq",
        id: "tiempo-libre-m1-q08",
        question: "Complete: 'Comedies are fun.'\n\n    Las comedias son ___.",
        options: ["divertido", "divertidos", "divertida", "divertidas"],
        answerIndex: 3,
        explanation:
          "*Las comedias* is feminine plural, so the adjective takes *-as*: **divertidas**. *Divertidos* is plural but masculine — it would fit *los concursos*, not *las comedias*.",
        difficulty: "core",
        guideRef: "tv-and-music",
        hints: ["What gender is *comedia*? Is *las comedias* singular or plural?", "Feminine plural adjectives end in *-as*."],
        strategy: "Agreement check",
      },
      {
        kind: "mcq",
        id: "tiempo-libre-m1-q09",
        question: "Your friend asks: *¿Quieres ir al cine?* Which reply says **yes**?",
        options: [
          "Lo siento, no puedo.",
          "¡Qué buena idea! ¿A qué hora quedamos?",
          "No, gracias. Prefiero quedarme en casa.",
          "No puedo porque tengo que estudiar.",
        ],
        answerIndex: 1,
        explanation:
          "*¡Qué buena idea!* = What a good idea! — and asking *¿A qué hora quedamos?* (What time shall we meet?) shows you're coming. The others all say no: *Lo siento, no puedo* = Sorry, I can't.",
        difficulty: "warmup",
        guideRef: "making-plans",
        hints: ["Look for the reply that asks a follow-up question about meeting up."],
      },
      {
        kind: "mcq",
        id: "tiempo-libre-m1-q10",
        question: "Choose the verb for 'I can't go out because I have to do my homework.'\n\n    No ___ salir porque tengo que hacer los deberes.",
        options: ["puedo", "podo", "puedes", "quiero"],
        answerIndex: 0,
        explanation:
          "*Poder* is a boot verb (o→ue): *puedo, puedes, puede…* For 'I' you need **puedo**. *Podo* forgets the stem change, *puedes* means 'you can', and *quiero* means 'I want' — *No quiero salir* changes the meaning.",
        difficulty: "core",
        guideRef: "making-plans",
        hints: [
          "Which infinitive means 'to be able to / can'?",
          "*Poder* changes o→ue inside the boot — and *yo* is inside the boot.",
        ],
        strategy: "Find the infinitive",
      },
      {
        kind: "mcq",
        id: "tiempo-libre-m1-q11",
        question:
          "Read the text.\n\n> Me llamo Wei Ling y vivo en un piso en Singapur. Después del colegio, normalmente voy a la piscina con mi hermano porque hace mucho calor. Los martes y los jueves tengo clase de piano en casa. Los fines de semana salgo con mis amigas: vamos al centro comercial o al cine. A veces me quedo en casa y navego por internet, pero prefiero estar con mis amigas.\n\nWhere does Wei Ling have her piano lessons?",
        options: ["At the swimming pool", "At the shopping centre", "At school", "At home"],
        answerIndex: 3,
        explanation:
          "*Los martes y los jueves tengo clase de piano en casa* — *en casa* = **at home**. The pool is where she goes after school with her brother, and the shopping centre is a weekend plan with her friends.",
        difficulty: "core",
        guideRef: "describing-activities",
        hints: ["Find the word *piano* in the text.", "Look at the place phrase straight after it: *en …*"],
        strategy: "Use context",
      },
      {
        kind: "mcq",
        id: "tiempo-libre-m1-q12",
        question:
          "Read the text.\n\n> ¡Hola! Soy Diego. Me encanta la música, sobre todo el rap, y me gustan mucho los videojuegos. Mi hermana Lucía es diferente: le gusta leer y le interesan los documentales. A mis padres les gusta cocinar juntos los domingos. A mí no me gusta nada cocinar, ¡es un rollo! Pero me encanta comer la paella de verduras de mi padre.\n\nWho is interested in documentaries?",
        options: ["Diego", "Diego's parents", "Lucía", "Diego's father"],
        answerIndex: 2,
        explanation:
          "*Le interesan los documentales* is said about *mi hermana Lucía* — *le* = to her. Diego himself loves rap and video games, and his parents like cooking together.",
        difficulty: "core",
        guideRef: "gustar-and-preferences",
        hints: ["Find *documentales* in the text.", "Who is that sentence about? Look at the name just before *le interesan*."],
        strategy: "Use context",
      },
      {
        kind: "mcq",
        id: "tiempo-libre-m1-q13",
        question:
          "Read the conversation.\n\n> **Javier:** Hola, Sofía. ¿Quieres ir a la piscina el sábado por la mañana?\n> **Sofía:** Lo siento, no puedo. Tengo que ayudar a mi madre en casa. ¿Y por la tarde?\n> **Javier:** Por la tarde voy a jugar al fútbol con mi primo. ¿Quieres ir al cine el domingo?\n> **Sofía:** ¡Qué buena idea! ¿Dónde quedamos?\n> **Javier:** Delante del cine, a las cinco.\n\nWhat are Javier and Sofía going to do **together**?",
        options: [
          "Go to the cinema on Sunday",
          "Go swimming on Saturday morning",
          "Play football on Saturday afternoon",
          "Go to the cinema on Saturday afternoon",
        ],
        answerIndex: 0,
        explanation:
          "Sofía can't do Saturday morning (*tengo que ayudar a mi madre*), and on Saturday afternoon Javier is playing football with his cousin. She accepts the Sunday cinema plan: *¡Qué buena idea!* 'Play football on Saturday afternoon' is Javier's own plan, not a shared one.",
        difficulty: "challenge",
        guideRef: "making-plans",
        hints: [
          "Track each suggestion: who says yes and who says no?",
          "*Lo siento, no puedo* = a refusal. *¡Qué buena idea!* = an acceptance. Which suggestion gets the acceptance?",
        ],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "tiempo-libre-m1-q14",
        question:
          "Read the text.\n\n> En mi casa todos vemos la tele por la noche, pero no nos gustan los mismos programas. Mi padre prefiere las noticias porque son informativas. Mi madre ve los concursos: dice que son emocionantes. Mi hermano pequeño solo ve los dibujos animados. Yo prefiero las series de ciencia ficción, pero creo que las películas de terror son horribles.\n\nWhat does the writer think of horror films?",
        options: ["They are exciting.", "They are awful.", "They are informative.", "They are funny."],
        answerIndex: 1,
        explanation:
          "*Creo que las películas de terror son horribles* — *horribles* = **awful / horrible**. *Emocionantes* (exciting) is what the mother says about game shows, and *informativas* is the father's view of the news.",
        difficulty: "core",
        guideRef: "tv-and-music",
        hints: ["Find *películas de terror*.", "Which adjective comes after *son*? Is it a cognate?"],
        strategy: "Spot the cognate",
      },
      {
        kind: "mcq",
        id: "tiempo-libre-m1-q15",
        question: "Which sentence is **completely** correct?",
        options: [
          "A mi hermana le gusta las películas de acción.",
          "Mis amigos les gusta salir los viernes.",
          "Me gustan jugar al baloncesto con mi primo.",
          "A mi hermano le gustan los videojuegos y la música pop.",
        ],
        answerIndex: 3,
        explanation:
          "Two things liked together (*los videojuegos y la música pop*) count as plural → *gustan*, and *A mi hermano le…* is the right frame. The others: *le gusta las películas* needs *gustan*; *Mis amigos les gusta* is missing the *A* at the start (*A mis amigos les gusta…*); and an infinitive always takes singular *gusta*: *Me gusta jugar…*, not *Me gustan jugar*.",
        difficulty: "challenge",
        guideRef: "gustar-and-preferences",
        hints: [
          "Check each sentence for: the *a* before a named person, the pronoun, and whether *gusta/gustan* matches what is liked.",
          "An infinitive (*jugar*) counts as singular. Two nouns joined by *y* count as plural.",
        ],
        strategy: "Eliminate options",
      },
    ],
  },

  // ============================== MCQ PAPER 2 ==============================
  {
    id: "tiempo-libre-m2",
    title: "MCQ Paper 2",
    questions: [
      {
        kind: "mcq",
        id: "tiempo-libre-m2-q01",
        question: "What does *montar en bici* mean?",
        options: ["to go up a mountain", "to ride a bike", "to ride a horse", "to repair a bike"],
        answerIndex: 1,
        explanation:
          "*Montar en bici* (*bici* is short for *bicicleta*) = **to ride a bike**. 'To ride a horse' is *montar a caballo*. Don't confuse *montar* with *la montaña* (mountain).",
        difficulty: "warmup",
        guideRef: "activities",
        hints: ["*Bici* is short for *bicicleta*."],
        strategy: "Spot the cognate",
      },
      {
        kind: "mcq",
        id: "tiempo-libre-m2-q02",
        question: "Which sentence means 'I go shopping'?",
        options: ["Voy a compras.", "Soy de compras.", "Compro de ir.", "Voy de compras."],
        answerIndex: 3,
        explanation:
          "The fixed phrase is *ir de compras*, so 'I go shopping' = **Voy de compras.** *Voy a compras* uses the wrong little word, and *soy* comes from *ser* (to be), not *ir* (to go).",
        difficulty: "warmup",
        guideRef: "activities",
        hints: ["The phrase is *ir ___ compras* — which little word does it use?"],
        strategy: "Recycle a chunk",
      },
      {
        kind: "mcq",
        id: "tiempo-libre-m2-q03",
        question: "Choose the verb for 'On Fridays I go out with my friends.'\n\n    Los viernes ___ con mis amigos.",
        options: ["salgo", "salo", "sale", "salimos"],
        answerIndex: 0,
        explanation:
          "*Salir* is irregular in the *yo* form only: **salgo** (like *tengo*, *hago*, *pongo*). *Salo* applies the regular rule and doesn't exist; *sale* = he/she goes out; *salimos* = we go out.",
        difficulty: "core",
        guideRef: "activities",
        hints: [
          "Which infinitive means 'to go out'?",
          "*Salir* has an irregular *yo* form with a *g* — like *tengo* and *hago*.",
        ],
        strategy: "Check the subject",
      },
      {
        kind: "mcq",
        id: "tiempo-libre-m2-q04",
        question: "Complete: 'Documentaries interest me.'\n\n    Me ___ los documentales.",
        options: ["interesa", "intereso", "interesan", "interesamos"],
        answerIndex: 2,
        explanation:
          "*Interesar* works like *gustar*: the verb agrees with what interests you. *Los documentales* is plural → **interesan**. *Intereso* would mean 'I am interesting' — the *yo* ending is a trap.",
        difficulty: "warmup",
        guideRef: "gustar-and-preferences",
        hints: ["*Interesar* behaves like *gustar*. What is the subject — you, or the documentaries?"],
        strategy: "Agreement check",
      },
      {
        kind: "mcq",
        id: "tiempo-libre-m2-q05",
        question: "Complete: 'My sister prefers to watch series.'\n\n    Mi hermana ___ ver series.",
        options: ["prefiere", "prefere", "prefiero", "prefieren"],
        answerIndex: 0,
        explanation:
          "*Preferir* changes e→ie inside the boot: *prefiero, prefieres, prefiere…* *Mi hermana* = she → **prefiere**. *Prefere* forgets the stem change; *prefiero* is 'I prefer'; *prefieren* is 'they prefer'.",
        difficulty: "core",
        guideRef: "gustar-and-preferences",
        hints: [
          "Which person is *mi hermana*?",
          "*Preferir* is e→ie in the boot — the *e* that changes is the stressed one in *-fer-*.",
        ],
        strategy: "Check the subject",
      },
      {
        kind: "mcq",
        id: "tiempo-libre-m2-q06",
        question: "What does *Me aburren los concursos* mean?",
        options: ["I'm crazy about game shows.", "I prefer game shows.", "I find game shows boring.", "I don't watch game shows."],
        answerIndex: 2,
        explanation:
          "*Aburrir* = to bore. Like *gustar*, the thing is the subject: game shows bore me → **I find game shows boring**. 'I'm crazy about game shows' would be *Me chiflan los concursos*.",
        difficulty: "core",
        guideRef: "gustar-and-preferences",
        hints: [
          "*Aburrir* is related to *aburrido* (boring).",
          "It works like *gustar*: *los concursos* are doing the boring, and *me* is who gets bored.",
        ],
        strategy: "Look for the pattern",
      },
      {
        kind: "mcq",
        id: "tiempo-libre-m2-q07",
        question: "What does *con mis primos* mean?",
        options: ["with my first friends", "with my brothers", "with my grandparents", "with my cousins"],
        answerIndex: 3,
        explanation:
          "*Los primos* = **cousins** (*la prima* = a female cousin). It looks like *primero* (first) but has nothing to do with it. Brothers = *hermanos*; grandparents = *abuelos*.",
        difficulty: "warmup",
        guideRef: "describing-activities",
        hints: ["*Primo* is a family word you met in Year 7."],
      },
      {
        kind: "mcq",
        id: "tiempo-libre-m2-q08",
        question: "Which question means 'Who do you go to the cinema with?'",
        options: ["¿Quién vas al cine?", "¿Con quién vas al cine?", "¿Con qué vas al cine?", "¿Cuándo vas al cine?"],
        answerIndex: 1,
        explanation:
          "Spanish never ends a question with a preposition, so 'who … with?' becomes **¿Con quién…?** at the start. *¿Quién vas…?* loses the *con*; *¿Con qué…?* = with what; *¿Cuándo…?* = when.",
        difficulty: "core",
        guideRef: "describing-activities",
        hints: ["English puts 'with' at the end. Where does Spanish put it?", "*Quién* = who, *qué* = what."],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "tiempo-libre-m2-q09",
        question: "What is *una película de terror*?",
        options: ["a horror film", "a terrible film", "an action film", "a war film"],
        answerIndex: 0,
        explanation:
          "*Terror* here means horror → **a horror film**. 'A terrible film' would be *una película horrible*. An action film is *una película de acción*.",
        difficulty: "warmup",
        guideRef: "tv-and-music",
        hints: ["Think of the English word 'terror' — what kind of film terrifies you?"],
        strategy: "Spot the cognate",
      },
      {
        kind: "mcq",
        id: "tiempo-libre-m2-q10",
        question: "Complete: 'Documentaries are interesting.'\n\n    Los documentales son ___.",
        options: ["interesantas", "interesante", "interesantos", "interesantes"],
        answerIndex: 3,
        explanation:
          "Adjectives ending in *-e* don't change for gender — they just add *-s* in the plural: *interesante* → **interesantes**. *Interesantos* and *interesantas* invent endings; *interesante* forgets the plural.",
        difficulty: "core",
        guideRef: "tv-and-music",
        hints: [
          "Does *interesante* end in *-o* or *-e*?",
          "Adjectives ending in *-e* have one form for both genders; just add *-s* for the plural.",
        ],
        strategy: "Agreement check",
      },
      {
        kind: "mcq",
        id: "tiempo-libre-m2-q11",
        question: "You're inviting one friend (*tú*). Which is correct for 'Do you want to come to the beach with me?'",
        options: [
          "¿Queres venir a la playa conmigo?",
          "¿Quiero venir a la playa conmigo?",
          "¿Quieres venir a la playa conmigo?",
          "¿Quieres venir a la playa con mí?",
        ],
        answerIndex: 2,
        explanation:
          "*Querer* is e→ie: *quieres*. 'With me' is the special word *conmigo* — never *con mí*. *Queres* forgets the stem change, and *quiero* means 'I want'.",
        difficulty: "core",
        guideRef: "making-plans",
        hints: [
          "Two things to check: the *tú* form of *querer*, and how to say 'with me'.",
          "*Querer* changes e→ie in the boot; 'with me' is one word.",
        ],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "tiempo-libre-m2-q12",
        question:
          "Read the text.\n\n> Soy Arjun y tengo trece años. Soy muy creativo: me encanta dibujar y sacar fotos con mi móvil. Mi hermano Ravi es diferente. No le gusta nada el arte; prefiere hacer deporte y jugar a los videojuegos con sus amigos. Pero los domingos los dos cocinamos con nuestra madre. ¡Mi plato favorito es la tortilla de patatas!\n\nWhich activity does Arjun do **with his brother**?",
        options: ["Drawing", "Cooking", "Playing video games", "Taking photos"],
        answerIndex: 1,
        explanation:
          "*Los domingos los dos cocinamos con nuestra madre* — *los dos* = both of us, and *cocinamos* is the *nosotros* form (we cook). So Arjun and Ravi **cook** together. Ravi plays video games *con sus amigos* (with his friends), not with Arjun.",
        difficulty: "core",
        guideRef: "activities",
        hints: ["Look for a *nosotros* verb — that's something they do together.", "Find the verb ending in *-amos*."],
        strategy: "Check the subject",
      },
      {
        kind: "mcq",
        id: "tiempo-libre-m2-q13",
        question:
          "Read Carmen's message.\n\n> ¡Hola, Hana! Esta tarde voy a ir de compras al centro comercial con mi prima. ¿Quieres venir? Podemos quedar en la estación de metro a las cuatro y media. Después vamos a tomar un helado en la plaza. ¡Hasta luego! Carmen\n\nWhere and when does Carmen suggest meeting?",
        options: ["At the shopping centre at 4.30", "At the metro station at 4.00", "In the square at 4.30", "At the metro station at 4.30"],
        answerIndex: 3,
        explanation:
          "*Podemos quedar en la estación de metro a las cuatro y media* — at the metro station, at **half past four**. *Y media* = half past, so 4.00 is wrong; the shopping centre is where they're going, and the square is for the ice cream afterwards.",
        difficulty: "core",
        guideRef: "making-plans",
        hints: ["Find the verb *quedar* (to meet up).", "*Y media* = half past."],
        strategy: "Use context",
      },
      {
        kind: "mcq",
        id: "tiempo-libre-m2-q14",
        question:
          "Read the text.\n\n> A Marcus no le gustan nada las películas de terror porque son demasiado violentas. Le chiflan las comedias porque son graciosas, pero dice que los dibujos animados son para niños pequeños. Su hermana Mei prefiere los documentales sobre animales. Esta noche hay una película de acción en la tele y Marcus va a ver la película con su padre, pero Mei va a leer en su dormitorio.\n\nWhich statement is **true**?",
        options: [
          "Marcus thinks cartoons are for young children.",
          "Marcus loves horror films.",
          "Mei prefers comedies.",
          "Marcus is going to watch the action film with his sister.",
        ],
        answerIndex: 0,
        explanation:
          "*Dice que los dibujos animados son para niños pequeños* = he says cartoons are for small children. The traps: he does **not** like horror films (*no le gustan nada*), comedies are Marcus's favourite, not Mei's, and tonight he's watching with *su padre* — Mei is reading.",
        difficulty: "challenge",
        guideRef: "tv-and-music",
        hints: [
          "Check each statement against the text, one at a time.",
          "Watch the little words that flip the meaning: *no … nada*, *su padre* vs *su hermana*.",
        ],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "tiempo-libre-m2-q15",
        question:
          "Read the text.\n\n> Normalmente, después del colegio, Priya hace sus deberes en la biblioteca con su amiga Zara. Luego vuelve a casa en el MRT. Por la tarde escucha música en su dormitorio o chatea con su prima de Málaga. Los sábados por la mañana juega al bádminton en el polideportivo y por la tarde va al centro comercial con su familia. Los domingos descansa en casa: lee y ve series.\n\nWhich statement about Priya is **false**?",
        options: [
          "She chats with her cousin who lives in Málaga.",
          "She plays badminton on Saturday mornings.",
          "She does her homework at home after school.",
          "She reads at home on Sundays.",
        ],
        answerIndex: 2,
        explanation:
          "*Hace sus deberes en la biblioteca con su amiga Zara* — she does her homework **in the library**, not at home. The other three are all in the text: *chatea con su prima de Málaga*, *los sábados por la mañana juega al bádminton*, *los domingos descansa en casa: lee…*",
        difficulty: "challenge",
        guideRef: "describing-activities",
        hints: [
          "The question asks for the FALSE one — find the three true ones first.",
          "Check the place in each sentence: *en la biblioteca*, *en el polideportivo*, *en casa*.",
        ],
        strategy: "Eliminate options",
      },
    ],
  },

  // ============================== MCQ PAPER 3 ==============================
  {
    id: "tiempo-libre-m3",
    title: "MCQ Paper 3",
    questions: [
      {
        kind: "mcq",
        id: "tiempo-libre-m3-q01",
        question: "What does *navegar por internet* mean?",
        options: ["to sail around the world", "to chat online", "to download music", "to surf the internet"],
        answerIndex: 3,
        explanation:
          "*Navegar* = to navigate / sail, and *por internet* = on the internet → **to surf the internet**. 'To chat online' is *chatear*.",
        difficulty: "warmup",
        guideRef: "activities",
        hints: ["*Navegar* looks like 'navigate'. Where are you navigating?"],
        strategy: "Spot the cognate",
      },
      {
        kind: "mcq",
        id: "tiempo-libre-m3-q02",
        question: "Which is correct for 'I play video games' (as said in Spain)?",
        options: ["Toco los videojuegos.", "Juego a los videojuegos.", "Hago a los videojuegos.", "Juego al videojuegos."],
        answerIndex: 1,
        explanation:
          "Games take *jugar a*, and *a + los* does **not** contract: **Juego a los videojuegos.** Only *a + el* becomes *al*, so *al videojuegos* mixes a singular article with a plural noun. *Tocar* is for instruments.",
        difficulty: "core",
        guideRef: "activities",
        hints: ["Is a video game something you play (*jugar*) or do (*hacer*)?", "*a + el* = *al* — but what about *a + los*?"],
        strategy: "Look for the pattern",
      },
      {
        kind: "mcq",
        id: "tiempo-libre-m3-q03",
        question: "Your friend asks *¿Te gusta bailar?* Which answer is correct for 'Yes, I like it a lot'?",
        options: ["Sí, te gusta mucho.", "Sí, me gustan mucho.", "Sí, me gusta mucho.", "Sí, gusto mucho."],
        answerIndex: 2,
        explanation:
          "*Te gusta* (you like) becomes **me gusta** (I like) in the reply. Dancing (*bailar*) is an infinitive, so the verb is singular *gusta*. *Te gusta* just repeats the question's 'you', and *gustan* is for plural nouns.",
        difficulty: "warmup",
        guideRef: "gustar-and-preferences",
        hints: ["The question uses *te* (you). Your answer is about you, so which pronoun?"],
        strategy: "Check the subject",
      },
      {
        kind: "mcq",
        id: "tiempo-libre-m3-q04",
        question: "Which sentence means 'We love going to the cinema'?",
        options: ["Nos encanta ir al cine.", "Nos encantamos ir al cine.", "Nos encantan ir al cine.", "Os encanta ir al cine."],
        answerIndex: 0,
        explanation:
          "*Encantar* works like *gustar*: *nos* shows who loves it, and the verb agrees with *ir al cine* — an infinitive, so singular **encanta**. *Encantamos* conjugates it like a normal 'we' verb; *encantan* treats the infinitive as plural; *os* = you (plural).",
        difficulty: "core",
        guideRef: "gustar-and-preferences",
        hints: ["Who loves it? Which pronoun means 'to us'?", "What is loved? *Ir al cine* — is an infinitive singular or plural?"],
        strategy: "Look for the pattern",
      },
      {
        kind: "mcq",
        id: "tiempo-libre-m3-q05",
        question: "Choose the correct translation: 'I prefer to play the piano, but my sisters prefer to sing.'",
        options: [
          "Prefero tocar el piano, pero mis hermanas prefieren cantar.",
          "Prefiero tocar el piano, pero mis hermanas prefieren cantar.",
          "Prefiero tocar el piano, pero mis hermanas prefiere cantar.",
          "Prefiero jugar al piano, pero mis hermanas prefieren cantar.",
        ],
        answerIndex: 1,
        explanation:
          "*Prefiero* (yo, e→ie) + *prefieren* (ellas, e→ie), and instruments take *tocar*. *Prefero* misses the stem change; *mis hermanas prefiere* uses the singular for a plural subject; *jugar al piano* uses the games verb for an instrument.",
        difficulty: "core",
        guideRef: "gustar-and-preferences",
        hints: ["Check both forms of *preferir* — who is the subject of each?", "Then check the verb used with the instrument."],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "tiempo-libre-m3-q06",
        question: "What does *por la tarde* mean?",
        options: ["late", "at night", "in the morning", "in the afternoon / early evening"],
        answerIndex: 3,
        explanation:
          "*Por la tarde* = **in the afternoon or early evening** (up to dinner time). On its own, *tarde* can mean 'late' (*llego tarde*), but with *por la* it's a time of day. At night = *por la noche*; in the morning = *por la mañana*.",
        difficulty: "warmup",
        guideRef: "describing-activities",
        hints: ["*Por la mañana*, *por la tarde*, *por la noche* — the three parts of the day."],
        strategy: "Use the time phrase",
      },
      {
        kind: "mcq",
        id: "tiempo-libre-m3-q07",
        question:
          "Read the text.\n\n> Me llamo Pablo. Los lunes, después del colegio, voy a la piscina con mi primo. Los miércoles por la tarde toco la batería en mi dormitorio, ¡pero a mis vecinos no les gusta nada! Los viernes por la noche veo una película en casa con mis padres.\n\nWhen does Pablo watch a film with his parents?",
        options: ["On Friday nights", "On Monday nights", "On Wednesday afternoons", "On Friday mornings"],
        answerIndex: 0,
        explanation:
          "*Los viernes por la noche veo una película en casa con mis padres* — **on Friday nights**. Mondays are for the pool with his cousin, and Wednesday afternoons are for the drums (*la batería*).",
        difficulty: "core",
        guideRef: "describing-activities",
        hints: ["Find *película*.", "Look at the day and the part of the day at the start of that sentence."],
        strategy: "Use the time phrase",
      },
      {
        kind: "mcq",
        id: "tiempo-libre-m3-q08",
        question:
          "Lucía says: 'After school I usually go to the park with my brother, but on Saturdays I stay at home alone.' Which translation is **completely** correct?",
        options: [
          "Después del colegio normalmente voy al parque con mi hermano, pero los sábados me quedo en casa solo.",
          "Después de el colegio normalmente voy al parque con mi hermano, pero los sábados me quedo en casa sola.",
          "Después del colegio normalmente voy al parque con mi hermano, pero los sábados me quedo en casa sola.",
          "Después del colegio normalmente voy al parque con mi hermano, pero los sábados quedo en casa sola.",
        ],
        answerIndex: 2,
        explanation:
          "Three traps hide here. Lucía is a girl, so 'alone' must be *sola*, not *solo*; *de + el* must contract to *del*; and 'to stay' is reflexive — *quedarse* → *me quedo*. Without *me*, *quedo* belongs to *quedar* (to meet up / arrange to meet).",
        difficulty: "challenge",
        guideRef: "describing-activities",
        hints: [
          "The options differ in tiny details — compare them word by word.",
          "Check: *de + el*, the ending of 'alone' for a girl, and whether 'to stay' needs a reflexive pronoun.",
        ],
        strategy: "Agreement check",
      },
      {
        kind: "mcq",
        id: "tiempo-libre-m3-q09",
        question: "*Las noticias* are…",
        options: ["notices", "the news", "novels", "series"],
        answerIndex: 1,
        explanation:
          "*Las noticias* = **the news** (always plural in Spanish). It's a false friend — it doesn't mean 'notices'. Novels = *las novelas*; series = *las series*.",
        difficulty: "warmup",
        guideRef: "tv-and-music",
        hints: ["It's what you watch on TV to find out what's happening in the world."],
      },
      {
        kind: "mcq",
        id: "tiempo-libre-m3-q10",
        question: "Which sentence is correct?",
        options: [
          "Me encanta las series porque son emocionantes.",
          "Me encantan las series porque son emocionantas.",
          "Me encantan las series porque es emocionante.",
          "Me encantan las series porque son emocionantes.",
        ],
        answerIndex: 3,
        explanation:
          "*Las series* is plural, so we need *encantan* and *son*, and *emocionante* (ending in *-e*) just adds *-s*: *emocionantes*. *Me encanta las series* breaks the *gustar*-type agreement; *emocionantas* invents a feminine ending; *es emocionante* uses the singular for a plural noun.",
        difficulty: "core",
        guideRef: "tv-and-music",
        hints: ["*Las series* — singular or plural? Check every verb.", "Adjectives ending in *-e* only add *-s* in the plural."],
        strategy: "Agreement check",
      },
      {
        kind: "mcq",
        id: "tiempo-libre-m3-q11",
        question: "What does *¿Dónde quedamos?* mean?",
        options: ["Where are we staying?", "When shall we meet?", "Where shall we meet?", "Where are we?"],
        answerIndex: 2,
        explanation:
          "*Quedar* = to meet up / arrange to meet, so *¿Dónde quedamos?* = **Where shall we meet?** 'Where are we staying?' is the trap — that would use the reflexive *quedarse* (*nos quedamos*). 'When' would be *¿Cuándo…?*",
        difficulty: "warmup",
        guideRef: "making-plans",
        hints: ["*Dónde* = where. *Quedar* is the verb for arranging to meet friends."],
      },
      {
        kind: "mcq",
        id: "tiempo-libre-m3-q12",
        question: "Which sentence means 'This weekend we are going to go to the beach'?",
        options: [
          "Este fin de semana vamos a ir a la playa.",
          "Este fin de semana vamos ir a la playa.",
          "Este fin de semana van a ir a la playa.",
          "Este fin de semana vamos a vamos a la playa.",
        ],
        answerIndex: 0,
        explanation:
          "Near future = *ir* (conjugated) + *a* + infinitive: **vamos a ir**. *Vamos ir* drops the *a*; *van a ir* means 'they are going to go'; *vamos a vamos* conjugates both verbs — the second one must stay as the infinitive.",
        difficulty: "core",
        guideRef: "making-plans",
        hints: ["The near-future formula has three parts: *ir* + ? + infinitive.", "Who is going? 'We' → which form of *ir*?"],
        strategy: "Look for the pattern",
      },
      {
        kind: "mcq",
        id: "tiempo-libre-m3-q13",
        question:
          "Read the class survey.\n\n> **Encuesta de la clase 8B: ¿Qué te gusta hacer en tu tiempo libre?**\n> A Zara le chifla bailar y cantar. A Ravi y a Marcus les gustan los videojuegos, pero a Ravi no le gusta jugar en línea. A Hana le aburre la tele; prefiere leer novelas. A todos nos encanta salir con los amigos los fines de semana.\n\nWhat does Hana find boring?",
        options: ["Reading novels", "Video games", "Going out with friends", "TV"],
        answerIndex: 3,
        explanation:
          "*A Hana le aburre la tele; prefiere leer novelas* — **TV** bores her, and she prefers reading. 'Reading novels' is what she prefers — the opposite of boring for her.",
        difficulty: "core",
        guideRef: "gustar-and-preferences",
        hints: ["Find Hana's name.", "*Aburrir* = to bore. What comes straight after *le aburre*?"],
        strategy: "Use context",
      },
      {
        kind: "mcq",
        id: "tiempo-libre-m3-q14",
        question:
          "Read the text.\n\n> ¡Hola! Me llamo Aisha y vivo en Valencia con mi familia. En mi tiempo libre toco el violín y canto en un coro. También me gusta mucho montar en bici por el jardín del Turia con mi padre. No juego a los videojuegos porque prefiero estar al aire libre. ¡Y cuando llueve, leo o dibujo en casa!\n\nWhy doesn't Aisha play video games?",
        options: ["She finds them boring.", "She prefers being outdoors.", "Her father doesn't let her.", "She doesn't have a console."],
        answerIndex: 1,
        explanation:
          "*No juego a los videojuegos porque prefiero estar al aire libre* — because **she prefers being outdoors** (*al aire libre* = in the open air). Nothing says she finds them boring — don't add ideas that aren't in the text.",
        difficulty: "core",
        guideRef: "activities",
        hints: ["Find *videojuegos*, then the word *porque*.", "*Al aire libre* = in the open air."],
        strategy: "Use context",
      },
      {
        kind: "mcq",
        id: "tiempo-libre-m3-q15",
        question:
          "Read the conversation.\n\n> **Diego:** Oye, Lucía, ¿quieres ir al concierto de pop el viernes?\n> **Lucía:** Me encantaría, pero no puedo. El viernes por la noche voy a cenar en casa de mis abuelos.\n> **Diego:** ¡Qué pena! ¿Y el sábado? Hay una película de ciencia ficción en el cine.\n> **Lucía:** Uf, las películas de ciencia ficción no me interesan nada. ¿Por qué no vamos a la bolera?\n> **Diego:** ¡Vale! ¿A qué hora quedamos?\n> **Lucía:** A las seis, en la plaza.\n\nWhy does Lucía say no to the **Saturday** film?",
        options: [
          "She is having dinner with her grandparents.",
          "She has to do her homework.",
          "She isn't interested in science-fiction films.",
          "She prefers pop concerts.",
        ],
        answerIndex: 2,
        explanation:
          "On Saturday the plan is a science-fiction film, and Lucía replies *las películas de ciencia ficción no me interesan nada* — **they don't interest her at all**. Dinner with her grandparents is her reason for missing the **Friday** concert — a tempting trap if you don't track which day is which. (*Me encantaría* = I'd love to — a useful fixed phrase.)",
        difficulty: "challenge",
        guideRef: "making-plans",
        hints: [
          "There are two invitations. Which one is for Saturday?",
          "Find Lucía's reply straight after the Saturday suggestion. What does *no me interesan nada* mean?",
        ],
        strategy: "Use the time phrase",
      },
    ],
  },
];
