const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Validate env variables
if (!process.env.MONGO_URI_STUDENT || !process.env.MONGO_URI_ALUMNI || !process.env.MONGO_URI_LOGINDB) {
  console.error('Missing environment variables for MongoDB URIs.');
  process.exit(1);
}

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// Separate DB connections
const studentDBConnection = mongoose.createConnection(process.env.MONGO_URI_STUDENT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
});

const alumniDBConnection = mongoose.createConnection(process.env.MONGO_URI_ALUMNI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
});

const loginDBConnection = require('./LoginDB');

// Log connection events
studentDBConnection.on('connected', () => console.log('✅ Connected to StudentDB'));
studentDBConnection.on('error', (err) => console.error('❌ StudentDB error:', err));

alumniDBConnection.on('connected', () => console.log('✅ Connected to AlumniDB'));
alumniDBConnection.on('error', (err) => console.error('❌ AlumniDB error:', err));

// Load schemas and create models
const Student = studentDBConnection.model('Student', require('./models/Student').schema);
const Alumni = alumniDBConnection.model('Alumni', require('./models/Alumni').schema);
const User = loginDBConnection.model('User', require('./models/User').schema);

// Connection readiness middleware
const checkConnections = () => {
  return Promise.all([studentDBConnection.asPromise(), alumniDBConnection.asPromise()]);
};

app.use((req, res, next) => {
  checkConnections()
    .then(() => next())
    .catch((err) => {
      console.error('DB check failed:', err);
      res.status(503).json({ message: 'Database not available' });
    });
});

// Prevent caching of protected pages
const nocache = (req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  res.set('Surrogate-Control', 'no-store');
  next();
};

// Load routes with models
const studentRoutes = require('./routes/studentRoutes')(Student, User);
const alumniRoutes = require('./routes/alumniRoutes')(Alumni);
const authRoutes = require('./routes/authRoutes')(User, Student, Alumni);

const eventRoutes = require('./routes/eventRoutes');
// Expose Student and Alumni models to adminRoutes via app.locals
app.locals.Student = Student;
app.locals.Alumni = Alumni;
const adminRoutes = require('./routes/adminRoutes')(User);

app.use('/api/student', studentRoutes);
app.use('/api/student', nocache, studentRoutes);
app.use('/api/alumni', nocache, alumniRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/events', eventRoutes);

// Start server after DBs are connected

Promise.all([
  studentDBConnection.asPromise(),
  alumniDBConnection.asPromise(),
  loginDBConnection.asPromise(),
])
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

  })
  .catch((err) => {
    console.error('❌ Could not connect to databases:', err);
    process.exit(1);
  });
