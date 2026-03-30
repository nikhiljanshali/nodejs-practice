const http = require("http");
var arg = process.argv;
const port = arg[2];
console.log(arg[2]);
const server = http.createServer((req, res) => {
  res.write("Testing input from CMD");
  //   res.end("Hello World\n");
});

server.listen(port, () => {
  console.log("Server is running");
});
