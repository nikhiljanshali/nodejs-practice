const http = require("http");
const userForm = require("./userform");
const userDataSubmit = require("./userDataSubmit");
http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    if (req.url == "/") {
      userForm(req, res);
    } else if (req.url == "/submit") {
      //   res.end("Form submitted successfully");
      userDataSubmit(req, res);
    } else {
      res.end("404 Not Found");
    }
    res.end();
  })
  .listen(3200);
