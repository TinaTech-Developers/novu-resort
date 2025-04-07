"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

function Staff() {
  return (
    <div className="flex flex-col items-center justify-center mt-14">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="text-4xl font-bold"
      >
        <div className="flex items-center justify-center gap-2 my-4 mx-auto ">
          <div className="w-10 h-1 bg-orange-900"></div>
          <h1 className="text-lg  uppercase">our kind staff</h1>
          <div className="w-10 h-1 bg-orange-900"></div>
        </div>
        <h className="mx-auto text-center  ">Our Staff</h>
      </motion.div>
      <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
        <StaffCard
          post={"STAFF"}
          name={"AUNT LILLY"}
          desc={
            " Every time you catch the fresh breeze of linen. She should come to your mind. Responsible for the upkeep of the resort she also has carries the rich culture of the area from trees to wildlife."
          }
          image={"/person_9.jpg"}
        />
        <StaffCard
          post={"STAFF"}
          name={"BROTHER TAKU"}
          desc={
            "We take pride in the preservation of the our land. Taku the tree whisperer as we call him keeps nature at its best. If it werent for his dedication, our paradise would'nt be the same"
          }
          image={"/person_8.jpg"}
        />
        <StaffCard
          post={"COOK"}
          name={"CHEF DANIEL"}
          desc={
            "A moment to reflect on childhood delicacies, induldge in the culinary heritage or just a quick snack. Chef daniel never falls short. Take our word, he knows how to feed the soul."
          }
          image={"/person_7.jpg"}
        />
      </div>
    </div>
  );
}

function StaffCard({ image, name, desc, post }) {
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
      //   whileHover={{
      //     // scale: 1.1,
      //     backgroundColor: "#00001C",
      //     color: "white",
      //   }}
      transition={{ duration: 0.9 }}
      className="w-96 h-full border  "
    >
      <Image src={image} alt="Staff" width={400} height={500} />
      <div className="flex flex-col items-start p-4">
        <h1 className="uppercase text-gray-400">{post}</h1>
        <hr className=" border-x-4 border-amber-950 w-10" />
        <h2 className="text-amber-900 text-2xl">{name}</h2>
        <p className="text-start py-2 text-gray-500">{desc}</p>
        {/* <FillButton name={"Explore"} link={""} /> */}
      </div>
    </motion.div>
  );
}

export default Staff;
