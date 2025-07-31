import { useNavigate } from 'react-router-dom';

const LogoutButton = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove all user data and token
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    // Optionally clear other user-related storage
    sessionStorage.clear();
    // Redirect and replace history so back button doesn't work
    navigate('/', { replace: true });
    window.location.replace('/'); // Double insurance: hard redirect
  };

  return (
    <button onClick={handleLogout} className="w-full text-left">
      {children || 'Logout'}
    </button>
  );
};

export default LogoutButton;
