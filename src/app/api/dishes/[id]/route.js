import { NextResponse } from "next/server";
import connectMongoDB from "../../../../../libs/mongodb";
import Dish from "../../../../../models/Dish";

export async function GET(req, { params }) {
  await connectMongoDB();
  try {
    const { id } = params;
    const dish = await Dish.findById(id);
    if (!dish)
      return NextResponse.json({ error: "Dish not found" }, { status: 404 });
    return NextResponse.json(dish);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch dish" },
      { status: 500 }
    );
  }
}
export async function DELETE(req, { params }) {
  await connectMongoDB();
  try {
    const { id } = params;
    const deletedDish = await Dish.findByIdAndDelete(id);
    if (!deletedDish)
      return NextResponse.json({ error: "Dish not found" }, { status: 404 });
    return NextResponse.json(
      { message: "Dish deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to delete dish" },
      { status: 500 }
    );
  }
}
export async function PUT(req, { params }) {
  await connectMongoDB();
  try {
    const { id } = params;
    const body = await req.json();
    const updatedDish = await Dish.findByIdAndUpdate(id, body, { new: true });
    if (!updatedDish)
      return NextResponse.json({ error: "Dish not found" }, { status: 404 });
    return NextResponse.json(updatedDish, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to update dish" },
      { status: 500 }
    );
  }
}
