import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import Expenditure from "../../../../models/expenditure";

export async function POST(request) {
  const { date, description, budget, amount, vat } = await request.json();
  await connectMongoDB();
  await Expenditure.create({ date, description, budget, amount, vat });

  return NextResponse.json({ message: "Expenditure Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const expenditure = await Expenditure.find();
  return NextResponse.json({ expenditure });
}
