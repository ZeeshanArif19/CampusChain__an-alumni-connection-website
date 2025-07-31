const mongoose = require('mongoose');
require('dotenv').config();

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
const Student = studentDBConnection.model('Student', require('./models/Student').schema);
const User = loginDBConnection.model('User', require('./models/User').schema);

async function migrateProfiles() {
  try {
    console.log('🔄 Starting profile migration...');

    // Get all students from loginDB
    const loginStudents = await User.find({ role: 'student' });
    console.log(`Found ${loginStudents.length} students in loginDB`);

    // Get all profiles from studentDB
    const studentProfiles = await Student.find({});
    console.log(`Found ${studentProfiles.length} profiles in studentDB`);

    let createdCount = 0;
    let updatedCount = 0;
    let skippedCount = 0;

    for (const loginStudent of loginStudents) {
      const existingProfile = await Student.findOne({ email: loginStudent.email });
      
      if (existingProfile) {
        console.log(`✅ Profile already exists for ${loginStudent.email}`);
        skippedCount++;
        continue;
      }

      // Create a basic profile for the student
      const newProfile = new Student({
        name: loginStudent.name,
        email: loginStudent.email,
        role: 'student',
        // Add default values for required fields
        headline: 'Student',
        about: 'Profile created automatically during migration',
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
      console.log(`✅ Created profile for ${loginStudent.email}`);
      createdCount++;
    }

    console.log('\n📊 Migration Summary:');
    console.log(`- Profiles created: ${createdCount}`);
    console.log(`- Profiles already existed: ${skippedCount}`);
    console.log(`- Total students in loginDB: ${loginStudents.length}`);
    console.log(`- Total profiles in studentDB: ${studentProfiles.length + createdCount}`);

    console.log('\n✅ Migration completed successfully!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    // Close connections
    await studentDBConnection.close();
    await loginDBConnection.close();
    process.exit(0);
  }
}

// Run migration if this file is executed directly
if (require.main === module) {
  migrateProfiles();
}

module.exports = migrateProfiles; 