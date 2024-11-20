import { saveSale } from "@/lib/services/saleServices";
import React, { useState } from "react";
import { fetchSales } from "@/lib/services/saleServices"; // Assuming you have a service to fetch sales

interface AddSalePopupProps {
  onClose: () => void;
  onSaveSuccess: () => void; // Callback to refetch sales after save
}

const AddSalePopup: React.FC<AddSalePopupProps> = ({ onClose, onSaveSuccess }) => {
  const [productID, setProductID] = useState("");
  const [orderID, setOrderID] = useState("");
  const [quantitySold, setQuantitySold] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true); // Start loading

    if(!productID || !orderID || !quantitySold || !totalPrice) {
      console.error('Please fill all fields');
      alert('Please fill all fields');
      setLoading(false);
      return;
    }
    const formData = {
      product_id: productID,
      order_id: orderID,
      quantity_sold: parseInt(quantitySold, 10),
      total_price: parseFloat(totalPrice),
    };

    try {
      const result = await saveSale(formData);
      if (result) {
        console.log("Sale saved successfully:", result);
        onSaveSuccess(); // Call the success callback to refetch data
        onClose(); // Close the popup
      } else {
        console.error("Failed to save sale");
      }
    } catch (error) {
      console.error("Error saving sale:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="py-3 sm:max-w-xl sm:mx-auto">
        <div className="bg-white min-w-1xl flex flex-col rounded-xl shadow-lg">
          <div className="px-12 py-5">
            <h2 className="text-gray-800 text-3xl font-semibold">Add A Sale</h2>
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
                  />
                </div>
                <div className="w-[500px] flex flex-col pl-10 pr-10">
                  <label className="text-gray-800 text-lg font-semibold" htmlFor="variant_id">
                    Order ID
                  </label>
                  <input
                    className="py-3 px-4 mt-2 w-full rounded-xl border border-gray-300"
                    type="text"
                    id="variant_id"
                    value={orderID}
                    onChange={(e) => setOrderID(e.target.value)}
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
              <div className="w-[500px] flex flex-col pl-10 pr-10">
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

export default AddSalePopup;
