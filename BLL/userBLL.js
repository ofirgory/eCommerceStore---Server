const User = require("../../Models/userModel");
const bcrypt = require("bcryptjs");

const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(`Error getting users: ${error.message}`);
  }
};

const findUserByUsernameAndPassword = async (userName, password) => {
  try {
    const user = await User.findOne({ userName });
    if (!user) {
      console.log("User not found");
      return null;
    }

    console.log(`Input Password: ${password}`);
    console.log(`Stored Hashed Password: ${user.password}`);

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return user;
    } else {
      console.log("Password does not match");
      return null;
    }
  } catch (error) {
    throw new Error(`Error finding user: ${error.message}`);
  }
};

module.exports = {
  getAllUsers,
  findUserByUsernameAndPassword,
};
