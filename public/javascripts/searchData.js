'use strict';

import { setCoordinates } from "./mapbox.js";
const date = new Date();
const charts = []; // Lưu trữ các biểu đồ đã tạo

const chartConfigs = [
  {
    id: "chart1",
    label: "Dòng rò (mA)",
    flag: "leakageCurrent",
    backgroundColor: "rgba(255, 206, 86, 0.2)", // Màu vàng
    borderColor: "rgba(255, 206, 86, 1)", // Màu vàng
    yMin: 0,
    yMax: 1,
  },
  {
    id: "chart2",
    label: "Nhiệt độ (°C)",
    flag: "temperature",
    backgroundColor: "rgba(255, 99, 132, 0.2)", // Màu đỏ
    borderColor: "#FF0000", // Màu đỏ
    yMin: 0,
    yMax: 100,
  },
  {
    id: "chart3",
    label: "Độ ẩm (%)",
    flag: "humidity",
    backgroundColor: "rgba(54, 162, 235, 0.2)", // Màu xanh dương
    borderColor: "rgba(54, 162, 235, 1)", // Màu xanh dương
    yMin: 0,
    yMax: 100,
  },
  {
    id: "chart4",
    label: "Công suất tiêu hao (Watt)",
    flag: "powerLoss",
    backgroundColor: "rgba(153, 102, 255, 0.2)", // Màu tím
    borderColor: "rgba(153, 102, 255, 1)", // Màu tím
    yMin: 0,
    yMax: 2,
  },
];

const destroyCharts = () => {
  charts.forEach((chart) => chart.destroy());
  charts.length = 0;
};

const createChart = (config, measurementData) => {
  const ctx = document.getElementById(config.id);
  if (!ctx) return;

  // Đảm bảo canvas chiếm toàn bộ khung chứa
  ctx.width = ctx.parentElement.offsetWidth;
  ctx.height = ctx.parentElement.offsetHeight;

  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels(measurementData), // Label chỉ hiển thị ngày
      datasets: [
        {
          label: config.label,
          data: dataStart(config.flag, measurementData), // Dữ liệu đầy đủ
          backgroundColor: [config.backgroundColor],
          borderColor: [config.borderColor],
          borderWidth: 1,
          tension: 0.4,
          pointRadius: 2,
        },
      ],
    },
    options: {
      animation: { duration: 1000, easing: "easeInOutQuad" },
      maintainAspectRatio: false, // Đảm bảo biểu đồ chiếm toàn bộ khung chứa
      responsive: true, // Đảm bảo biểu đồ phản hồi kích thước
      scales: {
        x: {
          ticks: {
            autoSkip: false, // Không tự động bỏ qua label
            callback: function (value, index, values) {
              // Chỉ hiển thị label không rỗng
              return this.getLabelForValue(value) || null;
            },
          },
        },
        y: {
          min: config.yMin,
          max: config.yMax,
        },
      },
      plugins: {
        tooltip: {
          enabled: true,
          callbacks: {
            title: (tooltipItems) => {
              const index = tooltipItems[0].dataIndex;
              const measuredDate = new Date(measurementData[index]?.measuredAt);
              const datePart = measuredDate.toLocaleDateString("vi-VN", { year: "numeric", month: "long", day: "numeric" });
              const timePart = measuredDate.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
              return `${datePart} - ${timePart}`;
            },
            label: (tooltipItem) => {
              const index = tooltipItem.dataIndex;
              const measurement = measurementData[index];
              return `${config.label}: ${measurement?.[config.flag] ?? "N/A"}`;
            },
          },
        },
      },
    },
  });

  charts.push(chart);
};

const renderCharts = (measurementData) => {
  destroyCharts(); // Hủy các biểu đồ cũ trước khi tạo mới
  chartConfigs.forEach((config) => createChart(config, measurementData));
};

const updateWeekOptions = (selectedMonth) => {
  const weekInput = document.getElementById("week");
  if (selectedMonth === "null") {
    weekInput.innerHTML = `<option value="null" selected>-- Chọn tuần --</option>`;
    return;
  }

  const parsedMonth = new Date(`${selectedMonth} 1, ${date.getFullYear()}`).getMonth() + 1;
  const daysInMonth = new Date(date.getFullYear(), parsedMonth, 0).getDate();
  const weeks = Math.ceil(daysInMonth / 7);

  weekInput.innerHTML = `<option value="null" selected>-- Chọn tuần --</option>`;
  for (let i = 1; i <= weeks; i++) {
    const option = document.createElement("option");
    option.value = `Week ${i}`;
    option.textContent = `Tuần ${i}`;
    weekInput.appendChild(option);
  };
};

const handleFormSubmit = async (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const params = {
    deviceId: formData.get("deviceId"),
    week: formData.get("week") === "null" ? null : formData.get("week"),
    month: formData.get("month") === "null" ? null : formData.get("month"),
    startDate: formData.get("startDate") || null,
    endDate: formData.get("endDate") || null,
  };

  console.log("Form data:", params);

  try {
    const response = await axios.get("/meansurements/getHistory", { params });
    if (response.status === 200) {
      measurementData = response.data.measurements;
      deviceData = response.data.device;

      if (measurementData && measurementData.length > 0) {
        // console.log("Device data:", deviceData);
        // console.log("Measurement data:", measurementData);
        ["chart-item1", "chart-item2", "chart-item3", "chart-item4"].forEach((id) =>
          document.getElementById(id).classList.remove("d-none")
        );
        setCoordinates(deviceData.coordinates.coordinates, deviceData.name);
        renderCharts(measurementData);
      }
    } else {
      alert("No data found for the selected device and time period.");
    }
  } catch (error) {
    alert(error.message);
    console.error("Error fetching measurement data:", error);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("searchForm");
  if (form) {
    form.addEventListener("submit", handleFormSubmit);

    const monthInput = document.getElementById("month");
    monthInput.addEventListener("change", (e) => updateWeekOptions(e.target.value));
  }
});

const labels = (measurementData) => {
  if (!measurementData || !Array.isArray(measurementData) || measurementData.length === 0) {
    return [];
  }

  let previousDate = null; // Lưu trữ ngày trước đó để so sánh
  return measurementData.map((measurement) => {
    if (measurement?.measuredAt) {
      const measuredDate = new Date(measurement.measuredAt);
      const day = measuredDate.getDate();
      const month = measuredDate.toLocaleString("vi-VN", { month: "long" }); // Hiển thị tháng bằng tiếng Việt

      // Nếu ngày thay đổi, hiển thị ngày và tháng
      if (previousDate !== day) {
        previousDate = day;
        return `${day}`;
      }

      // Nếu ngày không thay đổi, hiển thị chuỗi rỗng để giữ khoảng cách
      return "";
    }
    return null;
  });
};

const dataStart = (flag, measurementData) => {
  if (!measurementData || !Array.isArray(measurementData) || measurementData.length === 0) {
    return [];
  }

  let result = [];
  measurementData.forEach((measurement) => {
    if (measurement && measurement.measuredAt) {
      if (flag === "leakageCurrent") {
        result.push(measurement.leakageCurrent);
      } else if (flag === "temperature") {
        result.push(measurement.temperature);
      } else if (flag === "humidity") {
        result.push(measurement.humidity);
      } else if (flag === "powerLoss") {
        result.push(measurement.powerLoss);
      }
    }
  });
  return result;
};