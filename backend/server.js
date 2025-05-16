const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

// Connect to MongoDB with explicit database name
mongoose.connect('mongodb+srv://unimake06:YBhKFEOkfC4oXv6t@cluster0.q9htute.mongodb.net/unimake-db?retryWrites=true&w=majority')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Enhanced CORS configuration
const corsOptions = {
  origin: [
    "https://unimake-r83c.vercel.app",
    "https://unimake-rajs-projects-ed5d8702.vercel.app",
    "http://localhost:3000"
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const routes = require('./routes/routes');
app.use('/api', routes);

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to UNIMAKE API',
    version: '1.0.0'
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Resource not found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('🚨 Server Error:', err);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
});

module.exports = app;
