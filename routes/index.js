var express = require('express');
var rootRouter = express.Router();
const { deviceRouter } = require('./devices.routers');
const { userRouter } = require('./user.routers');
const { permissionRouter } = require('./permission.routers');
const { measurementRouter } = require('./measurements.routers');
const { authenticate } = require('../middlewares/auth/authenticate');

/* GET home page. */
rootRouter.get('/', function (req, res, next) {
  res.render('index', { pageTitle: "Device Manager", activeClass: "Home" });
});

// use deviceRouter
rootRouter.use('/devices', deviceRouter);
// use userRouter
rootRouter.use('/users', userRouter);
// use permissionRouter
rootRouter.use('/permissions', permissionRouter);
// use measurementRouter
rootRouter.use('/meansurements', measurementRouter);

module.exports = rootRouter;
