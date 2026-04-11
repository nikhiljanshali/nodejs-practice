import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },

  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },

  appointmentDate: {
    type: Date,
    required: true,
  },

  startTime: {
    type: String, // "10:30"
    required: true,
  },

  endTime: {
    type: String, // "11:00"
    required: true,
  },

  status: {
    type: String,
    enum: ["scheduled", "completed", "cancelled", "no-show"],
    default: "scheduled",
  },

  reason: {
    type: String, // patient symptoms or reason for visit
  },

  notes: {
    type: String, // doctor notes after consultation
  },

  consultationType: {
    type: String,
    enum: ["in-person", "video", "phone"],
    default: "in-person",
  },

  created: {
    type: Date,
    default: Date.now,
  },

  updated: {
    type: Date,
    default: Date.now,
  },
});

// Optional: Auto-update "updated" field
// appointmentSchema.pre("save", function (next) {
//   this.updated = Date.now();
//   next();
// });

export default appointmentSchema;
