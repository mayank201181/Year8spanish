import test from "node:test";
import assert from "node:assert/strict";
import {
  PERSONS,
  PERSON_LABEL,
  TENSES,
  VERBS,
  acceptedForms,
  conjugate,
  englishGloss,
  nearFutureTable,
  presentTable,
  preteriteTable,
  verbInfo,
  verbsWithTag,
} from "../lib/spanish/verbs.ts";
import type { Person } from "../lib/spanish/verbs.ts";

// ---------------------------------------------------------------------------
// Reference tables, written out by hand (yo, tú, él, nosotros, vosotros, ellos).
// Deliberately NOT generated from the implementation.
// ---------------------------------------------------------------------------

const PRESENT: Record<string, string> = {
  // regular -ar
  hablar: "hablo, hablas, habla, hablamos, habláis, hablan",
  escuchar: "escucho, escuchas, escucha, escuchamos, escucháis, escuchan",
  limpiar: "limpio, limpias, limpia, limpiamos, limpiáis, limpian",
  pasear: "paseo, paseas, pasea, paseamos, paseáis, pasean",
  estudiar: "estudio, estudias, estudia, estudiamos, estudiáis, estudian",
  chatear: "chateo, chateas, chatea, chateamos, chateáis, chatean",
  // spelling -car / -gar / -zar (regular in the present)
  sacar: "saco, sacas, saca, sacamos, sacáis, sacan",
  tocar: "toco, tocas, toca, tocamos, tocáis, tocan",
  llegar: "llego, llegas, llega, llegamos, llegáis, llegan",
  pagar: "pago, pagas, paga, pagamos, pagáis, pagan",
  practicar: "practico, practicas, practica, practicamos, practicáis, practican",
  navegar: "navego, navegas, navega, navegamos, navegáis, navegan",
  cruzar: "cruzo, cruzas, cruza, cruzamos, cruzáis, cruzan",
  // stem-changing -ar
  regar: "riego, riegas, riega, regamos, regáis, riegan",
  merendar: "meriendo, meriendas, merienda, merendamos, merendáis, meriendan",
  empezar: "empiezo, empiezas, empieza, empezamos, empezáis, empiezan",
  jugar: "juego, juegas, juega, jugamos, jugáis, juegan",
  pensar: "pienso, piensas, piensa, pensamos, pensáis, piensan",
  // reflexive
  levantarse: "me levanto, te levantas, se levanta, nos levantamos, os levantáis, se levantan",
  despertarse: "me despierto, te despiertas, se despierta, nos despertamos, os despertáis, se despiertan",
  acostarse: "me acuesto, te acuestas, se acuesta, nos acostamos, os acostáis, se acuestan",
  ducharse: "me ducho, te duchas, se ducha, nos duchamos, os ducháis, se duchan",
  llamarse: "me llamo, te llamas, se llama, nos llamamos, os llamáis, se llaman",
  vestirse: "me visto, te vistes, se viste, nos vestimos, os vestís, se visten",
  divertirse: "me divierto, te diviertes, se divierte, nos divertimos, os divertís, se divierten",
  // -er
  comer: "como, comes, come, comemos, coméis, comen",
  beber: "bebo, bebes, bebe, bebemos, bebéis, beben",
  leer: "leo, lees, lee, leemos, leéis, leen",
  correr: "corro, corres, corre, corremos, corréis, corren",
  ver: "veo, ves, ve, vemos, veis, ven",
  hacer: "hago, haces, hace, hacemos, hacéis, hacen",
  tener: "tengo, tienes, tiene, tenemos, tenéis, tienen",
  poner: "pongo, pones, pone, ponemos, ponéis, ponen",
  querer: "quiero, quieres, quiere, queremos, queréis, quieren",
  poder: "puedo, puedes, puede, podemos, podéis, pueden",
  volver: "vuelvo, vuelves, vuelve, volvemos, volvéis, vuelven",
  ser: "soy, eres, es, somos, sois, son",
  barrer: "barro, barres, barre, barremos, barréis, barren",
  coger: "cojo, coges, coge, cogemos, cogéis, cogen",
  // -ir
  vivir: "vivo, vives, vive, vivimos, vivís, viven",
  escribir: "escribo, escribes, escribe, escribimos, escribís, escriben",
  compartir: "comparto, compartes, comparte, compartimos, compartís, comparten",
  subir: "subo, subes, sube, subimos, subís, suben",
  salir: "salgo, sales, sale, salimos, salís, salen",
  ir: "voy, vas, va, vamos, vais, van",
  venir: "vengo, vienes, viene, venimos, venís, vienen",
  dormir: "duermo, duermes, duerme, dormimos, dormís, duermen",
  preferir: "prefiero, prefieres, prefiere, preferimos, preferís, prefieren",
  pedir: "pido, pides, pide, pedimos, pedís, piden",
  // others
  estar: "estoy, estás, está, estamos, estáis, están",
  dar: "doy, das, da, damos, dais, dan",
  decir: "digo, dices, dice, decimos, decís, dicen",
};

const PRETERITE: Record<string, string> = {
  hablar: "hablé, hablaste, habló, hablamos, hablasteis, hablaron",
  escuchar: "escuché, escuchaste, escuchó, escuchamos, escuchasteis, escucharon",
  limpiar: "limpié, limpiaste, limpió, limpiamos, limpiasteis, limpiaron",
  pasear: "paseé, paseaste, paseó, paseamos, paseasteis, pasearon",
  estudiar: "estudié, estudiaste, estudió, estudiamos, estudiasteis, estudiaron",
  chatear: "chateé, chateaste, chateó, chateamos, chateasteis, chatearon",
  sacar: "saqué, sacaste, sacó, sacamos, sacasteis, sacaron",
  tocar: "toqué, tocaste, tocó, tocamos, tocasteis, tocaron",
  llegar: "llegué, llegaste, llegó, llegamos, llegasteis, llegaron",
  pagar: "pagué, pagaste, pagó, pagamos, pagasteis, pagaron",
  practicar: "practiqué, practicaste, practicó, practicamos, practicasteis, practicaron",
  navegar: "navegué, navegaste, navegó, navegamos, navegasteis, navegaron",
  cruzar: "crucé, cruzaste, cruzó, cruzamos, cruzasteis, cruzaron",
  regar: "regué, regaste, regó, regamos, regasteis, regaron",
  merendar: "merendé, merendaste, merendó, merendamos, merendasteis, merendaron",
  empezar: "empecé, empezaste, empezó, empezamos, empezasteis, empezaron",
  jugar: "jugué, jugaste, jugó, jugamos, jugasteis, jugaron",
  pensar: "pensé, pensaste, pensó, pensamos, pensasteis, pensaron",
  levantarse: "me levanté, te levantaste, se levantó, nos levantamos, os levantasteis, se levantaron",
  despertarse: "me desperté, te despertaste, se despertó, nos despertamos, os despertasteis, se despertaron",
  acostarse: "me acosté, te acostaste, se acostó, nos acostamos, os acostasteis, se acostaron",
  ducharse: "me duché, te duchaste, se duchó, nos duchamos, os duchasteis, se ducharon",
  llamarse: "me llamé, te llamaste, se llamó, nos llamamos, os llamasteis, se llamaron",
  vestirse: "me vestí, te vestiste, se vistió, nos vestimos, os vestisteis, se vistieron",
  divertirse: "me divertí, te divertiste, se divirtió, nos divertimos, os divertisteis, se divirtieron",
  comer: "comí, comiste, comió, comimos, comisteis, comieron",
  beber: "bebí, bebiste, bebió, bebimos, bebisteis, bebieron",
  leer: "leí, leíste, leyó, leímos, leísteis, leyeron",
  correr: "corrí, corriste, corrió, corrimos, corristeis, corrieron",
  ver: "vi, viste, vio, vimos, visteis, vieron",
  hacer: "hice, hiciste, hizo, hicimos, hicisteis, hicieron",
  tener: "tuve, tuviste, tuvo, tuvimos, tuvisteis, tuvieron",
  poner: "puse, pusiste, puso, pusimos, pusisteis, pusieron",
  querer: "quise, quisiste, quiso, quisimos, quisisteis, quisieron",
  poder: "pude, pudiste, pudo, pudimos, pudisteis, pudieron",
  volver: "volví, volviste, volvió, volvimos, volvisteis, volvieron",
  ser: "fui, fuiste, fue, fuimos, fuisteis, fueron",
  barrer: "barrí, barriste, barrió, barrimos, barristeis, barrieron",
  coger: "cogí, cogiste, cogió, cogimos, cogisteis, cogieron",
  vivir: "viví, viviste, vivió, vivimos, vivisteis, vivieron",
  escribir: "escribí, escribiste, escribió, escribimos, escribisteis, escribieron",
  compartir: "compartí, compartiste, compartió, compartimos, compartisteis, compartieron",
  subir: "subí, subiste, subió, subimos, subisteis, subieron",
  salir: "salí, saliste, salió, salimos, salisteis, salieron",
  ir: "fui, fuiste, fue, fuimos, fuisteis, fueron",
  venir: "vine, viniste, vino, vinimos, vinisteis, vinieron",
  dormir: "dormí, dormiste, durmió, dormimos, dormisteis, durmieron",
  preferir: "preferí, preferiste, prefirió, preferimos, preferisteis, prefirieron",
  pedir: "pedí, pediste, pidió, pedimos, pedisteis, pidieron",
  estar: "estuve, estuviste, estuvo, estuvimos, estuvisteis, estuvieron",
  dar: "di, diste, dio, dimos, disteis, dieron",
  decir: "dije, dijiste, dijo, dijimos, dijisteis, dijeron",
};

function expectRow(row: string): Record<Person, string> {
  const parts = row.split(",").map((s) => s.trim());
  assert.equal(parts.length, 6, `reference row must have 6 forms: ${row}`);
  return { yo: parts[0], tú: parts[1], él: parts[2], nosotros: parts[3], vosotros: parts[4], ellos: parts[5] };
}

test("reference tables cover at least 30 verbs in both tenses", () => {
  const both = Object.keys(PRESENT).filter((v) => v in PRETERITE);
  assert.ok(both.length >= 30, `only ${both.length} verbs`);
  for (const v of both) assert.ok(verbInfo(v), `${v} missing from VERBS`);
});

for (const [verb, row] of Object.entries(PRESENT)) {
  test(`present: ${verb}`, () => {
    assert.deepEqual(presentTable(verb), expectRow(row));
  });
}

for (const [verb, row] of Object.entries(PRETERITE)) {
  test(`preterite: ${verb}`, () => {
    assert.deepEqual(preteriteTable(verb), expectRow(row));
  });
}

// ---------------------------------------------------------------------------
// Spot checks of the key teaching points
// ---------------------------------------------------------------------------

test("preterite: ver and dar have no written accents", () => {
  for (const v of ["ver", "dar"]) {
    for (const p of PERSONS) assert.doesNotMatch(conjugate(v, "preterite", p), /[áéíóú]/, `${v} ${p}`);
  }
  assert.equal(conjugate("ver", "preterite", "yo"), "vi");
  assert.equal(conjugate("ver", "preterite", "él"), "vio");
  assert.equal(conjugate("dar", "preterite", "yo"), "di");
  assert.equal(conjugate("dar", "preterite", "él"), "dio");
});

test("preterite: ser and ir share fui … fueron", () => {
  assert.deepEqual(preteriteTable("ser"), preteriteTable("ir"));
});

test("preterite: extra -car / -gar / -zar verbs", () => {
  assert.equal(conjugate("almorzar", "preterite", "yo"), "almorcé");
  assert.equal(conjugate("almorzar", "preterite", "tú"), "almorzaste");
  assert.equal(conjugate("fregar", "preterite", "yo"), "fregué");
  assert.equal(conjugate("fregar", "present", "yo"), "friego");
  assert.equal(conjugate("almorzar", "present", "nosotros"), "almorzamos");
  assert.equal(conjugate("almorzar", "present", "ellos"), "almuerzan");
});

test("extra irregulars: andar, seguir, esquiar", () => {
  assert.deepEqual(preteriteTable("andar"), expectRow("anduve, anduviste, anduvo, anduvimos, anduvisteis, anduvieron"));
  assert.deepEqual(presentTable("seguir"), expectRow("sigo, sigues, sigue, seguimos, seguís, siguen"));
  assert.equal(conjugate("seguir", "preterite", "él"), "siguió");
  assert.deepEqual(presentTable("esquiar"), expectRow("esquío, esquías, esquía, esquiamos, esquiáis, esquían"));
  assert.equal(conjugate("esquiar", "preterite", "yo"), "esquié");
});

// ---------------------------------------------------------------------------
// Near future
// ---------------------------------------------------------------------------

test("near future: ir (present) + a + infinitive", () => {
  assert.deepEqual(
    nearFutureTable("jugar"),
    expectRow("voy a jugar, vas a jugar, va a jugar, vamos a jugar, vais a jugar, van a jugar"),
  );
  assert.equal(conjugate("ir", "near-future", "nosotros"), "vamos a ir");
  assert.equal(conjugate("hacer", "near-future", "él"), "va a hacer");
  assert.equal(conjugate("ser", "near-future", "vosotros"), "vais a ser");
});

test("near future: reflexive pronoun attaches to the infinitive", () => {
  assert.deepEqual(
    nearFutureTable("levantarse"),
    expectRow(
      "voy a levantarme, vas a levantarte, va a levantarse, vamos a levantarnos, vais a levantaros, van a levantarse",
    ),
  );
  assert.equal(conjugate("vestirse", "near-future", "tú"), "vas a vestirte");
  assert.equal(conjugate("divertirse", "near-future", "nosotros"), "vamos a divertirnos");
});

// ---------------------------------------------------------------------------
// Reflexive checks
// ---------------------------------------------------------------------------

test("reflexives: flag, pronouns and examples", () => {
  assert.equal(conjugate("levantarse", "present", "yo"), "me levanto");
  assert.equal(conjugate("acostarse", "preterite", "ellos"), "se acostaron");
  assert.equal(conjugate("peinarse", "present", "vosotros"), "os peináis");
  assert.equal(conjugate("bañarse", "preterite", "nosotros"), "nos bañamos");
  const pronouns = ["me", "te", "se", "nos", "os", "se"];
  for (const v of VERBS.filter((x) => x.reflexive)) {
    assert.ok(v.inf.endsWith("se"), v.inf);
    assert.ok(v.tags.includes("reflexive"), v.inf);
    PERSONS.forEach((p, i) => {
      for (const t of ["present", "preterite"] as const) {
        assert.ok(conjugate(v.inf, t, p).startsWith(pronouns[i] + " "), `${v.inf} ${t} ${p}`);
      }
    });
  }
  for (const v of VERBS.filter((x) => !x.reflexive)) {
    assert.ok(!v.tags.includes("reflexive"), v.inf);
    assert.doesNotMatch(conjugate(v.inf, "present", "yo"), /^me /, v.inf);
  }
  assert.equal(verbsWithTag("reflexive").length, VERBS.filter((x) => x.reflexive).length);
});

// ---------------------------------------------------------------------------
// acceptedForms
// ---------------------------------------------------------------------------

test("acceptedForms: canonical first, subject pronoun variants", () => {
  const yo = acceptedForms("jugar", "present", "yo");
  assert.equal(yo[0], "juego");
  assert.ok(yo.includes("yo juego"));
  assert.equal(new Set(yo).size, yo.length, "no duplicates");

  const el = acceptedForms("jugar", "present", "él");
  assert.equal(el[0], "juega");
  for (const f of ["él juega", "ella juega"]) assert.ok(el.includes(f), f);
  assert.ok(!el.includes("ellos juega"));

  const ellos = acceptedForms("comer", "preterite", "ellos");
  assert.equal(ellos[0], "comieron");
  for (const f of ["ellos comieron", "ellas comieron"]) assert.ok(ellos.includes(f), f);

  const nos = acceptedForms("vivir", "present", "nosotros");
  for (const f of ["vivimos", "nosotros vivimos", "nosotras vivimos"]) assert.ok(nos.includes(f), f);

  const vos = acceptedForms("hablar", "present", "vosotros");
  for (const f of ["habláis", "vosotros habláis", "vosotras habláis"]) assert.ok(vos.includes(f), f);

  const tu = acceptedForms("tener", "present", "tú");
  assert.deepEqual(tu.slice(0, 2), ["tienes", "tú tienes"]);
});

test("acceptedForms: reflexive near future accepts both pronoun positions", () => {
  const f = acceptedForms("levantarse", "near-future", "yo");
  assert.equal(f[0], "voy a levantarme");
  for (const x of ["me voy a levantar", "yo voy a levantarme", "yo me voy a levantar"]) assert.ok(f.includes(x), x);

  const g = acceptedForms("ducharse", "near-future", "ellos");
  for (const x of ["van a ducharse", "se van a duchar", "ellas se van a duchar"]) assert.ok(g.includes(x), x);

  const h = acceptedForms("vestirse", "near-future", "nosotros");
  for (const x of ["vamos a vestirnos", "nos vamos a vestir", "nosotras nos vamos a vestir"]) assert.ok(h.includes(x), x);

  // Non-reflexive near future has no pronoun-moved variant.
  const j = acceptedForms("nadar", "near-future", "tú");
  assert.deepEqual(j, ["vas a nadar", "tú vas a nadar"]);
});

test("acceptedForms: reflexive present keeps the pronoun after the subject", () => {
  const f = acceptedForms("levantarse", "present", "él");
  assert.equal(f[0], "se levanta");
  assert.ok(f.includes("ella se levanta"));
  assert.ok(!f.includes("levanta"));
});

test("acceptedForms: every form ends with the canonical verb", () => {
  for (const v of VERBS) {
    for (const t of TENSES) {
      for (const p of PERSONS) {
        const forms = acceptedForms(v.inf, t, p);
        assert.equal(forms[0], conjugate(v.inf, t, p));
        assert.equal(new Set(forms).size, forms.length, `${v.inf} ${t} ${p} duplicates`);
      }
    }
  }
});

// ---------------------------------------------------------------------------
// English glosses
// ---------------------------------------------------------------------------

test("englishGloss: natural English", () => {
  assert.equal(englishGloss("levantarse", "present", "yo"), "I get up");
  assert.equal(englishGloss("levantarse", "present", "él"), "he/she gets up");
  assert.equal(englishGloss("jugar", "preterite", "él"), "he/she played");
  assert.equal(englishGloss("nadar", "near-future", "nosotros"), "we are going to swim");
  assert.equal(englishGloss("nadar", "near-future", "yo"), "I am going to swim");
  assert.equal(englishGloss("nadar", "near-future", "él"), "he/she is going to swim");
  assert.equal(englishGloss("hacer", "present", "él"), "he/she does");
  assert.equal(englishGloss("tener", "present", "él"), "he/she has");
  assert.equal(englishGloss("ver", "present", "él"), "he/she watches");
  assert.equal(englishGloss("ordenar", "present", "él"), "he/she tidies");
  assert.equal(englishGloss("ir", "preterite", "vosotros"), "you all went");
  assert.equal(englishGloss("ser", "present", "yo"), "I am");
  assert.equal(englishGloss("estar", "preterite", "ellos"), "they were");
  assert.equal(englishGloss("estar", "preterite", "él"), "he/she was");
  assert.equal(englishGloss("llamarse", "present", "yo"), "I am called");
  assert.equal(englishGloss("llamarse", "preterite", "tú"), "you were called");
  assert.equal(englishGloss("peinarse", "present", "ellos"), "they brush their hair");
  assert.equal(englishGloss("peinarse", "present", "él"), "he/she brushes his/her hair");
  assert.equal(englishGloss("poder", "present", "él"), "he/she can");
  assert.equal(englishGloss("poder", "near-future", "yo"), "I am going to be able to");
  assert.equal(englishGloss("desayunar", "present", "él"), "he/she has breakfast");
  assert.equal(englishGloss("dormir", "preterite", "yo"), "I slept");
});

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

test("PERSON_LABEL and PERSONS", () => {
  assert.deepEqual([...PERSONS], ["yo", "tú", "él", "nosotros", "vosotros", "ellos"]);
  assert.equal(PERSON_LABEL.yo, "yo (I)");
  assert.equal(PERSON_LABEL.tú, "tú (you)");
  assert.equal(PERSON_LABEL.él, "él / ella (he / she)");
  assert.equal(PERSON_LABEL.nosotros, "nosotros (we)");
  assert.equal(PERSON_LABEL.vosotros, "vosotros (you all)");
  assert.equal(PERSON_LABEL.ellos, "ellos / ellas (they)");
});

test("VERBS: ~90 unique verbs with groups, meanings and tags", () => {
  assert.ok(VERBS.length >= 86, `only ${VERBS.length} verbs`);
  const infs = VERBS.map((v) => v.inf);
  assert.equal(new Set(infs).size, infs.length, "duplicate infinitives");
  for (const v of VERBS) {
    const base = v.reflexive ? v.inf.slice(0, -2) : v.inf;
    assert.equal(base.slice(-2), v.group, v.inf);
    assert.match(v.en, /\S/, v.inf);
    assert.ok(v.tags.length > 0, v.inf);
  }
  assert.equal(verbInfo("hablar")?.group, "ar");
  assert.equal(verbInfo("levantarse")?.reflexive, true);
  assert.equal(verbInfo("nope"), undefined);
});

test("VERBS: grammar tags", () => {
  const has = (inf: string, tag: string) => assert.ok(verbInfo(inf)?.tags.includes(tag), `${inf} should have ${tag}`);
  const hasNot = (inf: string, tag: string) => assert.ok(!verbInfo(inf)?.tags.includes(tag), `${inf} should not have ${tag}`);
  has("hablar", "regular");
  has("vivir", "regular");
  hasNot("tener", "regular");
  has("jugar", "stem-u-ue");
  has("jugar", "spelling-gar");
  has("dormir", "stem-o-ue");
  has("pensar", "stem-e-ie");
  has("pedir", "stem-e-i");
  has("empezar", "spelling-zar");
  has("cruzar", "spelling-zar");
  has("sacar", "spelling-car");
  has("tener", "yo-go");
  has("salir", "yo-go");
  has("hacer", "irregular");
  has("ser", "irregular");
  has("ir", "irregular");
  has("levantarse", "topic:rutina-diaria");
  has("jugar", "topic:deportes");
  has("limpiar", "topic:tareas");
  hasNot("hablar", "spelling-gar");
  for (const tag of ["topic:mi-casa", "topic:rutina-diaria", "topic:deportes", "topic:tiempo-libre", "topic:tareas", "topic:la-ciudad", "topic:el-tiempo"]) {
    assert.ok(verbsWithTag(tag).length > 0, tag);
  }
});

test("required verbs are all present", () => {
  const required =
    "hablar escuchar bailar cantar nadar cocinar limpiar lavar ayudar ordenar pasear planchar sacar tocar visitar comprar mirar trabajar estudiar viajar desayunar cenar llegar pagar practicar montar navegar chatear cortar regar preparar tomar ganar descansar odiar usar terminar merendar empezar cruzar jugar pensar despertarse acostarse levantarse ducharse bañarse lavarse peinarse maquillarse quedarse llamarse comer beber leer aprender correr comprender ver hacer tener poner querer poder volver deber ser barrer coger vivir escribir abrir compartir recibir subir salir ir venir dormir preferir pedir vestirse divertirse estar dar decir".split(
      " ",
    );
  for (const v of required) assert.ok(verbInfo(v), `${v} missing`);
});

test("unknown verbs throw a clear error", () => {
  assert.throws(() => conjugate("blorgar", "present", "yo"), /Unknown verb/);
  assert.throws(() => acceptedForms("blorgar", "present", "yo"), /Unknown verb/);
  assert.throws(() => englishGloss("blorgar", "present", "yo"), /Unknown verb/);
});

// ---------------------------------------------------------------------------
// Sanity sweep
// ---------------------------------------------------------------------------

test("every verb conjugates in every tense and person", () => {
  for (const v of VERBS) {
    for (const t of TENSES) {
      const seen = new Set<string>();
      for (const p of PERSONS) {
        const f = conjugate(v.inf, t, p);
        assert.equal(typeof f, "string");
        assert.ok(f.trim().length > 0, `${v.inf} ${t} ${p} empty`);
        assert.doesNotMatch(f, /undefined|null|NaN/, `${v.inf} ${t} ${p}: ${f}`);
        assert.equal(f, f.trim(), `${v.inf} ${t} ${p} whitespace`);
        assert.doesNotMatch(f, /\s{2,}/, `${v.inf} ${t} ${p} double space`);
        seen.add(f);
        const g = englishGloss(v.inf, t, p);
        assert.ok(g.length > 0);
        assert.doesNotMatch(g, /undefined|null|NaN|\{|\}/, `${v.inf} ${t} ${p}: ${g}`);
      }
      // The yo and tú forms always differ, and most persons are distinct.
      assert.notEqual(conjugate(v.inf, t, "yo"), conjugate(v.inf, t, "tú"), `${v.inf} ${t}`);
      assert.ok(seen.size >= 4, `${v.inf} ${t} has suspiciously few distinct forms`);
    }
  }
});
