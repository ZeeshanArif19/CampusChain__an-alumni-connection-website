
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

module.exports = (User, Student, Alumni) => {
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

      // After saving the user, create a profile based on the role
      if (role === 'student') {
        const studentProfile = new Student({
          name,
          email,
          headline: 'Student',
          about: 'Newly registered student.',
          role: 'student',
        });
        await studentProfile.save();
      } else if (role === 'alumni') {
        const alumniProfile = new Alumni({
          name,
          email,
          headline: 'Alumni',
          about: 'Newly registered alumnus/alumna.',
          role: 'alumni',
        });
        await alumniProfile.save();
      }

      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      // If something goes wrong, we should ideally roll back the user creation.
      // For now, we'll log the error. A more robust implementation might use transactions.
      if (err.code === 11000) { // Handle duplicate email error in profile creation
          return res.status(409).json({ message: 'A profile with this email already exists in the role-specific database.' });
      }
      console.error("Registration error:", err);
      res.status(500).json({ message: 'Server error during registration', error: err.message });
    }
  });

  // Login
  router.post('/login', async (req, res) => {
    try {
      const { email, password, role } = req.body;
      if (!email || !password || !role) {
        return res.status(400).json({ message: 'Email, password, and role are required' });
      }
      const user = await User.findOne({ email });
      if (!user) return res.status(401).json({ message: 'Invalid credentials' });
      if (user.role.toLowerCase() !== role.toLowerCase()) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ message: 'Invalid credentials' });
      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET || 'your_jwt_secret',
        { expiresIn: '2h' }
      );
      res.json({
        message: 'Login successful',
        token,
        user: { name: user.name, email: user.email, role: user.role }
      });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });

  return router;
};
