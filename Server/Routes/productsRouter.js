const express = require("express");
const productsRouter = express.Router();
const productsBLL = require("../BLL/productsBLL");

// POST route to upload a new product
productsRouter.post("/", async (req, res) => {
  try {
    const product = await productsBLL.uploadProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create product", error: error.message });
  }
});

// PUT route to update an existing product
productsRouter.put("/:id", async (req, res) => {
  try {
    const product = await productsBLL.updateProduct(req.params.id, req.body);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update product", error: error.message });
  }
});

// GET route to fetch all products
productsRouter.get("/", async (req, res) => {
  try {
    const products = await productsBLL.fetchAllProducts();
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get products", error: error.message });
  }
});

// GET route to fetch a product by ID
productsRouter.get("/:id", async (req, res) => {
  try {
    const product = await productsBLL.fetchProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get product", error: error.message });
  }
});

// DELETE route to delete a product
productsRouter.delete("/:id", async (req, res) => {
  try {
    const product = await productsBLL.deleteProduct(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(204).send(); // No Content
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete product", error: error.message });
  }
});

module.exports = productsRouter;
