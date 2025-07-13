import { useContext } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { SavedEventsContext } from '../context/SavedEventsContext';

const AdminDashboard = () => {
  const { savedEvents } = useContext(SavedEventsContext);

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        {/* Topbar */}
        <div className="flex justify-end items-center p-4 bg-white rounded-lg shadow">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-semibold">
              AD
            </div>
            <div>
              <h3 className="text-sm font-semibold">Bhavya Kapoor</h3>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-2">Welcome, Bhavya!</h1>
          <p className="text-gray-600">
            Here’s your control panel to manage users, events, and system settings.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xl">
              500
            </div>
            <p className="text-gray-600">Total Users</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xl">
              20
            </div>
            <p className="text-gray-600">Active Events</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xl">
              {Object.values(savedEvents).filter((saved) => saved).length}
            </div>
            <p className="text-gray-600">Saved Items</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">Recent Activity</h2>
          <div className="space-y-2">
            <p className="text-gray-600">Approved 5 new users - 09:00 AM IST, Jul 11, 2025</p>
            <p className="text-gray-600">Updated event details - 08:45 AM IST, Jul 11, 2025</p>
            <p className="text-gray-600">Reviewed user report - 08:30 AM IST, Jul 11, 2025</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;