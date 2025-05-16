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
  origin: 'https://unimake-r83c-git-main-rajs-projects-ed5d8702.vercel.app',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Routes
const routes = require('./routes/routes');
app.use('/api', routes);

// Add root route handler
app.get('/', (req, res) => {
  res.send('Welcome to UNIMAKE API');
});

// Export the Express app for Vercel
module.exports = app;
