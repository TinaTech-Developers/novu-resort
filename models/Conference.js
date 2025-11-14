import mongoose from "mongoose";

const ConferenceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: Date, required: true },
  attendees: { type: Number, required: true },
  message: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Conference ||
  mongoose.model("Conference", ConferenceSchema);
