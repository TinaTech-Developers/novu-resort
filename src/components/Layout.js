import React from "react";
import Navbar from "./navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="bg-white">{children}</main>
      <Footer />
    </>
  );
}
