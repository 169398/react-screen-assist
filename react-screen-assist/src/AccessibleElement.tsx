"use client";

import React, { useRef, useEffect } from "react";
import { useScreenReader } from "./ScreenReaderContext";

interface AccessibleElementProps {
  children: React.ReactNode;
  description?: string;
  priority?: "high" | "normal" | "low";
  className?: string;
}

export function AccessibleElement({
  children,
  description,
  priority = "normal",
  className,
}: AccessibleElementProps) {
  const { speak, isEnabled } = useScreenReader();
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !isEnabled) return;

    const handleFocus = () => {
      const textContent = description || element.textContent || "";
      speak(textContent, priority);
    };

    element.addEventListener("focus", handleFocus);
    element.addEventListener("mouseenter", handleFocus);

    return () => {
      element.removeEventListener("focus", handleFocus);
      element.removeEventListener("mouseenter", handleFocus);
    };
  }, [description, isEnabled, priority, speak]);

  return (
    <div
      ref={elementRef}
      tabIndex={0}
      className={`focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        className || ""
      }`}
      role="region"
      aria-label={description}
    >
      {children}
    </div>
  );
}
