import React from "react";
import { QRCodeCanvas } from "qrcode.react";

// Example mock tickets data
const mockTickets = [
  {
    id: "tkt_001",
    event: "Adele - Live in Lagos",
    date: "2026-03-12T19:00:00.000Z",
    venue: "Eko Convention Center",
    seat: "Section A, Row 5, Seat 12",
    image: "/assets/adele1.jpg",
    code: "ADELE-LAGOS-001"
  },
  {
    id: "tkt_002",
    event: "Burna Boy Concert",
    date: "2026-04-22T20:00:00.000Z",
    venue: "Accra Arena",
    seat: "Section B, Row 2, Seat 8",
    image: "/assets/burna.jpg",
    code: "BURNABOY-ACC-002"
  }
];

export default function MyTickets() {
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">My Tickets</h1>
      <div className="space-y-4">
        {mockTickets.map((ticket) => {
          const dateStr = new Date(ticket.date).toLocaleString();
          return (
            <div
              key={ticket.id}
              className="flex bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
            >
              {/* Event image */}
              <div className="w-24 sm:w-32 h-24 sm:h-32 flex-shrink-0">
                <img
                  src={ticket.image}
                  alt={ticket.event}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Ticket details */}
              <div className="flex-1 p-3 flex flex-col justify-between">
                <div>
                  <h2 className="font-semibold text-lg line-clamp-2">
                    {ticket.event}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">{dateStr}</p>
                  <p className="text-sm text-gray-500 mt-1">{ticket.venue}</p>
                  <p className="text-sm text-gray-700 mt-2">{ticket.seat}</p>
                </div>
              </div>

              {/* QR Code */}
              <div className="w-20 sm:w-24 flex items-center justify-center bg-gray-50 p-2">
                <QRCodeCanvas value={ticket.code} size={64} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


