const {
  getRecommendationsBasedOnCart,
} = require("../utility/recommendationEngine");

const getUserRecommendations = async (userId) => {
  try {
    const recommendations = await getRecommendationsBasedOnCart(userId);
    return recommendations;
  } catch (error) {
    throw new Error("Error generating recommendations: " + error.message);
  }
};

module.exports = {
  getUserRecommendations,
};
