"use client";

import React, { useState, useEffect } from "react";
import { BsPersonFill, BsTrash, BsEye, BsX } from "react-icons/bs";

function ApprovedOrders({ refreshFlag }) {
  const [approved, setApproved] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null); // for modal

  useEffect(() => {
    async function fetchApprovedBookings() {
      try {
        const res = await fetch("/api/rooms");
        const data = await res.json();
        const today = new Date();

        const bookings = data.rooms.flatMap((room) =>
          (room.bookings || [])
            .filter((b) => b.approved && new Date(b.checkOut) >= today)
            .map((b) => ({
              ...b,
              roomName: room.name,
              roomId: room._id,
              bookingId: b._id,
            }))
        );

        setApproved(bookings);
      } catch (err) {
        console.error("Error fetching approved bookings:", err);
      }
    }

    fetchApprovedBookings();
  }, [refreshFlag]);

  const handleRemove = async (roomId, bookingId) => {
    if (!confirm("Are you sure you want to remove this booking?")) return;
    try {
      await fetch(`/api/rooms/${roomId}/book/${bookingId}`, {
        method: "DELETE",
      });
      setApproved((prev) => prev.filter((b) => b.bookingId !== bookingId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleView = (booking) => {
    setSelectedBooking(booking);
  };

  const closeModal = () => {
    setSelectedBooking(null);
  };

  if (!approved.length)
    return (
      <div className="p-4 text-gray-600">
        <p>No approved bookings found.</p>
      </div>
    );

  return (
    <div className="p-4">
      <h1 className="py-4 font-semibold text-lg">Approved Orders</h1>
      <div className="w-full p-4 border rounded-lg bg-white overflow-y-auto">
        <div className="my-3 p-2 font-semibold grid md:grid-cols-6 sm:grid-cols-4 grid-cols-2 justify-between bg-green-800 text-white py-2">
          <span>Name</span>
          <span className="sm:text-left text-right">Email</span>
          <span className="hidden md:grid">Room</span>
          <span className="hidden md:grid">Period</span>
          <span className="hidden md:grid">Amount</span>
          <span className="hidden md:grid text-left">Action</span>
        </div>

        {approved.map((b) => (
          <ul key={b.bookingId} className="w-full text-sm text-black">
            <li className="bg-gray-50 hover:bg-gray-200 rounded-lg my-3 p-2 grid md:grid-cols-6 sm:grid-cols-4 grid-cols-2 items-center justify-between">
              <div className="flex items-center">
                <div className="bg-amber-50 p-3 rounded-lg">
                  <BsPersonFill className="text-amber-800" />
                </div>
                <p className="pl-4 text-black">{b.fullName}</p>
              </div>
              <p className="sm:text-left text-right">{b.email}</p>
              <p className="hidden md:flex">{b.roomName}</p>
              <p className="hidden md:flex">
                {new Date(b.checkIn).toLocaleDateString("en-GB")} -{" "}
                {new Date(b.checkOut).toLocaleDateString("en-GB")}
              </p>
              <p className="sm:flex hidden justify-between items-center truncate pl-6 font-semibold w-32">
                ${b.total ?? 0}.00
              </p>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleRemove(b.roomId, b.bookingId)}
                  className="text-red-600 hover:text-red-800"
                >
                  <BsTrash size={20} />
                </button>
                <button
                  onClick={() => handleView(b)}
                  className="text-green-600 hover:text-green-800"
                >
                  <BsEye size={20} />
                </button>
              </div>
            </li>
          </ul>
        ))}
      </div>

      {selectedBooking && (
        <ViewBookingModal booking={selectedBooking} onClose={closeModal} />
      )}
    </div>
  );
}

// Modal Component
function ViewBookingModal({ booking, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
        >
          <BsX size={24} />
        </button>

        <h2 className="text-xl font-bold text-green-800 mb-4">
          Booking Details
        </h2>

        <div className="space-y-3 text-gray-700">
          <div>
            <h3 className="font-semibold">Full Name</h3>
            <p>{booking.fullName}</p>
          </div>
          <div>
            <h3 className="font-semibold">Email</h3>
            <p>{booking.email}</p>
          </div>
          <div>
            <h3 className="font-semibold">Room</h3>
            <p>{booking.roomName}</p>
          </div>
          <div>
            <h3 className="font-semibold">Stay Period</h3>
            <p>
              {new Date(booking.checkIn).toLocaleDateString("en-GB")} -{" "}
              {new Date(booking.checkOut).toLocaleDateString("en-GB")}
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Total Amount</h3>
            <p className="text-lg font-bold text-green-700">
              ${booking.total ?? 0}.00
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApprovedOrders;
