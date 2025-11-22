// src/context/EventContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { collection, getDocs, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import Tswift from "../assets/Tswift.jpg";

const EventContext = createContext();

const defaultEvent = {
  name: "Taylor Swift | The Eras Tour",
  title: "Verified Resale Ticket",
  image: Tswift,
  user: "example@gmail.com",
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
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); // ← ADDED

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const snapshot = await getDocs(collection(db, "events"));

        if (snapshot.empty) {
          const docRef = await addDoc(collection(db, "events"), defaultEvent);
          const seededEvent = { id: docRef.id, ...defaultEvent };
          setEvents([seededEvent]);
          setSelectedEvent(seededEvent); // ← SET DEFAULT AS SELECTED
        } else {
          const fetchedEvents = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setEvents(fetchedEvents);
          setSelectedEvent(fetchedEvents[0]); // ← AUTO SELECT FIRST EVENT
        }

      } catch (err) {
        console.error("Error fetching events:", err);
        setEvents([defaultEvent]);
        setSelectedEvent(defaultEvent);
      }
    };

    fetchEvents();
  }, []);

  const updateEvent = async (id, updatedEvent) => {
    try {
      await setDoc(doc(db, "events", id), updatedEvent, { merge: true });
      setEvents((prev) =>
        prev.map((ev) => (ev.id === id ? { ...ev, ...updatedEvent } : ev))
      );
      setSelectedEvent((ev) =>
        ev?.id === id ? { ...ev, ...updatedEvent } : ev
      );
    } catch (err) {
      console.error("Failed to update event:", err);
    }
  };

  return (
    <EventContext.Provider
      value={{
        events,
        selectedEvent,
        setSelectedEvent,
        updateEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = () => useContext(EventContext);

