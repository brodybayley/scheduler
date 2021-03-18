import { useState } from 'react';

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode) => {
    setMode(newMode)
    history.push(newMode)
  }
  const back = () => {
    if (history.length <= 1) {
      return;
    } else {
      history.pop()
      setMode(history[history.length - 1])
    }
  }

  return { mode, transition, back };
}

