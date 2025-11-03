"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ClipLoader } from "react-spinners";
import { FaBed, FaToiletPaper, FaWifi } from "react-icons/fa";
import { LucideTv2 } from "lucide-react";
import { GiFireplace, GiToaster } from "react-icons/gi";
import { MdBathtub, MdOutlineAirlineSeatReclineExtra } from "react-icons/md";

export default function TwoBeds() {
  const [twobed, setTwoBed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRooms() {
      try {
        const res = await fetch("/api/rooms?roomType=two-bed");
        const data = await res.json();
        setTwoBed(data.rooms || []);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRooms();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[400px]">
        <ClipLoader color="#065F46" size={50} />
      </div>
    );

  if (!twobed || twobed.length === 0)
    return (
      <div className="text-center text-gray-600 py-20">No rooms available</div>
    );

  return (
    <section className="relative w-full h-[90vh] md:my-20">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
        loop
        className="h-full"
      >
        {twobed.map((room) => (
          <SwiperSlide key={room._id}>
            <LuxuryRoomSlide room={room} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Floating global Book Now button */}
      <Link
        href="/booking"
        className="fixed bottom-6 right-6 bg-gradient-to-r from-amber-500 to-yellow-400 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:scale-105 transition-all z-50 backdrop-blur-md"
      >
        Book Now
      </Link>
    </section>
  );
}

function LuxuryRoomSlide({ room }) {
  return (
    <div className="relative w-full h-[90vh] overflow-hidden">
      {/* Background Image */}
      <Image
        src={room.imageUrl || "/default.jpg"}
        alt={room.name}
        fill
        className="object-cover brightness-75 transition-transform duration-700 hover:scale-105"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />

      {/* Floating Price Tag */}
      <div className="absolute top-6 left-6 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
        <span className="text-green-900 font-bold text-lg">
          ${room.price?.toLocaleString() || "N/A"}
        </span>
        <span className="text-sm text-gray-700"> / night</span>
      </div>

      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 flex flex-col justify-center px-8 md:px-20 text-white max-w-2xl"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4 uppercase tracking-wide text-yellow-400 drop-shadow-lg">
          {room.name}
        </h2>
        <p className="text-sm md:text-base text-gray-200 leading-relaxed mb-6">
          {room.description}
        </p>

        {/* Facilities */}
        <div className="grid grid-cols-2 gap-3 text-gray-300 text-sm mb-6">
          <div className="flex items-center gap-2">
            <FaBed /> {room.beds} Bed
          </div>
          <div className="flex items-center gap-2">
            <LucideTv2 /> Flat Screen TV
          </div>
          <div className="flex items-center gap-2">
            <GiToaster /> Braai Area
          </div>
          <div className="flex items-center gap-2">
            <MdOutlineAirlineSeatReclineExtra /> Sitting Area
          </div>
          <div className="flex items-center gap-2">
            <FaWifi /> Free WiFi
          </div>
          <div className="flex items-center gap-2">
            <GiFireplace /> Fireplace
          </div>
          <div className="flex items-center gap-2">
            <MdBathtub /> En-Suite Bathroom
          </div>
          <div className="flex items-center gap-2">
            <FaToiletPaper /> Toiletries
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <Link
            href={`/rooms/two-beds/${room._id}`}
            className="bg-green-800 hover:bg-green-700 text-white py-2 px-6 rounded-md text-sm font-medium transition duration-300"
          >
            View Details
          </Link>
          <Link
            href={`/rooms/two-beds/${room._id}`}
            className="bg-gradient-to-r from-amber-500 to-yellow-400 hover:scale-105 transition-all text-white py-2 px-6 rounded-md text-sm font-semibold shadow-lg"
          >
            Book Now
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
