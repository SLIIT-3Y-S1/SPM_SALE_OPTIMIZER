'use client'

import { Sale } from '@/lib/services/saleServices';

interface SaleListProps {
  sales: Sale[];
}
const editBtnHandler = (sale: Sale) => {
  console.log('clicked edit button');
  console.log(sale);
}
export const SaleList: React.FC<SaleListProps> = ({ sales }) => {
  return (
    <section className="bg-white py-20 lg:py-[120px]">
      <div className="container">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4">
            <div className="max-w-full overflow-x-auto">
              <table className="table-auto w-[50%]">
                <thead>
                  <tr className="bg-blue-500 text-center">
                    <th className="w-1/6 min-w-[160px] text-lg font-semibold text-white py-4 lg:py-7 px-3 lg:px-4 border-l border-transparent">Order ID</th>
                    <th className="w-1/6 min-w-[160px] text-lg font-semibold text-white py-4 lg:py-7 px-3 lg:px-4">Product ID</th>
                    <th className="w-1/6 min-w-[160px] text-lg font-semibold text-white py-4 lg:py-7 px-3 lg:px-4">Registration</th>
                    <th className="w-1/6 min-w-[160px] text-lg font-semibold text-white py-4 lg:py-7 px-3 lg:px-4">Variant ID</th>
                    <th className="w-1/6 min-w-[160px] text-lg font-semibold text-white py-4 lg:py-7 px-3 lg:px-4">Quantity</th>
                    <th className="w-1/6 min-w-[160px] text-lg font-semibold text-white py-4 lg:py-7 px-3 lg:px-4 border-r border-transparent">Total Price</th>
                    <th className="w-1/6 min-w-[160px] text-lg font-semibold text-white py-4 lg:py-7 px-3 lg:px-4 border-r border-transparent">Options</th>
                  </tr>
                </thead>
                <tbody>
                  {sales.map((sale) => (
                    <tr key={sale.sale_id}>
                      <td className="text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-l border-[#E8E8E8]">{sale.order_id}</td>
                      <td className="text-center text-dark font-medium text-base py-5 px-2 bg-white border-b border-[#E8E8E8]">{sale.product_id}</td>
                      <td className="text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-[#E8E8E8]">{sale.created_at}</td>
                      <td className="text-center text-dark font-medium text-base py-5 px-2 bg-white border-b border-[#E8E8E8]">{sale.variant_id || 'N/A'}</td>
                      <td className="text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-[#E8E8E8]">{sale.quantity_sold}</td>
                      <td className="text-center text-dark font-medium text-base py-5 px-2 bg-white border-b border-r border-[#E8E8E8]">${sale.total_price}</td>
                      <td className="text-center text-dark font-medium text-base py-5 px-2 bg-white border-b border-r border-[#E8E8E8]">
                        <button className="text-blue-500 hover:text-blue-700"
                        onClick={() => editBtnHandler(sale)}
                        >Edit</button> |{' '}
                        <button className="text-red-500 hover:text-red-700">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
