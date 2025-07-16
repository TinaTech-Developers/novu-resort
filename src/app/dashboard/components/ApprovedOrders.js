import React, { useState, useEffect } from "react";
import { BsPersonFill, BsThreeDotsVertical } from "react-icons/bs";
import { TiTick } from "react-icons/ti";
import RemoveButton from "./RemoveButton";
import Link from "next/link";

// const getApprovedReservations = async () => {
//   try {
//     const res = await fetch("/api/approved", {
//       cache: "no-store",
//     });
//     if (!res.ok) {
//       throw new Error("failed to fetch data");
//     }
//     return res.json();
//   } catch (error) {
//     console.log("Error loading orders", error);
//   }
// };

function ApprovedOrders() {
  const [approved, setApproved] = useState([]);

  const APVD_URL = "/api/approved";
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(APVD_URL);
      const approved = await response.json();
      setApproved(approved.approved);
    }
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="py-4 font-semibold">Approved Orders</h1>

      <div className="w-full p-4 border rounded-lg bg-white overflow-y-auto">
        <div className="my-3 p-2 font-semibold grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 justify-between cursor-pointer bg-green-800 text-white py-2">
          <span>Name</span>
          <span className="sm:text-left text-right">Email</span>
          <span className="hidden md:grid">Period</span>
          <span className="hidden md:grid ">Amount</span>
          {/* <span className="hidden md:grid  text-left">Action</span> */}
        </div>
        {approved?.map((resv) => (
          <ul key={resv._id} className="w-full text-sm text-black">
            <li className="bg-gray-50 hover:bg-gray-200 rounded-lg my-3 text-black p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer ">
              <div className="flex items-center">
                <div className="bg-amber-50 p-3 rounded-lg">
                  <BsPersonFill className="text-amber-800" />
                </div>
                <p className="pl-4 text-black">{resv.surname}</p>
              </div>
              <p className=" sm:text-left text-right ">{resv.email}</p>
              <p className="hidden md:flex">
                {new Date(resv.arrivaldate).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}{" "}
                -{" "}
                {new Date(resv.deptdate).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>

              <div className="sm:flex hidden justify-between items-center  ">
                <p className="truncate text-ellipsis pl-6 font-semibold w-32">
                  ${resv.total}.00
                </p>
              </div>
              <div className="flex items-center  space-x-2">
                {/* <RemoveButton id={resv._id} /> */}
                {/* <Link href={`/dashboard/resdetails/${resv._id}`}></Link> */}
              </div>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default ApprovedOrders;
