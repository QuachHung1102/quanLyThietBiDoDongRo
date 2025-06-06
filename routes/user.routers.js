const express = require('express');
const userRouter = express.Router();
// controllers
const {
  getRegisterPage,
  register,
  getLoginPage,
  login,
  getAllUsers,
  updateUser,
  deleteUser,
  uploadAvatar,
  getAllTripUser,
  checkEmail,
  checkPhone,
} = require('../controllers/user.controllers');
// middlewares
const {
  checkExist,
  checkDeviceExist,
} = require('../middlewares/validations/checkExist');
const { authenticate } = require('../middlewares/auth/authenticate');
const { authorize } = require('../middlewares/auth/authorize');
const type = ['admin', 'superadmin'];
const { uploadImage } = require('../middlewares/upload/upload-img');

userRouter.get('/register-page', getRegisterPage);
userRouter.post('/register', register);
userRouter.get('/login-page', getLoginPage);
userRouter.post('/login', login);
userRouter.post('/upload-avatar', authenticate, uploadImage(`avatar`), uploadAvatar);
userRouter.get('/', authenticate, authorize(type), getAllUsers);
// userRouter.get('/all-trip', authenticate, getAllTripUser);
userRouter.put('/:id', authenticate, authorize(type), updateUser);
userRouter.delete('/:id', authenticate, authorize(type), deleteUser);
userRouter.post('/authenticate', authenticate, (req, res) => {
  if (req.user !== 'Token verification failed: jwt expired') {
    res.status(200).send({ message: 'Authenticated' });
  }
})
userRouter.post('/check-email', checkEmail);
userRouter.post('/check-phone', checkPhone);

module.exports = { userRouter };