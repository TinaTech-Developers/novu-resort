"use client";

import React, { useState, useEffect } from "react";
import { BsPersonFill, BsThreeDotsVertical } from "react-icons/bs";
import RemoveButton from "../components/RemoveButton1";
import Link from "next/link";
import ApprovedReservations from "../components/ApprovedReservations";
import DashbordLayout from "../components/DashbordLayout";
import Header from "../components/Header";

function Orders() {
  const [orders, setOrders] = useState([]);
  const ORDERS_URL = "http://localhost:3000/api/orders";
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(ORDERS_URL);
      const orders = await response.json();
      setOrders(orders.orders);
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
            <h1 className="py-4 font-semibold">Recent Bookings</h1>
            <div className="w-full p-4 border rounded-lg bg-white overflow-y-auto">
              <div className="my-3 p-2 font-semibold grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 justify-between cursor-pointer">
                <span>Name</span>
                <span className="sm:text-left text-right">Email</span>
                <span className="hidden md:grid">Period</span>
                <span className="hidden md:grid">Room Type </span>
                <span className="hidden md:grid">Payment Method</span>
              </div>
              {orders.map((order) => (
                <ul key={order._id}>
                  <li className="bg-gray-50 hover:bg-gray-200 rounded-lg my-3 p-2 grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer ">
                    <div className="flex items-center">
                      <div className="bg-amber-50 p-3 rounded-lg">
                        <BsPersonFill className="text-amber-800" />
                      </div>
                      <p className="pl-4">{order.fullname}</p>
                    </div>
                    {/* <Link href={}> */}
                    <p className="text-gray-500 sm:text-left text-right">
                      {order.email}
                    </p>
                    {/* </Link> */}
                    <p className="hidden md:flex">{order.period}</p>
                    <p className="hidden md:flex">{order.newName}</p>
                    <div className="sm:flex hidden justify-between items-center w-48 ">
                      <p className="text-center mx-2">{order.payment}</p>
                      <div className="flex items-center justify-center w-16 mx-">
                        <RemoveButton id={order._id} />
                      </div>
                      <Link href={`/dashboard/orderdetails/${order._id}`}>
                        <BsThreeDotsVertical />
                      </Link>
                    </div>
                  </li>
                </ul>
              ))}
            </div>
          </div>
          <ApprovedReservations />
        </div>
      </main>
    </DashbordLayout>
  );
}

export default Orders;
