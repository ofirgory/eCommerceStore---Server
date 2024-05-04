const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: {
    type: String,
    required: true,
    enum: ["shoes", "shirts", "pants", "accessories"],
  },
  size: {
    type: [String],
    required: function () {
      return this.category === "shoes";
    },
  },
  color: { type: String, required: true },
  stock: { type: Number, required: true },
  images: [{ type: String }], // URLs to images
  tags: [{ type: String }], // Additional tags for search and categorization
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("product", productsSchema);
