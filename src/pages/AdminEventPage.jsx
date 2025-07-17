import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { SavedEventsContext } from '../context/SavedEventsContext';

const Topbar = () => (
  <div className="flex justify-between items-center mb-10 p-5 bg-white rounded-2xl shadow-lg">
    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3 ml-8">
      <i className="fas fa-shield-alt"></i>
      Admin Dashboard - Events Management
    </h1>
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 cursor-pointer">
        <div className="w-11 h-11 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center text-white font-semibold text-lg">
          A
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-800">Admin</h3>
          <p className="text-xs font-semibold text-red-500">Administrator</p>
        </div>
        <i className="fas fa-chevron-down"></i>
      </div>
    </div>
  </div>
);

const StatCard = ({ icon, number, label }) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:-translate-y-1 hover:shadow-xl transition-all">
    <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xl">
      <i className={`fas ${icon}`}></i>
    </div>
    <div className="text-2xl font-bold text-gray-800">{number}</div>
    <div className="text-sm text-gray-500">{label}</div>
  </div>
);

const EventForm = ({ onSubmit, onClear, editingEventId, formData, setFormData, selectedIcon, setSelectedIcon }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleIconSelect = (icon) => {
    setSelectedIcon(icon);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
        <i className="fas fa-plus-circle"></i>
        {editingEventId ? 'Edit Event' : 'Create New Event'}
      </h2>
      <form onSubmit={onSubmit}>
        <div className="mb-5">
          <label className="block mb-2 font-semibold text-gray-600">Event Title *</label>
          <input
            type="text"
            name="eventTitle"
            value={formData.eventTitle}
            onChange={handleInputChange}
            className="w-full p-3 border-2 border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-indigo-400 focus:bg-white"
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          <div>
            <label className="block mb-2 font-semibold text-gray-600">Category *</label>
            <select
              name="eventCategory"
              value={formData.eventCategory}
              onChange={handleInputChange}
              className="w-full p-3 border-2 border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-indigo-400 focus:bg-white"
              required
            >
              <option value="">Select Category</option>
              {['Hackathon', 'Internship', 'Workshop', 'Conference', 'Webinar', 'Competition'].map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-600">Location *</label>
            <select
              name="eventLocation"
              value={formData.eventLocation}
              onChange={handleInputChange}
              className="w-full p-3 border-2 border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-indigo-400 focus:bg-white"
              required
            >
              <option value="">Select Location</option>
              {['Online', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune'].map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          <div>
            <label className="block mb-2 font-semibold text-gray-600">Start Date *</label>
            <input
              type="date"
              name="eventStartDate"
              value={formData.eventStartDate}
              onChange={handleInputChange}
              className="w-full p-3 border-2 border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-indigo-400 focus:bg-white"
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-600">End Date</label>
            <input
              type="date"
              name="eventEndDate"
              value={formData.eventEndDate}
              onChange={handleInputChange}
              className="w-full p-3 border-2 border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-indigo-400 focus:bg-white"
            />
          </div>
        </div>
        <div className="mb-5">
          <label className="block mb-2 font-semibold text-gray-600">Description *</label>
          <textarea
            name="eventDescription"
            value={formData.eventDescription}
            onChange={handleInputChange}
            className="w-full p-3 border-2 border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-indigo-400 focus:bg-white resize-y min-h-[100px]"
            placeholder="Enter event description..."
            required
          ></textarea>
        </div>
        <div className="mb-5">
          <label className="block mb-2 font-semibold text-gray-600">Registration/Application URL</label>
          <input
            type="url"
            name="eventUrl"
            value={formData.eventUrl}
            onChange={handleInputChange}
            className="w-full p-3 border-2 border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-indigo-400 focus:bg-white"
            placeholder="https://example.com/register"
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 font-semibold text-gray-600">Event Icon</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { icon: 'fa-code', text: 'Code' },
              { icon: 'fa-briefcase', text: 'Business' },
              { icon: 'fa-chalkboard-teacher', text: 'Teaching' },
              { icon: 'fa-users', text: 'Community' },
              { icon: 'fa-laptop', text: 'Tech' },
              { icon: 'fa-trophy', text: 'Competition' },
            ].map((opt) => (
              <div
                key={opt.icon}
                className={`p-4 border-2 border-gray-200 rounded-xl text-center cursor-pointer transition-all ${
                  selectedIcon === `fas ${opt.icon}` ? 'border-indigo-400 bg-indigo-50 text-indigo-600' : 'bg-gray-50 hover:border-indigo-400 hover:bg-white'
                }`}
                onClick={() => handleIconSelect(`fas ${opt.icon}`)}
              >
                <i className={`fas ${opt.icon} text-xl mb-1 block`}></i>
                <span className="text-xs font-medium">{opt.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:-translate-y-0.5 hover:shadow-lg transition-all"
          >
            <i className={`fas ${editingEventId ? 'fa-save' : 'fa-plus'}`}></i>
            {editingEventId ? 'Update Event' : 'Create Event'}
          </button>
          <button
            type="button"
            onClick={onClear}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-400 to-purple-500 text-white font-semibold rounded-xl hover:-translate-y-0.5 hover:shadow-lg transition-all"
          >
            <i className="fas fa-refresh"></i>
            Clear Form
          </button>
        </div>
      </form>
    </div>
  );
};

const PreviewCard = ({ formData, selectedIcon }) => {
  const formatDate = (startDate, endDate) => {
    if (!startDate) return 'Select Date';
    const start = new Date(startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const end = endDate ? ` - ${new Date(endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}` : '';
    return start + end;
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all">
      <div className="h-40 bg-gradient-to-r from-indigo-400 to-purple-500 flex items-center justify-center text-white text-4xl relative">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_75%,rgba(255,255,255,0.1)_75%)] bg-[length:20px_20px]"></div>
        <i className={selectedIcon}></i>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-bold text-gray-800">{formData.eventTitle || 'Event Title'}</h3>
          <span className="flex items-center gap-1 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
            <i className="fas fa-check-circle"></i>
            Verified
          </span>
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <i className="fas fa-calendar text-indigo-400 w-4"></i>
            <span>{formatDate(formData.eventStartDate, formData.eventEndDate)}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <i className="fas fa-tag text-indigo-400 w-4"></i>
            <span>{formData.eventCategory || 'Select Category'}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <i className="fas fa-map-marker-alt text-indigo-400 w-4"></i>
            <span>{formData.eventLocation || 'Select Location'}</span>
          </div>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {formData.eventDescription || 'Enter event description to see preview...'}
        </p>
        <div className="flex gap-2">
          <a
            href={formData.eventUrl || '#'}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-400 to-purple-500 text-white font-semibold text-sm rounded-xl hover:-translate-y-0.5 hover:shadow-lg transition-all"
          >
            <i className="fas fa-external-link-alt"></i>
            Apply Now
          </a>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white font-semibold text-sm rounded-xl hover:-translate-y-0.5 hover:shadow-lg transition-all">
            <i className="fas fa-bookmark"></i>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const EventsTable = ({ events, onEdit, onDelete }) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg">
    <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
      <i className="fas fa-list ml-12"></i>
      Manage Events
    </h2>
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-50">
          {['Event Title', 'Category', 'Location', 'Date', 'Status', 'Actions'].map((header) => (
            <th key={header} className="p-4 text-left font-semibold text-gray-600">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {events.map((event) => {
          const startDate = new Date(event.startDate).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          });
          const endDate = event.endDate
            ? new Date(event.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            : '';
          const dateDisplay = endDate ? `${startDate} - ${endDate}` : startDate;

          return (
            <tr key={event.id} className="hover:bg-gray-50">
              <td className="p-4">{event.title}</td>
              <td className="p-4">{event.category}</td>
              <td className="p-4">{event.location}</td>
              <td className="p-4">{dateDisplay}</td>
              <td className="p-4">{event.status}</td>
              <td className="p-4 flex gap-2">
                <button
                  onClick={() => onEdit(event.id)}
                  className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-indigo-400 to-purple-500 text-white font-semibold text-sm rounded-xl hover:-translate-y-0.5 hover:shadow-lg transition-all"
                >
                  <i className="fas fa-edit"></i>
                  Edit
                </button>
                <button
                  onClick={() => onDelete(event.id)}
                  className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold text-sm rounded-xl hover:-translate-y-0.5 hover:shadow-lg transition-all"
                >
                  <i className="fas fa-trash"></i>
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

const AdminEventPage = () => {
  const [events, setEvents] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editingEventId, setEditingEventId] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState('fas fa-calendar-alt');
  const [formData, setFormData] = useState({
    eventTitle: '',
    eventCategory: '',
    eventLocation: '',
    eventStartDate: '',
    eventEndDate: '',
    eventDescription: '',
    eventUrl: '',
  });
  const [message, setMessage] = useState({ type: '', text: '', show: false });

  useEffect(() => {
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  useEffect(() => {
    if (message.show) {
      const timer = setTimeout(() => {
        setMessage({ ...message, show: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message.show]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { eventTitle, eventCategory, eventLocation, eventStartDate, eventDescription } = formData;

    if (!eventTitle || !eventCategory || !eventLocation || !eventStartDate || !eventDescription) {
      setMessage({ type: 'error', text: 'Please fill in all required fields!', show: true });
      return;
    }

    const event = {
      id: editingEventId || Date.now(),
      title: eventTitle,
      category: eventCategory,
      location: eventLocation,
      startDate: eventStartDate,
      endDate: formData.eventEndDate,
      description: eventDescription,
      url: formData.eventUrl,
      icon: selectedIcon,
      status: 'Active',
      applicants: 0,
    };

    let updatedEvents;
    if (editingEventId) {
      updatedEvents = events.map((ev) => (ev.id === editingEventId ? event : ev));
      setMessage({ type: 'success', text: 'Event updated successfully!', show: true });
    } else {
      updatedEvents = [...events, event];
      setMessage({ type: 'success', text: 'Event created successfully!', show: true });
    }

    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
    clearForm();
  };

  const clearForm = () => {
    setFormData({
      eventTitle: '',
      eventCategory: '',
      eventLocation: '',
      eventStartDate: '',
      eventEndDate: '',
      eventDescription: '',
      eventUrl: '',
    });
    setSelectedIcon('fas fa-calendar-alt');
    setEditingEventId(null);
  };

  const editEvent = (id) => {
    const event = events.find((ev) => ev.id === id);
    if (!event) return;

    setEditingEventId(id);
    setFormData({
      eventTitle: event.title,
      eventCategory: event.category,
      eventLocation: event.location,
      eventStartDate: event.startDate,
      eventEndDate: event.endDate || '',
      eventDescription: event.description,
      eventUrl: event.url || '',
    });
    setSelectedIcon(event.icon);
  };

  const deleteEvent = (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      const updatedEvents = events.filter((ev) => ev.id !== id);
      setEvents(updatedEvents);
      localStorage.setItem('events', JSON.stringify(updatedEvents));
      setMessage({ type: 'success', text: 'Event deleted successfully!', show: true });
    }
  };

  const stats = {
    totalEvents: events.length,
    activeEvents: events.filter((ev) => ev.status === 'Active').length,
    completedEvents: events.filter((ev) => ev.status === 'Completed').length,
    totalApplicants: events.reduce((sum, ev) => sum + ev.applicants, 0),
  };

  return (
    <DashboardLayout role="admin">
      <div className="min-h-screen">
        <Topbar />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mb-8">
          <StatCard icon="fa-calendar-alt" number={stats.totalEvents} label="Total Events" />
          <StatCard icon="fa-users" number={stats.totalApplicants} label="Total Applicants" />
          <StatCard icon="fa-check-circle" number={stats.activeEvents} label="Active Events" />
          <StatCard icon="fa-trophy" number={stats.completedEvents} label="Completed Events" />
        </div>
        {message.show && (
          <div
            className={`p-4 rounded-xl mb-5 flex items-center gap-2 ${
              message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
          >
            <i className={`fas fa-${message.type === 'success' ? 'check-circle' : 'exclamation-circle'}`}></i>
            <span>{message.text}</span>
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 mb-10">
          <div>
            <EventForm
              onSubmit={handleSubmit}
              onClear={clearForm}
              editingEventId={editingEventId}
              formData={formData}
              setFormData={setFormData}
              selectedIcon={selectedIcon}
              setSelectedIcon={setSelectedIcon}
            />
          </div>
          <div>
            <PreviewCard formData={formData} selectedIcon={selectedIcon} />
          </div>
        </div>
        <EventsTable events={events} onEdit={editEvent} onDelete={deleteEvent} />
      </div>
    </DashboardLayout>
  );
};

export default AdminEventPage;