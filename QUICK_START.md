# 🚀 DropForge AI - Quick Start Guide

Get started with DropForge AI in 5 minutes!

---

## Step 1: Download & Extract (1 minute)

```bash
# Download the ZIP file
# Extract to your computer

# Navigate to the folder
cd dropforge-ai-ultimate
```

---

## Step 2: Install Dependencies (2 minutes)

```bash
# Backend
cd backend
npm install

# Frontend (in another terminal)
cd frontend
npm install
```

---

## Step 3: Configure Environment (1 minute)

### Backend (`backend/.env`)
```
NODE_ENV=development
PORT=3000
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
ALIEXPRESS_APP_KEY=524060
ALIEXPRESS_APP_SECRET=GQPY8AF3D92as8l1BsRKqsuoagkxeBWl
```

### Frontend (`frontend/.env.local`)
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

## Step 4: Start Development Servers (1 minute)

### Terminal 1 - Backend
```bash
cd backend
npm start
```

You'll see:
```
🔥 DropForge AI API Server Started Successfully
📍 Server: http://localhost:3000
✅ Health: http://localhost:3000/health
```

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

You'll see:
```
▲ Next.js 15.0.0
- Local:        http://localhost:3000
```

---

## Step 5: Test (Open Browser)

Visit: http://localhost:3000

You should see:
- ✅ Dashboard with metrics
- ✅ Product search
- ✅ Analysis page
- ✅ Real-time data

---

## 🎯 First Product Search

1. Go to Dashboard
2. Search for: "yoga mat"
3. See results with:
   - 🟢 Green (good to build)
   - 🟡 Amber (needs research)
   - 🔴 Red (skip this)
4. Click "Analyze" to see:
   - Social proof scores
   - Timing score
   - Profit margins
   - Price recommendations

---

## 📊 Test API Endpoints

```bash
# Health check
curl http://localhost:3000/health

# Search products
curl "http://localhost:3000/api/products/search?keyword=yoga+mat"

# Get pricing tiers
curl http://localhost:3000/api/subscriptions/pricing

# Analyze product
curl -X POST http://localhost:3000/api/products/123/analyze \
  -H "Content-Type: application/json" \
  -d '{"reviews":5000,"rating":4.7}'
```

---

## 🚀 Deploy to Production

When ready to launch:

```bash
# 1. Push to GitHub
git add .
git commit -m "Ready for production"
git push

# 2. Deploy to Vercel (follow DEPLOYMENT_GUIDE.md)

# 3. Configure Supabase

# 4. Set environment variables

# 5. Test in production

# 6. Launch!
```

See `DEPLOYMENT_GUIDE.md` for detailed instructions.

---

## 💡 Next Steps

1. ✅ Customize branding (logo, colors)
2. ✅ Add your payment processor (Stripe)
3. ✅ Set up email notifications
4. ✅ Configure social media integrations
5. ✅ Launch marketing campaign
6. ✅ Monitor analytics

---

## 🆘 Troubleshooting

### Port 3000 already in use?
```bash
# Kill the process
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm start
```

### Supabase connection error?
```bash
# Check credentials
echo $SUPABASE_URL
echo $SUPABASE_KEY

# Test connection
curl -X GET https://your-project.supabase.co/rest/v1/users \
  -H "apikey: your_key"
```

### Frontend not connecting to backend?
```bash
# Check API URL
echo $NEXT_PUBLIC_API_URL

# Test connection
fetch('http://localhost:3000/health')
  .then(r => r.json())
  .then(console.log)
```

---

## 📚 Full Documentation

- `README.md` - Project overview
- `DEPLOYMENT_GUIDE.md` - Production deployment
- `backend/README.md` - Backend API docs
- `frontend/README.md` - Frontend docs

---

## 🎉 You're Ready!

You now have a complete, production-ready dropshipping platform.

**Next:** Deploy to production and start accepting users!

Questions? Check the FAQ in `DEPLOYMENT_GUIDE.md`
