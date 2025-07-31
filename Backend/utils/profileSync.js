const mongoose = require('mongoose');

// Database connections
const studentDBConnection = mongoose.createConnection(process.env.MONGO_URI_STUDENT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const loginDBConnection = mongoose.createConnection(process.env.MONGO_URI_LOGINDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Models
const Student = studentDBConnection.model('Student', require('../models/Student').schema);
const User = loginDBConnection.model('User', require('../models/User').schema);

/**
 * Sync a user's profile between loginDB and studentDB
 * @param {string} email - The user's email
 * @param {string} role - The user's role ('student' or 'alumni')
 * @returns {Object} - Result of the sync operation
 */
async function syncUserProfile(email, role = 'student') {
  try {
    // Verify user exists in loginDB
    const user = await User.findOne({ email, role });
    if (!user) {
      return {
        success: false,
        message: `User not found in loginDB with email ${email} and role ${role}`,
        code: 'USER_NOT_FOUND'
      };
    }

    // Check if profile exists in studentDB
    const existingProfile = await Student.findOne({ email });
    
    if (existingProfile) {
      return {
        success: true,
        message: `Profile already exists for ${email}`,
        code: 'PROFILE_EXISTS',
        profile: existingProfile
      };
    }

    // Create new profile with data from loginDB
    const newProfile = new Student({
      name: user.name,
      email: user.email,
      role: user.role,
      headline: 'Student',
      about: 'Profile created automatically',
      graduationYear: '2024',
      branch: 'Computer Science',
      courseName: 'Bachelor of Technology',
      college: 'Your College Name',
      yearType: 'Full Time',
      skills: ['JavaScript', 'React', 'Node.js'],
      education: [{
        college: 'Your College Name',
        course: 'Bachelor of Technology',
        year: '2024'
      }],
      privacy: {
        about: true,
        education: true,
        skills: true,
        projects: true,
        certifications: true,
        languages: true,
        socialLinks: true,
        achievements: true,
        experience: true,
      }
    });

    await newProfile.save();

    return {
      success: true,
      message: `Profile created successfully for ${email}`,
      code: 'PROFILE_CREATED',
      profile: newProfile
    };

  } catch (error) {
    console.error('Profile sync error:', error);
    return {
      success: false,
      message: 'Error syncing profile',
      code: 'SYNC_ERROR',
      error: error.message
    };
  }
}

/**
 * Get or create a user's profile
 * @param {string} email - The user's email
 * @param {string} role - The user's role
 * @returns {Object} - The user's profile
 */
async function getOrCreateProfile(email, role = 'student') {
  try {
    // First try to get existing profile
    let profile = await Student.findOne({ email });
    
    if (profile) {
      return {
        success: true,
        profile,
        created: false
      };
    }

    // If no profile exists, try to sync/create one
    const syncResult = await syncUserProfile(email, role);
    
    if (syncResult.success) {
      return {
        success: true,
        profile: syncResult.profile,
        created: syncResult.code === 'PROFILE_CREATED'
      };
    }

    return {
      success: false,
      message: syncResult.message,
      error: syncResult.error
    };

  } catch (error) {
    console.error('Get or create profile error:', error);
    return {
      success: false,
      message: 'Error getting or creating profile',
      error: error.message
    };
  }
}

/**
 * Validate email consistency between databases
 * @param {string} email - The email to validate
 * @returns {Object} - Validation result
 */
async function validateEmailConsistency(email) {
  try {
    const loginUser = await User.findOne({ email });
    const studentProfile = await Student.findOne({ email });

    const result = {
      email,
      loginDB: !!loginUser,
      studentDB: !!studentProfile,
      consistent: false,
      issues: []
    };

    if (!loginUser) {
      result.issues.push('User not found in loginDB');
    }

    if (!studentProfile) {
      result.issues.push('Profile not found in studentDB');
    }

    if (loginUser && studentProfile) {
      result.consistent = true;
    }

    return result;

  } catch (error) {
    console.error('Email validation error:', error);
    return {
      email,
      loginDB: false,
      studentDB: false,
      consistent: false,
      issues: ['Validation error: ' + error.message]
    };
  }
}

module.exports = {
  syncUserProfile,
  getOrCreateProfile,
  validateEmailConsistency
}; 