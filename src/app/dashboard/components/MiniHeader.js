"use client";
import Link from "next/link";
import React, { useState } from "react";
import FileUpload from "./FileUpload";
import RoomUpload from "./RoomUpload";
import Expenditure from "./Expenditure";

function MiniHeader() {
  const [toggle, setToggle] = useState(1);

  function updateToggle(id) {
    setToggle(id);
  }
  return (
    <div>
      <hr className="bg-white p-6" />
      <div className=" md:flex items-start gap-6 mt-2 cursor-pointer list-none px-4  ">
        <Link
          onClick={() => updateToggle(1)}
          href={""}
          className="text-sm hover:bg-white "
        >
          Gallery Upload
        </Link>
        <Link
          onClick={() => updateToggle(2)}
          href={""}
          className="text-sm hover:bg-white "
        >
          Add Room
        </Link>
        <Link
          onClick={() => updateToggle(3)}
          href={""}
          className="text-sm hover:bg-white "
        >
          Expenditure
        </Link>
        <Link
          onClick={() => updateToggle(4)}
          href={""}
          className="text-sm hover:bg-white "
        >
          User Settings
        </Link>
      </div>
      <div>
        <div className={toggle == 1 ? "block" : "hidden"}>
          <FileUpload />
        </div>
        <div className={toggle == 2 ? "block" : "hidden"}>
          <RoomUpload />
        </div>
        <div className={toggle == 3 ? "block" : "hidden"}>
          <Expenditure />
        </div>
        <div className={toggle == 4 ? "block" : "hidden"}></div>
      </div>
    </div>
  );
}

export default MiniHeader;
