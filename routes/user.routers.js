const express = require('express');
const userRouter = express.Router();
// controllers
const {
  register,
  login,
  getAllUsers,
  updateUser,
  deleteUser,
  uploadAvatar,
  getAllTripUser,
} = require('../controllers/user.controllers');
// middlewares
const { authenticate } = require('../middlewares/auth/authenticate');
const { authorize } = require('../middlewares/auth/authorize');
const type = ['admin', 'superadmin'];
const { uploadImage } = require('../middlewares/upload/upload-img');


userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/upload-avatar', authenticate, uploadImage(`avatar`), uploadAvatar);
userRouter.get('/', authenticate, authorize(type), getAllUsers);
userRouter.get('/all-trip', authenticate, getAllTripUser);
userRouter.put('/:id', authenticate, authorize(type), updateUser);
userRouter.delete('/:id', authenticate, authorize(type), deleteUser);

module.exports = { userRouter };