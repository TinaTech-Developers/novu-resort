"use client";
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";

function HeroCardHome({ text, head }) {
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
    <div className="relative w-full h-[70vh] md:h-screen">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source
          src="https://5puqigze8f.ufs.sh/f/M8crfG3am8lf7ntPvHXCHSpNdDAzEvsBU2q3RhITMx9bJeZr"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Content Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center">
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

export default HeroCardHome;
