"use client";
import React from "react";
import { motion } from "framer-motion";

function Map() {
  return (
    <div className="w-full">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="text-4xl font-bold text-center"
      >
        <div className="flex items-center justify-center gap-2 my-4">
          <div className="w-10 h-1 bg-amber-700"></div>
          <h1 className="text-lg uppercase text-amber-700">where to find us</h1>
          <div className="w-10 h-1 bg-amber-700"></div>
        </div>
        <h className="text-green-950 text-center">Our Location</h>
      </motion.div>
      <div className="flex flex-col items-center justify-center mt-16 p-10 bg-gray-900">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30318.651788361305!2d32.716991268159205!3d-18.21766660033422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x192c160d9f2bb9ef%3A0xba228e0d80b4f7f4!2sNyanga!5e0!3m2!1sen!2szw!4v1728331874497!5m2!1sen!2szw"
          width="800"
          height="600"
          // style="border:0;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          className="w-full h-96  object-cover "
        ></iframe>
      </div>
    </div>
  );
}

export default Map;
