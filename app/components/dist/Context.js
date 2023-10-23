"use client";
"use strict";
exports.__esModule = true;
exports.useCurrencyProvider = void 0;
var react_1 = require("react");
var CurrencyContext = react_1.createContext({
    key: "",
    currencyDefinitions: {}
});
//@ts-ignore
function CurrencyProvider(_a) {
    var children = _a.children;
    var _b = react_1.useState({}), currencyDefinitions = _b[0], setCurrencyDefinitions = _b[1];
    react_1.useEffect(function () {
        try {
            fetch("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.min.json")
                .then(function (res) { return res.json(); })
                .then(function (data) { return setCurrencyDefinitions(data); });
        }
        catch (error) {
            console.error(error);
        }
    }, []);
    return (react_1["default"].createElement(CurrencyContext.Provider, { value: { currencyDefinitions: currencyDefinitions } }, children));
}
exports["default"] = CurrencyProvider;
exports.useCurrencyProvider = function () { return react_1.useContext(CurrencyContext); };
