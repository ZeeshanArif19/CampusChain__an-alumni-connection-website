import { useState, useRef } from 'react';
import DashboardLayout from '../components/DashboardLayout';

const initialProfile = {
  name: 'Priya Nair',
  headline: 'Data Scientist | IIT Bangalore Alumna',
  about: 'Experienced data scientist passionate about AI, mentoring, and giving back to the campus community.',
  email: 'priya.nair@email.com',
  phone: '',
  graduationYear: '2020',
  branch: 'Computer Science',
  courseName: 'B.Tech',
  role: 'Alumni',
  college: 'IIT Bangalore',
  currentJob: 'Data Scientist at Amazon',
  location: 'Bangalore',
  profilePhoto: '',
  education: [
    { college: 'IIT Bangalore', course: 'B.Tech Computer Science', year: '2020' },
  ],
  skills: ['Python', 'Machine Learning', 'Mentoring', 'Leadership'],
  projects: [],
  certifications: [],
  languages: [],
  socialLinks: { linkedin: '', github: '', portfolio: '' },
  achievements: [],
  experience: [],
  mentoring: [],
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
    mentoring: true,
    currentJob: true,
  },
};

function getProfileCompleteness(profile) {
  let fields = [profile.name, profile.headline, profile.about, profile.education.length, profile.skills.length, profile.projects.length, profile.certifications.length, profile.languages.length, profile.achievements.length, profile.experience.length, profile.currentJob, profile.mentoring.length];
  let filled = fields.filter(f => f && (Array.isArray(f) ? f.length > 0 : true)).length;
  return Math.round((filled / fields.length) * 100);
}

const AlumniProfile = () => {
  const [profile, setProfile] = useState(() => {
    const stored = localStorage.getItem('alumniProfile');
    let loaded = stored ? JSON.parse(stored) : initialProfile;
    if (!Array.isArray(loaded.education)) loaded.education = [];
    if (!Array.isArray(loaded.skills)) loaded.skills = [];
    if (!Array.isArray(loaded.projects)) loaded.projects = [];
    if (!Array.isArray(loaded.certifications)) loaded.certifications = [];
    if (!Array.isArray(loaded.languages)) loaded.languages = [];
    if (!Array.isArray(loaded.achievements)) loaded.achievements = [];
    if (!Array.isArray(loaded.experience)) loaded.experience = [];
    if (!Array.isArray(loaded.mentoring)) loaded.mentoring = [];
    if (!loaded.socialLinks) loaded.socialLinks = { linkedin: '', github: '', portfolio: '' };
    if (!loaded.privacy) loaded.privacy = initialProfile.privacy;
    return loaded;
  });
  const [editMode, setEditMode] = useState(false);
  const fileInputRef = useRef(null);

  // All handlers (copy from StudentProfile.jsx, but add for currentJob and mentoring)
  // ... (handlers for all fields, similar to StudentProfile.jsx)

  // Save
  const handleSave = () => {
    localStorage.setItem('alumniProfile', JSON.stringify(profile));
    setEditMode(false);
  };

  // Profile completeness
  const completeness = getProfileCompleteness(profile);

  return (
    <DashboardLayout role="alumni">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-0 mt-8 overflow-hidden">
        {/* Banner */}
        <div className="h-44 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative">
          <div className="absolute left-8 -bottom-14">
            <div className="relative w-32 h-32">
              {profile.profilePhoto ? (
                <img src={profile.profilePhoto} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg" />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-5xl font-bold border-4 border-white shadow-lg">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </div>
              )}
              {editMode && (
                <>
                  <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={/* ... */} />
                  <button type="button" className="absolute bottom-0 right-0 bg-indigo-500 text-white rounded-full p-2 shadow hover:bg-indigo-600" onClick={() => fileInputRef.current && fileInputRef.current.click()} title="Upload photo"><i className="fas fa-camera"></i></button>
                  {profile.profilePhoto && (<button type="button" className="absolute top-0 right-0 bg-white border border-gray-300 rounded-full p-1 text-xs text-gray-600 hover:bg-gray-100" onClick={/* ... */} title="Remove photo"><i className="fas fa-times"></i></button>)}
                </>
              )}
            </div>
          </div>
          {/* Profile completeness bar */}
          <div className="absolute right-8 bottom-4 w-64">
            <div className="text-white text-sm font-semibold mb-1">Profile Completeness: {completeness}%</div>
            <div className="w-full h-3 bg-white bg-opacity-30 rounded-full overflow-hidden">
              <div className="h-3 bg-green-400 rounded-full transition-all" style={{ width: `${completeness}%` }}></div>
            </div>
          </div>
        </div>
        <div className="pt-20 px-8 pb-8 space-y-8">
          {/* Name, Headline, Social Links, Current Job */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">{editMode ? <input name="name" value={profile.name} onChange={/* ... */} className="font-bold text-2xl border-b border-indigo-200 focus:outline-none" /> : profile.name}</h2>
              <p className="text-lg text-gray-600 mt-1">{editMode ? (<input name="headline" value={profile.headline} onChange={/* ... */} className="w-full border-b border-indigo-200 focus:outline-none" />) : profile.headline}</p>
              <p className="text-base text-gray-500 mt-1">{editMode ? (<input name="currentJob" value={profile.currentJob} onChange={/* ... */} className="w-full border-b border-indigo-200 focus:outline-none" />) : profile.currentJob}</p>
              <div className="flex gap-3 mt-2">
                {profile.socialLinks.linkedin && <a href={profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline"><i className="fab fa-linkedin"></i> LinkedIn</a>}
                {profile.socialLinks.github && <a href={profile.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:underline"><i className="fab fa-github"></i> GitHub</a>}
                {profile.socialLinks.portfolio && <a href={profile.socialLinks.portfolio} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline"><i className="fas fa-globe"></i> Portfolio</a>}
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-indigo-500 font-semibold">{profile.role}</span>
              <span className="text-gray-400 text-sm">{profile.email}</span>
            </div>
          </div>

          {/* About, Education, Skills, Projects, Certifications, Languages, Achievements, Experience, Mentoring, Contact & Academic Details, Edit/Save Buttons */}
          {/* ... Copy and adapt all sections from StudentProfile.jsx, adding alumni-specific fields and handlers ... */}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AlumniProfile; 