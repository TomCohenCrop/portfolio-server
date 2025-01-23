// server/config/email.js

const nodemailer = require('nodemailer');
require('dotenv').config(); // Ensure environment variables are loaded

const transporter = nodemailer.createTransport({
  service: 'gmail', // Replace with your email provider if not Gmail
  auth: {
    user: process.env.MAIL_USERNAME,          // Your email address
    pass: process.env.MAIL_PASSWORD, // Your email password or app password
  },
});

// Verify the transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Transporter configuration error:', error);
  } else {
    console.log('Transporter is configured and ready to send emails');
  }
});

module.exports = transporter;