"use client";
import Layout from "@/components/Layout";
import SubHero from "@/components/SubHero";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Adventure from "@/components/Adventure";

function Todo() {
  return (
    <Layout>
      <SubHero head={"ToDo & Gallery"} />

      <div className="flex flex-col items-center justify-center mt-14">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-bold"
        >
          <div className="flex items-center justify-center gap-2 my-4">
            <div className="w-10 h-1 bg-orange-900"></div>
            <h1 className="text-lg  uppercase">our gallery</h1>
            <div className="w-10 h-1 bg-orange-900"></div>
          </div>
          <h className="mx-auto ">Explore Our ACTIVITIES</h>
        </motion.div>
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
              "We know the stressful day to day in the big city, exchange the polution for melodic songs the birds sing."
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
            image={"/img_12.jpg"}
            title={"Culture Hour"}
            desc={
              "Meet with the locals and get a chance to understand and enjoy the rich culture our beloved country has to offer."
            }
          />{" "}
          <ToDOCard
            image={"/img_11.jpg"}
            title={"Troutbeck"}
            desc={
              "We are in close proximity to troutbeck which has a number of activities such as horseback riding."
            }
          />{" "}
          <ToDOCard
            image={"/img_10.jpg"}
            title={"Landmarks"}
            desc={
              "There are plenty places to visit, take picture and savour the greatest moments in life."
            }
          />
        </div>
        <Adventure />
      </div>
    </Layout>
  );
}

function ToDOCard({ image, title, desc }) {
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
      //   backgroundColor: "#00001C",
      //   color: "white",
      // }}
      transition={{ duration: 0.9 }}
      className="flex flex-col items-start gap-4 w-96 h-[30rem] hover:shadow-2xl p-4"
    >
      <div className="border p-4 ">
        <Image
          src={image}
          alt="CFK NYA RESORTS ToDo"
          height={400}
          width={500}
        />
        <h1 className="uppercase text-gray-400">ACTIVITIES</h1>
        <hr className=" border-x-4 border-green-950 w-10 mt-2" />
        <h2 className="text-green-900 text-2xl">{title}</h2>
        <p className="text-start py-2 text-gray-500">{desc}</p>
        {/* <FillButton name={"READ MORE"} link={"/reservation"} /> */}
      </div>
    </motion.div>
  );
}

export default Todo;
