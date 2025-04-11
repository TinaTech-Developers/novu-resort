import Image from "next/image";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

function Apartments() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 p-10 gap-5 ">
      <ApartmentsCard
        image={"/apartments/IMG_8993.JPG"}
        heading={" Executive Beds"}
        description={
          "Executive beds in hotels are large, comfortable beds with luxury features, often found in premium rooms for an enhanced guest experience."
        }
        link={"/rooms#executive"}
      />
      <ApartmentsCard
        image={"/apartments/IMG_8993.JPG"}
        heading={" 2 Beds"}
        description={
          "Executive beds in hotels are large, comfortable beds with luxury features, often found in premium rooms for an enhanced guest experience."
        }
        link={"/rooms#two"}
      />
      <ApartmentsCard
        image={"/apartments/IMG_8993.JPG"}
        heading={" 3 Beds"}
        description={
          "Executive beds in hotels are large, comfortable beds with luxury features, often found in premium rooms for an enhanced guest experience."
        }
        link={"/rooms#three"}
      />
    </div>
  );
}

function ApartmentsCard({ image, link, heading, description }) {
  return (
    <motion.div
      initial={{
        x: 0,
        scale: 0,
        opacity: 0,
      }}
      whileInView={{
        x: 0,
        scale: 1,
        opacity: 1,
      }}
      transition={{ duration: 0.8 }}
      className=" flex flex-col items-cente justify-start h-[28rem] w-80 md:w-96 border border-[#06402B] shadow-2xl"
    >
      <Image
        src={image}
        alt="Executive Beds"
        height={400}
        width={300}
        className="w-full h-64 object-cover"
      />
      <div className="flex flex-col items-cente justify-start p-4">
        <h className="text-start uppercase text-[#06402B] font-semibold pb-2">
          {heading}
        </h>
        <p className="text-sm text-gray-800">{description}</p>
      </div>
      <div className="px-4">
        <Link
          type="submit"
          href={link}
          className=" border relative py-2 px-6 text-sm z-20 bg-transparent text-gray-600 transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-green-900 before:transition-transform before:duration-300 before:content-[''] hover:text-white before:hover:scale-x-100"
        >
          View More
        </Link>
      </div>
    </motion.div>
  );
}

export default Apartments;
