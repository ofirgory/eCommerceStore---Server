const express = require("express");
const usersBLL = require("../../BLL/userLoginBLL/userBLL");

const router = express.Router();

// 'http://localhost:27017/eCommerceStore' is the End Point

// Get All
router.get("/", async (req, res) => {
  const users = await usersBLL.getAllUsers();
  res.json(users);
});

module.exports = router;
