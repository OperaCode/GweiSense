import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


const Chart = ({history}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center text-cyan-400">
        Gas Price History
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={history}>
          <XAxis dataKey="time" stroke="#a5f3fc" />
          <YAxis domain={["auto", "auto"]} unit=" gwei" stroke="#a5f3fc" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="gasPrice"
            stroke="#22d3ee"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
