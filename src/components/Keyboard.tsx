import type { NoteInfo } from "../data/noteMap";
import { Key } from "./Key";
import styles from "./Keyboard.module.css";

const ROW_OFFSETS = [0, 0.5, 0.75, 1.25];

interface KeyboardProps {
  activeKeys: Set<string>;
  rows: NoteInfo[][];
}

export function Keyboard({ activeKeys, rows }: KeyboardProps) {
  return (
    <div className={styles.keyboard}>
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={styles.row}
          style={{ paddingLeft: `${ROW_OFFSETS[rowIndex] * 56}px` }}
        >
          {row.map((noteInfo) => (
            <Key
              key={noteInfo.qwertyKey}
              noteInfo={noteInfo}
              isActive={activeKeys.has(noteInfo.qwertyKey)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
