# 📚 DropForge AI - Complete API Documentation

## Base URL

**Development:** `http://localhost:3000`
**Production:** `https://your-backend-url.vercel.app`

---

## Authentication

All endpoints (except `/health`) require JWT token:

```bash
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 🔍 PRODUCTS API

### Search Products

```
GET /api/products/search?keyword=yoga+mat&page=1&pageSize=20
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "12345",
      "title": "Premium Yoga Mat",
      "price": 29.99,
      "reviews": 5000,
      "rating": 4.7,
      "sales": 1200,
      "traffic_light": "green",
      "social_proof_score": 85,
      "image": "https://..."
    }
  ],
  "total": 1500,
  "page": 1
}
```

---

### Get Product Details

```
GET /api/products/:productId
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "12345",
    "title": "Premium Yoga Mat",
    "description": "...",
    "price": 29.99,
    "reviews": 5000,
    "rating": 4.7,
    "sales": 1200,
    "images": ["..."],
    "specifications": {...},
    "seller": {...}
  }
}
```

---

### Analyze Product

```
POST /api/products/:productId/analyze
```

**Request:**
```json
{
  "reviews": 5000,
  "rating": 4.7,
  "sales": 1200
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "traffic_light": "green",
    "social_proof": {
      "facebook_score": 85,
      "tiktok_score": 92,
      "amazon_score": 88,
      "google_trends_score": 90
    },
    "timing_score": "rising",
    "profit_analysis": {
      "buy_price": 5.00,
      "sell_price": 29.99,
      "margin": 500,
      "margin_percent": 83.3
    },
    "price_elasticity": {
      "optimal_price": 34.99,
      "conservative_price": 24.99,
      "aggressive_price": 44.99
    }
  }
}
```

---

### Validate Product

```
POST /api/products/validate
```

**Request:**
```json
{
  "reviews": 5000,
  "rating": 4.7,
  "demand": 90,
  "competition": 3
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "is_valid": true,
    "traffic_light": "green",
    "reasons": [
      "Reviews in sweet spot (3,000-7,000)",
      "Excellent rating (4.5+)",
      "High demand score (85+)",
      "Low competition"
    ]
  }
}
```

---

### Get Advanced Filters

```
GET /api/products/filters/advanced
```

**Response:**
```json
{
  "success": true,
  "data": {
    "price_ranges": [
      {"min": 0, "max": 10},
      {"min": 10, "max": 50},
      {"min": 50, "max": 100}
    ],
    "rating_ranges": [
      {"min": 4.0, "max": 5.0},
      {"min": 3.5, "max": 4.0}
    ],
    "review_ranges": [
      {"min": 1000, "max": 7000},
      {"min": 7000, "max": 20000}
    ],
    "categories": [...]
  }
}
```

---

## 💳 SUBSCRIPTIONS API

### Get Pricing Tiers

```
GET /api/subscriptions/pricing
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "tier": "basic",
      "price": 29,
      "features": [
        "100 searches/month",
        "Traffic light system",
        "Profit calculator"
      ]
    },
    {
      "tier": "pro",
      "price": 79,
      "features": [
        "Unlimited searches",
        "Social proof engine",
        "Timing score",
        "Price elasticity"
      ]
    },
    {
      "tier": "premium",
      "price": 199,
      "features": [
        "Everything in Pro",
        "Competitor analysis",
        "Email sequences",
        "API access"
      ]
    }
  ]
}
```

---

### Compare Tiers

```
GET /api/subscriptions/compare
```

**Response:**
```json
{
  "success": true,
  "data": {
    "features": [
      {
        "name": "Product Search",
        "basic": true,
        "pro": true,
        "premium": true
      },
      {
        "name": "Social Proof",
        "basic": false,
        "pro": true,
        "premium": true
      }
    ]
  }
}
```

---

### Get User Subscription

```
GET /api/subscriptions/user
```

**Response:**
```json
{
  "success": true,
  "data": {
    "tier": "pro",
    "status": "active",
    "started_at": "2024-01-01",
    "renews_at": "2024-02-01",
    "searches_used": 450,
    "searches_limit": null
  }
}
```

---

### Upgrade Subscription

```
POST /api/subscriptions/upgrade
```

**Request:**
```json
{
  "new_tier": "premium"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "tier": "premium",
    "status": "active",
    "message": "Upgraded successfully"
  }
}
```

---

## 🏪 STORES API

### Create Store

```
POST /api/stores/create
```

**Request:**
```json
{
  "store_name": "Yoga Essentials",
  "niche": "Fitness",
  "products": ["prod_1", "prod_2"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "store_123",
    "store_name": "Yoga Essentials",
    "domain": "yoga-essentials.dropforge.ai",
    "status": "active",
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

---

### Get User Stores

```
GET /api/stores/my-stores
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "store_1",
      "store_name": "Yoga Essentials",
      "domain": "yoga-essentials.dropforge.ai",
      "products": 5,
      "stats": {
        "views": 1250,
        "conversions": 23,
        "revenue": 1840
      }
    }
  ]
}
```

---

### Get Store Details

```
GET /api/stores/:storeId
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "store_1",
    "store_name": "Yoga Essentials",
    "products": 5,
    "stats": {
      "views": 1250,
      "clicks": 145,
      "conversions": 23,
      "revenue": 1840,
      "conversion_rate": 15.9
    }
  }
}
```

---

### Get Store Analytics

```
GET /api/stores/:storeId/analytics?period=30
```

**Response:**
```json
{
  "success": true,
  "data": {
    "overview": {
      "total_views": 1250,
      "total_conversions": 23,
      "total_revenue": 1840
    },
    "daily_data": [
      {"date": "2024-01-01", "views": 42, "conversions": 1, "revenue": 80}
    ]
  }
}
```

---

### Optimize Store

```
POST /api/stores/:storeId/optimize
```

**Response:**
```json
{
  "success": true,
  "data": {
    "recommendations": [
      {
        "type": "speed",
        "title": "Improve Page Speed",
        "impact": "High"
      }
    ],
    "estimated_improvement": "23-35% conversion increase"
  }
}
```

---

## 👥 SUPPLIERS API

### Search Suppliers

```
GET /api/suppliers/search?keyword=yoga+mat+supplier&page=1
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "supplier_123",
      "name": "Premium Yoga Suppliers",
      "rating": 4.8,
      "response_time": 2,
      "moq": 50,
      "price_per_unit": 5.00,
      "verified": true
    }
  ]
}
```

---

### Get Supplier Details

```
GET /api/suppliers/:supplierId
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "supplier_123",
    "name": "Premium Yoga Suppliers",
    "rating": 4.8,
    "response_time": 2,
    "moq": 50,
    "price_per_unit": 5.00,
    "verified": true,
    "reviews": 450,
    "response_rate": 98
  }
}
```

---

### Contact Supplier

```
POST /api/suppliers/:supplierId/contact
```

**Request:**
```json
{
  "message": "Hi, I'm interested in your yoga mats. Can you provide a quote for 100 units?"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "chat_id": "chat_123",
    "supplier_id": "supplier_123",
    "status": "pending"
  }
}
```

---

## 📧 MARKETING API

### Generate Ad Copy

```
POST /api/marketing/generate-ad-copy
```

**Request:**
```json
{
  "product_title": "Premium Yoga Mat",
  "product_description": "High-quality yoga mat",
  "target_audience": "Fitness enthusiasts"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "variations": [
      {
        "platform": "Facebook",
        "headline": "Transform Your Life with Premium Yoga Mat",
        "body": "Discover the secret...",
        "cta": "Shop Now",
        "estimated_ctr": 3.2
      }
    ]
  }
}
```

---

### Generate Email Sequence

```
POST /api/marketing/generate-email-sequence
```

**Request:**
```json
{
  "product_title": "Premium Yoga Mat",
  "store_name": "Yoga Essentials"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "sequence": [
      {
        "name": "Welcome Email",
        "subject": "Welcome to Yoga Essentials! Here's 20% off",
        "send_delay": "0 hours"
      }
    ]
  }
}
```

---

### Generate Landing Page

```
POST /api/marketing/generate-landing-page
```

**Request:**
```json
{
  "product_title": "Premium Yoga Mat"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "sections": {
      "hero": {...},
      "benefits": {...},
      "social_proof": {...},
      "faq": {...}
    }
  }
}
```

---

## 🏥 HEALTH CHECK

### Health Status

```
GET /health
```

**Response:**
```json
{
  "status": "ok",
  "message": "DropForge AI API Server Running",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

**Common Error Codes:**
- `INVALID_REQUEST` - Missing required fields
- `UNAUTHORIZED` - Invalid or missing token
- `FORBIDDEN` - Insufficient permissions
- `NOT_FOUND` - Resource not found
- `RATE_LIMITED` - Too many requests
- `SERVER_ERROR` - Internal server error

---

## Rate Limiting

- **Basic Tier:** 100 requests/hour
- **Pro Tier:** 1,000 requests/hour
- **Premium Tier:** Unlimited

---

## Webhooks

Subscribe to events:

```bash
POST /api/webhooks/subscribe
{
  "event": "product.analyzed",
  "url": "https://your-domain.com/webhook"
}
```

**Events:**
- `product.analyzed` - Product analysis complete
- `store.created` - Store created
- `supplier.contacted` - Supplier contacted
- `subscription.upgraded` - Subscription upgraded

---

## SDK & Libraries

- **JavaScript/TypeScript:** `npm install dropforge-ai`
- **Python:** `pip install dropforge-ai`
- **Go:** `go get github.com/dropforge-ai/sdk-go`

---

## Support

- 📧 Email: api@dropforge.ai
- 💬 Discord: https://discord.gg/dropforge
- 📚 Docs: https://docs.dropforge.ai
- 🐛 Issues: https://github.com/dropforge-ai/dropforge-ai/issues
