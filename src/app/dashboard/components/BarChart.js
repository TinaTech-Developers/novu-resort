"use client";
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart() {
  const [chartData, setChartData] = useState({
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData({
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Sales (R)",
          data: [18127, 22201, 19490, 17938, 24182, 17842, 22475],
          backgroundColor: [
            "rgba(6, 64, 43, 0.9)",
            "rgba(6, 64, 43, 0.7)",
            "rgba(6, 64, 43, 0.5)",
            "rgba(6, 64, 43, 0.4)",
            "rgba(6, 64, 43, 0.7)",
            "rgba(6, 64, 43, 0.9)",
            "rgba(6, 64, 43, 0.6)",
          ],
          borderSkipped: false,
          borderWidth: 2,
          borderColor: "#06402B",
          hoverBackgroundColor: "rgba(6, 64, 43, 1)",
        },
      ],
    });

    setChartOptions({
      plugins: {
        legend: {
          display: true,
          position: "top",
          labels: {
            color: "#06402B",
            font: { size: 14, weight: "bold" },
          },
        },
        title: {
          display: true,
          text: "Weekly Revenue Overview",
          color: "#06402B",
          font: { size: 18, weight: "bold" },
        },
      },
      scales: {
        x: {
          ticks: { color: "#06402B", font: { weight: "600" } },
          grid: { color: "rgba(6, 64, 43, 0.1)" },
        },
        y: {
          ticks: { color: "#06402B" },
          grid: { color: "rgba(6, 64, 43, 0.05)" },
        },
      },
      maintainAspectRatio: false,
      responsive: true,
    });
  }, []);

  return (
    <div className="w-full md:col-span-2 relative h-[60vh] m-auto p-6 border border-green-200 rounded-2xl bg-gradient-to-br from-[#E8F5E9] to-[#F9FAF5] shadow-lg">
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}
