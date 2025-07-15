"use client";
import Layout from "@/components/Layout";
import SubHero from "@/components/SubHero";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Adventure from "@/components/Adventure";
import { AttractionsSection } from "@/components/AttractionSection";

function Todo() {
  return (
    <Layout>
      <SubHero head={"ToDo & Gallery"} />

      <div className="flex flex-col items-center justify-center mt-14">
        {/* Header */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-bold"
        >
          <div className="flex items-center justify-center gap-2 my-4">
            <div className="w-10 h-1 bg-orange-900"></div>
            <h1 className="text-lg uppercase">our gallery</h1>
            <div className="w-10 h-1 bg-orange-900"></div>
          </div>
          <h2 className="mx-auto text-green-950">Explore Our ACTIVITIES</h2>
        </motion.div>

        {/* Main Activity Cards */}
        <div className="flex flex-wrap items-center justify-center gap-5 mt-10">
          <ToDOCard
            image={"/img_8.jpg"}
            title={"Quad Biking"}
            desc={
              "Feed your thirst to ride the unknown trails or just having a calm ride with your loved ones and share a motor moment."
            }
          />
          <ToDOCard
            image={"/img_9.jpg"}
            title={"Bird Watching"}
            desc={
              "We know the stressful day to day in the big city, exchange the pollution for melodic songs the birds sing."
            }
          />
          <ToDOCard
            image={"/img_7.jpg"}
            title={"Hiking"}
            desc={
              "Explore the trails to bring out the Adam and Eve inside. See nature for what it is, the scenery is amazing."
            }
          />
          <ToDOCard
            image={"/paintballing--max.webp"}
            title={"Paint Balling"}
            desc={
              "At Novu Resort, paintballing is an exciting outdoor activity where friends and families team up for fun, strategy, and friendly competition in a safe, scenic setting."
            }
          />
          <ToDOCard
            image={"/img_10.jpg"}
            title={"Landmarks"}
            desc={
              "There are plenty places to visit, take pictures and savour the greatest moments in life."
            }
          />
          <ToDOCard
            image={"/relax_pool.jpg"}
            title={"Swimming Pool"}
            desc={
              "Relax and unwind by the poolside. Our well-maintained swimming pool is perfect for social activities, sunbathing, or simply cooling off on a warm day."
            }
          />
          <ToDOCard
            image={"/outdoor_private_area.jpg"}
            title={"Private Outdoor Areas"}
            desc={
              "Enjoy your own verandah with seating, a braai (BBQ) spot, and a pool table – perfect for family time, group games, or peaceful moments alone."
            }
          />
          <ToDOCard
            image={"/scenic_walks.jpg"}
            title={"Scenic Garden Walks"}
            desc={
              "Breathe in the fresh air as you stroll through our beautiful gardens and green areas. A perfect space to reflect, relax, and reconnect with nature."
            }
          />
        </div>

        {/* ➕ NEW SECTION: Explore Around Novu Resort */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="text-3xl font-bold mt-20 text-center"
        >
          <div className="flex items-center justify-center gap-2 my-4">
            <div className="w-10 h-1 bg-orange-900"></div>
            <h1 className="text-lg uppercase">nearby attractions</h1>
            <div className="w-10 h-1 bg-orange-900"></div>
          </div>
          <h2 className="mx-auto text-green-950">Explore Around Novu Resort</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 px-4">
          {[
            { name: "World’s View", distance: "11km" },
            { name: "Rhodes Museum Visit", distance: "19km" },
            { name: "Quad Biking & Paint Ball", distance: "8km" },
            { name: "Nyangani Mountain – the highest in Zimbabwe" },
            { name: "Mtarazi Falls", distance: "75km" },
            { name: "9-hole Golf Course & Outdoor Games", distance: "2.5km" },
            { name: "Nyamoro Dairy Tea Garden", distance: "20km" },
            { name: "Nyangombe Falls", distance: "20km" },
            { name: "Claremont Orchards & Fisheries", distance: "22km" },
            { name: "St Catherines on the Downs Church", distance: "4.5km" },
            { name: "Ruchera Mosque", distance: "18.3km" },
            { name: "Nyanga Masjid Mosques", distance: "15.3km" },
            { name: "Brighton’s Beach" },
            { name: "Nyanga National Park", distance: "51.5km" },
            { name: "Ziwa Ruins", distance: "40km" },
            { name: "Nyanga Pit Structures", distance: "20.5km" },
            { name: "Nyangwe Fort", distance: "22.8km" },
            { name: "Chawomera Fort", distance: "10.7km" },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.03 }}
              viewport={{ once: true }}
              className="p-4 border rounded-xl shadow-sm hover:shadow-md bg-white"
            >
              <h3 className="text-lg font-semibold text-green-900">
                {item.name}
              </h3>
              {item.distance && (
                <p className="text-sm text-gray-600">
                  Approx. {item.distance} away
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* <AttractionsSection /> */}
        <Adventure />
      </div>
    </Layout>
  );
}

function ToDOCard({ image, title, desc }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="w-80 sm:w-96 bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden border border-gray-200"
    >
      <div className="w-full h-52 relative">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-5">
        <h1 className="uppercase text-gray-400 text-sm">ACTIVITIES</h1>
        <hr className="border-x-4 border-green-950 w-10 my-2" />
        <h2 className="text-green-900 text-xl font-semibold">{title}</h2>
        <p className="text-sm text-gray-600 mt-2">{desc}</p>
      </div>
    </motion.div>
  );
}

export default Todo;
