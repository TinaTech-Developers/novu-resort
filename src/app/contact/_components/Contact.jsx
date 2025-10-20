"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import emailjs from "@emailjs/browser";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const form = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    if (!form.current) return;

    setSubmitting(true);
    emailjs
      .sendForm("service_fh9gnqf", "template_pfws2qh", form.current, {
        publicKey: "NKEqxewRiSKRnxvh6",
      })
      .then(
        () => {
          toast.success("Email sent successfully!");
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          toast.error("Failed to send email. Please try again.");
          console.error(error);
        }
      )
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-10 py-20 grid md:grid-cols-2 gap-16">
      {/* Form Section */}
      <div className="bg-white p-10 rounded-2xl shadow-xl border border-green-900 flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-green-950 mb-6 text-center">
          Get in Touch
        </h2>
        <form ref={form} onSubmit={sendEmail} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder=" "
              className="peer w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-900"
            />
            <label className="absolute left-4 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-green-900 peer-focus:text-xs">
              Name
            </label>
          </div>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder=" "
              className="peer w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-900"
            />
            <label className="absolute left-4 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-green-900 peer-focus:text-xs">
              Email
            </label>
          </div>
          <div className="relative">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              required
              placeholder=" "
              className="peer w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-900 resize-none"
            ></textarea>
            <label className="absolute left-4 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-green-900 peer-focus:text-xs">
              Message
            </label>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-green-900 text-white py-3 rounded-md font-semibold hover:bg-green-800 transition"
          >
            {submitting ? "Sending..." : "Send Message"}
          </button>
          <ToastContainer position="top-right" autoClose={3000} />
        </form>
      </div>

      {/* Image / Map Section */}
      <div className="flex flex-col items-center justify-center">
        <Image
          src={"/IMG-20231122-WA0060.jpg"}
          alt="Contact NYANGA RESORT"
          width={500}
          height={500}
          className="w-full h-auto rounded-2xl shadow-lg object-cover"
        />
        <p className="mt-6 text-gray-700 text-center max-w-md">
          Have questions or suggestions? We value your feedback. Send us a
          message and we’ll respond as soon as possible. Your input helps us
          improve and provide a better experience for all our guests.
        </p>
      </div>
    </div>
  );
}

export default Contact;
