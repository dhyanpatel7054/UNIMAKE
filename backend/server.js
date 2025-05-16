const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

// Connect to MongoDB
mongoose.connect('mongodb+srv://unimake06:YBhKFEOkfC4oXv6t@cluster0.q9htute.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Middleware
app.use(cors({
  origin: ["http://localhost:5173", "https://unimake-r83c.vercel.app/"],
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

// Routes
const routes = require('./routes/routes');
app.use('/api', routes);

// Default route for testing
app.get("/", (req, res) => {
  res.send("API is working!");
});

// Export for Vercel
module.exports = app;
