const checkExist = (Model) => {
  return async (req, res, next) => {
    // Kiểm tra xem device có tồn tại không
    const { id } = req.params;
    const device = await Model.findOne({
      where: {
        id
      },
    });
    if (!device) {
      res.status(404).json({ error: 'Device not found' });
    } else {
      next();
    }
    // Nếu tồn tại thì gán device vào req.device
  }
}

module.exports = {
  checkExist
};