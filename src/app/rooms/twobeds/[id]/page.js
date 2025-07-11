import EditRoomDetails from "@/components/EditRoomDetails";
import Layout from "@/components/Layout";
import { error } from "console";
import React from "react";

const getRoomById = async (id) => {
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/api/twobed/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch a room");

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching room:", error);
    return null;
  }
};
export default async function RoomDetails({ params }) {
  const { id } = params;
  const data = await getRoomById(id);

  if (!data || !data.room) {
    return (
      <div className="p-8 text-red-600 text-center">
        Failed to load room details.
      </div>
    );
  }

  const { room } = data;

  return (
    <Layout>
      <EditRoomDetails id={id} {...room} />
    </Layout>
  );
}
