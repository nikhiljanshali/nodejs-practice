import express from "express";
import morgan from "morgan";

const app = express();
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  res.send("Users World!");
});

app.get("/wait", (req, res) => {
  setTimeout(() => {
    res.send("result after 1 min");
  }, 1000);
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
