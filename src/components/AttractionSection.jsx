"use client";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState } from "react";
import {
  Mountain,
  Landmark,
  Building2,
  TentTree,
  Trees,
  Church,
  Bike,
} from "lucide-react";

import { motion } from "framer-motion";

const places = [
  {
    name: "World’s View",
    distance: "11km",
    type: "nature",
    coords: [-18.262, 32.759],
  },
  {
    name: "Rhodes Museum Visit",
    distance: "19km",
    type: "historical",
    coords: [-18.281, 32.791],
  },
  {
    name: "Quad Biking & Paint Ball",
    distance: "8km",
    type: "adventure",
    coords: [-18.2605, 32.752],
  },
  {
    name: "Nyangani Mountain",
    distance: "",
    type: "nature",
    coords: [-18.321, 32.853],
  },
  {
    name: "Mtarazi Falls",
    distance: "75km",
    type: "nature",
    coords: [-18.451, 32.818],
  },
  {
    name: "Golf Course & Outdoor Games",
    distance: "2.5km",
    type: "family",
    coords: [-18.259, 32.755],
  },
  {
    name: "Nyamoro Dairy Tea Garden",
    distance: "20km",
    type: "family",
    coords: [-18.284, 32.76],
  },
  {
    name: "Nyangombe Falls",
    distance: "20km",
    type: "nature",
    coords: [-18.287, 32.767],
  },
  {
    name: "Claremont Orchards & Fisheries",
    distance: "22km",
    type: "family",
    coords: [-18.291, 32.773],
  },
  {
    name: "St Catherines on the Downs Church",
    distance: "4.5km",
    type: "religious",
    coords: [-18.265, 32.765],
  },
  {
    name: "Ruchera Mosque",
    distance: "18.3km",
    type: "religious",
    coords: [-18.279, 32.79],
  },
  {
    name: "Nyanga Masjid Mosques",
    distance: "15.3km",
    type: "religious",
    coords: [-18.272, 32.781],
  },
  {
    name: "Brighton’s Beach",
    distance: "",
    type: "family",
    coords: [-18.3, 32.8],
  },
  {
    name: "Nyanga National Park",
    distance: "51.5km",
    type: "nature",
    coords: [-18.401, 32.85],
  },
  {
    name: "Ziwa Ruins",
    distance: "40km",
    type: "historical",
    coords: [-18.37, 32.83],
  },
  {
    name: "Nyanga Pit Structures",
    distance: "20.5km",
    type: "historical",
    coords: [-18.29, 32.77],
  },
  {
    name: "Nyangwe Fort",
    distance: "22.8km",
    type: "historical",
    coords: [-18.295, 32.775],
  },
  {
    name: "Chawomera Fort",
    distance: "10.7km",
    type: "historical",
    coords: [-18.27, 32.76],
  },
];

const icons = {
  nature: <Trees className="text-green-600" />,
  historical: <Landmark className="text-orange-800" />,
  religious: <Church className="text-indigo-600" />,
  adventure: <Bike className="text-red-600" />,
  family: <TentTree className="text-blue-500" />,
};

const filters = {
  all: "All",
  nature: "Nature",
  historical: "Historical",
  religious: "Religious",
  adventure: "Adventure",
  family: "Family Fun",
};

export function AttractionsSection() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? places
      : places.filter((p) => p.type === activeFilter);

  return (
    <div className="w-full mt-10 px-4">
      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {Object.entries(filters).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveFilter(key)}
            className={`px-4 py-2 rounded-full border ${
              activeFilter === key
                ? "bg-green-800 text-white"
                : "bg-white text-green-900 border-green-700"
            } hover:scale-105 transition`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {filtered.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="p-4 border rounded-xl bg-white shadow hover:shadow-md flex gap-4 items-start"
          >
            <div className="text-2xl">{icons[item.type]}</div>
            <div>
              <h3 className="font-semibold text-green-900">{item.name}</h3>
              {item.distance && (
                <p className="text-sm text-gray-500">
                  Approx. {item.distance} away
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Map */}
      <MapContainer
        center={[-18.27, 32.76]}
        zoom={10}
        scrollWheelZoom={false}
        className="h-[400px] w-full rounded-xl"
      >
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filtered.map((item, index) => (
          <Marker key={index} position={item.coords}>
            <Popup>{item.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
