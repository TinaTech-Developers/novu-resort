import mongoose from "mongoose";

const DishSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  desc: { type: String },
});

export default mongoose.models.Dish || mongoose.model("Dish", DishSchema);
