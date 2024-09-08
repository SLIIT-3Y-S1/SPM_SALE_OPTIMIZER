import { Customer, updateCustomer } from '@/lib/services/customerService';
import React, { useEffect, useState } from 'react';

interface UpdateCustomerProps {
  onClose: () => void;
  customer: Customer | null; // Accept customer as a nullable type
  onUpdateSuccess: () => void; // Callback to refetch customers after update
}

const UpdateCustomerPopup: React.FC<UpdateCustomerProps> = ({ onClose, customer, onUpdateSuccess }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (customer) {
      // Update state only when customer is passed
      setFirstName(customer.first_name);
      setLastName(customer.last_name);
      setEmail(customer.email);
      setPhoneNumber(customer.phone_number);
    }
  }, [customer]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const customerData = {
      customer_id: customer?.customer_id ?? '', // Assuming customer_id is mandatory
      first_name: firstName,
      last_name: lastName,
      email,
      phone_number: phoneNumber,
    };

    try {
      const result = await updateCustomer(customerData);
      if (result) {
        console.log('Customer updated successfully:', result);
        onUpdateSuccess(); // Call the success callback to refetch data
      } else {
        console.error('Failed to update customer');
      }
    } catch (error) {
      console.error('Error updating customer:', error);
    } finally {
      setLoading(false); // Stop loading
      onClose(); // Close the popup
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="py-3 sm:max-w-xl sm:mx-auto">
        <div className="bg-white min-w-1xl flex flex-col rounded-xl shadow-lg">
          <div className="px-12 py-5">
            <h2 className="text-gray-800 text-3xl font-semibold">Update Customer</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="bg-gray-200 w-full flex flex-col items-center">
              <div className="flex flex-col items-center py-6 space-y-3">
                <div className="w-[500px] flex flex-col pl-10 pr-10">
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
                <div className="w-[500px] flex flex-col pl-10 pr-10">
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
                <div className="w-[500px] flex flex-col pl-10 pr-10">
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
                <div className="w-[500px] flex flex-col pl-10 pr-10">
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
              </div>
              <div className="w-full px-10 pb-5">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 px-4 mt-4 rounded-xl hover:bg-blue-700 transition duration-300"
                >
                  {loading ? 'Updating...' : 'Update Customer'}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full bg-red-500 text-white py-3 px-4 mt-4 rounded-xl hover:bg-red-600 transition duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCustomerPopup;
