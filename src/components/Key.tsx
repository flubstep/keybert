import type { NoteInfo } from "../data/noteMap";
import styles from "./Key.module.css";

const OPEN_STRING_CLASSES: Record<string, string> = {
  "5": styles.stringG,
  "t": styles.stringD,
  "g": styles.stringA,
  "b": styles.stringE,
};

interface KeyProps {
  noteInfo: NoteInfo;
  isActive: boolean;
}

export function Key({ noteInfo, isActive }: KeyProps) {
  const openClass = OPEN_STRING_CLASSES[noteInfo.qwertyKey] ?? "";
  return (
    <div className={`${styles.key} ${openClass} ${isActive ? styles.active : ""}`}>
      <span className={styles.label}>{noteInfo.keyLabel}</span>
      <span className={styles.noteName}>{noteInfo.note}</span>
    </div>
  );
}
