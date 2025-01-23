// server.js
require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const connectDB = require('./config/db');
const emailRoutes = require('./routes/emailRoutes');
// If you're not using Socket.io or collaboration, remove the lines for socket.io

const app = express();
const server = http.createServer(app);

// 1) Connect to MongoDB
connectDB();

// 2) Middlewares
app.use(cors({ origin: 'http://localhost:5173' })); // or '*'
app.use(express.json());

// 3) Routes
app.use('/api/email', emailRoutes);



// 4) Start server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));