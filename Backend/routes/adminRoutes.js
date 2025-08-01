const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// JWT middleware for admin
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

module.exports = (User) => {
  const router = express.Router();

  // Admin login endpoint
  router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }
      // Find user with admin role
      const user = await User.findOne({ email, role: 'admin' });
      if (!user) return res.status(401).json({ message: 'Invalid credentials or not an admin' });
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ message: 'Invalid credentials' });
      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET || 'your_jwt_secret',
        { expiresIn: '2h' }
      );
      res.json({
        message: 'Admin login successful',
        token,
        user: { name: user.name, email: user.email, role: user.role }
      });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });

  // Example: Admin dashboard data
  router.get('/dashboard', authenticateAdmin, (req, res) => {
    res.status(200).json({ message: 'Welcome, admin!', admin: req.user });
  });

  // Get all students and alumni (for admin users page)
  router.get('/all-users', authenticateAdmin, async (req, res) => {
    try {
      // Access Student and Alumni models from app.locals
      const Student = req.app.locals.Student;
      const Alumni = req.app.locals.Alumni;
      const students = Student ? await Student.find({}, '-password') : [];
      const alumni = Alumni ? await Alumni.find({}, '-password') : [];
      res.status(200).json({ students, alumni });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });

  return router;
};
