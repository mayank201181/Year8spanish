"use client";
// Interactive explorables for "Describing My Town & Extended Writing" (mi-ciudad).
import { useMemo, useState, type ReactNode } from "react";
import { WidgetFrame, Readout, type WidgetDef } from "./kit";
import { speakSpanish } from "@/lib/speech";
import { conjugate, englishGloss, verbInfo, PERSONS, type Person, type Tense } from "@/lib/spanish/verbs";

// ---------------------------------------------------------------------------
// Shared bits
// ---------------------------------------------------------------------------

type G = "m" | "f";

/** Agree a masculine-singular adjective with a singular noun (-o → -a; -e stays). */
const agree = (adj: string, g: G): string => (adj.endsWith("o") ? adj.slice(0, -1) + (g === "f" ? "a" : "o") : adj);
const cap = (s: string): string => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
const sp = (...parts: string[]): string => parts.filter(Boolean).join(" ");

function Es({ children }: { children: ReactNode }) {
  return (
    <i lang="es" className="font-semibold text-brand">
      {children}
    </i>
  );
}

function Pills<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: ReactNode }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="space-y-1">
      <div className="text-xs font-bold uppercase tracking-wide text-ink-2">{label}</div>
      <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-1.5">
        {options.map((o) => {
          const on = o.value === value;
          return (
            <button
              key={o.value}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => onChange(o.value)}
              className={`min-h-10 rounded-lg border px-3 text-sm font-bold transition ${
                on ? "border-brand bg-brand-soft text-brand" : "border-line bg-surface text-ink-2 hover:text-ink"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Toggle({ label, on, onChange, disabled }: { label: string; on: boolean; onChange: (v: boolean) => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      disabled={disabled}
      onClick={() => onChange(!on)}
      className={`flex min-h-10 items-center gap-2 rounded-lg border px-3 text-sm font-bold transition disabled:opacity-40 ${
        on ? "border-good bg-good-soft text-good" : "border-line bg-surface text-ink-2 hover:text-ink"
      }`}
    >
      <span aria-hidden className="text-base">{on ? "✓" : "+"}</span>
      {label}
    </button>
  );
}

function SpeakButton({ text, label = "Listen" }: { text: string; label?: string }) {
  return (
    <button type="button" className="btn btn-secondary btn-sm" onClick={() => speakSpanish(text, { slow: true })} aria-label={`${label}: ${text}`}>
      🔊 {label}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Widget 1 — Extended-sentence upgrader
// ---------------------------------------------------------------------------

interface UPlace {
  key: string;
  to: string;
  noun: string;
  en: string;
  g: G;
}
const U_PLACES: UPlace[] = [
  { key: "parque", to: "al parque", noun: "el parque", en: "the park", g: "m" },
  { key: "playa", to: "a la playa", noun: "la playa", en: "the beach", g: "f" },
  { key: "centro", to: "al centro", noun: "el centro", en: "the town centre", g: "m" },
  { key: "casco", to: "al casco antiguo", noun: "el casco antiguo", en: "the old town", g: "m" },
  { key: "piscina", to: "a la piscina", noun: "la piscina", en: "the pool", g: "f" },
];

const U_TIMES = [
  { key: "sab", es: "los sábados", lead: "On Saturdays I go" },
  { key: "norm", es: "normalmente", lead: "Normally I go" },
  { key: "fin", es: "los fines de semana", lead: "At weekends I go" },
  { key: "menudo", es: "a menudo", lead: "I often go" },
] as const;

const U_COMPANY = [
  { key: "amigos", es: "con mis amigos", en: "with my friends" },
  { key: "familia", es: "con mi familia", en: "with my family" },
  { key: "hermana", es: "con mi hermana", en: "with my sister" },
] as const;

const U_OPINIONS = [
  { key: "encanta", es: "y me encanta", en: "and I love it", pos: true },
  { key: "gusta", es: "y me gusta mucho", en: "and I really like it", pos: true },
  { key: "nogusta", es: "pero no me gusta mucho", en: "but I don't like it much", pos: false },
] as const;

const U_ADJ_POS = [
  { es: "tranquilo", en: "quiet" },
  { es: "bonito", en: "pretty" },
  { es: "animado", en: "lively" },
  { es: "limpio", en: "clean" },
];
const U_ADJ_NEG = [
  { es: "ruidoso", en: "noisy" },
  { es: "sucio", en: "dirty" },
  { es: "aburrido", en: "boring" },
];

const U_INTENS = [
  { key: "muy", es: "muy", en: "very", pos: true, neg: true },
  { key: "bastante", es: "bastante", en: "quite", pos: true, neg: true },
  { key: "realmente", es: "realmente", en: "really", pos: true, neg: false },
  { key: "demasiado", es: "demasiado", en: "too", pos: false, neg: true },
  { key: "unpoco", es: "un poco", en: "a bit", pos: false, neg: true },
] as const;

type Conn = "aunque" | "sin embargo" | "pero";

interface Contrast {
  es: string;
  en: string;
  /** Adjectives this contrast would contradict. */
  clash: string[];
}
function contrastsFor(pos: boolean, g: G): Contrast[] {
  return pos
    ? [
        { es: "hay demasiada gente", en: "there are too many people", clash: ["tranquilo"] },
        { es: "hay demasiados turistas", en: "there are too many tourists", clash: ["tranquilo"] },
        { es: "está un poco lejos", en: "it's a bit far away", clash: [] },
        { es: `es un poco ${agree("pequeño", g)}`, en: "it's a bit small", clash: [] },
      ]
    : [
        { es: "está cerca de mi casa", en: "it's near my house", clash: [] },
        { es: `es bastante ${agree("bonito", g)}`, en: "it's quite pretty", clash: [] },
        { es: "hay muchas zonas verdes", en: "there are lots of green spaces", clash: ["aburrido"] },
      ];
}

type SegKind = "time" | "core" | "company" | "opinion" | "reason" | "int" | "contrast" | "punct";
interface Seg {
  text: string;
  kind: SegKind;
  /** No space before this segment (punctuation). */
  tight?: boolean;
}

const SEG_CLASS: Record<SegKind, string> = {
  time: "bg-info-soft text-info",
  core: "font-extrabold text-ink",
  company: "bg-accent-soft text-ink",
  opinion: "bg-good-soft text-good",
  reason: "bg-brand-soft text-brand",
  int: "bg-warn-soft text-warn underline decoration-2 underline-offset-4",
  contrast: "bg-bad-soft text-bad",
  punct: "text-ink",
};

const LEVELS = ["Basic", "Getting there", "Developing", "Good", "Very good", "Excellent", "Extended — top marks"];

function SentenceUpgrader() {
  const [placeKey, setPlaceKey] = useState("parque");
  const [timeOn, setTimeOn] = useState(false);
  const [timeKey, setTimeKey] = useState<string>("sab");
  const [compOn, setCompOn] = useState(false);
  const [compKey, setCompKey] = useState<string>("amigos");
  const [opOn, setOpOn] = useState(false);
  const [opKey, setOpKey] = useState<string>("encanta");
  const [reasonOn, setReasonOn] = useState(false);
  const [adjIdx, setAdjIdx] = useState(0);
  const [intOn, setIntOn] = useState(false);
  const [intKey, setIntKey] = useState<string>("muy");
  const [conOn, setConOn] = useState(false);
  const [conn, setConn] = useState<Conn>("aunque");
  const [conIdx, setConIdx] = useState(0);

  const place = U_PLACES.find((p) => p.key === placeKey) ?? U_PLACES[0];
  const time = U_TIMES.find((t) => t.key === timeKey) ?? U_TIMES[0];
  const comp = U_COMPANY.find((c) => c.key === compKey) ?? U_COMPANY[0];
  const opinion = U_OPINIONS.find((o) => o.key === opKey) ?? U_OPINIONS[0];
  const pos = !opOn || opinion.pos;
  const adjList = pos ? U_ADJ_POS : U_ADJ_NEG;
  const adjChoice = adjList[adjIdx % adjList.length];
  const adjForm = agree(adjChoice.es, place.g);
  const intList = U_INTENS.filter((i) => (pos ? i.pos : i.neg));
  const intens = intList.find((i) => i.key === intKey) ?? intList[0];
  const intActive = reasonOn && intOn;
  const connOptions: Conn[] = opOn && !opinion.pos ? ["aunque", "sin embargo"] : ["aunque", "sin embargo", "pero"];
  const connective: Conn = connOptions.includes(conn) ? conn : "aunque";
  const conList = contrastsFor(pos, place.g).filter((c) => !reasonOn || !c.clash.includes(adjChoice.es));
  const contrast = conList[conIdx % conList.length];

  const { segs, plain, english, words } = useMemo(() => {
    const s: Seg[] = [];
    if (timeOn) s.push({ text: time.es, kind: "time" });
    s.push({ text: `voy ${place.to}`, kind: "core" });
    if (compOn) s.push({ text: comp.es, kind: "company" });
    if (opOn) s.push({ text: opinion.es, kind: "opinion" });
    if (reasonOn) {
      s.push({ text: "porque es", kind: "reason" });
      if (intActive) s.push({ text: intens.es, kind: "int" });
      s.push({ text: adjForm, kind: "reason" });
    }
    if (conOn) {
      if (connective === "sin embargo") {
        s.push({ text: ";", kind: "punct", tight: true }, { text: "sin embargo,", kind: "contrast" });
      } else {
        s.push({ text: ",", kind: "punct", tight: true }, { text: connective, kind: "contrast" });
      }
      s.push({ text: contrast.es, kind: "contrast" });
    }
    s.push({ text: ".", kind: "punct", tight: true });
    s[0] = { ...s[0], text: cap(s[0].text) };
    const p = s.map((x, i) => (i > 0 && !x.tight ? " " : "") + x.text).join("");

    let en = `${timeOn ? time.lead : "I go"} to ${place.en}`;
    if (compOn) en += ` ${comp.en}`;
    if (opOn) en += ` ${opinion.en}`;
    if (reasonOn) en += ` because it's ${intActive ? intens.en + " " : ""}${adjChoice.en}`;
    if (conOn) en += connective === "sin embargo" ? `; however, ${contrast.en}` : connective === "pero" ? `, but ${contrast.en}` : `, although ${contrast.en}`;
    en += ".";
    const w = p.replace(/[.,;]/g, " ").split(/\s+/).filter(Boolean).length;
    return { segs: s, plain: p, english: en, words: w };
  }, [timeOn, time, place, compOn, comp, opOn, opinion, reasonOn, intActive, intens, adjForm, adjChoice, conOn, connective, contrast]);

  const blocks = [timeOn, compOn, opOn, reasonOn, intActive, conOn];
  const level = 1 + blocks.filter(Boolean).length;
  const nextTip = !timeOn
    ? "Add a time phrase — it answers 'When?'."
    : !compOn
      ? "Add company — it answers 'With whom?'."
      : !opOn
        ? "Add an opinion — what do you think of the place?"
        : !reasonOn
          ? "Add a reason with porque — why do you think that?"
          : !intOn
            ? "Add an intensifier to boost the adjective."
            : !conOn
              ? "Add a connective + contrast — is there a 'but'?"
              : "Every block is in. Read it aloud: does it still sound natural?";

  return (
    <WidgetFrame
      title="Extended-sentence upgrader"
      tryThis={[
        "Switch on every block — how many words does *Voy al parque* grow to?",
        "Turn on a reason, then switch the place to *la playa*. Predict which word changes before you click.",
        "Add the intensifier *demasiado* (choose *no me gusta mucho* first). Does it become *demasiada* for *la playa*? Test it.",
        "Pick *sin embargo* as the connective: what punctuation appears around it?",
      ]}
      caption={
        <div className="space-y-1.5">
          <p>
            Core: <Es>voy</Es> + <Es>a</Es> + place.{" "}
            {place.g === "m" ? (
              <>
                <Es>{place.noun}</Es> is masculine, so <Es>a + el → al</Es>: <Es>voy {place.to}</Es>.
              </>
            ) : (
              <>
                <Es>{place.noun}</Es> is feminine: <Es>a la</Es> never contracts.
              </>
            )}
          </p>
          {reasonOn ? (
            <p>
              <Es>{adjForm}</Es> agrees with <Es>{place.noun}</Es> ({place.g === "f" ? "feminine → -a" : "masculine → -o"}).
              {intActive ? (
                <>
                  {" "}
                  The intensifier <Es>{intens.es}</Es> sits before an adjective, so it <b>never changes</b> — not even for <Es>la playa</Es>.
                </>
              ) : null}
            </p>
          ) : null}
          {conOn ? (
            <p>
              {connective === "sin embargo" ? (
                <>
                  <Es>Sin embargo</Es> (however) starts a new clause: semicolon before it, comma after it.
                </>
              ) : connective === "aunque" ? (
                <>
                  <Es>Aunque</Es> (although) slips the contrast into the same sentence.
                </>
              ) : (
                <>
                  <Es>Pero</Es> (but) is the simplest contrast — <Es>aunque</Es> or <Es>sin embargo</Es> show off more range.
                </>
              )}
            </p>
          ) : null}
          <p className="text-ink-2">Next: {nextTip}</p>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="rounded-xl border border-line bg-surface p-3">
          <p lang="es" className="text-lg leading-relaxed" aria-live="polite">
            {segs.map((s, i) => (
              <span key={i}>
                {i > 0 && !s.tight ? " " : ""}
                <span className={s.kind === "punct" || s.kind === "core" ? SEG_CLASS[s.kind] : `rounded px-1 ${SEG_CLASS[s.kind]}`}>{s.text}</span>
              </span>
            ))}
          </p>
          <p className="mt-1 text-sm text-ink-2">{english}</p>
          <div className="mt-2">
            <SpeakButton text={plain} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          <Readout label="Level" value={`${level} / 7`} tone={level >= 6 ? "good" : "brand"} />
          <Readout label="Words" value={words} tone="ink" />
          <div className="col-span-2 flex items-center rounded-xl border border-line bg-surface px-3 py-2 sm:col-span-1">
            <svg viewBox="0 0 280 40" className="h-auto w-full" role="img" aria-label={`Level meter: level ${level} of 7, ${LEVELS[level - 1]}`}>
              {LEVELS.map((_, i) => (
                <rect
                  key={i}
                  x={i * 40 + 2}
                  y={28 - i * 4}
                  width={34}
                  height={10 + i * 4}
                  rx={4}
                  className={i < level ? (level >= 6 ? "fill-good stroke-good" : "fill-brand stroke-brand") : "fill-surface-2 stroke-line"}
                  strokeWidth={1}
                />
              ))}
            </svg>
          </div>
        </div>
        <p className="text-sm font-bold text-ink">
          {LEVELS[level - 1]}
        </p>

        <Pills label="Place" value={placeKey} onChange={setPlaceKey} options={U_PLACES.map((p) => ({ value: p.key, label: <span lang="es">{p.noun}</span> }))} />

        <div className="space-y-3 rounded-xl bg-surface-2 p-3">
          <div className="space-y-2">
            <Toggle label="Time phrase (When?)" on={timeOn} onChange={setTimeOn} />
            {timeOn ? <Pills label="Time phrase" value={timeKey} onChange={setTimeKey} options={U_TIMES.map((t) => ({ value: t.key, label: <span lang="es">{t.es}</span> }))} /> : null}
          </div>
          <div className="space-y-2">
            <Toggle label="Company (With whom?)" on={compOn} onChange={setCompOn} />
            {compOn ? <Pills label="Company" value={compKey} onChange={setCompKey} options={U_COMPANY.map((c) => ({ value: c.key, label: <span lang="es">{c.es}</span> }))} /> : null}
          </div>
          <div className="space-y-2">
            <Toggle label="Opinion" on={opOn} onChange={setOpOn} />
            {opOn ? <Pills label="Opinion" value={opKey} onChange={setOpKey} options={U_OPINIONS.map((o) => ({ value: o.key, label: <span lang="es">{o.es}</span> }))} /> : null}
          </div>
          <div className="space-y-2">
            <Toggle label="Reason (Why?)" on={reasonOn} onChange={setReasonOn} />
            {reasonOn ? (
              <Pills
                label="Adjective"
                value={String(adjIdx % adjList.length)}
                onChange={(v) => setAdjIdx(Number(v))}
                options={adjList.map((a, i) => ({ value: String(i), label: <span lang="es">{agree(a.es, place.g)}</span> }))}
              />
            ) : null}
          </div>
          <div className="space-y-2">
            <Toggle label={reasonOn ? "Intensifier" : "Intensifier (add a reason first)"} on={intActive} onChange={setIntOn} disabled={!reasonOn} />
            {intActive ? <Pills label="Intensifier" value={intens.key} onChange={setIntKey} options={intList.map((i) => ({ value: i.key, label: <span lang="es">{i.es}</span> }))} /> : null}
          </div>
          <div className="space-y-2">
            <Toggle label="Connective + contrast" on={conOn} onChange={setConOn} />
            {conOn ? (
              <>
                <Pills label="Connective" value={connective} onChange={setConn} options={connOptions.map((c) => ({ value: c, label: <span lang="es">{c}</span> }))} />
                <Pills
                  label="Contrast"
                  value={String(conIdx % conList.length)}
                  onChange={(v) => setConIdx(Number(v))}
                  options={conList.map((c, i) => ({ value: String(i), label: <span lang="es">{c.es}</span> }))}
                />
              </>
            ) : null}
          </div>
        </div>
      </div>
    </WidgetFrame>
  );
}

// ---------------------------------------------------------------------------
// Widget 2 — Three-time-frame paragraph builder
// ---------------------------------------------------------------------------

type TF = "past" | "present" | "future";
const TFS: readonly TF[] = ["past", "present", "future"];
const TF_TENSE: Record<TF, Tense> = { past: "preterite", present: "present", future: "near-future" };
const TF_LABEL: Record<TF, string> = { past: "Past · pasado", present: "Present · presente", future: "Future · futuro" };
const TF_BOX: Record<TF, string> = { past: "bg-bad-soft", present: "bg-info-soft", future: "bg-good-soft" };
const TF_INK: Record<TF, string> = { past: "text-bad", present: "text-info", future: "text-good" };
const TF_FILL: Record<TF, string> = { past: "fill-bad", present: "fill-info", future: "fill-good" };
const IT_WAS: Record<TF, string> = { past: "it was", present: "it is", future: "it's going to be" };

interface TAct {
  inf: string;
  rest: string;
}
interface TPlace {
  key: string;
  noun: string;
  to: string;
  acts: TAct[];
}
const T_PLACES: TPlace[] = [
  { key: "centro", noun: "el centro", to: "al centro", acts: [{ inf: "comprar", rest: "ropa" }, { inf: "comer", rest: "churros" }, { inf: "ver", rest: "una película" }] },
  { key: "playa", noun: "la playa", to: "a la playa", acts: [{ inf: "nadar", rest: "en el mar" }, { inf: "tomar", rest: "el sol" }, { inf: "jugar", rest: "al voleibol" }] },
  { key: "parque", noun: "el parque", to: "al parque", acts: [{ inf: "jugar", rest: "al fútbol" }, { inf: "pasear", rest: "con el perro" }, { inf: "montar", rest: "en bici" }] },
  { key: "casco", noun: "el casco antiguo", to: "al casco antiguo", acts: [{ inf: "visitar", rest: "la catedral" }, { inf: "hacer", rest: "fotos" }, { inf: "comer", rest: "una tortilla de patatas" }] },
  { key: "mercado", noun: "el mercado", to: "al mercado", acts: [{ inf: "comprar", rest: "fruta" }, { inf: "beber", rest: "un zumo" }, { inf: "comer", rest: "churros" }] },
  { key: "museo", noun: "el museo", to: "al museo", acts: [{ inf: "ver", rest: "una exposición" }, { inf: "aprender", rest: "mucho" }, { inf: "hacer", rest: "una visita guiada" }] },
];

const SIGN_SETS = [
  { key: "a", past: "ayer", present: "normalmente", future: "mañana" },
  { key: "b", past: "el fin de semana pasado", present: "los fines de semana", future: "el fin de semana que viene" },
  { key: "c", past: "el verano pasado", present: "todos los veranos", future: "el verano que viene" },
] as const;

const T_SUBJECT: Record<Person, { es: string; label: string }> = {
  yo: { es: "", label: "yo" },
  tú: { es: "", label: "tú" },
  él: { es: "mi hermano", label: "mi hermano" },
  nosotros: { es: "mis amigos y yo", label: "mis amigos y yo" },
  vosotros: { es: "", label: "vosotros" },
  ellos: { es: "mis padres", label: "mis padres" },
};

const T_OPINIONS = [
  { es: "genial", en: "great" },
  { es: "divertido", en: "fun" },
  { es: "increíble", en: "amazing" },
  { es: "un poco aburrido", en: "a bit boring" },
];

// Regular endings — used only to LABEL a form (regular / irregular); the form itself comes from conjugate().
const ENDS: Record<"present" | "preterite", Record<"ar" | "er" | "ir", readonly string[]>> = {
  present: { ar: ["o", "as", "a", "amos", "áis", "an"], er: ["o", "es", "e", "emos", "éis", "en"], ir: ["o", "es", "e", "imos", "ís", "en"] },
  preterite: { ar: ["é", "aste", "ó", "amos", "asteis", "aron"], er: ["í", "iste", "ió", "imos", "isteis", "ieron"], ir: ["í", "iste", "ió", "imos", "isteis", "ieron"] },
};

function formKind(inf: string, tense: Tense, p: Person): string {
  if (tense === "near-future") return "ir a + infinitive";
  const info = verbInfo(inf);
  if (!info) return "";
  const form = conjugate(inf, tense, p);
  const stem = inf.slice(0, -2);
  if (form === stem + ENDS[tense][info.group][PERSONS.indexOf(p)]) return "regular";
  if (tense === "preterite" && p === "yo") {
    if (info.tags.includes("spelling-gar")) return "spelling: g → gu";
    if (info.tags.includes("spelling-car")) return "spelling: c → qu";
    if (info.tags.includes("spelling-zar")) return "spelling: z → c";
  }
  if (tense === "present" && info.tags.some((t) => t.startsWith("stem-"))) return "stem change";
  return "irregular";
}

interface Frame {
  tf: TF;
  sign: string;
  ir: string;
  verb: string;
  ser: string;
  text: string;
  verbs: { form: string; gloss: string; kind: string }[];
}

function TimeFrames() {
  const [person, setPerson] = useState<Person>("yo");
  const [placeKey, setPlaceKey] = useState("centro");
  const [actIdx, setActIdx] = useState(0);
  const [setKey, setSetKey] = useState<string>("b");
  const [opIdx, setOpIdx] = useState(0);
  const [focus, setFocus] = useState<"all" | TF>("all");

  const place = T_PLACES.find((p) => p.key === placeKey) ?? T_PLACES[0];
  const act = place.acts[actIdx % place.acts.length];
  const signs = SIGN_SETS.find((s) => s.key === setKey) ?? SIGN_SETS[1];
  const op = T_OPINIONS[opIdx % T_OPINIONS.length];
  const subj = T_SUBJECT[person];

  const frames: Frame[] = useMemo(
    () =>
      TFS.map((tf) => {
        const t = TF_TENSE[tf];
        const ir = conjugate("ir", t, person);
        const verb = conjugate(act.inf, t, person);
        const ser = conjugate("ser", t, "él");
        const text = `${cap(sp(signs[tf], subj.es, ir, place.to, "y", verb, act.rest))}. ${cap(ser)} ${op.es}.`;
        return {
          tf,
          sign: signs[tf],
          ir,
          verb,
          ser,
          text,
          verbs: [
            { form: ir, gloss: englishGloss("ir", t, person), kind: formKind("ir", t, person) },
            { form: verb, gloss: englishGloss(act.inf, t, person), kind: formKind(act.inf, t, person) },
            { form: ser, gloss: IT_WAS[tf], kind: tf === "future" ? "ir a + infinitive" : "irregular" },
          ],
        };
      }),
    [person, act, signs, subj, place, op],
  );

  const paragraph = frames.map((f) => f.text).join(" ");
  const shown = focus === "all" ? frames : frames.filter((f) => f.tf === focus);
  const spelling = frames.flatMap((f) => f.verbs).find((v) => v.kind.startsWith("spelling"));
  const verbInf = act.inf;

  return (
    <WidgetFrame
      title="Three-time-frame paragraph builder"
      tryThis={[
        "Choose *mis amigos y yo*. Predict the three forms of *ir* (past, present, future) before you look.",
        "Pick *el parque* + *jugar al fútbol* with *yo*: spot the spelling change in the past.",
        "Switch to *mis padres*: what happens to *voy a ir*? Which part changes and which stays?",
        "Listen to the whole paragraph, then cover it and rebuild it from the timeline alone.",
      ]}
      caption={
        <div className="space-y-1.5">
          <p>
            Read the <b>signpost</b> first, then pick the verb from the same time frame. With <Es>{subj.label}</Es>: past <Es>{frames[0].ir}</Es>, present{" "}
            <Es>{frames[1].ir}</Es>, future <Es>{frames[2].ir}</Es>.
          </p>
          <p>
            The second verb follows the same pattern: <Es>{frames[0].verb}</Es> → <Es>{frames[1].verb}</Es> → <Es>{frames[2].verb}</Es>. Even the opinion moves:{" "}
            <Es>fue → es → va a ser</Es> {op.es}.
          </p>
          {spelling ? (
            <p>
              Spot it: <Es>{spelling.form}</Es> has a spelling change ({spelling.kind}) so it still sounds like <Es>{verbInf}</Es>.
            </p>
          ) : null}
          {person === "nosotros" && (verbInfo(verbInf)?.group === "ar" || verbInfo(verbInf)?.group === "ir") && frames[0].verb === frames[1].verb ? (
            <p>
              Notice: <Es>{frames[0].verb}</Es> is the same in the past and present for <Es>nosotros</Es> — only the time phrase tells you which.
            </p>
          ) : null}
        </div>
      }
    >
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <Pills label="Who?" value={person} onChange={setPerson} options={PERSONS.map((p) => ({ value: p, label: <span lang="es">{T_SUBJECT[p].label}</span> }))} />
          <Pills label="Signposts" value={setKey} onChange={setSetKey} options={SIGN_SETS.map((s) => ({ value: s.key, label: <span lang="es">{`${s.past} · ${s.present} · ${s.future}`}</span> }))} />
          <Pills
            label="Place"
            value={placeKey}
            onChange={(v) => {
              setPlaceKey(v);
              setActIdx(0);
            }}
            options={T_PLACES.map((p) => ({ value: p.key, label: <span lang="es">{p.noun}</span> }))}
          />
          <Pills
            label="Activity"
            value={String(actIdx % place.acts.length)}
            onChange={(v) => setActIdx(Number(v))}
            options={place.acts.map((a, i) => ({ value: String(i), label: <span lang="es">{`${a.inf} ${a.rest}`}</span> }))}
          />
          <Pills label="Opinion" value={String(opIdx)} onChange={(v) => setOpIdx(Number(v))} options={T_OPINIONS.map((o, i) => ({ value: String(i), label: <span lang="es">{o.es}</span> }))} />
          <Pills
            label="Focus"
            value={focus}
            onChange={setFocus}
            options={[
              { value: "all", label: "All three" },
              { value: "past", label: "Past" },
              { value: "present", label: "Present" },
              { value: "future", label: "Future" },
            ]}
          />
        </div>

        <svg
          viewBox="0 0 320 84"
          className="h-auto w-full"
          role="img"
          aria-label={`Timeline from past to future. Past: ${frames[0].ir}. Present: ${frames[1].ir}. Future: ${frames[2].ir}.${focus === "all" ? "" : ` Focus on the ${focus}.`}`}
        >
          <line x1={20} y1={40} x2={296} y2={40} className="stroke-ink-2" strokeWidth={2} />
          <polygon points="296,34 308,40 296,46" className="fill-ink-2" />
          {frames.map((f, i) => {
            const x = 55 + i * 105;
            const on = focus === "all" || focus === f.tf;
            return (
              <g key={f.tf} opacity={on ? 1 : 0.35}>
                <text x={x} y={20} textAnchor="middle" fontSize={11} fontWeight={700} className={TF_FILL[f.tf]}>
                  {f.tf === "past" ? "PASADO" : f.tf === "present" ? "PRESENTE" : "FUTURO"}
                </text>
                <circle cx={x} cy={40} r={9} className={`${TF_FILL[f.tf]} stroke-surface`} strokeWidth={2} />
                <text x={x} y={68} textAnchor="middle" fontSize={13} fontWeight={700} className="fill-ink">
                  {f.ir}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="space-y-2">
          {shown.map((f) => (
            <div key={f.tf} className={`rounded-xl p-3 ${TF_BOX[f.tf]}`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className={`text-xs font-bold uppercase tracking-wide ${TF_INK[f.tf]}`}>{TF_LABEL[f.tf]}</span>
                <SpeakButton text={f.text} />
              </div>
              <p lang="es" className="mt-1 text-lg leading-relaxed text-ink">
                <FrameText f={f} subj={subj.es} to={place.to} rest={act.rest} opinion={op.es} />
              </p>
              <ul className="mt-2 flex flex-wrap gap-1.5 text-xs">
                {f.verbs.map((v, i) => (
                  <li key={i} className="rounded-lg border border-line bg-surface px-2 py-1 text-ink-2">
                    <b lang="es" className="text-ink">
                      {v.form}
                    </b>{" "}
                    = {v.gloss} · <span className={v.kind === "regular" ? "text-good" : v.kind === "ir a + infinitive" ? "text-info" : "font-bold text-accent"}>{v.kind}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <SpeakButton text={paragraph} label="Listen to the whole paragraph" />
      </div>
    </WidgetFrame>
  );
}

/** One frame's two sentences, with the signpost and verbs highlighted. */
function FrameText({ f, subj, to, rest, opinion }: { f: Frame; subj: string; to: string; rest: string; opinion: string }) {
  const ink = `font-extrabold ${TF_INK[f.tf]}`;
  return (
    <>
      <span className="underline decoration-dotted underline-offset-4">{cap(f.sign)}</span>
      {subj ? ` ${subj}` : ""} <span className={ink}>{f.ir}</span> {to} y <span className={ink}>{f.verb}</span> {rest}.{" "}
      <span className={ink}>{cap(f.ser)}</span> {opinion}.
    </>
  );
}

// ---------------------------------------------------------------------------

export const widgets: WidgetDef[] = [
  {
    id: "mi-ciudad-sentence-upgrader",
    title: "Extended-sentence upgrader",
    blurb: "Start from *Voy al parque.* and switch on one block at a time — watch the sentence (and your level) grow.",
    Component: SentenceUpgrader,
  },
  {
    id: "mi-ciudad-three-time-frames",
    title: "Three-time-frame paragraph builder",
    blurb: "Pick who, where and what — the widget writes a correct past / present / future mini-paragraph so you can see every verb change.",
    Component: TimeFrames,
  },
];
