// Comparision Engine Services (functions)

export const fetchAvailableDates = async () => {
  // Fetch available order dates from the backend API
  try {
    const response = await fetch(
      "http://localhost:5500/api/v1/special-function/daily-dates"
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error("Failed to fetch sales data");
    }
    return data;
  } catch (error) {
    console.error("Error fetching sales:", error);
    return [];
  }
};


// Fetch available order months (YYYY-MM) from the backend API
export const fetchAvailableMonths = async () => {
  try {
    const response = await fetch(
      "http://localhost:5500/api/v1/special-function/monthly-dates"
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error("Failed to fetch order months");
    }
    return data;
  } catch (error) {
    console.error("Error fetching order months:", error);
    return [];
  }
};


  // comparisonServices.ts
  export const fetchDailyComparison = async (dateA, dateB) => {
    console.log(dateA,dateB)
    try {
      const response = await fetch("http://localhost:5500/api/v1/special-function/compare-daily", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dateA, dateB }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch comparison data");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching comparison data:", error);
      return null;
    }
  };


  export const fetchMonthlyComparison = async (monthA: string, monthB: string) => {
    try {
      const response = await fetch('http://localhost:5500/api/v1/special-function/compare-monthly', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ monthA, monthB }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch comparison data');
      }
  
      const data = await response.json();
      return data; // Handle the comparison data
    } catch (error) {
      console.error('Error fetching monthly comparison:', error);
      return null;
    }
  };
  