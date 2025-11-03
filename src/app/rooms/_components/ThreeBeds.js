"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaBed, FaWifi } from "react-icons/fa";
import { LucideTv2 } from "lucide-react";
import { GiFireplace } from "react-icons/gi";
import { MdBathtub } from "react-icons/md";
import { ClipLoader } from "react-spinners";

export default function ThreeBeds() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRooms() {
      try {
        const res = await fetch("/api/rooms?roomType=ThreeBeds");
        const data = await res.json();
        setRooms(data.rooms || []);
      } catch (err) {
        console.error("Failed to load rooms", err);
      } finally {
        setLoading(false);
      }
    }
    fetchRooms();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[400px] bg-[#f5f5f0]">
        <ClipLoader color="#0f5132" size={50} />
      </div>
    );

  if (!rooms.length)
    return (
      <div className="text-center text-gray-600 py-20 bg-[#f5f5f0]">
        No three-bed suites available
      </div>
    );

  return (
    <section className="relative bg-gradient-to-b from-[#f9faf8] to-[#f1f4f2] py-20">
      <div className="max-w-7xl mx-auto px-6 space-y-20">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-extrabold text-center text-[#06402B] mb-12"
        >
          Three-Bed Family Suites
        </motion.h2>

        {rooms.map((room, i) => (
          <motion.div
            key={room._id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            className={`flex flex-col md:flex-row ${
              i % 2 !== 0 ? "md:flex-row-reverse" : ""
            } items-center gap-10 bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all`}
          >
            {/* Image */}
            <div className="relative w-full md:w-1/2 h-[400px]">
              <Image
                src={room.imageUrl || "/fallback.jpg"}
                alt={room.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4 bg-[#06402B]/80 text-white font-semibold px-4 py-2 rounded-full text-sm shadow-md">
                ${room.price?.toLocaleString() || "N/A"} / night
              </div>
            </div>

            {/* Content */}
            <div className="w-full md:w-1/2 p-8 md:p-12 space-y-5">
              <h3 className="text-3xl font-bold text-[#06402B]">{room.name}</h3>
              <p className="text-gray-700 leading-relaxed">
                {room.description}
              </p>

              <div className="flex flex-wrap gap-3 mt-4">
                <Feature icon={<FaBed />} text={room.roomType} />
                <Feature icon={<LucideTv2 />} text="Smart TV" />
                <Feature icon={<FaWifi />} text="High-Speed Wi-Fi" />
                <Feature icon={<GiFireplace />} text="Fireplace" />
                <Feature icon={<MdBathtub />} text="Luxury Bath" />
              </div>

              <div className="flex gap-4 pt-6">
                <Link
                  href={`/rooms/three-beds/${room._id}`}
                  className="px-6 py-3 border-2 border-[#06402B] text-[#06402B] rounded-lg font-semibold hover:bg-[#06402B] hover:text-white transition"
                >
                  View Details
                </Link>
                <Link
                  href={`/booking?room=${room._id}`}
                  className="px-6 py-3 bg-gradient-to-r from-[#0F5132] to-[#198754] text-white rounded-lg font-semibold hover:scale-105 transition-transform"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Feature({ icon, text }) {
  return (
    <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full border border-green-100 text-[#06402B] text-sm font-medium">
      <span className="text-[#198754]">{icon}</span>
      <span>{text}</span>
    </div>
  );
}
