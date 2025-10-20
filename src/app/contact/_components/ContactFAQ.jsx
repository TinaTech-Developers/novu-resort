"use client";
import React, { useState } from "react";

export function ContactFAQ() {
  const faqs = [
    {
      question: "What are your check-in times?",
      answer: "Check-in starts at 2 PM.",
    },
    {
      question: "Do you accept group bookings?",
      answer: "Yes, contact us for arrangements.",
    },
    {
      question: "Can I cancel my booking?",
      answer: "Yes, up to 24 hours before arrival.",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto py-16 px-5 md:px-10">
      <h2 className="text-3xl font-bold text-green-900 text-center mb-10">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <FAQItem key={idx} {...faq} />
        ))}
      </div>
    </section>
  );
}

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border rounded-lg p-4 cursor-pointer hover:bg-green-50 transition">
      <div
        className="flex justify-between items-center"
        onClick={() => setOpen(!open)}
      >
        <h4 className="font-semibold text-green-950">{question}</h4>
        <span className="text-green-900">{open ? "−" : "+"}</span>
      </div>
      {open && <p className="mt-2 text-gray-700">{answer}</p>}
    </div>
  );
}
