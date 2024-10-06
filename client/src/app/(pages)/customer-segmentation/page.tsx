"use client";

import { useEffect, useState } from "react";
import { fetchCustomers, Customer, fetchOrderStatusCounts, OrderStatusCounts, fetchOrderValueRanges, OrderValueRanges, fetchPurchaseFrequency, PurchaseFrequency } from "@/lib/services/customerService"; 
import { CircularProgress } from "@mui/material"; 
import { CustomerList } from "@/componets/customer-components/CustomerList";
import AddCustomerBtn from "@/componets/customer-components/AddBtn";
import DeleteAllBtn from "@/componets/customer-components/DeleteAllBtn";

// Import Chart.js and the Bar/Doughnut chart component
import { Doughnut, Bar } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
import jsPDF from 'jspdf'; // Import jsPDF for PDF generation

// Register components for Chart.js
Chart.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const CustomerManagementHomePage = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [orderStatusCounts, setOrderStatusCounts] = useState<OrderStatusCounts | null>(null); 
  const [orderValueRanges, setOrderValueRanges] = useState<OrderValueRanges | null>(null); 
  const [purchaseFrequency, setPurchaseFrequency] = useState<PurchaseFrequency | null>(null); 

  const loadCustomers = async () => {
    setLoading(true);
    try {
      const fetchedCustomers = await fetchCustomers();
      setCustomers(fetchedCustomers);
    } catch (error) {
      console.error("Failed to fetch customers", error);
    } finally {
      setLoading(false);
    }
  };

  const loadOrderStatusCounts = async () => {
    try {
      const counts = await fetchOrderStatusCounts();
      setOrderStatusCounts(counts);
    } catch (error) {
      console.error("Failed to fetch order status counts", error);
    }
  };

  const loadOrderValueRanges = async () => {
    try {
      const ranges = await fetchOrderValueRanges();
      setOrderValueRanges(ranges);
    } catch (error) {
      console.error("Failed to fetch order value ranges", error);
    }
  };

  const loadPurchaseFrequency = async () => {
    try {
      const frequency = await fetchPurchaseFrequency();
      setPurchaseFrequency(frequency);
    } catch (error) {
      console.error("Failed to fetch purchase frequency", error);
    }
  };

  useEffect(() => {
    loadCustomers();
    loadOrderStatusCounts();
    loadOrderValueRanges();
    loadPurchaseFrequency();
  }, []);

  const handleSaveSuccess = () => {
    loadCustomers();
  };

  const handleUpdateSuccess = () => {
    loadCustomers();
  };

  const generateReport = () => {
    const doc = new jsPDF();
  
// Set up the report content with HTML
// Set up the report content with HTML
const reportContent = `
  <div style="font-family: Arial, sans-serif; margin: 20px; text-align: left;">
    <h2 style="color: #4CAF50; font-size: 28px; margin-bottom: 15px;">Customer Report</h2>
    <hr>
    <h3 style="color: #333; font-size: 22px; margin-bottom: 10px;">Order Status Counts</h3>
    <table style="margin: 0 auto; border-collapse: collapse; width: 60%;">
      <tr style="background-color: #f2f2f2;">
        <th style="border: 1px solid #ddd; padding: 8px;">Status</th>
        <th style="border: 1px solid #ddd; padding: 8px;">Count</th>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px;">Completed</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${orderStatusCounts?.completed || 0}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px;">Pending</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${orderStatusCounts?.pending || 0}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px;">Returned</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${orderStatusCounts?.returned || 0}</td>
      </tr>
    </table>
    
    <hr style="border: 1px solid #ccc; margin: 10px 0;">

    <h3 style="color: #333; font-size: 22px; margin-bottom: 10px;">Order Value Ranges</h3>
    <table style="margin: 20px auto; border-collapse: collapse; width: 60%;">
      <tr style="background-color: #f2f2f2;">
        <th style="border: 1px solid #ddd; padding: 8px;">Value Range</th>
        <th style="border: 1px solid #ddd; padding: 8px;">Count</th>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px;">Below 5k</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${orderValueRanges?.below5000 || 0}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px;">5001-10k</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${orderValueRanges?.range5000_10000 || 0}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px;">10001-20k</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${orderValueRanges?.range10001_20000 || 0}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px;">20001-50k</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${orderValueRanges?.range20001_50000 || 0}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px;">Above 50k</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${orderValueRanges?.above50000 || 0}</td>
      </tr>
    </table>
    
    <hr style="border: 1px solid #ccc; margin: 10px 0;">

    <h3 style="color: #333; font-size: 22px; margin-bottom: 10px;">Purchase Frequency</h3>
    <table style="margin: 20px auto; border-collapse: collapse; width: 60%;">
      <tr style="background-color: #f2f2f2;">
        <th style="border: 1px solid #ddd; padding: 8px;">Frequency Range</th>
        <th style="border: 1px solid #ddd; padding: 8px;">Count</th>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px;">1-5</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${purchaseFrequency?.["1-5"] || 0}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px;">6-10</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${purchaseFrequency?.["6-10"] || 0}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px;">11-15</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${purchaseFrequency?.["11-15"] || 0}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px;">16-20</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${purchaseFrequency?.["16-20"] || 0}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px;">More than 20</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${purchaseFrequency?.["more than 20"] || 0}</td>
      </tr>
    </table>
  </div>
`;

    // Add the HTML content to the PDF
    doc.html(reportContent, {
      callback: function (doc) {
        // Save the PDF after the HTML has been rendered
        doc.save("customer_report.pdf");
      },
      x: 10,
      y: 10,
      width: 190, // Maximum width of the content
      windowWidth: 800 // The width of the window (optional)
    });
  };
  

  const pieChartData = {
    labels: ["Completed", "Pending", "Returned"],
    datasets: [
      {
        label: "Customer Segments",
        data: [
          orderStatusCounts?.completed || 0,
          orderStatusCounts?.pending || 0,
          orderStatusCounts?.returned || 0,
        ],
        backgroundColor: ["rgb(54, 162, 235)", "rgb(255, 205, 86)", "rgb(255, 99, 132)"],
        hoverOffset: 4,
      },
    ],
  };

  const barChartData1 = {
    labels: ["1-5", "6-10", "11-15", "16-20", "more than 20"],
    datasets: [
      {
        label: "No. of Customers",
        data: purchaseFrequency ? [
          purchaseFrequency["1-5"],
          purchaseFrequency["6-10"],
          purchaseFrequency["11-15"],
          purchaseFrequency["16-20"],
          purchaseFrequency["more than 20"],
        ] : [0, 0, 0, 0, 0],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 1,
      },
    ],
  };

  const barChartData3 = {
    labels: ["below 5k", "5001-10k", "10001-20k", "20001-50k", "above 50k"],
    datasets: [
      {
        label: "No. of Customers",
        data: orderValueRanges ? [
          orderValueRanges.below5000,
          orderValueRanges.range5000_10000,
          orderValueRanges.range10001_20000,
          orderValueRanges.range20001_50000,
          orderValueRanges.above50000,
        ] : [0, 0, 0, 0, 0],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full h-full ml-[300px] overflow-hidden pl-10 pt-10">
      <h2 className="text-3xl font-bold mb-4">Customer Segmentation</h2>
      <div className="flex space-x-4 mt-10 mb-5">
        <div className="add-btn">
          <AddCustomerBtn onSaveSuccess={handleSaveSuccess} />
        </div>

        <div className="add-btn">
          <DeleteAllBtn onDeleteSuccess={handleSaveSuccess} />
        </div>

        <div className="ml-auto">
          <button onClick={generateReport} className="py-3 px-10 bg-green-600 text-white rounded-lg">
            Generate Report
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-[70vh]">
          <CircularProgress size={60} />
        </div>
      ) : (
        <>
          <CustomerList customers={customers} onUpdateSuccess={handleUpdateSuccess} />

          <div className="mt-10 flex">
            <div style={{ width: "45%", height: "300px" }}>
              <p className="text-center mt-2 text-gray-600">Frequency of Purchases</p>
              <Bar 
                data={barChartData1}
                options={{
                  maintainAspectRatio: false,
                }} 
              />
            </div>
          </div>

          <div className="mt-10 flex">
            <div style={{ width: "45%", height: "300px" }}>
              <p className="text-center mt-2 text-gray-600">Customer Orders Success Rate%</p>
              <Doughnut 
                data={pieChartData}
                options={{
                  maintainAspectRatio: false,
                }} 
              />
            </div>
          </div>

           {/* Fourth row: Third Bar Chart */}
           <div className="mt-10 mb-10 flex">
            <div style={{ width: "45%", height: "300px" }}>
              <p className="text-center mt-2 text-gray-600">Average Spending of the Customers</p>
              <Bar 
                data={barChartData3}
                options={{
                  maintainAspectRatio: false,
                }} 
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomerManagementHomePage;
