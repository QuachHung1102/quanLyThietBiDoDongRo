const express = require('express');
const measurementRouter = express.Router();
const { Measurement } = require('../models');

// controllers
const {
  createMeasurement,
  getAllMeasurements,
  getMeasurementsByID,
  getMeasurementsPageByID,
  // updateMeasurement,
  // deleteMeasurement,
} = require('../controllers/measurements.controllers');
// middleware
const { checkExist, checkDeviceExist } = require('../middlewares/validations/checkExist');
const { authenticate } = require('../middlewares/auth/authenticate');
const { authorize } = require('../middlewares/auth/authorize');
const type = ['admin', 'superadmin'];

measurementRouter.post('/', createMeasurement);
measurementRouter.get('/all', getAllMeasurements);
measurementRouter.get('/page/:deviceId', checkDeviceExist(Measurement), getMeasurementsPageByID);
measurementRouter.get('/:deviceId', getMeasurementsByID);

module.exports = { measurementRouter };