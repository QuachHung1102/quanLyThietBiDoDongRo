const { where } = require('sequelize');
const { Measurement, Device } = require('../models');

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
    const newMeasurement = await Measurement.create({ ...data });
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

module.exports = {
  createMeasurement,
  getAllMeasurements,
};