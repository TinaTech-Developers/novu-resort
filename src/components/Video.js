import Link from "next/link";
import React from "react";

const Video = ({ video }) => {
  return (
    <div className="flex flex-col items-center justify-center  w-full h-full mt-10">
      <div className="w-[90%] gap-10 ">
        <div className="w h-[27rem] mx-auto overflow-hidden  ">
          <video
            className="w-[100%] h-96  object-cover"
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
};

export default Video;
