// campuschain-auth-backend/index.js

const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// PostgreSQL setup
const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'campuschain',
  password: '123',
  port: 5432,
});

// Signup Route
app.post('/signup', async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)',
      [name, email, hashedPassword, role]
    );
    res.status(201).json({ message: 'Signup successful' });
  } catch (err) {
    res.status(400).json({ error: err.detail || 'Error signing up' });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const result = await db.query('SELECT * FROM users WHERE email = $1 AND role = $2', [email, role]);
    if (result.rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    res.json({ message: 'Login successful', user: { id: user.id, name: user.name, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
