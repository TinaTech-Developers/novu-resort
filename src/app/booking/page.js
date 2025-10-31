"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Users,
  BedDouble,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { ClipLoader } from "react-spinners";
import Layout from "@/components/Layout";

export default function BookingPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    roomType: "",
    guests: 1,
    checkIn: "",
    checkOut: "",
    requests: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate booking API call
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        roomType: "",
        guests: 1,
        checkIn: "",
        checkOut: "",
        requests: "",
      });
    }, 1500);
  };

  return (
    <Layout>
      <section className="relative min-h-screen mt-20 bg-gray-900 text-white flex items-center justify-center px-6 py-20 overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center brightness-50"
          style={{
            backgroundImage: "url('/images/luxury-room-bg.jpg')",
          }}
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 w-full max-w-3xl bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl"
        >
          {!submitted ? (
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-center text-gold-400 mb-8">
                Book Your Stay
              </h2>
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {/* Name */}
                <div className="col-span-1">
                  <label className="flex items-center gap-2 text-sm text-gray-300 mb-1">
                    <User size={16} /> Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md bg-gray-800 border border-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>

                {/* Email */}
                <div className="col-span-1">
                  <label className="flex items-center gap-2 text-sm text-gray-300 mb-1">
                    <Mail size={16} /> Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md bg-gray-800 border border-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>

                {/* Phone */}
                <div className="col-span-1">
                  <label className="flex items-center gap-2 text-sm text-gray-300 mb-1">
                    <Phone size={16} /> Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md bg-gray-800 border border-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>

                {/* Room Type */}
                <div className="col-span-1">
                  <label className="flex items-center gap-2 text-sm text-gray-300 mb-1">
                    <BedDouble size={16} /> Room Type
                  </label>
                  <select
                    name="roomType"
                    value={formData.roomType}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md bg-gray-800 border border-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-600"
                  >
                    <option value="">Select a room</option>
                    <option value="single">Single Room</option>
                    <option value="double">Double Room</option>
                    <option value="two-bed">Two Bed</option>
                    <option value="family">Family Suite</option>
                  </select>
                </div>

                {/* Guests */}
                <div className="col-span-1">
                  <label className="flex items-center gap-2 text-sm text-gray-300 mb-1">
                    <Users size={16} /> Guests
                  </label>
                  <input
                    type="number"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    min="1"
                    max="10"
                    required
                    className="w-full rounded-md bg-gray-800 border border-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>

                {/* Check-in */}
                <div className="col-span-1">
                  <label className="flex items-center gap-2 text-sm text-gray-300 mb-1">
                    <CalendarDays size={16} /> Check-In
                  </label>
                  <input
                    type="date"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md bg-gray-800 border border-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>

                {/* Check-out */}
                <div className="col-span-1">
                  <label className="flex items-center gap-2 text-sm text-gray-300 mb-1">
                    <CalendarDays size={16} /> Check-Out
                  </label>
                  <input
                    type="date"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md bg-gray-800 border border-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>

                {/* Special Requests */}
                <div className="col-span-2">
                  <label className="block text-sm text-gray-300 mb-1">
                    Special Requests
                  </label>
                  <textarea
                    name="requests"
                    value={formData.requests}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Any special needs or preferences?"
                    className="w-full rounded-md bg-gray-800 border border-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>

                {/* Button */}
                <div className="col-span-2 flex justify-center">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-green-700 hover:bg-green-600 text-white font-medium px-8 py-3 rounded-md shadow-lg transition duration-300 flex items-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <ClipLoader size={20} color="#fff" />
                        Processing...
                      </>
                    ) : (
                      "Book Now"
                    )}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center py-20">
              <motion.h3
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-3xl font-semibold text-green-400 mb-4"
              >
                Booking Successful!
              </motion.h3>
              <p className="text-gray-300">
                Thank you for booking with us. Our team will contact you shortly
                to confirm your reservation.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-8 bg-green-700 hover:bg-green-600 text-white px-6 py-2 rounded-md"
              >
                Make Another Booking
              </button>
            </div>
          )}
        </motion.div>
      </section>
    </Layout>
  );
}
