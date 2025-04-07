"use client";
import React from "react";
import { motion } from "framer-motion";

import Typewriter from "typewriter-effect";

function HeroCard({ text, text1, head }) {
  //   let text = "Welcome To Our Luxury Villas";
  //   let text1 = "Click The Button Below for Bookings";

  return (
    <div className="bg-cover bg-no-repeat bg-center bg-[url('/banner1.jpg')] w-screen h-screen md:h-[35rem] top-40">
      <div className="bg-scroll  h-[35rem]">
        <div className="px-6 translate-y-80 md:pl-36 ">
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-2xl md:text-4xl text-white uppercase "
          >
            <div className="flex items-center gap-2 my-4">
              <div className="w-10 h-1 bg-orange-400"></div>
              <h1 className="text-lg">luxury living</h1>
              <div className="w-10 h-1 bg-orange-400"></div>
            </div>
            <div>
              <span className="w-10 h-56 bg-orange-400"></span>
            </div>
            {head}
          </motion.div>
          <div>
            <span className="w-10 h-56 bg-orange-400"></span>
          </div>
          <div className="text-lg md:text-xl text-start font-light md:pr-96 text-white mt-4">
            <Typewriter
              options={{
                autoStart: true,
                loop: true,
                delay: 50,
                strings: [text, text1],
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroCard;
