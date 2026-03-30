import express from "express";
const app = express();

/**Way 1 */
// function checkRoute(req, res, next) {
//   console.log("checkRoute", req.url, "Page");
//   next();
// }
// app.use(checkRoute);

/**
 * Way 2
 */
app.use((req, res, next) => {
  console.log("Middleware 1", req.url, "Page");
  next();
});

app.get("/", (req, res) => {
  res.send("Home Page!");
});

app.get("/users", (req, res) => {
  res.send("Users Page!");
});

app.get("/products", (req, res) => {
  res.send("Products Page!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
