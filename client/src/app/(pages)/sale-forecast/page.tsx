"use client";

import { useEffect, useState } from "react";
import AddBtn from "@/componets/sale-components/AddBtn";
import { SaleList } from "@/componets/sale-components/SaleList";
import { fetchSales, Sale } from "@/lib/services/saleServices";
import { SearchBar } from "@/componets/sale-components/SearchBar";
import { CircularProgress } from "@mui/material"; // Use Material-UI spinner

const SaleForecastHomePage = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  const loadSales = async () => {
    setLoading(true); // Start loading
    try {
      const fetchedSales = await fetchSales();
      setSales(fetchedSales);
    } catch (error) {
      console.error("Failed to fetch sales", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    loadSales();
  }, []);

  const handleSaveSuccess = () => {
    loadSales(); // Refetch sales after a new sale is added
  };

  const handleUpdateSuccess = () => {
    loadSales(); // Refetch sales after a sale is updated
  };

  return (
    <div className="w-full h-full ml-[300px] overflow-hidden pl-10 pt-10">
      <SearchBar />

      <div className="add-btn mt-10">
        <AddBtn onSaveSuccess={handleSaveSuccess} />
      </div>

      {/* Show loading spinner while fetching data */}
      {loading ? (
        <div className="flex items-center justify-center h-[70vh]">
          <CircularProgress size={60} />
        </div>
      ) : (
        <SaleList sales={sales} onUpdateSuccess={handleUpdateSuccess} />
      )}
    </div>
  );
};

export default SaleForecastHomePage;
