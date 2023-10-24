"use client";
import React from "react";
import dynamic from "next/dynamic";
import { useCurrencyProvider } from "./Context";
const ReactSelect = dynamic(() => import("react-select"), {
  loading: () => <p>Loading...</p>,
});

const DataLoad = () => {
  const [currencyType, setCurrencyType] = React.useState("usd"); //selected currency type
  const currencyList = useCurrencyProvider(); //object of key:abbreviation, name: string
  const [currencyPrices, setCurrencyPrices] = React.useState<any>({}); //object> object of key:abbreviation, relative price: number //currencyTypes
  const [selectedType, setSelectedType] = React.useState(["usd", "US Dollar"]);
  React.useEffect(() => {
    try {
      fetch(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currencyType}.json`
      )
        .then((res) => res.json())
        .then((data) => setCurrencyPrices(data));
    } catch (error) {
      console.error(error);
    }
  }, [currencyType]);

  const options = Object.keys(currencyList.currencyDefinitions).map((key) => ({
    id: key,
    //@ts-ignore
    name: currencyList.currencyDefinitions[key],
  }));

  const handleChange = (selectedType: any) => {
    setSelectedType(selectedType);
    setCurrencyType(selectedType["id"]);
  };

  let displayPrices;
  if (currencyPrices[currencyType] != null) {
    displayPrices = Object.keys(currencyPrices[currencyType]).map(
      (key: string | number) => {
        return (
          <tbody key={key}>
            <tr className="hover:bg-cyan-500 cursor-default">
              {/* @ts-ignore */}
              <td>{currencyList.currencyDefinitions[key]} </td>
              <td className="font-bold w-[20rem]">{key}</td>
              <td className="number">{currencyPrices[currencyType][key]}</td>
            </tr>
            <tr className="border-b border-white"></tr>
          </tbody>
        );
      }
    );
  }

  return (
    <div>
      <ReactSelect
        isSearchable={true}
        options={options}
        name="react select"
        placeholder="Choose a currency type"
        //@ts-ignore
        getOptionLabel={(options) => options["name"]}
        //@ts-ignore
        getOptionValue={(options) => options["id"]}
        className="dark:text-black mb-6 font-bold w-1/2 mx-auto text-xl"
        value={selectedType}
        onChange={handleChange}
      />
      <h2 className="text-3xl font-bold text-center mb-6">
        {/* @ts-ignore */}
        1 {currencyList.currencyDefinitions[currencyType]} is
        worth:
      </h2>
      <table className="w-[800px] text-center mx-auto">
        <thead className="underline text-xl">
          <tr>
            <th>Name</th>
            <th>Abbreviation</th>
            <th>Exchange Rate</th>
          </tr>
          <tr className="h-5">
            <td colSpan={3}></td>
          </tr>
        </thead>
        {displayPrices}
      </table>
    </div>
  );
};

export default DataLoad;
