import { NextResponse } from "next/server";
import connectMongoDB from "../../../../../../../libs/mongodb";
import Room from "../../../../../../../models/rooms";

export async function DELETE(req, { params }) {
  const { roomId, bookingId } = params;

  try {
    await connectMongoDB();
    const room = await Room.findById(roomId);
    if (!room)
      return NextResponse(JSON.stringify({ message: "Room not found" }), {
        status: 404,
      });

    room.bookings = room.bookings.filter((b) => b._id.toString() !== bookingId);
    await room.save();

    return NextResponse(
      JSON.stringify({ message: "Booking removed successfully" }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Error deleting booking:", err);
    return new Response(
      JSON.stringify({ message: "Failed to delete booking" }),
      { status: 500 }
    );
  }
}
