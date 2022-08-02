import React from "react";

const StepperControl = ({ handleClick, currentStep, steps }) => {
  return (
    <div className="container flex justify-around mt-4 mb-8">
      {/*Back button */}
      <button onClick={() => handleClick()} className={`bg-[#c0baba] text-[#477e89] uppercase py-2 px-4 rounded-xl cursor-pointer border-2 border-[#a8a2a2] hover:bg-[#9f9797] hover:text-white transition duration-200 ease-in-out ${currentStep === 1 ? "hidden":""}`}>
        Back
      </button>
      <button
        onClick={() => handleClick("next")}
        className="cursor-pointer rounded-lg bg-greenColor py-2 px-4 font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-yellowWefinder hover:text-greenColor"
      >
        {currentStep === steps.length  ? "Confirmar" : "Siguiente"}
      </button>
    </div>
  );
};

export default StepperControl;
