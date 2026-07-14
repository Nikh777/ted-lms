import React from "react"
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js"
import { Line } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const chartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Revenue",
      data: [0, 0, 0, 0, 0, 0],
      borderColor: "#FFD60A",
      backgroundColor: "rgba(255, 214, 10, 0.2)",
      tension: 0.35,
    },
  ],
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: "#F1F2FF",
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: "#999DAA",
      },
      grid: {
        color: "#2C333F",
      },
    },
    y: {
      ticks: {
        color: "#999DAA",
      },
      grid: {
        color: "#2C333F",
      },
    },
  },
}

const Charts = ({ title = "Analytics" }) => {
  return (
    <div className="rounded-lg border border-richblack-700 bg-richblack-800 p-5">
      <h2 className="text-lg font-semibold text-richblack-5">{title}</h2>
      <div className="mt-5 h-72">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  )
}

export default Charts
