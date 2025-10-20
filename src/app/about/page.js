"use client";
import Layout from "@/components/Layout";
import SubHero from "@/components/SubHero";
import React from "react";
import About from "@/components/About";
import Map from "./_components/Map";
import { motion } from "framer-motion";
import { FaUmbrellaBeach, FaUtensils, FaHiking } from "react-icons/fa";

function AboutPage() {
  return (
    <Layout>
      <SubHero head={"About Us"} />
      <About />

      {/* ================== Features Section ================== */}
      <section className="max-w-6xl mx-auto py-20 px-5 md:px-10">
        <h2 className="text-4xl font-bold text-center text-green-900 mb-12">
          Our Key Experiences
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<FaUmbrellaBeach size={40} className="text-amber-700" />}
            title="Relaxing Spaces"
            description="Spacious rooms with breathtaking views for ultimate relaxation."
          />
          <FeatureCard
            icon={<FaUtensils size={40} className="text-amber-700" />}
            title="Exquisite Dining"
            description="Enjoy both local and international cuisine at our restaurant."
          />
          <FeatureCard
            icon={<FaHiking size={40} className="text-amber-700" />}
            title="Adventure Activities"
            description="Guided tours, hiking, quad biking, and more for all ages."
          />
        </div>
      </section>

      {/* ================== Testimonial Section ================== */}
      <section className="py-20 bg-green-50">
        <h2 className="text-4xl font-bold text-center text-green-900 mb-12">
          What Guests Say
        </h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <TestimonialCard
            name="Sarah M."
            quote="Novu Resort exceeded our expectations. Every detail felt luxurious."
          />
          <TestimonialCard
            name="James L."
            quote="Perfect getaway! Stunning views, comfortable rooms, and exceptional service."
          />
        </div>
      </section>

      <Map />

      {/* ================== Call-to-Action ================== */}
      <section className="py-16 bg-gradient-to-r from-green-900 to-amber-700 text-white text-center rounded-xl mx-5 md:mx-10 my-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Experience Luxury & Nature
        </h2>
        <p className="mb-6 text-lg md:text-xl">
          Book your stay today and create unforgettable memories with us.
        </p>
        <a
          href="/booking"
          className="inline-block bg-white text-green-900 font-semibold py-3 px-8 rounded-md hover:bg-gray-100 transition"
        >
          Book Now
        </a>
      </section>
    </Layout>
  );
}

export default AboutPage;

// ================== Sub-components ==================
function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-green-900 mb-2">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </motion.div>
  );
}

function TestimonialCard({ name, quote }) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-white rounded-xl shadow-lg p-6 italic text-gray-800"
    >
      <p>"{quote}"</p>
      <p className="mt-4 font-semibold text-green-900 text-right">- {name}</p>
    </motion.div>
  );
}
