import mongoose, { Schema } from "mongoose";

const reservationSchema = new Schema(
  {
    fullName: { type: String, required: true },
    surname: { type: String },
    address: { type: String },
    country: { type: String },
    city: { type: String },
    email: { type: String, required: true },
    arrivaldate: { type: Date, required: true },
    deptdate: { type: Date, required: true },
    kidsNo: { type: Number },
    adultsNo: { type: Number },
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },

    price: { type: Number },
    total: { type: Number },
    approved: { type: Boolean, default: false }, // track approval
  },
  { timestamps: true }
);

const Reservations =
  mongoose.models.Reservations ||
  mongoose.model("Reservations", reservationSchema);

export default Reservations;
