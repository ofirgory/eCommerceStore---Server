const express = require("express");
const usersBLL = require("../BLL/userBLL");
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
    const user = await usersBLL.findUserByUsernameAndPassword(
      userName,
      password
    );
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
    const result = await usersBLL.registerUser(userName, email, password);
    res.status(201).json(result);
  } catch (err) {
    console.error("Error in /register route:", err.message);
    res.status(500).send(err.message);
  }
});

module.exports = router;
