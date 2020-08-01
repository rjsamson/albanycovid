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

const ALBANY_POP = 305506;
const COLUMBIA_POP = 59461;
const GREENE_POP = 47491;
const SARATOGA_POP = 229863;
const SCHENECTADY_POP = 155299;
const RENSSELAER_POP = 158714;
const WARREN_POP = 63944;
const WASHINGTON_POP = 61204;
const CAP_REGION_POP =
  ALBANY_POP +
  COLUMBIA_POP +
  GREENE_POP +
  SARATOGA_POP +
  SCHENECTADY_POP +
  RENSSELAER_POP +
  WARREN_POP +
  WASHINGTON_POP;

const populations = {
  albany: ALBANY_POP,
  columbia: COLUMBIA_POP,
  greene: GREENE_POP,
  saratoga: SARATOGA_POP,
  schenectady: SCHENECTADY_POP,
  rensselaer: RENSSELAER_POP,
  warren: WARREN_POP,
  washington: WASHINGTON_POP,
  cap_region: CAP_REGION_POP,
};

const generateCalculatedData = (county, countyName) => {
  return _.chain(county)
    .map((results) => {
      return {
        ...results,
        cases_per_100k: (
          results.new_positives /
          (populations[countyName] / 100000)
        ).toFixed(2),
        positive_rate: results.new_positives / results.total_number_of_tests,
        positive_rate_percentage: (
          (results.new_positives / results.total_number_of_tests) *
          100
        ).toFixed(2),
      };
    })
    .sortBy(["test_date"])
    .value();
};

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
    <div className="container">
      <Head>
        <title>Albany Covid Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="chart-col">
          <span className="main-title">Last updated {timeString}</span>
          <div className="radios">
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="timeframe"
                name="timeframe"
                value={timeframe}
                onChange={handleTimeframeChange}
                row
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
          <div>
            <span className="chart-title">Albany County</span>
            <Chart data={albanyData} />
          </div>
          <div>
            <span className="chart-title">Columbia County</span>
            <Chart data={columbiaData} />
          </div>
          <div>
            <span className="chart-title">Green County</span>
            <Chart data={greeneData} />
          </div>
          <div>
            <span className="chart-title">Saratoga County</span>
            <Chart data={saratogaData} />
          </div>
          <div>
            <span className="chart-title">Schenectady County</span>
            <Chart data={schenectadyData} />
          </div>
          <div>
            <span className="chart-title">Rensselaer County</span>
            <Chart data={rensselaerData} />
          </div>
          <div>
            <span className="chart-title">Warren County</span>
            <Chart data={warrenData} />
          </div>
          <div>
            <span className="chart-title">Washington County</span>
            <Chart data={washingtonData} />
          </div>
        </div>
      </main>

      <footer>
        <span>© Capital Region Covid Project</span>
        <a
          href="https://forward.ny.gov/percentage-positive-results-region-dashboard"
          target="_blank"
          rel="noopener noreferrer"
        ></a>
      </footer>

      <style jsx>{`
        .main-title {
          flex: 1;
          display: flex;
          flex-direction: column;
          text-align: center;
          margin-bottom: 1rem;
          margin-top: 3rem;
        }
        .radios {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .chart-row {
          flex: 1;
          display: flex;
          flex-direction: row;
        }

        .chart-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          margin-left: 4rem;
        }

        .chart-title {
          flex: 1;
          display: flex;
          flex-direction: column;
          text-align: center;
          margin-bottom: 1rem;
          margin-top: 3rem;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
