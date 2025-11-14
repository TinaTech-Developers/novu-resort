"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ConferenceHallPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    attendees: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/conference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Something went wrong");
      } else {
        toast.success("Conference booked successfully!");
        setForm({
          name: "",
          email: "",
          phone: "",
          date: "",
          attendees: "",
          message: "",
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      title: "High-End Equipment",
      img: "https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/000000/external-projector-cinema-flatart-icons-outline-flatarticons.png",
      alt: "Projector",
    },
    {
      title: "Elegant Seating",
      img: "https://img.icons8.com/ios-filled/100/armchair.png",
      alt: "Armchair seating",
    },
    {
      title: "Fast Wi-Fi",
      img: "https://img.icons8.com/ios-filled/100/wifi.png",
      alt: "Wi-Fi",
    },
    {
      title: "Climate Controlled",
      img: "https://img.icons8.com/ios-filled/100/air-conditioner.png",
      alt: "Air conditioner",
    },
  ];

  return (
    <Layout>
      <ToastContainer position="top-right" autoClose={4000} />
      <div className="bg-gray-50 min-h-screen">
        {/* HERO */}
        <section className="relative bg-[#042F22] text-white overflow-hidden py-24 md:py-32">
          <div className="absolute inset-0 opacity-40">
            <Image
              src="https://images.unsplash.com/photo-1531058020387-3be344556be6"
              alt="Conference Hall Background"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 grid md:grid-cols-2 gap-12 items-center md:pt-20">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 !text-amber-400">
                Novu Resort Conference Hall
              </h1>
              <p className="text-lg md:text-xl text-gray-100 mb-6">
                A refined space for corporate meetings, seminars, product
                launches, and exclusive events.
              </p>
              <Link
                href="#booking"
                className="inline-block bg-amber-500 hover:bg-amber-400 text-black font-semibold px-8 py-3 rounded-full shadow-lg transition"
              >
                Book Now
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl shadow-xl"
            >
              <h3 className="text-xl font-semibold !text-amber-300 mb-4">
                Hall Overview
              </h3>
              <ul className="space-y-3 text-gray-100">
                <li>• Capacity: 120 Guests</li>
                <li>• Full Multimedia Support</li>
                <li>• Air-Conditioned</li>
                <li>• Professional PA System</li>
                <li>• High-speed Wi-Fi</li>
                <li>• Optional Catering</li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#06402B] mb-12">
              Why Choose Our Conference Hall?
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {features.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition group"
                >
                  <div className="flex justify-center mb-4">
                    <Image
                      src={item.img}
                      alt={item.alt}
                      width={56}
                      height={56}
                      className="opacity-70"
                    />
                  </div>
                  <h4 className="text-lg font-semibold text-[#06402B] mb-2">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Experience next-level convenience & comfort built for
                    corporate excellence.
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* BOOKING FORM */}
        <section
          id="booking"
          className="relative bg-[#042F22] py-24 text-white overflow-hidden"
        >
          <div className="absolute inset-0 opacity-20">
            <Image
              src="https://images.unsplash.com/photo-1484154218962-a197022b5858"
              fill
              alt="Booking Background"
              className="object-cover"
              priority
            />
          </div>

          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-10 !text-amber-400">
              Reserve the Conference Hall
            </h3>

            <form
              onSubmit={handleSubmit}
              className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl shadow-2xl grid grid-cols-1 sm:grid-cols-2 gap-8"
            >
              {["name", "email", "phone", "date", "attendees"].map((field) =>
                field === "date" || field === "attendees" ? (
                  <input
                    key={field}
                    name={field}
                    type={field === "date" ? "date" : "number"}
                    onChange={handleChange}
                    value={form[field]}
                    placeholder={
                      field === "attendees" ? "Number of Attendees" : ""
                    }
                    className="p-3 bg-white/20 rounded-lg w-full placeholder-gray-200 text-white focus:ring-2 focus:ring-amber-400"
                  />
                ) : (
                  <input
                    key={field}
                    name={field}
                    type={field === "email" ? "email" : "text"}
                    onChange={handleChange}
                    value={form[field]}
                    placeholder={field === "name" ? "Full Name" : "Email"}
                    className="p-3 bg-white/20 rounded-lg w-full placeholder-gray-200 text-white focus:ring-2 focus:ring-amber-400"
                  />
                )
              )}

              <textarea
                name="message"
                rows={4}
                onChange={handleChange}
                value={form.message}
                placeholder="Additional Details"
                className="col-span-1 sm:col-span-2 p-3 bg-white/20 rounded-lg text-white placeholder-gray-200 focus:ring-2 focus:ring-amber-400"
              />

              <button
                type="submit"
                disabled={loading}
                className="col-span-1 sm:col-span-2 py-3 bg-amber-500 hover:bg-amber-400 text-black text-lg font-semibold rounded-full transition disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Booking Request"}
              </button>
            </form>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#042F22] py-12 text-center text-white">
          <h4 className="text-2xl font-semibold mb-4 !text-white">
            Need help customizing your event?
          </h4>

          <Link
            href="tel:+263000000000"
            className="inline-block px-8 py-3 rounded-full font-semibold transition !bg-amber-500 hover:!bg-amber-400 !text-black"
          >
            Call Reservations
          </Link>
        </section>
      </div>
    </Layout>
  );
}
