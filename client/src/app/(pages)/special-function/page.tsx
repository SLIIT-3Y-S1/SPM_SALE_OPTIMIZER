"use client";

import { useState } from "react";
import FormDaily from "@/componets/performance-comparision/formDaily";
import FormMonthly from "@/componets/performance-comparision/FormMonthly";

const SpecialFunctionHomePage = () => {
  const [timeMetric, setTimeMetric] = useState("");

  return (
    <div>
      <h5 className=" text-2xl font-semibold">
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

      </div>
    </div>
  );
};

export default SpecialFunctionHomePage;
