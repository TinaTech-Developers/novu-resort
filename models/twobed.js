import mongoose, { Schema } from "mongoose";

const twoBedSchema = new Schema(
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
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const TwoBed = mongoose.models.TwoBed || mongoose.model("TwoBed", twoBedSchema);

export default TwoBed;
