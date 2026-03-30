import express from "express";

import userData from "./json/user.json" with { type: "json" };

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  console.log(userData);
  res.send(userData);
});

app.get("/:id", (req, res) => {
  const id = req.params.id;
  const user = userData.users.find((user) => user.id === parseInt(id));
  res.send(user);
});

app.get("/:name", (req, res) => {
  const name = req.params.name;
  const user = userData.users.find(
    (user) => user.name.toLowerCase() === name.toLowerCase(),
  );
  res.send(user);
});

app.get("/:city", (req, res) => {
  const city = req.params.city;
  const user = userData.users.find(
    (user) => user.city.toLowerCase() === city.toLowerCase(),
  );
  res.send(user);
});

app.listen(port, () => {
  console.log("Example app listening on port 3000!");
});
