const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Validate env variables
if (!process.env.MONGO_URI_STUDENT || !process.env.MONGO_URI_ALUMNI) {
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

// Log connection events
studentDBConnection.on('connected', () => console.log('✅ Connected to StudentDB'));
studentDBConnection.on('error', (err) => console.error('❌ StudentDB error:', err));

alumniDBConnection.on('connected', () => console.log('✅ Connected to AlumniDB'));
alumniDBConnection.on('error', (err) => console.error('❌ AlumniDB error:', err));

// Load schemas and create models
const Student = studentDBConnection.model('Student', require('./models/Student').schema);
const Alumni = alumniDBConnection.model('Alumni', require('./models/Alumni').schema);

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

// Load routes with models
const studentRoutes = require('./routes/studentRoutes')(Student);
const alumniRoutes = require('./routes/alumniRoutes')(Alumni);

app.use('/api/student', studentRoutes);
app.use('/api/alumni', alumniRoutes);

// Start server after DBs are connected
Promise.all([
  studentDBConnection.asPromise(),
  alumniDBConnection.asPromise(),
])
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('❌ Could not connect to databases:', err);
    process.exit(1);
  });
