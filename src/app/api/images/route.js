import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import Images from "../../../../models/orders";

export async function POST(request) {
  const { base64 } = await request.body;
  await connectMongoDB();
  await Images.create({ image: base64 });
  return NextResponse.json({ message: "Room Created" }, { status: 201 });
}
