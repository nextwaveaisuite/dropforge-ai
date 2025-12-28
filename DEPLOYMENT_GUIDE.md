# 🚀 DropForge AI - Complete Deployment Guide

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [GitHub Setup](#github-setup)
3. [Supabase Setup](#supabase-setup)
4. [Vercel Deployment](#vercel-deployment)
5. [Environment Variables](#environment-variables)
6. [Testing](#testing)
7. [Going Live](#going-live)

---

## Prerequisites

Before you start, make sure you have:

- ✅ Node.js v18+ installed
- ✅ Git installed
- ✅ GitHub account
- ✅ Vercel account
- ✅ Supabase account
- ✅ AliExpress API credentials (App Key: 524060, App Secret: GQPY8AF3D92as8l1BsRKqsuoagkxeBWl)

---

## GitHub Setup

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `dropforge-ai`
3. Description: "The smartest dropshipping software"
4. Choose: Public (for visibility)
5. Click "Create repository"

### Step 2: Push Code to GitHub

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/dropforge-ai.git
cd dropforge-ai

# Add all files
git add .

# Commit
git commit -m "Initial commit: DropForge AI - Complete dropshipping platform"

# Push to GitHub
git push -u origin main
```

### Step 3: Verify on GitHub

Visit https://github.com/YOUR_USERNAME/dropforge-ai and verify all files are there.

---

## Supabase Setup

### Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Click "New Project"
3. Project name: `dropforge-ai`
4. Database password: Create a strong password
5. Region: Choose closest to you
6. Click "Create new project"

### Step 2: Create Database Tables

Go to SQL Editor and run:

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  subscription_tier VARCHAR(50) DEFAULT 'basic',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  product_id VARCHAR(255) UNIQUE,
  title VARCHAR(500),
  price DECIMAL(10, 2),
  reviews INTEGER,
  rating DECIMAL(3, 1),
  sales INTEGER,
  traffic_light VARCHAR(10),
  social_proof_score INTEGER,
  timing_score VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Stores table
CREATE TABLE stores (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  store_name VARCHAR(255),
  domain VARCHAR(255),
  status VARCHAR(50),
  products JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Suppliers table
CREATE TABLE suppliers (
  id SERIAL PRIMARY KEY,
  supplier_id VARCHAR(255) UNIQUE,
  name VARCHAR(255),
  rating DECIMAL(3, 1),
  response_time INTEGER,
  moq INTEGER,
  price_per_unit DECIMAL(10, 2),
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Chat history table
CREATE TABLE chat_history (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  supplier_id VARCHAR(255),
  message TEXT,
  sender VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Step 3: Get Credentials

1. Go to Settings → API
2. Copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## Vercel Deployment

### Step 1: Deploy Backend

1. Go to https://vercel.com
2. Click "New Project"
3. Select your GitHub repository
4. Framework: Node.js
5. Root Directory: `backend`
6. Environment Variables:
   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_key
   ALIEXPRESS_APP_KEY=524060
   ALIEXPRESS_APP_SECRET=GQPY8AF3D92as8l1BsRKqsuoagkxeBWl
   ```
7. Click "Deploy"

### Step 2: Deploy Frontend

1. Go to https://vercel.com
2. Click "New Project"
3. Select your GitHub repository
4. Framework: Next.js
5. Root Directory: `frontend`
6. Environment Variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
   NEXT_PUBLIC_API_URL=https://your-backend-url.vercel.app
   ```
7. Click "Deploy"

---

## Environment Variables

### Backend (.env)

```
NODE_ENV=production
PORT=3000
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_supabase_anon_key
ALIEXPRESS_APP_KEY=524060
ALIEXPRESS_APP_SECRET=GQPY8AF3D92as8l1BsRKqsuoagkxeBWl
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_key
```

### Frontend (.env.local)

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_API_URL=https://your-backend-url.vercel.app
NEXT_PUBLIC_STRIPE_KEY=your_stripe_public_key
```

---

## Testing

### Test Backend

```bash
# Test health endpoint
curl https://your-backend-url.vercel.app/health

# Test product search
curl "https://your-backend-url.vercel.app/api/products/search?keyword=yoga+mat"

# Test pricing
curl https://your-backend-url.vercel.app/api/subscriptions/pricing
```

### Test Frontend

1. Visit https://your-frontend-url.vercel.app
2. Navigate to /dashboard
3. Search for a product
4. Verify results appear

---

## Going Live

### Step 1: Custom Domain

1. Go to Vercel Project Settings
2. Domains
3. Add your custom domain (e.g., dropforge.ai)
4. Follow DNS setup instructions

### Step 2: SSL Certificate

- Vercel automatically provides free SSL
- Certificate is issued within 24 hours

### Step 3: Launch Checklist

- ✅ Backend deployed and tested
- ✅ Frontend deployed and tested
- ✅ Supabase database configured
- ✅ Environment variables set
- ✅ Custom domain configured
- ✅ SSL certificate active
- ✅ Email notifications working
- ✅ Payment processing (Stripe) configured

### Step 4: Monitor

- Set up error tracking (Sentry)
- Monitor API performance
- Track user analytics
- Monitor database usage

---

## Troubleshooting

### Backend Not Connecting to Supabase

```bash
# Check environment variables
echo $SUPABASE_URL
echo $SUPABASE_KEY

# Test connection
curl -X GET https://your-project.supabase.co/rest/v1/users \
  -H "apikey: your_supabase_key"
```

### Frontend Not Connecting to Backend

```bash
# Check API URL
echo $NEXT_PUBLIC_API_URL

# Test connection
fetch('https://your-api-url/health')
  .then(r => r.json())
  .then(console.log)
```

### Vercel Build Fails

1. Check build logs in Vercel dashboard
2. Verify all dependencies are in package.json
3. Check for environment variable issues
4. Verify Node.js version compatibility

---

## Support

- 📧 Email: support@dropforge.ai
- 💬 Discord: https://discord.gg/dropforge
- 📚 Docs: https://docs.dropforge.ai
- 🐛 Issues: https://github.com/dropforge-ai/dropforge-ai/issues

---

## Next Steps

1. ✅ Deploy to Vercel
2. ✅ Configure Supabase
3. ✅ Set up custom domain
4. ✅ Launch marketing campaign
5. ✅ Start accepting users
6. ✅ Monitor and optimize

**You're ready to launch!** 🚀
