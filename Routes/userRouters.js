const express = require("express");
const userBLL = require("../BLL/userBLL");
const userRouter = express.Router();

// Get All
userRouter.get("/", async (req, res) => {
  const users = await userBLL.getAllUsers();
  res.json(users);
});

// Login route
userRouter.post("/login", async (req, res) => {
  console.log("Login Server");
  const { userName, password } = req.body;

  try {
    const user = await userBLL.login(userName, password);
    if (user) {
      const isAdmin = user.role === "admin";
      res.status(200).json({ message: "Login successful", user, isAdmin });
    } else {
      res.status(401).json({ message: "Invalid userName or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Register route
userRouter.post("/register", async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const result = await userBLL.registerUser(userName, email, password);
    res.status(201).json(result);
  } catch (err) {
    console.error("Error in /register route:", err.message);
    res.status(500).send(err.message);
  }
});

module.exports = userRouter;
