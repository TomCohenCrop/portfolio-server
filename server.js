// server.js
require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const connectDB = require('./config/db');
const emailRoutes = require('./routes/emailRoutes');
// If you're not using Socket.io or collaboration, remove the lines for socket.io
const FRONTEND_BASE_URL = import.meta.env.FRONTEND_BASE_URL
const app = express();
const server = http.createServer(app);

// 1) Connect to MongoDB
connectDB();

// 2) Middlewares
const corsOptions = {
  origin: 'https://crop-design.vercel.app',
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['X-Requested-With', 'content-type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Add CORS middleware
app.use((req, res, next) => {
  // Allow requests from your frontend domain
  res.setHeader('Access-Control-Allow-Origin', 'https://crop-design.vercel.app');
  // Allow specific HTTP methods
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Allow specific headers in requests
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
  // Allow credentials (if needed)
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

// 3) Routes
app.use('/api/email', emailRoutes);



// 4) Start server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));