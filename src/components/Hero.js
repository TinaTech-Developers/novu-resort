"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import HeroCard from "./HeroCard";
import Inquiry from "./Inquiry";
import HeroCard1 from "./HeroCard1";
import HeroCardHome from "./HeroCardHome";

export default function Hero() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  return (
    <>
      <Swiper
        centeredSlides={true}
        autoplay={{
          delay: 30000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className=""
      >
        <SwiperSlide>
          <HeroCardHome
            head={"Best of The Bests"}
            text={"Welcome To Our Luxury Villas"}
            text1={"Click The Button Below for Bookings"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <HeroCard
            head={"Best of The Bests"}
            text={"Welcome To Our Luxury Villas"}
            text1={"Click The Button Below for Bookings"}
          />
        </SwiperSlide>

        <SwiperSlide>
          <HeroCard1 head={"Novu Resort"} text1={"Restaurant | Conferrence"} />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
