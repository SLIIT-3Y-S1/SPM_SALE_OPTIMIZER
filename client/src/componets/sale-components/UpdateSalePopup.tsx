import { Sale, updateSale } from '@/lib/services/saleServices';
import React, { useEffect, useState } from 'react';


interface UpdateSaleProps {
  onClose: () => void;
  sale: Sale | null; // Accept sale as a nullable type
  onUpdateSuccess: () => void; // Callback to refetch sales after update
}

const UpdateSalePopup: React.FC<UpdateSaleProps> = ({ onClose, sale, onUpdateSuccess}) => {
    const [productID, setProductID] = useState('');
    const [orderID, setOrderID] = useState('');
    const [quantitySold, setQuantitySold] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      if (sale) {
        // Update state only when sale is passed
        setOrderID(sale.order_id);
        setProductID(sale.product_id);
        setQuantitySold(sale.quantity_sold.toString());
        setTotalPrice(sale.total_price.toString());
      }
    }, [sale]);
  
    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      setLoading(true);
      const saleData = {
        sale_id: sale?.sale_id ?? '',
        order_id: orderID,
        product_id: productID,
        quantity_sold: parseInt(quantitySold, 10),
        total_price: parseFloat(totalPrice),
        variant_id: null,
      };
      if (saleData.quantity_sold === 0 || saleData.total_price === 0) {
        console.error('Quantity Sold and Total Price must be greater than 0');
        alert('Quantity Sold and Total Price must be greater than 0');
        setLoading(false);
        return;
      }
      if (isNaN(saleData.quantity_sold) || isNaN(saleData.total_price)) {
        console.error('Quantity Sold and Total Price must be numbers');
        alert('Quantity Sold and Total Price must be numbers');
        setLoading(false);
        return;
      }
      if (saleData.quantity_sold < 0 || saleData.total_price < 0) {
        console.error('Quantity Sold and Total Price must be greater than 0');
        alert('Quantity Sold and Total Price must be greater than 0');
        setLoading(false);
        return;
      }
      

      try {
        const result = await updateSale(saleData);
        if (result) {
        onUpdateSuccess();
          console.log('Sale updated successfully:', result);
        } else {
          console.error('Failed to update sale');
        }
      } catch (error) {
        console.error('Error updating sale:', error);
        
      }
      // Logic for handling the form submission (e.g., sending updated data to backend)
      // After submission:
      setLoading(false);
      onClose();
    };
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="py-3 sm:max-w-xl sm:mx-auto">
          <div className="bg-white min-w-1xl flex flex-col rounded-xl shadow-lg">
            <div className="px-12 py-5">
              <h2 className="text-gray-800 text-3xl font-semibold">Update Sale</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="bg-gray-200 w-full flex flex-col items-center">
                <div className="flex flex-col items-center py-6 space-y-3">
                  <div className="w-[500px] flex flex-col pl-10 pr-10">
                    <label className="text-gray-800 text-lg font-semibold" htmlFor="product_id">
                      Product ID
                    </label>
                    <input
                      className="py-3 px-4 mt-2 w-full rounded-xl border border-gray-300"
                      type="text"
                      id="product_id"
                      value={productID}
                      onChange={(e) => setProductID(e.target.value)}
                      disabled
                    />
                  </div>
                  <div className="w-[500px] flex flex-col pl-10 pr-10">
                    <label className="text-gray-800 text-lg font-semibold" htmlFor="order_id">
                      Order ID
                    </label>
                    <input
                      className="py-3 px-4 mt-2 w-full rounded-xl border border-gray-300"
                      type="text"
                      id="order_id"
                      value={orderID}
                      onChange={(e) => setOrderID(e.target.value)}
                      disabled
                    />
                  </div>
                  <div className="w-[500px] flex flex-col pl-10 pr-10">
                    <label className="text-gray-800 text-lg font-semibold" htmlFor="quantity_sold">
                      Quantity Sold
                    </label>
                    <input
                      className="py-3 px-4 mt-2 w-full rounded-xl border border-gray-300"
                      type="number"
                      id="quantity_sold"
                      value={quantitySold}
                      onChange={(e) => setQuantitySold(e.target.value)}
                      
                    />
                  </div>
                  <div className="w-[500px] flex flex-col pl-10 pr-10">
                    <label className="text-gray-800 text-lg font-semibold" htmlFor="total_price">
                      Total Price
                    </label>
                    <input
                      className="py-3 px-4 mt-2 w-full rounded-xl border border-gray-300"
                      type="number"
                      id="total_price"
                      value={totalPrice}
                      onChange={(e) => setTotalPrice(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full px-10 pb-5">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-3 px-4 mt-4 rounded-xl hover:bg-blue-700 transition duration-300"
                  >
                    {loading ? 'Updating...' : 'Update Sale'}
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
  
  export default UpdateSalePopup;