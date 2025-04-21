'use strict';

let measurementData;
let deviceData;
const date = new Date();
const charts = []; // Lưu trữ các biểu đồ đã tạo

const chartConfigs = [
  {
    id: "chart1",
    label: "Dòng rò (Ampere)",
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

  ctx.width = ctx.parentElement.offsetWidth;
  ctx.height = ctx.parentElement.offsetHeight;

  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels(measurementData),
      datasets: [
        {
          label: config.label,
          data: dataStart(config.flag, measurementData),
          backgroundColor: [config.backgroundColor],
          borderColor: [config.borderColor],
          borderWidth: 1,
          tension: 0.4,
          pointRadius: 0,
        },
      ],
    },
    options: {
      animation: { duration: 1000, easing: "easeInOutQuad" },
      maintainAspectRatio: false,
      scales: {
        x: {
          ticks: { autoSkip: true, maxTicksLimit: 10 },
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
            title: (tooltipItems) => labels(measurementData)[tooltipItems[0].dataIndex],
            label: (tooltipItem) => `${config.label}: ${tooltipItem.raw}`,
          },
        },
      },
    },
  });

  charts.push(chart);
};

const renderCharts = (measurementData) => {
  destroyCharts();
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
        console.log("Device data:", deviceData);
        console.log("Measurement data:", measurementData);

        ["chart-item1", "chart-item2", "chart-item3", "chart-item4"].forEach((id) =>
          document.getElementById(id).classList.remove("d-none")
        );

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

const labels = (measurementData) =>
  measurementData
    ?.map((measurement) => {
      if (measurement?.measuredAt) {
        const measuredDate = new Date(measurement.measuredAt);
        const options = { month: "long", day: "numeric" };
        return measuredDate.toLocaleDateString("en-US", options);
      }
      return null;
    })
    .filter(Boolean);

const dataStart = (flag, measurementData) =>
  measurementData
    ?.map((measurement) => measurement?.[flag] ?? null)
    .filter(Boolean);