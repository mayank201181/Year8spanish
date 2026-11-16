import type { TopicGuide } from "../../types.ts";

export const guide: TopicGuide = {
  id: "tareas",
  title: "Ayudar en casa — Chores",
  strand: "Free Time",
  icon: "🧹",
  summary: "Hago la cama, tengo que planchar… ¿es justo?",
  intro:
    "Who does what in your home — and is it fair? In this topic you learn the chores you do (and the ones you dodge), how to say what you *have* to do, how often you do it and how much pocket money you get, what you really think about it all, and what you are going to do this weekend.",
  guide: [
    // ------------------------------------------------------------------ 1
    {
      id: "chores-vocab",
      heading: "Chores vocabulary",
      discovery: {
        problem:
          "Read what Lucía does at home:\n\n    Hago la cama. Pongo la mesa. Lavo los platos. Saco la basura.\n\nAll four verbs end in *-o*, the normal *yo* ending. For two of them you can find the infinitive (the dictionary 'to…' form) just by swapping *-o* for *-ar*. The other two would be hard to find in a dictionary. Which two — and can you guess their infinitives?",
        idea:
          "*Lavo → lavar* and *saco → sacar*: easy. But *hago* comes from **hacer** and *pongo* from **poner**. They belong to a small family of very common verbs that add a *g* in the *yo* form only (*tengo* and *salgo* are in the same family). Every other person is regular: *haces, hace…; pones, pone…*",
      },
      body:
        "Talking about chores (*las tareas de casa* or *las tareas domésticas*) is mostly about **verb + noun chunks**. Learn each one as a whole phrase, with its article, and you can drop it into any sentence.\n\n| I do… (yo form) | Infinitive | English |\n|---|---|---|\n| hago la cama | hacer la cama | I make the bed |\n| pongo la mesa | poner la mesa | I set (lay) the table |\n| quito la mesa | quitar la mesa | I clear the table |\n| lavo los platos | lavar los platos | I wash the dishes |\n| paso la aspiradora | pasar la aspiradora | I vacuum (do the hoovering) |\n| saco la basura | sacar la basura | I take out the rubbish |\n| cocino | cocinar | I cook |\n| limpio mi dormitorio | limpiar | I clean my bedroom |\n| limpio el cuarto de baño | limpiar | I clean the bathroom |\n| plancho | planchar | I iron / do the ironing |\n| paseo al perro | pasear al perro | I walk the dog |\n| corto el césped | cortar el césped | I mow (cut) the lawn |\n| riego las plantas | regar las plantas | I water the plants |\n| ordeno mi cuarto | ordenar mi cuarto | I tidy my room |\n| voy de compras | ir de compras | I go shopping |\n\n**Three verbs to watch**\n\n- *hacer* → **hago** and *poner* → **pongo**: irregular only in the *yo* form. Everything else is regular: *mi hermano hace la cama, mis padres ponen la mesa*.\n- *regar* is a stem-changer (e→ie): *riego, riegas, riega, regamos, regáis, riegan*.\n- *ir* is fully irregular: *voy, vas, va, vamos, vais, van* — *voy de compras*.\n\n**Talking about other people.** Most chore verbs are regular *-ar* verbs, so the endings are predictable:\n\n| | lavar (regular -ar) | hacer (-go in yo) |\n|---|---|---|\n| yo | lavo | hago |\n| tú | lavas | haces |\n| él / ella | lava | hace |\n| nosotros/as | lavamos | hacemos |\n| vosotros/as | laváis | hacéis |\n| ellos / ellas | lavan | hacen |\n\n**The personal *a*.** When the one you look after is a person or a pet, Spanish puts *a* in front of it: *paseo **al** perro* (*a + el = al*), *cuido **a** mi hermano pequeño*. Objects don't get it: *lavo el coche*.\n\n**Two shopping traps**\n\n- *ir de compras* = to go shopping (clothes, presents, fun): *Voy de compras con mi madre.*\n- *hacer la compra* = to do the food shopping: *Los sábados hago la compra en el supermercado.*\n\n> In Spain you will also hear *fregar los platos* (*friego*, e→ie) for washing up and *recoger la mesa* for clearing the table.",
      diagram: `<svg viewBox="0 0 480 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Floor plan of a home with six rooms, each labelled with the chores done in it"><rect x="0" y="0" width="480" height="300" fill="#ffffff"/><rect x="10" y="10" width="153" height="140" fill="#fde68a" stroke="#334155" stroke-width="2"/><rect x="163" y="10" width="153" height="140" fill="#c7d2fe" stroke="#334155" stroke-width="2"/><rect x="316" y="10" width="154" height="140" fill="#fecaca" stroke="#334155" stroke-width="2"/><rect x="10" y="150" width="153" height="140" fill="#bae6fd" stroke="#334155" stroke-width="2"/><rect x="163" y="150" width="153" height="140" fill="#ffffff" stroke="#334155" stroke-width="2"/><rect x="316" y="150" width="154" height="140" fill="#bbf7d0" stroke="#334155" stroke-width="2"/><text x="86" y="34" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#1f2937">la cocina</text><text x="86" y="66" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">cocino</text><text x="86" y="86" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">lavo los platos</text><text x="86" y="106" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">saco la basura</text><text x="240" y="34" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#1f2937">el comedor</text><text x="240" y="66" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">pongo la mesa</text><text x="240" y="86" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">quito la mesa</text><rect x="205" y="104" width="70" height="30" rx="4" fill="#ffffff" stroke="#334155"/><text x="393" y="34" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#1f2937">el dormitorio</text><text x="393" y="66" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">hago la cama</text><text x="393" y="86" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">ordeno mi cuarto</text><rect x="353" y="100" width="80" height="40" rx="4" fill="#ffffff" stroke="#334155"/><rect x="357" y="104" width="18" height="32" rx="3" fill="#c7d2fe" stroke="#334155"/><text x="86" y="174" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#1f2937">el cuarto de baño</text><text x="86" y="210" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">limpio el cuarto</text><text x="86" y="226" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">de baño</text><text x="240" y="174" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#1f2937">el salón</text><text x="240" y="210" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">paso la aspiradora</text><text x="240" y="230" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">plancho</text><text x="393" y="174" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#1f2937">el jardín</text><text x="393" y="206" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">corto el césped</text><text x="393" y="226" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">riego las plantas</text><text x="393" y="246" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">paseo al perro</text></svg>`,
      diagramCaption: "Which chore happens where: each room of the home with the chores you do in it.",
      workedExamples: [
        {
          title: "Someone else's chores",
          problem: "Say 'My sister takes out the rubbish and my parents cook' in Spanish.",
          steps: [
            "*Mi hermana* = she → *ella* form. *sacar* → *saca*: *Mi hermana saca la basura*.",
            "*Mis padres* = they → *ellos* form. *cocinar* → *cocinan*.",
            "Join the two halves with *y*.",
          ],
          answer: "*Mi hermana saca la basura y mis padres cocinan.*",
          yourTurn: {
            question: "Your turn: write 'I set the table' in Spanish.",
            answer: { type: "text", accept: ["pongo la mesa", "yo pongo la mesa"] },
            solution: "*poner* adds *-go* in the *yo* form → *pongo*: **Pongo la mesa.**",
          },
        },
        {
          title: "Pets need the personal a",
          problem: "Translate: 'I walk the dog and I water the plants.'",
          steps: [
            "Walking the dog: *pasear*. The dog is a pet, so add the personal *a*: *a + el perro* = *al perro* → *paseo al perro*.",
            "Watering: *regar* is e→ie → *riego*. Plants are things, so no personal *a*: *riego las plantas*.",
            "Join with *y* (no need to repeat *yo*).",
          ],
          answer: "*Paseo al perro y riego las plantas.*",
          yourTurn: {
            question: "Your turn: write 'My dad walks the dog' in Spanish.",
            answer: { type: "text", accept: ["mi padre pasea al perro", "mi papá pasea al perro", "mi padre saca al perro", "mi papá saca al perro"] },
            solution: "*él* form of *pasear* → *pasea*; the dog takes the personal *a*: **Mi padre pasea al perro.**",
          },
        },
      ],
      keyPoints: [
        "Learn chores as chunks with their article: *hago la cama, saco la basura, riego las plantas*.",
        "*hago* (*hacer*) and *pongo* (*poner*) are irregular only in the *yo* form.",
        "*regar* changes e→ie (*riego*); *ir* is irregular (*voy de compras*).",
        "Pets and people take the personal *a*: *paseo al perro*, *cuido a mi hermano*.",
        "*ir de compras* = go shopping; *hacer la compra* = do the food shopping.",
      ],
      whyItWorks:
        "Why *hago* and *pongo*? As Latin slowly turned into Spanish, a handful of the most common verbs picked up a *g* in the *yo* form (*hago, pongo, tengo, salgo, digo*). Very frequent words keep their quirks because people use them so often that they never get 'smoothed out' — English does the same with *I am / I was*. The personal *a* works like a flag: it tells the listener 'this object is **someone**, not something' — which is why your dog gets one and your car doesn't.",
      strategies: ["Find the infinitive", "Look for the pattern", "Recycle a chunk", "Gender detective (el/la)"],
      thinkDeeper:
        "*Hago la cama* uses *hacer* (to do / make) — and luckily English also says 'make the bed'. But English says 'do the washing-up' where Spanish says *lavo los platos*, and 'set the table' where Spanish says *pongo* ('I put') *la mesa*. Find one more chore where the two languages choose a different verb. What does this tell you about translating chores word by word?",
    },
    // ------------------------------------------------------------------ 2
    {
      id: "obligation",
      heading: "Tengo que / debo / hay que",
      discovery: {
        problem:
          "Javier and his sister Carmen are moaning:\n\n    Javier: Tengo que lavar los platos.\n    Carmen: ¡Y yo tengo que sacar la basura!\n    Su madre: En esta casa, hay que ayudar.\n\n1. Look at the verb straight after *que* each time. Is it conjugated (with an ending for I, you, she…) or not?\n2. In the mother's sentence, who exactly 'has to help'?",
        idea:
          "After *tener que* and *hay que* the second verb is always the **infinitive** (*lavar, sacar, ayudar*) — only the first verb is conjugated. *Tengo que* is personal: **I** have to. *Hay que* has no person at all — it means 'one has to / you have to (everyone does)'. The mother is setting a rule for the whole house.",
      },
      body:
        "There are three ways to say what has to be done. In all three, the chore verb stays in the **infinitive**.\n\n**1. tener que + infinitive** — 'to have to'. Conjugate *tener* (it's irregular!) and keep the chore as an infinitive.\n\n| | tener | tener que + infinitive |\n|---|---|---|\n| yo | tengo | tengo que planchar |\n| tú | tienes | tienes que cocinar |\n| él / ella | tiene | tiene que pasear al perro |\n| nosotros/as | tenemos | tenemos que quitar la mesa |\n| vosotros/as | tenéis | tenéis que ordenar el cuarto |\n| ellos / ellas | tienen | tienen que lavar los platos |\n\n**2. deber + infinitive** — 'must / should'. *Deber* is a regular *-er* verb: *debo, debes, debe, debemos, debéis, deben*. It sounds more like a duty or a piece of advice:\n\n    Debo ayudar más en casa. — I must / should help more at home.\n    Todos deben ayudar. — Everyone should help.\n\n**3. hay que + infinitive** — 'one has to / you have to' (in general). *Hay* never changes, because it has no subject:\n\n    En mi casa hay que hacer la cama cada día. — In my house you have to make your bed every day.\n\n**Negatives: put *no* before the conjugated verb.**\n\n    No tengo que cocinar. — I don't have to cook.\n    No debes planchar sin ayuda. — You mustn't iron without help.\n\n> Careful: *no tengo que* means 'I **don't have to**' (there's no need) — not 'I mustn't'. To say something is not allowed, use *no debo* or *no puedo*.\n\n**Asking and answering**\n\n    ¿Qué tienes que hacer en casa? — What do you have to do at home?\n    Tengo que hacer la cama y sacar la basura. — I have to make the bed and take out the rubbish.\n\nOne *tengo que* can cover two infinitives joined by *y* — you don't need to repeat it.",
      diagram: `<svg viewBox="0 0 420 270" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Boot diagram for tener: tengo, tienes, tiene and tienen inside the boot; tenemos and tenéis outside"><rect x="0" y="0" width="420" height="270" fill="#ffffff"/><text x="210" y="20" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#1f2937">tener → tener que + infinitive</text><rect x="40" y="40" width="160" height="50" rx="6" fill="#fde68a" stroke="#334155"/><rect x="40" y="100" width="160" height="50" rx="6" fill="#bae6fd" stroke="#334155"/><rect x="40" y="160" width="160" height="50" rx="6" fill="#bae6fd" stroke="#334155"/><rect x="220" y="40" width="160" height="50" rx="6" fill="#bbf7d0" stroke="#334155"/><rect x="220" y="100" width="160" height="50" rx="6" fill="#bbf7d0" stroke="#334155"/><rect x="220" y="160" width="160" height="50" rx="6" fill="#bae6fd" stroke="#334155"/><text x="120" y="58" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#334155">yo</text><text x="120" y="80" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#1f2937">tengo</text><text x="120" y="118" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#334155">tú</text><text x="120" y="140" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#1f2937">tienes</text><text x="120" y="178" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#334155">él / ella</text><text x="120" y="200" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#1f2937">tiene</text><text x="300" y="58" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#334155">nosotros/as</text><text x="300" y="80" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#1f2937">tenemos</text><text x="300" y="118" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#334155">vosotros/as</text><text x="300" y="140" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#1f2937">tenéis</text><text x="300" y="178" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#334155">ellos / ellas</text><text x="300" y="200" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#1f2937">tienen</text><polygon points="30,30 210,30 210,155 390,155 390,220 30,220" fill="none" stroke="#1f2937" stroke-width="3"/><rect x="30" y="236" width="14" height="14" fill="#fde68a" stroke="#334155"/><text x="50" y="248" font-family="sans-serif" font-size="12" fill="#1f2937">tengo: adds -go</text><rect x="165" y="236" width="14" height="14" fill="#bae6fd" stroke="#334155"/><text x="185" y="248" font-family="sans-serif" font-size="12" fill="#1f2937">e → ie in the boot</text><rect x="315" y="236" width="14" height="14" fill="#bbf7d0" stroke="#334155"/><text x="335" y="248" font-family="sans-serif" font-size="12" fill="#1f2937">no change</text></svg>`,
      diagramCaption:
        "*Tener* in the 'boot': *tengo* adds -go, the other boot forms change e→ie, and *nosotros / vosotros* stay outside with the plain stem *ten-*.",
      workedExamples: [
        {
          title: "Conjugate tener, keep the infinitive",
          problem: "Translate: 'My brothers have to wash the car.'",
          steps: [
            "Subject *mis hermanos* = they → *tienen* (inside the boot: e→ie).",
            "Add *que* + the infinitive *lavar* — no ending on *lavar*.",
            "Object: *el coche* (a thing, so no personal *a*).",
          ],
          answer: "*Mis hermanos tienen que lavar el coche.*",
          yourTurn: {
            question: "Your turn: write 'We have to clear the table' in Spanish, using *tener que*.",
            answer: {
              type: "text",
              accept: [
                "tenemos que quitar la mesa",
                "nosotros tenemos que quitar la mesa",
                "nosotras tenemos que quitar la mesa",
                "tenemos que recoger la mesa",
                "nosotros tenemos que recoger la mesa",
                "nosotras tenemos que recoger la mesa",
              ],
            },
            solution:
              "*nosotros* form of *tener* → *tenemos* (outside the boot, so no e→ie), then *que* + infinitive: **Tenemos que quitar la mesa.**",
          },
        },
        {
          title: "Personal or general?",
          problem:
            "Which fits better for a school rule, and why? 'At school you have to tidy the classroom': *En el instituto tienes que ordenar la clase* or *En el instituto hay que ordenar la clase*?",
          steps: [
            "Ask: is the speaker talking to one person, or stating a rule for everyone?",
            "It's a rule for every pupil → *hay que* (no person, never changes).",
            "*Tienes que* would mean 'you personally' — e.g. a teacher speaking to one pupil who left a mess.",
          ],
          answer: "*En el instituto hay que ordenar la clase.*",
          yourTurn: {
            question: "Your turn: write 'You don't have to iron' in Spanish, speaking to a friend (*tú*) and using *tener que*.",
            answer: { type: "text", accept: ["no tienes que planchar", "tú no tienes que planchar"] },
            solution: "*tú* form of *tener* → *tienes*; *no* goes in front of it: **No tienes que planchar.**",
          },
        },
      ],
      keyPoints: [
        "*tener que* + infinitive = have to: *tengo que cocinar*.",
        "*tener* is irregular: *tengo, tienes, tiene, tenemos, tenéis, tienen*.",
        "*deber* + infinitive = must / should: *debo ayudar*, *todos deben ayudar*.",
        "*hay que* + infinitive = one has to (a general rule) — *hay* never changes.",
        "Only the first verb is conjugated; the chore stays in the infinitive.",
        "*No tengo que…* = I don't have to (no need) — not 'I mustn't' (*no debo*).",
      ],
      whyItWorks:
        "Think of it as **one engine, one passenger**. The first verb (*tengo, debo, hay*) is the engine: it carries the information about who is doing it. The infinitive is the passenger: it just names the action. Once the engine has said who, the second verb doesn't need an ending of its own — English works the same way ('she has to *wash*', never 'she has to *washes*'). *Hay que* has no person at all, which is exactly why it is perfect for rules: *hay que ayudar* applies to everyone in the house.",
      strategies: ["Check the subject", "Find the infinitive", "Look for the pattern", "Translate back to check"],
      thinkDeeper:
        "*No tengo que lavar los platos* and *No debo lavar los platos* look almost identical but mean different things. Invent a situation where each one is true. Then decide: which of *tengo que*, *debo* or *hay que* would you put on a sign at a Singapore hawker centre asking people to return their trays — and why?",
    },
    // ------------------------------------------------------------------ 3
    {
      id: "frequency-and-pocket-money",
      heading: "How often & pocket money",
      discovery: {
        problem:
          "Two friends compare notes:\n\n    Wei Ling: Paso la aspiradora una vez a la semana y recibo veinte dólares de paga.\n    Diego: Yo nunca paso la aspiradora, pero mis padres me dan treinta euros al mes.\n\n1. Who does more vacuuming?\n2. *Veinte* is 20 and *treinta* is 30. Using the pattern, guess *cuarenta*, *cincuenta* and *sesenta*.\n3. *Al mes* follows Diego's money. What does it mean?",
        idea:
          "Wei Ling vacuums once a week; Diego **never** does. The tens from 30 to 90 all end in *-nta*, and each one starts like its small number: *cuatro → cuarenta* (40), *cinco → cincuenta* (50), *seis → sesenta* (60). *Al mes* = per month; 'per week' is *a la semana*.",
      },
      body:
        "**How often?** Frequency phrases usually go at the start or the end of the sentence.\n\n| Spanish | English |\n|---|---|\n| siempre | always |\n| cada día / todos los días | every day |\n| dos veces a la semana | twice a week |\n| una vez a la semana | once a week |\n| los fines de semana | at weekends |\n| los sábados | on Saturdays |\n| a menudo | often |\n| a veces | sometimes |\n| de vez en cuando | from time to time |\n| nunca | never |\n\n    Los fines de semana lavo el coche. = Lavo el coche los fines de semana.\n\n**Nunca** goes in front of the verb — or after the verb with *no* in front: *Nunca cocino* = *No cocino nunca* (I never cook). Spanish is happy with a double negative.\n\n**Pocket money (la paga)**\n\n    Recibo veinte dólares a la semana. — I get 20 dollars a week.\n    Gano diez euros cuando lavo el coche. — I earn 10 euros when I wash the car.\n    Mis padres me dan cincuenta dólares al mes. — My parents give me 50 dollars a month.\n    Con mi dinero compro ropa y videojuegos. — With my money I buy clothes and video games.\n    Ahorro un poco cada semana. — I save a bit every week.\n\n*Me dan* = 'they give **me**' — the *me* goes before the verb. With one parent: *mi madre me da…*\n\n**Numbers 20–100**\n\n| Number | Spanish | Number | Spanish |\n|---|---|---|---|\n| 20 | veinte | 40 | cuarenta |\n| 21 | veintiuno | 50 | cincuenta |\n| 22 | veintidós | 60 | sesenta |\n| 23 | veintitrés | 70 | setenta |\n| 26 | veintiséis | 80 | ochenta |\n| 30 | treinta | 90 | noventa |\n| 31 | treinta y uno | 100 | cien |\n\n- 21–29 are written as **one word**: *veinticinco, veintiocho*. Watch the accents on *veintidós, veintitrés, veintiséis*.\n- From 31 to 99 use **three words** with *y*: *cuarenta y ocho, noventa y nueve*.\n- Before a masculine noun, *uno* shortens to *un*: *veintiún dólares, treinta y un euros*.\n- Exactly 100 is *cien*: *cien dólares*.\n\n> *Dólar* is masculine: *un dólar, dos dólares* (plural with an accent). In Singapore you can just say *dólares*; to be precise, *dólares de Singapur*.",
      diagram: `<svg viewBox="0 0 480 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Frequency scale from nunca on the left to siempre on the right, with example sentences"><rect x="0" y="0" width="480" height="260" fill="#ffffff"/><text x="240" y="22" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#1f2937">¿Con qué frecuencia? How often?</text><text x="30" y="60" font-family="sans-serif" font-size="11" fill="#334155">less often</text><text x="466" y="60" font-family="sans-serif" font-size="11" text-anchor="end" fill="#334155">more often</text><line x1="30" y1="110" x2="450" y2="110" stroke="#1f2937" stroke-width="3"/><polygon points="450,103 466,110 450,117" fill="#1f2937"/><circle cx="45" cy="110" r="6" fill="#fecaca" stroke="#334155"/><circle cx="125" cy="110" r="6" fill="#c7d2fe" stroke="#334155"/><circle cx="205" cy="110" r="6" fill="#c7d2fe" stroke="#334155"/><circle cx="285" cy="110" r="6" fill="#c7d2fe" stroke="#334155"/><circle cx="365" cy="110" r="6" fill="#c7d2fe" stroke="#334155"/><circle cx="435" cy="110" r="6" fill="#bbf7d0" stroke="#334155"/><text x="45" y="92" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">nunca</text><text x="205" y="92" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">una vez a la semana</text><text x="365" y="92" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">cada día</text><text x="125" y="138" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">de vez en cuando</text><text x="285" y="138" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">dos veces a la semana</text><text x="435" y="138" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">siempre</text><rect x="30" y="170" width="420" height="74" rx="8" fill="#fde68a" stroke="#334155"/><text x="240" y="198" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">Nunca plancho. = No plancho nunca.</text><text x="240" y="224" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">Paso la aspiradora una vez a la semana.</text></svg>`,
      diagramCaption: "From *nunca* to *siempre*: frequency phrases on a scale, with two example sentences.",
      workedExamples: [
        {
          title: "A pocket-money sentence",
          problem: "Say 'My parents give me 35 dollars a week' in Spanish.",
          steps: [
            "'give me' → *me dan* (they give), with *me* before the verb.",
            "35 → *treinta y cinco* (31–99: three words with *y*).",
            "'a week' → *a la semana*; *dólares* has an accent on the *ó*.",
          ],
          answer: "*Mis padres me dan treinta y cinco dólares a la semana.*",
          yourTurn: {
            question: "Your turn: write the number 75 in Spanish words.",
            answer: { type: "text", accept: ["setenta y cinco"] },
            solution: "70 = *setenta* (it starts like *siete*), then *y cinco*: **setenta y cinco**.",
          },
        },
        {
          title: "Where does nunca go?",
          problem: "Translate 'I never iron' in two different ways.",
          steps: [
            "Way 1: *nunca* before the verb → *Nunca plancho.*",
            "Way 2: *no* before the verb, *nunca* after it → *No plancho nunca.*",
            "Never *Plancho nunca* on its own: if *nunca* comes after the verb, *no* must come before it.",
          ],
          answer: "*Nunca plancho.* / *No plancho nunca.*",
          yourTurn: {
            question: "Your turn: write 'I wash the dishes twice a week' in Spanish.",
            answer: {
              type: "text",
              accept: [
                "lavo los platos dos veces a la semana",
                "yo lavo los platos dos veces a la semana",
                "dos veces a la semana lavo los platos",
                "dos veces a la semana yo lavo los platos",
                "lavo los platos dos veces por semana",
                "dos veces por semana lavo los platos",
                "friego los platos dos veces a la semana",
                "yo friego los platos dos veces a la semana",
                "dos veces a la semana friego los platos",
                "dos veces a la semana yo friego los platos",
                "yo lavo los platos dos veces por semana",
                "dos veces por semana yo lavo los platos",
                "friego los platos dos veces por semana",
                "yo friego los platos dos veces por semana",
                "dos veces por semana friego los platos",
              ],
            },
            solution: "Chunk *lavo los platos* + frequency *dos veces a la semana* (at the end or the start): **Lavo los platos dos veces a la semana.**",
          },
        },
      ],
      keyPoints: [
        "Frequency phrases go at the start or end: *Los sábados lavo el coche.*",
        "*Nunca cocino* = *No cocino nunca* — never *Cocino nunca*.",
        "Pocket money: *recibo / gano … dólares (euros) a la semana / al mes*; *mis padres me dan…*",
        "21–29 are one word (*veintidós*); 31–99 are three (*treinta y dos*).",
        "*uno → un* before a masculine noun: *veintiún dólares*; 100 = *cien*.",
      ],
      whyItWorks:
        "Why is 22 one word but 32 three? Centuries ago Spanish wrote *veinte y dos* too, but people said the twenties so fast that the words merged: *veinte y dos → veintidós*. The merged word is stressed on its last syllable, which is why it needs a written accent on *-dós, -trés, -séis*. The higher tens never merged in standard spelling, so they keep their *y*. And the double negative (*no… nunca*) isn't a mistake in Spanish: the *no* in front of the verb warns the listener early that the whole sentence is negative.",
      strategies: ["Look for the pattern", "Mind the accent", "Use the time phrase", "Say it aloud"],
      thinkDeeper:
        "Arjun gets *veinte dólares a la semana*; Priya gets *ochenta dólares al mes*. Who gets more over a whole year? (There are 52 weeks in a year.) Now say who gets more in Spanish, using *más que*.",
    },
    // ------------------------------------------------------------------ 4
    {
      id: "opinions-on-chores",
      heading: "Opinions about chores",
      discovery: {
        problem:
          "Read three opinions:\n\n    Sofía: Odio planchar. ¡Es un rollo!\n    Pablo: No me importa pasar la aspiradora.\n    Mei: Mi hermano no hace nada. ¡Es injusto!\n\n1. Who is the most relaxed about chores?\n2. After *odio* and *no me importa*, what form is the chore verb in?\n3. *No hace nada* contains two negative words. Translate it — does English need two?",
        idea:
          "Pablo doesn't mind. After *odio*, *me gusta*, *me encanta* and *no me importa* the chore is an **infinitive** — the activity works like a noun, just like English '-ing': *odio planchar* = I hate iron**ing**. *No hace nada* = 'he doesn't do anything' (or 'he does nothing'): Spanish needs both *no* and *nada*; English uses only one negative.",
      },
      body:
        "**Giving an opinion on a chore**\n\n| Positive / neutral | Negative |\n|---|---|\n| me gusta cocinar | odio planchar |\n| me encanta regar las plantas | no me gusta nada limpiar el baño |\n| no me importa poner la mesa | detesto sacar la basura |\n| me da igual | prefiero no hacer nada |\n\nThe infinitive acts like '-ing' in English. With an infinitive, *gusta* stays **singular** — even with two activities: *me gusta cocinar y lavar el coche* (never *me gustan cocinar*).\n\n**Describing the chore: es + adjective**\n\n| Spanish | English |\n|---|---|\n| es justo | it's fair |\n| es injusto | it's unfair |\n| es un rollo | it's a pain / a drag (informal, Spain) |\n| es aburrido | it's boring |\n| es útil | it's useful |\n| es fácil / difícil | it's easy / difficult |\n| es asqueroso | it's disgusting |\n| es importante | it's important |\n\n    Pasar la aspiradora es aburrido, pero es útil.\n\nA chore (an infinitive) counts as masculine singular, so the adjective is *aburrido*, not *aburrida*.\n\n**Giving a view with a reason**\n\n    Pienso que es injusto porque yo hago todo. — I think it's unfair because I do everything.\n    Creo que todos deben ayudar en casa. — I think everyone should help at home.\n    En mi opinión, hay que compartir las tareas. — In my opinion, chores have to be shared.\n\n**Comparing who does what**\n\n    Mi hermano no hace nada. — My brother doesn't do anything.\n    Mi hermana hace más que yo. — My sister does more than me.\n    Yo hago menos que mis padres. — I do less than my parents.\n    Mi padre cocina y mi madre lava los platos. — My dad cooks and my mum washes the dishes.\n    Nadie limpia el cuarto de baño. — Nobody cleans the bathroom.\n\n> *Nada* (nothing) and *nadie* (nobody) work like *nunca*: either before the verb on their own (*Nadie ayuda*), or after the verb with *no* in front (*No ayuda nadie*, *no hace nada*).",
      workedExamples: [
        {
          title: "Build a full opinion",
          problem: "Say that you hate taking out the rubbish because it's disgusting, and that your brother doesn't do anything.",
          steps: [
            "Opinion + infinitive: *Odio sacar la basura*.",
            "Reason: *porque es asqueroso* (masculine singular: the chore as a whole).",
            "Comparison: *mi hermano no hace nada* — *no* before the verb, *nada* after it.",
          ],
          answer: "*Odio sacar la basura porque es asqueroso, y mi hermano no hace nada.*",
          yourTurn: {
            question: "Your turn: write 'I hate ironing' in Spanish.",
            answer: { type: "text", accept: ["odio planchar", "yo odio planchar", "detesto planchar", "yo detesto planchar"] },
            solution: "*Odio* + infinitive (English '-ing' becomes a Spanish infinitive): **Odio planchar.**",
          },
        },
        {
          title: "Fair or unfair?",
          problem: "Translate: 'I think it's unfair because my sister does more than me.'",
          steps: [
            "'I think' → *pienso que* (or *creo que*). The *que* is compulsory — you can't drop it the way English drops 'that'.",
            "'it's unfair' → *es injusto*.",
            "'because' → *porque*; 'does more than me' → *hace más que yo*.",
          ],
          answer: "*Pienso que es injusto porque mi hermana hace más que yo.*",
          yourTurn: {
            question: "Your turn: write 'My sister doesn't do anything' in Spanish.",
            answer: { type: "text", accept: ["mi hermana no hace nada"] },
            solution: "*ella* form *hace*; double negative *no… nada*: **Mi hermana no hace nada.**",
          },
        },
      ],
      keyPoints: [
        "Opinion verb + infinitive: *odio planchar, me gusta cocinar, no me importa poner la mesa*.",
        "*gusta* stays singular with infinitives: *me gusta cocinar y planchar*.",
        "*es + adjective*: *es justo / injusto / un rollo / aburrido / útil*.",
        "Justify with *porque*; give a view with *pienso que / creo que / en mi opinión*.",
        "Double negatives: *no hace nada*, *no ayuda nadie* — but *Nadie ayuda* on its own.",
        "Compare: *hace más que yo*, *hago menos que mis padres*.",
      ],
      whyItWorks:
        "Why an infinitive after *odio* or *me gusta*? You are giving an opinion about the activity as a whole, and the infinitive is the 'name' of an action — Spanish's version of the English '-ing' form. And why *no… nada*? In Spanish, once the verb is made negative with *no*, every 'any-' word after it turns negative too (*nada, nadie, nunca*). English chose the opposite rule ('I don't do **any**thing'), so you have to switch systems when you translate.",
      strategies: ["Build it up (extended sentence)", "Recycle a chunk", "Agreement check", "Translate back to check"],
      thinkDeeper:
        "Should teenagers be paid for doing chores? Write two sentences in Spanish for each side — *Es justo porque…* / *Es injusto porque…* — using *pienso que*, *porque* and *deben*. Which side do you actually believe, and can you make the other side sound just as convincing?",
    },
    // ------------------------------------------------------------------ 5
    {
      id: "chores-this-weekend",
      heading: "This weekend: voy a… (chores)",
      discovery: {
        problem:
          "Compare:\n\n    Normalmente paso la aspiradora.\n    Mañana voy a pasar la aspiradora.\n\nThe chore is the same. What **two** changes turn the first sentence into a plan for the future? Now predict: how would you say 'Tomorrow I'm going to cook'?",
        idea:
          "Two changes: the time phrase (*normalmente → mañana*) and the verb (*paso → voy a pasar*). The immediate future is **ir + a + infinitive** — exactly like English 'I'm going to + verb'. So: *Mañana voy a cocinar.*",
      },
      body:
        "**The immediate future = ir + a + infinitive**\n\n| | ir | ir + a + chore |\n|---|---|---|\n| yo | voy | voy a lavar el coche |\n| tú | vas | vas a poner la mesa |\n| él / ella | va | va a cortar el césped |\n| nosotros/as | vamos | vamos a limpiar la cocina |\n| vosotros/as | vais | vais a regar las plantas |\n| ellos / ellas | van | van a ir de compras |\n\nThe chore stays in the **infinitive** — no *-o* ending: *voy a hacer la cama*, never *voy a hago la cama*. And don't forget the little *a*: *voy **a** lavar*.\n\n**Time phrases for the future**\n\n| Spanish | English |\n|---|---|\n| mañana | tomorrow |\n| pasado mañana | the day after tomorrow |\n| esta tarde | this afternoon / this evening |\n| esta noche | tonight |\n| este fin de semana | this weekend |\n| el sábado | on Saturday |\n| la semana que viene / la próxima semana | next week |\n\n**Negatives:** *no* goes before the part of *ir*.\n\n    Este fin de semana no voy a planchar. — This weekend I'm not going to iron.\n\n**Present vs future — let the time phrase be your signal**\n\n| Normally (present) | Plans (future) |\n|---|---|\n| Normalmente hago la cama. | Este fin de semana voy a hacer la cama. |\n| Los sábados lavo los platos. | Mañana voy a lavar el coche. |\n| Mi hermano nunca cocina. | El domingo mi hermano va a cocinar. |\n\n**Mixing obligation and future** — *tener que* and *ir a* happily share a sentence:\n\n    Normalmente no tengo que cocinar, pero mañana voy a preparar una tortilla de patatas.\n\n> *Mañana* means 'tomorrow', but *la mañana* means 'the morning': *mañana por la mañana* = tomorrow morning.",
      diagram: `<svg viewBox="0 0 480 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Timeline: a habit in the present repeats all along the line; plans with voy a sit at single points after today"><rect x="0" y="0" width="480" height="230" fill="#ffffff"/><text x="240" y="22" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#1f2937">normalmente (present) vs mañana (future)</text><text x="240" y="52" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#334155">normalmente lavo los platos: a habit (present tense)</text><circle cx="50" cy="74" r="5" fill="#bae6fd" stroke="#334155"/><circle cx="95" cy="74" r="5" fill="#bae6fd" stroke="#334155"/><circle cx="140" cy="74" r="5" fill="#bae6fd" stroke="#334155"/><circle cx="185" cy="74" r="5" fill="#bae6fd" stroke="#334155"/><circle cx="230" cy="74" r="5" fill="#bae6fd" stroke="#334155"/><circle cx="275" cy="74" r="5" fill="#bae6fd" stroke="#334155"/><circle cx="320" cy="74" r="5" fill="#bae6fd" stroke="#334155"/><circle cx="365" cy="74" r="5" fill="#bae6fd" stroke="#334155"/><circle cx="410" cy="74" r="5" fill="#bae6fd" stroke="#334155"/><line x1="20" y1="110" x2="450" y2="110" stroke="#1f2937" stroke-width="3"/><polygon points="450,103 466,110 450,117" fill="#1f2937"/><line x1="180" y1="98" x2="180" y2="122" stroke="#1f2937" stroke-width="3"/><text x="180" y="140" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#1f2937">hoy</text><circle cx="290" cy="110" r="9" fill="#fde68a" stroke="#334155" stroke-width="2"/><circle cx="400" cy="110" r="9" fill="#fde68a" stroke="#334155" stroke-width="2"/><text x="290" y="140" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#1f2937">mañana</text><text x="290" y="158" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">voy a cocinar</text><text x="400" y="140" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#1f2937">el sábado</text><text x="400" y="158" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">voy a lavar el coche</text><rect x="60" y="180" width="360" height="34" rx="8" fill="#bbf7d0" stroke="#334155"/><text x="240" y="202" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">future = ir (voy, vas, va…) + a + infinitive</text></svg>`,
      diagramCaption:
        "A habit (present tense) repeats all along the timeline; a plan with *voy a* + infinitive sits at one point after *hoy*.",
      workedExamples: [
        {
          title: "From habit to plan",
          problem: "Rewrite in the future, starting with *El sábado*: *Normalmente lavo el coche.*",
          steps: [
            "Swap the time phrase: *normalmente → el sábado*.",
            "*lavo* is the *yo* form → the *yo* form of *ir* is *voy*.",
            "Add *a* + the infinitive *lavar*; the rest stays the same.",
          ],
          answer: "*El sábado voy a lavar el coche.*",
          yourTurn: {
            question: "Your turn: write 'Tomorrow I'm going to cook' in Spanish.",
            answer: { type: "text", accept: ["mañana voy a cocinar", "voy a cocinar mañana", "mañana yo voy a cocinar", "yo voy a cocinar mañana"] },
            solution: "*voy* (*yo* form of *ir*) + *a* + infinitive *cocinar*: **Mañana voy a cocinar.**",
          },
        },
        {
          title: "Negative plans",
          problem: "Translate: 'This weekend my parents are not going to clean the bathroom.'",
          steps: [
            "'my parents' = they → *van*.",
            "Negative: *no* goes before *van*.",
            "*a* + infinitive *limpiar* + *el cuarto de baño*.",
          ],
          answer: "*Este fin de semana mis padres no van a limpiar el cuarto de baño.*",
          yourTurn: {
            question: "Your turn: write 'We are not going to go shopping' in Spanish.",
            answer: { type: "text", accept: ["no vamos a ir de compras", "nosotros no vamos a ir de compras", "nosotras no vamos a ir de compras"] },
            solution: "*nosotros* → *vamos*; *no* in front; then *a* + *ir de compras*: **No vamos a ir de compras.** (Yes, *ir* twice — just like 'going to go' in English.)",
          },
        },
      ],
      keyPoints: [
        "Immediate future: *ir* (*voy, vas, va, vamos, vais, van*) + *a* + infinitive.",
        "The chore stays in the infinitive: *voy a hacer la cama*.",
        "Negative: *no* before *ir*: *no voy a planchar*.",
        "Time phrases signal the tense: *normalmente / los sábados* → present; *mañana / este fin de semana* → future.",
        "*mañana* = tomorrow; *la mañana* = the morning.",
      ],
      whyItWorks:
        "Spanish builds its near future exactly like English: 'I'm **going** to wash' = *voy a lavar*. Going somewhere is a natural picture of the future — you are heading towards the action — and *a* ('to') points at it. Because *ir* already carries who is doing it, the chore verb doesn't need an ending: it stays as the infinitive, just as it does after *tengo que*.",
      strategies: ["Use the time phrase", "Check the subject", "Find the infinitive", "Translate back to check"],
      thinkDeeper:
        "Write three sentences about the same chore: what you normally do, what you have to do, and what you are going to do this weekend (*Normalmente… / Tengo que… / Este fin de semana voy a…*). Which words change each time, and which stay exactly the same? What happens to the chore verb every time it follows another verb?",
    },
  ],
  learn: {
    flashcards: [
      { front: "hago la cama", back: "I make the bed" },
      { front: "pongo la mesa", back: "I set (lay) the table" },
      { front: "quito la mesa", back: "I clear the table" },
      { front: "paso la aspiradora", back: "I vacuum / do the hoovering" },
      { front: "saco la basura", back: "I take out the rubbish" },
      { front: "riego las plantas", back: "I water the plants (regar: e→ie)" },
      { front: "paseo al perro", back: "I walk the dog (personal a: a + el = al)" },
      { front: "corto el césped", back: "I mow the lawn" },
      { front: "ir de compras vs hacer la compra", back: "go shopping vs do the food shopping" },
      { front: "¿Qué tienes que hacer en casa?", back: "What do you have to do at home?" },
      { front: "tener — yo, tú, él, nosotros forms?", back: "tengo, tienes, tiene, tenemos" },
      { front: "hay que + infinitive", back: "one has to / you have to (a general rule)" },
      { front: "No tengo que planchar.", back: "I don't have to iron. (no need — not 'I mustn't')" },
      { front: "'I never cook' — two ways", back: "Nunca cocino. / No cocino nunca." },
      { front: "55 in Spanish", back: "cincuenta y cinco" },
      { front: "veintiún dólares", back: "21 dollars (uno → un before a masculine noun)" },
      { front: "mis padres me dan…", back: "my parents give me…" },
      { front: "es un rollo", back: "it's a pain / a drag" },
      { front: "no me importa", back: "I don't mind" },
      { front: "Mi hermano no hace nada.", back: "My brother doesn't do anything." },
      { front: "Este fin de semana voy a lavar el coche.", back: "This weekend I'm going to wash the car." },
    ],
    mustKnow: [
      "I can name at least 12 household chores with the right verb and article.",
      "I can use the irregular *yo* forms *hago, pongo, voy* and the stem-changer *riego*.",
      "I can conjugate *tener* in the present and use *tener que* + infinitive for any person.",
      "I can use *deber* + infinitive and *hay que* + infinitive, and explain how they differ from *tener que*.",
      "I can ask and answer *¿Qué tienes que hacer en casa?*",
      "I can say how often I do a chore, using *nunca* in both positions.",
      "I can say how much pocket money I get with numbers 20–100 and *a la semana / al mes*.",
      "I can give and justify an opinion on a chore (*odio planchar porque es un rollo*).",
      "I can compare who does what (*mi hermano no hace nada; mi hermana hace más que yo*).",
      "I can say what I am (not) going to do this weekend with *ir a* + infinitive, and contrast it with what I normally do.",
    ],
    misconceptions: [
      { wrong: "*Tengo que lavo los platos.*", right: "*Tengo que lavar los platos.* — after *que* the chore stays in the infinitive." },
      { wrong: "*No tengo que* means 'I mustn't'.", right: "*No tengo que* = I don't have to (there's no need). 'I mustn't' = *no debo*." },
      { wrong: "*Paseo el perro.*", right: "*Paseo al perro.* — pets take the personal *a* (*a + el = al*)." },
      { wrong: "*Hacer la compra* and *ir de compras* mean the same.", right: "*Hacer la compra* = the food shopping; *ir de compras* = going shopping (clothes, presents, fun)." },
      { wrong: "*Me gustan planchar y cocinar.*", right: "*Me gusta planchar y cocinar.* — infinitives always take singular *gusta*." },
      { wrong: "*Mi hermano hace nada.*", right: "*Mi hermano no hace nada.* — *nada* after the verb needs *no* before it." },
      { wrong: "*Voy a hago la cama.*", right: "*Voy a hacer la cama.* — *ir a* is followed by the infinitive." },
    ],
    examMistakes: [
      "Writing *teno* or *tieno* instead of *tengo*.",
      "Putting the e→ie change outside the boot: *tienemos* or *riegamos* instead of *tenemos* and *regamos*.",
      "Forgetting the *que*: *tengo lavar* instead of *tengo que lavar*.",
      "Missing the *a* in the future: *voy lavar* instead of *voy a lavar*.",
      "Writing *veinte y cinco* instead of *veinticinco* — or forgetting the accents on *veintidós, veintitrés, veintiséis* and *dólares*.",
      "Translating 'I do the washing-up' word for word with *hacer* — it's *lavo los platos* (or *friego los platos*).",
      "Dropping the *me* in *mis padres me dan* — without it, you don't say who gets the money.",
      "Making the adjective feminine after a chore: *planchar es aburrida* instead of *planchar es aburrido* (an infinitive counts as masculine singular).",
    ],
    mnemonics: [
      {
        topic: "The -go verbs",
        device: "Go, go, yo! — hago, pongo, tengo, salgo",
        explanation: "A small gang of very common verbs add *-go* in the *yo* form only. If the chore uses *hacer* or *poner*, your *yo* form ends in *-go*.",
      },
      {
        topic: "hay que vs tengo que",
        device: "Hay que = house rule; tengo que = my job",
        explanation: "*Hay que* states a rule for everyone and never changes; *tengo que* is your own personal job and changes with the person.",
      },
      {
        topic: "Tens from 30 to 90",
        device: "Small number + -nta",
        explanation: "*cuatro → cuarenta, cinco → cincuenta, seis → sesenta, siete → setenta, ocho → ochenta, nueve → noventa* (and *tres → treinta*). Only *veinte* breaks the pattern.",
      },
    ],
    realWorld: [
      {
        title: "La paga in Spain",
        detail: "Spanish teenagers talk about *la paga* (pocket money). On an exchange you might be asked: *¿Cuánto te dan de paga?* — How much pocket money do you get?",
        emoji: "💶",
      },
      {
        title: "Taking the rubbish out in Spain",
        detail: "In most Spanish towns you carry your rubbish to big shared street bins (*los contenedores*): yellow for plastic and cans, blue for paper and cardboard, green for glass. *Saco la basura* often means a walk to the corner!",
        emoji: "♻️",
      },
      {
        title: "Hawker centre rules",
        detail: "In Singapore you are expected to return your tray at hawker centres — a perfect *hay que*: *En el hawker centre hay que devolver la bandeja.*",
        emoji: "🍜",
      },
      {
        title: "Helping your host family",
        detail: "Staying with a Spanish family? Offer to help: *¿Pongo la mesa?* or *¿Te ayudo a quitar la mesa?* After a long Spanish lunch and the *sobremesa* (the chat at the table afterwards), clearing up is a great way to say thank you.",
        emoji: "🍽️",
      },
      {
        title: "Words across the Spanish-speaking world",
        detail: "In much of Latin America you'll hear *el pasto* for the lawn (*cortar el pasto*), and in Mexico *lavar los trastes* for washing the dishes. Same chores, different words.",
        emoji: "🌎",
      },
    ],
    videos: [
      { title: "Household chores in Spanish", channel: "Señor Jordan", url: "https://www.youtube.com/results?search_query=senor+jordan+chores+in+spanish" },
      { title: "Tener que + infinitive", channel: "Butterfly Spanish", url: "https://www.youtube.com/results?search_query=tener+que+infinitive+spanish+lesson" },
      { title: "Numbers 20 to 100 in Spanish", channel: "Spanish with Profe", url: "https://www.youtube.com/results?search_query=spanish+numbers+20+to+100" },
      { title: "Ir a + infinitive: the near future", channel: "Language Gym", url: "https://www.youtube.com/results?search_query=ir+a+infinitive+spanish+near+future" },
      { title: "Comprehensible input: las tareas de casa", channel: "Dreaming Spanish", url: "https://www.youtube.com/results?search_query=dreaming+spanish+tareas+de+casa" },
    ],
    formulas: [
      { name: "Have to", formula: "tener (tengo, tienes, tiene…) + que + infinitive", note: "Tengo que sacar la basura." },
      { name: "Must / should", formula: "deber (debo, debes, debe…) + infinitive", note: "Todos deben ayudar en casa." },
      { name: "One has to (general rule)", formula: "hay que + infinitive", note: "En mi casa hay que hacer la cama." },
      { name: "How often", formula: "frequency phrase + present tense (nunca + verb / no + verb + nunca)", note: "Nunca plancho. / Lavo los platos dos veces a la semana." },
      { name: "Pocket money", formula: "recibo / gano / mis padres me dan + number + dólares / euros + a la semana / al mes", note: "Recibo treinta dólares a la semana." },
      { name: "Opinion on a chore", formula: "odio / me gusta / no me importa + infinitive (+ porque es…)", note: "Odio planchar porque es un rollo." },
      { name: "Double negative", formula: "no + verb + nada / nadie / nunca", note: "Mi hermano no hace nada." },
      { name: "Near future", formula: "ir (voy, vas, va…) + a + infinitive", note: "Este fin de semana voy a lavar el coche." },
    ],
  },
};
