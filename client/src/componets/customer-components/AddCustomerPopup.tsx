'use client'

import { saveCustomer } from "@/lib/services/customerService";
import React, { useState } from "react";

interface AddCustomerPopupProps {
  onClose: () => void;
  onSaveSuccess: () => void; // Callback to refetch data after save
}

const AddCustomerPopup: React.FC<AddCustomerPopupProps> = ({ onClose, onSaveSuccess }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dob, setdob] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true); // Start loading

    if (!firstName || !lastName || !email || !phoneNumber || !dob) {
      console.error('Please fill all fields');
      alert('Please fill all fields');
      setLoading(false);
      return;
    }
    const formData = {
      first_name: firstName,
      last_name: lastName,
      email,
      phone_number: phoneNumber,
      dob:dob,
    };

    try {
      const result = await saveCustomer(formData);
      if (result) {
        console.log("Customer saved successfully:", result);
        onSaveSuccess(); // Call the success callback to refetch data
        onClose(); // Close the popup
      } else {
        console.error("Failed to save customer");
      }
    } catch (error) {
      console.error("Error saving customer:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };
  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 ">
      <div className="py-3 sm:max-w-xl sm:mx-auto my-8">
        <div className="bg-white min-w-1xl flex flex-col rounded-xl shadow-lg">
          <div className="px-12 py-5">
            <h2 className="text-gray-800 text-2xl font-semibold">Add A Customer</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="bg-gray-200 w-full flex flex-col items-center">
              <div className="flex flex-col items-center py-6 space-y-3">
                <div className="w-[400px] flex flex-col pl-10 pr-10">
                  <label className="text-gray-800 text-lg font-semibold" htmlFor="first_name">
                    First Name
                  </label>
                  <input
                    className="py-3 px-4 mt-2 w-full rounded-xl border border-gray-300"
                    type="text"
                    id="first_name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="w-[400px] flex flex-col pl-10 pr-10">
                  <label className="text-gray-800 text-lg font-semibold" htmlFor="last_name">
                    Last Name
                  </label>
                  <input
                    className="py-3 px-4 mt-2 w-full rounded-xl border border-gray-300"
                    type="text"
                    id="last_name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="w-[400px] flex flex-col pl-10 pr-10">
                  <label className="text-gray-800 text-lg font-semibold" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="py-3 px-4 mt-2 w-full rounded-xl border border-gray-300"
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="w-[400px] flex flex-col pl-10 pr-10">
                  <label className="text-gray-800 text-lg font-semibold" htmlFor="phone_number">
                    Phone Number
                  </label>
                  <input
                    className="py-3 px-4 mt-2 w-full rounded-xl border border-gray-300"
                    type="text"
                    id="phone_number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="w-[400px] flex flex-col pl-10 pr-10">
                  <label className="text-gray-800 text-lg font-semibold" htmlFor="dob">
                    Date Of Birth
                  </label>
                  <input
                    className="py-3 px-4 mt-2 w-full rounded-xl border border-gray-300"
                    type="date" // Change this to 'date'
                    id="dob"
                    value={dob} // Use the state variable for DOB
                    onChange={(e) => setdob(e.target.value)} // This will get the date as a string
                    max={today} // Set maximum date to today
                  />
                </div>
              </div>
              <div className="w-[400px] flex flex-col pl-10 pr-10">
                <button
                  type="submit"
                  className={`py-3 my-8 text-lg bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white flex items-center justify-center ${loading ? "opacity-50" : ""}`}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6 mr-2"></div>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </div>
          </form>
          <div className="h-20 flex items-center justify-center">
            <button onClick={onClose} className="text-gray-600">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCustomerPopup;
