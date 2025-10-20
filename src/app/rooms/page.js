import Layout from "@/components/Layout";
import SubHero from "@/components/SubHero";
import React from "react";
// import ExecutiveBeds from "./_components/ExecutiveBeds";
import MiniHeader from "./_components/MiniHeader";
import ApartmentAvailability from "./_components/ApartmentAvailability";
import AccommodationExperiencePage from "./_components/AccommodationExperiencePage(";

function Rooms() {
  return (
    <Layout>
      <SubHero head={"Our Laxurious Rooms"} />
      <ApartmentAvailability />
      <MiniHeader />
      <AccommodationExperiencePage />
    </Layout>
  );
}

export default Rooms;
