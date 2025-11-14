"use client";
import React, { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaEnvelope,
  FaTimesCircle,
  FaTrash,
  FaEye,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import DashbordLayout from "../components/DashbordLayout";
import Header from "../components/Header";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [viewedOrders, setViewedOrders] = useState([]); // Track viewed orders

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/dining-orders");
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();

      const formatted = data.map((order) => ({
        ...order,
        items: order.items.map((i) => ({
          ...i,
          dishName: i.dish?.name || i.dishId || "Unknown",
        })),
      }));

      // Sort pending (new) orders to the top
      const sorted = formatted.sort((a, b) => {
        if (a.status === "pending" && b.status !== "pending") return -1;
        if (a.status !== "pending" && b.status === "pending") return 1;
        return 0;
      });

      setOrders(sorted);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Approve / reject / delete
  const updateOrderStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/dining-orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update order");
      fetchOrders();
      closeModal();
    } catch (err) {
      console.error(err);
      alert("Failed to update order");
    }
  };

  const deleteOrder = async (id) => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    try {
      const res = await fetch(`/api/dining-orders/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete order");
      fetchOrders();
    } catch (err) {
      console.error(err);
      alert("Failed to delete order");
    }
  };

  const openModal = (order) => {
    setSelectedOrder(order);
    setModalOpen(true);
    setViewedOrders((prev) => [...new Set([...prev, order._id])]); // Mark as viewed
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setModalOpen(false);
  };

  return (
    <DashbordLayout>
      <div className="bg-gray-200 min-h-screen w-full">
        <Header />
        <h1 className="text-3xl font-bold text-[#06402B] mb-6">Orders</h1>

        {loading && <p className="text-gray-500">Loading orders...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && orders.length === 0 && (
          <p className="text-gray-500">No orders yet.</p>
        )}

        {!loading && orders.length > 0 && (
          <div className="overflow-x-auto p-8">
            <table className="min-w-full bg-white shadow-lg overflow-hidden rounded-lg">
              <thead className="bg-[#06402B] text-white">
                <tr>
                  <th className="py-3 px-6 text-left">Customer</th>
                  <th className="py-3 px-6 text-left">Items</th>
                  <th className="py-3 px-6 text-left">Total</th>
                  <th className="py-3 px-6 text-left">Payment</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => {
                  const isNew =
                    order.status === "pending" &&
                    !viewedOrders.includes(order._id);

                  return (
                    <tr
                      key={order._id}
                      className={`transition cursor-pointer ${
                        isNew ? "bg-green-100" : "hover:bg-gray-50"
                      }`}
                      onClick={() => openModal(order)}
                    >
                      <td
                        className={`py-4 px-6 flex items-center gap-2 ${
                          isNew ? "font-bold" : ""
                        }`}
                      >
                        {order.customer.name}
                        {isNew && (
                          <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                            New
                          </span>
                        )}
                      </td>
                      <td className={`py-4 px-6 ${isNew ? "font-bold" : ""}`}>
                        {order.items.map((i, idx) => (
                          <p key={idx} className="text-gray-700">
                            {i.dishName} x {i.qty}
                          </p>
                        ))}
                      </td>
                      <td
                        className={`py-4 px-6 text-green-700 ${
                          isNew ? "font-bold" : ""
                        }`}
                      >
                        R {order.total}
                      </td>
                      <td className={`py-4 px-6 ${isNew ? "font-bold" : ""}`}>
                        {order.payment?.method || order.payment}
                      </td>
                      <td className={`py-4 px-6 ${isNew ? "font-bold" : ""}`}>
                        <span
                          className={`px-3 py-1 rounded-full text-white font-semibold ${
                            order.status === "approved"
                              ? "bg-green-600"
                              : order.status === "rejected"
                              ? "bg-red-600"
                              : "bg-yellow-500"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td
                        className={`py-4 px-6 flex justify-center gap-2 ${
                          isNew ? "font-bold" : ""
                        }`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {order.status === "pending" && (
                          <>
                            <button
                              onClick={() =>
                                updateOrderStatus(order._id, "approved")
                              }
                              className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition"
                            >
                              <FaCheckCircle />
                            </button>
                            <button
                              onClick={() =>
                                updateOrderStatus(order._id, "rejected")
                              }
                              className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition"
                            >
                              <FaTimesCircle />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => openModal(order)}
                          className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => deleteOrder(order._id)}
                          className="bg-gray-600 text-white p-2 rounded-lg hover:bg-gray-700 transition"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal */}
        <AnimatePresence>
          {modalOpen && selectedOrder && (
            <>
              <motion.div
                onClick={closeModal}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black z-40"
              />
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center"
              >
                <div className="bg-white w-11/12 max-w-lg p-6 rounded-2xl shadow-2xl text-gray-800">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                    Order Details
                  </h2>
                  <p>
                    <strong>Name:</strong> {selectedOrder.customer.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedOrder.customer.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {selectedOrder.customer.phone}
                  </p>
                  <p className="mt-2 font-semibold text-green-700">
                    Total: R {selectedOrder.total}
                  </p>
                  <p className="mt-1">
                    <strong>Status:</strong>{" "}
                    <span
                      className={`font-semibold ${
                        selectedOrder.status === "approved"
                          ? "text-green-600"
                          : selectedOrder.status === "rejected"
                          ? "text-red-600"
                          : "text-yellow-500"
                      }`}
                    >
                      {selectedOrder.status}
                    </span>
                  </p>

                  <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Items</h3>
                    <ul className="space-y-1">
                      {selectedOrder.items.map((item) => (
                        <li key={item._id} className="flex justify-between">
                          <span>
                            {item.dishName} x {item.qty}
                          </span>
                          <span>R {item.price * item.qty}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {selectedOrder.status === "pending" && (
                    <div className="flex justify-between mt-6 gap-4">
                      <button
                        onClick={() =>
                          updateOrderStatus(selectedOrder._id, "approved")
                        }
                        className="flex-1 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() =>
                          updateOrderStatus(selectedOrder._id, "rejected")
                        }
                        className="flex-1 bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition"
                      >
                        Reject
                      </button>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-4 gap-2">
                    <button
                      onClick={closeModal}
                      className="bg-red-600 w-20 hover:bg-red-700 text-white py-3 rounded-xl transition"
                    >
                      Close
                    </button>

                    {selectedOrder?.customer?.email && (
                      <a
                        href={`mailto:${selectedOrder.customer.email}?subject=Your Order is on the Way!&body=Hello ${selectedOrder.customer.name},%0A%0AYour order with total R${selectedOrder.total} is on its way.%0A%0AThank you for ordering with us!`}
                        className="bg-blue-600 hover:bg-blue-700 text-white p-3 w-16 rounded-xl flex items-center justify-center transition"
                        title="Notify customer via email"
                      >
                        <FaEnvelope size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </DashbordLayout>
  );
}
