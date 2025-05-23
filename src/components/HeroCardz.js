"use client";
import React from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import Image from "next/image";

function HeroCardz({ image, text, head }) {
  return (
    <div className="relative w-full h-[70vh] md:h-screen">
      {/* High-Quality Background Image */}
      <Image
        src={image}
        alt="Luxury boardroom"
        fill
        quality={100}
        priority
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* Overlay and Content */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 flex items-center justify-center">
        <div className="px-6 w-full max-w-3xl text-center">
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-white"
          >
            <div className="flex items-center gap-2 my-4 justify-center">
              <div className="w-10 h-1 bg-orange-400"></div>
              <h1 className="text-lg">luxury living</h1>
              <div className="w-10 h-1 bg-orange-400"></div>
            </div>
            <div>
              <span className="w-10 h-56 bg-blue-900"></span>
            </div>
            <h1 className="text-white uppercase text-3xl md:text-4xl font-bold">
              {head}
            </h1>
            <div className="text-xl font-light text-white mt-4">
              <Typewriter
                options={{
                  autoStart: true,
                  loop: true,
                  delay: 50,
                  strings: [text],
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default HeroCardz;
