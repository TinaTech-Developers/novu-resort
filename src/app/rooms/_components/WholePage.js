"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners";
import {
  FaWifi,
  FaBed,
  FaSwimmingPool,
  FaUtensils,
  FaFire,
} from "react-icons/fa";
import { MdOutlineBathtub } from "react-icons/md";

export default function Accommodation() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRooms() {
      try {
        const response = await fetch("/api/twobed");
        const data = await response.json();
        setRooms(data.twobeds || []);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRooms();
  }, []);

  return (
    <div className="bg-white text-green-950">
      {/* ✅ HERO SECTION */}
      <section className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/resort-hero.jpg"
          alt="Novu Resort"
          fill
          priority
          className="object-cover brightness-50"
        />
        <div className="relative z-10 text-center text-white px-6">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold mb-4"
          >
            Our Accommodation
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg max-w-2xl mx-auto"
          >
            Experience true comfort and elegance at Novu Resort. Each suite is
            designed to blend luxury, nature, and relaxation.
          </motion.p>
        </div>
      </section>

      {/* ✅ ROOMS SECTION */}
      <section className="max-w-7xl mx-auto py-20 px-6">
        <h2 className="text-3xl font-semibold mb-12 text-center text-green-900">
          Explore Our Rooms
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-[400px]">
            <ClipLoader color="#065F46" size={50} />
          </div>
        ) : rooms.length === 0 ? (
          <p className="text-center text-gray-600">No rooms available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {rooms.map((room, index) => (
              <motion.div
                key={room._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white border border-green-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative w-full h-60">
                  <Image
                    src={room.imageUrl || "/default.jpg"}
                    alt={room.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-green-900 mb-2">
                    {room.name}
                  </h3>
                  <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                    {room.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 text-sm text-green-800 mb-6">
                    <div className="flex items-center gap-2">
                      <FaBed /> {room.beds} Beds
                    </div>
                    <div className="flex items-center gap-2">
                      <MdOutlineBathtub /> En-suite
                    </div>
                    <div className="flex items-center gap-2">
                      <FaWifi /> Free WiFi
                    </div>
                    <div className="flex items-center gap-2">
                      <FaUtensils /> Dining
                    </div>
                    <div className="flex items-center gap-2">
                      <FaSwimmingPool /> Pool
                    </div>
                    <div className="flex items-center gap-2">
                      <FaFire /> Fireplace
                    </div>
                  </div>

                  <Link
                    href={`/rooms/twobeds/${room._id}`}
                    className="inline-block bg-green-900 text-white py-2 px-4 rounded-lg hover:bg-green-800 transition-all"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* ✅ CALL TO ACTION */}
      <section className="bg-green-900 text-white text-center py-16 px-6">
        <h2 className="text-3xl font-bold mb-4">Book Your Stay Today</h2>
        <p className="max-w-2xl mx-auto mb-8">
          Discover peace and comfort at Novu Resort. Whether it’s a romantic
          getaway or a family retreat, we have the perfect space for you.
        </p>
        <Link
          href="/booking"
          className="bg-white text-green-900 font-semibold py-3 px-6 rounded-lg hover:bg-green-100 transition-all"
        >
          Reserve Now
        </Link>
      </section>
    </div>
  );
}
