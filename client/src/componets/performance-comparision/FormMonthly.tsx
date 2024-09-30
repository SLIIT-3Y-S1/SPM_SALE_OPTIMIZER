import React, { useEffect, useState } from "react";
import { fetchAvailableMonths, fetchMonthlyComparison } from "@/lib/services/comparisonServices";

const FormMonthly = ({ onComparisonData }) => {
  const [availableMonths, setAvailableMonths] = useState<string[]>([]);
  const [selectedMonthA, setSelectedMonthA] = useState<string>("");
  const [selectedMonthB, setSelectedMonthB] = useState<string>("");

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
      alert("Please select two different months");
      return;
    }

    // Call the backend to fetch comparison data
    const data = await fetchMonthlyComparison(selectedMonthA, selectedMonthB);

    // Pass the data to parent component for rendering the charts
    onComparisonData(data);
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
        >
          Compare
        </button>
      </form>
    </div>
  );
};


export default FormMonthly;
