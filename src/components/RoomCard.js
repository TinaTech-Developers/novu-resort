"use client";
import Image from "next/image";
import { FaBed, FaStar, FaToiletPaper, FaWifi } from "react-icons/fa";
import { GiFireplace, GiToaster } from "react-icons/gi";
import {
  MdBathtub,
  MdElectricalServices,
  MdElectricMeter,
  MdOutlineAirlineSeatReclineExtra,
} from "react-icons/md";
import { motion } from "framer-motion";
import { useState } from "react";
import Modal from "./Modal";
import Link from "next/link";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { LucideTv2, PowerIcon, PowerSquare, Tv2 } from "lucide-react";

export default function RoomCard({ room }) {
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
  let [total, setTotal] = useState("");
  const handleBook = async (e) => {
    e.preventDefault();
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
        onClick();
      }
    } catch (error) {
      console.log("Error ");
    }
    const onClick = () => {
      toast("Your Booking Was Successful, We will respond to your email", {
        type: "success",
        position: toast.POSITION.TOP_CENTER,
      });
    };
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
      // whileHover={{
      //   // scale: 1.1,
      //   backgroundColor: "#06402B",
      //   color: "white",
      // }}
      transition={{ duration: 0.9 }}
      className="grid grid-cols-1 md:grid-cols-3 md:h-full shadow-2xl   bg-transparent  my-5 mx-auto text-gray-700 p-5 bg-white"
    >
      <h1 className=" text-xl md:text-2xl text-center my-6">{room.name}</h1>{" "}
      {/* <Image
        src={room.imageUrl}
        height={300}
        width={400}
        alt=""
        className="w-80 md:w-[96%] h-full md:h-[500px] object-cover mx-auto"
      /> */}
      <div className="col-span-1 md:col-span-3 md:w-[1000px] mx-4">
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          // scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          <SwiperSlide>
            <Image
              src={room.imageUrl}
              alt="room image"
              height={400}
              width={400}
              className="md:h-[25rem] w-full object-cover px-4"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={room.image1}
              alt="room image"
              height={400}
              width={400}
              className="h-[25rem] w-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={room.image2}
              alt="room image"
              height={400}
              width={400}
              className="h-[25rem] w-full object-cover"
            />
          </SwiperSlide>

          <SwiperSlide>
            <Image
              src={room.image3}
              alt="room image"
              height={400}
              width={400}
              className="h-[25rem] w-full object-cover"
            />
          </SwiperSlide>
        </Swiper>
        {/* <p className="p-2 relative z-20 bg-green-900 w-[9rem] text-center text-white -translate-y-6 translate-x-5">
         
        </p> */}
        {/* PRICE GUIDE */}
        <hr className="w-[96%] mx-auto mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-3 mx-5">
          <div className="col-span-1 flex flex-col items-start justify-between pr-4">
            <h1 className="uppercase text-xl mb-4">{room.name}</h1>{" "}
            <p className="pb-4  w-full text-sm font-normal">
              {room.description}
            </p>
            <Link
              key={room._id}
              href={`/rooms/${room._id}`}
              className="p-2 text-white bg-green-900"
            >
              View Details
            </Link>
          </div>

          <div className="col-span-1 md:col-span-2 md:ml-4">
            <h1 className="uppercase text-xl mb-4">Apartment Facilities</h1>{" "}
            <div className="grid grid-cols-1 md:grid-cols-2 text-sm font-normal">
              <div className="col-span-1 flex flex-col items-start justify-between my- gap-4 ">
                <div className="flex items-center justify-center gap-1">
                  <FaBed size={20} /> {room.roomType} Bed
                </div>
                <div className="flex items-center justify-center gap-1">
                  <LucideTv2 size={20} /> Flat Screen TV
                </div>
                <div className="flex items-center justify-center gap-1">
                  <GiToaster size={20} /> Braai Area
                </div>{" "}
                <div className="flex items-center justify-center gap-1">
                  <MdOutlineAirlineSeatReclineExtra size={20} /> Sitting Area
                </div>
              </div>
              <div className="col-span-1">
                <div className="flex flex-col items-start justify-between my- gap-4">
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
            {/* <button
          onClick={() => setModalOpen(true)}
          className="p-2 text-white bg-orange-700"
        >
          Book Now
        </button> */}
            <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
              <form onSubmit={handleBook} className="">
                <h3 className="font-bold text-lg text-center py-2">
                  {book} : ${Number(price) * Number(adultsNo)}
                </h3>
                <div className="flex flex-col items-center justify-center gap-4 ">
                  <div className="w-full gap-2">
                    <div className="fex flex-wrap md:grid md:grid-cols-2 gap-2">
                      <div className="col-span-1 py-1">
                        <label className="font-semibold">
                          Name<span className="text-red-700">*</span>
                        </label>
                        <input
                          placeholder="here"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="input input-bordered w-full"
                        />
                      </div>
                      <div className="col-span-1 py-1">
                        <label className="font-semibold">
                          Surname<span className="text-red-700">*</span>
                        </label>
                        <input
                          placeholder="here"
                          type="text"
                          value={surname}
                          onChange={(e) => setSurname(e.target.value)}
                          className="input input-bordered w-full"
                        />
                      </div>
                    </div>
                    <div className="col-span-1 py-1">
                      <label className="font-semibold">
                        Address<span className="text-red-700">*</span>
                      </label>
                      <input
                        placeholder="here"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="input input-bordered w-full"
                      />
                    </div>
                    <div className="fex flex-wrap md:grid md:grid-cols-2 gap-2">
                      <div className="col-span-1 py-1">
                        <label className="font-semibold">
                          City<span className="text-red-700">*</span>
                        </label>
                        <input
                          placeholder="here"
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="input input-bordered w-full"
                        />
                      </div>
                      <div className="col-span-1 py-1">
                        <label className="font-semibold">
                          Country<span className="text-red-700">*</span>
                        </label>
                        <input
                          placeholder="here"
                          type="text"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="input input-bordered w-full"
                        />
                      </div>
                    </div>
                    <div className="col-span-1 py-1">
                      <label className="font-semibold">
                        Email<span className="text-red-700">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="here"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input input-bordered w-full"
                      />
                    </div>
                    <div className="fex flex-wrap md:grid md:grid-cols-2 gap-2">
                      <div className="col-span-1 py-1">
                        <label className="font-semibold">
                          Arrival Date<span className="text-red-700">*</span>
                        </label>
                        <input
                          value={arrivaldate}
                          onChange={(e) => setArrivaldate(e.target.value)}
                          type="date"
                          name="arrivaldate"
                          className="input input-bordered w-full"
                        />
                      </div>
                      <div className="col-span-1 py-1">
                        <label className="font-semibold">
                          Departure Date<span className="text-red-700">*</span>
                        </label>
                        <input
                          value={deptdate}
                          onChange={(e) => setDeptdate(e.target.value)}
                          type="date"
                          name="deptdate"
                          className="input input-bordered w-full"
                        />
                      </div>
                    </div>
                    <div className="fex flex-wrap md:grid md:grid-cols-2 gap-2">
                      <div className="col-span-1 py-1">
                        <label className="font-semibold">
                          Number of Adults
                          <span className="text-red-700">*</span>
                        </label>
                        <input
                          value={adultsNo}
                          onChange={(e) => setAdultsNo(e.target.value)}
                          type="text"
                          name="adults"
                          className="input input-bordered w-full"
                        />
                      </div>
                      <div className="col-span-1 py-1">
                        <label className="font-semibold">
                          Number of children
                          <span className="text-red-700">*</span>
                        </label>
                        <input
                          value={kidsNo}
                          onChange={(e) => setKidsNo(e.target.value)}
                          type="text"
                          name="kids"
                          className="input input-bordered w-full"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-baseline justify-between gap-10">
                    <button
                      type="submit"
                      className=" border relative py-2 px-6  bg-transparent text-gray-700 transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-amber-950 before:transition-transform before:duration-300 before:content-[''] hover:text-white before:hover:scale-x-100"
                    >
                      SUBMIT FORM
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
                  {/* <ToastContainer /> */}
                  {/* <input /> */}
                </div>
              </form>
            </Modal>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
