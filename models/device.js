'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Device extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Device.init({
    deviceName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter the device name',
        },
        notEmpty: true,
        len: [5, 100],
        // checkLen(value) {
        //   if (value.length >= 5 && value.length <= 100) {
        //     return true;
        //   } else {
        //     throw new Error(`Độ dài không hợp lệ`); // Đẩy lỗi về.
        //   }
        // }
      }
    },
    serialNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter the serial number',
        },
        notEmpty: true,
        len: [5, 100],
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastChecked: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    addedBy: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [5, 100],
      }
    },
  }, {
    sequelize,
    modelName: 'Device',
  });
  return Device;
};