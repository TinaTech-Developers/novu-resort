"use client";
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

function About() {
  const videoRef = useRef(null);

  useEffect(() => {
    // Start the video at the 10th minute (600 seconds) or 13th minute (780 seconds)
    const startTime = 600; // For 10 minutes, change this to 780 for 13 minutes
    if (videoRef.current) {
      videoRef.current.currentTime = startTime;
      videoRef.current.play(); // Ensure the video starts playing at that point
    }
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pb-14 bg-white md:pt-10 px-5 md:px-10">
      <div className="col-span-1 md:px-20">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col gap-2 mt-4"
        >
          <div className="flex items-center gap-2 mt-4">
            <h1 className="text-sm uppercase text-amber-700">luxury living</h1>
            <div className="w-10 h-[2px] bg-amber-700"></div>
          </div>

          <h1 className="text-2xl md:text-3xl mb-4 text-green-950 uppercase font-semibold">
            Stay with Us and Create Memorable Moments
          </h1>
        </motion.div>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-black font-normal text-left text-sm">
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
        </motion.div>
      </div>

      {/* Video section instead of Image */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="col-span-1 flex flex-col items-center justify-center  md:px-20 my-4 border-2 border-green-900 py-4 md:py-8"
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source
            src="https://5puqigze8f.ufs.sh/f/M8crfG3am8lfN622jmx0cTGyLvK3WJ9zrOo7egmwQVMpZCPE"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </motion.div>
    </div>
  );
}

export default About;
