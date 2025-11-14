import { NextResponse } from "next/server";
import connectMongoDB from "../../../../../libs/mongodb";
import Conference from "../../../../../models/Conference";


export async function GET(req, { params }) {
  await connectMongoDB();
  const { id } = params;

  try {
    const booking = await Conference.findById(id);
    if (!booking) {
      return NextResponse.json(
        { error: "Conference booking not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(booking, { status: 200 });
  } catch (err) {
    console.error("Get conference booking error:", err);
    return NextResponse.json(
      { error: "Failed to fetch conference booking" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  await connectMongoDB();
  const { id } = params;

  try {
    const deletedBooking = await Conference.findByIdAndDelete(id);
    if (!deletedBooking) {
      return NextResponse.json(
        { error: "Conference booking not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Conference booking deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Delete conference booking error:", err);
    return NextResponse.json(
      { error: "Failed to delete conference booking" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  await connectMongoDB();
  const { id } = params;

  try {
    const body = await req.json();
    const updatedBooking = await Conference.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updatedBooking) {
      return NextResponse.json(
        { error: "Conference booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Conference booking updated successfully",
        booking: updatedBooking,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Update conference booking error:", err);
    return NextResponse.json(
      { error: "Failed to update conference booking" },
      { status: 500 }
    );
  }
}
