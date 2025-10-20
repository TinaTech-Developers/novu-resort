import { NextResponse } from "next/server";
import Room from "../../../../../models/rooms";
import connectMongoDB from "../../../../../libs/mongodb";

// 🇿🇼 Zimbabwe Public Holidays
const zimbabwePublicHolidays = [
  "01-01", // New Year's Day
  "04-18", // Independence Day
  "05-01", // Labour Day
  "08-08", // Heroes Day
  "08-09", // Defense Forces Day
  "12-25", // Christmas Day
  "12-26", // Boxing Day
  "11-20", // Custom holiday
];

// ✅ Check if current date is a holiday
function isHoliday(date) {
  const formatted = date.toISOString().slice(5, 10); // MM-DD
  return zimbabwePublicHolidays.includes(formatted);
}

// ✅ CREATE a new Room
export async function POST(request) {
  try {
    const { name, description, price, imageUrl, roomType } =
      await request.json();

    await connectMongoDB();
    const room = await Room.create({
      name,
      description,
      price,
      imageUrl,
      roomType,
    });

    return NextResponse.json(
      { success: true, message: "Room created successfully", room },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating room:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create room" },
      { status: 500 }
    );
  }
}

// ✅ GET all Rooms (with optional type filter)
export async function GET(request) {
  try {
    await connectMongoDB();

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || searchParams.get("roomType"); // supports both
    const query = type ? { roomType: type } : {};

    const rooms = await Room.find(query).sort({ createdAt: -1 });

    const today = new Date();
    const holiday = isHoliday(today);

    // 👇 Add dynamic price adjustment for holidays
    const adjustedRooms = rooms.map((r) => ({
      ...r.toObject(),
      price: holiday ? r.price + 50 : r.price,
    }));

    return NextResponse.json(
      { success: true, rooms: adjustedRooms },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch rooms" },
      { status: 500 }
    );
  }
}
