import mongoose from "mongoose";
import express from "express";
import studentModel from "./model/studentModel.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

await mongoose
  .connect("mongodb://localhost:27017/college")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.get("/", async (req, res) => {
  const students = await studentModel.find();
  res.send(students);
});

app.post("/add-student", async (req, res) => {
  const newStudent = new studentModel(req.body);
  const { name, age, email } = req.body;

  if (!name || !age || !email) {
    return res.status(400).send({
      message: "Name, age, and email are required",
    });
  }
  await newStudent.save();
  res.send({
    message: "Student created successfully",
    success: true,
    student: newStudent,
  });
});

app.post("/update-student/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStudent = await studentModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedStudent) {
      return res.status(404).send({
        message: "Student not found",
      });
    }

    res.send({
      message: "Student updated successfully",
      success: true,
      student: updatedStudent,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating student");
  }
});

app.delete("/delete-student/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStudent = await studentModel.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).send({
        message: "Student not found",
      });
    }

    res.send({
      message: "Student deleted successfully",
      success: true,
      student: deletedStudent,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting student");
  }
});

app.get("/get-student/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const student = await studentModel.findById(id);

    if (!student) {
      return res.status(404).send({
        message: "Student not found",
      });
    }
    res.send({
      message: "Student retrieved successfully",
      success: true,
      student,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving student");
  }
});

app.get("/get-students", async (req, res) => {
  try {
    const students = await studentModel.find();
    res.send({
      message: "Students retrieved successfully",
      success: true,
      students,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving students");
  }
});

app.get("/get-students/:age", async (req, res) => {
  try {
    const { age } = req.params;
    const students = await studentModel.find({ age: Number(age) });
    res.send({
      message: "Students retrieved successfully",
      success: true,
      students,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving students");
  }
});

app.get("/find-students/:value", async (req, res) => {
  try {
    const { value } = req.params;
    const students = await studentModel.find({
      $or: [
        { name: { $regex: value, $options: "i" } },
        { email: { $regex: value, $options: "i" } },
      ],
    });
    res.send({
      message: `Students retrieved successfully (${students.length})`,
      success: true,
      students,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving students");
  }
});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});

// async function connectDB() {
//   mongoose
//     .connect("mongodb://localhost:27017/college")
//     .then(() => console.log("Connected to MongoDB"))
//     .catch((err) => console.error("Error connecting to MongoDB:", err));

//   const departmentSchema = new mongoose.Schema({
//     name: String,
//     head: String,
//     established: Number,
//     yearsOfOperation: Number,
//   });

//   const Department = mongoose.model("Department", departmentSchema);

//   const newDepartment = new Department({
//     name: "Computer Science",
//     head: "Dr. Smith",
//     established: 1990,
//     yearsOfOperation: 34,
//   });

//   const studentSchema = new mongoose.Schema({
//     name: String,
//     age: Number,
//     email: String,
//   });

//   const Student = mongoose.model("Student", studentSchema);
//   const result = await Student.find();
//   console.log(result);

//   await newDepartment.save();
// }

// await connectDB();
