import mongoose from "mongoose";
import doctorSchema from "../schema/doctorSchema.js";

const DoctroModel = mongoose.model("Doctors", doctorSchema);

export default DoctroModel;
