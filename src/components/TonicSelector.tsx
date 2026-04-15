import { TONICS } from "../data/noteMap";
import styles from "./TonicSelector.module.css";

interface TonicSelectorProps {
  tonicIndex: number;
  onChange: (index: number) => void;
  disabled?: boolean;
}

export function TonicSelector({ tonicIndex, onChange, disabled }: TonicSelectorProps) {
  return (
    <div className={`${styles.selector} ${disabled ? styles.disabled : ""}`}>
      <label className={styles.label}>Tonic</label>
      <div className={styles.options}>
        {TONICS.map((name, i) => (
          <button
            key={name}
            className={`${styles.option} ${i === tonicIndex ? styles.active : ""}`}
            onClick={() => onChange(i)}
            disabled={disabled}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}
