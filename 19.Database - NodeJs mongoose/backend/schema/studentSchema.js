import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  age: Number,
  email: String,
});
export default studentSchema;
