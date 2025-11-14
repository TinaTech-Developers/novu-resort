import Link from "next/link";
import React from "react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { RxDashboard, RxSketchLogo, RxPerson } from "react-icons/rx";
import { FiSettings } from "react-icons/fi";
import { icon } from "leaflet";

function Sidebar() {
  let links = [
    // { icon: <RxDashboard size={20} />, link: "/dashboard/home" },
    { icon: <RxPerson size={20} />, link: "/dashboard/reservations" },
    { icon: <HiOutlineShoppingBag size={20} />, link: "/dashboard/orders" },
    { icon: <FiSettings size={20} />, link: "/dashboard/settings" },
    { icon: <RxDashboard size={20} />, link: "/dashboard/conference" },
  ];

  return (
    <div className="w-20 p-4 bg-gray-500 h-screen flex flex-col justify-between">
      <div className="flex flex-col items-center">
        <Link href="/dashboard/home">
          <div className="bg-[#06402B] text-white p-3 rounded-lg inline-block">
            <RxSketchLogo size={20} />
          </div>
        </Link>

        {links.map((item, index) => (
          <li key={index} className="list-none">
            <Link href={item.link}>
              <div className="bg-green-900 hover:bg-[#06402B] cursor-pointer my-4 text-white p-3 rounded-lg inline-block">
                {item.icon}
              </div>
            </Link>
          </li>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
