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
}) {
  const albanyData = _.chain(albany)
    .map((results) => {
      return {
        ...results,
        positive_rate: results.new_positives / results.total_number_of_tests,
        positive_rate_percentage: (
          (results.new_positives / results.total_number_of_tests) *
          100
        ).toFixed(2),
      };
    })
    .sortBy(["test_date"])
    // .takeRight(30)
    .value();

  const columbiaData = _.chain(columbia)
    .map((results) => {
      return {
        ...results,
        positive_rate: results.new_positives / results.total_number_of_tests,
        positive_rate_percentage: (
          (results.new_positives / results.total_number_of_tests) *
          100
        ).toFixed(2),
      };
    })
    .sortBy(["test_date"])
    // .takeRight(30)
    .value();

  const greeneData = _.chain(greene)
    .map((results) => {
      return {
        ...results,
        positive_rate: results.new_positives / results.total_number_of_tests,
        positive_rate_percentage: (
          (results.new_positives / results.total_number_of_tests) *
          100
        ).toFixed(2),
      };
    })
    .sortBy(["test_date"])
    // .takeRight(30)
    .value();

  const saratogaData = _.chain(saratoga)
    .map((results) => {
      return {
        ...results,
        positive_rate: results.new_positives / results.total_number_of_tests,
        positive_rate_percentage: (
          (results.new_positives / results.total_number_of_tests) *
          100
        ).toFixed(2),
      };
    })
    .sortBy(["test_date"])
    // .takeRight(30)
    .value();

  const schenectadyData = _.chain(schenectady)
    .map((results) => {
      return {
        ...results,
        positive_rate: results.new_positives / results.total_number_of_tests,
        positive_rate_percentage: (
          (results.new_positives / results.total_number_of_tests) *
          100
        ).toFixed(2),
      };
    })
    .sortBy(["test_date"])
    // .takeRight(30)
    .value();

  const rensselaerData = _.chain(rensselaer)
    .map((results) => {
      return {
        ...results,
        positive_rate: results.new_positives / results.total_number_of_tests,
        positive_rate_percentage: (
          (results.new_positives / results.total_number_of_tests) *
          100
        ).toFixed(2),
      };
    })
    .sortBy(["test_date"])
    // .takeRight(30)
    .value();

  const warrenData = _.chain(warren)
    .map((results) => {
      return {
        ...results,
        positive_rate: results.new_positives / results.total_number_of_tests,
        positive_rate_percentage: (
          (results.new_positives / results.total_number_of_tests) *
          100
        ).toFixed(2),
      };
    })
    .sortBy(["test_date"])
    // .takeRight(30)
    .value();

  const washingtonData = _.chain(washington)
    .map((results) => {
      return {
        ...results,
        positive_rate: results.new_positives / results.total_number_of_tests,
        positive_rate_percentage: (
          (results.new_positives / results.total_number_of_tests) *
          100
        ).toFixed(2),
      };
    })
    .sortBy(["test_date"])
    // .takeRight(30)
    .value();

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
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
