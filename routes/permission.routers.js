const express = require('express');
const permissionRouter = express.Router();
const { Permissions } = require('../models');

// controllers
const {
  createPermission,
  getAllPermissions,
  deletePermission,
} = require('../controllers/permission.controllers');

// middleware
const { checkExist } = require('../middlewares/validations/checkExist');
const { authenticate } = require('../middlewares/auth/authenticate');
const { authorize } = require('../middlewares/auth/authorize');
const type = ['admin', 'superadmin'];

permissionRouter.post('/', authenticate, authorize(type), createPermission);
permissionRouter.get('/', getAllPermissions);
permissionRouter.delete('/:id', authenticate, authorize(type), checkExist(Permissions), deletePermission);

module.exports = { permissionRouter };