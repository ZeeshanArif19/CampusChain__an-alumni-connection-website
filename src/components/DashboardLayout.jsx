import Sidebar from './Sidebar';

const DashboardLayout = ({ role, children }) => {
  return (
    <div className="flex">
      <Sidebar role={role} />
      <main className="flex-1 ml-[260px] p-6 bg-gray-50 min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;