"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { BsPersonFill, BsThreeDotsVertical } from "react-icons/bs";
import ApprovedOrders from "../components/ApprovedOrders";
import RemoveButton from "../components/RemoveButton";
import DashbordLayout from "../components/DashbordLayout";
import Header from "../components/Header";

function Customers() {
  const [reservations, setReservations] = useState([]);

  const RSV_URL = "/api/reservations";
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(RSV_URL);
      const reservations = await response.json();
      setReservations(reservations.reservations);
    }
    fetchData();
  }, []);

  return (
    <DashbordLayout>
      <main className=" bg-gray-200  min-h-screen w-full">
        <Header />

        <div className="bg-gray-100 min-h-screen w-full">
          <hr className="bg-white mt-4" />
          <div className="p-4">
            <h1 className="py-4 font-semibold text-gray-800 pt-10">
              Recent Orders
            </h1>
            <div className="w-full p-4 border rounded-lg bg-white overflow-y-auto">
              <div className="my-3 p-2 font-semibold grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 justify-between cursor-pointer bg-gray-800 text-white py-2">
                <span>Name</span>
                <span className="sm:text-left text-right">Email</span>
                <span className="hidden md:grid">Period</span>
                <span className="hidden md:grid pl-6">Amount</span>
                <span className="hidden md:grid  text-left">Action</span>
              </div>
              {reservations?.map((resv) => (
                <ul key={resv._id} className="w-full text-sm text-black">
                  <li className="bg-gray-50 hover:bg-gray-200 rounded-lg my-3 text-black p-2 grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer ">
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
                    <div className="flex items-center  space-x-6">
                      <RemoveButton id={resv._id} />
                      <Link href={`/dashboard/resdetails/${resv._id}`}>
                        <BsThreeDotsVertical size={"1.4rem"} />
                      </Link>
                    </div>
                  </li>
                </ul>
              ))}
            </div>
          </div>

          <ApprovedOrders />
        </div>
      </main>
    </DashbordLayout>
  );
}

export default Customers;
