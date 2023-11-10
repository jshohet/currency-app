"use client";
import React from "react";
import { isVisible } from "./ScrollHelper";
import { FaArrowUp } from "@react-icons/all-files/fa/FaArrowUp";

export default function ScrollHelper() {
  const ref = React.useRef<HTMLDivElement>(null);
  const isShown = isVisible(ref);
  
 

  return (
    <div>
      <div ref={ref}></div>
      <div className="fixed text-center ml-10 mt-52 text-zinc-300">
        <div className="h-10">
          {!isShown && (
            <button
              onClick={() =>
                window.scrollTo({
                  left: 0,
                  top: 0,
                  behavior: "smooth",
                })
              }>
              <FaArrowUp size={30} className="m-auto" />
              Scroll to Top
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
