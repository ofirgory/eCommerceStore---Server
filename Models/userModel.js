const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: String,
    email: String,
    password: String,
  },
  { versionKey: false }
);
const User = mongoose.model("user", userSchema, "users");
module.exports = User;

// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     userName: String,
//     email: String,
//     password: String,
//   },
//   { versionKey: false }
// );
// const User = mongoose.model("User", userSchema);

// export default User;
