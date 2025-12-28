// ===================================================
// Subscription & Pricing Routes\n// ===================================================

const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');

// ===================================================
// Pricing Tiers\n// ===================================================\n\nconst PRICING_TIERS = {
  basic: {
    id: 'basic',
    name: 'Basic',
    price: 29,
    billing_period: 'month',
    description: 'Perfect for getting started',
    features: {
      product_research: true,
      traffic_light_system: true,
      profit_calculator: true,
      store_builder_basic: true,
      ad_copy_generator: true,
      dashboard: true,
      searches_per_month: 100,
      supplier_contacts: 0,
      api_access: false,
      support: 'email'
    },
    limits: {
      searches: 100,
      stores: 3,
      suppliers: 0,
      api_calls: 0
    }
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    price: 79,
    billing_period: 'month',
    description: 'For serious entrepreneurs',
    features: {
      product_research: true,
      traffic_light_system: true,
      profit_calculator: true,
      store_builder: true,
      ad_copy_generator: true,
      advanced_filters: true,
      social_proof_engine: true,
      viral_timing_score: true,
      price_elasticity: true,
      creative_swipes: true,
      supplier_chat_bot: true,
      store_optimizer: true,
      business_dashboard: true,
      dashboard: true,
      searches_per_month: 'unlimited',
      supplier_contacts: 500,
      api_access: false,
      support: 'email + priority'
    },
    limits: {
      searches: 999999,
      stores: 20,
      suppliers: 500,
      api_calls: 0
    }
  },
  premium: {
    id: 'premium',
    name: 'Premium',
    price: 199,
    billing_period: 'month',
    description: 'Enterprise-grade solution',
    features: {
      product_research: true,
      traffic_light_system: true,
      profit_calculator: true,
      store_builder: true,
      ad_copy_generator: true,
      advanced_filters: true,
      social_proof_engine: true,
      viral_timing_score: true,
      price_elasticity: true,
      creative_swipes: true,
      supplier_chat_bot: true,
      store_optimizer: true,
      business_dashboard: true,
      product_rotation: true,
      competitor_analysis: true,
      email_sequences: true,
      lead_magnet_library: true,
      advanced_analytics: true,
      dashboard: true,
      searches_per_month: 'unlimited',
      supplier_contacts: 'unlimited',
      api_access: true,
      white_label: true,
      support: '24/7 priority'
    },
    limits: {
      searches: 999999,
      stores: 'unlimited',
      suppliers: 999999,
      api_calls: 100000
    }
  }
};

// ===================================================
// Get All Pricing Tiers\n// ===================================================\n\nrouter.get('/pricing', (req, res) => {
  try {
    res.json({
      success: true,
      data: PRICING_TIERS,
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
// Get Specific Tier\n// ===================================================\n\nrouter.get('/pricing/:tier', (req, res) => {
  try {
    const { tier } = req.params;
    const tierData = PRICING_TIERS[tier];

    if (!tierData) {
      return res.status(404).json({
        success: false,
        error: 'Tier not found'
      });
    }

    res.json({
      success: true,
      data: tierData,
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
// Compare Tiers\n// ===================================================\n\nrouter.get('/compare', (req, res) => {
  try {
    const comparison = {\n      tiers: Object.values(PRICING_TIERS),
      comparison_table: [\n        {\n          feature: 'Product Research',\n          basic: '✅',\n          pro: '✅',\n          premium: '✅'\n        },\n        {\n          feature: 'Traffic Light System',\n          basic: '✅',\n          pro: '✅',\n          premium: '✅'\n        },\n        {\n          feature: 'Advanced Filters',\n          basic: '❌',\n          pro: '✅',\n          premium: '✅'\n        },\n        {\n          feature: 'Social Proof Engine',\n          basic: '❌',\n          pro: '✅',\n          premium: '✅'\n        },\n        {\n          feature: 'Viral Timing Score',\n          basic: '❌',\n          pro: '✅',\n          premium: '✅'\n        },\n        {\n          feature: 'Price Elasticity',\n          basic: '❌',\n          pro: '✅',\n          premium: '✅'\n        },\n        {\n          feature: 'Creative Swipes',\n          basic: '❌',\n          pro: '✅',\n          premium: '✅'\n        },\n        {\n          feature: 'Supplier Chat Bot',\n          basic: '❌',\n          pro: '✅',\n          premium: '✅'\n        },\n        {\n          feature: 'Competitor Analysis',\n          basic: '❌',\n          pro: '❌',\n          premium: '✅'\n        },\n        {\n          feature: 'Email Sequences',\n          basic: '❌',\n          pro: '❌',\n          premium: '✅'\n        },\n        {\n          feature: 'API Access',\n          basic: '❌',\n          pro: '❌',\n          premium: '✅'\n        },\n        {\n          feature: 'White Label',\n          basic: '❌',\n          pro: '❌',\n          premium: '✅'\n        },\n        {\n          feature: 'Support',\n          basic: 'Email',\n          pro: 'Email + Priority',\n          premium: '24/7 Priority'\n        }\n      ]\n    };

    res.json({
      success: true,
      data: comparison,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,\n      error: error.message\n    });\n  }\n});\n\n// ===================================================\n// Get User Subscription\n// ===================================================\n\nrouter.get('/user/subscription', authMiddleware, (req, res) => {\n  try {\n    // Simulated user subscription\n    const userSubscription = {\n      user_id: req.user.id,\n      tier: 'pro',\n      status: 'active',\n      current_period_start: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),\n      current_period_end: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),\n      cancel_at_period_end: false,\n      usage: {\n        searches: 45,\n        searches_limit: 999999,\n        stores: 3,\n        stores_limit: 20,\n        supplier_contacts: 127,\n        supplier_contacts_limit: 500,\n        api_calls: 0,\n        api_calls_limit: 0\n      },\n      ...PRICING_TIERS.pro\n    };\n\n    res.json({\n      success: true,\n      data: userSubscription,\n      timestamp: new Date().toISOString()\n    });\n  } catch (error) {\n    res.status(500).json({\n      success: false,\n      error: error.message\n    });\n  }\n});\n\n// ===================================================\n// Upgrade Subscription\n// ===================================================\n\nrouter.post('/upgrade', authMiddleware, (req, res) => {\n  try {\n    const { tier } = req.body;\n\n    if (!PRICING_TIERS[tier]) {\n      return res.status(400).json({\n        success: false,\n        error: 'Invalid tier'\n      });\n    }\n\n    // In production, integrate with Stripe\n    const upgrade = {\n      user_id: req.user.id,\n      from_tier: 'basic',\n      to_tier: tier,\n      status: 'pending_payment',\n      stripe_session_id: 'cs_test_' + Math.random().toString(36).substr(2, 9),\n      created_at: new Date().toISOString()\n    };\n\n    res.json({\n      success: true,\n      data: upgrade,\n      message: 'Upgrade initiated. Redirect to payment.',\n      timestamp: new Date().toISOString()\n    });\n  } catch (error) {\n    res.status(500).json({\n      success: false,\n      error: error.message\n    });\n  }\n});\n\n// ===================================================\n// Cancel Subscription\n// ===================================================\n\nrouter.post('/cancel', authMiddleware, (req, res) => {\n  try {\n    const cancellation = {\n      user_id: req.user.id,\n      status: 'cancelled',\n      cancellation_date: new Date().toISOString(),\n      refund_status: 'processed',\n      message: 'Subscription cancelled. Access will end at period end.'\n    };\n\n    res.json({\n      success: true,\n      data: cancellation,\n      timestamp: new Date().toISOString()\n    });\n  } catch (error) {\n    res.status(500).json({\n      success: false,\n      error: error.message\n    });\n  }\n});\n\nmodule.exports = router;\n
