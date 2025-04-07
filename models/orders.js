import mongoose, { Schema } from "mongoose";

const ordersSchema = new Schema(
  {
    fullname: String,
    phone: String,
    email: String,
    period: String,
    payment: String,
    newPrice: String,
    newName: String,
  },
  { timestamps: true }
);

const Orders = mongoose.models.Orders || mongoose.model("Orders", ordersSchema);

export default Orders;
