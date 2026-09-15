import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

/* BAR DATA */
const data = [
  { name: "Computer Science", value: 95 },
  { name: "Nursing", value: 85 },
  { name: "Engineering", value: 80 },
  { name: "Business", value: 75 },
  { name: "Pharmacy", value: 70 },
  { name: "Graphic Design", value: 65 },
  { name: "Education", value: 60 },
  { name: "Law", value: 55 },
];

/* PIE DATA */
const pieData = [
  { name: "Technology", value: 30 },
  { name: "Healthcare", value: 25 },
  { name: "Business", value: 20 },
  { name: "Engineering", value: 15 },
  { name: "Arts", value: 10 },
];

/* COLORS */
const COLORS = ["#6c63ff", "#8e44ad", "#a18cd1", "#c3aed6", "#dcd6f7"];

export default function Charts() {
  return (
    <div className="charts">
      
      {/* BAR CHART */}
      <div className="chart-box">
        <h3>Most In-Demand Majors in Lebanon</h3>

        <BarChart width={450} height={280} data={data}>
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip />

          <Bar
            dataKey="value"
            fill="#6c63ff"
            radius={[8, 8, 0, 0]} // rounded top
          />
        </BarChart>
      </div>

      {/* PIE / DONUT CHART */}
      <div className="chart-box">
        <h3>Job Market by Field</h3>

        <PieChart width={350} height={280}>
          <Pie
            data={pieData}
            dataKey="value"
            innerRadius={60}   // 👈 makes it donut
            outerRadius={100}
            paddingAngle={5}
          >
            {pieData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend verticalAlign="bottom" />
        </PieChart>
      </div>

    </div>
  );
}