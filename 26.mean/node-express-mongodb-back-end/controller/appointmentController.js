import {
  createAppointment_Service,
  getAllAppointments_Service,
  getAppointmentById_Service,
  updateAppointment_Service,
  deleteAppointment_Service,
  createAppointmentWithValidation_Service,
} from "../services/appointmentServices.js";

export const createAppointment = async (req, res) => {
  try {
    const result = await createAppointment_Service({
      ...req.body,
      userId: req.user.id,
    });

    res.json({
      message: "Appointment created successfully",
      status: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating Appointment",
      status: false,
      error: error.message,
    });
  }
};

export const createAppointmentWithValidation = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      userId: req.user?.id || null,
    };

    const result = await createAppointmentWithValidation_Service(payload);

    return res.status(201).json({
      message: "Appointment created successfully",
      status: true,
      data: result,
    });
  } catch (error) {
    console.error("Create Appointment Error:", error.message);

    // 🔥 Handle known validation errors (from service)
    const validationErrors = [
      "Doctor not found",
      "Doctor not available",
      "Time slot already booked",
    ];

    const isValidationError = validationErrors.some((msg) =>
      error.message.includes(msg),
    );

    return res.status(isValidationError ? 400 : 500).json({
      message: error.message || "Error creating appointment",
      status: false,
    });
  }
};

export const getAllAppointment = async (req, res) => {
  try {
    const result = await getAllAppointments_Service(req.user.id);
    console.log(result);
    res.json({
      message: "Appointment retrieved successfully......",
      status: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving Appointment",
      status: false,
      error: error.message,
    });
  }
};

export const getAppointmentById = async (req, res) => {
  //   try {
  //     const appointment = await getAppointmentById_Service(req.params.id);
  //     if (!appointment) {
  //       return res.status(404).json({ message: "Not found" });
  //     }
  //     res.json({ success: true, data: appointment });
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
  try {
    const result = await getAppointmentById_Service(req.params.id);
    if (result) {
      res.json({
        message: "Appointment by id  retrieved successfully",
        status: true,
        data: result,
      });
    } else {
      res.status(404).json({ message: "Appointment not found", status: false });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving Appointment",
      status: false,
      error: error.message,
    });
  }
};

export const updateAppointment = async (req, res) => {
  //   try {
  //     const appointment = await updateAppointment_Service(
  //       req.params.id,
  //       req.body,
  //     );

  //     res.json({ success: true, data: appointment });
  //   } catch (error) {
  //     res.status(400).json({ message: error.message });
  //   }
  try {
    const result = await updateAppointment_Service(req.params.id, req.body);
    if (result) {
      res.json({
        message: "Appointment updated successfully",
        status: true,
        data: result,
      });
    } else {
      res.status(404).json({ message: "Appointment not found", status: false });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error updating Appointment",
      status: false,
      error: error.message,
    });
  }
};

export const deleteAppointment = async (req, res) => {
  //   try {
  //     await deleteAppointment_Service(req.params.id);
  //     res.json({ success: true, message: "Deleted successfully" });
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
  try {
    const result = await deleteAppointment_Service(req.params.id, req.user.id);
    if (result) {
      res.json({
        message: "Appointment deleted successfully",
        status: true,
        data: result,
      });
    } else {
      res.status(404).json({ message: "Appointment not found", status: false });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error deleting Appointment",
      status: false,
      error: error.message,
    });
  }
};
