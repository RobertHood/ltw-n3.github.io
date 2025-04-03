const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const uri = "mongodb+srv://robbie1:Boybuster_03@cluster0.gdyalco.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let usersCollection;

// Connect to MongoDB
async function connectDB() {
  try {
    await client.connect();
    const db = client.db("Ritogg"); // Change "userDB" to your desired database name
    usersCollection = db.collection("User");
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}
connectDB();

app.use(express.static(path.join(__dirname)));
app.use(express.json());

// Sign up a user
app.post("/users", async (req, res) => {
  try {
    const { name, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await usersCollection.findOne({ name });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    await usersCollection.insertOne({ name, password: hashedPassword });
    res.status(201).send("User registered successfully!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error registering user");
  }
});

// Log in a user
app.post("/users/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await usersCollection.findOne({ username });

    if (!user) {
      return res.status(400).send("User not found");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      res.send("Success");
    } else {
      res.status(401).send("Not Allowed");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error logging in");
  }
});

// Fetch all users (for testing)
app.get("/users", async (req, res) => {
  try {
    const users = await usersCollection.find().toArray();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching users");
  }
});

// Serve the index.html file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Server listening on port 3000
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
