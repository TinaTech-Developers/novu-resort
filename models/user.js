import mongoose, { models } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please provide username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "please provide email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "please provide a password"],
    },
  },
  {
    timestamps: true,
  }
);

const User = models.User || mongoose.model("User", userSchema);

export default User;
