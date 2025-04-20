const express = require('express');
const measurementRouter = express.Router();
const { Measurement, Device } = require('../models');

// controllers
const {
  createMeasurement,
  getAllMeasurements,
  getMeasurementsByID,
  getMeasurementsPageByID,
  getSearchHistoryPage,
  getMeasurementsByIDAndTime,
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
measurementRouter.get('/page/:deviceId', checkDeviceExist(Device), getMeasurementsPageByID);
measurementRouter.get('/search-history', getSearchHistoryPage);
measurementRouter.get('/getHistory', getMeasurementsByIDAndTime);
measurementRouter.get('/:deviceId', getMeasurementsByID);

module.exports = { measurementRouter };