"use client";
import React from "react";
import Link from "next/link";
import { FaSquareWhatsapp, FaXTwitter } from "react-icons/fa6";
import { IoLogoFacebook } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";
import { SlArrowRight } from "react-icons/sl";

export default function Footer() {
  const quickLinks = [
    { label: "About Us", href: "/" },
    { label: "Terms & Conditions", href: "/" },
    { label: "Gallery", href: "/" },
    { label: "Activities", href: "/" },
    { label: "Contact Us", href: "/" },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-green-950 to-gray-900 text-white">
      {/* Decorative background layer */}
      <div className="absolute inset-0 opacity-20 bg-[url('/footer-bg.jpg')] bg-cover bg-center"></div>

      <div className="relative max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Resort Logo & Intro */}
        <div>
          <h2 className="text-2xl font-bold text-green-400 mb-3">
            Novu Resort
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Nestled in the heart of Nyanga’s lush mountains, Novu Resort offers
            a peaceful escape surrounded by breathtaking nature and timeless
            luxury. Relax, reconnect, and rediscover serenity.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-green-400">Explore</h3>
          <ul className="space-y-3 text-gray-300">
            {quickLinks.map((link, idx) => (
              <li key={idx}>
                <Link
                  href={link.href}
                  className="flex items-center gap-2 hover:text-green-400 transition"
                >
                  <SlArrowRight size={13} />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-green-400">Contact</h3>
          <div className="space-y-2 text-gray-300">
            <p>📍 Nyanga, Zimbabwe</p>
            <p>📞 +263 77 224 1125</p>
            <p>📞 +263 77 214 6008</p>
            <p>✉️ novuresort@gmail.com</p>
          </div>
        </div>

        {/* Social & Updates */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-green-400">
            Connect With Us
          </h3>
          <p className="text-gray-300 text-sm mb-4">
            Stay updated with our latest offers and events.
          </p>
          <div className="flex gap-4 mb-5">
            <Link href="/" className="hover:text-green-500 transition">
              <FaSquareWhatsapp size={24} />
            </Link>
            <Link href="/" className="hover:text-blue-500 transition">
              <IoLogoFacebook size={24} />
            </Link>
            <Link href="/" className="hover:text-blue-400 transition">
              <FaLinkedin size={24} />
            </Link>
            <Link href="/" className="hover:text-gray-300 transition">
              <FaXTwitter size={24} />
            </Link>
          </div>
          <form className="flex bg-white/10 rounded-lg overflow-hidden border border-gray-700">
            <input
              type="email"
              placeholder="Your email"
              className="bg-transparent px-3 py-2 text-sm w-full outline-none placeholder-gray-400"
            />
            <button
              type="submit"
              className="bg-green-600 px-4 text-sm hover:bg-green-700 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-gray-700 mt-10 py-4 text-center text-gray-400 text-sm">
        <p>
          © {new Date().getFullYear()} Novu Resort. All rights reserved. <br />
          Crafted by{" "}
          <Link
            href="https://tinasoftnexus.co.zw"
            target="_blank"
            className="text-green-400 hover:text-green-300 transition"
          >
            TinaSoft Nexus
          </Link>
        </p>
      </div>
    </footer>
  );
}
