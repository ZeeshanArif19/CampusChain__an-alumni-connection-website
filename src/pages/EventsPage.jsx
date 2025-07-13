import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { SavedEventsContext } from '../context/SavedEventsContext';

const eventsData = [
  {
    id: 'ai-hackathon',
    title: 'AI Hackathon 2025',
    category: 'Hackathon',
    location: 'Mumbai',
    startDate: '2025-07-15',
    endDate: '2025-07-17',
    description:
      'Join India’s biggest AI Hackathon featuring cutting-edge challenges in machine learning, deep learning, and AI applications. Win prizes worth ₹10L+ and connect with industry experts.',
    url: '#',
    icon: 'fas fa-calendar-alt',
  },
  {
    id: 'google-internship',
    title: 'Google Summer Internship',
    category: 'Internship',
    location: 'Online',
    startDate: '2025-06-01',
    endDate: '2025-08-31',
    description:
      'Exclusive internship opportunity with Google’s engineering team. Work on real-world projects and get mentorship from industry leaders. Stipend: ₹80,000/month.',
    url: '#',
    icon: 'fas fa-briefcase',
  },
  {
    id: 'full-stack-workshop',
    title: 'Full Stack Development Workshop',
    category: 'Workshop',
    location: 'Bangalore',
    startDate: '2025-07-20',
    endDate: '2025-07-22',
    description:
      'Comprehensive 3-day workshop covering React, Node.js, MongoDB, and deployment strategies. Build a complete web application from scratch.',
    url: '#',
    icon: 'fas fa-laptop-code',
  },
  {
    id: 'tech-summit',
    title: 'Tech Leaders Summit 2025',
    category: 'Conference',
    location: 'Delhi',
    startDate: '2025-08-10',
    endDate: '2025-08-12',
    description:
      'Network with industry leaders, attend keynote sessions, and participate in panel discussions on emerging technologies and career growth.',
    url: '#',
    icon: 'fas fa-users',
  },
];

const EventsPage = () => {
  const { savedEvents, toggleSave } = useContext(SavedEventsContext);
  const [searchInput, setSearchInput] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [filteredEvents, setFilteredEvents] = useState(eventsData);

  useEffect(() => {
    const filtered = eventsData.filter((event) => {
      const matchesSearch = event.title.toLowerCase().includes(searchInput.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || event.category === categoryFilter;
      const matchesLocation = locationFilter === 'all' || event.location === locationFilter;
      return matchesSearch && matchesCategory && matchesLocation;
    });
    setFilteredEvents(filtered);
  }, [searchInput, categoryFilter, locationFilter]);

  const formatDate = (startDate, endDate) => {
    const start = new Date(startDate).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    const end = endDate
      ? new Date(endDate).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      : '';
    return end ? `${start} - ${end}` : start;
  };

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        {/* Topbar */}
        <div className="flex justify-between items-center p-6 bg-white rounded-xl shadow">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-4">
            <i className="fas fa-calendar-alt"></i> Events & Opportunities
          </h1>
          <div className="relative group">
            <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                BK
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-800">Bhavya Kapoor</h3>
                <p className="text-xs text-gray-500">Student</p>
              </div>
            </div>
            <div className="absolute right-0 top-14 hidden group-hover:block bg-white rounded-xl shadow-xl min-w-[200px] z-10">
              <Link to="/student/profile" className="flex items-center gap-2 p-4 hover:bg-gray-100 text-gray-600">
                <i className="fas fa-user"></i> My Profile
              </Link>
              <Link to="/student/saved" className="flex items-center gap-2 p-4 hover:bg-gray-100 text-gray-600">
                <i className="fas fa-bookmark"></i> Saved Events
              </Link>
              <Link to="/student/settings" className="flex items-center gap-2 p-4 hover:bg-gray-100 text-gray-600">
                <i className="fas fa-cog"></i> Settings
              </Link>
              <Link to="/" className="flex items-center gap-2 p-4 hover:bg-gray-100 text-gray-600">
                <i className="fas fa-sign-out-alt"></i> Logout
              </Link>
            </div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 p-6 bg-white rounded-xl shadow">
          <div className="relative flex-1 min-w-[200px]">
            <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="Search events..."
              className="w-full p-4 pl-12 rounded-xl border-2 border-gray-200 bg-gray-50 focus:outline-none focus:border-indigo-400 focus:bg-white"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <select
              className="p-4 rounded-xl border-2 border-gray-200 bg-gray-50 focus:outline-none focus:border-indigo-400 focus:bg-white min-w-[150px]"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="Hackathon">Hackathons</option>
              <option value="Internship">Internships</option>
              <option value="Workshop">Workshops</option>
              <option value="Conference">Conferences</option>
            </select>
            <select
              className="p-4 rounded-xl border-2 border-gray-200 bg-gray-50 focus:outline-none focus:border-indigo-400 focus:bg-white min-w-[150px]"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="all">All Locations</option>
              <option value="Online">Online</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
              <option value="Bangalore">Bangalore</option>
            </select>
          </div>
        </div>

        {/* Event Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.length === 0 ? (
            <div className="col-span-full text-center p-12 bg-white rounded-xl shadow">
              <i className="fas fa-calendar-times text-6xl text-gray-200 mb-4"></i>
              <h3 className="text-xl font-semibold text-gray-800">No events found</h3>
              <p className="text-gray-500">Try adjusting your search or filters to find more events.</p>
            </div>
          ) : (
            filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                data-category={event.category}
                data-location={event.location}
              >
                <div className="h-48 bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-4xl">
                  <i className={event.icon}></i>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-lg font-bold text-gray-800">{event.title}</h2>
                    <span className="bg-gradient-to-br from-green-400 to-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                      <i className="fas fa-check-circle"></i> Verified
                    </span>
                  </div>
                  <div className="space-y-2 mb-4 text-gray-500 text-sm">
                    <div className="flex items-center gap-2">
                      <i className="fas fa-calendar text-indigo-400"></i>
                      <span>{formatDate(event.startDate, event.endDate)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fas fa-tag text-indigo-400"></i>
                      <span>{event.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fas fa-map-marker-alt text-indigo-400"></i>
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <div className="flex gap-3">
                    <a
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gradient-to-br from-indigo-400 to-purple-500 text-white px-4 py-2 rounded-xl font-semibold hover:shadow-md hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                    >
                      <i className="fas fa-external-link-alt"></i>
                      {event.url ? 'Apply Now' : 'Learn More'}
                    </a>
                    <button
                      className={`flex-1 px-4 py-2 rounded-xl font-semibold border-2 ${
                        savedEvents[event.id]
                          ? 'bg-green-100 text-green-700 border-green-300'
                          : 'bg-gray-50 text-gray-600 border-gray-200'
                      } hover:bg-gray-100 transition-all flex items-center justify-center gap-2`}
                      onClick={() => toggleSave(event.id)}
                    >
                      <i className={`fas fa-bookmark ${savedEvents[event.id] ? 'text-green-700' : ''}`}></i>
                      {savedEvents[event.id] ? 'Saved' : 'Save'}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EventsPage;