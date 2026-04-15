import type { Mode } from "../data/noteMap";
import styles from "./ModeSwitch.module.css";

const MODES: { value: Mode; label: string }[] = [
  { value: "simple", label: "Simple" },
  { value: "fifths", label: "Full (fifths)" },
];

interface ModeSwitchProps {
  mode: Mode;
  onChange: (mode: Mode) => void;
}

export function ModeSwitch({ mode, onChange }: ModeSwitchProps) {
  return (
    <div className={styles.switcher}>
      {MODES.map((m) => (
        <button
          key={m.value}
          className={`${styles.option} ${m.value === mode ? styles.active : ""}`}
          onClick={() => onChange(m.value)}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}
