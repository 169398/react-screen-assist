import React from "react";
interface AccessibleElementProps {
    children: React.ReactNode;
    description?: string;
    priority?: "high" | "normal" | "low";
    className?: string;
}
export declare function AccessibleElement({ children, description, priority, className, }: AccessibleElementProps): import("react/jsx-runtime").JSX.Element;
export {};
