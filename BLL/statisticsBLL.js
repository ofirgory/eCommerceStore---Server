const Cart = require("../Models/cartModel");
const Product = require("../Models/productsModel");

const getSoldProducts = async () => {
  try {
    const soldProducts = await Cart.aggregate([
      { $unwind: "$items" }, // Deconstruct the items array
      {
        $group: {
          _id: "$items.product",
          totalSold: { $sum: "$items.quantity" },
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      {
        $project: {
          productId: "$product._id",
          productName: "$product.name",
          totalSold: 1,
        },
      },
    ]);

    return soldProducts;
  } catch (error) {
    throw new Error("Error fetching sold products: " + error.message);
  }
};

const getProductsInStock = async () => {
  try {
    const productsInStock = await Product.find({ stock: { $gt: 0 } }).select(
      "name stock"
    );
    return productsInStock;
  } catch (error) {
    throw new Error("Error fetching products in stock: " + error.message);
  }
};

module.exports = {
  getSoldProducts,
  getProductsInStock,
};
