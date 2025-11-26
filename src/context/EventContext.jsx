// src/context/EventContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { collection, getDocs, addDoc, setDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase";
import Tswift from "../assets/Tswift.jpg";

const EventContext = createContext();

// Default reference event template
const defaultEvent = {
  name: "Taylor Swift | The Eras Tour",
  title: "Verified Resale Ticket",
  image: Tswift,
  tix: 2,
  date: "Thu, Nov 21, 7pm • Rogers Center",
  seating: "METLIFE GATE",
  seatMap: [
    { sec: "A3", row: "10", seat: "5" },
    { sec: "A3", row: "10", seat: "6" },
  ],
};

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]); 


  const [user, setUser] = useState(null);

  // Listen for auth changes
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => {
      setUser(u);
    });
    return () => unsub();
  }, []);

  // Fetch events for logged-in user
  useEffect(() => {
    if (!user) {
      setEvents([]);
      setSelectedEvent(null);
      return;
    }

    const fetchEvents = async () => {
      try {
        const eventsRef = collection(db, "users", user.uid, "events");
        const snapshot = await getDocs(eventsRef);

        if (snapshot.empty) {
          // Create default seed event for THIS user only
          const docRef = await addDoc(eventsRef, defaultEvent);
          const seededEvent = { id: docRef.id, ...defaultEvent };

          setEvents([seededEvent]);
          setSelectedEvent(seededEvent);
          return;
        }

        // Otherwise load existing user events
        const userEvents = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setEvents(userEvents);
        setSelectedEvent(userEvents[0]);

      } catch (err) {
        console.error("Error loading user events:", err);
      }
    };

    fetchEvents();
  }, [user]);

  // Update event for a user
  const updateEvent = async (id, updatedEvent) => {
    if (!user) return;

    try {
      const ref = doc(db, "users", user.uid, "events", id);
      await setDoc(ref, updatedEvent, { merge: true });

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
        selectedSeats,
        setSelectedSeats,
      }}
    >
      {children}
    </EventContext.Provider>
  );
    useEffect(() => {
      setSelectedSeats([]);
    }, [selectedEvent]);
};

export const useEvent = () => useContext(EventContext);

