import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import Order from "../../../../models/Order";
import Dish from "../../../../models/Dish"; // 👈 Add this import

export async function POST(req) {
  await connectMongoDB();

  try {
    const body = await req.json();
    const { customer, items, payment } = body;

    if (!customer || !items?.length || !payment?.method) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const total = items.reduce((sum, i) => sum + i.price * i.qty, 0) + 25;

    const newOrder = new Order({
      customer,
      items,
      payment,
      total,
      status: "paid",
    });

    const saved = await newOrder.save();

    return NextResponse.json(
      { message: "Order saved successfully", order: saved },
      { status: 201 }
    );
  } catch (err) {
    console.error("Order API error:", err);
    return NextResponse.json(
      { error: "Failed to save order" },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectMongoDB();
  try {
    const orders = await Order.find().populate("items.dish");
    return NextResponse.json(orders, { status: 200 });
  } catch (err) {
    console.error("Get orders error:", err);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
