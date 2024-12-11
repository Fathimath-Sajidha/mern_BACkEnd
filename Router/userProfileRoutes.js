const express = require('express');
const { authenticateToken } = require('../Controllers/userController'); 
const router = express.Router();

// A protected route
router.get('/profile', authenticateToken, (req, res) => {
  // Since we added `req.user` in the middleware, we can access user data
  res.json({ message: "Profile data", user: req.user });
});

module.exports = router;
