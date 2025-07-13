import { createContext, useState } from 'react';

export const SavedEventsContext = createContext();

export const SavedEventsProvider = ({ children }) => {
  const [savedEvents, setSavedEvents] = useState({
    'ai-hackathon': false,
    'full-stack-workshop': false,
    'google-internship': false,
    'tech-summit': false,
    'alumni-meetup': false,
    'user-report': false,
  });

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