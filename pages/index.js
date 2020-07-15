import Head from "next/head";
import _ from "lodash";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
} from "recharts";
// import data from "../data/covid-data.json";

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch(
    "https://health.data.ny.gov/resource/xdss-u53e.json?county=Albany"
  );
  const data = await res.json();

  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      data,
    },
  };
}

export default function Home({ data }) {
  const albanyData = _.chain(data)
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
    .filter({ county: "Albany" })
    .sortBy(["test_date"])
    // .takeRight(30)
    .value();
  console.log(albanyData);

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="chart-row">
          <div>
            <span className="chart-title">Albany County</span>
            <ComposedChart
              width={500}
              height={300}
              data={albanyData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="test_date" label={false} tick={false} />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" domain={[0, 25]} />
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
            </ComposedChart>
          </div>
          <div>
            <span className="chart-title">Albany County</span>
            <ComposedChart
              width={500}
              height={300}
              data={albanyData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="test_date" label={false} tick={false} />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" domain={[0, 25]} />
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
            </ComposedChart>
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

        .chart-title {
          flex: 1;
          display: flex;
          flex-direction: column;
          text-align: center;
          margin-bottom: 1rem;
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
