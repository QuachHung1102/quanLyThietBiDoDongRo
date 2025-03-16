const express = require('express');
const measurementRouter = express.Router();
const { Measurement } = require('../models');

// controllers
const {
  createMeasurement,
  getAllMeasurements,
  getMeasurementsByID,
  // updateMeasurement,
  // deleteMeasurement,
} = require('../controllers/measurements.controllers');
// middleware
const { checkExist } = require('../middlewares/validations/checkExist');
const { authenticate } = require('../middlewares/auth/authenticate');
const { authorize } = require('../middlewares/auth/authorize');
const type = ['admin', 'superadmin'];

measurementRouter.post('/', createMeasurement);
measurementRouter.get('/', getAllMeasurements);
measurementRouter.get('/:deviceId', getMeasurementsByID);

module.exports = { measurementRouter };