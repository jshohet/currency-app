"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const ReactSelect = dynamic(() => import("react-select"), {
  loading: () => <p>Loading...</p>,
});
import { FaArrowUp } from "@react-icons/all-files/fa/FaArrowUp";
import { FaArrowDown } from "@react-icons/all-files/fa/FaArrowDown";


const DataLoad = () => {
  const [currencyType, setCurrencyType] = useState("usd"); //selected currency type
  const [currencyDefinitions, setCurrencyDefinitions] = useState({}); //object of key:abbreviation, name: string
  const [currencyPrices, setCurrencyPrices] = useState<any>({}); //object> object of key:abbreviation, relative price: number //currencyTypes
  const [selectedType, setSelectedType] = useState(["usd", "US Dollar"]);
  const [qty, setQty] = useState(1);
  const [currencySearch, setCurrencySearch] = useState("");
  const [filtered, setFiltered] = useState<string[]>([]);
  const [sort, setSort] = useState<"ascending" | "descending">("descending");

  useEffect(() => {
    try {
      fetch(
        "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.min.json"
      )
        .then((res) => res.json())
        .then((data) => {
          setCurrencyDefinitions(data)
        })
    } catch (error) {
      console.error(error);
    }
  }, []); 


  useEffect(() => {
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

  const options = Object.keys(currencyDefinitions).map((key) => ({
    id: key,
    //@ts-ignore
    name: currencyDefinitions[key],
  }));

  const handleDropdownChange = (selectedType: any) => {
    setSelectedType(selectedType);
    setCurrencyType(selectedType["id"]);
  };

  let displayPrices;
  if (currencyPrices[currencyType] != null) {
    if (filtered.length < 1) {
      displayPrices = Object.keys(currencyDefinitions).map((key: string | number) => {
      return (
        <tbody key={key}>
          <tr className="hover:bg-cyan-500 cursor-default">
            {/* @ts-ignore */}
            <td>{currencyDefinitions[key]} </td>
            <td className="font-bold w-[20rem]">{key}</td>
            <td className="number">
              {qty * currencyPrices[currencyType][key]}
            </td>
          </tr>
          <tr className="border-b dark:border-zinc-500 border-slate-400"></tr>
        </tbody>
      );
    })}else{
      displayPrices = filtered.map((key: string | number) => {
      return (
        <tbody key={key}>
          <tr className="hover:bg-cyan-500 cursor-default">
            {/* @ts-ignore */}
            <td>{currencyDefinitions[key]} </td>
            <td className="font-bold w-[20rem]">{key}</td>
            <td className="number">
              {qty * currencyPrices[currencyType][key]}
            </td>
          </tr>
          <tr className="border-b dark:border-zinc-500 border-slate-400"></tr>
        </tbody>
      );
    })
    }}  

  function handleQty(e: any) {
    setQty(e.target.value);
  }


  function handleSearch(e: any) {
    setCurrencySearch(e.target.value);
    if (currencySearch.length > 0) {
      setFiltered(
        Object.keys(currencyDefinitions).filter((key) => {
          return (
            key.match(currencySearch)
          )
      })
      );
    } else {
      setFiltered(Object.keys(currencyDefinitions));
    }
  }
  
  function sorting(){
    if (sort === "ascending") {
      filtered.sort();      
      setSort("descending")
    }else{
      filtered.sort().reverse();
      setSort("ascending")
    }
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
        className="dark:text-black mb-6 font-bold w-96 mx-auto text-xl"
        value={selectedType[1]}
        onChange={handleDropdownChange}
      />
      <div className="dark:text-white mb-6 font-bold text-xl flex flex-row justify-center">
        <label htmlFor="qtyInput">Quantity: </label>
        <input
          value={qty}
          name="quantity"
          id="qtyInput"
          className="w-40 ml-2 text-center dark:bg-white dark:text-slate-800 rounded-sm"
          onChange={handleQty}
        />
      </div>
      <div className="dark:text-white mb-6 font-bold text-xl flex flex-row justify-center">
        <label htmlFor="findCurrencyInput">Find a specific currency: </label>
        <input
          id="findCurrencyInput"
          value={currencySearch}
          name="searchCurrencyType"
          onChange={handleSearch}
          className="w-40 ml-2 text-center dark:bg-white dark:text-slate-800 rounded-sm"
        />
      </div>
      <h2 className="text-3xl font-bold text-center mb-6">
        {/* @ts-ignore */}
        {qty} {currencyDefinitions[currencyType]} is worth:
      </h2>
      <table className="w-[800px] text-center mx-auto">
        <thead className="underline text-xl">
          <tr>
            <th>Name</th>
            <th
              onClick={sorting}
              className="flex flex-row justify-center cursor-pointer">
              Abbreviation{" "}
              {sort === "descending" ? (
                <FaArrowUp size={15} className="mt-2 ml-1" />
              ) : (
                <FaArrowDown size={15} className="mt-2 ml-1" />
              )}
            </th>
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
