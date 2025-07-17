import { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { SavedEventsContext } from '../context/SavedEventsContext';

const getProfile = (role) => {
  if (role === 'alumni') {
    // For demo: get first alumni profile from localStorage.alumniProfiles
    const alumniProfiles = localStorage.getItem('alumniProfiles');
    if (alumniProfiles) {
      const arr = JSON.parse(alumniProfiles);
      return arr.length > 0 ? arr[0] : { name: 'Alumni User', role: 'Alumni' };
    }
    return { name: 'Alumni User', role: 'Alumni' };
  } else {
    const studentProfile = localStorage.getItem('studentProfile');
    if (studentProfile) {
      return JSON.parse(studentProfile);
    }
    return { name: 'Student User', role: 'Student' };
  }
};

const EventsPage = () => {
  const { savedEvents, toggleSave } = useContext(SavedEventsContext);
  const [searchInput, setSearchInput] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [showSaved, setShowSaved] = useState(false);
  const location = useLocation();

  // Determine role from URL path
  const role = location.pathname.startsWith('/alumni') ? 'alumni' : 'student';
  const profile = getProfile(role);

  useEffect(() => {
    // Load events from localStorage
    const storedEvents = localStorage.getItem('events');
    const eventsData = storedEvents ? JSON.parse(storedEvents) : [];

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

  // Get all events from localStorage for saved events view
  const getAllEvents = () => {
    const storedEvents = localStorage.getItem('events');
    return storedEvents ? JSON.parse(storedEvents) : [];
  };

  const savedEventCards = getAllEvents().filter((event) => savedEvents[event.id]);

  // Get initials for profile
  const getInitials = (name) => name ? name.split(' ').map(n => n[0]).join('') : '';

  return (
    <DashboardLayout role={role}>
      <div className="space-y-6">
        {/* Topbar */}
        <div className="flex justify-between items-center p-6 bg-white rounded-xl shadow">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3 ml-8">
            <i className="fas fa-calendar-alt"></i> Events & Opportunities
          </h1>
          <div className="relative group">
            <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-semibold text-xl">
                {getInitials(profile.name)}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-800">{profile.name}</h3>
                <p className="text-xs text-gray-500">{role.charAt(0).toUpperCase() + role.slice(1)}</p>
              </div>
            </div>
            <div className="absolute right-0 top-14 hidden group-hover:block bg-white rounded-xl shadow-xl min-w-[200px] z-10">
              <Link to={`/${role}/profile`} className="flex items-center gap-2 p-4 hover:bg-gray-100 text-gray-600">
                <i className="fas fa-user"></i> My Profile
              </Link>
              <button
                className="flex items-center gap-2 p-4 hover:bg-gray-100 text-gray-600 w-full text-left"
                onClick={() => setShowSaved(true)}
              >
                <i className="fas fa-bookmark"></i> Saved Events
              </button>
              <Link to={`/${role}/settings`} className="flex items-center gap-2 p-4 hover:bg-gray-100 text-gray-600">
                <i className="fas fa-cog"></i> Settings
              </Link>
              <Link to="/" className="flex items-center gap-2 p-4 hover:bg-gray-100 text-gray-600">
                <i className="fas fa-sign-out-alt"></i> Logout
              </Link>
            </div>
          </div>
        </div>

        {/* Saved Events Modal/Section */}
        {showSaved && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80">
            <div className="bg-white rounded-xl shadow-xl p-8 max-w-2xl w-full relative">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
                onClick={() => setShowSaved(false)}
                aria-label="Close"
              >
                &times;
              </button>
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <i className="fas fa-bookmark"></i> Saved Events
              </h2>
              {savedEventCards.length === 0 ? (
                <div className="text-center text-gray-500">No saved events yet.</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {savedEventCards.map((event) => (
                    <div
                      key={event.id}
                      className="bg-gray-50 rounded-xl shadow p-4 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <i className={event.icon + ' text-indigo-400 text-2xl'}></i>
                          <span className="font-bold text-lg text-gray-800">{event.title}</span>
                        </div>
                        <div className="text-gray-500 text-sm mb-1">
                          <i className="fas fa-calendar-alt mr-1"></i>
                          {formatDate(event.startDate, event.endDate)}
                        </div>
                        <div className="text-gray-500 text-sm mb-1">
                          <i className="fas fa-tag mr-1"></i>
                          {event.category}
                        </div>
                        <div className="text-gray-500 text-sm mb-1">
                          <i className="fas fa-map-marker-alt mr-1"></i>
                          {event.location}
                        </div>
                        <p className="text-gray-600 mt-2 mb-2">{event.description}</p>
                      </div>
                      <div className="flex gap-2 mt-2">
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
                          className="flex-1 px-4 py-2 rounded-xl font-semibold border-2 bg-green-100 text-green-700 border-green-300 hover:bg-green-200 transition-all flex items-center justify-center gap-2"
                          onClick={() => toggleSave(event.id)}
                        >
                          <i className="fas fa-bookmark"></i> Unsave
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Search & Filter */}
        {!showSaved && (
          <>
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
                  <option value="Webinar">Webinars</option>
                  <option value="Competition">Competitions</option>
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
                  <option value="Chennai">Chennai</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Pune">Pune</option>
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
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default EventsPage;