const { Permissions } = require('../models');
const { Device } = require('../models');
const { User } = require('../models');

const createPermission = async (req, res) => {
  try {
    const { userId, deviceId } = req.query;
    const user = await User.findOne({ where: { id: userId } });
    const device = await Device.findOne({ where: { id: deviceId } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (!device) {
      return res.status(404).json({ error: 'Device not found' });
    }
    const newPermission = await Permissions.create({ userId, deviceId, canControl: true });
    res.status(201).json(newPermission);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const deletePermission = async (req, res) => {
  const { id } = req.params;
  try {
    const permission = await Permissions.findOne({ where: { id } });
    if (permission) {
      await permission.destroy();
      res.status(200).send(`Permission ${id} has been deleted`);
    } else {
      res.status(404).json({ error: 'Permission not found' });
    }
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createPermission,
  deletePermission
};