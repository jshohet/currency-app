"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var FaMoon_1 = require("@react-icons/all-files/fa/FaMoon");
var FaBolt_1 = require("@react-icons/all-files/fa/FaBolt");
var next_themes_1 = require("next-themes");
var ThemeToggle = function () {
    var _a = next_themes_1.useTheme(), theme = _a.theme, setTheme = _a.setTheme;
    var _b = react_1.useState(false), mounted = _b[0], setMounted = _b[1];
    react_1.useEffect(function () {
        if (localStorage.getItem("theme") != null) {
            var localTheme = localStorage.getItem("theme") || "";
            setTheme(localTheme);
        }
        else {
            localStorage.setItem("theme", "light");
        }
        setMounted(true);
    }, [setTheme]);
    if (!mounted) {
        return null;
    }
    function changeTheme() {
        setTheme(theme === "dark" ? "light" : "dark");
    }
    //   get from local storage
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("button", { onClick: changeTheme }, theme === "light" ? (react_1["default"].createElement(FaMoon_1.FaMoon, { size: 30 })) : (react_1["default"].createElement(FaBolt_1.FaBolt, { size: 30, color: "white" })))));
};
exports["default"] = ThemeToggle;
