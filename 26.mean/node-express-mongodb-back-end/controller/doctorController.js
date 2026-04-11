import {
  createDoctor_Service,
  getAllDoctor_Service,
  getDoctorById_Service,
  updateDoctor_Service,
  deleteDoctor_Service,
  getAllDoctorCount_Services,
} from "../services/doctorServices.js";

const createDoctor = async (req, res) => {
  try {
    const result = await createDoctor_Service({
      ...req.body,
      userId: req.user.id,
    });

    res.json({
      message: "Doctor created successfully",
      status: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating Doctor",
      status: false,
      error: error.message,
    });
  }
};

const getAllDoctor = async (req, res) => {
  try {
    const result = await getAllDoctor_Service(req.user.id);
    res.json({
      message: "Doctor retrieved successfully......",
      status: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving Doctor",
      status: false,
      error: error.message,
    });
  }
};

const getDoctorById = async (req, res) => {
  try {
    const result = await getDoctorById_Service(req.params.id);
    if (result) {
      res.json({
        message: "Doctor by id  retrieved successfully",
        status: true,
        data: result,
      });
    } else {
      res.status(404).json({ message: "Doctor not found", status: false });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving Doctor",
      status: false,
      error: error.message,
    });
  }
};

const updateDoctor = async (req, res) => {
  try {
    const result = await updateDoctor_Service(req.params.id, req.body);
    if (result) {
      res.json({
        message: "Doctor updated successfully",
        status: true,
        data: result,
      });
    } else {
      res.status(404).json({ message: "Doctor not found", status: false });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error updating Doctor",
      status: false,
      error: error.message,
    });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const result = await deleteDoctor_Service(req.params.id, req.user.id);
    if (result) {
      res.json({
        message: "Patient deleted successfully",
        status: true,
        data: result,
      });
    } else {
      res.status(404).json({ message: "Patient not found", status: false });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error deleting Patient",
      status: false,
      error: error.message,
    });
  }
};

const getAllDoctorsCount = async (req, res) => {
  try {
    const result = await getAllDoctorCount_Services(req.user.id);
    res.json({
      message: "Patient counter retrieved successfully",
      status: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving Patient",
      status: false,
      error: error.message,
    });
  }
};

export {
  createDoctor,
  getDoctorById,
  getAllDoctor,
  updateDoctor,
  deleteDoctor,
  getAllDoctorsCount,
};
