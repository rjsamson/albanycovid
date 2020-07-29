import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import moment from "moment";

export default function Chart({ data }) {
  return (
    <ComposedChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="test_date"
        tickFormatter={(date) => moment(date).format("M/DD")}
      />
      <YAxis yAxisId="left" />
      <YAxis yAxisId="right" orientation="right" domain={[0, 50]} />
      <Tooltip />
      <Legend />
      <Bar
        stackId="a"
        dataKey="new_positives"
        fill="#8884d8"
        label={false}
        yAxisId="left"
      />
      <Bar
        stackId="a"
        dataKey="total_number_of_tests"
        fill="#82ca9d"
        label={false}
        yAxisId="left"
      />
      <Line
        type="monotone"
        dataKey="positive_rate_percentage"
        stroke="#ff7300"
        yAxisId="right"
        dot={false}
      />
      <Line
        type="monotone"
        dataKey="cases_per_100k"
        stroke="green"
        yAxisId="right"
        dot={false}
      />
    </ComposedChart>
  );
}
