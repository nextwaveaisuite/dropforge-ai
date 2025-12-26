const express = require('express');
const router = express.Router();
const { supabase } = require('../config/database');
const { cache } = require('../config/cache');

// Search products
router.get('/search', async (req, res) => {
  try {
    const { query, category, minPrice, maxPrice, limit = 20 } = req.query;

    const cacheKey = `products:search:${query}:${category}:${minPrice}:${maxPrice}:${limit}`;
    const cached = await cache.get(cacheKey);

    if (cached) {
      return res.json({ ...cached, cached: true });
    }

    // Simulate product search (replace with real API in production)
    const products = generateSampleProducts(query, parseInt(limit));

    await cache.set(cacheKey, { products }, 3600); // Cache for 1 hour

    res.json({ products, cached: false });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const cacheKey = `product:${id}`;
    const cached = await cache.get(cacheKey);

    if (cached) {
      return res.json({ ...cached, cached: true });
    }

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    await cache.set(cacheKey, data, 3600);

    res.json({ ...data, cached: false });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Save product
router.post('/', async (req, res) => {
  try {
    const productData = req.body;

    const { data, error } = await supabase
      .from('products')
      .insert(productData)
      .select()
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

function generateSampleProducts(query, limit) {
  const products = [];
  for (let i = 0; i < limit; i++) {
    products.push({
      id: i + 1,
      name: `${query} Product ${i + 1}`,
      price: (Math.random() * 50 + 10).toFixed(2),
      cost: (Math.random() * 20 + 5).toFixed(2),
      reviews: Math.floor(Math.random() * 10000) + 1000,
      rating: (Math.random() * 1 + 4).toFixed(1),
      sales: Math.floor(Math.random() * 10000) + 500,
      demand: Math.floor(Math.random() * 40) + 60,
      category: 'General'
    });
  }
  return products;
}

module.exports = router;
