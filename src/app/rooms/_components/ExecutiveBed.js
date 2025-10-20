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
        // 👇 New unified API call with filter
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
    <StyledSwiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={50}
      pagination={{ clickable: true }}
      autoplay={{ delay: 25000, disableOnInteraction: false }}
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
  );
}

function ExecutiveBedsCard({ room }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="w-[80%] h-full border mx-auto border-green-900 rounded-lg overflow-hidden"
    >
      <Image
        src={room.imageUrl || "/fallback.jpg"}
        alt={room.name}
        height={200}
        width={300}
        quality={100}
        className="w-full h-80 object-cover"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 m-5 text-gray-900">
        <div className="col-span-2 flex flex-col justify-between">
          <h1 className="uppercase text-green-950 mb-4 font-bold">
            {room.name}
          </h1>
          <p className="pb-4 text-xs">{room.description}</p>
          <Link
            href={`/rooms/${room._id}`}
            className="p-2 text-white bg-green-900 hover:bg-green-800 text-center rounded-lg transition"
          >
            View Details
          </Link>
        </div>

        <div className="col-span-3 text-sm">
          <h1 className="uppercase mb-4 font-semibold">Facilities</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <div className="flex items-center gap-2">
                <FaBed /> {room.roomType}
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
            </div>
            <div>
              <div className="flex items-center gap-2">
                <FaToiletPaper /> Toiletries
              </div>
              <div className="flex items-center gap-2">
                <MdBathtub /> En-Suite Bathroom
              </div>
              <div className="flex items-center gap-2">
                <FaWifi /> Free WiFi
              </div>
              <div className="flex items-center gap-2">
                <GiFireplace /> Fireplace
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ExecutiveBeds;
