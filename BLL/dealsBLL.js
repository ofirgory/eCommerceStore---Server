const Deal = require("../Models/dealsModel");

const getAllDeals = async () => {
  return await Deal.find().populate("product");
};

const createDeal = async (dealData) => {
  const deal = new Deal(dealData);
  return await deal.save();
};

const deleteDeal = async (dealId) => {
  return await Deal.findByIdAndDelete(dealId);
};

module.exports = {
  getAllDeals,
  createDeal,
  deleteDeal,
};
