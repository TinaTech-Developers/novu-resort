import Layout from "@/components/Layout";
import SubHero from "@/components/SubHero";
import React from "react";
import About from "@/components/About";
import Staff from "@/components/Staff";
import Map from "./_components/Map";

function page() {
  return (
    <Layout>
      <SubHero head={"About Us"} />
      <About />

      {/* <Staff /> */}
      <Map />
    </Layout>
  );
}

export default page;
