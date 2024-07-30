const User = require("../Models/userModel");
const Cart = require("../Models/cartModel");
const bcrypt = require("bcryptjs");

const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(`Error getting users: ${error.message}`);
  }
};

const login = async (userName, password) => {
  try {
    const user = await User.findOne({ userName });
    if (!user) {
      console.log("User not found");
      return null;
    }

    console.log(`Stored Hashed Password: ${user.password}`);

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      // Check if the user has a cart
      let cart = await Cart.findOne({ user: user._id });
      if (!cart) {
        // If no cart exists, create a new one
        cart = new Cart({ user: user._id });
        await cart.save();
        console.log("New cart created for user:", user._id);
      } else {
        console.log("Existing cart found for user:", user._id);
      }

      return user;
    } else {
      console.log("Password does not match");
      return null;
    }
  } catch (error) {
    throw new Error(`Error finding user: ${error.message}`);
  }
};

const registerUser = async (userName, email, password, role = "user") => {
  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      throw new Error("User already exists");
    }

    user = new User({ userName, email, password, role });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    return { msg: "User registered successfully" };
  } catch (error) {
    throw new Error(`Error registering user: ${error.message}`);
  }
};

module.exports = {
  getAllUsers,
  login,
  registerUser,
};