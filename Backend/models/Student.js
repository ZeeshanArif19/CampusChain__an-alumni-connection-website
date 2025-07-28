const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  headline: String,
  about: String,
  email: { type: String, required: true, unique: true },
  phone: String,
  graduationYear: String,
  branch: String,
  courseName: String,
  role: String,
  college: String,
  yearType: String,
  profilePhoto: String,
  education: [{ college: String, course: String, year: String }],
  skills: [String],
  projects: [{ title: String, description: String, link: String }],
  certifications: [{ name: String, issuer: String, date: String }],
  languages: [String],
  socialLinks: {
    linkedin: String,
    github: String,
    portfolio: String,
  },
  achievements: [{ title: String, description: String }],
  experience: [{ company: String, position: String, duration: String }],
  privacy: {
    about: Boolean,
    education: Boolean,
    skills: Boolean,
    projects: Boolean,
    certifications: Boolean,
    languages: Boolean,
    socialLinks: Boolean,
    achievements: Boolean,
    experience: Boolean,
  },
}, { timestamps: true });

module.exports = { schema: studentSchema, model: mongoose.model('Student', studentSchema) };
