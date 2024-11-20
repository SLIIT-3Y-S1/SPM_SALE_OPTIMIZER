import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, Legend, Title, Tooltip } from 'chart.js';
import { CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SalesOverTimeChart = ({ chartData, label, isMonthly }) => {

  // If monthly, map labels to days of the month
  const labels = isMonthly
    ? chartData.map((entry) => `Day ${entry.day}`)  // For monthly data, assume "entry.day" is available
    : chartData.map((entry) => `${entry.hour}:00`); // For daily data, use hours

  const data = {
    labels: labels,
    datasets: [
      {
        label: label,
        data: chartData.map((entry) => entry.income),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const config = {
    type: 'line',
    data: data,
  };

  return <Line options={config} data={data} />;
};

export default SalesOverTimeChart;
