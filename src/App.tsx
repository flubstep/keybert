import { useMemo, useState } from "react";
import { useKeyboard } from "./hooks/useKeyboard";
import { buildNoteMap, buildKeyboardRows } from "./data/noteMap";
import type { Mode } from "./data/noteMap";
import { Keyboard } from "./components/Keyboard";
import { TonicSelector } from "./components/TonicSelector";
import { ModeSwitch } from "./components/ModeSwitch";
import "./App.css";

function App() {
  const [tonicIndex, setTonicIndex] = useState(0);
  const [mode, setMode] = useState<Mode>("simple");
  const noteMap = useMemo(() => buildNoteMap(mode, tonicIndex), [mode, tonicIndex]);
  const rows = useMemo(() => buildKeyboardRows(mode, tonicIndex), [mode, tonicIndex]);
  const activeKeys = useKeyboard(noteMap);

  return (
    <div className="app">
      <h1>Keybert</h1>
      <div className="controls">
        <ModeSwitch mode={mode} onChange={setMode} />
        <TonicSelector tonicIndex={tonicIndex} onChange={setTonicIndex} />
      </div>
      <Keyboard activeKeys={activeKeys} rows={rows} />
    </div>
  );
}

export default App;
