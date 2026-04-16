export type Mode = "simple" | "fifths" | "fourths";

export interface NoteInfo {
  qwertyKey: string;
  keyLabel: string;
  note: string;
  frequency: number;
  isOpenString: boolean;
}

const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const MAJOR_SCALE = [0, 2, 4, 5, 7, 9, 11];

export const TONICS = NOTE_NAMES;

// --- Shared helpers ---

function midiToFreq(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

function midiToName(midi: number): string {
  return `${NOTE_NAMES[midi % 12]}${Math.floor(midi / 12) - 1}`;
}

// --- Simple mode ---

interface KeyDef {
  qwertyKey: string;
  keyLabel: string;
  scaleDegree: number;
  isOpenString: boolean;
}

const SIMPLE_ROWS: KeyDef[][] = [
  [
    { qwertyKey: "1", keyLabel: "1", scaleDegree: 4, isOpenString: false },
    { qwertyKey: "2", keyLabel: "2", scaleDegree: 3, isOpenString: false },
    { qwertyKey: "3", keyLabel: "3", scaleDegree: 2, isOpenString: false },
    { qwertyKey: "4", keyLabel: "4", scaleDegree: 1, isOpenString: false },
    { qwertyKey: "5", keyLabel: "5", scaleDegree: 0, isOpenString: true },
  ],
  [
    { qwertyKey: "q", keyLabel: "Q", scaleDegree: 8, isOpenString: false },
    { qwertyKey: "w", keyLabel: "W", scaleDegree: 7, isOpenString: false },
    { qwertyKey: "e", keyLabel: "E", scaleDegree: 6, isOpenString: false },
    { qwertyKey: "r", keyLabel: "R", scaleDegree: 5, isOpenString: false },
    { qwertyKey: "t", keyLabel: "T", scaleDegree: 4, isOpenString: true },
  ],
  [
    { qwertyKey: "a", keyLabel: "A", scaleDegree: 12, isOpenString: false },
    { qwertyKey: "s", keyLabel: "S", scaleDegree: 11, isOpenString: false },
    { qwertyKey: "d", keyLabel: "D", scaleDegree: 10, isOpenString: false },
    { qwertyKey: "f", keyLabel: "F", scaleDegree: 9, isOpenString: false },
    { qwertyKey: "g", keyLabel: "G", scaleDegree: 8, isOpenString: true },
  ],
  [
    { qwertyKey: "z", keyLabel: "Z", scaleDegree: 16, isOpenString: false },
    { qwertyKey: "x", keyLabel: "X", scaleDegree: 15, isOpenString: false },
    { qwertyKey: "c", keyLabel: "C", scaleDegree: 14, isOpenString: false },
    { qwertyKey: "v", keyLabel: "V", scaleDegree: 13, isOpenString: false },
    { qwertyKey: "b", keyLabel: "B", scaleDegree: 12, isOpenString: true },
  ],
];

function buildSimpleRows(tonicIndex: number): NoteInfo[][] {
  return SIMPLE_ROWS.map((row) =>
    row.map((k) => {
      const octave = Math.floor(k.scaleDegree / 7);
      const semitones = MAJOR_SCALE[k.scaleDegree % 7];
      const midi = 60 + tonicIndex + octave * 12 + semitones;
      return {
        qwertyKey: k.qwertyKey,
        keyLabel: k.keyLabel,
        note: midiToName(midi),
        frequency: midiToFreq(midi),
        isOpenString: k.isOpenString,
      };
    })
  );
}

// --- Full chromatic modes (fifths / fourths) ---

const FULL_QWERTY_ROWS: string[][] = [
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="],
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'"],
  ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"],
];

function keyLabel(key: string): string {
  return key.length === 1 && key >= "a" && key <= "z" ? key.toUpperCase() : key;
}

function buildFullRows(tonicIndex: number, interval: number): NoteInfo[][] {
  const baseMidi = 48 + tonicIndex; // start at octave 3
  const maxLen = Math.max(...FULL_QWERTY_ROWS.map((r) => r.length));
  return FULL_QWERTY_ROWS.map((row, rowIndex) => {
    const rowBase = baseMidi + rowIndex * interval;
    return row.map((key, i) => {
      const semitones = maxLen - 1 - i;
      const midi = rowBase + semitones;
      return {
        qwertyKey: key,
        keyLabel: keyLabel(key),
        note: midiToName(midi),
        frequency: midiToFreq(midi),
        isOpenString: i === interval,
      };
    });
  });
}

// --- Public API ---

export function buildKeyboardRows(mode: Mode, tonicIndex: number): NoteInfo[][] {
  if (mode === "simple") return buildSimpleRows(tonicIndex);
  return buildFullRows(tonicIndex, mode === "fifths" ? 7 : 5);
}

export function buildNoteMap(mode: Mode, tonicIndex: number): Record<string, NoteInfo> {
  return Object.fromEntries(
    buildKeyboardRows(mode, tonicIndex)
      .flat()
      .map((k) => [k.qwertyKey, k])
  );
}
