const http = require("http");

const age = 29;

http
  .createServer((req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.write(
      `
        <html>
        <head></head>
        <title>Node Js Tutorial Step By Step</title>
        <body>
            <h1>Hello, Nikhil Janshali</h1>
            <p>This is a paragraph</p>
            <p>This is another paragraph</p>                        
            <p>Age: ${age}</p>
            <p>` +new Date() +`</p>
        </body>
        </html>
        `,
    );
    res.end();
    process.exit();
  })
  .listen(5200);
