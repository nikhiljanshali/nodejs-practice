import {
  createPatient_Service,
  getAllPatient_Service,
  getPatientById_Service,
  updatePatient_Service,
  deletePatient_Service,
  getAllPatientsCount_Services,
} from "../services/patientServices.js";

const createPatient = async (req, res) => {
  try {
    const result = await createPatient_Service({
      ...req.body,
      userId: req.user.id,
    });

    res.json({
      message: "Patient created successfully",
      status: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating patient",
      status: false,
      error: error.message,
    });
  }
};

const getAllPatients = async (req, res) => {
  try {
    const result = await getAllPatient_Service(req.user.id);
    res.json({
      message: "Patient retrieved successfully......",
      status: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving patient",
      status: false,
      error: error.message,
    });
  }
};

const getPatientById = async (req, res) => {
  try {
    const result = await getPatientById_Service(req.params.id);
    if (result) {
      res.json({
        message: "Patient by id  retrieved successfully",
        status: true,
        data: result,
      });
    } else {
      res.status(404).json({ message: "Patient not found", status: false });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving Patient",
      status: false,
      error: error.message,
    });
  }
};

const updatePatient = async (req, res) => {
  try {
    const result = await updatePatient_Service(
      req.params.id,
      req.body,
    );
    if (result) {
      res.json({
        message: "Patient updated successfully",
        status: true,
        data: result,
      });
    } else {
      res.status(404).json({ message: "Patient not found", status: false });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error updating patient",
      status: false,
      error: error.message,
    });
  }
};

const deletePatient = async (req, res) => {
  try {
    const result = await deletePatient_Service(req.params.id, req.user.id);
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

const getAllPatientsCount = async (req, res) => {
  try {
    const result = await getAllPatientsCount_Services(req.user.id);
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
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient,
  getAllPatientsCount,
};
