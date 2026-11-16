"use client";
// Explorables for the preterite: a three-time-frame "time machine" and a
// preterite ending builder that spotlights spelling-change and irregular verbs.
// Every verb form comes from the tested conjugator (lib/spanish/verbs).
import { useState, type ReactNode } from "react";
import { WidgetFrame, Slider, Segmented, Readout, type WidgetDef } from "./kit";
import { speakSpanish } from "@/lib/speech";
import { conjugate, englishGloss, verbInfo, PERSONS, PERSON_LABEL, type Person, type Tense } from "@/lib/spanish/verbs";

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

type Group = "ar" | "er" | "ir";

const IDX: Record<Person, number> = { yo: 0, tú: 1, él: 2, nosotros: 3, vosotros: 4, ellos: 5 };

const REG: Record<"present" | "preterite", Record<Group, readonly string[]>> = {
  present: {
    ar: ["o", "as", "a", "amos", "áis", "an"],
    er: ["o", "es", "e", "emos", "éis", "en"],
    ir: ["o", "es", "e", "imos", "ís", "en"],
  },
  preterite: {
    ar: ["é", "aste", "ó", "amos", "asteis", "aron"],
    er: ["í", "iste", "ió", "imos", "isteis", "ieron"],
    ir: ["í", "iste", "ió", "imos", "isteis", "ieron"],
  },
};

const SHORT_PERSON: Record<Person, string> = { yo: "yo", tú: "tú", él: "él/ella", nosotros: "nosotros", vosotros: "vosotros", ellos: "ellos" };

function group(inf: string): Group {
  return verbInfo(inf)?.group ?? "ar";
}

function isReflexive(inf: string): boolean {
  return verbInfo(inf)?.reflexive ?? false;
}

/** Regular stem: jugar → jug, levantarse → levant. */
function regStem(inf: string): string {
  const base = isReflexive(inf) ? inf.slice(0, -2) : inf;
  return base.slice(0, -2);
}

/** Split "me levanté" → ["me", "levanté"]. */
function splitPronoun(form: string, inf: string): [string, string] {
  if (!isReflexive(inf)) return ["", form];
  const i = form.indexOf(" ");
  return [form.slice(0, i), form.slice(i + 1)];
}

/** Length of the shared beginning of two strings. */
function commonPrefix(a: string, b: string): number {
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  return i;
}

function SpeakButton({ text, label }: { text: string; label: string }) {
  return (
    <button
      type="button"
      onClick={() => speakSpanish(text)}
      className="btn btn-secondary min-h-10 min-w-10 shrink-0 px-3"
      aria-label={label}
      title="Listen (Spanish voice)"
    >
      <span aria-hidden>🔊</span>
    </button>
  );
}

/** A stem shown with the letters that differ from the regular stem picked out. */
function Stem({ stem, regular }: { stem: string; regular: string }) {
  const k = commonPrefix(stem, regular);
  if (k === stem.length && stem.length === regular.length) return <span className="text-ink">{stem}</span>;
  return (
    <span className="text-ink">
      {stem.slice(0, k)}
      <span className="rounded bg-accent-soft px-0.5 font-extrabold text-bad">{stem.slice(k)}</span>
    </span>
  );
}

// ---------------------------------------------------------------------------
// Widget 1 — Time machine: ayer / hoy / mañana
// ---------------------------------------------------------------------------

interface Activity {
  inf: string;
  es: string;
  /** English complement added after the English verb. */
  en: string;
}

const ACTIVITIES: Activity[] = [
  { inf: "jugar", es: "al fútbol", en: "football" },
  { inf: "ir", es: "al cine", en: "to the cinema" },
  { inf: "hacer", es: "deporte", en: "sport" },
  { inf: "comer", es: "churros", en: "churros" },
  { inf: "ver", es: "una película", en: "a film" },
  { inf: "tocar", es: "la guitarra", en: "the guitar" },
  { inf: "empezar", es: "un libro nuevo", en: "a new book" },
  { inf: "nadar", es: "en el mar", en: "in the sea" },
  { inf: "escribir", es: "un correo", en: "an email" },
  { inf: "tener", es: "un examen", en: "an exam" },
  { inf: "estar", es: "en casa", en: "at home" },
  { inf: "levantarse", es: "temprano", en: "early" },
];

const WHEN: { tense: Tense; es: string; en: string; name: string }[] = [
  { tense: "preterite", es: "Ayer", en: "Yesterday", name: "preterite (past)" },
  { tense: "present", es: "Hoy", en: "Today", name: "present" },
  { tense: "near-future", es: "Mañana", en: "Tomorrow", name: "near future" },
];

/** Who does it: dropped pronouns for yo/tú/nosotros/vosotros, real subjects for él/ellos. */
const SUBJECT: Record<Person, { es: string; en: string }> = {
  yo: { es: "", en: "I" },
  tú: { es: "", en: "you" },
  él: { es: "Lucía", en: "Lucía" },
  nosotros: { es: "", en: "we" },
  vosotros: { es: "", en: "you all" },
  ellos: { es: "mis amigos", en: "my friends" },
};

const EN_PRONOUN: Record<Person, string> = { yo: "I", tú: "you", él: "he/she", nosotros: "we", vosotros: "you all", ellos: "they" };

interface VerbParts {
  pronoun: string;
  stem: string;
  ending: string;
  /** Whole form is irregular (no regular ending to split off). */
  irregular: boolean;
  /** Stem differs from the infinitive's stem (spelling change, boot, irregular stem). */
  stemChanged: boolean;
}

function partsOf(inf: string, tense: "present" | "preterite", p: Person): VerbParts {
  const [pronoun, word] = splitPronoun(conjugate(inf, tense, p), inf);
  const ending = REG[tense][group(inf)][IDX[p]];
  const regular = regStem(inf);
  if (word.endsWith(ending) && word.length > ending.length) {
    const stem = word.slice(0, -ending.length);
    return { pronoun, stem, ending, irregular: false, stemChanged: stem !== regular };
  }
  return { pronoun, stem: word, ending: "", irregular: true, stemChanged: true };
}

function TimeMachine() {
  const [actIdx, setActIdx] = useState(0);
  const [person, setPerson] = useState<Person>("yo");
  const [when, setWhen] = useState(0);

  const act = ACTIVITIES[actIdx];
  const w = WHEN[when];
  const subj = SUBJECT[person];
  const form = conjugate(act.inf, w.tense, person);
  const sentence = `${[w.es, subj.es, form, act.es].filter(Boolean).join(" ")}.`;
  const gloss = englishGloss(act.inf, w.tense, person);
  const english = `${w.en} ${subj.en}${gloss.slice(EN_PRONOUN[person].length)} ${act.en}.`;
  const samePresPret = conjugate(act.inf, "present", person) === conjugate(act.inf, "preterite", person);

  let verbView: ReactNode;
  let what: ReactNode;
  if (w.tense === "near-future") {
    const words = form.split(" "); // voy a jugar / voy a levantarme
    verbView = (
      <>
        <span className="rounded bg-brand-soft px-1 font-extrabold text-brand">{words[0]}</span> <span className="text-ink-2">a</span>{" "}
        <span className="rounded bg-good-soft px-1 font-extrabold text-good">{words.slice(2).join(" ")}</span>
      </>
    );
    what = (
      <>
        Near future = <strong>ir</strong> in the present (<em lang="es">{words[0]}</em>) + <em lang="es">a</em> + the{" "}
        <strong>infinitive</strong>. Only <em lang="es">{words[0]}</em> changes with the person
        {isReflexive(act.inf) ? <> — and the reflexive pronoun is glued to the infinitive (<em lang="es">{words.slice(2).join(" ")}</em>)</> : null}.
      </>
    );
  } else {
    const parts = partsOf(act.inf, w.tense, person);
    const regular = regStem(act.inf);
    verbView = (
      <>
        {parts.pronoun ? <span className="text-ink-2">{parts.pronoun} </span> : null}
        {parts.irregular ? (
          <span className="rounded bg-bad-soft px-1 font-extrabold text-bad">{parts.stem}</span>
        ) : (
          <>
            <Stem stem={parts.stem} regular={regular} />
            <span className="rounded bg-brand-soft px-0.5 font-extrabold text-brand">{parts.ending}</span>
          </>
        )}
      </>
    );
    if (parts.irregular) {
      what = (
        <>
          <em lang="es">{form}</em> is an <strong>irregular</strong> {w.tense === "preterite" ? "preterite" : "present"} form of{" "}
          <em lang="es">{act.inf}</em> — learn it by heart.
          {w.tense === "preterite" && (act.inf === "ir" || act.inf === "ser") ? <> (<em lang="es">ir</em> and <em lang="es">ser</em> share it!)</> : null}
        </>
      );
    } else if (parts.stemChanged && w.tense === "preterite") {
      const irregularStem = ["hacer", "tener", "estar"].includes(act.inf);
      what = irregularStem ? (
        <>
          Irregular stem <strong lang="es">{parts.stem}-</strong> — and no accent on the ending.
        </>
      ) : (
        <>
          Spelling change in the <em lang="es">yo</em> form: <em lang="es">{regular}</em> + <em lang="es">é</em> is written{" "}
          <strong lang="es">{parts.stem}é</strong> so the consonant keeps its sound.
        </>
      );
    } else if (parts.stemChanged) {
      what = (
        <>
          Present-tense stem change (<em lang="es">{regular}-</em> → <strong lang="es">{parts.stem}-</strong>) — the &ldquo;boot&rdquo;. Slide to
          <em lang="es"> ayer</em>: does it survive in the past?
        </>
      );
    } else {
      what = (
        <>
          Regular: stem <em lang="es">{regular}-</em> + {w.tense === "preterite" ? "preterite" : "present"} ending{" "}
          <strong lang="es">-{parts.ending}</strong>.
        </>
      );
    }
  }

  const stops = [70, 210, 350];
  const stopFill = ["fill-brand-soft", "fill-good-soft", "fill-accent-soft"];

  return (
    <WidgetFrame
      title="Time machine: ayer · hoy · mañana"
      tryThis={[
        "Choose *jugar* and *yo*, then slide from *mañana* to *ayer*. Where does the extra *u* in *jugué* come from?",
        "Pick *nadar* with *nosotros*. Slide between *ayer* and *hoy* — what do you notice? How would you know which one is meant?",
        "Predict the *ayer* form of *ir* for *Lucía* before you slide. Then try *estar* and *tener*.",
        "Choose *levantarse*: where does the pronoun go in each time frame?",
      ]}
      caption={
        <>
          <p>
            <strong>{w.name[0].toUpperCase() + w.name.slice(1)}.</strong> {what}
          </p>
          {samePresPret && w.tense !== "near-future" ? (
            <p className="mt-2">
              ⚠️ <em lang="es">{conjugate(act.inf, "present", person)}</em> is the same in the present and the preterite. Only the time phrase (
              <em lang="es">ayer</em> / <em lang="es">hoy</em>) tells you when.
            </p>
          ) : null}
          <p className="mt-2 text-ink-2">
            The verb carries the time frame; the time phrase must agree with it. <em lang="es">Ayer</em> + preterite ·{" "}
            <em lang="es">hoy</em> + present · <em lang="es">mañana</em> + <em lang="es">ir a</em> + infinitive.
          </p>
        </>
      }
    >
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block text-sm font-semibold text-ink-2">
            Activity
            <select
              className="mt-1 block min-h-10 w-full rounded-xl border border-line bg-surface px-3 text-base text-ink"
              value={actIdx}
              onChange={(e) => setActIdx(Number(e.target.value))}
            >
              {ACTIVITIES.map((a, i) => (
                <option key={a.inf + a.es} value={i} lang="es">
                  {a.inf} {a.es}
                </option>
              ))}
            </select>
          </label>
          <div>
            <div className="text-sm font-semibold text-ink-2">Who?</div>
            <Segmented
              label="Who does it"
              value={person}
              onChange={setPerson}
              options={PERSONS.map((p) => ({ value: p, label: <span lang="es">{SHORT_PERSON[p]}</span> }))}
            />
          </div>
        </div>

        <Slider
          label="When? Slide through time"
          value={when}
          min={0}
          max={2}
          onChange={setWhen}
          format={(v) => <span lang="es">{WHEN[v].es.toLowerCase()}</span>}
        />

        <svg
          viewBox="0 0 420 70"
          className="h-auto w-full"
          role="img"
          aria-label={`Timeline: ayer (past), hoy (present), mañana (future). Now at ${WHEN[when].es.toLowerCase()}, so the verb is in the ${w.name}.`}
        >
          <line x1="30" y1="28" x2="395" y2="28" className="stroke-ink-2" strokeWidth={2} />
          <polygon points="405,28 393,22 393,34" className="fill-ink-2" />
          {stops.map((x, i) => (
            <g key={x}>
              <circle cx={x} cy={28} r={i === when ? 13 : 8} className={`${stopFill[i]} ${i === when ? "stroke-brand" : "stroke-line"}`} strokeWidth={i === when ? 3 : 2} />
              <text x={x} y={60} textAnchor="middle" fontSize={14} fontWeight={i === when ? 800 : 500} className={i === when ? "fill-brand" : "fill-ink-2"}>
                {WHEN[i].es.toLowerCase()}
              </text>
            </g>
          ))}
        </svg>

        <div className="rounded-xl border border-line bg-surface p-3">
          <div className="flex items-start justify-between gap-3">
            <p lang="es" className="text-xl font-bold leading-snug text-ink sm:text-2xl">
              {w.es} {subj.es ? <span>{subj.es} </span> : null}
              {verbView} {act.es}.
            </p>
            <SpeakButton text={sentence} label={`Listen: ${sentence}`} />
          </div>
          <p className="mt-1 text-sm text-ink-2">{english}</p>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          <Readout label="Time frame" value={w.name} tone="ink" />
          <Readout label="Verb" value={<span lang="es">{form}</span>} />
          <Readout label="Person" value={<span lang="es">{PERSON_LABEL[person].split(" (")[0]}</span>} tone="ink" />
        </div>
      </div>
    </WidgetFrame>
  );
}

// ---------------------------------------------------------------------------
// Widget 2 — Preterite ending builder with spelling-change spotlight
// ---------------------------------------------------------------------------

type Kind = "regular" | "car" | "gar" | "zar" | "leer" | "strong" | "fu" | "dv";

interface BuilderVerb {
  inf: string;
  kind: Kind;
}

const BUILDER_GROUPS: { label: string; verbs: BuilderVerb[] }[] = [
  { label: "Regular", verbs: [{ inf: "hablar", kind: "regular" }, { inf: "visitar", kind: "regular" }, { inf: "comer", kind: "regular" }, { inf: "salir", kind: "regular" }, { inf: "escribir", kind: "regular" }, { inf: "volver", kind: "regular" }] },
  { label: "-gar → -gué", verbs: [{ inf: "jugar", kind: "gar" }, { inf: "llegar", kind: "gar" }, { inf: "pagar", kind: "gar" }] },
  { label: "-car → -qué", verbs: [{ inf: "tocar", kind: "car" }, { inf: "sacar", kind: "car" }, { inf: "practicar", kind: "car" }] },
  { label: "-zar → -cé", verbs: [{ inf: "empezar", kind: "zar" }, { inf: "cruzar", kind: "zar" }, { inf: "almorzar", kind: "zar" }] },
  { label: "i → y", verbs: [{ inf: "leer", kind: "leer" }] },
  { label: "Irregular", verbs: [{ inf: "ir", kind: "fu" }, { inf: "ser", kind: "fu" }, { inf: "hacer", kind: "strong" }, { inf: "tener", kind: "strong" }, { inf: "estar", kind: "strong" }, { inf: "dar", kind: "dv" }, { inf: "ver", kind: "dv" }] },
];

const ALL_BUILDER = BUILDER_GROUPS.flatMap((g) => g.verbs);

const KIND_ENDINGS: Record<Exclude<Kind, "regular" | "car" | "gar" | "zar">, readonly string[]> = {
  leer: ["í", "íste", "yó", "ímos", "ísteis", "yeron"],
  strong: ["e", "iste", "o", "imos", "isteis", "ieron"],
  fu: ["i", "iste", "e", "imos", "isteis", "eron"],
  dv: ["i", "iste", "io", "imos", "isteis", "ieron"],
};

function endingsFor(v: BuilderVerb): readonly string[] {
  if (v.kind === "regular" || v.kind === "car" || v.kind === "gar" || v.kind === "zar") return REG.preterite[group(v.inf)];
  return KIND_ENDINGS[v.kind];
}

/** Split a preterite form (from the conjugator) into stem + ending for display. */
function splitPreterite(v: BuilderVerb, p: Person): { form: string; stem: string; ending: string } {
  const form = conjugate(v.inf, "preterite", p);
  const ending = endingsFor(v)[IDX[p]];
  if (form.endsWith(ending)) return { form, stem: form.slice(0, -ending.length), ending };
  return { form, stem: form, ending: "" };
}

/** What the regular rule WOULD give — shown struck through as a wrong answer. */
function naiveForm(v: BuilderVerb, p: Person): string | null {
  const real = conjugate(v.inf, "preterite", p);
  let naive: string | null = null;
  if (v.kind === "fu") return null;
  if (v.kind === "leer") naive = p === "él" ? "leió" : p === "ellos" ? "leieron" : null;
  else naive = regStem(v.inf) + REG.preterite[group(v.inf)][IDX[p]];
  return naive && naive !== real ? naive : null;
}

function whyText(v: BuilderVerb, p: Person, stem: string): ReactNode {
  const reg = regStem(v.inf);
  const real = conjugate(v.inf, "preterite", p);
  const yo = p === "yo";
  switch (v.kind) {
    case "gar":
      return yo ? (
        <>
          In Spanish, <em lang="es">g</em> before <em lang="es">e</em> sounds like the throaty <em lang="es">j</em> in <em lang="es">gente</em>. A silent{" "}
          <strong lang="es">u</strong> keeps the hard &lsquo;g&rsquo; of <em lang="es">{v.inf}</em>: <strong lang="es">{real}</strong>.
        </>
      ) : (
        <>
          The ending doesn&rsquo;t start with <em lang="es">e</em>, so <em lang="es">{reg}-</em> keeps its hard &lsquo;g&rsquo; with no help. Only{" "}
          <em lang="es">yo</em> (<em lang="es">-é</em>) needs the extra <em lang="es">u</em>.
        </>
      );
    case "car":
      return yo ? (
        <>
          <em lang="es">c</em> before <em lang="es">e</em> sounds like the &lsquo;th&rsquo; in <em lang="es">cena</em>. To keep the hard &lsquo;k&rsquo; sound, Spanish writes{" "}
          <strong lang="es">qu</strong>: <strong lang="es">{real}</strong>.
        </>
      ) : (
        <>
          No <em lang="es">e</em> straight after the <em lang="es">c</em>, so it stays a hard &lsquo;k&rsquo;. Only <em lang="es">yo</em> needs{" "}
          <em lang="es">qu</em>.
        </>
      );
    case "zar":
      return yo ? (
        <>
          Spanish hardly ever writes <em lang="es">z</em> before <em lang="es">e</em> — it uses <strong lang="es">c</strong> instead (<em lang="es">cero</em>,{" "}
          <em lang="es">cena</em>). Same sound, new letter: <strong lang="es">{real}</strong>.
        </>
      ) : (
        <>
          No <em lang="es">e</em> after the <em lang="es">z</em>, so it stays a <em lang="es">z</em>. Only <em lang="es">yo</em> (<em lang="es">-é</em>) swaps it
          for <em lang="es">c</em>.
        </>
      );
    case "leer":
      return p === "él" || p === "ellos" ? (
        <>
          <em lang="es">le</em> + <em lang="es">{p === "él" ? "ió" : "ieron"}</em> would trap an unstressed <em lang="es">i</em> between two vowels. Spanish
          turns it into <strong lang="es">y</strong>: <strong lang="es">{real}</strong>.
        </>
      ) : (
        <>
          The accent on <em lang="es">í</em> keeps <em lang="es">e</em> and <em lang="es">í</em> as separate syllables: <em lang="es">{real}</em>.
        </>
      );
    case "strong":
      return (
        <>
          Irregular stem <strong lang="es">{stem}-</strong>
          {v.inf === "hacer" && p === "él" ? (
            <>
              {" "}
              (the <em lang="es">c</em> of <em lang="es">hic-</em> becomes <em lang="es">z</em> before <em lang="es">o</em> to keep its sound)
            </>
          ) : null}{" "}
          with the special endings <em lang="es">-e, -iste, -o, -imos, -isteis, -ieron</em>. <strong>No accents.</strong>
        </>
      );
    case "fu":
      return (
        <>
          <em lang="es">ir</em> and <em lang="es">ser</em> have the <strong>same</strong> preterite: <em lang="es">fui, fuiste, fue…</em> Context tells you which:{" "}
          <em lang="es">Fue al cine</em> (went) · <em lang="es">Fue genial</em> (was).
        </>
      );
    case "dv":
      return (
        <>
          Normal <em lang="es">-er/-ir</em>-type endings, but <em lang="es">{v.inf === "dar" ? "di, dio" : "vi, vio"}</em> are one syllable, so they need{" "}
          <strong>no accent</strong>.{v.inf === "dar" ? <> (<em lang="es">dar</em> is an <em lang="es">-ar</em> verb that borrows the <em lang="es">-er</em> endings!)</> : null}
        </>
      );
    default:
      return group(v.inf) === "ar" ? (
        <>
          Regular: stem <em lang="es">{reg}-</em> + ending. Mind the accents: <em lang="es">{conjugate(v.inf, "preterite", "él")}</em> (he/she, past) vs{" "}
          <em lang="es">{conjugate(v.inf, "present", "yo")}</em> (I, present).
        </>
      ) : (
        <>
          Regular: stem <em lang="es">{reg}-</em> + the shared <em lang="es">-er/-ir</em> endings <em lang="es">-í, -iste, -ió, -imos, -isteis, -ieron</em>.
          {verbInfo(v.inf)?.tags.some((t) => t.startsWith("stem-")) ? <> No boot in the preterite.</> : null}
        </>
      );
  }
}

function EndingBuilder() {
  const [inf, setInf] = useState("jugar");
  const [person, setPerson] = useState<Person>("yo");
  const v = ALL_BUILDER.find((x) => x.inf === inf) ?? ALL_BUILDER[0];
  const { form, stem, ending } = splitPreterite(v, person);
  const reg = regStem(v.inf);
  const naive = naiveForm(v, person);
  const presentYo = conjugate(v.inf, "present", "yo");
  const boot = verbInfo(v.inf)?.tags.some((t) => t.startsWith("stem-")) && !["tener", "estar"].includes(v.inf);
  const regEnding = REG.preterite[group(v.inf)][IDX[person]];
  const pastEn = englishGloss(v.inf, "preterite", person);

  return (
    <WidgetFrame
      title="Preterite ending builder"
      tryThis={[
        "Predict the *yo* form of *llegar* before you pick it. Does it need a *u*? Why only *yo*?",
        "Compare *hice* and *hizo*: why does the *c* turn into a *z*?",
        "Switch between *ir* and *ser*. What do you notice — and how would you tell them apart in a sentence?",
        "Find a verb whose *él* form has no accent even though *habló* does.",
      ]}
      caption={
        <>
          <p>{whyText(v, person, stem)}</p>
          {boot ? (
            <p className="mt-2">
              Present <em lang="es">yo</em>: <em lang="es">{presentYo}</em> (boot) → preterite <em lang="es">{conjugate(v.inf, "preterite", "yo")}</em>:{" "}
              <strong>no boot</strong> in the preterite for <em lang="es">-ar</em> and <em lang="es">-er</em> verbs.
            </p>
          ) : null}
        </>
      }
    >
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block text-sm font-semibold text-ink-2">
            Verb
            <select
              className="mt-1 block min-h-10 w-full rounded-xl border border-line bg-surface px-3 text-base text-ink"
              value={inf}
              onChange={(e) => setInf(e.target.value)}
            >
              {BUILDER_GROUPS.map((g) => (
                <optgroup key={g.label} label={g.label}>
                  {g.verbs.map((x) => (
                    <option key={x.inf} value={x.inf} lang="es">
                      {x.inf} — {verbInfo(x.inf)?.en}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </label>
          <div>
            <div className="text-sm font-semibold text-ink-2">Person</div>
            <Segmented
              label="Person"
              value={person}
              onChange={setPerson}
              options={PERSONS.map((p) => ({ value: p, label: <span lang="es">{SHORT_PERSON[p]}</span> }))}
            />
          </div>
        </div>

        {/* Build-up: infinitive → stem + ending → form */}
        <div className="rounded-xl border border-line bg-surface p-3" aria-live="polite">
          <div className="flex flex-wrap items-center gap-2 text-lg" lang="es">
            <span className="rounded-lg bg-surface-2 px-2 py-1 font-bold text-ink-2">{v.inf}</span>
            <span aria-hidden className="text-ink-2">→</span>
            <span className="rounded-lg border border-line px-2 py-1 font-bold">
              {ending ? <Stem stem={stem} regular={reg} /> : <span className="text-bad">{stem}</span>}
              <span className="text-ink-2">-</span>
            </span>
            <span aria-hidden className="text-ink-2">+</span>
            <span className="rounded-lg bg-brand-soft px-2 py-1 font-extrabold text-brand">-{ending || "?"}</span>
            <span aria-hidden className="text-ink-2">=</span>
            <span className="rounded-lg bg-good-soft px-2 py-1 text-xl font-extrabold text-good">{form}</span>
            <SpeakButton text={form} label={`Listen: ${form}`} />
          </div>
          <p className="mt-2 text-sm text-ink-2">
            {pastEn}
            {naive ? (
              <>
                {" "}
                · the plain rule would give{" "}
                <s lang="es" className="font-bold text-bad">
                  {naive}
                </s>{" "}
                ✗
              </>
            ) : null}
            {!naive && v.kind !== "fu" && ending === regEnding ? <> · follows the regular pattern ✓</> : null}
          </p>
        </div>

        {/* Whole table: tap a row to choose the person */}
        <table className="w-full border-separate border-spacing-y-1 text-left">
          <caption className="sr-only">Preterite of {v.inf}: stems in grey, endings highlighted</caption>
          <tbody>
            {PERSONS.map((p) => {
              const s = splitPreterite(v, p);
              const on = p === person;
              return (
                <tr key={p}>
                  <th scope="row" className="w-2/5 pr-2 text-sm font-semibold text-ink-2" lang="es">
                    {PERSON_LABEL[p].split(" (")[0]}
                  </th>
                  <td>
                    <button
                      type="button"
                      onClick={() => setPerson(p)}
                      aria-pressed={on}
                      className={`min-h-10 w-full rounded-lg border px-3 text-left text-lg ${on ? "border-brand bg-brand-soft" : "border-line bg-surface hover:bg-surface-2"}`}
                    >
                      <span lang="es">
                        {s.ending ? <Stem stem={s.stem} regular={reg} /> : <span className="text-bad">{s.stem}</span>}
                        <span className="font-extrabold text-brand">{s.ending}</span>
                      </span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p className="text-xs text-ink-2">
          <span className="rounded bg-accent-soft px-1 font-bold text-bad">orange letters</span> = changed from the infinitive stem{" "}
          <em lang="es">{reg || "—"}-</em> · <span className="font-bold text-brand">indigo</span> = ending
        </p>
      </div>
    </WidgetFrame>
  );
}

export const widgets: WidgetDef[] = [
  {
    id: "preterito-time-machine",
    title: "Time machine: ayer · hoy · mañana",
    blurb: "Slide one sentence through past, present and near future and watch the verb change.",
    Component: TimeMachine,
  },
  {
    id: "preterito-ending-builder",
    title: "Preterite ending builder",
    blurb: "Build any preterite form from stem + ending — and see why jugué, toqué, empecé and hice look the way they do.",
    Component: EndingBuilder,
  },
];
