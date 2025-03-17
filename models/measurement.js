'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Measurement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Measurement.init({
    deviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'devices',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    leakageCurrent: DataTypes.FLOAT,
    temperature: DataTypes.FLOAT,
    humidity: DataTypes.FLOAT,
    batteryLevel: DataTypes.INTEGER,
    powerLoss: DataTypes.FLOAT,
    alertLevel: DataTypes.INTEGER,
    measuredAt: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Measurement',
  });
  return Measurement;
};