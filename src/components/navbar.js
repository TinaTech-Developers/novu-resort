"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { IoMdMenu, IoMdClose } from "react-icons/io";

function Navbar() {
  let links = [
    { name: "Home", link: "/" },
    { name: "Rooms", link: "/rooms" },
    { name: "Activities", link: "/todo" },
    { name: "About", link: "/about" },
    { name: "Contact ", link: "/contact" },
  ];

  let [open, setOpen] = useState(false);
  // [#06402B] bg
  return (
    <div className="shadow-lg w-full fixed top-0 left-0 z-50 bg-white">
      <div className="md:flex items-center justify-between bg- py-4  md:px-10 px-7 h-20 border-b-">
        {/* <Link href={"/"} className="text-3xl font-bold text-green-900">
          {/* NOVU RESORT 
        </Link> */}
        <div className="w-[100px] h-16 my-2">
          <Image
            src={
              "https://5puqigze8f.ufs.sh/f/M8crfG3am8lfrPENUKmBK8DQxoItvOhfy4Fwj5PGce1Nqkul"
            }
            alt=""
            height={200}
            width={150}
            className="object-cover "
          />
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          {open ? <IoMdClose color="green" /> : <IoMdMenu color="green" />}
        </div>
        <ul
          className={`md:flex md:items-center md:pb-0 pb-4
        absolute md:static bg-white  x-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
          open ? "top-20 opacity-100" : "top-[-490px]"
        } `}
        >
          {links.map((link) => (
            <li key={link.name} className="md:ml-8 text-base md:my-0 my-4">
              <a href={link.link} className="group text-green-900">
                {link.name}
                <span class="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-green-900"></span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
