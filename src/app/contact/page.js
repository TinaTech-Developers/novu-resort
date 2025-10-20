import Inquiry from "@/components/Inquiry";
import Layout from "@/components/Layout";
import SubHero from "@/components/SubHero";
import React from "react";
import Contact from "./_components/Contact";
import { ContactInfo } from "./_components/ContactInfo";
import { ContactMap } from "./_components/ContactMap";
import { ContactFAQ } from "./_components/ContactFAQ";

function page() {
  return (
    <Layout>
      <SubHero head={"Contact us"} />

      <Contact />
      <ContactInfo />
      <ContactMap />
      <ContactFAQ />
    </Layout>
  );
}

export default page;
