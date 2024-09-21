import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, Legend, Title, Tooltip } from "chart.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: "label",
  datasets: [
    {
      label: "Dummy",
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ],
};

const config = {
  type: "line",
  data: data,
};

const SalesOverTimeChart = () => {
  return (
 
      <Line options={config} data={data} />

  );
};

export default SalesOverTimeChart;
