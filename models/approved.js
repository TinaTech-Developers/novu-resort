import mongoose, { Schema } from "mongoose";

const approvedSchema = new Schema(
  {
    fullname: String,
    message: String,
    email: String,
    arrivaldate: String,
    deptdate: String,
  },
  { timestamps: true }
);

const Approved =
  mongoose.models.Approved || mongoose.model("Approved", approvedSchema);

export default Approved;
