const http = require("http");
const fs = require("fs");

// fs.writeFileSync("files/append.txt", "This is a fruit!");
// fs.unlinkSync("files/append.txt");

// const data = fs.readFileSync("files/append.txt", "utf-8");
// console.log(data);

// fs.appendFileSync("files/append.txt", " and This is a fruit!");

console.log(process.argv[2]);

const operation = process.argv[2];
const fileName = process.argv[3];
const content = process.argv[4];
const fullname = "files/" + fileName + ".txt";

if (operation === "create") {
  fs.writeFileSync(fullname, content);
  console.log("File created successfully!");
} else if (operation === "read") {
  const data = fs.readFileSync(fullname, "utf-8");
  console.log(data);
} else if (operation === "update") {
  fs.appendFileSync(fullname, content);
  console.log("File updated successfully!");
} else if (operation === "delete") {
  fs.unlinkSync(fullname);
  console.log("File deleted successfully!");
} else {
  console.log("Invalid operation");
}

// const server = http.createServer((req, res) => {
//   if (req.url === "/create") {
//     fs.writeFile("example.txt", "Hello, World!", (err) => {
//       if (err) throw err;
//       res.end("File created successfully!");
//     });
//   } else if (req.url === "/read") {
//     fs.readFile("example.txt", "utf8", (err, data) => {
//       if (err) throw err;
//       res.end(data);
//     });
//   } else if (req.url === "/update") {
//     fs.appendFile("example.txt", "\nAppended text", (err) => {
//       if (err) throw err;
//       res.end("File updated successfully!");
//     });
//   } else if (req.url === "/delete") {
//     fs.unlink("example.txt", (err) => {
//       if (err) throw err;
//       res.end("File deleted successfully!");
//     });
//   } else {
//     res.end("Invalid request");
//   }
// });

// server.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });
