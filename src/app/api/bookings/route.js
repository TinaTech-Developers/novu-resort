import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import Room from "../../../../models/rooms";

export async function POST(request) {
  const { roomId, checkIn, checkOut } = await request.json();

  await connectMongoDB();
  const room = await Room.findById(roomId);
  if (!room)
    return NextResponse.json({ error: "Room not found" }, { status: 404 });

  // Check for conflicts
  const conflict = room.bookings.some(
    (b) =>
      (new Date(checkIn) >= b.checkIn && new Date(checkIn) < b.checkOut) ||
      (new Date(checkOut) > b.checkIn && new Date(checkOut) <= b.checkOut)
  );

  if (conflict) {
    return NextResponse.json({ error: "Room not available" }, { status: 400 });
  }

  room.bookings.push({ checkIn, checkOut });
  await room.save();

  return NextResponse.json({ message: "Booking confirmed" }, { status: 201 });
}
