const express = require('express');
const deviceRouter = express.Router();
const { Device } = require('../models');

// controllers
const {
  createDevice,
  getDetailDevice,
  updateDevice,
  deleteDevice,
  getAllDevices,
  getAllDevicesPage,
} = require('../controllers/device.controllers');
// middleware
const { checkExist } = require('../middlewares/validations/checkExist');
const { authenticate } = require('../middlewares/auth/authenticate');
const { authorize } = require('../middlewares/auth/authorize');
const type = ['admin', 'superadmin'];

deviceRouter.post('/', authenticate, authorize(type), createDevice);
deviceRouter.get('/', getAllDevices);
deviceRouter.get('/page', getAllDevicesPage);
deviceRouter.get('/:id', getDetailDevice);
deviceRouter.put('/:id', authenticate, authorize(type), checkExist(Device), updateDevice);
deviceRouter.delete('/:id', authenticate, authorize(type), checkExist(Device), deleteDevice);

module.exports = { deviceRouter };