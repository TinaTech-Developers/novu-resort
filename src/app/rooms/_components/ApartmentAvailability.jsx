"use client";
import React, { useState } from "react";

export default function ApartmentAvailability({ onResults = () => {} }) {
  // default to no-op function if not provided
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    moveInDate: "",
    moveOutDate: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `/api/rooms/check-availability?checkIn=${form.moveInDate}&checkOut=${form.moveOutDate}`
      );
      const data = await res.json();
      onResults(data.rooms || []);
    } catch (err) {
      console.error(err);
      onResults([]); // still safe now
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-[-4rem] bg-white shadow-lg rounded-lg p-6 md:p-8 border border-green-900">
      <h2 className="text-2xl font-semibold text-green-900 mb-6 text-center">
        Check Apartment Availability
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <input
          type="text"
          name="fullName"
          required
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
        />
        <input
          type="email"
          name="email"
          required
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
        />
        <div className="flex flex-col items-start justify-start">
          <label className="w-full font-medium text-green-900">
            Move-In Date
          </label>

          <input
            type="date"
            name="moveInDate"
            required
            value={form.moveInDate}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
          />
        </div>
        <div className="flex flex-col items-start justify-start">
          <label className="w-full font-medium text-green-900">
            Move-Out Date
          </label>
          <input
            type="date"
            name="moveOutDate"
            required
            value={form.moveOutDate}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="md:col-span-2 mt-8 w-full bg-green-900 text-white font-semibold px-10 py-3 rounded-md hover:bg-green-800 transition"
        >
          {loading ? "Checking..." : "Check Availability"}
        </button>
      </form>
    </div>
  );
}
