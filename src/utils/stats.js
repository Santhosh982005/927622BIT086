export function mean(arr) {
  if (!arr.length) return 0;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

export function stddev(arr) {
  const m = mean(arr);
  return Math.sqrt(arr.reduce((sum, x) => sum + (x - m) ** 2, 0) / (arr.length - 1));
}

export function covariance(arr1, arr2) {
  const m1 = mean(arr1), m2 = mean(arr2);
  return arr1.reduce((sum, x, i) => sum + (x - m1) * (arr2[i] - m2), 0) / (arr1.length - 1);
}

export function pearson(arr1, arr2) {
  if (arr1.length !== arr2.length || arr1.length < 2) return null;
  return covariance(arr1, arr2) / (stddev(arr1) * stddev(arr2));
}

export function alignSeries(series1, series2) {
  const map2 = new Map(series2.map(d => [d.lastUpdatedAt, d.price]));
  const aligned1 = [], aligned2 = [];
  for (const d1 of series1) {
    let minDiff = Infinity, closest = null;
    for (const d2 of series2) {
      const diff = Math.abs(new Date(d1.lastUpdatedAt) - new Date(d2.lastUpdatedAt));
      if (diff < minDiff) {
        minDiff = diff;
        closest = d2;
      }
    }
    if (closest) {
      aligned1.push(d1.price);
      aligned2.push(closest.price);
    }
  }
  return [aligned1, aligned2];
} 