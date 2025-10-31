import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema(
  {
    fullName: { type: String, required: true },
    surname: { type: String },
    address: { type: String },
    city: { type: String },
    country: { type: String },
    email: { type: String, required: true },
    adultsNo: { type: Number },
    kidsNo: { type: Number },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    total: { type: Number },
    approved: { type: Boolean, default: false }, // <--- NEW: track approved bookings
  },
  { _id: true } // each booking gets its own _id
);

const roomSchema = new Schema(
  {
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true },
    roomType: { type: String, required: true },
    price: { type: Number, required: true },
    bookings: [bookingSchema], // embed bookings
  },
  { timestamps: true }
);

const Room = mongoose.models.Room || mongoose.model("Room", roomSchema);

export default Room;
