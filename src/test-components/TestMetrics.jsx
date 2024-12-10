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
import { data } from 'autoprefixer';

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

const TestMetrics = () => {
    const options = {
        responsive: true,
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
            display: true,
            text: `Metrics`,
            color: "rgba(228, 228, 231, 0.8)",
            font: {
              size: 20,
            },
          },
        },
        color: "rgba(228, 228, 231, 0.8)",
    };

    const data = {
        // basic stuff mostly taken from chartjs docs, I think it will need to be changed
        labels: ["Pod1", "Pod2", "Pod3", "Pod4", "Pod5"],
        datasets: [
          {
            label: "Request Rate",
            data: [15, 35, 75, 25, 37],
            backgroundColor: "rgba(102, 255, 141, 0.7)", //placeholder
          },
          {
            label: "Request Limit",
            data: [72, 100, 85, 100, 60],
            backgroundColor: "rgba(255, 104, 112, 0.7)",
          },
        ],
      };

    return (
        <div className="min-h-[400px] w-full rounded bg-slate-800 p-4">
          <Line options={options} data={data}/>
        </div>
      );
}

export default TestMetrics;