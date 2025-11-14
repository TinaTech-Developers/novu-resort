"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashbordLayout from "../../components/DashbordLayout";

export default function ConferenceDetails() {
  const { id } = useParams();
  const router = useRouter();

  const [conference, setConference] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState({});

  const statusColors = {
    Confirmed: "bg-green-700 text-white",
    Pending: "bg-amber-400 text-black",
  };

  useEffect(() => {
    if (!id) return;
    fetchConference();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function fetchConference() {
    setLoading(true);
    try {
      const res = await fetch(`/api/conference/${id}`);
      if (!res.ok) {
        throw new Error("Failed to fetch booking");
      }
      const data = await res.json();
      setConference(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load booking");
    } finally {
      setLoading(false);
    }
  }

  const openModal = () => {
    if (!conference) return;
    setEditData({
      name: conference.name || "",
      email: conference.email || "",
      phone: conference.phone || "",
      date: conference.date ? conference.date.substring(0, 10) : "",
      attendees: conference.attendees || "",
      message: conference.message || "",
      status: conference.status || "Pending",
      image: conference.image || "",
    });
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = async (payload = null) => {
    const dataToSend = payload || editData;
    try {
      const res = await fetch(`/api/conference/${conference._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });
      if (!res.ok) throw new Error("Failed to update booking");
      const data = await res.json();
      setConference(data.booking || data);
      toast.success("Booking updated");
      closeModal();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update booking");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this conference booking?")) return;

    try {
      const res = await fetch(`/api/conference/${conference._id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Booking deleted");
      setTimeout(() => {
        router.push("/admin/conference");
      }, 800);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete booking");
    }
  };

  const handleRespond = () => {
    if (!conference.email) {
      toast.error("No email available for this booking");
      return;
    }
    const subject = encodeURIComponent("Regarding your conference booking");
    const body = encodeURIComponent(`Hi ${conference.name},\n\n`);
    window.location.href = `mailto:${conference.email}?subject=${subject}&body=${body}`;
  };

  if (loading) {
    return (
      <DashbordLayout>
        <div className="py-40 text-center text-gray-400">
          Loading booking...
        </div>
      </DashbordLayout>
    );
  }

  if (!conference) {
    return (
      <DashbordLayout>
        <div className="flex flex-col items-center justify-center max-w-7xl mx-auto p-6">
          <p className="text-red-600">Booking not found.</p>
          <button
            onClick={() => router.back()}
            className="mt-4 inline-flex items-center gap-2 text-amber-500 hover:underline"
          >
            <ArrowLeft className="w-5 h-5" /> Back
          </button>
        </div>
      </DashbordLayout>
    );
  }

  return (
    <DashbordLayout>
      <ToastContainer position="top-right" autoClose={3500} />
      <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
        {/* Back */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-amber-500 hover:underline"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Bookings
        </button>

        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-gradient-to-r from-green-600 to-lime-500 text-white rounded-2xl p-6 shadow-lg flex justify-between items-center"
        >
          <div>
            <h1 className="text-2xl font-bold">{conference.name}</h1>
            <p className="mt-1 text-sm opacity-90">
              {new Date(conference.date).toLocaleDateString()}
            </p>
            <p className="mt-1 text-sm opacity-80">{conference.email}</p>
          </div>

          <div className="flex items-center gap-4">
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                statusColors[conference.status] || "bg-amber-400 text-black"
              }`}
            >
              {conference.status || "Pending"}
            </span>
            <div className="text-right">
              <div className="text-xs text-white/80">Attendees</div>
              <div className="font-bold text-xl">{conference.attendees}</div>
            </div>
          </div>
        </motion.div>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="bg-white p-4 rounded-xl shadow hover:shadow-md transition"
        >
          <h3 className="text-gray-500 font-semibold">Message</h3>
          <p className="mt-1 text-gray-800">{conference.message || "-"}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="bg-white p-4 rounded-xl shadow hover:shadow-md transition"
        >
          <h3 className="text-gray-500 font-semibold">Contact</h3>
          <p className="mt-1 text-gray-800">Phone: {conference.phone}</p>
          <p className="mt-1 text-gray-800">Email: {conference.email}</p>
          <p className="mt-1 text-gray-800">
            Date: {new Date(conference.date).toLocaleString()}
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-3 flex-wrap"
        >
          <button
            onClick={openModal}
            className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-black rounded-xl transition shadow"
          >
            Edit Booking
          </button>

          <button
            onClick={handleDelete}
            className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl transition shadow"
          >
            Delete Booking
          </button>

          <button
            onClick={handleRespond}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition shadow"
          >
            Respond via Email
          </button>
        </motion.div>

        {/* Edit Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 flex justify-center items-center z-50"
            >
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-lg"
              >
                <h3 className="text-xl font-bold text-green-700 mb-4">
                  Edit Booking
                </h3>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const payload = {
                      name: editData.name,
                      email: editData.email,
                      phone: editData.phone,
                      date: editData.date,
                      attendees: Number(editData.attendees),
                      message: editData.message,
                      status: editData.status,
                      image: editData.image,
                    };
                    handleSave(payload);
                  }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <input
                    name="name"
                    placeholder="Full name"
                    value={editData.name || ""}
                    onChange={handleEditChange}
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600"
                    required
                  />
                  <input
                    name="email"
                    placeholder="Email"
                    value={editData.email || ""}
                    onChange={handleEditChange}
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600"
                    type="email"
                    required
                  />
                  <input
                    name="phone"
                    placeholder="Phone"
                    value={editData.phone || ""}
                    onChange={handleEditChange}
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600"
                    required
                  />
                  <input
                    name="date"
                    type="date"
                    value={editData.date || ""}
                    onChange={handleEditChange}
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600"
                    required
                  />
                  <input
                    name="attendees"
                    type="number"
                    placeholder="Attendees"
                    value={editData.attendees || ""}
                    onChange={handleEditChange}
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600"
                    required
                  />
                  <select
                    name="status"
                    value={editData.status || "Pending"}
                    onChange={handleEditChange}
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                  </select>

                  <input
                    name="image"
                    placeholder="Image URL (optional)"
                    value={editData.image || conference.image || ""}
                    onChange={handleEditChange}
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 col-span-1 md:col-span-2"
                  />

                  <textarea
                    name="message"
                    placeholder="Message / notes"
                    value={editData.message || conference.message || ""}
                    onChange={handleEditChange}
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 col-span-1 md:col-span-2"
                  />

                  <div className="flex justify-end gap-3 col-span-1 md:col-span-2 mt-2">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 rounded-lg border hover:bg-gray-100 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashbordLayout>
  );
}
