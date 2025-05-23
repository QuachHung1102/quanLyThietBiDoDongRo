'use strict';

let currentBatteryLevel;
const chartDoom1 = document.getElementById("chart1");
const chartDoom2 = document.getElementById("chart2");
const chartDoom3 = document.getElementById("chart3");
const chartDoom4 = document.getElementById("chart4");
const date = new Date();

const labels = function () {
  let result = [];
  measurementData.forEach(measurement => {
    // Khi tạo giờ và phút thư viện sẽ tự động chuyển đổi múi giờ từ UTC sang múi giờ của máy tính
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
        label: 'Leakage Current (mA)',
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

(function () {
  updateDeviceInfo(measurementData[measurementData.length - 1]);
})();

// Tham gia theo dõi thiết bị
if (window.location.pathname.split('/').pop() != 'search-history') {
  socket.on('connect', () => {
    console.log(`Connected to socket server`);
    socket.emit('joinDevice', deviceData.id);
  })

  socket.on('connect_error', (err) => {
    console.log('Connection error:', err.message);
  });

  socket.on('disconnect', (reason) => {
    console.log('Disconnected:', reason);
  });

  socket.on('newMeasurement', (measurement) => {
    if (!measurement) {
      console.error('No measurement data received');
      return;
    }
    updateChart(chart1, measurement, 'leakageCurrent');
    updateChart(chart2, measurement, 'temperature');
    updateChart(chart3, measurement, 'humidity');
    updateChart(chart4, measurement, 'powerLoss');
    updateDeviceInfo(measurement);
  });
}

function updateChart(chart, measurement, key) {
  const dateUpdate = new Date(measurement.measuredAt);
  const hours = dateUpdate.getHours();
  const minutes = dateUpdate.getMinutes();
  const time = `${hours}:${minutes}`;
  const length = chart.data.labels.length;
  chart.data.labels.push(time);
  chart.data.datasets[0].data.push(measurement[key]);
  if (length == 10) {
    chart.data.labels.shift(time);
    chart.data.datasets[0].data.shift(measurement[key]);
  }
  chart.update();
}

function updateDeviceInfo(measurement) {
  const minVoltage = 10;
  const maxVoltage = 12;
  const batteryPercent = Math.max(0, Math.min(100, ((measurement.batteryLevel - minVoltage) / (maxVoltage - minVoltage)) * 100));

  if (currentBatteryLevel !== measurement.batteryLevel) {
    document.getElementById('battery').value = batteryPercent; // Cập nhật giá trị thanh pin
    document.getElementById('batteryPercent').textContent = `${Math.round(batteryPercent)}%`; // Hiển thị phần trăm pin
    currentBatteryLevel = measurement.batteryLevel;
  }
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