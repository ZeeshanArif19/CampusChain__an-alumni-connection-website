const mongoose = require('mongoose');

const loginDBConnection = mongoose.createConnection(process.env.MONGO_URI_LOGINDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
});

loginDBConnection.on('connected', () => console.log('✅ Connected to LoginDB'));
loginDBConnection.on('error', (err) => console.error('❌ LoginDB error:', err));

module.exports = loginDBConnection;
