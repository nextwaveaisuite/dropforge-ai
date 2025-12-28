require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

// Import routes
const productRoutes = require("./routes/products");
const authRoutes = require("./routes/auth"); // <-- ADDED

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || "*", credentials: true }));
app.use(morgan("combined"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// Routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes); // <-- ADDED

app.get("/", (req, res) => {
  res.json({
    message: "🚀 DropForge AI - The Ultimate Dropshipping Platform",
    version: "1.0.0",
    endpoints: {
      health: "/health",
      products: "/api/products",
      auth: "/api/auth/aliexpress",
    },
  });
});

app.listen(PORT, () => {
  console.log(`🔥 DropForge AI API Server Started Successfully on port ${PORT}`);
});

module.exports = app;
