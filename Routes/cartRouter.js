const express = require("express");
const cartRouter = express.Router();
const Cart = require("../Models/cartModel");
const {
  fetchCart,
  addItem,
  buyItemsInCart,
  updateItem,
  deleteItem,
} = require("../BLL/cartBLL");

// Fetch cart
cartRouter.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log("Fetch cart - userId:", userId);

    let cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
      await cart.save();
    }
    res.json(cart);
  } catch (error) {
    console.error("Fetch cart - error:", error);
    res.status(500).json({ message: error.message });
  }
});

// Add item to cart
cartRouter.post("/:userId/item", async (req, res) => {
  try {
    const userId = req.params.userId;
    const itemDetails = req.body;

    console.log("Add item to cart - userId:", userId);
    console.log("Add item to cart - itemDetails:", itemDetails);

    const newItem = await addItem(userId, itemDetails);

    console.log("Add item to cart - new item:", newItem);

    res.status(201).json(newItem);
  } catch (error) {
    console.error("Add item to cart - error:", error);
    res.status(error.status || 500).json({ message: error.message });
  }
});

// Buy items in cart
cartRouter.post("/:userId/buy", async (req, res) => {
  try {
    const userId = req.params.userId;
    const cart = await buyItemsInCart(userId);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update item in cart
cartRouter.put("/:userId/item/:itemId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const itemId = req.params.itemId;
    const updateDetails = req.body;
    const cart = await updateItem(userId, itemId, updateDetails);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete item from cart
cartRouter.delete("/:userId/item/:itemId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const itemId = req.params.itemId;
    console.log(
      `Attempting to delete item with ID: ${itemId} from user: ${userId}`
    );
    const cart = await deleteItem(userId, itemId);
    console.log(`Item with ID: ${itemId} deleted successfully`);
    res.json(cart);
  } catch (error) {
    console.error(`Error in deleting item: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
});

module.exports = cartRouter;
