import mongoose from "mongoose";
import patientSchema from "../schema/patientSchema.js";

const PatientModel = mongoose.model("Patient", patientSchema);

export default PatientModel;