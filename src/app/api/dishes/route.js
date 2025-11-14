import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import Dish from "../../../../models/Dish";

// Create new dish(es)
export async function POST(req) {
  await connectMongoDB();

  try {
    const body = await req.json();

    // Accept single or multiple dishes
    const dishesToSave = Array.isArray(body) ? body : [body];

    // Validate required fields
    for (const dish of dishesToSave) {
      if (!dish.name || !dish.price || !dish.image || !dish.desc) {
        return NextResponse.json(
          { error: "Missing required fields in one or more dishes" },
          { status: 400 }
        );
      }
    }

    // Save dishes
    const savedDishes = await Dish.insertMany(dishesToSave);

    return NextResponse.json(
      { message: "Dishes saved successfully", dishes: savedDishes },
      { status: 201 }
    );
  } catch (err) {
    console.error("Dish API error:", err);
    return NextResponse.json(
      { error: "Failed to save dishes" },
      { status: 500 }
    );
  }
}

// Get all dishes
export async function GET() {
  await connectMongoDB();
  try {
    const dishes = await Dish.find().sort({ createdAt: -1 });
    return NextResponse.json(dishes, { status: 200 });
  } catch (err) {
    console.error("Get dishes error:", err);
    return NextResponse.json(
      { error: "Failed to fetch dishes" },
      { status: 500 }
    );
  }
}
