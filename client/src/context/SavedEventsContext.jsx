import { createContext, useState, useEffect } from 'react';

export const SavedEventsContext = createContext();

export const SavedEventsProvider = ({ children }) => {
  const [savedEvents, setSavedEvents] = useState({});

  // Load saved events from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('savedEvents');
    if (stored) {
      setSavedEvents(JSON.parse(stored));
    } else {
      // Optionally, initialize from events in localStorage
      const storedEvents = localStorage.getItem('events');
      const eventsData = storedEvents ? JSON.parse(storedEvents) : [];
      const initialSavedEvents = eventsData.reduce((acc, event) => {
        acc[event.id] = false;
        return acc;
      }, {});
      setSavedEvents(initialSavedEvents);
    }
  }, []);

  // Save to localStorage whenever savedEvents changes
  useEffect(() => {
    localStorage.setItem('savedEvents', JSON.stringify(savedEvents));
  }, [savedEvents]);

  const toggleSave = (eventId) => {
    setSavedEvents((prev) => ({
      ...prev,
      [eventId]: !prev[eventId],
    }));
  };

  return (
    <SavedEventsContext.Provider value={{ savedEvents, toggleSave }}>
      {children}
    </SavedEventsContext.Provider>
  );
};