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
      res.status(404).json({ error: 'Device not found' });
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
        measurementList,
        device,
        pageTitle: 'Measurement Manager',
        activeClass: 'Measurement',
        activeFormCss: false,
        path: '/measurement',
      });
    } else {
      res.status(404).render('error', { error: 'Device not found' });
    }
  } catch (error) {
    res.status(500).render('error', { error });
  }

};

module.exports = {
  createMeasurement,
  getAllMeasurements,
  getMeasurementsByID,
  getMeasurementsPageByID,
};