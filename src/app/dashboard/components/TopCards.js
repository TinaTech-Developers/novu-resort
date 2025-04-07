"use client";
import React, { useState, useEffect } from "react";

// Helper function to calculate the start of the week (Monday)
const getStartOfWeek = (date) => {
  const d = new Date(date);
  const day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6 : 1); // Adjust when day is Sunday
  const startOfWeek = new Date(d.setDate(diff));
  startOfWeek.setHours(0, 0, 0, 0); // Set to midnight
  return startOfWeek;
};

export default function TopCards() {
  const [reservations, setReservations] = useState([]);
  const [total, setTotal] = useState(0); // Store the calculated total
  const [weeklyTotal, setWeeklyTotal] = useState(0); // Weekly total state

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/reservations");
        const reservations = await response.json();

        if (Array.isArray(reservations.reservations)) {
          // Calculate the total sum of the "total" field directly here
          const allTotal = reservations.reservations.reduce((acc, current) => {
            // Convert current.total (string) to a number and add it to the accumulator
            const currentTotal = parseFloat(current.total) || 0; // Fallback to 0 if NaN
            return acc + currentTotal;
          }, 0);

          // Optionally round the total to an integer, or keep it as a float:
          setTotal(Math.round(allTotal)); // For integer sum
          // setTotal(allTotal); // Uncomment this to keep as decimal (without rounding)
        }

        if (Array.isArray(reservations.reservations)) {
          setReservations(reservations.reservations);

          // Calculate weekly total
          const today = new Date();
          const sevenDaysAgo = new Date(today);
          sevenDaysAgo.setDate(today.getDate() - 7); // Get date for 7 days ago

          // Filter and sum the reservations within the last 7 days
          const weekly = reservations.reservations.reduce((acc, current) => {
            const createdAtDate = new Date(current.createdAt); // Use the createdAt field

            console.log(
              `Created At: ${createdAtDate}, Total: ${current.total}`
            ); // Debugging log

            // Check if createdAtDate is a valid date
            if (!isNaN(createdAtDate.getTime())) {
              // If the reservation is within the last 7 days, add to the total
              if (createdAtDate >= sevenDaysAgo && createdAtDate <= today) {
                return acc + (parseFloat(current.total) || 0); // Ensure total is treated as a number
              }
            } else {
              console.warn(
                `Invalid date for reservation: ${current.createdAt}`
              ); // Warning for invalid dates
            }

            return acc;
          }, 0);

          // Set weekly total state
          setWeeklyTotal(Math.round(weekly)); // You can also set it as a decimal if preferred
        } else {
          console.log("Unexpected data structure:", reservations);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []); // Empty dependency array to run only once when the component mounts

  // // revenue for seven days
  // const today = new Date();
  // const sevenDaysAgo = new Date(today);
  // sevenDaysAgo.setDate(today.getDate() - 7);

  // const weekly = (
  //   Array.isArray(reservations.reservations) ? reservations : []
  // ).reduce((acc, current) => {
  //   const createdAtDate = new Date(current.createdAt); // Use the createdAt field

  //   console.log(`Created At: ${createdAtDate}, Total: ${current.total}`); // Debugging log

  //   // Check if createdAtDate is a valid date
  //   if (!isNaN(createdAtDate.getTime())) {
  //     if (createdAtDate >= sevenDaysAgo && createdAtDate <= today) {
  //       return acc + (parseFloat(current.total) || 0); // Ensure total is treated as a number
  //     }
  //   } else {
  //     console.warn(`Invalid date for reservation: ${current.createdAt}`); // Warning for invalid dates
  //   }

  //   return acc;
  // }, 0);

  // revenue for month agoo
  const today = new Date();
  const monthAgo = new Date(today);
  monthAgo.setMonth(today.getDate() - 30);
  const monthly = (Array.isArray(reservations) ? reservations : []).reduce(
    (acc, current) => {
      const createdAtDate = new Date(current.createdAt); // Use the createdAt field

      console.log(`Created At: ${createdAtDate}, Total: ${current.total}`); // Debugging log

      // Check if createdAtDate is a valid date
      if (!isNaN(createdAtDate.getTime())) {
        if (createdAtDate >= monthAgo && createdAtDate <= today) {
          return acc + (parseFloat(current.total) || 0); // Ensure total is treated as a number
        }
      } else {
        console.warn(`Invalid date for reservation: ${current.createdAt}`); // Warning for invalid dates
      }

      return acc;
    },
    0
  );

  console.log(`Total for the last 30 days: ${monthly}`); // Output the final totareservations

  // total revenue
  const allTotal = (Array.isArray(reservations) ? reservations : []).reduce(
    (acc, current) => acc + (current.total || 0),
    0
  );

  return (
    <div className="grid lg:grid-cols-5 gap-4 p-4 mt-10">
      <div className=" lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
        <div className="flex flex-col w-full pb-4">
          <p className="text-2xl font-bold">${weeklyTotal}</p>
          <p className="text-gray-600">Weekly Revenue</p>
        </div>
        <p className="bg-amber-200 flex justify-center items-center p-2 rounded-lg">
          <span className="text-amber-700 text-lg">
            {((weeklyTotal / total) * 100).toFixed(1)}%
          </span>
        </p>
      </div>
      <div className=" lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
        <div className="flex flex-col w-full pb-4">
          <p className="text-2xl font-bold">${monthly}</p>
          <p className="text-gray-600">Monthly Revenue</p>
        </div>
        <p className="bg-amber-200 flex justify-center items-center p-2 rounded-lg">
          <span className="text-amber-700 text-lg">
            {((monthly / total) * 100).toFixed(1)}%
          </span>
        </p>
      </div>
      <div className="bg-white flex justify-between w-full border p-4 rounded-lg">
        <div className="flex flex-col w-full pb-4">
          <p className="text-2xl font-bold">${total}</p>
          <p className="text-gray-600">Total Revenue</p>
        </div>
        <p className="bg-amber-200 flex justify-center items-center p-2 rounded-lg">
          <span className="text-amber-700 text-lg">+48%</span>
        </p>
      </div>
    </div>
  );
}
