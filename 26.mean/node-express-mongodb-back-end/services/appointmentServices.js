import AppointmentModel from "../model/appointmentModel.js";
import DoctorModel from "../model/doctorModel.js";

export const createAppointmentWithValidation_Service = async (data) => {
  const { doctor, appointmentDate, startTime, endTime } = data;
  // 1️⃣ Get Doctor
  const doctorData = await DoctorModel.findById(doctor);
  if (!doctorData) {
    throw new Error("Doctor not found");
  }
  // 2️⃣ Get Day from Date
  const day = new Date(appointmentDate).toLocaleString("en-US", {
    weekday: "long",
  });
  // 3️⃣ Check Availability for that day
  const availability = doctorData.availability.find((a) => a.day === day);
  if (!availability) {
    throw new Error(`Doctor not available on ${day}`);
  }
  // 4️⃣ Check Time Range
  if (startTime < availability.from || endTime > availability.to) {
    throw new Error(
      `Doctor available only between ${availability.from} - ${availability.to}`,
    );
  }
  // 5️⃣ Check Overlapping Appointment
  const existing = await AppointmentModel.findOne({
    doctor,
    appointmentDate,
    $or: [
      {
        startTime: { $lt: endTime },
        endTime: { $gt: startTime },
      },
    ],
  });
  if (existing) {
    throw new Error("Time slot already booked");
  }
  // ✅ 6️⃣ Create Appointment
  return await AppointmentModel.create(data);
};

export const createAppointment_Service = async (data) => {
  return await AppointmentModel.create(data);
};

export const getAllAppointments_Service = async () => {
  return await AppointmentModel.find();
  // .populate("patient", "firstName lastName email")
  // .populate("doctor", "firstName lastName specialization")
  // .sort({ appointmentDate: 1 });
};

export const getAppointmentById_Service = async (id) => {
  return await AppointmentModel.findById(id)
    .populate("patient")
    .populate("doctor");
};

export const updateAppointment_Service = async (id, data) => {
  return await AppointmAppointmentModelent.findByIdAndUpdate(id, data, {
    new: true,
  });
};

export const deleteAppointment_Service = async (id) => {
  return await AppointmentModel.findByIdAndDelete(id);
};
