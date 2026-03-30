import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  const user = ["Nikhil", "Nikita", "Peter", "Anjali", "Apurva"];
  //   let data = user.map((name) => {
  //     return name;
  //   });
  let displayData = `<ul>`;
  for (let i = 0; i < user.length; i++) {
    displayData += `<li><a href="user/${user[i]}">${user[i]}</a></li>`;
    console.log(user[i]);
  }
  displayData += `</ul>`;
  res.send(displayData);
});

app.get("/user/:name", (req, res) => {
  console.log(req.params.name);
  const userName = req.params.name;
  res.send(`This is a page for ${userName}`);
});

app.listen(port, () => {
  console.log("Example app listening on port 3000!");
});
