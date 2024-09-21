"use client";

import { useState } from "react";
import FormDaily from "@/componets/performance-comparision/FormDaily";
import FormMonthly from "@/componets/performance-comparision/FormMonthly";
import SalesOverTimeChart from "@/componets/performance-comparision/SalesOverTimeChart";

const SpecialFunctionHomePage = () => {
  const [timeMetric, setTimeMetric] = useState("") //store chosen time metric for form display

  return (
    <div className="w-full h-full ml-[300px] overflow-hidden pl-10 pt-10">
      <h5 className=" text-3xl font-semibold">
        Performance comparision engine
      </h5>
      <div className="mt-10 ml-5">
        <div>
          <label> Choose time metric </label>
          <select
            className="border border-gray-300 text-sm rounded-md"
            id="time-metric"
            onChange={(e) => setTimeMetric(e.target.value)}
          >
            <option selected>----</option>
            <option value={"daily"}>Daily</option>
            <option value={"monthly"}>Monthly</option>
          </select>
        </div>

        {/* Conditionally render form inputs based on timeMetric */}
        {timeMetric === "daily" && <FormDaily />}
        {timeMetric === "monthly" && <FormMonthly />}

        <div className="container flex pt-10">
          <div className="container flex-col pr-20">
            <h1>Date 1</h1>
            <SalesOverTimeChart/>
            <h1>Total income generated</h1>
            <h1>Average Sales</h1>
          </div>
          <div className="container flex-col">
            <h2>Date 2</h2>
            <SalesOverTimeChart/>
            <h1>Total income generated</h1>
            <h1>Average Sales</h1>
          </div>
        </div>

        <div className="pt-10">
          <h4 className=" text-2xl font-semibold">AI insights</h4>
          <div className=" mt-5 "> Ai insights are generated here</div>
        </div>
      </div>
    </div>
  );
};

export default SpecialFunctionHomePage;
