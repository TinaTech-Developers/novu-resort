"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import RoomCard from "./RoomCard";

function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${month}/${date}/${year}`;
}

function ExploreRooms({ heading }) {
  let [currentDate, setCurrentDate] = useState(getDate(true));
  const ROOM_URL = "/api/rooms";

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(ROOM_URL);
      const rooms = await response.json();
      setRooms(rooms.rooms);
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-white">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="text-2xl md:text-4xl font-nono text-center md:mb-12"
      >
        <div className="flex items-center justify-center gap-2 my-4">
          <div className="w-10 h-1 bg-amber-700"></div>
          <h1 className="text-lg uppercase text-amber-700">our apartments</h1>
          <div className="w-10 h-1 bg-amber-700"></div>
        </div>
        <h className="text-green-950 text-2xl md:text-3xl ">{heading}</h>
      </motion.div>
      <div className="flex flex-col w-full items-center justify- mx-auto">
        {rooms.map((room) => (
          <RoomCard key={room._id} room={room} />
        ))}
      </div>
    </div>
  );
}

export default ExploreRooms;
