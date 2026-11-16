// ---------------------------------------------------------------------------
// Fluency sprint: quick-fire Spanish — verb forms and vocabulary.
// Pure (no React) so it can be unit-tested directly by Node.
// Verb forms come from the tested conjugator (lib/spanish/verbs.ts).
// ---------------------------------------------------------------------------
import type { Rng } from "./drills/types.ts";
import type { VocabGroup } from "./types.ts";
import { PERSONS, VERBS, acceptedForms, conjugate, type Person, type Tense } from "./spanish/verbs.ts";

export type SprintMode = "present" | "future" | "preterite" | "vocab" | "mixed";
/** A mode that produces facts directly (everything except "mixed"). */
export type SprintFactMode = Exclude<SprintMode, "mixed">;

export const SPRINT_MODES: readonly SprintMode[] = ["present", "future", "preterite", "vocab", "mixed"];
const FACT_MODES: readonly SprintFactMode[] = ["present", "future", "preterite", "vocab"];

/** Length of a timed sprint. */
export const SPRINT_SECONDS = 60;

export interface SprintModeInfo {
  label: string;
  icon: string;
  description: string;
  /** Two sample prompts. */
  example: string;
}

export const SPRINT_MODE_INFO: Record<SprintMode, SprintModeInfo> = {
  present: {
    label: "Present tense",
    icon: "🔤",
    description: "Regular, stem-changing, reflexive and irregular verbs — any person.",
    example: "*jugar* · nosotros → jugamos",
  },
  future: {
    label: "Going to… (ir a)",
    icon: "🚀",
    description: "The immediate future: the right form of *ir* + *a* + infinitive.",
    example: "*salir* · ellos → van a salir",
  },
  preterite: {
    label: "Preterite (past)",
    icon: "⏪",
    description: "Regular, spelling-change and irregular preterites. Accents count!",
    example: "*hacer* · yo → hice",
  },
  vocab: {
    label: "Vocabulary",
    icon: "🗣️",
    description: "English → Spanish, words and phrases from every Year 8 topic (include el / la for nouns).",
    example: "kitchen → la cocina",
  },
  mixed: {
    label: "Mixed",
    icon: "🎲",
    description: "A bit of everything — the truest test of fluency.",
    example: "*ir* · tú (past) · bedroom → …",
  },
};

export interface SprintItem {
  prompt: string;
  /** Every accepted typed answer (checked with the app's Spanish text checker). */
  answer: string[];
  /** Unused for Spanish (kept for the runner's layout). */
  suffix?: string;
  /** The fact to show after answering, e.g. "jugar · nosotros → jugamos". */
  fact: string;
  mode: SprintFactMode;
}

export function isSprintMode(v: unknown): v is SprintMode {
  return typeof v === "string" && (SPRINT_MODES as readonly string[]).includes(v);
}

export function sprintBestKey(mode: SprintMode): string {
  return `sprint:${mode}`;
}

export function sprintAwardKey(mode: SprintMode, day: string): string {
  return `sprint:${day}:${mode}`;
}

export function sprintStars(score: number): number {
  return Math.max(0, Math.min(5, Math.floor(score / 5)));
}


const PERSON_SHORT: Record<Person, string> = { yo: "yo", "tú": "tú", "él": "él / ella", nosotros: "nosotros", vosotros: "vosotros", ellos: "ellos / ellas" };

function verbItem(rng: Rng, tense: Tense, mode: SprintFactMode): SprintItem {
  for (let i = 0; i < 50; i++) {
    const v = rng.pick(VERBS);
    // vosotros less often (it's the least used person); skip a few rarer verbs in the past.
    const person = rng.bool(0.12) ? "vosotros" : rng.pick(PERSONS.filter((p) => p !== "vosotros"));
    let form: string;
    let accept: string[];
    try {
      form = conjugate(v.inf, tense, person);
      accept = acceptedForms(v.inf, tense, person);
    } catch {
      continue;
    }
    const label = tense === "present" ? "" : tense === "preterite" ? " (past)" : " (going to)";
    return { prompt: `*${v.inf}* · ${PERSON_SHORT[person]}${label}`, answer: accept, fact: `*${v.inf}* · ${PERSON_SHORT[person]} → **${form}**`, mode };
  }
  return { prompt: "*jugar* · yo", answer: ["juego", "yo juego"], fact: "*jugar* · yo → **juego**", mode };
}

let vocabPool: { es: string; en: string }[] = [];
/** Load vocabulary for the vocab mode (call once with VOCAB from the generated registry). */
export function setSprintVocab(groups: Record<string, VocabGroup[]>): void {
  vocabPool = Object.values(groups)
    .flatMap((gs) => gs.flatMap((g) => g.items))
    // Short, single-meaning items work best at speed.
    .filter((it) => it.es.length <= 28 && it.en.length <= 40 && !/[/(]/.test(it.es));
}

function vocabItem(rng: Rng): SprintItem {
  if (!vocabPool.length) return verbItem(rng, "present", "present");
  const it = rng.pick(vocabPool);
  const en = it.en.split(/[;/]/)[0].trim();
  return { prompt: en, answer: [it.es], fact: `${en} → **${it.es}**`, mode: "vocab" };
}

/** One quick fact for a sprint mode ("mixed" picks a random family). */
export function sprintItem(mode: SprintMode, rng: Rng): SprintItem {
  const m: SprintFactMode = mode === "mixed" ? rng.pick(FACT_MODES) : mode;
  if (m === "vocab") return vocabItem(rng);
  return verbItem(rng, m === "future" ? "near-future" : m, m);
}
