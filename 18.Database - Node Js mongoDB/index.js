import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import path from "path";

const dbName = "college";
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Static files
const publicPath = path.join(process.cwd(), "public");
app.use(express.static(publicPath));

// ✅ Default engine (EJS)
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views/ejs"));

// ✅ Middleware to parse URL-encoded data (for form submissions)
app.use(express.urlencoded({ extended: true }));

// ✅ Middleware to parse JSON data (for API requests)
app.use(express.json()); // ✅ Middleware to parse JSON data (for API requests)

let db;

// async function connectToDatabase() {
//   await client.connect();
//   const db = client.db(dbName);
//   const collection = db.collection("students");
//   const restult = await collection.find().toArray();
//   console.log(restult);
//   //   return { db, collection };
// }
// connectToDatabase();

/**
 * Advance way to connect to database and fetch data from collection and render it on the page using ejs template engine
 */

client
  .connect()
  .then((connection) => {
    const db = connection.db(dbName);
    app.get("/api", async (req, res) => {
      const collection = db.collection("students");
      const students = await collection.find().toArray();
      res.send(students);
    });

    app.get("/ui", async (req, res) => {
      const collection = db.collection("students");
      const students = await collection.find().toArray();
      // res.send(students);
      res.render("students", { users: students });
    });

    //   app.get("/add", (req, res) => {
    //     res.send(`
    //     <h1>Adding New Student</h1>
    //     <form method="post" action="/add-student" style="display:flex;flex-direction:column;width:300px;">
    //       <input type="text" name="name" placeholder="Name" required />
    //       <input type="number" name="age" placeholder="Age" required />
    //       <input type="email" name="email" placeholder="Email" required />
    //       <button type="submit">Add Student</button>
    //     </form>
    //   `);
    //   });

    app.get("/ui/add-student", (req, res) => {
      res.render("add-students");
    });

    app.post("/add-student", async (req, res) => {
      console.log(req.body); // ✅ now you’ll get data

      // Example output:
      // { name: 'Nikhil', age: '28', email: 'test@test.com' }
      const collection = db.collection("students");
      const result = collection.insertOne({
        name: req.body.name,
        age: parseInt(req.body.age), // Convert age to a number
        email: req.body.email,
      });
      res.redirect("/ui");

      res.send("Student added successfully!", result);
    });

    app.post("/add-student-api", async (req, res) => {
      const { name, age, email } = req.body;
      if (name && age && email) {
        const collection = db.collection("students");
        const result = await collection.insertOne(req.body);
        res.send({ message: req.body.name + " added successfully!", result });
      } else {
        res
          .status(400)
          .send({ message: "Name, age and email are required fields." });
      }
    });

    app.delete("/delete-student-api/:id", async (req, res) => {
      console.log(req.params.id); // ✅ now you’ll get id of the student to be deleted
      const collection = db.collection("students");
      const result = await collection.deleteOne({
        _id: new ObjectId(req.params.id),
      });
      if (result) {
        res.send({ message: "Student deleted successfully!", result });
      } else {
        res.status(404).send({ message: "Student not found!" });
      }
    });

    app.get("/ui/delete-student-api/:id", async (req, res) => {
      console.log("Test Delete");
      console.log(req.params.id); // ✅ now you’ll get id of the student to be deleted
      const collection = db.collection("students");
      const result = await collection.deleteOne({
        _id: new ObjectId(req.params.id),
      });
      if (result) {
        res.render("message", { name: "Student deleted successfully!" });
        // res.send(
        //   "<h1></h1>Student deleted successfully!</h1><a href='/ui'>Go Back</a>",
        // );
      } else {
        res.render("404");
        // res
        //   .status(404)
        //   .send("<h1>Student not found!</h1><a href='/ui'>Go Back</a>");
      }
    });

    app.get("/ui/update-student-api/:id", async (req, res) => {
      const collection = db.collection("students");
      const student = await collection.findOne({
        _id: new ObjectId(req.params.id),
      });
      //   res.send(student);
      if (student) {
        res.render("update-student", { student });
      } else {
        res.render("404");
      }
    });

    app.get("/update-student-api/:id", async (req, res) => {
      const collection = db.collection("students");
      const student = await collection.findOne({
        _id: new ObjectId(req.params.id),
      });
      res.send({
        message: "Student data fetched successfully!",
        success: true,
        student,
      });
    });

    app.post("/ui/update-student", async (req, res) => {
      try {
        const { id, name, age, email } = req.body;
        // ✅ Validation
        if (!id || !name || !age || !email) {
          return res.status(400).send({
            message: "ID, name, age and email are required fields.",
          });
        }
        if (!ObjectId.isValid(id)) {
          return res.status(400).send({ message: "Invalid ID" });
        }
        const collection = db.collection("students");
        const result = await collection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { name, age: Number(age), email } },
        );
        if (result.matchedCount === 0) {
          return res.status(404).send({ message: "Student not found" });
        }
        // ✅ Better UX
        res.redirect("/ui");
      } catch (err) {
        console.error(err);
        res.status(500).send("Error updating student");
      }
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1); // Exit the application if the database connection fails
  });
/**
 * basic way to connect to database and fetch data from collection and render it on the page using ejs template engine
 */
// app.get("/", async (req, res) => {
//   await client.connect();
//   const db = client.db(dbName);
//   const collection = db.collection("students");
//   const users = await collection.find().toArray();
//   console.log(users);
//   //   res.send("Data Will Be Rendered Here");
//   res.render("students", { users });
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
