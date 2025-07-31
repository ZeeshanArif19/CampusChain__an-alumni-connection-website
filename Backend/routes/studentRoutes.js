// routes/studentRoutes.js

const express = require('express');
const { syncUserProfile, getOrCreateProfile, validateEmailConsistency } = require('../utils/profileSync');
const jwt = require('jsonwebtoken');

// JWT middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret', (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}

module.exports = (Student, User) => {
  const router = express.Router();

  // Create profile - automatically use the email from loginDB
  router.post('/create', async (req, res) => {
    try {
      const { email, ...profileData } = req.body;
      
      // Verify the user exists in loginDB with student role
      const user = await User.findOne({ email, role: 'student' });
      if (!user) {
        return res.status(404).json({ message: "User not found in login database or not a student" });
      }

      // Check if profile already exists
      const existing = await Student.findOne({ email });
      if (existing) {
        return res.status(409).json({ message: "Profile with this email already exists" });
      }

      // Create profile with the verified email
      const student = new Student({ email, ...profileData });
      await student.save();
      res.status(201).json(student);
    } catch (err) {
      console.error("Create error:", err);
      res.status(500).json({ message: "Server error during create", error: err.message, stack: err.stack });
    }
  });

  // Update profile by email - ensure email matches loginDB
  // Protect this route
  router.put('/update-by-email/:email', authenticateToken, async (req, res) => {
    try {
      const { _id, email, ...updateData } = req.body;
      
      // Verify the user exists in loginDB with student role
      const user = await User.findOne({ email: req.params.email, role: 'student' });
      if (!user) {
        return res.status(404).json({ message: "User not found in login database or not a student" });
      }

      console.log('Update payload:', updateData); // Debug: Log payload
      console.log('Updating email:', req.params.email); // Debug: Log email

      const updated = await Student.findOneAndUpdate(
        { email: req.params.email },
        { $set: updateData },
        { new: true, runValidators: true }
      );

      if (!updated) {
        return res.status(404).json({ message: "Profile not found" });
      }

      res.status(200).json(updated);
    } catch (err) {
      console.error("Update error:", err);
      res.status(500).json({ message: "Server error during update", error: err.message, stack: err.stack });
    }
  });

  // Get profile by email - ensure user is authenticated
  // Protect this route
  router.get('/get/:email', authenticateToken, async (req, res) => {
    try {
      console.log('Fetching profile for email:', req.params.email); // Debug: Log email
      
      // Verify the user exists in loginDB with student role
      const user = await User.findOne({ email: req.params.email, role: 'student' });
      if (!user) {
        return res.status(404).json({ message: "User not found in login database or not a student" });
      }

      const profile = await Student.findOne({ email: req.params.email });
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      res.status(200).json(profile);
    } catch (err) {
      console.error("Get error:", err);
      res.status(500).json({ message: "Server error during get", error: err.message, stack: err.stack });
    }
  });

  // New route to get user's own profile using their login email
  // Protect this route
  router.get('/my-profile', authenticateToken, async (req, res) => {
    try {
      // This would typically get the email from JWT token or session
      // For now, we'll expect it in query params or headers
      const userEmail = req.query.email || req.headers['user-email'];
      
      if (!userEmail) {
        return res.status(400).json({ message: "User email is required" });
      }

      // Verify the user exists in loginDB with student role
      const user = await User.findOne({ email: userEmail, role: 'student' });
      if (!user) {
        return res.status(404).json({ message: "User not found in login database or not a student" });
      }

      const profile = await Student.findOne({ email: userEmail });
      if (!profile) {
        return res.status(404).json({ message: "Profile not found. Please create your profile first." });
      }
      
      res.status(200).json(profile);
    } catch (err) {
      console.error("Get my profile error:", err);
      res.status(500).json({ message: "Server error during get", error: err.message, stack: err.stack });
    }
  });

  // New route to sync user profile
  // Protect this route
  router.post('/sync-profile', authenticateToken, async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }

      // Verify the user exists in loginDB with student role
      const user = await User.findOne({ email, role: 'student' });
      if (!user) {
        return res.status(404).json({ message: "User not found in login database or not a student" });
      }

      const syncResult = await syncUserProfile(email, 'student');
      
      if (syncResult.success) {
        res.status(200).json({
          message: syncResult.message,
          profile: syncResult.profile,
          code: syncResult.code
        });
      } else {
        res.status(400).json({
          message: syncResult.message,
          error: syncResult.error
        });
      }
    } catch (err) {
      console.error("Sync profile error:", err);
      res.status(500).json({ message: "Server error during sync", error: err.message });
    }
  });

  // New route to get or create profile
  router.get('/get-or-create/:email', async (req, res) => {
    try {
      const { email } = req.params;
      
      // Verify the user exists in loginDB with student role
      const user = await User.findOne({ email, role: 'student' });
      if (!user) {
        return res.status(404).json({ message: "User not found in login database or not a student" });
      }

      const result = await getOrCreateProfile(email, 'student');
      
      if (result.success) {
        res.status(200).json({
          profile: result.profile,
          created: result.created,
          message: result.created ? "Profile created successfully" : "Profile retrieved successfully"
        });
      } else {
        res.status(400).json({
          message: result.message,
          error: result.error
        });
      }
    } catch (err) {
      console.error("Get or create profile error:", err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  });

  // New route to validate email consistency
  router.get('/validate-email/:email', async (req, res) => {
    try {
      const { email } = req.params;
      const validationResult = await validateEmailConsistency(email);
      
      res.status(200).json(validationResult);
    } catch (err) {
      console.error("Email validation error:", err);
      res.status(500).json({ message: "Server error during validation", error: err.message });
    }
  });

  return router;
};