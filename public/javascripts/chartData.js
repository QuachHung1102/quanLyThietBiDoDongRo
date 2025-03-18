console.log(measurementData);
console.log(deviceData);

const chartDoom1 = document.getElementById("chart1");
const chartDoom2 = document.getElementById("chart2");
const chartDoom3 = document.getElementById("chart3");
const chartDoom4 = document.getElementById("chart4");
const date = new Date();

const labels = function () {
  let result = [];
  measurementData.forEach(measurement => {
    const hours = new Date(measurement.measuredAt).getHours();
    const minutes = new Date(measurement.measuredAt).getMinutes();
    if (new Date(measurement.measuredAt).getDate() === date.getDate()) {
      result.push(`${hours}:${minutes}`);
    }
  });
  return result;
};

const dataStart = function (flag) {
  let result = [];
  measurementData.forEach(measurement => {
    if (new Date(measurement.measuredAt).getDate() === date.getDate()) {
      if (flag === 'leakageCurrent') {
        result.push(measurement.leakageCurrent);
      } else if (flag === 'temperature') {
        result.push(measurement.temperature);
      } else if (flag === 'humidity') {
        result.push(measurement.humidity);
      } else if (flag === 'powerLoss') {
        result.push(measurement.powerLoss);
      }
    }
  });
  return result;
}

const chart1 = new Chart(chartDoom1, {
  type: 'line',
  data: {
    labels: labels(),
    datasets: [
      {
        label: 'Leakage Current',
        data: dataStart('leakageCurrent'),
        backgroundColor: [
          // "rgba(255, 99, 132, 0.2)", // Màu đỏ
          // "rgba(54, 162, 235, 0.2)", // Màu xanh dương
          "rgba(255, 206, 86, 0.2)", // Màu vàng
          // "rgba(75, 192, 192, 0.2)", // Màu xanh lá cây
          // "rgba(153, 102, 255, 0.2)", // Màu tím
          // "rgba(255, 159, 64, 0.2)", // Màu cam
        ],
        borderColor: [
          // "#FF0000", // Màu đỏ
          // 'rgba(54, 162, 235, 1)',     // Màu xanh dương
          'rgba(255, 206, 86, 1)',     // Màu vàng
          // 'rgba(75, 192, 192, 1)',     // Màu xanh lá cây
          // 'rgba(153, 102, 255, 1)',    // Màu tím
          // 'rgba(255, 159, 64, 1)'      // Màu cam
        ],
        borderWidth: 1,
      }
    ]
  },
  options: { scales: { x: {}, } }
});

const chart2 = new Chart(chartDoom2, {
  type: 'line',
  data: {
    labels: labels(),
    datasets: [
      {
        label: 'Temperature',
        data: dataStart('temperature'),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)", // Màu đỏ
          // "rgba(54, 162, 235, 0.2)", // Màu xanh dương
          // "rgba(255, 206, 86, 0.2)", // Màu vàng
          // "rgba(75, 192, 192, 0.2)", // Màu xanh lá cây
          // "rgba(153, 102, 255, 0.2)", // Màu tím
          // "rgba(255, 159, 64, 0.2)", // Màu cam
        ],
        borderColor: [
          "#FF0000", // Màu đỏ
          // 'rgba(54, 162, 235, 1)',     // Màu xanh dương
          // 'rgba(255, 206, 86, 1)',     // Màu vàng
          // 'rgba(75, 192, 192, 1)',     // Màu xanh lá cây
          // 'rgba(153, 102, 255, 1)',    // Màu tím
          // 'rgba(255, 159, 64, 1)'      // Màu cam
        ],
        borderWidth: 1,
      }]
  },
  options: { scales: { x: {}, } }
});

const chart3 = new Chart(chartDoom3, {
  type: 'line',
  data: {
    labels: labels(),
    datasets: [
      {
        label: 'Humidity',
        data: dataStart('humidity'),
        backgroundColor: [
          // "rgba(255, 99, 132, 0.2)", // Màu đỏ
          "rgba(54, 162, 235, 0.2)", // Màu xanh dương
          // "rgba(255, 206, 86, 0.2)", // Màu vàng
          // "rgba(75, 192, 192, 0.2)", // Màu xanh lá cây
          // "rgba(153, 102, 255, 0.2)", // Màu tím
          // "rgba(255, 159, 64, 0.2)", // Màu cam
        ],
        borderColor: [
          // "#FF0000", // Màu đỏ
          'rgba(54, 162, 235, 1)',     // Màu xanh dương
          // 'rgba(255, 206, 86, 1)',     // Màu vàng
          // 'rgba(75, 192, 192, 1)',     // Màu xanh lá cây
          // 'rgba(153, 102, 255, 1)',    // Màu tím
          // 'rgba(255, 159, 64, 1)'      // Màu cam
        ],
        borderWidth: 1,
      }]
  },
  options: { scales: { x: {}, } }
});

const chart4 = new Chart(chartDoom4, {
  type: 'line',
  data: {
    labels: labels(),
    datasets: [
      {
        label: 'PowerLoss',
        data: dataStart('powerLoss'),
        backgroundColor: [
          // "rgba(255, 99, 132, 0.2)", // Màu đỏ
          // "rgba(54, 162, 235, 0.2)", // Màu xanh dương
          // "rgba(255, 206, 86, 0.2)", // Màu vàng
          // "rgba(75, 192, 192, 0.2)", // Màu xanh lá cây
          "rgba(153, 102, 255, 0.2)", // Màu tím
          // "rgba(255, 159, 64, 0.2)", // Màu cam
        ],
        borderColor: [
          // "#FF0000", // Màu đỏ
          // 'rgba(54, 162, 235, 1)',     // Màu xanh dương
          // 'rgba(255, 206, 86, 1)',     // Màu vàng
          // 'rgba(75, 192, 192, 1)',     // Màu xanh lá cây
          'rgba(153, 102, 255, 1)',    // Màu tím
          // 'rgba(255, 159, 64, 1)'      // Màu cam
        ],
        borderWidth: 1,
      }]
  },
  options: { scales: { x: {}, } }
});

// socket.on('newMeasurement', (measurement) => {
//   updateChart(chart1, measurement, 'leakageCurrent');
//   updateChart(chart2, measurement, 'temperature');
//   updateChart(chart3, measurement, 'humidity');
//   updateChart(chart4, measurement, 'powerLoss');
//   updateDeviceInfo(measurement);
// });

function updateChart(chart, measurement, key) {
  // const time = new Date(measurement.measuredAt);
  // chart.data.datasets[0].data.push({ x: time, y: measurement[key] });
  // const now = new Date();
  // const oneHourAgo = new Date(now - 3600000);
  // chart.data.datasets[0].data = chart.data.datasets[0].data.filter(point => point.x >= oneHourAgo);
  chart.update();
}



function getAlertLevelText(level) {
  switch (level) {
    case 1: return 'Normal';
    case 2: return 'Warm';
    case 3: return 'Alert';
    default: return 'Unknown';
  }
}

function getAlertLevelClass(level) {
  switch (level) {
    case 1: return 'normal';
    case 2: return 'warm';
    case 3: return 'alert';
    default: return '';
  }
}