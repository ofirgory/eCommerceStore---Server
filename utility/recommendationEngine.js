const Cart = require("../Models/cartModel");
const Product = require("../Models/productsModel");
const mongoose = require("mongoose");

const getRecommendationsBasedOnCart = async (userId) => {
  try {
    // Fetch user's cart
    const userCart = await Cart.findOne({
      user: userId,
      active: true,
    }).populate("items.product");

    if (!userCart || userCart.items.length === 0) {
      console.log("User cart is empty or not found");
      return []; // Return an empty array if the cart is empty
    }

    console.log("User cart:", userCart);

    // Collect product IDs and categories from the user's cart
    let productIds = userCart.items.map((item) => item.product._id.toString());
    let categories = userCart.items.map((item) =>
      item.product.category.toString()
    );

    console.log("Product IDs in cart:", productIds);
    console.log("Categories in cart:", categories);

    // Convert categories back to ObjectId
    const categoryObjectIds = categories.map(
      (id) => new mongoose.Types.ObjectId(id)
    );

    // Find similar products based on categories
    const recommendedProducts = await Product.find({
      category: { $in: categoryObjectIds }, // Use ObjectId instances
      _id: { $nin: productIds }, // Exclude products already in the cart
    }).limit(3);

    console.log("Recommended products:", recommendedProducts);

    return recommendedProducts;
  } catch (error) {
    console.error("Error generating recommendations:", error);
    throw new Error("Error generating recommendations: " + error.message);
  }
};

module.exports = {
  getRecommendationsBasedOnCart,
};
