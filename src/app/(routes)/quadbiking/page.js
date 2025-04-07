"use client";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import React from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { MdLocationSearching } from "react-icons/md";
import { ArrowBigLeft } from "lucide-react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Link from "next/link";
import Image from "next/image";

function page() {
  return (
    <Layout>
      <div className=" mx-4 md:mx-10  bg-white">
        <div className="flex items-center justify-between mx-4 md:mx-10 pt-24 bg-white">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-green-950">
              Quad Bikes
            </h1>
            <p className="flex items-center gap-1 md:gap-5 text-gray-600">
              <MdLocationSearching size={28} color="red" />
              Inyanga, Zimbabwe
            </p>
          </div>
          <Link
            href={"/"}
            className="flex items-center justify-center gap-1 border px-3 py-2 bg-green-900 text-white"
          >
            <ArrowBigLeft />
            Back
          </Link>
        </div>
      </div>

      <hr className="mx-4 md:mx-10 my-4" />
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log("slide change")}
      >
        <SwiperSlide>
          <Video video={"bike.mp4"} name={"Easy Route"} />
        </SwiperSlide>
        <SwiperSlide>
          <Video video={"/bgvideo.mp4"} name={"Risky Route "} />
        </SwiperSlide>
        {/* <SwiperSlide>
          <Images image={"/img_10.jpg"} />
        </SwiperSlide>
        <SwiperSlide>
          <Images
            image={
              "https://i.pinimg.com/originals/0b/8e/64/0b8e641a1eb87c4a1f140d3791de0c0a.jpg"
            }
          />
        </SwiperSlide> */}
      </Swiper>
      <div className="m-10 md:mx-20">
        <h1 className="text-xl md:text-2xl font-semibold my-4 text-green-950">
          Thrilling Quad Biking Adventures at Novu Resort
        </h1>
        <p className="text-gray-900">
          Experience the thrill of quad biking at Novu Resort, where adventure
          meets stunning natural beauty! Picture yourself navigating through
          diverse terrains, from lush forests teeming with wildlife to expansive
          rolling hills that offer breathtaking views.
          <br />
          <br />
          Our expertly guided tours are designed to cater to all skill levels,
          whether you’re a seasoned rider or a complete beginner. Before you hit
          the trails, safety is our top priority. We provide high-quality gear
          and comprehensive briefings to ensure you feel confident and secure as
          you embark on your adventure.
          <br />
          <br />
          Our experienced guides share their knowledge of the local landscape,
          pointing out hidden gems and breathtaking vistas along the way.
          Imagine the adrenaline rush as you tackle challenging inclines and
          zipping through winding paths, all while surrounded by the serene
          beauty of nature.
          <br />
          <br />
          Quad biking at Novu Resort isn’t just about the thrill; it’s an
          opportunity to disconnect from the hustle and bustle of daily life.
          Whether you’re seeking an exhilarating outing with friends or a unique
          solo journey, quad biking here promises unforgettable memories.
          <br />
          <br />
          After your ride, relax and unwind in our luxurious resort, where you
          can share stories and relive the excitement of your adventure. Embrace
          the excitement, connect with nature, and create lasting memories with
          an adventure like no other at Novu Resort!
        </p>
      </div>
    </Layout>
  );
}

function Video({ video, name }) {
  return (
    <div className="flex flex-col items-center justify-center  w-full h-full mt-10">
      <div className="w-[90%] gap-10 ">
        <div className="w-[80vw] h-[27rem] mx-auto overflow-hidden sm:w-[90vw] ">
          <video
            className="object-cover w-full h-full md:h-[27rem]"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={video} type="video/mp4" />
          </video>
        </div>
      </div>
      <motion.p
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, y: -30, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="absolute md:mt-96 md:mr-[900px] mt-64 p-2 rounded-lg border border-white  text-white text-sm bg-green-950"
      >
        {name}
      </motion.p>
    </div>
  );
}

function Images({ image }) {
  return (
    <div className="flex flex-col items-center justify-center  w-full h-full my-10">
      <div className="w-[80vw] h-[27rem] mx-auto overflow-hidden sm:w-[90vw] ">
        <Image
          src={image}
          alt=""
          layout=""
          width={1600} // Placeholder for width (adjust based on your actual image size)
          height={432} // Placeholder for height (proportional to 27rem)
          className="object-cover w-full h-full md:h-[27rem] "
        />
      </div>
    </div>
  );
}

export default page;
