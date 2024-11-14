"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScreenReaderToggle = ScreenReaderToggle;
var jsx_runtime_1 = require("react/jsx-runtime");
var ScreenReaderContext_1 = require("./ScreenReaderContext");
function ScreenReaderToggle(_a) {
    var _b = _a.className, className = _b === void 0 ? "" : _b, _c = _a.buttonClassName, buttonClassName = _c === void 0 ? "" : _c, _d = _a.label, label = _d === void 0 ? "Screen Reader" : _d, _e = _a.showStatus, showStatus = _e === void 0 ? true : _e;
    var _f = (0, ScreenReaderContext_1.useScreenReader)(), isEnabled = _f.isEnabled, toggleScreenReader = _f.toggleScreenReader, speak = _f.speak;
    var handleToggle = function () {
        toggleScreenReader();
        speak("Screen reader ".concat(!isEnabled ? "enabled" : "disabled"), "high");
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2 ".concat(className), children: [label && (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-medium", children: label }), (0, jsx_runtime_1.jsx)("button", { onClick: handleToggle, className: "\n          relative inline-flex h-6 w-11 items-center rounded-full\n          ".concat(isEnabled ? "bg-blue-600" : "bg-gray-200", "\n          transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2\n          ").concat(buttonClassName, "\n        "), role: "switch", "aria-checked": isEnabled, "aria-label": "Toggle screen reader", children: (0, jsx_runtime_1.jsx)("span", { className: "\n            ".concat(isEnabled ? "translate-x-6" : "translate-x-1", "\n            inline-block h-4 w-4 transform rounded-full bg-white transition-transform\n          ") }) }), showStatus && ((0, jsx_runtime_1.jsx)("span", { className: "text-sm text-gray-500", children: isEnabled ? "On" : "Off" }))] }));
}
