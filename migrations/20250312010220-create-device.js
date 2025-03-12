'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Devices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      deviceName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please enter the device name',
          },
          notEmpty: true,
          len: [5, 100],
        }
      },
      serialNumber: {
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
        allowNull: true
      },
      lastChecked: {
        type: Sequelize.DATE,
        allowNull: true
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      addedBy: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [5, 100],
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Devices');
  }
};