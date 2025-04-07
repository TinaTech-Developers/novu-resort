"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashbordLayout from "./DashbordLayout";
import FillButton from "@/components/FillButton";
import Header from "./Header";

function OrderApprovalForm({
  id,
  fullname,
  email,
  period,
  newName,
  payment,
  newPrice,
}) {
  const [name, setName] = useState(fullname);
  const [newEmail, setNewEmail] = useState(email);
  const [newPeriod, setNewPeriod] = useState(period);
  const [newRoomName, setNewRoomName] = useState(newName);
  const [newPayment, setNewPayment] = useState(payment);
  const [newRoomPrice, setNewRoomPrice] = useState(newPrice);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullname || !email || !period || !newName || !newPrice) {
      alert("Fill all fields");
      return;
    }
    try {
      const res = await fetch("/api/approvedOrders", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          fullname,
          email,
          period,
          newName,
          payment,
          newPrice,
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
      <div className=" flex-col w-full">
        <Header />
        <div className=" flex-col items-center justify-center w-full">
          <form className="w-2/5 border mx-auto mt-10">
            <h1 className="text-center p-10 font-semibold text-medium">
              Order No. <span className="font-medium">{id}</span>
            </h1>
            <hr className="w-64 mx-auto py-2 -mt-8" />
            <div className="w-full h-full">
              <div className="grid grid-cols-4 gap-4 py-4 mx-10">
                <label className="col-span-1 font-semibold">Name :</label>
                <input
                  value={fullname}
                  type="text"
                  name="name"
                  className="col-span-3 text-gray-500"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 gap-4 py-4 mx-10">
                <label className="col-span-1 font-semibold">Email :</label>
                <input
                  value={email}
                  type="text"
                  name="name"
                  className="col-span-3 text-gray-500"
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </div>{" "}
              <div className="grid grid-cols-4 gap-4 py-4 mx-10">
                <label className="col-span-1 font-semibold">Period :</label>
                <input
                  value={period}
                  type="text"
                  name="name"
                  className="col-span-3 text-gray-500"
                  onChange={(e) => setNewPeriod(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 gap-4 py-4 mx-10">
                <label className="col-span-1 font-semibold">Room Type :</label>
                <input
                  value={newName}
                  type="text"
                  name="name"
                  className="col-span-3 text-gray-500"
                  onChange={(e) => setNewRoomName(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 gap-4 py-4 mx-10">
                <label className="col-span-1 font-semibold">Cost :</label>
                <input
                  value={newPrice}
                  type="text"
                  name="name"
                  className="col-span-3 text-gray-500"
                  onChange={(e) => setNewRoomPrice(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 gap-4 py-4 mx-10">
                <label className="col-span-1 font-semibold">
                  Payment Method :
                </label>
                <input
                  value={payment}
                  type="text"
                  name="name"
                  className="col-span-3 text-gray-500"
                  onChange={(e) => setNewPayment(e.target.value)}
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

export default OrderApprovalForm;
