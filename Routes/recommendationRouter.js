const express = require("express");
const recommendationRouter = express.Router();
const { getUserRecommendations } = require("../BLL/recommendationBLL");

// Get recommendations for a user
recommendationRouter.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const recommendations = await getUserRecommendations(userId);
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = recommendationRouter;
