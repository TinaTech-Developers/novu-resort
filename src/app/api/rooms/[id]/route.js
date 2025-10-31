import { NextResponse } from "next/server";
import connectMongoDB from "../../../../../libs/mongodb";
import Room from "../../../../../models/rooms";

const zimbabweHolidays = [
  "2025-01-01",
  "2025-04-18",
  "2025-05-01",
  "2025-08-08",
  "2025-08-09",
  "2025-12-25",
  "2025-12-26",
  "2025-11-20",
];

function isHoliday(date) {
  const formatted = date.toISOString().split("T")[0];
  return zimbabweHolidays.includes(formatted);
}

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const { searchParams } = new URL(request.url);
    const checkIn = searchParams.get("checkIn");
    const checkOut = searchParams.get("checkOut");

    await connectMongoDB();
    const room = await Room.findById(id);
    if (!room)
      return NextResponse.json({ message: "Room not found" }, { status: 404 });

    let adjustedPrice = room.price;
    if (isHoliday(new Date())) adjustedPrice += 50;

    // Availability
    let isAvailable = true;
    if (checkIn && checkOut) {
      const inDate = new Date(checkIn);
      const outDate = new Date(checkOut);
      isAvailable = !room.bookings.some(
        (b) =>
          (inDate >= b.checkIn && inDate < b.checkOut) ||
          (outDate > b.checkIn && outDate <= b.checkOut) ||
          (inDate <= b.checkIn && outDate >= b.checkOut)
      );
    }

    return NextResponse.json(
      {
        room: {
          ...room.toObject(),
          price: adjustedPrice,
          available: isAvailable,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching room:", error);
    return NextResponse.json(
      { message: "Failed to fetch room" },
      { status: 500 }
    );
  }
}
