// Utility functions for profile data management
import axios from 'axios';

// Add a request interceptor to send JWT token in Authorization header
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
import { API_BASE_URL } from '../config';

// Get user initials from name
export const getInitials = (name) => {
  if (!name) return '';
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

// Get user profile data based on role and email
export const getUserProfile = async (role, email) => {
  if (!email) {
    // Fallback to localStorage if no email provided
    const storedEmail = localStorage.getItem('userEmail');
    if (!storedEmail) {
      return getDefaultProfile(role);
    }
    email = storedEmail;
  }

  if (role === 'admin') {
    // For admin, just return minimal profile from localStorage
    return {
      name: localStorage.getItem('userName') || 'Admin',
      role: 'admin',
      email: email,
      headline: '',
      about: '',
      profilePhoto: ''
    };
  }

  try {
    const endpoint = role === 'alumni' ? '/alumni/get/' : '/student/get/';
    const response = await axios.get(`${API_BASE_URL}${endpoint}${email}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return getDefaultProfile(role);
  }
};

// Get default profile data for fallback
export const getDefaultProfile = (role) => {
  if (role === 'alumni') {
    return {
      name: 'Alumni User',
      role: 'Alumni',
      email: '',
      headline: '',
      about: '',
      profilePhoto: ''
    };
  } else {
    return {
      name: 'Student User',
      role: 'Student',
      email: '',
      headline: '',
      about: '',
      profilePhoto: ''
    };
  }
};

// Get profile from localStorage as fallback
export const getProfileFromStorage = (role) => {
  if (role === 'alumni') {
    const alumniProfiles = localStorage.getItem('alumniProfiles');
    if (alumniProfiles) {
      const profiles = JSON.parse(alumniProfiles);
      return profiles.length > 0 ? profiles[0] : getDefaultProfile(role);
    }
  } else {
    const studentProfile = localStorage.getItem('studentProfile');
    if (studentProfile) {
      return JSON.parse(studentProfile);
    }
  }
  return getDefaultProfile(role);
}; 