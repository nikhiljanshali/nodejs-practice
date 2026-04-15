import DoctorModel from "../model/doctorModel.js";
import AppointmentModel from "../model/appointmentModel.js";
import PatientModel from "../model/patientModel.js";
import TodoModel from "../model/todoModel.js";

export const getAllCommonCounter_Service = async () => {
  const totalPatients = await PatientModel.countDocuments();
  const totalDoctors = await DoctorModel.countDocuments();
  const totalAppointments = await AppointmentModel.countDocuments();
  const appointments = await AppointmentModel.find();
  const todos = await TodoModel.find();

  const appointmentCountMap = {};

  appointments.forEach((appointment) => {
    if (!appointmentCountMap[appointment.status]) {
      appointmentCountMap[appointment.status] = 0;
    }
    appointmentCountMap[appointment.status]++;
  });

  const appointmentCount = Object.keys(appointmentCountMap).map((status) => ({
    status,
    count: appointmentCountMap[status],
  }));

  const counts = {
    total: todos.length,
    scheduled: 0,
    completed: 0,
    cancelled: 0,
    noshow: 0,
  };

  todos.forEach((todo) => {
    switch (todo.status) {
      case "pending":
        counts.pending++;
        break;
      case "in-progress":
        counts.inProgress++;
        break;
      case "completed":
        counts.completed++;
        break;
      case "cancelled":
        counts.cancelled++;
        break;
    }
  });

  const doctorRatingCount = await DoctorModel.aggregate([
    {
      $group: {
        _id: {
          $switch: {
            branches: [
              { case: { $lte: ["$rating", 1] }, then: "0-1" },
              { case: { $lte: ["$rating", 2] }, then: "1-2" },
              { case: { $lte: ["$rating", 3] }, then: "2-3" },
              { case: { $lte: ["$rating", 4] }, then: "3-4" },
              { case: { $lte: ["$rating", 5] }, then: "4-5" },
            ],
            default: "unknown",
          },
        },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        ratingRange: "$_id",
        count: 1,
        _id: 0,
      },
    },
    { $sort: { ratingRange: 1 } },
  ]);

  return {
    todoCounts: counts,
    totalPatients,
    totalDoctors,
    appointmentCount,
    doctorRatingCount,
    totalAppointments,
  };
};

export const createAndBook_Service = async (data) => {
  const patient = new PatientModel(data.patient);
  const savedPatient = await patient.save();

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
