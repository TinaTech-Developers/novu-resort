"use client";
import Layout from "@/components/Layout";
import SubHero from "@/components/SubHero";
import React, { useState } from "react";
import MiniHeader from "../_components/MiniHeader";
import LuxuryExperiencePage from "../_components/AccommodationExperiencePage";
import ListOfAvailableApartments from "../_components/ListOfAvailableApartments";
import ApartmentAvailability from "../_components/ApartmentAvailability";
import ExecutiveBeds from "../_components/ExecutiveBed";

function Rooms() {
  const [rooms, setRooms] = useState([]);

  return (
    <Layout>
      <SubHero head={"Our Executive Beds"} />
      <ApartmentAvailability onResults={setRooms} />
      <ListOfAvailableApartments rooms={rooms} />
      {/* <MiniHeader /> */}
      <ExecutiveBeds />
      <LuxuryExperiencePage />
    </Layout>
  );
}

export default Rooms;
