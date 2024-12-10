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

const TestLatency = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
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
        backgroundColor: "rgba(102, 255, 141, 0.7)", //placeholder
        borderRadius: 10,
      },
      {
        label: "Request Limit",
        data: [72, 100, 85, 100, 60],
        backgroundColor: "rgba(255, 104, 112, 0.7)",
        borderRadius: 20,
      },
    ],
  };

  return (
    <div className="min-h-[400px] w-full rounded bg-slate-800 p-4">
      <Bar options={options} data={data} />
    </div>
  );
};

export default TestLatency;
