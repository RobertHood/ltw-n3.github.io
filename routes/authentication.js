const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();
require("dotenv").config();

module.exports = function(usersCollection) {
  // Register
  router.post("/register", async (req, res) => {
    try {
      const { username, email, password, role } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      const existingUser = await usersCollection.findOne({
        $or: [{ username }, { email }]
      });

      if (existingUser) {
        return res.status(400).send("User already exists");
      }

      const userRole = role === "admin" ? "admin" : "user";
      await usersCollection.insertOne({ username, email, password: hashedPassword, role: userRole });

      res.status(201).send("User registered successfully!");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error registering user");
    }
  });

  // Login
  router.post("/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await usersCollection.findOne({ username });

      if (!user) {
        return res.status(400).send("User not found");
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).send("Incorrect password");
      }

      const token = jwt.sign(
        { username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.json({ token, role: user.role });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error logging in");
    }
  });

  return router;
};
