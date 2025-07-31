# Database Synchronization Guide

## Problem Description
You have three separate databases in the same MongoDB cluster:
- **loginDB**: Stores user authentication data (email, password, role)
- **studentDB**: Stores student profile data
- **alumniDB**: Stores alumni profile data

The issue is that when users register/login, their email is saved in loginDB, but when they create their profile, they might use a different email in studentDB, creating a mismatch between the databases.

## Solutions Implemented

### Solution 1: Enhanced Route Protection
The student routes now verify that users exist in loginDB before allowing profile operations. This ensures:
- Only authenticated users can create/update profiles
- Email consistency between loginDB and studentDB
- Automatic validation of user roles

### Solution 2: Migration Script
A migration script (`migrateProfiles.js`) to sync existing data between databases.

### Solution 3: Profile Sync Utilities
Utility functions to sync profiles on-demand and validate email consistency.

## How to Use

### 1. Run the Migration Script (One-time setup)
```bash
cd Backend
node migrateProfiles.js
```

This will:
- Find all students in loginDB
- Create corresponding profiles in studentDB if they don't exist
- Use the same email from loginDB
- Provide default values for required fields

### 2. Use the New API Endpoints

#### Sync a User's Profile
```bash
POST /api/student/sync-profile
Content-Type: application/json

{
  "email": "user@example.com"
}
```

#### Get or Create Profile
```bash
GET /api/student/get-or-create/user@example.com
```

#### Validate Email Consistency
```bash
GET /api/student/validate-email/user@example.com
```

#### Get User's Own Profile
```bash
GET /api/student/my-profile?email=user@example.com
```

### 3. Frontend Integration

Update your frontend to use the new endpoints:

```javascript
// After user login, sync their profile
const syncProfile = async (userEmail) => {
  try {
    const response = await fetch('/api/student/sync-profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: userEmail })
    });
    
    const result = await response.json();
    if (result.profile) {
      // Profile synced successfully
      console.log('Profile synced:', result.profile);
    }
  } catch (error) {
    console.error('Profile sync failed:', error);
  }
};

// Get user's profile (creates if doesn't exist)
const getOrCreateProfile = async (userEmail) => {
  try {
    const response = await fetch(`/api/student/get-or-create/${userEmail}`);
    const result = await response.json();
    
    if (result.profile) {
      return result.profile;
    }
  } catch (error) {
    console.error('Failed to get/create profile:', error);
  }
};
```

## Best Practices

### 1. Always Use Login Email
- When creating profiles, always use the email from loginDB
- Don't allow users to change their email in profile creation
- Validate email consistency before any profile operation

### 2. Implement JWT Authentication
For better security, implement JWT tokens instead of passing email in query parameters:

```javascript
// Add JWT middleware
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Use in routes
router.get('/my-profile', authenticateToken, async (req, res) => {
  const userEmail = req.user.email; // Get from JWT token
  // ... rest of the logic
});
```

### 3. Error Handling
Always handle these scenarios:
- User not found in loginDB
- Profile not found in studentDB
- Email mismatch between databases
- Network errors during sync

### 4. Data Validation
- Validate email format before database operations
- Ensure required fields are present
- Check role consistency (student vs alumni)

## Environment Variables
Make sure these are set in your `.env` file:
```
MONGO_URI_LOGINDB=mongodb://localhost:27017/loginDB
MONGO_URI_STUDENT=mongodb://localhost:27017/studentDB
MONGO_URI_ALUMNI=mongodb://localhost:27017/alumniDB
JWT_SECRET=your_jwt_secret_here
```

## Testing the Solutions

1. **Test Migration Script**:
   ```bash
   node migrateProfiles.js
   ```

2. **Test API Endpoints**:
   ```bash
   # Test profile sync
   curl -X POST http://localhost:5000/api/student/sync-profile \
     -H "Content-Type: application/json" \
     -d '{"email": "test@example.com"}'
   
   # Test get or create
   curl http://localhost:5000/api/student/get-or-create/test@example.com
   
   # Test email validation
   curl http://localhost:5000/api/student/validate-email/test@example.com
   ```

## Troubleshooting

### Common Issues

1. **"User not found in login database"**
   - Ensure the user exists in loginDB with the correct role
   - Check if the email is exactly the same (case-sensitive)

2. **"Profile not found"**
   - Run the migration script to create missing profiles
   - Use the sync-profile endpoint to create profiles on-demand

3. **Database Connection Issues**
   - Verify all MongoDB URIs are correct
   - Check if MongoDB is running
   - Ensure network connectivity

4. **Email Mismatch**
   - Use the validate-email endpoint to check consistency
   - Update the profile to use the login email
   - Consider implementing email change functionality

### Debug Mode
Enable debug logging by setting:
```javascript
console.log('Debug info:', { email, userExists, profileExists });
```

## Future Improvements

1. **Real-time Sync**: Implement real-time synchronization using MongoDB change streams
2. **Bulk Operations**: Add endpoints for bulk profile operations
3. **Email Change**: Allow users to change their email with proper validation
4. **Audit Trail**: Log all profile changes for debugging
5. **Caching**: Implement Redis caching for frequently accessed profiles 