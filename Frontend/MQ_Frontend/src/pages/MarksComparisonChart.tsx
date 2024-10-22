import React from "react";
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

// Register the required components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Define the props to receive data from the parent component
interface ChartProps {
  studentMarks: { [subject: string]: number };
  maxMarks: { [subject: string]: number };
}

const MarksComparisonChart: React.FC<ChartProps> = ({
  studentMarks,
  maxMarks,
}) => {
  const subjects = Object.keys(studentMarks);

  // Prepare the data for Chart.js
  const data = {
    labels: subjects, // X-axis labels
    datasets: [
      {
        label: "Student Marks",
        data: subjects.map((subject) => studentMarks[subject]),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Required Marks",
        data: subjects.map((subject) => maxMarks[subject]),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Comparison of Student Marks vs Required Marks",
      },
      scales: {
        y: {
          beginAtZero: true,
          min: 0, // Force the Y-axis to start at 0
          max: 100, // Fix the Y-axis maximum value at 100
          ticks: {
            stepSize: 10, // Define intervals between ticks
          },
        },
      },
    },
  };

  return (
    <div className="mt-6 h-1/2 w-full">
      <Bar data={data} options={options} />
    </div>
  );
};

export default MarksComparisonChart;
