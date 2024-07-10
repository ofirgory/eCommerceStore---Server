const mongoose = require("mongoose");

const dealSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  dealPrice: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Deal", dealSchema);
