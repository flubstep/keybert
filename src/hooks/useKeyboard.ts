import { useEffect, useRef, useState } from "react";
import type { NoteInfo } from "../data/noteMap";
import { ensureResumed, startNote, stopNote, stopAllNotes } from "../audio/audioEngine";

export function useKeyboard(noteMap: Record<string, NoteInfo>): Set<string> {
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());
  const noteMapRef = useRef(noteMap);
  noteMapRef.current = noteMap;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const key = e.key.toLowerCase();
      const noteInfo = noteMapRef.current[key];
      if (!noteInfo) return;

      e.preventDefault();
      ensureResumed();
      startNote(key, noteInfo.frequency);
      setActiveKeys((prev) => new Set(prev).add(key));
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (!noteMapRef.current[key]) return;

      stopNote(key);
      setActiveKeys((prev) => {
        const next = new Set(prev);
        next.delete(key);
        return next;
      });
    };

    const handleBlur = () => {
      stopAllNotes();
      setActiveKeys(new Set());
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", handleBlur);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  return activeKeys;
}
