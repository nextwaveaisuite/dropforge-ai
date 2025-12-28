// ===================================================
// Product Research Routes
// ===================================================

const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/auth");
const aliexpressService = require("../services/aliexpressService");
const socialProofService = require("../services/socialProofService");

// ===================================================
// Search Products (NO AUTH REQUIRED)
// ===================================================
router.get("/search", async (req, res) => {
  try {
    const { keyword, page = 1, pageSize = 20 } = req.query;

    if (!keyword) {
      return res.status(400).json({
        success: false,
        error: "Keyword is required",
      });
    }

    console.log(`🔍 Searching for: ${keyword}`);

    const results = await aliexpressService.searchProducts(
      keyword,
      page,
      pageSize
    );

    res.json({
      success: true,
      data: results,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("❌ Search error:", error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ===================================================
// Get Product Details (NO AUTH REQUIRED)
// ===================================================
router.get("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    const details = await aliexpressService.getProductDetails(productId);

    res.json({
      success: true,
      data: details,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("❌ Details error:", error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ===================================================
// Analyze Product (with social proof)
// ===================================================
router.post("/:productId/analyze", authMiddleware, async (req, res) => {
  try {
    const { productId } = req.params;
    const { keyword } = req.body;

    if (!keyword) {
      return res.status(400).json({
        success: false,
        error: "Keyword is required for analysis",
      });
    }

    console.log(`📊 Analyzing product: ${productId}`);

    // Get product details
    const productDetails = await aliexpressService.getProductDetails(productId);

    // Get social proof
    const socialProof = await socialProofService.getSocialProofScore(keyword);

    // Calculate timing score
    const timingScore = socialProof.details.googleTrends.trend;

    // Calculate profit margin (example)
    const profitAnalysis = aliexpressService.calculateProfitMargin(
      productDetails.price,
      productDetails.price * 5, // 5x markup
      10 // $10 ad cost estimate
    );

    res.json({
      success: true,
      data: {
        product: productDetails,
        socialProof: socialProof.details,
        socialProofScore: socialProof.overallScore,
        timingScore,
        profitAnalysis,
        recommendation: socialProof.recommendation,
        isCurrentlySelling: socialProof.isCurrentlySelling,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("❌ Analysis error:", error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
