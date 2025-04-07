"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

function About() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:-mt-16 bg-white">
      <div className="col-span-1 px-10">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col  gap-2 my-4"
        >
          <div className="flex items-center gap-2 my-4">
            <h1 className="text-xl uppercase text-amber-700">luxury living</h1>
            <div className="w-10 h-1 bg-amber-700"></div>
          </div>

          <h1 className="text-2xl md:text-4xl font-mono text-green-950">
            Stay and Enjoy
          </h1>
        </motion.div>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-black font-normal">
            {" "}
            Welcome to Novu Resort, your ultimate destination for relaxation and
            rejuvenation. Nestled amidst the serene landscapes and breathtaking
            views, our resort is a haven of tranquility, offering an escape from
            the hustle and bustle of everyday life. We are about 18km from
            Nyanga Centre or Nyangani Mountain about 2.7km from Troutbeck
            Resort. Our story began when our founder, a passionate traveller,
            fell in love with this idyllic location. He envisioned a place where
            people could experience the beauty of nature while enjoying the
            comforts of a home away from home. Thus, Novu Resort was born.
            Today, we offer a range of luxurious accommodation e.g. spacious
            family homes, standard double room, standard twin room, executive
            suites, all designed with your comfort in mind. Our facilities
            include a restaurant serving local and international cuisine,
            conference room and a variety of recreational activities for all
            ages e.g quad biking, team building exercise, guided tours / walks
            and game viewing by arrangement with national parks.
          </p>
          <div className="flex items-center justify-between gap-10 mt-10 md:mx-10">
            <div className="w-24 h-24 border">
              <div className="w-20 h-20 border mx-auto my-2"></div>
            </div>
            <div className="w-24 h-24 border">
              <div className="w-20 h-20 border mx-auto my-2"></div>
            </div>
            <div className="w-24 h-24 border">
              <div className="w-20 h-20 border mx-auto my-2"></div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button className="p-2 bg-amber-700 text-white uppercase px-4 mt-4 ">
              explore more
            </button>
          </div>
        </motion.div>
      </div>
      <div className="col-span-1 mx-auto my-20">
        <div className="grid grid-cols-1 md:flex items-baseline gap-2">
          <div className="">
            <Image
              src={"/img_9.jpg"}
              height={300}
              width={200}
              alt=""
              className="w-80 h-72 md:h-56  md:w-48 object-cover"
            />
            <motion.p
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, y: -30, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="absolute -translate-y-36 px-4 text-white text-sm bg-green-950"
            >
              Bird Watching
            </motion.p>
          </div>
          <div className="">
            <Image
              src={"/img_7.jpg"}
              height={400}
              width={300}
              alt=""
              className="w-80 h-72 object-cover"
            />
            <motion.p
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, y: -30, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="absolute -translate-y-8 px-4 text-white text-sm bg-green-950"
            >
              Nyangani Mountain
            </motion.p>
          </div>
        </div>
        <div className="flex mt-2 md:gap-2">
          <div className="">
            <Image
              src={"/banar.jpg"}
              height={300}
              width={200}
              alt=""
              className=" w-40 h-36 md:w-40 md:h-40 object-cover items-end"
            />
            <motion.p
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, y: -30, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="absolute -translate-y-8 px-2 text-white text-sm bg-green-950"
            >
              Conference
            </motion.p>
          </div>
          <div className="">
            <Image
              src={"/IMG-20231122-WA0048.jpg"}
              height={400}
              width={300}
              alt=""
              className="w-40 h-36 md:w-56 md:h-48 object-cover"
            />
            <motion.p
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, y: -30, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="absolute -translate-y-8 px-2 text-white text-sm bg-green-950"
            >
              Apartments
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
