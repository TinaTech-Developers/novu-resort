"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import TwoBeds from "./TwoBeds";
import ThreeBeds from "./ThreeBeds";
import ExecutiveBeds from "./ExecutiveBed";
import { usePathname } from "next/navigation";

function MiniHeader() {
  const [toggle, setToggle] = useState(1);

  // Scroll to section and toggle it on hash change
  useEffect(() => {
    const hash = window.location.hash;

    if (hash === "#executive") setToggle(1);
    else if (hash === "#two") setToggle(2);
    else if (hash === "#three") setToggle(3);

    // Scroll to that section after DOM is ready
    if (hash) {
      const section = document.querySelector(hash);
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 300);
      }
    }
  }, []);

  function updateToggle(id, e) {
    e.preventDefault();
    setToggle(id);
    let hash = "";
    if (id === 1) hash = "#executive";
    else if (id === 2) hash = "#two";
    else if (id === 3) hash = "#three";
    window.history.pushState(null, "", hash);

    const section = document.querySelector(hash);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <div className="pb-10 mt-10 text-green-950">
      <h1 className="px-4 my-10 text-xl md:text-4xl font-bold">
        Explore Our Apartments
      </h1>

      {/* Toggle Buttons */}
      <div className="grid md:flex items-start gap-6 mt-2 cursor-pointer list-none px-4">
        <Link
          onClick={(e) => updateToggle(1, e)}
          href="#executive"
          className="uppercase hover:bg-green-700 focus:bg-green-700 mx-1 text-white border border-green-600 bg-green-950 px-4 py-2 rounded-lg"
        >
          Executive Beds
        </Link>
        <Link
          onClick={(e) => updateToggle(2, e)}
          href="#two"
          className="uppercase hover:bg-green-700 focus:bg-green-700 mx-1 text-white border border-green-600 bg-green-950 px-4 py-2 rounded-lg"
        >
          TWO BEDS
        </Link>
        <Link
          onClick={(e) => updateToggle(3, e)}
          href="#three"
          className="uppercase hover:bg-green-700 focus:bg-green-700 mx-1 text-white border border-green-600 bg-green-950 px-4 py-2 rounded-lg"
        >
          THREE BEDS
        </Link>
      </div>

      {/* Sections */}
      <div className="p-6 mx-0">
        <div id="executive" className={toggle == 1 ? "block" : "hidden"}>
          <h1 className="text-xl font-semibold mb-10">EXECUTIVE BEDS</h1>
          <ExecutiveBeds />
          <div className="text-gray-800">
            <h1 className="text-xl md:text-2xl py-2 text-green-950 font-semibold">
              Executive Beds at Novu Resort
            </h1>
            <p>{`Experience refined comfort in our Executive Beds—designed for discerning travelers who appreciate both luxury and functionality. Whether you're here for business or a well-deserved retreat, these rooms offer a sophisticated space to relax, recharge, and stay productive. Each Executive Bed room features a plush king or queen bed with premium linens, a sleek work desk, and modern amenities including high-speed Wi-Fi and smart TV. With stylish decor, calming tones, and access to exclusive resort facilities, your stay is elevated from the moment you arrive. Perfect for solo travelers, couples, or professionals seeking a balance of relaxation and efficiency.`}</p>
          </div>
        </div>

        <div id="two" className={toggle == 2 ? "block" : "hidden"}>
          <h1 className="text-xl font-semibold mb-10">TWO BEDS</h1>
          <TwoBeds />
          <div className="text-gray-800">
            <h1 className="text-xl md:text-2xl py-2 text-green-950 font-semibold">
              Two-Bed Suites at Novu Resort
            </h1>
            <p>{`Discover comfort and versatility in our elegant Two-Bed Suites—ideal for families, couples traveling together, or small groups seeking a little extra space. These thoughtfully designed suites feature two serene bedrooms, a cozy living area perfect for relaxing after a day of adventure, and a convenient kitchenette for light meals or snacks. Enjoy tasteful, modern décor, premium linens, and private balconies that invite you to soak in stunning resort views. Whether you're planning a weekend escape or an extended stay, our Two-Bed Suites offer the perfect home-away-from-home experience with access to all the premium amenities Novu Resort has to offer.`}</p>
          </div>
        </div>

        <div id="three" className={toggle == 3 ? "block" : "hidden"}>
          <h1 className="text-xl font-semibold mb-10">THREE BEDS</h1>
          <ThreeBeds />
          <div className="text-gray-800">
            <h1 className="text-xl md:text-2xl py-2 text-green-950 font-semibold">
              Three-Bed Suites at Novu Resort
            </h1>
            <p>{`Perfect for families or small groups, our spacious Three-Bed Suites offer the ultimate blend of comfort, privacy, and style. Each suite features three beautifully appointed bedrooms, a modern living area for relaxing or entertaining, and a fully equipped kitchenette for convenient in-room dining. Whether you're traveling with loved ones or a close group of friends, these suites provide ample space to unwind and enjoy your stay together. Enjoy scenic views from your private balcony, premium bedding for a restful night's sleep, and access to all of Novu Resort’s world-class amenities—including pools, spa services, and on-site dining. Experience resort living at its finest in our thoughtfully designed Three-Bed Suites.`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MiniHeader;
