"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

export default function ViewApprovedBooking() {
  const { bookingId } = useParams();
  const router = useRouter();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (!bookingId) return;

    async function fetchBooking() {
      try {
        const res = await fetch(`/api/rooms/bookings/${bookingId}`);
        const data = await res.json();
        setBooking(data.booking || null);
      } catch (err) {
        console.error("Error fetching booking details:", err);
      }
    }
    fetchBooking();
  }, [bookingId]);

  if (!booking)
    return (
      <div className="p-6 text-gray-600">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-green-700 hover:underline mb-4"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <p>Loading booking details...</p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-green-700 hover:underline"
      >
        <ArrowLeft className="w-5 h-5" /> Back to Approved Orders
      </button>

      <div className="bg-gradient-to-r from-green-950 to-green-600 text-white rounded-2xl p-6 shadow-lg flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Booking Details</h1>
          <p className="mt-1 text-sm opacity-80">{booking.fullName}</p>
        </div>
        <span className="px-4 py-2 rounded-full text-sm font-semibold bg-green-100 text-green-800">
          {booking.approved ? "Approved" : "Pending"}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-gray-500 font-semibold">Full Name</h3>
          <p className="mt-1">{booking.fullName}</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-gray-500 font-semibold">Email</h3>
          <p className="mt-1">{booking.email}</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-gray-500 font-semibold">Room</h3>
          <p className="mt-1">{booking.roomName}</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-gray-500 font-semibold">Stay Period</h3>
          <p className="mt-1">
            {new Date(booking.checkIn).toLocaleDateString("en-GB")} -{" "}
            {new Date(booking.checkOut).toLocaleDateString("en-GB")}
          </p>
        </div>

        <div className="sm:col-span-2 bg-white p-4 rounded-xl shadow">
          <h3 className="text-gray-500 font-semibold">Total Amount</h3>
          <p className="mt-1 text-lg font-semibold">${booking.total}.00</p>
        </div>
      </div>
    </div>
  );
}
