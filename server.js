require("dotenv").config();
const express = require("express");
const path = require("path");
const { MongoClient, ServerApiVersion } = require("mongodb");

const { authenticateToken, authorizeRole } = require("./middleware/authMiddleware");

const app = express();
const PORT = process.env.PORT || 3000;

let usersCollection;

// MongoDB client setup
const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Connect to MongoDB and start server
async function startServer() {
  try {
    await client.connect();
    const db = client.db("Ritogg");
    usersCollection = db.collection("User");
    console.log("✅ Connected to MongoDB");

    // Load routes
    const authRoutes = require("./routes/authentication")(usersCollection);
    app.use("/users", authRoutes);

    // Protected route: Admin only
    app.get("/users", authenticateToken, authorizeRole("admin"), async (req, res) => {
      try {
        const users = await usersCollection.find({}, { projection: { password: 0 } }).toArray();
        res.json(users);
      } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching users");
      }
    });

    // Profile route for any logged-in user
    app.get("/profile", authenticateToken, (req, res) => {
      res.json({ message: `Welcome ${req.user.username}`, role: req.user.role });
    });

    // Serve main page
    app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "index.html"));
    });

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}

startServer();
