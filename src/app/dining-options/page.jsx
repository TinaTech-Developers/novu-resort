"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingCart, FaPlus, FaMinus, FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import Link from "next/link";

export default function DiningOptions() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [dishes, setDishes] = useState([]);
  const router = useRouter();

  // Fetch dishes
  useEffect(() => {
    async function fetchDishes() {
      const res = await fetch("/api/dishes");
      const data = await res.json();
      setDishes(data);
    }
    fetchDishes();
  }, []);

  const addToCart = (dish) => {
    setCart((prev) => {
      const existing = prev.find((i) => i._id === dish._id);
      if (existing) {
        return prev.map((i) =>
          i._id === dish._id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...dish, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) =>
      prev
        .map((i) => (i._id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const goToCheckout = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
    router.push("/dining-options/checkout");
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        {/* Hero */}
        <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=1600&q=80"
            alt="Dining Hero"
            fill
            className="object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-black/40" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center px-6"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white uppercase tracking-widest">
              Dining Options
            </h1>
            <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto">
              Savor exceptional flavors crafted with passion.
            </p>
          </motion.div>
        </section>

        {/* Floating Cart Button */}
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-8 right-8 bg-[#06402B] hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition"
        >
          <FaShoppingCart size={22} />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
              {cart.length}
            </span>
          )}
        </button>

        {/* Dishes Grid */}
        <section className="max-w-6xl mx-auto px-6 py-20 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {dishes.map((dish) => (
            <motion.div
              key={dish._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-60 overflow-hidden">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col justify-between h-52">
                <div>
                  <h3 className="text-xl font-semibold text-[#06402B]">
                    {dish.name}
                  </h3>
                  <p className="text-gray-600 mt-2 text-sm">{dish.desc}</p>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => addToCart(dish)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm transition"
                  >
                    <FaPlus size={12} /> Add
                  </button>
                  <Link
                    href={`/dining-options/${dish._id}`}
                    className="py-2 bg-lime-600 hover:bg-lime-800 text-white px-5 rounded-full font-semibold text-sm transition"
                  >
                    Explore
                  </Link>
                </div>
                <p className="text-lg font-bold text-green-700">
                  R {dish.price}
                </p>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Cart Drawer */}
        <AnimatePresence>
          {cartOpen && (
            <>
              <motion.div
                onClick={() => setCartOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black z-40"
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                className="fixed right-0 top-0 h-full w-full sm:w-[400px] bg-white z-50 shadow-2xl flex flex-col"
              >
                <div className="flex items-center justify-between px-6 py-4 border-b">
                  <h3 className="text-2xl font-semibold text-[#06402B]">
                    Your Order
                  </h3>
                  <button onClick={() => setCartOpen(false)}>
                    <FaTimes
                      size={18}
                      className="text-gray-600 hover:text-red-600"
                    />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-gray-500 text-center mt-20">
                      Your cart is empty.
                    </p>
                  ) : (
                    cart.map((item) => (
                      <div
                        key={item._id}
                        className="flex justify-between items-center border-b pb-2"
                      >
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            R {item.price}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => removeFromCart(item._id)}
                            className="bg-gray-200 hover:bg-gray-300 p-2 rounded-md"
                          >
                            <FaMinus size={10} />
                          </button>
                          <span>{item.qty}</span>
                          <button
                            onClick={() => addToCart(item)}
                            className="bg-gray-200 hover:bg-gray-300 p-2 rounded-md"
                          >
                            <FaPlus size={10} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="px-6 py-6 border-t bg-gray-50">
                    <div className="flex justify-between mb-4">
                      <p className="text-lg font-semibold">Total</p>
                      <p className="text-lg font-bold text-green-700">
                        R {total}
                      </p>
                    </div>
                    <button
                      onClick={goToCheckout}
                      className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-semibold transition"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}
