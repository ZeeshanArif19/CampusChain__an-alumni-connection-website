const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const jwt = require('jsonwebtoken');

// Middleware to check admin
function authenticateAdmin(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret', (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    if (!user.role || user.role.toLowerCase() !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }
    req.user = user;
    next();
  });
}

// Create event (admin only)
router.post('/', authenticateAdmin, async (req, res) => {
  try {
    const { title, description, date, location } = req.body;
    const createdBy = req.user.email;
    const event = new Event({ title, description, date, location, createdBy });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all events (public)
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
