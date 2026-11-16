// ---------------------------------------------------------------------------
// REFERENCE EXAMPLE for content authors — shows the exact shape of the
// per-topic files. NOT imported by the app.
//
//   lib/topics/<id>/guide.ts      → export const guide: TopicGuide
//   lib/vocab/<id>.ts             → export const vocab: VocabGroup[]
//   lib/topics/<id>/mcq.ts        → export const mcqPapers: Paper[]        (m1–m3 × 15 MCQs)
//   lib/topics/<id>/practice.ts   → export const practice: TopicPractice   (quiz 10, p1–p2 × 15, challenge 8)
//   lib/topics/<id>/practice2.ts  → export const morePapers: Paper[]       (p3 × 15)
//
// Import types with a .ts extension and `import type` (files are also loaded
// directly by Node for validation):  import type { … } from "../../types.ts";
// ---------------------------------------------------------------------------
import type { Paper, TopicGuide, TopicPractice, VocabGroup } from "./../types.ts";

// ============================== guide.ts ===================================
export const guide: TopicGuide = {
  id: "example",
  title: "Los deportes — Sport",
  strand: "Free Time",
  icon: "⚽",
  summary: "Juego, hago, practico — and how often.",
  intro:
    "Spanish has three verbs for doing sport. Pick the right one and you'll sound natural straight away — then add how often and what you think of it.",
  guide: [
    {
      id: "jugar-hacer-practicar",
      heading: "Jugar a, hacer and practicar",
      discovery: {
        problem:
          "Look at these sentences:\n\n    Juego al fútbol.\n    Juego al tenis.\n    Hago natación.\n    Hago atletismo.\n\nWhen does a Spanish speaker use *juego* and when *hago*? Write your rule in one sentence.",
        idea:
          "*Jugar* is for **games** — sports you *play* with a ball or against someone. *Hacer* (to do) is for activities you *do*: swimming, athletics, cycling. And *jugar* always needs *a*: *a + el = al*.",
      },
      body:
        "Use **jugar a** for ball games and **hacer** for other sports. *Practicar* works for any sport.\n\n| | jugar (u→ue) | hacer |\n|---|---|---|\n| yo | juego | hago |\n| tú | juegas | haces |\n| él / ella | juega | hace |\n| nosotros | jugamos | hacemos |\n| vosotros | jugáis | hacéis |\n| ellos / ellas | juegan | hacen |\n\n- *a + el = al*: *Juego al baloncesto.*\n- *a + la* stays: *Juego a la petanca.*",
      diagram: `<svg viewBox="0 0 300 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two boxes: jugar a for ball games, hacer for activities"><rect x="10" y="10" width="130" height="100" rx="10" fill="#bae6fd" stroke="#334155"/><text x="75" y="35" font-family="sans-serif" font-size="14" text-anchor="middle">jugar a…</text><text x="75" y="60" font-family="sans-serif" font-size="12" text-anchor="middle">al fútbol</text><text x="75" y="80" font-family="sans-serif" font-size="12" text-anchor="middle">al tenis</text><rect x="160" y="10" width="130" height="100" rx="10" fill="#fde68a" stroke="#334155"/><text x="225" y="35" font-family="sans-serif" font-size="14" text-anchor="middle">hacer…</text><text x="225" y="60" font-family="sans-serif" font-size="12" text-anchor="middle">natación</text><text x="225" y="80" font-family="sans-serif" font-size="12" text-anchor="middle">atletismo</text></svg>`,
      diagramCaption: "Games → jugar a. Activities → hacer.",
      workedExamples: [
        {
          title: "Choose the verb",
          problem: "Say 'We play basketball' in Spanish.",
          steps: ["Basketball is a ball game → *jugar a*.", "*nosotros* form of *jugar*: *jugamos* (no stem change in the *nosotros* form).", "*a + el baloncesto* → *al baloncesto*."],
          answer: "*Jugamos al baloncesto.*",
          yourTurn: {
            question: "Your turn: write 'I go swimming' (literally 'I do swimming') in Spanish.",
            answer: { type: "text", accept: ["hago natación", "yo hago natación", "practico la natación", "practico natación"] },
            solution: "Swimming is an activity, not a game → *hacer*: **Hago natación.**",
          },
        },
      ],
      keyPoints: ["*jugar a* + ball games (*al fútbol*).", "*hacer* + activities (*natación*).", "*a + el = al*."],
      whyItWorks:
        "*Jugar* means 'to play' a game, so it needs a game to play *at* — that's why *a* follows it. Swimming isn't a game, so you *do* it, just like 'do athletics' in English.",
      strategies: ["Look for the pattern", "Check the subject"],
      thinkDeeper: "Why might someone say *practico el fútbol* instead of *juego al fútbol*? What does it suggest?",
    },
  ],
  learn: {
    flashcards: [{ front: "juego al fútbol", back: "I play football" }],
    mustKnow: ["I can choose between *jugar a* and *hacer* for a sport."],
    misconceptions: [{ wrong: "*Juego fútbol.*", right: "*Juego **al** fútbol.* — *jugar* needs *a* (Spain)." }],
    examMistakes: ["Forgetting the stem change: *jugo* instead of *juego*."],
    mnemonics: [{ topic: "a + el", device: "A-L the time", explanation: "*a + el* always squashes into *al*." }],
    realWorld: [{ title: "La Liga", detail: "Football in Spain is played in La Liga: *¿Juegas al fútbol? ¿De qué equipo eres?*", emoji: "⚽" }],
    videos: [{ title: "Sports in Spanish", channel: "Language Gym", url: "https://www.youtube.com/results?search_query=sports+in+spanish+jugar+hacer" }],
    formulas: [{ name: "Ball games", formula: "jugar (juego…) + a + el/la + sport", note: "Juego al tenis." }],
  },
};

// ============================== lib/vocab/<id>.ts ===========================
export const vocab: VocabGroup[] = [
  { title: "Sports", items: [{ es: "el fútbol", en: "football" }, { es: "la natación", en: "swimming" }] },
  { title: "Verbs", items: [{ es: "jugar a", en: "to play (a game/sport)", note: "u→ue: juego" }] },
];

// =============================== mcq.ts ====================================
export const mcqPapers: Paper[] = [
  {
    id: "example-m1",
    title: "MCQ Paper 1",
    questions: [
      {
        kind: "mcq",
        id: "example-m1-q01",
        question: "Choose the correct sentence for 'My sister plays tennis'.",
        options: ["Mi hermana juega al tenis.", "Mi hermana jugar al tenis.", "Mi hermana juega tenis el.", "Mi hermana hace al tenis."],
        answerIndex: 0,
        explanation:
          "*Juega* is the *ella* form of *jugar* (u→ue) and ball games take *al*. *Mi hermana jugar* uses the infinitive instead of conjugating.",
        difficulty: "warmup",
        guideRef: "jugar-hacer-practicar",
        hints: ["Who is doing the action — which form of *jugar*?"],
        strategy: "Check the subject",
      },
    ],
  },
];

// ============================= practice.ts =================================
export const practice: TopicPractice = {
  quiz: [
    {
      kind: "short",
      id: "example-quiz-q01",
      question: "Write the *nosotros* form of *jugar* in the present tense.",
      answer: { type: "text", accept: ["jugamos", "nosotros jugamos"] },
      solution: ["*Jugar* is a boot verb (u→ue), but *nosotros* is outside the boot.", "Stem *jug-* + *-amos* → **jugamos**."],
      traps: [{ spec: { type: "text", accept: ["juegamos"] }, feedback: "No stem change for *nosotros* — it's outside the 'boot'." }],
      difficulty: "core",
      guideRef: "jugar-hacer-practicar",
      hints: ["Is *nosotros* inside or outside the boot?", "Use the normal stem *jug-*."],
    },
  ],
  papers: [
    {
      id: "example-p1",
      title: "Practice Paper 1",
      questions: [
        {
          kind: "written",
          id: "example-p1-q01",
          question: "Write 3 sentences in Spanish about the sports you do: one with *jugar*, one with *hacer*, and an opinion with a reason.",
          marks: 3,
          modelAnswer:
            "*Juego al baloncesto los lunes. Hago natación los fines de semana. Me encanta la natación porque es relajante.* (I play basketball on Mondays. I go swimming at weekends. I love swimming because it's relaxing.)",
          markScheme: [
            { point: "A correct sentence with jugar a/al + sport", keywords: ["juego al", "juego a la", "jugamos al"] },
            { point: "A correct sentence with hacer + activity", keywords: ["hago", "hacemos"] },
            { point: "An opinion with a reason (porque / ya que)", keywords: ["porque", "ya que"] },
          ],
          commonError: "Writing *juego natación*.",
          difficulty: "core",
          guideRef: "jugar-hacer-practicar",
          hints: ["Pick one ball game and one activity.", "Opinion frame: *Me encanta… porque es…*"],
        },
      ],
    },
  ],
  challenge: [],
};
