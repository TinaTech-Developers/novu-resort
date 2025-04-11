import mongoose, { Schema } from "mongoose";

const executiveBedSchema = new Schema(
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

const ExecutiveBed =
  mongoose.models.ExecutiveBed ||
  mongoose.model("ExecutiveBed", executiveBedSchema);

export default ExecutiveBed;
