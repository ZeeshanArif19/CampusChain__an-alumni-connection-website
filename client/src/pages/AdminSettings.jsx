import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import { FaUserCog, FaBell, FaUserShield, FaDownload, FaTrash, FaSignOutAlt, FaTools } from 'react-icons/fa';

const AdminSettings = () => {
  // Mock state for settings
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@email.com',
    password: '',
  });
  const [notifications, setNotifications] = useState({
    systemAlerts: true,
    userReports: true,
    eventReminders: false,
  });
  const [privacy, setPrivacy] = useState({
    showAdminStatus: true,
    allowContact: false,
  });
  const [theme, setTheme] = useState('light');
  const [showDelete, setShowDelete] = useState(false);

  const navigate = useNavigate();

  // Handlers (mock)
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };
  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications((prev) => ({ ...prev, [name]: checked }));
  };
  const handlePrivacyChange = (e) => {
    const { name, checked } = e.target;
    setPrivacy((prev) => ({ ...prev, [name]: checked }));
  };
  const handleThemeToggle = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };
  const handleDeleteAccount = () => {
    setShowDelete(false);
    alert('Admin account deleted (mock)!');
  };
  const handleDownloadData = () => {
    const data = {
      profile,
      notifications,
      privacy,
      logs: [
        'Approved 5 new users',
        'Updated event details',
        'Reviewed user report',
      ],
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'admin-campuschain-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleLogout = () => {
    // Optionally clear localStorage or any auth tokens here
    navigate('/', { replace: true });
  };

  return (
    <DashboardLayout role="admin">
      <div className="max-w-2xl mx-auto space-y-10 py-8">
        {/* Page Title */}
        <div className="mb-2">
          <h1 className="text-3xl font-bold text-indigo-700 mb-1 flex items-center gap-2"><FaTools className="text-indigo-500" /> Admin Settings</h1>
          <p className="text-gray-500">Manage your admin account, notifications, and system preferences</p>
        </div>

        {/* Profile Settings */}
        <div className="bg-gradient-to-br from-white via-indigo-50 to-purple-50 rounded-2xl shadow-lg p-8 border border-indigo-100">
          <h2 className="text-xl font-bold text-indigo-700 mb-4 flex items-center gap-2"><FaUserCog className="text-indigo-400" /> Profile Settings</h2>
          <div className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition shadow-sm"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition shadow-sm"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={profile.password}
                onChange={handleProfileChange}
                className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition shadow-sm"
                placeholder="Change password"
              />
            </div>
            <button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded-lg font-semibold shadow hover:from-indigo-600 hover:to-purple-600 transition flex items-center gap-2"><FaUserCog /> Save Changes</button>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-gradient-to-br from-white via-purple-50 to-indigo-50 rounded-2xl shadow-lg p-8 border border-purple-100">
          <h2 className="text-xl font-bold text-purple-700 mb-4 flex items-center gap-2"><FaBell className="text-purple-400" /> Notification Preferences</h2>
          <div className="space-y-5">
            <label className="flex items-center gap-3 justify-between">
              <span>System Alerts</span>
              <span className="inline-block">
                <button
                  type="button"
                  aria-pressed={notifications.systemAlerts}
                  onClick={() => setNotifications(prev => ({ ...prev, systemAlerts: !prev.systemAlerts }))}
                  className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors duration-200 border-2 focus:outline-none focus:ring-2 focus:ring-green-400 ${notifications.systemAlerts ? 'bg-green-600 border-green-700 text-white' : 'bg-gray-700 border-gray-800 text-gray-300'}`}
                  title={notifications.systemAlerts ? 'Enabled' : 'Disabled'}
                >
                  {notifications.systemAlerts ? <span className="text-lg">✓</span> : <span className="text-lg">✕</span>}
                </button>
              </span>
            </label>
            <label className="flex items-center gap-3 justify-between">
              <span>User Reports</span>
              <span className="inline-block">
                <button
                  type="button"
                  aria-pressed={notifications.userReports}
                  onClick={() => setNotifications(prev => ({ ...prev, userReports: !prev.userReports }))}
                  className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors duration-200 border-2 focus:outline-none focus:ring-2 focus:ring-green-400 ${notifications.userReports ? 'bg-green-600 border-green-700 text-white' : 'bg-gray-700 border-gray-800 text-gray-300'}`}
                  title={notifications.userReports ? 'Enabled' : 'Disabled'}
                >
                  {notifications.userReports ? <span className="text-lg">✓</span> : <span className="text-lg">✕</span>}
                </button>
              </span>
            </label>
            <label className="flex items-center gap-3 justify-between">
              <span>Event Reminders</span>
              <span className="inline-block">
                <button
                  type="button"
                  aria-pressed={notifications.eventReminders}
                  onClick={() => setNotifications(prev => ({ ...prev, eventReminders: !prev.eventReminders }))}
                  className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors duration-200 border-2 focus:outline-none focus:ring-2 focus:ring-green-400 ${notifications.eventReminders ? 'bg-green-600 border-green-700 text-white' : 'bg-gray-700 border-gray-800 text-gray-300'}`}
                  title={notifications.eventReminders ? 'Enabled' : 'Disabled'}
                >
                  {notifications.eventReminders ? <span className="text-lg">✓</span> : <span className="text-lg">✕</span>}
                </button>
              </span>
            </label>
          </div>
        </div>

        {/* Admin Privacy Controls */}
        <div className="bg-gradient-to-br from-white via-indigo-50 to-purple-50 rounded-2xl shadow-lg p-8 border border-indigo-100">
          <h2 className="text-xl font-bold text-indigo-700 mb-4 flex items-center gap-2"><FaUserShield className="text-indigo-400" /> Admin Privacy Controls</h2>
          <div className="space-y-5">
            <label className="flex items-center gap-3 justify-between">
              <span>Show admin status to users</span>
              <span className="inline-block">
                <button
                  type="button"
                  aria-pressed={privacy.showAdminStatus}
                  onClick={() => setPrivacy(prev => ({ ...prev, showAdminStatus: !prev.showAdminStatus }))}
                  className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors duration-200 border-2 focus:outline-none focus:ring-2 focus:ring-green-400 ${privacy.showAdminStatus ? 'bg-green-600 border-green-700 text-white' : 'bg-gray-700 border-gray-800 text-gray-300'}`}
                  title={privacy.showAdminStatus ? 'Visible' : 'Hidden'}
                >
                  {privacy.showAdminStatus ? <span className="text-lg">✓</span> : <span className="text-lg">✕</span>}
                </button>
              </span>
            </label>
            <label className="flex items-center gap-3 justify-between">
              <span>Allow users to contact admin</span>
              <span className="inline-block">
                <button
                  type="button"
                  aria-pressed={privacy.allowContact}
                  onClick={() => setPrivacy(prev => ({ ...prev, allowContact: !prev.allowContact }))}
                  className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors duration-200 border-2 focus:outline-none focus:ring-2 focus:ring-green-400 ${privacy.allowContact ? 'bg-green-600 border-green-700 text-white' : 'bg-gray-700 border-gray-800 text-gray-300'}`}
                  title={privacy.allowContact ? 'Allowed' : 'Blocked'}
                >
                  {privacy.allowContact ? <span className="text-lg">✓</span> : <span className="text-lg">✕</span>}
                </button>
              </span>
            </label>
          </div>
        </div>

        {/* Download My Data */}
        <div className="bg-gradient-to-br from-white via-indigo-50 to-purple-50 rounded-2xl shadow-lg p-8 border border-indigo-100 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-indigo-700 mb-1 flex items-center gap-2"><FaDownload className="text-indigo-400" /> Download My Data</h2>
            <p className="text-gray-500">Export your admin profile and logs as a JSON file</p>
          </div>
          <button
            onClick={handleDownloadData}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded-lg font-semibold shadow hover:from-indigo-600 hover:to-purple-600 flex items-center gap-2"
          >
            <FaDownload /> Download
          </button>
        </div>

        {/* Account Actions */}
        <div className="bg-gradient-to-br from-white via-red-50 to-indigo-50 rounded-2xl shadow-lg p-8 border border-red-100">
          <h2 className="text-xl font-bold text-red-600 mb-4 flex items-center gap-2"><FaTrash className="text-red-400" /> Account</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-gradient-to-r from-red-500 to-red-700 text-white px-6 py-2 rounded-lg font-semibold shadow hover:from-red-600 hover:to-red-800 flex items-center gap-2" onClick={() => setShowDelete(true)}>
              <FaTrash /> Delete Account
            </button>
            <button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded-lg font-semibold shadow hover:from-indigo-600 hover:to-purple-600 flex items-center gap-2" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </div>
          {showDelete && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 mb-2 font-semibold">Are you sure you want to delete your admin account? This action cannot be undone.</p>
              <div className="flex gap-3">
                <button className="bg-red-500 text-white px-4 py-1 rounded-lg font-semibold hover:bg-red-600" onClick={handleDeleteAccount}>Yes, Delete</button>
                <button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-1 rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-600" onClick={() => setShowDelete(false)}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminSettings; 