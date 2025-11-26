import React, { useState } from "react";

// ⬇️ Your components
import SelectSeat from "./SelectSeat";
import TransferTo from "./TransferTo";
import TransferForm from "./TransferForm";

export default function TicketTransferFlow({ open, onClose }) {
  // FLOW STATES: 1 = seat selection, 2 = transfer options, 3 = manual form
  const [step, setStep] = useState(1);

  // Store selected seats from SelectSeat.jsx
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Reset flow when parent closes bottom sheet
  const handleCloseAll = () => {
    setStep(1);
    setSelectedSeats([]);
    onClose?.();
  };

  /** --------------------------
   * STEP 1 → SelectSeat
   * -------------------------*/
  const handleSeatsSelected = (seats) => {
    setSelectedSeats(seats);
    setStep(2); // Go to TransferTo
  };

  /** --------------------------
   * STEP 2 → TransferTo
   * -------------------------*/
  const handleManualEntry = () => {
    setStep(3); // Go to TransferForm
  };

  const handleBackFromTransferTo = () => {
    setStep(1);
  };

  /** --------------------------
   * STEP 3 → TransferForm
   * -------------------------*/
  const handleTransferFormClose = () => {
    handleCloseAll(); // Close entire flow after submission
  };

  return (
    <>
      {/* STEP 1: Select Seats */}
      <SelectSeat
        open={open && step === 1}
        onClose={handleCloseAll}
        onContinue={handleSeatsSelected}  // <— critical
      />

      {/* STEP 2: Transfer To */}
      <TransferTo
        open={open && step === 2}
        onClose={handleCloseAll}
        onBack={handleBackFromTransferTo}
        onManualEntry={handleManualEntry}
      />

      {/* STEP 3: Manual Transfer Form */}
      <TransferForm
        open={open && step === 3}
        onClose={handleTransferFormClose}
        onBack={() => setStep(2)}
        selectedSeats={selectedSeats}
        seatCount={selectedSeats.length}
      />
    </>
  );
}

