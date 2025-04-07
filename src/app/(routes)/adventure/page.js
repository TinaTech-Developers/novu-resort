"use client";
import Layout from "@/components/Layout";
import React from "react";
import { motion } from "framer-motion";
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
            <h1 className="text-xl md:text-2xl font-semibold text-green-950">
              An Adventure
            </h1>
            <p className="flex items-center gap-1 md:gap-5 text-gray-600">
              <MdLocationSearching size={28} color="red" />
              Eastern Highlands
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
          <Images
            image={
              "https://i.pinimg.com/originals/0b/8e/64/0b8e641a1eb87c4a1f140d3791de0c0a.jpg"
            }
            name={"Eastern Highlands"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Images
            image={
              "https://static.wixstatic.com/media/99cc40_bde2db2e6b604f3c9f2d6c37b3ad8c49~mv2_d_4924_3229_s_4_2.jpg/v1/fill/w_980,h_643,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/99cc40_bde2db2e6b604f3c9f2d6c37b3ad8c49~mv2_d_4924_3229_s_4_2.jpg"
            }
            name={"Bvumba Mountains"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Images
            image={
              "https://zimbabwetourism.net/wp-content/uploads/2021/03/Nyangombe-Falls-2-770x550.jpg"
            }
            name={"Nyanga National Park"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Images
            image={"https://pbs.twimg.com/media/ELa6n0uWwAExLu7.jpg"}
            name={"The Cultural Experience"}
          />
        </SwiperSlide>
      </Swiper>
      <div className="m-10 md:mx-20">
        <h1 className="text-xl md:text-2xl font-semibold my-4 text-green-950">
          {"  An Adventure Through Zimbabwe's Eastern Highlands"}
        </h1>
        <p>
          Zimbabwe’s Eastern Highlands is a hidden gem for those who love
          natural beauty, rich history, and outdoor adventure. Spanning across
          the eastern border of the country, this mountainous region is a
          paradise for trekkers, birdwatchers, and culture seekers alike. The
          dramatic landscapes, lush forests, cascading waterfalls, and
          fascinating wildlife make it a must-visit destination for anyone
          looking to explore Zimbabwe beyond its well-known safari parks.
          <br />
          <br />
          <span className="md:text-xl font-semibold my-4 text-green-950">
            The Journey Begins: Mutare
          </span>
          <br />
          Our adventure begins in Mutare, the bustling gateway town to the
          Eastern Highlands. Located at the foot of the mountains, Mutare offers
          a taste of the region’s diverse cultural heritage and history. A walk
          through the town’s colorful market provides an introduction to
          Zimbabwean handicrafts, local produce, and a lively atmosphere. From
          here, we set off toward our first stop—the famous Bvumba Mountains.
          <br />
          <br />
          <span className="md:text-xl font-semibold my-4 text-green-950">
            Bvumba Mountains: A Misty Escape
          </span>
          <br />
          Known for its lush rainforests and mist-covered hills, the Bvumba
          Mountains (also known as the mountains of the mist) are perfect for
          nature lovers. The area is teeming with birdlife, including the rare
          and colorful Blue Swallow. As we trek through the forest trails, the
          air is cool and fresh, and the sounds of the forest fill the air. A
          stop at the Bvumba Botanical Gardens offers a glimpse into the rich
          plant life of the region, with hundreds of indigenous species. The
          mist, which often hangs in the air like a blanket, adds an element of
          mystery to the landscape, as it transforms the scenery with every
          step. Here, we find ourselves at the Inyanga Viewpoint, where the
          views of the rolling hills and valleys stretch all the way to the
          Mozambique border.
          <br />
          <br />
          <span className="md:text-xl font-semibold my-4 text-green-950">
            Nyanga National Park: A World of Waterfalls{" "}
          </span>
          <br />
          Next, we journey to Nyanga National Park, a highlight of the Eastern
          Highlands, known for its dramatic cliffs, deep valleys, and majestic
          waterfalls. The park offers some of the most scenic hiking in
          Zimbabwe, with several well-marked trails leading to hidden gems.
          Mutarazi Falls, the second-highest waterfall in Zimbabwe, is a
          spectacular sight. The waterfall plunges 762 meters (2,500 feet) into
          a deep gorge, sending mist into the air that creates a refreshing
          breeze on hot days. We continue on to Nyangombe Falls, which is less
          visited but equally beautiful. Here, we pause to take in the
          surrounding forest and hear the roar of the water as it crashes into
          the pool below. Nyanga’s trails offer more than just waterfalls; they
          weave through dense forests, past old stone ruins, and across scenic
          ridgelines, offering spectacular panoramic views at every turn.
          <br />
          <br />
          <span className="md:text-xl font-semibold my-4 text-green-950">
            {" "}
            Mount Nyangani: The Pinnacle of Adventure
          </span>
          <br />
          {
            " For those craving a more challenging adventure, the hike up Mount Nyangani, Zimbabwe's highest peak at 2,592 meters (8,504 feet), is an unmissable experience. The climb takes you through a variety of ecosystems, from thick forests to alpine meadows, offering a unique look at the biodiversity of the Eastern Highlands. On clear days, the summit offers breathtaking views of both Zimbabwe and Mozambique. Reaching the top is not just an achievement; it’s an opportunity to stand at the crossroads of two countries, gazing out at the endless horizon."
          }
          <br />
          <br />
          <span className="md:text-xl font-semibold my-4 text-green-950">
            The Cultural Experience: Villages and Heritage
          </span>
          <br />
          One of the most rewarding aspects of an adventure in the Eastern
          Highlands is the chance to interact with the local communities. The
          Shona and Ndebele peoples who live in this region are known for their
          warm hospitality and strong cultural traditions. Visiting a village
          offers insight into rural life, and you may have the opportunity to
          witness local dances, craftwork, and cooking traditions. A highlight
          is the Great Zimbabwe Ruins—though not directly in the Eastern
          Highlands, it’s a short drive away and offers a window into the
          country’s fascinating history. This ancient city, once the capital of
          the Kingdom of Zimbabwe, is one of Africa’s greatest archaeological
          sites.
          <br />
          <br />
          <span className="md:text-xl font-semibold my-4 text-green-950">
            A Final Stop: Chimanimani
          </span>
          <br />
          Our adventure culminates in Chimanimani, a small town perched on the
          edge of the Eastern Highlands. Known for its rugged terrain and
          striking granite peaks, Chimanimani is an adventure seeker’s
          playground. Whether it’s rock climbing, hiking, or birdwatching, the
          area offers endless possibilities for outdoor activities. Chimanimani
          is also home to the Chimanimani National Park, which boasts incredible
          biodiversity and scenic beauty. The park is a haven for hikers and
          nature enthusiasts, with numerous trails that lead to waterfalls,
          viewpoints, and hidden caves.
          <br />
          <br />
          <span className="md:text-xl font-semibold my-4 text-green-950">
            Conclusion: A Journey to Remember
          </span>
          <br />
          Conclusion: A Journey to Remember As our adventure through the Eastern
          Highlands comes to a close, we reflect on the diversity of experiences
          this magical region has to offer. From the mist-covered mountains of
          Bvumba to the towering waterfalls of Nyanga and the peaks of Mount
          Nyangani, the Eastern Highlands is a destination that surprises and
          delights at every turn. For those who crave adventure, nature, and
          culture, this hidden corner of Zimbabwe is an unforgettable journey
          through some of the most stunning landscapes in Africa.
        </p>
      </div>
    </Layout>
  );
}

function Video({ video }) {
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
