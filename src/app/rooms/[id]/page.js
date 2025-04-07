import EditRoomDetails from "@/components/EditRoomDetails";
import Layout from "@/components/Layout";
import { error } from "console";
import React from "react";

const API_BASE_URL =
  process.env.API_BASE_URL ||
  "http://localhost:3000" ||
  "www.cfknyaresort.co.zw";
const getRoomById = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/rooms/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new error("failed to fetch a room");
    }
    const room = res.json();
    // console.log(room);
    return room;
  } catch (error) {
    console.log(error);
  }
};

export default async function RoomDetails({ params }) {
  const { id } = params;
  const { room } = await getRoomById(id);
  const {
    imageUrl,
    price,
    name,
    description,
    adjustedPrice,
    priceNumber,
    image1,
    image2,
    image3,
  } = room;

  return (
    <Layout>
      <EditRoomDetails
        id={id}
        description={description}
        name={name}
        imageUrl={imageUrl}
        price={price}
        adjustedPrice={adjustedPrice}
        priceNumber={priceNumber}
        image1={image1}
        image2={image2}
        image3={image3}
      />
    </Layout>
  );
}
