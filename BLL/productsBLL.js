const Product = require("../Models/productsModel");
const Category = require("../Models/categoryModel");

// Function to update only the category of a product
// Function to update only the category of a product
const updateProductCategory = async (productId, newCategoryId) => {
  try {
    const category = await Category.findById(newCategoryId);
    if (!category) {
      throw new Error("Category not found");
    }

    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    // Update the category
    product.category = newCategoryId;
    await product.save();
    return product;
  } catch (error) {
    throw error;
  }
};

// Upload a new product
const uploadProduct = async (productData) => {
  try {
    const product = new Product(productData);
    await product.save();
    return product;
  } catch (error) {
    throw error;
  }
};

// Update an existing product
const updateProduct = async (productId, updateData) => {
  try {
    const product = await Product.findByIdAndUpdate(productId, updateData, {
      new: true,
    });
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  } catch (error) {
    throw error;
  }
};

// Fetch all products
const fetchAllProducts = async () => {
  try {
    const products = await Product.find({});
    return products;
  } catch (error) {
    throw error;
  }
};

// Fetch a product by ID
const fetchProductById = async (productId) => {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  } catch (error) {
    throw error;
  }
};

// Delete a product
const deleteProduct = async (productId) => {
  try {
    const result = await Product.findByIdAndDelete(productId);
    if (!result) {
      throw new Error("Product not found");
    }
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  updateProductCategory,
  uploadProduct,
  updateProduct,
  fetchAllProducts,
  fetchProductById,
  deleteProduct,
};
