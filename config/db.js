const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(
     *************
    )
    .then(() => console.log("Connected to eCommerceDB"))
    .catch((error) => console.log(error));
};

module.exports = { connectDB };
