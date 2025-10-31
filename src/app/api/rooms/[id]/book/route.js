import { NextResponse } from "next/server";
import connectMongoDB from "../../../../../../libs/mongodb";
import Room from "../../../../../../models/rooms";
export async function POST(request, { params }) {
  try {
    const { id } = params;
    const {
      fullName,
      surname,
      address,
      city,
      country,
      email,
      adultsNo,
      kidsNo,
      checkIn,
      checkOut,
      total,
    } = await request.json();

    if (!checkIn || !checkOut)
      return NextResponse.json(
        { message: "checkIn and checkOut are required" },
        { status: 400 }
      );

    await connectMongoDB();
    const room = await Room.findById(id);
    if (!room)
      return NextResponse.json({ message: "Room not found" }, { status: 404 });

    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);

    // Prevent overlapping bookings
    const isBooked = room.bookings.some(
      (b) =>
        (inDate >= b.checkIn && inDate < b.checkOut) ||
        (outDate > b.checkIn && outDate <= b.checkOut) ||
        (inDate <= b.checkIn && outDate >= b.checkOut)
    );

    if (isBooked) {
      return NextResponse.json(
        { message: "Room already booked for those dates" },
        { status: 409 }
      );
    }

    // Save all user details
    room.bookings.push({
      fullName,
      surname,
      address,
      city,
      country,
      email,
      adultsNo,
      kidsNo,
      checkIn: inDate,
      checkOut: outDate,
      total,
    });

    await room.save();

    return NextResponse.json(
      { message: "Room booked successfully", room },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error booking room:", error);
    return NextResponse.json(
      { message: "Failed to book room" },
      { status: 500 }
    );
  }
}

export async function GET(request, { params }) {
  try {
    const { id } = params;
    await connectMongoDB();
    const room = await Room.findById(id);
    if (!room)
      return NextResponse.json({ message: "Room not found" }, { status: 404 });

    return NextResponse.json({ room }, { status: 200 });
  } catch (error) {
    console.error("Error fetching room:", error);
    return NextResponse.json(
      { message: "Failed to fetch room" },
      { status: 500 }
    );
  }
}

// Holiday dates in Zimbabwe
const zimbabweHolidays = [
  "2024-01-01",
  "2024-02-12",
  "2024-04-18",
  "2024-04-19",
  "2024-05-01",
  "2024-08-12",
  "2024-08-13",
  "2024-12-25",
  "2024-12-26",
  "2024-11-22",
  "2025-01-01",
  "2025-02-11",
  "2025-04-18",
  "2025-04-19",
  "2025-05-01",
  "2025-08-11",
  "2025-08-12",
  "2025-12-25",
  "2025-12-26",
  "2025-11-20",
];

function isHoliday(date) {
  const formatted = date.toISOString().split("T")[0];
  return zimbabweHolidays.includes(formatted);
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { name, description, price, imageUrl, roomType } =
      await request.json();

    await connectMongoDB();
    const room = await Room.findById(id);
    if (!room)
      return NextResponse.json({ message: "Room not found" }, { status: 404 });

    room.name = name || room.name;
    room.description = description || room.description;
    room.price = price || room.price;
    room.imageUrl = imageUrl || room.imageUrl;
    room.roomType = roomType || room.roomType;

    await room.save();

    return NextResponse.json(
      { message: "Room updated successfully", room },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating room:", error);
    return NextResponse.json(
      { message: "Failed to update room" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await connectMongoDB();
    const room = await Room.findByIdAndDelete(id);
    if (!room)
      return NextResponse.json({ message: "Room not found" }, { status: 404 });

    return NextResponse.json(
      { message: "Room deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting room:", error);
    return NextResponse.json(
      { message: "Failed to delete room" },
      { status: 500 }
    );
  }
}
