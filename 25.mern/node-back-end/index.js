import express from "express";


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
// app.use(cors());

app.get("/", (req, res) => {
  res.send({
    message: "Hello World!",
    success: true,
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
