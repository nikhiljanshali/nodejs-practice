import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  tags: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  created: {
    type: Date,
    required: false,
    default: Date.now,
  },
});

export default todoSchema;
