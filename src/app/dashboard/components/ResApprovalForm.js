"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
import DashbordLayout from "./DashbordLayout";
import FillButton from "@/components/FillButton";

function ResApprovalForm({
  id,
  surname,
  message,
  email,
  arrivaldate,
  deptdate,
  total,
}) {
  const [newName, setNewName] = useState(surname);
  const [newEmail, setNewEmail] = useState(email);
  const [newMessage, setNewMessage] = useState(message);
  const [newArrivalDate, setNewArrivalDate] = useState(arrivaldate);
  const [newDeptDate, setNewDeptDate] = useState(deptdate);
  const [newTotal, setNewTotal] = useState(total);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!surname || !email || !total || !arrivaldate || !deptdate) {
      alert("Fill all fields");
      return;
    }
    try {
      const res = await fetch("/api/approved", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          surname,
          email,
          arrivaldate,
          deptdate,
          total,
        }),
      });
      if (res.ok) {
        onClick();
      }
    } catch (error) {
      console.log("Error ");
    }
  };

  const onClick = () => {
    toast("Order Successfully Approved!!!", {
      type: "success",
      position: toast.POSITION.TOP_CENTER,
    });
  };

  return (
    <DashbordLayout>
      <div className=" flex-col w-full h-full">
        <Header />
        <div className=" flex-col items-center justify-center w-full mt-20 text-gray-800">
          <form className="w-2/5 border mx-auto mt-10 shadow-lg rounded-3xl">
            <h1 className="text-center p-10 font-semibold text-medium">
              Order No. <span className="font-medium">{id}</span>
            </h1>
            <hr className="w-full mx-auto py-2 -mt-8" />
            <div className="w-full h-full">
              <div className="grid grid-cols-4 gap-4 py-4 mx-10">
                <label className="col-span-1 font-semibold py-2">Name</label>
                <input
                  value={surname}
                  type="text"
                  name="name"
                  className="col-span-3 text-gray-500 outline-none bg-white border border-gray-300 rounded-lg p-2"
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 gap-4 py-4 mx-10">
                <label className="col-span-1 font-semibold py-2">Email</label>
                <input
                  value={email}
                  type="text"
                  name="name"
                  className="col-span-3 text-gray-500 outline-none  bg-white border border-gray-300 rounded-lg p-2"
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </div>{" "}
              <div className="grid grid-cols-4 gap-4 py-4 mx-10">
                <label className="col-span-1 font-semibold py-2">Amount</label>
                <input
                  value={total}
                  type="text"
                  name="name"
                  className="col-span-3 text-gray-500 outline-none font-semibold   bg-white border border-gray-300 rounded-lg p-2"
                  onChange={(e) => setNewTotal(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 gap-4 py-4 mx-10">
                <label className="col-span-1 font-semibold py-2">Period</label>
                <input
                  value={arrivaldate + " - " + deptdate}
                  type="text"
                  name="name"
                  className="col-span-3 text-gray-500 outline-none  bg-white border border-gray-300 rounded-lg p-2"
                  onChange={(e) => setNewArrivalDate(e.target.value)}
                />
              </div>
            </div>
            <div className=" flex items-center justify-between p-10">
              <FillButton
                name={"Email"}
                link={"javascript:void(0)"}
                onClick={() => (window.location = `mailto:${email}`)}
              />
              <FillButton name={"Approve"} link={""} onClick={handleSubmit} />
            </div>
            <ToastContainer />
          </form>
        </div>
      </div>
    </DashbordLayout>
  );
}

export default ResApprovalForm;
