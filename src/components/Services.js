"use client";
import React from "react";
import { motion } from "framer-motion";
import { PiBuildingApartmentDuotone } from "react-icons/pi";

function Services() {
  return (
    <div className="flex flex-col items-center justify-center mt-14 bg-white">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="text-2xl md:text-4xl font-nono"
      >
        <div className="flex items-center justify-center gap-2 my-4">
          <div className="w-10 h-1 bg-amber-700"></div>
          <h1 className="text-lg   uppercase text-amber-700">our services</h1>
          <div className="w-10 h-1 bg-amber-700"></div>
        </div>
        <h className=" text-green-950 text-2xl md:text-3xl">
          Explore Our Services
        </h>
      </motion.div>
      <div className="flex flex-wrap items-center justify- mx-auto">
        <ServiceCard />
      </div>
    </div>
  );
}
function ServiceCard() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0,
        x: -100,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
        x: 0,
      }}
      whileHover={{
        // scale: 1.1,
        backgroundColor: "#06402B",
        color: "white",
      }}
      transition={{ duration: 0.9 }}
      className="grid md:flex w-80 md:w-[50%] bg-white h-full md:h-96 shadow-2xl  border rounded-lg my-5 mx-auto text-gray-600 p-5 "
    >
      <div className="flex flex-col items-center justify-center  m-4">
        <div className="w-40 h-24 border mx-auto mt-10">
          <div className="w-20 h-20 border mx-auto my-2 items-center justify-center">
            <PiBuildingApartmentDuotone size={50} className="mx-auto my-4" />{" "}
          </div>
        </div>
        <h1 className="font-semibold text-center py-6 text-xl">
          Rooms & Appartment
        </h1>
      </div>
      <p className="flex items-center justify-center text-start p-4 ">
        At Novu Resort, we offer a range of elegantly designed rooms and
        apartments that combine comfort and style. Our cozy rooms feature modern
        amenities, plush bedding, and stunning views, while our spacious
        apartments come with fully equipped kitchens and separate living areas,
        making them ideal for families or groups. With private balconies in many
        accommodations, guests can unwind and enjoy the breathtaking scenery.
        Whether you’re here for a romantic getaway or a family vacation, Novu
        Resort promises a relaxing and memorable stay in a beautiful setting.
      </p>
    </motion.div>
  );
}
export default Services;
