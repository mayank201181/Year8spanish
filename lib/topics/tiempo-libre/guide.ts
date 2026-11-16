import type { TopicGuide } from "../../types.ts";

export const guide: TopicGuide = {
  id: "tiempo-libre",
  title: "El tiempo libre — Free Time",
  strand: "Free Time",
  icon: "🎮",
  summary: "Hobbies, likes and dislikes, TV and music — and making plans with friends.",
  intro:
    "What do you do when school's over? In this topic you'll learn to talk about your hobbies, say what you love and what bores you, give opinions on TV, films and music, and invite a friend out (or politely say no).\n\nBy the end you'll be able to build long, detailed sentences — *when*, *what*, *where*, *who with* and *what you think* — and talk about your plans for the weekend with *voy a* + infinitive.",
  guide: [
    // ------------------------------------------------------------------ 1
    {
      id: "activities",
      heading: "Free-time activities",
      discovery: {
        problem:
          "Without a dictionary, guess what these mean:\n\n    chatear · cocinar · bailar · navegar por internet · sacar fotos · montar en bici\n\nNow look at these two sentences. English uses 'play' in both — Spanish doesn't:\n\n    Toco la guitarra.\n    Juego a los videojuegos.\n\nWhy might Spanish use two different verbs? Make a rule.",
        idea:
          "Most of these are **guessable**: *chatear* (to chat online), *cocinar* (to cook — think 'cuisine'), *navegar por internet* (to surf — 'navigate' — the internet), *sacar fotos* (to take photos), *montar en bici* (to ride — 'mount' — a bike). *Bailar* (to dance) shares its root with 'ballet' and a 'ball' (a dance party).\n\nThe rule: *tocar* (literally 'to touch') is for **instruments**; *jugar a* is for **games and sports**. You touch the strings or keys of an instrument — you don't play a game with it.",
      },
      body:
        "Learn these as **chunks** (verb + the words that go with it), not as single words.\n\n| Infinitive | I… (yo) | English |\n|---|---|---|\n| ver la tele | veo la tele | I watch TV |\n| escuchar música | escucho música | I listen to music |\n| leer | leo | I read |\n| salir con mis amigos | salgo con mis amigos | I go out with my friends |\n| ir al cine | voy al cine | I go to the cinema |\n| ir de compras | voy de compras | I go shopping |\n| jugar a los videojuegos | juego a los videojuegos | I play video games |\n| tocar la guitarra / el piano | toco la guitarra / el piano | I play the guitar / the piano |\n| bailar | bailo | I dance |\n| cantar | canto | I sing |\n| dibujar | dibujo | I draw |\n| navegar por internet | navego por internet | I surf the internet |\n| chatear | chateo | I chat online |\n| sacar fotos | saco fotos | I take photos |\n| cocinar | cocino | I cook |\n| montar en bici | monto en bici | I ride my bike |\n\n**Regular present tense.** Take off *-ar / -er / -ir* and add the ending for the person:\n\n| | escuchar | leer | salir |\n|---|---|---|---|\n| yo | escucho | leo | **salgo** |\n| tú | escuchas | lees | sales |\n| él / ella | escucha | lee | sale |\n| nosotros | escuchamos | leemos | salimos |\n| vosotros | escucháis | leéis | salís |\n| ellos / ellas | escuchan | leen | salen |\n\n*Salir* is regular except for *yo salgo* (just like *hacer* → *hago*: *hago deporte*).\n\n**Three key irregulars** you will use all the time:\n\n| | ir | ver | jugar (u→ue) |\n|---|---|---|---|\n| yo | voy | veo | juego |\n| tú | vas | ves | juegas |\n| él / ella | va | ve | juega |\n| nosotros | vamos | vemos | jugamos |\n| vosotros | vais | veis | jugáis |\n| ellos / ellas | van | ven | juegan |\n\n**Little words that matter**\n\n- *Ir* + a place needs *a*: *voy **al** cine* (*a + el = al*), *voy **a la** playa*.\n- *Ir de compras* has no article: *voy de compras*.\n- *Jugar a* + game: *juego **a los** videojuegos* (*a + los* never contracts — only *a + el* does).\n- *Tocar* + instrument, with **no** *a*: *toco el piano*. Never *juego la guitarra*.\n- *Escuchar* already contains 'to': *escucho música*, not *escucho a música*.\n- *La tele* and *la bici* are short for *la televisión* and *la bicicleta* — both feminine.",
      workedExamples: [
        {
          title: "Two activities in one sentence",
          problem: "Say 'I play the guitar and I listen to music' in Spanish.",
          steps: [
            "The guitar is an instrument → *tocar*, not *jugar*. *Yo* form: *toco*.",
            "Instruments take the article: *toco **la** guitarra*.",
            "'Listen to' = *escuchar* (the 'to' is built in). *Yo* form: *escucho música*.",
            "Join with *y*.",
          ],
          answer: "*Toco la guitarra y escucho música.*",
          yourTurn: {
            question: "Your turn: write 'I go out with my friends' in Spanish.",
            answer: {
              type: "text",
              accept: ["salgo con mis amigos", "yo salgo con mis amigos", "salgo con mis amigas", "yo salgo con mis amigas"],
            },
            solution: "*Salir* has an irregular *yo* form: **salgo** (not *salo*). Then *con mis amigos* (or *amigas* if they are all girls): **Salgo con mis amigos.**",
          },
        },
        {
          title: "Someone else's hobby",
          problem: "Say 'My brother goes to the cinema' in Spanish.",
          steps: [
            "Subject = *mi hermano* → *él* form of *ir*: *va*.",
            "Going to a place needs *a*: *a + el cine* → *al cine*.",
          ],
          answer: "*Mi hermano va al cine.*",
          yourTurn: {
            question: "Your turn: translate 'We watch TV' into Spanish.",
            answer: {
              type: "text",
              accept: ["vemos la tele", "nosotros vemos la tele", "nosotras vemos la tele", "vemos la televisión", "nosotros vemos la televisión", "nosotras vemos la televisión"],
            },
            solution: "*Ver* in the *nosotros* form is *vemos*; TV is *la tele* (short for *la televisión*): **Vemos la tele.**",
          },
        },
      ],
      keyPoints: [
        "Learn activities as chunks: *ver la tele, ir de compras, sacar fotos, montar en bici*.",
        "*Tocar* + instrument (*toco la guitarra*); *jugar a* + game (*juego a los videojuegos*).",
        "Irregular *yo* forms: *voy, veo, salgo, juego, hago*.",
        "*Ir a* + place: *voy al cine*, *voy a la playa* — but *voy de compras*.",
        "*Escuchar* = 'to listen **to**' — no extra *a* before a thing.",
      ],
      whyItWorks:
        "Why are the most common verbs (*ir, ver, salir, hacer*) the irregular ones? Because they are used so often that people never 'tidied them up' — rare verbs drift into regular patterns over centuries, but everyday ones keep their old shapes. English is the same: *go/went*, *be/am/is*, *have/has*.\n\nAnd *tocar* literally means 'to touch': you touch the keys or strings of an instrument, so Spanish uses that verb instead of the 'game' verb *jugar*.",
      strategies: ["Spot the cognate", "Find the infinitive", "Look for the pattern", "Check the subject"],
      thinkDeeper:
        "You say *juego al fútbol* (with *al*) but *juego a los videojuegos* (with *a los*). Why doesn't *a + los* squash into one word the way *a + el* does? (Hint: say *a el* and *a los* aloud — which one has two vowels bumping into each other?)",
    },
    // ------------------------------------------------------------------ 2
    {
      id: "gustar-and-preferences",
      heading: "Gustar, encantar, interesar & preferir",
      discovery: {
        problem:
          "Look carefully at the verb in each sentence:\n\n    Me gusta la música.\n    Me gustan los videojuegos.\n    Me gusta bailar.\n    Me gusta bailar y cantar.\n\nWhy does *gusta* sometimes end in *-n*? Clue: the person doing the liking (*me* = me) is the same every time — so what is the verb agreeing with?",
        idea:
          "*Gustar* really means **'to please'**. *Me gusta la música* = 'Music pleases me'. The thing you like is the **subject**, so the verb agrees with *it*:\n\n- one thing, or one or more activities (infinitives) → **gusta**\n- more than one thing (a plural noun) → **gustan**\n\nThat's why *Me gustan los videojuegos* has an *-n*: the video games (plural) are doing the pleasing.",
      },
      body:
        "**Gustar** means 'to please'. The thing you like is the **subject**, so the verb agrees with *it*, not with you.\n\n- One thing or an activity (infinitive) → **gusta**: *Me gusta el cine. Me gusta leer. Me gusta bailar y cantar.*\n- More than one thing → **gustan**: *Me gustan los videojuegos. Me gustan las series.*\n\n**Who is pleased?** Change the little pronoun in front of the verb:\n\n| for emphasis | pronoun | example |\n|---|---|---|\n| a mí | me | Me gusta el rap. |\n| a ti | te | ¿Te gustan las comedias? |\n| a él / a ella / a usted | le | A mi hermano le gusta dibujar. |\n| a nosotros / a nosotras | nos | Nos gusta ir al cine. |\n| a vosotros / a vosotras | os | ¿Os gustan los concursos? |\n| a ellos / a ellas / a ustedes | les | A mis padres les gusta cocinar. |\n\nWhen you name the person, add *a*: *A mi hermana le gusta leer.* *A Pablo le gustan los videojuegos.*\n\n**The same family** — they all work exactly like *gustar*:\n\n| verb | meaning | example |\n|---|---|---|\n| encantar | to love (literally 'to delight') | Me encantan los dibujos animados. |\n| chiflar | to be crazy about (informal, Spain) | Me chifla el baloncesto. |\n| interesar | to interest | Me interesa la música clásica. |\n| aburrir | to bore | Me aburren las noticias. |\n\nRules to remember:\n\n1. Use the **article** with a general noun: *Me gusta **la** música* — never *me gusta música*.\n2. *Me encanta* is already strong ('I love'). Don't add *muy* or *mucho*.\n3. Negatives: *no* goes before the pronoun: *No me gustan nada los concursos* (I don't like game shows at all).\n\n**Preferir** (e→ie) is a normal verb — the person is the subject:\n\n| | preferir |\n|---|---|\n| yo | prefiero |\n| tú | prefieres |\n| él / ella | prefiere |\n| nosotros | preferimos |\n| vosotros | preferís |\n| ellos / ellas | prefieren |\n\n*Prefiero leer.* · *Mi amiga prefiere las películas de acción.* · *¿Qué prefieres, la tele o los videojuegos?*\n\n> Opinion ladder, strongest to weakest: *me chifla* → *me encanta* → *me gusta mucho* → *me gusta* → *no me gusta* → *no me gusta nada* → *odio* (a normal verb: *odio bailar*).",
      diagram: `<svg viewBox="0 0 460 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Gustar agrees with the thing liked: me gusta with one thing or a verb, me gustan with more than one thing"><rect x="0" y="0" width="460" height="230" fill="#ffffff"/><text x="230" y="22" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#1f2937">The verb agrees with the thing you like</text><rect x="20" y="40" width="130" height="60" rx="10" fill="#bae6fd" stroke="#334155" stroke-width="2"/><text x="85" y="75" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#1f2937">me gusta</text><line x1="150" y1="70" x2="218" y2="70" stroke="#334155" stroke-width="2"/><polygon points="218,64 230,70 218,76" fill="#334155"/><rect x="232" y="40" width="210" height="60" rx="10" fill="#bbf7d0" stroke="#334155" stroke-width="2"/><text x="337" y="64" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">la música · bailar</text><text x="337" y="86" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#334155">one thing or a verb</text><rect x="20" y="120" width="130" height="60" rx="10" fill="#bae6fd" stroke="#334155" stroke-width="2"/><text x="85" y="155" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#1f2937">me gustan</text><line x1="150" y1="150" x2="218" y2="150" stroke="#334155" stroke-width="2"/><polygon points="218,144 230,150 218,156" fill="#334155"/><rect x="232" y="120" width="210" height="60" rx="10" fill="#fde68a" stroke="#334155" stroke-width="2"/><text x="337" y="144" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">los videojuegos · las series</text><text x="337" y="166" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#334155">more than one thing</text><text x="230" y="212" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">Swap the pronoun for the person: me · te · le · nos · os · les</text></svg>`,
      diagramCaption: "With *gustar* the verb looks at the thing you like: one thing or a verb → *gusta*; plural things → *gustan*.",
      workedExamples: [
        {
          title: "Plural thing → gustan",
          problem: "Say 'I love video games' in Spanish.",
          steps: [
            "'Love' (things you enjoy) = *encantar*, which works like *gustar*.",
            "What is being loved? *los videojuegos* — plural → *encantan*.",
            "Who is pleased? Me → *me*.",
          ],
          answer: "*Me encantan los videojuegos.*",
          yourTurn: {
            question: "Your turn: write 'I like films' in Spanish, using *gustar*.",
            answer: { type: "text", accept: ["me gustan las películas", "a mí me gustan las películas"] },
            solution: "Films are plural → *gustan*, and a general noun needs its article: **Me gustan las películas.**",
          },
        },
        {
          title: "Someone else, and a preference",
          problem: "Say 'My brother likes reading, but he prefers to go out' in Spanish.",
          steps: [
            "Name the person with *a*: *A mi hermano…*; 'him' = *le*.",
            "Reading is an activity (infinitive) → singular *gusta*: *le gusta leer*.",
            "*Preferir* is a normal verb: *él* form = *prefiere* (e→ie) + infinitive *salir*.",
          ],
          answer: "*A mi hermano le gusta leer, pero prefiere salir.*",
          yourTurn: {
            question: "Your turn: write 'We prefer to dance' in Spanish.",
            answer: { type: "text", accept: ["preferimos bailar", "nosotros preferimos bailar", "nosotras preferimos bailar"] },
            solution: "*Nosotros* is outside the boot, so no stem change: *preferimos* + infinitive → **Preferimos bailar.**",
          },
        },
        {
          title: "The rest of the family",
          problem: "Complete with the correct form of *aburrir*: *Me ___ las noticias.*",
          steps: [
            "*Aburrir* works like *gustar*: the thing doing the boring is the subject.",
            "*Las noticias* is plural → third-person plural: *aburren*.",
          ],
          answer: "*Me aburren las noticias.* (The news bores me.)",
          yourTurn: {
            question: "Your turn: fill the gap with the correct form of *interesar*: *Nos ___ los documentales.*",
            answer: { type: "text", accept: ["interesan"] },
            solution: "*Los documentales* is plural → **interesan**. (*Nos* tells you who is interested — 'us' — but the verb agrees with the documentaries.)",
          },
        },
      ],
      keyPoints: [
        "*Gustar* = 'to please': the verb agrees with the thing liked.",
        "*gusta* + one thing or infinitive(s); *gustan* + plural noun.",
        "Pronouns: *me, te, le, nos, os, les*; name the person with *a*: *A Sofía le gusta…*",
        "*Encantar, chiflar, interesar, aburrir* work the same way.",
        "*Preferir* (e→ie) is a normal verb: *prefiero, prefieres, prefiere…* + infinitive or noun.",
        "Keep the article: *me gusta **la** música*.",
      ],
      whyItWorks:
        "*Gustar* comes from Latin *gustare*, 'to taste' — something is tasty *to* you. So Spanish says 'Music pleases me', and the verb has to agree with the music, just as in English we say 'Video games **please** me', not 'please' with an *-s*.\n\nEnglish once worked the same way: in older English, 'like' meant 'to please'. In Shakespeare's *Hamlet*, King Claudius says 'It likes us well' — meaning 'It pleases us'.",
      strategies: ["Check the subject", "Agreement check", "Look for the pattern", "Translate back to check"],
      thinkDeeper:
        "*Le gusta el tenis* could mean 'he likes tennis', 'she likes tennis' or 'you (*usted*) like tennis'. How would you make it crystal clear that you are talking to your teacher politely? And why does *Me gusta bailar y cantar* keep the singular *gusta* even though there are two activities?",
    },
    // ------------------------------------------------------------------ 3
    {
      id: "describing-activities",
      heading: "Describing what you do: who, where, when",
      discovery: {
        problem:
          "Here are five chunks. Put them together into one natural Spanish sentence:\n\n    con mi prima · los domingos · voy de compras · en el centro comercial · porque es divertido\n\nThen ask yourself: is there only one correct order? Which chunk could move to the end without changing the meaning?",
        idea:
          "A very natural order is: *Los domingos voy de compras en el centro comercial con mi prima porque es divertido.*\n\nSpanish word order is **flexible** for these extra chunks — *los domingos* could also go at the end. But a reliable frame that always works is:\n\n**When → what → where → who with → opinion**\n\nThe opinion (*porque…*) goes last, because it explains everything before it.",
      },
      body:
        "A Year 8 answer never stops at *Juego al fútbol*. Add **when, where, who with** and **what you think**.\n\n**¿Con quién?** — Who with?\n\n- *con mi hermano / mi hermana / mis amigos / mi familia / mis padres*\n- *solo* (a boy) / *sola* (a girl) — alone. It agrees with **you**: Pablo says *juego solo*, Lucía says *leo sola*.\n- *con + mí = **conmigo*** (with me), *con + ti = **contigo*** (with you): *¿Vienes conmigo?*\n\n**¿Dónde?** — Where?\n\n- *en casa* (at home — no article), *en mi dormitorio*, *en el parque*, *en el centro comercial*, *en el polideportivo*, *en la playa*, *en el centro* (in the town centre)\n\n**¿Cuándo?** — When and how often?\n\n| time phrase | meaning |\n|---|---|\n| después del colegio | after school |\n| por la mañana / por la tarde / por la noche | in the morning / in the afternoon or evening / at night |\n| los sábados | on Saturdays (every Saturday) |\n| el sábado | on Saturday (this one) |\n| los fines de semana | at weekends |\n| todos los días | every day |\n| una vez / dos veces a la semana | once / twice a week |\n| siempre · a menudo · a veces · nunca | always · often · sometimes · never |\n\nNotice *los sábados* (plural = every Saturday, a habit) versus *el sábado* (this Saturday, one time).\n\n**The sentence builder.** A reliable order is:\n\n    Cuándo + actividad + dónde + con quién + opinión\n    Los sábados juego al tenis en el parque con mi hermano porque es divertido.\n\nGlue longer answers together with *y* (and), *pero* (but), *también* (also), *además* (what's more) and *porque* (because):\n\n    Después del colegio veo la tele en casa, pero los fines de semana salgo con mis amigos. Además, a veces voy de compras con mi madre.",
      diagram: `<svg viewBox="0 0 480 170" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A sentence train with five carriages: los sábados, juego al tenis, en el parque, con mi hermano, porque es divertido"><rect x="0" y="0" width="480" height="170" fill="#ffffff"/><text x="240" y="18" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#1f2937">Build a longer sentence, one carriage at a time</text><text x="52" y="44" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#334155">¿Cuándo?</text><text x="146" y="44" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#334155">¿Qué?</text><text x="240" y="44" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#334155">¿Dónde?</text><text x="334" y="44" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#334155">¿Con quién?</text><text x="428" y="44" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#334155">Opinión</text><line x1="96" y1="100" x2="102" y2="100" stroke="#334155" stroke-width="3"/><line x1="190" y1="100" x2="196" y2="100" stroke="#334155" stroke-width="3"/><line x1="284" y1="100" x2="290" y2="100" stroke="#334155" stroke-width="3"/><line x1="378" y1="100" x2="384" y2="100" stroke="#334155" stroke-width="3"/><rect x="8" y="52" width="88" height="60" rx="8" fill="#c7d2fe" stroke="#334155" stroke-width="2"/><rect x="102" y="52" width="88" height="60" rx="8" fill="#fde68a" stroke="#334155" stroke-width="2"/><rect x="196" y="52" width="88" height="60" rx="8" fill="#bbf7d0" stroke="#334155" stroke-width="2"/><rect x="290" y="52" width="88" height="60" rx="8" fill="#fecaca" stroke="#334155" stroke-width="2"/><rect x="384" y="52" width="88" height="60" rx="8" fill="#bae6fd" stroke="#334155" stroke-width="2"/><text x="52" y="78" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">Los</text><text x="52" y="96" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">sábados</text><text x="146" y="78" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">juego</text><text x="146" y="96" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">al tenis</text><text x="240" y="78" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">en el</text><text x="240" y="96" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">parque</text><text x="334" y="78" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">con mi</text><text x="334" y="96" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">hermano</text><text x="428" y="78" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">porque es</text><text x="428" y="96" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">divertido</text><line x1="4" y1="128" x2="476" y2="128" stroke="#334155" stroke-width="2"/><circle cx="28" cy="119" r="8" fill="#334155"/><circle cx="76" cy="119" r="8" fill="#334155"/><circle cx="122" cy="119" r="8" fill="#334155"/><circle cx="170" cy="119" r="8" fill="#334155"/><circle cx="216" cy="119" r="8" fill="#334155"/><circle cx="264" cy="119" r="8" fill="#334155"/><circle cx="310" cy="119" r="8" fill="#334155"/><circle cx="358" cy="119" r="8" fill="#334155"/><circle cx="404" cy="119" r="8" fill="#334155"/><circle cx="452" cy="119" r="8" fill="#334155"/><text x="240" y="155" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">On Saturdays I play tennis in the park with my brother because it's fun.</text></svg>`,
      diagramCaption: "Each carriage answers one question. Start with the time phrase and finish with your opinion.",
      workedExamples: [
        {
          title: "Build it up",
          problem: "Turn *Juego a los videojuegos* into a five-part sentence: after school, at home, with my brother, because it's fun.",
          steps: [
            "When: 'after school' = *después del colegio* (*de + el = del*).",
            "What: *juego a los videojuegos*.",
            "Where: 'at home' = *en casa* (no article).",
            "Who with: *con mi hermano*.",
            "Opinion: *porque es divertido*.",
          ],
          answer: "*Después del colegio juego a los videojuegos en casa con mi hermano porque es divertido.*",
          yourTurn: {
            question: "Your turn: translate into Spanish — 'On Saturdays I go shopping with my mum.'",
            answer: {
              type: "text",
              accept: [
                "los sábados voy de compras con mi madre",
                "los sábados yo voy de compras con mi madre",
                "voy de compras con mi madre los sábados",
                "voy de compras los sábados con mi madre",
                "los sábados voy de compras con mi mamá",
                "voy de compras con mi mamá los sábados",
                "voy de compras los sábados con mi mamá",
              ],
            },
            solution: "Every Saturday = *los sábados* (plural, a habit). 'I go shopping' = *voy de compras*. 'With my mum' = *con mi madre*: **Los sábados voy de compras con mi madre.**",
          },
        },
        {
          title: "Solo or sola?",
          problem: "Lucía wants to say 'I read alone in my bedroom.'",
          steps: [
            "'I read' = *leo*.",
            "'Alone' describes Lucía, a girl → *sola*.",
            "'In my bedroom' = *en mi dormitorio*.",
          ],
          answer: "*Leo sola en mi dormitorio.*",
          yourTurn: {
            question: "Your turn: Pablo wants to say 'I listen to music alone.' Write it in Spanish.",
            answer: { type: "text", accept: ["escucho música solo", "yo escucho música solo"] },
            solution: "Pablo is a boy → *solo*. Put it after the activity: **Escucho música solo.** (Careful: *Solo escucho música* would mean 'I *only* listen to music'.)",
          },
        },
      ],
      keyPoints: [
        "Frame: when + what + where + who with + opinion.",
        "*Solo / sola* agrees with the speaker; *conmigo* and *contigo* are special forms.",
        "*Los sábados* = every Saturday; *el sábado* = this Saturday.",
        "*Después del colegio*, *en casa* (no article), *por la tarde*.",
        "Connect ideas with *y, pero, también, además, porque*.",
      ],
      whyItWorks:
        "Spanish verb endings already tell you **who** is acting (*juego* can only be 'I'), so the extra chunks are free to move around. Putting the time phrase first sets the scene, like the opening shot of a film.\n\n*Los sábados* is plural because a habit happens on lots of Saturdays — English does the same with 'on Saturday**s**'.\n\n*Conmigo* looks odd because it is a fossil: Latin said *mecum* ('me-with', with *cum* stuck on the end). Over time speakers stopped hearing the *-cum*, and Spanish added *con* again at the front — so *conmigo* literally says 'with' twice!",
      strategies: ["Build it up (extended sentence)", "Use the time phrase", "Agreement check", "Recycle a chunk"],
      thinkDeeper:
        "*Nunca veo la tele* and *No veo nunca la tele* both mean 'I never watch TV' — but *Veo nunca la tele* is wrong. Work out the rule for where *nunca* can go.",
    },
    // ------------------------------------------------------------------ 4
    {
      id: "tv-and-music",
      heading: "TV, films and music",
      discovery: {
        problem:
          "Look at the word *divertido* in these three sentences:\n\n    Me gusta el rap porque es divertido.\n    Me gustan las comedias porque son divertidas.\n    Me encantan los dibujos animados porque son divertidos.\n\nWhat changes, and why? And why does *es* become *son*?",
        idea:
          "The adjective **agrees** with the thing it describes: *el rap* (masculine singular) → *divertido*; *las comedias* (feminine plural) → *divertidas*; *los dibujos animados* (masculine plural) → *divertidos*.\n\nThe verb agrees too: one thing **is** fun (*es*), several things **are** fun (*son*).",
      },
      body:
        "**Types of programme** (*los programas*):\n\n| Spanish | English |\n|---|---|\n| los dibujos animados | cartoons |\n| las comedias | comedies |\n| los documentales | documentaries |\n| las series | series |\n| los concursos | game shows / quiz shows |\n| las noticias | the news |\n| los programas de deportes | sports programmes |\n| las telenovelas | soap operas |\n\n**Films** (*las películas*): *las películas de acción / de terror / de ciencia ficción / de aventuras / de animación*, *las películas románticas*.\n\n**Music** (*la música*): *la música pop / rap / rock / clásica / electrónica*; on their own: *el pop*, *el rap*, *el rock*.\n\n**Opinions that agree.** The adjective matches the noun — masculine/feminine, singular/plural — and *es* becomes *son* for plurals:\n\n| | masc. sing. | fem. sing. | masc. pl. | fem. pl. |\n|---|---|---|---|---|\n| fun | divertido | divertida | divertidos | divertidas |\n| boring | aburrido | aburrida | aburridos | aburridas |\n| funny | gracioso | graciosa | graciosos | graciosas |\n| silly | tonto | tonta | tontos | tontas |\n| exciting | emocionante | emocionante | emocionantes | emocionantes |\n| interesting | interesante | interesante | interesantes | interesantes |\n| relaxing | relajante | relajante | relajantes | relajantes |\n\nAdjectives ending in *-e* only change for the plural. *Guay* (cool — informal, Spain) is easiest after *es*: *Es guay.*\n\n    Me encantan los documentales porque son interesantes.\n    No me gustan las noticias porque son aburridas.\n    Me gusta la música clásica porque es relajante.\n    Mi serie favorita es La casa de papel.\n\n**Watch out**\n\n- *El programa* is **masculine** even though it ends in *-a*: *mi programa favorito*.\n- *Las noticias* is always plural: *las noticias **son** aburridas*.\n- *La serie* / *las series* — the plural looks the same, so check the article.\n- *Favorito* agrees too: *mi cantante favorito* (a man) / *mi cantante favorita* (a woman), *mis películas favoritas*.\n- Add an opinion opener: *Creo que… / Pienso que… / En mi opinión…*\n\n> *De terror, de acción, de ciencia ficción* never change — they are labels made with *de* + noun. But *romántica* is a real adjective, so it agrees: *las películas románticas*.",
      workedExamples: [
        {
          title: "Opinion with agreement",
          problem: "Say 'I don't like the news because it is boring' in Spanish.",
          steps: [
            "*Las noticias* is feminine plural → *No me gustan las noticias*.",
            "In Spanish the news 'are' boring → *son*, not *es*.",
            "*Aburrido* must be feminine plural → *aburridas*.",
          ],
          answer: "*No me gustan las noticias porque son aburridas.*",
          yourTurn: {
            question: "Your turn: complete with the correct form of *aburrido*: *Los concursos son ___.*",
            answer: { type: "text", accept: ["aburridos"] },
            solution: "*Los concursos* is masculine plural → *aburrid-* + *-os* → **aburridos**.",
          },
        },
        {
          title: "Films and music",
          problem: "Say 'I love horror films because they are exciting.'",
          steps: [
            "Plural thing → *Me encantan las películas de terror*. (*De terror* never changes.)",
            "'They are' → *son*.",
            "*Emocionante* ends in *-e* → plural just adds *-s*: *emocionantes*.",
          ],
          answer: "*Me encantan las películas de terror porque son emocionantes.*",
          yourTurn: {
            question: "Your turn: translate into Spanish — 'I like classical music because it is relaxing.'",
            answer: {
              type: "text",
              accept: [
                "me gusta la música clásica porque es relajante",
                "a mí me gusta la música clásica porque es relajante",
              ],
            },
            solution: "One thing → *gusta*; adjective after the noun and agreeing: *la música clásica*; *relajante* is the same for masculine and feminine: **Me gusta la música clásica porque es relajante.**",
          },
        },
      ],
      keyPoints: [
        "TV words: *los dibujos animados, las comedias, los documentales, las series, los concursos, las noticias*.",
        "Films: *las películas de acción / de terror / de ciencia ficción*, *románticas*.",
        "Adjectives agree in gender and number and go **after** the noun.",
        "*es* + singular, *son* + plural: *las noticias son aburridas*.",
        "*El programa* is masculine; *las noticias* is always plural.",
      ],
      whyItWorks:
        "An adjective in Spanish is 'glued' to its noun, so it copies the noun's gender and number — the endings show which word it belongs to.\n\n*El programa* is masculine because it comes from Greek, where words in *-ma* were neuter; Spanish turned them masculine: *el problema, el tema, el sistema, el programa*.\n\n*De terror* doesn't agree because *terror* is a **noun** used as a label ('a film **of** horror') — just like English 'horror film', where 'horror' never changes either.",
      strategies: ["Agreement check", "Gender detective (el/la)", "Check the subject", "Translate back to check"],
      thinkDeeper:
        "Why is it *las películas de terror* but *las películas románticas*? Which word in each phrase could change, and which can't? Then try: how would you say 'My favourite programmes are documentaries'? (Two words need to agree with *programas*.)",
    },
    // ------------------------------------------------------------------ 5
    {
      id: "making-plans",
      heading: "Making plans: ¿Quieres salir?",
      discovery: {
        problem:
          "Read this WhatsApp chat between Carmen and Diego:\n\n    Carmen: ¿Quieres ir al cine el sábado?\n    Diego: No puedo, tengo que estudiar. ¿El domingo?\n    Carmen: ¡Vale! ¿Dónde quedamos?\n    Diego: Delante del cine.\n    Carmen: ¿A qué hora?\n    Diego: A las seis.\n\n1. Which word means 'do you want'? Which means 'I can't'?\n2. The infinitives are *querer* and *poder*. What's strange about *quieres* and *puedo*?\n3. What do you think *quedamos* means here?",
        idea:
          "*¿Quieres…?* = 'Do you want…?' and *No puedo* = 'I can't'.\n\nThe strange thing: the stem **changes** — *querer* → *quiero/quieres* (e→ie), *poder* → *puedo/puedes* (o→ue). These are **boot verbs**.\n\n*Quedar* here means 'to arrange to meet': *¿Dónde quedamos?* = 'Where shall we meet?'",
      },
      body:
        "**Inviting** — *querer* + infinitive:\n\n- *¿Quieres ir al cine?* — Do you want to go to the cinema?\n- *¿Quieres jugar al tenis el domingo?*\n- *¿Te apetece salir?* — Do you fancy going out? (works like *gustar*)\n\n**Saying yes**: *Sí, vale.* · *¡Qué buena idea!* · *¡Claro!* · *Sí, me gustaría* (a fixed chunk: 'I'd like to').\n\n**Saying no** — *no puedo* + a reason with *tener que* + infinitive:\n\n- *Lo siento, no puedo porque tengo que hacer los deberes.*\n- *No puedo porque tengo que estudiar / ayudar en casa / visitar a mis abuelos.*\n- *No puedo porque no tengo dinero.*\n\n**Fixing the details** — *quedar* = to arrange to meet:\n\n- *¿Dónde quedamos?* — *Quedamos delante del cine / en la plaza / en la estación de MRT / en mi casa.*\n- *¿A qué hora quedamos?* — *A las cinco. / A las siete y media. / A la una.*\n\n**The verbs.** *Querer* and *poder* are boot verbs; *tener* is irregular:\n\n| | querer (e→ie) | poder (o→ue) | tener |\n|---|---|---|---|\n| yo | quiero | puedo | tengo |\n| tú | quieres | puedes | tienes |\n| él / ella | quiere | puede | tiene |\n| nosotros | queremos | podemos | tenemos |\n| vosotros | queréis | podéis | tenéis |\n| ellos / ellas | quieren | pueden | tienen |\n\nAll three are followed by an **infinitive** (*tener* also needs *que*): *quiero salir*, *puedo ir*, *tengo que estudiar*.\n\n**Talking about the plan** — the immediate future: *ir* + *a* + infinitive.\n\n| | ir + a + infinitive |\n|---|---|\n| yo | voy a ver una película |\n| tú | vas a jugar al tenis |\n| él / ella | va a salir |\n| nosotros | vamos a ir al cine |\n| vosotros | vais a bailar |\n| ellos / ellas | van a cocinar |\n\n    El sábado vamos a ir al centro comercial y después vamos a comer churros.",
      diagram: `<svg viewBox="0 0 460 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Boot diagram: querer and poder change their stem for yo, tú, él or ella, and ellos or ellas, which sit inside the boot; nosotros and vosotros sit outside and do not change"><rect x="0" y="0" width="460" height="250" fill="#ffffff"/><text x="230" y="22" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#1f2937">The boot: querer (e→ie) and poder (o→ue)</text><polygon points="14,36 226,36 226,166 446,166 446,236 14,236" fill="#fde68a" stroke="#334155" stroke-width="3"/><text x="120" y="62" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#1f2937">yo</text><text x="120" y="82" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">quiero · puedo</text><text x="120" y="120" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#1f2937">tú</text><text x="120" y="140" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">quieres · puedes</text><text x="120" y="192" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#1f2937">él / ella</text><text x="120" y="212" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">quiere · puede</text><text x="340" y="62" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#1f2937">nosotros</text><text x="340" y="82" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">queremos · podemos</text><text x="340" y="120" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#1f2937">vosotros</text><text x="340" y="140" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">queréis · podéis</text><text x="340" y="192" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#1f2937">ellos / ellas</text><text x="340" y="212" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">quieren · pueden</text><text x="340" y="104" font-family="sans-serif" font-size="11" font-style="italic" text-anchor="middle" fill="#334155">outside the boot: no change</text></svg>`,
      diagramCaption: "Inside the boot the stem changes (*quiero, puedo*); *nosotros* and *vosotros* sit outside it and keep *quer-* and *pod-*.",
      workedExamples: [
        {
          title: "Invite and refuse",
          problem: "Invite Javier to play tennis on Sunday. He says he can't because he has to do his homework.",
          steps: [
            "Invitation: *¿Quieres* (tú form of *querer*, e→ie) + infinitive *jugar al tenis* + *el domingo*.",
            "Refusal: *No puedo* (yo form of *poder*, o→ue).",
            "Reason: *porque tengo que* + infinitive: *hacer los deberes*.",
          ],
          answer: "— *¿Quieres jugar al tenis el domingo?*\n— *No puedo porque tengo que hacer los deberes.*",
          yourTurn: {
            question: "Your turn: write 'I can't because I have to study' in Spanish.",
            answer: {
              type: "text",
              accept: [
                "no puedo porque tengo que estudiar",
                "yo no puedo porque tengo que estudiar",
                "lo siento no puedo porque tengo que estudiar",
                "no puedo porque yo tengo que estudiar",
              ],
            },
            solution: "*No puedo* (o→ue) + *porque* + *tengo que* + infinitive: **No puedo porque tengo que estudiar.**",
          },
        },
        {
          title: "Making the plan",
          problem: "Say 'On Saturday we are going to go to the cinema.'",
          steps: [
            "One particular Saturday → *el sábado* (singular).",
            "Immediate future: *ir* in the *nosotros* form (*vamos*) + *a* + infinitive.",
            "The infinitive is *ir* itself — *vamos a ir* is perfectly correct — then *al cine*.",
          ],
          answer: "*El sábado vamos a ir al cine.*",
          yourTurn: {
            question: "Your turn: write 'I am going to watch a film' in Spanish.",
            answer: { type: "text", accept: ["voy a ver una película", "yo voy a ver una película"] },
            solution: "*Voy* + *a* + infinitive *ver* + *una película*: **Voy a ver una película.**",
          },
        },
        {
          title: "Outside the boot",
          problem: "Write the *nosotros* form of *poder*.",
          steps: [
            "*Nosotros* is outside the boot → no stem change.",
            "Stem *pod-* + *-emos*.",
          ],
          answer: "*podemos* (not *puedemos*)",
          yourTurn: {
            question: "Your turn: write the *ellos* form of *querer* in the present tense.",
            answer: { type: "text", accept: ["quieren", "ellos quieren", "ellas quieren"] },
            solution: "*Ellos* is inside the boot → e→ie: *quier-* + *-en* → **quieren**.",
          },
        },
      ],
      keyPoints: [
        "Invite: *¿Quieres* + infinitive? / *¿Te apetece* + infinitive?",
        "Accept: *Sí, vale. ¡Qué buena idea! ¡Claro!*",
        "Refuse: *Lo siento, no puedo porque tengo que* + infinitive.",
        "Arrange: *¿Dónde quedamos? ¿A qué hora quedamos? A las seis.*",
        "*Querer* (e→ie) and *poder* (o→ue) are boot verbs: *queremos, podemos* have no change.",
        "Plans: *voy / vas / va / vamos / vais / van* + *a* + infinitive.",
      ],
      whyItWorks:
        "Stem changes happen only where the **stress** falls on the stem. Say them aloud: *QUIE-ro, QUIE-res, QUIE-re, QUIE-ren* — the stress hits the stem, so the vowel 'breaks' into *ie*. In *que-RE-mos* and *que-RÉIS* the stress moves to the ending, so the stem stays calm. Draw a line round the stressed forms and you get the shape of a boot.\n\n*Voy a* + infinitive works just like English 'I'm going to…': the verb 'go' turns into a signpost pointing at the future.",
      strategies: ["Say it aloud", "Find the infinitive", "Check the subject", "Recycle a chunk"],
      thinkDeeper:
        "*¿Quieres ir al cine?* uses two verbs. Which one changes with the person, and which always stays as an infinitive? Now invite two friends at once (*vosotros*): 'Do you want to go to the beach?' — and explain why there's no stem change.",
    },
  ],
  learn: {
    flashcards: [
      { front: "ver la tele", back: "to watch TV" },
      { front: "salgo con mis amigos", back: "I go out with my friends (irregular yo: salgo)" },
      { front: "toco la guitarra", back: "I play the guitar (tocar for instruments)" },
      { front: "juego a los videojuegos", back: "I play video games" },
      { front: "navegar por internet", back: "to surf the internet" },
      { front: "sacar fotos", back: "to take photos" },
      { front: "montar en bici", back: "to ride a bike" },
      { front: "me gustan las series", back: "I like series (plural thing → gustan)" },
      { front: "me chifla", back: "I'm crazy about it (informal, Spain)" },
      { front: "me aburren las noticias", back: "the news bores me" },
      { front: "prefiero leer", back: "I prefer to read / I prefer reading" },
      { front: "solo / sola", back: "alone (agrees with the speaker)" },
      { front: "conmigo / contigo", back: "with me / with you" },
      { front: "los sábados vs el sábado", back: "every Saturday (habit) vs this Saturday (one time)" },
      { front: "los dibujos animados", back: "cartoons" },
      { front: "los concursos", back: "game shows / quiz shows" },
      { front: "las noticias son aburridas", back: "the news is boring (always plural in Spanish)" },
      { front: "¿Quieres ir al cine?", back: "Do you want to go to the cinema?" },
      { front: "No puedo porque tengo que…", back: "I can't because I have to…" },
      { front: "¿Dónde quedamos?", back: "Where shall we meet?" },
      { front: "querer — yo form?", back: "quiero (e→ie)" },
      { front: "poder — nosotros form?", back: "podemos (outside the boot: no change)" },
    ],
    mustKnow: [
      "I can say at least 12 free-time activities in Spanish, with the right verb (*tocar* vs *jugar a*).",
      "I can conjugate regular verbs and *ir, ver, salir, jugar* in the present tense.",
      "I can use *me gusta* and *me gustan* correctly, with the article (*me gusta la música*).",
      "I can say what other people like with *le, nos, os, les* and *a* + person.",
      "I can use *encantar, interesar, aburrir, chiflar* and *preferir* + infinitive.",
      "I can build a sentence with when, what, where, who with and an opinion.",
      "I can name types of TV programme, film and music and give opinions with adjectives that agree.",
      "I can invite someone out, accept, and refuse with a reason using *tengo que* + infinitive.",
      "I can arrange where and when to meet: *¿Dónde quedamos? ¿A qué hora?*",
      "I can conjugate *querer* and *poder* (boot verbs) and talk about plans with *voy a* + infinitive.",
    ],
    misconceptions: [
      { wrong: "*Juego la guitarra.*", right: "*Toco la guitarra.* — instruments take *tocar*; *jugar a* is for games and sports." },
      { wrong: "*Me gusta los videojuegos.*", right: "*Me gustan los videojuegos.* — the verb agrees with the plural thing liked." },
      { wrong: "*Me gusta música.*", right: "*Me gusta la música.* — general nouns need the article after *gustar*." },
      { wrong: "*Yo gusto el cine.*", right: "*Me gusta el cine.* — *gustar* means 'to please': the cinema pleases me." },
      { wrong: "*Las noticias es aburrido.*", right: "*Las noticias son aburridas.* — *las noticias* is feminine plural, so verb and adjective are plural too." },
      { wrong: "*Salo con mis amigos.*", right: "*Salgo con mis amigos.* — *salir* has an irregular *yo* form." },
      { wrong: "*Voy a el cine.*", right: "*Voy al cine.* — *a + el* always contracts to *al*." },
      { wrong: "*Quieremos ir al parque.*", right: "*Queremos ir al parque.* — *nosotros* is outside the boot: no stem change." },
    ],
    examMistakes: [
      "Forgetting the *-n* on *gustan* / *encantan* before a plural noun.",
      "Not making adjectives agree: *las comedias son divertido* instead of *divertidas*.",
      "Writing *me encanta mucho* or *muy encanta* — *me encanta* is already strong.",
      "Missing accents: *película, música, ciencia ficción, jugáis, queréis, podéis, sábado*.",
      "Using *solo* when you are a girl (*sola*), or vice versa.",
      "Writing *el sábado* when you mean every Saturday (*los sábados*).",
      "Leaving out *que* after *tener*: *tengo estudiar* instead of *tengo que estudiar*.",
      "Conjugating both verbs: *quiero voy al cine* instead of *quiero ir al cine*.",
      "Putting the stem change in *nosotros/vosotros*: *puedemos, quieréis*.",
    ],
    mnemonics: [
      {
        topic: "Boot verbs",
        device: "Draw the boot",
        explanation: "Write the six forms in two columns (singular left, plural right) and draw a boot round *yo, tú, él* and *ellos*. Inside the boot: stem change (*quiero, puedo*). Outside: no change (*queremos, podéis*).",
      },
      {
        topic: "gusta or gustan?",
        device: "N for 'numerous'",
        explanation: "If the thing you like is numerous (plural), add the N: *me gusta**n** los videojuegos*. One thing or a verb — no N.",
      },
      {
        topic: "tocar vs jugar",
        device: "TOCar = TOuCh",
        explanation: "You *touch* the keys or strings of an instrument, so you *tocar* it. Games you *jugar a*.",
      },
      {
        topic: "los sábados",
        device: "LOS = LOtS of Saturdays",
        explanation: "Plural article + plural day = it happens on lots of Saturdays (a habit). *El sábado* = just this one.",
      },
    ],
    realWorld: [
      {
        title: "Quedar en la plaza",
        detail: "In Spain, teenagers often *quedan* with friends in the town square or park in the evening — dinner is late (often 9 or 10 pm), so evenings are long. You'll hear *¿Dónde quedamos?* constantly.",
        emoji: "🌆",
      },
      {
        title: "El cine de verano",
        detail: "Many Spanish towns run open-air summer cinemas (*cines de verano*) on warm nights. *¿Quieres ir al cine de verano esta noche?*",
        emoji: "🎬",
      },
      {
        title: "Music in Spanish",
        detail: "Rosalía (from near Barcelona) mixes flamenco and pop, and Bad Bunny (from Puerto Rico) sings reggaetón and Latin trap in Spanish. Practise opinions: *Me chifla Rosalía porque su música es original.*",
        emoji: "🎵",
      },
      {
        title: "Spanish series on streaming",
        detail: "Spanish series such as *La casa de papel* and *Élite* became hits worldwide. Watching with Spanish subtitles is brilliant practice: *Mi serie favorita es…*",
        emoji: "📺",
      },
      {
        title: "Chatting with an exchange partner",
        detail: "From Singapore you might chat on a video call with a Spanish exchange partner. The first question is almost always *¿Qué haces en tu tiempo libre?* — and this topic gives you the answer.",
        emoji: "💬",
      },
      {
        title: "Latin American words",
        detail: "In Mexico cartoons are often *las caricaturas* (not *los dibujos animados*), and many Latin Americans arrange to meet with *¿Dónde nos vemos?* rather than *¿Dónde quedamos?*",
        emoji: "🌎",
      },
    ],
    videos: [
      { title: "Free-time activities in Spanish", channel: "Señor Jordan", url: "https://www.youtube.com/results?search_query=senor+jordan+spanish+free+time+activities" },
      { title: "How gustar works", channel: "Butterfly Spanish", url: "https://www.youtube.com/results?search_query=butterfly+spanish+gustar" },
      { title: "Stem-changing (boot) verbs", channel: "Señor Jordan", url: "https://www.youtube.com/results?search_query=senor+jordan+stem+changing+verbs" },
      { title: "Inviting and making plans in Spanish", channel: "Spanish with Profe", url: "https://www.youtube.com/results?search_query=spanish+invitations+quieres+ir+al+cine" },
      { title: "Hobbies — beginner comprehensible input", channel: "Dreaming Spanish", url: "https://www.youtube.com/results?search_query=dreaming+spanish+hobbies+beginner" },
    ],
    formulas: [
      { name: "Regular present tense", formula: "stem + -o / -as / -a / -amos / -áis / -an (-ar); -o / -es / -e / -emos / -éis / -en (-er)", note: "Escucho música. Leemos cómics." },
      { name: "Gustar-type verbs", formula: "(no) + me/te/le/nos/os/les + gusta (one thing / infinitive) or gustan (plural)", note: "Me gustan los videojuegos, pero no me gusta bailar." },
      { name: "Preferences", formula: "preferir (prefiero…) + infinitive or noun", note: "Prefiero salir con mis amigos." },
      { name: "Sentence builder", formula: "cuándo + actividad + dónde + con quién + porque es/son + adjective", note: "Los sábados juego al tenis en el parque con mi hermano porque es divertido." },
      { name: "Opinion with agreement", formula: "noun + es/son + adjective (agrees)", note: "Las comedias son divertidas." },
      { name: "Inviting and refusing", formula: "¿Quieres + infinitive? — No puedo porque tengo que + infinitive", note: "¿Quieres ir al cine? — No puedo porque tengo que estudiar." },
      { name: "Immediate future", formula: "ir (voy, vas, va, vamos, vais, van) + a + infinitive", note: "El sábado voy a ir al centro comercial." },
    ],
  },
};
