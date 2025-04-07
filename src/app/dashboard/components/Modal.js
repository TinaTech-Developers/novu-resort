"use client";
import React from "react";

const Modal = ({ modalOpen, setModalOpen, children }) => {
  return (
    <div className={`modal ${modalOpen ? "modal-open" : ""} `}>
      <div className="modal-box relative  text-gray-900 ">
        <label
          onClick={() => setModalOpen(false)}
          className="btn btn-sm btn-circle absolute right-2 top-2"
        >
          x
        </label>
        <h3 className="text-lg md:text-xl font-bold text-amber-700 py-4">
          Add New Expenditure
        </h3>

        {children}
      </div>
    </div>
  );
};

export default Modal;
