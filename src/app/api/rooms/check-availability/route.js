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

    // Normalize dates to cover the whole days
    const checkInDate = new Date(checkIn);
    checkInDate.setHours(0, 0, 0, 0); // start of day

    const checkOutDate = new Date(checkOut);
    checkOutDate.setHours(23, 59, 59, 999); // end of day

    // 1️⃣ Find all APPROVED reservations that overlap the requested dates
    const overlappingApprovedReservations = await Reservations.find({
      approved: true,
      arrivaldate: { $lt: checkOutDate }, // arrival before check-out
      deptdate: { $gt: checkInDate }, // departure after check-in
    }).select("book");

    // 2️⃣ Extract only the booked room IDs
    const bookedRoomIds = overlappingApprovedReservations
      .filter((r) => r.book) // ensure the book field exists
      .map((r) => r.book.toString());

    console.log("Booked Room IDs:", bookedRoomIds); // debug log

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
