// routes/studentRoutes.js
const express = require('express');

module.exports = (Student) => {
  const router = express.Router();

  // Create profile
  router.post('/create', async (req, res) => {
    try {
      const existing = await Student.findOne({ email: req.body.email });
      if (existing) {
        return res.status(409).json({ message: "Profile with this email already exists" });
      }

      const student = new Student(req.body);
      await student.save();
      res.status(201).json(student);
    } catch (err) {
      console.error("Create error:", err);
      res.status(500).json({ message: "Server error during create", error: err.message, stack: err.stack });
    }
  });

  // Update profile by email
  router.put('/update-by-email/:email', async (req, res) => {
    try {
      // Remove _id from the update payload if present
      const { _id, ...updateData } = req.body;
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

  // Get profile by email
  router.get('/get/:email', async (req, res) => {
    try {
      console.log('Fetching profile for email:', req.params.email); // Debug: Log email
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

  return router;
};