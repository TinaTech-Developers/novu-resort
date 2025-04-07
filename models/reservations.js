import mongoose, { Schema } from "mongoose";

const reservationSchema = new Schema(
  {
    fullNme: String,
    surname: String,
    address: String,
    country: String,
    city: String,
    email: String,
    arrivaldate: Date,
    deptdate: Date,
    kidsNo: String,
    adultsNo: String,
    book: String,
    price: String,
    total: String,
  },
  { timestamps: true }
);

const Reservations =
  mongoose.models.Reservations ||
  mongoose.model("Reservations", reservationSchema);

export default Reservations;
