import Head from "next/head";
import _ from "lodash";
import moment from "moment-timezone";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { useState } from "react";
import Chart from "../components/chart";
import Page from "../components/page";
import { generateCalculatedData, regionalize } from "../lib/data";

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

  // const albany = generateCalculatedData(albanyReq, "albany");
  // const columbia = generateCalculatedData(columbiaReq, "columbia");
  // const greene = generateCalculatedData(greeneReq, "greene");
  // const saratoga = generateCalculatedData(saratogaReq, "saratoga");
  // const schenectady = generateCalculatedData(schenectadyReq, "schenectady");
  // const rensselaer = generateCalculatedData(rensselaerReq, "rensselaer");
  // const warren = generateCalculatedData(warrenReq, "warren");
  // const washington = generateCalculatedData(washingtonReq, "washington");

  const capitalRegionData = regionalize(
    albanyReq,
    columbiaReq,
    greeneReq,
    saratogaReq,
    schenectadyReq,
    rensselaerReq,
    warrenReq,
    washingtonReq
  );

  const capitalRegion = generateCalculatedData(capitalRegionData, "cap_region");

  return {
    props: {
      capitalRegion,
      timeString,
    },
    revalidate: 180,
  };
}

export default function Region({ capitalRegion, timeString }) {
  const [timeframe, setTimeframe] = useState("30");

  const capitalRegionData = _.takeRight(capitalRegion, timeframe);

  const handleTimeframeChange = (evt) => {
    setTimeframe(evt.target.value);
  };

  return (
    <Page>
      <Head>
        <title>Albany Covid Project - Capital Region</title>
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
          <Chart data={capitalRegionData} name="Capital Region" />
        </div>
      </div>
    </Page>
  );
}
