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
  const [currencyTypes, setCurrencyTypes] = React.useState<any>({}); //object> object of key:abbreviation, relative price: number //currencyTypes
  const [selectedType, setSelectedType] = React.useState(['usd', "US Dollar"])
  React.useEffect(() => {    
    try {
        fetch(
          `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currencyType}.json`
        )
          .then((res) => res.json())
          .then((data) => setCurrencyTypes(data));
    } catch (error) {
        console.error(error)
    }
  }, [currencyType]);

  const options = Object.keys(currencyList.currencyDefinitions).map((key) => ({
    id: key,
    //@ts-ignore
    name: currencyList.currencyDefinitions[key],
  }));

  const handleChange = (selectedType: any) =>{
    setSelectedType(selectedType);
    setCurrencyType(selectedType['id'])
  }
//   console.log(Object.keys(currencyTypes[currencyType]));
//   console.log(Object.keys(selectedType))

// console.log(currencyTypes)
// console.log(currencyType)
// console.log(selectedType['id'])
let displayPrices;
if (currencyTypes[currencyType] != null) {
    displayPrices = Object.keys(currencyTypes[currencyType]).map(
      (key: string | number) => {
        return (
          //@ts-ignore
          <div key={key}>
            <p>{key} {currencyTypes[currencyType][key]}</p>
          </div>
        );})}
    //@ts-ignore
  
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
        className="dark:text-black mx-5"
        value={selectedType}
        onChange={handleChange}
      />
      {displayPrices}
    </div>
  );
};

export default DataLoad;
