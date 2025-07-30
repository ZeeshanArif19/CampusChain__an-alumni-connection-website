import { createContext, useState, useEffect, useContext } from 'react';
import { getUserProfile } from '../utils/profileUtils';

const UserProfileContext = createContext();

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
};

export const UserProfileProvider = ({ children, role }) => {
  const [userProfile, setUserProfile] = useState({
    name: 'User',
    role: role || 'Student',
    email: '',
    headline: '',
    about: '',
    profilePhoto: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const email = localStorage.getItem('userEmail');
        const profile = await getUserProfile(role, email);
        setUserProfile(profile);
      } catch (err) {
        console.error('Error loading user profile:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (role) {
      loadProfile();
    }
  }, [role]);

  const updateProfile = (newProfile) => {
    setUserProfile(prev => ({ ...prev, ...newProfile }));
  };

  const refreshProfile = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const email = localStorage.getItem('userEmail');
      const profile = await getUserProfile(role, email);
      setUserProfile(profile);
    } catch (err) {
      console.error('Error refreshing user profile:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    userProfile,
    isLoading,
    error,
    updateProfile,
    refreshProfile
  };

  return (
    <UserProfileContext.Provider value={value}>
      {children}
    </UserProfileContext.Provider>
  );
}; 