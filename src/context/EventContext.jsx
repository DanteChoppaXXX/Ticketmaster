// src/context/EventContext.jsx

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import { db, auth } from "../firebase";
import Tswift from "../assets/Tswift.jpg";

const EventContext = createContext();

const defaultEvent = {
  name: "Taylor Swift | The Eras Tour",
  title: "Verified Resale Ticket",
  image: Tswift,
  tix: 2,
  date: "Thu • 21 Nov 2026 • 7:00 PM",
  venue: "Rogers Center",
  seating: "METLIFE GATE",
  seatMap: [
    {
      sec: "A3",
      row: "10",
      seat: "5",
    },
    {
      sec: "A3",
      row: "10",
      seat: "6",
    },
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

  // Fetch user's single event
  useEffect(() => {
    if (!user) {
      setEvents([]);
      setSelectedEvent(null);
      return;
    }

    const fetchEvent = async () => {
      try {
        const eventRef = doc(
          db,
          "users",
          user.uid,
          "events",
          "currentEvent"
        );

        const snapshot = await getDoc(eventRef);

        // Seed default event ONCE if none exists
        if (!snapshot.exists()) {
          await setDoc(eventRef, defaultEvent);

          const seededEvent = {
            id: "currentEvent",
            ...defaultEvent,
          };

          setEvents([seededEvent]);
          setSelectedEvent(seededEvent);
          return;
        }

        const eventData = {
          id: "currentEvent",
          ...snapshot.data(),
        };

        setEvents([eventData]);
        setSelectedEvent(eventData);
      } catch (err) {
        console.error("Error loading event:", err);
      }
    };

    fetchEvent();
  }, [user]);

  // Clear selected seats when event changes
  useEffect(() => {
    setSelectedSeats([]);
  }, [selectedEvent]);

  // Update the user's single event document
  const updateEvent = async (updatedEvent) => {
    if (!user) return;

    try {
      const eventRef = doc(
        db,
        "users",
        user.uid,
        "events",
        "currentEvent"
      );

      await setDoc(eventRef, updatedEvent, {
        merge: true,
      });

      setEvents((prev) => [
        {
          ...(prev[0] || {}),
          ...updatedEvent,
        },
      ]);

      setSelectedEvent((prev) => ({
        ...(prev || {}),
        ...updatedEvent,
      }));
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
};

export const useEvent = () => useContext(EventContext);
