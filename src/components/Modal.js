"use client";

import Link from "next/link";
import React from "react";

const Modal = ({ modalOpen, setModalOpen, children }) => {
  return (
    <div className={`modal ${modalOpen ? "modal-open" : ""} `}>
      <div className="modal-box relative max-w-4xl text-gray-900 ">
        <label
          onClick={() => setModalOpen(false)}
          className="btn btn-sm btn-circle absolute right-2 top-2"
        >
          x
        </label>
        <h3 className="text-lg md:text-3xl font-bold text-amber-700 py-4">
          CFK NYA Resorts Accomodation Booking Form
        </h3>
        <hr className="py-2 bg-amber-100" />
        <div className="grid grid-cols-2 md:flex gap-4 py-4 font-semibold">
          <Link
            href={""}
            className="w-[50%] hover:bg-amber-600 py-2 hover:text-white"
          >
            OVERVIEW
          </Link>
          <Link
            href={""}
            className="w-[50%] hover:bg-amber-600 py-2 hover:text-white"
          >
            BOOING CONDITIONS
          </Link>
        </div>
        <hr className="pb-2 bg-gray-50" />
        {children}
      </div>
    </div>
  );
};

export default Modal;
