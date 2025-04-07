import { NextResponse } from "next/server";
import connectMongoDB from "../../../../../libs/mongodb";
import Orders from "../../../../../models/orders";

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
  const orders = await Orders.findOne({ _id: id });
  return NextResponse.json({ orders }, { status: 200 });
}

export default async function DELETE(request) {
  const { id } = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Orders.findByIdAndDelete(id);
  return NextResponse.json({ message: "Reservation deleted" }, { status: 201 });
}
