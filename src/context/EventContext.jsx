// src/context/EventContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { collection, getDocs, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import Tswift from "../assets/Tswift.jpg";

const EventContext = createContext();

// Default event fallback
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

  // Load events from Firestore
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const snapshot = await getDocs(collection(db, "events"));
        if (snapshot.empty) {
          // Seed default event if Firestore is empty
          const docRef = await addDoc(collection(db, "events"), defaultEvent);
          setEvents([{ id: docRef.id, ...defaultEvent }]);
        } else {
          const fetchedEvents = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setEvents(fetchedEvents);
        }
      } catch (err) {
        console.error("Error fetching events:", err);
        setEvents([defaultEvent]); // fallback to local default
      }
    };

    fetchEvents();
  }, []);

  // Update event in Firestore
  const updateEvent = async (id, updatedEvent) => {
    try {
      if (!id) throw new Error("Missing event ID for Firestore update");
      await setDoc(doc(db, "events", id), updatedEvent, { merge: true });
      // Update local state
      setEvents(updatedEvent);
    } catch (err) {
      console.error("Failed to update event:", err);
    }
  }; 

  return (
    <EventContext.Provider value={{ events, updateEvent }}>
      {children}
    </EventContext.Provider>
  );
};

// Custom hook
export const useEvent = () => useContext(EventContext);

