const http = require("http");
const fs = require("fs");
const qs = require("querystring");

// http
//   .createServer((req, res) => {
//     res.writeHead(200, { "Content-Type": "text/html" });
//     console.log(req.url);
//     if (req.url === "/") {
//       res.write(
//         `
//             <form action="/submit" method="post">
//             <label for="fname">First name:</label>
//             <input type="text" id="fname" name="fname"><br><br>
//             <label for="lname">Last name:</label>
//             <input type="text" id="lname" name="lname"><br><br>
//             <label for="lname">Email:</label>
//             <input type="text" id="email" name="email"><br><br>
//             <button type="submit">Submit</button
//             </form>
//             `,
//       );
//     } else if (req.url === "/submit") {
//       res.write("<h1>Form submitted successfully</h1>");
//     } else {
//       res.write("Page not found");
//     }
//     res.end("Welcome to our home page");
//   })
//   .listen(4800);

http
  .createServer((req, res) => {
    fs.readFile("html/form.html", "utf8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html" });

      if (req.url === "/") {
        res.write(data);
        res.end();
      } else if (req.url === "/submit") {
        let dataBody = [];

        req.on("data", (chunk) => {
          dataBody.push(chunk);
        });

        req.on("end", () => {
          let rawdata = Buffer.concat(dataBody).toString();
          let parsedData = qs.parse(rawdata);
          console.log(parsedData);
          let dataString =
            "My Name is " +
            parsedData.firstname +
            " " +
            parsedData.lastname +
            " and my email is " +
            parsedData.email +
            ".";
          console.log(dataString);
          /**
           * sync way file creation
           */
            fs.writeFileSync(
              "textFiles/" + parsedData.firstname + ".txt",
              dataString,
            );
            console.log("!File Created!");

          /**
           * async way file creation
           */

          fs.writeFile(
            "textFiles/" +
              parsedData.firstname +
              "-" +
              parsedData.lastname +
              ".txt",
            dataString,
            (err) => {
              if (err) {
                console.log(err);
              } else {
                console.log("File Created!!");
              }
            },
          );

          // ✅ Display submitted data here inside end callback
          res.write(
            `
            <h1>Form Submitted Successfully!</h1>
            <h3>Here is what you submitted:</h3>
            <table border="1" cellpadding="8" cellspacing="0">
            <tr><th>Field</th><th>Value</th></tr>
            ${Object.entries(parsedData)
              .map(
                ([key, value]) => `<tr><td>${key}</td><td>${value}</td></tr>`,
              )
              .join("")}
            </table>
            <br/>
            <a href="/">Go Back</a>
            `,
          );
          res.end(); // ✅ end inside the callback
        });
      } else {
        res.write("Page not found");
        res.end();
      }
    });
  })
  .listen(4800);

console.log("Server is running on port 4800");
