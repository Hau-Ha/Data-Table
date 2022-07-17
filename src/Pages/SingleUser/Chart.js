import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  ReferenceLine,
} from "recharts";

export const Chart = ({ data }) => {
  return (
    <div>
      <ResponsiveContainer width="90%" height={300}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <XAxis dataKey="timestamp" />
          <YAxis unit="&#37;" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <ReferenceLine x="Page C" stroke="green" label="Min PAGE" />
          <ReferenceLine
            y={4000}
            label="Max"
            stroke="red"
            strokeDasharray="3 3"
          />
          <Area
            type="monotone"
            dataKey="stateOfCharge"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
