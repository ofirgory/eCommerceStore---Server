const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productsSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  size: [{ type: String, required: true }], // Changed to an array of strings
  color: { type: String, required: true },
  stock: { type: Number, required: true },
  images: [{ type: String }],
  tags: [{ type: String }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productsSchema);
