import React, { createContext, useContext, useState, useEffect } from "react";
import Tswift from "../assets/Tswift.jpg";

const EventContext = createContext();

// Default event fallback
const defaultEvent = {
  name: "Taylor Swift | The Eras Tour",
  title: "Verified Resale Ticket",
  image: Tswift,
  user: "example@gmail.com",
  success: true,
  userName: "Daniska",
  clientName: "Buyer-name(buyer-email@gmail.com)",
  taxFee: 100,
  paid: true,
  tix: 2,
  date: "Thu, Nov 21, 7pm • Rogers Center",
  emailInfo: {
    date: "Thu • Nov 21, 2024 • 7:00 PM",
    location: "Rogers Center, Toronto, ON",
  },
  countdown: "08 15 2022, 08:00pm",
  seating: "METLIFE GATE",
  seatMap: [
    { sec: "A3", row: "10", seat: "5" },
    { sec: "A3", row: "10", seat: "6" },
  ],
};

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem("events");
    return saved ? JSON.parse(saved) : defaultEvent;
  });

  // Auto-save on changes
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const updateEvent = (updatedEvent) => {
    setEvents(updatedEvent);
  };

  return (
    <EventContext.Provider value={{ events, updateEvent }}>
      {children}
    </EventContext.Provider>
  );
};

// Custom hook to access event data easily
export const useEvent = () => useContext(EventContext);

