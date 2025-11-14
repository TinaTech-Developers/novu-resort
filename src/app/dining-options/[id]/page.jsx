"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Layout from "@/components/Layout";
import { FaArrowLeft, FaPlus, FaMinus } from "react-icons/fa";
import { motion } from "framer-motion";

export default function DishPage() {
  const { id } = useParams();
  const router = useRouter();
  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    async function fetchDish() {
      try {
        const res = await fetch(`/api/dishes/${id}`);
        if (!res.ok) throw new Error("Failed to fetch dish");
        const data = await res.json();
        setDish(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchDish();
  }, [id]);

  if (loading)
    return (
      <p className="text-center mt-20 text-lg text-gray-500">Loading...</p>
    );
  if (!dish)
    return (
      <p className="text-center mt-20 text-lg text-gray-500">Dish not found</p>
    );

  const increaseQty = () => setQty(qty + 1);
  const decreaseQty = () => setQty(qty > 1 ? qty - 1 : 1);

  return (
    <Layout>
      {/* Hero Section with gradient overlay */}
      <div className="relative w-full h-screen md:h-[90vh] overflow-hidden">
        <Image
          src={dish.image}
          alt={dish.name}
          fill
          className="object-cover object-center brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60"></div>

        {/* Back Button */}
        <div className="absolute top-8 left-8 z-20">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-white bg-green-700 px-4 py-2 rounded-2xl shadow-lg hover:bg-green-800 transition"
          >
            <FaArrowLeft /> Back
          </button>
        </div>

        {/* Dish Name & Description */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center z-20 text-white max-w-3xl px-4"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-lg">
            {dish.name}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200 drop-shadow-sm">
            {dish.desc}
          </p>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 flex flex-col md:flex-row gap-10">
        {/* Left Column: More Images / Details */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 space-y-6"
        >
          {/* Main Dish Image */}
          <div className="rounded-3xl overflow-hidden shadow-2xl hover:scale-105 transform transition-all duration-500">
            <Image
              src={dish.image}
              alt={dish.name}
              width={700}
              height={500}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Dish Description Box with Glassmorphism */}
          <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              About this Dish
            </h2>
            <p className="text-gray-700 leading-relaxed">{dish.desc}</p>
          </div>
        </motion.div>

        {/* Right Column: Sticky Order Panel */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="md:w-96 flex-shrink-0 bg-white rounded-3xl shadow-2xl p-8 sticky top-28 h-fit flex flex-col gap-6"
        >
          <h2 className="text-2xl font-bold text-[#06402B]">Order Now</h2>

          {/* Quantity Selector */}
          <div className="flex items-center justify-between border rounded-2xl p-4">
            <button
              onClick={decreaseQty}
              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
            >
              <FaMinus />
            </button>
            <span className="text-lg font-bold">{qty}</span>
            <button
              onClick={increaseQty}
              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
            >
              <FaPlus />
            </button>
          </div>

          {/* Price */}
          <div className="text-center text-3xl font-extrabold text-green-700">
            R {dish.price * qty}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => {
              const cart = JSON.parse(localStorage.getItem("cart") || "[]");
              const existing = cart.find((i) => i._id === dish._id);
              if (existing) existing.qty += qty;
              else cart.push({ ...dish, qty });
              localStorage.setItem("cart", JSON.stringify(cart));
              router.push("/dining-options/checkout");
            }}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-4 rounded-2xl font-bold shadow-xl text-lg transition-transform transform hover:scale-105"
          >
            Add to Cart
          </button>

          {/* Extra Info */}
          <p className="text-center text-gray-500 text-sm mt-2">
            Free delivery within within the resort area.
          </p>
        </motion.div>
      </div>
    </Layout>
  );
}
