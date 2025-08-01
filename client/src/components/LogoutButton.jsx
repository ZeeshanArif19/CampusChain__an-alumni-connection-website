import { useNavigate } from 'react-router-dom';

const LogoutButton = ({ children, className = '' }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove all user data and token
    localStorage.clear();
    sessionStorage.clear();
    // Push a dummy state to prevent back navigation
    window.history.pushState(null, '', window.location.href);
    // Listen for back navigation and always go to landing page
    window.addEventListener('popstate', function () {
      window.location.replace('/');
    });
    // Replace current entry with landing page
    window.location.replace('/');
  };

  return (
    <button onClick={handleLogout} className={`w-full text-left ${className}`}>
      {children || 'Logout'}
    </button>
  );
};

export default LogoutButton;
