"use client";
import React, { useState, useEffect } from "react";
import { BsPersonFill, BsThreeDotsVertical } from "react-icons/bs";
import RemoveButton from "../components/RemoveButton";
import DashbordLayout from "../components/DashbordLayout";
import Header from "../components/Header";
import ApprovedOrders from "../components/ApprovedOrders";

function Customers() {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false);

  // Fetch all rooms and extract only booked rooms
  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/rooms");
      const data = await res.json();
      const rooms = data.rooms || [];

      const today = new Date();

      const bookedRooms = rooms.flatMap((room) =>
        (room.bookings || [])
          .filter((b) => new Date(b.checkOut) >= today)
          .map((b) => ({
            ...b,
            roomName: room.name,
            roomId: room._id,
            bookingId: b._id,
            checkIn: b.checkIn,
            checkOut: b.checkOut,
            fullName: b.fullName || "Guest",
            email: b.email || "No email",
            total: b.total || room.price,
            approved: b.approved || false,
          }))
      );

      setBookings(bookedRooms);
    } catch (err) {
      console.error("Error fetching booked rooms:", err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [refreshFlag]);

  const openModal = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedBooking(null);
    setIsModalOpen(false);
  };

  const cancelBooking = async (roomId, bookingId) => {
    setLoading(true);
    try {
      await fetch(`/api/rooms/${roomId}/book/${bookingId}`, {
        method: "DELETE",
      });
      setBookings((prev) => prev.filter((b) => b.bookingId !== bookingId));
      setRefreshFlag((prev) => !prev);
      closeModal();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const approveBooking = async (roomId, bookingId) => {
    setLoading(true);
    try {
      await fetch(`/api/rooms/${roomId}/book/${bookingId}/approve`, {
        method: "PATCH",
      });

      setBookings((prev) =>
        prev.map((b) =>
          b.bookingId === bookingId ? { ...b, approved: true } : b
        )
      );
      setRefreshFlag((prev) => !prev);
      closeModal();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashbordLayout>
      <main className="bg-gray-200 min-h-screen w-full">
        <Header />
        <div className="bg-gray-100 min-h-screen w-full">
          <hr className="bg-white mt-4" />
          <div className="p-4">
            <h1 className="py-4 font-semibold text-gray-800 pt-10">
              Recent / Pending Bookings
            </h1>
            <div className="w-full p-4 border rounded-lg bg-white overflow-y-auto">
              <div className="my-3 p-2 font-semibold grid md:grid-cols-6 sm:grid-cols-3 grid-cols-2 justify-between cursor-pointer bg-gray-800 text-white py-2">
                <span>Name</span>
                <span className="sm:text-left text-right">Email</span>
                <span className="hidden md:grid">Room</span>
                <span className="hidden md:grid">Period</span>
                <span className="hidden md:grid pl-6">Amount</span>
                <span className="hidden md:grid text-left">Action</span>
              </div>

              {bookings.map((b) => (
                <ul key={b.bookingId} className="w-full text-sm text-black">
                  <li className="bg-gray-50 hover:bg-gray-200 rounded-lg my-3 text-black p-2 grid md:grid-cols-6 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer">
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
                    <div className="sm:flex hidden justify-between items-center">
                      <p className="truncate text-ellipsis pl-6 font-semibold w-32">
                        ${b.total ?? 0}.00
                      </p>
                    </div>
                    <div className="flex items-center space-x-6">
                      <RemoveButton
                        id={b.bookingId}
                        onClick={() => cancelBooking(b.roomId, b.bookingId)}
                      />
                      <BsThreeDotsVertical
                        size={"1.4rem"}
                        className="cursor-pointer"
                        onClick={() => openModal(b)}
                      />
                    </div>
                  </li>
                </ul>
              ))}
            </div>
          </div>

          <ApprovedOrders refreshFlag={refreshFlag} />

          {isModalOpen && selectedBooking && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
                <button
                  onClick={closeModal}
                  className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                >
                  &times;
                </button>
                <h2 className="text-xl font-bold mb-4">Booking Details</h2>
                <p>
                  <strong>Name:</strong> {selectedBooking.fullName}
                </p>
                <p>
                  <strong>Email:</strong> {selectedBooking.email}
                </p>
                <p>
                  <strong>Room:</strong> {selectedBooking.roomName}
                </p>
                <p>
                  <strong>Period:</strong>{" "}
                  {new Date(selectedBooking.checkIn).toLocaleDateString(
                    "en-GB"
                  )}{" "}
                  -{" "}
                  {new Date(selectedBooking.checkOut).toLocaleDateString(
                    "en-GB"
                  )}
                </p>
                <p>
                  <strong>Total:</strong> ${selectedBooking.total ?? 0}.00
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {selectedBooking.approved ? "Approved" : "Pending"}
                </p>

                <div className="mt-6 flex justify-between space-x-4">
                  <button
                    onClick={() =>
                      cancelBooking(
                        selectedBooking.roomId,
                        selectedBooking.bookingId
                      )
                    }
                    disabled={loading}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    {loading ? "Cancelling..." : "Cancel Booking"}
                  </button>

                  {!selectedBooking.approved && (
                    <button
                      onClick={() =>
                        approveBooking(
                          selectedBooking.roomId,
                          selectedBooking.bookingId
                        )
                      }
                      disabled={loading}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      {loading ? "Approving..." : "Approve Booking"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </DashbordLayout>
  );
}

export default Customers;
