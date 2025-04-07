import Image from "next/image";
import React from "react";
// import FillButton from "./FillButton";

function Contact() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="col-span-1 border m-16  flex flex-col items-center justify-center py-16">
        <h1 className="text-3xl">Contact</h1>
        <div className="">
          <div className="flex flex-col items-start p-2">
            <label className="text-gray-500">Name</label>
            <input
              type="text"
              name="name"
              className="peer h-full w-96 border-b border-blue-gray-600 bg-transparent pt-2 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            />
          </div>
          <div className="flex flex-col items-start p-2">
            <label className="text-gray-500">Phone</label>
            <input
              type="text"
              name="phone"
              className="peer h-full w-96 border-b border-blue-gray-600 bg-transparent pt-2 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            />
          </div>
          <div className="flex flex-col items-start p-2">
            <label className="text-gray-500">Email</label>
            <input
              type="text"
              name="email"
              className="peer h-full w-96 border-b border-blue-gray-600 bg-transparent pt-2 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            />
          </div>
          <div class="flex flex-col items-start p-2">
            <textarea
              placeholder="Message"
              class="peer h-full min-h-[100px] w-96 resize-none border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
            ></textarea>
            <label class="after:content[' '] pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none text-sm font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-900 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Static
            </label>
          </div>
          <div className="flex flex-col items-end px-2">
            {/* <FillButton name={"Submit"} link={""} /> */}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center py-16">
        <Image
          src={"/IMG-20231122-WA0060.jpg"}
          alt="NYANGA RESORT CONTACT"
          height={500}
          width={400}
          className=" w-96 md:w-[500px]"
        />
        <p className=" py-4 text-start w-96 md:w-[500px]">
          Any questions partaining the resort would be appreciated along with
          any quries and comments. We look forwrd to hearing from you, after all
          its your input that makes our little paradise possible.
        </p>
      </div>
    </div>
  );
}

export default Contact;
