"use client";
import { FaBed, FaToiletPaper, FaWifi } from "react-icons/fa";
import { GiFireplace, GiToaster } from "react-icons/gi";
import { MdBathtub, MdOutlineAirlineSeatReclineExtra } from "react-icons/md";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Modal from "@/components/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LucideTv2 } from "lucide-react";
import Image from "next/image";

function ExecutiveBeds() {
  const ROOM_URL = "/api/rooms";
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(ROOM_URL);
        const data = await response.json();
        console.log("Fetched data:", data); // Log the response data for debugging
        setRooms(data.rooms || []); // Ensure rooms are an array
        setLoading(false);
      } catch (error) {
        console.error("Error fetching rooms:", error);
        setLoading(false); // Stop loading in case of error
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading rooms...</div>;
  }

  if (!rooms || rooms.length === 0) {
    return <div>No rooms available</div>; // Handle case with no rooms
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2  p-6 md:p-10 gap-5">
      {rooms.map((room) => (
        <RoomCard key={room._id} room={room} />
      ))}
    </div>
  );
}
function RoomCard({ room }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [book, setBook] = useState(room.name);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [arrivaldate, setArrivaldate] = useState("");
  const [deptdate, setDeptdate] = useState("");
  const [adultsNo, setAdultsNo] = useState("");
  const [kidsNo, setKidsNo] = useState("");
  const [price, setPrice] = useState(room.price);
  const [total, setTotal] = useState("");

  const handleBook = async (e) => {
    e.preventDefault();
    if (
      !name ||
      !surname ||
      !address ||
      !country ||
      !email ||
      !arrivaldate ||
      !deptdate ||
      !kidsNo ||
      !adultsNo ||
      !book
    ) {
      alert("Fill all fields");
      return;
    }
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          surname,
          address,
          country,
          email,
          arrivaldate,
          deptdate,
          kidsNo,
          adultsNo,
          book,
          price,
          total,
        }),
      });
      if (res.ok) {
        toast("Your Booking Was Successful, We will respond to your email", {
          type: "success",
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      console.log("Error booking reservation");
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0,
        x: -100,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
        x: 0,
      }}
      transition={{ duration: 0.9 }}
      className="md:h-full shadow-2xl bg-transparent my-5 mx-auto text-gray-700  bg-white  border-2 border-[#06402B] w-full md:w-[100%] "
    >
      <h1 className="text-xl md:text-2xl text-center my-6">{room.name}</h1>
      <div className="col-span-1 md:col-span-3 w-full">
        {/* Swiper Component for Image Slider */}
        <Swiper
          modules={[Pagination, A11y]} // Include only the Pagination module
          spaceBetween={50}
          slidesPerView={1}
          pagination={{ clickable: true }} // Enable clickable pagination bars
          className="swiper-container"
        >
          {/* SwiperSlide for each image */}
          {room.imageUrl && (
            <SwiperSlide>
              <Image
                src={room.imageUrl}
                alt="room image"
                height={400}
                width={400}
                className="md:h-[25rem] w-full object-cover px-"
              />
            </SwiperSlide>
          )}
          {room.image1 && (
            <SwiperSlide>
              <Image
                src={room.image1}
                alt="room image"
                height={400}
                width={400}
                className="md:h-[25rem] w-full object-cover"
              />
            </SwiperSlide>
          )}
          {room.image2 && (
            <SwiperSlide>
              <Image
                src={room.image2}
                alt="room image"
                height={400}
                width={400}
                className="md:h-[25rem] w-full object-cover"
              />
            </SwiperSlide>
          )}
          {room.image3 && (
            <SwiperSlide>
              <Image
                src={room.image3}
                alt="room image"
                height={400}
                width={400}
                className="md:h-[25rem] w-full object-cover"
              />
            </SwiperSlide>
          )}
        </Swiper>
      </div>

      {/* Price guide, Facilities, etc. */}
      {/* <hr className="w-[100%]  mx-auto  mt-4" /> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-5">
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
                <FaBed size={20} /> {room.roomType} Bed
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
                  <MdBathtub size={20} /> 2 En-Suite Bathroom
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
        <div className="flex items-center justify-between">
          <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
            <form onSubmit={handleBook}>
              <h3 className="font-bold text-lg text-center py-2">
                {book} : ${Number(price) * Number(adultsNo)}
              </h3>
              {/* Booking form fields */}
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="flex items-baseline justify-between gap-10">
                  <button
                    type="submit"
                    className="border py-2 px-6 bg-transparent text-gray-700 transition-colors hover:text-white"
                  >
                    Submit Form
                  </button>
                  <div className="font-bold border p-4">
                    <label className="mx-auto">Total Cost :</label>
                    <input
                      value={total}
                      onChange={(e) =>
                        setTotal(Number(price) * Number(adultsNo))
                      }
                      className="text-center"
                    />
                  </div>
                </div>
              </div>
            </form>
          </Modal>
        </div>
      </div>
    </motion.div>
  );
}
export default ExecutiveBeds;
