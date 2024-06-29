const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(
      "mongodb+srv://ofircoco:TPwWxgPlB0wCnTex@cluster0.gdwp0ea.mongodb.net/"
    )
    .then(() => console.log("Connected to eCommerceDB"))
    .catch((error) => console.log(error));
};

module.exports = { connectDB };
