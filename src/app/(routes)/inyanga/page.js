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
      <div className="mx-4 md:mx-10  bg-white">
        <div className="flex items-center justify-between mx-4 md:mx-10 pt-24 bg-white">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-green-950 capitalize">
              must-visit spots
            </h1>
            <p className="flex items-center gap-1 md:gap-5 text-gray-600">
              <MdLocationSearching size={28} color="red" />
              Inyanga, Zimbabwe
            </p>
          </div>
          <Link
            href={"/todo"}
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
          <Video
            video={
              "https://utfs.io/f/M8crfG3am8lfL9D9rm9uKAaL1TB6NQhjD0kumYc2sR5vVnlz"
            }
            name={"The Beauty of Inyanga"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Video video={"/bgvideo.mp4"} name={"Trees Along Your Journey"} />
        </SwiperSlide>
        <SwiperSlide>
          <Images image={"/img_10.jpg"} name={""} />
        </SwiperSlide>
        <SwiperSlide>
          <Images image={"/img_13.jpeg"} />
        </SwiperSlide>
      </Swiper>
      <div className="pb-10 md:mx-16">
        <h1 className="text-xl md:text-2xl font-semibold my-4 text-green-950">
          {
            " Welcome to Nyanga, one of Zimbabwe's premier tourist destinations."
          }
        </h1>
        <p className="text-gray-900">
          Nyanga, located in Zimbabwe’s Eastern Highlands, is a captivating
          destination renowned for its stunning landscapes, rich cultural
          heritage, and lush forests. The region’s cool, temperate climate makes
          it a perfect getaway for nature lovers and adventure seekers. Visitors
          can explore scenic trails, witness majestic waterfalls, and immerse
          themselves in local traditions. Nyanga is also home to abundant
          wildlife and unique ecosystems, offering an exciting escape for those
          seeking both relaxation and adventure. Whether trekking the rugged
          mountains or discovering cultural treasures, Nyanga is a must-visit
          retreat for outdoor enthusiasts.
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

function Images({ image, name }) {
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

export default page;
