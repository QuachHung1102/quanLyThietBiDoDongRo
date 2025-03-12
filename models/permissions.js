'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permissions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Device }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'userId' });
      this.belongsTo(Device, { foreignKey: 'deviceId' });
    }
  }
  Permissions.init({
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users', // Tên bảng Users
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    deviceId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'devices', // Tên bảng Devices
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    canControl: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Permissions',
  });
  return Permissions;
};