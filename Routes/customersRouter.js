const express = require("express");
const customersBLL = require("../BLL/customersBLL");
const customersRouter = express.Router();

customersRouter.get("/", async (req, res) => {
  try {
    const customers = await customersBLL.getAllCustomersWithOrders();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = customersRouter;
