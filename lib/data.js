import _ from "lodash";

export const ALBANY_POP = 305506;
export const COLUMBIA_POP = 59461;
export const GREENE_POP = 47491;
export const SARATOGA_POP = 229863;
export const SCHENECTADY_POP = 155299;
export const RENSSELAER_POP = 158714;
export const WARREN_POP = 63944;
export const WASHINGTON_POP = 61204;
export const CAP_REGION_POP =
  ALBANY_POP +
  COLUMBIA_POP +
  GREENE_POP +
  SARATOGA_POP +
  SCHENECTADY_POP +
  RENSSELAER_POP +
  WARREN_POP +
  WASHINGTON_POP;

export const populations = {
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

export const addMovingAgerage = (data, param, size) => {
  return _.map(data, (day, index, allData) => {
    const paramName = `${param}_${size}_day_avg`;
    const start = Math.max(0, index - size + 1);
    const avg = _.chain(allData)
      .slice(start, index + 1)
      .meanBy((d) => parseFloat(d[param]) || 0.0)
      .value()
      .toFixed(1);

    return {
      ...day,
      [paramName]: avg,
    };
  });
};

export const addMovingAgeragePositives = (data, size) => {
  return _.map(data, (day, index, allData) => {
    const paramName = `positive_rate_percentage_${size}_day_avg`;
    const start = Math.max(0, index - size + 1);
    const numeratorSum = _.chain(allData)
      .slice(start, index + 1)
      .sumBy((d) => parseInt(d.new_positives) || 0)
      .value();

    const denomSum = _.chain(allData)
      .slice(start, index + 1)
      .sumBy((d) => parseInt(d.total_number_of_tests) || 0)
      .value();

    const avg = ((numeratorSum / denomSum) * 100).toFixed(2);

    return {
      ...day,
      [paramName]: avg,
    };
  });
};

export const regionalize = (...counties) => {
  return _.chain(counties)
    .flattenDeep()
    .groupBy("test_date")
    .map((value, key) => {
      return _.reduce(
        value,
        (sum, val) => {
          return {
            cumulative_number_of_positives:
              sum.cumulative_number_of_positives +
                parseInt(val.cumulative_number_of_positives) || 0,
            cumulative_number_of_tests:
              sum.cumulative_number_of_tests +
                parseInt(val.cumulative_number_of_tests) || 0,
            new_positives: sum.new_positives + parseInt(val.new_positives) || 0,
            test_date: val.test_date,
            total_number_of_tests:
              sum.total_number_of_tests + parseInt(val.total_number_of_tests) ||
              0,
          };
        },
        {
          test_date: key,
          new_positives: 0,
          cumulative_number_of_positives: 0,
          total_number_of_tests: 0,
          cumulative_number_of_tests: 0,
        }
      );
    })
    .value();
};

export const generateCalculatedData = (county, countyName) => {
  let results = _.chain(county)
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
        ).toFixed(1),
      };
    })
    .sortBy(["test_date"])
    .value();

  results = addMovingAgerage(results, "new_positives", 7);
  results = addMovingAgerage(results, "new_positives", 14);
  results = addMovingAgerage(results, "cases_per_100k", 7);
  results = addMovingAgerage(results, "cases_per_100k", 14);
  results = addMovingAgeragePositives(results, 7);
  return addMovingAgeragePositives(results, 14);
};
