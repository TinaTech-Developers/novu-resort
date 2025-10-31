import { NextResponse } from "next/server";
import connectMongoDB from "../../../../../../libs/mongodb";
import Room from "../../../../../../models/rooms";

export async function GET(request, { params }) {
  try {
    await connectMongoDB();
    const { bookingId } = params;

    // Find the room that contains this booking
    const room = await Room.findOne({ "bookings._id": bookingId });
    if (!room)
      return NextResponse.json(
        { message: "Booking not found" },
        { status: 404 }
      );

    // Extract that specific booking
    const booking = room.bookings.id(bookingId);
    return NextResponse.json({
      booking: {
        ...booking.toObject(),
        roomName: room.name,
        roomId: room._id,
      },
    });
  } catch (err) {
    console.error("Error fetching booking:", err);
    return NextResponse.json(
      { message: "Failed to fetch booking" },
      { status: 500 }
    );
  }
}
