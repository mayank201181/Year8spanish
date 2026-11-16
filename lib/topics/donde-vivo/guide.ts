import type { TopicGuide } from "../../types.ts";

export const guide: TopicGuide = {
  id: "donde-vivo",
  title: "¿Dónde vives? — Opinions About Where People Live",
  strand: "Home & Routine",
  icon: "🗺️",
  summary: "Love it or hate it? Give, justify and compare opinions about where you live — now and in the future.",
  intro:
    "*¿Dónde vives? ¿Te gusta?* are two of the first questions a Spanish speaker will ask you. In this topic you'll learn to give a strong opinion about where you live, back it up with a reason, report what your family thinks, compare Singapore with a town in Spain, and say where you're going to live in the future.\n\nBy the end you'll be able to build a paragraph that moves from **present opinion** to **future plan** — exactly what examiners reward.",
  guide: [
    // -----------------------------------------------------------------------
    {
      id: "opinion-phrases",
      heading: "Giving opinions: me gusta, me encanta…",
      discovery: {
        problem:
          "Look at these four sentences:\n\n    Me gusta vivir aquí.\n    Me gusta mi barrio.\n    Me gustan los parques.\n    Me encantan las montañas.\n\nWhy do the last two end in *-n*? And why is the first one *gusta*, not *gustan*? Write your rule in one sentence.",
        idea:
          "The verb changes to match the **thing** you like, not you. One thing (*mi barrio*) → *gusta*. Several things (*los parques*) → *gustan*. An activity like *vivir aquí* counts as one thing, so it takes *gusta*. The same rule works for *encantar* and *chiflar*: *me encanta la playa* / *me encantan las playas*.",
      },
      body:
        "Every opinion has two parts: **how strongly** you feel, and **what** you feel it about.\n\n**The opinion scale** (strongest at the top):\n\n| Spanish | English |\n|---|---|\n| *me chifla(n)* | I'm crazy about (informal, Spain) |\n| *me encanta(n)* | I love |\n| *me gusta(n) mucho* | I really like |\n| *me gusta(n)* | I like |\n| *no me gusta(n)* | I don't like |\n| *no me gusta(n) nada* | I don't like … at all |\n| *odio* | I hate |\n\n**What comes after it?**\n\n- An **infinitive** (the *-ar / -er / -ir* form) → singular verb: *Me encanta vivir aquí.*\n- A **singular noun** → *gusta / encanta / chifla*: *Me gusta mi barrio. Me encanta la playa.*\n- A **plural noun** → *gustan / encantan / chiflan*: *Me gustan los parques. Me encantan las montañas.*\n\n> The verb agrees with the **thing** you like, not with you.\n\n**Odio** and **prefiero** are ordinary verbs, so they never add *-n*: *Odio el ruido. Odio las ciudades grandes.* *Prefiero* comes from *preferir* (e→ie): *Prefiero vivir en la costa. Prefiero el campo.*\n\n**Negatives:** *no* goes in front of *me*: *No me gusta nada vivir aquí.*\n\n**Opinion openers** — put these in front of a full sentence:\n\n| Spanish | English | Example |\n|---|---|---|\n| *pienso que* | I think that | *Pienso que mi barrio es bonito.* |\n| *creo que* | I think / believe that | *Creo que la ciudad es ruidosa.* |\n| *en mi opinión,* | in my opinion, | *En mi opinión, el campo es aburrido.* |\n| *para mí,* | for me, | *Para mí, la costa es ideal.* |\n\nIn English you can drop 'that' (*I think it's nice*). In Spanish you **can't** drop *que*: *Pienso* **que** *es bonito.* But never add *que* after *en mi opinión* or *para mí*.\n\n**Asking and answering:**\n\n    ¿Dónde vives? — Vivo en Singapur, en un piso.\n    ¿Te gusta vivir en Singapur? — Sí, me encanta.\n    ¿Qué piensas de tu barrio? — Pienso que es bastante tranquilo.",
      diagram: `<svg viewBox="0 0 480 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Opinion scale from odio on the left to me chifla on the right"><rect x="0" y="0" width="480" height="150" fill="#ffffff"/><text x="240" y="24" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#1f2937">La escala de opiniones</text><line x1="30" y1="80" x2="452" y2="80" stroke="#334155" stroke-width="2"/><polygon points="452,74 465,80 452,86" fill="#334155"/><circle cx="50" cy="80" r="9" fill="#fecaca" stroke="#334155"/><circle cx="125" cy="80" r="9" fill="#fecaca" stroke="#334155"/><circle cx="200" cy="80" r="9" fill="#fde68a" stroke="#334155"/><circle cx="280" cy="80" r="9" fill="#fde68a" stroke="#334155"/><circle cx="355" cy="80" r="9" fill="#bbf7d0" stroke="#334155"/><circle cx="430" cy="80" r="9" fill="#bbf7d0" stroke="#334155"/><text x="50" y="60" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">odio</text><text x="200" y="60" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">no me gusta</text><text x="355" y="60" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">me encanta</text><text x="125" y="108" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">no me gusta nada</text><text x="280" y="108" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">me gusta</text><text x="430" y="108" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">me chifla</text><text x="30" y="138" font-family="sans-serif" font-size="11" fill="#334155">← negativo</text><text x="465" y="138" font-family="sans-serif" font-size="11" text-anchor="end" fill="#334155">positivo →</text></svg>`,
      diagramCaption:
        "From 'I hate' to 'I'm crazy about'. *Odio* is strong — *no me gusta nada* is a softer way to say you really don't like something.",
      workedExamples: [
        {
          title: "Gusta or gustan?",
          problem: "Say in Spanish: 'I love the beaches, but I don't like the noise.'",
          steps: [
            "'Love' → *encantar*.",
            "*Las playas* is plural → *me encantan*.",
            "*El ruido* is singular → *no me gusta*.",
            "Join the two halves with *pero* (but).",
          ],
          answer: "*Me encantan las playas, pero no me gusta el ruido.*",
          yourTurn: {
            question: "Your turn: write in Spanish 'I like the parks.'",
            answer: { type: "text", accept: ["me gustan los parques", "a mí me gustan los parques"] },
            solution: "*Los parques* is plural, so the verb is plural too: **Me gustan los parques.**",
          },
        },
        {
          title: "Opener + prefiero",
          problem: "Say in Spanish: 'I think that my neighbourhood is boring. I prefer to live in the centre.'",
          steps: [
            "'I think that' → *Pienso que* (don't drop *que*).",
            "*Mi barrio* is masculine → *aburrido*.",
            "'I prefer' → *prefiero* (stem change e→ie), followed by the infinitive *vivir*.",
            "'in the centre' → *en el centro*.",
          ],
          answer: "*Pienso que mi barrio es aburrido. Prefiero vivir en el centro.*",
          yourTurn: {
            question: "Your turn: write in Spanish 'I prefer to live in the city.'",
            answer: { type: "text", accept: ["prefiero vivir en la ciudad", "yo prefiero vivir en la ciudad"] },
            solution: "*Prefiero* + infinitive *vivir* + *en la ciudad*: **Prefiero vivir en la ciudad.**",
          },
        },
      ],
      keyPoints: [
        "*Me gusta* + infinitive or singular noun; *me gustan* + plural noun.",
        "*Encantar* and *chiflar* follow the same pattern: *me encanta(n)*, *me chifla(n)*.",
        "*Odio* and *prefiero* are normal *yo* forms — they never add *-n*.",
        "*No* goes before *me*: *No me gusta nada.*",
        "*Pienso que* / *creo que* must keep *que*; *en mi opinión* and *para mí* take a comma, not *que*.",
      ],
      whyItWorks:
        "*Gustar* doesn't really mean 'to like' — it means 'to please'. *Me gusta el parque* is literally 'the park pleases me'. The park is the subject, so the verb agrees with the park: one park → *gusta*, several parks → *gustan*. *Me* is just the person being pleased.\n\n*Odio* and *prefiero* work the English way round: **you** are the subject, so they end in *-o* like any *yo* form, whatever comes after them.",
      strategies: ["Look for the pattern", "Agreement check", "Recycle a chunk"],
      thinkDeeper:
        "Why is it *Me gusta vivir y estudiar aquí* — with *gusta* — even though there are two activities? Now compare *Me gustan el parque y la playa*. What is different about the things being liked in each sentence?",
    },
    // -----------------------------------------------------------------------
    {
      id: "justifying-opinions",
      heading: "Justifying: porque es / hay / tiene",
      discovery: {
        problem:
          "Four reasons for liking a town:\n\n    porque es muy tranquilo\n    porque hay un parque grande\n    porque tiene una playa\n    porque está cerca del mar\n\nWhich verb tells you **what the place is like**? Which says **what there is**? Which says **what it has**? Which says **where it is**?",
        idea:
          "*Es* + adjective = what it's like. *Hay* + noun = what there is. *Tiene* + noun = what it has. *Está* + place phrase = where it is. Four verbs, four jobs — learn them as a set and you can justify almost any opinion.",
      },
      body:
        "An opinion on its own is thin. A reason makes it worth marks. Use **porque** (because) or **ya que** (since / as) and then one of four verbs:\n\n| Frame | Use it for | Example |\n|---|---|---|\n| *porque* **es** + adjective | what it's like | *porque es muy tranquilo* |\n| *porque* **hay** + noun | what there is | *porque hay muchos parques* |\n| *porque* **tiene** + noun | what it has | *porque tiene una playa bonita* |\n| *porque* **está** + place | where it is | *porque está cerca del mar* |\n\n**Adjectives for places** — they agree with the noun they describe:\n\n| masculine | feminine | English |\n|---|---|---|\n| tranquilo | tranquila | quiet, peaceful |\n| ruidoso | ruidosa | noisy |\n| aburrido | aburrida | boring |\n| animado | animada | lively |\n| bonito | bonita | pretty, nice |\n| feo | fea | ugly |\n| sucio | sucia | dirty |\n| limpio | limpia | clean |\n| peligroso | peligrosa | dangerous |\n| seguro | segura | safe |\n\n- *Mi barrio es tranquilo.* (*el barrio* → masculine)\n- *Mi ciudad es tranquila.* (*la ciudad* → feminine)\n- *Las calles son ruidosas.* (feminine plural → *son* + *-as*)\n\nThey come in handy pairs of opposites: *tranquilo ↔ ruidoso*, *aburrido ↔ animado*, *bonito ↔ feo*, *sucio ↔ limpio*, *peligroso ↔ seguro*.\n\n**Turn the volume up or down:** *muy* (very), *bastante* (quite), *un poco* (a bit — use it with negative words: *un poco sucio*), *demasiado* (too): *Es demasiado ruidoso.*\n\n**Two chunks everyone needs:**\n\n- *Hay mucho que hacer.* — There's a lot to do.\n- *No hay nada que hacer.* — There's nothing to do. (Spanish needs **both** *no* and *nada*.)\n\n**Hay never changes:** *hay un parque*, *hay dos parques*. After *no hay* you usually drop the article: *No hay cine. No hay tiendas.*\n\n**Está for location:** *está cerca de* (near), *está lejos de* (far from), *está en la costa*. Remember *de + el = del*: *cerca del mar*.\n\n**Balance it with pero:** *Me gusta mi barrio porque es seguro, pero no hay nada que hacer.*",
      workedExamples: [
        {
          title: "Opinion + two reasons",
          problem: "Say in Spanish: 'I like my neighbourhood because it is safe and there are lots of parks.'",
          steps: [
            "Opinion: *Me gusta mi barrio*.",
            "'It is safe' describes what it's like → *es seguro* (*el barrio* is masculine).",
            "'There are lots of parks' → *hay muchos parques* (*muchos* agrees with *parques*).",
            "Join with *porque … y …*.",
          ],
          answer: "*Me gusta mi barrio porque es seguro y hay muchos parques.*",
          yourTurn: {
            question: "Your turn: write in Spanish 'I don't like my city because it is dirty.' (Use *ciudad*.)",
            answer: {
              type: "text",
              accept: [
                "no me gusta mi ciudad porque es sucia",
                "no me gusta mi ciudad porque está sucia",
                "no me gusta mi ciudad ya que es sucia",
                "no me gusta mi ciudad ya que está sucia",
                "a mí no me gusta mi ciudad porque es sucia",
                "a mí no me gusta mi ciudad porque está sucia",
              ],
            },
            solution:
              "*La ciudad* is feminine, so *sucio* → *sucia*: **No me gusta mi ciudad porque es sucia.** (*Está sucia* is also fine — it suggests it's dirty at the moment.)",
          },
        },
        {
          title: "Es, hay or está?",
          problem: "Say in Spanish: 'Málaga is great because it is on the coast and there is a lot to do.'",
          steps: [
            "'Málaga is great' → *Málaga es genial* (*genial* has one form for masculine and feminine).",
            "'it is on the coast' is **location** → *está en la costa*, not *es*.",
            "'there is a lot to do' → the chunk *hay mucho que hacer*.",
          ],
          answer: "*Málaga es genial porque está en la costa y hay mucho que hacer.*",
          yourTurn: {
            question: "Your turn: write in Spanish 'There is nothing to do.'",
            answer: { type: "text", accept: ["no hay nada que hacer"] },
            solution: "Spanish needs a double negative — *no* before the verb and *nada* after it: **No hay nada que hacer.**",
          },
        },
      ],
      keyPoints: [
        "*porque* / *ya que* + *es* (adjective), *hay* (noun), *tiene* (noun), *está* (location).",
        "Adjectives agree: *el barrio es tranquilo*, *la ciudad es tranquila*, *las calles son ruidosas*.",
        "*Hay* never changes, singular or plural.",
        "*No hay nada que hacer* needs both *no* and *nada*.",
        "Use *pero* to give a balanced opinion.",
      ],
      whyItWorks:
        "Each verb answers a different question. *Es* (from *ser*) gives a **characteristic** — what the place is like. *Hay* comes from *haber* and simply says something **exists**, which is why it has only one form. *Tiene* treats the town as an owner: it *has* a beach. *Está* (from *estar*) is the verb for **location**, so 'it's near the sea' is always *está cerca del mar*, never *es cerca*.\n\nAdjectives agree because in Spanish a description belongs to its noun: a feminine noun takes a feminine description, a plural noun a plural one.",
      strategies: ["Build it up (extended sentence)", "Agreement check", "Gender detective (el/la)"],
      thinkDeeper:
        "*Mi barrio es aburrido* and *Estoy aburrido en mi barrio* use the same adjective but different verbs. One describes the place; one describes you. Which is which? Now try *Es seguro* and *Estoy seguro* — what does each one mean?",
    },
    // -----------------------------------------------------------------------
    {
      id: "others-opinions",
      heading: "What other people think",
      discovery: {
        problem:
          "Compare:\n\n    Me gusta vivir aquí.\n    A mi madre le gusta vivir aquí.\n    A mis padres les gusta vivir aquí.\n    A mis padres les gustan los parques.\n\nWhat replaces *me* when you talk about your mother? About your parents? Why does the verb in the third sentence stay *gusta* even though there are two parents?",
        idea:
          "*Me* changes to *le* for one other person and *les* for several — and you name them with *a* (*a mi madre*, *a mis padres*). But the verb still agrees with the **thing** liked: *vivir aquí* is one activity → *gusta*; *los parques* are plural → *gustan*. Two separate decisions.",
      },
      body:
        "To report other people's opinions you need two tools.\n\n**Tool 1: gustar with other people.** Swap *me* for the right pronoun and name the person with *a*:\n\n| who? | pronoun | example |\n|---|---|---|\n| (a mí) | me | *Me gusta vivir aquí.* |\n| (a ti) | te | *¿Te gusta tu barrio?* |\n| a mi madre / a él / a ella | le | *A mi madre le gusta el campo.* |\n| (a nosotros) | nos | *Nos encanta la costa.* |\n| (a vosotros) | os | *¿Os gusta Madrid?* |\n| a mis padres / a ellos / a ellas | les | *A mis padres les encanta el pueblo.* |\n\nThere are **two separate decisions**:\n\n1. **Who** likes it? One person → *le*. Several people → *les*.\n2. **What** do they like? One thing or an infinitive → *gusta*. Several things → *gustan*.\n\n    A mi hermano le gustan los parques.\n    A mis abuelos les gusta vivir en el campo.\n\nNegative: *no* goes before *le / les*: *A mi hermano* **no le** *gusta nada.*\n\nContrast two opinions: *A mí me encanta, pero a mi hermana no le gusta.*\n\n**Tool 2: verbs in the third person.** The *él / ella* and *ellos / ellas* forms let you say where someone lives and what they think, say and prefer:\n\n| | vivir | pensar (e→ie) | preferir (e→ie) | decir (irregular) |\n|---|---|---|---|---|\n| yo | vivo | pienso | prefiero | digo |\n| tú | vives | piensas | prefieres | dices |\n| él / ella | **vive** | **piensa** | **prefiere** | **dice** |\n| nosotros | vivimos | pensamos | preferimos | decimos |\n| vosotros | vivís | pensáis | preferís | decís |\n| ellos / ellas | **viven** | **piensan** | **prefieren** | **dicen** |\n\n- *Mis abuelos viven en un pueblo en la montaña.*\n- *Mi hermano piensa que mi barrio es aburrido.*\n- *Mi amiga Wei Ling dice que su barrio es muy seguro.*\n- *Mi madre prefiere vivir en la costa.*\n- *Mis padres creen que el centro es peligroso.* (*creer* is regular: *cree, creen*)\n\nJust like *pienso que*, you can't drop *que* after *piensa*, *dice* or *cree*.",
      diagram: `<svg viewBox="0 0 480 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Gustar needs two decisions: who likes it chooses le or les, what is liked chooses gusta or gustan"><defs><marker id="dv-arr3" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#334155"/></marker></defs><rect x="0" y="0" width="480" height="230" fill="#ffffff"/><text x="240" y="24" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#1f2937">Gustar: dos decisiones</text><rect x="15" y="40" width="210" height="95" rx="10" fill="#c7d2fe" stroke="#334155"/><text x="120" y="62" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#1f2937">¿Quién? → le / les</text><text x="120" y="88" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">a mi madre → le</text><text x="120" y="112" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">a mis padres → les</text><rect x="255" y="40" width="210" height="95" rx="10" fill="#fde68a" stroke="#334155"/><text x="360" y="62" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#1f2937">¿Qué? → gusta / gustan</text><text x="360" y="88" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">vivir aquí, el campo → gusta</text><text x="360" y="112" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">los parques → gustan</text><line x1="120" y1="135" x2="200" y2="180" stroke="#334155" stroke-width="1.5" marker-end="url(#dv-arr3)"/><line x1="360" y1="135" x2="268" y2="180" stroke="#334155" stroke-width="1.5" marker-end="url(#dv-arr3)"/><rect x="190" y="184" width="30" height="24" rx="4" fill="#c7d2fe"/><rect x="232" y="184" width="60" height="24" rx="4" fill="#fde68a"/><text x="182" y="201" font-family="sans-serif" font-size="14" text-anchor="end" fill="#1f2937">A mis padres</text><text x="205" y="201" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#1f2937">les</text><text x="262" y="201" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#1f2937">gustan</text><text x="298" y="201" font-family="sans-serif" font-size="14" fill="#1f2937">los parques.</text></svg>`,
      diagramCaption:
        "Who is pleased decides *le / les*; what pleases them decides *gusta / gustan*. Here: several people (*les*) and several parks (*gustan*).",
      workedExamples: [
        {
          title: "Le or les? Gusta or gustan?",
          problem: "Say in Spanish: 'My parents love the coast.'",
          steps: [
            "Who? *Mis padres* — several people → *les*, introduced with *a*: *A mis padres les…*",
            "What? *La costa* — one thing → *encanta* (singular).",
            "Put it together: *a* + person + *les* + verb + thing.",
          ],
          answer: "*A mis padres les encanta la costa.*",
          yourTurn: {
            question: "Your turn: write in Spanish 'My sister likes living here.'",
            answer: { type: "text", accept: ["a mi hermana le gusta vivir aquí"] },
            solution: "One person → *le*; *vivir aquí* is an activity (singular) → *gusta*: **A mi hermana le gusta vivir aquí.**",
          },
        },
        {
          title: "Reporting what someone thinks",
          problem: "Say in Spanish: 'My brother thinks that the village is boring, but he prefers to live there.'",
          steps: [
            "'thinks' → *pensar*, *él* form with the stem change: *piensa*. Keep *que*.",
            "*El pueblo* is masculine → *aburrido*.",
            "'he prefers' → *preferir*, *él* form: *prefiere* + infinitive *vivir*.",
            "'there' → *allí*.",
          ],
          answer: "*Mi hermano piensa que el pueblo es aburrido, pero prefiere vivir allí.*",
          yourTurn: {
            question: "Your turn: write the *ellos* form of *preferir* in the present tense.",
            answer: { type: "text", accept: ["prefieren", "ellos prefieren", "ellas prefieren"] },
            solution: "The stress falls on the stem, so e→ie: *prefer-* → *prefier-* + *-en* → **prefieren**.",
          },
        },
      ],
      keyPoints: [
        "*A* + person + *le* (one person) / *les* (several) + *gusta(n)*.",
        "*Gusta* or *gustan* depends on the thing liked, never on the people.",
        "*No* goes before *le / les*: *A mi padre no le gusta.*",
        "Third person: *vive / viven*, *piensa / piensan*, *prefiere / prefieren*, *dice / dicen*.",
        "Keep *que* after *piensa*, *cree* and *dice*.",
      ],
      whyItWorks:
        "Remember: *gustar* = 'to please'. *A mi madre le gusta el campo* is literally 'to my mother, the countryside pleases her'. Your mother is on the receiving end, which is why she needs *a* and the pronoun *le*. The verb still agrees with the thing that does the pleasing.\n\nSpanish says the person twice (*a mi madre* … *le*) because *le* on its own could mean him, her or you (*usted*) — *a mi madre* makes it clear.\n\nThe stem changes (*piensa*, *prefiere*) happen only where the stress falls on the stem. In *pensamos* and *preferimos* the stress moves to the ending, so the stem stays *pens-* / *prefer-*.",
      strategies: ["Check the subject", "Find the infinitive", "Look for the pattern"],
      thinkDeeper:
        "*A Lucía le gusta Diego* and *A Diego le gusta Lucía* use exactly the same words in a different order. Who likes whom in each? Now try: how would you say 'Diego likes me'? (Hint: who is doing the pleasing now?)",
    },
    // -----------------------------------------------------------------------
    {
      id: "comparing-places",
      heading: "Comparing places: más… que, menos… que",
      discovery: {
        problem:
          "Read these two sentences:\n\n    El campo es más tranquilo que la ciudad.\n    La ciudad es menos tranquila que el campo.\n\nDo they mean the same thing? Why does *tranquilo* become *tranquila* in the second one? Then guess: how would you say 'as quiet as'?",
        idea:
          "They describe the same fact from opposite ends — like a see-saw. The adjective always agrees with the **first** place (the subject of *es*): *el campo* → *tranquilo*, *la ciudad* → *tranquila*. 'As quiet as' is *tan tranquilo como*.",
      },
      body:
        "**Four comparison frames:**\n\n| Frame | English | Example |\n|---|---|---|\n| *más* + adjective + *que* | more … than / -er than | *La ciudad es más ruidosa que el pueblo.* |\n| *menos* + adjective + *que* | less … than | *El pueblo es menos ruidoso que la ciudad.* |\n| *tan* + adjective + *como* | as … as | *La costa es tan bonita como la montaña.* |\n| *mejor que / peor que* | better than / worse than | *El campo es mejor que la ciudad.* |\n\n**Rules to watch:**\n\n- The adjective agrees with the subject: *Los pueblos son más tranquilos que las ciudades.*\n- After *más* and *menos* use **que** (not *de*, not *como*).\n- 'Better' and 'worse' have their own words: *mejor* and *peor* — never *más bueno* / *más malo* for 'better' / 'worse'. They have no feminine form, only a plural: *Los parques de mi barrio son mejores.*\n\n**Comparing nouns:** use *más / menos* + noun + *que*:\n\n    En la ciudad hay más tiendas que en el pueblo.\n    En el campo hay menos coches que en la ciudad.\n\n**City, countryside or coast?**\n\n| place | often described as… |\n|---|---|\n| *la ciudad* | *animada, ruidosa, moderna* |\n| *el campo* | *tranquilo, bonito, un poco aburrido* |\n| *la costa* | *bonita, turística, animada en verano* |\n\n**Singapore and Spain** (watch the agreement):\n\n- *Vivir en Singapur es más caro que vivir en un pueblo.*\n- *En invierno, en Singapur hace más calor que en Madrid.*\n- *La ciudad de Singapur es más moderna que el pueblo de Diego, pero el pueblo es más tranquilo.*\n\n> Tip: with a city name, saying *la ciudad de…* or *vivir en…* keeps the agreement simple.",
      diagram: `<svg viewBox="0 0 480 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three bar comparisons: Madrid taller than a village for más que, countryside shorter than city for menos que, coast equal to mountains for tan como"><rect x="0" y="0" width="480" height="250" fill="#ffffff"/><text x="240" y="20" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#1f2937">Comparar: más… que · menos… que · tan… como</text><rect x="10" y="32" width="150" height="210" rx="8" fill="#ffffff" stroke="#334155"/><rect x="165" y="32" width="150" height="210" rx="8" fill="#ffffff" stroke="#334155"/><rect x="320" y="32" width="150" height="210" rx="8" fill="#ffffff" stroke="#334155"/><text x="85" y="52" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#1f2937">más… que</text><text x="240" y="52" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#1f2937">menos… que</text><text x="395" y="52" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#1f2937">tan… como</text><line x1="25" y1="170" x2="145" y2="170" stroke="#334155"/><line x1="180" y1="170" x2="300" y2="170" stroke="#334155"/><line x1="335" y1="170" x2="455" y2="170" stroke="#334155"/><rect x="35" y="70" width="40" height="100" fill="#bae6fd" stroke="#334155"/><rect x="95" y="135" width="40" height="35" fill="#bbf7d0" stroke="#334155"/><text x="55" y="185" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">Madrid</text><text x="115" y="185" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">un pueblo</text><text x="85" y="210" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">Madrid es más grande</text><text x="85" y="226" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">que un pueblo.</text><rect x="190" y="140" width="40" height="30" fill="#bbf7d0" stroke="#334155"/><rect x="250" y="75" width="40" height="95" fill="#fecaca" stroke="#334155"/><text x="210" y="185" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">el campo</text><text x="270" y="185" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">la ciudad</text><text x="240" y="210" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">El campo es menos</text><text x="240" y="226" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">ruidoso que la ciudad.</text><rect x="345" y="100" width="40" height="70" fill="#fde68a" stroke="#334155"/><rect x="405" y="100" width="40" height="70" fill="#fde68a" stroke="#334155"/><text x="365" y="185" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">la costa</text><text x="425" y="185" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">la montaña</text><text x="395" y="210" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">La costa es tan bonita</text><text x="395" y="226" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">como la montaña.</text></svg>`,
      diagramCaption:
        "Taller bar = more of the quality (size, noise, beauty). Equal bars = *tan… como*. The adjective agrees with the first place: *el campo* → *ruidoso*, *la costa* → *bonita*.",
      workedExamples: [
        {
          title: "Más… que with agreement",
          problem: "Say in Spanish: 'The coast is prettier than the city.'",
          steps: [
            "'prettier than' = 'more pretty than' → *más bonito que*.",
            "The subject is *la costa* (feminine) → *bonita*.",
            "Build it: *La costa es más bonita que la ciudad.*",
          ],
          answer: "*La costa es más bonita que la ciudad.*",
          yourTurn: {
            question: "Your turn: write in Spanish 'The village is quieter than the city.'",
            answer: { type: "text", accept: ["el pueblo es más tranquilo que la ciudad"] },
            solution: "'quieter than' → *más tranquilo que*; *el pueblo* is masculine → *tranquilo*: **El pueblo es más tranquilo que la ciudad.**",
          },
        },
        {
          title: "Tan… como and mejor",
          problem: "Say in Spanish: 'My neighbourhood is as safe as the centre, but the countryside is better.'",
          steps: [
            "'as safe as' → *tan seguro como* (*mi barrio* is masculine).",
            "'is better' → *es mejor* — not *más bueno*.",
            "Join with *pero*.",
          ],
          answer: "*Mi barrio es tan seguro como el centro, pero el campo es mejor.*",
          yourTurn: {
            question: "Your turn: write in Spanish 'The city is worse than the countryside.'",
            answer: { type: "text", accept: ["la ciudad es peor que el campo"] },
            solution: "'worse than' has its own word: *peor que* (no *más*): **La ciudad es peor que el campo.**",
          },
        },
      ],
      keyPoints: [
        "*más / menos* + adjective + *que*; *tan* + adjective + *como*.",
        "The adjective agrees with the first noun (the subject).",
        "*mejor / peor* (plural *mejores / peores*) — never *más bueno / más malo* for better / worse.",
        "Compare amounts with *más / menos* + noun + *que*: *hay más tiendas que…*",
        "With city names, *la ciudad de…* or *vivir en…* keeps agreement simple.",
      ],
      whyItWorks:
        "A comparison is a see-saw: if the city is **more** noisy than the village, the village is **less** noisy than the city — same fact, flipped. The adjective describes the subject of *es*, so it agrees with that first noun, wherever the second one sits.\n\n*Mejor* and *peor* exist for the same reason English says 'better', not 'more good': the most common comparisons wore down into short special words long ago. They come from Latin *melior* and *peior*.",
      strategies: ["Agreement check", "Translate back to check", "Build it up (extended sentence)"],
      thinkDeeper:
        "With numbers, Spanish switches *que* to *de*: *En mi barrio hay más de diez parques.* Compare 'more than ten parks' with 'more parks than the village'. One compares two places; what does the other do? Why might Spanish want a different word?",
    },
    // -----------------------------------------------------------------------
    {
      id: "future-home",
      heading: "Where I'm going to live",
      discovery: {
        problem:
          "Read this:\n\n    Ahora vivo en Singapur. Me encanta porque hay mucho que hacer.\n    En el futuro voy a vivir en Madrid porque va a ser emocionante.\n\nWhich verbs are about **now** and which are about the **future**? The future verb is built from three pieces. What are they?",
        idea:
          "*Vivo*, *me encanta* and *hay* are present. *Voy a vivir* and *va a ser* are the immediate future: a form of **ir** (*voy, va*) + **a** + an **infinitive** (*vivir, ser*). The infinitive never changes — only *ir* does.",
      },
      body:
        "**The immediate future** = *ir* (present tense) + *a* + infinitive.\n\n| | ir | + a + infinitive |\n|---|---|---|\n| yo | voy | a vivir |\n| tú | vas | a comprar |\n| él / ella | va | a ser |\n| nosotros | vamos | a vivir |\n| vosotros | vais | a comprar |\n| ellos / ellas | van | a vivir |\n\n**Time phrases** that signal the future: *en el futuro* (in the future), *algún día* (one day), *dentro de diez años* (in ten years' time), *el año que viene* (next year), *cuando sea mayor* (when I'm older — a fixed chunk: learn it as a block and don't change it).\n\n**Frames for your future home:**\n\n- *En el futuro voy a vivir en…* *la costa / el campo / una ciudad grande / Barcelona*\n- *Voy a comprar…* *una casa grande / un piso moderno / una casa con jardín*\n- *…porque va a ser…* *más tranquilo / emocionante / ideal*\n- *Va a haber…* (there's going to be): *Va a haber más parques.* (*hay* → *va a haber*, always singular)\n- *No voy a vivir en…* (*no* goes before *voy*)\n- *Me gustaría vivir en…* (I would like to live in… — another fixed chunk)\n\n**Mix your time frames.** Strong answers move from present to future:\n\n    Ahora vivo en un piso en Singapur. Me gusta porque es moderno y hay mucho que hacer.\n    Pero en el futuro voy a vivir en el campo en España porque va a ser más tranquilo.\n\nSignal words help the reader follow you: *ahora* (now), *normalmente* (normally), *pero en el futuro…*, *sin embargo* (however).\n\n**Other people's plans:** *Mi hermana va a vivir en Valencia. Mis padres van a comprar una casa en la costa.*",
      diagram: `<svg viewBox="0 0 480 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Timeline from now, vivo en Singapur, to the future, voy a vivir en el campo"><rect x="0" y="0" width="480" height="200" fill="#ffffff"/><text x="240" y="22" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#1f2937">Presente y futuro</text><text x="120" y="50" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#334155">presente: vivo, me gusta, es</text><text x="360" y="50" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#334155">ir + a + infinitivo</text><line x1="20" y1="95" x2="455" y2="95" stroke="#334155" stroke-width="2"/><polygon points="455,89 468,95 455,101" fill="#334155"/><circle cx="120" cy="95" r="7" fill="#bae6fd" stroke="#334155"/><circle cx="360" cy="95" r="7" fill="#bbf7d0" stroke="#334155"/><text x="120" y="78" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#1f2937">ahora</text><text x="360" y="78" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#1f2937">en el futuro</text><text x="240" y="86" font-family="sans-serif" font-size="12" font-style="italic" text-anchor="middle" fill="#334155">pero…</text><rect x="30" y="115" width="180" height="60" rx="8" fill="#bae6fd" stroke="#334155"/><text x="120" y="140" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">Vivo en Singapur.</text><text x="120" y="162" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">Me gusta porque es…</text><rect x="265" y="115" width="190" height="60" rx="8" fill="#bbf7d0" stroke="#334155"/><text x="360" y="140" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">Voy a vivir en el campo</text><text x="360" y="162" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">porque va a ser…</text></svg>`,
      diagramCaption:
        "Left: present tense for where you live now and why. Right: *ir + a + infinitivo* for where you're going to live. *Pero* links them.",
      workedExamples: [
        {
          title: "Build a future plan",
          problem: "Say in Spanish: 'I'm going to buy a big house in the countryside.'",
          steps: [
            "'I'm going to' → *voy a*.",
            "'buy' → infinitive *comprar* (no ending added).",
            "'a big house' → *una casa grande* (adjective after the noun).",
            "'in the countryside' → *en el campo*.",
          ],
          answer: "*Voy a comprar una casa grande en el campo.*",
          yourTurn: {
            question: "Your turn: write in Spanish 'In the future I am going to live on the coast.'",
            answer: {
              type: "text",
              accept: [
                "en el futuro voy a vivir en la costa",
                "en el futuro yo voy a vivir en la costa",
                "voy a vivir en la costa en el futuro",
                "yo voy a vivir en la costa en el futuro",
              ],
            },
            solution: "Time phrase + *voy a* + *vivir* + *en la costa*: **En el futuro voy a vivir en la costa.**",
          },
        },
        {
          title: "Present opinion → future plan",
          problem: "Say in Spanish: 'Now I live in a flat, but in the future I'm going to live in a house because it's going to be bigger.'",
          steps: [
            "Present: *Ahora vivo en un piso*.",
            "Link: *pero en el futuro…*",
            "Future: *voy a vivir en una casa*.",
            "Reason in the future: *porque va a ser más grande* (*grande* doesn't change for gender).",
          ],
          answer: "*Ahora vivo en un piso, pero en el futuro voy a vivir en una casa porque va a ser más grande.*",
          yourTurn: {
            question: "Your turn: write in Spanish 'My parents are going to live in a village.'",
            answer: { type: "text", accept: ["mis padres van a vivir en un pueblo"] },
            solution: "*Mis padres* = *ellos* → *van*; then *a* + *vivir*: **Mis padres van a vivir en un pueblo.**",
          },
        },
      ],
      keyPoints: [
        "Immediate future = *voy / vas / va / vamos / vais / van* + *a* + infinitive.",
        "Only *ir* changes; the infinitive stays the same.",
        "*porque va a ser…* gives a future reason; *va a haber* = there's going to be.",
        "*Cuando sea mayor* and *me gustaría* are fixed chunks — learn them whole.",
        "Top answers mix present opinion and future plan, linked with *pero* or *sin embargo*.",
      ],
      whyItWorks:
        "English does exactly the same thing: 'I'm **going to** live' uses the verb 'go' to point forward in time. Spanish uses *ir* (to go) + *a* (to) + the action. Because *ir* carries all the information about **who**, the infinitive after it never needs an ending.\n\n*Va a haber* stays singular for the same reason *hay* does: *haber* in the sense 'there is / there are' only has one form, so its future does too.",
      strategies: ["Use the time phrase", "Find the infinitive", "Build it up (extended sentence)"],
      thinkDeeper:
        "Write one sentence that has a present opinion, a reason, a future plan and a future reason. Then rewrite it about your friend (*él / ella*). Which words had to change, and which stayed exactly the same? Why?",
    },
  ],
  learn: {
    flashcards: [
      { front: "me chifla", back: "I'm crazy about it (informal, Spain)" },
      { front: "me encantan las montañas", back: "I love the mountains" },
      { front: "odio vivir aquí", back: "I hate living here" },
      { front: "prefiero vivir en la costa", back: "I prefer to live on the coast" },
      { front: "pienso que / creo que", back: "I think that (never drop *que*)" },
      { front: "tranquilo ↔ ruidoso", back: "quiet ↔ noisy" },
      { front: "animado ↔ aburrido", back: "lively ↔ boring" },
      { front: "limpio ↔ sucio", back: "clean ↔ dirty" },
      { front: "seguro ↔ peligroso", back: "safe ↔ dangerous" },
      { front: "hay mucho que hacer", back: "there's a lot to do" },
      { front: "no hay nada que hacer", back: "there's nothing to do" },
      { front: "porque está cerca del mar", back: "because it's near the sea" },
      { front: "a mis padres les encanta el campo", back: "my parents love the countryside" },
      { front: "*A mis abuelos ___ gusta.* le or les?", back: "*les* — several people" },
      { front: "mi hermano piensa que…", back: "my brother thinks that…" },
      { front: "más tranquilo que", back: "quieter than" },
      { front: "tan bonito como", back: "as pretty as" },
      { front: "mejor que / peor que", back: "better than / worse than" },
      { front: "en el futuro voy a vivir en…", back: "in the future I'm going to live in…" },
      { front: "va a ser", back: "it's going to be" },
      { front: "las afueras", back: "the outskirts" },
    ],
    mustKnow: [
      "I can ask and answer *¿Dónde vives?* and *¿Te gusta vivir allí?*",
      "I can use *me gusta / me gustan* correctly with infinitives, singular and plural nouns.",
      "I can place an opinion on the scale from *odio* to *me chifla*.",
      "I can start a sentence with *pienso que*, *creo que*, *en mi opinión* or *para mí*.",
      "I can justify an opinion with *porque* / *ya que* + *es*, *hay*, *tiene* or *está*.",
      "I can make ten place adjectives agree with masculine, feminine and plural nouns.",
      "I can say what other people think with *le / les gusta*, *piensa que*, *dice que* and *prefiere*.",
      "I can compare places with *más… que*, *menos… que*, *tan… como*, *mejor* and *peor*.",
      "I can say where I'm going to live with *voy a* + infinitive and give a future reason with *va a ser*.",
      "I can write a short paragraph that moves from a present opinion to a future plan.",
    ],
    misconceptions: [
      { wrong: "*Me gusta los parques.*", right: "*Me gustan los parques.* — plural thing liked → *gustan*." },
      { wrong: "*Pienso es bonito.*", right: "*Pienso que es bonito.* — Spanish can't drop *que* the way English drops 'that'." },
      { wrong: "*Mi madre le gusta el campo.*", right: "*A mi madre le gusta el campo.* — the person pleased needs *a*." },
      { wrong: "*A mis padres le gusta la costa.*", right: "*A mis padres les gusta la costa.* — several people → *les*." },
      { wrong: "*Es cerca de la playa.*", right: "*Está cerca de la playa.* — location uses *estar*." },
      { wrong: "*El campo es más bueno que la ciudad.*", right: "*El campo es mejor que la ciudad.* — 'better' is *mejor*." },
      { wrong: "*Mi ciudad es tranquilo.*", right: "*Mi ciudad es tranquila.* — *la ciudad* is feminine." },
      { wrong: "*Hay nada que hacer.*", right: "*No hay nada que hacer.* — Spanish needs the double negative." },
    ],
    examMistakes: [
      "Writing *me encanta mucho* — *encantar* is already strong; say *me encanta* or *me gusta mucho*.",
      "Using *gustan* with an infinitive: *me gustan vivir aquí* should be *me gusta vivir aquí*.",
      "Forgetting *que* after *pienso*, *creo*, *piensa* or *dice*.",
      "Leaving the adjective masculine after a feminine noun: *la ciudad es ruidoso*.",
      "Writing *más grande de* or *más grande como* instead of *más grande que*.",
      "Missing the *a* in the future (*voy vivir*) or conjugating the infinitive (*voy a vivo*).",
      "Missing the stem change: *pensa* and *prefere* instead of *piensa* and *prefiere*.",
      "Dropping the accent or the opening ¿ in *¿Dónde vives?*",
    ],
    mnemonics: [
      {
        topic: "gustar",
        device: "The park pleases me",
        explanation: "Read *me gusta* as 'it pleases me'. The thing doing the pleasing is the subject — so *gusta* for one thing, *gustan* for several.",
      },
      {
        topic: "Four reason verbs",
        device: "E-H-T-E: Every Home Tells Everything",
        explanation: "*Es* (what it's like), *Hay* (what there is), *Tiene* (what it has), *Está* (where it is).",
      },
      {
        topic: "estar for location",
        device: "How you feel and where you are — that is when you use *estar*.",
        explanation: "So *está cerca del mar*, *está en la costa* — never *es cerca*.",
      },
      {
        topic: "mejor / peor",
        device: "No 'more better'",
        explanation: "English doesn't say 'more good', and Spanish doesn't say *más bueno* for 'better' — use *mejor* and *peor* on their own.",
      },
    ],
    realWorld: [
      {
        title: "Your exchange partner",
        detail: "A Spanish exchange student will almost certainly ask *¿Dónde vives? ¿Te gusta vivir en Singapur?* — and want to know how it compares with their *pueblo*.",
        emoji: "🤝",
      },
      {
        title: "Flat adverts in Spain",
        detail: "Spanish property adverts use exactly this language: *zona tranquila*, *cerca del metro*, *barrio animado*, *a cinco minutos de la playa*.",
        emoji: "🏢",
      },
      {
        title: "Holiday reviews",
        detail: "Travel reviews in Spanish are full of *es muy tranquilo*, *hay mucho que hacer*, *está cerca de la playa* — great real reading practice.",
        emoji: "🏖️",
      },
      {
        title: "City or countryside?",
        detail: "In Spain people debate *la España vaciada* — villages losing their young people to the cities. Comparing *el campo* and *la ciudad* is a real national conversation.",
        emoji: "🏞️",
      },
      {
        title: "Moving abroad",
        detail: "If your family ever moves to Madrid or Mexico City, you'll compare: *En Singapur hace más calor, pero aquí hay más parques.*",
        emoji: "✈️",
      },
    ],
    videos: [
      { title: "Where you live: opinions and reasons", channel: "Language Gym", url: "https://www.youtube.com/results?search_query=language+gym+spanish+where+you+live+opinions" },
      { title: "Gustar with le and les", channel: "Señor Jordan", url: "https://www.youtube.com/results?search_query=senor+jordan+gustar+le+les" },
      { title: "Comparatives: más que, menos que, tan como", channel: "Butterfly Spanish", url: "https://www.youtube.com/results?search_query=butterfly+spanish+comparatives+mas+que+tan+como" },
      { title: "The immediate future: ir a + infinitive", channel: "Spanish with Profe", url: "https://www.youtube.com/results?search_query=spanish+ir+a+infinitive+immediate+future" },
      { title: "City or countryside (comprehensible input)", channel: "Dreaming Spanish", url: "https://www.youtube.com/results?search_query=dreaming+spanish+ciudad+o+campo" },
    ],
    formulas: [
      { name: "Liking things", formula: "me gusta + infinitive / singular noun · me gustan + plural noun", note: "Me gusta vivir aquí. Me gustan los parques." },
      { name: "Opinion opener", formula: "pienso que / creo que + sentence · en mi opinión, / para mí, + sentence", note: "Pienso que mi barrio es bonito." },
      { name: "Justifying", formula: "porque / ya que + es (adjective) / hay (noun) / tiene (noun) / está (place)", note: "Me gusta porque está cerca del mar." },
      { name: "Other people's opinions", formula: "a + person + le (one) / les (several) + gusta(n)", note: "A mis padres les encanta el campo." },
      { name: "Comparing", formula: "más / menos + adjective + que · tan + adjective + como · mejor / peor que", note: "La ciudad es más ruidosa que el pueblo." },
      { name: "Immediate future", formula: "ir (voy, vas, va, vamos, vais, van) + a + infinitive", note: "En el futuro voy a vivir en la costa." },
    ],
  },
};
