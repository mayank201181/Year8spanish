"use client";
// Explorables for the present tense: a verb machine (stem + ending, boot
// shading) and a ser vs estar sorter. Every verb form comes from the tested
// conjugator in lib/spanish/verbs.
import { useMemo, useState, type ReactNode } from "react";
import { WidgetFrame, Segmented, Readout, type WidgetDef } from "./kit";
import { speakSpanish } from "@/lib/speech";
import { conjugate, englishGloss, presentTable, PERSONS, PERSON_LABEL, VERBS, type Person, type VerbInfo } from "@/lib/spanish/verbs";

// ---------------------------------------------------------------------------
// Shared bits
// ---------------------------------------------------------------------------

const PRONOUN_WORD: Record<Person, string> = { yo: "yo", tú: "tú", él: "él", nosotros: "nosotros", vosotros: "vosotros", ellos: "ellos" };
const PERSON_SHORT: Record<Person, string> = { yo: "yo", tú: "tú", él: "él / ella", nosotros: "nosotros", vosotros: "vosotros", ellos: "ellos / ellas" };

function Es({ children }: { children: ReactNode }) {
  return (
    <em lang="es" className="font-semibold not-italic text-ink">
      {children}
    </em>
  );
}

function SpeakButton({ text, label }: { text: string; label: string }) {
  return (
    <button
      type="button"
      className="btn btn-secondary btn-sm"
      onClick={() => speakSpanish(text, { slow: true })}
      aria-label={label}
      title={label}
    >
      <span aria-hidden>🔊</span>
    </button>
  );
}

function stripAccents(s: string): string {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").normalize("NFC");
}

// ---------------------------------------------------------------------------
// 1. Verb machine
// ---------------------------------------------------------------------------

type StemType = "e-ie" | "o-ue" | "u-ue" | "e-i";
const STEM_LABEL: Record<StemType, string> = { "e-ie": "e → ie", "o-ue": "o → ue", "u-ue": "u → ue", "e-i": "e → i" };
const BOOT_CHANGE: Record<StemType, [string, string]> = { "e-ie": ["e", "ie"], "o-ue": ["o", "ue"], "u-ue": ["u", "ue"], "e-i": ["e", "i"] };
const IDX: Record<Person, number> = { yo: 0, tú: 1, él: 2, nosotros: 3, vosotros: 4, ellos: 5 };
const ENDINGS: Record<"ar" | "er" | "ir", readonly string[]> = {
  ar: ["o", "as", "a", "amos", "áis", "an"],
  er: ["o", "es", "e", "emos", "éis", "en"],
  ir: ["o", "es", "e", "imos", "ís", "en"],
};
const IRREGULAR_TAGS = ["irregular", "yo-go", "spelling-ger", "spelling-gu", "accent-i"];

function stemTypeOf(v: VerbInfo): StemType | undefined {
  const t = v.tags.find((x) => x.startsWith("stem-"));
  return t ? (t.slice(5) as StemType) : undefined;
}
const isBoot = (v: VerbInfo) => !!stemTypeOf(v);
const isIrregular = (v: VerbInfo) => v.tags.some((t) => IRREGULAR_TAGS.includes(t));
const inBoot = (p: Person) => p !== "nosotros" && p !== "vosotros";

type Filter = "all" | "regular" | "boot" | "irregular" | "reflexive";
const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "regular", label: "Regular" },
  { value: "boot", label: "Boot" },
  { value: "irregular", label: "Irregular" },
  { value: "reflexive", label: "Reflexive" },
];
function matches(v: VerbInfo, f: Filter): boolean {
  if (f === "all") return true;
  if (f === "reflexive") return v.reflexive;
  if (f === "boot") return isBoot(v);
  if (f === "irregular") return isIrregular(v);
  return !isBoot(v) && !isIrregular(v) && !v.reflexive;
}

type SegRole = "pron" | "stem" | "changed" | "ending" | "irregular";
interface Seg {
  text: string;
  role: SegRole;
}
interface Analysis {
  form: string;
  segs: Seg[];
  kind: "regular" | "boot" | "irregular";
  stem: string;
  vstem: string;
  ending: string;
  /** The regular ending this person would have. */
  regEnding: string;
  pron: string;
  accentEnding: boolean;
}

function replaceLast(s: string, from: string, to: string): string {
  const i = s.lastIndexOf(from);
  return i < 0 ? s : s.slice(0, i) + to + s.slice(i + from.length);
}

/** Split a conjugated form into pronoun / stem / changed letters / ending for colour-coding. */
function analyse(v: VerbInfo, p: Person): Analysis {
  const form = conjugate(v.inf, "present", p);
  const parts = form.split(" ");
  const verb = parts[parts.length - 1];
  const pron = v.reflexive ? parts[0] : "";
  const base = v.reflexive ? v.inf.slice(0, -2) : v.inf;
  const stem = base.slice(0, -2);
  const ending = ENDINGS[v.group][IDX[p]];
  const segs: Seg[] = pron ? [{ text: pron + " ", role: "pron" }] : [];
  const plainVerb = stripAccents(verb);
  const plainEnding = stripAccents(ending);
  if (!plainVerb.endsWith(plainEnding)) {
    segs.push({ text: verb, role: "irregular" });
    return { form, segs, kind: "irregular", stem, vstem: "", ending, regEnding: ending, pron, accentEnding: false };
  }
  const vstem = verb.slice(0, verb.length - ending.length);
  const shownEnding = verb.slice(verb.length - ending.length);
  const accentEnding = shownEnding !== ending;
  const st = stemTypeOf(v);
  if (accentEnding && vstem !== stem) {
    segs.push({ text: verb, role: "irregular" });
    return { form, segs, kind: "irregular", stem, vstem: "", ending, regEnding: ending, pron, accentEnding: false };
  }
  if (vstem === stem) {
    segs.push({ text: vstem, role: "stem" }, { text: shownEnding, role: accentEnding ? "irregular" : "ending" });
    return { form, segs, kind: accentEnding ? "irregular" : "regular", stem, vstem, ending: shownEnding, regEnding: ending, pron, accentEnding };
  }
  if (st && inBoot(p) && vstem === replaceLast(stem, ...BOOT_CHANGE[st])) {
    // Highlight the new vowel(s) where the stem vowel used to be: qu[ie]r-, j[ue]g-, p[i]d-.
    const [from, to] = BOOT_CHANGE[st];
    const at = stem.lastIndexOf(from);
    const pre = vstem.slice(0, at);
    const mid = vstem.slice(at, at + to.length);
    const post = vstem.slice(at + to.length);
    if (pre) segs.push({ text: pre, role: "stem" });
    segs.push({ text: mid, role: "changed" });
    if (post) segs.push({ text: post, role: "stem" });
    segs.push({ text: shownEnding, role: "ending" });
    return { form, segs, kind: "boot", stem, vstem, ending: shownEnding, regEnding: ending, pron, accentEnding };
  }
  segs.push({ text: vstem, role: "irregular" }, { text: shownEnding, role: "ending" });
  return { form, segs, kind: "irregular", stem, vstem, ending: shownEnding, regEnding: ending, pron, accentEnding };
}

const ROLE_CLASS: Record<SegRole, string> = {
  pron: "text-info",
  stem: "text-ink",
  changed: "text-bad underline decoration-2 underline-offset-4",
  ending: "text-brand",
  irregular: "text-bad",
};
const ROLE_FILL: Record<SegRole, string> = {
  pron: "fill-info",
  stem: "fill-ink",
  changed: "fill-bad",
  ending: "fill-brand",
  irregular: "fill-bad",
};

function Segs({ segs }: { segs: Seg[] }) {
  return (
    <>
      {segs.map((s, i) => (
        <span key={i} className={ROLE_CLASS[s.role]}>
          {s.text}
        </span>
      ))}
    </>
  );
}

// Grid layout: yo / tú / él down the left, nosotros / vosotros / ellos down the right.
const CELL: Record<Person, { x: number; y: number }> = {
  yo: { x: 18, y: 34 },
  tú: { x: 18, y: 92 },
  él: { x: 18, y: 150 },
  nosotros: { x: 190, y: 34 },
  vosotros: { x: 190, y: 92 },
  ellos: { x: 190, y: 150 },
};
const CW = 152;
const CH = 50;

function BootTable({ verb, person }: { verb: VerbInfo; person: Person }) {
  const boot = isBoot(verb);
  const table = presentTable(verb.inf);
  const label = `Present tense of ${verb.inf}: ${PERSONS.map((p) => `${PRONOUN_WORD[p]} ${table[p]}`).join(", ")}. ${
    boot ? "A boot shape surrounds yo, tú, él and ellos, where the stem changes; nosotros and vosotros sit outside it." : "This verb has no stem change, so there is no boot."
  } Highlighted: ${PRONOUN_WORD[person]} ${table[person]}.`;
  return (
    <svg viewBox="0 0 360 214" className="h-auto w-full" role="img" aria-label={label}>
      <text x={180} y={20} fontSize={13} fontWeight={700} textAnchor="middle" className="fill-ink-2">
        {boot ? `${verb.inf}: the boot (${STEM_LABEL[stemTypeOf(verb)!]})` : `${verb.inf}: no boot — the stem never changes`}
      </text>
      {boot ? (
        <path
          d="M 10 28 L 176 28 L 176 144 L 350 144 L 350 206 L 10 206 Z"
          className="fill-accent-soft stroke-accent"
          strokeWidth={3}
          strokeLinejoin="round"
        />
      ) : null}
      {PERSONS.map((p) => {
        const { x, y } = CELL[p];
        const a = analyse(verb, p);
        const sel = p === person;
        return (
          <g key={p}>
            <rect
              x={x}
              y={y}
              width={CW}
              height={CH}
              rx={8}
              className={sel ? "fill-brand-soft stroke-brand" : "fill-surface stroke-line"}
              strokeWidth={sel ? 3 : 1.5}
            />
            <text x={x + 8} y={y + 15} fontSize={10} className="fill-ink-2">
              {PERSON_SHORT[p]}
            </text>
            <text x={x + CW / 2} y={y + 38} fontSize={15} fontWeight={700} textAnchor="middle" lang="es">
              {a.segs.map((s, i) => (
                <tspan key={i} className={ROLE_FILL[s.role]}>
                  {s.text}
                </tspan>
              ))}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

const SORTED_VERBS = [...VERBS].sort((a, b) => a.inf.localeCompare(b.inf, "es"));

function VerbMachine() {
  const [filter, setFilter] = useState<Filter>("all");
  const [inf, setInf] = useState("jugar");
  const [person, setPerson] = useState<Person>("yo");

  const pool = useMemo(() => SORTED_VERBS.filter((v) => matches(v, filter)), [filter]);
  const verb = useMemo(() => VERBS.find((v) => v.inf === inf) ?? VERBS[0], [inf]);
  const a = useMemo(() => analyse(verb, person), [verb, person]);
  const table = useMemo(() => presentTable(verb.inf), [verb]);
  const gloss = englishGloss(verb.inf, "present", person);
  const st = stemTypeOf(verb);
  const spoken = `${PRONOUN_WORD[person]} ${a.form}`;

  const changeFilter = (f: Filter) => {
    setFilter(f);
    const next = SORTED_VERBS.filter((v) => matches(v, f));
    if (!next.some((v) => v.inf === inf) && next.length) setInf(next[0].inf);
  };
  const randomVerb = () => {
    const choices = pool.filter((v) => v.inf !== inf);
    if (choices.length) setInf(choices[Math.floor(Math.random() * choices.length)].inf);
  };

  const P = <Es>{PERSON_SHORT[person]}</Es>;
  let caption: ReactNode;
  if (a.kind === "regular") {
    caption = (
      <>
        <Es>{verb.inf}</Es> is regular here: stem <Es>{a.stem}-</Es> + the <Es>-{verb.group}</Es> ending for {P}, <Es>-{a.ending}</Es>. The ending already
        tells you who it is, so the pronoun is usually dropped.
      </>
    );
  } else if (a.kind === "boot") {
    caption = (
      <>
        <Es>{verb.inf}</Es> is a {STEM_LABEL[st!]} boot verb. {P} is <strong>inside</strong> the boot, so the stem <Es>{a.stem}-</Es> becomes{" "}
        <Es>{a.vstem}-</Es>. The ending <Es>-{a.ending}</Es> is the normal one. Outside the boot: <Es>{table.nosotros}</Es>, <Es>{table.vosotros}</Es>.
      </>
    );
  } else if (st && !inBoot(person) && a.vstem === a.stem) {
    caption = (
      <>
        <Es>{verb.inf}</Es> is a {STEM_LABEL[st]} boot verb, but {P} is <strong>outside</strong> the boot, so the stem stays <Es>{a.stem}-</Es> — exactly
        like the infinitive.
      </>
    );
  } else if (a.accentEnding) {
    caption = (
      <>
        <Es>{verb.inf}</Es> is irregular: the stem is regular here, but the ending is spelt <Es>-{a.ending}</Es> instead of the regular{" "}
        <Es>-{a.regEnding}</Es>. Learn the whole verb:{" "}
        <Es>{PERSONS.map((p) => table[p]).join(", ")}</Es>.
      </>
    );
  } else if (verb.tags.includes("yo-go") && person === "yo") {
    caption = (
      <>
        <Es>{a.form}</Es>: <Es>{verb.inf}</Es> is a &lsquo;-go&rsquo; verb — only the <Es>yo</Es> form is special. Try another person and it goes back to
        normal (<Es>{table.tú}</Es>).
      </>
    );
  } else {
    caption = (
      <>
        <Es>{a.form}</Es> doesn&rsquo;t follow stem + ending — it&rsquo;s irregular, so learn it by heart: <Es>{PERSONS.map((p) => table[p]).join(", ")}</Es>.
      </>
    );
  }
  if (verb.reflexive) {
    caption = (
      <>
        {caption} Reflexive: the pronoun <Es>{a.pron}</Es> matches {P} and goes in front of the verb.
      </>
    );
  }

  return (
    <WidgetFrame
      title="Verb machine"
      tryThis={[
        "Pick *jugar*. Before you tap *nosotros*, predict: does the stem change?",
        "Filter **Irregular** and find three verbs whose *yo* form ends in *-go*.",
        "Compare *comer* and *vivir*: in which two persons are the endings different?",
        "Choose *despertarse* and *ellos*. Which colour is the pronoun, which the stem change?",
      ]}
      caption={caption}
    >
      <div className="space-y-3">
        <Segmented label="Verb type" options={FILTERS} value={filter} onChange={changeFilter} />
        <div className="flex flex-wrap items-end gap-2">
          <label className="min-w-0 flex-1 text-sm font-semibold text-ink-2">
            Verb
            <select className="input mt-1" value={inf} onChange={(e) => setInf(e.target.value)} lang="es">
              {pool.map((v) => (
                <option key={v.inf} value={v.inf}>
                  {v.inf} — {v.en}
                </option>
              ))}
            </select>
          </label>
          <button type="button" className="btn btn-secondary btn-sm" onClick={randomVerb}>
            🎲 Random
          </button>
        </div>
        <Segmented
          label="Person"
          options={PERSONS.map((p) => ({ value: p, label: PERSON_SHORT[p] }))}
          value={person}
          onChange={setPerson}
        />

        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-line bg-surface p-3">
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold uppercase tracking-wide text-ink-2">{PERSON_LABEL[person]}</div>
            <div className="text-3xl font-extrabold" lang="es">
              <Segs segs={a.segs} />
            </div>
            <div className="text-sm text-ink-2">= {gloss}</div>
          </div>
          <SpeakButton text={spoken} label={`Hear ${spoken}`} />
        </div>

        <div className="flex flex-wrap gap-2 text-xs font-bold" aria-label="Colour key">
          <span className="chip"><span className="text-ink">stem</span></span>
          <span className="chip"><span className="text-bad underline">changed / irregular</span></span>
          <span className="chip"><span className="text-brand">ending</span></span>
          {verb.reflexive ? <span className="chip"><span className="text-info">pronoun</span></span> : null}
        </div>

        <BootTable verb={verb} person={person} />

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          <Readout label="Type" value={[isIrregular(verb) ? "Irregular" : "", st ? `Boot ${STEM_LABEL[st]}` : ""].filter(Boolean).join(" + ") || "Regular"} tone="ink" />
          <Readout label="Group" value={`-${verb.group}${verb.reflexive ? "se" : ""}`} tone="ink" />
          <Readout label="Inside the boot?" value={st ? (inBoot(person) ? "Yes" : "No") : "—"} tone={st && inBoot(person) ? "brand" : "ink"} />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => speakSpanish(PERSONS.map((p) => `${PRONOUN_WORD[p]} ${table[p]}`).join(", "), { slow: true })}
          >
            🔊 Hear all six
          </button>
        </div>
      </div>
    </WidgetFrame>
  );
}

// ---------------------------------------------------------------------------
// 2. Ser vs estar sorter
// ---------------------------------------------------------------------------

type Kind = "person" | "home" | "room" | "place";
interface Subject {
  id: string;
  label: string;
  es: string;
  en: string;
  p: Person;
  g: "m" | "f";
  pl: boolean;
  kind: Kind;
}
const SUBJECTS: Subject[] = [
  { id: "yo-m", label: "yo (Javier)", es: "Yo", en: "I", p: "yo", g: "m", pl: false, kind: "person" },
  { id: "yo-f", label: "yo (Carmen)", es: "Yo", en: "I", p: "yo", g: "f", pl: false, kind: "person" },
  { id: "tu", label: "tú (Priya)", es: "Tú", en: "You", p: "tú", g: "f", pl: false, kind: "person" },
  { id: "hermano", label: "mi hermano", es: "Mi hermano", en: "My brother", p: "él", g: "m", pl: false, kind: "person" },
  { id: "pablo", label: "Pablo y yo", es: "Pablo y yo", en: "Pablo and I", p: "nosotros", g: "m", pl: true, kind: "person" },
  { id: "vosotras", label: "vosotras", es: "Vosotras", en: "You (all)", p: "vosotros", g: "f", pl: true, kind: "person" },
  { id: "primas", label: "mis primas", es: "Mis primas", en: "My cousins", p: "ellos", g: "f", pl: true, kind: "person" },
  { id: "casa", label: "mi casa", es: "Mi casa", en: "My house", p: "él", g: "f", pl: false, kind: "home" },
  { id: "dormitorio", label: "mi dormitorio", es: "Mi dormitorio", en: "My bedroom", p: "él", g: "m", pl: false, kind: "room" },
  { id: "tiendas", label: "las tiendas", es: "Las tiendas", en: "The shops", p: "ellos", g: "f", pl: true, kind: "place" },
];

type Verb = "ser" | "estar";
interface Ending {
  id: string;
  /** m sg, f sg, m pl, f pl */
  forms: [string, string, string, string];
  en: string;
  verb: Verb | "both" | "time";
  kinds: Kind[];
  why: string;
  /** For "both": English meaning with ser / with estar. */
  enSer?: string;
  enEstar?: string;
}
const inv = (s: string): [string, string, string, string] => [s, s, s, s];
const adjO = (stem: string): [string, string, string, string] => [`${stem}o`, `${stem}a`, `${stem}os`, `${stem}as`];
const ALL: Kind[] = ["person", "home", "room", "place"];

const ENDINGS_SE: Ending[] = [
  { id: "centro", forms: inv("en el centro"), en: "in the centre", verb: "estar", kinds: ["person", "home", "place"], why: "Location — where something is → estar. Even a house that never moves está en el centro." },
  { id: "playa", forms: inv("cerca de la playa"), en: "near the beach", verb: "estar", kinds: ["person", "home", "place"], why: "Location (cerca de = near) → estar." },
  { id: "salon", forms: inv("al lado del salón"), en: "next to the living room", verb: "estar", kinds: ["room"], why: "Location (al lado de = next to) → estar." },
  { id: "casa", forms: inv("en casa"), en: "at home", verb: "estar", kinds: ["person"], why: "Location — where someone is right now → estar." },
  { id: "cansado", forms: adjO("cansad"), en: "tired", verb: "estar", kinds: ["person"], why: "How someone feels right now (a temporary state) → estar. The adjective agrees with the subject." },
  { id: "contento", forms: adjO("content"), en: "happy", verb: "estar", kinds: ["person"], why: "A mood right now → estar." },
  { id: "sucio", forms: adjO("suci"), en: "dirty", verb: "estar", kinds: ["home", "room", "place"], why: "The state something is in right now (it can be cleaned!) → estar." },
  { id: "grande", forms: ["muy grande", "muy grande", "muy grandes", "muy grandes"], en: "very big", verb: "ser", kinds: ["home", "room", "place"], why: "A description — what something is like → ser. grande only changes for plural: grandes." },
  { id: "moderno", forms: adjO("modern"), en: "modern", verb: "ser", kinds: ["home", "room", "place"], why: "A characteristic — what something is like → ser." },
  { id: "simpatico", forms: adjO("simpátic"), en: "nice", verb: "ser", kinds: ["person"], why: "Personality — what someone is like → ser." },
  { id: "sevilla", forms: inv("de Sevilla"), en: "from Seville", verb: "ser", kinds: ["person"], why: "Origin — where someone is from → ser (ser de)." },
  { id: "aburrido", forms: adjO("aburrid"), en: "", verb: "both", kinds: ["person"], why: "Same adjective, different meaning! ser aburrido = boring (what someone is like); estar aburrido = bored (how they feel right now).", enSer: "boring", enEstar: "bored" },
  { id: "una", forms: inv("la una"), en: "It's one o'clock.", verb: "time", kinds: ALL, why: "Telling the time → always ser. There's no subject: es la una (one hour), son las ocho (plural)." },
  { id: "ocho", forms: inv("las ocho"), en: "It's eight o'clock.", verb: "time", kinds: ALL, why: "Telling the time → always ser, plural with las: son las ocho." },
];

const BE_EN: Record<Person, string> = { yo: "am", tú: "are", él: "is", nosotros: "are", vosotros: "are", ellos: "are" };
const compOf = (e: Ending, s: Subject) => e.forms[(s.pl ? 2 : 0) + (s.g === "f" ? 1 : 0)];
const fits = (e: Ending, s: Subject) => e.kinds.includes(s.kind);

interface Built {
  verb: Verb;
  es: string;
  verbForm: string;
  before: string;
  after: string;
  en: string;
}
function build(e: Ending, s: Subject, verb: Verb): Built {
  if (e.verb === "time") {
    const form = conjugate("ser", "present", e.id === "una" ? "él" : "ellos");
    return { verb: "ser", es: `${form[0].toUpperCase()}${form.slice(1)} ${e.forms[0]}.`, verbForm: form[0].toUpperCase() + form.slice(1), before: "", after: ` ${e.forms[0]}.`, en: e.en };
  }
  const form = conjugate(verb, "present", s.p);
  const comp = compOf(e, s);
  const enComp = e.verb === "both" ? (verb === "ser" ? e.enSer! : e.enEstar!) : e.en;
  return {
    verb,
    es: `${s.es} ${form} ${comp}.`,
    verbForm: form,
    before: `${s.es} `,
    after: ` ${comp}.`,
    en: `${s.en} ${BE_EN[s.p]} ${enComp}.`,
  };
}
const correctVerbs = (e: Ending): Verb[] => (e.verb === "both" ? ["ser", "estar"] : e.verb === "time" ? ["ser"] : [e.verb]);

function SentenceLine({ b }: { b: Built }) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-line bg-surface p-3">
      <div className="min-w-0 flex-1">
        <div className="text-2xl font-extrabold text-ink" lang="es">
          {b.before}
          <span className={b.verb === "ser" ? "text-brand" : "text-info"}>{b.verbForm}</span>
          {b.after}
        </div>
        <div className="text-sm text-ink-2">= {b.en}</div>
      </div>
      <span className={`chip ${b.verb === "ser" ? "text-brand" : "text-info"}`}>{b.verb.toUpperCase()}</span>
      <SpeakButton text={b.es} label={`Hear: ${b.es}`} />
    </div>
  );
}

function SerEstarSorter() {
  const [subjectId, setSubjectId] = useState("casa");
  const [endingId, setEndingId] = useState<string | null>(null);
  const [mode, setMode] = useState<"show" | "predict">("show");
  const [guess, setGuess] = useState<Verb | null>(null);
  const [score, setScore] = useState({ right: 0, total: 0 });
  const [sorted, setSorted] = useState<string[]>([]);

  const subject = SUBJECTS.find((s) => s.id === subjectId) ?? SUBJECTS[0];
  const ending = ENDINGS_SE.find((e) => e.id === endingId) ?? null;
  const revealed = ending !== null && (mode === "show" || guess !== null);

  const addSorted = (id: string) => setSorted((prev) => (prev.includes(id) ? prev : [...prev, id]));

  const pickEnding = (e: Ending) => {
    setEndingId(e.id);
    setGuess(null);
    if (mode === "show") addSorted(e.id);
  };
  const makeGuess = (v: Verb) => {
    if (!ending || guess) return;
    setGuess(v);
    const ok = correctVerbs(ending).includes(v);
    setScore((s) => ({ right: s.right + (ok ? 1 : 0), total: s.total + 1 }));
    addSorted(ending.id);
  };
  const changeSubject = (id: string) => {
    setSubjectId(id);
    const s = SUBJECTS.find((x) => x.id === id);
    if (ending && s && !fits(ending, s)) setEndingId(null);
    setGuess(null);
  };
  const changeMode = (m: "show" | "predict") => {
    setMode(m);
    setGuess(null);
    setEndingId(null);
  };

  const serBin = sorted.map((id) => ENDINGS_SE.find((e) => e.id === id)!).filter((e) => correctVerbs(e).includes("ser"));
  const estarBin = sorted.map((id) => ENDINGS_SE.find((e) => e.id === id)!).filter((e) => correctVerbs(e).includes("estar"));

  const sentences: Built[] = ending && revealed ? correctVerbs(ending).map((v) => build(ending, subject, v)) : [];

  let caption: ReactNode;
  if (!ending) {
    caption = (
      <>
        Tap an ending. <strong>Ser</strong> says <em>what</em> someone or something is (description, personality, origin, time);{" "}
        <strong>estar</strong> says <em>where</em> it is and <em>how</em> it is right now.
      </>
    );
  } else if (!revealed) {
    caption = (
      <>
        <Es>{ending.verb === "time" ? `___ ${ending.forms[0]}` : `${subject.es} ___ ${compOf(ending, subject)}`}</Es> — is this about <em>what it is like</em> (ser) or{" "}
        <em>where / how it is now</em> (estar)? Choose, then check.
      </>
    );
  } else {
    caption = (
      <>
        <span>{ending.why}</span>
        {ending.verb !== "time" ? (
          <>
            {" "}
            The subject <Es>{subject.label}</Es> takes the <Es>{PERSON_SHORT[subject.p]}</Es> form:{" "}
            {correctVerbs(ending)
              .map((v) => conjugate(v, "present", subject.p))
              .join(" / ")}
            .
          </>
        ) : null}
      </>
    );
  }

  return (
    <WidgetFrame
      title="Ser or estar? The sorter"
      tryThis={[
        "Choose *mi casa* and tap *en el centro*. A house never moves — so why *está*?",
        "Switch to **Predict** and sort every ending for *mi hermano* before you look.",
        "Tap *aburrido*: what's the difference between *es aburrido* and *está aburrido*?",
        "Change the subject to *las tiendas*: watch *es / está* become *son / están* and the adjective agree.",
      ]}
      caption={caption}
    >
      <div className="space-y-3">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <label className="min-w-0 flex-1 text-sm font-semibold text-ink-2">
            Subject
            <select className="input mt-1" value={subjectId} onChange={(e) => changeSubject(e.target.value)} lang="es">
              {SUBJECTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
          <Segmented
            label="Mode"
            options={[
              { value: "show", label: "Show me" },
              { value: "predict", label: "Predict first" },
            ]}
            value={mode}
            onChange={changeMode}
          />
        </div>

        <div role="group" aria-label="Sentence endings" className="flex flex-wrap gap-2">
          {ENDINGS_SE.map((e) => {
            const ok = fits(e, subject);
            const label = e.verb === "time" ? e.forms[0] : compOf(e, subject);
            const active = e.id === endingId;
            return (
              <button
                key={e.id}
                type="button"
                lang="es"
                disabled={!ok}
                aria-pressed={active}
                title={ok ? undefined : `Doesn't fit ${subject.label}`}
                onClick={() => pickEnding(e)}
                className={`min-h-10 rounded-xl border px-3 py-2 text-sm font-bold transition ${
                  active ? "border-brand bg-brand-soft text-brand" : "border-line bg-surface text-ink hover:bg-surface-2"
                } disabled:cursor-not-allowed disabled:opacity-40`}
              >
                {e.verb === "time" ? `🕐 ${label}` : `… ${label}`}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-ink-2">
          Faded endings don&rsquo;t make sense for <Es>{subject.label}</Es> (a bedroom can&rsquo;t be <Es>de Sevilla</Es>!) — change the subject to use them.
        </p>

        {ending && !revealed ? (
          <div className="rounded-xl border border-line bg-surface p-3">
            <div className="text-2xl font-extrabold text-ink" lang="es">
              {ending.verb === "time" ? `___ ${ending.forms[0]}.` : `${subject.es} ___ ${compOf(ending, subject)}.`}
            </div>
            <div className="mt-3 flex gap-2">
              <button type="button" className="btn btn-secondary min-h-10 flex-1 text-brand" onClick={() => makeGuess("ser")}>
                ser
              </button>
              <button type="button" className="btn btn-secondary min-h-10 flex-1 text-info" onClick={() => makeGuess("estar")}>
                estar
              </button>
            </div>
          </div>
        ) : null}

        {ending && revealed && mode === "predict" && guess ? (
          <div
            role="status"
            className={`rounded-xl px-3 py-2 text-sm font-bold ${correctVerbs(ending).includes(guess) ? "bg-good-soft text-good" : "bg-bad-soft text-bad"}`}
          >
            {correctVerbs(ending).includes(guess)
              ? ending.verb === "both"
                ? `Yes — ${guess} works, and so does ${guess === "ser" ? "estar" : "ser"}, with a different meaning.`
                : `Yes — ${guess}!`
              : `Not this time — it's ${correctVerbs(ending)[0]}.`}
          </div>
        ) : null}

        {sentences.map((b) => (
          <SentenceLine key={b.verb} b={b} />
        ))}

        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl bg-brand-soft p-3">
            <div className="text-xs font-extrabold uppercase tracking-wide text-brand">Ser — what it is</div>
            <ul className="mt-1 flex flex-wrap gap-1" lang="es">
              {serBin.length ? serBin.map((e) => <li key={e.id} className="chip">{e.forms[0]}</li>) : <li className="text-xs text-ink-2">nothing yet</li>}
            </ul>
          </div>
          <div className="rounded-xl bg-info-soft p-3">
            <div className="text-xs font-extrabold uppercase tracking-wide text-info">Estar — where / how now</div>
            <ul className="mt-1 flex flex-wrap gap-1" lang="es">
              {estarBin.length ? estarBin.map((e) => <li key={e.id} className="chip">{e.forms[0]}</li>) : <li className="text-xs text-ink-2">nothing yet</li>}
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {mode === "predict" ? <Readout label="Predictions right" value={`${score.right} / ${score.total}`} tone="good" /> : null}
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => {
              setSorted([]);
              setScore({ right: 0, total: 0 });
              setEndingId(null);
              setGuess(null);
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </WidgetFrame>
  );
}

export const widgets: WidgetDef[] = [
  {
    id: "presente-verb-machine",
    title: "Verb machine",
    blurb: "Pick any verb and person: see the stem, the ending and the boot light up, and hear the form.",
    Component: VerbMachine,
  },
  {
    id: "presente-ser-estar-sorter",
    title: "Ser or estar? The sorter",
    blurb: "Tap a sentence ending for a subject and watch it land in the ser or the estar box — with the reason.",
    Component: SerEstarSorter,
  },
];
