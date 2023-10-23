"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var dynamic_1 = require("next/dynamic");
var Context_1 = require("./Context");
var ReactSelect = dynamic_1["default"](function () { return Promise.resolve().then(function () { return require("react-select"); }); }, {
    loading: function () { return react_1["default"].createElement("p", null, "Loading..."); }
});
var DataLoad = function () {
    var _a = react_1["default"].useState("usd"), currencyType = _a[0], setCurrencyType = _a[1]; //selected currency type
    var currencyList = Context_1.useCurrencyProvider(); //object of key:abbreviation, name: string
    var _b = react_1["default"].useState({}), currencyTypes = _b[0], setCurrencyTypes = _b[1]; //object> object of key:abbreviation, relative price: number //currencyTypes
    var _c = react_1["default"].useState(['usd', "US Dollar"]), selectedType = _c[0], setSelectedType = _c[1];
    react_1["default"].useEffect(function () {
        try {
            fetch("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/" + currencyType + ".json")
                .then(function (res) { return res.json(); })
                .then(function (data) { return setCurrencyTypes(data); });
        }
        catch (error) {
            console.error(error);
        }
    }, [currencyType]);
    var options = Object.keys(currencyList.currencyDefinitions).map(function (key) { return ({
        id: key,
        //@ts-ignore
        name: currencyList.currencyDefinitions[key]
    }); });
    var handleChange = function (selectedType) {
        setSelectedType(selectedType);
        setCurrencyType(selectedType['id']);
    };
    //   console.log(Object.keys(currencyTypes[currencyType]));
    //   console.log(Object.keys(selectedType))
    // console.log(currencyTypes)
    // console.log(currencyType)
    // console.log(selectedType['id'])
    var displayPrices;
    if (currencyTypes[currencyType] != null) {
        displayPrices = Object.keys(currencyTypes[currencyType]).map(function (key) {
            return (
            //@ts-ignore
            react_1["default"].createElement("div", { key: key },
                react_1["default"].createElement("p", null,
                    key,
                    " ",
                    currencyTypes[currencyType][key])));
        });
    }
    //@ts-ignore
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(ReactSelect, { isSearchable: true, options: options, name: "react select", placeholder: "Choose a currency type", 
            //@ts-ignore
            getOptionLabel: function (options) { return options["name"]; }, 
            //@ts-ignore
            getOptionValue: function (options) { return options["id"]; }, className: "dark:text-black mx-5", value: selectedType, onChange: handleChange }),
        displayPrices));
};
exports["default"] = DataLoad;
