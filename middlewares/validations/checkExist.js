const checkExist = (Model) => {
  return async (req, res, next) => {
    // Kiểm tra xem đối tượng có tồn tại không
    const { id } = req.params;
    const model = await Model.findOne({
      where: {
        id
      },
    });
    if (!model) {
      res.status(404).json({ error: 'Obbject not found' });
    } else {
      next();
    }
    // Nếu tồn tại thì gán device vào req.device
  }
}

const checkDeviceExist = (Model) => {
  return async (req, res, next) => {
    // Kiểm tra xem đối tượng có tồn tại không
    const { deviceId } = req.params;
    const model = await Model.findOne({
      where: {
        deviceId
      },
    });
    if (!model) {
      res.status(404).json({ error: 'Obbject not found' });
    } else {
      next();
    }
    // Nếu tồn tại thì gán device vào req.device
  }
}

module.exports = {
  checkExist,
  checkDeviceExist
};