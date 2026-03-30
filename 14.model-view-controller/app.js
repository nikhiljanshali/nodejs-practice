const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/", userRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
