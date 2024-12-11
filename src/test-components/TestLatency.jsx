import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { data } from "autoprefixer";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
);

const TestLatency = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: false,
      },
      y: {
        stacked: false,
      },
    },
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: false,
        text: `Metrics`,
        color: "rgba(228, 228, 231, 0.8)",
        font: {
          size: 20,
        },
      },
    },
  };

  const data = {
    // basic stuff mostly taken from chartjs docs, I think it will need to be changed
    labels: ["Pod1", "Pod2", "Pod3", "Pod4", "Pod5"],
    datasets: [
      {
        label: "Request Rate",
        data: [27, 35, 60, 75, 37],
        backgroundColor: "#B48EAD", //placeholder
        borderColor: "#B48EAD",
      },
      {
        label: "Request Limit",
        data: [72, 100, 40, 20, 60],
        backgroundColor: "#81A1C1",
        borderColor: "#81A1C1",
      },
    ],
  };

  return (
    <div className="min-h-[400px] w-full rounded p-4">
      <Line options={options} data={data} />
    </div>
  );
};

export default TestLatency;
