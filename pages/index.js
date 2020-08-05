import Head from "next/head";
import _ from "lodash";
import moment from "moment-timezone";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { useState } from "react";
import Chart from "../components/chart";
import Page from "../components/page";
import { generateCalculatedData } from "../lib/data";

export async function getStaticProps() {
  let res = await fetch(
    "https://health.data.ny.gov/resource/xdss-u53e.json?$$app_token=sTenN2LHaAJS8ubppnFpPBWID&county=Albany"
  );
  const albanyReq = await res.json();

  res = await fetch(
    "https://health.data.ny.gov/resource/xdss-u53e.json?$$app_token=sTenN2LHaAJS8ubppnFpPBWID&county=Columbia"
  );
  const columbiaReq = await res.json();

  res = await fetch(
    "https://health.data.ny.gov/resource/xdss-u53e.json?$$app_token=sTenN2LHaAJS8ubppnFpPBWID&county=Greene"
  );
  const greeneReq = await res.json();

  res = await fetch(
    "https://health.data.ny.gov/resource/xdss-u53e.json?$$app_token=sTenN2LHaAJS8ubppnFpPBWID&county=Saratoga"
  );
  const saratogaReq = await res.json();

  res = await fetch(
    "https://health.data.ny.gov/resource/xdss-u53e.json?$$app_token=sTenN2LHaAJS8ubppnFpPBWID&county=Schenectady"
  );
  const schenectadyReq = await res.json();

  res = await fetch(
    "https://health.data.ny.gov/resource/xdss-u53e.json?$$app_token=sTenN2LHaAJS8ubppnFpPBWID&county=Rensselaer"
  );
  const rensselaerReq = await res.json();

  res = await fetch(
    "https://health.data.ny.gov/resource/xdss-u53e.json?$$app_token=sTenN2LHaAJS8ubppnFpPBWID&county=Warren"
  );
  const warrenReq = await res.json();

  res = await fetch(
    "https://health.data.ny.gov/resource/xdss-u53e.json?$$app_token=sTenN2LHaAJS8ubppnFpPBWID&county=Washington"
  );
  const washingtonReq = await res.json();

  const timeString = moment()
    .tz("America/New_York")
    .format("MM/DD/YYYY h:mma z");

  const albany = generateCalculatedData(albanyReq, "albany");
  const columbia = generateCalculatedData(columbiaReq, "columbia");
  const greene = generateCalculatedData(greeneReq, "greene");
  const saratoga = generateCalculatedData(saratogaReq, "saratoga");
  const schenectady = generateCalculatedData(schenectadyReq, "schenectady");
  const rensselaer = generateCalculatedData(rensselaerReq, "rensselaer");
  const warren = generateCalculatedData(warrenReq, "warren");
  const washington = generateCalculatedData(washingtonReq, "washington");

  return {
    props: {
      albany,
      columbia,
      greene,
      saratoga,
      schenectady,
      rensselaer,
      warren,
      washington,
      timeString,
    },
    revalidate: 180,
  };
}

export default function Home({
  albany,
  columbia,
  greene,
  saratoga,
  schenectady,
  rensselaer,
  warren,
  washington,
  timeString,
}) {
  const [timeframe, setTimeframe] = useState("365");

  const albanyData = _.takeRight(albany, timeframe);
  const columbiaData = _.takeRight(columbia, timeframe);
  const greeneData = _.takeRight(greene, timeframe);
  const saratogaData = _.takeRight(saratoga, timeframe);
  const schenectadyData = _.takeRight(schenectady, timeframe);
  const rensselaerData = _.takeRight(rensselaer, timeframe);
  const warrenData = _.takeRight(warren, timeframe);
  const washingtonData = _.takeRight(washington, timeframe);

  const handleTimeframeChange = (evt) => {
    setTimeframe(evt.target.value);
  };

  return (
    <Page>
      <Head>
        <title>Albany Covid Project - Counties</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <div>
          <span className="main-title">Last updated {timeString}</span>
          <div className="flex justify-center items-center align-middle">
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="timeframe"
                name="timeframe"
                value={timeframe}
                onChange={handleTimeframeChange}
                row
                className="justify-center items-center align-middle"
              >
                <FormControlLabel
                  value="30"
                  control={<Radio color="primary" />}
                  label="30 Days"
                />
                <FormControlLabel
                  value="60"
                  control={<Radio color="primary" />}
                  label="60 Days"
                />
                <FormControlLabel
                  value="90"
                  control={<Radio color="primary" />}
                  label="90 Days"
                />
                <FormControlLabel
                  value="365"
                  control={<Radio color="primary" />}
                  label="All"
                />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
          <Chart data={albanyData} name="Albany County" />
          <Chart data={columbiaData} name="Columbia County" />
          <Chart data={greeneData} name="Greene County" />
          <Chart data={saratogaData} name="Saratoga County" />
          <Chart data={schenectadyData} name="Schenectady County" />
          <Chart data={rensselaerData} name="Rensselaer County" />
          <Chart data={warrenData} name="Warren County" />
          <Chart data={washingtonData} name="Washington County" />
        </div>
      </div>
    </Page>
  );
}
