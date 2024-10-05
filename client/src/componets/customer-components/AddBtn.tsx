'use client'

import { useState } from "react";
import AddCustomerPopup from "./AddCustomerPopup"; 
interface AddCustomerBtnProps {
    onSaveSuccess: () => void; 
}
  
const AddCustomerBtn: React.FC<AddCustomerBtnProps> = ({ onSaveSuccess }) => {
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
                Add Customer
            </button>

            {/* Conditionally render the popup */}
            {showPopup && <AddCustomerPopup onClose={togglePopup} onSaveSuccess={onSaveSuccess} />}
        </div>
    );
}

export default AddCustomerBtn;
