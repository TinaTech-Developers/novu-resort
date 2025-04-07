"use client";
import React, { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdEdit, MdOutlineDeleteForever } from "react-icons/md";
import { UploadDropzone, Uploader } from "../../../app/lib/uploadthing";
import { FileText, Pencil, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function FileUpload() {
  const [projectName, setProjectName] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const inputRef = useRef(null);
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();

  async function onSubmit(data) {
    data.productImageUrl = imageUrl;
    data.pdfUrl = pdfUrl;
    console.log(data);
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!projectName || !company || !description) {
  //     alert("You are supposed to fill all the fields.");
  //     return;
  //   }
  //   try {
  //     const res = await fetch("http://localhost:3000/api/gallery-upload", {
  //       method: "POST",
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         projectName,
  //         company,
  //         description,
  //         imageUrl,
  //       }),
  //     });
  //     if (res.ok) {
  //       toast.success("Gallery created");
  //       // onClick();
  //       router.refresh();
  //     } else {
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div>
      <h1 className="text-xl font-semibold px-14 pt-10">
        Add New Image to Gallery
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 px-4 mx-10 ">
        <div className="flex justify-center items-center mx-auto">
          <div className="border border-gray-500 mt-5 pb-14 w-[50%] h-[22rem]  bg-blue-200 p-10">
            <div className="col-span-full h-[22rem]">
              <div className="flex justify-between items-center mb-4  ">
                <label
                  htmlFor="course-image"
                  className=" text-sm font-medium text-gray-900"
                >
                  <h1 className="px-auto"> Image</h1>
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
            // onSubmit={handleSubmit}
            className=" flex flex-col w-[45rem] h-[100%] px-10 "
          >
            <div className="grid grid-cols-5 w- gap-4 pt-4">
              <input
                onChange={(e) => setProjectName(e.target.value)}
                value={projectName}
                type="text"
                name="title"
                placeholder="Project title"
                className="col-span-5 outline-none border  p-2   text-gray-700"
              />
            </div>
            <div className="grid grid-cols-5 gap-4 py-2">
              <input
                onChange={(e) => setCompany(e.target.value)}
                value={company}
                type="text"
                name="company"
                placeholder="Company"
                className="col-span-5 outline-none border text-gray-700 p-2"
              />
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

            <input
              value={imageUrl}
              placeholder="image link"
              onChange={(e) => setImageUrl(e.target.value)}
              className="col-span-5 outline-none border text-gray-700 p-2"
            />
            <button
              className=" flex items-end justify-end z-20 py-10"
              onClick={() => router.push("/dashboard/gallery")}
            >
              {/* <FillButton name={"Save"} link={""} onClick={handleSubmit} /> */}
            </button>

            <ToastContainer />
          </form>
        </div>
      </div>
    </div>
  );
}
