"use client";
// Explorables for "futuro-inmediato" (ir + a + infinitive).
// Every verb form comes from the tested conjugator in lib/spanish/verbs.
import { useMemo, useState, type ReactNode } from "react";
import { WidgetFrame, Segmented, Readout, type WidgetDef } from "./kit";
import { speakSpanish } from "@/lib/speech";
import { conjugate, acceptedForms, englishGloss, type Person } from "@/lib/spanish/verbs";

// ---------------------------------------------------------------------------
// Shared bits
// ---------------------------------------------------------------------------

function Es({ children }: { children: ReactNode }) {
  return (
    <em lang="es" className="font-semibold not-italic text-ink">
      {children}
    </em>
  );
}

const cap = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
const join = (...parts: string[]) => parts.filter(Boolean).join(" ");

function SpeakButton({ text }: { text: string }) {
  return (
    <button
      type="button"
      className="btn btn-secondary btn-sm shrink-0"
      onClick={() => speakSpanish(text, { slow: true })}
      aria-label={`Listen: ${text}`}
    >
      <span aria-hidden>🔊</span>
    </button>
  );
}

/** Strip the English subject that englishGloss puts first ("he/she plays" → "plays"). */
function glossVerb(inf: string, tense: "present" | "near-future", p: Person): string {
  return englishGloss(inf, tense, p).replace(/^(I|you all|you|he\/she|we|they) /, "");
}

// ---------------------------------------------------------------------------
// Widget 1: the near-future train
// ---------------------------------------------------------------------------

interface Who {
  id: string;
  p: Person;
  es: string;
  en: string;
}

const WHO: Who[] = [
  { id: "yo", p: "yo", es: "yo", en: "I" },
  { id: "tú", p: "tú", es: "tú", en: "you" },
  { id: "él", p: "él", es: "él", en: "he" },
  { id: "ella", p: "él", es: "ella", en: "she" },
  { id: "nosotros", p: "nosotros", es: "nosotros", en: "we" },
  { id: "vosotros", p: "vosotros", es: "vosotros", en: "you all" },
  { id: "ellos", p: "ellos", es: "ellos", en: "they" },
];

interface TrainVerb {
  inf: string;
  es: string;
  en: string;
}

const TRAIN_VERBS: TrainVerb[] = [
  { inf: "nadar", es: "", en: "" },
  { inf: "jugar", es: "al fútbol", en: "football" },
  { inf: "ver", es: "una película", en: "a film" },
  { inf: "hacer", es: "los deberes", en: "homework" },
  { inf: "comer", es: "churros", en: "churros" },
  { inf: "salir", es: "con amigos", en: "with friends" },
  { inf: "ir", es: "a la playa", en: "to the beach" },
  { inf: "visitar", es: "Sevilla", en: "Seville" },
  { inf: "estudiar", es: "", en: "" },
  { inf: "levantarse", es: "temprano", en: "early" },
  { inf: "acostarse", es: "tarde", en: "late" },
  { inf: "ducharse", es: "", en: "" },
  { inf: "quedarse", es: "en casa", en: "at home" },
  { inf: "divertirse", es: "", en: "" },
];

const TRAIN_TIMES: { es: string; en: string }[] = [
  { es: "", en: "" },
  { es: "mañana", en: "tomorrow" },
  { es: "esta tarde", en: "this afternoon" },
  { es: "esta noche", en: "tonight" },
  { es: "pasado mañana", en: "the day after tomorrow" },
  { es: "este fin de semana", en: "this weekend" },
  { es: "el sábado que viene", en: "next Saturday" },
  { es: "la semana que viene", en: "next week" },
  { es: "el año que viene", en: "next year" },
];

type Kind = "time" | "subj" | "no" | "pron" | "engine" | "coupling" | "wagon" | "extra";

interface Piece {
  kind: Kind;
  text: string;
}

const PIECE_STYLE: Record<Kind, { body: string; label: string }> = {
  time: { body: "fill-info-soft stroke-info", label: "when?" },
  subj: { body: "fill-surface-2 stroke-line", label: "who?" },
  no: { body: "fill-bad-soft stroke-bad", label: "negative" },
  pron: { body: "fill-warn-soft stroke-warn", label: "pronoun" },
  engine: { body: "fill-brand-soft stroke-brand", label: "ir (engine)" },
  coupling: { body: "fill-accent-soft stroke-accent", label: "link" },
  wagon: { body: "fill-good-soft stroke-good", label: "infinitive" },
  extra: { body: "fill-surface-2 stroke-line", label: "what / where?" },
};

function TrainSvg({ pieces, ariaLabel }: { pieces: Piece[]; ariaLabel: string }) {
  const pad = 10;
  const gap = 14;
  const widths = pieces.map((p) => Math.max(p.kind === "coupling" ? 34 : 50, Math.round(p.text.length * 8.6) + 22));
  const total = widths.reduce((a, b) => a + b, 0) + gap * (pieces.length - 1) + pad * 2;
  const placed = pieces.map((p, i) => ({ ...p, x: pad + widths.slice(0, i).reduce((a, b) => a + b + gap, 0), w: widths[i] }));
  return (
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${total} 124`}
        className="h-auto w-full"
        style={{ minWidth: `${Math.min(total, 760) * 0.62}px` }}
        role="img"
        aria-label={ariaLabel}
      >
        <line x1={pad} x2={total - pad} y1={98} y2={98} className="stroke-line" strokeWidth={3} />
        {placed.map((p, i) =>
          i < placed.length - 1 ? (
            <line key={`c${i}`} x1={p.x + p.w} x2={p.x + p.w + gap} y1={66} y2={66} className="stroke-ink-2" strokeWidth={3} />
          ) : null,
        )}
        {placed.map((p, i) => {
          const st = PIECE_STYLE[p.kind];
          return (
            <g key={`p${i}`}>
              {p.kind === "engine" ? <rect x={p.x + 8} y={18} width={12} height={16} rx={2} className="fill-ink-2" /> : null}
              <rect x={p.x} y={32} width={p.w} height={52} rx={p.kind === "engine" ? 14 : 8} className={st.body} strokeWidth={2} />
              <circle cx={p.x + 13} cy={90} r={7} className="fill-ink-2" />
              <circle cx={p.x + p.w - 13} cy={90} r={7} className="fill-ink-2" />
              <text x={p.x + p.w / 2} y={63} textAnchor="middle" fontSize={15} fontWeight={700} className="fill-ink" lang="es">
                {p.text}
              </text>
              <text x={p.x + p.w / 2} y={116} textAnchor="middle" fontSize={10} className="fill-ink-2">
                {st.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function NearFutureTrain() {
  const [whoId, setWhoId] = useState("yo");
  const [inf, setInf] = useState("nadar");
  const [timeIdx, setTimeIdx] = useState(1);
  const [timePos, setTimePos] = useState<"start" | "end">("start");
  const [neg, setNeg] = useState<"yes" | "no">("no");
  const [pronPos, setPronPos] = useState<"end" | "front">("end");
  const [showSubj, setShowSubj] = useState<"yes" | "no">("no");

  const who = WHO.find((w) => w.id === whoId) ?? WHO[0];
  const verb = TRAIN_VERBS.find((v) => v.inf === inf) ?? TRAIN_VERBS[0];
  const time = TRAIN_TIMES[timeIdx];
  const reflexive = verb.inf.endsWith("se");

  const built = useMemo(() => {
    const p = who.p;
    const engine = conjugate("ir", "present", p);
    const attached = conjugate(verb.inf, "near-future", p); // "voy a ducharme"
    const front = reflexive ? acceptedForms(verb.inf, "near-future", p)[1] : attached; // "me voy a duchar"
    const pron = reflexive ? front.split(" ")[0] : "";
    const useFront = reflexive && pronPos === "front";
    const wagon = useFront ? verb.inf.slice(0, -2) : attached.slice(engine.length + 3);
    const pieces: Piece[] = [];
    if (time.es && timePos === "start") pieces.push({ kind: "time", text: time.es });
    if (showSubj === "yes") pieces.push({ kind: "subj", text: who.es });
    if (neg === "yes") pieces.push({ kind: "no", text: "no" });
    if (useFront) pieces.push({ kind: "pron", text: pron });
    pieces.push({ kind: "engine", text: engine }, { kind: "coupling", text: "a" }, { kind: "wagon", text: wagon });
    if (verb.es) pieces.push({ kind: "extra", text: verb.es });
    if (time.es && timePos === "end") pieces.push({ kind: "time", text: time.es });
    const es = cap(pieces.map((x) => x.text).join(" ")) + ".";

    let en = glossVerb(verb.inf, "near-future", p); // "am going to have a shower"
    if (neg === "yes") en = en.replace(/^(am|are|is) going/, "$1 not going");
    en = join(who.en, en, verb.en);
    en = time.en ? (timePos === "start" ? `${cap(time.en)}, ${en}` : `${cap(en)} ${time.en}`) : cap(en);
    return { pieces, es, en: `${en}.`, engine, attached, front, pron, wagon };
  }, [who, verb, time, timePos, neg, pronPos, showSubj, reflexive]);

  const aria = `Sentence train: ${built.pieces.map((x) => `${PIECE_STYLE[x.kind].label} ${x.text}`).join(", ")}. Sentence: ${built.es}`;

  return (
    <WidgetFrame
      title="The near-future train: ir + a + infinitive"
      tryThis={[
        "Switch the person from *yo* to *ellos*. Which carriage changes, and which stay exactly the same?",
        "Pick *ducharse* and flip the pronoun position: *me voy a duchar* ↔ *voy a ducharme*. Does the English change?",
        "Predict where *no* will go in *te vas a levantar temprano*, then switch on the negative to check.",
        "Choose *ir* as the wagon. Why does *voy a ir a la playa* contain *a* twice?",
      ]}
      caption={
        <div className="space-y-2">
          <p>
            The <strong>engine</strong> shows who: <Es>ir</Es> → <Es>{built.engine}</Es> for <Es>{who.es}</Es>. The coupling <Es>a</Es> never
            changes, and the wagon stays an infinitive (<Es>{reflexive ? verb.inf.slice(0, -2) : verb.inf}</Es>)
            {reflexive ? " — only the reflexive pronoun changes with the person." : " — it never changes."}
          </p>
          {reflexive ? (
            <p>
              <Es>{verb.inf}</Es> is reflexive, so <Es>-se</Es> becomes <Es>{built.pron}</Es> to match <Es>{who.es}</Es>. It can ride in front of
              the engine (<Es>{built.front}</Es>) or be glued onto the end of the infinitive (<Es>{built.attached}</Es>) — same meaning.
            </p>
          ) : null}
          {neg === "yes" ? (
            <p>
              <Es>No</Es> goes in front of the whole verb block{reflexive && pronPos === "front" ? <> — even in front of the pronoun</> : null}.
            </p>
          ) : null}
          {time.es ? (
            <p>
              <Es>{cap(time.es)}</Es> tells the listener this is a plan for the future. Time phrases can go at the start or the end.
            </p>
          ) : (
            <p>Add a time phrase to make it clear <em>when</em> the plan happens.</p>
          )}
        </div>
      }
    >
      <div className="space-y-4">
        <div className="space-y-1">
          <div className="text-sm font-semibold text-ink-2">Who? (the engine)</div>
          <Segmented
            label="Who is going to do it?"
            value={whoId}
            onChange={setWhoId}
            options={WHO.map((w) => ({ value: w.id, label: <span lang="es">{w.es}</span> }))}
          />
        </div>

        <div className="space-y-1">
          <div className="text-sm font-semibold text-ink-2">Which verb? (the wagon)</div>
          <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label="Infinitive">
            {TRAIN_VERBS.map((v) => (
              <button
                key={v.inf}
                type="button"
                role="radio"
                aria-checked={v.inf === inf}
                onClick={() => setInf(v.inf)}
                lang="es"
                className={`min-h-10 rounded-lg border px-2.5 text-sm font-bold transition ${
                  v.inf === inf ? "border-brand bg-brand-soft text-brand" : "border-line bg-surface text-ink-2 hover:text-ink"
                }`}
              >
                {v.inf}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="space-y-1">
            <span className="block text-sm font-semibold text-ink-2">When?</span>
            <select className="input" value={timeIdx} onChange={(e) => setTimeIdx(Number(e.target.value))} aria-label="Time phrase">
              {TRAIN_TIMES.map((t, i) => (
                <option key={t.es || "none"} value={i} lang="es">
                  {t.es || "(no time phrase)"}
                </option>
              ))}
            </select>
          </label>
          <div className="space-y-1">
            <span className="block text-sm font-semibold text-ink-2">Time phrase position</span>
            <Segmented
              label="Time phrase position"
              value={timePos}
              onChange={setTimePos}
              options={[
                { value: "start", label: "start" },
                { value: "end", label: "end" },
              ]}
            />
          </div>
          <div className="space-y-1">
            <span className="block text-sm font-semibold text-ink-2">Negative?</span>
            <Segmented
              label="Negative"
              value={neg}
              onChange={setNeg}
              options={[
                { value: "no", label: "positive" },
                { value: "yes", label: <span lang="es">no…</span> },
              ]}
            />
          </div>
          <div className="space-y-1">
            <span className="block text-sm font-semibold text-ink-2">Show subject pronoun?</span>
            <Segmented
              label="Show subject pronoun"
              value={showSubj}
              onChange={setShowSubj}
              options={[
                { value: "no", label: "drop it" },
                { value: "yes", label: "show it" },
              ]}
            />
          </div>
          {reflexive ? (
            <div className="space-y-1 sm:col-span-2">
              <span className="block text-sm font-semibold text-ink-2">Reflexive pronoun position</span>
              <Segmented
                label="Reflexive pronoun position"
                value={pronPos}
                onChange={setPronPos}
                options={[
                  { value: "end", label: <span lang="es">{built.attached}</span> },
                  { value: "front", label: <span lang="es">{built.front}</span> },
                ]}
              />
            </div>
          ) : null}
        </div>

        <TrainSvg pieces={built.pieces} ariaLabel={aria} />

        <div className="flex items-start gap-3 rounded-xl border border-line bg-surface p-3">
          <div className="min-w-0 flex-1">
            <p lang="es" className="text-lg font-extrabold text-brand">
              {built.es}
            </p>
            <p className="text-sm text-ink-2">{built.en}</p>
          </div>
          <SpeakButton text={built.es} />
        </div>
      </div>
    </WidgetFrame>
  );
}

// ---------------------------------------------------------------------------
// Widget 2: week planner — habit (present) vs plan (near future)
// ---------------------------------------------------------------------------

interface Activity {
  id: string;
  inf: string;
  es: string;
  en: string;
  icon: string;
}

const ACTIVITIES: Activity[] = [
  { id: "tenis", inf: "jugar", es: "al tenis", en: "tennis", icon: "🎾" },
  { id: "playa", inf: "ir", es: "a la playa", en: "to the beach", icon: "🏖️" },
  { id: "abuelos", inf: "visitar", es: "a los abuelos", en: "the grandparents", icon: "👵" },
  { id: "peli", inf: "ver", es: "una película", en: "a film", icon: "🎬" },
  { id: "deberes", inf: "hacer", es: "los deberes", en: "homework", icon: "📚" },
  { id: "compras", inf: "ir", es: "de compras", en: "shopping", icon: "🛍️" },
  { id: "piscina", inf: "nadar", es: "en la piscina", en: "in the pool", icon: "🏊" },
  { id: "casa", inf: "quedarse", es: "en casa", en: "at home", icon: "🏠" },
  { id: "bici", inf: "montar", es: "en bici", en: "a bike", icon: "🚲" },
  { id: "paella", inf: "cocinar", es: "una paella de verduras", en: "a vegetable paella", icon: "🥘" },
  { id: "amigos", inf: "salir", es: "con amigos", en: "with friends", icon: "🎉" },
];

const WEEKDAYS: { es: string; pl: string; en: string; short: string }[] = [
  { es: "lunes", pl: "lunes", en: "Monday", short: "L" },
  { es: "martes", pl: "martes", en: "Tuesday", short: "M" },
  { es: "miércoles", pl: "miércoles", en: "Wednesday", short: "X" },
  { es: "jueves", pl: "jueves", en: "Thursday", short: "J" },
  { es: "viernes", pl: "viernes", en: "Friday", short: "V" },
  { es: "sábado", pl: "sábados", en: "Saturday", short: "S" },
  { es: "domingo", pl: "domingos", en: "Sunday", short: "D" },
];

const PLANNER_WHO: { id: string; p: Person; es: string; en: string }[] = [
  { id: "yo", p: "yo", es: "", en: "I" },
  { id: "familia", p: "nosotros", es: "mi familia y yo", en: "my family and I" },
  { id: "hermana", p: "él", es: "mi hermana", en: "my sister" },
];

/** Day index 0 = today (Monday 16 November) … 13 = Sunday of next week. */
function planTime(day: number, next: "que" | "proximo"): { es: string; en: string } {
  const wd = WEEKDAYS[day % 7];
  if (day === 0) return { es: "hoy", en: "today" };
  if (day === 1) return { es: "mañana", en: "tomorrow" };
  if (day === 2) return { es: "pasado mañana", en: "the day after tomorrow" };
  if (day < 7) return { es: `este ${wd.es}`, en: `this ${wd.en}` };
  return next === "que" ? { es: `el ${wd.es} que viene`, en: `next ${wd.en}` } : { es: `el próximo ${wd.es}`, en: `next ${wd.en}` };
}

function WeekPlanner() {
  const [whoId, setWhoId] = useState("yo");
  const [mode, setMode] = useState<"plan" | "habit">("plan");
  const [next, setNext] = useState<"que" | "proximo">("que");
  const [selected, setSelected] = useState(5);
  const [plans, setPlans] = useState<Record<number, string>>({ 5: "playa", 12: "abuelos" });
  const [habits, setHabits] = useState<Record<number, string>>({ 5: "tenis" });

  const who = PLANNER_WHO.find((w) => w.id === whoId) ?? PLANNER_WHO[0];
  const selWeekday = selected % 7;

  const assign = (actId: string) => {
    if (mode === "plan") {
      setPlans((prev) => {
        const out = { ...prev };
        if (out[selected] === actId) delete out[selected];
        else out[selected] = actId;
        return out;
      });
    } else {
      setHabits((prev) => {
        const out = { ...prev };
        if (out[selWeekday] === actId) delete out[selWeekday];
        else out[selWeekday] = actId;
        return out;
      });
    }
  };

  const current = mode === "plan" ? plans[selected] : habits[selWeekday];

  const rows = useMemo(() => {
    const out: { key: string; tense: "present" | "near-future"; es: string; en: string; icon: string }[] = [];
    const subjectEs = who.es;
    for (const [wdStr, actId] of Object.entries(habits).sort((a, b) => Number(a[0]) - Number(b[0]))) {
      const act = ACTIVITIES.find((a) => a.id === actId);
      if (!act) continue;
      const wd = WEEKDAYS[Number(wdStr)];
      const verb = conjugate(act.inf, "present", who.p);
      const es = cap(join(`los ${wd.pl}`, subjectEs, verb, act.es)) + ".";
      const en = `On ${wd.en}s ${join(who.en, glossVerb(act.inf, "present", who.p), act.en)}.`;
      out.push({ key: `h${wdStr}`, tense: "present", es, en, icon: act.icon });
    }
    for (const [dayStr, actId] of Object.entries(plans).sort((a, b) => Number(a[0]) - Number(b[0]))) {
      const act = ACTIVITIES.find((a) => a.id === actId);
      if (!act) continue;
      const t = planTime(Number(dayStr), next);
      const verb = conjugate(act.inf, "near-future", who.p);
      const es = cap(join(t.es, subjectEs, verb, act.es)) + ".";
      const en = `${cap(t.en)}, ${join(who.en, glossVerb(act.inf, "near-future", who.p), act.en)}.`;
      out.push({ key: `p${dayStr}`, tense: "near-future", es, en, icon: act.icon });
    }
    return out;
  }, [habits, plans, who, next]);

  const selTime = planTime(selected, next);
  const wd = WEEKDAYS[selWeekday];
  const planCount = Object.keys(plans).length;
  const habitCount = Object.keys(habits).length;
  const sameDayContrast = mode === "plan" ? habits[selWeekday] : Object.entries(plans).find(([d]) => Number(d) % 7 === selWeekday)?.[1];

  return (
    <WidgetFrame
      title="Week planner: habits vs plans"
      tryThis={[
        "Saturday already has a habit (*los sábados*) and two one-off plans. Read the three sentences: which verbs are present and which use *ir a*?",
        "Tap tomorrow and the day after. Which time phrases appear? Now tap a day next week and switch *que viene* ↔ *próximo*.",
        "Switch to *mi familia y yo*. Predict the new verb forms before you look: *juego* → ?, *voy a ir* → ?",
        "Make Wednesday a habit and add a plan for next Wednesday. Write both sentences in your book and say them aloud.",
      ]}
      caption={
        <div className="space-y-2">
          {mode === "plan" ? (
            <p>
              <Es>{cap(selTime.es)}</Es> is <strong>one</strong> day still to come, so a plan for it uses <Es>ir a</Es> + infinitive (near future).
              {selected === 0 ? <> (<Es>Hoy</Es> + <Es>voy a…</Es> = what you&apos;re going to do later today.)</> : null}
            </p>
          ) : (
            <p>
              <Es>Los {wd.pl}</Es> (plural) means <strong>every</strong> {wd.en} — a habit — so the verb is in the <strong>present</strong> tense.
            </p>
          )}
          {sameDayContrast ? (
            <p>
              Same day of the week, different time frame: <Es>los {wd.pl}</Es> + present (habit) vs{" "}
              <Es>{mode === "plan" ? selTime.es : `este ${wd.es} / el ${wd.es} que viene`}</Es> + <Es>ir a</Es> (one plan).
            </p>
          ) : null}
          <p>
            Rule of thumb: <Es>el sábado</Es> / <Es>este sábado</Es> (singular) = one occasion → can be future; <Es>los sábados</Es> (plural) =
            every week → present.
          </p>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <Segmented
            label="Who?"
            value={whoId}
            onChange={setWhoId}
            options={PLANNER_WHO.map((w) => ({ value: w.id, label: <span lang="es">{w.es || "yo"}</span> }))}
          />
          <Segmented
            label="What are you adding?"
            value={mode}
            onChange={setMode}
            options={[
              { value: "plan", label: "one-off plan" },
              { value: "habit", label: "every week (habit)" },
            ]}
          />
        </div>

        <div>
          <div className="mb-1 flex items-baseline justify-between text-sm">
            <span className="font-semibold text-ink-2" lang="es">
              noviembre
            </span>
            <span className="text-xs text-ink-2">Today = lunes 16</span>
          </div>
          <div className="grid grid-cols-7 gap-1" role="group" aria-label="Two-week calendar: tap a day">
            {WEEKDAYS.map((w, i) => (
              <div
                key={w.es}
                className={`text-center text-xs font-extrabold ${mode === "habit" && i === selWeekday ? "text-brand" : "text-ink-2"}`}
                aria-hidden
              >
                {w.short}
              </div>
            ))}
            {Array.from({ length: 14 }, (_, day) => {
              const planAct = ACTIVITIES.find((a) => a.id === plans[day]);
              const habitAct = ACTIVITIES.find((a) => a.id === habits[day % 7]);
              const isSel = mode === "plan" ? day === selected : day % 7 === selWeekday;
              const t = planTime(day, next);
              const label = `${WEEKDAYS[day % 7].es} ${16 + day}${day < 3 ? ` (${t.es})` : ""}${habitAct ? `, habit: ${habitAct.inf} ${habitAct.es}` : ""}${planAct ? `, plan: ${planAct.inf} ${planAct.es}` : ""}`;
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => setSelected(day)}
                  aria-pressed={isSel}
                  aria-label={label}
                  className={`flex min-h-12 flex-col items-center justify-start rounded-lg border px-0.5 py-1 text-xs transition ${
                    isSel ? "border-brand bg-brand-soft" : day === 0 ? "border-accent bg-accent-soft" : "border-line bg-surface hover:bg-surface-2"
                  }`}
                >
                  <span className={`font-bold tabular-nums ${isSel ? "text-brand" : "text-ink"}`}>{16 + day}</span>
                  <span aria-hidden className="leading-none">
                    {habitAct ? <span className="opacity-60">{habitAct.icon}</span> : null}
                    {planAct ? planAct.icon : null}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="mt-1 text-xs text-ink-2">
            Faded icon = weekly habit · bright icon = one-off plan. {mode === "habit" ? "In habit mode a tap picks the whole weekday column." : null}
          </p>
        </div>

        <div className="space-y-1">
          <div className="text-sm font-semibold text-ink-2">
            {mode === "plan" ? (
              <>
                Plan for <Es>{selTime.es}</Es> ({WEEKDAYS[selWeekday].es} {16 + selected}):
              </>
            ) : (
              <>
                Habit for <Es>los {wd.pl}</Es>:
              </>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label="Activity">
            {ACTIVITIES.map((a) => (
              <button
                key={a.id}
                type="button"
                role="radio"
                aria-checked={current === a.id}
                onClick={() => assign(a.id)}
                lang="es"
                className={`min-h-10 rounded-lg border px-2.5 text-sm font-bold transition ${
                  current === a.id ? "border-brand bg-brand-soft text-brand" : "border-line bg-surface text-ink-2 hover:text-ink"
                }`}
              >
                <span aria-hidden>{a.icon}</span> {a.inf} {a.es}
              </button>
            ))}
          </div>
          <p className="text-xs text-ink-2">Tap an activity again to remove it.</p>
        </div>

        {mode === "plan" && selected >= 7 ? (
          <Segmented
            label="How to say next"
            value={next}
            onChange={setNext}
            options={[
              { value: "que", label: <span lang="es">el {wd.es} que viene</span> },
              { value: "proximo", label: <span lang="es">el próximo {wd.es}</span> },
            ]}
          />
        ) : null}

        <div className="grid grid-cols-2 gap-2">
          <Readout label="Habits (present)" value={habitCount} tone="ink" />
          <Readout label="Plans (ir a + inf.)" value={planCount} tone="brand" />
        </div>

        <ul className="space-y-2" aria-label="Your sentences">
          {rows.length === 0 ? <li className="text-sm text-ink-2">Tap a day, then an activity, to make a sentence.</li> : null}
          {rows.map((r) => (
            <li key={r.key} className="flex items-start gap-3 rounded-xl border border-line bg-surface p-3">
              <span aria-hidden className="text-xl leading-none">
                {r.icon}
              </span>
              <div className="min-w-0 flex-1">
                <span className={`chip mb-1 ${r.tense === "present" ? "" : "border-brand bg-brand-soft text-brand"}`}>
                  {r.tense === "present" ? "present · habit" : "near future · plan"}
                </span>
                <p lang="es" className="font-bold text-ink">
                  {r.es}
                </p>
                <p className="text-sm text-ink-2">{r.en}</p>
              </div>
              <SpeakButton text={r.es} />
            </li>
          ))}
        </ul>
      </div>
    </WidgetFrame>
  );
}

export const widgets: WidgetDef[] = [
  {
    id: "near-future-train",
    title: "The near-future train",
    blurb: "Couple a person, ir, a and an infinitive (plus a time phrase) and watch the sentence build — with both reflexive pronoun positions.",
    Component: NearFutureTrain,
  },
  {
    id: "week-planner",
    title: "Week planner: los sábados vs este sábado",
    blurb: "Tap days on a two-week calendar to add habits and plans, and see present-tense habits next to ir a + infinitive plans.",
    Component: WeekPlanner,
  },
];
