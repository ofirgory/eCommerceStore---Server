const User = require("../../Models/userModel");

const getAllUsers = async () => {
  console.log("arriveBll");
  try {
    const users = await User.find();
    console.log(users);
    return users;
  } catch (error) {
    throw new Error(`Error getting users: ${error.message}`);
  }
};

module.exports = {
  getAllUsers,
};
