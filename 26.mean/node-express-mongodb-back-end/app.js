import express from "express";
import todoRouter from "./routes/route.js";
import authRouter from "./routes/authRoute.js";
import patientRouter from "./routes/patientRoute.js";
import connectDB from "./database.js";
import doctorRouter from "./routes/doctorRoute.js";
import appointmentRouter from "./routes/appointmentRoute.js";
import commonRouter from "./routes/commonRouter.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;
const middlePoint = "/api/v1";

/** Middleware */
app.use(cors());
app.use(express.json());
app.use(`${middlePoint}/auth`, authRouter);
app.use(`${middlePoint}/todos`, todoRouter);
app.use(`${middlePoint}/patient`, patientRouter);
app.use(`${middlePoint}/doctor`, doctorRouter);
app.use(`${middlePoint}/appointment`, appointmentRouter);
app.use(`${middlePoint}/common`, commonRouter);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
