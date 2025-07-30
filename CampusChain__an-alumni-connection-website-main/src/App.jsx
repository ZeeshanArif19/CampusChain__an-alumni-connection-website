import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import { SavedEventsProvider } from './context/SavedEventsContext';
import RouteWrapper from './components/RouteWrapper';
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
          <Route path="/admin" element={<RouteWrapper role="admin"><AdminDashboard /></RouteWrapper>} />
          <Route path="/admin/events" element={<RouteWrapper role="admin"><AdminEventPage /></RouteWrapper>} />
          <Route path="/admin/users" element={<RouteWrapper role="admin"><AdminUsersPage /></RouteWrapper>} />
          <Route path="/admin/analytics" element={<RouteWrapper role="admin"><AdminAnalytics /></RouteWrapper>} />
          <Route path="/admin/settings" element={<RouteWrapper role="admin"><AdminSettings /></RouteWrapper>} />
          <Route path="/admin/public" element={<div>Public View Page</div>} />
          <Route path="/student" element={<RouteWrapper role="student"><StudentDashboard /></RouteWrapper>} />
          <Route path="/student/events" element={<RouteWrapper role="student"><EventsPage /></RouteWrapper>} />
          <Route path="/student/profile" element={<RouteWrapper role="student"><StudentProfile /></RouteWrapper>} />
          <Route path="/student/settings" element={<RouteWrapper role="student"><StudentSettings /></RouteWrapper>} />
          <Route path="/alumni/events" element={<RouteWrapper role="alumni"><EventsPage /></RouteWrapper>} />
          <Route path="/student/alumni" element={<RouteWrapper role="student"><AlumniPage /></RouteWrapper>} />
          <Route path="/student/alumni/profile/:id" element={<RouteWrapper role="student"><AlumniProfile /></RouteWrapper>} />
          <Route path="/alumni" element={<RouteWrapper role="alumni"><AlumniDashboard /></RouteWrapper>} />
          <Route path="/alumni/alumni" element={<RouteWrapper role="alumni"><AlumniPage /></RouteWrapper>} />
          <Route path="/alumni/profile" element={<RouteWrapper role="alumni"><AlumniProfile /></RouteWrapper>} />
          <Route path="/alumni/settings" element={<RouteWrapper role="alumni"><AlumniSettings /></RouteWrapper>} />
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