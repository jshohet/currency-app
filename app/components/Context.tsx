"use client"

import React, { createContext, useContext, useEffect, useState } from "react";

interface ContextProps{
    key?: any,
    currencyDefinitions: {}
}

const CurrencyContext = createContext<ContextProps>({
  key: "",
  currencyDefinitions: {},
});
//@ts-ignore
export default function CurrencyProvider({children}){
const [currencyDefinitions, setCurrencyDefinitions] = useState({});

useEffect(()=>{
    try {
        fetch(
          "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.min.json"
        )
          .then((res) => res.json())
          .then((data) => setCurrencyDefinitions(data));
    } catch (error) {
        console.error(error)
    }
}, [])

return (
  <CurrencyContext.Provider value={{ currencyDefinitions}}>
    {children}
  </CurrencyContext.Provider>
);

}

export const useCurrencyProvider = () => useContext(CurrencyContext);