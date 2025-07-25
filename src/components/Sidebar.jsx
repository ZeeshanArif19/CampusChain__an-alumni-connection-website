import { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

const Sidebar = ({ role, isSidebarOpen, setIsSidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    const setActiveLink = () => {
      const currentPath = location.pathname.toLowerCase(); // Convert to lowercase for comparison
      console.log('Current Path:', currentPath); // Debug current route
      const rootPath = `/${role}`;
      const adminLinks = ['/admin', '/admin/events', '/admin/users', '/admin/analytics', '/admin/settings', '/admin/public'];
      
      // Convert adminLinks to lowercase for comparison
      const activeLink = adminLinks.find((link) => 
        currentPath === link.toLowerCase() || currentPath.startsWith(link.toLowerCase())
      ) || (currentPath === rootPath.toLowerCase() ? rootPath : null);
      
      console.log('Active Link:', activeLink); // Debug active link

      document.querySelectorAll('.sidebar-nav a').forEach((link) => link.classList.remove('active'));
      if (activeLink) {
        const activeElement = document.querySelector(`.sidebar-nav a[href="${activeLink}"]`);
        console.log('Active Element:', activeElement); // Debug element
        if (activeElement) activeElement.classList.add('active');
      }
    };
    setActiveLink();
  }, [location, role]);

  const handleDashboardClick = () => {
    const dashboardPath = `/${role}`;
    console.log(`Redirecting to ${dashboardPath} from:`, location.pathname);
    navigate(dashboardPath, { replace: true });
  };

  // Helper function to check if a link is active (case insensitive)
  const isLinkActive = (linkPath) => {
    const currentPath = location.pathname.toLowerCase();
    const targetPath = linkPath.toLowerCase();
    return currentPath === targetPath || (linkPath === `/${role}` && currentPath === `/${role}`.toLowerCase());
  };

  return (
    <>
      {/* Sidebar for admin */}
      {role === 'admin' && (
        <aside className={`fixed inset-y-0 left-0 w-[260px] bg-[rgb(26,32,44)] text-white p-[30px_0] border-r border-[rgba(255,255,255,0.1)] z-[1000] transition-all duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          {/* Close button */}
          <div className="flex items-center justify-between p-[0_30px_30px] border-b border-[rgba(255,255,255,0.1)]">
            <button className="text-white text-2xl mr-2" onClick={toggleSidebar}>
              &times;
            </button>
            <span className="inline-block mt-2 px-3 py-1 text-[0.7em] font-semibold text-white bg-gradient-to-r from-[#e53e3e] to-[#c53030] rounded-[12px]">ADMIN</span>
          </div>
          <nav className="p-[30px_0]">
            <ul className="list-none">
              {[
                { to: '/admin', label: 'Dashboard', icon: 'fas fa-tachometer-alt', isDashboard: true },
                { to: '/admin/events', label: 'Manage Events', icon: 'fas fa-calendar-alt' },
                { to: '/admin/users', label: 'Users', icon: 'fas fa-users' },
                { to: '/admin/analytics', label: 'Analytics', icon: 'fas fa-chart-bar' },
                { to: '/admin/settings', label: 'Settings', icon: 'fas fa-cog' },
                { to: '/', label: 'Logout', icon: 'fas fa-sign-out-alt' },
              ].map((link) => (
                <li key={link.to} className="my-2">
                  {link.isDashboard ? (
                    <button
                      onClick={handleDashboardClick}
                      className={`w-full flex items-center p-[12px_30px] text-[rgba(255,255,255,0.8)] text-base font-medium hover:text-white hover:bg-[rgba(255,255,255,0.1)] transition-all rounded-[4px] text-left ${
                        isLinkActive(link.to) ? 'bg-[rgba(255,255,255,0.1)] border-r-4 border-[#667eea]' : ''
                      }`}
                    >
                      <i className={`${link.icon} mr-[15px] w-[20px] text-center`}></i>
                      <span>{link.label}</span>
                    </button>
                  ) : (
                    <Link
                      to={link.to}
                      className={`flex items-center p-[12px_30px] text-[rgba(255,255,255,0.8)] text-base font-medium hover:text-white hover:bg-[rgba(255,255,255,0.1)] transition-all rounded-[4px] ${
                        isLinkActive(link.to) ? 'bg-[rgba(255,255,255,0.1)] border-r-4 border-[#667eea]' : ''
                      }`}
                    >
                      <i className={`${link.icon} mr-[15px] w-[20px] text-center`}></i>
                      <span>{link.label}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      )}
      {/* Sidebar for student */}
      {role === 'student' && (
        <aside className={`fixed top-0 left-0 w-[260px] h-screen bg-[rgb(26,32,44)] text-white p-0 border-r border-[rgba(255,255,255,0.1)] z-[1000] transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          {/* Close button */}
          <div className="flex items-center justify-between sidebar-header p-[30px] border-b border-[rgba(255,255,255,0.1)]">
            <button className="text-white text-2xl mr-2" onClick={toggleSidebar}>
              &times;
            </button>
            <span className="inline-block mt-2 px-3 py-1 text-[0.7em] font-semibold text-white bg-gradient-to-r from-[#e53e3e] to-[#c53030] rounded-[12px]">STUDENT</span>
          </div>
          <nav className="sidebar-nav p-[30px_0]">
            <ul className="list-none">
              {[
                { to: '/student', label: 'Dashboard', icon: 'fas fa-tachometer-alt', isDashboard: true },
                { to: '/student/events', label: 'Events', icon: 'fas fa-calendar-alt' },
                { to: '/student/alumni', label: 'Alumni', icon: 'fas fa-user-graduate' },
                { to: '/student/profile', label: 'Profile', icon: 'fas fa-user' },
                { to: '/student/settings', label: 'Settings', icon: 'fas fa-cog' },
                { to: '/', label: 'Logout', icon: 'fas fa-sign-out-alt' },
              ].map((link) => (
                <li key={link.to} className="my-2">
                  {link.isDashboard ? (
                    <button
                      onClick={handleDashboardClick}
                      className={`w-full flex items-center p-[12px_30px] text-[rgba(255,255,255,0.8)] text-base font-medium hover:text-white hover:bg-[rgba(255,255,255,0.1)] transition-all rounded-[4px] text-left ${
                        isLinkActive(link.to) ? 'bg-[rgba(255,255,255,0.1)] border-r-4 border-indigo-400' : ''
                      }`}
                    >
                      <i className={`${link.icon} mr-[15px] w-5 text-center`}></i>
                      <span>{link.label}</span>
                    </button>
                  ) : (
                    <Link
                      to={link.to}
                      className={`flex items-center p-[12px_30px] text-[rgba(255,255,255,0.8)] text-base font-medium hover:text-white hover:bg-[rgba(255,255,255,0.1)] transition-all rounded-[4px] ${
                        isLinkActive(link.to) ? 'bg-[rgba(255,255,255,0.1)] border-r-4 border-indigo-400' : ''
                      }`}
                    >
                      <i className={`${link.icon} mr-[15px] w-5 text-center`}></i>
                      <span>{link.label}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      )}
      {/* Sidebar for alumni */}
      {role === 'alumni' && (
        <aside className={`fixed top-0 left-0 w-[260px] h-screen bg-[rgb(26,32,44)] text-white p-0 border-r border-[rgba(255,255,255,0.1)] z-[1000] transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          {/* Close button */}
          <div className="flex items-center justify-between sidebar-header p-[30px] border-b border-[rgba(255,255,255,0.1)]">
            <button className="text-white text-2xl mr-2" onClick={toggleSidebar}>
              &times;
            </button>
            <span className="inline-block mt-2 px-3 py-1 text-[0.7em] font-semibold text-white bg-gradient-to-r from-[#e53e3e] to-[#c53030] rounded-[12px]">ALUMNI</span>
          </div>
          <nav className="sidebar-nav p-[30px_0]">
            <ul className="list-none">
              {[
                { to: '/alumni', label: 'Dashboard', icon: 'fas fa-tachometer-alt', isDashboard: true },
                { to: '/alumni/events', label: 'Events', icon: 'fas fa-calendar-alt' },
                { to: '/alumni/profile', label: 'Profile', icon: 'fas fa-user' },
                { to: '/alumni/settings', label: 'Settings', icon: 'fas fa-cog' },
                { to: '/', label: 'Logout', icon: 'fas fa-sign-out-alt' },
              ].map((link) => (
                <li key={link.to} className="my-2">
                  {link.isDashboard ? (
                    <button
                      onClick={handleDashboardClick}
                      className={`w-full flex items-center p-[12px_30px] text-[rgba(255,255,255,0.8)] text-base font-medium hover:text-white hover:bg-[rgba(255,255,255,0.1)] transition-all rounded-[4px] text-left ${
                        isLinkActive(link.to) ? 'bg-[rgba(255,255,255,0.1)] border-r-4 border-indigo-400' : ''
                      }`}
                    >
                      <i className={`${link.icon} mr-[15px] w-5 text-center`}></i>
                      <span>{link.label}</span>
                    </button>
                  ) : (
                    <Link
                      to={link.to}
                      className={`flex items-center p-[12px_30px] text-[rgba(255,255,255,0.8)] text-base font-medium hover:text-white hover:bg-[rgba(255,255,255,0.1)] transition-all rounded-[4px] ${
                        isLinkActive(link.to) ? 'bg-[rgba(255,255,255,0.1)] border-r-4 border-indigo-400' : ''
                      }`}
                    >
                      <i className={`${link.icon} mr-[15px] w-5 text-center`}></i>
                      <span>{link.label}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      )}
    </>
  );
};

export default Sidebar;