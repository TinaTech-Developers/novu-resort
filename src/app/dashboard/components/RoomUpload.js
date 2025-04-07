import React, { useState, useRef } from "react";

import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UploadDropzone, Uploader } from "../../../app/lib/uploadthing";
import { FileText, Pencil, Plus } from "lucide-react";
import FillButton from "@/components/FillButton";

function RoomUpload() {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [roomType, setRoomType] = useState("");
  const inputRef = useRef(null);
  const router = useRouter();

  async function onSubmit(data) {
    data.productImageUrl = imageUrl;
    data.pdfUrl = pdfUrl;
    console.log(data);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !imageUrl || !description || !roomType || !price) {
      alert("You are supposed to fill all the fields.");
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/api/rooms", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name, imageUrl, description, price, roomType }),
      });
      if (res.ok) {
        toast.success("Room created");
        onClick();
      } else {
        toast.error("Unable to create a room");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid md:flex gap-10 mx-4 mt-10 pb-20">
      <div className="border border-gray-500 mt-5 pb-14 w-[50%] h-[22rem]  bg-blue-200 p-10">
        <div className="col-span-full h-[22rem]">
          <div className="flex justify-between items-center mb-4  ">
            <label
              htmlFor="course-image"
              className=" text-sm font-medium text-gray-900"
            >
              <h1 className="px-auto"> Room Image</h1>
            </label>
            {imageUrl && (
              <button
                onClick={() => setImageUrl("")}
                type="button"
                className="flex space-x-2  bg-slate-900 rounded-md shadow text-slate-50 py-2 px-4"
              >
                <Pencil className="w-5 h-5" />
                <span>Change Image</span>
              </button>
            )}
          </div>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="Product image"
              width={1000}
              height={667}
              className="w-full h-64 object-cover"
            />
          ) : (
            <UploadDropzone
              value={imageUrl}
              ref={inputRef}
              onChange={(e) => setImageUrl(e.target.value)}
              endpoint="productImage"
              onClientUploadComplete={(res) => {
                setImageUrl(res[0].url);
                console.log("Files: ", res);
                alert("Upload Completed");
              }}
              onUploadError={(error) => {
                alert(`ERROR! ${error.message}`);
              }}
              className="h-[15rem] "
            />
          )}
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className=" flex flex-col w-[63%] h-[26rem] "
      >
        <div className="grid grid-cols-5 w- gap-4 pt-4">
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            name="title"
            placeholder="Room title"
            className="col-span-5 outline-none border  p-2   text-gray-700"
          />
        </div>
        <div className="grid grid-cols-5 gap-4 py-2">
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="image link"
            type="text"
            name="image link"
            className="col-span-5 outline-none border   text-gray-700 p-2"
          />
        </div>
        <div className="grid grid-cols-5 gap-4 py-2">
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="price"
            type="text"
            name="image link"
            className="col-span-5 outline-none border   text-gray-700 p-2"
          />
        </div>
        <div className="py-2">
          <select
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            id="rooms"
            className="w-full p-2 outline-none bg-gray-100"
          >
            <option></option>
            <option value={"Single"}>Single</option>
            <option value={"Double"}>Double</option>
          </select>
          {/* <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Rooty"
            type="text"
            name="image link"
            className="col-span-5 outline-none border   text-gray-700 p-2"
          /> */}
        </div>
        <div className="grid grid-cols-5 gap-4  pb-5">
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            placeholder="description"
            rows={5}
            className=" py-2 px-4  w-lg outline-none  border text-gray-700 col-span-5"
            name="description"
          ></textarea>
        </div>
        <button className=" flex items-end justify-end z-20">
          <FillButton name={"Save"} link={""} onClick={handleSubmit} />
        </button>
        <ToastContainer />
      </form>
    </div>
  );
}

export default RoomUpload;
