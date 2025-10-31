"use client";

import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaBed, FaToiletPaper, FaWifi } from "react-icons/fa";
import { LucideTv2 } from "lucide-react";
import { GiFireplace, GiToaster } from "react-icons/gi";
import { MdBathtub, MdOutlineAirlineSeatReclineExtra } from "react-icons/md";
import { ClipLoader } from "react-spinners";

const StyledSwiper = styled(Swiper)`
  padding-bottom: 40px;
`;

function ExecutiveBeds() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/rooms?roomType=Executive");
        const data = await response.json();
        setRooms(data.rooms || []);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[400px]">
        <ClipLoader color="#065F46" size={50} />
      </div>
    );

  if (!rooms.length)
    return (
      <div className="text-center text-gray-600 py-10">No rooms available</div>
    );

  return (
    <div className="relative bg-gradient-to-b from-white to-green-50 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-green-900 text-center mb-10 tracking-tight">
          Executive Rooms
        </h2>

        <StyledSwiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={30}
          pagination={{ clickable: true }}
          autoplay={{ delay: 10000, disableOnInteraction: false }}
          loop
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 2, spaceBetween: 40 },
          }}
        >
          {rooms.map((room) => (
            <SwiperSlide key={room._id}>
              <ExecutiveBedsCard room={room} />
            </SwiperSlide>
          ))}
        </StyledSwiper>
      </div>

      {/* Floating Global CTA */}
      <Link
        href="/booking"
        className="fixed bottom-6 right-6 bg-gradient-to-r from-amber-500 to-yellow-400 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:scale-105 transition-all z-50 backdrop-blur-md"
      >
        Book Now
      </Link>
    </div>
  );
}

function ExecutiveBedsCard({ room }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative rounded-2xl overflow-hidden shadow-lg bg-white group hover:shadow-2xl transition-all duration-500"
    >
      {/* Image with Overlay */}
      <div className="relative h-80">
        <Image
          src={room.imageUrl || "/fallback.jpg"}
          alt={room.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>

        {/* Floating Price */}
        <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm">
          <span className="text-green-900 font-bold text-lg">
            ${room.price?.toLocaleString() || "N/A"}
          </span>
          <span className="text-sm text-gray-700"> / night</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-green-950 mb-2">{room.name}</h3>
        <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
          {room.description}
        </p>

        <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-6">
          <Feature icon={<FaBed />} text={room.roomType} />
          <Feature icon={<LucideTv2 />} text="Flat Screen TV" />
          <Feature icon={<FaWifi />} text="Free WiFi" />
          <Feature icon={<GiFireplace />} text="Fireplace" />
          <Feature icon={<MdBathtub />} text="Private Bathroom" />
        </div>

        {/* Button Bar */}
        <div className="flex gap-3">
          <Link
            href={`/rooms/${room._id}`}
            className="flex-1 py-2 text-center font-semibold rounded-lg border border-green-900 text-green-900 hover:bg-green-900 hover:text-white transition-all"
          >
            View Details
          </Link>
          <Link
            href={`/rooms/${room._id}`}
            className="flex-1 py-2 text-center font-semibold rounded-lg bg-gradient-to-r from-amber-500 to-yellow-400 text-white hover:scale-105 transition-all"
          >
            Book Now
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function Feature({ icon, text }) {
  return (
    <div className="flex items-center gap-2 bg-green-50 px-2 py-1 rounded-full">
      <span className="text-green-800">{icon}</span>
      <span>{text}</span>
    </div>
  );
}

export default ExecutiveBeds;
