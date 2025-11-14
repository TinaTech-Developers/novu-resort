import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import Conference from "../../../../models/Conference";

// Create new conference booking(s)
export async function POST(req) {
  await connectMongoDB();

  try {
    const body = await req.json();

    // Accept single or multiple bookings
    const bookingsToSave = Array.isArray(body) ? body : [body];

    // Validate required fields
    for (const booking of bookingsToSave) {
      if (
        !booking.name ||
        !booking.email ||
        !booking.phone ||
        !booking.date ||
        !booking.attendees
      ) {
        return NextResponse.json(
          { error: "Missing required fields in one or more bookings" },
          { status: 400 }
        );
      }
    }

    // Save bookings
    const savedBookings = await Conference.insertMany(bookingsToSave);

    return NextResponse.json(
      {
        message: "Conference booking(s) saved successfully",
        bookings: savedBookings,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Conference API error:", err);
    return NextResponse.json(
      { error: "Failed to save conference booking(s)" },
      { status: 500 }
    );
  }
}

// Get all conference bookings
export async function GET() {
  await connectMongoDB();

  try {
    const bookings = await Conference.find().sort({ createdAt: -1 });
    return NextResponse.json(bookings, { status: 200 });
  } catch (err) {
    console.error("Get conference bookings error:", err);
    return NextResponse.json(
      { error: "Failed to fetch conference bookings" },
      { status: 500 }
    );
  }
}
