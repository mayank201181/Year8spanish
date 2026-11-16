# Skill drills spec (procedural question generators) — Spanish

Drills give a learner **unlimited fresh practice** on one fine-grained skill, auto-marked, with a
worked solution — like Language Gym / Conjuguemos. You write `lib/drills/<topicId>.ts`:

    import type { Drill } from "./types.ts";
    import { conjugate, acceptedForms, englishGloss, PERSONS, PERSON_LABEL, verbInfo, VERBS, type Person } from "../spanish/verbs.ts";
    import { vocab } from "../vocab/<topicId>.ts";
    export const drills: Drill[] = [ … ];

Read `lib/drills/types.ts`, `lib/spanish/verbs.ts` (tested conjugator — USE it for every verb form,
never hand-conjugate inside a generator), `lib/vocab/<topicId>.ts` (the topic word list),
`lib/answerCheck.ts` (text answers: case/space/punctuation-insensitive, accent-only differences get
an "almost" nudge), `lib/types.ts` (AnswerSpec `text`) and `docs/CONTENT.md` (house style).

## Requirements
- **8–12 drills per topic**, one per fine-grained skill, covering every non-stretch section of the
  topic (`guideRef` = the section id from `lib/topics/meta.ts`), ordered basic (`level: 1`) →
  harder (`level: 3`). Mix skill types:
  - vocab recall es→en and en→es (from the topic's vocab file; for en→es accept the item with and
    without its article only if the prompt doesn't ask for the article — say clearly "Include
    el/la/los/las.");
  - conjugation for a random person (present / near future / preterite, as the topic needs) using
    `acceptedForms` for the answer;
  - gap-fill sentence frames built from templates with slots (e.g. "*Mi hermano ___ (levantarse) a las siete.*");
  - transformations (yo → él, present → near future, singular → plural agreement, add *al/a la*);
  - short build-a-sentence translations from small, fully-enumerable templates (list every
    accepted variant: subject pronoun optional, time phrase at start or end, etc.);
  - topic-specific generators (telling the time from a random time; weather from a symbol; directions;
    numbers/prices for pocket money; adjective agreement with random nouns of known gender).
- `id`: `"<topicId>.<kebab-skill>"`; `topicId` set; a clear English `title` ("Reflexive verbs: present tense").
- `generate(rng, tier)` must be **pure and deterministic** given the rng (only `rng.*` for randomness).
  `tier` 1 = common/regular items, 2 = typical Year 8 (stem-changers, irregulars, all persons),
  3 = stretch (multi-step, longer sentences, mixed tenses).
- No `{{ }}` markup. Prompts are English instructions with Spanish in *italics*.
- `answer`: `{ type: "text", accept: [...] }` listing ALL acceptable variants. `solution`: 2–4 short
  steps (infinitive → stem → ending → answer). `hint`: one strategic nudge. `traps`: 1–2 predictable
  wrong answers with targeted feedback (guard so a trap never equals an accepted answer, and never
  differs from an accepted answer only by accents — those are already caught as "check accents").
- Vary templates (3–6) so items don't feel repetitive. Vegetarian food. Spain-standard Spanish.

## Validation (mandatory)

    node scripts/validate-drills.ts <topicId>
    node scripts/typecheck-file.mjs lib/drills/<topicId>.ts

The validator runs every drill 200× per tier, checks text, answer self-consistency, traps and
variety, and prints samples — **read the samples and check the Spanish yourself**. Fix everything.
Do NOT run `npm run build`, `next build` or `npm install`. Edit only your files.
