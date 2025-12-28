// ===================================================
// Product Research Routes\n// ===================================================

const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const aliexpressService = require('../services/aliexpressService');
const socialProofService = require('../services/socialProofService');

// ===================================================
// Search Products
// ===================================================
router.get('/search', authMiddleware, async (req, res) => {
  try {
    const { keyword, page = 1, pageSize = 20 } = req.query;

    if (!keyword) {
      return res.status(400).json({
        success: false,
        error: 'Keyword is required'
      });
    }

    console.log(`🔍 Searching for: ${keyword}`);

    const results = await aliexpressService.searchProducts(keyword, page, pageSize);

    res.json({
      success: true,
      data: results,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Search error:', error.message);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ===================================================
// Get Product Details
// ===================================================
router.get('/:productId', authMiddleware, async (req, res) => {
  try {
    const { productId } = req.params;

    const details = await aliexpressService.getProductDetails(productId);

    res.json({
      success: true,
      data: details,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Details error:', error.message);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ===================================================
// Analyze Product (with social proof)
// ===================================================
router.post('/:productId/analyze', authMiddleware, async (req, res) => {
  try {
    const { productId } = req.params;
    const { keyword } = req.body;

    if (!keyword) {
      return res.status(400).json({
        success: false,
        error: 'Keyword is required for analysis'
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
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('❌ Analysis error:', error.message);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ===================================================
// Validate Product Against Filters
// ===================================================
router.post('/validate', authMiddleware, async (req, res) => {
  try {
    const { productId, keyword, filters = {} } = req.body;

    if (!productId || !keyword) {
      return res.status(400).json({
        success: false,
        error: 'productId and keyword are required'
      });
    }

    console.log(`✅ Validating product: ${productId}`);

    // Get product details
    const product = await aliexpressService.getProductDetails(productId);

    // Validate filters
    const validation = aliexpressService.validateProductFilters(product, filters);

    // Get social proof
    const socialProof = await socialProofService.getSocialProofScore(keyword);

    res.json({
      success: true,
      data: {
        productId,
        validation: validation.details,
        passes: validation.passes,
        socialProof: {
          score: socialProof.overallScore,
          isCurrentlySelling: socialProof.isCurrentlySelling,
          recommendation: socialProof.recommendation
        },
        trafficLight: product.trafficLight,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('❌ Validation error:', error.message);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ===================================================
// Get Advanced Filters (PRO feature)
// ===================================================
router.get('/filters/advanced', authMiddleware, async (req, res) => {
  try {
    const filters = {
      reviewCount: {
        min: 1000,
        max: 7000,
        description: 'Sweet spot for demand validation'
      },
      rating: {
        min: 4.0,
        max: 5.0,
        description: 'Product quality indicator'
      },
      price: {
        min: 2,
        max: 50,
        description: 'Buy price range'
      },
      sellPrice: {
        min: 20,
        max: 300,
        description: 'Target sell price range'
      },
      minMargin: {
        value: 30,
        description: 'Minimum profit margin percentage'
      },
      currentlySelling: {
        value: true,
        description: 'Must show signs of current sales'
      },
      socialProofRequired: {
        value: true,
        description: 'Must be trending on social media'
      }
    };

    res.json({
      success: true,
      data: filters,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ===================================================
// Health Check
// ===================================================
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Product Research API is running',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
