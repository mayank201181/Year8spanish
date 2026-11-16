import type { TopicGuide } from "../../types.ts";

export const guide: TopicGuide = {
  id: "deportes",
  title: "Los deportes — Sport",
  strand: "Free Time",
  icon: "⚽",
  summary: "Juego, hago, practico — say what sport you do, how often, what you think of it and what you're going to play next.",
  intro:
    "Sport is one of the easiest conversations to start with a Spanish speaker — and one of the easiest to get slightly wrong. In Spanish you *play* some sports (*juego al fútbol*), you *do* others (*hago natación*) and some have their own verb (*nado, esquío*). In this topic you'll learn the names of the sports and their genders, the three key verbs, how to say how often you do something, how to give a real opinion with a reason, and how to make plans and invite a friend: *¿Quieres jugar al bádminton el sábado que viene?*\n\nBy the end you should be able to answer the classic question *¿Qué deportes practicas?* in a long, accurate, interesting sentence.",
  guide: [
    // ------------------------------------------------------------------ 1
    {
      id: "sports-vocab",
      heading: "Sports vocabulary",
      discovery: {
        problem:
          "You probably know more Spanish sport words than you think. Without looking anything up, guess the meaning of each:\n\n    el baloncesto · el ciclismo · la natación · el atletismo\n    la equitación · el patinaje · la gimnasia · el esquí\n\nNow look at the articles. Most sports are *el*, but four in the full list are *la*: *la natación, la equitación, la vela, la gimnasia*. Look at the **endings**. Can you find a rule that would let you guess the gender of *el ciclismo* or *la natación* even if you'd never seen them before?",
        idea:
          "Endings are clues to gender:\n\n- **-ismo** is always masculine: *el atletismo, el ciclismo*.\n- **-ción** is always feminine: *la natación, la equitación*.\n- **-aje** is masculine: *el patinaje*.\n- **-a** is usually feminine: *la vela, la gimnasia*.\n\nAnd almost every sport borrowed from English is masculine: *el fútbol, el tenis, el hockey, el golf, el rugby*. That's because the word *el deporte* (sport) is masculine, so new sport words join the masculine team by default.",
      },
      body:
        "Learn every sport **with its article** — the article is part of the word.\n\n| English | Spanish | Gender clue |\n|---|---|---|\n| football | el fútbol | English loanword → *el* |\n| basketball | el baloncesto | *balón* (ball) + *cesto* (basket) |\n| tennis | el tenis | loanword → *el* |\n| volleyball | el voleibol | loanword → *el* |\n| hockey | el hockey | loanword; *h* sounds like the Spanish *j* |\n| badminton | el bádminton | loanword; stress on *bád-* |\n| swimming | la natación | **-ción** → *la* |\n| athletics | el atletismo | **-ismo** → *el* |\n| cycling | el ciclismo | **-ismo** → *el* |\n| horse riding | la equitación | **-ción** → *la* |\n| sailing | la vela | ends in **-a** → *la* (*la vela* = sail) |\n| skiing | el esquí | ends in stressed **-í**; masculine |\n| skating | el patinaje | **-aje** → *el* |\n| gymnastics | la gimnasia | ends in **-a** → *la* |\n| karate | el kárate | loanword (from Japanese) → *el* |\n| yoga | el yoga | loanword → *el*, even though it ends in *-a* |\n\n**Watch the accents** — they are part of the spelling: *fútbol, bádminton, kárate, esquí, natación, equitación*. Every *-ción* word carries an accent on the *ó*.\n\n**When do you use the article?** More often than in English. When you talk about a sport *in general* — as the subject of a sentence or after *gustar* — Spanish keeps the article:\n\n    El tenis es divertido. — Tennis is fun.\n    Me encanta la natación. — I love swimming.\n    El yoga es relajante. — Yoga is relaxing.\n\nAfter *hacer* the article is usually dropped: *Hago natación. Hago yoga.* (You'll meet the verbs properly in the next section.)\n\n> Two more handy words: *el deporte* = sport (the general word) and *deportista* = sporty, the same for boys and girls: *Soy muy deportista. Mi hermana no es nada deportista.*",
      workedExamples: [
        {
          title: "Gender detective",
          problem: "Give the article and the English meaning: ___ equitación.",
          steps: [
            "Look at the ending: *-ción*.",
            "Every noun ending in *-ción* is feminine, so the article is *la*.",
            "*Equ-* links to 'equestrian' (horses) → horse riding.",
          ],
          answer: "*la equitación* — horse riding",
          yourTurn: {
            question: "Write 'cycling' in Spanish, with its article.",
            answer: { type: "text", accept: ["el ciclismo"] },
            solution: "Cycling ends in *-ismo* in Spanish, and *-ismo* words are masculine: **el ciclismo**.",
          },
        },
        {
          title: "Keep the article for a sport in general",
          problem: "Translate into Spanish: 'Gymnastics is difficult.'",
          steps: [
            "Gymnastics = *gimnasia*, feminine (ends in *-a*).",
            "It's the subject and we mean gymnastics in general, so Spanish keeps the article: *la gimnasia*.",
            "*Difícil* is the same for masculine and feminine, so no change is needed.",
          ],
          answer: "*La gimnasia es difícil.*",
          yourTurn: {
            question: "Write in Spanish: 'Sailing is relaxing.'",
            answer: { type: "text", accept: ["la vela es relajante"] },
            solution: "Sailing = *la vela* (feminine). Keep the article because it's sailing in general: **La vela es relajante.** *Relajante* doesn't change for gender.",
          },
        },
      ],
      keyPoints: [
        "Learn every sport with *el* or *la* — the article is part of the word.",
        "*-ismo* → *el* (*el ciclismo*); *-ción* → *la* (*la natación*); *-aje* → *el* (*el patinaje*).",
        "Most sports borrowed from English are masculine: *el fútbol, el tenis, el hockey*.",
        "Only four common sports here are feminine: *la natación, la equitación, la vela, la gimnasia*.",
        "Keep the article when you talk about a sport in general: *Me encanta el tenis.*",
        "Accents matter: *fútbol, bádminton, kárate, esquí, natación*.",
      ],
      whyItWorks:
        "Gender in Spanish is mostly about the shape of the word, not about the thing. Endings like *-ción* come from Latin feminine nouns (*natatio* → *natación*), so they stay feminine; *-ismo* comes from a masculine Latin/Greek ending, so it stays masculine. When Spanish borrowed brand-new words like *football* or *hockey*, they had no ending to guide them, so they took the gender of the general word they belonged to — *el deporte* — which is masculine. Spanish also loves keeping the article for things in general because the article signals 'this whole category': *el tenis* = tennis as an activity, everywhere.",
      strategies: ["Spot the cognate", "Gender detective (el/la)", "Mind the accent", "Say it aloud"],
      thinkDeeper:
        "*El yoga* ends in *-a* but is masculine — and so is *el día*. Can you think why a word ending in *-a* might still be masculine? (Hint: where did *yoga* come from?) Then predict the gender of *balonmano* (handball) and *escalada* (climbing) from their endings — and work out what *balonmano* literally means.",
    },
    // ------------------------------------------------------------------ 2
    {
      id: "jugar-hacer-practicar",
      heading: "Jugar a, hacer and practicar",
      discovery: {
        problem:
          "Read these five sentences:\n\n    Lucía juega al baloncesto.\n    Pablo hace atletismo.\n    Mei juega al bádminton.\n    Arjun hace natación.\n    Hana juega a los bolos.\n\n1. Which sports go with *juega* and which with *hace*? Write a rule.\n2. Why is it *al baloncesto* but *a los bolos* (bowling)?\n3. The infinitive is *jugar*. Why does the sentence say *juega*, not *juga*?",
        idea:
          "1. **Jugar** (to play) is for games — sports with a ball, shuttlecock or opponent you play against. **Hacer** (to do) is for activities — swimming, athletics, cycling, riding.\n2. *Jugar* is always followed by **a**. When *a* meets *el*, the two squash into **al**: *a + el = al*. With *la* and *los* there's no squash: *a la*, *a los*.\n3. *Jugar* is a stem-changing verb: the *u* becomes *ue* in most forms (*juego, juegas, juega…*).",
      },
      body:
        "There are **three** main verbs for doing sport.\n\n**1. Jugar a + el / la / los / las + game** — for ball games and games you play against someone.\n\n- *a + el* → **al**: *Juego al fútbol. Juegas al tenis.*\n- *a + la* stays: *Juegan a la pelota.*\n- *a + los* stays: *Jugamos a los bolos.*\n\n**2. Hacer + activity** — for sports that aren't really 'games'. Usually no article: *Hago natación. Haces atletismo. Hacemos ciclismo, equitación, vela, gimnasia, kárate, yoga.*\n\n**3. Practicar + any sport** — the 'safe' verb that works with everything: *Practico el tenis. Practico natación.* It's a regular *-ar* verb, and it's the verb in the key question:\n\n    ¿Qué deportes practicas? — What sports do you do?\n    ¿Practicas algún deporte? — Do you do any sport?\n    No practico ningún deporte. — I don't do any sport.\n\n**The present tense of all three:**\n\n| | jugar (u→ue) | hacer | practicar |\n|---|---|---|---|\n| yo | juego | hago | practico |\n| tú | juegas | haces | practicas |\n| él / ella / usted | juega | hace | practica |\n| nosotros/as | jugamos | hacemos | practicamos |\n| vosotros/as | jugáis | hacéis | practicáis |\n| ellos / ellas / ustedes | juegan | hacen | practican |\n\n- **Jugar** changes *u → ue* in the 'boot' (*yo, tú, él, ellos*) but **not** in *nosotros* and *vosotros*: *jugamos, jugáis*.\n- **Hacer** is regular except for *yo*: **hago** (not *hazo* or *haco*).\n- Watch the accents on the *vosotros* forms: *jugáis, hacéis, practicáis*.\n\n**Which verb for which sport?**\n\n| jugar a… | hacer… |\n|---|---|\n| al fútbol, al baloncesto, al tenis | natación, atletismo, ciclismo |\n| al voleibol, al hockey, al bádminton | equitación, vela, gimnasia |\n| al rugby, al golf, al pádel | kárate, yoga, patinaje, esquí |\n\n**Some sports have their own verb** — often the most natural choice:\n\n| sport | own verb | yo form |\n|---|---|---|\n| la natación | nadar | nado |\n| el esquí | esquiar | esquío |\n| el patinaje | patinar | patino |\n| el ciclismo | montar en bici | monto en bici |\n| la equitación | montar a caballo | monto a caballo |\n| el atletismo / running | correr | corro |\n\n> In much of Latin America people often drop the *a*: *juego fútbol*. In Spain — and in your exams — always use **jugar a**: *juego al fútbol*.",
      diagram: `<svg viewBox="0 0 440 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The boot diagram for jugar: the forms yo juego, tú juegas, él juega and ellos juegan sit inside a boot shape and change u to ue; nosotros jugamos and vosotros jugáis sit outside the boot and keep the u"><rect x="0" y="0" width="440" height="250" fill="#ffffff"/><text x="220" y="24" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#1f2937">jugar (u → ue): the boot</text><path d="M20 50 H215 V150 H420 V210 H20 Z" fill="#fde68a" stroke="#334155" stroke-width="2"/><text x="117" y="82" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#1f2937">yo j<tspan font-weight="bold">ue</tspan>go</text><text x="117" y="132" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#1f2937">tú j<tspan font-weight="bold">ue</tspan>gas</text><text x="117" y="185" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#1f2937">él / ella j<tspan font-weight="bold">ue</tspan>ga</text><text x="320" y="82" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#1f2937">nosotros jugamos</text><text x="320" y="132" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#1f2937">vosotros jugáis</text><text x="320" y="185" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#1f2937">ellos / ellas j<tspan font-weight="bold">ue</tspan>gan</text><text x="220" y="236" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#334155">Inside the boot: u → ue. Outside (nosotros, vosotros): keep the u.</text></svg>`,
      diagramCaption: "The 'boot': the four forms inside the yellow shape change *u → ue*; *nosotros* and *vosotros* stay outside and keep *jug-*.",
      workedExamples: [
        {
          title: "Play or do?",
          problem: "Say in Spanish: 'My friends play hockey.'",
          steps: [
            "Hockey is a game with a ball (well, a puck) → **jugar a**.",
            "Subject = *mis amigos* (they) → *ellos* form. Inside the boot, so *u → ue*: *juegan*.",
            "*Hockey* is masculine: *a + el hockey* → **al hockey**.",
          ],
          answer: "*Mis amigos juegan al hockey.*",
          yourTurn: {
            question: "Write in Spanish: 'We play volleyball.'",
            answer: {
              type: "text",
              accept: [
                "jugamos al voleibol",
                "nosotros jugamos al voleibol",
                "nosotras jugamos al voleibol",
                "practicamos el voleibol",
                "practicamos voleibol",
                "nosotros practicamos el voleibol",
                "nosotras practicamos el voleibol",
                "nosotros practicamos voleibol",
                "nosotras practicamos voleibol",
              ],
            },
            solution: "Volleyball is a ball game → *jugar a*. *Nosotros* is outside the boot, so no stem change: *jugamos*. *a + el voleibol* → **Jugamos al voleibol.**",
          },
        },
        {
          title: "Answer the big question",
          problem: "Answer *¿Qué deportes practicas?* saying that you play basketball and do athletics.",
          steps: [
            "Basketball is a ball game → *juego al baloncesto* (*a + el = al*).",
            "Athletics is an activity → *hacer*. The *yo* form is irregular: *hago*.",
            "Join with *y* (and). No article after *hago*.",
          ],
          answer: "*Juego al baloncesto y hago atletismo.*",
          yourTurn: {
            question: "Write the *tú* form of *hacer* in the present tense.",
            answer: { type: "text", accept: ["haces", "tú haces"] },
            solution: "*Hacer* is only irregular in the *yo* form (*hago*). For *tú*: stem *hac-* + *-es* → **haces**.",
          },
        },
        {
          title: "The vosotros form",
          problem: "Ask two friends in Spain: 'Do you play tennis?'",
          steps: [
            "Two friends in Spain → *vosotros*.",
            "*Vosotros* is outside the boot → *jug-* + *-áis* → *jugáis* (accent on the *á*).",
            "*a + el tenis* → *al tenis*. Add ¿ at the start and ? at the end.",
          ],
          answer: "*¿Jugáis al tenis?*",
          yourTurn: {
            question: "Write in Spanish, speaking to two friends (*vosotros*): 'Do you do gymnastics?'",
            answer: {
              type: "text",
              accept: [
                "hacéis gimnasia",
                "vosotros hacéis gimnasia",
                "vosotras hacéis gimnasia",
                "practicáis gimnasia",
                "practicáis la gimnasia",
                "vosotros practicáis gimnasia",
                "vosotras practicáis gimnasia",
                "vosotros practicáis la gimnasia",
                "vosotras practicáis la gimnasia",
              ],
            },
            solution: "Gymnastics is an activity → *hacer*. *Vosotros* form: *hac-* + *-éis* → **¿Hacéis gimnasia?** (The question marks don't change the words — just the intonation.)",
          },
        },
      ],
      keyPoints: [
        "*jugar a* + games: *juego al fútbol, juego a los bolos*.",
        "*a + el = al* — always. *a la*, *a los*, *a las* don't change.",
        "*hacer* + activities, usually without an article: *hago natación*.",
        "*practicar* works with any sport: *¿Qué deportes practicas?*",
        "*jugar* is a boot verb (u→ue) — but *jugamos, jugáis* keep the *u*.",
        "*hacer* → *hago* in the *yo* form only.",
        "Some sports have their own verb: *nadar, esquiar, patinar, correr, montar en bici, montar a caballo*.",
      ],
      whyItWorks:
        "*Jugar* means 'to play a game', so it needs a game to play *at* — that's the job of *a*. Spanish doesn't like two little words bumping into each other, so *a + el* fuses into *al* (just as *de + el* becomes *del*). It only happens with *el*: *la* and *los* start with a consonant, so nothing clashes.\n\nThe boot comes from stress. In *JUE-go, JUE-gas, JUE-ga, JUE-gan* the stress falls on the stem, and stressed *u* stretches into *ue*. In *ju-GA-mos* and *ju-GÁIS* the stress moves to the ending, so the stem stays short: *jug-*. Say them aloud and you can hear it.",
      strategies: ["Look for the pattern", "Check the subject", "Find the infinitive", "Say it aloud"],
      thinkDeeper:
        "Spanish speakers sometimes say *practico el fútbol* instead of *juego al fútbol*. Does it mean exactly the same? Think about the difference in English between 'I play football' and 'I do football (as my sport)'. Then: why do you think *esquiar* has an accent in *esquío* but not in *esquiamos*? (Say both aloud and listen for the stress.)",
    },
    // ------------------------------------------------------------------ 3
    {
      id: "frequency",
      heading: "How often? Frequency expressions",
      discovery: {
        problem:
          "Both of these mean 'I never play golf':\n\n    Nunca juego al golf.\n    No juego nunca al golf.\n\n1. What extra word appears in the second sentence? When is it needed?\n\nNow compare:\n\n    Los lunes hago kárate.\n    El lunes voy a hacer kárate.\n\n2. One means 'on Mondays', the other 'on Monday'. Which is which — and what's the clue? Notice that neither sentence uses *en* for 'on'.",
        idea:
          "1. If *nunca* comes **before** the verb, it works alone. If it comes **after** the verb, you need *no* in front of the verb: a negative 'sandwich' *no + verb + nunca*. Spanish happily uses double negatives.\n2. **Los lunes** (plural article) = every Monday, a habit. **El lunes** (singular) = one particular Monday. Days take *el / los*, never *en*, for 'on'.",
      },
      body:
        "Add a frequency expression and a simple sentence instantly becomes a better one.\n\n| Spanish | English |\n|---|---|\n| siempre | always |\n| todos los días / cada día | every day |\n| a menudo | often |\n| a veces | sometimes |\n| de vez en cuando | from time to time, now and then |\n| casi nunca | hardly ever |\n| nunca | never |\n| una vez a la semana | once a week |\n| dos veces a la semana | twice a week |\n| tres veces al mes | three times a month |\n| los lunes / los sábados | on Mondays / on Saturdays |\n| los fines de semana | at weekends |\n| todos los sábados | every Saturday |\n\n**Word order**\n\n- Short words like *siempre, a menudo, a veces, nunca* usually go **before the verb**, or at the very end:\n\n    A menudo juego al bádminton.\n    Juego al bádminton a menudo.\n\n- Longer time phrases go most naturally at the **start** or the **end** of the sentence:\n\n    Los fines de semana hago vela.\n    Hago yoga dos veces a la semana.\n\n**Nunca — two patterns**\n\n    Nunca hago equitación.\n    No hago nunca equitación.\n\nIf *nunca* follows the verb, *no* must go in front. *Hago nunca equitación* is wrong.\n\n**Days of the week**\n\n- No *en* for 'on': *los lunes* = on Mondays, *el sábado* = on Saturday.\n- Days are written with a small letter: *el lunes, los domingos*.\n- Plural: days ending in *-s* don't change (*los lunes, los martes*); *sábado* and *domingo* add *-s* (*los sábados, los domingos*).\n\n**Watch the agreement in 'every'**: *todos los días*, *todos los sábados* but *todas las semanas*, *todas las tardes* — *todo* agrees with the noun.\n\n**Veces** is the plural of *vez* (*z → c* before *-es*): *una vez*, *dos veces*. And remember *a + el = al* again: *una vez **al** mes*, *dos veces **al** año*, but *una vez **a la** semana*.\n\nTo ask: *¿Con qué frecuencia haces deporte?* (How often do you do sport?) or *¿Cuántas veces a la semana juegas al tenis?*",
      diagram: `<svg viewBox="0 0 480 170" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A frequency scale from never to always: nunca, de vez en cuando, a veces, a menudo, siempre"><rect x="0" y="0" width="480" height="170" fill="#ffffff"/><text x="240" y="20" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#1f2937">¿Con qué frecuencia?</text><line x1="40" y1="88" x2="440" y2="88" stroke="#334155" stroke-width="3"/><polygon points="440,80 456,88 440,96" fill="#334155"/><circle cx="40" cy="88" r="7" fill="#fecaca" stroke="#334155"/><circle cx="140" cy="88" r="7" fill="#fde68a" stroke="#334155"/><circle cx="240" cy="88" r="7" fill="#fde68a" stroke="#334155"/><circle cx="340" cy="88" r="7" fill="#bbf7d0" stroke="#334155"/><circle cx="440" cy="88" r="7" fill="#bbf7d0" stroke="#334155"/><text x="40" y="46" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#334155">never</text><text x="40" y="66" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#1f2937">nunca</text><text x="240" y="46" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#334155">sometimes</text><text x="240" y="66" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#1f2937">a veces</text><text x="436" y="46" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#334155">always</text><text x="436" y="66" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#1f2937">siempre</text><text x="140" y="116" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#1f2937">de vez en cuando</text><text x="140" y="134" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#334155">now and then</text><text x="340" y="116" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#1f2937">a menudo</text><text x="340" y="134" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#334155">often</text><text x="240" y="160" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#334155">less often  ←→  more often</text></svg>`,
      diagramCaption: "From *nunca* to *siempre*: the further right, the more often you do it.",
      workedExamples: [
        {
          title: "Two ways to say 'never'",
          problem: "Say in Spanish: 'I never play golf.'",
          steps: [
            "Golf is a game → *jugar a*: *juego al golf*.",
            "Path 1: *nunca* before the verb → *Nunca juego al golf.*",
            "Path 2: *nunca* after the verb → put *no* before the verb: *No juego nunca al golf.*",
          ],
          answer: "*Nunca juego al golf.* / *No juego nunca al golf.*",
          yourTurn: {
            question: "Write in Spanish: 'I never ski.' (Use the verb *esquiar*.)",
            answer: {
              type: "text",
              accept: ["nunca esquío", "yo nunca esquío", "no esquío nunca", "yo no esquío nunca", "nunca hago esquí", "no hago nunca esquí", "no hago esquí nunca"],
            },
            solution: "*Esquiar* → *yo esquío* (accent on the *í*). Then either **Nunca esquío** or **No esquío nunca**.",
          },
        },
        {
          title: "How many times?",
          problem: "Say in Spanish: 'Ravi swims twice a week.'",
          steps: [
            "Ravi = *él* form. *Nadar* → *nada* (or *hace natación*).",
            "Twice = *dos veces* (plural of *vez*: *z → c*).",
            "A week = *a la semana* (*semana* is feminine, so no *al*).",
          ],
          answer: "*Ravi nada dos veces a la semana.* (or *Ravi hace natación dos veces a la semana.*)",
          yourTurn: {
            question: "Write in Spanish: 'I play tennis on Saturdays.'",
            answer: {
              type: "text",
              accept: [
                "juego al tenis los sábados",
                "los sábados juego al tenis",
                "yo juego al tenis los sábados",
                "los sábados yo juego al tenis",
                "practico el tenis los sábados",
                "los sábados practico el tenis",
                "yo practico el tenis los sábados",
                "practico tenis los sábados",
                "los sábados practico tenis",
              ],
            },
            solution: "'On Saturdays' = *los sábados* (plural, no *en*). *Juego al tenis* + time phrase at the start or end: **Los sábados juego al tenis** / **Juego al tenis los sábados.**",
          },
        },
      ],
      keyPoints: [
        "Scale: *nunca → casi nunca → de vez en cuando → a veces → a menudo → siempre*.",
        "*nunca* before the verb, or *no + verb + nunca*.",
        "*los lunes* = on Mondays (habit); *el lunes* = on Monday (one day). Never *en*.",
        "*una vez / dos veces a la semana*, *al mes*, *al año*.",
        "*todos los días* but *todas las semanas* — *todo* agrees.",
        "Long time phrases sit best at the start or end of the sentence.",
      ],
      whyItWorks:
        "Spanish negatives are built to agree with each other: once a sentence is negative, every 'never/nothing/nobody' word joins in. If *nunca* starts the sentence, it already makes the whole thing negative. If it comes later, the sentence needs to be marked negative earlier — so *no* goes in front of the verb, like a warning light. The article on days does the same job as 'every' in English: plural *los* = every one of them, singular *el* = just that one.",
      strategies: ["Use the time phrase", "Build it up (extended sentence)", "Look for the pattern", "Agreement check"],
      thinkDeeper:
        "*A veces* and *de vez en cuando* both translate as 'sometimes'. Which one would you choose to tell a coach how often you train if you want to sound keen? Next, translate 'I hardly ever go horse riding, but I do yoga every day' — notice how *pero* lets you contrast two frequencies in one sentence.",
    },
    // ------------------------------------------------------------------ 4
    {
      id: "sports-opinions",
      heading: "Opinions about sport",
      discovery: {
        problem:
          "Look carefully at these four sentences:\n\n    Me gusta el tenis.\n    Me gusta jugar al tenis.\n    Me gustan los deportes de equipo.\n    Me gustan el tenis y el pádel.\n\n1. Why is it *gustan* in the last two?\n\nNow these:\n\n    El fútbol es divertido.\n    La natación es divertida.\n    Hacer gimnasia es divertido.\n\n2. Why does the third sentence say *divertido* even though *gimnasia* is feminine?",
        idea:
          "1. *Gustar* really means 'to be pleasing'. *Me gusta el tenis* = 'tennis is pleasing to me'. The **thing you like is the subject**, so the verb agrees with it: one thing or an activity (infinitive) → **gusta**; plural things → **gustan**.\n2. In the third sentence the subject isn't *gimnasia* — it's the activity *hacer gimnasia*. An infinitive used as a subject counts as masculine singular, so the adjective is *divertido*.",
      },
      body:
        "**Opinion adjectives** — they agree with the sport they describe.\n\n| English | masculine | feminine | plural |\n|---|---|---|---|\n| exciting | emocionante | emocionante | emocionantes |\n| fun | divertido | divertida | divertidos / divertidas |\n| boring | aburrido | aburrida | aburridos / aburridas |\n| exhausting, tiring | agotador | agotadora | agotadores / agotadoras |\n| dangerous | peligroso | peligrosa | peligrosos / peligrosas |\n| healthy | sano | sana | sanos / sanas |\n| relaxing | relajante | relajante | relajantes |\n| difficult | difícil | difícil | difíciles |\n| easy | fácil | fácil | fáciles |\n\n- Adjectives ending in *-o* change to *-a*: *el ciclismo es peligroso* / *la equitación es peligrosa*.\n- *Agotador* adds *-a*: *la natación es agotadora*.\n- Adjectives in *-e*, and those in *-l* like *difícil* and *fácil*, don't change for gender: *el yoga es relajante* / *la vela es relajante*. (*Agotador* is the exception to watch: *-or* adjectives do add *-a*.)\n- An infinitive as subject is masculine singular: *Nadar es sano. Hacer kárate es divertido.*\n\nAdd a word to make it stronger or softer: *muy* (very), *bastante* (quite), *un poco* (a bit), *demasiado* (too).\n\n**Gustar: gusta or gustan?**\n\n| what you like | verb | example |\n|---|---|---|\n| one thing (with its article) | gusta | Me gusta **el** baloncesto. |\n| an activity (infinitive) | gusta | Me gusta **jugar** al baloncesto. |\n| two or more activities | gusta | Me gusta **nadar y correr**. |\n| plural thing / two things | gustan | Me gustan **los** deportes acuáticos. |\n\nThe same pattern works with *me encanta(n)* (I love) and *me interesa(n)* (it interests me). For other people change the pronoun: *¿Te gusta el rugby?* · *A mi hermano le gusta el hockey.* · *Nos gustan los deportes de invierno.*\n\nThe opinion ladder:\n\n    Me encanta… > Me gusta mucho… > Me gusta… > No me gusta… > No me gusta nada… > Odio…\n\n**Give a reason** with *porque* (because):\n\n    Mi deporte preferido es el baloncesto porque es emocionante.\n    Me encanta hacer vela porque es relajante, pero odio el atletismo porque es agotador.\n\n> *Porque* (one word, no accent) = because. *¿Por qué?* (two words, accent) = why? A perfect pair: *¿Por qué te gusta el tenis? — Porque es divertido.*",
      workedExamples: [
        {
          title: "Gusta or gustan?",
          problem: "Complete: *Me ___ los deportes de equipo.*",
          steps: [
            "What is liked? *Los deportes de equipo* — that's the subject.",
            "It's plural (*los … -s*), so the verb is plural.",
          ],
          answer: "*Me gustan los deportes de equipo.*",
          yourTurn: {
            question: "Fill the gap with *gusta* or *gustan*: *Me ___ jugar al voleibol y nadar.*",
            answer: { type: "text", accept: ["gusta"] },
            solution: "The things liked are activities (infinitives): *jugar* and *nadar*. Infinitives always take the singular: **gusta** — even when there are two of them.",
          },
        },
        {
          title: "Make the adjective agree",
          problem: "Say in Spanish: 'Swimming is exhausting.'",
          steps: [
            "Swimming = *la natación* — feminine.",
            "Exhausting = *agotador*; feminine → *agotadora*.",
            "Keep the article because we mean swimming in general.",
          ],
          answer: "*La natación es agotadora.*",
          yourTurn: {
            question: "Write in Spanish: 'Gymnastics is dangerous.'",
            answer: { type: "text", accept: ["la gimnasia es peligrosa"] },
            solution: "*La gimnasia* is feminine, so *peligroso* → *peligrosa*: **La gimnasia es peligrosa.**",
          },
        },
        {
          title: "Opinion + reason",
          problem: "Say: 'My favourite sport is football because it's fun, but I don't like golf because it's boring.'",
          steps: [
            "Favourite sport = *mi deporte preferido* (or *favorito*); it's *el fútbol*.",
            "Reason: *porque es divertido* — masculine, agreeing with *el fútbol*.",
            "Contrast with *pero*: *no me gusta el golf porque es aburrido*.",
          ],
          answer: "*Mi deporte preferido es el fútbol porque es divertido, pero no me gusta el golf porque es aburrido.*",
          yourTurn: {
            question: "Write in Spanish: 'My favourite sport is basketball because it is exciting.'",
            answer: {
              type: "text",
              accept: [
                "mi deporte preferido es el baloncesto porque es emocionante",
                "mi deporte favorito es el baloncesto porque es emocionante",
              ],
            },
            solution: "*Mi deporte preferido/favorito es el baloncesto* + *porque es emocionante*. *Emocionante* ends in *-e*, so it doesn't change.",
          },
        },
      ],
      keyPoints: [
        "Adjectives agree: *el ciclismo es peligroso*, *la vela es peligrosa*.",
        "*-e* and *-l* adjectives don't change for gender: *relajante, difícil, fácil* (but *-or* does: *agotadora*).",
        "Plural *-l* adjectives add *-es*: *difíciles, fáciles*.",
        "*me gusta* + one thing (with article) or infinitive(s); *me gustan* + plural.",
        "Keep the article after *gustar*: *Me gusta **el** tenis*, never *me gusta tenis*.",
        "Give a reason with *porque*; ask why with *¿por qué?*",
      ],
      whyItWorks:
        "In English the person liking is the subject ('I like tennis'). In Spanish it's turned round: the sport is the subject and it *pleases* you — *el tenis me gusta* → *me gusta el tenis*. Verbs always agree with their subject, so a plural sport-list makes *gustan*. Adjectives agree for the same reason all Spanish adjectives do: they're tied to a noun and copy its gender and number, like a label matching its box.",
      strategies: ["Agreement check", "Check the subject", "Recycle a chunk", "Build it up (extended sentence)"],
      thinkDeeper:
        "*El partido es aburrido* means 'the match is boring', but *Estoy aburrido* means 'I am bored'. Why might Spanish use *ser* for one and *estar* for the other? Then, extend your opinion with a comparison: *El fútbol es más emocionante que el golf.* Can you write one comparing two sports you know?",
    },
    // ------------------------------------------------------------------ 5
    {
      id: "sport-plans",
      heading: "Sport plans: este fin de semana voy a…",
      discovery: {
        problem:
          "Compare these pairs:\n\n    Juego al tenis.          Voy a jugar al tenis.\n    Hacemos natación.        Vamos a hacer natación.\n\n1. Which sentence in each pair is about a routine, and which is about a plan?\n2. In the plan sentences, which verb changes with the person and which stays the same?\n3. What little word glues them together?",
        idea:
          "The **immediate future** = **ir** (conjugated) + **a** + **infinitive**. Only *ir* changes for the person (*voy, vamos…*); the sport verb stays in the infinitive (*jugar, hacer*). The *a* is the glue — exactly like English 'I'm going **to** play'.",
      },
      body:
        "**The immediate future: ir + a + infinitive**\n\n| | ir | + a + infinitive |\n|---|---|---|\n| yo | voy | a jugar al tenis |\n| tú | vas | a hacer natación |\n| él / ella | va | a montar en bici |\n| nosotros/as | vamos | a hacer vela |\n| vosotros/as | vais | a jugar al pádel |\n| ellos / ellas | van | a esquiar |\n\n- Keep everything you know about the sport verb: *voy a jugar **al** fútbol*, *vamos a hacer natación*.\n- Negative: *no* goes before *ir*: *No voy a jugar al rugby.*\n- *Ir a* + a place is a different use: *Voy a la piscina.* (I'm going to the pool.) Put both together: *Voy a ir a la piscina.*\n\n**Time phrases for the future**\n\n| Spanish | English |\n|---|---|\n| esta tarde | this afternoon / this evening |\n| mañana | tomorrow |\n| mañana por la mañana | tomorrow morning |\n| este fin de semana | this weekend |\n| el sábado que viene / el próximo sábado | next Saturday |\n| la semana que viene | next week |\n| en las vacaciones | in the holidays |\n\nA great sentence contrasts the present and the future:\n\n    Normalmente juego al fútbol, pero el sábado que viene voy a hacer vela en Valencia.\n\n**Inviting a friend**\n\nUse *querer* (to want) + infinitive. *Querer* is a boot verb (e→ie):\n\n| | querer (e→ie) | poder (o→ue) |\n|---|---|---|\n| yo | quiero | puedo |\n| tú | quieres | puedes |\n| él / ella | quiere | puede |\n| nosotros/as | queremos | podemos |\n| vosotros/as | queréis | podéis |\n| ellos / ellas | quieren | pueden |\n\n    ¿Quieres jugar al bádminton el sábado?\n    ¿Quieres hacer yoga conmigo?\n    ¿Vamos a la piscina?\n\n**Replies**\n\n| Yes | No |\n|---|---|\n| ¡Sí, vale! — Yes, OK! | Lo siento, no puedo. — Sorry, I can't. |\n| ¡Claro! — Of course! | No puedo porque tengo que estudiar. — I can't because I have to study. |\n| ¡Qué buena idea! — What a good idea! | No, gracias, no me apetece. — No thanks, I don't feel like it. |\n\n**Fixing the details**\n\n    ¿A qué hora quedamos? — Quedamos a las diez.\n    ¿Dónde quedamos? — Quedamos en el polideportivo.\n\n*Quedar* = to arrange to meet. *Tengo que* + infinitive = I have to.",
      diagram: `<svg viewBox="0 0 480 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Timeline: on the left, repeated dots for a habit in the present tense, los sábados juego al fútbol; in the middle, today; on the right, one dot for a plan, el sábado que viene voy a jugar al tenis"><rect x="0" y="0" width="480" height="200" fill="#ffffff"/><text x="120" y="28" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#1f2937">Presente: a habit</text><text x="370" y="28" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#1f2937">Futuro: ir + a + infinitivo</text><text x="120" y="70" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">Los sábados juego al fútbol.</text><text x="370" y="70" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">El sábado que viene</text><line x1="20" y1="100" x2="452" y2="100" stroke="#334155" stroke-width="3"/><polygon points="452,92 468,100 452,108" fill="#334155"/><circle cx="60" cy="100" r="7" fill="#bae6fd" stroke="#334155"/><circle cx="100" cy="100" r="7" fill="#bae6fd" stroke="#334155"/><circle cx="140" cy="100" r="7" fill="#bae6fd" stroke="#334155"/><circle cx="180" cy="100" r="7" fill="#bae6fd" stroke="#334155"/><line x1="245" y1="84" x2="245" y2="116" stroke="#1f2937" stroke-width="3"/><text x="245" y="136" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#1f2937">hoy</text><circle cx="370" cy="100" r="9" fill="#bbf7d0" stroke="#334155" stroke-width="2"/><text x="120" y="132" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#334155">(every Saturday)</text><text x="370" y="132" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">voy a jugar al tenis.</text><text x="370" y="150" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#334155">(next Saturday, once)</text><text x="240" y="186" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#334155">Many dots = routine (present). One dot after hoy = a plan (voy a…).</text></svg>`,
      diagramCaption: "Routine before and around today → present tense. One planned event in the future → *ir + a + infinitive*.",
      workedExamples: [
        {
          title: "Build a plan",
          problem: "Say in Spanish: 'On Saturday we are going to go swimming.'",
          steps: [
            "We = *nosotros* → *ir* = *vamos*.",
            "Add the glue *a* and the infinitive: *vamos a hacer natación* (or *vamos a nadar*).",
            "'On Saturday' (one day) = *el sábado*, at the start or end.",
          ],
          answer: "*El sábado vamos a hacer natación.* (or *El sábado vamos a nadar.*)",
          yourTurn: {
            question: "Write in Spanish: 'I am going to play tennis.'",
            answer: { type: "text", accept: ["voy a jugar al tenis", "yo voy a jugar al tenis", "voy a practicar el tenis", "yo voy a practicar el tenis"] },
            solution: "*yo* → *voy*; + *a* + infinitive *jugar*; *a + el tenis* → *al tenis*: **Voy a jugar al tenis.**",
          },
        },
        {
          title: "Invite and refuse politely",
          problem: "Invite a friend to play badminton on Sunday. Then write their reply: 'Sorry, I can't because I have to study.'",
          steps: [
            "Invitation: *¿Quieres* + infinitive? → *¿Quieres jugar al bádminton el domingo?*",
            "Refusal: *Lo siento, no puedo* (*poder*: o→ue → *puedo*).",
            "Reason: *porque tengo que* + infinitive → *porque tengo que estudiar*.",
          ],
          answer: "*—¿Quieres jugar al bádminton el domingo? —Lo siento, no puedo porque tengo que estudiar.*",
          yourTurn: {
            question: "Write in Spanish: 'Do you want to play basketball?' (to one friend)",
            answer: { type: "text", accept: ["quieres jugar al baloncesto", "tú quieres jugar al baloncesto"] },
            solution: "*Querer* in the *tú* form (inside the boot, e→ie): *quieres*. Then the infinitive: **¿Quieres jugar al baloncesto?**",
          },
        },
        {
          title: "Negative plan",
          problem: "Say in Spanish: 'My parents are not going to go cycling.'",
          steps: [
            "My parents = *mis padres* → *ellos* → *van*.",
            "Negative: *no* goes before the conjugated verb *van*.",
            "Cycling = *hacer ciclismo* (or *montar en bici*).",
          ],
          answer: "*Mis padres no van a hacer ciclismo.* (or *Mis padres no van a montar en bici.*)",
          yourTurn: {
            question: "Write in Spanish: 'My sister is not going to do yoga.'",
            answer: {
              type: "text",
              accept: ["mi hermana no va a hacer yoga", "mi hermana no va a practicar yoga", "mi hermana no va a practicar el yoga"],
            },
            solution: "*Mi hermana* → *ella* → *va*. *No* before *va*, then *a hacer yoga*: **Mi hermana no va a hacer yoga.**",
          },
        },
      ],
      keyPoints: [
        "Immediate future = *ir* (*voy, vas, va, vamos, vais, van*) + *a* + infinitive.",
        "Only *ir* changes; the second verb stays an infinitive: *vamos a jugar*.",
        "*No* goes before *ir*: *no voy a jugar*.",
        "Future time phrases: *mañana, este fin de semana, el sábado que viene, la semana que viene*.",
        "Invite with *¿Quieres + infinitive?*; reply *¡Sí, vale! / Lo siento, no puedo porque tengo que…*",
        "*¿A qué hora quedamos? ¿Dónde quedamos?* to fix the details.",
      ],
      whyItWorks:
        "English does exactly the same thing: 'I'm **going to** play'. You 'go' towards an action in the future, so Spanish uses *ir* (to go) + *a* (to) + the action. Because *ir* carries all the information about who, the second verb doesn't need to change — it just names the action. That's why it's the easiest future to use: learn six forms of *ir* and you can talk about any plan.",
      strategies: ["Use the time phrase", "Recycle a chunk", "Check the subject", "Build it up (extended sentence)"],
      thinkDeeper:
        "*Me voy a duchar* and *voy a ducharme* both mean 'I'm going to have a shower'. After sport you might say *Voy a descansar* (I'm going to rest). Can you write a three-sentence weekend plan that uses a present-tense habit, a future plan with *voy a*, and a refused invitation with a reason? Which sentence needs the most checking, and why?",
    },
  ],
  learn: {
    flashcards: [
      { front: "el baloncesto", back: "basketball" },
      { front: "la natación", back: "swimming" },
      { front: "la equitación", back: "horse riding" },
      { front: "el atletismo", back: "athletics" },
      { front: "la vela", back: "sailing" },
      { front: "el patinaje", back: "skating" },
      { front: "Juego al voleibol.", back: "I play volleyball." },
      { front: "Hago gimnasia.", back: "I do gymnastics." },
      { front: "¿Qué deportes practicas?", back: "What sports do you do?" },
      { front: "a + el = ?", back: "al — *Juego al tenis.*" },
      { front: "jugar: nosotros form?", back: "jugamos (no u→ue — outside the boot)" },
      { front: "hacer: yo form?", back: "hago" },
      { front: "a menudo", back: "often" },
      { front: "de vez en cuando", back: "from time to time / now and then" },
      { front: "dos veces a la semana", back: "twice a week" },
      { front: "los fines de semana", back: "at weekends" },
      { front: "Es agotador.", back: "It's exhausting / tiring." },
      { front: "Me gusta… or me gustan… los deportes de equipo?", back: "Me gustan los deportes de equipo (plural subject)." },
      { front: "Mi deporte preferido es…", back: "My favourite sport is…" },
      { front: "Voy a jugar al pádel.", back: "I'm going to play padel." },
      { front: "el sábado que viene", back: "next Saturday" },
      { front: "¿Quieres jugar al bádminton?", back: "Do you want to play badminton?" },
      { front: "Lo siento, no puedo porque tengo que…", back: "Sorry, I can't because I have to…" },
      { front: "¿Dónde quedamos?", back: "Where shall we meet?" },
    ],
    mustKnow: [
      "I can name at least 15 sports in Spanish with the correct article.",
      "I can use the endings *-ismo*, *-ción* and *-aje* to work out the gender of a sport.",
      "I can choose between *jugar a*, *hacer* and *practicar* for any sport.",
      "I can conjugate *jugar* (u→ue), *hacer* and *practicar* in all six persons of the present tense.",
      "I can use *al* correctly (*a + el = al*).",
      "I can say how often I do a sport using at least six frequency expressions, including *nunca* in both positions.",
      "I can tell the difference between *los lunes* (on Mondays) and *el lunes* (on Monday).",
      "I can give an opinion about a sport with an adjective that agrees and a reason with *porque*.",
      "I can choose between *me gusta* and *me gustan*.",
      "I can say what sport I'm going to do using *ir + a + infinitive* with a future time phrase.",
      "I can invite a friend to do a sport and accept or refuse with a reason.",
    ],
    misconceptions: [
      { wrong: "*Juego fútbol.*", right: "*Juego **al** fútbol.* — in Spain, *jugar* always takes *a*, and *a + el = al*." },
      { wrong: "*Juego natación.*", right: "*Hago natación* (or *nado*). Swimming isn't a game, so you *do* it." },
      { wrong: "*Jugo al tenis.*", right: "*Juego al tenis.* — *jugar* is a boot verb: *u → ue* in *yo, tú, él, ellos*." },
      { wrong: "*Juegamos al hockey.*", right: "*Jugamos al hockey.* — *nosotros* is outside the boot, so no stem change." },
      { wrong: "*Me gusta los deportes.*", right: "*Me gustan los deportes.* — the thing liked is the subject; plural → *gustan*." },
      { wrong: "*La natación es divertido.*", right: "*La natación es divertida.* — the adjective agrees with the feminine noun." },
      { wrong: "*Juego nunca al golf.*", right: "*Nunca juego al golf* or *No juego nunca al golf.* — *nunca* after the verb needs *no* in front." },
      { wrong: "*En los lunes hago kárate.*", right: "*Los lunes hago kárate.* — no *en* with days of the week." },
      { wrong: "*Voy a juego al tenis.*", right: "*Voy a jugar al tenis.* — after *ir a* the second verb stays in the infinitive." },
    ],
    examMistakes: [
      "Writing *hazo* or *haco* instead of the irregular *hago*.",
      "Forgetting the accent on *vosotros* forms: *jugais* instead of *jugáis*, *haceis* instead of *hacéis*.",
      "Missing accents on sports: *futbol*, *natacion*, *badminton* — they cost marks.",
      "Writing *a el* instead of *al*.",
      "Dropping the article after *gustar*: *me gusta tenis* instead of *me gusta el tenis*.",
      "Using *por que* or *porqué* for 'because' — it's *porque*, one word, no accent.",
      "Using a future time phrase with the present tense (*Mañana juego…* is OK in speech, but when the task asks for the future, use *voy a jugar*).",
      "Forgetting that *veces* is the plural of *vez*: *dos vezes* is wrong.",
      "Writing days with a capital letter: *el Sábado* should be *el sábado*.",
    ],
    mnemonics: [
      {
        topic: "Jugar or hacer?",
        device: "Ball or shuttle? Then you jugar. Anything else? Hacer it.",
        explanation: "If there's a ball, puck or shuttlecock to play with, use *jugar a*. Otherwise use *hacer*.",
      },
      {
        topic: "The boot (jugar, querer, poder)",
        device: "Nosotros and vosotros don't fit in the boot.",
        explanation: "Draw the six forms in two columns and a boot around *yo, tú, él* and *ellos*: only those change (*juego, quiero, puedo*). *Jugamos, queremos, podemos* stay plain.",
      },
      {
        topic: "Gender of -ción words",
        device: "Every -ción is a lady: LA natación, LA equitación.",
        explanation: "All nouns ending in *-ción* are feminine — and they all have an accent on the *ó*.",
      },
      {
        topic: "Nunca after the verb",
        device: "The negative sandwich: NO + verb + NUNCA.",
        explanation: "If *nunca* isn't the first piece of bread, you need *no* as the other slice: *No juego nunca al golf.*",
      },
      {
        topic: "Immediate future",
        device: "VOY A = I'm on my way to…",
        explanation: "*Ir* means 'go', so *voy a jugar* is literally 'I'm going to play' — conjugate *ir*, keep the infinitive.",
      },
    ],
    realWorld: [
      {
        title: "La Liga and el Clásico",
        detail: "Spain's top football league is La Liga. When Real Madrid play FC Barcelona the match is called *el Clásico*. Ask a Spanish exchange partner *¿De qué equipo eres?* (Which team do you support?) and you'll start a long conversation.",
        emoji: "⚽",
      },
      {
        title: "Pádel: Spain's favourite racket sport",
        detail: "*El pádel* — a mix of tennis and squash played in a glass-walled court — was invented in Mexico and became hugely popular in Spain. Courts have opened in Singapore too, so you can say *Juego al pádel los fines de semana* and mean it.",
        emoji: "🎾",
      },
      {
        title: "La Vuelta a España",
        detail: "Every year professional cyclists race around Spain for three weeks in *La Vuelta*, one of cycling's three Grand Tours. Spanish TV commentary is full of *el ciclismo, la etapa* (stage) and *el equipo*.",
        emoji: "🚴",
      },
      {
        title: "Skiing near the beach",
        detail: "Sierra Nevada, near Granada in Andalucía, is one of the southernmost ski resorts in Europe. In winter some people *esquían por la mañana* and then drive down to the Mediterranean coast in the afternoon.",
        emoji: "⛷️",
      },
      {
        title: "Baseball in the Caribbean",
        detail: "In Cuba, the Dominican Republic and Venezuela the national passion is *el béisbol*, not football. Many Latin Americans say *jugar béisbol* without the *a* — you'll hear both.",
        emoji: "⚾",
      },
      {
        title: "Your CCA in Spanish",
        detail: "In Singapore your CCA is the perfect topic for a Spanish speaking exam: *Los martes juego al bádminton en el colegio y los jueves hago natación. ¡Me encanta porque es sano!*",
        emoji: "🏸",
      },
    ],
    videos: [
      { title: "Sports in Spanish: vocabulary and jugar vs hacer", channel: "Language Gym", url: "https://www.youtube.com/results?search_query=language+gym+spanish+sports+jugar+hacer" },
      { title: "Jugar: the u→ue stem-changing verb", channel: "Señor Jordan", url: "https://www.youtube.com/results?search_query=senor+jordan+jugar+stem+changing+verb" },
      { title: "The immediate future: ir + a + infinitive", channel: "Spanish with Profe", url: "https://www.youtube.com/results?search_query=spanish+with+profe+ir+a+infinitive+near+future" },
      { title: "Me gusta vs me gustan explained", channel: "Butterfly Spanish", url: "https://www.youtube.com/results?search_query=butterfly+spanish+me+gusta+me+gustan" },
      { title: "Los deportes — comprehensible input for beginners", channel: "Dreaming Spanish", url: "https://www.youtube.com/results?search_query=dreaming+spanish+deportes+beginner" },
    ],
    formulas: [
      { name: "Ball games", formula: "jugar (juego, juegas…) + a + el/la/los + game  (a + el = al)", note: "Juego al baloncesto. Jugamos a los bolos." },
      { name: "Activities", formula: "hacer (hago, haces…) + activity (usually no article)", note: "Hago natación. Mi hermano hace kárate." },
      { name: "Any sport", formula: "practicar (practico…) + sport", note: "¿Qué deportes practicas? — Practico el tenis y la natación." },
      { name: "Frequency with nunca", formula: "nunca + verb  OR  no + verb + nunca", note: "Nunca hago vela. / No hago nunca vela." },
      { name: "Gustar", formula: "me gusta + singular noun / infinitive · me gustan + plural noun", note: "Me gusta nadar. Me gustan los deportes acuáticos." },
      { name: "Opinion with a reason", formula: "Mi deporte preferido es + el/la sport + porque es + adjective (agreeing)", note: "Mi deporte preferido es la vela porque es relajante." },
      { name: "Immediate future", formula: "ir (voy, vas, va, vamos, vais, van) + a + infinitive", note: "El sábado que viene voy a jugar al pádel." },
      { name: "Invitation", formula: "¿Quieres + infinitive…? → ¡Sí, vale! / Lo siento, no puedo porque tengo que + infinitive", note: "¿Quieres hacer yoga conmigo? — Lo siento, no puedo porque tengo que estudiar." },
    ],
  },
};
