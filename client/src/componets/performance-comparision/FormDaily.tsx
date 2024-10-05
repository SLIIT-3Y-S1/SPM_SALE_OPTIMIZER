import {
  fetchAvailableDates,
  fetchDailyComparison,
} from "@/lib/services/comparisonServices";
import React, { useEffect, useState } from "react";

const FormDaily = ({ onComparisonData }) => {
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [dateA, setDateA] = useState("");
  const [dateB, setDateB] = useState("");
  const [loading, setLoading] = useState(false); // New loading state

  // Load available dates
  const loadDates = async () => {
    const dates = await fetchAvailableDates();
    setAvailableDates(dates);
  };

  // On page load
  useEffect(() => {
    loadDates();
  }, []);

  // Submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!dateA || !dateB) {
      alert("Please select both dates.");
      return;
    }
    if (dateA === dateB) {
      alert("Please select two different dates.");
      return;
    }

    // Set loading to true when form is submitted
    setLoading(true);

    try {
      // Call the backend to fetch comparison data
      const data = await fetchDailyComparison(dateA, dateB);

      // Pass the data to parent component for rendering the charts
      onComparisonData(data);
    } catch (error) {
      console.error("Error fetching comparison data:", error);
    } finally {
      // Set loading to false after fetching data
      setLoading(false);
    }
  };

  return (
    <div>
      <form className="mt-5" onSubmit={handleSubmit}>
        <div>
          <label className="mr-5">Set comparision date A</label>
          <input
            type="date"
            list="datesA"
            className="text-base border border-gray-300 rounded-md"
            value={dateA}
            onChange={(e) => setDateA(e.target.value)}
            disabled={loading} // Disable input while loading
          />

          <label className="ml-5 mr-5">Set comparision date B</label>
          <input
            type="date"
            list="datesA"
            className="text-base border border-gray-300 rounded-md"
            value={dateB}
            onChange={(e) => setDateB(e.target.value)}
            disabled={loading} // Disable input while loading
          />

          <datalist id="datesA">
            {availableDates.map((date) => (
              <option key={date} value={date}>
                {date}
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

export default FormDaily;
