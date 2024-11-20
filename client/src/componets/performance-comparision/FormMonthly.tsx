import React, { useEffect, useState } from "react";
import {
  fetchAvailableMonths,
  fetchMonthlyComparison,
} from "@/lib/services/comparisonServices";

const FormMonthly = ({ onComparisonData }) => {
  const [availableMonths, setAvailableMonths] = useState<string[]>([]);
  const [selectedMonthA, setSelectedMonthA] = useState<string>("");
  const [selectedMonthB, setSelectedMonthB] = useState<string>("");
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch available months from the API when the component loads
  useEffect(() => {
    const fetchMonths = async () => {
      const months = await fetchAvailableMonths(); // Use the service method
      setAvailableMonths(months);
    };

    fetchMonths();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMonthA || !selectedMonthB) {
      alert("Please select both months.");
      return;
    }
    if (selectedMonthA === selectedMonthB) {
      alert("Please select two different months.");
      return;
    }

    // Set loading state when form is submitted
    setLoading(true);

    try {
      // Call the backend to fetch comparison data
      const data = await fetchMonthlyComparison(selectedMonthA, selectedMonthB);

      // Pass the data to the parent component for rendering the charts
      onComparisonData(data);
    } catch (error) {
      console.error("Error fetching monthly comparison data:", error);
    } finally {
      // Reset loading state after fetching data
      setLoading(false);
    }
  };

  return (
    <div>
      <form id="comparison-form" className="mt-5" onSubmit={handleSubmit}>
        <div>
          <label className="mr-5">Set comparison month A</label>
          <input
            type="month"
            list="monthsA"
            value={selectedMonthA}
            onChange={(e) => setSelectedMonthA(e.target.value)}
            className="text-base border border-gray-300 rounded-md"
            disabled={loading} // Disable input while loading
          />
          <datalist id="monthsA">
            {availableMonths.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </datalist>

          <label className="ml-5 mr-5">Set comparison month B</label>
          <input
            type="month"
            list="monthsB"
            value={selectedMonthB}
            onChange={(e) => setSelectedMonthB(e.target.value)}
            className="text-base border border-gray-300 rounded-md"
            disabled={loading} // Disable input while loading
          />
          <datalist id="monthsB">
            {availableMonths.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </datalist>
        </div>

        <button
          type="submit"
          className="mt-5 bg-gray-700 hover:bg-black text-white px-4 py-2 rounded-md"
          disabled={loading} // Disable button while loading
        >
          {loading ? "Loading..." : "Compare"}{" "}
          {/* Change text based on loading */}
        </button>

        {loading && (
          <div className="mt-5 flex justify-center items-center">
            {/* Loading spinner */}
            <div className="w-8 h-8 border-4 border-gray-700 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 text-gray-700">Fetching data...</span>
          </div>
        )}
      </form>
    </div>
  );
};

export default FormMonthly;
