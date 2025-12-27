// ===================================================
// DropForge AI - Express Backend Server
// Real AliExpress API Integration
// ===================================================

const express = require('express');
const cors = require('cors');
const aliexpressAPI = require('./aliexpress-api');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// ===================================================
// HEALTH CHECK ENDPOINT
// ===================================================
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'DropForge AI API Server Running',
    timestamp: new Date().toISOString()
  });
});

// ===================================================
// PRODUCT SEARCH ENDPOINT
// ===================================================
app.get('/api/products/search', async (req, res) => {
  try {
    const { keyword, page = 1, pageSize = 20 } = req.query;

    if (!keyword) {
      return res.status(400).json({
        error: 'Keyword is required',
        success: false
      });
    }

    console.log(`🔍 Searching for: ${keyword}`);

    // Call AliExpress API
    const results = await aliexpressAPI.searchProducts(keyword, page, pageSize);

    res.json({
      success: true,
      data: results,
      keyword,
      page,
      pageSize,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Search Error:', error.message);
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// ===================================================
// PRODUCT DETAILS ENDPOINT
// ===================================================
app.get('/api/products/:productId', async (req, res) => {
  try {
    const { productId } = req.params;

    console.log(`📦 Getting details for product: ${productId}`);

    // Call AliExpress API
    const details = await aliexpressAPI.getProductDetails(productId);

    res.json({
      success: true,
      data: details,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Details Error:', error.message);
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// ===================================================
// VALIDATION ENDPOINT (Traffic Light System)
// ===================================================
app.post('/api/products/validate', (req, res) => {
  try {
    const { reviews, rating, demand } = req.body;

    // Traffic Light Logic
    let status = 'RED';
    let recommendation = 'Do not build';
    let score = 0;

    // Review count: 3,000-7,000 is sweet spot
    if (reviews >= 3000 && reviews <= 7000) {
      score += 40;
      status = 'GREEN';
    } else if (reviews >= 1500 && reviews <= 10000) {
      score += 20;
      status = 'AMBER';
    }

    // Rating: 4.5+ is excellent
    if (rating >= 4.5) {
      score += 30;
      if (status === 'RED') status = 'AMBER';
    } else if (rating >= 4.0) {
      score += 15;
    }

    // Demand: 85+ is high
    if (demand >= 85) {
      score += 30;
      if (status === 'AMBER') status = 'GREEN';
    } else if (demand >= 70) {
      score += 15;
    }

    // Determine recommendation
    if (status === 'GREEN') {
      recommendation = 'Excellent! Ready to build';
    } else if (status === 'AMBER') {
      recommendation = 'Research more before building';
    }

    res.json({
      success: true,
      status,
      score,
      recommendation,
      details: {
        reviews,
        rating,
        demand
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ===================================================
// ERROR HANDLING
// ===================================================
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: err.message
  });
});

// ===================================================
// START SERVER
// ===================================================
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   🔥 DropForge AI API Server Started   ║
╚════════════════════════════════════════╝
📍 Server: http://localhost:${PORT}
✅ Health: http://localhost:${PORT}/health
🔍 Search: http://localhost:${PORT}/api/products/search?keyword=yoga+mat
📦 Details: http://localhost:${PORT}/api/products/123456
🚀 Ready for requests!
  ` );
});

module.exports = app;
