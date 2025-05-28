import About from "@/components/About";
import ExploreRooms from "@/components/ExploreRooms";
import Inquiry from "@/components/Inquiry";
import Layout from "@/components/Layout";
import SubHero from "@/components/SubHero";
import React from "react";
// import ExecutiveBeds from "./_components/ExecutiveBeds";
import MiniHeader from "./_components/MiniHeader";
import ApartmentAvailability from "./_components/ApartmentAvailability";

function Rooms() {
  return (
    <Layout>
      <SubHero head={"Our Laxurious Rooms"} />
      {/* <Inquiry /> */}
      <ApartmentAvailability />
      <MiniHeader />

      {/* <ExecutiveBeds /> */}
    </Layout>
  );
}

export default Rooms;
