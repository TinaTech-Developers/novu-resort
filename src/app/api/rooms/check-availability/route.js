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

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");

  await connectMongoDB();
  const rooms = await Room.find();

  const inDate = new Date(checkIn);
  const outDate = new Date(checkOut);

  const today = new Date();
  const holiday = isHoliday(today);

  const availableRooms = rooms.filter((room) => {
    const booked = room.bookings.some(
      (b) =>
        (inDate >= b.checkIn && inDate < b.checkOut) ||
        (outDate > b.checkIn && outDate <= b.checkOut) ||
        (inDate <= b.checkIn && outDate >= b.checkOut)
    );
    return !booked;
  });

  const adjusted = availableRooms.map((r) => ({
    ...r.toObject(),
    price: holiday ? r.price + 50 : r.price,
  }));

  return NextResponse.json({ rooms: adjusted });
}
