import { NextResponse } from "next/server";
import ApprovedOrders from "../../../../models/approverOrders";
import connectMongoDB from "../../../../libs/mongodb";

export async function POST(request) {
  const { fullname, email, period, newName, payment, newPrice } =
    await request.json();
  await connectMongoDB();
  await ApprovedOrders.create({
    fullname,
    email,
    period,
    newName,
    payment,
    newPrice,
  });
  return NextResponse.json({ message: "Order Approved" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const approved = await ApprovedOrders.find();
  return NextResponse.json({ approved });
}
