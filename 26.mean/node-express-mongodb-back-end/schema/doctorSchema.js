import mongoose from "mongoose";

const doctroSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  specialization: { type: String, required: true },
  licenseNumber: { type: String, unique: true, required: true },
  contact: {
    phone: String,
    email: { type: String, lowercase: true },
    address: String,
  },
  hospital: { type: String },
  availability: [
    {
      day: String,
      from: String, // "09:00"
      to: String, // "17:00"
    },
  ],
  rating: { type: Number, default: 0 },
  patientReviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});

export default doctroSchema;
