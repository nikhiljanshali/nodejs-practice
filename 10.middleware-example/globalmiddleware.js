import expresss from "express";
const app = expresss();

/**
 * Global / Application Middleware example 1
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
// function ageCheck(req, res, next) {
//   if (req.query.age >= 18) {
//     next();
//   } else {
//     res.send("You are not eligible to access this page");
//   }
// }
// app.use(ageCheck);

/**
 * Global/ Application Middleware example 2
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
function ipCheck(req, res, next) {
  let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  if (ip.includes(",")) {
    ip = ip.split(",")[0].trim();
  }
  console.log("Client IP:", ip);
  // Allowed IPs
  const allowedIPs = ["127.0.0.1", "::1", "::ffff:127.0.0.1"];
  if (allowedIPs.includes(ip)) {
    return next();
  }
  return res.status(403).send("You are not eligible to access this page");
}
app.use(ipCheck);

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/about", (req, res) => {
  res.send("About Page");
});

app.get("/contact", (req, res) => {
  res.send("Contact Page");
});

app.get("/help", (req, res) => {
  res.send("help Page");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
