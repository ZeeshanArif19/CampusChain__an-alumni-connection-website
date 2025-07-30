const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

module.exports = (User) => {
  // Register
  router.post('/register', async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
      if (!name || !email || !password || !role) {
        return res.status(400).json({ message: 'All fields are required' });
      }
      const existing = await User.findOne({ email });
      if (existing) return res.status(409).json({ message: 'Email already exists' });
      const hashed = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashed, role });
      await user.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });

  // Login
  router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password required' });
      }
      const user = await User.findOne({ email });
      if (!user) return res.status(401).json({ message: 'Invalid credentials' });
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ message: 'Invalid credentials' });
      res.json({ message: 'Login successful', user: { name: user.name, email: user.email, role: user.role } });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });

  return router;
};
