const { where, Op } = require('sequelize');
const { Measurement, Device } = require('../models');
const socket = require('../socket');
const { getWeather } = require('../utils/get-weather');

// Taọ một bản ghi chú đo đạc mới cho các thiết bị.
// let weatherDatas = Object.create(null);
let weatherDatas = {};

const createMeasurement = async (req, res) => {
  // const timeString = `${dateNow.getHours().toString().padStart(2, '0')}:${dateNow.getMinutes().toString().padStart(2, '0')}`; // Lấy giờ và phút
  // console.log(timeString);
  const formatter = new Intl.DateTimeFormat('vi-VN', { hour: '2-digit', minute: '2-digit' });
  // console.log(formatter.format(new Date()));


  try {
    const data = req.body;
    const device = await Device.findOne({
      where: {
        id: data.deviceId,
      }
    });

    // Lưu cache riêng cho từng device
    if (!weatherDatas[`${device.id}`]) {
      weatherDatas[`${device.id}`] = {
        lastUpdate: 0,
        data: null
      };
    }

    const now = Date.now();
    const cache = weatherDatas[`${device.id}`];
    const timeDifference = now - cache.lastUpdate;

    let weatherError = false;
    if (timeDifference > 1800000 || !cache.data) { // 30 phút
      try {
        const weatherData = await getWeather(device.coordinates.coordinates);
        if (weatherData && weatherData.current) {
          cache.data = weatherData.current;
          cache.lastUpdate = now;
        } else {
          weatherError = true;
        }
      } catch (err) {
        weatherError = true;
      }
    } else {
      console.log('Using cached weather data.');
    }

    if (
      weatherError ||
      !cache.data ||
      typeof cache.data.temp === 'undefined' ||
      typeof cache.data.humidity === 'undefined'
    ) {
      data.temperature = 0;
      data.humidity = 0;
    } else {
      data.temperature = cache.data.temp;
      data.humidity = cache.data.humidity;
    }

    const notEmpty = Object.values(data).every((val) => val !== null && val !== undefined);
    if (!notEmpty) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }
    if (!device) {
      return res.status(404).json({ error: 'Device not exist' });
    }
    const newMeasurement = await Measurement.create({ ...data, measuredAt: new Date() });
    const io = socket.getIO();
    io.to(`device:${data.deviceId}`).emit('newMeasurement', newMeasurement);
    res.status(201).json(newMeasurement);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getAllMeasurements = async (req, res) => {
  const { deviceId } = req.query;
  try {
    if (deviceId) {
      const measurementList = await Measurement.findAll({
        where: {
          deviceId,
        }
      });
      res.status(200).json(measurementList);
    } else {
      const measurementList = await Measurement.findAll();
      res.status(200).json(measurementList);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMeasurementsByID = async (req, res) => {
  const { deviceId } = req.params;
  try {
    const measurementList = await Measurement.findAll({
      where: {
        deviceId,
      }
    });
    if (measurementList.length) {
      res.status(200).json(measurementList);
    } else {
      res.status(404).json({ error: 'Device no have measurements' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getMeasurementsPageByID = async (req, res) => {
  const { deviceId } = req.params;
  try {
    const device = await Device.findOne({
      where: {
        id: deviceId,
      }
    });
    const measurementList = await Measurement.findAll({
      where: {
        deviceId,
      },
      order: [['measuredAt', 'DESC']],
      limit: 10,
    })
    if (measurementList.length) {
      res.status(200).render('measurement/measurement', {
        measurementList: measurementList.reverse(),
        device,
        pageTitle: 'Measurement Manager',
        activeClass: 'Measurement',
        activeFormCss: false,
        path: '/measurement',
        mapboxToken: process.env.MAPBOX_API_KEY,
      });
    } else {
      res.status(404).send('Device no have measurements');
    }
  } catch (error) {
    res.status(500).render('error', { error });
  }
};

const getSearchHistoryPage = async (req, res) => {
  try {
    const deviceList = await Device.findAll();
    res.status(200).render('search/searchData', {
      deviceList,
      deviceListLength: deviceList.length > 0,
      pageTitle: 'Search History',
      activeClass: 'Search',
      activeFormCss: true,
      path: '/searchHistory',
      mapboxToken: process.env.MAPBOX_API_KEY,
    });
  } catch (error) {
    res.status(500).render('error', { error });
  }
}

// API lấy lịch sử đo của thiết bị theo bộ lọc thời gian
const getMeasurementsByIDAndTime = async (req, res) => {
  try {
    const { deviceId, week, month, startDate, endDate } = req.query;
    const device = await Device.findOne({
      where: {
        id: deviceId,
      }
    });
    if (!device) {
      return res.status(404).json({ error: 'Device not exist' });
    }
    const whereClause = {
      deviceId,
    };

    // Xử lý week và month
    const parsedWeek = week ? parseInt(week.replace('Week ', ''), 10) : null;
    const parsedMonth = month ? new Date(`${month} 1, ${new Date().getFullYear()}`).getMonth() : null;

    if (parsedWeek && parsedMonth !== null) {
      const currentYear = new Date().getFullYear();

      // Tính ngày đầu tiên và cuối cùng của tháng
      const firstDayOfMonth = new Date(currentYear, parsedMonth, 1);
      const lastDayOfMonth = new Date(currentYear, parsedMonth + 1, 0); // Ngày cuối cùng của tháng

      // Tính ngày bắt đầu của tuần thứ `parsedWeek`
      const startOfWeek = new Date(firstDayOfMonth);
      startOfWeek.setDate(firstDayOfMonth.getDate() + (parsedWeek - 1) * 7);

      // Tính ngày kết thúc của tuần thứ `parsedWeek`
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);

      // Giới hạn ngày kết thúc trong phạm vi tháng
      if (endOfWeek > lastDayOfMonth) {
        endOfWeek.setDate(lastDayOfMonth.getDate());
      }

      whereClause.measuredAt = {
        [Op.between]: [startOfWeek, endOfWeek],
      };
    } else if (parsedMonth !== null) {
      // Nếu chỉ có month, tìm kiếm theo toàn bộ tháng
      const currentYear = new Date().getFullYear();
      const firstDayOfMonth = new Date(currentYear, parsedMonth, 1);
      const lastDayOfMonth = new Date(currentYear, parsedMonth + 1, 0);

      whereClause.measuredAt = {
        [Op.between]: [firstDayOfMonth, lastDayOfMonth],
      };
    } else if (startDate && endDate) {
      // Kiểm tra nếu startDate và endDate hợp lệ
      if (new Date(startDate).toString() !== 'Invalid Date' && new Date(endDate).toString() !== 'Invalid Date') {
        whereClause.measuredAt = {
          [Op.between]: [new Date(startDate), new Date(endDate)],
        };
      } else {
        return res.status(400).json({ error: 'Invalid startDate or endDate' });
      }
    } else {
      return res.status(400).json({ error: 'Invalid filters. Provide either week and month or startDate and endDate.' });
    }

    const measurements = await Measurement.findAll({
      where: whereClause,
      order: [['measuredAt', 'DESC']],
    });

    if (measurements.length) {
      res.status(200).json({
        measurements: measurements.reverse(),
        device
      });
    } else {
      res.status(404).json({ error: 'No measurements found for the given filters' });
    }
  } catch (error) {
    console.error('Error fetching measurements:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  createMeasurement,
  getAllMeasurements,
  getMeasurementsByID,
  getMeasurementsPageByID,
  getSearchHistoryPage,
  getMeasurementsByIDAndTime,
};