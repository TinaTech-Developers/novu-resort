import mongoose, { Schema } from "mongoose";

const approvedOrdersSchema = new Schema(
  {
    fullname: String,
    email: String,
    period: String,
    newName: String,
    payment: String,
    newPrice: String,
  },
  { timestamps: true }
);

const ApprovedOrders =
  mongoose.models.ApprovedOrders ||
  mongoose.model("ApprovedOrders", approvedOrdersSchema);

export default ApprovedOrders;
