import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import Reservations from "../../../../models/reservations";

export async function POST(request) {
  const {
    fullName,
    surname,
    address,
    country,
    city,
    email,
    arrivaldate,
    deptdate,
    kidsNo,
    adultsNo,
    book,
    price,
    total,
  } = await request.json();

  await connectMongoDB();

  // Prevent overlapping bookings for same room
  const existingReservations = await Reservations.find({
    book,
    $or: [
      {
        arrivaldate: { $lte: new Date(deptdate) },
        deptdate: { $gte: new Date(arrivaldate) },
      },
    ],
  });

  if (existingReservations.length > 0) {
    const arrivalDateFormatted = new Date(arrivaldate).toLocaleDateString(
      "en-GB",
      { weekday: "short", day: "2-digit", month: "short", year: "numeric" }
    );
    const deptDateFormatted = new Date(deptdate).toLocaleDateString("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const nextAvailableDate = new Date(new Date(deptdate).getTime() + 86400000);
    const nextAvailableDateFormatted = nextAvailableDate.toLocaleDateString(
      "en-GB",
      { weekday: "short", day: "2-digit", month: "short", year: "numeric" }
    );

    return NextResponse.json(
      {
        message: `This room is already booked from ${arrivalDateFormatted} to ${deptDateFormatted}. You may book from ${nextAvailableDateFormatted} onward.`,
      },
      { status: 400 }
    );
  }

  await Reservations.create({
    fullName,
    surname,
    address,
    country,
    city,
    email,
    arrivaldate,
    deptdate,
    kidsNo,
    adultsNo,
    book,
    price,
    total,
    approved: false, // default
  });

  return NextResponse.json({ message: "Reservation Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const reservations = await Reservations.find();
  return NextResponse.json({ reservations }, { status: 200 });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Reservations.findByIdAndDelete(id);
  return NextResponse.json(
    { message: "Reservation Successfully Deleted" },
    { status: 200 }
  );
}
