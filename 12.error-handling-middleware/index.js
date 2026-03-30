import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Home Page!");
});

app.get("/about", (req, res) => {
  res.send("About Page!");
});

app.get("/error", (req, res, next) => {
  const err = new Error("Something went wrong!");
  err.status = 404;
  next(err);
});

// 404 handler (optional but recommended)
app.use((req, res) => {
  res.status(404).send("Page not found!");
});

// Error handler middleware
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Something broke!");
}

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
