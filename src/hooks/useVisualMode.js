import { useState } from 'react';

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const transition = (newMode) => {
    setMode(newMode)
  }
  return { mode, transition };
}

