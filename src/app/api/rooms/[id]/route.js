import { NextResponse } from "next/server";
import connectMongoDB from "../../../../../libs/mongodb";
import Rooms from "../../../../../models/rooms";

// Example list of Zimbabwean public holidays (you can update this or fetch from an API)
const zimbabweHolidays = [
  "2024-01-01", // New Year's Day
  "2024-04-18", // Independence Day
  "2024-05-01", // Labour Day
  "2024-08-14", // Heroes Day
  "2024-08-15", // Unity Day
  "2024-12-25", // Christmas Day
  "2024-11-20",
];

// Helper function to check if today is a holiday
function isHoliday(date) {
  const formattedDate = date.toISOString().split("T")[0]; // Format as 'YYYY-MM-DD'
  return zimbabweHolidays.includes(formattedDate);
}

// PUT method to update room details and price based on holidays
export async function PUT(request, { params }) {
  const { id } = params; // Get room id from dynamic route
  console.log("Updating room with ID:", id); // Log ID for debugging

  const {
    newName: title,
    newDescription: description,
    newImage: image,
    newPrice: price,
  } = await request.json();

  console.log("Received price (string):", price); // Log received price

  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Check if today is a holiday and adjust the price
    const today = new Date();
    let adjustedPrice = parseFloat(price); // Convert string to float for arithmetic

    if (isHoliday(today)) {
      adjustedPrice += 50; // Add 50 to price on holidays
      console.log("Adjusted price due to holiday:", adjustedPrice);
    }

    // Convert price back to string
    adjustedPrice = adjustedPrice.toString();

    // Update room details in the database with adjusted price
    const updatedRoom = await Rooms.findByIdAndUpdate(
      id,
      {
        title,
        description,
        image,
        price: adjustedPrice,
      },
      { new: true }
    ); // Return updated room object

    if (!updatedRoom) {
      console.log("Room not found in database");
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    console.log("Room updated:", updatedRoom); // Log updated room
    return NextResponse.json(
      { message: "Room updated with new price", price: adjustedPrice },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating room:", error);
    return NextResponse.json(
      { error: "Failed to update room" },
      { status: 500 }
    );
  }
}

// GET method to retrieve room details and adjust price based on holidays
export async function GET(request, { params }) {
  const { id } = params; // Get room id from dynamic route
  console.log("Fetching room with ID:", id); // Log ID for debugging

  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Retrieve room details from the database
    const room = await Rooms.findOne({ _id: id });
    if (!room) {
      console.log("Room not found in database");
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    console.log("Retrieved room:", room); // Log room data

    // Check if today is a holiday and adjust the price
    const today = new Date();
    let adjustedPrice = parseFloat(room.price); // Convert string to float for arithmetic

    if (isHoliday(today)) {
      adjustedPrice += 50; // Add 50 to price on holidays
      console.log("Adjusted price due to holiday:", adjustedPrice);
    }

    // Convert price back to string
    adjustedPrice = adjustedPrice.toString();

    // Return the room details with the adjusted price
    return NextResponse.json(
      { room: { ...room.toObject(), price: adjustedPrice } },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving room:", error);
    return NextResponse.json(
      { error: "Failed to retrieve room" },
      { status: 500 }
    );
  }
}
