export const dynamic = "force-dynamic"; // ⬅️ REQUIRED FIX
export const revalidate = 0; // ⬅️ Disable caching

import { NextResponse } from "next/server";
import connectMongoDB from "../../../../../libs/mongodb";
import Room from "../../../../../models/rooms";
import Reservations from "../../../../../models/reservations";

export async function GET(request) {
  try {
    await connectMongoDB();

    const { searchParams } = new URL(request.url);
    const checkIn = searchParams.get("checkIn");
    const checkOut = searchParams.get("checkOut");

    if (!checkIn || !checkOut) {
      return NextResponse.json(
        { error: "checkIn and checkOut dates are required" },
        { status: 400 }
      );
    }

    // Normalize dates
    const checkInDate = new Date(checkIn);
    checkInDate.setHours(0, 0, 0, 0);

    const checkOutDate = new Date(checkOut);
    checkOutDate.setHours(23, 59, 59, 999);

    // 1️⃣ Find overlapping approved reservations
    const overlappingApprovedReservations = await Reservations.find({
      approved: true,
      arrivaldate: { $lt: checkOutDate },
      deptdate: { $gt: checkInDate },
    }).select("book");

    // 2️⃣ Extract only booked room IDs
    const bookedRoomIds = overlappingApprovedReservations
      .filter((r) => r.book)
      .map((r) => r.book.toString());

    console.log("Booked Room IDs:", bookedRoomIds);

    // 3️⃣ Return rooms NOT booked in approved reservations
    const availableRooms = await Room.find({
      _id: { $nin: bookedRoomIds },
    });

    return NextResponse.json({ rooms: availableRooms }, { status: 200 });
  } catch (error) {
    console.error("Error checking availability:", error);
    return NextResponse.json(
      { error: "Failed to fetch available rooms" },
      { status: 500 }
    );
  }
}
