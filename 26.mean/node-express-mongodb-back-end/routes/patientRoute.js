import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient,
  getAllPatientsCount
} from "../controller/patientController.js";

const patientRouter = express.Router();

patientRouter.post("/create", authMiddleware, (req, res) => {
  createPatient(req, res);
});

patientRouter.post("/update/:id", authMiddleware, (req, res) => {
  updatePatient(req, res);
});

patientRouter.delete("/delete/:id", authMiddleware, (req, res) => {
  deletePatient(req, res);
});

patientRouter.get("/read/:id", authMiddleware, (req, res) => {
  getPatientById(req, res);
});

patientRouter.get("/read", authMiddleware, (req, res) => {
  getAllPatients(req, res);
});

patientRouter.get("/counter", authMiddleware, (req, res) => {
  getAllPatientsCount(req, res);
});

export default patientRouter;
