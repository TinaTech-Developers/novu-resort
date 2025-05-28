import React from "react";

function ApartmentAvailability() {
  return (
    <form className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 md:p-8 mt-[-4rem] border border-green-900">
      <h2 className="text-2xl font-semibold text-green-900 mb-6 text-center">
        Check Apartment Availability
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="text"
          name="fullName"
          required
          placeholder="Full Name"
          className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
          aria-label="Full Name"
        />
        <input
          type="email"
          name="email"
          required
          placeholder="Email Address"
          className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
          aria-label="Email Address"
        />
        <input
          type="date"
          name="moveInDate"
          required
          className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
          aria-label="Move-in Date"
        />
        <input
          type="date"
          name="moveOutDate"
          required
          className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
          aria-label="Move-out Date"
        />
      </div>
      <button
        type="submit"
        className="mt-8 w-full md:w-auto bg-green-900 text-white font-semibold px-10 py-3 rounded-md hover:bg-green-800 transition"
      >
        Check Availability
      </button>
    </form>
  );
}

export default ApartmentAvailability;
