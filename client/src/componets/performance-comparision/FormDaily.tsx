import { fetchAvailableDates } from "@/lib/services/comparisonServices";
import { fetchDailyComparison } from "@/lib/services/comparisonServices";
import React, { useEffect, useState } from "react";

const FormDaily = ({ onComparisonData }) => {
  const [availableDates, setAvailableDates] = useState<string[]>([]);

  const [dateA, setDateA] = useState("");
  const [dateB, setDateB] = useState("");

  //load dates
  const loadDates = async () => {
    const dates = await fetchAvailableDates();
    setAvailableDates(dates);
  };

  // on page load
  useEffect(() => {
    loadDates();
  }, []);

  // submit funciton
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!dateA || !dateB) {
      alert("Please select both dates.");
      return;
    }
    if (dateA == dateB) {
      alert("Please select two different dates");
      return;
    }

    // Call the backend to fetch comparison data
    const data = await fetchDailyComparison(dateA, dateB);

    // Pass the data to parent component for rendering the charts
    onComparisonData(data);
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
          />

          <label className="ml-5 mr-5">Set comparision date B</label>
          <input
            type="date"
            list="datesA"
            className="text-base border border-gray-300 rounded-md"
            value={dateB}
            onChange={(e) => setDateB(e.target.value)}
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
        >
          Compare
        </button>
      </form>
    </div>
  );
};

export default FormDaily;
