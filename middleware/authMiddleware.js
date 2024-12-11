const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const USER = require('../models/user'); // Make sure the path is correct
require('dotenv').config(); // Load environment variables

const SECRET_KEY = process.env.JWT_SECRET_KEY || "your_secret_key"; // Secret key for JWT

// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Get token from the "Authorization" header

  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = decoded; // Attach the user data to the request
    next(); // Continue to the next middleware or route handler
  });
};

module.exports = { authenticateToken };
