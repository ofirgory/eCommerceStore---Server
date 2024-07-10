const express = require("express");
const dealsRouter = express.Router();
const { getAllDeals, createDeal, deleteDeal } = require("../BLL/dealsBLL");

// Get all deals
dealsRouter.get("/", async (req, res) => {
  try {
    const deals = await getAllDeals();
    res.status(200).json(deals);
  } catch (error) {
    console.error("Error fetching deals:", error);
    res.status(500).json({ message: error.message });
  }
});

// Create a new deal
dealsRouter.post("/", async (req, res) => {
  try {
    console.log("Received data to create deal:", req.body);
    const newDeal = await createDeal(req.body);
    res.status(201).json(newDeal);
  } catch (error) {
    console.error("Error creating deal:", error);
    res.status(500).json({ message: error.message });
  }
});

// Delete a deal
dealsRouter.delete("/:id", async (req, res) => {
  try {
    await deleteDeal(req.params.id);
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting deal:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = dealsRouter;
