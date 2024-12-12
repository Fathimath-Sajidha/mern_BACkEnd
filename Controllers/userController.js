const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../Model/user');
require('dotenv').config(); // To use environment variables

// Load environment variables
const SECRET_KEY = process.env.JWT_SECRET_KEY || "your_secret_key"; // Change with your .env value



 
const userSignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await user.create({
      name,
      email,
      password: hashedPassword,
    });
    console.log(req.body)
    // Generate JWT token
    const token = jwt.sign({ id: newUser._id }, SECRET_KEY, { expiresIn: "1h" });
    console.log(SECRET_KEY);
    
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
      console.log("Login request:", { email, password });
  
      const existingUser = await user.findOne({ email });
      if (!existingUser) {
        console.log("User not found for email:", email);
        return res.status(404).json({ message: "User not found" });
      }
  
      const isPasswordValid = await bcrypt.compare(password, existingUser.password);
      console.log("Password valid:", isPasswordValid);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      const token = jwt.sign({ id: existingUser._id }, SECRET_KEY, { expiresIn: "1h" });
      console.log("JWT token generated:", token);
  
      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Server error" });
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
