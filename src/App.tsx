import { useMemo, useState } from "react";
import { useKeyboard } from "./hooks/useKeyboard";
import { buildNoteMap } from "./data/noteMap";
import { Keyboard } from "./components/Keyboard";
import { TonicSelector } from "./components/TonicSelector";
import "./App.css";

function App() {
  const [tonicIndex, setTonicIndex] = useState(0); // 0 = C
  const noteMap = useMemo(() => buildNoteMap(tonicIndex), [tonicIndex]);
  const activeKeys = useKeyboard(noteMap);

  return (
    <div className="app">
      <h1>Keybert</h1>
      <TonicSelector tonicIndex={tonicIndex} onChange={setTonicIndex} />
      <Keyboard activeKeys={activeKeys} tonicIndex={tonicIndex} />
    </div>
  );
}

export default App;
