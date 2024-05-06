const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    _id: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
  },
  { versionKey: false }
);
const User = mongoose.model("eCommerceStore", userSchema, "eCommerceStores");
module.exports = User;
