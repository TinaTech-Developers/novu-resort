import { NextResponse } from "next/server";
import connectMongoDB from "../../../../../libs/mongodb";
import Reservations from "../../../../../models/reservations";

export async function PUT(request, { params }) {
  const { id } = params;
  const {
    newName: fullname,
    newMessage: message,
    newEmail: email,
    newArrivalDate: arrivaldate,
    newDeptDAte: deptdate,
  } = await request.json();
  await connectMongoDB();
  await Reservations.findByIdAndUpdate(id, {
    fullname,
    message,
    email,
    arrivaldate,
    deptdate,
  });
  return NextResponse.json({ message: "Reservation updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const reservations = await Reservations.findOne({ _id: id });
  return NextResponse.json({ reservations }, { status: 200 });
}

export default async function DELETE(request) {
  const { id } = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Reservations.findByIdAndDelete(id);
  return NextResponse.json({ message: "Reservation deleted" }, { status: 201 });
}
