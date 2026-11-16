"use client";
// Interactive explorables for "Mi casa — My Home".
// 1. Build-a-home: home type + location + bedrooms + garden + intensifier + 2 adjectives
//    → a live paragraph with article/adjective agreement highlighted, English gloss and 🔊.
// 2. Floor-plan labeller: a two-storey SVG house; explore (tap → Spanish name + floor sentence)
//    or quiz (find the room, then say which planta it is on).
// Verb forms come from the tested conjugator; nouns/adjectives use a small typed lexicon.
import { useState, useMemo, type ReactNode } from "react";
import { WidgetFrame, Stepper, Segmented, Readout, type WidgetDef } from "./kit";
import { speakSpanish } from "@/lib/speech";
import { conjugate, type Person } from "@/lib/spanish/verbs";

type G = "m" | "f";

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const ESTA = conjugate("estar", "present", "él");
const TIENE = conjugate("tener", "present", "él");
const ES = conjugate("ser", "present", "él");

// ---------------------------------------------------------------------------
// Shared bits
// ---------------------------------------------------------------------------

function SpeakButton({ text, label = "Listen in Spanish" }: { text: string; label?: string }) {
  return (
    <button
      type="button"
      onClick={() => speakSpanish(text)}
      aria-label={label}
      title={label}
      className="btn btn-secondary min-h-[40px] min-w-[40px] shrink-0 px-3"
    >
      <span aria-hidden>🔊</span>
    </button>
  );
}

const selectCls = "min-h-[40px] w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm font-semibold text-ink";

function Field({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-semibold text-ink-2">
        {label}
      </label>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// 1. Build-a-home
// ---------------------------------------------------------------------------

interface HomeType {
  id: string;
  es: string;
  g: G;
  en: string;
  prep: "in" | "on";
}
const HOME_TYPES: HomeType[] = [
  { id: "piso", es: "piso", g: "m", en: "flat", prep: "in" },
  { id: "apartamento", es: "apartamento", g: "m", en: "apartment", prep: "in" },
  { id: "casa", es: "casa", g: "f", en: "house", prep: "in" },
  { id: "adosada", es: "casa adosada", g: "f", en: "terraced house", prep: "in" },
  { id: "chalet", es: "chalet", g: "m", en: "detached house", prep: "in" },
  { id: "granja", es: "granja", g: "f", en: "farm", prep: "on" },
];

const LOCATIONS: { id: string; es: string; en: string }[] = [
  { id: "centro", es: "en el centro", en: "in the centre" },
  { id: "afueras", es: "en las afueras", en: "on the outskirts" },
  { id: "campo", es: "en el campo", en: "in the countryside" },
  { id: "costa", es: "en la costa", en: "on the coast" },
  { id: "montana", es: "en la montaña", en: "in the mountains" },
  { id: "pueblo", es: "en un pueblo", en: "in a village" },
  { id: "mar", es: "cerca del mar", en: "near the sea" },
  { id: "playa", es: "cerca de la playa", en: "near the beach" },
  { id: "lejos-ciudad", es: "lejos de la ciudad", en: "far from the city" },
  { id: "lejos-centro", es: "lejos del centro", en: "far from the centre" },
];

interface Adj {
  id: string;
  /** Masculine singular. */
  ms: string;
  /** Feminine singular. */
  fs: string;
  en: string;
  group: string;
}
const a4 = (ms: string, en: string, group: string): Adj => ({ id: ms, ms, fs: ms.slice(0, -1) + "a", en, group });
const a2 = (s: string, en: string, group: string): Adj => ({ id: s, ms: s, fs: s, en, group });
const ADJS: Adj[] = [
  a2("grande", "big", "size"),
  a4("pequeño", "small", "size"),
  a4("moderno", "modern", "age"),
  a4("antiguo", "old", "age"),
  a4("cómodo", "comfortable", "comfort"),
  a4("bonito", "pretty", "looks"),
  a4("feo", "ugly", "looks"),
  a4("luminoso", "bright", "light"),
  a4("oscuro", "dark", "light"),
  a4("tranquilo", "quiet", "noise"),
  a4("blanco", "white", "colour"),
  a2("azul", "blue", "colour"),
];
const adjById = (id: string) => ADJS.find((a) => a.id === id);

const INTENSIFIERS: { id: string; es: string; en: string }[] = [
  { id: "none", es: "", en: "" },
  { id: "un-poco", es: "un poco", en: "a bit" },
  { id: "bastante", es: "bastante", en: "quite" },
  { id: "muy", es: "muy", en: "very" },
  { id: "demasiado", es: "demasiado", en: "too" },
];

interface Who {
  id: string;
  label: string;
  es: string | null;
  en: string;
  p: Person;
}
const WHO: Who[] = [
  { id: "yo", label: "I", es: null, en: "I", p: "yo" },
  { id: "abuela", label: "my gran", es: "Mi abuela", en: "My grandmother", p: "él" },
  { id: "nosotros", label: "we", es: null, en: "We", p: "nosotros" },
  { id: "primos", label: "my cousins", es: "Mis primos", en: "My cousins", p: "ellos" },
];

const NUM_ES = ["", "un", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho"];
const NUM_EN = ["", "one", "two", "three", "four", "five", "six", "seven", "eight"];

/** A piece of the generated paragraph; `hl` marks words that change with agreement. */
interface Seg {
  t: string;
  hl?: "art" | "adj" | "verb" | "num";
}

const HL_CLASS: Record<NonNullable<Seg["hl"]>, string> = {
  art: "rounded bg-brand-soft px-0.5 font-bold text-brand",
  adj: "rounded bg-good-soft px-0.5 font-bold text-good",
  verb: "rounded bg-accent-soft px-0.5 font-bold text-ink",
  num: "rounded bg-surface-2 px-0.5 font-bold text-ink",
};

function BuildAHome() {
  const [who, setWho] = useState("yo");
  const [homeId, setHomeId] = useState("adosada");
  const [locId, setLocId] = useState("afueras");
  const [beds, setBeds] = useState(3);
  const [garden, setGarden] = useState<"si" | "no">("no");
  const [intId, setIntId] = useState("bastante");
  const [adj1Id, setAdj1Id] = useState("moderno");
  const [adj2Id, setAdj2Id] = useState("grande");

  const home = HOME_TYPES.find((h) => h.id === homeId) ?? HOME_TYPES[0];
  const loc = LOCATIONS.find((l) => l.id === locId) ?? LOCATIONS[0];
  const w = WHO.find((x) => x.id === who) ?? WHO[0];
  const int = INTENSIFIERS.find((i) => i.id === intId) ?? INTENSIFIERS[0];
  const adj1 = adjById(adj1Id) ?? ADJS[0];
  const adj2Raw = adjById(adj2Id);
  // Two adjectives from the same group would contradict (grande y pequeño) or repeat.
  const adj2 = adj2Raw && adj2Raw.group !== adj1.group ? adj2Raw : undefined;

  const { segs, plain, english } = useMemo(() => {
    const verb = conjugate("vivir", "present", w.p);
    const art = home.g === "m" ? "un" : "una";
    const agree = (a: Adj) => (home.g === "m" ? a.ms : a.fs);
    const s: Seg[] = [];
    // Sentence 1: Vivo en una casa adosada en las afueras.
    if (w.es) s.push({ t: `${w.es} ` }, { t: verb, hl: "verb" });
    else s.push({ t: cap(verb), hl: "verb" });
    s.push({ t: " en " }, { t: art, hl: "art" }, { t: ` ${home.es} ${loc.es}. ` });
    // Sentence 2: Tiene tres dormitorios (y un jardín). / No tiene jardín.
    s.push({ t: `${cap(TIENE)} ` });
    if (beds === 1) s.push({ t: "un", hl: "num" }, { t: " dormitorio" });
    else s.push({ t: NUM_ES[beds], hl: "num" }, { t: " dormitorios" });
    if (garden === "si") s.push({ t: " y un jardín. " });
    else s.push({ t: `. No ${TIENE} jardín. ` });
    // Sentence 3: Es bastante moderna y grande.
    s.push({ t: `${cap(ES)} ${int.es ? int.es + " " : ""}` }, { t: agree(adj1), hl: "adj" });
    if (adj2) s.push({ t: " y " }, { t: agree(adj2), hl: "adj" });
    s.push({ t: "." });

    const enHome = `${home.prep} ${/^[aeiou]/.test(home.en) ? "an" : "a"} ${home.en}`;
    const en =
      `${w.en} ${w.p === "él" ? "lives" : "live"} ${enHome} ${loc.en}. ` +
      `It has ${NUM_EN[beds]} bedroom${beds === 1 ? "" : "s"}${garden === "si" ? " and a garden" : ""}.` +
      `${garden === "no" ? " It doesn't have a garden." : ""} ` +
      `It's ${int.en ? int.en + " " : ""}${adj1.en}${adj2 ? ` and ${adj2.en}` : ""}.`;
    return { segs: s, plain: s.map((x) => x.t).join("").trim(), english: en };
  }, [w, home, loc, beds, garden, int, adj1, adj2]);

  const gWord = home.g === "m" ? "masculine" : "feminine";
  const twoForm = (a: Adj) => a.ms === a.fs;
  const adjNote = [adj1, ...(adj2 ? [adj2] : [])]
    .map((a) => (twoForm(a) ? `*${a.ms}* never changes for gender` : `*${a.ms}* → *${home.g === "m" ? a.ms : a.fs}*`))
    .join("; ");

  return (
    <WidgetFrame
      title="Build-a-home"
      tryThis={[
        "Switch from *piso* to *casa*. Predict which words will change colour before you click.",
        "Set the bedrooms to 1. What happens to *dormitorios* — and to the number?",
        "Choose *granja*: does *grande* change? Does *bonito*? Why not both?",
        "Turn the garden off. Why does *un* disappear in *No tiene jardín*?",
      ]}
      caption={
        <div className="space-y-2">
          <p>
            <em lang="es">{home.es}</em> is <strong>{gWord}</strong>, so the article is{" "}
            <strong lang="es">{home.g === "m" ? "un" : "una"}</strong> and the adjectives agree:{" "}
            {adjNote.split("*").map((part, i) => (i % 2 ? <em key={i} lang="es">{part}</em> : <span key={i}>{part}</span>))}. The adjectives come{" "}
            <strong>after</strong> <em lang="es">es</em>, and the intensifier{int.es ? <> <em lang="es">{int.es}</em></> : ""} never changes.
          </p>
          <p>
            <em lang="es">Vivo</em> changes with the person (<em lang="es">vivo, vive, vivimos, viven</em>), but{" "}
            <em lang="es">tiene</em> and <em lang="es">es</em> stay the same — their subject is the home, not you.{" "}
            {beds === 1 ? (
              <>With one bedroom, &lsquo;one&rsquo; is <em lang="es">un</em> (never <em lang="es">uno</em>) and the noun stays singular.</>
            ) : (
              <>More than one → plural <em lang="es">dormitorios</em>.</>
            )}
          </p>
        </div>
      }
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1 sm:col-span-2">
          <span className="block text-sm font-semibold text-ink-2">Who lives there?</span>
          <Segmented label="Who lives there?" value={who} onChange={setWho} options={WHO.map((x) => ({ value: x.id, label: x.label }))} />
        </div>
        <Field id="mc-home" label="Type of home">
          <select id="mc-home" className={selectCls} value={homeId} onChange={(e) => setHomeId(e.target.value)} lang="es">
            {HOME_TYPES.map((h) => (
              <option key={h.id} value={h.id}>
                {h.g === "m" ? "un" : "una"} {h.es} ({h.en})
              </option>
            ))}
          </select>
        </Field>
        <Field id="mc-loc" label="Where is it?">
          <select id="mc-loc" className={selectCls} value={locId} onChange={(e) => setLocId(e.target.value)} lang="es">
            {LOCATIONS.map((l) => (
              <option key={l.id} value={l.id}>
                {l.es} ({l.en})
              </option>
            ))}
          </select>
        </Field>
        <div className="rounded-xl border border-line p-2">
          <Stepper label="Bedrooms" value={beds} min={1} max={8} onChange={setBeds} />
        </div>
        <div className="space-y-1">
          <span className="block text-sm font-semibold text-ink-2">Garden?</span>
          <Segmented
            label="Garden?"
            value={garden}
            onChange={setGarden}
            options={[
              { value: "si", label: "sí" },
              { value: "no", label: "no" },
            ]}
          />
        </div>
        <Field id="mc-int" label="Intensifier">
          <select id="mc-int" className={selectCls} value={intId} onChange={(e) => setIntId(e.target.value)} lang="es">
            {INTENSIFIERS.map((i) => (
              <option key={i.id} value={i.id}>
                {i.es ? `${i.es} (${i.en})` : "— none —"}
              </option>
            ))}
          </select>
        </Field>
        <div className="grid grid-cols-2 gap-2">
          <Field id="mc-adj1" label="Adjective 1">
            <select id="mc-adj1" className={selectCls} value={adj1Id} onChange={(e) => setAdj1Id(e.target.value)} lang="es">
              {ADJS.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.ms} ({a.en})
                </option>
              ))}
            </select>
          </Field>
          <Field id="mc-adj2" label="Adjective 2">
            <select id="mc-adj2" className={selectCls} value={adj2 ? adj2Id : "none"} onChange={(e) => setAdj2Id(e.target.value)} lang="es">
              <option value="none">— none —</option>
              {ADJS.filter((a) => a.group !== adj1.group).map((a) => (
                <option key={a.id} value={a.id}>
                  {a.ms} ({a.en})
                </option>
              ))}
            </select>
          </Field>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-line bg-surface p-3">
        <div className="flex items-start gap-3">
          <p lang="es" className="flex-1 text-lg leading-relaxed text-ink" aria-live="polite">
            {segs.map((s, i) => (s.hl ? <span key={i} className={HL_CLASS[s.hl]}>{s.t}</span> : <span key={i}>{s.t}</span>))}
          </p>
          <SpeakButton text={plain} />
        </div>
        <p className="mt-2 text-sm italic text-ink-2">{english}</p>
        <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-ink-2">
          <span className={HL_CLASS.verb}>vivir</span>
          <span className={HL_CLASS.art}>un / una</span>
          <span className={HL_CLASS.num}>number</span>
          <span className={HL_CLASS.adj}>agreeing adjective</span>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <Readout label="Home is" value={`${gWord} singular`} tone="brand" />
        <Readout label="Adjective ending" value={home.g === "m" ? "-o (or no change)" : "-a (or no change)"} tone="good" />
      </div>
    </WidgetFrame>
  );
}

// ---------------------------------------------------------------------------
// 2. Floor-plan labeller
// ---------------------------------------------------------------------------

type Floor = "baja" | "primera" | null;
interface PlanRoom {
  id: string;
  es: string;
  g: G;
  en: string;
  emoji: string;
  floor: Floor;
  x: number;
  y: number;
  w: number;
  h: number;
}
// viewBox 0 0 420 320. House body x 85–345; first floor y 100–180; ground floor y 180–260.
const PLAN: PlanRoom[] = [
  { id: "dormitorio", es: "dormitorio", g: "m", en: "bedroom", emoji: "🛏️", floor: "primera", x: 85, y: 100, w: 90, h: 80 },
  { id: "bano", es: "cuarto de baño", g: "m", en: "bathroom", emoji: "🛁", floor: "primera", x: 175, y: 100, w: 80, h: 80 },
  { id: "despacho", es: "despacho", g: "m", en: "study", emoji: "💻", floor: "primera", x: 255, y: 100, w: 90, h: 80 },
  { id: "balcon", es: "balcón", g: "m", en: "balcony", emoji: "🪴", floor: "primera", x: 345, y: 150, w: 55, h: 30 },
  { id: "cocina", es: "cocina", g: "f", en: "kitchen", emoji: "🍳", floor: "baja", x: 85, y: 180, w: 90, h: 80 },
  { id: "salon", es: "salón", g: "m", en: "living room", emoji: "🛋️", floor: "baja", x: 175, y: 180, w: 110, h: 80 },
  { id: "aseo", es: "aseo", g: "m", en: "toilet", emoji: "🚽", floor: "baja", x: 285, y: 180, w: 60, h: 80 },
  { id: "garaje", es: "garaje", g: "m", en: "garage", emoji: "🚗", floor: "baja", x: 10, y: 195, w: 75, h: 65 },
  { id: "jardin", es: "jardín", g: "m", en: "garden", emoji: "🌳", floor: null, x: 10, y: 262, w: 400, h: 48 },
];
const roomById = (id: string) => PLAN.find((r) => r.id === id) ?? PLAN[0];
const withArt = (r: PlanRoom) => `${r.g === "m" ? "el" : "la"} ${r.es}`;
const FLOOR_ES: Record<"baja" | "primera", string> = { baja: "en la planta baja", primera: "en la primera planta" };
const FLOOR_EN: Record<"baja" | "primera", string> = { baja: "on the ground floor (downstairs)", primera: "on the first floor (upstairs)" };
const UPDOWN: Record<"baja" | "primera", string> = { baja: "abajo", primera: "arriba" };

function roomSentence(r: PlanRoom): string {
  if (!r.floor) return `Hay un ${r.es} delante de la casa.`;
  return `${cap(withArt(r))} ${ESTA} ${FLOOR_ES[r.floor]}.`;
}

/** Fixed quiz order (deterministic — no randomness during render). */
const QUIZ_ORDER = ["cocina", "despacho", "aseo", "dormitorio", "garaje", "salon", "balcon", "bano", "jardin"];

function FloorPlan() {
  const [mode, setMode] = useState<"explore" | "quiz">("explore");
  const [selected, setSelected] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  // Quiz state
  const [qi, setQi] = useState(0);
  const [phase, setPhase] = useState<"find" | "floor" | "done">("find");
  const [wrongId, setWrongId] = useState<string | null>(null);
  const [floorWrong, setFloorWrong] = useState(false);
  const [score, setScore] = useState({ right: 0, tries: 0, streak: 0 });

  const target = roomById(QUIZ_ORDER[qi % QUIZ_ORDER.length]);
  const sel = selected ? roomById(selected) : null;

  function nextQuestion() {
    setQi((i) => i + 1);
    setPhase("find");
    setWrongId(null);
    setFloorWrong(false);
  }

  function tap(id: string) {
    if (mode === "explore") {
      setSelected(id);
      speakSpanish(withArt(roomById(id)));
      return;
    }
    if (phase !== "find") return;
    if (id === target.id) {
      setWrongId(null);
      setPhase(target.floor ? "floor" : "done");
      if (!target.floor) setScore((s) => ({ right: s.right + 1, tries: s.tries + 1, streak: s.streak + 1 }));
    } else {
      setWrongId(id);
      setScore((s) => ({ ...s, tries: s.tries + 1, streak: 0 }));
    }
  }

  function answerFloor(f: "baja" | "primera") {
    if (phase !== "floor") return;
    if (f === target.floor) {
      setFloorWrong(false);
      setPhase("done");
      setScore((s) => ({ right: s.right + 1, tries: s.tries + 1, streak: s.streak + 1 }));
      speakSpanish(roomSentence(target));
    } else {
      setFloorWrong(true);
      setScore((s) => ({ ...s, tries: s.tries + 1, streak: 0 }));
    }
  }

  const highlightId = mode === "explore" ? selected : phase === "find" ? wrongId : target.id;
  const fillFor = (r: PlanRoom) => {
    if (mode === "explore") return r.id === selected ? "fill-brand-soft" : r.id === "jardin" ? "fill-good-soft" : "fill-surface";
    if (r.id === highlightId) return phase === "find" ? "fill-bad-soft" : "fill-good-soft";
    return r.id === "jardin" ? "fill-good-soft" : "fill-surface";
  };
  const showLabel = (r: PlanRoom) =>
    mode === "explore" ? showAll || r.id === selected : phase !== "find" && r.id === target.id;

  const svgLabel =
    "Cross-section of a two-storey house. First floor: bedroom, bathroom and study, with a balcony on the right. Ground floor: kitchen, living room and toilet, with a garage on the left and a garden in front. " +
    (mode === "explore"
      ? sel
        ? `Selected: ${withArt(sel)}, the ${sel.en}.`
        : "No room selected."
      : `Quiz: find ${withArt(target)}.`);

  return (
    <WidgetFrame
      title="Floor-plan labeller"
      tryThis={[
        "Before you tap, predict: is *el despacho* *arriba* or *abajo*?",
        "Find the only room on the plan that takes *la*. Why is it the odd one out?",
        "Quiz mode: get 5 in a row without a mistake.",
        "In a Singapore lift, Level 2 is one floor above the ground. Which *planta* is that in Spain?",
      ]}
      caption={
        <div className="space-y-2">
          {mode === "explore" && sel ? (
            <p>
              <strong lang="es">{cap(withArt(sel))}</strong> = the {sel.en}.{" "}
              {sel.floor ? (
                <>
                  It is <em lang="es">{FLOOR_ES[sel.floor]}</em> — {FLOOR_EN[sel.floor]}, or simply <em lang="es">{UPDOWN[sel.floor]}</em>. A particular room + where it
                  is → <em lang="es">está</em>.
                </>
              ) : (
                <>
                  It isn&rsquo;t on a floor — it&rsquo;s outside, so just say what there is: <em lang="es">hay un jardín</em>.
                </>
              )}
            </p>
          ) : (
            <p>
              <em lang="es">La planta baja</em> (the &lsquo;low floor&rsquo;) is the ground floor — Level 1 in Singapore. <em lang="es">La primera planta</em> is the first floor{" "}
              <strong>above</strong> it. Say where a room is with <em lang="es">está</em>: <em lang="es">La cocina está en la planta baja.</em>
            </p>
          )}
          <p className="text-ink-2">
            Almost every room is masculine (<em lang="es">el</em>) — only <em lang="es">la cocina</em> ends in <em lang="es">-a</em>. <em lang="es">Arriba</em> = upstairs,{" "}
            <em lang="es">abajo</em> = downstairs.
          </p>
        </div>
      }
    >
      <div className="flex flex-wrap items-center gap-3">
        <Segmented
          label="Mode"
          value={mode}
          onChange={(m) => {
            setMode(m);
            setSelected(null);
            setPhase("find");
            setWrongId(null);
            setFloorWrong(false);
          }}
          options={[
            { value: "explore", label: "Explore" },
            { value: "quiz", label: "Quiz" },
          ]}
        />
        {mode === "explore" ? (
          <label className="flex min-h-[40px] items-center gap-2 text-sm font-semibold text-ink-2">
            <input type="checkbox" checked={showAll} onChange={(e) => setShowAll(e.target.checked)} className="h-5 w-5" />
            Show all labels
          </label>
        ) : (
          <span className="text-sm font-semibold text-ink-2" aria-live="polite">
            Score {score.right}/{score.tries} · streak {score.streak}
          </span>
        )}
      </div>

      {mode === "quiz" ? (
        <div className="mt-3 rounded-xl bg-brand-soft p-3 text-ink" aria-live="polite">
          {phase === "find" ? (
            <p className="text-base">
              Toca: <strong lang="es" className="text-brand">{withArt(target)}</strong>
              {wrongId ? (
                <span className="ml-2 text-sm text-bad">
                  Not quite — that&rsquo;s <span lang="es">{withArt(roomById(wrongId))}</span> ({roomById(wrongId).en}). Try again.
                </span>
              ) : null}
            </p>
          ) : phase === "floor" ? (
            <div className="space-y-2">
              <p>
                ✓ Yes, that&rsquo;s <span lang="es">{withArt(target)}</span> ({target.en}). Now: <strong lang="es">¿En qué planta está?</strong>
              </p>
              <div className="flex flex-wrap gap-2">
                {(["baja", "primera"] as const).map((f) => (
                  <button key={f} type="button" className="btn btn-secondary min-h-[40px]" onClick={() => answerFloor(f)} lang="es">
                    {FLOOR_ES[f]}
                  </button>
                ))}
              </div>
              {floorWrong ? (
                <p className="text-sm text-bad">
                  Look at the plan again: is it upstairs (<span lang="es">arriba</span>) or downstairs (<span lang="es">abajo</span>)?
                </p>
              ) : null}
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-3">
              <p lang="es" className="flex-1 font-bold text-good">
                {roomSentence(target)}
              </p>
              <SpeakButton text={roomSentence(target)} />
              <button type="button" className="btn btn-primary min-h-[40px]" onClick={nextQuestion}>
                Next →
              </button>
            </div>
          )}
        </div>
      ) : null}

      <svg viewBox="0 0 420 320" className="mt-3 h-auto w-full" role="img" aria-label={svgLabel}>
        {/* roof */}
        <polygon points="75,100 215,30 355,100" className="fill-accent-soft stroke-ink" strokeWidth={2} />
        {/* garage roof */}
        <rect x={6} y={187} width={83} height={8} className="fill-accent-soft stroke-ink" strokeWidth={1.5} />
        {PLAN.map((r) => (
          <g key={r.id} onClick={() => tap(r.id)} className="cursor-pointer" aria-hidden>
            <rect x={r.x} y={r.y} width={r.w} height={r.h} className={`${fillFor(r)} stroke-ink`} strokeWidth={r.id === "balcon" ? 1.5 : 2} />
            {r.id === "balcon" ? (
              <g className="stroke-ink" strokeWidth={1.5}>
                {[355, 366, 377, 388].map((x) => (
                  <line key={x} x1={x} y1={152} x2={x} y2={180} />
                ))}
              </g>
            ) : null}
            <text x={r.x + r.w / 2} y={r.id === "jardin" ? r.y + 22 : r.y + (r.id === "balcon" ? 12 : 34)} textAnchor="middle" fontSize={r.id === "balcon" ? 14 : 22}>
              {r.emoji}
            </text>
            {showLabel(r) ? (
              <text
                x={r.x + r.w / 2}
                y={r.id === "jardin" ? r.y + 40 : r.id === "balcon" ? r.y - 6 : r.y + 60}
                textAnchor="middle"
                fontSize={r.w < 70 ? 10 : 12}
                fontWeight="bold"
                className="fill-ink"
                lang="es"
              >
                {withArt(r)}
              </text>
            ) : null}
          </g>
        ))}
        {/* floor labels */}
        <text x={382} y={118} textAnchor="middle" fontSize={11} className="fill-ink-2">
          primera
        </text>
        <text x={382} y={131} textAnchor="middle" fontSize={11} className="fill-ink-2">
          planta
        </text>
        <text x={382} y={214} textAnchor="middle" fontSize={11} className="fill-ink-2">
          planta
        </text>
        <text x={382} y={227} textAnchor="middle" fontSize={11} className="fill-ink-2">
          baja
        </text>
      </svg>

      {/* Accessible, touch-friendly room buttons (same action as tapping the plan). */}
      <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Rooms">
        {PLAN.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => tap(r.id)}
            aria-pressed={mode === "explore" ? r.id === selected : undefined}
            className={`btn min-h-[40px] px-3 text-sm ${mode === "explore" && r.id === selected ? "btn-primary" : "btn-secondary"}`}
          >
            <span aria-hidden>{r.emoji}</span> {r.en}
          </button>
        ))}
      </div>

      {mode === "explore" && sel ? (
        <div className="mt-3 flex items-center gap-3 rounded-xl border border-line bg-surface p-3">
          <p lang="es" className="flex-1 text-lg font-bold text-ink">
            {roomSentence(sel)}
          </p>
          <SpeakButton text={roomSentence(sel)} />
        </div>
      ) : null}
    </WidgetFrame>
  );
}

export const widgets: WidgetDef[] = [
  {
    id: "mi-casa-build-a-home",
    title: "Build-a-home",
    blurb: "Pick a home, a place, the rooms and two adjectives — watch un/una and the adjective endings agree live.",
    Component: BuildAHome,
  },
  {
    id: "mi-casa-floor-plan",
    title: "Floor-plan labeller",
    blurb: "Tap the rooms of a two-storey house to hear their Spanish names, then quiz yourself: which room, and which planta?",
    Component: FloorPlan,
  },
];
