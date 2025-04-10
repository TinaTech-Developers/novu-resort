"use client";
import Link from "next/link";
import React, { useState } from "react";
import TwoBeds from "./TwoBeds";

function MiniHeader() {
  const [toggle, setToggle] = useState(1);

  function updateToggle(id, e) {
    e.preventDefault();
    setToggle(id);
  }
  return (
    <div className="mb-10 mt-10  text-green-950">
      <h1 className="px-4 my-10 text-xl md:text-4xl font-bold">
        Explore Our Apartments
      </h1>
      <div className=" grid md:flex items-start gap-6 mt-2 cursor-pointer list-none px-4  ">
        <Link
          onClick={(e) => updateToggle(1, e)}
          href={""}
          className="uppercase hover:bg-green-700 focus:bg-green-700 mx-1 text-white border border-green-600 bg-green-950 px-4 py-2 rounded-lg "
        >
          Executive Beds
        </Link>
        <Link
          onClick={(e) => updateToggle(2, e)}
          href={""}
          className="text- hover:bg-green-500 focus:bg-green-500 mx-1 text-white border border-green-600 bg-green-950 px-4 py-2 rounded-lg"
        >
          TWO BEDS
        </Link>
        <Link
          onClick={(e) => updateToggle(3, e)}
          href={""}
          className="hover:text-black border border-green-600 focus:bg-green-200 hover:bg-green-200 mx-1 text-white bg-green-950 px-4 py-2 rounded-lg"
        >
          THREE BEDS
        </Link>
      </div>
      <div className="p-6 mx-0">
        <div className={toggle == 1 ? "block" : "hidden"}>
          <h1 className="text-xl font-semibold mb-10">EXECUTIVE BEDS</h1>
          Executive Beds
        </div>
        <div className={toggle == 2 ? "block" : "hidden"}>
          <h1 className="text-xl font-semibold mb-10"> TWO BEDS</h1>
          <TwoBeds />
        </div>
        <div className={toggle == 3 ? "block" : "hidden"}>
          <h1 className="text-xl font-semibold mb-10"> THREE BEDS</h1>
          THREE BEDS
        </div>
      </div>
    </div>
  );
}

export default MiniHeader;
