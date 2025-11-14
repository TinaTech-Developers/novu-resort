"use client";

import { CartProvider } from "../context/CartContext";

export default function DiningLayout({ children }) {
  return <CartProvider>{children}</CartProvider>;
}
