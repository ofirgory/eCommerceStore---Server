const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/eCommerceDB")
    .then(() => console.log("Connected to eCommerceDB"))
    .catch((error) => console.log(error));
};

module.exports = { connectDB };
