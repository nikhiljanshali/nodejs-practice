import expresss from "express";
import path from "path";
const app = expresss();
/**
 * built in middleware
 */
app.use(expresss.urlencoded({ extended: false }));
app.use(expresss.static("public"));

app.get("/", (req, res) => {
  const filePath = path.resolve("./view/home.html");
  res.sendFile(filePath);
});

app.get("/about", (req, res) => {
  res.send("About Page");
});

app.get("/contact", (req, res) => {
  res.send(`
    <form action="/submit" method="post">
      <input type="text" name="Email" placeholder="Enter your email">
      <input type="text" name="Password" placeholder="Enter your password">
      <button>Submit</button>
    </form>
    `);
    
});

app.post("/submit", (req, res) => {
  console.log(req.body);
  res.send("Submit Page");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
