import About from "@/components/About";
import ExploreRooms from "@/components/ExploreRooms";
import Inquiry from "@/components/Inquiry";
import Layout from "@/components/Layout";
import SubHero from "@/components/SubHero";
import React from "react";

function Rooms() {
  return (
    <Layout>
      <SubHero head={"Our Laxurious Rooms"} />
      <Inquiry />
      <ExploreRooms heading={"Choose from Laxurious Rooms"} />
      <div className="md:mt-20">
        <About />
      </div>
    </Layout>
  );
}

export default Rooms;
