import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Sidebar = ({ role }) => {
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const location = useLocation();

  const links = [
    { to: `/${role}/dashboard`, label: 'Dashboard', icon: 'fas fa-tachometer-alt' },
    ...(role === 'student' ? [{ to: `/${role}/events`, label: 'Events', icon: 'fas fa-calendar-alt' }] : []),
    { to: `/${role}/alumni`, label: 'Alumni', icon: 'fas fa-user-graduate' },
    { to: `/${role}/profile`, label: 'Profile', icon: 'fas fa-user' },
    { to: `/${role}/settings`, label: 'Settings', icon: 'fas fa-cog' },
    { to: '/', label: 'Logout', icon: 'fas fa-sign-out-alt' },
  ];

  const filteredLinks = links.filter((link) => {
    if (role === 'admin') return true;
    if (role === 'alumni' || role === 'student') return link.to !== `/${role}/alumni`;
    return false;
  });

  const toggleSidebar = () => {
    setIsSidebarActive((prev) => !prev);
  };

  useEffect(() => {
    const setActiveLink = () => {
      const currentPath = location.pathname;
      const dashboardPath = `/${role}/dashboard`;
      const isRootPath = currentPath === `/${role}`;
      const activeLink = filteredLinks.find(
        (link) => link.to === currentPath || (isRootPath && link.to === dashboardPath)
      );

      document.querySelectorAll('.sidebar-nav a').forEach((link) => link.classList.remove('active'));
      if (activeLink) {
        document
          .querySelector(`.sidebar-nav a[href="${activeLink.to}"]`)
          ?.classList.add('active');
      }
    };
    setActiveLink();
  }, [location, filteredLinks, role]);

  return (
    <>
      <button
        className="md:hidden fixed top-5 left-5 z-[1001] bg-white p-3 rounded-xl shadow-lg text-gray-600 text-xl cursor-pointer"
        onClick={toggleSidebar}
      >
        <i className="fas fa-bars"></i>
      </button>
      <aside
        className={`fixed top-0 left-0 w-[260px] h-screen bg-[rgba(26,32,44,0.95)] backdrop-blur-lg text-white p-0 border-r border-[rgba(255,255,255,0.1)] z-[1000] transition-transform duration-300 ${
          isSidebarActive ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="sidebar-header p-[30px] border-b border-[rgba(255,255,255,0.1)]">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Campus Chain
          </h2>
        </div>
        <nav className="sidebar-nav p-[30px_0]">
          <ul className="list-none">
            {filteredLinks.map((link) => (
              <li key={link.to} className="my-2">
                <a
                  href={link.to}
                  className="flex items-center p-[12px_30px] text-[rgba(255,255,255,0.8)] text-base font-medium hover:text-white hover:bg-[rgba(255,255,255,0.1)] hover:border-r-4 hover:border-indigo-400 transition-all duration-300 [&.active]:text-white [&.active]:bg-[rgba(255,255,255,0.1)] [&.active]:border-r-4 [&.active]:border-indigo-400"
                >
                  <i className={`${link.icon} mr-[15px] w-5 text-center`}></i>
                  <span>{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;