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
    if(quantitySold === "0" || totalPrice === "0"){
      console.error('Quantity Sold and Total Price must be greater than 0');
      alert('Quantity Sold and Total Price must be greater than 0');
      setLoading(false);
      return;
    }
    if(isNaN(formData.quantity_sold) || isNaN(formData.total_price)){
      console.error('Quantity Sold and Total Price must be numbers');
      alert('Quantity Sold and Total Price must be numbers');
      setLoading(false);
      return;
    }
    if(formData.quantity_sold < 0 || formData.total_price < 0){
      console.error('Quantity Sold and Total Price must be greater than 0');
      alert('Quantity Sold and Total Price must be greater than 0');
      setLoading(false);
      return;
    }
    
    try {
      const result = await saveSale(formData);
      if(result === "orderID or productID does not exist"){
        alert('Order ID or Product ID does not exist');
        setLoading(false);
        return;
      }
      
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
      <div className="py-3 sm:max-w-xl sm:mx-auto w-full px-4">
        <div className="bg-white min-w-[300px] md:min-w-[400px] lg:min-w-[500px] flex flex-col rounded-xl shadow-lg">
          <div className="px-6 py-4"> {/* Reduced padding from py-5 to py-4 */}
            <h2 className="text-gray-800 text-3xl font-semibold text-center">Add A Sale</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="bg-gray-200 w-full flex flex-col items-center">
              <div className="flex flex-col items-center py-4 space-y-4 w-full"> {/* Reduced padding from py-6 to py-4 */}
                {[
                  { label: "Product ID", id: "product_id", value: productID, setValue: setProductID },
                  { label: "Order ID", id: "variant_id", value: orderID, setValue: setOrderID },
                  { label: "Quantity Sold", id: "quantity_sold", value: quantitySold, setValue: setQuantitySold, type: "number" },
                  { label: "Total Price", id: "total_price", value: totalPrice, setValue: setTotalPrice, type: "number" },
                ].map(({ label, id, value, setValue, type = "text" }) => (
                  <div key={id} className="flex flex-col w-full max-w-md px-4">
                    <label className="text-gray-800 text-lg font-semibold" htmlFor={id}>
                      {label}
                    </label>
                    <input
                      className="py-2 px-4 mt-2 w-full rounded-xl border border-gray-300" // Reduced padding from py-3 to py-2
                      type={type}
                      id={id}
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-col w-full max-w-md px-4">
                <button
                  type="submit"
                  className={`py-3 my-6 text-lg bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white flex items-center justify-center ${loading ? "opacity-50" : ""}`} // Reduced margin from my-8 to my-6
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
          <div className="h-16 flex items-center justify-center"> {/* Reduced height from h-20 to h-16 */}
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
