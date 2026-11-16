// Client-side Spanish text-to-speech via the Web Speech API (no network, no keys).
// Picks the best available Spanish voice: es-ES first, then any es-*.

let cached: SpeechSynthesisVoice | null | undefined;

export function speechAvailable(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window && typeof window.SpeechSynthesisUtterance === "function";
}

function pickVoice(): SpeechSynthesisVoice | null {
  if (cached !== undefined && cached !== null) return cached;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  const es = voices.filter((v) => v.lang.toLowerCase().startsWith("es"));
  const score = (v: SpeechSynthesisVoice) =>
    (v.lang.toLowerCase() === "es-es" ? 4 : 0) + (/google|neural|natural|premium|enhanced|mónica|monica|jorge|lucía|lucia/i.test(v.name) ? 2 : 0) + (v.localService ? 1 : 0);
  cached = es.sort((a, b) => score(b) - score(a))[0] ?? null;
  return cached;
}

/** Speak Spanish text. `slow` gives a learner-friendly pace. Returns false if TTS is unavailable. */
export function speakSpanish(text: string, opts: { slow?: boolean; onEnd?: () => void } = {}): boolean {
  if (!speechAvailable()) return false;
  const synth = window.speechSynthesis;
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text.replace(/[*_`]/g, ""));
  u.lang = "es-ES";
  const v = pickVoice();
  if (v) u.voice = v;
  u.rate = opts.slow ? 0.7 : 0.92;
  if (opts.onEnd) u.onend = opts.onEnd;
  synth.speak(u);
  return true;
}

export function hasSpanishVoice(): boolean {
  return speechAvailable() && !!pickVoice();
}
