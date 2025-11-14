// models/Order.js
import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    customer: {
      name: { type: String, required: true },
      email: { type: String },
      phone: { type: String },
    },
    items: [
      {
        dish: { type: mongoose.Schema.Types.ObjectId, ref: "Dish" }, // <-- Important
        qty: { type: Number, required: true, default: 1 },
        price: { type: Number, required: true },
      },
    ],
    payment: {
      method: { type: String, required: true },
      status: { type: String, default: "paid" },
    },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "paid"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
