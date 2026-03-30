import express from "express";
import { home } from "./pages/home.js";
import { login } from "./pages/login.js";
import { submit } from "./pages/submit.js";
const app = express();

app.get("/", (req, res) => {
  //   res.send("<h1>Hello World!</h1>!");
  res.send(home());
});

app.get("/login", (req, res) => {
  //   res.send(`
  //     <form action="/submit" method="post">
  //       <input type="text" name="username" placeholder="username" />
  //       <input type="password" name="password" placeholder="password" />
  //       <button type="submit">Submit</button>
  //     </form>
  //     `);
  res.send(login());
});

app.post("/submit", (req, res) => {
  //   res.send("Submitted Successfuly!");
  res.send(submit());
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
