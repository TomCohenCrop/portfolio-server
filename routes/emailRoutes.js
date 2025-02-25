// routes/emailRoutes.js
const express = require('express');
const { sendEmailAndSaveUser } = require('../controllers/emailController');
const router = express.Router();

// Example routes
router.post('/send-and-save', sendEmailAndSaveUser) ;

module.exports = router;