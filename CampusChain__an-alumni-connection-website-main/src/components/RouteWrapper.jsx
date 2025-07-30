import { UserProfileProvider } from '../context/UserProfileContext';

const RouteWrapper = ({ role, children }) => {
  return (
    <UserProfileProvider role={role}>
      {children}
    </UserProfileProvider>
  );
};

export default RouteWrapper; 