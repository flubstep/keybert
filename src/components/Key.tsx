import type { NoteInfo } from "../data/noteMap";
import styles from "./Key.module.css";

interface KeyProps {
  noteInfo: NoteInfo;
  isActive: boolean;
}

export function Key({ noteInfo, isActive }: KeyProps) {
  const className = [
    styles.key,
    noteInfo.isOpenString ? styles.openString : "",
    isActive ? styles.active : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className}>
      <span className={styles.label}>{noteInfo.keyLabel}</span>
      <span className={styles.noteName}>{noteInfo.note}</span>
    </div>
  );
}
