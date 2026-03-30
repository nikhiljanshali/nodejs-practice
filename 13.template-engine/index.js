import express from "express";
import path from "path";
import hbs from "hbs";
import session from "express-session";

const app = express();
const port = 3000;

// ✅ Body parser
app.use(express.urlencoded({ extended: false }));

// ✅ Session (MUST be before routes)
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  }),
);

// ✅ Static files
const publicPath = path.join(process.cwd(), "public");
app.use(express.static(publicPath));

// ✅ Default engine (EJS)
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views/ejs"));

// ✅ Register Handlebars
app.engine("hbs", hbs.__express);

// ----------------------
// 🔐 Auth Middleware
// ----------------------
function checkLogin(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  return res.redirect("/login");
}

// ----------------------
// 🌐 Routes
// ----------------------

// Home (Protected)
app.get("/", checkLogin, (req, res) => {
  res.render("index");
});

// Login Page
app.get("/login", (req, res) => {
  res.render("login");
});

// Login Submit
app.post("/submit-login", (req, res) => {
  const { email, password } = req.body;

  if (email === "sample@test.com" && password === "password") {
    req.session.user = email;
    return res.redirect("/");
  }

  return res.redirect("/login");
});

// Logout (optional)
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

// About (EJS)
app.get("/about", (req, res) => {
  res.render("home", {
    name: "Nikhil",
    age: 25,
    email: "nikhil@example.com",
    skills: ["Angular", "Node.js", "TypeScript", "SAP"],
    projects: [
      { title: "Vendor Portal", description: "SAP integrated system" },
      { title: "AI Dashboard", description: "Analytics + automation" },
    ],
  });
});

// ----------------------
// 📦 PUG Route
// ----------------------
app.get("/view", (req, res) => {
  res.render(path.join(process.cwd(), "views/pug/about.pug"), {
    name: "Nikhil",
    age: 25,
    email: "nikhil@example.com",
    skills: ["Angular", "Node.js", "TypeScript", "SAP"],
  });
});

// ----------------------
// 📦 HANDLEBARS Route
// ----------------------
app.get("/contact", (req, res) => {
  res.render(path.join(process.cwd(), "views/hbs/contact.hbs"), {
    name: "Nikhil",
    email: "nikhil@example.com",
    phone: "+91 1234567890",
    address: "India",
    isActive: true,
    messages: ["Hello!", "Need help with project", "Call me back"],
  });
});

// ----------------------
// 👤 User Forms
// ----------------------
app.get("/add-user", (req, res) => {
  res.render("add-user");
});

app.post("/submit-user", (req, res) => {
  res.render("submit-user", req.body);
});

// Users List
app.get("/users", (req, res) => {
  const users = [
    { name: "Nikhil", email: "nikhil@example.com", age: 25 },
    { name: "John", email: "john@example.com", age: 30 },
    { name: "Jane", email: "jane@example.com", age: 28 },
  ];

  res.render("users", { users });
});

// ----------------------
// ❌ 404 Handler
// ----------------------
app.use((req, res) => {
  res.status(404).sendFile(path.join(process.cwd(), "views/html/404.html"));
});

// ----------------------
// 🚀 Start Server
// ----------------------
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
