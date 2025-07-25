import { useContext, useEffect, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { SavedEventsContext } from '../context/SavedEventsContext';

const mockNotifications = [
  { id: 1, message: 'Your registration for AI Hackathon 2025 is confirmed!' },
  { id: 2, message: 'New job opportunity: Frontend Developer at Google.' },
];

const StudentDashboard = () => {
  const { savedEvents } = useContext(SavedEventsContext);
  const [events, setEvents] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Load events from localStorage
    const storedEvents = localStorage.getItem('events');
    const eventsData = storedEvents ? JSON.parse(storedEvents) : [];
    setEvents(eventsData);
    setNotifications(mockNotifications);
  }, []);

  // Count only saved events that exist in the events list
  const savedCount = events.filter((event) => savedEvents[event.id]).length;

  return (
    <DashboardLayout role="student">
      <div className="space-y-8">
        {/* Banner/Header */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg mb-4">
          <div className="h-52 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          <div className="absolute left-8 top-4 flex items-center gap-4">
            <h1 className="text-3xl font-extrabold text-white drop-shadow-lg tracking-wide ml-3">Campus Chain</h1>
          </div>
          <div className="absolute left-12 top-16 flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-white border-4 border-indigo-400 flex items-center justify-center text-indigo-600 font-bold text-3xl shadow-lg ml-4 mb-8">
              BK
            </div>
            <div className="text-white drop-shadow-lg">
              <h2 className="text-2xl font-bold">Welcome, Bhavya!</h2>
              <p className="text-base opacity-90">Stay connected with your campus and explore the latest opportunities and events.</p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-6 rounded-xl shadow text-center text-white hover:scale-105 transition-transform">
            <div className="w-14 h-14 mx-auto mb-2 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-3xl text-indigo-600">
              <i className="fas fa-calendar-alt"></i>
            </div>
            <div className="text-3xl font-bold">12</div>
            <p className="font-medium mt-1">Upcoming Events</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center hover:scale-105 transition-transform border border-indigo-100">
            <div className="w-14 h-14 mx-auto mb-2 rounded-full bg-indigo-100 flex items-center justify-center text-3xl text-indigo-600">
              <i className="fas fa-briefcase"></i>
            </div>
            <div className="text-3xl font-bold text-indigo-700">28</div>
            <p className="font-medium mt-1 text-indigo-700">Job Opportunities</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center hover:scale-105 transition-transform border border-purple-100">
            <div className="w-14 h-14 mx-auto mb-2 rounded-full bg-purple-100 flex items-center justify-center text-3xl text-purple-600">
              <i className="fas fa-bookmark"></i>
            </div>
            <div className="text-3xl font-bold text-purple-700">{savedCount}</div>
            <p className="font-medium mt-1 text-purple-700">Saved Items</p>
          </div>
        </div>

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

        {/* Upcoming Events */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><i className="fas fa-calendar-alt text-purple-500"></i> Upcoming Events</h2>
          <ul className="space-y-3">
            {events.length === 0 && <li className="text-gray-400">No upcoming events.</li>}
            {events.map((event) => (
              <li key={event.id} className="flex justify-between items-center bg-gray-50 rounded-lg px-4 py-2">
                <span>
                  <span className="font-semibold text-indigo-700">{event.title}</span> — <span className="text-gray-500">{event.date || event.startDate}</span>
                </span>
                <button
                  className={`px-3 py-1 rounded ${savedEvents[event.id] ? 'bg-green-100 text-green-700' : 'bg-indigo-100 text-indigo-700'} font-semibold`}
                  disabled
                >
                  {savedEvents[event.id] ? 'Saved' : 'Save'}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Activity Timeline */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><i className="fas fa-stream text-indigo-500"></i> Recent Activity</h2>
          <ol className="relative border-l-2 border-indigo-200 ml-4">
            <li className="mb-6 ml-6">
              <span className="absolute -left-4 flex items-center justify-center w-8 h-8 bg-indigo-100 rounded-full ring-4 ring-white"><i className="fas fa-check text-indigo-600"></i></span>
              <span className="text-gray-700">Registered for <span className="font-semibold">AI Hackathon 2025</span></span>
            </li>
            <li className="mb-6 ml-6">
              <span className="absolute -left-4 flex items-center justify-center w-8 h-8 bg-purple-100 rounded-full ring-4 ring-white"><i className="fas fa-user-friends text-purple-600"></i></span>
              <span className="text-gray-700">Connected with <span className="font-semibold">Priya Sharma</span></span>
            </li>
            <li className="ml-6">
              <span className="absolute -left-4 flex items-center justify-center w-8 h-8 bg-indigo-100 rounded-full ring-4 ring-white"><i className="fas fa-star text-indigo-600"></i></span>
              <span className="text-gray-700">Selected for <span className="font-semibold">Google Summer Internship</span></span>
            </li>
          </ol>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;