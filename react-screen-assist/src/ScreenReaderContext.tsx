"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface ScreenReaderContextType {
  isEnabled: boolean;
  toggleScreenReader: () => void;
  speak: (text: string, priority?: "high" | "normal" | "low") => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  rate: number;
  setRate: (rate: number) => void;
  pitch: number;
  setPitch: (pitch: number) => void;
}

const ScreenReaderContext = createContext<ScreenReaderContextType | undefined>(
  undefined
);

export function ScreenReaderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [queue, setQueue] = useState<SpeechSynthesisUtterance[]>([]);

  const speak = (
    text: string,
    priority: "high" | "normal" | "low" = "normal"
  ) => {
    if (!isEnabled || !window.speechSynthesis) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = pitch;

    if (priority === "high") {
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    } else {
      setQueue((prev) => [...prev, utterance]);
    }
  };

  const toggleScreenReader = () => {
    setIsEnabled((prev) => !prev);
  };

  const pause = () => window.speechSynthesis?.pause();
  const resume = () => window.speechSynthesis?.resume();
  const stop = () => window.speechSynthesis?.cancel();

  useEffect(() => {
    if (queue.length > 0 && !window.speechSynthesis.speaking) {
      const utterance = queue[0];
      setQueue((prev) => prev.slice(1));
      window.speechSynthesis.speak(utterance);
    }
  }, [queue]);

  return (
    <ScreenReaderContext.Provider
      value={{
        isEnabled,
        toggleScreenReader,
        speak,
        pause,
        resume,
        stop,
        rate,
        setRate,
        pitch,
        setPitch,
      }}
    >
      {children}
    </ScreenReaderContext.Provider>
  );
}

export const useScreenReader = () => {
  const context = useContext(ScreenReaderContext);
  if (!context) {
    throw new Error(
      "useScreenReader must be used within a ScreenReaderProvider"
    );
  }
  return context;
};
