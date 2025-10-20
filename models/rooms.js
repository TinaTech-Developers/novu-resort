import mongoose, { Schema } from "mongoose";

const roomSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    roomType: {
      type: String, // e.g. "two-bed", "executive", "three-bed"
      required: true,
    },
    price: {
      type: Number, // better stored as Number
      required: true,
    },
    // Optional: track booked dates for availability checks
    bookings: [
      {
        checkIn: { type: Date, required: true },
        checkOut: { type: Date, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Room = mongoose.models.Room || mongoose.model("Room", roomSchema);

export default Room;
