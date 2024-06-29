const Category = require("../Models/categoryModel");

const addCategory = async (categoryData) => {
  try {
    const category = new Category(categoryData);
    await category.save();
    console.log(`Category added successfully: ${category}`);
    return category;
  } catch (error) {
    throw error;
  }
};

const updateCategory = async (categoryId, updateData) => {
  try {
    const category = await Category.findByIdAndUpdate(categoryId, updateData, {
      new: true,
    });
    if (!category) {
      throw new Error("Category not found");
    }
    console.log(`Category updated successfully: ${category}`);
    return category;
  } catch (error) {
    throw error;
  }
};

const deleteCategory = async (categoryId) => {
  try {
    const result = await Category.findByIdAndDelete(categoryId);
    if (!result) {
      throw new Error("Category not found");
    }
    console.log(`Category deleted successfully: ${result}`);
    return result;
  } catch (error) {
    throw error;
  }
};

const getAllCategories = async () => {
  try {
    const categories = await Category.find({});
    console.log(`Categories retrieved successfully: ${categories}`);
    return categories;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
};
