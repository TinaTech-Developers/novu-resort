"use client";
import React from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";

const apartments = [
  {
    id: 1,
    title: "Executive Bed",
    description: "Spacious and luxurious rooms for the ultimate comfort.",
    image: "/executive-bed.jpg",
    beds: 1,
  },
  {
    id: 2,
    title: "2 Beds",
    description: "Perfect for small families or friends traveling together.",
    image: "/2-beds.jpg",
    beds: 2,
  },
  {
    id: 3,
    title: "3 Beds",
    description: "Ideal for larger families or groups seeking extra space.",
    image: "/3-beds.jpg",
    beds: 3,
  },
];

function Apartments() {
  const categorizedApartments = {
    "Executive Beds": apartments.filter((apartment) => apartment.beds === 1),
    "2 Beds": apartments.filter((apartment) => apartment.beds === 2),
    "3 Beds": apartments.filter((apartment) => apartment.beds === 3),
  };

  return (
    <div className="bg-gray-100">
      <header className="bg-blue-600 text-white py-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-bold"
        >
          Our Resort Apartments
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="text-xl mt-4"
        >
          Choose from our variety of luxurious apartments
        </motion.p>
      </header>

      <div className="container mx-auto px-4 py-16">
        {/* Executive Beds */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.7 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-semibold text-center text-blue-600 mb-8">
            Executive Beds
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categorizedApartments["Executive Beds"].map((apartment) => (
              <motion.div
                key={apartment.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={apartment.image}
                  alt={apartment.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.7 }}
                    className="text-2xl font-semibold"
                  >
                    {apartment.title}
                  </motion.h3>
                  <p className="text-gray-600 mt-2">{apartment.description}</p>
                  <div className="mt-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition duration-200"
                    >
                      Book Now
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 2 Beds */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-semibold text-center text-blue-600 mb-8">
            2 Beds
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categorizedApartments["2 Beds"].map((apartment) => (
              <motion.div
                key={apartment.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={apartment.image}
                  alt={apartment.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.3, duration: 0.7 }}
                    className="text-2xl font-semibold"
                  >
                    {apartment.title}
                  </motion.h3>
                  <p className="text-gray-600 mt-2">{apartment.description}</p>
                  <div className="mt-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition duration-200"
                    >
                      Book Now
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 3 Beds */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.7 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-semibold text-center text-blue-600 mb-8">
            3 Beds
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categorizedApartments["3 Beds"].map((apartment) => (
              <motion.div
                key={apartment.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={apartment.image}
                  alt={apartment.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.7 }}
                    className="text-2xl font-semibold"
                  >
                    {apartment.title}
                  </motion.h3>
                  <p className="text-gray-600 mt-2">{apartment.description}</p>
                  <div className="mt-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition duration-200"
                    >
                      Book Now
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      <footer className="bg-gray-800 text-white py-6 text-center">
        <p>&copy; 2025 Resort Name. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Apartments;
