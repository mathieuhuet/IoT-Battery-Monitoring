// Filter data for graph to removes Zero's

export function filterZero (data) {
  let values = data.values;
  let filterTime = [];
  let i = 0;
  let filter = [];
  let filterValues = values.filter(value => {
    if (value === 0) {
      filter.push(i);
    }
    i++;
    return value !== 0;
  });
  for (let j = 0; j < data.time.length; j++) {
    if (filter.indexOf(j) === -1) {
      filterTime.push(data.time[j]);
    }
  }
  return ({values: filterValues, time: filterTime});
}