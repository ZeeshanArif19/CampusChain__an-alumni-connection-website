import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SavedEventsProvider } from './context/SavedEventsContext';
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
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/events" element={<AdminEventPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/public" element={<div>Public View Page</div>} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/events" element={<EventsPage />} />
          <Route path="/student/profile" element={<StudentProfile />} />
          <Route path="/student/settings" element={<StudentSettings />} />
          <Route path="/alumni/events" element={<EventsPage />} />
          <Route path="/student/alumni" element={<AlumniPage />} />
          <Route path="/student/alumni/profile/:id" element={<AlumniProfile />} />
          <Route path="/alumni" element={<AlumniDashboard />} />
          <Route path="/alumni/alumni" element={<AlumniPage />} />
          <Route path="/alumni/profile" element={<AlumniProfile />} />
          <Route path="/alumni/settings" element={<AlumniSettings />} />
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