const express = require('express');
const router = express.Router();
const { cache } = require('../config/cache');

// Get all suppliers
router.get('/', async (req, res) => {
  try {
    const cacheKey = 'suppliers:all';
    const cached = await cache.get(cacheKey);

    if (cached) {
      return res.json({ suppliers: cached, cached: true });
    }

    const suppliers = [
      {
        id: 1,
        name: 'AliExpress',
        rating: 4.2,
        reviews: 15000,
        products: '100M+',
        shippingTime: '15-30 days',
        minOrder: '1 unit'
      },
      {
        id: 2,
        name: 'CJ Dropshipping',
        rating: 4.8,
        reviews: 8500,
        products: '500K+',
        shippingTime: '7-15 days',
        minOrder: '1 unit'
      },
      {
        id: 3,
        name: 'Spocket',
        rating: 4.7,
        reviews: 6200,
        products: '50K+',
        shippingTime: '2-5 days',
        minOrder: '1 unit'
      }
    ];

    await cache.set(cacheKey, suppliers, 86400);

    res.json({ suppliers, cached: false });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
