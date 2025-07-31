import { useEffect, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { FaUsers, FaUserGraduate, FaSearch } from 'react-icons/fa';

// Helper to classify student type
function getStudentType(profile) {
  if (profile.role !== 'Student') return '';
  if (profile.college && profile.yearType === 'Graduate') return 'College Student (Graduate)';
  if (profile.college && profile.yearType === 'Fresher') return 'College Student (Fresher)';
  if (!profile.college) return 'Normal User';
  return '';
}

const AdminUsersPage = () => {
  const [students, setStudents] = useState([]);
  const [alumni, setAlumni] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Load student profiles (assuming only one for now, can be extended to multiple)
    const studentProfile = localStorage.getItem('studentProfile');
    let studentsArr = [];
    if (studentProfile) {
      const parsed = JSON.parse(studentProfile);
      studentsArr = [parsed];
    }
    setStudents(studentsArr);

    // Load alumni profiles (assume array in localStorage)
    const alumniProfiles = localStorage.getItem('alumniProfiles');
    let alumniArr = [];
    if (alumniProfiles) {
      alumniArr = JSON.parse(alumniProfiles);
    }
    // Sort alumni by college name
    alumniArr.sort((a, b) => (a.college || '').localeCompare(b.college || ''));
    setAlumni(alumniArr);
  }, []);

  // Filter students and alumni by search
  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      (s.email && s.email.toLowerCase().includes(search.toLowerCase()))
  );
  const filteredAlumni = alumni.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      (a.email && a.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <DashboardLayout role="admin">
      <div className="max-w-6xl mx-auto space-y-8 py-8">
        {/* Gradient Banner/Header */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg mb-4">
          <div className="h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          <div className="absolute left-8 top-12 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white border-4 border-indigo-400 flex items-center justify-center text-indigo-600 font-bold text-2xl shadow-lg">
              <FaUsers />
            </div>
            <div className="text-white drop-shadow-lg">
              <h1 className="text-2xl font-bold">All Users</h1>
              <p className="text-base opacity-90">Manage and view all students and alumni</p>
            </div>
          </div>
        </div>
        {/* Search Bar */}
        <div className="flex justify-end mb-4">
          <div className="relative w-full max-w-xs">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full p-3 pl-10 rounded-xl border-2 border-gray-200 bg-gray-50 focus:outline-none focus:border-indigo-400 focus:bg-white transition-all shadow"
            />
          </div>
        </div>
        {/* Students Card */}
        <div className="bg-gradient-to-br from-white via-indigo-50 to-purple-50 rounded-2xl shadow-lg p-8 border border-indigo-100 mb-8">
          <h2 className="text-xl font-bold text-indigo-700 mb-4 flex items-center gap-2"><FaUsers className="text-indigo-400" /> Students</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl shadow">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Type</th>
                  <th className="p-3 text-left">College</th>
                  <th className="p-3 text-left">Year</th>
                  <th className="p-3 text-left">Graduation Year</th>
                  <th className="p-3 text-left">Branch</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length === 0 ? (
                  <tr><td colSpan={7} className="p-4 text-center text-gray-500">No student profiles found.</td></tr>
                ) : (
                  filteredStudents.map((s, idx) => (
                    <tr key={idx} className="border-b hover:bg-indigo-50 transition">
                      <td className="p-3 font-semibold text-indigo-700">{s.name}</td>
                      <td className="p-3">{s.email}</td>
                      <td className="p-3">{getStudentType(s)}</td>
                      <td className="p-3">{s.college || '-'}</td>
                      <td className="p-3">{s.yearType || '-'}</td>
                      <td className="p-3">{s.graduationYear || '-'}</td>
                      <td className="p-3">{s.branch || '-'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        {/* Alumni Card */}
        <div className="bg-gradient-to-br from-white via-purple-50 to-indigo-50 rounded-2xl shadow-lg p-8 border border-purple-100">
          <h2 className="text-xl font-bold text-purple-700 mb-4 flex items-center gap-2"><FaUserGraduate className="text-purple-400" /> Alumni <span className="text-sm text-gray-400 font-normal">(sorted by college name)</span></h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl shadow">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">College</th>
                  <th className="p-3 text-left">Graduation Year</th>
                  <th className="p-3 text-left">Branch</th>
                </tr>
              </thead>
              <tbody>
                {filteredAlumni.length === 0 ? (
                  <tr><td colSpan={5} className="p-4 text-center text-gray-500">No alumni profiles found.</td></tr>
                ) : (
                  filteredAlumni.map((a, idx) => (
                    <tr key={idx} className="border-b hover:bg-purple-50 transition">
                      <td className="p-3 font-semibold text-purple-700">{a.name}</td>
                      <td className="p-3">{a.email}</td>
                      <td className="p-3">{a.college || '-'}</td>
                      <td className="p-3">{a.graduationYear || '-'}</td>
                      <td className="p-3">{a.branch || '-'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminUsersPage; 