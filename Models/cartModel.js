const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartItemSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId, // Reference to the Product model
      ref: "Product",
      required: true,
    },
    quantity: { type: Number, required: true, min: 1 },
    size: { type: String, required: true }, // Assuming size can vary in the cart
    color: { type: String, required: true }, // Assuming color can vary in the cart
    price: { type: Number, required: true }, // Storing price at the time of adding to cart to handle price changes later
    status: { type: String, enum: ["Pending", "Bought"], default: "Pending" }, // Adding status field
    addedAt: { type: Date, default: Date.now }, // Adding addedAt field to track when the item was added
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }, // Optional: manage timestamps
  }
);

const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId, // Reference to the User model
      ref: "User",
      required: true,
    },
    items: [cartItemSchema], // Embedding cartItemSchema
    active: { type: Boolean, default: true }, // To check if the cart is active
    modifiedAt: { type: Date, default: Date.now }, // Track last modification
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }, // Optional: manage timestamps
  }
);

module.exports = mongoose.model("Cart", cartSchema);
