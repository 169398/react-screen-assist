"use client";

import React from "react";
import { useScreenReader } from "./ScreenReaderContext";

interface ScreenReaderToggleProps {
  className?: string;
  buttonClassName?: string;
  label?: string;
  showStatus?: boolean;
}

export function ScreenReaderToggle({
  className = "",
  buttonClassName = "",
  label = "Screen Reader",
  showStatus = true,
}: ScreenReaderToggleProps) {
  const { isEnabled, toggleScreenReader, speak } = useScreenReader();

  const handleToggle = () => {
    toggleScreenReader();
    speak(`Screen reader ${!isEnabled ? "enabled" : "disabled"}`, "high");
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {label && <span className="text-sm font-medium">{label}</span>}
      <button
        onClick={handleToggle}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full
          ${isEnabled ? "bg-blue-600" : "bg-gray-200"}
          transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          ${buttonClassName}
        `}
        role="switch"
        aria-checked={isEnabled}
        aria-label="Toggle screen reader"
      >
        <span
          className={`
            ${isEnabled ? "translate-x-6" : "translate-x-1"}
            inline-block h-4 w-4 transform rounded-full bg-white transition-transform
          `}
        />
      </button>
      {showStatus && (
        <span className="text-sm text-gray-500">
          {isEnabled ? "On" : "Off"}
        </span>
      )}
    </div>
  );
}
