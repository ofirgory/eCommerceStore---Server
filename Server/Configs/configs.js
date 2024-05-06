const mongoose = require("mongoose");

const connectDB = () => {
  console.log("configs");
  mongoose
    .connect("mongodb://127.0.0.1:27017/eCommerceStore")
    .then(() => console.log("Connected to eCommerceStoreDB"))
    .catch((error) => console.log(error));
};

module.exports = { connectDB };
