export interface KeyDef {
  qwertyKey: string;
  keyLabel: string;
  scaleDegree: number; // 0 = tonic, counting up the major scale
}

export interface NoteInfo extends KeyDef {
  note: string;
  frequency: number;
}

const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const MAJOR_SCALE = [0, 2, 4, 5, 7, 9, 11]; // semitones from tonic

export const TONICS = NOTE_NAMES;

// Grid rows with scale degrees (0 = tonic)
export const KEYBOARD_ROWS: KeyDef[][] = [
  // Row 1: 1 2 3 4 5
  [
    { qwertyKey: "1", keyLabel: "1", scaleDegree: 4 },
    { qwertyKey: "2", keyLabel: "2", scaleDegree: 3 },
    { qwertyKey: "3", keyLabel: "3", scaleDegree: 2 },
    { qwertyKey: "4", keyLabel: "4", scaleDegree: 1 },
    { qwertyKey: "5", keyLabel: "5", scaleDegree: 0 },
  ],
  // Row 2: q w e r t
  [
    { qwertyKey: "q", keyLabel: "Q", scaleDegree: 8 },
    { qwertyKey: "w", keyLabel: "W", scaleDegree: 7 },
    { qwertyKey: "e", keyLabel: "E", scaleDegree: 6 },
    { qwertyKey: "r", keyLabel: "R", scaleDegree: 5 },
    { qwertyKey: "t", keyLabel: "T", scaleDegree: 4 },
  ],
  // Row 3: a s d f g
  [
    { qwertyKey: "a", keyLabel: "A", scaleDegree: 12 },
    { qwertyKey: "s", keyLabel: "S", scaleDegree: 11 },
    { qwertyKey: "d", keyLabel: "D", scaleDegree: 10 },
    { qwertyKey: "f", keyLabel: "F", scaleDegree: 9 },
    { qwertyKey: "g", keyLabel: "G", scaleDegree: 8 },
  ],
  // Row 4: z x c v b
  [
    { qwertyKey: "z", keyLabel: "Z", scaleDegree: 16 },
    { qwertyKey: "x", keyLabel: "X", scaleDegree: 15 },
    { qwertyKey: "c", keyLabel: "C", scaleDegree: 14 },
    { qwertyKey: "v", keyLabel: "V", scaleDegree: 13 },
    { qwertyKey: "b", keyLabel: "B", scaleDegree: 12 },
  ],
];

const ALL_KEYS = KEYBOARD_ROWS.flat();

/** Compute MIDI note number for a scale degree given a tonic (0=C, 1=C#, ..., 11=B) */
function midiForDegree(tonicIndex: number, scaleDegree: number): number {
  const octave = Math.floor(scaleDegree / 7);
  const semitones = MAJOR_SCALE[scaleDegree % 7];
  return 60 + tonicIndex + octave * 12 + semitones; // 60 = C4
}

/** Convert MIDI note to frequency */
function midiToFreq(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

/** Convert MIDI note to name like "C4" */
function midiToName(midi: number): string {
  const name = NOTE_NAMES[midi % 12];
  const octave = Math.floor(midi / 12) - 1;
  return `${name}${octave}`;
}

/** Resolve a key definition to full note info for a given tonic */
export function resolveKey(key: KeyDef, tonicIndex: number): NoteInfo {
  const midi = midiForDegree(tonicIndex, key.scaleDegree);
  return {
    ...key,
    note: midiToName(midi),
    frequency: midiToFreq(midi),
  };
}

/** Build a lookup map from qwerty key to NoteInfo for a given tonic */
export function buildNoteMap(tonicIndex: number): Record<string, NoteInfo> {
  return Object.fromEntries(
    ALL_KEYS.map((k) => [k.qwertyKey, resolveKey(k, tonicIndex)])
  );
}
