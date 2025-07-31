import { useState } from 'react';
import Sidebar from './Sidebar';

const DashboardLayout = ({ role, children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex">
      {/* Hamburger button always visible, fixed at top left */}
      <button
        className="fixed top-5 left-5 z-[1100] bg-white p-3 rounded-xl shadow-lg text-gray-600 text-xl cursor-pointer"
        onClick={() => setIsSidebarOpen((prev) => !prev)}
        aria-label="Open sidebar"
      >
        <i className="fas fa-bars"></i>
      </button>
      <Sidebar role={role} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <main
        className={`flex-1 p-6 bg-gray-50 min-h-screen transition-all duration-300 ${isSidebarOpen ? 'ml-[260px]' : 'ml-0'}`}
      >
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;