import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';

const AlumniPage = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [collegeFilter, setCollegeFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [filteredAlumni, setFilteredAlumni] = useState([]);

  const alumni = [
    {
      id: 'alumni1',
      name: 'Ananya Sharma',
      college: 'IIT Bombay',
      location: 'Mumbai',
      position: 'Software Engineer at Google',
    },
    {
      id: 'alumni2',
      name: 'Rahul Verma',
      college: 'IIT Delhi',
      location: 'Delhi',
      position: 'Product Manager at Microsoft',
    },
    {
      id: 'alumni3',
      name: 'Priya Nair',
      college: 'IIT Bangalore',
      location: 'Bangalore',
      position: 'Data Scientist at Amazon',
    },
  ];

  useEffect(() => {
    const filtered = alumni.filter((alumnus) => {
      const matchesSearch = alumnus.name.toLowerCase().includes(searchInput.toLowerCase());
      const matchesCollege = collegeFilter === 'all' || alumnus.college === collegeFilter;
      const matchesLocation = locationFilter === 'all' || alumnus.location === locationFilter;
      return matchesSearch && matchesCollege && matchesLocation;
    });
    setFilteredAlumni(filtered);
  }, [searchInput, collegeFilter, locationFilter]);

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        {/* Topbar */}
        <div className="flex justify-between items-center p-6 bg-white rounded-xl shadow">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3 ml-8">
            <i className="fas fa-user-graduate"></i> Alumni Directory
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
          <div className="relative flex-1 min-w-[300px]">
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
            <input
              type="text"
              placeholder="Search alumni..."
              className="w-full p-4 pl-12 rounded-xl border-2 border-gray-200 bg-gray-50 focus:outline-none focus:border-indigo-400 focus:bg-white transition-all"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <div className="flex gap-4 flex-wrap justify-center">
            <select
              className="p-4 rounded-xl border-2 border-gray-200 bg-gray-50 focus:outline-none focus:border-indigo-400 focus:bg-white min-w-[150px] cursor-pointer"
              value={collegeFilter}
              onChange={(e) => setCollegeFilter(e.target.value)}
            >
              <option value="all">All Colleges</option>
              <option value="IIT Bombay">IIT Bombay</option>
              <option value="IIT Delhi">IIT Delhi</option>
              <option value="IIT Bangalore">IIT Bangalore</option>
            </select>
            <select
              className="p-4 rounded-xl border-2 border-gray-200 bg-gray-50 focus:outline-none focus:border-indigo-400 focus:bg-white min-w-[150px] cursor-pointer"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="all">All Locations</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
              <option value="Bangalore">Bangalore</option>
            </select>
          </div>
        </div>

        {/* Alumni Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlumni.length === 0 ? (
            <div className="col-span-full text-center p-12 bg-white rounded-xl shadow">
              <i className="fas fa-user-times text-6xl text-gray-200 mb-4"></i>
              <h3 className="text-xl font-semibold text-gray-800">No alumni found</h3>
              <p className="text-gray-500">Try adjusting your search or filters to find more alumni.</p>
            </div>
          ) : (
            filteredAlumni.map((alumnus) => (
              <div
                key={alumnus.id}
                className="bg-white rounded-xl shadow overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
                data-college={alumnus.college}
                data-location={alumnus.location}
                onClick={() => navigate(`/student/alumni/profile/${alumnus.id}`)}
              >
                <div className="h-48 bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-4xl">
                  <i className="fas fa-user-graduate"></i>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-lg font-bold text-gray-800 flex-1 mr-4">{alumnus.name}</h2>
                    <span className="bg-gradient-to-br from-green-400 to-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                      <i className="fas fa-check-circle"></i> Verified
                    </span>
                  </div>
                  <div className="space-y-2 mb-4 text-gray-500 text-sm">
                    <div className="flex items-center gap-2">
                      <i className="fas fa-graduation-cap text-indigo-400 w-4"></i>
                      <span>{alumnus.college}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fas fa-map-marker-alt text-indigo-400 w-4"></i>
                      <span>{alumnus.location}, India</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fas fa-briefcase text-indigo-400 w-4"></i>
                      <span>{alumnus.position}</span>
                    </div>
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

export default AlumniPage;