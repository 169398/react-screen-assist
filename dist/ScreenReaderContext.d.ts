import React from "react";
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
export declare function ScreenReaderProvider({ children, }: {
    children: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare const useScreenReader: () => ScreenReaderContextType;
export {};
