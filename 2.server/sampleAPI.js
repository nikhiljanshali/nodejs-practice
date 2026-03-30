const http = require("http");

const usersData = [
  { name: "Nikhil Janshali", age: 39, email: "nikhil@gmail.com" },
  { name: "Apurva Janshali", age: 38, email: "apurva@gmail.com" },
  { name: "Anju Janshali", age: 35, email: "anju@gmail.com" },
];

http
  .createServer((req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(usersData));
    res.end();
  })
  .listen(3000);

console.log("Server running at http://localhost:3000/");
