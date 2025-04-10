"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FaBed, FaWifi } from "react-icons/fa";
import { MdBathtub, MdLocationSearching } from "react-icons/md";
import FillButton from "./FillButton";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// Example list of Zimbabwean public holidays (you can update this or fetch from an API)
const zimbabweHolidays = [
  "01-01", // New Year's Day
  "04-18", // Independence Day
  "05-01", // Labour Day
  "08-14", // Heroes Day
  "08-15", // Unity Day
  "12-25", // Christmas Day
  "11-20", // test date
];

// Helper function to check if today is a holiday
function isHoliday(date) {
  const formattedDate = date.toISOString().split("T")[0]; // Format as 'YYYY-MM-DD'
  return zimbabweHolidays.includes(formattedDate);
}

function EditRoomDetails({
  id,
  name,

  price,
  imageUrl,
  description,
  priceNumber,
  image1,
  image2,
  image3,
}) {
  // const API_BASE_URL =
  //   process.env.API_BASE_URL ||
  //   "http://localhost:3000" ||
  //   "www.cfknyaresort.co.zw";

  // const [newName, setNewName] = useState(name);
  const [newPrice, setNewPrice] = useState(price);
  const [newImage, setNewImage] = useState(imageUrl);
  const [newDescription, setNewDescription] = useState(description);

  const [book, setBook] = useState(name);
  const [fullName, setFullName] = useState("");
  const [surname, setSurname] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [arrivaldate, setArrivaldate] = useState();
  const [deptdate, setDeptdate] = useState();
  const [adultsNo, setAdultsNo] = useState("");
  const [kidsNo, setKidsNo] = useState("");
  const [difference, setDifference] = useState(null);
  let [total, setTotal] = useState("");

  const [onHoliday, setOnHoliday] = useState(false);
  const [error, setError] = useState(null);

  const calculateAdjustedPrice = (price) => {
    const today = new Date();
    let adjustedPrice = parseFloat(price); // Convert string price to float

    if (isHoliday(today)) {
      adjustedPrice += 50; // Add 50 to the price if today is a holiday
    }

    return adjustedPrice.toFixed(2); // Return the adjusted price, rounded to 2 decimal places
  };

  if (error) {
    return <div>{error}</div>;
  }
  const adjustedPrice = calculateAdjustedPrice(price);

  const reset = async () => {
    setFullName("");
    setSurname("");
    setAddress("");
    setCity("");
    setCountry("");
    setEmail("");
    setArrivaldate("");
    setDeptdate("");
    setAdultsNo("");
    setKidsNo("");
    setDifference(null);
    setTotal("");
  };

  const handleBook = async (e) => {
    e.preventDefault();

    if (
      !fullName ||
      !surname ||
      !address ||
      !city ||
      !country ||
      !email ||
      !arrivaldate ||
      !deptdate ||
      !kidsNo ||
      !adultsNo ||
      !book
    ) {
      toast.error("Fill all fields");
      return;
    }
    if (Number(kidsNo) + Number(adultsNo) > 6) {
      toast.error("Our Apartments only accomodate 6 people or less");
      return;
    }

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          surname,
          address,
          city,
          country,
          email,
          arrivaldate,
          deptdate,
          kidsNo,
          adultsNo,
          book,
          price,
          total,
        }),
      });

      if (res.ok) {
        toast.success(
          "Your Booking Was Successful, We will respond to your email"
        );
        reset();
        calculateDifference();
      } else {
        const { message } = await res.json();
        toast.error(message);
      }
    } catch (error) {
      console.log("Error ", error);
    }
  };

  /* eslint-disable react-hooks/rules-of-hooks */
  useEffect(() => {
    if (arrivaldate && deptdate) {
      const d1 = new Date(arrivaldate);
      const d2 = new Date(deptdate);
      const diffTime = Math.abs(d2 - d1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDifference(diffDays);
    } else {
      setDifference(null); // Reset difference if dates are not valid
    }
  }, [arrivaldate, deptdate]); // Dependency array to run effect when dates change

  console.log(difference);

  return (
    <div className="md:mt-36 py-5 mt-28 p-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-green-950">
            Laxury Room
          </h1>
          <p className="flex items-center gap-5 text-gray-600">
            <MdLocationSearching size={28} color="red" />
            Inyanga, Zimbabwe
          </p>
        </div>
        <Link
          href={"/rooms"}
          className="flex items-center justify-center gap-1 border px-3 py-2 bg-green-900 text-white"
        >
          <ArrowBigLeft />
          Back
        </Link>
      </div>
      <hr className="w-[100%] px-4 mx-auto my-4" />
      <div className=" w-[100%] grid grid-cols-1 md:grid-cols-5 mt-5 mx-auto px-5">
        <div className="col-span-1 md:col-span-3 border left-0">
          <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
          >
            <SwiperSlide>
              <Image
                src={imageUrl}
                alt="room image"
                height={400}
                width={400}
                className="h-[30rem] w-full object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={image1}
                alt="room image"
                height={400}
                width={400}
                className="h-[30rem] w-full object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={image2}
                alt="room image"
                height={400}
                width={400}
                className="h-[30rem] w-full object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={image3}
                alt="room image"
                height={400}
                width={400}
                className="h-[30rem] w-full object-cover"
              />
            </SwiperSlide>
          </Swiper>

          <div className="bg-black h-44 w-full -mt-2">
            <Image
              src={imageUrl}
              alt=""
              height={200}
              width={200}
              className="h-44 w-44 object-cover p-2 mt-2"
            />
          </div>
          <div className="border p-5 ">
            <h1 className="text-2xl font-semibold uppercase text-green-950">
              Room description
            </h1>
            <p className="text-green-700">{name}</p>
            <p className="text-gray-800 font-normal">{description}</p>
            <hr className="my-4" />
            <div className="font-normal text-gray-800">
              <h2 className="text-xl font-normal">About room</h2>

              <div className="grid grid-cols-3 mt-5">
                <div className="col-span-1 flex items-center justify-start gap-1">
                  <FaBed /> 2 Bed
                </div>
                <div className="col-span-1 flex items-center justify-start gap-1">
                  <MdBathtub /> 2 Bath
                </div>
                <div className="flex items-center justify-start gap-1">
                  <FaWifi /> Free WiFi
                </div>
              </div>
            </div>
            <hr className="my-4" />

            <div className="text-sm font-normal text-gray-800">
              <h1 className="my-4 font-bold ">Notes</h1>
              <div className="text-sm">
                <h2 className="font-semibold">Inclusions</h2>
                <p className="text-xs">
                  {
                    "  Accommodation 2-bedroom apartment comprising of master bedroom ensuite, a twin bedroom (2 single beds) and a convertible sofa couch in the lounge to house a total of six people. DSTV (TV in lounge and Master bedroom) and WiFi, common bathroom with shower, generator for lights, TV, fridge & booster pump (it does not power equipment with elements). A braai area for each apartment, valuables safe and well-equipped kitchen with gas stove and oven, microwave, toaster, crockery, cutlery, glassware, pots & pans etc. Electric blanket in master bedroom when cold. Car cleaning and housekeeping services available. Additional bed available on request at cost."
                  }
                </p>
              </div>

              <div className="mt-4">
                <h2 className="font-semibold">Checking In and Checking Out:</h2>
                <li className="text-xs">
                  {
                    " Check-in time is from 1400hrs until 2000hrs (unless with prior arrangements). Guests are required to present payment upon check-in along with a valid form and personal identity document."
                  }
                </li>
                <li className="text-xs">
                  {
                    "Check-out is strictly at 10am. (Late checkout will attract a fee of $30 per hour). "
                  }
                </li>
              </div>
              <div className="mt-4">
                <h2 className="font-semibold">Terms and Conditions </h2>
                <li className="text-xs">
                  {
                    " Smoking is prohibited in all rooms and the conference room."
                  }
                </li>
                <li className="text-xs">
                  {"No loud music or shouting allowed within the rooms."}
                </li>
                {/* <li className="text-xs">
                  {
                    " No phone calls / loud social media video streams. (Please respect other guests) "
                  }
                </li> */}
                <li className="text-xs">
                  {
                    "Switch off all lights, TV and air conditioners (where available) when exiting rooms"
                  }
                </li>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify- items-center gap-4 mt-10 md:mt-0 col-span-2 h-full w-full md:mx-5 border mx-auto p-5 ">
          <Image
            src={"/logo.jpeg"}
            alt="Novu Resort"
            height={100}
            width={200}
            className="h-44 w-44 object-cover"
          />

          <FillButton name={"Whatsapp Us"} link={""} onClick={""} />

          <p className="text-green-600 text-start">
            Complete this form for booking...
          </p>
          {isHoliday ? <p>${adjustedPrice} per night</p> : <p>{price}</p>}

          <form onSubmit={handleBook}>
            <div className="w-full gap-2 mb-4">
              <div className="fex flex-wrap md:grid md:grid-cols-2 gap-2">
                <div className="col-span-1 py-1">
                  <label className="font-semibold">
                    Name<span className="text-red-700">*</span>
                  </label>
                  <input
                    placeholder="Fullname"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="input input-bordered w-full bg-gray-300 text-black"
                  />
                </div>
                <div className="col-span-1 py-1">
                  <label className="font-semibold">
                    Surname<span className="text-red-700">*</span>
                  </label>
                  <input
                    placeholder="surname"
                    type="text"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    className="input input-bordered w-full bg-gray-300 text-black"
                  />
                </div>
              </div>
              <div className="col-span-1 py-1">
                <label className="font-semibold">
                  Address<span className="text-red-700">*</span>
                </label>
                <input
                  placeholder="Address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="input input-bordered w-full bg-gray-300 text-black"
                />
              </div>
              <div className="fex flex-wrap md:grid md:grid-cols-2 gap-2">
                <div className="col-span-1 py-1">
                  <label className="font-semibold">
                    City<span className="text-red-700">*</span>
                  </label>
                  <input
                    placeholder="City"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="input input-bordered w-full bg-gray-300 text-black"
                  />
                </div>
                <div className="col-span-1 py-1">
                  <label className="font-semibold">
                    Country<span className="text-red-700">*</span>
                  </label>
                  <input
                    placeholder="Country"
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="input input-bordered w-full bg-gray-300 text-black"
                  />
                </div>
              </div>
              <div className="col-span-1 py-1">
                <label className="font-semibold">
                  Email<span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input input-bordered w-full bg-gray-300 text-black"
                />
              </div>
              <div className="fex flex-wrap md:grid md:grid-cols-2 gap-2">
                <div className="col-span-1 py-1">
                  <label className="font-semibold">
                    Arrival Date<span className="text-red-700">*</span>
                  </label>
                  <input
                    value={arrivaldate}
                    onChange={(e) => setArrivaldate(e.target.value)}
                    type="datetime-local"
                    name="arrivaldate"
                    className="input input-bordered w-full bg-gray-300 text-black"
                  />
                </div>
                <div className="col-span-1 py-1">
                  <label className="font-semibold">
                    Departure Date<span className="text-red-700">*</span>
                  </label>
                  <input
                    value={deptdate}
                    onChange={(e) => setDeptdate(e.target.value)}
                    type="datetime-local"
                    name="deptdate"
                    className="input input-bordered w-full bg-gray-300 text-black"
                  />
                </div>
              </div>
              <div className="fex flex-wrap md:grid md:grid-cols-2 gap-2">
                <div className="col-span-1 py-1">
                  <label className="font-semibold">
                    Number of Adults<span className="text-red-700">*</span>
                  </label>
                  <input
                    value={adultsNo}
                    onChange={(e) => setAdultsNo(e.target.value)}
                    type="text"
                    name="adults"
                    className="input input-bordered w-full bg-gray-300 text-black"
                  />
                </div>
                <div className="col-span-1 py-1">
                  <label className="font-semibold">
                    Number of children
                    <span className="text-red-700">*</span>
                  </label>
                  <input
                    value={kidsNo}
                    onChange={(e) => setKidsNo(e.target.value)}
                    type="text"
                    name="kids"
                    className="input input-bordered w-full bg-gray-300 text-black"
                  />
                </div>
              </div>
            </div>

            {difference !== null && (
              <p className="font-semibold">US${difference * adjustedPrice}</p>
            )}
            <p className="font-semibold">
              US${(total = difference * adjustedPrice)} per {difference} Days
            </p>
            <input value={total} onChange={(e) => setTotal(e.target.value)} />

            <button
              onClick={handleBook}
              type="submit"
              className=" border relative py-2 px-6  bg-transparent text-gray-700 transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-orange-700 before:transition-transform before:duration-300 before:content-[''] hover:text-white before:hover:scale-x-100"
            >
              SUBMIT FORM
            </button>
            <ToastContainer />
          </form>
          <p className="text-center text-sm font-normal text-gray-600 ">
            {
              "By submitting this booking, you agree to the Novu Resort Terms & Conditions' "
            }
            <span className="text-red-700">Terms & Conditions</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default EditRoomDetails;
