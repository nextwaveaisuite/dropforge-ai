// ===================================================
// DropForge AI - Main Server File
// ===================================================

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

// Import routes
const productRoutes = require('./routes/products');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// ===================================================
// Middleware
// ===================================================

// Security headers
app.use(helmet());

// CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));

// Request logging
app.use(morgan('combined'));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// ===================================================
// Routes
// ===================================================

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: '🔥 DropForge AI API Server Running',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Product routes
app.use('/api/products', productRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: '🚀 DropForge AI - The Ultimate Dropshipping Platform',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      products: '/api/products',
      documentation: '/docs'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} does not exist`
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error',
    timestamp: new Date().toISOString()
  });
});

// ===================================================
// Start Server
// ===================================================

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════╗
║   🔥 DropForge AI API Server Started Successfully  ║
╚════════════════════════════════════════════════════╝

📍 Server: http://localhost:${PORT}
✅ Health: http://localhost:${PORT}/health
🔍 Search: http://localhost:${PORT}/api/products/search?keyword=yoga+mat
📊 Analyze: http://localhost:${PORT}/api/products/:id/analyze
🚀 Ready for requests!

Environment: ${process.env.NODE_ENV || 'development'}
Timestamp: ${new Date().toISOString()}
  `);
});

module.exports = app;
