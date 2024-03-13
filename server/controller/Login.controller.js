const jwt = require('jsonwebtoken');
const User = require('../database/schema/UserInfoschema');


const dotenv = require('dotenv');
dotenv.config();


exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the password is correct
    if (password !== user.password) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send the JWT token as a cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set to true in production
      maxAge: 3600000, // 1 hour
      sameSite: 'strict'
    });

    res.status(200).json({ message: 'Login successful', userId: user._id ,userName:user.username, userEmail:user.email});
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
