import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getAllCommonCounter,
  createAndBook,
} from "../controller/commonController.js";

const commonRouter = express.Router();

commonRouter.get("/read", authMiddleware, (req, res) => {
  getAllCommonCounter(req, res);
});

commonRouter.post("/createAndBook", authMiddleware, (req, res) => {
  createAndBook(req, res);
});

export default commonRouter;
