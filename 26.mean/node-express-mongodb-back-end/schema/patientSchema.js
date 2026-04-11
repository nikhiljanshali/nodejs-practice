import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({  
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false,
  },
  age: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  dateofBirth: {
    type: Date,
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
  },
  skinType: {
    type: String,
    required: true,
  },
  allergies: {
    type: String,
    required: false,
  },
  medication: {
    type: String,
    required: false,
  },
  diseases: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  created: {
    type: Date,
    required: false,
    default: Date.now,
  },
});

export default patientSchema;
