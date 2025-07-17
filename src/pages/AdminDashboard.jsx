import { useEffect, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Link } from 'react-router-dom';

const mockNotifications = [
  { id: 1, message: '5 new users registered today.' },
  { id: 2, message: 'Event "AI Hackathon" received 20 new applicants.' },
  { id: 3, message: 'System backup completed successfully.' },
];

const mockActivity = [
  { id: 1, text: 'Approved 5 new users', time: '09:00 AM, Jul 11, 2025' },
  { id: 2, text: 'Updated event details', time: '08:45 AM, Jul 11, 2025' },
  { id: 3, text: 'Reviewed user report', time: '08:30 AM, Jul 11, 2025' },
];

const getStats = () => {
  // Users
  const studentProfile = localStorage.getItem('studentProfile');
  const alumniProfiles = localStorage.getItem('alumniProfiles');
  const students = studentProfile ? 1 : 0;
  const alumni = alumniProfiles ? JSON.parse(alumniProfiles).length : 0;
  const totalUsers = students + alumni;
  // Events
  const events = localStorage.getItem('events');
  const eventsArr = events ? JSON.parse(events) : [];
  const totalEvents = eventsArr.length;
  const activeEvents = eventsArr.filter(ev => ev.status === 'Active').length;
  const applicants = eventsArr.reduce((sum, ev) => sum + (ev.applicants || 0), 0);
  return { totalUsers, totalEvents, activeEvents, applicants };
};

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalUsers: 0, totalEvents: 0, activeEvents: 0, applicants: 0 });
  const [notifications, setNotifications] = useState(mockNotifications);
  const [activity, setActivity] = useState(mockActivity);

  useEffect(() => {
    setStats(getStats());
  }, []);

  return (
    <DashboardLayout role="admin">
      <div className="space-y-8">
        {/* Banner/Header */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg mb-4">
          <div className="h-52 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          <div className="absolute left-8 top-4 flex items-center gap-4">
            <h1 className="text-3xl font-extrabold text-white drop-shadow-lg tracking-wide ml-3">Campus Chain</h1>
          </div>
          <div className="absolute left-12 top-16 flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-white border-4 border-indigo-400 flex items-center justify-center text-indigo-600 font-bold text-3xl shadow-lg ml-4 mb-8">
              AD
            </div>
            <div className="text-white drop-shadow-lg">
              <h2 className="text-2xl font-bold">Welcome, Admin!</h2>
              <p className="text-base opacity-90">Manage your campus system, users, and events from one place.</p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-6 rounded-xl shadow text-center text-white hover:scale-105 transition-transform">
            <div className="w-14 h-14 mx-auto mb-2 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-3xl text-indigo-600">
              <i className="fas fa-users"></i>
            </div>
            <div className="text-3xl font-bold">{stats.totalUsers}</div>
            <p className="font-medium mt-1">Total Users</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center hover:scale-105 transition-transform border border-indigo-100">
            <div className="w-14 h-14 mx-auto mb-2 rounded-full bg-indigo-100 flex items-center justify-center text-3xl text-indigo-600">
              <i className="fas fa-calendar-alt"></i>
            </div>
            <div className="text-3xl font-bold text-indigo-700">{stats.totalEvents}</div>
            <p className="font-medium mt-1 text-indigo-700">Total Events</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center hover:scale-105 transition-transform border border-purple-100">
            <div className="w-14 h-14 mx-auto mb-2 rounded-full bg-purple-100 flex items-center justify-center text-3xl text-purple-600">
              <i className="fas fa-calendar-check"></i>
            </div>
            <div className="text-3xl font-bold text-purple-700">{stats.activeEvents}</div>
            <p className="font-medium mt-1 text-purple-700">Active Events</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center hover:scale-105 transition-transform border border-pink-100">
            <div className="w-14 h-14 mx-auto mb-2 rounded-full bg-pink-100 flex items-center justify-center text-3xl text-pink-600">
              <i className="fas fa-user-plus"></i>
            </div>
            <div className="text-3xl font-bold text-pink-700">{stats.applicants}</div>
            <p className="font-medium mt-1 text-pink-700">Applicants</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="/admin/users" className="bg-white p-6 rounded-xl shadow flex flex-col items-center hover:bg-indigo-50 transition-all">
            <i className="fas fa-users-cog text-3xl text-indigo-500 mb-2"></i>
            <span className="font-semibold text-indigo-700">Manage Users</span>
          </Link>
          <Link to="/admin/events" className="bg-white p-6 rounded-xl shadow flex flex-col items-center hover:bg-purple-50 transition-all">
            <i className="fas fa-calendar-edit text-3xl text-purple-500 mb-2"></i>
            <span className="font-semibold text-purple-700">Manage Events</span>
          </Link>
          <Link to="/admin/analytics" className="bg-white p-6 rounded-xl shadow flex flex-col items-center hover:bg-pink-50 transition-all">
            <i className="fas fa-chart-bar text-3xl text-pink-500 mb-2"></i>
            <span className="font-semibold text-pink-700">Analytics</span>
          </Link>
          <Link to="/admin/settings" className="bg-white p-6 rounded-xl shadow flex flex-col items-center hover:bg-gray-50 transition-all">
            <i className="fas fa-cog text-3xl text-gray-500 mb-2"></i>
            <span className="font-semibold text-gray-700">Settings</span>
          </Link>
        </div>

        {/* Notifications & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Notifications */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><i className="fas fa-bell text-indigo-500"></i> Notifications</h2>
            <ul className="space-y-3">
              {notifications.map((n) => (
                <li key={n.id} className="flex items-center gap-2 text-gray-700">
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 text-lg"><i className="fas fa-bell"></i></span>
                  <span>{n.message}</span>
                </li>
              ))}
            </ul>
          </div>
        {/* Recent Activity */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><i className="fas fa-stream text-purple-500"></i> Recent Activity</h2>
            <ol className="relative border-l-2 border-indigo-200 ml-4">
              {activity.map((a) => (
                <li key={a.id} className="mb-6 ml-6">
                  <span className="absolute -left-4 flex items-center justify-center w-8 h-8 bg-indigo-100 rounded-full ring-4 ring-white"><i className="fas fa-check text-indigo-600"></i></span>
                  <span className="text-gray-700">{a.text} <span className="text-xs text-gray-400 ml-2">{a.time}</span></span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* System Health (Extra Feature) */}
        <div className="bg-white p-6 rounded-xl shadow flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2"><i className="fas fa-server text-green-500"></i> System Health</h2>
            <p className="text-green-600 font-semibold">All systems operational</p>
            <p className="text-gray-500 text-sm mt-1">Last checked: {new Date().toLocaleString()}</p>
          </div>
          <button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded-lg font-semibold shadow hover:scale-105 transition-transform">Export Data</button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;