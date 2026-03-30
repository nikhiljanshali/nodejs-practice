import express from "express";
import path from "path";

const app = express();
const port = 3000;
const absPath = path.resolve("views");
const publicPath = path.resolve("public");
console.log(publicPath);

app.use(express.static(publicPath));

app.get("/", (req, res) => {
  res.sendFile(absPath + "/home.html");
});

app.get("/login", (req, res) => {
  res.sendFile(absPath + "/login.html");
});

app.get("/about", (req, res) => {
  res.sendFile(absPath + "/about.html");
});

app.get("/forget-password", (req, res) => {
  res.sendFile(absPath + "/forget-password.html");
});

app.use((req, res) => {
  res.status(404).sendFile(path.resolve("views/404.html"));
});

// app.get("*", (req, res) => {
//   const absPath = path.resolve("views/404.html");
//   console.log(absPath);
//   res.sendFile(absPath);
// });

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
