"use client";
import { LineChart, Line, CartesianGrid, YAxis } from "recharts";

const data = [
  { x: 1, y: 0.2 },
  { x: 2, y: 0.05 },
  { x: 3, y: 0.021 },
  { x: 4, y: 0.02 },
  { x: 5, y: 0.0 },
  { x: 6, y: 0.0 },
  { x: 7, y: 0.0 },
  { x: 8, y: 0.0 },
  { x: 9, y: 0.0 },
  { x: 10, y: 0.0 },
];

export function DistributionChart() {
  return (
    <LineChart
      width={250}
      height={128}
      data={data}
      margin={{ top: 16, right: 16, left: 16, bottom: 16 }}
    >
      <YAxis
        dataKey={"y"}
        width={30}
        tickMargin={8}
        includeHidden
        axisLine={false}
        tickLine={false}
        tickSize={2}
        fontSize={10}
        tickFormatter={(p) => {
          console.log("tick", p);
          return `${p * 100}%`;
        }}
        padding={{ top: 0, bottom: 0 }}
      />
      <CartesianGrid
        horizontalValues={[0.2, 0.15, 0.1, 0.05, 0.0]}
        vertical={false}
        strokeDasharray="4"
      />
      <Line
        dot={(p) => (p.index === 0 ? <circle {...p} fill="red" /> : <path />)}
        type="monotone"
        dataKey="y"
        stroke="red"
      />
    </LineChart>
  );
}
