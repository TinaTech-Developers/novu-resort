"use client";
import Layout from "@/components/Layout";
import SubHero from "@/components/SubHero";
import React, { useState } from "react";
import MiniHeader from "../_components/MiniHeader";
import LuxuryExperiencePage from "../_components/AccommodationExperiencePage";
import ListOfAvailableApartments from "../_components/ListOfAvailableApartments";
import ApartmentAvailability from "../_components/ApartmentAvailability";
import TwoBeds from "../_components/TwoBeds";

function Rooms() {
  const [rooms, setRooms] = useState([]);

  return (
    <Layout>
      <SubHero head={"Our Two Beds"} />
      <ApartmentAvailability onResults={setRooms} />
      <ListOfAvailableApartments rooms={rooms} />
      <TwoBeds />

      <LuxuryExperiencePage />
    </Layout>
  );
}

export default Rooms;
