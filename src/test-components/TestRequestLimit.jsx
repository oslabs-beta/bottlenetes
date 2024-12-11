import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const TestRequestLimit = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: false,
        grid: { color: "transparent" },
        ticks: { 
          color: "#94a3b8",
          font: {
            size: 14,
          },
        },
      },
      y: {
        stacked: false,
        grid: { color: "transparent" },
        ticks: { 
          color: "#94a3b8",
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
          color: "#94a3b8",
          font: {
            size: 15,
          },
        },
      },
      title: {
        display: false,
        text: `Request Limit for Pod`,
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
        data: [15, 35, 75, 25, 37],
        backgroundColor: "rgba(191, 219, 254, 1)", //placeholder
        borderRadius: 10,
        maxBarThickness: 90,
      },
      {
        label: "Request Limit",
        data: [72, 100, 85, 100, 60],
        backgroundColor: "rgba(59, 130, 246, 1)",
        borderRadius: 10,
        maxBarThickness: 90,
      },
    ],
  };

  return (
    <div className="min-h-[400px] w-full p-4">
      <Bar options={options} data={data} />
    </div>
  );
};

export default TestRequestLimit;
