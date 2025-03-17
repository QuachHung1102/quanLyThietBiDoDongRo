const chart1 = new Chart(document.getElementById('chart1'), {
  type: 'line',
  data: {
    datasets: [{
      label: [
        "14:21",
        "14:22",
        "14:23",
        "14:24",
        "14:25",
        "14:26",
        "14:27",
        "14:28",
        "14:29",
        "14:30"
      ],
      data: [7, 6, 8, 8, 5, 5, 5, 6, 8, 6],
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
    }]
  },
  options: { scales: { x: { type: 'time', time: { unit: 'minute' } } } }
});

const chart2 = new Chart(document.getElementById('chart2'), {
  type: 'line',
  data: {
    datasets: [{
      label: 'Temperature',
      data: [],
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
  options: { scales: { x: { type: 'time', time: { unit: 'minute' } } } }
});

const chart3 = new Chart(document.getElementById('chart3'), {
  type: 'line',
  data: {
    datasets: [{
      label: 'Humidity',
      data: [],
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
  options: { scales: { x: { type: 'time', time: { unit: 'minute' } } } }
});

const chart4 = new Chart(document.getElementById('chart4'), {
  type: 'line',
  data: {
    datasets: [{
      label: 'PowerLoss',
      data: [],
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
  options: { scales: { x: { type: 'time', time: { unit: 'minute' } } } }
});

socket.on('newMeasurement', (measurement) => {
  updateChart(chart1, measurement, 'leakageCurrent');
  updateChart(chart2, measurement, 'temperature');
  updateChart(chart3, measurement, 'humidity');
  updateChart(chart4, measurement, 'powerLoss');
  updateDeviceInfo(measurement);

  if (measurement.deviceStatus === 3) {
    if (Notification.permission === 'granted') {
      new Notification('Cảnh báo thiết bị', {
        body: `Thiết bị ${measurement.deviceId} ở chế độ báo động.`,
        icon: '/images/warning-icon.png'
      });
      const audio = new Audio('/sound/nook.mp3');
      audio.play();
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('Cảnh báo thiết bị', {
            body: `Thiết bị ${measurement.deviceId} ở chế độ báo động.`,
            icon: '/images/warning-icon.png'
          });
          const audio = new Audio('/sound/nook.mp3');
          audio.play();
        }
      });
    }
  }
});

function updateChart(chart, measurement, key) {
  const time = new Date(measurement.measuredAt);
  chart.data.datasets[0].data.push({ x: time, y: measurement[key] });
  const now = new Date();
  const oneHourAgo = new Date(now - 3600000);
  chart.data.datasets[0].data = chart.data.datasets[0].data.filter(point => point.x >= oneHourAgo);
  chart.update();
}

function updateDeviceInfo(measurement) {
  document.getElementById('deviceId').textContent = measurement.deviceId;
  document.getElementById('deviceName').textContent = measurement.deviceName;
  document.getElementById('deviceType').textContent = measurement.deviceType;
  document.getElementById('lastChecked').textContent = measurement.lastChecked;
  document.getElementById('battery').value = measurement.batteryLevel;
  document.getElementById('batteryPercent').textContent = measurement.batteryLevel + '%';

  const alertLevelBox = document.getElementById('alertLevelBox');
  alertLevelBox.textContent = getAlertLevelText(measurement.deviceStatus);
  alertLevelBox.classList.remove('normal', 'warm', 'alert');
  alertLevelBox.classList.add(getAlertLevelClass(measurement.deviceStatus));
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