import express from "express";
import multer from "multer";
import fs from "fs";

const app = express();


// ✅ Ensure uploads folder exists
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// const upload = multer({ dest: "uploads/" });
const  storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });


app.get("/", (req, res) => {
  res.send(`
    <form action="/file-upload" method="post" enctype="multipart/form-data">
        <label>File Upload:</label>
        <input type="file" name="file" required />
        <button type="submit">Upload File</button>
    </form>
  `);
});

app.post("/file-upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }

  console.log(req.file);

  res.send({
    message: "File uploaded successfully!",
    fileName: req.file.originalname,
    storedName: req.file.filename,
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
