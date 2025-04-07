import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import Rooms from "../../../../models/rooms";

export async function POST(request) {
  const { name, description, price, imageUrl, roomType } = await request.json();
  await connectMongoDB();
  await Rooms.create({ name, description, price, imageUrl, roomType });

  return NextResponse.json({ message: "Room created" }, { status: 201 });
}

// List of Zimbabwe Public Holidays (you can adjust this as needed)
const zimbabwePublicHolidays = [
  "01-01", // New Year's Day
  "04-18", // Independence Day
  "05-01", // Labour Day
  "08-08", // Heroes Day
  "08-09", // Defense Forces Day
  "12-25", // Christmas Day
  "12-26", // Boxing Day
  "11-20", // Add other specific public holidays for Zimbabwe
];

const isHoliday = (date) => {
  const formattedDate = date.toISOString().slice(5, 10); // Format as MM-DD
  return zimbabwePublicHolidays.includes(formattedDate);
};
export async function GET() {
  await connectMongoDB();
  const rooms = await Rooms.find();

  // Get today's date to check if it's a holiday
  const today = new Date();
  const isTodayHoliday = isHoliday(today);

  // Adjust the room prices if it's a public holiday
  const adjustedRooms = rooms.map((room) => {
    let priceNumber = parseFloat(room.price);

    // If today is a holiday, increase the price by 50
    if (isTodayHoliday) {
      priceNumber += 50;
    }

    // Convert the adjusted price back to a string if needed
    room.price = priceNumber.toString();

    return room;
  });

  return NextResponse.json({ rooms: adjustedRooms });
}
