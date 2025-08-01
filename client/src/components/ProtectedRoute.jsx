import { Navigate } from 'react-router-dom';
import { useUserProfile } from '../context/UserProfileContext';

const ProtectedRoute = ({ requiredRole, children }) => {
  const { userProfile, isLoading } = useUserProfile();
  const token = localStorage.getItem('token');

  if (isLoading) return <div>Loading...</div>;

  // Not logged in or no token
  if (!userProfile || !userProfile.role || !token) {
    // Clear all storage and history, then redirect to login
    localStorage.clear();
    sessionStorage.clear();
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', function () {
      window.location.replace('/auth');
    });
    window.location.replace('/auth');
    return null;
  }

  // Role mismatch
  if (requiredRole && userProfile.role.toLowerCase() !== requiredRole.toLowerCase()) {
    localStorage.clear();
    sessionStorage.clear();
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', function () {
      window.location.replace('/auth');
    });
    window.location.replace('/auth');
    return null;
  }

  return children;
};

export default ProtectedRoute;
