"use client";
import React from "react";
import Link from "next/link";

export default function ListOfAvailableApartments({ rooms }) {
  if (!rooms || rooms.length === 0) return null; // remain hidden if no rooms

  return (
    <section className="max-w-6xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold text-green-900 mb-10 text-center">
        Currently Available Apartments
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {rooms.map((room) => (
          <div
            key={room._id}
            className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition flex flex-col"
          >
            <img
              src={room.imageUrl}
              alt={room.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold text-green-900">
                {room.name}
              </h3>
              <p className="text-sm text-gray-600 mb-3 flex-grow">
                {room.description}
              </p>
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-green-800">${room.price}</span>
                <span className="text-xs text-gray-500 uppercase">
                  {room.roomType}
                </span>
              </div>
              <Link
                href={`/rooms/${room._id}`}
                className="w-full text-center bg-green-900 text-white font-semibold py-2 rounded-md hover:bg-green-800 transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
