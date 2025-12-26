# API Integration Guide
## Connect Real Data Sources to DropForge AI

This guide shows you how to connect real APIs for product validation, social proof, and trends analysis.

---

## 🔑 Required API Keys

### 1. AliExpress API
**Purpose:** Product data, reviews, orders, ratings

**Get API Key:**
1. Visit: https://portals.aliexpress.com/
2. Register as developer
3. Apply for API access
4. Get your API key and secret

**Cost:** Free tier available, paid plans from $29/mo

**Integration:**
```javascript
// In product-validation.js
async function fetchAliExpressData(productId) {
  const response = await fetch(`https://api-sg.aliexpress.com/sync`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.ALIEXPRESS_API_KEY}`
    },
    body: JSON.stringify({
      method: 'aliexpress.ds.product.get',
      product_id: productId
    })
  });
  
  const data = await response.json();
  return {
    reviews: data.ae_item_base_info_dto.evaluation_count,
    rating: data.ae_item_base_info_dto.avg_evaluation_rating,
    orders: data.ae_item_base_info_dto.order_count,
    price: data.ae_item_base_info_dto.price,
    shipping: data.ae_item_base_info_dto.shipping_info
  };
}
```

---

### 2. Facebook Graph API
**Purpose:** Social engagement, posts, sentiment

**Get API Key:**
1. Visit: https://developers.facebook.com/
2. Create an app
3. Add Facebook Login product
4. Get access token

**Cost:** Free

**Integration:**
```javascript
// In product-validation.js
async function fetchFacebookData(productName) {
  const response = await fetch(
    `https://graph.facebook.com/v18.0/search?` +
    `q=${encodeURIComponent(productName)}&` +
    `type=post&` +
    `fields=engagement,message,created_time&` +
    `access_token=${process.env.FACEBOOK_ACCESS_TOKEN}`
  );
  
  const data = await response.json();
  const posts = data.data || [];
  
  return {
    posts: posts.length,
    engagement: posts.reduce((sum, p) => sum + (p.engagement?.count || 0), 0),
    sentiment: analyzeSentiment(posts)
  };
}
```

---

### 3. YouTube Data API
**Purpose:** Video count, views, trending status

**Get API Key:**
1. Visit: https://console.cloud.google.com/
2. Create a project
3. Enable YouTube Data API v3
4. Create credentials (API key)

**Cost:** Free (10,000 units/day)

**Integration:**
```javascript
// In product-validation.js
async function fetchYouTubeData(productName) {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?` +
    `part=snippet&` +
    `q=${encodeURIComponent(productName)}&` +
    `type=video&` +
    `maxResults=50&` +
    `key=${process.env.YOUTUBE_API_KEY}`
  );
  
  const data = await response.json();
  const videos = data.items || [];
  
  // Get view counts
  const videoIds = videos.map(v => v.id.videoId).join(',');
  const statsResponse = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?` +
    `part=statistics&` +
    `id=${videoIds}&` +
    `key=${process.env.YOUTUBE_API_KEY}`
  );
  
  const statsData = await statsResponse.json();
  const totalViews = statsData.items.reduce(
    (sum, v) => sum + parseInt(v.statistics.viewCount || 0), 0
  );
  
  return {
    videos: videos.length,
    totalViews: totalViews,
    trending: totalViews > 100000
  };
}
```

---

### 4. Google Trends (Unofficial API)
**Purpose:** Trend direction, search interest

**Options:**
- Use `google-trends-api` npm package (free)
- Or scrape Google Trends (requires proxy)

**Integration:**
```javascript
// Install: npm install google-trends-api

const googleTrends = require('google-trends-api');

async function fetchGoogleTrends(productName) {
  const results = await googleTrends.interestOverTime({
    keyword: productName,
    startTime: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) // 90 days ago
  });
  
  const data = JSON.parse(results);
  const timeline = data.default.timelineData;
  
  // Calculate trend direction
  const recent = timeline.slice(-7).map(t => t.value[0]);
  const older = timeline.slice(0, 7).map(t => t.value[0]);
  const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
  const olderAvg = older.reduce((a, b) => a + b, 0) / older.length;
  
  let trendDirection = 'stable';
  if (recentAvg > olderAvg * 1.2) trendDirection = 'rising';
  if (recentAvg < olderAvg * 0.8) trendDirection = 'declining';
  
  return {
    trend: Math.round(recentAvg),
    trendDirection: trendDirection,
    relatedQueries: data.default.rankedList[0].rankedKeyword.slice(0, 5)
  };
}
```

---

### 5. Competition Analysis (Shopify Stores)
**Purpose:** Count competing stores, average prices

**Options:**
- Use BuiltWith API (paid)
- Or scrape Google Shopping
- Or use custom scraper

**Integration (BuiltWith):**
```javascript
// Get API key from: https://api.builtwith.com/

async function analyzeCompetition(productName) {
  // Search for Shopify stores selling this product
  const response = await fetch(
    `https://api.builtwith.com/v20/api.json?` +
    `KEY=${process.env.BUILTWITH_API_KEY}&` +
    `LOOKUP=${encodeURIComponent(productName + ' shopify')}`
  );
  
  const data = await response.json();
  const stores = data.Results || [];
  
  return {
    level: stores.length < 50 ? 'low' : stores.length < 200 ? 'medium' : 'high',
    stores: stores.length,
    avgPrice: calculateAveragePrice(stores)
  };
}
```

---

## 🔧 Environment Setup

### Create `.env` file:
```env
# AliExpress
ALIEXPRESS_API_KEY=your_key_here
ALIEXPRESS_API_SECRET=your_secret_here

# Facebook
FACEBOOK_ACCESS_TOKEN=your_token_here

# YouTube
YOUTUBE_API_KEY=your_key_here

# Google Cloud (for Trends)
GOOGLE_CLOUD_API_KEY=your_key_here

# BuiltWith (optional)
BUILTWITH_API_KEY=your_key_here

# OpenAI (for AI features)
OPENAI_API_KEY=your_key_here
```

### Load environment variables:
```javascript
// Add to your HTML files or use a backend
<script>
// For frontend (not recommended for production - use backend)
const API_KEYS = {
  aliexpress: 'your_key',
  facebook: 'your_token',
  youtube: 'your_key'
};
</script>
```

**⚠️ SECURITY WARNING:**
Never expose API keys in frontend code in production!
Use a backend server (Node.js, Flask, etc.) to make API calls.

---

## 🚀 Backend Setup (Recommended)

### Option 1: Node.js + Express
```javascript
// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Validation endpoint
app.post('/api/validate-product', async (req, res) => {
  const { productName, productId } = req.body;
  
  try {
    const validation = await validateProduct(productName, productId);
    res.json(validation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('API server running on port 3000');
});
```

### Option 2: Flask (Python)
```python
# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

@app.route('/api/validate-product', methods=['POST'])
def validate_product():
    data = request.json
    product_name = data.get('productName')
    product_id = data.get('productId')
    
    # Call validation functions
    validation = validate_product_data(product_name, product_id)
    
    return jsonify(validation)

if __name__ == '__main__':
    app.run(port=3000)
```

---

## 📊 Cost Breakdown

| Service | Free Tier | Paid Plans | Recommended |
|---------|-----------|------------|-------------|
| AliExpress API | Limited | $29-99/mo | $49/mo |
| Facebook Graph | Free | Free | Free |
| YouTube Data | 10K units/day | Pay as you go | Free tier |
| Google Trends | Free (unofficial) | N/A | Free |
| BuiltWith | No | $295/mo | Optional |
| OpenAI API | $5 credit | Pay as you go | $20/mo |

**Total Monthly Cost: $70-120/mo** (with all premium features)

---

## 🧪 Testing

### Test with sample data first:
1. Use the existing simulated data in `product-validation.js`
2. Verify the validation logic works correctly
3. Then gradually replace with real API calls

### Test individual APIs:
```javascript
// Test AliExpress
const aliData = await fetchAliExpressData('1234567890');
console.log(aliData);

// Test Facebook
const fbData = await fetchFacebookData('yoga mat');
console.log(fbData);

// Test YouTube
const ytData = await fetchYouTubeData('yoga mat');
console.log(ytData);
```

---

## 📝 Next Steps

1. **Get API keys** from all services
2. **Set up backend** (Node.js or Flask)
3. **Test each API** individually
4. **Replace simulated functions** in `product-validation.js`
5. **Deploy backend** to Heroku, Railway, or Vercel
6. **Update frontend** to call your backend API
7. **Test validation system** end-to-end

---

## 🔗 Useful Links

- AliExpress API: https://developers.aliexpress.com/
- Facebook Graph API: https://developers.facebook.com/docs/graph-api
- YouTube Data API: https://developers.google.com/youtube/v3
- Google Trends API: https://www.npmjs.com/package/google-trends-api
- BuiltWith API: https://api.builtwith.com/

---

**Need help?** Check the code comments in `product-validation.js` for more details!
