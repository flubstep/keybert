import { KEYBOARD_ROWS, resolveKey } from "../data/noteMap";
import { Key } from "./Key";
import styles from "./Keyboard.module.css";

const ROW_OFFSETS = [0, 0.5, 0.75, 1.25];

interface KeyboardProps {
  activeKeys: Set<string>;
  tonicIndex: number;
}

export function Keyboard({ activeKeys, tonicIndex }: KeyboardProps) {
  return (
    <div className={styles.keyboard}>
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={styles.row}
          style={{ paddingLeft: `${ROW_OFFSETS[rowIndex] * 56}px` }}
        >
          {row.map((keyDef) => (
            <Key
              key={keyDef.qwertyKey}
              noteInfo={resolveKey(keyDef, tonicIndex)}
              isActive={activeKeys.has(keyDef.qwertyKey)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
