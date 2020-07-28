import Head from "next/head";
import _ from "lodash";
import Chart from "../components/chart";

export async function getStaticProps() {
  let res = await fetch(
    "https://health.data.ny.gov/resource/xdss-u53e.json?$$app_token=sTenN2LHaAJS8ubppnFpPBWID&county=Albany"
  );
  const albany = await res.json();

  res = await fetch(
    "https://health.data.ny.gov/resource/xdss-u53e.json?$$app_token=sTenN2LHaAJS8ubppnFpPBWID&county=Columbia"
  );
  const columbia = await res.json();

  res = await fetch(
    "https://health.data.ny.gov/resource/xdss-u53e.json?$$app_token=sTenN2LHaAJS8ubppnFpPBWID&county=Greene"
  );
  const greene = await res.json();

  res = await fetch(
    "https://health.data.ny.gov/resource/xdss-u53e.json?$$app_token=sTenN2LHaAJS8ubppnFpPBWID&county=Saratoga"
  );
  const saratoga = await res.json();

  res = await fetch(
    "https://health.data.ny.gov/resource/xdss-u53e.json?$$app_token=sTenN2LHaAJS8ubppnFpPBWID&county=Schenectady"
  );
  const schenectady = await res.json();

  res = await fetch(
    "https://health.data.ny.gov/resource/xdss-u53e.json?$$app_token=sTenN2LHaAJS8ubppnFpPBWID&county=Rensselaer"
  );
  const rensselaer = await res.json();

  res = await fetch(
    "https://health.data.ny.gov/resource/xdss-u53e.json?$$app_token=sTenN2LHaAJS8ubppnFpPBWID&county=Warren"
  );
  const warren = await res.json();

  res = await fetch(
    "https://health.data.ny.gov/resource/xdss-u53e.json?$$app_token=sTenN2LHaAJS8ubppnFpPBWID&county=Washington"
  );
  const washington = await res.json();

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
    },
    revalidate: 180,
  };
}

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

const generateCalculatedData = (county, countyName, days = 365) => {
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
    .takeRight(days)
    .value();
};

export default function Home({
  albany,
  columbia,
  greene,
  saratoga,
  schenectady,
  rensselaer,
  warren,
  washington,
}) {
  const albanyData = generateCalculatedData(albany, "albany");
  const columbiaData = generateCalculatedData(columbia, "columbia");
  const greeneData = generateCalculatedData(greene, "columbia");
  const saratogaData = generateCalculatedData(saratoga, "saratoga");
  const schenectadyData = generateCalculatedData(schenectady, "schenectady");
  const rensselaerData = generateCalculatedData(rensselaer, "rensselaer");
  const warrenData = generateCalculatedData(warren, "warren");
  const washingtonData = generateCalculatedData(washington, "washington");

  return (
    <div className="container">
      <Head>
        <title>Albany Covid Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="chart-col">
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
