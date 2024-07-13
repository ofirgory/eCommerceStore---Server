const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    registeredAt: { type: Date, default: Date.now },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { versionKey: false }
);

const User = mongoose.model("user", userSchema, "users");
module.exports = User;
