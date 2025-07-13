import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SavedEventsProvider } from './context/SavedEventsContext';
import AdminDashboard from './pages/AdminDashboard';
import AlumniDashboard from './pages/AlumniDashboard';
import StudentDashboard from './pages/StudentDashboard';
import EventsPage from './pages/EventsPage';

function App() {
  return (
    <SavedEventsProvider>
      <Router>
        <Routes>
          <Route path="/admin">
            <Route index element={<AdminDashboard />} />
          </Route>
          <Route path="/alumni">
            <Route index element={<AlumniDashboard />} />
          </Route>
          <Route path="/student">
            <Route index element={<StudentDashboard />} />
            <Route path="events" element={<EventsPage />} />
          </Route>
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