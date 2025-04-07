"use client";
import React from "react";
import { motion } from "framer-motion";

function SubHero({ head }) {
  return (
    <div className="bg-scroll bg-[url('/banar.jpg')] bg-no-repeat w-[100%] object-cover h-[500px]">
      <div className="bg-scroll bg-black bg-opacity-70 h-[500px]">
        <div className="px-6 translate-y-80 md:pl-36 ">
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-4xl text-white uppercase font-bold"
          >
            <div className="flex items-center gap-2 my-4">
              <div className="w-10 h-1 bg-orange-900"></div>
              <h1 className="text-lg">luxury living</h1>
              <div className="w-10 h-1 bg-orange-900"></div>
            </div>
            <div>
              <span className="w-10 h-56 bg-orange-900"></span>
            </div>
            {head}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default SubHero;
