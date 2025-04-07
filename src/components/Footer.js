import React from "react";
import Link from "next/link";
import { SlArrowRight } from "react-icons/sl";
import { FaSquareWhatsapp, FaXTwitter } from "react-icons/fa6";
import { IoLogoFacebook } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <div>
      <div className="h-full grid grid-cols-1 md:grid-cols-3 md:w-full bg-gray-700 py-14 md:h-72 ">
        <div className="flex flex-col items-start px-20 md:px-32 justify mt-5 text-white ">
          <h1 className="text-white text-xl font-semibold p-2">Explore us!</h1>
          <div className="flex items-center justify-between gap-1">
            <SlArrowRight color="white" size={"0.8rem"} />
            <Link href={""}>About Us</Link>
          </div>
          <div className="flex items-center justify-between gap-1">
            <SlArrowRight color={"white"} size={"0.8rem"} />
            <Link href={""}>Terms & Conditions</Link>
          </div>
          <div className="flex items-center justify-between gap-1">
            <SlArrowRight color={"white"} size={"0.8rem"} />
            <Link href={""}>Newss & Articles</Link>
          </div>
          <div className="flex items-center justify-between gap-1">
            <SlArrowRight color={"white"} size={"0.8rem"} />
            <Link href={""}>How we work</Link>
          </div>
          <div className="flex items-center justify-between gap-1">
            <SlArrowRight color={"white"} size={"0.8rem"} />
            <Link href={""}>Contact Us</Link>
          </div>
        </div>
        <div className=" flex flex-col px-20 md:px-32 gap-2 md:p-4 text-gray-500 ">
          <h1 className=" text-white font-bold text-xl p-2">Contact us!</h1>
          <p className="text-sm text-white">+263 77 224 1125 </p>
          <p className="text-sm text-white">+263 77 214 6008</p>
          <p className="text-sm text-white">+263 71 221 4219</p>
          <p className="text-sm text-white">novuresort@gmail.com</p>

          <div></div>
        </div>
        <div className="flex flex-col items-center px-20 text-white mt-5 md:px-5">
          <h1 className="text-white text-xl font-semibold p-2">Follow us</h1>
          <p>
            Or just keep up to date with what is happening on any of our social
            pages
          </p>
          <div className="flex items-start justify-between gap-2 mt-2">
            <Link href={""}>
              <FaSquareWhatsapp size={25} color="green" />
            </Link>
            <Link href={""}>
              <IoLogoFacebook size={25} color="blue" />
            </Link>
            <Link href={""}>
              <FaLinkedin size={25} color="blue" />
            </Link>
            <Link href={""}>
              <FaXTwitter size={25} color="white" />
            </Link>
          </div>
          <p
            className="text-sm text-white my-2
          "
          >
            novuresort@gmail.com
          </p>
          {/* <p>Mobile: +263 71 247 1209 | +263 77 305 9753</p>*/}
          {/* <p>Email: info@tinasoftnexus.co.zw</p> */}
        </div>
      </div>
      <hr className=" w-[90%] mx-auto -translate-y-10" />

      <div className="flex items-center justify-center w-full h-10 bg-gray-900">
        <p className="text-white text-sm">
          Copyright 2023 by <Link href={""}>TinaSoft Nexus</Link>
        </p>
      </div>
    </div>
  );
}

export default Footer;
