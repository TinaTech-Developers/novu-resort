"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function LuxuryExperiencePage() {
  const [galleryIndex, setGalleryIndex] = useState(0);

  const galleryImages = [
    "/banar.jpg",
    "/Guinea fowl Lounge with fire place.jpg",
    "/img_3.jpg",
    "/rooms.jpg",
  ];

  const nextImage = () =>
    setGalleryIndex((galleryIndex + 1) % galleryImages.length);
  const prevImage = () =>
    setGalleryIndex(
      (galleryIndex - 1 + galleryImages.length) % galleryImages.length
    );

  return (
    <main className="bg-white text-green-950">
      {/* ================= GUEST EXPERIENCE ================= */}
      <section className="relative py-28 bg-[url('/banar.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-4xl mx-auto text-center text-white px-6">
          <motion.h2
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Guest Experience
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl"
          >
            Wake up to golden sunrises over the mountains, enjoy nature walks,
            adventure activities, and cozy evenings by the fireplace.
          </motion.p>
        </div>
      </section>

      {/* ================= VIRTUAL TOUR / GALLERY ================= */}
      <section className="py-28 bg-green-50">
        <h2 className="text-4xl text-center font-bold mb-12">
          Virtual Tour & Gallery
        </h2>
        <div className="relative max-w-5xl mx-auto">
          <Image
            src={galleryImages[galleryIndex]}
            alt={`Gallery ${galleryIndex + 1}`}
            width={1200}
            height={600}
            className="rounded-2xl shadow-xl object-cover w-full h-[500px]"
          />
          <button
            onClick={prevImage}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-green-900 text-white p-3 rounded-full hover:bg-green-800 transition"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={nextImage}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-green-900 text-white p-3 rounded-full hover:bg-green-800 transition"
          >
            <FaChevronRight />
          </button>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-28 max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          What Guests Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <TestimonialCard
            name="Sarah M."
            quote="Novu Resort exceeded our expectations. Every detail felt luxurious and thoughtfully curated."
          />
          <TestimonialCard
            name="James L."
            quote="Perfect getaway! Stunning views, comfortable rooms, and exceptional service."
          />
          <TestimonialCard
            name="Lily K."
            quote="We felt pampered from arrival to departure. Highly recommend Novu Resort!"
          />
        </div>
      </section>

      {/* ================= MAP / LOCATION ================= */}
      <section className="py-28">
        <h2 className="text-4xl font-bold text-center mb-12">Our Location</h2>
        <div className="w-full h-[500px] max-w-6xl mx-auto">
          <iframe
            title="Novu Resort Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3181.000000000000!2d31.000000000000!3d-18.000000000000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDAwJzAwLjAiTiAzMcKwMDAnMDAuMCJF!5e0!3m2!1sen!2szw!4v0000000000000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          />
        </div>
      </section>

      {/* ================= FAQ + CALL-TO-ACTION ================= */}
      <section className="py-28 bg-green-900 text-white text-center px-6">
        <h2 className="text-4xl font-bold mb-12">Frequently Asked Questions</h2>
        <div className="max-w-4xl mx-auto text-left space-y-6">
          <FAQItem
            question="What are the check-in and check-out times?"
            answer="Check-in is from 2 PM and check-out is until 11 AM."
          />
          <FAQItem
            question="Is Wi-Fi available?"
            answer="Yes, free Wi-Fi is available throughout the resort."
          />
          <FAQItem
            question="Do you allow pets?"
            answer="Pets are not allowed, to maintain comfort for all guests."
          />
        </div>
        <Link
          href="/booking"
          className="mt-12 inline-block bg-white text-green-900 font-semibold py-4 px-8 rounded-lg hover:bg-green-100 transition-all text-lg"
        >
          Book Now
        </Link>
      </section>
    </main>
  );
}

// ================= SUB-COMPONENTS =================
function TestimonialCard({ name, quote }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-green-50 p-8 rounded-2xl shadow-lg"
    >
      <p className="italic text-gray-800 text-lg">{quote}</p>
      <p className="mt-6 font-semibold text-green-900 text-right">- {name}</p>
    </motion.div>
  );
}

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border-b border-white/30 pb-4 cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <h4 className="font-semibold flex justify-between items-center">
        {question} <span>{open ? "−" : "+"}</span>
      </h4>
      {open && <p className="text-gray-200 mt-2">{answer}</p>}
    </div>
  );
}
