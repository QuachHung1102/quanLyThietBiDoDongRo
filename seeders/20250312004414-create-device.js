'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Devices', [
      {
        deviceName: "DV001",
        serialNumber: "000000001",
        status: "1",
        type: "1",
        addedBy: "Quách Ngọc Hưng",
        createdAt: "2025-03-11 04:08:10.000",
        updatedAt: "2025-03-11 04:08:10.000"
      },
      {
        deviceName: "DV002",
        serialNumber: "0000000ab",
        status: "2",
        type: "1",
        addedBy: "Quách Ngọc Hưng",
        createdAt: "2025-03-11 04:08:10.000",
        updatedAt: "2025-03-11 04:08:10.000"
      },
      {
        deviceName: "DV003",
        serialNumber: "00000azs",
        status: "1",
        type: "1",
        addedBy: "Quách Ngọc Hưng",
        createdAt: "2025-03-11 04:08:10.000",
        updatedAt: "2025-03-11 04:08:10.000"
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Devices', null, {});
  }
};
