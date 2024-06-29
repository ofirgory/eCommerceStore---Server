const express = require("express");
const categoryRouter = express.Router();
const categoryBLL = require("../BLL/categoryBLL");

categoryRouter.post("/", async (req, res) => {
  console.log("Creating new category with data:", req.body);
  try {
    const category = await categoryBLL.addCategory(req.body);
    console.log("Category created successfully:", category);
    res.status(201).json(category);
  } catch (error) {
    console.error("Failed to create category:", error);
    res
      .status(500)
      .json({ message: "Failed to create category", error: error.message });
  }
});

categoryRouter.put("/:id", async (req, res) => {
  console.log(
    `Updating category with ID ${req.params.id} with data:`,
    req.body
  );
  try {
    const category = await categoryBLL.updateCategory(req.params.id, req.body);
    if (!category) {
      console.error("Category not found for ID:", req.params.id);
      return res.status(404).json({ message: "Category not found" });
    }
    console.log("Category updated successfully:", category);
    res.json(category);
  } catch (error) {
    console.error("Failed to update category:", error);
    res
      .status(500)
      .json({ message: "Failed to update category", error: error.message });
  }
});

categoryRouter.delete("/:id", async (req, res) => {
  console.log(`Deleting category with ID ${req.params.id}`);
  try {
    const result = await categoryBLL.deleteCategory(req.params.id);
    if (!result) {
      console.error("Category not found for ID:", req.params.id);
      return res.status(404).json({ message: "Category not found" });
    }
    console.log("Category deleted successfully for ID:", req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error("Failed to delete category:", error);
    res
      .status(500)
      .json({ message: "Failed to delete category", error: error.message });
  }
});

categoryRouter.get("/", async (req, res) => {
  console.log("Fetching all categories");
  try {
    const categories = await categoryBLL.getAllCategories();
    console.log("Categories fetched successfully:", categories);
    res.json(categories);
  } catch (error) {
    console.error("Failed to get categories:", error);
    res
      .status(500)
      .json({ message: "Failed to get categories", error: error.message });
  }
});

module.exports = categoryRouter;
