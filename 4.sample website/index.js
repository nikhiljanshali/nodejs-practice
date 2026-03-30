const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  console.log("Request received:", req.url);

  let collectHeaderData = fs.readFileSync(
    path.join(__dirname, "html", "header.html"),
    "utf-8",
  );
  let collectFooterData = fs.readFileSync(
    path.join(__dirname, "html", "footer.html"),
    "utf-8",
  );
  if (req.url === "/") {
    const filePath = path.join(__dirname, "html", "home.html");
    fs.readFile(filePath, "utf-8", (error, data) => {
      if (error) {
        console.error("Error reading home.html:", error.message);
        res.writeHead(500, { "Content-Type": "text/html" });
        res.end("<h1>500 - Internal Server Error</h1>");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(collectHeaderData + "" + data + "" + collectFooterData);
    });
  } else if (req.url === "/style.css") {
    const filePath = path.join(__dirname, "html", "style.css");
    fs.readFile(filePath, "utf-8", (error, data) => {
      if (error) {
        console.error("Error reading style.css:", error.message);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("CSS not found");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/css" });
      res.end(data);
    });
  } else if (req.url == "/forms") {
    const filePath = path.join(__dirname, "html", "form.html");
    fs.readFile(filePath, "utf-8", (error, data) => {
      if (error) {
        console.error("Error reading home.html:", error.message);
        res.writeHead(500, { "Content-Type": "text/html" });
        res.end("<h1>500 - Internal Server Error</h1>");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>404 - Page Not Found</h1>");
  }
});

server.listen(3200, () => {
  console.log("Server running at http://localhost:3200/");
  console.log("Visit: http://localhost:3200/home");
});
