'use strict';

let measurementData;
let deviceData;
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

if (measurementData) {
  const chart1 = new Chart(chartDoom1, {
    type: 'line',
    data: {
      labels: labels(),
      datasets: [
        {
          label: 'Leakage Current (Ampere)',
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
          tension: 0.4, // Add tension for curved lines
        }
      ]
    },
    options: {
      animation: {
        duration: 1000, // Animation duration in milliseconds
        easing: 'easeInOutQuad', // Easing function for smooth transitions
      },
      scales: {
        x: {},
        y: {
          min: 0,
          max: 1,
        }
      }
    }
  });

  const chart2 = new Chart(chartDoom2, {
    type: 'line',
    data: {
      labels: labels(),
      datasets: [
        {
          label: 'Temperature (°C)',
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
          tension: 0.4, // Add tension for curved lines
        }]
    },
    options: {
      animation: {
        duration: 1000,
        easing: 'easeInOutQuad',
      },
      scales: {
        x: {},
        y: {
          min: 0,
          max: 100,
        }
      }
    }
  });

  const chart3 = new Chart(chartDoom3, {
    type: 'line',
    data: {
      labels: labels(),
      datasets: [
        {
          label: 'Humidity (%)',
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
          tension: 0.4, // Add tension for curved lines
        }]
    },
    options: {
      animation: {
        duration: 1000,
        easing: 'easeInOutQuad',
      },
      scales: {
        x: {},
        y: {
          min: 0,
          max: 100,
        }
      }
    }
  });

  const chart4 = new Chart(chartDoom4, {
    type: 'line',
    data: {
      labels: labels(),
      datasets: [
        {
          label: 'PowerLoss (Watt)',
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
          tension: 0.4, // Add tension for curved lines
        }]
    },
    options: {
      animation: {
        duration: 1000,
        easing: 'easeInOutQuad',
      },
      scales: {
        x: {},
        y: {
          min: 0,
          max: 2,
        }
      }
    }
  });
}