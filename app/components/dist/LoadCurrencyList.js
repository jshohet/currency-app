"use strict";
exports.__esModule = true;
var react_1 = require("react");
var LoadCurrencyList = function () {
    var _a = react_1["default"].useState(), currencyDefinitions = _a[0], setCurrencyDefinitions = _a[1];
    react_1["default"].useEffect(function () {
        fetch("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.min.json")
            .then(function (res) { return res.json(); })
            .then(function (data) { return setCurrencyDefinitions(data); });
    });
    return (react_1["default"].createElement("div", null));
};
exports["default"] = LoadCurrencyList;
