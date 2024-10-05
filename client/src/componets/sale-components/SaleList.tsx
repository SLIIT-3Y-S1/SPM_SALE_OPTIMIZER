'use client';


import { useState, useEffect } from 'react';
import UpdateSalePopup from './UpdateSalePopup';
import { deleteSale, Sale } from '@/lib/services/saleServices';



interface SaleListProps {
  sales: Sale[]; // Accept sales as a prop
  onUpdateSuccess: () => void;
}

export const SaleList = ({ sales , onUpdateSuccess}: SaleListProps) => {
  const [showPopup, setShowPopup] = useState(false);
  const [sale, setSale] = useState<Sale | null>(null); 

 

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  const editBtnHandler = (sale: Sale) => {
    togglePopup()
    setSale(sale)

  };
  const deleteBtnHandler = async (sale_id: string) => {
    const alert = window.confirm('Are you sure you want to delete this sale?')
    if(alert){
      const isDeleted:boolean = await deleteSale(sale_id)
      if(isDeleted){
        onUpdateSuccess()
      }
    
      else{
        console.error('Failed to delete sale')
      }
    }
    
    }

  return (
    <section className="bg-white py-2  w-[94%] overflow-hidden">
      <div className="container">
        <div className="flex flex-wrap">
          <div className="w-full ">
            <div className="">
              <table className="table-auto w-[50%]">
                <thead>
                  <tr className="bg-blue-500 text-center">
                    <th className="w-1/6 min-w-[160px] text-lg font-semibold text-white py-4 lg:py-7 px-3 lg:px-4 border-l border-transparent">NO</th>
                    <th className="w-1/6 min-w-[160px] text-lg font-semibold text-white py-4 lg:py-7 px-3 lg:px-4">Product ID</th>
                    <th className="w-1/6 min-w-[160px] text-lg font-semibold text-white py-4 lg:py-7 px-3 lg:px-4">Order ID</th>
                    <th className="w-1/6 min-w-[160px] text-lg font-semibold text-white py-4 lg:py-7 px-3 lg:px-4">Quantity</th>
                    <th className="w-1/6 min-w-[160px] text-lg font-semibold text-white py-4 lg:py-7 px-3 lg:px-4">Total Price</th>
                    <th className="w-1/6 min-w-[160px] text-lg font-semibold text-white py-4 lg:py-7 px-3 lg:px-4 border-r border-transparent">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                  sales.map((sale, index) => (
                    <tr key={sale.sale_id}>
                      <td className="text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-l border-[#E8E8E8]">{index + 1}</td>
                      <td className="text-center text-dark font-medium text-base py-5 px-2 bg-white border-b border-[#E8E8E8]">{sale.product_id}</td>
                      <td className="text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-[#E8E8E8]">{sale.order_id}</td>
                      <td className="text-center text-dark font-medium text-base py-5 px-2 bg-white border-b border-[#E8E8E8]">{sale.quantity_sold}</td>
                      <td className="text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-[#E8E8E8]">${sale.total_price}</td>
                      <td className="text-center text-dark font-medium text-base py-5 px-2 bg-white border-b border-r border-[#E8E8E8]">
                        <button className="text-blue-500 hover:text-blue-700" onClick={() => editBtnHandler(sale)}>Edit</button> |{' '}
                        <button className="text-red-500 hover:text-red-700"
                        onClick={() => {deleteBtnHandler(sale.sale_id)}}
                        >Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {showPopup && <UpdateSalePopup onClose={togglePopup} sale={sale} onUpdateSuccess={onUpdateSuccess}/>}
    </section>
  );
};
