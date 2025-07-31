import { Navigate } from 'react-router-dom';
import { useUserProfile } from '../context/UserProfileContext';

const ProtectedRoute = ({ requiredRole, children }) => {
  const { userProfile, isLoading } = useUserProfile();
  const token = localStorage.getItem('token');

  if (isLoading) return <div>Loading...</div>;

  // Not logged in or no token
  if (!userProfile || !userProfile.role || !token) {
    // Hard redirect to clear history
    window.location.replace('/auth');
    return null;
  }

  // Role mismatch
  if (requiredRole && userProfile.role.toLowerCase() !== requiredRole.toLowerCase()) {
    window.location.replace('/auth');
    return null;
  }

  return children;
};

export default ProtectedRoute;
