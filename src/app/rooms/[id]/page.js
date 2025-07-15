import EditRoomDetails from "@/components/EditRoomDetails";
import Layout from "@/components/Layout";
import React from "react";
import { headers } from "next/headers";

const getRoomById = async (id) => {
  const headersList = headers();
  const host = headersList.get("host");
  const protocol = host?.includes("localhost") ? "http" : "https";

  try {
    const res = await fetch(`${protocol}://${host}/api/executivebeds/${id}`, {
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
