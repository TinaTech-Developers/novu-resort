import Inquiry from "@/components/Inquiry";
import Layout from "@/components/Layout";
import SubHero from "@/components/SubHero";
import React from "react";
import Contact from "./_components/Contact";

function page() {
  return (
    <Layout>
      <SubHero head={"Contact us"} />

      <Contact />
    </Layout>
  );
}

export default page;
