import { fetchAvailableDates } from "@/lib/services/comparisonServices";
import React, { useEffect, useState } from "react";

const FormDaily = () => {
  const [availableDates, setAvailableDates] = useState<string[]>([]);

  //load dates
  const loadDates = async () => {
    const dates = await fetchAvailableDates();
    setAvailableDates(dates);
  };

  useEffect(() => {
    loadDates();
  }, []);

  return (
    <div>
      <form className="mt-5">
        <div>
          <label className="mr-5">Set comparision date A</label>
          <input
            type="date"
            list="datesA"
            className="text-base border border-gray-300 rounded-md"
          />

          <label className="ml-5 mr-5">Set comparision date B</label>
          <input
            type="date"
            list="datesA"
            className="text-base border border-gray-300 rounded-md"
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
