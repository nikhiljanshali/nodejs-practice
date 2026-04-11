import mongoose from "mongoose";
import appointmentSchema from "../schema/appointmentSchema.js";

const AppointmentModel = mongoose.model("Appointment", appointmentSchema);

export default AppointmentModel;
