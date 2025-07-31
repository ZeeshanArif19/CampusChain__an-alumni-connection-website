import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import { SavedEventsProvider } from './context/SavedEventsContext';
import RouteWrapper from './components/RouteWrapper';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';
import AlumniDashboard from './pages/AlumniDashboard';
import StudentDashboard from './pages/StudentDashboard';
import EventsPage from './pages/EventsPage';
import AdminEventPage from './pages/AdminEventPage';
import AlumniPage from './pages/AlumniPage';
import StudentProfile from './pages/StudentProfile';
import AdminUsersPage from './pages/AdminUsersPage';
import AdminAnalytics from './pages/AdminAnalytics';
import StudentSettings from './pages/StudentSettings';
import AlumniSettings from './pages/AlumniSettings';
import AdminSettings from './pages/AdminSettings';
import AlumniProfile from './pages/AlumniProfile';

function App() {
  return (
    <SavedEventsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/admin" element={<RouteWrapper role="admin"><ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute></RouteWrapper>} />
          <Route path="/admin/events" element={<RouteWrapper role="admin"><ProtectedRoute requiredRole="admin"><AdminEventPage /></ProtectedRoute></RouteWrapper>} />
          <Route path="/admin/users" element={<RouteWrapper role="admin"><ProtectedRoute requiredRole="admin"><AdminUsersPage /></ProtectedRoute></RouteWrapper>} />
          <Route path="/admin/analytics" element={<RouteWrapper role="admin"><ProtectedRoute requiredRole="admin"><AdminAnalytics /></ProtectedRoute></RouteWrapper>} />
          <Route path="/admin/settings" element={<RouteWrapper role="admin"><ProtectedRoute requiredRole="admin"><AdminSettings /></ProtectedRoute></RouteWrapper>} />
          <Route path="/admin/public" element={<div>Public View Page</div>} />
          <Route path="/student" element={<RouteWrapper role="student"><ProtectedRoute requiredRole="student"><StudentDashboard /></ProtectedRoute></RouteWrapper>} />
          <Route path="/student/events" element={<RouteWrapper role="student"><ProtectedRoute requiredRole="student"><EventsPage /></ProtectedRoute></RouteWrapper>} />
          <Route path="/student/profile" element={<RouteWrapper role="student"><ProtectedRoute requiredRole="student"><StudentProfile /></ProtectedRoute></RouteWrapper>} />
          <Route path="/student/settings" element={<RouteWrapper role="student"><ProtectedRoute requiredRole="student"><StudentSettings /></ProtectedRoute></RouteWrapper>} />
          <Route path="/alumni/events" element={<RouteWrapper role="alumni"><ProtectedRoute requiredRole="alumni"><EventsPage /></ProtectedRoute></RouteWrapper>} />
          <Route path="/student/alumni" element={<RouteWrapper role="student"><ProtectedRoute requiredRole="student"><AlumniPage /></ProtectedRoute></RouteWrapper>} />
          <Route path="/student/alumni/profile/:id" element={<RouteWrapper role="student"><ProtectedRoute requiredRole="student"><AlumniProfile /></ProtectedRoute></RouteWrapper>} />
          <Route path="/alumni" element={<RouteWrapper role="alumni"><ProtectedRoute requiredRole="alumni"><AlumniDashboard /></ProtectedRoute></RouteWrapper>} />
          <Route path="/alumni/alumni" element={<RouteWrapper role="alumni"><ProtectedRoute requiredRole="alumni"><AlumniPage /></ProtectedRoute></RouteWrapper>} />
          <Route path="/alumni/profile" element={<RouteWrapper role="alumni"><ProtectedRoute requiredRole="alumni"><AlumniProfile /></ProtectedRoute></RouteWrapper>} />
          <Route path="/alumni/settings" element={<RouteWrapper role="alumni"><ProtectedRoute requiredRole="alumni"><AlumniSettings /></ProtectedRoute></RouteWrapper>} />
          <Route
            path="*"
            element={
              <div className="p-6 text-center text-xl text-gray-600">
                404 Not Found - Please check the URL or return to{' '}
                <a href="/" className="text-indigo-500 underline">
                  Home
                </a>
              </div>
            }
          />
        </Routes>
      </Router>
    </SavedEventsProvider>
  );
}

export default App;