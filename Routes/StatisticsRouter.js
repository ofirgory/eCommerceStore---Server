// statisticsRoutes.js
const express = require("express");
const statisticsRouter = express.Router();
const { getSoldProducts, getProductsInStock } = require("../BLL/statisticsBLL");

// Route to get sold products
statisticsRouter.get("/sold-products", async (req, res) => {
  try {
    const soldProducts = await getSoldProducts();
    res.json(soldProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to get products in stock
statisticsRouter.get("/products-in-stock", async (req, res) => {
  try {
    const productsInStock = await getProductsInStock();
    res.json(productsInStock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = statisticsRouter;
