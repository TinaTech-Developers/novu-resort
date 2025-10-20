"use client";
import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export function ContactInfo() {
  const info = [
    { icon: <FaPhoneAlt />, label: "Phone", value: "+263 77 123 4567" },
    { icon: <FaEnvelope />, label: "Email", value: "info@novuresort.com" },
    { icon: <FaMapMarkerAlt />, label: "Location", value: "Nyanga, Zimbabwe" },
  ];

  return (
    <section className="max-w-6xl mx-auto py-16 px-5 md:px-10">
      <h2 className="text-3xl font-bold text-green-900 text-center mb-10">
        Reach Us Easily
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {info.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition"
          >
            <div className="text-green-900 text-4xl mb-4">{item.icon}</div>
            <h3 className="font-semibold text-lg mb-2">{item.label}</h3>
            <p className="text-gray-700">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
