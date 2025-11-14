"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DashbordLayout from "../components/DashbordLayout";
import Header from "../components/Header";
import { useRouter } from "next/navigation";

export default function AdminConferencesPage() {
  const [conferences, setConferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch conferences
  const fetchConferences = async () => {
    try {
      const res = await fetch("/api/conference");
      const data = await res.json();
      setConferences(data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch conferences");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConferences();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;
    try {
      await fetch(`/api/conference/${id}`, { method: "DELETE" });
      setConferences(conferences.filter((c) => c._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete conference");
    }
  };

  if (loading) {
    return (
      <DashbordLayout>
        <div className="py-40 text-center text-gray-400">Loading...</div>
      </DashbordLayout>
    );
  }

  return (
    <DashbordLayout>
      <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto p-6 h-screen">
        <Header />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-amber-500 mt-10"
        >
          Conference Bookings
        </motion.h2>
        <p className="text-gray-700">Manage all conference hall bookings.</p>

        <div className="overflow-x-auto rounded-lg shadow-md bg-[#042F22]">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-amber-500">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-black">
                  #
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-black">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-black">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-black">
                  Attendees
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-black">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-black">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700 text-white">
              {conferences.map((c, idx) => (
                <tr
                  key={c._id}
                  className="hover:bg-[#06402B] transition cursor-pointer"
                >
                  <td className="px-6 py-4">{idx + 1}</td>
                  <td className="px-6 py-4">{c.name}</td>
                  <td className="px-6 py-4">
                    {new Date(c.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">{c.attendees}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-semibold ${
                        c.status === "Confirmed"
                          ? "bg-green-700 text-white"
                          : "bg-amber-400 text-black"
                      }`}
                    >
                      {c.status || "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-3">
                    <button
                      onClick={() =>
                        router.push(`/dashboard/conference/${c._id}`)
                      }
                      className="px-3 py-1 bg-amber-500 text-black rounded hover:bg-amber-400 transition text-sm"
                    >
                      View / Edit
                    </button>

                    <button
                      onClick={() => handleDelete(c._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashbordLayout>
  );
}
