import { MongoClient } from "mongodb";

const url =
  "mongodb+srv://nikhiljanshali_db_user:hari4698@cluster0.zxqbnbw.mongodb.net/?appName=Cluster0";
const dbName = "college";
const collectionName = "students";
const client = new MongoClient(url);

client
  .connect()
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err);
  });

async function dbConnect() {
  const db = client.db(dbName);
  const collectionResult = db.collection(collectionName);
  const result = await collectionResult.find({}).toArray();
  console.log(result);
}

dbConnect();
