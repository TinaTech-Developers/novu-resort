import Image from "next/image";
import React from "react";
import FillButton from "./FillButton";

function Discover() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:mt-20 mt-8">
      <div className="col-span-1 text-white p-10 bg-[#06402B]">
        <div className="flex items-center  gap-2 my-4">
          <h1 className="text-lg  uppercase text-amber-700">our rooms</h1>
          <div className="w-10 h-1 bg-orange-700"></div>
        </div>
        <p className="text-3xl font-">Discover A Brand Luxurious Resort</p>
        <p className="my-10 font-normal">
          Step into a world of elegance at our brand new luxurious resort. Enjoy
          stunning accommodations, top-notch amenities, and exceptional service
          designed for your comfort and relaxation.
        </p>
        <div className="flex items-center justify-between">
          <FillButton name={"View More!"} link={"/rooms"} onClick={""} />
        </div>
      </div>
      <div className="col-span-1">
        <Image
          src={"/img_1.jpg"}
          alt=""
          height={500}
          width={600}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default Discover;
