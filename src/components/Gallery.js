"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

function Gallery() {
  return (
    <div className="flex flex-col items-center justify-center mt-14 bg-white">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="text-2xl md:text-4xl font-nono text-center"
      >
        <div className="flex items-center justify-center gap-2 my-4">
          <div className="w-10 h-1 bg-amber-700"></div>
          <h1 className="text-lg  uppercase text-amber-700">our gallery</h1>
          <div className="w-10 h-1 bg-amber-700"></div>
        </div>
        <h className=" text-green-950 text-2xl md:text-3xl ">
          Explore Our Gallery
        </h>
      </motion.div>
      <div className="flex flex-wrap items-center justify-center gap-5 mt-10">
        <GalleryCard image={"/img_14.jpg"} />{" "}
        <GalleryCard image={"/img_2.jpg"} />{" "}
        <GalleryCard image={"/img_6.jpg"} />{" "}
        <GalleryCard image={"/img_7.jpg"} />{" "}
        <GalleryCard image={"/img_8.jpg"} />{" "}
        <GalleryCard image={"/img_9.jpg"} />{" "}
        <GalleryCard image={"/img_5.jpg"} />{" "}
        <GalleryCard image={"/img_15.jpg"} />{" "}
        <GalleryCard image={"/img_10.jpg"} />{" "}
      </div>
    </div>
  );
}

function GalleryCard({ image }) {
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
      // whileHover={{
      //   // scale: 1.1,
      //   backgroundColor: "#00001C",
      //   color: "white",
      // }}
      transition={{ duration: 0.9 }}
      className="flex flex-col w-80 h-[300px] shadow-2xl  border  bg-transparent rounded-lg bg-white my-5 mx-auto text-gray-600 p-5 "
    >
      <div className="border ">
        <Image
          src={image}
          alt="CFK Gallery"
          height={400}
          width={500}
          className="object-cover w-80 h-64"
        />
      </div>
    </motion.div>
  );
}

export default Gallery;
