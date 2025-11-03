"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { IoMdMenu, IoMdClose } from "react-icons/io";

function Navbar() {
  const links = [
    { name: "Home", link: "/" },
    {
      name: "Accommodation",
      dropdown: [
        { name: "Executive Beds", link: "/rooms/executive-beds" },
        { name: "Two Beds", link: "/rooms/two-beds" },
        { name: "Three Beds", link: "/rooms/three-beds" },
      ],
    },
    { name: "Activities", link: "/activities" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
  ];

  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="shadow-lg w-full fixed top-0 left-0 z-50 bg-white">
      {/* Top Section */}
      <div className="hidden md:flex items-center justify-between px-10 w-full h-20 bg-transparent">
        <Link
          href="/"
          className="text-[#06402B] text-xl md:text-4xl uppercase text-center font-sans pt-4 font-semibold"
        >
          Novu Resort
        </Link>
        <Link href="/" className="w-[80px] h-[30px]">
          <Image
            src="https://5puqigze8f.ufs.sh/f/M8crfG3am8lfrPENUKmBK8DQxoItvOhfy4Fwj5PGce1Nqkul"
            alt="Logo"
            height={30}
            width={100}
            className="object-contain"
          />
        </Link>
      </div>

      {/* Menu Bar */}
      <div className="md:flex items-center justify-between bg-[#06402B] py-4 md:px-10 px-7 h-16 border-b relative">
        {/* Mobile Menu Toggle */}
        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          {open ? <IoMdClose color="green" /> : <IoMdMenu color="green" />}
        </div>

        {/* Navigation Links */}
        <ul
          className={`md:flex md:items-center md:pb-0 pb-4 absolute md:static bg-[#06402B] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-20 opacity-100" : "top-[-490px]"
          }`}
        >
          {links.map((link) => (
            <li
              key={link.name}
              className="md:pr-8 text-base uppercase md:my-0 my-4 relative group"
            >
              {link.dropdown ? (
                <>
                  <span
                    className="cursor-pointer text-white"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    {link.name}
                  </span>
                  {/* Dropdown */}
                  <ul
                    className={`absolute left-0 mt-2 bg-[#06402B] text-white  min-w-[180px] transition-all duration-300 shadow-lg ${
                      dropdownOpen
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                    }`}
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    {link.dropdown.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.link}
                          className="block px-4 py-2 hover:bg-green-700 transition"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Link href={link.link}>
                  <span className="group text-white">
                    {link.name}
                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-green-600"></span>
                  </span>
                </Link>
              )}
            </li>
          ))}
        </ul>

        <Link
          href={"/rooms"}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300 hidden md:block"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
