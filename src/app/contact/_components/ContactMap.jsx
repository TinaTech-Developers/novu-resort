"use client";
import React from "react";

export function ContactMap() {
  return (
    <section className="max-w-7xl mx-auto py-16 px-5 md:px-10">
      <h2 className="text-3xl font-bold text-green-900 text-center mb-10">
        Our Location
      </h2>
      <div className="w-full h-96 rounded-2xl overflow-hidden shadow-lg">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30318.651788361305!2d32.716991268159205!3d-18.21766660033422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x192c160d9f2bb9ef%3A0xba228e0d80b4f7f4!2sNyanga!5e0!3m2!1sen!2szw!4v1728331874497!5m2!1sen!2szw"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
}
