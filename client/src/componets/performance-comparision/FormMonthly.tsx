import React, { useEffect, useState } from "react";
import { fetchAvailableMonths } from "@/lib/services/comparisonServices";

const FormMonthly = () => {
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

  return (
    <div>
    <form id="comparison-form" className="mt-5">
      <div>
        <label className="mr-5">Set comparison date A</label>
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

        <label className="ml-5 mr-5">Set comparison date B</label>
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
        type="button" // Changed to prevent submit behavior
        className="mt-5 bg-gray-700 hover:bg-black text-white px-4 py-2 rounded-md"
      >
        Compare
      </button>
    </form>
  </div>
  );
};

export default FormMonthly;
