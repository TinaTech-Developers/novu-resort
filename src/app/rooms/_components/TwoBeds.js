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
import "swiper/css/autoplay"; // Import autoplay styles
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaBed, FaToiletPaper, FaWifi } from "react-icons/fa";
import { LucideTv2 } from "lucide-react";
import { GiFireplace, GiToaster } from "react-icons/gi";
import { MdBathtub, MdOutlineAirlineSeatReclineExtra } from "react-icons/md";

const Slide = styled.div`
  height: 200px; /* Adjust height as needed */
  border: 1px solid #ccc; /* Example border */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5; /* Example background */
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px; /* Space between pagination bullets */
  margin-top: 10px; /* Space above pagination */
`;

const StyledSwiper = styled(Swiper)`
  /* Ensure the Swiper has room for the pagination */
  padding-bottom: 40px; /* Adjust based on the pagination height */
`;

function TwoBeds() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [rooms, setRooms] = useState([]); // Store fetched room data

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/rooms");
        const data = await response.json();
        console.log("Fetched data:", data);
        setRooms(data.rooms || []); // Ensure rooms are an array
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    }
    fetchData();
  }, []);

  if (!rooms || rooms.length === 0) {
    return <div>No rooms available</div>;
  }

  return (
    <>
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
        {/* Map through rooms and display each room */}
        {rooms.map((room) => (
          <SwiperSlide key={room._id}>
            <TwoBedsCard room={room} />
          </SwiperSlide>
        ))}
      </StyledSwiper>

      {/* You can add additional content here */}
    </>
  );
}

function TwoBedsCard({ room }) {
  if (!room) {
    return null; // Make sure the room exists before rendering
  }

  return (
    <motion.div
      initial={{
        x: 0,
        scale: 0,
        opacity: 0,
      }}
      whileInView={{
        x: 0,
        scale: 1,
        opacity: 1,
      }}
      transition={{ duration: 0.8 }}
      className="w-full h-full border relative group border-green-900"
    >
      {/* Image rendering: Make sure `room.image` exists or use a default image */}
      <Image
        src={room.image || "/Dove 2nd bedroom 2-.jpg"} // Add default fallback image
        alt={room.name}
        height={200}
        width={300}
        className="w-full h-80 object-cover"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-5 text-gray-900">
        <div className="col-span-1 flex flex-col items-start justify-between pr-4">
          <h1 className="uppercase text-xl mb-4">{room.name}</h1>
          <p className="pb-4 w-full text-sm font-normal">{room.description}</p>
          <Link
            key={room._id}
            href={`/rooms/${room._id}`}
            className="p-2 text-white bg-green-900"
          >
            View Details
          </Link>
        </div>
        <div className="col-span-1 md:col-span-2 md:ml-4">
          <h1 className="uppercase text-xl mb-4">Apartment Facilities</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 text-sm font-normal">
            <div className="col-span-1 flex flex-col items-start justify-between my-4 gap-4">
              <div className="flex items-center justify-center gap-1">
                <FaBed size={20} /> {room.beds} Bed
              </div>
              <div className="flex items-center justify-center gap-1">
                <LucideTv2 size={20} /> Flat Screen TV
              </div>
              <div className="flex items-center justify-center gap-1">
                <GiToaster size={20} /> Braai Area
              </div>
              <div className="flex items-center justify-center gap-1">
                <MdOutlineAirlineSeatReclineExtra size={20} /> Sitting Area
              </div>
            </div>
            <div className="col-span-1 text-xs">
              <div className="flex flex-col items-start justify-between my-4 gap-4">
                <div className="flex items-center justify-center gap-1">
                  <FaToiletPaper size={20} /> Toiletries
                </div>
                <div className="flex items-center justify-center gap-1">
                  <MdBathtub size={20} /> En-Suite Bathroom
                </div>
                <div className="flex items-center justify-center gap-1">
                  <FaWifi size={20} /> Free WiFi
                </div>
                <div className="flex items-center justify-center gap-1">
                  <GiFireplace size={20} /> Fire Place
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default TwoBeds;
