"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import emailjs from "@emailjs/browser";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [submitting, setSubmitting] = useState(false);

  // Remove TypeScript type declaration for form
  const form = useRef(null);

  const sendEmail = (e) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm("service_fh9gnqf", "template_pfws2qh", form.current, {
          publicKey: "NKEqxewRiSKRnxvh6",
        })
        .then(
          () => {
            toast.success("Email sent successfully");
            setName("");
            setEmail("");
            setMessage("");
          },
          (error) => {
            toast.error("FAILED...", error.text);
          }
        );
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 pb-10">
      <div className="h-full py-8 my-8 w-full flex justify-center items-center text-green-950 p-5 md:px-10">
        <form
          ref={form}
          onSubmit={sendEmail}
          className="h-full w-full p-8 border border-green-900"
        >
          <p className="font-bold text-xl text-center py-2">Leave a Message</p>
          <div className="flex flex-col mt-6 gap-4">
            <div className="grid grid-cols-4 gap-4">
              <p className="font-bold text-sm col-span-1">Name</p>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-300 py-2 px-4 w-full outline-none border-none col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              <p className="font-bold text-sm col-span-1">Email</p>
              <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-300 py-2 px-4 w-full outline-none border-none col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              <p className="font-bold text-sm col-span-1">Message</p>
              <textarea
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                className="bg-gray-300 py-2 px-4 w-full outline-none border-none col-span-3"
              ></textarea>
            </div>
            <div className="flex items-end z-50">
              <div className="border py-[px] border-green-950 w-24 text-center -z-10">
                <button
                  type="submit"
                  className="text-sm py-2 w-24 relative px-4 bg-transparent text-gray-900 transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-green-950 before:transition-all before:duration-300 before:content-[''] hover:text-white hover:before:scale-x-100"
                >
                  Send
                </button>

                <ToastContainer />
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="flex flex-col items-center justify-center py-16">
        <Image
          src={"/IMG-20231122-WA0060.jpg"}
          alt="NYANGA RESORT CONTACT"
          height={500}
          width={400}
          className="w-96 md:w-[500px]"
        />
        <p className="py-4 text-start text-black w-96 md:w-[500px]">
          {`Any questions pertaining to the resort would be appreciated along with
          any queries and comments. We look forward to hearing from you. After
          all, it's your input that makes our little paradise possible.`}
        </p>
      </div>
    </div>
  );
}

export default Contact;
