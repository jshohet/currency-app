"use strict";
exports.__esModule = true;
exports.metadata = void 0;
require("./globals.css");
var ThemeProvider_1 = require("./components/ThemeProvider");
var Context_1 = require("./components/Context");
exports.metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
    viewport: {
        width: "device-width",
        initialScale: 1,
        maximumScale: 1
    }
};
function RootLayout(_a) {
    var children = _a.children;
    return (React.createElement("html", { lang: "en", className: "dark", style: { colorScheme: "dark" } },
        React.createElement("body", null,
            React.createElement(ThemeProvider_1["default"], null,
                React.createElement(Context_1["default"], null, children)))));
}
exports["default"] = RootLayout;