require("dotenv").config();
const dns = require("dns");
try { dns.setServers(["8.8.8.8", "1.1.1.1"]); } catch (e) {}

const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
const path = require("path");

// Import the route files
const locationRoutes = require("./routes/locationRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// CORS Configuration: Restrict allowed origins
const allowedOrigins = [
  "http://localhost:7000",
  "http://127.0.0.1:7000",
  "http://localhost:3000",
  "http://localhost:5173",
  "http://127.0.0.1:5500",
  ...(process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(",").map(o => o.trim()) : [])
];

const corsOptions = {
  origin: function (origin, callback) {
    // 1. Allow requests with no origin (mobile apps, Postman, same-origin fetch)
    if (!origin) return callback(null, true);

    // 2. Allow if origin is explicitly in allowed list
    if (allowedOrigins.includes(origin)) return callback(null, true);

    try {
      const { hostname } = new URL(origin);

      // 3. Allow local development (localhost / 127.0.0.1)
      if (hostname === "localhost" || hostname === "127.0.0.1") {
        return callback(null, true);
      }

      // 4. Allow any Vercel deployment domain (*.vercel.app)
      if (hostname.endsWith(".vercel.app") || hostname === "vercel.app") {
        return callback(null, true);
      }
    } catch (err) {
      // Invalid URL format
    }

    // 5. Disallow any other unauthorized external origin
    return callback(null, false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, "frontend")));

// MongoDB connection with caching for serverless
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/campus_navigation";
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb && mongoose.connection.readyState === 1) {
    return cachedDb;
  }
  cachedDb = await mongoose.connect(MONGO_URI);
  return cachedDb;
}

// Middleware to ensure DB connection before handling API routes
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (err) {
    console.error("Database connection error:", err);
    res.status(500).json({ error: "Failed to connect to database" });
  }
});

// API Routes
app.use("/api/locations", locationRoutes);
app.use("/api/users", userRoutes);

// Test route
app.get("/api/hello", (req, res) => {
  res.send("Backend running with clean structure!");
});

// Serve frontend on root if opened directly
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

const PORT = process.env.PORT || 7000;

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;