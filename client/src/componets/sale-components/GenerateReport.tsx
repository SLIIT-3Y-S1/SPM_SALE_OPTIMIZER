'use client'

import { useState } from "react";

// interface GenerateSaleReport {
//     onSaveSuccess: () => void; 
//   }
  
const GenerateSaleReport = () => {

    const GenerateReportFun = async () => {
      console.log('Generating Sale Report');
      
      try {
        // Fetch the PDF from the backend
        const response = await fetch('http://localhost:5500/api/v1/sale/generate-report', {
          method: 'GET',
        });
  
        if (!response.ok) {
          throw new Error('Failed to generate report');
        }
  
        // Convert the response into a blob (binary large object)
        const blob = await response.blob();
  
        // Create a link to download the PDF
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'sales-report.pdf'; // Filename for the downloaded file
        document.body.appendChild(a); // Append the link to the document
        a.click(); // Programmatically click the link to trigger the download
        a.remove(); // Remove the link after triggering the download
      } catch (error) {
        console.error('Error generating report:', error);
      }
    };
  
    return (
      <div>
        <button
          onClick={GenerateReportFun}
          className="py-3 px-10 bg-blue-500 text-white rounded-lg"
        >
          Generate Sale Report
        </button>
      </div>
    );
  };
  
  export default GenerateSaleReport;
  