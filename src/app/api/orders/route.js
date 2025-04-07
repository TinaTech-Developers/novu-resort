import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import Orders from "../../../../models/orders";

export async function POST(request) {
  const { fullname, phone, period, payment, newName, email, newPrice } =
    await request.json();
  await connectMongoDB();
  await Orders.create({
    fullname,
    phone,
    period,
    payment,
    newName,
    email,
    newPrice,
  });
  return NextResponse.json({ message: "Order Created" }, { status: 201 });
}
export async function GET() {
  await connectMongoDB();
  const orders = await Orders.find();
  return NextResponse.json({ orders });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Orders.findByIdAndDelete(id);
  return NextResponse.json(
    { message: "Order Successfully Deleted" },
    { status: 200 }
  );
}
