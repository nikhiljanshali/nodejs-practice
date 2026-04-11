// routes/appointment.routes.js

import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createAppointment,
  getAllAppointment,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  createAppointmentWithValidation,
} from "../controller/appointmentController.js";

const appointmentRouter = express.Router();

appointmentRouter.post("/create", authMiddleware, (req, res) => {
  createAppointment(req, res);
});

appointmentRouter.post("/createWithValidation", authMiddleware, (req, res) => {
  createAppointmentWithValidation(req, res);
});

appointmentRouter.post("/update/:id", authMiddleware, (req, res) => {
  updateAppointment(req, res);
});

appointmentRouter.delete("/delete/:id", authMiddleware, (req, res) => {
  deleteAppointment(req, res);
});

appointmentRouter.get("/read/:id", authMiddleware, (req, res) => {
  getAppointmentById(req, res);
});

appointmentRouter.get("/read", authMiddleware, (req, res) => {
  getAllAppointment(req, res);
});

appointmentRouter.get("/counter", authMiddleware, (req, res) => {
  getAllPatientsCount(req, res);
});

export default appointmentRouter;
