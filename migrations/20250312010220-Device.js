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
        type: Sequelize.STRING
      },
      serialNumber: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      lastChecked: {
        type: Sequelize.DATE
      },
      type: {
        type: Sequelize.STRING
      },
      addedBy: {
        type: Sequelize.STRING
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