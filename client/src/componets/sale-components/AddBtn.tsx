'use client'

import { useState } from "react";
import AddSalePopup from "./AddSalePopup";


interface AddBtn {
    onSaveSuccess: () => void; 
  }
  
const AddBtn: React.FC<AddBtn> = ({onSaveSuccess}) => {
    const [showPopup, setShowPopup] = useState(false);
      // Function to toggle the popup
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  return (
    <div className="">
      <button
        onClick={togglePopup}
        className="py-3 px-10 bg-blue-500 text-white rounded-lg"
      >
        Add
      </button>

      {/* Conditionally render the popup */}
      {showPopup && <AddSalePopup onClose={togglePopup} onSaveSuccess={onSaveSuccess}/>}
    </div>
  )
}

export default AddBtn