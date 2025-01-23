const transporter = require('../config/email');
const User = require('../models/User');

const sendEmailAndSaveUser = async (req, res) => {
  try {
    const { email, name, message } = req.body;

    // 1) Send the email
    // We want to send to ourselves so we can read the user's message
    const mailOptions = {
      from: process.env.MAIL_USERNAME,               // Must be a valid MAIL_USERNAME in your .env
      to: process.env.MAIL_USERNAME,                 // Also from .env (the site owner)
      subject: `New message from ${name}`,   // Use the user's name in the subject
      text: `Message from: ${email}\n\n The message: ${message}`
    };

    await transporter.sendMail(mailOptions);

    // 2) Save the user in MongoDB
    const user = new User({
      email,      // user's email
      name: name, // or store name in a separate field
      message
    });

    await user.save();

    // 3) Return success
    return res.status(200).json({
      message: 'Email sent and user saved successfully',
      user
    });

  } catch (error) {
    console.error('Error in sendEmailAndSaveUser:', error);
    return res.status(500).json({ error: 'Failed to send email or save user' });
  }
};

module.exports = { sendEmailAndSaveUser };