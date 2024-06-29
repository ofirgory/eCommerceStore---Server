const express = require("express");
const usersBLL = require("../BLL/userBLL");
const { findUserByUsernameAndPassword } = require("../BLL/userBLL");
const bcrypt = require("bcryptjs");
const User = require("../Models/userModel");

const router = express.Router();

// Get All
router.get("/", async (req, res) => {
  const users = await usersBLL.getAllUsers();
  res.json(users);
});

// Login route
router.post("/login", async (req, res) => {
  console.log("Login Server");
  const { userName, password } = req.body;

  try {
    const user = await findUserByUsernameAndPassword(userName, password);
    if (user) {
      res.status(200).json({ message: "Login successful", user });
    } else {
      res.status(401).json({ message: "Invalid userName or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Register route
router.post("/register", async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({ userName, email, password });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error("Error in /register route:", err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
