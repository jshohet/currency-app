"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var next_themes_1 = require("next-themes");
var Providers = function (_a) {
    var children = _a.children;
    return (react_1["default"].createElement(next_themes_1.ThemeProvider, { attribute: 'class' }, children));
};
exports["default"] = Providers;
