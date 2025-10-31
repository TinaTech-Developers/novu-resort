import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import Room from "../../../../models/rooms";

const zimbabwePublicHolidays = [
  "01-01", // New Year's Day
  "04-18", // Independence Day
  "05-01", // Labour Day
  "08-08", // Heroes Day
  "08-09", // Defense Forces Day
  "12-25", // Christmas Day
  "12-26", // Boxing Day
  "11-20", // Custom Holiday
];

function isHoliday(date) {
  const formatted = date.toISOString().slice(5, 10);
  return zimbabwePublicHolidays.includes(formatted);
}

// ✅ CREATE ROOM
export async function POST(request) {
  try {
    const { name, description, price, imageUrl, roomType } =
      await request.json();

    await connectMongoDB();
    await Room.create({ name, description, price, imageUrl, roomType });

    return NextResponse.json(
      { message: "Room created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating room:", error);
    return NextResponse.json(
      { message: "Failed to create room" },
      { status: 500 }
    );
  }
}

// ✅ GET ROOMS (optionally filtered by type + date availability)
export async function GET(request) {
  try {
    await connectMongoDB();

    const { searchParams } = new URL(request.url);
    const roomType = searchParams.get("roomType");
    const checkIn = searchParams.get("checkIn");
    const checkOut = searchParams.get("checkOut");

    const query = roomType ? { roomType } : {};
    const rooms = await Room.find(query).sort({ createdAt: -1 });

    const today = new Date();
    const holiday = isHoliday(today);

    let availableRooms = rooms;

    // 🧠 Filter by date availability
    if (checkIn && checkOut) {
      const inDate = new Date(checkIn);
      const outDate = new Date(checkOut);

      availableRooms = rooms.filter((room) => {
        const isBooked = room.bookings.some(
          (b) =>
            (inDate >= b.checkIn && inDate < b.checkOut) ||
            (outDate > b.checkIn && outDate <= b.checkOut) ||
            (inDate <= b.checkIn && outDate >= b.checkOut)
        );
        return !isBooked;
      });
    }

    const adjustedRooms = availableRooms.map((r) => ({
      ...r.toObject(),
      price: holiday ? r.price + 50 : r.price,
    }));

    return NextResponse.json({ rooms: adjustedRooms }, { status: 200 });
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return NextResponse.json(
      { message: "Failed to fetch rooms" },
      { status: 500 }
    );
  }
}
