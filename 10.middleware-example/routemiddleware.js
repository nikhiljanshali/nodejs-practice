import expresss from "express";
const app = expresss();

function checkAgeRouteMiddleware(req, res, next) {
  const age = Number(req.query.age);
  console.log("Age:", age);
  // Check if age is missing or invalid
  if (!age || isNaN(age)) {
    return res.status(400).send("Age is required and must be a number");
  }
  // Check age condition
  if (age < 18) {
    return res.status(403).send("You are not eligible to access this page");
  }
  console.log("You are eligible to access this page");
  next();
}

function checkUrlMiddleware(req, res, next) {
  const number = req.query.number;

  if (req.path === "/contact" && /^\d{10}$/.test(number)) {
    return next();
  }

  return res.status(403).send("You are not eligible to access this page");
}

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/about", checkAgeRouteMiddleware, (req, res) => {
  res.send("About Page");
});

app.get("/contact", checkUrlMiddleware, (req, res) => {
  res.send("Contact Page");
});

app.get("/help", (req, res) => {
  res.send("help Page");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
