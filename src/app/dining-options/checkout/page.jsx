"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    payment: "card",
  });
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const grandTotal = total + 25; // service fee

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleNext = (e) => {
    e.preventDefault();
    if (form.name && form.email && form.phone) setStep(2);
  };

  const handlePay = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/dining-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: form,
          items: cart.map((item) => ({
            dish: item._id,
            qty: item.qty,
            price: item.price,
          })),
          payment: { method: form.payment, status: "paid" },
        }),
      });
      if (!res.ok) throw new Error("Order failed");
      setStep(3);
      localStorage.removeItem("cart");
    } catch (err) {
      console.error(err);
      alert("Failed to place order");
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-[#0d0f10] md:mt-20 text-white flex flex-col items-center py-24 px-4">
        <motion.div className="w-full max-w-5xl bg-[#131517] rounded-3xl shadow-2xl overflow-hidden border border-[#1f2428]">
          {/* Header */}
          <div className="bg-[#111315] border-b border-[#1f2428] py-8 text-center">
            <h1 className="text-4xl font-bold text-white tracking-wide">
              Checkout
            </h1>
            <p className="text-gray-400 text-sm mt-2">
              {step < 3
                ? "Complete your order securely"
                : "Payment successful — enjoy your meal!"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 p-8 md:p-12">
            {/* Customer Form */}
            {step === 1 && (
              <motion.form onSubmit={handleNext} className="space-y-5">
                <h2 className="text-2xl font-semibold mb-4">
                  Customer Details
                </h2>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#1c1f22] border border-[#2c3237] rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#1c1f22] border border-[#2c3237] rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#1c1f22] border border-[#2c3237] rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 transition text-white py-3 rounded-xl font-semibold shadow-md"
                >
                  Continue to Payment
                </button>
              </motion.form>
            )}

            {/* Payment */}
            {step === 2 && (
              <motion.div className="space-y-5">
                <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
                <div className="flex flex-col gap-4">
                  {["card", "cash"].map((p) => (
                    <label
                      key={p}
                      className={`border rounded-xl p-4 cursor-pointer flex justify-between items-center ${
                        form.payment === p
                          ? "border-green-500 bg-[#1b1f21]"
                          : "border-[#2c3237]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          value={p}
                          checked={form.payment === p}
                          onChange={handleChange}
                          className="accent-green-600"
                        />
                        <span>
                          {p === "card"
                            ? "Credit / Debit Card"
                            : "Pay on Delivery"}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
                <button
                  onClick={handlePay}
                  disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-700 transition text-white py-3 rounded-xl font-semibold shadow-md mt-6"
                >
                  Pay R {grandTotal}
                </button>
              </motion.div>
            )}

            {/* Success */}
            {step === 3 && (
              <motion.div className="flex flex-col justify-center items-center text-center">
                <FaCheckCircle className="text-green-500 text-5xl mb-4" />
                <h2 className="text-3xl font-bold text-white mb-3">
                  Payment Successful!
                </h2>
                <p className="text-gray-400 mb-6 max-w-sm">
                  Your order has been confirmed. You’ll receive a confirmation
                  email shortly.
                </p>
                <Link
                  href="/dining-options"
                  className="flex items-center gap-2 text-green-400 hover:text-green-300 transition"
                >
                  <FaArrowLeft /> Back to Home
                </Link>
              </motion.div>
            )}

            {/* Order Summary */}
            <motion.div className="bg-[#1b1f21] rounded-2xl p-6 border border-[#2c3237]">
              <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
              <div className="divide-y divide-[#2c3237]">
                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between items-center py-4"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                    </div>
                    <p className="font-semibold text-green-400">
                      R {item.price * item.qty}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#2c3237] mt-4 pt-4 space-y-2">
                <div className="flex justify-between text-gray-400">
                  <p>Subtotal</p>
                  <p>R {total}</p>
                </div>
                <div className="flex justify-between text-gray-400">
                  <p>Service Fee</p>
                  <p>R 25</p>
                </div>
                <div className="flex justify-between font-semibold text-lg text-green-400 pt-2">
                  <p>Total</p>
                  <p>R {grandTotal}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
