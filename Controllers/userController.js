const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const USER = require('../Model/user');
require('dotenv').config(); // To use environment variables

// Load environment variables
const SECRET_KEY = process.env.JWT_SECRET_KEY || "your_secret_key"; // Change with your .env value



 
const userSignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await USER.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await USER.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id }, SECRET_KEY, { expiresIn: "1h" });

    // Send response with the token
    res.status(201).json({
      message: "Signup successful",
      data: newUser,
      token, // Send the token
    });
  } catch (error) {
    res.status(500).json({ message: "Signup failed", error });
  }
};

// Login logic
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await USER.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the password matches
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Create a JWT token
        const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({
            message: "Login successful",
            token, // Send the token back to the client
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
};



const authenticateToken = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1]; // Expect "Bearer <token>"
    if (!token) {
        return res.status(403).json({ message: "Access Denied" });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid Token" });
        }
        req.user = user; // Attach the user data to the request object
        next();
    });
};



module.exports = { userSignUp, userLogin, authenticateToken };
