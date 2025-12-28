# 🚀 DropForge AI - The Ultimate Dropshipping Platform

> **The smartest, most automated dropshipping software on the market**

DropForge AI is a complete, production-ready dropshipping automation platform that combines real-time product research, AI-powered supplier negotiation, intelligent store building, and advanced marketing tools into one seamless workflow.

---

## ✨ Features

### 🔍 **Smart Product Research**
- Real-time AliExpress product search with advanced filtering
- Traffic light validation system (Green/Amber/Red)
- 1,000-7,000 review sweet spot detection
- Profit margin calculator
- Price elasticity analysis

### 📊 **Social Proof Engine** (PRO)
- Facebook Ad Library verification
- TikTok trending analysis
- Amazon best-seller cross-check
- Google Trends integration
- Current sales validation

### ⏱️ **Viral Product Timing Score** (PRO)
- Rising/Flat/Declining trend detection
- Real-time trend monitoring
- Avoid oversaturated products
- Timing recommendations

### 💰 **Price Elasticity Tester** (PRO)
- Intelligent sell price suggestions
- Competitor pricing analysis
- Perceived value calculation
- Ad cost factoring

### 🎨 **Creative Swipe File** (PRO)
- Facebook ad examples
- TikTok video references
- Copy angle suggestions
- Engagement metrics

### 🏪 **Store Builder**
- One-click Shopify store creation
- Multiple store templates
- Auto-generated product descriptions
- Image import from AliExpress
- Mobile-optimized checkout

### 🤖 **AI Supplier Chat Bot** (PRO)
- Auto-contact Alibaba suppliers
- Intelligent negotiation
- MOQ/pricing discussion
- Sample request automation
- Conversation tracking

### 📈 **Business Dashboard**
- Product status tracking
- Revenue estimates
- Ad spend analysis
- Store performance metrics
- Daily action recommendations

### 🎯 **Smart Product Rotation** (PREMIUM)
- Recommended testing order
- Related product suggestions
- Niche balance tracking
- Category trend analysis

### 📧 **Marketing Asset Generator**
- Facebook ad copy
- TikTok scripts
- Email sequences (PREMIUM)
- Landing page templates

---

## 💰 Pricing Tiers

### BASIC - $29/month
✅ Product research (AliExpress)
✅ Traffic light validation
✅ Profit calculator
✅ Store builder (basic)
✅ Ad copy generator
✅ Dashboard
✅ 100 searches/month

### PRO - $79/month
✅ Everything in BASIC +
✅ Advanced filters (1,000-7,000)
✅ Social proof engine
✅ Viral timing score
✅ Price elasticity
✅ Creative swipes
✅ Supplier chat bot
✅ Store optimizer
✅ Unlimited searches
✅ 500 supplier contacts/month

### PREMIUM - $199/month
✅ Everything in PRO +
✅ Product rotation system
✅ Competitor analysis
✅ Email sequences
✅ Lead magnet library
✅ Advanced analytics
✅ Unlimited contacts
✅ API access
✅ White-label options
✅ 24/7 support

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account
- AliExpress API credentials

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/dropforge-ai.git
cd dropforge-ai

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Configuration

1. **Create `.env` file in backend:**

```bash
cp backend/src/config/.env.example backend/.env
```

2. **Add your credentials:**

```env
NODE_ENV=development
PORT=3000

SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key

ALIEXPRESS_APP_KEY=524060
ALIEXPRESS_APP_SECRET=your_secret

JWT_SECRET=your_jwt_secret
```

3. **Set up Supabase:**

```bash
# Run SQL migrations
psql -h your-supabase-host -U postgres -d postgres -f docs/database.sql
```

### Running Locally

```bash
# Terminal 1: Start backend
cd backend
npm run dev

# Terminal 2: Start frontend
cd frontend
npm run dev
```

Visit `http://localhost:3000`

---

## 📁 Project Structure

```
dropforge-ai-ultimate/
├── backend/
│   ├── src/
│   │   ├── index.js              # Main server
│   │   ├── config/               # Configuration
│   │   ├── routes/               # API routes
│   │   ├── middleware/           # Express middleware
│   │   ├── services/             # Business logic
│   │   │   ├── aliexpressService.js
│   │   │   ├── socialProofService.js
│   │   │   └── ...
│   │   └── utils/                # Utilities
│   ├── tests/                    # Test files
│   ├── package.json
│   └── vercel.json
├── frontend/
│   ├── src/
│   │   ├── pages/                # Next.js pages
│   │   ├── components/           # React components
│   │   ├── hooks/                # Custom hooks
│   │   ├── utils/                # Utilities
│   │   └── styles/               # CSS/Tailwind
│   ├── public/                   # Static files
│   └── package.json
├── docs/
│   ├── API.md                    # API documentation
│   ├── SETUP.md                  # Setup guide
│   ├── DATABASE.md               # Database schema
│   └── DEPLOYMENT.md             # Deployment guide
└── README.md
```

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/profile
```

### Products
```
GET    /api/products/search?keyword=yoga+mat
GET    /api/products/:id
POST   /api/products/:id/analyze
POST   /api/products/validate
GET    /api/products/filters/advanced
```

### Suppliers
```
GET    /api/suppliers/search
POST   /api/suppliers/contact
GET    /api/suppliers/chat/:id
```

### Stores
```
POST   /api/stores/create
GET    /api/stores/:id
PUT    /api/stores/:id
GET    /api/stores/optimize
```

### Marketing
```
POST   /api/marketing/generate-copy
POST   /api/marketing/generate-tiktok-script
POST   /api/marketing/generate-email
```

### Dashboard
```
GET    /api/dashboard/overview
GET    /api/dashboard/business-health
GET    /api/dashboard/metrics
```

---

## 🗄️ Database Schema

### Users
- id, email, password_hash, subscription_tier, created_at

### Products
- id, user_id, product_id, title, price, cost_price, reviews, rating, traffic_light_status, social_proof, created_at

### Suppliers
- id, user_id, product_id, supplier_name, rating, moq, price_per_unit, chat_history, created_at

### Stores
- id, user_id, product_id, store_name, domain, shopify_url, conversion_rate, created_at

### Marketing Assets
- id, user_id, product_id, asset_type, content, performance_data, created_at

---

## 🚀 Deployment

### Deploy Backend to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd backend
vercel

# Add environment variables in Vercel dashboard
```

### Deploy Frontend to Vercel

```bash
cd frontend
vercel
```

### Deploy Database (Supabase)

1. Create project at https://supabase.com
2. Run migrations from `docs/database.sql`
3. Add credentials to environment variables

---

## 📊 Traffic Light System

### 🟢 GREEN (Build It!)
- Reviews: 1,000-5,000
- Rating: 4.5+
- Sales: 100+
- Social proof: Strong
- **Recommendation:** Excellent, ready to build

### 🟡 AMBER (Research More)
- Reviews: 5,000-7,000
- Rating: 4.0-4.5
- Sales: 50-100
- Social proof: Moderate
- **Recommendation:** Maybe testable, research more

### 🔴 RED (Don't Build)
- Reviews: <1,000 or >7,000
- Rating: <4.0
- Sales: <50
- Social proof: Weak
- **Recommendation:** Do not build

---

## 🔐 Security

- JWT authentication
- Rate limiting (100 requests/15 min)
- CORS protection
- Input validation
- SQL injection prevention
- XSS protection
- HTTPS enforced
- Data encryption at rest

---

## 📈 Performance

- <2 second page load time
- 95%+ uptime SLA
- Caching strategy (1 hour for products, 24 hours for trends)
- Database query optimization
- CDN for static assets

---

## 🧪 Testing

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

---

## 📚 Documentation

- [API Documentation](./docs/API.md)
- [Setup Guide](./docs/SETUP.md)
- [Database Schema](./docs/DATABASE.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📞 Support

- 📧 Email: support@dropforge.ai
- 💬 Discord: [Join Community](https://discord.gg/dropforge)
- 📖 Docs: [Full Documentation](./docs)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/dropforge-ai/issues)

---

## 📄 License

MIT License - see LICENSE file for details

---

## 🙏 Acknowledgments

- Built with Express.js, React, Next.js, and Supabase
- Powered by real AliExpress API
- Inspired by the dropshipping community

---

## 🎯 Roadmap

- [ ] Mobile app (iOS/Android)
- [ ] Advanced AI recommendations
- [ ] Influencer outreach automation
- [ ] Inventory management
- [ ] Multi-channel selling
- [ ] Advanced analytics
- [ ] White-label platform

---

## 💡 Next Steps

1. **Deploy to production**
2. **Set up payment processing** (Stripe/PayPal)
3. **Launch marketing campaign**
4. **Gather user feedback**
5. **Iterate and improve**

---

**Built with ❤️ by DropForge AI Team**

🚀 **The smartest dropshipping software on the market**
