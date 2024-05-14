// ABC.js
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import styles from "./styles.module.css"; // Import the CSS module

const ABC = ({ data }) => {
  const maxSales = Math.max(...data.map((item) => item.value));
  const maxProfit = Math.max(...data.map((item) => item.profit));
  const maxYValue = Math.max(maxSales, maxProfit);
  const yAxisDomain = [0, maxYValue + maxYValue * 0.1];

  return (
    <div className={styles.chartContainer}>
      <h2 style={{ color: "#333", marginBottom: 20 }}>Monthly Performance</h2>
      <LineChart
        width={1000}
        height={400}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" tick={{ fill: "#333" }} />
        <YAxis
          tick={{ fill: "#333" }}
          label={{
            value: "Sales",
            angle: -90,
            position: "insideLeft",
            fill: "#333",
          }}
          domain={yAxisDomain}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            border: "none",
            backdropFilter: "blur(8px)",
          }}
          wrapperStyle={{ pointerEvents: "none" }}
          itemStyle={{ color: "#333" }}
          labelStyle={{ fontWeight: "bold", color: "#333" }}
          cursor={{ stroke: "#2196f3", strokeWidth: 1 }}
          coordinate={{ x: 100, y: 100 }}
          position={{ y: 0 }}
          formatter={(value, name, props) => [
            "Profit (LKR): " + props.payload.profit,
            "Sales: " + value,
          ]}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#2196f3"
          strokeWidth={2}
          dot={{ fill: "#2196f3" }}
        />
        <Line
          type="monotone"
          dataKey="profit"
          stroke="#4caf50"
          strokeWidth={2}
          dot={{ fill: "#4caf50" }}
        />
      </LineChart>
    </div>
  );
};

export default ABC;
