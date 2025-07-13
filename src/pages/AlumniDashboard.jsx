import { useContext } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { SavedEventsContext } from '../context/SavedEventsContext';

const AlumniDashboard = () => {
  const { savedEvents, toggleSave } = useContext(SavedEventsContext);

  return (
    <DashboardLayout role="alumni">
      <div className="space-y-6">
        {/* Topbar */}
        <div className="flex justify-end items-center p-4 bg-white rounded-lg shadow">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-semibold">
              AK
            </div>
            <div>
              <h3 className="text-sm font-semibold">Bhavya Kapoor</h3>
              <p className="text-xs text-gray-500">Alumni</p>
            </div>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-2">Welcome, Bhavya!</h1>
          <p className="text-gray-600">
            Explore events and connect with peers from your alma mater.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xl">
              15
            </div>
            <p className="text-gray-600">Upcoming Events</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xl">
              450
            </div>
            <p className="text-gray-600">Connections</p>
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
            <p className="text-gray-600">Joined Alumni Meetup 2025</p>
            <p className="text-gray-600">Connected with Ravi Patel</p>
            <p className="text-gray-600">Saved Career Workshop</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AlumniDashboard;