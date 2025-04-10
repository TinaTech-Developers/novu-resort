"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import HeroCard from "./HeroCard";
import HeroCard1 from "./HeroCard1";
import HeroCardHome from "./HeroCardHome";
import HeroCardz from "./HeroCardz";

export default function Hero() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  return (
    <>
      <Swiper
        centeredSlides={true}
        autoplay={{
          delay: 80000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className=""
      >
        <SwiperSlide>
          <HeroCardHome
            head={"Best of The Bests"}
            text={"Welcome To Our Luxury Resort"}
            text1={"Click The Button Below for Bookings"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <HeroCardz
            image={"/Dove ext 1-8829.jpg"}
            head={"Best of The Bests"}
            text={"A must visit place"}
            text1={"Click The Button Below for Bookings"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <HeroCardz
            image={"/Guinea fowl Lounge with fire place.jpg"}
            head={"Best of The Bests"}
            text={"Elegant, cozy, and refined comfort."}
            text1={"Click The Button Below for Bookings"}
          />
        </SwiperSlide>

        <SwiperSlide>
          <HeroCardz
            image={"/booadroom.jpg"}
            head={"Best of The Bests"}
            text={"Conference Room"}
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
