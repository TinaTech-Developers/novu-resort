import { NextResponse } from "next/server";
import connectMongoDB from "../../../../../libs/mongodb";
import Reservations from "../../../../../models/reservations";

export async function GET(request, { params }) {
  await connectMongoDB();

  const { id } = params;

  if (id) {
    // GET single reservation
    const reservation = await Reservations.findById(id);
    if (!reservation) {
      return NextResponse.json(
        { error: "Reservation not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ reservation });
  }

  // GET all reservations
  const reservations = await Reservations.find();
  return NextResponse.json({ reservations });
}

// POST new reservation
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

  // Check for overlapping approved reservations
  const existing = await Reservations.find({
    book,
    approved: true,
    $or: [
      { arrivaldate: { $lte: deptdate }, deptdate: { $gte: arrivaldate } },
      { arrivaldate: { $gte: arrivaldate }, deptdate: { $lte: deptdate } },
    ],
  });

  if (existing.length > 0) {
    return NextResponse.json(
      { message: "This room is already booked for the selected dates." },
      { status: 400 }
    );
  }

  const newReservation = await Reservations.create({
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
  });

  return NextResponse.json(
    { message: "Reservation Created", newReservation },
    { status: 201 }
  );
}

export async function PUT(request, { params }) {
  const { id } = params;
  const { approved } = await request.json(); // expect { approved: true }

  await connectMongoDB();
  await Reservations.findByIdAndUpdate(id, { approved });

  return NextResponse.json({ message: "Reservation updated" }, { status: 200 });
}

// DELETE reservation
export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Reservations.findByIdAndDelete(id);
  return NextResponse.json({ message: "Reservation deleted" }, { status: 200 });
}
