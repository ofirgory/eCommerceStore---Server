const User = require("../Models/userModel");
const Cart = require("../Models/cartModel");

async function getAllCustomersWithOrders() {
  try {
    const customers = await User.find({});
    const customerData = await Promise.all(
      customers.map(async (customer) => {
        const carts = await Cart.find({ user: customer._id }).populate(
          "items.product"
        );
        return { ...customer._doc, carts };
      })
    );
    return customerData;
  } catch (error) {
    throw new Error(`Error fetching customers: ${error.message}`);
  }
}

module.exports = {
  getAllCustomersWithOrders,
};
