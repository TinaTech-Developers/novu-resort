"use client";
import Layout from "@/components/Layout";
import SubHero from "@/components/SubHero";
import React, { useState } from "react";
import MiniHeader from "./_components/MiniHeader";
import ApartmentAvailability from "./_components/ApartmentAvailability";
import ListOfAvailableApartments from "./_components/ListOfAvailableApartments";
import LuxuryExperiencePage from "./_components/AccommodationExperiencePage";

function Rooms() {
  const [rooms, setRooms] = useState([]);

  return (
    <Layout>
      <SubHero head={"Our Luxurious Rooms"} />
      <ApartmentAvailability onResults={setRooms} />
      <ListOfAvailableApartments rooms={rooms} />
      <MiniHeader />
      <LuxuryExperiencePage />
    </Layout>
  );
}

export default Rooms;
