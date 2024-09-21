"use client";

import { useState } from "react";
import FormDaily from "@/componets/performance-comparision/FormDaily";
import FormMonthly from "@/componets/performance-comparision/FormMonthly";
import SalesOverTimeChart from "@/componets/performance-comparision/SalesOverTimeChart";
import InsightsDisplay from "@/componets/performance-comparision/InsightsDisplay"; 

const SpecialFunctionHomePage = () => {
  const [timeMetric, setTimeMetric] = useState("") //store chosen time metric for form display

  return (
    <div className="h-full ml-[350px] mt-10 mr-5">
      <h5 className=" text-3xl font-semibold">
        Performance comparision engine
      </h5>
      <div className="mt-10 ml-5">
        <div className="font-medium text-xl p-10 rounded-xl bg-white text-gray-700 shadow-md">
          <label className=" font-medium text-xl"> Choose time metric </label>
          <select
            className=" text-base border border-gray-300 rounded-md"
            id="time-metric"
            onChange={(e) => setTimeMetric(e.target.value)}
          >
            <option selected>----</option>
            <option value={"daily"}>Daily</option>
            <option value={"monthly"}>Monthly</option>
          </select>
        

        {/* Conditionally render form inputs based on timeMetric */}
        {timeMetric === "daily" && <FormDaily />}
        {timeMetric === "monthly" && <FormMonthly />}
        </div>
        <div className="flex pt-10">
          <div className="container flex-col">
            <h1>Date 1</h1>
            <SalesOverTimeChart/>
            <h1>Total income generated</h1>
            <h1>Average Sales</h1>
          </div>
          <div className="p-5"></div>
          <div className="container flex-col">
            <h2>Date 2</h2>
            <SalesOverTimeChart/>
            <h1>Total income generated</h1>
            <h1>Average Sales</h1>
          </div>
        </div>
        <div className="mt-5">
          <InsightsDisplay/>
        </div>
      </div>
    </div>
  );
};

export default SpecialFunctionHomePage;
