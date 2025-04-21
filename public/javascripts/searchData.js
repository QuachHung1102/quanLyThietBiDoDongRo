'use strict';

let measurementData;
let deviceData;
const chartDoom1 = document.getElementById("chart1");
const chartDoom2 = document.getElementById("chart2");
const chartDoom3 = document.getElementById("chart3");
const chartDoom4 = document.getElementById("chart4");
const date = new Date();

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('searchForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(form);
      const deviceId = formData.get('deviceId');
      const week = formData.get('week') === 'null' ? null : formData.get('week');
      const month = formData.get('month') === 'null' ? null : formData.get('month');
      const startDate = formData.get('startDate');
      const endDate = formData.get('endDate');
      console.log('Form data:', { deviceId, week, month, startDate, endDate });
      
      // Tiếp tục xử lý dữ liệu hoặc gửi request
    });
  }
});

const labels = function () {
  if (!measurementData || !Array.isArray(measurementData) || measurementData.length === 0) {
    return [];
  }
  
  let result = [];
  measurementData.forEach(measurement => {
    if (measurement && measurement.measuredAt) {
      const measuredDate = new Date(measurement.measuredAt);
      const hours = measuredDate.getHours();
      const minutes = measuredDate.getMinutes();
      if (measuredDate.getDate() === date.getDate()) {
        result.push(`${hours}:${minutes}`);
      }
    }
  });
  return result;
};

const dataStart = function (flag) {
  if (!measurementData || !Array.isArray(measurementData) || measurementData.length === 0) {
    return [];
  }
  
  let result = [];
  measurementData.forEach(measurement => {
    if (measurement && measurement.measuredAt) {
      const measuredDate = new Date(measurement.measuredAt);
      if (measuredDate.getDate() === date.getDate()) {
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
    }
  });
  return result;
}

// Kiểm tra xem biến measurementData và các phần tử DOM có tồn tại không
if (measurementData && chartDoom1 && chartDoom2 && chartDoom3 && chartDoom4) {
  const chart1 = new Chart(chartDoom1, {
    type: 'line',
    data: {
      labels: labels(),
      datasets: [
        {
          label: 'Dòng rò (Ampere)',
          data: dataStart('leakageCurrent'),
          backgroundColor: [
            "rgba(255, 206, 86, 0.2)", // Màu vàng
          ],
          borderColor: [
            'rgba(255, 206, 86, 1)',     // Màu vàng
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
          label: 'Nhiệt độ (°C)',
          data: dataStart('temperature'),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)", // Màu đỏ
          ],
          borderColor: [
            "#FF0000", // Màu đỏ
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
          label: 'Độ ẩm (%)',
          data: dataStart('humidity'),
          backgroundColor: [
            "rgba(54, 162, 235, 0.2)", // Màu xanh dương
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',     // Màu xanh dương
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
          label: 'Công suất tiêu hao (Watt)',
          data: dataStart('powerLoss'),
          backgroundColor: [
            "rgba(153, 102, 255, 0.2)", // Màu tím
          ],
          borderColor: [
            'rgba(153, 102, 255, 1)',    // Màu tím
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