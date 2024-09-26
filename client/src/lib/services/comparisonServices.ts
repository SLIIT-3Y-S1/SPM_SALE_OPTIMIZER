// Comparision Engine Services (functions)

export const fetchAvailableDates = async () => {
  // Fetch available order dates from the backend API
  try {
    const response = await fetch(
      "http://localhost:5500/api/v1/special-function/dates"
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
