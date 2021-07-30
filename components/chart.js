import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import moment from "moment-timezone";

import _ from "lodash";

import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { useState } from "react";

export default function Chart({ data, name }) {
  const [average, setAverage] = useState("7day");
  const [chartSource, setChartSource] = useState({
    positiveRate: {
      dataKey: "positive_rate_percentage_7_day_avg",
      name: "Positive Rate Percentage 7 Day Avg",
    },
    casesPer100k: {
      dataKey: "cases_per_100k_7_day_avg",
      name: "Cases per 100k 7 Day Avg",
    },
  });

  const currentDay = data[data.length - 1];
  const current100k7Day = currentDay.cases_per_100k_7_day_avg;
  const cdc7Day = (current100k7Day * 7).toFixed(2);
  let cdc7DayStyle = {};
  if(cdc7Day >= 50.0) {
    cdc7DayStyle = { color: 'red', fontWeight: 'bold' };
  }

  const per100k = Math.ceil(
    _.max(
      _.map(data, (item) => parseFloat(item[chartSource.casesPer100k.dataKey]))
    )
  );

  const per100kLimit = per100k + Math.ceil(per100k * 0.34);

  const handleAverageChange = (evt) => {
    setAverage(evt.target.value);
    let postfixData = "";
    let postfixName = "";

    switch (evt.target.value) {
      case "7day":
        postfixData = "_7_day_avg";
        postfixName = " 7 Day Avg";
        break;
      case "14day":
        postfixData = "_14_day_avg";
        postfixName = " 14 Day Avg";
        break;
      default:
        postfixData = "";
        postfixName = "";
        break;
    }

    setChartSource({
      positiveRate: {
        dataKey: `positive_rate_percentage${postfixData}`,
        name: `Positive Rate Percentage${postfixName}`,
      },
      casesPer100k: {
        dataKey: `cases_per_100k${postfixData}`,
        name: `Cases per 100k${postfixName}`,
      },
    });
  };

  return (
    <div className="grid grid-cols-1 justify-center mt-10">
      <span className="text-center" style={cdc7DayStyle}>{name}</span>
      <span className="text-center" style={cdc7DayStyle}>Current CDC 7 Day Cases per 100k: {cdc7Day}</span>
      <div className="grid grid-cols-1 justify-center">
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="average"
            name="average"
            value={average}
            onChange={handleAverageChange}
            row
            className="justify-center items-center align-middle"
          >
            <FormControlLabel
              value="none"
              control={<Radio color="primary" />}
              label="No Avg"
            />
            <FormControlLabel
              value="7day"
              control={<Radio color="primary" />}
              label="7 Day Avg"
            />
            <FormControlLabel
              value="14day"
              control={<Radio color="primary" />}
              label="14 Day Avg"
            />
          </RadioGroup>
        </FormControl>
      </div>

      <div className="">
        <ResponsiveContainer width="100%" height="100%" minHeight={300}>
          <ComposedChart
            width={350}
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
            <XAxis dataKey="test_date" label="Date" tick={false} />
            <YAxis yAxisId="left" />
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[0, per100kLimit]}
            />
            <Tooltip
              labelFormatter={(date) => {
                return moment(date).tz("America/New_York").format("MM-DD-YYYY");
              }}
            />
            <Legend />
            <Bar
              stackId="a"
              name="New Positives"
              dataKey="new_positives"
              fill="#8884d8"
              label={false}
              yAxisId="left"
            />
            <Bar
              stackId="a"
              name="Total Number of Tests"
              dataKey="total_number_of_tests"
              fill="#82ca9d"
              label={false}
              yAxisId="left"
            />
            <Line
              type="monotone"
              name={chartSource.positiveRate.name}
              dataKey={chartSource.positiveRate.dataKey}
              stroke="#ff7300"
              yAxisId="right"
              dot={false}
            />
            <Line
              type="monotone"
              name={chartSource.casesPer100k.name}
              dataKey={chartSource.casesPer100k.dataKey}
              stroke="green"
              yAxisId="right"
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
