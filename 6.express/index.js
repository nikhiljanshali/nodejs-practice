/**
 * vanilla javascript syntext
 */
// const express = require("express");
// const app = express(); // use of express
// const express = require("express")();

/**
 * ecmascript syntext
 */
import express from "express";
const app = express(); // use of express

// import { home } from "./pages/home.js";
// import { about } from "./pages/about.js";
// import { contact } from "./pages/contact.js";
import { home, about, contact } from "./pages/common.js";

const PORT = 3400;
// console.log(app);

app.get("", (req, res) => {
  //   res.send("<h1>Hello World!</h1>");
  res.send(home());
});

app.get("/about", (req, res) => {
  //   res.send("<h2>About Page</h2>");
  res.send(about());
});

app.get("/contact", (req, res) => {
  //   res.send("<h2>Contact Page</h2>");
  res.send(contact());
});

app.get("", (req, res) => {
  res.send("<h2>Temp Page</h2>");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
