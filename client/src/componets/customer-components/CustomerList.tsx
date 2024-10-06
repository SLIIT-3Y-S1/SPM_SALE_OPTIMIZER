'use client';

import { useState } from 'react';
import UpdateCustomerPopup from './UpdateCustomerPopup'; 
import { deleteCustomer, Customer } from '@/lib/services/customerService'; 

interface CustomerListProps {
  customers: Customer[]; // Accept customers as a prop
  onUpdateSuccess: () => void;
}

export const CustomerList = ({ customers, onUpdateSuccess }: CustomerListProps) => {
  const [showPopup, setShowPopup] = useState(false);
  const [customer, setCustomer] = useState<Customer | null>(null);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const editBtnHandler = (customer: Customer) => {
    togglePopup();
    setCustomer(customer);
  };

  const deleteBtnHandler = async (customer_id: string) => {
    const alert = window.confirm('Are you sure you want to delete this customer?');
    if (alert) {
      const isDeleted: boolean = await deleteCustomer(customer_id);
      if (isDeleted) {
        onUpdateSuccess();
      } else {
        console.error('Failed to delete customer');
      }
    }
  };

  return (
    <section className="bg-white py-2 w-[84%] overflow-hidden">
      <div className="container">
        <div className="flex flex-wrap">
          <div className="w-full ">
            <div className="">
              <table className="w-[100%] ">
                <thead>
                  <tr className="bg-blue-500 text-center">
                    <th className="w-1/6 min-w-[160px] text-lg font-semibold text-white py-4 lg:py-7 px-3 lg:px-4 border-l border-transparent">NO</th>
                    <th className="w-1/6 min-w-[160px] text-lg font-semibold text-white py-4 lg:py-7 px-3 lg:px-4">CustomerName</th>
                    <th className="w-1/6 min-w-[160px] text-lg font-semibold text-white py-4 lg:py-7 px-3 lg:px-4">PhoneNo</th>
                    <th className="w-1/6 min-w-[160px] text-lg font-semibold text-white py-4 lg:py-7 px-3 lg:px-4">Email</th>
                    <th className="w-1/6 min-w-[160px] text-lg font-semibold text-white py-4 lg:py-7 px-3 lg:px-4">DateOfBirth</th>
                    <th className="w-1/6 min-w-[160px] text-lg font-semibold text-white py-4 lg:py-7 px-3 lg:px-4">Total Of Orders</th>
                    <th className="w-1/6 min-w-[160px] text-lg font-semibold text-white py-4 lg:py-7 px-3 lg:px-4 border-r border-transparent">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer, index) => (
                    <tr key={customer.customer_id}>
                      <td className="text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-l border-[#E8E8E8]">{index + 1}</td>
                      <td className="text-center text-dark font-medium text-base py-5 px-2 bg-white border-b border-[#E8E8E8]">{customer.customer_name}</td>
                      <td className="text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-[#E8E8E8]">{customer.phone_number}</td>
                      <td className="text-center text-dark font-medium text-base py-5 px-2 bg-white border-b border-[#E8E8E8]">{customer.email}</td>
                      <td className="text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-[#E8E8E8]">{customer.dob}</td>
                      <td className="text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-[#E8E8E8]"><p>Rs.{customer.total_amount}.00</p></td>
                      <td className="text-center text-dark font-medium text-base py-5 px-2 bg-white border-b border-r border-[#E8E8E8]">
                        <button className="text-blue-500 hover:text-blue-700" onClick={() => editBtnHandler(customer)}>Edit</button> |{' '}
                        <button className="text-red-500 hover:text-red-700" onClick={() => deleteBtnHandler(customer.customer_id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {showPopup && <UpdateCustomerPopup onClose={togglePopup} customer={customer} onUpdateSuccess={onUpdateSuccess} />}
    </section>
  );
};
