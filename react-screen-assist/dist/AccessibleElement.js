"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessibleElement = AccessibleElement;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var ScreenReaderContext_1 = require("./ScreenReaderContext");
function AccessibleElement(_a) {
    var children = _a.children, description = _a.description, _b = _a.priority, priority = _b === void 0 ? "normal" : _b, className = _a.className;
    var _c = (0, ScreenReaderContext_1.useScreenReader)(), speak = _c.speak, isEnabled = _c.isEnabled;
    var elementRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        var element = elementRef.current;
        if (!element || !isEnabled)
            return;
        var handleFocus = function () {
            var textContent = description || element.textContent || "";
            speak(textContent, priority);
        };
        element.addEventListener("focus", handleFocus);
        element.addEventListener("mouseenter", handleFocus);
        return function () {
            element.removeEventListener("focus", handleFocus);
            element.removeEventListener("mouseenter", handleFocus);
        };
    }, [description, isEnabled, priority, speak]);
    return ((0, jsx_runtime_1.jsx)("div", { ref: elementRef, tabIndex: 0, className: "focus:outline-none focus:ring-2 focus:ring-blue-500 ".concat(className || ""), role: "region", "aria-label": description, children: children }));
}
