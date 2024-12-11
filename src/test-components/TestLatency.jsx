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
        grid: { color: "transparent" },
        ticks: { 
          color: "#1e293b",
          font: {
            size: 14,
          },
        },
      },
      y: {
        stacked: false,
        grid: { color: "transparent" },
        ticks: { 
          color: "#1e293b",
          font: {
            size: 14,
          },
        },
      },
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#1e293b",
          font: {
            size: 15,
          },
        },
      },
      title: {
        display: false,
        text: `Metrics`,
        color: "rgba(228, 228, 231, 0.8)",
        font: {
          size: 20,
        },
      },
      tooltip: {
        padding: 16,
        bodyFont: {
            size: 16, 
            color: "#cbd5e1",
        },
        titleFont: {
            size: 16,
            color: "#cbd5e1",
        },
        backgroundColor: "#020617",
        caretSize: 10, 
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
        backgroundColor: "#818cf8", //placeholder
        borderColor: "#818cf8",
      },
      {
        label: "Request Limit",
        data: [72, 100, 40, 20, 60],
        backgroundColor: "rgba(59, 130, 246, 1)",
        borderColor: "rgba(59, 130, 246, 1)",
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
