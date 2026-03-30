const http = require("http");

server = http.createServer((req, res) => {
  //   console.log(req.url);
  //   console.log(req.headers);
  //   console.log(req.method);
  //   console.log(req.httpVersion);
  if (req.url == "/about") {
    res.write("<h1>About Page</h1>" + "\n");
    // res.end("");
  } else if (req.url == "/contact") {
    res.write("<h1>Contact Page</h1>" + "\n");
    // res.end("");
  } else {
    res.write("<h1>Home Page</h1>" + "\n");
    // res.end("");
  }
  res.write("<h1>Hello, Nikhil Janshali</h1>Hello" + "\n");
  res.end("");
});
server.listen(5600);
