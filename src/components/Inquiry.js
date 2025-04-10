import React from "react";
import FillButton from "./FillButton";
import Link from "next/link";

function Inquiry() {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-5 w-[90%]  md:h-24 h-full gap-4  bg-white shadow-2xl mx-auto -translate-y-16 -z-50 border-green-950 border">
      <div className="col-span-1 mx-auto ">
        <input
          placeholder="Full Name"
          type="text"
          className="p-2 w-56 border md:my-6 mx-4 mt-"
        />
      </div>
      <div className="col-span-1 mx-auto">
        <input
          placeholder="Email"
          type="email"
          className="p-2 w-56 border md:my-6 mx-4"
        />
      </div>
      <div className="col-span-1 mx-auto">
        <input
          placeholder="From"
          type="date"
          className="p-2 w-56 border md:my-6 mx-4"
        />
      </div>
      <div className="col-span-1 mx-auto">
        <input
          placeholder="To"
          type="date"
          className="p-2 w-56 border md:my-6 mx-4"
        />
      </div>
      <div className="col-span-1 mx-auto my-6 ">
        <div className="  p-2 px-4 ">
          <Link
            type="submit"
            href={"/"}
            className=" border w-96 relative py-2 px-14 z-20 bg-transparent text-gray-600 transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-green-900 before:transition-transform before:duration-300 before:content-[''] hover:text-white before:hover:scale-x-100"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Inquiry;
