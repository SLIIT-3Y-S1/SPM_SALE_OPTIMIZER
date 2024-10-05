"use client";

import { useEffect, useState } from "react";
import AddBtn from "@/componets/sale-components/AddBtn";
import { SaleList } from "@/componets/sale-components/SaleList";
import { fetchSales, Sale , searchByOrderID} from "@/lib/services/saleServices";
import { SearchBar } from "@/componets/sale-components/SearchBar";
import { CircularProgress } from "@mui/material";
import GenerateSaleReport from "@/componets/sale-components/GenerateReport";
import SalesChart from "@/componets/sale-components/SalesChart";
import IncomesCharts from "@/componets/sale-components/IncomesChart";

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

  const handleSearch = async (searchValue: string) => {
    const fetchSalesByID = await searchByOrderID(searchValue);
    setSales(fetchSalesByID ? fetchSalesByID: []);
   
  }
  return (
    <div className="w-full h-full ml-[300px] overflow-hidden pl-10 pt-10">
      <SearchBar onSearch={(searchValue) => handleSearch(searchValue)} />

      <div className="dev flex">
      <div className="add-btn mt-10 mr-[47%]">
        <AddBtn onSaveSuccess={handleSaveSuccess} />
      </div>
      <div className="report-btn mt-10">
        <GenerateSaleReport />
      </div>
      </div>

      {/* Show loading spinner while fetching data */}
      {loading ? (
        <div className="flex items-center justify-center h-[70vh]">
          <CircularProgress size={60} />
        </div>
      ) : (
        <>
        <SaleList sales={sales} onUpdateSuccess={handleUpdateSuccess} />
        <div className="container-chart flex mt-10">
        <div className="w-[45%] h-10">
        <SalesChart salesData={sales} />
        
        </div>
        .<div className="w-[25%] ">
        <IncomesCharts salesData={sales} />
        </div>
        </div>
        <div className="p-[50px]"></div>
        </>
      )
     
      }
    </div>
  );
};

export default SaleForecastHomePage;
