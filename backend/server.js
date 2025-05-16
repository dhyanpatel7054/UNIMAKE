const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

// Connect to MongoDB with error handling
mongoose.connect('mongodb+srv://unimake06:YBhKFEOkfC4oXv6t@cluster0.q9htute.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Middleware
app.use(cors({
  origin:["http://deploy-mern-1whq.vercel.app"],
  methods:['POST','GET'],
  credentials:true
}))
app.use(express.json());
// Routes
const routes = require('./routes/routes');
app.use('/api', routes);

// Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});