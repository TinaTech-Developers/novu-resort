import { NextResponse } from "next/server";
import connectMongoDB from "../../../../../../../../libs/mongodb";
import Room from "../../../../../../../../models/rooms";

export async function PATCH(req, { params }) {
  const { id: roomId, bookingId } = params;

  try {
    await connectMongoDB();

    const room = await Room.findById(roomId);
    if (!room)
      return NextResponse.json({ message: "Room not found" }, { status: 404 });

    const booking = room.bookings.id(bookingId);
    if (!booking)
      return NextResponse.json(
        { message: "Booking not found" },
        { status: 404 }
      );

    booking.approved = true; // mark as approved
    await room.save();

    return NextResponse.json(
      { message: "Booking approved", booking },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to approve booking" },
      { status: 500 }
    );
  }
}
