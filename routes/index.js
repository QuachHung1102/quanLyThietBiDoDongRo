var express = require('express');
var rootRouter = express.Router();
const { deviceRouter } = require('./devices.routers');
const { userRouter } = require('./user.routers');
const { permissionRouter } = require('./permission.routers');
const { measurementRouter } = require('./measurements.routers');

/* GET home page. */
rootRouter.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
// use deviceRouter
rootRouter.use('/devices', deviceRouter);
// use userRouter
rootRouter.use('/users', userRouter);
// use permissionRouter
rootRouter.use('/permissions', permissionRouter);
// use measurementRouter
rootRouter.use('/measurements', measurementRouter);

module.exports = rootRouter;
