// src/components/SliderController.jsx
import React, { useState } from "react";
import TransferTicketSelector from "./TransferTicketSelector"; // SelectSeat
import TransferBottomSlider from "./TransferTo"; // TransferTo
import CustomForm from "./TransferForm"; // TransferForm

const SliderController = ({ open, onClose }) => {
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    setCurrent((prev) => Math.min(prev + 1, 2));
  };

  const handlePrevious = () => {
    setCurrent((prev) => Math.max(prev - 1, 0));
  };

  const handleClose = () => {
    setCurrent(0);
    onClose?.();
  };

  return (
    <>
      <TransferTicketSelector
        open={current === 0 && open}
        onClose={handleClose}
        onNext={handleNext} // new prop for controller
      />
      <TransferBottomSlider
        open={current === 1 && open}
        onClose={handlePrevious} // back goes to previous
        onNext={handleNext}      // next goes forward
      />
      <CustomForm
        open={current === 2 && open}
        onClose={handlePrevious} // back goes to previous
      />
    </>
  );
};

export default SliderController;

