import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createDoctor,
  getDoctorById,
  getAllDoctor,
  updateDoctor,
  deleteDoctor,
  getAllDoctorsCount,
} from "../controller/doctorController.js";

const doctorRouter = express.Router();

doctorRouter.post("/create", authMiddleware, (req, res) => {
  createDoctor(req, res);
});

doctorRouter.post("/update/:id", authMiddleware, (req, res) => {
  updateDoctor(req, res);
});

doctorRouter.delete("/delete/:id", authMiddleware, (req, res) => {
  deleteDoctor(req, res);
});

doctorRouter.get("/read/:id", authMiddleware, (req, res) => {
  getDoctorById(req, res);
});

doctorRouter.get("/read", authMiddleware, (req, res) => {
  getAllDoctor(req, res);
});

doctorRouter.get("/counter", authMiddleware, (req, res) => {
  getAllDoctorsCount(req, res);
});

export default doctorRouter;
