const express = require('express');
const deviceRouter = express.Router();

// controllers
const {
  createDevice,
  getDetailDevice,
  updateDevice,
  deleteDevice,
  getAllDevices,
} = require('../controllers/device.controllers');
// middleware

deviceRouter.post('/', createDevice);
deviceRouter.get('/', getAllDevices);
deviceRouter.get('/:id', getDetailDevice);
deviceRouter.put('/:id', updateDevice);
deviceRouter.delete('/:id', deleteDevice);

module.exports = { deviceRouter };