import express from "express";
import nodemailer from "nodemailer";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// const transporter = nodemailer.createTransport({
//   host: "gmail",
//   //   port: 587,
//   //   secure: false,
//   auth: {
//     user: "nikhil.janshali@gmail.com",
//     pass: "rywl fadj iwhe jpzt",
//   },
// });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nikhil.janshali@gmail.com",
    pass: "rywlfadjiwhejpzt",
  },
  tls: {
    rejectUnauthorized: false, // ✅ bypass SSL error
  },
});

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/mail", (req, res) => {
  res.render("mail");
});

app.post("/send-mail", (req, res) => {
  const { to, subject, message } = req.body;
  console.log(
    `Sending email to ${to} with subject "${subject}" and text "${message}"`,
  );
  const mailOptions = {
    from: "nikhil.janshali@gmail.com",
    to,
    subject,
    text: message,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent:", info.response);
      res.send(
        `Email sent to ${to} with subject "${subject}" and text "${message}"`,
      );
    }
  });
  // Here you would use nodemailer to send the email
  //   res.send(`Email sent to ${to} with subject "${subject}" and text "${text}"`);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
