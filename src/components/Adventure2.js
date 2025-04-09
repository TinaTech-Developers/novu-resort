"use client";
import React from "react";
import { motion } from "framer-motion";
import Video from "./Video";
import FillButton from "./FillButton";
function Adventure2() {
  return (
    <div className="flex flex-col items-center justify-centerw-full px-10 ">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="text-2xl md:text-4xl font-nono my-4 md:mb-10"
      >
        <div className="flex items-center justify-center gap-2 my-4">
          <div className="w-10 h-1 bg-amber-700"></div>
          <h1 className="text-lg uppercase text-amber-700">
            holiday in inyanga
          </h1>
          <div className="w-10 h-1 bg-amber-700"></div>
        </div>
        <h className="text-green-950">Exciting Journey</h>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2">
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
          //   backgroundColor: "#06402B",
          //   color: "white",
          // }}
          transition={{ duration: 0.9 }}
          className="col-span-1 border-2 border-[#06402B] md:px-10"
        >
          <Video
            video={
              "https://utfs.io/f/M8crfG3am8lfL9D9rm9uKAaL1TB6NQhjD0kumYc2sR5vVnlz"
            }
          />
        </motion.div>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="col-span-1 bg-[#06402B] text-white md:p-10"
        >
          <h1 className="text-xl font-semibold uppercase hover:text-green-600 py-4 hover:underline">
            Welcome to Nyanga, a Leading Tourist Resort Destination in Zimbabwe
          </h1>
          <p className="text-white text-sm">
            Nyanga, located in the Eastern Highlands of Zimbabwe, is a
            breathtaking destination known for its spectacular landscapes,
            diverse cultural heritage and amazing forests, making it a
            must-visit tourist destination. Its cool climatic and natural
            environment make it an exciting retreat for nature lovers and
            adventure seekers.
          </p>
          <div className="my-4">
            <FillButton name={"Explore More!"} link={"/activities"} />
          </div>
        </motion.div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="col-span-1 bg-[#06402B] text-white md:p-10"
        >
          <h1 className="text-xl font-semibold uppercase hover:text-green-600 py-4 hover:underline">
            An Adventure Through Zimbabwe's Eastern Highlands
          </h1>
          <p className="text-white text-sm">
            Zimbabwe's Eastern Highlands offers a stunning adventure with its
            misty Bvumba Mountains, dramatic waterfalls in Nyanga National Park,
            and the challenging ascent of Mount Nyangani. The region is rich in
            biodiversity, culture, and history, featuring picturesque trails,
            local villages, and ancient ruins. Whether trekking, birdwatching,
            or exploring, it’s a hidden gem for outdoor lovers and culture
            seekers alike.
          </p>
          <div className="my-4">
            <FillButton name={"Explore More!"} link={"/activities"} />
          </div>
        </motion.div>
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
          //   backgroundColor: "#06402B",
          //   color: "white",
          // }}
          transition={{ duration: 0.9 }}
          className="col-span-1 border-2 border-[#06402B] md:px-10"
        >
          <Video
            video={
              "https://utfs.io/f/M8crfG3am8lfL9D9rm9uKAaL1TB6NQhjD0kumYc2sR5vVnlz"
            }
            link={"/inyanga"}
          />
        </motion.div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
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
          //   backgroundColor: "#06402B",
          //   color: "white",
          // }}
          transition={{ duration: 0.9 }}
          className="col-span-1 border-2 border-[#06402B] md:px-10"
        >
          <Video
            video={
              "https://utfs.io/f/M8crfG3am8lfL9D9rm9uKAaL1TB6NQhjD0kumYc2sR5vVnlz"
            }
            link={"/inyanga"}
          />
        </motion.div>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="col-span-1 bg-[#06402B] text-white md:p-10"
        >
          <h1 className="text-xl font-semibold uppercase hover:text-green-600 py-4 hover:underline">
            Thrilling Quad Biking Adventures at Novu Resort
          </h1>
          <p className="text-white text-sm">
            Experience the adrenaline rush of quad biking at Novu Resort with
            two exciting routes tailored for every adventurer. Choose the
            adventurous and risky route for an exhilarating ride through rugged
            terrains, steep hills, and challenging obstacles that will test your
            skills and bravery. Alternatively, opt for the easy route, perfect
            for beginners or those seeking a more relaxed experience, featuring
            scenic paths and gentle slopes that still offer stunning views of
            the surrounding landscape. Whether you’re seeking thrills or a
            leisurely ride, Novu Resort has the perfect quad biking adventure
            for you!
          </p>
          <div className="my-4">
            <FillButton name={"Explore More!"} link={"/activities"} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Adventure2;
