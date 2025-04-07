import React from "react";
import { FaShoppingBag } from "react-icons/fa";
import Link from "next/link";

const getOrders = async () => {
  try {
    const res = await fetch("/api/orders", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("failed to fetch data");
    }
    return res.json();
  } catch (error) {
    console.log("Error loading orders", error);
  }
};

export default async function RecentOrders() {
  // const { orders } = await getOrders();

  return (
    <div className="w-full col-span-1 relative l:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white overflow-scroll">
      <h1>Recent Orders</h1>
      <ul>
        <li className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer ">
          <div className="bg-amber-100 rounde-lg p-3">
            <FaShoppingBag className="text-amber-700" />
          </div>
          <Link href={"/dashboard/orders"}>
            <div className="pl-4">
              <p className="text-gray-800 font-bold">$</p>
              <p className="text-gray-800 text-sm">Single</p>
            </div>
          </Link>

          <p className="lg:flex md:hidden absolute right-6 text-sm">12/12/23</p>
        </li>
      </ul>
    </div>
  );
}
