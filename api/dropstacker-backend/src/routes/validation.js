// Validation API Routes
// Handles product validation with caching for performance

const express = require('express');
const router = express.Router();
const { cache } = require('../config/cache');
const { supabase } = require('../config/database');

// Validate product endpoint
router.post('/validate-product', async (req, res) => {
  try {
    const { productName, productId } = req.body;

    if (!productName) {
      return res.status(400).json({
        error: 'Product name is required'
      });
    }

    // Check cache first
    const cacheKey = `validation:${productName}:${productId || 'unknown'}`;
    const cachedResult = await cache.get(cacheKey);

    if (cachedResult) {
      console.log(`✅ Cache hit for: ${productName}`);
      return res.json({
        ...cachedResult,
        cached: true
      });
    }

    console.log(`🔍 Cache miss for: ${productName}, fetching fresh data...`);

    // Fetch validation data from multiple sources
    const validationData = await performValidation(productName, productId);

    // Cache the result for 24 hours
    await cache.set(cacheKey, validationData, 86400);

    // Also store in database for analytics
    await supabase
      .from('validation_cache')
      .insert({
        product_name: productName,
        aliexpress_id: productId,
        validation_data: validationData,
        expires_at: new Date(Date.now() + 86400000).toISOString()
      });

    res.json({
      ...validationData,
      cached: false
    });

  } catch (error) {
    console.error('Validation error:', error);
    res.status(500).json({
      error: 'Validation failed',
      message: error.message
    });
  }
});

// Batch validate multiple products
router.post('/validate-batch', async (req, res) => {
  try {
    const { products } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        error: 'Products array is required'
      });
    }

    if (products.length > 50) {
      return res.status(400).json({
        error: 'Maximum 50 products per batch'
      });
    }

    // Check cache for all products
    const cacheKeys = products.map(p => `validation:${p.name}:${p.id || 'unknown'}`);
    const cachedResults = await cache.mget(cacheKeys);

    // Identify which products need fresh validation
    const toValidate = [];
    const results = [];

    products.forEach((product, index) => {
      if (cachedResults[index]) {
        results.push({ ...cachedResults[index], cached: true });
      } else {
        toValidate.push(product);
      }
    });

    // Validate uncached products in parallel
    if (toValidate.length > 0) {
      const validationPromises = toValidate.map(product =>
        performValidation(product.name, product.id)
      );

      const freshResults = await Promise.all(validationPromises);

      // Cache the fresh results
      const cacheData = {};
      toValidate.forEach((product, index) => {
        const key = `validation:${product.name}:${product.id || 'unknown'}`;
        cacheData[key] = freshResults[index];
        results.push({ ...freshResults[index], cached: false });
      });

      await cache.mset(cacheData, 86400);
    }

    res.json({
      total: products.length,
      cached: cachedResults.filter(r => r !== null).length,
      fresh: toValidate.length,
      results
    });

  } catch (error) {
    console.error('Batch validation error:', error);
    res.status(500).json({
      error: 'Batch validation failed',
      message: error.message
    });
  }
});

// Perform actual validation (simulated for now)
async function performValidation(productName, productId) {
  // Simulate API calls to AliExpress, Facebook, YouTube, etc.
  // In production, replace with real API calls

  await new Promise(resolve => setTimeout(resolve, 100)); // Simulate API delay

  const reviews = Math.floor(Math.random() * 12000) + 1000;
  const rating = (Math.random() * 1.5 + 3.5).toFixed(1);
  const orders = Math.floor(Math.random() * 15000) + 2000;

  // Calculate validation score
  let score = 0;
  const signals = [];
  const alerts = [];

  // Review validation
  if (reviews < 3000) {
    score -= 30;
    signals.push({ type: 'red', text: `Too few reviews (${reviews})` });
    alerts.push('⚠️ Product lacks social proof. High risk!');
  } else if (reviews > 10000) {
    score -= 25;
    signals.push({ type: 'red', text: `Too many reviews (${reviews})` });
    alerts.push('⚠️ Market oversaturated. Very high competition!');
  } else if (reviews >= 4000 && reviews <= 7000) {
    score += 30;
    signals.push({ type: 'green', text: `Perfect review range (${reviews})` });
  } else {
    score += 10;
    signals.push({ type: 'amber', text: `Borderline reviews (${reviews})` });
  }

  // Rating validation
  if (parseFloat(rating) >= 4.5) {
    score += 20;
    signals.push({ type: 'green', text: `Excellent rating (${rating}⭐)` });
  } else if (parseFloat(rating) >= 4.0) {
    score += 5;
    signals.push({ type: 'amber', text: `Good rating (${rating}⭐)` });
  } else {
    score -= 20;
    signals.push({ type: 'red', text: `Poor rating (${rating}⭐)` });
    alerts.push('⚠️ Low customer satisfaction!');
  }

  // Orders validation
  if (orders >= 10000) {
    score += 25;
    signals.push({ type: 'green', text: `High demand (${orders} orders/mo)` });
  } else if (orders >= 5000) {
    score += 10;
    signals.push({ type: 'amber', text: `Moderate demand (${orders} orders/mo)` });
  } else {
    score -= 15;
    signals.push({ type: 'red', text: `Low demand (${orders} orders/mo)` });
  }

  // Determine status
  let status = 'red';
  if (score >= 70) status = 'green';
  else if (score >= 30) status = 'amber';

  // Generate recommendation
  const recommendations = {
    green: {
      action: '✅ BUILD THIS STORE',
      message: 'All indicators are positive. This product has strong potential!',
      confidence: 'High'
    },
    amber: {
      action: '⚠️ RESEARCH MORE',
      message: 'Mixed signals detected. Additional validation recommended.',
      confidence: 'Medium'
    },
    red: {
      action: '🛑 DON\'T BUILD',
      message: 'Multiple red flags detected. Find a better product.',
      confidence: 'Low'
    }
  };

  return {
    productName,
    productId,
    status,
    score,
    signals,
    alerts,
    recommendation: recommendations[status],
    data: {
      aliexpress: { reviews, rating: parseFloat(rating), orders },
      social: {
        facebook: { engagement: Math.floor(Math.random() * 5000) },
        youtube: { videos: Math.floor(Math.random() * 30), totalViews: Math.floor(Math.random() * 500000) }
      },
      trends: {
        trend: Math.floor(Math.random() * 100),
        trendDirection: ['rising', 'stable', 'declining'][Math.floor(Math.random() * 3)]
      }
    },
    timestamp: new Date().toISOString()
  };
}

module.exports = router;
