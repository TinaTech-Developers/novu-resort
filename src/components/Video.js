import Link from "next/link";
import React from "react";

const Video = ({ video, heading, description, link }) => {
  return (
    <div className="flex flex-col items-center justify-center  w-full h-full mt-10">
      <div className="w-[90%] gap-10 ">
        <div className="w-[90vw] h-[27rem] mx-auto overflow-hidden sm:w-[90vw] ">
          <video
            className="w-[100%] h-96 md:h-[27rem]  object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={video} type="video/mp4" />
          </video>
        </div>
        <Link
          className="mt-10 text-xl md:text-2xl  text-green-950 underline hover:text-green-700"
          href={link}
        >
          {heading}
        </Link>
        <p className="my-4 text-black font-normal">{description}</p>
      </div>
    </div>
  );
};

export default Video;
