const Cart = require("../Models/cartModel");
const Product = require("../Models/productsModel");
const mongoose = require("mongoose");

const fetchCart = async (userId) => {
  try {
    console.log("fetchCart - userId:", userId);

    const cart = await Cart.findOne({
      user: new mongoose.Types.ObjectId(userId),
      active: true,
    }).populate("items.product");
    console.log("fetchCart - cart:", cart);

    if (!cart) {
      console.log("Cart not found for user:", userId);
      return null;
    }

    return cart;
  } catch (error) {
    console.error("fetchCart - error:", error);
    throw new Error("Error fetching the cart");
  }
};

const addItem = async (userId, itemDetails) => {
  try {
    console.log("addItem - userId:", userId);
    console.log("addItem - itemDetails:", itemDetails);

    // Fetch the product to update stock
    const product = await Product.findById(itemDetails.productId);
    console.log("addItem - fetched product:", product);

    if (!product) {
      throw new Error("Product not found");
    }

    if (product.stock < itemDetails.quantity) {
      const error = new Error("Out of stock");
      error.status = 400;
      throw error;
    }

    // Update the product stock
    product.stock -= itemDetails.quantity;
    await product.save();
    console.log("addItem - updated product stock:", product.stock);

    // Fetch or create the cart
    let cart = await Cart.findOne({
      user: new mongoose.Types.ObjectId(userId),
      active: true,
    });
    if (!cart) {
      cart = new Cart({ user: new mongoose.Types.ObjectId(userId) });
    }

    console.log("addItem - cart before adding item:", cart);

    const existingItemIndex = cart.items.findIndex(
      (item) =>
        item.product.toString() === itemDetails.productId &&
        item.size === itemDetails.size &&
        item.color === itemDetails.color
    );

    let newItem;
    if (existingItemIndex !== -1) {
      // If the item already exists in the cart, update its quantity
      cart.items[existingItemIndex].quantity += itemDetails.quantity;
      newItem = cart.items[existingItemIndex];
    } else {
      // Otherwise, add the new item to the cart with status "Pending"
      newItem = {
        product: new mongoose.Types.ObjectId(itemDetails.productId),
        quantity: itemDetails.quantity,
        price: itemDetails.price,
        color: itemDetails.color,
        size: itemDetails.size,
        status: "Pending",
      };
      cart.items.push(newItem);
    }

    console.log("addItem - cart after adding item:", cart);

    cart.modifiedAt = Date.now();
    await cart.save();

    console.log("addItem - saved cart:", cart);

    return newItem; // Return the newly added item
  } catch (error) {
    console.error("addItem - error:", error);
    throw error;
  }
};

const buyItemsInCart = async (userId) => {
  try {
    // Fetch the user's cart
    let cart = await fetchCart(userId);
    if (!cart) {
      throw new Error("Cart not found");
    }

    // Update the status of all items to "Bought"
    cart.items.forEach((item) => {
      item.status = "Bought";
    });

    cart.modifiedAt = Date.now();
    await cart.save();

    return cart;
  } catch (error) {
    throw new Error("Error buying items in the cart");
  }
};

const updateItem = async (userId, itemId, updateDetails) => {
  try {
    const cart = await fetchCart(userId);
    const item = cart.items.id(itemId);
    if (!item) throw new Error("Item not found in cart");

    Object.assign(item, updateDetails);
    await cart.save();
    return cart;
  } catch (error) {
    throw new Error("Error updating cart item");
  }
};

const deleteItem = async (userId, itemId) => {
  try {
    console.log(`Fetching cart for user ID: ${userId}`);
    const cart = await fetchCart(userId);
    console.log(`Cart fetched successfully for user ID: ${userId}`);

    console.log(`Attempting to remove item with ID: ${itemId} from cart`);
    const item = cart.items.id(itemId);
    if (item) {
      cart.items.pull(itemId);
      console.log(`Item with ID: ${itemId} removed successfully`);
    } else {
      console.log(`Item with ID: ${itemId} not found in cart`);
      throw new Error("Item not found in cart");
    }

    await cart.save();
    console.log(`Cart saved successfully after item removal`);

    return cart;
  } catch (error) {
    console.error(`Error removing item from cart: ${error.message}`);
    throw new Error("Error removing item from cart");
  }
};

module.exports = {
  fetchCart,
  addItem,
  buyItemsInCart,
  updateItem,
  deleteItem,
};
