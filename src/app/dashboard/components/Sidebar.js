import Link from "next/link";
import React from "react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { RxDashboard, RxSketchLogo, RxPerson } from "react-icons/rx";
import { FiSettings } from "react-icons/fi";

function Sidebar() {
  let links = [
    { icon: <RxDashboard size={20} />, link: "/dashboard/home" },
    { icon: <RxPerson size={20} />, link: "/dashboard/reservations" },
    { icon: <HiOutlineShoppingBag size={20} />, link: "/dashboard/orders" },
    { icon: <FiSettings size={20} />, link: "/dashboard/settings" },
    { name: "Contact ", link: "/contact" },
  ];

  return (
    <div className="w-20 p-4">
      <div className="flex flex-col items-center">
        <Link href={""}>
          <div className="bg-amber-800 text-white p-3 rounded-lg inline-block">
            <RxSketchLogo size={20} />
          </div>
        </Link>

        {links.map((link) => (
          <li key={link.icon} className="list-none">
            <a
              href={link.link}
              className="bg-amber-600 hover:bg-amber-800 cursor-pointer my-4 text-white p-3 rounded-lg inline-block"
            >
              {link.icon}
            </a>
          </li>
        ))}

        {/* <Link href={"/dashboard/orders"}>
          <div className="bg-amber-600 hover:bg-amber-800 cursor-pointer my-4 text-white p-3 rounded-lg inline-block">
            <HiOutlineShoppingBag size={20} />
          </div>
        </Link>
        <Link href={"/dashboard/settings"}>
          <div className="bg-amber-600 hover:bg-amber-800 cursor-pointer my-4 text-white p-3 rounded-lg inline-block">
            <FiSettings size={20} />
          </div>
        </Link> */}
      </div>
    </div>
  );
}

export default Sidebar;
