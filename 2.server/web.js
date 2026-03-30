const http = require("http");
const fs = require("fs");

http
  .createServer((req, res) => {
    fs.readFile("html/web.html", "utf8", (err, data) => {
      if (err) {
        res.writable("internal server error");
        res.end();
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  })
  .listen(5600, () => {
    console.log("Server is running on port 5600");
  });
