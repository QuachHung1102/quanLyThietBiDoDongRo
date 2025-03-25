const { where, Op } = require('sequelize');
const { Device } = require('../models');

const createDevice = async (req, res) => {
  try {
    const { deviceName, serialNumber, status, type, coordinates, addedBy } = req.body;
    console.log(coordinates);
    const newDevice = await Device.create({
      deviceName,
      serialNumber,
      status,
      type,
      coordinates: {
        type: 'Point',
        coordinates: coordinates,
      },
      addedBy
    });
    res.status(201).json(newDevice);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// get all devices or get devices by name (query)
const getAllDevices = async (req, res) => {
  const { deviceName } = req.query;
  try {
    if (deviceName) {
      const deviceList = await Device.findAll({
        where: {
          deviceName: {
            [Op.iLike]: `%${deviceName}%`
          }
        }
      });
      res.status(200).send(deviceList);
    } else {
      const deviceList = await Device.findAll();
      res.status(200).send(deviceList);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getAllDevicesPage = async (req, res) => {
  try {
    const deviceList = await Device.findAll();
    // res.status(200).send(deviceList);
    res.status(200).render("device/device", {
      deviceList,
      deviceListLength: deviceList.length > 0,
      pageTitle: "Device Manager",
      activeClass: "Home",
      activeFormCss: false,
      alert: false,
      path: "/device",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDetailDevice = async (req, res) => {
  const { id } = req.params;
  try {
    const detailDevice = await Device.findOne({ where: { id } });
    if (detailDevice) {
      res.status(200).json(detailDevice);
    } else {
      res.status(404).send("Device does not exist");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateDevice = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  console.log(data);
  try {
    await Device.update(
      {
        deviceName: data.deviceName,
        serialNumber: data.serialNumber,
        status: data.status,
        type: data.type,
        addedBy: data.addedBy,
      },
      {
        where: { id }
      }
    );
    const detailsDevice = await Device.findOne({ where: { id: id } });
    // detailsDevice.deviceName = data.deviceName;
    // detailsDevice.serialNumber = data.serialNumber;
    // detailsDevice.status = data.status;
    // detailsDevice.type = data.type;
    // detailsDevice.addedBy = data.addedBy;
    // await detailsDevice.save();
    res.status(200).send(detailsDevice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteDevice = async (req, res) => {
  const { id } = req.params;
  try {
    await Device.destroy({
      where: { id },
    });
    res.status(204).send(`Device with id ${id} has been deleted`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createDevice,
  getAllDevices,
  getAllDevicesPage,
  getDetailDevice,
  updateDevice,
  deleteDevice,
};