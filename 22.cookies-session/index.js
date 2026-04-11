import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  }),
);

// app.get("/", (req, res) => {
//   // const cookiesData = req.get("Cookie");
//   // console.log("Cookies:", cookiesData);
//   // if (!cookiesData) {
//   //   return res.render("home", {
//   //     cookies: null,
//   //   });
//   // }
//   // console.log("Cookies:", cookiesData.split("=").map((cookie) => cookie.trim())[1].split(";")[0]);
//   const cookieUserName = req.cookies.username;
//   console.log("Session username:", cookieUserName);
//   const sessionUserName = req.session.username;
//   console.log("Cookie username:", sessionUserName);
//   if (!sessionUserName) {
//     return res.render("home", {
//       cookieUserName: cookieUserName,
//       sessionUserName: sessionUserName,
//     });
//   }

//   // res.render("home", {
//   //   cookies: cookiesData
//   //     .split("=")
//   //     .map((cookie) => cookie.trim())[1]
//   //     .split(";")[0],
//   //   username: username,
//   // });
// });

app.get("/", (req, res) => {
  const cookieUserName = req.cookies.username;
  const sessionUserName = req.session.username;

  console.log("Cookie username:", cookieUserName);
  console.log("Session username:", sessionUserName);

  res.render("home", {
    cookieUserName,
    sessionUserName,
  });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/profile", (req, res) => {
  const { username, password } = req.body;

  // Set cookie
  res.cookie("username", username); // ✅ better than setHeader

  // Set session
  req.session.username = username;
  req.session.password = password;

  res.render("profile"); // ✅ important
});
// app.post("/profile", (req, res) => {
//   /**
//    * Set a cookie named "username" with the value from the request body.
//    * This cookie will be sent to the client and stored in the browser.
//    * When the client makes subsequent requests, it will include this
//    * cookie in the request headers, allowing the server to identify the
//    * user and provide personalized content based on the username stored in the cookie.
//    */
//   res.setHeader("Set-Cookie", "username=" + req.body.username);

//   const { username, password } = req.body;
//   req.session.username = username;
//   req.session.password = password;
//   console.log("Session username:", req.session.username);
//   console.log("Session password:", req.session.password);
//   res.render("profile");
// });

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
