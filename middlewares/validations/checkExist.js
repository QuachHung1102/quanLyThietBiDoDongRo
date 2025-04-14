const checkExist = (Model) => {
  return async (req, res, next) => {
    const { id } = req.params;
    const model = await Model.findOne({
      where: {
        id
      },
    });
    if (!model) {
      res.status(404).json({ error: 'Object not found' });
    } else {
      next();
    }
  }
}

const checkDeviceExist = (Model) => {
  return async (req, res, next) => {
    const { deviceId } = req.params;
    try {
      const model = await Model.findOne({
        where: {
          id: deviceId
        },
      });
      if (!model) {
        res.status(404).json({ error: 'Object not found' });
      } else {
        next();
      }
    } catch (error) {
      res.status(500).render('error', { error });
    }
  }
}

module.exports = {
  checkExist,
  checkDeviceExist,
};