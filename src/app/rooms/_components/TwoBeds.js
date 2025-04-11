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
import { ClipLoader } from "react-spinners"; // ✅ import the loader

const StyledSwiper = styled(Swiper)`
  padding-bottom: 40px;
`;

function TwoBeds() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [twobed, setTwoBed] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ loader state

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/twobed");
        const data = await response.json();
        console.log("Fetched data:", data);
        setTwoBed(data.twobeds || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching rooms:", error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // ✅ Loader UI while fetching
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <ClipLoader color="#065F46" size={50} />
      </div>
    );
  }

  // ✅ Fallback if no rooms available
  if (!twobed || twobed.length === 0) {
    return <div>No rooms available</div>;
  }

  return (
    <StyledSwiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={50}
      pagination={{ clickable: true }}
      onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      loop={true}
      breakpoints={{
        640: { slidesPerView: 1, spaceBetween: 20 },
        768: { slidesPerView: 2, spaceBetween: 30 },
        1024: { slidesPerView: 2, spaceBetween: 40 },
      }}
    >
      {twobed.map((room) => (
        <SwiperSlide key={room._id}>
          <TwoBedsCard room={room} />
        </SwiperSlide>
      ))}
    </StyledSwiper>
  );
}

function TwoBedsCard({ room }) {
  if (!room) return null;

  return (
    <motion.div
      initial={{ x: 0, scale: 0, opacity: 0 }}
      whileInView={{ x: 0, scale: 1, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-[80%] h-full border mx-auto relative group border-green-900"
    >
      <Image
        src={room.imageUrl || "/default.jpg"}
        alt={room.name}
        height={200}
        width={300}
        quality={100}
        className="w-full h-80 object-cover"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 m-5 text-gray-900">
        <div className="col-span-2 flex flex-col items-start justify-between pr-4">
          <h1 className="uppercase text-green-950 mb-4">{room.name}</h1>
          <p className="pb-4 w-full text-xs">{room.description}</p>
          <Link
            href={`/rooms/${room._id}`}
            className="p-2 text-white bg-green-900"
          >
            View Details
          </Link>
        </div>
        <div className="col-span-1 md:col-span-3 md:ml-4">
          <h1 className="uppercase mb-4">Apartment Facilities</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 text-sm font-normal ">
            <div className="flex flex-col items-start my-4 gap-4 mr-4">
              <div className="flex items-center gap-1">
                <FaBed size={20} /> {room.beds} Bed
              </div>
              <div className="flex items-center gap-1">
                <LucideTv2 size={20} /> Flat Screen TV
              </div>
              <div className="flex items-center gap-1">
                <GiToaster size={20} /> Braai Area
              </div>
              <div className="flex items-center gap-1">
                <MdOutlineAirlineSeatReclineExtra size={20} /> Sitting Area
              </div>
            </div>
            <div className="text-xs flex flex-col items-start my-4 gap-4">
              <div className="flex items-center gap-1">
                <FaToiletPaper size={20} /> Toiletries
              </div>
              <div className="flex items-center gap-1">
                <MdBathtub size={20} /> En-Suite Bathroom
              </div>
              <div className="flex items-center gap-1">
                <FaWifi size={20} /> Free WiFi
              </div>
              <div className="flex items-center gap-1">
                <GiFireplace size={20} /> Fire Place
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default TwoBeds;
