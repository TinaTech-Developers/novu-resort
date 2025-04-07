import mongoose, { Schema } from "mongoose";
const expenditureSchema = new Schema({
  date: String,
  description: String,
  budget: Number,
  amount: Number,
  vat: Number,
});
const Expenditure =
  mongoose.models.Expenditure ||
  mongoose.model("Expenditure", expenditureSchema);

export default Expenditure;
