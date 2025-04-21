const { where, Op } = require('sequelize');
const { Measurement, Device } = require('../models');
const socket = require('../socket');

const createMeasurement = async (req, res) => {
  try {
    const data = req.body;
    const device = await Device.findOne({
      where: {
        id: data.deviceId,
      }
    });
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

  } catch (error) {
    res.status(500).render('')
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