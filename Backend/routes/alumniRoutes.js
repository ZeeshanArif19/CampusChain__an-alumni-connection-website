const express = require('express');

module.exports = (Alumni) => {
  const router = express.Router();

  router.post('/create', async (req, res) => {
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

  router.put('/update-by-email/:email', async (req, res) => {
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

  router.get('/get/:email', async (req, res) => {
    try {
      const profile = await Alumni.findOne({ email: req.params.email });
      if (!profile) return res.status(404).json({ message: "Profile not found" });
      res.status(200).json(profile);
    } catch (err) {
      console.error("Get error:", err);
      res.status(500).json({ message: "Server error during get", error: err.message });
    }
  });

  return router;
};
