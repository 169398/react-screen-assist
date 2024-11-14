"use strict";
"use client";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useScreenReader = void 0;
exports.ScreenReaderProvider = ScreenReaderProvider;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var ScreenReaderContext = (0, react_1.createContext)(undefined);
function ScreenReaderProvider(_a) {
    var children = _a.children;
    var _b = (0, react_1.useState)(false), isEnabled = _b[0], setIsEnabled = _b[1];
    var _c = (0, react_1.useState)(1), rate = _c[0], setRate = _c[1];
    var _d = (0, react_1.useState)(1), pitch = _d[0], setPitch = _d[1];
    var _e = (0, react_1.useState)([]), queue = _e[0], setQueue = _e[1];
    var speak = function (text, priority) {
        if (priority === void 0) { priority = "normal"; }
        if (!isEnabled || !window.speechSynthesis)
            return;
        var utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = rate;
        utterance.pitch = pitch;
        if (priority === "high") {
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(utterance);
        }
        else {
            setQueue(function (prev) { return __spreadArray(__spreadArray([], prev, true), [utterance], false); });
        }
    };
    var toggleScreenReader = function () {
        setIsEnabled(function (prev) { return !prev; });
    };
    var pause = function () { var _a; return (_a = window.speechSynthesis) === null || _a === void 0 ? void 0 : _a.pause(); };
    var resume = function () { var _a; return (_a = window.speechSynthesis) === null || _a === void 0 ? void 0 : _a.resume(); };
    var stop = function () { var _a; return (_a = window.speechSynthesis) === null || _a === void 0 ? void 0 : _a.cancel(); };
    (0, react_1.useEffect)(function () {
        if (queue.length > 0 && !window.speechSynthesis.speaking) {
            var utterance = queue[0];
            setQueue(function (prev) { return prev.slice(1); });
            window.speechSynthesis.speak(utterance);
        }
    }, [queue]);
    return ((0, jsx_runtime_1.jsx)(ScreenReaderContext.Provider, { value: {
            isEnabled: isEnabled,
            toggleScreenReader: toggleScreenReader,
            speak: speak,
            pause: pause,
            resume: resume,
            stop: stop,
            rate: rate,
            setRate: setRate,
            pitch: pitch,
            setPitch: setPitch,
        }, children: children }));
}
var useScreenReader = function () {
    var context = (0, react_1.useContext)(ScreenReaderContext);
    if (!context) {
        throw new Error("useScreenReader must be used within a ScreenReaderProvider");
    }
    return context;
};
exports.useScreenReader = useScreenReader;
