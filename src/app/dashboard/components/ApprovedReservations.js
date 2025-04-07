import React, { useState, useEffect } from "react";
import { BsPersonFill, BsThreeDotsVertical } from "react-icons/bs";
import { TiTick } from "react-icons/ti";

function ApprovedReservations() {
  const [approved, setApproved] = useState([]);
  const APPROVED_URL = "/api/approvedOrders";

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(APPROVED_URL);
      const approved = await response.json();
      setApproved(approved.approved);
    }
    fetchData();
  }, []);
  return (
    <div className="p-4">
      <h1 className="py-4 font-semibold">Approved Bookings</h1>
      <div className="w-full p-4 border rounded-lg bg-white overflow-y-auto">
        <div className="my-3 p-2 font-semibold grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 justify-between cursor-pointer">
          <span>Name</span>
          <span className="sm:text-left text-right">Email</span>
          <span className="hidden md:grid">Period</span>
          <span className="hidden md:grid">Room</span>
        </div>

        {approved?.map((rs) => (
          <ul key={rs._id}>
            <li className="bg-gray-50 hover:bg-gray-200 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer ">
              <div className="flex items-center">
                <div className="bg-amber-50 p-3 rounded-lg">
                  <BsPersonFill className="text-amber-800" />
                </div>
                <p className="pl-4">{rs.fullname}</p>
              </div>
              <p className="text-gray-500 sm:text-left text-right">
                {rs.email}
              </p>
              <p className="hidden md:flex">{rs.period}</p>
              <div className="sm:flex hidden justify-between items-center  ">
                <p className="truncate text-ellipsis w-32">{rs.newName}</p>

                <TiTick size={"1.6rem"} color="green" />
              </div>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default ApprovedReservations;
