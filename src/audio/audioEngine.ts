let audioCtx: AudioContext | null = null;
const activeNotes = new Map<string, { osc: OscillatorNode; gain: GainNode }>();

function getContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  return audioCtx;
}

export function ensureResumed(): void {
  const ctx = getContext();
  if (ctx.state === "suspended") {
    ctx.resume();
  }
}

export function startNote(key: string, frequency: number): void {
  if (activeNotes.has(key)) return;
  const ctx = getContext();

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "triangle";
  osc.frequency.setValueAtTime(frequency, ctx.currentTime);

  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.02);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();

  activeNotes.set(key, { osc, gain });
}

export function stopNote(key: string): void {
  const note = activeNotes.get(key);
  if (!note) return;

  const ctx = getContext();
  const { osc, gain } = note;

  gain.gain.cancelScheduledValues(ctx.currentTime);
  gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.15);

  osc.stop(ctx.currentTime + 0.15);
  activeNotes.delete(key);
}

export function stopAllNotes(): void {
  for (const key of activeNotes.keys()) {
    stopNote(key);
  }
}
