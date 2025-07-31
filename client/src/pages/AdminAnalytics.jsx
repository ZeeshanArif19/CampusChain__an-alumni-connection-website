import DashboardLayout from '../components/DashboardLayout';

const mockStats = [
  { label: 'Total Users', value: 1240, icon: 'fas fa-users', color: 'from-indigo-500 to-purple-500' },
  { label: 'Events', value: 38, icon: 'fas fa-calendar-alt', color: 'from-indigo-500 to-purple-500' },
  { label: 'Alumni', value: 320, icon: 'fas fa-user-graduate', color: 'from-purple-500 to-indigo-500' },
  { label: 'Students', value: 920, icon: 'fas fa-user', color: 'from-indigo-500 to-purple-500' },
];

const userGrowth = [100, 200, 350, 500, 700, 900, 1240]; // Mock data for 7 months
const eventParticipation = [20, 30, 25, 40, 38]; // Mock data for 5 events
const userRoles = [920, 320]; // students, alumni
const recentActivity = [
  { id: 1, text: 'New event "AI Summit" created.' },
  { id: 2, text: 'User Priya Sharma registered as Alumni.' },
  { id: 3, text: 'Student Bhavya Kapoor joined "Hackathon 2025".' },
  { id: 4, text: 'Event "Career Fair" reached 100 participants.' },
];

const AdminAnalytics = () => {
  // Pie chart calculations
  const totalRoles = userRoles.reduce((a, b) => a + b, 0);
  const studentAngle = (userRoles[0] / totalRoles) * 360;
  const alumniAngle = (userRoles[1] / totalRoles) * 360;

  return (
    <DashboardLayout role="admin">
      <div className="space-y-8">
        {/* Banner/Header */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg mb-4">
          <div className="h-36 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          <div className="absolute left-8 top-16 flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-white border-4 border-indigo-400 flex items-center justify-center text-indigo-600 font-bold text-3xl shadow-lg">
              <i className="fas fa-chart-bar"></i>
            </div>
            <div className="text-white drop-shadow-lg">
              <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
              <p className="text-base opacity-90">Overview of platform usage and engagement</p>
            </div>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {mockStats.map((stat) => (
            <div key={stat.label} className={`bg-gradient-to-br ${stat.color} p-6 rounded-xl shadow text-white text-center`}>
              <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-2xl">
                <i className={stat.icon}></i>
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="font-medium mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* User Growth Line Chart */}
          <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center">
            <h2 className="text-lg font-bold mb-2 text-indigo-700">User Growth (Last 7 Months)</h2>
            <svg width="100%" height="120" viewBox="0 0 220 120" className="mb-2">
              <polyline
                fill="none"
                stroke="#7c3aed"
                strokeWidth="3"
                points={userGrowth.map((v, i) => `${20 + i*30},${110 - v/15}`).join(' ')}
              />
              {/* Dots */}
              {userGrowth.map((v, i) => (
                <circle key={i} cx={20 + i*30} cy={110 - v/15} r="4" fill="#a5b4fc" />
              ))}
              {/* X-axis */}
              <line x1="20" y1="110" x2="200" y2="110" stroke="#e5e7eb" strokeWidth="2" />
            </svg>
            <div className="flex justify-between w-full text-xs text-gray-400">
              <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
            </div>
          </div>
          {/* Event Participation Bar Chart */}
          <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center">
            <h2 className="text-lg font-bold mb-2 text-indigo-700">Event Participation</h2>
            <svg width="100%" height="120" viewBox="0 0 220 120" className="mb-2">
              {eventParticipation.map((v, i) => (
                <rect
                  key={i}
                  x={30 + i*35}
                  y={110 - v*2}
                  width="25"
                  height={v*2}
                  fill="#c4b5fd"
                />
              ))}
              {/* X-axis */}
              <line x1="20" y1="110" x2="200" y2="110" stroke="#e5e7eb" strokeWidth="2" />
            </svg>
            <div className="flex justify-between w-full text-xs text-gray-400">
              <span>Ev1</span><span>Ev2</span><span>Ev3</span><span>Ev4</span><span>Ev5</span>
            </div>
          </div>
          {/* User Roles Pie Chart */}
          <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center">
            <h2 className="text-lg font-bold mb-2 text-indigo-700">User Roles</h2>
            <svg width="100" height="100" viewBox="0 0 32 32">
              {/* Students slice */}
              <circle r="16" cx="16" cy="16" fill="#a5b4fc" />
              <path
                d={`M16 16 L16 0 A16 16 0 ${studentAngle > 180 ? 1 : 0} 1 ${16 + 16 * Math.sin((studentAngle * Math.PI) / 180)} ${16 - 16 * Math.cos((studentAngle * Math.PI) / 180)} Z`}
                fill="#c4b5fd"
              />
            </svg>
            <div className="flex gap-2 mt-2 text-xs">
              <span className="flex items-center gap-1"><span className="w-3 h-3 inline-block rounded-full bg-[#a5b4fc]"></span> Students</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 inline-block rounded-full bg-[#c4b5fd]"></span> Alumni</span>
            </div>
          </div>
        </div>

        {/* Recent Activity Log */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-bold mb-4 text-indigo-700 flex items-center gap-2"><i className="fas fa-history"></i> Recent Activity</h2>
          <ul className="space-y-2">
            {recentActivity.map((a) => (
              <li key={a.id} className="text-gray-700 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-indigo-400 inline-block"></span>
                {a.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminAnalytics; 