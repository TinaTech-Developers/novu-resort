import React from "react";
import Link from "next/link";
function FillButton({ name, link, onClick }) {
  return (
    <Link
      type="submit"
      onClick={onClick}
      href={link}
      className=" border relative py-2 px-6 z-20 bg-transparent text-gray-600 transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-green-900 before:transition-transform before:duration-300 before:content-[''] hover:text-white before:hover:scale-x-100"
    >
      {name}
    </Link>
  );
}

export default FillButton;
