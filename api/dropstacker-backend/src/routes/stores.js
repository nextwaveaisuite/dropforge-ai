const express = require('express');
const router = express.Router();
const { supabase } = require('../config/database');

// Create store
router.post('/', async (req, res) => {
  try {
    const storeData = req.body;

    const { data, error } = await supabase
      .from('stores')
      .insert(storeData)
      .select()
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user stores
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const { data, error } = await supabase
      .from('stores')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
