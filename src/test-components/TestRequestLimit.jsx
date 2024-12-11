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
        stacked: true,
        ticks: { color: "#D8DEE9" },
      },
      y: {
        stacked: false,
        grid: { color: "#4C566A" },
        ticks: { color: "#D8DEE9" },
      },
    },
    plugins: {
      legend: {
        position: "bottom",
        font: { color: "#D8DEE9" },
      },
      title: {
        display: false,
        text: `Request Limit for Pod`,
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
        data: [15, 35, 75, 25, 37],
        backgroundColor: "rgba(191, 219, 254, 0.6)", //placeholder
        borderRadius: 0,
      },
      {
        label: "Request Limit",
        data: [72, 100, 85, 100, 60],
        backgroundColor: "rgba(59, 130, 246, 0.6)",
        borderRadius: 10,
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
