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
  let filled = fields.filter(f => f && (Array.isArray(f) ? f > 0 : true)).length;
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

  // Handlers for main fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Handlers for education
  const handleEducationChange = (idx, field, value) => {
    setProfile((prev) => ({
      ...prev,
      education: prev.education.map((edu, i) =>
        i === idx ? { ...edu, [field]: value } : edu
      ),
    }));
  };
  const addEducation = () => {
    setProfile((prev) => ({
      ...prev,
      education: [...prev.education, { college: '', course: '', year: '' }],
    }));
  };
  const removeEducation = (idx) => {
    setProfile((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== idx),
    }));
  };

  // Handlers for skills
  const handleSkillChange = (idx, value) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.map((s, i) => (i === idx ? value : s)),
    }));
  };
  const addSkill = () => {
    setProfile((prev) => ({ ...prev, skills: [...prev.skills, ''] }));
  };
  const removeSkill = (idx) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== idx),
    }));
  };

  // Photo handlers
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, profilePhoto: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };
  const handleRemovePhoto = () => {
    setProfile((prev) => ({ ...prev, profilePhoto: '' }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Project handlers
  const handleProjectChange = (idx, field, value) => {
    setProfile((prev) => ({
      ...prev,
      projects: prev.projects.map((proj, i) =>
        i === idx ? { ...proj, [field]: value } : proj
      ),
    }));
  };
  const addProject = () => {
    setProfile((prev) => ({
      ...prev,
      projects: [...prev.projects, { title: '', description: '', link: '' }],
    }));
  };
  const removeProject = (idx) => {
    setProfile((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== idx),
    }));
  };

  // Certification handlers
  const handleCertificationChange = (idx, field, value) => {
    setProfile((prev) => ({
      ...prev,
      certifications: prev.certifications.map((cert, i) =>
        i === idx ? { ...cert, [field]: value } : cert
      ),
    }));
  };
  const addCertification = () => {
    setProfile((prev) => ({
      ...prev,
      certifications: [...prev.certifications, { name: '', issuer: '', date: '' }],
    }));
  };
  const removeCertification = (idx) => {
    setProfile((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== idx),
    }));
  };

  // Language handlers
  const handleLanguageChange = (idx, value) => {
    setProfile((prev) => ({
      ...prev,
      languages: prev.languages.map((lang, i) => (i === idx ? value : lang)),
    }));
  };
  const addLanguage = () => {
    setProfile((prev) => ({ ...prev, languages: [...prev.languages, ''] }));
  };
  const removeLanguage = (idx) => {
    setProfile((prev) => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== idx),
    }));
  };

  // Achievement handlers
  const handleAchievementChange = (idx, field, value) => {
    setProfile((prev) => ({
      ...prev,
      achievements: prev.achievements.map((ach, i) =>
        i === idx ? { ...ach, [field]: value } : ach
      ),
    }));
  };
  const addAchievement = () => {
    setProfile((prev) => ({
      ...prev,
      achievements: [...prev.achievements, { title: '', description: '' }],
    }));
  };
  const removeAchievement = (idx) => {
    setProfile((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== idx),
    }));
  };

  // Experience handlers
  const handleExperienceChange = (idx, field, value) => {
    setProfile((prev) => ({
      ...prev,
      experience: prev.experience.map((exp, i) =>
        i === idx ? { ...exp, [field]: value } : exp
      ),
    }));
  };
  const addExperience = () => {
    setProfile((prev) => ({
      ...prev,
      experience: [...prev.experience, { company: '', position: '', duration: '' }],
    }));
  };
  const removeExperience = (idx) => {
    setProfile((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== idx),
    }));
  };

  // Mentoring handlers (alumni-specific)
  const handleMentoringChange = (idx, field, value) => {
    setProfile((prev) => ({
      ...prev,
      mentoring: prev.mentoring.map((ment, i) =>
        i === idx ? { ...ment, [field]: value } : ment
      ),
    }));
  };
  const addMentoring = () => {
    setProfile((prev) => ({
      ...prev,
      mentoring: [...prev.mentoring, { topic: '', description: '' }],
    }));
  };
  const removeMentoring = (idx) => {
    setProfile((prev) => ({
      ...prev,
      mentoring: prev.mentoring.filter((_, i) => i !== idx),
    }));
  };

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
                  <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={handlePhotoChange} />
                  <button type="button" className="absolute bottom-0 right-0 bg-indigo-500 text-white rounded-full p-2 shadow hover:bg-indigo-600" onClick={() => fileInputRef.current && fileInputRef.current.click()} title="Upload photo"><i className="fas fa-camera"></i></button>
                  {profile.profilePhoto && (<button type="button" className="absolute top-0 right-0 bg-white border border-gray-300 rounded-full p-1 text-xs text-gray-600 hover:bg-gray-100" onClick={handleRemovePhoto} title="Remove photo"><i className="fas fa-times"></i></button>)}
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
              <h2 className="text-3xl font-bold text-gray-800">{editMode ? <input name="name" value={profile.name} onChange={handleChange} className="font-bold text-2xl border-b border-indigo-200 focus:outline-none" /> : profile.name}</h2>
              <p className="text-lg text-gray-600 mt-1">{editMode ? (<input name="headline" value={profile.headline} onChange={handleChange} className="w-full border-b border-indigo-200 focus:outline-none" />) : profile.headline}</p>
              <p className="text-base text-gray-500 mt-1">{editMode ? (<input name="currentJob" value={profile.currentJob} onChange={handleChange} className="w-full border-b border-indigo-200 focus:outline-none" />) : profile.currentJob}</p>
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

          {/* About Section (with privacy toggle) */}
          <div className="bg-indigo-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2"><i className="fas fa-user text-indigo-400"></i> About</h3>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700 font-semibold">About</span>
              <label className="flex items-center text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" checked={profile.privacy.about} onChange={() => setProfile(prev => ({ ...prev, privacy: { ...prev.privacy, about: !prev.privacy.about } }))} className="mr-2" />
                <span className="ml-1">Make this section private</span>
              </label>
            </div>
            {editMode ? (
              <textarea name="about" value={profile.about} onChange={handleChange} className="w-full border border-indigo-200 rounded-lg p-3 focus:outline-none" rows={3} />
            ) : (
              <p className="text-gray-700 whitespace-pre-line">{profile.about}</p>
            )}
          </div>

          {/* Education Section */}
          <div className="bg-indigo-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2"><i className="fas fa-graduation-cap text-indigo-400"></i> Education</h3>
            <div className="space-y-3">
              {profile.education.map((edu, idx) => (
                <div key={idx} className="bg-indigo-50 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-2">
                  {editMode ? (
                    <>
                      <input
                        type="text"
                        value={edu.college}
                        onChange={e => handleEducationChange(idx, 'college', e.target.value)}
                        placeholder="College Name"
                        className="border-b border-indigo-200 focus:outline-none mr-2 mb-1"
                      />
                      <input
                        type="text"
                        value={edu.course}
                        onChange={e => handleEducationChange(idx, 'course', e.target.value)}
                        placeholder="Course Name"
                        className="border-b border-indigo-200 focus:outline-none mr-2 mb-1"
                      />
            <input
              type="text"
                        value={edu.year}
                        onChange={e => handleEducationChange(idx, 'year', e.target.value)}
                        placeholder="Year"
                        className="border-b border-indigo-200 focus:outline-none w-20 mb-1"
                      />
                      <button type="button" className="text-red-400 ml-2" onClick={() => removeEducation(idx)} title="Remove"><i className="fas fa-trash"></i></button>
                    </>
                  ) : (
                    <>
                      <span className="font-semibold text-indigo-700">{edu.college}</span>
                      <span className="text-gray-600">{edu.course}</span>
                      <span className="text-gray-400 text-sm">{edu.year}</span>
                    </>
                  )}
                </div>
              ))}
              {editMode && (
                <button type="button" className="mt-2 px-4 py-1 bg-indigo-100 text-indigo-700 rounded-lg font-semibold" onClick={addEducation}><i className="fas fa-plus"></i> Add Education</button>
              )}
            </div>
          </div>

          {/* Skills Section */}
          <div className="bg-indigo-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2"><i className="fas fa-lightbulb text-indigo-400"></i> Skills</h3>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, idx) => (
                editMode ? (
                  <span key={idx} className="flex items-center bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
            <input
                      type="text"
                      value={skill}
                      onChange={e => handleSkillChange(idx, e.target.value)}
                      className="bg-transparent border-b border-indigo-200 focus:outline-none w-24"
                    />
                    <button type="button" className="ml-1 text-red-400" onClick={() => removeSkill(idx)} title="Remove"><i className="fas fa-times"></i></button>
                  </span>
                ) : (
                  <span key={idx} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-semibold">{skill}</span>
                )
              ))}
              {editMode && (
                <button type="button" className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full font-semibold" onClick={addSkill}><i className="fas fa-plus"></i> Add Skill</button>
              )}
            </div>
          </div>

          {/* Projects Section */}
          <div className="bg-indigo-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2"><i className="fas fa-project-diagram text-indigo-400"></i> Projects</h3>
            <div className="space-y-3">
              {profile.projects.map((project, idx) => (
                <div key={idx} className="bg-indigo-50 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-2">
                  {editMode ? (
                    <>
                      <input
                        type="text"
                        value={project.title}
                        onChange={e => handleProjectChange(idx, 'title', e.target.value)}
                        placeholder="Project Title"
                        className="border-b border-indigo-200 focus:outline-none mr-2 mb-1"
                      />
                      <input
                        type="text"
                        value={project.description}
                        onChange={e => handleProjectChange(idx, 'description', e.target.value)}
                        placeholder="Project Description"
                        className="border-b border-indigo-200 focus:outline-none mr-2 mb-1"
                      />
            <input
              type="text"
                        value={project.link}
                        onChange={e => handleProjectChange(idx, 'link', e.target.value)}
                        placeholder="Project Link"
                        className="border-b border-indigo-200 focus:outline-none mr-2 mb-1"
                      />
                      <button type="button" className="text-red-400 ml-2" onClick={() => removeProject(idx)} title="Remove"><i className="fas fa-trash"></i></button>
                    </>
                  ) : (
                    <>
                      <span className="font-semibold text-indigo-700">{project.title}</span>
                      <p className="text-gray-600">{project.description}</p>
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline text-sm">{project.link}</a>
                    </>
                  )}
                </div>
              ))}
              {editMode && (
                <button type="button" className="mt-2 px-4 py-1 bg-indigo-100 text-indigo-700 rounded-lg font-semibold" onClick={addProject}><i className="fas fa-plus"></i> Add Project</button>
              )}
            </div>
          </div>

          {/* Certifications Section */}
          <div className="bg-indigo-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2"><i className="fas fa-certificate text-indigo-400"></i> Certifications</h3>
            <div className="space-y-3">
              {profile.certifications.map((cert, idx) => (
                <div key={idx} className="bg-indigo-50 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-2">
                  {editMode ? (
                    <>
                      <input
                        type="text"
                        value={cert.name}
                        onChange={e => handleCertificationChange(idx, 'name', e.target.value)}
                        placeholder="Certification Name"
                        className="border-b border-indigo-200 focus:outline-none mr-2 mb-1"
                      />
                      <input
                        type="text"
                        value={cert.issuer}
                        onChange={e => handleCertificationChange(idx, 'issuer', e.target.value)}
                        placeholder="Issuer"
                        className="border-b border-indigo-200 focus:outline-none mr-2 mb-1"
                      />
            <input
              type="text"
                        value={cert.date}
                        onChange={e => handleCertificationChange(idx, 'date', e.target.value)}
                        placeholder="Date"
                        className="border-b border-indigo-200 focus:outline-none w-20 mb-1"
                      />
                      <button type="button" className="text-red-400 ml-2" onClick={() => removeCertification(idx)} title="Remove"><i className="fas fa-trash"></i></button>
                    </>
                  ) : (
                    <>
                      <span className="font-semibold text-indigo-700">{cert.name}</span>
                      <span className="text-gray-600">{cert.issuer}</span>
                      <span className="text-gray-400 text-sm">{cert.date}</span>
                    </>
                  )}
                </div>
              ))}
              {editMode && (
                <button type="button" className="mt-2 px-4 py-1 bg-indigo-100 text-indigo-700 rounded-lg font-semibold" onClick={addCertification}><i className="fas fa-plus"></i> Add Certification</button>
              )}
            </div>
          </div>

          {/* Languages Section */}
          <div className="bg-indigo-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2"><i className="fas fa-language text-indigo-400"></i> Languages</h3>
            <div className="flex flex-wrap gap-2">
              {profile.languages.map((lang, idx) => (
                editMode ? (
                  <span key={idx} className="flex items-center bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
            <input
              type="text"
                      value={lang}
                      onChange={e => handleLanguageChange(idx, e.target.value)}
                      className="bg-transparent border-b border-indigo-200 focus:outline-none w-24"
                    />
                    <button type="button" className="ml-1 text-red-400" onClick={() => removeLanguage(idx)} title="Remove"><i className="fas fa-times"></i></button>
                  </span>
                ) : (
                  <span key={idx} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-semibold">{lang}</span>
                )
              ))}
              {editMode && (
                <button type="button" className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full font-semibold" onClick={addLanguage}><i className="fas fa-plus"></i> Add Language</button>
              )}
            </div>
          </div>

          {/* Achievements Section */}
          <div className="bg-indigo-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2"><i className="fas fa-trophy text-indigo-400"></i> Achievements</h3>
            <div className="space-y-3">
              {profile.achievements.map((achievement, idx) => (
                <div key={idx} className="bg-indigo-50 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-2">
                  {editMode ? (
                    <>
                      <input
                        type="text"
                        value={achievement.title}
                        onChange={e => handleAchievementChange(idx, 'title', e.target.value)}
                        placeholder="Achievement Title"
                        className="border-b border-indigo-200 focus:outline-none mr-2 mb-1"
                      />
            <input
              type="text"
                        value={achievement.description}
                        onChange={e => handleAchievementChange(idx, 'description', e.target.value)}
                        placeholder="Achievement Description"
                        className="border-b border-indigo-200 focus:outline-none mr-2 mb-1"
                      />
                      <button type="button" className="text-red-400 ml-2" onClick={() => removeAchievement(idx)} title="Remove"><i className="fas fa-trash"></i></button>
                    </>
                  ) : (
                    <>
                      <span className="font-semibold text-indigo-700">{achievement.title}</span>
                      <p className="text-gray-600">{achievement.description}</p>
                    </>
                  )}
                </div>
              ))}
              {editMode && (
                <button type="button" className="mt-2 px-4 py-1 bg-indigo-100 text-indigo-700 rounded-lg font-semibold" onClick={addAchievement}><i className="fas fa-plus"></i> Add Achievement</button>
              )}
            </div>
          </div>

          {/* Experience Timeline */}
          <div className="bg-indigo-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2"><i className="fas fa-history text-indigo-400"></i> Experience</h3>
            <div className="space-y-3">
              {profile.experience.map((exp, idx) => (
                <div key={idx} className="bg-indigo-50 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-2">
                  {editMode ? (
                    <>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={e => handleExperienceChange(idx, 'company', e.target.value)}
                        placeholder="Company Name"
                        className="border-b border-indigo-200 focus:outline-none mr-2 mb-1"
                      />
                <input
                        type="text"
                        value={exp.position}
                        onChange={e => handleExperienceChange(idx, 'position', e.target.value)}
                        placeholder="Position"
                        className="border-b border-indigo-200 focus:outline-none mr-2 mb-1"
                      />
                <input
                        type="text"
                        value={exp.duration}
                        onChange={e => handleExperienceChange(idx, 'duration', e.target.value)}
                        placeholder="Duration (e.g., 2022 - Present)"
                        className="border-b border-indigo-200 focus:outline-none mr-2 mb-1"
                      />
                      <button type="button" className="text-red-400 ml-2" onClick={() => removeExperience(idx)} title="Remove"><i className="fas fa-trash"></i></button>
                    </>
                  ) : (
                    <>
                      <span className="font-semibold text-indigo-700">{exp.company}</span>
                      <span className="text-gray-600">{exp.position}</span>
                      <span className="text-gray-400 text-sm">{exp.duration}</span>
                    </>
                  )}
                </div>
              ))}
              {editMode && (
                <button type="button" className="mt-2 px-4 py-1 bg-indigo-100 text-indigo-700 rounded-lg font-semibold" onClick={addExperience}><i className="fas fa-plus"></i> Add Experience</button>
              )}
            </div>
          </div>

          {/* Mentoring Section (alumni-specific) */}
          <div className="bg-indigo-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2"><i className="fas fa-chalkboard-teacher text-indigo-400"></i> Mentoring</h3>
            <div className="space-y-3">
              {profile.mentoring.map((ment, idx) => (
                <div key={idx} className="bg-indigo-50 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-2">
                  {editMode ? (
                    <>
                      <input
                        type="text"
                        value={ment.topic}
                        onChange={e => handleMentoringChange(idx, 'topic', e.target.value)}
                        placeholder="Mentoring Topic"
                        className="border-b border-indigo-200 focus:outline-none mr-2 mb-1"
                      />
                      <input
                        type="text"
                        value={ment.description}
                        onChange={e => handleMentoringChange(idx, 'description', e.target.value)}
                        placeholder="Description"
                        className="border-b border-indigo-200 focus:outline-none mr-2 mb-1"
                      />
                      <button type="button" className="text-red-400 ml-2" onClick={() => removeMentoring(idx)} title="Remove"><i className="fas fa-trash"></i></button>
                    </>
                  ) : (
                    <>
                      <span className="font-semibold text-indigo-700">{ment.topic}</span>
                      <p className="text-gray-600">{ment.description}</p>
                    </>
                  )}
                </div>
              ))}
              {editMode && (
                <button type="button" className="mt-2 px-4 py-1 bg-indigo-100 text-indigo-700 rounded-lg font-semibold" onClick={addMentoring}><i className="fas fa-plus"></i> Add Mentoring</button>
              )}
            </div>
          </div>

          {/* Contact & Academic Details */}
          <div className="bg-indigo-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2"><i className="fas fa-address-card text-indigo-400"></i> Contact & Academic Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-700 mb-1">Phone</h4>
                {editMode ? (
                  <input type="text" name="phone" value={profile.phone} onChange={handleChange} className="w-full border-b border-indigo-200 focus:outline-none" />
                ) : (
                  <p className="text-gray-600">{profile.phone || <span className="text-gray-400">Not provided</span>}</p>
                )}
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-1">College</h4>
                {editMode ? (
                  <input type="text" name="college" value={profile.college} onChange={handleChange} className="w-full border-b border-indigo-200 focus:outline-none" />
                ) : (
                  <p className="text-gray-600">{profile.college || <span className="text-gray-400">Not provided</span>}</p>
                )}
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-1">Branch</h4>
                {editMode ? (
                  <input type="text" name="branch" value={profile.branch} onChange={handleChange} className="w-full border-b border-indigo-200 focus:outline-none" />
                ) : (
                  <p className="text-gray-600">{profile.branch || <span className="text-gray-400">Not provided</span>}</p>
                )}
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-1">Course Name</h4>
                {editMode ? (
                  <input type="text" name="courseName" value={profile.courseName} onChange={handleChange} className="w-full border-b border-indigo-200 focus:outline-none" />
                ) : (
                  <p className="text-gray-600">{profile.courseName || <span className="text-gray-400">Not provided</span>}</p>
                )}
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-1">Graduation Year</h4>
                {editMode ? (
                  <input type="text" name="graduationYear" value={profile.graduationYear} onChange={handleChange} className="w-full border-b border-indigo-200 focus:outline-none" />
                ) : (
                  <p className="text-gray-600">{profile.graduationYear || <span className="text-gray-400">Not provided</span>}</p>
                )}
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-1">Location</h4>
                {editMode ? (
                  <input type="text" name="location" value={profile.location} onChange={handleChange} className="w-full border-b border-indigo-200 focus:outline-none" />
                ) : (
                  <p className="text-gray-600">{profile.location || <span className="text-gray-400">Not provided</span>}</p>
                )}
              </div>
            </div>
          </div>

          {/* Edit/Save Buttons */}
          <div className="flex justify-end gap-2 mt-6">
            <button className="bg-indigo-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-600" onClick={handleSave}><i className="fas fa-download"></i> Download PDF</button>
            <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300" onClick={() => window.print()}><i className="fas fa-print"></i> Print</button>
            {editMode ? (
              <>
                <button type="button" className="bg-indigo-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-600" onClick={handleSave}>Save</button>
                <button type="button" className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300" onClick={() => setEditMode(false)}>Cancel</button>
              </>
            ) : (
              <button type="button" className="bg-indigo-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-600" onClick={() => setEditMode(true)}>Edit Profile</button>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AlumniProfile; 
