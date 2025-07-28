// models/Alumni.js
const mongoose = require('mongoose');

const alumniSchema = new mongoose.Schema({
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
  currentJob: String,
  location: String,
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
  mentoring: [{ topic: String, description: String }],
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
    mentoring: Boolean,
    currentJob: Boolean,
  },
}, { timestamps: true });

module.exports = { schema: alumniSchema }; // ✅ Use only schema, NOT model
