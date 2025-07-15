"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FaBed, FaWifi } from "react-icons/fa";
import { MdBathtub, MdLocationSearching } from "react-icons/md";
import FillButton from "./FillButton";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const zimbabweHolidays = [
  "01-01",
  "04-18",
  "05-01",
  "08-14",
  "08-15",
  "12-25",
  "11-20",
];

function isHoliday(date) {
  const formatted = date.toISOString().slice(5, 10);
  return zimbabweHolidays.includes(formatted);
}

function EditRoomDetails({
  id,
  name,
  price,
  imageUrl,
  description,
  image1,
  image2,
  image3,
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    surname: "",
    address: "",
    city: "",
    country: "",
    email: "",
    arrivaldate: "",
    deptdate: "",
    adultsNo: "",
    kidsNo: "",
  });
  const [difference, setDifference] = useState(null);
  const [total, setTotal] = useState("");
  const adjustedPrice = isHoliday(new Date())
    ? (parseFloat(price) + 50).toFixed(2)
    : price;

  useEffect(() => {
    const { arrivaldate, deptdate } = formData;
    if (arrivaldate && deptdate) {
      const d1 = new Date(arrivaldate);
      const d2 = new Date(deptdate);
      const diffTime = Math.abs(d2 - d1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDifference(diffDays);
      setTotal((diffDays * adjustedPrice).toFixed(2));
    }
  }, [formData, adjustedPrice]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      fullName,
      surname,
      address,
      city,
      country,
      email,
      arrivaldate,
      deptdate,
      adultsNo,
      kidsNo,
    } = formData;
    if (Object.values(formData).some((v) => !v))
      return toast.error("Fill all fields");
    if (+adultsNo + +kidsNo > 6) return toast.error("Only 6 guests allowed");

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, book: name, price, total }),
      });

      if (res.ok) {
        toast.success("Booking successful! Check your email.");
        setFormData({
          fullName: "",
          surname: "",
          address: "",
          city: "",
          country: "",
          email: "",
          arrivaldate: "",
          deptdate: "",
          adultsNo: "",
          kidsNo: "",
        });
        setDifference(null);
        setTotal("");
      } else {
        const { message } = await res.json();
        toast.error(message);
      }
    } catch (err) {
      toast.error("Server error. Try again later.");
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-5 py-16 bg-gradient-to-tr from-green-50 to-white">
      <div className="flex justify-between items-center mb-10 pt-24">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold text-green-900 tracking-tight">
            Experience True Comfort
          </h1>
          <p className="flex items-center gap-2 text-gray-700 mt-2">
            <MdLocationSearching size={22} className="text-red-600" /> Inyanga,
            Zimbabwe
          </p>
        </div>
        <Link
          href="/rooms"
          className="flex items-center gap-2 px-5 py-2 bg-green-900 text-white font-medium  shadow hover:bg-green-900 transition"
        >
          <ArrowBigLeft /> Back
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
          >
            {[imageUrl, image1, image2, image3].map((src, idx) => (
              <SwiperSlide key={idx}>
                <Image
                  src={src}
                  alt={`Room image ${idx}`}
                  width={800}
                  height={500}
                  className="rounded-xl shadow-lg w-full h-[450px] object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="bg-white rounded-2xl shadow-xl p-6 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-green-800">
                Room Overview
              </h2>
              <p className="text-green-600 font-medium mt-1">{name}</p>
              <p className="text-gray-700 mt-2 leading-relaxed text-sm">
                {description}
              </p>
              <div className="grid grid-cols-3 gap-4 mt-6">
                <span className="flex items-center gap-2 text-sm">
                  <FaBed className="text-green-700" /> 2 Beds
                </span>
                <span className="flex items-center gap-2 text-sm">
                  <MdBathtub className="text-green-700" /> 2 Baths
                </span>
                <span className="flex items-center gap-2 text-sm">
                  <FaWifi className="text-green-700" /> Free WiFi
                </span>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-green-900 text-lg mb-2">
                NOVU Resort Amenities
              </h3>
              <ul className="list-disc ml-5 space-y-1 text-sm text-gray-800">
                <li>
                  Apartment Features include a fully equipped kitchen,
                  gas/electric stove, gas geysers, lounge, dining area, and
                  fireplace.
                </li>
                <li>
                  Entertainment includes 72-inch TVs and DStv in lounges and
                  master bedrooms.
                </li>
                <li>Electricity Backup with a solar system and generator.</li>
                <li>High-Speed Wi-Fi available 24/7 and unlimited.</li>
                <li>
                  Gourmet Kitchens with high-end appliances and designer
                  finishes.
                </li>
                <li>
                  Smart Home Features include air conditioning in executive
                  rooms and resort-wide alarm security.
                </li>
                <li>Daily Housekeeping for cleanliness and comfort.</li>
                <li>
                  Event Centre for business and social events like weddings.
                </li>
                <li>24-hour Front Desk for continuous guest support.</li>
                <li>Swimming Pool for relaxation and social activities.</li>
                <li>Outdoor Spaces with gardens and green areas.</li>
                <li>Secure Parking available.</li>
                <li>Laundry Services upon request.</li>
                <li>
                  Private Outdoor Areas with a verandah, braai area, seating,
                  and a pool table near the pool.
                </li>
                <li>
                  Chef & Restaurant Services available upon request or for
                  guests who prefer not to self-cater.
                </li>
              </ul>
            </div>

            <div className="text-gray-600">
              <h3 className="font-bold text-green-900 text-lg mb-2">
                Inclusions
              </h3>
              <p className="text-sm">
                Accommodation 2-bedroom apartment comprising of master bedroom
                ensuite, a twin bedroom (2 single beds), and a convertible sofa
                couch in the lounge to house a total of six people. DSTV (TV in
                lounge and master bedroom) and WiFi, common bathroom with
                shower, generator for lights, TV, fridge & booster pump (it does
                not power equipment with elements). A braai area for each
                apartment, valuables safe and well-equipped kitchen with gas
                stove and oven, microwave, toaster, crockery, cutlery,
                glassware, pots & pans etc. Electric blanket in master bedroom
                when cold. Car cleaning and housekeeping services available.
                Additional bed available on request at cost.
              </p>
            </div>

            <div className="text-gray-600">
              <h3 className="font-bold text-green-900 text-lg mb-2">
                Check-In and Check-Out
              </h3>
              <ul className="list-disc ml-5 space-y-1 text-sm">
                <li>
                  Check-in time is from 14:00hrs until 20:00hrs (unless with
                  prior arrangements). Guests are required to present payment
                  upon check-in along with a valid form of personal ID.
                </li>
                <li>
                  Check-out is strictly at 10:00am. Late checkout attracts a fee
                  of $30/hour.
                </li>
              </ul>
            </div>

            <div className="text-gray-600">
              <h3 className="font-bold text-green-900 text-lg mb-2">
                Terms and Conditions
              </h3>
              <ul className="list-disc ml-5 space-y-1 text-sm">
                <li>
                  Smoking is prohibited in all rooms and the conference room.
                </li>
                <li>No loud music or shouting allowed within the rooms.</li>
                <li>
                  Switch off all lights, TV, and air conditioners (where
                  available) when exiting rooms.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="text-center mb-6">
            <Image
              src="https://5puqigze8f.ufs.sh/f/M8crfG3am8lfrPENUKmBK8DQxoItvOhfy4Fwj5PGce1Nqkul"
              alt="Logo"
              width={90}
              height={90}
              className="mx-auto rounded-full"
            />
            <p className="text-2xl font-bold text-green-800 mt-4">
              ${adjustedPrice}{" "}
              <span className="text-sm text-gray-500">/ night</span>
            </p>
            {isHoliday(new Date()) && (
              <p className="text-sm text-yellow-600 mt-1">
                Holiday Rate Applied
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: "Full Name", name: "fullName" },
              { label: "Surname", name: "surname" },
              { label: "Address", name: "address" },
              { label: "City", name: "city" },
              { label: "Country", name: "country" },
              { label: "Email", name: "email", type: "email" },
              {
                label: "Arrival Date",
                name: "arrivaldate",
                type: "datetime-local",
              },
              {
                label: "Departure Date",
                name: "deptdate",
                type: "datetime-local",
              },
              { label: "Adults", name: "adultsNo" },
              { label: "Children", name: "kidsNo" },
            ].map(({ label, name, type = "text" }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {label}
                </label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
            ))}

            {difference !== null && (
              <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded-lg text-green-800">
                <p className="font-semibold text-sm">
                  Total: <span className="text-lg">${total}</span> for{" "}
                  {difference} night(s)
                </p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800 transition text-white font-semibold py-2 rounded-lg shadow-lg"
            >
              Confirm Booking
            </button>
            <ToastContainer />
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditRoomDetails;
