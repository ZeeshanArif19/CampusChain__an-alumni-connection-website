
const express = require('express');
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

module.exports = (Alumni) => {
  const router = express.Router();

  router.post('/create', authenticateToken, async (req, res) => {
    try {
      const existing = await Alumni.findOne({ email: req.body.email });
      if (existing) {
        return res.status(409).json({ message: "Profile with this email already exists" });
      }

      const alumni = new Alumni(req.body);
      await alumni.save();
      res.status(201).json(alumni);
    } catch (err) {
      console.error("Create error:", err);
      res.status(500).json({ message: "Server error during create", error: err.message });
    }
  });

  // Protect this route
  router.put('/update-by-email/:email', authenticateToken, async (req, res) => {
    try {
      const { _id, ...updateData } = req.body;
      const updated = await Alumni.findOneAndUpdate(
        { email: req.params.email },
        { $set: updateData },
        { new: true, runValidators: true }
      );
      if (!updated) return res.status(404).json({ message: "Profile not found" });
      res.status(200).json(updated);
    } catch (err) {
      console.error("Update error:", err);
      res.status(500).json({ message: "Server error during update", error: err.message });
    }
  });

  // Protect this route
  router.get('/get/:email', authenticateToken, async (req, res) => {
    try {
      const profile = await Alumni.findOne({ email: req.params.email });
      if (!profile) return res.status(404).json({ message: "Profile not found" });
      res.status(200).json(profile);
    } catch (err) {
      console.error("Get error:", err);
      res.status(500).json({ message: "Server error during get", error: err.message });
    }
  });

  // You may want to add more protected alumni routes here as needed
  return router;


}

