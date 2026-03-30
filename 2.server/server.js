const http = require("http");
// http.createServer().listen(4800);

/**
 * server 1
 */
http
  .createServer((req, res) => {
    res.write("This is Nikhil Janshali" + "\n");
    // res.end("Welcome to our home page");
    res.end(`
        <h1>Oops, Nikhil!</h1>
        <p>We can't seem to find the page you are looking for</p>
        <a href="/">back home</a>
        `);
  })
  .listen(4800);

/**
 * server 2
 */
http
  .createServer((req, res) => {
    res.write("This is Nikhil Janshali" + "\n");
    res.end("Welcome to our home page");
  })
  .listen(4900);
/**
 * Yes, we can create a more than one server in a single file only where port number are different.
 */


/**
 * sever 3
 */
const server = http.createServer((req, res) => {
  if (req.url === "/home") {
    res.end("Welcome to our home page");
  }
  if (req.url === "/about") {
    res.end("Here is our short history");
  }
  res.end(`
    <h1>Oops, Nikhil !</h1>
    <p>We can't seem to find the page you are looking for</p>
    <a href="/">back home</a>
    `);
});

server.listen(5100);
