import { NextResponse } from "next/server";

import connectMongoDB from "../../../../libs/mongodb";
import Approved from "../../../../models/approved";

export async function POST(request) {
  const { surname, message, email, arrivaldate, deptdate, total } =
    await request.json();
  await connectMongoDB();

  await Approved.create({
    surname,
    message,
    email,
    arrivaldate,
    deptdate,
    total,
  });
  return NextResponse.json({ message: "Order Approved" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const approved = await Approved.find();
  return NextResponse.json({ approved });
}
