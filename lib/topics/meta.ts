// ---------------------------------------------------------------------------
// Topic registry: order, strand, icon and the fixed guide-section outline.
// Section ids here are the contract shared by guide authors (who must use
// them) and question / drill authors (whose guideRef must point at them).
// Pure data — safe to import from Node scripts.
// ---------------------------------------------------------------------------
import type { Strand } from "../types.ts";

export interface SectionPlan {
  id: string;
  heading: string;
  /** What this section must teach. */
  covers: string;
  /** Year 9 look-ahead (light touch). */
  stretch?: boolean;
}

export interface TopicMeta {
  id: string;
  title: string;
  strand: Strand;
  icon: string;
  /** Where this sits in the school's Year 8 Spanish scheme (term + curriculum bullets). */
  curriculum: string;
  sections: SectionPlan[];
}

export const STRANDS: Strand[] = ["Home & Routine", "Free Time", "My Town", "Grammar"];

const S = (id: string, heading: string, covers: string, stretch?: boolean): SectionPlan => ({ id, heading, covers, ...(stretch ? { stretch } : {}) });

export const TOPIC_META: TopicMeta[] = [
  // ----------------------- TERM 1: HOME & ROUTINE -------------------------
  {
    id: "mi-casa",
    title: "Mi casa — My Home",
    strand: "Home & Routine",
    icon: "🏠",
    curriculum: "Y8 Term 1: Home – types, location, rooms (present tense)",
    sections: [
      S("types-of-home", "Types of home: ¿Dónde vives?", "vivo en + un piso / una casa / una casa adosada / un chalet / una granja / un apartamento; un vs una (gender of nouns); singular forms of vivir; asking ¿Dónde vives? / ¿Vives en una casa o en un piso?"),
      S("location", "Where it is: en el campo, en la costa…", "Mi casa está en + el centro / las afueras / el campo / la costa / la montaña / un pueblo / una ciudad; cerca de / lejos de (+ del); está vs es for location; Singapore and Spain examples (un piso en Singapur, un pueblo en Andalucía)."),
      S("rooms", "Rooms: ¿Qué hay en tu casa?", "la cocina, el salón, el comedor, el dormitorio, el cuarto de baño, el aseo, el despacho, el jardín, el garaje, el balcón, la terraza; hay + un/una/dos; tiene; en la planta baja / en la primera planta / arriba / abajo; numbers 1–20 for counting rooms."),
      S("describing-home", "Describing my home", "es + adjectives (grande, pequeño, moderno, antiguo, cómodo, bonito, feo, luminoso); adjective agreement (gender & number) and position after the noun; intensifiers (muy, bastante, un poco, demasiado); colours of rooms."),
      S("my-dream-home", "My dream home (look-ahead)", "Recognising and using the fixed phrase 'Me gustaría vivir en…' and 'Mi casa ideal tiene/tendría…' as a chunk; imagination + justification.", true),
    ],
  },
  {
    id: "mi-dormitorio",
    title: "Mi dormitorio — Furniture & Where Things Are",
    strand: "Home & Routine",
    icon: "🛏️",
    curriculum: "Y8 Term 1: Home – rooms, furniture (present tense)",
    sections: [
      S("furniture", "Furniture vocabulary", "la cama, el armario, el escritorio, la silla, la estantería, la lámpara, la alfombra, la cómoda, la mesita de noche, el espejo, el sofá, la televisión, el ordenador, las cortinas, el póster; gender and plural formation (-s / -es)."),
      S("prepositions-of-place", "Where is it? Prepositions of place", "encima de, debajo de, al lado de, delante de, detrás de, entre … y …, enfrente de, cerca de, lejos de, en; de + el = del (al lado del armario)."),
      S("hay-vs-esta", "Hay vs está / están", "hay = there is/are (existence, + un/una/unos/unas/number, no article after negative 'no hay'); está/están = is/are located (+ el/la/los/las). Choosing correctly; ¿Dónde está…?"),
      S("colours-and-possessives", "Colours, agreement & possessives", "colours after the noun with agreement (rojo/roja/rojos/rojas; azul/azules; naranja, rosa invariable); mi/mis, tu/tus, su/sus, nuestro/nuestra; describing objects."),
      S("describing-my-room", "Describing my room in a paragraph", "Building a paragraph: what there is, where things are, colours, opinion + reason (me encanta mi dormitorio porque es…), comparing with a sibling's room (compartir: comparto mi dormitorio con…)."),
    ],
  },
  {
    id: "rutina-diaria",
    title: "Mi rutina diaria — Daily Routine",
    strand: "Home & Routine",
    icon: "⏰",
    curriculum: "Y8 Term 1: Morning and evening daily routine (present tense)",
    sections: [
      S("reflexive-verbs", "Reflexive verbs: me levanto, me ducho", "me despierto, me levanto, me ducho, me baño, me lavo los dientes / la cara, me visto, me peino, me maquillo, me acuesto; reflexive pronouns me/te/se/nos/os/se with full present conjugation of levantarse."),
      S("telling-the-time", "Telling the time: ¿A qué hora…?", "Es la una / Son las dos; y cuarto, y media, menos cuarto, y diez, menos veinte; a la una / a las siete; de la mañana / de la tarde / de la noche; ¿Qué hora es? vs ¿A qué hora…?; 24-hour times in timetables."),
      S("morning-routine", "Morning routine & sequencers", "desayuno, salgo de casa, voy al colegio en autobús / en coche / a pie / en metro, llego al colegio; sequencers primero, luego, después, más tarde, entonces, finalmente; a las … + activity."),
      S("evening-routine", "Afternoon and evening routine", "vuelvo a casa, meriendo, hago los deberes, ceno, veo la tele, leo, juego con el móvil, me acuesto; antes de / después de + infinitive."),
      S("stem-changes-and-irregular-yo", "Stem-changing verbs and irregular 'yo' forms", "e→ie (me despierto, empiezo), o→ue (me acuesto, vuelvo, duermo), e→i (me visto); irregular yo forms salgo, hago, pongo, voy; full patterns (boot verbs)."),
      S("someone-elses-routine", "Describing someone else's routine", "Third person: mi hermano se levanta, mis padres se acuestan; comparing routines (yo me levanto a las seis pero mi hermana se levanta a las ocho); weekdays vs weekend (los fines de semana)."),
    ],
  },
  {
    id: "donde-vivo",
    title: "¿Dónde vives? — Opinions About Where People Live",
    strand: "Home & Routine",
    icon: "🗺️",
    curriculum: "Y8 Term 1: Opinions of self and others about where you/they live (present + immediate future)",
    sections: [
      S("opinion-phrases", "Giving opinions: me gusta, me encanta…", "(no) me gusta / me encanta / me chifla / odio / prefiero + infinitive (vivir aquí) or + noun; me gusta vs me gustan; scale of opinions; pienso que / creo que / en mi opinión / para mí."),
      S("justifying-opinions", "Justifying: porque es / hay / tiene", "porque + es/hay/tiene/está; ya que; adjectives for places: tranquilo, ruidoso, aburrido, animado, bonito, sucio, limpio, peligroso, seguro; hay mucho que hacer / no hay nada que hacer."),
      S("others-opinions", "What other people think", "a mi madre le gusta…, a mis padres les encanta…, mi hermano piensa que…, mi amiga dice que…; le/les with gustar; third person of vivir/pensar/preferir."),
      S("comparing-places", "Comparing places: más… que, menos… que", "más + adj + que, menos + adj + que, tan + adj + como, mejor/peor que; city vs countryside vs coast; Singapore vs a Spanish town."),
      S("future-home", "Where I'm going to live", "Immediate future in context: en el futuro voy a vivir en…, voy a comprar una casa…, porque va a ser…; mixing present opinion with future plan."),
    ],
  },
  // --------------------------- TERM 2: FREE TIME ---------------------------
  {
    id: "deportes",
    title: "Los deportes — Sport",
    strand: "Free Time",
    icon: "⚽",
    curriculum: "Y8 Term 2: Sports and free time activities (present + immediate future)",
    sections: [
      S("sports-vocab", "Sports vocabulary", "el fútbol, el baloncesto, el tenis, el voleibol, el hockey, el bádminton, la natación, el atletismo, el ciclismo, la equitación, la vela, el esquí, el patinaje, la gimnasia, el kárate, el yoga; gender & articles."),
      S("jugar-hacer-practicar", "Jugar a, hacer and practicar", "jugar (u→ue) + a + el = al / a la for ball games; hacer + sports like natación, atletismo, ciclismo, equitación; practicar for any sport; full present tense of jugar and hacer; ¿Qué deportes practicas?"),
      S("frequency", "How often? Frequency expressions", "siempre, a menudo, a veces, de vez en cuando, nunca (no… nunca), todos los días, una vez / dos veces a la semana, los lunes, los fines de semana; word order with frequency phrases."),
      S("sports-opinions", "Opinions about sport", "es emocionante, divertido, aburrido, agotador, peligroso, sano, relajante, difícil, fácil; me gusta + infinitive vs me gustan + plural noun; mi deporte preferido es… porque…"),
      S("sport-plans", "Sport plans: este fin de semana voy a…", "Immediate future with sport: voy a jugar al tenis, vamos a hacer natación; invitations ¿Quieres jugar al…? and replies; time phrases el sábado que viene."),
    ],
  },
  {
    id: "tiempo-libre",
    title: "El tiempo libre — Free Time",
    strand: "Free Time",
    icon: "🎮",
    curriculum: "Y8 Term 2: Free time descriptions (present + immediate future)",
    sections: [
      S("activities", "Free-time activities", "ver la tele, escuchar música, leer, salir con mis amigos, ir al cine, ir de compras, jugar a los videojuegos, tocar la guitarra / el piano, bailar, cantar, dibujar, navegar por internet, chatear, sacar fotos, cocinar, montar en bici."),
      S("gustar-and-preferences", "Gustar, encantar, interesar & preferir", "me/te/le/nos/os/les gusta(n); me encanta, me interesa, me chifla, me aburre; prefiero + infinitive; agreement me gusta la música / me gustan los videojuegos."),
      S("describing-activities", "Describing what you do: who, where, when", "con quién (con mi hermano, solo/sola), dónde (en casa, en el parque, en el centro comercial), cuándo (después del colegio, por la tarde, los sábados); building longer sentences with time + activity + place + company + opinion."),
      S("tv-and-music", "TV, films and music", "los dibujos animados, las comedias, los documentales, las series, los concursos, las noticias, las películas de acción / de terror / de ciencia ficción, la música pop / rap / clásica; opinions with adjectives that agree."),
      S("making-plans", "Making plans: ¿Quieres salir?", "¿Quieres ir al cine? Sí, vale / ¡Qué buena idea! / No puedo porque tengo que…; ¿Dónde quedamos? ¿A qué hora?; querer and poder (stem-changing); voy a + infinitive for plans."),
    ],
  },
  {
    id: "tareas",
    title: "Ayudar en casa — Chores",
    strand: "Free Time",
    icon: "🧹",
    curriculum: "Y8 Term 2: Chores and helping at home (present + immediate future)",
    sections: [
      S("chores-vocab", "Chores vocabulary", "hago la cama, pongo la mesa, quito la mesa, lavo los platos, paso la aspiradora, saco la basura, cocino, limpio mi dormitorio / el cuarto de baño, plancho, paseo al perro, corto el césped, riego las plantas, ordeno mi cuarto, voy de compras."),
      S("obligation", "Tengo que / debo / hay que", "tener que + infinitive (full conjugation of tener), deber + infinitive, hay que + infinitive (impersonal); no tengo que…; ¿Qué tienes que hacer en casa?"),
      S("frequency-and-pocket-money", "How often & pocket money", "cada día, una vez a la semana, los fines de semana, nunca; recibo / gano … dólares / euros a la semana; mis padres me dan…; numbers 20–100 for money; con mi dinero compro…"),
      S("opinions-on-chores", "Opinions about chores", "es justo / injusto, es un rollo, es aburrido, no me importa, odio + infinitive; comparing who does what (mi hermano no hace nada); pienso que todos deben ayudar."),
      S("chores-this-weekend", "This weekend: voy a… (chores)", "Immediate future for chores: este fin de semana voy a lavar el coche; negatives no voy a…; contrast normalmente (present) vs mañana (future)."),
    ],
  },
  // ---------------------------- TERM 3: MY TOWN ----------------------------
  {
    id: "el-tiempo",
    title: "¿Qué tiempo hace? — The Weather",
    strand: "My Town",
    icon: "☀️",
    curriculum: "Y8 Term 3: The weather (present/immediate future/preterite)",
    sections: [
      S("weather-expressions", "Weather expressions", "hace calor / frío / sol / viento / buen tiempo / mal tiempo / fresco; llueve, nieva, truena; está nublado / despejado; hay tormenta / niebla / nubes; hace mucho calor (not muy calor)."),
      S("seasons-and-months", "Seasons, months and climate", "la primavera, el verano, el otoño, el invierno; months (lowercase); en verano hace calor; climate in Spain vs Singapore (en Singapur siempre hace calor y llueve mucho)."),
      S("weather-map", "The weather map: en el norte…", "en el norte / sur / este / oeste / centro / noreste de España; cities (Madrid, Barcelona, Sevilla, Bilbao, Valencia); temperatures (grados, la temperatura máxima/mínima); reading a forecast."),
      S("weather-and-activities", "Cuando hace sol… Weather & activities", "cuando + weather, + activity (cuando llueve veo la tele); si hace buen tiempo, voy a…; forecasts with the immediate future: mañana va a llover / va a hacer sol."),
      S("past-weather", "Yesterday's weather: hizo, llovió", "Preterite weather: hizo calor / frío / sol, llovió, nevó, estuvo nublado, hubo tormenta; ayer / el fin de semana pasado; contrasting past, present and future weather."),
    ],
  },
  {
    id: "la-ciudad",
    title: "En mi ciudad — Places in Town",
    strand: "My Town",
    icon: "🏙️",
    curriculum: "Y8 Term 3: Places around the town",
    sections: [
      S("places-in-town", "Places in town", "el ayuntamiento, la biblioteca, el polideportivo, la piscina, el centro comercial, el mercado, la iglesia, el museo, el parque, la estación de tren / de autobuses, el cine, el castillo, la playa, la plaza mayor, el hospital, el banco, las tiendas, el restaurante, el estadio, el teatro."),
      S("hay-un-una", "Hay un, una, unos, unas…", "hay un/una/unos/unas/muchos/muchas/varios; no hay (no article): no hay cine; no hay ningún / ninguna (stretch); plurals of places; ¿Hay un banco por aquí?"),
      S("directions", "Directions: ¿Por dónde se va…?", "¿Dónde está…? ¿Por dónde se va al / a la…?; sigue / siga todo recto, gira / tuerce a la derecha / izquierda, toma la primera / segunda / tercera calle, cruza la plaza / el puente, al final de la calle; ordinal numbers; tú vs usted forms (recognition)."),
      S("location-and-distance", "Where is it? Location & distance", "está cerca / lejos, está a cinco minutos a pie / en coche, al lado de, enfrente de, entre, en la esquina; a + el = al, de + el = del; ir a + place."),
      S("what-you-can-do", "Se puede… What you can do in town", "se puede + infinitive (se puede ir de compras, visitar el museo, nadar); no se puede…; en mi ciudad hay… donde se puede…; recommending places."),
    ],
  },
  {
    id: "mi-ciudad",
    title: "Describing My Town & Extended Writing",
    strand: "My Town",
    icon: "✍️",
    curriculum: "Y8 Term 3: Descriptions of the town; extended sentences (present/immediate future/preterite)",
    sections: [
      S("town-adjectives", "Describing a town", "Mi ciudad es + histórica, moderna, industrial, turística, tranquila, ruidosa, sucia, limpia, animada, grande, pequeña; está situada en el norte / en la costa; tiene … habitantes; agreement with la ciudad / el pueblo."),
      S("pros-and-cons", "Lo bueno y lo malo", "lo bueno / lo mejor / lo malo / lo peor (de mi ciudad) es que…; hay demasiado tráfico / mucha contaminación / mucha basura; no hay nada para los jóvenes; me gustaría que hubiera… as a chunk only."),
      S("connectives-and-intensifiers", "Connectives & intensifiers", "y, pero, también, además, sin embargo, por eso, así que, ya que, porque, aunque; muy, bastante, demasiado, un poco, tan, realmente; using them to join and upgrade sentences."),
      S("extended-sentences", "Building extended sentences", "The extended-sentence formula: time phrase + verb + detail + opinion + reason + connective + contrast; upgrading a simple sentence step by step; varying sentence starts; avoiding repetition."),
      S("three-time-frames", "Past, present and future in one paragraph", "El fin de semana pasado fui / visité / comí… (preterite), normalmente voy / hay (present), el sábado que viene voy a… (immediate future); time phrases as signposts; a model paragraph about a town visit."),
    ],
  },
  // ------------------------------- GRAMMAR --------------------------------
  {
    id: "presente",
    title: "El presente — The Present Tense",
    strand: "Grammar",
    icon: "🔤",
    curriculum: "Y8 all terms: present tense (regular, irregular, stem-changing, reflexive)",
    sections: [
      S("regular-verbs", "Regular -ar, -er, -ir verbs", "Infinitive → stem + endings: -o -as -a -amos -áis -an; -o -es -e -emos -éis -en; -o -es -e -imos -ís -en; subject pronouns usually dropped; verbs from the Year 8 topics (vivir, hablar, comer, escuchar, leer, escribir, ayudar, limpiar)."),
      S("key-irregulars", "Key irregular verbs", "ser, estar, tener, ir, hacer (and yo-go verbs: salgo, pongo, hago, tengo, vengo), ver (veo); full conjugations; dar (doy)."),
      S("ser-vs-estar", "Ser vs estar", "ser for what something is like / identity / time (es grande, es la una); estar for location and temporary states (está en el centro, está cansado); typical Year 8 uses for homes and towns."),
      S("stem-changing-verbs", "Stem-changing 'boot' verbs", "e→ie (querer, preferir, empezar, pensar), o→ue (poder, volver, dormir, costar), u→ue (jugar), e→i (pedir, vestirse); the boot pattern (nosotros/vosotros keep the stem)."),
      S("reflexive-verbs", "Reflexive verbs in the present", "Pronoun before the verb (me levanto), on the end of the infinitive (voy a levantarme / para ducharme); non-reflexive vs reflexive meaning (lavo el coche / me lavo)."),
      S("negatives-and-questions", "Negatives and questions", "no + verb; nunca, nada, nadie, tampoco, ni… ni (double negatives: no hago nada); question words ¿qué?, ¿dónde?, ¿cuándo?, ¿cómo?, ¿por qué?, ¿quién?, ¿cuánto/a/os/as?, ¿con quién?, ¿a qué hora?; accents on question words; ¿…? punctuation."),
    ],
  },
  {
    id: "futuro-inmediato",
    title: "El futuro inmediato — Going To…",
    strand: "Grammar",
    icon: "🚀",
    curriculum: "Y8 Terms 1–3: the immediate future",
    sections: [
      S("ir-present", "The verb ir: voy, vas, va…", "Full present of ir; ir a + place (voy al parque, vas a la playa); a + el = al; ¿Adónde vas?"),
      S("forming-the-near-future", "Forming ir + a + infinitive", "Subject form of ir + a + infinitive; negatives (no voy a…); with reflexives (voy a levantarme / me voy a levantar); questions ¿Qué vas a hacer?"),
      S("future-time-phrases", "Future time phrases", "mañana, pasado mañana, esta tarde, esta noche, este fin de semana, el sábado que viene, la semana que viene / próxima, el año que viene, en el futuro, en las vacaciones."),
      S("plans-and-predictions", "Plans, invitations and predictions", "Making and describing plans; invitations and replies; predictions (va a llover, va a ser divertido); opinion of a future event (va a ser genial porque…)."),
      S("present-vs-future", "Present vs future: spotting the time frame", "normalmente / los sábados (present) vs este sábado / mañana (future); converting sentences between present and future; the 'present for near future' trap."),
    ],
  },
  {
    id: "preterito",
    title: "El pretérito — Talking About the Past",
    strand: "Grammar",
    icon: "⏪",
    curriculum: "Y8 Term 3: the preterite (with present and immediate future)",
    sections: [
      S("regular-ar-preterite", "Regular -ar verbs in the preterite", "-é, -aste, -ó, -amos, -asteis, -aron; accents change meaning (hablo = I speak vs habló = he spoke); nosotros form is the same as the present (context)."),
      S("regular-er-ir-preterite", "Regular -er and -ir verbs", "-í, -iste, -ió, -imos, -isteis, -ieron (comí, salí, bebí, escribí, volví); ver has no accents (vi, vio)."),
      S("spelling-changes", "Spelling-change verbs: jugué, toqué, empecé", "yo form of -car → -qué (toqué, saqué), -gar → -gué (jugué, llegué, pagué), -zar → -cé (empecé, crucé); leer → leyó, leyeron."),
      S("irregular-preterites", "Irregulars: fui, hice, tuve, estuve", "ir/ser (fui, fuiste, fue, fuimos, fuisteis, fueron — same forms, meaning from context), hacer (hice, hiciste, hizo…), tener (tuve), estar (estuve), dar (di); no accents on irregular stems."),
      S("past-time-phrases", "Past time phrases", "ayer, anteayer, anoche, el fin de semana pasado, la semana pasada, el año pasado, el lunes pasado, hace dos días / un mes; sequencing a past event (primero…, luego…, al final…) and giving an opinion (fue genial / lo pasé bomba)."),
      S("three-tenses", "Three time frames together", "Recognising the tense from verb endings + time phrases; switching a sentence between past, present and near future; writing a short three-tense account (ayer fui…, hoy voy…, mañana voy a ir…)."),
    ],
  },
];

export function metaById(id: string): TopicMeta | undefined {
  return TOPIC_META.find((t) => t.id === id);
}
